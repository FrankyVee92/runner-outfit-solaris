// ============================================================
// IMPORTAZIONI
// ============================================================

// Importiamo React e useState per gestire lo stato dell'app.
// useState crea variabili "reattive": quando cambiano, React
// aggiorna automaticamente l'interfaccia senza fare nulla manualmente.
import React, { useState } from 'react';

// Importiamo il file CSS per gli stili grafici
import './App.css';

// Importiamo la gestione dei PDF
import jsPDF from 'jspdf';

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
      { nome: 'Fessura Shirt T-01', url: 'https://www.fessura.com/products/shirt-t-01', sconto: 'MASSIMI20' },
      { nome: 'Adidas Own The Run Tee', url: 'https://www.solarissport.com/products/hb7448' },
      { nome: 'Asics Icon SS Top', url: 'https://www.solarissport.com/products/2011b055-301' },
      { nome: 'New Balance Run T-Shirt', url: 'https://www.solarissport.com/products/mt41253-bk' },
      { nome: 'Under Armour UA HG Armour Comp SS', url: 'https://www.solarissport.com/products/1361518-0100' },
    ],

    // Pantaloncini corti — usati con caldo intenso (oltre 20°C percepiti)
    shorts: [
      { nome: 'Fessura Kit304', url: 'https://www.fessura.com/products/kit304-6-26i-kit30401-0', sconto: 'MASSIMI20' },
      { nome: 'Adidas Designed 4 Running', url: 'https://www.solarissport.com/products/h58578' },
      { nome: 'Under Armour UA Run Anywhere Short', url: 'https://www.solarissport.com/products/1376504-0006' },
      { nome: 'Nike Dri-Fit Run Division', url: 'https://www.solarissport.com/products/dm4807-010' },
    ],

    // Calzini tecnici corti — consigliati sempre
    calzini: [
      { nome: 'Fessura Socks T-01', url: 'https://www.fessura.com/products/socks-t-01', sconto: 'MASSIMI20' },
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
      { nome: 'Fessura Shirt T-01', url: 'https://www.fessura.com/products/shirt-t-01', sconto: 'MASSIMI20' },
      { nome: 'New Balance Sports Essentials T-Shirt', url: 'https://www.solarissport.com/collections/abbigliamento-donna-t-shirt/products/wt41222-afg' },
      { nome: 'Under Armour UA Velociti Shortsleeve', url: 'https://www.solarissport.com/collections/abbigliamento-donna-t-shirt/products/6009540-0824' },
      { nome: 'Under Armour Tech Knockout Tank', url: 'https://www.solarissport.com/collections/abbigliamento-donna-t-shirt/products/1389851-0498' },
    ],

    // Pantaloncini corti — usati con caldo intenso (oltre 20°C percepiti)
    shorts: [
      { nome: 'Fessura Kit304', url: 'https://www.fessura.com/products/kit304-6-26i-kit30401-0', sconto: 'MASSIMI20' },
      { nome: 'New Balance Sport Essentials 2-in-1 Short', url: 'https://www.solarissport.com/collections/abbigliamento-donna-pantaloni/products/ws41225-bk' },
      { nome: 'Under Armour UA Fly By 3in Shorts', url: 'https://www.solarissport.com/collections/abbigliamento-donna-pantaloni/products/1382438-0520' },
      { nome: 'Asics Nagino Run Adjustable 4in Short', url: 'https://www.solarissport.com/collections/abbigliamento-donna-pantaloni/products/2012d141-500' },
    ],

    // Calzini tecnici corti — consigliati sempre
    calzini: [
      { nome: 'Fessura Socks T-01', url: 'https://www.fessura.com/products/socks-t-01', sconto: 'MASSIMI20' },
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
// *** AREA AGGIORNAMENTO SCARPE ***
// ============================================================
// Qui trovi le scarpe consigliate divise per genere e per
// tipo di allenamento. La logica è:
//   slow      = lento/rigenerativo → scarpe molto ammortizzate
//   medium    = ritmo medio → scarpe reattive e versatili
//   fast      = veloce → scarpe performanti leggere
//   intervals = ripetute o gara → scarpe con piastra in carbonio
//
// Come aggiornare:
//   Modifica nome e url dei prodotti senza toccare il resto.
// ============================================================

const SCARPE = {

  // --------------------------------------------------------
  // SCARPE UOMO
  // --------------------------------------------------------
  male: {

    // Lento / rigenerativo — massima ammortizzazione per recupero
    slow: [
      { nome: 'Fessura Speed 01 Jacquard Navy', url: 'https://www.fessura.com/products/speed-01-jacquard-navy', sconto: 'MASSIMI20' },
      { nome: 'Brooks Ghost 17', url: 'https://www.solarissport.com/products/1104421d-454' },
      { nome: 'Asics Gel-Nimbus 27', url: 'https://www.solarissport.com/products/1011b958-006' },
      { nome: 'New Balance 1080', url: 'https://www.solarissport.com/products/m1080-8mp' },
    ],

    // Medio — scarpe reattive e versatili per allenamenti quotidiani
    medium: [
      { nome: 'Fessura Speed 05 Violet', url: 'https://www.fessura.com/products/speed-05-violet', sconto: 'MASSIMI20' },
      { nome: 'Asics Novablast 5', url: 'https://www.solarissport.com/products/1011b974-300' },
      { nome: 'Hoka Mach 6', url: 'https://www.cisalfasport.it/it-it/hoka/scarpe-running-mach-6-m-S5881546.html' },
      { nome: 'New Balance FuelCell Rebel V5', url: 'https://www.cisalfasport.it/it-it/new-balance/scarpe-running-fuelcell-rebel-v5-m-S5943593.html' },
    ],

    // Veloce — scarpe leggere e performanti per ritmi sostenuti
    fast: [
      { nome: 'Fessura Race 3 Violet', url: 'https://www.fessura.com/products/race-3-violet', sconto: 'MASSIMI20' },
      { nome: 'Saucony Endorphin Speed 5', url: 'https://www.solarissport.com/products/s21007-285' },
      { nome: 'Hoka Mach 7', url: 'https://www.cisalfasport.it/it-it/hoka/scarpe-running-mach-7-m-S5984553.html' },
      { nome: 'Adidas SL Evo', url: 'https://www.solarissport.com/products/jp7149' },
    ],

    // Ripetute o gara — scarpe con piastra in carbonio per massima velocità
    intervals: [
      { nome: 'Fessura Race 01 Team', url: 'https://www.fessura.com/products/race-01-team', sconto: 'MASSIMI20' },
      { nome: 'Saucony Endorphin Pro 5', url: 'https://www.cisalfasport.it/it-it/saucony/scarpe-running-endorphin-pro-5-m-S5992547.html' },
      { nome: 'Adidas Adizero Adios Pro 4', url: 'https://www.cisalfasport.it/it-it/adidas/scarpe-running-adizero-adios-pro-4-m-S5958346%7CUNI%7C9.html' },
      { nome: 'Asics Metaspeed Sky', url: 'https://www.cisalfasport.it/it-it/asics/scarpe-running-metaspeed-sky-tokyo-m-S5934864%7C300%7C9H.html' },
    ],
  },

  // --------------------------------------------------------
  // SCARPE DONNA
  // --------------------------------------------------------
  female: {

    // Lento / rigenerativo — massima ammortizzazione per recupero
    slow: [
      { nome: 'Fessura Speed 01 Jacquard Navy', url: 'https://www.fessura.com/products/speed-01-jacquard-navy', sconto: 'MASSIMI20' },
      { nome: 'Brooks Ghost 17', url: 'https://www.solarissport.com/products/1104421d-454' },
      { nome: 'Asics Gel-Nimbus 27', url: 'https://www.solarissport.com/products/1012b753-300' },
      { nome: 'New Balance 1080', url: 'https://www.solarissport.com/collections/scarpa-donna-running/products/w1080-815' },
    ],

    // Medio — scarpe reattive e versatili per allenamenti quotidiani
    medium: [
      { nome: 'Fessura Speed 05 Violet', url: 'https://www.fessura.com/products/speed-05-violet', sconto: 'MASSIMI20' },
      { nome: 'Asics Novablast 5', url: 'https://www.solarissport.com/products/1011b974-300' },
      { nome: 'Hoka Mach 6', url: 'https://www.cisalfasport.it/it-it/hoka/scarpe-running-mach-6-w-S5881558.html' },
      { nome: 'New Balance FuelCell Rebel V5', url: 'https://www.cisalfasport.it/it-it/new-balance/scarpe-running-fuelcell-rebel-v5-w-S5944429.html' },
    ],

    // Veloce — scarpe leggere e performanti per ritmi sostenuti
    fast: [
      { nome: 'Fessura Race 3 Violet', url: 'https://www.fessura.com/products/race-3-violet', sconto: 'MASSIMI20' },
      { nome: 'Saucony Endorphin Speed 5', url: 'https://www.solarissport.com/products/s21007-285' },
      { nome: 'Hoka Mach 7', url: 'https://www.cisalfasport.it/it-it/hoka/scarpe-running-mach-7-w-S5984606.html' },
      { nome: 'Adidas SL Evo', url: 'https://www.solarissport.com/products/jh6208' },
    ],

    // Ripetute o gara — scarpe con piastra in carbonio per massima velocità
    intervals: [
      { nome: 'Fessura Race 01 Team', url: 'https://www.fessura.com/products/race-01-team', sconto: 'MASSIMI20' },
      { nome: 'Saucony Endorphin Pro 5', url: 'https://www.cisalfasport.it/it-it/saucony/scarpe-running-endorphin-pro-5-m-S5992547.html' },
      { nome: 'Adidas Adizero Adios Pro 4', url: 'https://top4running.it/p/adidas-adizero-adios-pro-4-running-shoe-women-js2580' },
      { nome: 'Nike Vaporfly 4', url: 'https://www.cisalfasport.it/it-it/nike/scarpe-running-vaporfly-4-w-S5936574%7C503%7C6.html' },
    ],
  }
};

// ============================================================
// *** AREA AMBASSADOR ***
// ============================================================
// Contiene i dati degli ambassador con codice sconto e link social.
// Per aggiungere un nuovo ambassador aggiungi un nuovo oggetto.
// ============================================================

const AMBASSADOR = {
  fessura: {
    nome: 'Stefano Massimi',
    instagram: 'https://www.instagram.com/s.m.stefanomassimi?igsh=MTl1eWIzZThiM21vNA==',
    codice: 'MASSIMI20',
    brand: 'Fessura'
  }
};


// ============================================================
// *** AREA TEAM DI ESPERTI ***
// ============================================================
// Contiene i dati dei professionisti consigliati dall'app.
//
// Come aggiungere un nuovo professionista:
//   1. Aggiungi un nuovo oggetto dentro TEAM (es. fisioterapista, preparatore)
//   2. Copia la struttura di "nutrizionista" e modifica i valori
//   3. Aggiungi la sezione corrispondente nel JSX in fondo al file
//
// Come aggiornare un professionista esistente:
//   Modifica direttamente i valori qui sotto senza toccare
//   nulla nel resto del codice.
//
// Struttura di ogni professionista:
//   nome            = nome completo con titolo (es. Dott.)
//   ruolo           = specializzazione e struttura di appartenenza
//   instagram_personale = link al profilo Instagram personale
//   instagram_team  = link al profilo Instagram della struttura
//   sito            = link al sito web personale
//   telefono        = numero per prenotare (senza spazi)
//   codice_sconto   = codice da mostrare nel coupon PDF
//   sconto          = percentuale di sconto (es. '10%')
// ============================================================

const TEAM = {

  // Nutrizionista — Manuel Salvadori, Team Performance
  // Visita a Civitanova e in Abruzzo
  // Coupon sconto del 10% generabile direttamente dall'app
  nutrizionista: {
    nome: 'Dott. Manuel Salvadori',
    ruolo: 'Nutrizionista — Team Performance',
    instagram_personale: 'https://www.instagram.com/dr.perf0rmance',
    instagram_team: 'https://www.instagram.com/team.performance.it',
    sito: 'https://www.manuelsalvadori.it',
    // Numero dell'assistente per prenotare gli appuntamenti
    telefono: '3512605230',
    // Codice da presentare in sede per ottenere lo sconto
    codice_sconto: 'FrancescoVergaRunChoice',
    // Percentuale di sconto applicata sulla visita
    sconto: '10%',
  },

  // Nutrizionista — Luca Quagliatini, Team Performance
  // Stesso team di Manuel, stessa segreteria per appuntamenti
  // Coupon sconto del 10% generabile direttamente dall'app
  nutrizionista2: {
    nome: 'Dott. Luca Quagliatini',
    ruolo: 'Nutrizionista — Team Performance',
    instagram_personale: 'https://www.instagram.com/dr.lucaquagliatini?igsh=MTF5eTJzc3JrcmlxcQ==',
    instagram_team: 'https://www.instagram.com/team.performance.it',
    sito: 'https://www.nutridoc.it/nutrizionista/luca-quagliatini',
    telefono: '3512605230',
    codice_sconto: 'FrancescoVergaRunChoice',
    sconto: '10%',
  },

  // Osteopata e Preparatore Atletico — Luca Antonelli, A-Team Running Club
  // Atleta e professionista della performance sportiva
  // Coupon sconto del 10% generabile direttamente dall'app
  osteopata: {
    nome: 'Luca Antonelli',
    ruolo: 'Osteopata & Preparatore Atletico — A-Team Running Club',
    instagram_personale: 'https://www.instagram.com/yourosteorunner_?igsh=amxja2M5dXZsYTVq',
    // Link Instagram del team A-Team Running Club
    instagram_team: 'https://www.instagram.com/a_team_runningclub?igsh=Z25wMnN2OGw4bXd3',
    sito: 'https://a-teamcoaching.it/',
    // Numero diretto di Luca per prenotare consulenze
    telefono: '3881846001',
    // Stesso codice sconto dei nutrizionisti
    codice_sconto: 'FrancescoVergaRunChoice',
    sconto: '10%',
  }

};


// ============================================================
// FUNZIONE: generaCouponPDF
// ============================================================
// Genera e scarica automaticamente un coupon PDF con i dati
// del nutrizionista e il codice sconto.
//
// Usa la libreria jsPDF che abbiamo installato con npm.
// jsPDF funziona creando un documento virtuale e aggiungendo
// elementi (testo, immagini, linee) con coordinate x,y in mm.
//
// Il documento è in formato A5 orizzontale (148x210mm) —
// più compatto di un A4, perfetto per un coupon.
// ============================================================
function generaCouponPDF() {

  // Creiamo un nuovo documento PDF
  // 'l' = landscape (orizzontale), 'mm' = millimetri, 'a5' = formato A5
  const doc = new jsPDF('l', 'mm', 'a5');

  // Dimensioni del documento
  const w = doc.internal.pageSize.getWidth();   // larghezza in mm
  const h = doc.internal.pageSize.getHeight();  // altezza in mm

  // Sfondo bianco
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, w, h, 'F');

  // Bordo tratteggiato esterno — simula il bordo del coupon
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);
  doc.setLineDashPattern([3, 2], 0);
  doc.rect(5, 5, w - 10, h - 10);
  doc.setLineDashPattern([], 0);

  // Striscia blu in cima
  doc.setFillColor(21, 101, 192);
  doc.rect(5, 5, w - 10, 8, 'F');

  // Carichiamo i loghi come immagini base64
  // Usiamo un oggetto Image per caricare i file dalla cartella public
  const logoPerf = new Image();
  logoPerf.src = '/logo-performance.png';
  
  const logoRC = new Image();
  logoRC.src = '/logo-runchoice.png';

  // Aspettiamo che entrambe le immagini siano caricate
  // prima di generare il PDF
  Promise.all([
    new Promise(resolve => { logoPerf.onload = resolve; logoPerf.onerror = resolve; }),
    new Promise(resolve => { logoRC.onload = resolve; logoRC.onerror = resolve; })
  ]).then(() => {

    // Logo Performance Center a sinistra
    try { doc.addImage(logoPerf, 'PNG', 8, 15, 100, 25); } catch(e) {}

    // Logo RunChoice a destra
    try { doc.addImage(logoRC, 'PNG', w - 35, 18, 25, 25); } catch(e) {}

    // Titolo coupon
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text('COUPON SCONTO ESCLUSIVO', w / 2, 48, { align: 'center' });

    // Percentuale sconto — grande e in blu
    doc.setFontSize(36);
    doc.setTextColor(21, 101, 192);
    doc.setFont('helvetica', 'bold');
    doc.text(TEAM.nutrizionista.sconto, w / 2, 62, { align: 'center' });

    // Testo sotto la percentuale
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'normal');
    doc.text('sulla tua visita con il Team Performance', w / 2, 70, { align: 'center' });

    // Box codice sconto
    doc.setFillColor(245, 245, 245);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.roundedRect(20, 75, w - 40, 18, 3, 3, 'FD');

    // Etichetta codice
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('CODICE SCONTO', w / 2, 81, { align: 'center' });

    // Codice sconto in blu
    doc.setFontSize(13);
    doc.setTextColor(21, 101, 192);
    doc.setFont('helvetica', 'bold');
    doc.text(TEAM.nutrizionista.codice_sconto, w / 2, 89, { align: 'center' });

    // Linea divisoria tratteggiata
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.setLineDashPattern([2, 2], 0);
    doc.line(10, 98, w - 10, 98);
    doc.setLineDashPattern([], 0);

    // Nome nutrizionista
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'bold');
    doc.text(TEAM.nutrizionista.nome + ' — Nutrizionista', 12, 105);

    // Contatti
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Tel: ' + TEAM.nutrizionista.telefono, 12, 112);

    doc.setTextColor(21, 101, 192);
    doc.text('@dr.perf0rmance', 50, 112);
    doc.text('@team.performance.it', 95, 112);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text('Coupon generato da RunChoice', w / 2, h - 8, { align: 'center' });

    // Scarichiamo il PDF con nome file specifico
    doc.save('coupon-performance-center.pdf');
  });
}

// ============================================================
// FUNZIONE: generaCouponPDFLuca
// ============================================================
// Genera il coupon PDF per Luca Quagliatini.
// Stessa struttura grafica di generaCouponPDF ma con i dati
// di Luca — nome, instagram personale e sito diversi.
// Il resto (logo, codice sconto, telefono) è uguale a Manuel.
// ============================================================
function generaCouponPDFLuca() {

  const doc = new jsPDF('l', 'mm', 'a5');
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, w, h, 'F');

  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);
  doc.setLineDashPattern([3, 2], 0);
  doc.rect(5, 5, w - 10, h - 10);
  doc.setLineDashPattern([], 0);

  doc.setFillColor(21, 101, 192);
  doc.rect(5, 5, w - 10, 8, 'F');

  const logoPerf = new Image();
  logoPerf.src = '/logo-performance.png';

  const logoRC = new Image();
  logoRC.src = '/logo-runchoice.png';

  Promise.all([
    new Promise(resolve => { logoPerf.onload = resolve; logoPerf.onerror = resolve; }),
    new Promise(resolve => { logoRC.onload = resolve; logoRC.onerror = resolve; })
  ]).then(() => {

    try { doc.addImage(logoPerf, 'PNG', 8, 15, 100, 25); } catch(e) {}
    try { doc.addImage(logoRC, 'PNG', w - 35, 18, 25, 25); } catch(e) {}

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text('COUPON SCONTO ESCLUSIVO', w / 2, 48, { align: 'center' });

    doc.setFontSize(36);
    doc.setTextColor(21, 101, 192);
    doc.setFont('helvetica', 'bold');
    doc.text(TEAM.nutrizionista2.sconto, w / 2, 62, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'normal');
    doc.text('sulla tua visita con il Team Performance', w / 2, 70, { align: 'center' });

    doc.setFillColor(245, 245, 245);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.roundedRect(20, 75, w - 40, 18, 3, 3, 'FD');

    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('CODICE SCONTO', w / 2, 81, { align: 'center' });

    doc.setFontSize(13);
    doc.setTextColor(21, 101, 192);
    doc.setFont('helvetica', 'bold');
    doc.text(TEAM.nutrizionista2.codice_sconto, w / 2, 89, { align: 'center' });

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.setLineDashPattern([2, 2], 0);
    doc.line(10, 98, w - 10, 98);
    doc.setLineDashPattern([], 0);

    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'bold');
    doc.text(TEAM.nutrizionista2.nome + ' — Nutrizionista', 12, 105);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Tel: ' + TEAM.nutrizionista2.telefono, 12, 112);

    doc.setTextColor(21, 101, 192);
    doc.text('@dr.lucaquagliatini', 50, 112);
    doc.text('@team.performance.it', 95, 112);

    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text('Coupon generato da RunChoice', w / 2, h - 8, { align: 'center' });

    doc.save('coupon-luca-quagliatini.pdf');
  });
}

// ============================================================
// FUNZIONE: generaCouponPDFAteam
// ============================================================
// Genera il coupon PDF per Luca Antonelli dell'A-Team Running Club.
// Stessa struttura grafica delle altre funzioni coupon ma con:
// - Logo A-Team invece del logo Performance Center
// - Dati di Luca Antonelli (nome, ruolo, instagram, telefono)
// Il codice sconto è lo stesso degli altri professionisti.
// ============================================================
function generaCouponPDFAteam() {

  const doc = new jsPDF('l', 'mm', 'a5');
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  // Sfondo bianco
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, w, h, 'F');

  // Bordo tratteggiato esterno
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);
  doc.setLineDashPattern([3, 2], 0);
  doc.rect(5, 5, w - 10, h - 10);
  doc.setLineDashPattern([], 0);

  // Striscia arancione in cima — colore A-Team
  doc.setFillColor(255, 107, 0);
  doc.rect(5, 5, w - 10, 8, 'F');

  // Carichiamo i loghi
  const logoAteam = new Image();
  logoAteam.src = '/logo-ateam.png';

  const logoRC = new Image();
  logoRC.src = '/logo-runchoice.png';

  Promise.all([
    new Promise(resolve => { logoAteam.onload = resolve; logoAteam.onerror = resolve; }),
    new Promise(resolve => { logoRC.onload = resolve; logoRC.onerror = resolve; })
  ]).then(() => {

    // Logo A-Team a sinistra
    try { doc.addImage(logoAteam, 'PNG', 8, 14, 35, 35); } catch(e) {}

    // Logo RunChoice a destra
    try { doc.addImage(logoRC, 'PNG', w - 35, 18, 25, 25); } catch(e) {}

    // Titolo coupon
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text('COUPON SCONTO ESCLUSIVO', w / 2, 48, { align: 'center' });

    // Percentuale sconto
    doc.setFontSize(36);
    doc.setTextColor(255, 107, 0);
    doc.setFont('helvetica', 'bold');
    doc.text(TEAM.osteopata.sconto, w / 2, 62, { align: 'center' });

    // Testo sotto la percentuale
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'normal');
    doc.text('sulla tua consulenza con A-Team Running Club', w / 2, 70, { align: 'center' });

    // Box codice sconto
    doc.setFillColor(245, 245, 245);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.roundedRect(20, 75, w - 40, 18, 3, 3, 'FD');

    // Etichetta codice
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('CODICE SCONTO', w / 2, 81, { align: 'center' });

    // Codice sconto in arancione
    doc.setFontSize(13);
    doc.setTextColor(255, 107, 0);
    doc.setFont('helvetica', 'bold');
    doc.text(TEAM.osteopata.codice_sconto, w / 2, 89, { align: 'center' });

    // Linea divisoria tratteggiata
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.setLineDashPattern([2, 2], 0);
    doc.line(10, 98, w - 10, 98);
    doc.setLineDashPattern([], 0);

    // Nome e ruolo
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'bold');
    doc.text(TEAM.osteopata.nome + ' — Osteopata & Preparatore Atletico', 12, 105);

    // Contatti
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Tel: ' + TEAM.osteopata.telefono, 12, 112);

    doc.setTextColor(255, 107, 0);
    doc.text('@yourosteorunner_', 50, 112);
    doc.text('a-teamcoaching.it', 100, 112);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text('Coupon generato da RunChoice', w / 2, h - 8, { align: 'center' });

    // Scarichiamo il PDF
    doc.save('coupon-luca-antonelli.pdf');
  });
}


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

  // Carbo/gel: consigliato per allenamenti veloci, ripetute o uscite lunghe (60+ minuti)
  // Questa nota è speciale — ha un link cliccabile, quindi usiamo un oggetto
  // invece di una semplice stringa. La proprietà "link" contiene l'url ambassador.
  if (intensity === 'fast' || intensity === 'intervals' || duration >= 60) {
    notes.push({ 
      testo: '💊 Considera un carbo/gel energetico — usa il codice sconto FRANKY01', 
      linkTesto: '→ Acquista qui',
      linkUrl: 'https://vitastrong.it/it/endurance-energia/391-carbo-gel-21-8055774502917.html'
    });
  }

  // Ripetute: consiglio valido solo quando non fa caldo
  if (intensity === 'intervals' && perceived < 18) {
    notes.push('Ripetute con pause: durante le soste il corpo si raffredda rapidamente, tieni un capo extra con te da indossare nelle pause.');
  }

  // PASSO 7: selezioniamo le scarpe consigliate in base
  // all'intensità dell'allenamento e al genere.
  // "intervals" usa le stesse scarpe sia per ripetute che per gara.
  const scarpe = SCARPE[gender][intensity];

  // PASSO 8: restituiamo i risultati.
  // La sintassi { items, notes, perceived, wc, scarpe } è una scorciatoia JavaScript
  // equivalente a { items: items, notes: notes, perceived: perceived, wc: wc, scarpe:scarpe }
  return { items, notes, perceived, wc, scarpe };
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

      {/* Etichetta con icona e testo descrittivo */}
      <label>{icon} {label}</label>

      {/* Cursore scorrevole.
          "e" è l'evento del browser generato quando il cursore si sposta.
          "e.target.value" è il nuovo valore come stringa di testo.
          Number(...) lo converte in numero per i calcoli matematici. */}
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
      />

      {/* Mostra il valore attuale seguito dall'unità di misura.
          Es. "5°C" oppure "12 km/h" */}
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
      <div className="item-header">
        <span className="item-icon">{icon}</span>
        <span className="item-label">{label}</span>
      </div>
      <div className="item-products">
        {products.map((p, i) => (
          <a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`product-link ${p.sconto ? 'product-link-ambassador' : ''}`}
          >
            <span>🛒 {p.nome}</span>
            {p.sconto && (
          <div className="ambassador-box">
          <span className="badge-sconto">🏷️ Usa il codice: {p.sconto}</span>
            <a
            href={AMBASSADOR.fessura.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="ambassador-link"
            onClick={e => e.stopPropagation()}
          >
      📸 Segui {AMBASSADOR.fessura.nome} su Instagram
    </a>
  </div>
)}
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

  const [gender, setGender] = useState(() => localStorage.getItem('rc_gender') || 'male');
  const [sensitivity, setSensitivity] = useState(() => localStorage.getItem('rc_sensitivity') || 'normal');
  const [intensity, setIntensity] = useState(() => localStorage.getItem('rc_intensity') || 'medium');
  const [duration, setDuration] = useState(() => Number(localStorage.getItem('rc_duration')) || 45);
  const [temp, setTemp] = useState(() => Number(localStorage.getItem('rc_temp')) || 5);
  const [wind, setWind] = useState(() => Number(localStorage.getItem('rc_wind')) || 12);
  const [humidity, setHumidity] = useState(() => Number(localStorage.getItem('rc_humidity')) || 60);
  const [sky, setSky] = useState(() => localStorage.getItem('rc_sky') || 'cloudy');
  // Ora di uscita per il running — usata per le previsioni meteo orarie
  // Valore iniziale: 7 (le 7 di mattina)
  // Salvata nel localStorage così l'utente non la reimposta ogni volta
  const [oraUscita, setOraUscita] = useState(() => Number(localStorage.getItem('rc_ora')) || 7);

  // Stato per il caricamento del meteo — true mentre aspettiamo la risposta
  // di Open-Meteo, false quando i dati sono arrivati o in caso di errore
  const [loadingMeteo, setLoadingMeteo] = useState(false);

  // Messaggio di errore geolocalizzazione — null se tutto ok,
  // stringa con il messaggio di errore in caso di problemi
  const [erroreMeteo, setErroreMeteo] = useState(null);

  // Nome della città rilevata dal GPS — null se non ancora rilevata
  const [citta, setCitta] = useState(null);

  // Modalità di rilevamento posizione — 'gps' o 'manuale'
  // 'gps' = rileva automaticamente tramite GPS
  // 'manuale' = l'utente inserisce la città manualmente
  const [modalitaMeteo, setModalitaMeteo] = useState(() => localStorage.getItem('rc_modalita') || 'gps');

  // Città inserita manualmente dall'utente
  // Usata solo quando modalitaMeteo === 'manuale'
  const [cittaManuale, setCittaManuale] = useState(() => localStorage.getItem('rc_citta_manuale') || '');

  // Giorno di uscita — 'oggi' o 'domani'
  // Permette all'utente di pianificare anche l'uscita del giorno successivo
  // Salvato nel localStorage così l'utente non deve reimpostarlo ogni volta
  const [giornoUscita, setGiornoUscita] = useState(() => localStorage.getItem('rc_giorno') || 'oggi');

  // ============================================================
  // CALCOLO CONSIGLI
  // ============================================================
  // Ogni volta che uno stato cambia React riesegue questa funzione
  // e ricalcola tutto con i valori aggiornati.
  // Il "destructuring" estrae le quattro proprietà restituite
  // da computeOutfit in variabili separate.
  // ============================================================
    // Salva i parametri nel localStorage ogni volta che cambiano
  React.useEffect(() => { localStorage.setItem('rc_gender', gender); }, [gender]);
  React.useEffect(() => { localStorage.setItem('rc_sensitivity', sensitivity); }, [sensitivity]);
  React.useEffect(() => { localStorage.setItem('rc_intensity', intensity); }, [intensity]);
  React.useEffect(() => { localStorage.setItem('rc_duration', duration); }, [duration]);
  React.useEffect(() => { localStorage.setItem('rc_temp', temp); }, [temp]);
  React.useEffect(() => { localStorage.setItem('rc_wind', wind); }, [wind]);
  React.useEffect(() => { localStorage.setItem('rc_humidity', humidity); }, [humidity]);
  React.useEffect(() => { localStorage.setItem('rc_sky', sky); }, [sky]);
  React.useEffect(() => { localStorage.setItem('rc_ora', oraUscita); }, [oraUscita]);
  // Salva la modalità meteo nel localStorage ogni volta che cambia
  React.useEffect(() => { localStorage.setItem('rc_modalita', modalitaMeteo); }, [modalitaMeteo]);

  // Salva la città manuale nel localStorage ogni volta che cambia
  React.useEffect(() => { localStorage.setItem('rc_citta_manuale', cittaManuale); }, [cittaManuale]);
  // Salva il giorno di uscita nel localStorage ogni volta che cambia
  React.useEffect(() => { localStorage.setItem('rc_giorno', giornoUscita); }, [giornoUscita]);

// ============================================================
// FUNZIONE: rilevaMeteomatico
// ============================================================
// Gestisce due modalità di rilevamento meteo:
//
// MODALITÀ GPS:
// 1. Chiede al browser la posizione GPS dell'utente
// 2. Invia le coordinate a Open-Meteo per le previsioni orarie
// 3. Aggiorna temperatura, vento, umidità e cielo automaticamente
//
// MODALITÀ MANUALE:
// 1. Prende la città inserita dall'utente
// 2. Chiama Nominatim per trovare le coordinate della città
// 3. Invia le coordinate a Open-Meteo per le previsioni orarie
// 4. Aggiorna temperatura, vento, umidità e cielo automaticamente
//
// In entrambi i casi mostra il nome della città rilevata.
// ============================================================
async function rilevaMeteomatico() {

  // Impostiamo loadingMeteo a true per mostrare il messaggio di caricamento
  setLoadingMeteo(true);
  setErroreMeteo(null);
  setCitta(null);

  // Funzione interna che prende le coordinate e chiama Open-Meteo
  // È la stessa per GPS e manuale — evita di duplicare il codice
  // "lat" e "lon" sono le coordinate, "nomeCitta" è il nome da mostrare
  async function fetchMeteo(lat, lon, nomeCitta) {
    try {

      // Calcoliamo l'indice corretto nell'array delle previsioni orarie.
      // Open-Meteo restituisce 48 valori (24 per oggi + 24 per domani).
      const offsetGiorno = giornoUscita === 'domani' ? 24 : 0;
      const indice = offsetGiorno + oraUscita;

      // Chiamiamo Open-Meteo con le coordinate e i parametri che ci servono
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,weathercode&timezone=auto&forecast_days=2`;
      const response = await fetch(url);
      const data = await response.json();

      // Estraiamo i valori meteo per l'ora e il giorno scelti
      const temperatura = Math.round(data.hourly.temperature_2m[indice]);
      const vento = Math.round(data.hourly.windspeed_10m[indice]);
      const umidita = Math.round(data.hourly.relativehumidity_2m[indice]);

      // Interpretiamo il weathercode per impostare sky
      // 0-1 = sereno, 2-3 = nuvoloso, 51+ = pioggia
      const weatherCode = data.hourly.weathercode[indice];
      let cielo;
      if (weatherCode <= 1) {
        cielo = 'sunny';
      } else if (weatherCode <= 3) {
        cielo = 'cloudy';
      } else if (weatherCode >= 51) {
        cielo = 'rain';
      } else {
        cielo = 'cloudy';
      }

      // Aggiorniamo tutti i parametri meteo dell'app
      setTemp(temperatura);
      setWind(vento);
      setHumidity(umidita);
      setSky(cielo);
      setCitta(nomeCitta);
      setLoadingMeteo(false);

    } catch (error) {
      // Errore nella chiamata a Open-Meteo
      setErroreMeteo('Errore nel recupero del meteo. Controlla la connessione.');
      setLoadingMeteo(false);
    }
  }

  // ============================================================
  // MODALITÀ MANUALE — l'utente ha inserito una città
  // ============================================================
  if (modalitaMeteo === 'manuale') {

    // Verifichiamo che l'utente abbia inserito qualcosa
    if (!cittaManuale.trim()) {
      setErroreMeteo('Inserisci il nome di una città.');
      setLoadingMeteo(false);
      return;
    }

    try {
      // Chiamiamo Nominatim per trovare le coordinate della città inserita
      // encodeURIComponent converte caratteri speciali per l'URL (es. spazi → %20)
      const geoUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cittaManuale)}&format=json&limit=1`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      // Se Nominatim non trova nessuna città mostriamo un errore
      if (!geoData || geoData.length === 0) {
        setErroreMeteo('Città non trovata. Prova con un nome diverso.');
        setLoadingMeteo(false);
        return;
      }

      // Estraiamo le coordinate del primo risultato trovato
      const lat = parseFloat(geoData[0].lat);
      const lon = parseFloat(geoData[0].lon);
      // Usiamo il nome ufficiale restituito da Nominatim
      const nomeCitta = geoData[0].display_name.split(',')[0];

      // Chiamiamo Open-Meteo con le coordinate trovate
      await fetchMeteo(lat, lon, nomeCitta);

    } catch (error) {
      setErroreMeteo('Errore nella ricerca della città. Controlla la connessione.');
      setLoadingMeteo(false);
    }
    return;
  }

  // ============================================================
  // MODALITÀ GPS — rileviamo la posizione automaticamente
  // ============================================================

  // Verifichiamo che il browser supporti la geolocalizzazione
  if (!navigator.geolocation) {
    setErroreMeteo('Il tuo browser non supporta la geolocalizzazione.');
    setLoadingMeteo(false);
    return;
  }

  // Chiediamo la posizione GPS all'utente
  navigator.geolocation.getCurrentPosition(

    // Callback di successo
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Chiamiamo Nominatim per ottenere il nome della città dalle coordinate
      try {
        const geoUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();
        const nomeCitta = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.county || 'Posizione rilevata';

        // Chiamiamo Open-Meteo con le coordinate GPS
        await fetchMeteo(lat, lon, nomeCitta);

      } catch (error) {
        // Se Nominatim fallisce usiamo le coordinate comunque
        await fetchMeteo(lat, lon, 'Posizione rilevata');
      }
    },

    // Callback di errore GPS
    (error) => {
      setErroreMeteo('Posizione non disponibile. Controlla i permessi GPS.');
      setLoadingMeteo(false);
    }
  );
}

  const { items, notes, perceived, wc, scarpe } = computeOutfit(
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
      <h1>🏃 Running Outfit & Shoes</h1>
      <p className="subtitle">Cosa indossare per la tua uscita</p>

      {/* Banner installazione PWA — visibile solo se l'app è aperta dal browser
      e non è già installata come PWA sulla schermata home */}
      {!window.matchMedia('(display-mode: standalone)').matches && (
      <div className="install-banner">
      <span>📲 Per la migliore esperienza installa l'app!</span>
      <span className="install-hint">Tocca il menu del browser → "Aggiungi a schermata Home"</span>
    </div>
    )}

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
            { value: 'warm', label: 'Caloroso' },
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

      {/* Sezione meteo automatico
          Permette all'utente di scegliere l'ora di uscita e
          rilevare automaticamente le condizioni meteo tramite GPS */}
      <section>
        <p className="section-label">🌤️ Meteo automatico</p>

        {/* Toggle modalità meteo — GPS o inserimento manuale città
            Permette all'utente di scegliere come rilevare il meteo:
            - GPS: rileva automaticamente la posizione
            - Manuale: inserisce il nome della città */}
        <div className="pill-group" style={{marginBottom: '12px'}}>
          <button
            className={`pill ${modalitaMeteo === 'gps' ? 'active' : ''}`}
            onClick={() => { setModalitaMeteo('gps'); setCitta(null); setTemp(5); }}
          >
            📍 GPS automatico
          </button>
          <button
            className={`pill ${modalitaMeteo === 'manuale' ? 'active' : ''}`}
            onClick={() => { setModalitaMeteo('manuale'); setCitta(null); setTemp(5); }}
          >
            🔍 Inserisci città
          </button>
        </div>

        {/* Campo di testo per la città manuale — visibile solo in modalità manuale
            "&&" in JSX = "se vero, mostra questo elemento" */}
        {modalitaMeteo === 'manuale' && (
          <div className="citta-manuale">
            <input
              type="text"
              className="citta-input"
              placeholder="Es. Roma, Milano, Ancona..."
              value={cittaManuale}
              onChange={e => setCittaManuale(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') rilevaMeteomatico(); }}
            />
          </div>
        )}

        {/* Toggle Oggi / Domani — permette all'utente di scegliere
            se vuole il meteo per oggi o per la mattina di domani.
            Usa lo stesso stile delle pill già presenti nell'app */}
        <div className="pill-group" style={{marginBottom: '12px'}}>
          {/* Quando si cambia giorno resettiamo città e temp
              così il messaggio di successo sparisce finché non
              si clicca di nuovo su "Rileva meteo automatico" */}
          <button
            className={`pill ${giornoUscita === 'oggi' ? 'active' : ''}`}
            onClick={() => { setGiornoUscita('oggi'); setCitta(null); setTemp(5); }}
          >
            📅 Oggi
          </button>
          <button
            className={`pill ${giornoUscita === 'domani' ? 'active' : ''}`}
            onClick={() => { setGiornoUscita('domani'); setCitta(null); setTemp(5); }}
          >
            📅 Domani
          </button>
        </div>

        {/* Selettore ora di uscita — l'utente sceglie a che ora vuole correre
            Le opzioni vanno dalle 00 alle 23 con step di 1 ora */}
        <div className="ora-uscita">
          <label className="ora-label">A che ora esci a correre?</label>
          {/* Quando si cambia ora resettiamo città e temp
              così il messaggio di successo sparisce finché non
              si clicca di nuovo su "Rileva meteo automatico" */}
          <select
            className="ora-select"
            value={oraUscita}
            onChange={e => { setOraUscita(Number(e.target.value)); setCitta(null); setTemp(5); }}
          >
            {/* Mostriamo tutte le 24 ore — dai runner mattinieri delle 4
                ai notturni delle 23! Array.from crea un array di 24 elementi
                da 0 a 23 — uno per ogni ora del giorno */}
            {Array.from({ length: 24 }, (_, i) => i).map(ora => (
              <option key={ora} value={ora}>
                {ora}:00
              </option>
            ))}
          </select>
        </div>

        {/* Pulsante per rilevare il meteo automaticamente tramite GPS
            Mentre carica mostra un messaggio di attesa
            onClick chiama la funzione rilevaMeteomatico che abbiamo definito sopra */}
        <button
          className="meteo-button"
          onClick={rilevaMeteomatico}
          disabled={loadingMeteo}
        >
          {/* Se sta caricando mostriamo un messaggio diverso
              L'operatore ternario "condizione ? se_vero : se_falso"
              cambia il testo del pulsante in base allo stato */}
          {loadingMeteo ? '⏳ Rilevamento in corso...' : '📍 Rileva meteo automatico'}
        </button>

        {/* Messaggio di errore — visibile solo se erroreMeteo non è null
            "&&" in JSX = "se vero, mostra questo elemento" */}
        {erroreMeteo && (
          <p className="meteo-errore">⚠️ {erroreMeteo}</p>
        )}

        {/* Messaggio di successo con giorno, ora e città rilevata.
            Mostriamo il messaggio SOLO se citta non è null —
            citta viene impostata solo dopo aver cliccato "Rileva meteo"
            quindi è il modo più affidabile per sapere se il meteo
            è stato effettivamente rilevato in questa sessione */}
        {!loadingMeteo && !erroreMeteo && citta !== null && (
          <p className="meteo-successo">
            ✅ Meteo {giornoUscita} alle {oraUscita}:00 a {citta}!
          </p>
        )}

      </section>

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
            Ogni nota può essere una semplice stringa oppure un oggetto
            con testo + link. Controlliamo con "typeof" che tipo è:
            - typeof n === 'string' → nota semplice, mostriamo solo il testo
            - altrimenti → nota con link, mostriamo testo + link cliccabile */}
        {notes.length > 0 && (
          <div className="notes">
            {notes.map((n, i) => (
              <p key={i}>
                💡 {typeof n === 'string' ? n : (
                  <>
                    {n.testo}{' '}
                      <a
                      href={n.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="note-link"
                    >
                      {n.linkTesto}
                    </a>
                  </>
                )}
              </p>
            ))}
          </div>
        )}

    {/* Sezione scarpe consigliate in base all'intensità */}
        <div className="shoes-section">
          <p className="section-label">👟 Scarpe consigliate</p>
          <div className="item-card">
            <div className="item-products">
              {scarpe.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`product-link ${s.sconto ? 'product-link-ambassador' : ''}`}
                >
                  <span>🛒 {s.nome}</span>
                  {s.sconto && (
                  <div className="ambassador-box">
                    <span className="badge-sconto">🏷️ Usa il codice: {s.sconto}</span>
                      <a
                      href={AMBASSADOR.fessura.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ambassador-link"
                      onClick={e => e.stopPropagation()}
                    >
                      📸 Segui {AMBASSADOR.fessura.nome} su Instagram
                    </a>
                  </div>
                )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sezione Team di Esperti */}
      <div className="team-section">
        <p className="section-label">👨‍⚕️ Il nostro team di esperti</p>

        <div className="team-card">

          {/* Logo e nome del professionista */}
          <div className="team-header">
            <img src="/logo-performance.png" alt="Performance Center" className="team-logo" />
            <div>
              <p className="team-nome">{TEAM.nutrizionista.nome}</p>
              <p className="team-ruolo">{TEAM.nutrizionista.ruolo}</p>
            </div>
          </div>

          {/* Link social e contatti */}
          <div className="team-contacts">
            <a href={TEAM.nutrizionista.instagram_personale} target="_blank" rel="noopener noreferrer" className="team-link">
              📸 @dr.perf0rmance
            </a>
            <a href={TEAM.nutrizionista.instagram_team} target="_blank" rel="noopener noreferrer" className="team-link">
              📸 @team.performance.it
            </a>
            <a href={`tel:${TEAM.nutrizionista.telefono}`} className="team-link">
              📞 351 260 5230
            </a>
            <a href={TEAM.nutrizionista.sito} target="_blank" rel="noopener noreferrer" className="team-link">
              🌐 manuelsalvadori.it
            </a>
          </div>

          {/* Frase coupon e pulsante */}
          <p className="team-coupon-text">
            Prenota la tua visita con il Team Performance e risparmia il 10%!
          </p>
          <button className="coupon-button" onClick={generaCouponPDF}>
            🎟️ Scarica il tuo coupon sconto
          </button>

        </div>
      </div>
      
      {/* Sezione Luca Quagliatini */}
      <div className="team-card" style={{marginTop: '1rem'}}>

        {/* Logo e nome */}
        <div className="team-header">
          <img src="/logo-performance.png" alt="Performance Center" className="team-logo" />
          <div>
            <p className="team-nome">{TEAM.nutrizionista2.nome}</p>
            <p className="team-ruolo">{TEAM.nutrizionista2.ruolo}</p>
          </div>
        </div>

        {/* Link social e contatti */}
        <div className="team-contacts">
          <a href={TEAM.nutrizionista2.instagram_personale} target="_blank" rel="noopener noreferrer" className="team-link">
            📸 @dr.lucaquagliatini
          </a>
          <a href={TEAM.nutrizionista2.instagram_team} target="_blank" rel="noopener noreferrer" className="team-link">
            📸 @team.performance.it
          </a>
          <a href={`tel:${TEAM.nutrizionista2.telefono}`} className="team-link">
            📞 351 260 5230
          </a>
          <a href={TEAM.nutrizionista2.sito} target="_blank" rel="noopener noreferrer" className="team-link">
            🌐 nutridoc.it
          </a>
        </div>

        {/* Frase coupon e pulsante */}
        <p className="team-coupon-text">
          Prenota la tua visita con il Team Performance e risparmia il 10%!
        </p>
        <button className="coupon-button" onClick={generaCouponPDFLuca}>
          🎟️ Scarica il tuo coupon sconto
        </button>

      </div>

      {/* Sezione Luca Antonelli — Osteopata e Preparatore Atletico A-Team */}
      <div className="team-card" style={{marginTop: '1rem'}}>

        {/* Logo e nome */}
        <div className="team-header">
          <img src="/logo-ateam.png" alt="A-Team Running Club" className="team-logo" />
          <div>
            <p className="team-nome">{TEAM.osteopata.nome}</p>
            <p className="team-ruolo">{TEAM.osteopata.ruolo}</p>
          </div>
        </div>

        {/* Link social e contatti */}
        <div className="team-contacts">
          <a href={TEAM.osteopata.instagram_personale} target="_blank" rel="noopener noreferrer" className="team-link">
            📸 @yourosteorunner_
          </a>
          <a href={TEAM.osteopata.instagram_team} target="_blank" rel="noopener noreferrer" className="team-link">
            📸 @a_team_runningclub
          </a>
          <a href={`tel:${TEAM.osteopata.telefono}`} className="team-link">
            📞 388 184 6001
          </a>
          <a href={TEAM.osteopata.sito} target="_blank" rel="noopener noreferrer" className="team-link">
            🌐 a-teamcoaching.it
          </a>
        </div>

        {/* Frase coupon e pulsante */}
        <p className="team-coupon-text">
          Prenota la tua consulenza con Luca e risparmia il 10%!
        </p>
        <button className="coupon-button" onClick={generaCouponPDFAteam}>
          🎟️ Scarica il tuo coupon sconto
        </button>

      </div>

      {/* Firma e link social dell'autore */}
      <div className="footer-signature">
        <p className="powered-by">Powered by Francesco Verga</p>
        <div className="social-links">
          <a href="https://www.instagram.com/francesco.vergram?igsh=aW52M2JzYTNieHBz" target="_blank" rel="noopener noreferrer" className="social-link">
            📸 Instagram
          </a>
          <a href="https://strava.app.link/rYt3d0hVw4b" target="_blank" rel="noopener noreferrer" className="social-link">
            🏃 Strava
          </a>
          <a href="https://www.facebook.com/share/1Aai9ngM5B/" target="_blank" rel="noopener noreferrer" className="social-link">
            👤 Facebook
          </a>
        </div>
      </div>
      {/* Link discreti a Privacy Policy e Credits
            Importanti per la trasparenza legale e per citare
            correttamente i servizi di terze parti utilizzati */}
        <div className="legal-links">
          <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="legal-link">
            🔒 Privacy Policy
          </a>
          <a href="/credits.html" target="_blank" rel="noopener noreferrer" className="legal-link">
            ℹ️ Credits & Licenze
          </a>
        </div>
    </div>
  );
}