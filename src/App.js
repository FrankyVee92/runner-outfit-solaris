// ============================================================
// IMPORTAZIONI
// ============================================================

// Importiamo React e useState per gestire lo stato dell'app
import React, { useState } from 'react';

// Importiamo il file CSS per gli stili grafici
import './App.css';


// ============================================================
// OGGETTO: LINKS
// ============================================================
// Contiene tutti i link alle categorie di Solaris Sport,
// divisi per genere (male/female) e per tipo di capo.
//
// È un oggetto JavaScript con due proprietà principali:
//   LINKS.male   = link per le categorie uomo
//   LINKS.female = link per le categorie donna
//
// Ogni proprietà interna è una stringa con l'URL della categoria.
// Esempio: LINKS.male.termica = URL della sezione intimo uomo di Solaris
// ============================================================
const LINKS = {
  male: {
    termica:      'https://www.solarissport.com/collections/abbigliamento-uomo-intimo',
    maglia:       'https://www.solarissport.com/collections/abbigliamento-uomo-maglie',
    antivento:    'https://www.solarissport.com/collections/abbigliamento-uomo-giacche',
    leggins:      'https://www.solarissport.com/collections/abbigliamento-uomo-leggings',
    calzini:      'https://www.solarissport.com/collections/accessori-uomo-calze',
    guanti:       'https://www.solarissport.com/collections/accessori-uomo-guanti',
    cappello:     'https://www.solarissport.com/collections/accessori-uomo-cappelli',
    felpa:        'https://www.solarissport.com/collections/abbigliamento-uomo-felpe',
    shorts:       'https://www.solarissport.com/collections/abbigliamento-uomo-pantaloni',
    impermeabile: 'https://www.solarissport.com/collections/abbigliamento-uomo-giacche',
    scaldacollo:  'https://www.solarissport.com/collections/accessori-uomo-altro',
  },
  female: {
    termica:      'https://www.solarissport.com/collections/abbigliamento-donna-intimo',
    maglia:       'https://www.solarissport.com/collections/abbigliamento-donna-maglie',
    antivento:    'https://www.solarissport.com/collections/abbigliamento-donna-giacche',
    leggins:      'https://www.solarissport.com/collections/abbigliamento-donna-leggings',
    calzini:      'https://www.solarissport.com/collections/accessori-donna-calze',
    guanti:       'https://www.solarissport.com/collections/accessori-donna-guanti',
    cappello:     'https://www.solarissport.com/collections/abbigliamento-donna-cappelli',
    felpa:        'https://www.solarissport.com/collections/abbigliamento-donna-felpe',
    shorts:       'https://www.solarissport.com/collections/abbigliamento-donna-pantaloni',
    impermeabile: 'https://www.solarissport.com/collections/abbigliamento-donna-giacche',
    top:          'https://www.solarissport.com/collections/abbigliamento-donna-intimo',
    scaldacollo:  'https://www.solarissport.com/collections/accessori-donna-altro',
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
// e restituisce la lista dei capi da indossare con i relativi link
// alle categorie di Solaris Sport, e le note aggiuntive.
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
//   items     = array di capi (icona + testo + url Solaris)
//   notes     = array di consigli aggiuntivi
//   perceived = temperatura percepita durante la corsa
//   wc        = temperatura percepita con il solo wind chill
// ============================================================
function computeOutfit(temp, wind, humidity, duration, sensitivity, intensity, sky, gender) {

  // PASSO 1: calcoliamo il wind chill (quanto freddo fa con il vento)
  const wc = windChill(temp, wind);

  // PASSO 2: calcoliamo gli "offset", cioè le correzioni alla temperatura.
  // L'operatore ternario "condizione ? valore_se_vero : valore_se_falso"
  // è un if/else compatto su una sola riga.

  // Sensibilità al freddo:
  // Freddoloso = -3°C (veste più caldo), Calorifero = +3°C (veste più leggero)
  const sensOffset = sensitivity === 'cold' ? -3 : sensitivity === 'warm' ? +3 : 0;

  // Intensità allenamento:
  // Veloce = +4°C, Medio o ripetute = 0°C, Lento = -2°C
  // "||" significa "oppure"
  const intOffset = intensity === 'fast' ? +4 : intensity === 'medium' || intensity === 'intervals' ? 0 : -2;

  // Durata: oltre 90 minuti il corpo si scalda progressivamente
  const durOffset = duration >= 90 ? -1 : 0;

  // PASSO 3: temperatura effettiva percepita durante la corsa
  const perceived = wc + sensOffset + intOffset + durOffset;

  // PASSO 4: prendiamo i link giusti in base al genere.
  // "L" è una scorciatoia per non scrivere LINKS[gender] ogni volta.
  // LINKS['male'] o LINKS['female'] restituisce l'oggetto con i link del genere scelto.
  const L = LINKS[gender];

  // Array vuoti da riempire con i risultati.
  // Ogni elemento di "items" avrà tre proprietà:
  //   icon  = emoji del capo
  //   label = nome del capo
  //   url   = link alla categoria Solaris corrispondente
  const items = [];
  const notes = [];


  // ============================================================
  // PASSO 5: LOGICA ABBIGLIAMENTO
  // Scegliamo i capi in base alla temperatura percepita.
  // Ogni capo ha ora anche un "url" che punta alla categoria
  // giusta su Solaris Sport (diverso per uomo e donna).
  // ============================================================

  if (perceived <= 0) {
    // FREDDO INTENSO: tutti gli strati, protezione completa
    items.push({ icon: '🧥', label: 'Termica invernale (intima)', url: L.termica });
    items.push({ icon: '👕', label: 'Maglia maniche lunghe', url: L.maglia });
    items.push({ icon: '🌬️', label: 'Giacca antivento', url: L.antivento });
    items.push({ icon: '👖', label: 'Leggins invernali', url: L.leggins });
    items.push({ icon: '🧦', label: 'Calzettoni tecnici', url: L.calzini });
    items.push({ icon: '🧤', label: 'Guanti', url: L.guanti });
    items.push({ icon: '🧣', label: 'Scaldacollo', url: L.scaldacollo });
    items.push({ icon: '🧢', label: 'Berretto / fascia orecchie', url: L.cappello });
    if (perceived <= -8) notes.push('Con freddo estremo valuta una doppia termica o gilet isolante.');

  } else if (perceived <= 7) {
    // FREDDO MODERATO: termica leggera, guanti consigliati
    items.push({ icon: '🧥', label: 'Termica leggera', url: L.termica });
    items.push({ icon: '👕', label: 'Maglia maniche lunghe', url: L.maglia });
    // Antivento solo con vento forte (oltre 20 km/h)
    if (wind > 20) items.push({ icon: '🌬️', label: 'Antivento leggero', url: L.antivento });
    items.push({ icon: '👖', label: 'Leggins lunghi', url: L.leggins });
    items.push({ icon: '🧦', label: 'Calzini tecnici', url: L.calzini });
    items.push({ icon: '🧤', label: 'Guanti leggeri', url: L.guanti });
    // Fascia orecchie solo sotto i 4°C
    if (perceived < 4) items.push({ icon: '🧢', label: 'Fascia orecchie', url: L.cappello });

  } else if (perceived <= 14) {
    // FRESCO: maglia lunga e leggins, guanti solo se abbastanza fresco
    items.push({ icon: '👕', label: 'Maglia maniche lunghe', url: L.maglia });
    // Antivento con vento moderato (oltre 15 km/h)
    if (wind > 15) items.push({ icon: '🌬️', label: 'Antivento leggero', url: L.antivento });
    items.push({ icon: '👖', label: 'Leggins 3/4 o lunghi', url: L.leggins });
    items.push({ icon: '🧦', label: 'Calzini tecnici', url: L.calzini });
    // Guanti solo sotto gli 11°C
    if (perceived < 11) items.push({ icon: '🧤', label: 'Guanti sottili', url: L.guanti });

  } else if (perceived <= 20) {
    // MITE: abbigliamento leggero, top per le donne
    if (gender === 'female') {
      items.push({ icon: '👙', label: 'Top sportivo', url: L.top });
      // "!==" significa "diverso da"
      // Se non è calorifero, aggiunge la maglia sopra il top
      if (sensitivity !== 'warm') items.push({ icon: '👕', label: 'Maglia tecnica maniche corte', url: L.maglia });
    } else {
      items.push({ icon: '👕', label: 'Maglia tecnica maniche corte', url: L.maglia });
    }
    // Chi va piano aggiunge una felpa per non raffreddarsi
    if (intensity === 'slow') items.push({ icon: '🧥', label: 'Felpa leggera', url: L.felpa });
    items.push({ icon: '🩳', label: 'Shorts o leggins corti', url: L.shorts });
    items.push({ icon: '🧦', label: 'Calzini tecnici', url: L.calzini });

  } else {
    // CALDO: abbigliamento minimo
    if (gender === 'female') {
      items.push({ icon: '👙', label: 'Top sportivo', url: L.top });
      // Solo le donne freddolose aggiungono la maglia col caldo
      if (sensitivity === 'cold') items.push({ icon: '👕', label: 'Maglia tecnica maniche corte', url: L.maglia });
    } else {
      items.push({ icon: '👕', label: 'Maglia tecnica maniche corte', url: L.maglia });
    }
    items.push({ icon: '🩳', label: 'Shorts', url: L.shorts });
    items.push({ icon: '🧦', label: 'Calzini corti', url: L.calzini });
    if (perceived >= 27) notes.push('Caldo intenso: porta acqua e corri nelle ore più fresche.');
  }


  // ============================================================
  // PASSO 6: NOTE AGGIUNTIVE
  // ============================================================

  // Pioggia: aggiungiamo impermeabile e nota
  if (sky === 'rain') {
    items.push({ icon: '🌧️', label: 'Giacca impermeabile', url: L.impermeabile });
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
          "key" è richiesto da React per identificare ogni elemento nella lista.
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
  // La sintassi [variabile, setVariabile] si chiama "array destructuring".
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

  // Testo descrittivo della temperatura per il riquadro dei consigli.
  // Se wind chill e temperatura reale differiscono, mostriamo entrambi.
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

        {/* Ogni capo è ora un tag <a> (link cliccabile) invece di un semplice <div>.
            - href={item.url} = l'indirizzo a cui porta il click
            - target="_blank" = apre il link in una nuova scheda del browser
            - rel="noopener noreferrer" = misura di sicurezza consigliata
              quando si apre un link in una nuova scheda */}
      <div className="item-grid">
          {items.map((item, i) => (
            
              <a key={i}
              className="item"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="item-icon">{item.icon}</span>
              <span>{item.label}</span>
              <span className="item-link">🛒</span>
            </a>
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