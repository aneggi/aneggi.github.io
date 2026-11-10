---
title: "Archiviazione log WORM: conservazione immutabile con Azure Blob Storage"
description: "Un esempio di consulenza anonimizzato: affiancare ai backup locali un archivio log immutabile con credenziali di invio limitate e AzCopy."
date: '2026-11-10'
lang: it
translationOf: worm-log-storage
tags:
  - security
  - infrastructure
  - azure
  - backup
---

Nella gestione di infrastrutture IT, un backup affidabile e una traccia di audit immutabile rispondono a esigenze diverse. Durante un progetto di consulenza per un'azienda, ho dovuto affrontare un requisito che andava oltre il disaster recovery: conservare i log di sistema impedendo a un attaccante di cancellare le evidenze già archiviate.

Questo articolo descrive l'approccio in termini generali. L'azienda resta anonima e l'architettura e il codice riportati sono illustrativi: non espongono rete, sistemi, identificativi dello storage, credenziali o configurazioni operative del cliente.

L'idea è affiancare ai backup locali un archivio **WORM (Write Once, Read Many)** su Azure Blob Storage.

## Perché backup e log immutabili rispondono a esigenze diverse

Apprezzo il self-hosting, l'open source e il controllo locale dei dati. Proxmox Backup Server (PBS) è uno strumento utile per backup deduplicati e ripristini rapidi negli ambienti Proxmox. Un archivio di audit ha un obiettivo diverso: preservare le evidenze anche quando il sistema che le genera viene compromesso.

Due esigenze guidano questa scelta:

1. **Ransomware e compromissione degli account privilegiati.** Un attaccante con accesso root può eliminare i log locali e tentare di compromettere anche le destinazioni di backup raggiungibili.
2. **Accountability.** Le credenziali usate da un sistema per esportare i log non dovrebbero consentirgli anche di cancellare l'archivio storico.

C'è anche un contesto normativo. Quando applicabile, il [provvedimento del Garante Privacy sugli amministratori di sistema](https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/1577499) richiede registrazioni degli accessi complete, inalterabili e verificabili, da conservare per almeno sei mesi. Si tratta dei log di accesso, non di un obbligo generalizzato di registrare ogni comando amministrativo. Lo storage immutabile contribuisce a soddisfare una parte del requisito; restano importanti raccolta, controlli di accesso, verifiche e procedure di conservazione.

Il WORM si può implementare sia on-premise sia in cloud. Lo storage a oggetti è un'alternativa pratica quando gestire un archivio locale separato aggiungerebbe troppa complessità. I costi dipendono da volumi, conservazione, transazioni e recupero dei dati: vanno stimati sul carico effettivo.

## Architettura: separare invio e amministrazione dell'archivio

Il progetto segue il principio del minimo privilegio: il sistema sorgente può caricare nuovi oggetti, mentre amministrazione dell'archivio e indagini usano identità separate.

I componenti sono:

- **Un container dedicato con immutabilità temporale.** In questo esempio, ogni log compresso diventa un nuovo block blob. Il periodo di conservazione viene scelto in base ai requisiti applicabili e la policy viene collaudata prima di bloccarla. Una policy bloccata impedisce agli amministratori di accorciare o rimuovere la protezione durante la conservazione. La [documentazione Microsoft sulle policy dei container](https://learn.microsoft.com/en-us/azure/storage/blobs/immutable-policy-configure-container-scope) distingue le policy sbloccate da quelle bloccate.
- **Credenziali di invio limitate.** Un token SAS (Shared Access Signature) può concedere creazione e scrittura (`sp=cw`) senza lettura, elenco o cancellazione. Il permesso di scrittura non equivale di per sé a un accesso di sola aggiunta: è la policy di immutabilità a proteggere gli oggetti già archiviati. Il sistema sorgente non conserva né la chiave dello storage account né credenziali per amministrare la conservazione. Microsoft raccomanda uno user delegation SAS quando si usa l'autenticazione SAS; si veda la [documentazione SAS](https://learn.microsoft.com/en-us/rest/api/storageservices/create-service-sas).
- **Rotazione dei log e invii pianificati.** Un processo locale comprime i file di log chiusi e li invia con AzCopy. La frequenza determina quanti dati restano esposti localmente prima dell'archiviazione.

## Un esempio minimo di invio con AzCopy

Questo script Bash carica un singolo archivio `.gz` già completato. Un hook di rotazione o un processo pianificato può richiamarlo per ogni file in attesa. Tutte le impostazioni di destinazione arrivano dall'ambiente; non sono inclusi endpoint o token reali.

```bash
#!/usr/bin/env bash
set -euo pipefail
umask 077

: "${AZURE_CONTAINER_URL:?Impostare URL HTTPS del container senza query string}"
: "${AZURE_SAS_TOKEN:?Fornire un token SAS limitato e non scaduto}"

logfile="${1:?Uso: upload-log.sh /percorso/log-ruotato.gz}"
[[ -f "$logfile" && "$logfile" == *.gz ]] || exit 1

# Nomi casuali evitano collisioni senza esporre il nome del sistema sorgente.
archive_id="$(cat /proc/sys/kernel/random/uuid)"
blob_name="$(date -u +%Y/%m/%d)/${archive_id}.gz"
container_url="${AZURE_CONTAINER_URL%/}"
sas_token="${AZURE_SAS_TOKEN#\?}"

azcopy copy "$logfile" \
  "${container_url}/${blob_name}?${sas_token}" \
  --from-to=LocalBlob \
  --blob-type=BlockBlob
```

La destinazione comprende URL del container, percorso dell'oggetto, poi `?` e query string SAS, come mostra la [guida Microsoft al caricamento con AzCopy](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-blobs-upload). L'esempio presuppone Linux e un binario AzCopy installato. Termina con un errore se il caricamento fallisce.

È una funzione di invio, non un servizio completo di archiviazione. Un processo di produzione deve gestire una coda persistente dei file in attesa, i tentativi successivi, un registro degli invii riusciti con i nomi degli oggetti e gli allarmi per esportazioni mancanti o fallite. Selezionare solo i file modificati nelle ultime 24 ore farebbe perdere quelli più vecchi dopo un'interruzione. Ripetere questo esempio crea un altro oggetto: chi lo richiama deve quindi tenere traccia del lavoro completato.

Il SAS va escluso dal controllo versione e dai normali log applicativi; l'accesso alla configurazione del processo e ai log di AzCopy va limitato e la credenziale ruotata prima della scadenza. Le variabili d'ambiente evitano di inserire il segreto nello script, ma non lo nascondono a chi ha accesso root al sistema sorgente.

## Cosa succede se il sistema sorgente viene compromesso?

Se un attaccante ottiene root e sottrae la credenziale di invio, il SAS limitato e la policy di conservazione bloccata costituiscono due controlli distinti: il primo limita le operazioni consentite, la seconda protegge gli oggetti già conservati. La [panoramica Microsoft sullo storage immutabile](https://learn.microsoft.com/en-us/azure/storage/blobs/immutable-storage-overview) descrive la protezione da modifica e cancellazione durante la conservazione.

Questo non rende inalterabile l'intera filiera dei log. Un attaccante può fermare gli invii, modificare i log prima del caricamento, inviare registrazioni false o caricare dati inutili che aumentano i costi. Un'esportazione giornaliera lascia inoltre una finestra di eventi non ancora archiviati. Restano necessari monitoraggio indipendente, frequenza di esportazione adeguata e credenziali separate per le indagini.

Prima di fare affidamento sull'archivio, bisogna collaudare gli invii con gli esatti permessi e la versione di AzCopy utilizzati, verificare che gli oggetti protetti non siano sovrascrivibili o cancellabili e provare il recupero con un'identità autorizzata separata. Vanno monitorate sia le lacune nella raccolta sia gli errori espliciti di invio.

## Conclusioni

Un progetto resiliente assegna a ogni strumento un compito preciso: i backup supportano il ripristino, mentre un archivio immutabile protegge le evidenze già esportate. Combinare strumenti locali come PBS con la conservazione in cloud può essere pratico senza trasferire l'intera infrastruttura nel cloud.

Il risultato utile è una traccia di audit più robusta, sostenuta da credenziali limitate, una policy di conservazione bloccata e un processo di raccolta monitorato. L'immutabilità dello storage è una parte di questo progetto, non una garanzia di sicurezza completa o conformità normativa.
