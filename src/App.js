// ============================================================
// IMPORTAZIONI
// ============================================================

// Importiamo React e useState per gestire lo stato dell'app.
// useState crea variabili "reattive": quando cambiano, React
// aggiorna automaticamente l'interfaccia senza fare nulla manualmente.
import React, { useState } from 'react';

// Importiamo il file CSS per gli stili grafici
import './App.css';


// ============================================================
// *** AREA AGGIORNAMENTO PRODOTTI ***
// ============================================================
// Qui trovi TUTTI i prodotti consigliati dall'app, divisi per
// genere (male/female) e per categoria di abbigliamento.
//
// Come aggiornare i prodotti:
//   1. Trova la categoria che vuoi modificare (es. calzini)
//   2. Modifica il nome o l'url del prodotto
//   3. Puoi aggiungere prodotti con { nome: '...', url: '...' }
//   4. Puoi rimuovere prodotti cancellando la riga corrispondente
//   5. Salva il file — la app si aggiorna automaticamente
//
// IMPORTANTE: non toccare nulla al di sotto di questa sezione
// a meno che tu non voglia modificare la logica dell'app!
// ============================================================

const PRODOTTI = {

  // --------------------------------------------------------
  // PRODOTTI UOMO
  // --------------------------------------------------------
  male: {

    // Maglia a maniche lunghe — usata con freddo moderato o fresco
    maglia_lunga: [
      { nome: 'Under Armour UA Streaker Zip', url: 'https://www.solarissport.com/collections/abbigliamento-uomo-maglie/products/1271851-907' },
      { nome: 'Asics Lite Show LS 1', url: 'https://www.solarissport.com/products/124756-8052' },
      { nome: 'Nike Element Sphere HZ', url: 'https://www.solarissport.com/products/683906-011' },
    ],

    // Leggins lunghi — usati con freddo moderato o intenso
    leggins_lunghi: [
      { nome: 'Under Armour UA HG Armour Novelty', url: 'https://www.solarissport.com/collections/abbigliamento-uomo-leggings/products/1377158-0001' },
      { nome: 'New Balance Impact Run Tight', url: 'https://www.solarissport.com/collections/abbigliamento-uomo-leggings/products/mp21273-bk' },
      { nome: 'Nike Pro Dri Fit', url: 'https://www.solarissport.com/collections/abbigliamento-uomo-leggings/products/dm6003-010' },
    ],

    // Guanti — consigliati sotto i 7°C percepiti
    guanti: [
      { nome: 'Asics Gloves', url: 'https://www.solarissport.com/collections/accessori-uomo-guanti/products/3013a188-001' },
      { nome: 'Mizuno BT Light Weight Glove', url: 'https://www.solarissport.com/products/73xbk052c-09' },
      { nome: 'Runtastic Sport Gloves', url: 'https://www.solarissport.com/collections/accessori-uomo-guanti/products/rungls1' },
    ],

    // Termica leggera — primo strato con freddo moderato (1-7°C percepiti)
    termica_leggera: [
      { nome: 'Under Armour UA CG Armour Comp Mock', url: 'https://www.solarissport.com/products/1366072-0410' },
      { nome: 'Mizuno Light Weight Crew Neck', url: 'https://www.solarissport.com/products/73cf281-9' },
      { nome: 'Nike M NK Elmnt Track Top HZ', url: 'https://www.solarissport.com/products/bv5419-010' },
    ],

    // Termica invernale — primo strato con freddo intenso (sotto 0°C percepiti)
    termica_invernale: [
      { nome: 'Accapi Maglia ML Polar Bear', url: 'https://www.solarissport.com/products/a740-966' },
      { nome: 'Biotex Manica Lunga 3D', url: 'https://www.biotex.it/shop/it/uomo/211-manica-lunga-3d/116' },
      { nome: 'UYN Evolutyon+', url: 'https://uynsports.com/it-it/products/maglia-termica-dolcevita-evolutyon-uomo-nero-sx2-u100555-b000' },
    ],

    // Giacca antivento — usata con vento forte o temperature fresche
    antivento: [
      { nome: 'The North Face M Higher Run Wind Jacket', url: 'https://www.solarissport.com/products/8727-4h0' },
      { nome: 'Under Armour Run Insulate Hybrid Jacket', url: 'https://www.solarissport.com/products/1355807-0001' },
      { nome: 'Brooks Run Visible Jacket 2.0', url: 'https://www.solarissport.com/products/211519-167' },
    ],

    // Giacca impermeabile — consigliata quando piove
    impermeabile: [
      { nome: 'New Balance Better Run Waterproof Jacket', url: 'https://www.solarissport.com/products/mo53207-gym' },
      { nome: 'New Balance Impact Run Water Defy Jacket', url: 'https://www.solarissport.com/products/mj21266-bk' },
      { nome: 'Under Armour Storm Run Hooded Jacket', url: 'https://www.solarissport.com/products/1376795-0001' },
    ],

    // Cappello / fascia orecchie — consigliata sotto i 4°C percepiti
    cappello: [
      { nome: 'Mizuno BT Headband', url: 'https://www.solarissport.com/products/a2gw9552-09' },
      { nome: 'Kiprun Fascia Running Unisex', url: 'https://www.decathlon.it/p/fascia-running-adulto-unisex-nera/352680/c382m8871353' },
      { nome: 'Kiprun Berretto Running Warm+ V2', url: 'https://www.decathlon.it/p/berretto-running-adulto-warm-v2-nero/352660/c382m8871314' },
    ],

    // Scaldacollo — consigliato con freddo intenso (sotto 0°C percepiti)
    scaldacollo: [
      { nome: 'Mizuno BT Neck Warmer Panel', url: 'https://www.solarissport.com/products/a2gwa570-09' },
      { nome: 'Barts Col', url: 'https://www.solarissport.com/products/108-1' },
    ],

    // Maglia tecnica maniche corte — usata con temperature miti o calde
    maglia_corta: [
      { nome: 'Adidas Own The Run Tee', url: 'https://www.solarissport.com/products/hb7448' },
      { nome: 'Asics Icon SS Top', url: 'https://www.solarissport.com/products/2011b055-301' },
      { nome: 'New Balance Run T-Shirt', url: 'https://www.solarissport.com/products/mt41253-bk' },
      { nome: 'Under Armour UA HG Armour Comp SS', url: 'https://www.solarissport.com/products/1361518-0100' },
    ],

    // Pantaloncini corti — usati con caldo intenso (oltre 20°C percepiti)
    shorts: [
      { nome: 'Adidas Designed 4 Running', url: 'https://www.solarissport.com/products/h58578' },
      { nome: 'Under Armour UA Run Anywhere Short', url: 'https://www.solarissport.com/products/1376504-0006' },
      { nome: 'Nike Dri-Fit Run Division', url: 'https://www.solarissport.com/products/dm4807-010' },
    ],

    // Calzini tecnici corti — consigliati sempre
    calzini: [
      { nome: 'GM Run Training', url: 'https://www.solarissport.com/products/2404-09' },
      { nome: 'Asics Performance Run Sock Crew', url: 'https://www.solarissport.com/products/3013b002-750' },
      { nome: 'BV Sport Socquette Scrone Evo', url: 'https://www.solarissport.com/products/208-002' },
    ],

    // Leggins corti / shorts compressione — usati con temperature miti (15-20°C)
    leggins_corti: [
      { nome: 'Under Armour HG Armour Lng Shorts', url: 'https://www.solarissport.com/products/1361602-0001' },
      { nome: 'New Balance Q Speed Fuel 2in1 Short', url: 'https://www.solarissport.com/products/ms11279-nse' },
      { nome: 'Nike M NP Brt Short', url: 'https://www.solarissport.com/products/cj4787-010' },
    ],

    // Felpa leggera — consigliata solo con ritmo lento e temperature miti
    felpa: [
      { nome: 'Abbigliamento Uomo Felpe', url: 'https://www.solarissport.com/collections/abbigliamento-uomo-felpe' },
    ],
  },


  // --------------------------------------------------------
  // PRODOTTI DONNA
  // --------------------------------------------------------
  female: {

    // Maglia a maniche lunghe — usata con freddo moderato o fresco
    maglia_lunga: [
      { nome: 'Mizuno Vortex Warmalite HZ Shirt', url: 'https://www.solarissport.com/products/j2gc8734-19' },
      { nome: 'Under Armour UA Outrun The Cold LS', url: 'https://www.solarissport.com/collections/abbigliamento-donna-maglie/products/1373208-0469' },
      { nome: 'Asics Seamless LS', url: 'https://www.solarissport.com/products/134610-0640' },
      { nome: 'Nike W NK ZNL CL Relay Top', url: 'https://www.solarissport.com/products/831514-010' },
    ],

    // Leggins lunghi — usati con freddo moderato o intenso
    leggins_lunghi: [
      { nome: 'Under Armour Heatgear Mesh Legging', url: 'https://www.solarissport.com/collections/abbigliamento-donna-leggings/products/6010009-0008' },
      { nome: 'New Balance AC Legging 25', url: 'https://www.solarissport.com/collections/abbigliamento-donna-leggings/products/wb6160e1-bk' },
      { nome: 'Adidas TF Stash 1/1 L', url: 'https://www.solarissport.com/collections/abbigliamento-donna-leggings/products/it2282' },
      { nome: 'Brooks High Point Tight', url: 'https://www.solarissport.com/collections/abbigliamento-donna-leggings/products/221682-450' },
    ],

    // Guanti — consigliati sotto i 7°C percepiti
    guanti: [
      { nome: 'Kiprun Guanti Running Evolutiv V2', url: 'https://www.decathlon.it/p/guanti-running-adulto-unisex-evolutiv-v2-neri/340804/c382m8759614' },
      { nome: 'Mizuno BT Light Weight Glove', url: 'https://www.solarissport.com/products/73xbk052c-09' },
      { nome: 'Runtastic Sport Gloves', url: 'https://www.solarissport.com/collections/accessori-uomo-guanti/products/rungls1' },
    ],

    // Termica leggera — primo strato con freddo moderato (1-7°C percepiti)
    termica_leggera: [
      { nome: 'Nike W NP Top SS', url: 'https://www.solarissport.com/products/725745-343' },
      { nome: 'Kiprun Maglia Termica Running Skincare', url: 'https://www.decathlon.it/p/maglia-termica-running-donna-kiprun-skincare-nera/336832/c382c382m8751028' },
      { nome: 'Mizuno BT Mid Weight Tee WOS', url: 'https://www.solarissport.com/collections/abbigliamento-donna-t-shirt/products/a2ga0753-01' },
    ],

    // Termica invernale — primo strato con freddo intenso (sotto 0°C percepiti)
    termica_invernale: [
      { nome: 'Under Armour CG Fitted Mock WM', url: 'https://www.solarissport.com/collections/abbigliamento-donna-t-shirt/products/1215968-100' },
      { nome: 'Biotex Manica Lunga 3D', url: 'https://www.biotex.it/shop/it/uomo/211-manica-lunga-3d/116' },
      { nome: 'Mizuno BT Mid W LS C Neck Shirt WOS', url: 'https://www.solarissport.com/collections/abbigliamento-donna-t-shirt/products/73cl151-09' },
    ],

    // Giacca antivento — usata con vento forte o temperature fresche
    antivento: [
      { nome: 'Brooks Run Visible Jacket 2.0', url: 'https://www.solarissport.com/collections/abbigliamento-donna-giacche/products/221689-167' },
      { nome: 'Asics Metarun Waterproof Jacket', url: 'https://www.solarissport.com/collections/abbigliamento-donna-giacche/products/2012d092-500' },
      { nome: 'Brooks High Point Waterproof Jacket', url: 'https://www.solarissport.com/collections/abbigliamento-donna-giacche/products/221608-761' },
    ],

    // Giacca impermeabile — consigliata quando piove
    impermeabile: [
      { nome: 'Adidas W MT 2L Rain JK', url: 'https://www.solarissport.com/collections/abbigliamento-donna-giacche/products/jn8813' },
      { nome: 'Brooks High Point Waterproof Jacket', url: 'https://www.solarissport.com/collections/abbigliamento-donna-giacche/products/221608-761' },
      { nome: 'Asics Metarun Waterproof Jacket', url: 'https://www.solarissport.com/collections/abbigliamento-donna-giacche/products/2012d092-500' },
    ],

    // Cappello / fascia orecchie — consigliata sotto i 4°C percepiti
    cappello: [
      { nome: 'Mizuno BT Headband', url: 'https://www.solarissport.com/products/a2gw9552-09' },
      { nome: 'Kiprun Fascia Running Unisex', url: 'https://www.decathlon.it/p/fascia-running-adulto-unisex-nera/352680/c382m8871353' },
      { nome: 'Kiprun Berretto Running Warm+ V2', url: 'https://www.decathlon.it/p/berretto-running-adulto-warm-v2-nero/352660/c382m8871314' },
    ],

    // Scaldacollo — consigliato con freddo intenso (sotto 0°C percepiti)
    scaldacollo: [
      { nome: 'Mizuno BT Neck Warmer Panel', url: 'https://www.solarissport.com/products/a2gwa570-09' },
      { nome: 'Barts Col', url: 'https://www.solarissport.com/products/108-1' },
    ],

    // Maglia tecnica maniche corte — usata con temperature miti o calde
    maglia_corta: [
      { nome: 'New Balance Sports Essentials T-Shirt', url: 'https://www.solarissport.com/collections/abbigliamento-donna-t-shirt/products/wt41222-afg' },
      { nome: 'Under Armour UA Velociti Shortsleeve', url: 'https://www.solarissport.com/collections/abbigliamento-donna-t-shirt/products/6009540-0824' },
      { nome: 'Under Armour Tech Knockout Tank', url: 'https://www.solarissport.com/collections/abbigliamento-donna-t-shirt/products/1389851-0498' },
    ],

    // Pantaloncini corti — usati con caldo intenso (oltre 20°C percepiti)
    shorts: [
      { nome: 'New Balance Sport Essentials 2-in-1 Short', url: 'https://www.solarissport.com/collections/abbigliamento-donna-pantaloni/products/ws41225-bk' },
      { nome: 'Under Armour UA Fly By 3in Shorts', url: 'https://www.solarissport.com/collections/abbigliamento-donna-pantaloni/products/1382438-0520' },
      { nome: 'Asics Nagino Run Adjustable 4in Short', url: 'https://www.solarissport.com/collections/abbigliamento-donna-pantaloni/products/2012d141-500' },
    ],

    // Calzini tecnici corti — consigliati sempre
    calzini: [
      { nome: 'GM Run Training', url: 'https://www.solarissport.com/products/2404-09' },
      { nome: 'BV Sport Socquette Californie', url: 'https://www.solarissport.com/products/292-039' },
      { nome: 'BV Sport Socquette Scrone Evo', url: 'https://www.solarissport.com/products/208-002' },
    ],

    // Leggins corti / shorts compressione — usati con temperature miti (15-20°C)
    leggins_corti: [
      { nome: 'Adidas ESS Shorts', url: 'https://www.solarissport.com/collections/abbigliamento-donna-pantaloni/products/jy0079' },
      { nome: 'Under Armour UA Velociti 6in Fitted Short', url: 'https://www.solarissport.com/collections/abbigliamento-donna-pantaloni/products/6009498-0001' },
      { nome: 'New Balance NB Harmony High Rise Short 6', url: 'https://www.solarissport.com/collections/abbigliamento-donna-pantaloni/products/ws51114-abj' },
    ],

    // Top sportivo — strato base per le donne con temperature miti o calde
    top: [
      { nome: 'Freddy Top', url: 'https://www.solarissport.com/products/s9wtbb1-n' },
      { nome: 'New Balance Shape Shield Crop Bra', url: 'https://www.solarissport.com/products/wb21110-bk' },
      { nome: 'Under Armour UA Crossback Mid Bra', url: 'https://www.solarissport.com/products/1361034-0695' },
    ],

    // Felpa leggera — consigliata solo con ritmo lento e temperature miti
    felpa: [
      { nome: 'Abbigliamento Donna Felpe', url: 'https://www.solarissport.com/collections/abbigliamento-donna-felpe' },
    ],
  }
};


// ============================================================
// FUNZIONE: windChill
// ============================================================
// Calcola la temperatura percepita tenendo conto del vento.
// Usa la formula ufficiale adottata da Environment Canada e dal
// National Weather Service americano.
//
// Parametri:
//   t = temperatura dell'aria in gradi Celsius
//   v = velocità del vento in km/h
//
// Restituisce la temperatura percepita arrotondata al grado intero
// ============================================================
function windChill(t, v) {

  // La formula è valida solo con vento superiore a 4.8 km/h e temperatura
  // sotto i 10°C. Fuori da questi limiti la percepita coincide con la reale.
  if (v < 4.8 || t > 10) return t;

  // Math.pow(v, 0.16) = v elevato alla potenza 0.16
  // Math.round() arrotonda al numero intero più vicino
  return Math.round(13.12 + 0.6215*t - 11.37*Math.pow(v,0.16) + 0.3965*t*Math.pow(v,0.16));
}


// ============================================================
// FUNZIONE: computeOutfit
// ============================================================
// Il "cervello" dell'app. Riceve tutti i dati inseriti dall'utente
// e restituisce la lista dei capi da indossare con i relativi
// prodotti linkati, e le note aggiuntive.
//
// Parametri:
//   temp        = temperatura aria in °C
//   wind        = vento in km/h
//   humidity    = umidità in %
//   duration    = durata uscita in minuti
//   sensitivity = sensibilità al freddo: 'cold', 'normal', 'warm'
//   intensity   = intensità: 'slow', 'medium', 'fast', 'intervals'
//   sky         = cielo: 'cloudy', 'sunny', 'rain'
//   gender      = sesso: 'male', 'female'
//
// Restituisce un oggetto con:
//   items     = array di capi (icona + etichetta + array prodotti)
//   notes     = array di consigli aggiuntivi
//   perceived = temperatura percepita durante la corsa
//   wc        = temperatura percepita con il solo wind chill
// ============================================================
function computeOutfit(temp, wind, humidity, duration, sensitivity, intensity, sky, gender) {

  // PASSO 1: calcoliamo il wind chill
  const wc = windChill(temp, wind);

  // PASSO 2: offset in base alle caratteristiche personali e dell'allenamento.
  // L'operatore ternario "condizione ? valore_se_vero : valore_se_falso"
  // è un if/else compatto su una sola riga.

  // Sensibilità al freddo: freddoloso = -3°C, calorifero = +3°C
  const sensOffset = sensitivity === 'cold' ? -3 : sensitivity === 'warm' ? +3 : 0;

  // Intensità: veloce = +4°C, medio/ripetute = 0°C, lento = -2°C
  // "||" significa "oppure"
  const intOffset = intensity === 'fast' ? +4 : intensity === 'medium' || intensity === 'intervals' ? 0 : -2;

  // Durata: oltre 90 minuti il corpo si scalda progressivamente
  const durOffset = duration >= 90 ? -1 : 0;

  // PASSO 3: temperatura effettiva percepita durante la corsa
  const perceived = wc + sensOffset + intOffset + durOffset;

  // PASSO 4: selezioniamo i prodotti del genere corretto.
  // "P" è una scorciatoia per PRODOTTI[gender] — evita di riscriverlo ogni volta.
  // Se gender è 'male' → P = PRODOTTI.male
  // Se gender è 'female' → P = PRODOTTI.female
  const P = PRODOTTI[gender];

  // Array vuoti da riempire con i risultati.
  // Ogni elemento di "items" ha tre proprietà:
  //   icon     = emoji del capo
  //   label    = nome del capo
  //   products = array di prodotti specifici con nome e url (da PRODOTTI)
  const items = [];
  const notes = [];


  // ============================================================
  // PASSO 5: LOGICA ABBIGLIAMENTO
  // Scegliamo i capi in base alla temperatura percepita.
  // Per ogni capo passiamo i prodotti corrispondenti dalla
  // costante PRODOTTI definita in cima al file.
  // ============================================================

  if (perceived <= 0) {
    // FREDDO INTENSO: tutti gli strati, protezione completa
    items.push({ icon: '🧥', label: 'Termica invernale', products: P.termica_invernale });
    items.push({ icon: '👕', label: 'Maglia maniche lunghe', products: P.maglia_lunga });
    items.push({ icon: '🌬️', label: 'Giacca antivento', products: P.antivento });
    items.push({ icon: '👖', label: 'Leggins invernali', products: P.leggins_lunghi });
    items.push({ icon: '🧦', label: 'Calzini tecnici', products: P.calzini });
    items.push({ icon: '🧤', label: 'Guanti', products: P.guanti });
    items.push({ icon: '🧣', label: 'Scaldacollo', products: P.scaldacollo });
    items.push({ icon: '🧢', label: 'Berretto / fascia orecchie', products: P.cappello });
    if (perceived <= -8) notes.push('Con freddo estremo valuta una doppia termica o gilet isolante.');

  } else if (perceived <= 7) {
    // FREDDO MODERATO: termica leggera, guanti consigliati
    items.push({ icon: '🧥', label: 'Termica leggera', products: P.termica_leggera });
    items.push({ icon: '👕', label: 'Maglia maniche lunghe', products: P.maglia_lunga });
    // Antivento solo con vento forte (oltre 20 km/h)
    if (wind > 20) items.push({ icon: '🌬️', label: 'Antivento leggero', products: P.antivento });
    items.push({ icon: '👖', label: 'Leggins lunghi', products: P.leggins_lunghi });
    items.push({ icon: '🧦', label: 'Calzini tecnici', products: P.calzini });
    items.push({ icon: '🧤', label: 'Guanti leggeri', products: P.guanti });
    // Fascia orecchie solo sotto i 4°C
    if (perceived < 4) items.push({ icon: '🧢', label: 'Fascia orecchie', products: P.cappello });

  } else if (perceived <= 14) {
    // FRESCO: maglia lunga e leggins, guanti solo se abbastanza fresco
    items.push({ icon: '👕', label: 'Maglia maniche lunghe', products: P.maglia_lunga });
    // Antivento con vento moderato (oltre 15 km/h)
    if (wind > 15) items.push({ icon: '🌬️', label: 'Antivento leggero', products: P.antivento });
    items.push({ icon: '👖', label: 'Leggins 3/4 o lunghi', products: P.leggins_lunghi });
    items.push({ icon: '🧦', label: 'Calzini tecnici', products: P.calzini });
    // Guanti solo sotto gli 11°C
    if (perceived < 11) items.push({ icon: '🧤', label: 'Guanti sottili', products: P.guanti });

  } else if (perceived <= 20) {
    // MITE: abbigliamento leggero, top per le donne
    if (gender === 'female') {
      items.push({ icon: '👙', label: 'Top sportivo', products: P.top });
      // "!==" significa "diverso da"
      // Se non è calorifero, aggiunge la maglia sopra il top
      if (sensitivity !== 'warm') items.push({ icon: '👕', label: 'Maglia tecnica maniche corte', products: P.maglia_corta });
    } else {
      items.push({ icon: '👕', label: 'Maglia tecnica maniche corte', products: P.maglia_corta });
    }
    // Chi va piano aggiunge una felpa per non raffreddarsi
    if (intensity === 'slow') items.push({ icon: '🧥', label: 'Felpa leggera', products: P.felpa });
    items.push({ icon: '🩳', label: 'Shorts o leggins corti', products: P.leggins_corti });
    items.push({ icon: '🧦', label: 'Calzini tecnici corti', products: P.calzini });

  } else {
    // CALDO: abbigliamento minimo
    if (gender === 'female') {
      items.push({ icon: '👙', label: 'Top sportivo', products: P.top });
      // Solo le donne freddolose aggiungono la maglia col caldo
      if (sensitivity === 'cold') items.push({ icon: '👕', label: 'Maglia tecnica maniche corte', products: P.maglia_corta });
    } else {
      items.push({ icon: '👕', label: 'Maglia tecnica maniche corte', products: P.maglia_corta });
    }
    items.push({ icon: '🩳', label: 'Shorts', products: P.shorts });
    items.push({ icon: '🧦', label: 'Calzini tecnici corti', products: P.calzini });
    if (perceived >= 27) notes.push('Caldo intenso: porta acqua e corri nelle ore più fresche.');
  }


  // ============================================================
  // PASSO 6: NOTE AGGIUNTIVE
  // ============================================================

  // Pioggia: aggiungiamo impermeabile e nota
  if (sky === 'rain') {
    items.push({ icon: '🌧️', label: 'Giacca impermeabile', products: P.impermeabile });
    notes.push('Con la pioggia aggiungi sempre uno strato impermeabile sopra.');
  }

  // Sole: cappellino e crema solare sempre consigliati
  if (sky === 'sunny') {
    notes.push('Sole diretto: cappellino con visiera e protezione solare consigliati.');
  }

  // Umidità alta + caldo: meglio tessuti tecnici traspiranti
  if (humidity >= 80 && temp >= 15) {
    notes.push('Alta umidità percepita: preferisci tessuti che evaporano rapidamente.');
  }

  // Caldo: rischio attrito, consigliamo crema antisfregamento
  if (perceived >= 18) {
    notes.push('Caldo e attrito: applica crema antisfregamento su cosce e ascelle.');
  }

  // Uscita lunga: il corpo si scalda, meglio strati rimovibili
  if (duration >= 90) {
    notes.push('Uscita lunga: potresti scaldarti in corsa, valuta strati rimovibili.');
  }

  // Ripetute: consiglio valido solo quando non fa caldo
  if (intensity === 'intervals' && perceived < 18) {
    notes.push('Ripetute con pause: durante le soste il corpo si raffredda rapidamente, tieni un capo extra con te da indossare nelle pause.');
  }

  // PASSO 7: restituiamo i risultati.
  // La sintassi { items, notes, perceived, wc } è una scorciatoia JavaScript
  // equivalente a { items: items, notes: notes, perceived: perceived, wc: wc }
  return { items, notes, perceived, wc };
}


// ============================================================
// COMPONENTE: PillGroup
// ============================================================
// Mostra un gruppo di bottoni selezionabili (le "pillole").
// Usato per: Uomo/Donna, Freddoloso/Normale/Calorifero, ecc.
//
// Props ricevute:
//   options  = array di opzioni, ognuna con { value, label }
//   value    = valore attualmente selezionato
//   onChange = funzione da chiamare quando si cambia selezione
// ============================================================
function PillGroup({ options, value, onChange }) {
  return (
    <div className="pill-group">
      {/* .map() itera sull'array e per ogni elemento restituisce un bottone.
          La classe "active" viene aggiunta solo al bottone selezionato.
          "===" significa "strettamente uguale a" in JavaScript. */}
      {options.map(o => (
        <button
          key={o.value}
          className={`pill ${value === o.value ? 'active' : ''}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}


// ============================================================
// COMPONENTE: SliderRow
// ============================================================
// Mostra una riga con icona, etichetta, cursore scorrevole e valore.
// Usato per temperatura, vento, umidità e durata.
//
// Props ricevute:
//   icon     = emoji a sinistra
//   label    = testo descrittivo
//   min/max  = limiti del cursore
//   step     = incremento (es. 1 = va di grado in grado)
//   value    = valore attuale
//   unit     = unità di misura (es. "°C")
//   onChange = funzione chiamata quando il cursore si sposta
// ============================================================
function SliderRow({ icon, label, min, max, step, value, unit, onChange }) {
  return (
    <div className="row-input">
      <label>{icon} {label}</label>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
      {/* "e" è l'evento del browser generato quando il cursore si sposta.
          "e.target.value" è il nuovo valore come stringa di testo.
          Number(...) lo converte in numero per i calcoli matematici. */}
      <span className="val">{value}{unit}</span>
    </div>
  );
}


// ============================================================
// COMPONENTE: ItemCard
// ============================================================
// Mostra un singolo capo consigliato con i relativi prodotti
// specifici cliccabili che portano al sito Solaris.
//
// Props ricevute:
//   icon     = emoji del capo (es. 🧥)
//   label    = nome del capo (es. "Termica invernale")
//   products = array di prodotti specifici, ognuno con { nome, url }
// ============================================================
function ItemCard({ icon, label, products }) {
  return (
    <div className="item-card">

      {/* Intestazione del capo con icona e nome */}
      <div className="item-header">
        <span className="item-icon">{icon}</span>
        <span className="item-label">{label}</span>
      </div>

      {/* Lista dei prodotti specifici — ognuno è un link cliccabile.
          .map() itera sull'array products e per ogni prodotto crea un link.
          - href={p.url} = indirizzo del prodotto su Solaris
          - target="_blank" = apre in una nuova scheda del browser
          - rel="noopener noreferrer" = misura di sicurezza per link esterni */}
      <div className="item-products">
        {products.map((p, i) => (
            <a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="product-link"
          >
            🛒 {p.nome}
          </a>
        ))}
      </div>
    </div>
  );
}


// ============================================================
// COMPONENTE PRINCIPALE: App
// ============================================================
// Gestisce tutto lo stato dell'app e mostra l'interfaccia completa.
// "export default" = questo è il componente principale del file.
// ============================================================
export default function App() {

  // ============================================================
  // STATO con useState
  // ============================================================
  // useState(valoreIniziale) restituisce [variabile, funzionePerAggiornarla].
  // Ogni aggiornamento ridisegna automaticamente l'interfaccia.
  // ============================================================

  const [gender, setGender] = useState('male');
  // 'male' o 'female' — valore iniziale: 'male'

  const [sensitivity, setSensitivity] = useState('normal');
  // 'cold', 'normal' o 'warm' — valore iniziale: 'normal'

  const [intensity, setIntensity] = useState('medium');
  // 'slow', 'medium', 'fast', 'intervals' — valore iniziale: 'medium'

  const [duration, setDuration] = useState(45);
  // durata in minuti — valore iniziale: 45

  const [temp, setTemp] = useState(5);
  // temperatura in °C — valore iniziale: 5

  const [wind, setWind] = useState(12);
  // vento in km/h — valore iniziale: 12

  const [humidity, setHumidity] = useState(60);
  // umidità in % — valore iniziale: 60

  const [sky, setSky] = useState('cloudy');
  // 'cloudy', 'sunny', 'rain' — valore iniziale: 'cloudy'


  // ============================================================
  // CALCOLO CONSIGLI
  // ============================================================
  // Ogni volta che uno stato cambia React riesegue questa funzione
  // e ricalcola tutto con i valori aggiornati.
  // Il "destructuring" estrae le quattro proprietà restituite
  // da computeOutfit in variabili separate.
  // ============================================================
  const { items, notes, perceived, wc } = computeOutfit(
    temp, wind, humidity, duration, sensitivity, intensity, sky, gender
  );

  // Testo descrittivo della temperatura per il riquadro dei consigli
  const wcLabel = temp !== wc
    ? `percepita meteo ${wc}°C, effettiva corsa ~${perceived}°C`
    : `effettiva corsa ~${perceived}°C`;


  // ============================================================
  // INTERFACCIA (JSX)
  // ============================================================
  // JSX sembra HTML ma è JavaScript. Differenze principali:
  //   - "className" invece di "class" (class è parola riservata in JS)
  //   - Espressioni JavaScript tra parentesi graffe { }
  //   - Commenti si scrivono {/* così */} dentro il JSX
  // ============================================================
  return (
    <div className="app">
      <h1>🏃 RunWear</h1>
      <p className="subtitle">Cosa indossare per la tua uscita</p>

      {/* Sezione sesso */}
      <section>
        <p className="section-label">Sei</p>
        <PillGroup
          options={[
            { value: 'male', label: '👨 Uomo' },
            { value: 'female', label: '👩 Donna' },
          ]}
          value={gender}
          onChange={setGender}
        />
      </section>

      {/* Sezione sensibilità al freddo */}
      <section>
        <p className="section-label">Come senti il freddo?</p>
        <PillGroup
          options={[
            { value: 'cold', label: 'Freddoloso' },
            { value: 'normal', label: 'Normale' },
            { value: 'warm', label: 'Calorifero' },
          ]}
          value={sensitivity}
          onChange={setSensitivity}
        />
      </section>

      {/* Sezione intensità allenamento */}
      <section>
        <p className="section-label">Intensità allenamento</p>
        <PillGroup
          options={[
            { value: 'slow', label: 'Lento / rigenerativo' },
            { value: 'medium', label: 'Medio' },
            { value: 'fast', label: 'Veloce' },
            { value: 'intervals', label: 'Ripetute con pause' },
          ]}
          value={intensity}
          onChange={setIntensity}
        />
      </section>

      {/* Cursori per i parametri numerici */}
      <SliderRow icon="⏱️" label="Durata uscita" min={15} max={180} step={5}
        value={duration} unit=" min" onChange={setDuration} />

      <hr />

      <SliderRow icon="🌡️" label="Temperatura aria" min={-15} max={30} step={1}
        value={temp} unit="°C" onChange={setTemp} />

      <SliderRow icon="💨" label="Vento" min={0} max={60} step={1}
        value={wind} unit=" km/h" onChange={setWind} />

      <SliderRow icon="💧" label="Umidità" min={0} max={100} step={5}
        value={humidity} unit="%" onChange={setHumidity} />

      {/* Sezione condizioni cielo */}
      <section>
        <p className="section-label">Condizioni cielo</p>
        <PillGroup
          options={[
            { value: 'cloudy', label: '☁️ Nuvoloso' },
            { value: 'sunny', label: '☀️ Sole' },
            { value: 'rain', label: '🌧️ Pioggia' },
          ]}
          value={sky}
          onChange={setSky}
        />
      </section>

      {/* Riquadro finale con i consigli */}
      <div className="advice-card">
        <p className="advice-meta">Temperatura {temp}°C — {wcLabel}</p>
        <p className="section-label">Cosa indossare</p>

        {/* Per ogni capo consigliato mostriamo un ItemCard con i prodotti specifici.
            .map() itera sull'array items e per ogni elemento crea un componente ItemCard.
            "i" è l'indice numerico usato come key univoca per React. */}
        <div className="items-list">
          {items.map((item, i) => (
            <ItemCard
              key={i}
              icon={item.icon}
              label={item.label}
              products={item.products}
            />
          ))}
        </div>

        {/* Mostriamo le note solo se ce ne sono.
            "notes.length > 0" è true se c'è almeno un elemento nell'array.
            "&&" in JSX = "se vero, mostra questo elemento" */}
        {notes.length > 0 && (
          <div className="notes">
            {notes.map((n, i) => <p key={i}>💡 {n}</p>)}
          </div>
        )}

        {/* Badge Solaris in fondo al riquadro */}
        <p className="solaris-badge">
          Powered by <a href="https://www.solarissport.com" target="_blank" rel="noopener noreferrer">Solaris Sport</a>
        </p>
      </div>
    </div>
  );
}