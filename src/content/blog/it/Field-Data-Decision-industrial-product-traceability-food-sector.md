---
title: 'From Field Data to Decision - An industrial integration project focused on product traceability in the food sector'
date: '2026-02-24'
description: 'This project, developed for Melchiori S.r.l. in Tres, focuses on transforming raw machine data into structured process knowledge within a food production environment. By integrating PLC data through MODBUS, implementing historical storage, and enabling retrospective batch analysis, the system allows the company to reconstruct production conditions when product defects occur. The result is improved traceability, faster quality investigations, and a stronger connection between industrial processes and data driven decision making.'
tags:
  - industrial
  - PLC
  - quality control
  - project
lang: it
---

# Dal dato di campo alla decisione
## Un progetto di integrazione industriale orientato ai consumi energetici e qualita

Quando si parla con imprenditori e responsabili di produzione, il problema emerge quasi sempre nello stesso modo: le macchine funzionano, la produzione va avanti, ma manca una visione chiara di cosa stia realmente accadendo dal punto di vista dei consumi e del comportamento degli impianti.

Questo progetto nasce proprio da una situazione di questo tipo, all’interno dell’azienda **Melchiori S.r.l. di Tres**, realtà industriale strutturata, con impianti già evoluti ma con una domanda molto concreta: *stiamo consumando energia nel modo corretto?* E soprattutto: *abbiamo dati affidabili su cui basare le decisioni?*

<!-- IMMAGINE 1: architettura generale del sistema -->
![Architettura generale del sistema](/images/field-data-decision/architecture_overview.png)

*Figura 1 – Schema logico dell’architettura di raccolta e storicizzazione dei dati di processo.*

## Il problema degli imprenditori: cosa è successo al prodotto

Quando si lavora nel settore alimentare, la domanda più critica non riguarda solo l’efficienza o i consumi. La domanda vera arriva quando emerge un difetto sul prodotto finito:

*che cosa è successo durante la produzione?*

Per un imprenditore questo significa dover ricostruire a posteriori le condizioni di processo che hanno portato a quel risultato. Senza dati strutturati, questa ricostruzione è lenta, incompleta e spesso basata su ipotesi.

In **Melchiori S.r.l. di Tres**, come in molte realtà alimentari, i macchinari generavano già una grande quantità di informazioni. Tuttavia questi dati rimanevano confinati alle macchine, senza una visione storica e senza la possibilità di collegarli direttamente al lotto di prodotto.

Il progetto nasce quindi con un obiettivo chiaro: rendere possibile la lettura a ritroso del processo produttivo, per capire cosa è accaduto al prodotto nel tempo.

## Partire da ciò che esiste: le macchine e i PLC

La prima scelta è stata non stravolgere l’impianto esistente. In ambito industriale questo è fondamentale.

Si è deciso di lavorare sul protocollo **MODBUS TCP/IP**, già utilizzato dai PLC presenti. Una tecnologia consolidata, affidabile e adatta a un contesto produttivo reale.

Il lavoro più delicato non è stato la connessione, ma la comprensione del dato:
- quali registri leggere;
- che tipo di informazione rappresentano;
- come convertirla correttamente.

Questo passaggio è cruciale soprattutto quando si parla di consumi energetici: un errore di interpretazione porta rapidamente a valutazioni sbagliate.

<!-- IMMAGINE 2: dettaglio integrazione PLC / MODBUS -->
![Dettaglio raccolta dati da PLC](/images/field-data-decision/modbus_detail.png)

*Figura 2 – Lettura dei registri PLC tramite protocollo MODBUS TCP/IP.*

## Raccogliere dati non basta: serve dare loro un contesto

Raccogliere dati di processo è solo il primo passo. Nel settore alimentare, il valore nasce quando il dato è contestualizzato rispetto al prodotto e al lotto.

In questo progetto la raccolta è stata progettata per consentire una lettura temporale accurata del processo:
- acquisizione frequente per cogliere variazioni significative;
- aggregazioni per evidenziare comportamenti anomali;
- conservazione storica sufficiente a coprire l’intero ciclo di vita del prodotto.

Questo approccio permette, in caso di difetto, di tornare indietro nel tempo e osservare come si è comportato l’impianto durante la produzione di uno specifico lotto.

## Dal dato grezzo alla visione d’insieme

<!-- BLOCCO CODICE: esempio semplificato di raccolta o normalizzazione dati -->
```javascript
// Lettura ciclica di registri MODBUS e normalizzazione del dato
const value = readModbusRegister(address)
const normalized = value / scalingFactor
store(normalized, timestamp)
```

*Esempio semplificato di logica utilizzata per la normalizzazione dei dati di processo.*


I dati vengono storicizzati su infrastruttura Cloud, scelta non per moda ma per praticità: scalabilità, accesso remoto e possibilità di evoluzione futura.

Il vero valore emerge quando i dati permettono di:
- confrontare giornate di produzione;
- individuare anomalie di consumo;
- correlare stati macchina, eventi e assorbimenti energetici.

A questo punto il progetto smette di essere solo tecnico e diventa uno strumento di supporto alle decisioni.

![Esempio di visualizzazione dati](/images/field-data-decision/dashboard_example.png)


## Un sistema aperto, pensato per crescere

Per Melchiori S.r.l. era importante non creare un sistema chiuso. I dati dovevano poter dialogare con altri strumenti.

Per questo motivo il sistema espone le informazioni tramite API, rendendole disponibili per:
- integrazione con sistemi di manutenzione;
- dashboard dedicate;
- analisi future più avanzate.

Dal punto di vista energetico, questo consente di collegare consumi, interventi e comportamenti degli impianti in modo strutturato.

## Perché la raccolta dati cambia il controllo sul prodotto

Quando i dati di processo diventano storici e interrogabili, cambia radicalmente il modo di gestire la qualità.

Per Melchiori S.r.l. questo significa poter:
- analizzare a posteriori le condizioni di produzione di un lotto;
- correlare parametri macchina e qualità del prodotto;
- ridurre i tempi di analisi in caso di non conformità;
- trasformare l’esperienza empirica in conoscenza misurabile.

Il dato energetico rimane un indicatore importante, ma diventa parte di un quadro più ampio: quello del comportamento reale del processo produttivo.

## Conclusioni

Ogni progetto di integrazione industriale ha le sue specificità, ma il punto di partenza è sempre lo stesso: capire davvero cosa succede sulle macchine.

Nel caso di Melchiori S.r.l., la raccolta e l’analisi dei dati di processo e di consumo hanno aperto la strada a una gestione più consapevole dell’energia e del processo produttivo.

È da qui che nasce l’innovazione industriale: dal dato che diventa conoscenza e, infine, decisione.

