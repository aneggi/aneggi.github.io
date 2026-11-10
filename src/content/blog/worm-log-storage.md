---
title: "WORM log storage: immutable archives with Azure Blob Storage"
description: "An anonymized consulting example: complementing local backups with immutable log archives, restricted upload credentials, and AzCopy."
date: '2026-11-10'
lang: en
tags:
  - security
  - infrastructure
  - azure
  - backup
---

When managing IT infrastructure, a reliable backup and an immutable audit trail serve different purposes. During a consulting project for a company, I needed to address a requirement beyond disaster recovery: preserving system logs so that an attacker could not erase the evidence already archived.

This article describes the approach in general terms. The company is anonymous, and the architecture and code below are illustrative: they do not disclose its network, systems, storage identifiers, credentials, or operational configuration.

The idea is to complement local backups with a **WORM (Write Once, Read Many)** archive in Azure Blob Storage.

## Why backups and immutable logs serve different purposes

I value self-hosting, open source, and local control of data. Proxmox Backup Server (PBS) is a useful tool for deduplicated backups and fast recovery in Proxmox environments. An audit archive has a different goal: retaining evidence even when the source system is compromised.

Two concerns drive this design:

1. **Ransomware and privileged compromise.** An attacker with root access can delete local logs and may also attack accessible backup destinations.
2. **Accountability.** The credentials used by a system to export logs should not also let it erase the historical archive.

There is also a regulatory context. Where applicable, the [Italian Data Protection Authority's system administrator measure](https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/1577499) requires administrator access records to be complete, resistant to alteration, and verifiable, with retention of at least six months. This concerns access records, rather than a blanket requirement to record every administrative command. Immutable storage supports part of that requirement; collection, access controls, verification, and retention procedures still matter.

WORM can be implemented on premises as well as in the cloud. Object storage offers a practical alternative when operating a separate local archive would add too much complexity. Costs depend on volume, retention, transactions, and retrieval; they need to be estimated for the workload.

## Architecture: separate upload from archive administration

The design follows least privilege: the source system can upload new objects, while archive administration and investigation use separate identities.

The building blocks are:

- **A dedicated container with time-based immutability.** In this example, each compressed log becomes a new block blob. The retention period is chosen for the applicable requirements, and the policy is tested before being locked. A locked policy prevents administrators from shortening or removing that protection during retention. Microsoft's [container policy documentation](https://learn.microsoft.com/en-us/azure/storage/blobs/immutable-policy-configure-container-scope) explains the distinction between unlocked and locked policies.
- **Restricted upload credentials.** A SAS (Shared Access Signature) can grant create and write permissions (`sp=cw`) without read, list, or delete. Write permission is not intrinsically append-only: the immutability policy protects existing archived objects. The source holds neither the storage account key nor credentials to administer retention. Microsoft recommends a user delegation SAS when using SAS authentication; see the [SAS documentation](https://learn.microsoft.com/en-us/rest/api/storageservices/create-service-sas).
- **Log rotation and scheduled uploads.** A local job compresses completed log files and sends them with AzCopy. The schedule determines how much data remains exposed locally before archival.

## A minimal upload example with AzCopy

The following Bash script uploads one completed `.gz` archive. A rotation hook or scheduled worker can invoke it for each pending file. All destination settings come from the environment; no real endpoint or token is included.

```bash
#!/usr/bin/env bash
set -euo pipefail
umask 077

: "${AZURE_CONTAINER_URL:?Set the HTTPS container URL without a query string}"
: "${AZURE_SAS_TOKEN:?Supply a restricted, unexpired SAS token}"

logfile="${1:?Usage: upload-log.sh /path/to/rotated-log.gz}"
[[ -f "$logfile" && "$logfile" == *.gz ]] || exit 1

# Random names avoid collisions without exposing a source hostname.
archive_id="$(cat /proc/sys/kernel/random/uuid)"
blob_name="$(date -u +%Y/%m/%d)/${archive_id}.gz"
container_url="${AZURE_CONTAINER_URL%/}"
sas_token="${AZURE_SAS_TOKEN#\?}"

azcopy copy "$logfile" \
  "${container_url}/${blob_name}?${sas_token}" \
  --from-to=LocalBlob \
  --blob-type=BlockBlob
```

The destination consists of the container URL, the object path, then `?` and the SAS query string, as shown in Microsoft's [AzCopy upload guide](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-blobs-upload). This example assumes Linux and an installed AzCopy binary. It exits with an error if the upload fails.

This is an upload primitive, not a complete archival service. A production worker needs a durable queue of pending files, retry handling, a record of successful uploads and their object names, and alerts for missing or failed exports. Selecting only files modified in the last 24 hours would miss older files after an outage. Re-running this example creates another object, so the caller must track completed work.

Keep the SAS out of source control and ordinary application logs, restrict access to the job configuration and AzCopy logs, and rotate the credential before expiry. Environment variables avoid embedding a secret in the script; they do not hide it from root on the source system.

## What happens if the source is compromised?

If an attacker obtains root and steals the upload credential, the restricted SAS and locked retention policy are separate controls: one limits permitted operations, while the other protects objects already retained. The [Azure immutable storage overview](https://learn.microsoft.com/en-us/azure/storage/blobs/immutable-storage-overview) describes protection against modification and deletion during retention.

That does not make the entire logging pipeline tamper-proof. An attacker can stop exports, change logs before upload, submit fabricated records, or upload junk that increases costs. Daily exports also leave a window of unarchived events. Independent monitoring, appropriate export frequency, and separate investigation credentials remain necessary.

Before relying on the archive, test uploads with the exact credential scope and AzCopy version, verify that retained objects cannot be overwritten or deleted, and exercise retrieval using a separate authorized identity. Monitor gaps as well as explicit upload failures.

## Conclusions

A resilient design assigns each tool a clear job: backups support recovery, while an immutable archive protects previously exported evidence. Combining local backup tools such as PBS with cloud retention can be practical without moving the entire infrastructure to the cloud.

The useful result is a stronger audit trail, supported by restricted credentials, a locked retention policy, and a monitored collection process. Storage immutability is one part of that design, rather than a guarantee of complete security or regulatory compliance.
