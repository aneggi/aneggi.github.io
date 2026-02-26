---
title: 'From Field Data to Decision - An industrial integration project focused on product traceability in the food sector'
date: '2026-02-24'
description: 'This project, developed for Melchiori S.r.l. in Tres, focuses on transforming raw machine data into structured process knowledge within a food production environment. By integrating PLC data through MODBUS, implementing historical storage, and enabling retrospective batch analysis, the system allows the company to reconstruct production conditions when product defects occur. The result is improved traceability, faster quality investigations, and a stronger connection between industrial processes and data driven decision making.'
tags:
  - industrial
  - PLC
  - quality control
  - project
lang: en
---


# From Field Data to Decision
## An industrial integration project focused on product traceability in the food sector

When speaking with entrepreneurs and production managers in the food industry, the most critical question is rarely about efficiency alone. The real question emerges when a defect is discovered in the final product:

*What exactly happened during production?*

This project was developed within **Melchiori S.r.l. in Tres**, a structured industrial company operating in the food sector. The objective was clear: build the capability to reconstruct production conditions over time, allowing the company to understand what happened to a specific batch when a quality issue appears.

In food production, this is not only a technical requirement. It is a strategic necessity.

<!-- IMAGE 1: general system architecture -->
![Overall system architecture](/images/field-data-decision/architecture_overview.png)

*Figure 1 – Logical architecture of the data acquisition and storage system.*

## The real challenge: understanding what happened to the product

Machines were already equipped with PLCs and connected through the local network. Data existed. However, those data points were confined within individual machines, without structured historical storage and without a clear connection to production batches.

Without structured data:
- it is difficult to reconstruct process conditions;
- quality investigations require manual checks and assumptions;
- correlations between process parameters and product defects remain unclear.

The project started from a simple but decisive objective: make it possible to look back in time and understand the real process conditions that affected a specific product batch.

## Starting from the existing infrastructure

A key design choice was not to disrupt the existing industrial setup. Stability and continuity are fundamental in production environments.

The system was built around **MODBUS TCP/IP**, already available on the PLCs. The focus was not innovation for its own sake, but reliability and compatibility with the current machinery.

The most delicate part was not connectivity, but interpretation:
- identifying the correct registers;
- understanding the type of stored values;
- applying proper scaling and conversion;
- validating the accuracy of the acquired data.

In food production, even small misinterpretations can lead to incorrect conclusions about process behavior.

<!-- IMAGE 2: PLC and MODBUS integration detail -->
![PLC data acquisition via MODBUS](/images/field-data-decision/modbus_detail.png)

*Figure 2 – Reading PLC registers using MODBUS TCP/IP.*

## Collecting data is not enough: context is essential

Data acquisition alone does not create value. In the food sector, value emerges when process data are contextualized with respect to time and production batches.

The acquisition logic was therefore designed to support retrospective analysis:
- high frequency sampling to capture relevant variations;
- periodic aggregation to provide readable indicators;
- structured historical storage covering the full lifecycle of a batch.

This approach enables backward analysis when a defect is detected, allowing technical teams to review how the plant behaved during the production of a specific lot.

## From raw data to structured insight

<!-- CODE BLOCK: simplified example of data acquisition logic -->
```javascript
// Cyclical MODBUS register reading and data normalization
const value = readModbusRegister(address)
const normalized = value / scalingFactor
store(normalized, timestamp)
```

*Simplified example of the logic used to normalize and store process data.*

Data are stored in a cloud infrastructure chosen for scalability, accessibility and long term evolution. The cloud is not the objective. It is the enabling layer.

The real value appears when data allow:
- comparison between production days;
- identification of abnormal behavior;
- correlation between machine parameters and product quality outcomes.

<!-- IMAGE 3: example output chart or dashboard -->
![Process trend or consumption chart](/images/field-data-decision/dashboard_example.jpg)

*Figure 3 – Example of a trend chart generated from historical data, supporting retrospective process analysis.*

At this stage, the system becomes more than a technical integration. It becomes a decision support tool.

## An open system designed to evolve

The architecture was intentionally designed as modular and service oriented, separating:
- field data acquisition;
- data normalization and aggregation;
- storage;
- data exposure through APIs.

This structure ensures that the system can evolve over time, integrate with maintenance software, quality tools or advanced analytics platforms.


## Impact on product control and quality management

For Melchiori S.r.l., the most significant outcome is the ability to:
- analyze production conditions of a specific batch after completion;
- correlate process parameters with detected defects;
- reduce investigation time in case of non conformity;
- transform empirical knowledge into measurable evidence.

Energy consumption remains an important indicator, but within a broader framework. It becomes part of the overall process behavior analysis rather than an isolated metric.

## Final considerations

Industrial innovation in the food sector does not necessarily require new machines. Often, it requires better visibility into what machines are already doing.

By structuring, storing and analyzing process data, Melchiori S.r.l. has strengthened its ability to understand its own production dynamics and to react more effectively when quality issues arise.

This is where industrial integration truly creates value: when data become knowledge, and knowledge supports better decisions.

