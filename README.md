# game-test-phaser

05/12/2023 <br>
phaser 3.7 con vite + vue!
test personale di phaser implementato e genesi di un intera logica di gioco RTS! <br>
sono arrivato al terzo test progressivo!
<ol>
  date 05/12/2023
  <li> hello word inizializzare phaser dentro componente vue.</li>
  <li> preload, init, create, update; approcciare alla logica Phaser.</li>

  ----
  date 06/12/2023 giorno 2
  <li> caricare un background img di debug, centrarlo e implementare funzionalità di controllo della main camera.</li>
  <li>modularizzare in classe la camera e i suoi controlli, quindi importare il modulo nella scena principale.</li>
  <li>creare un rettangolo di selezione col mouse.</li>
  <li>creare il primo sprite e selezionarlo rudimentalmente col rettangolo di selezione.</li>
  <br>

----------
07/12/2023 girno 3
  <li>modularizzare is ok</li>
  <li>selettore dei tanks corretto funzionante giusto</li>
  <li>creato movimento accellerazione decellerazione tanks to target </li>
  <li>collider tra tanks </li>

---
13/12/2023 giorno 8
  <li>csv tile map e collider</li>
  <li>implementato easystar per calcolo percorso</li>
  <li>nuovo metodo di spostamento e schedule target</li>
  <li>limitazione errori di target usando gli id dei tile</li>
  <li>creata una tank factory</li>
  <li>primo destroy() test</li>
  <li>classe cannone</li>
  ---------------------------------------------------
  <li> *** manca un sistema che previene lo schedule rispetto all invio del target</li>
  ---------------------------------------------------
  
---
14/12/2023 giorno 9
  <li>cannone scansiona verifica se enemy sono all interno del suo range di tiro</li>
  <li>cannone rotazione progressiva verifica angolo di aggancio e spara wip</li>
  
  
---
15/12/2023 giorno 10
  <li>cannone rotazione progressiva verifica angolo di aggancio e spara finito</li>
  <li>messo i gruppi fisici nel constructor</li>
  <li>nel create dei body(tank,enemy,bullet) aggiunta diretta ai gruppi fisici</li>
  <li>life e reload bar class</li>
  <li>enemie's HP < 0 = destroy()</li>

---
17/12/2023 giorno 11
  <li>ridisegnate texture dei tank motrice e cannone</li>
  <li>prime spritesheet , test di animazioni con piskel, un esplosione ed fx sulla base</li>

----
19/12/2023 giorno 12
  <li>canvas adattiva allo schermo: (min 900 x 900 px). con refresh della pagina. </li>
  <li>layout interfaccia per la gestione </li>

----
20/12/2023 giorno 13
  <li>disegnate texture  MGun & Rocket </li>
  <li>differenziare i tre tipi di tank Mgun, Cannon, Rocket immetterli in scena durante il gioco </li>
  <li>classe status menager & upgrade table</li>

----
21/12/2023 giorno 14
  <li>create diversi per tank diversi</li>
  <li>test creazione tank durante la partita con btn</li>
  <li>tabella upgrade compilata e syncronizzata per speed traction, damage e rof per tutti e tre i tipi</li>

----
21/12/2023 giorno 15
  <li>gaiser e costruzione automatica turbine</li>
  <li>gaiser test ciclo vitale done</li>
  <li>creato modulo tabella conteggi</li>

----
24/12/2023 giorno 16
<li>enemie:  movimento e scelta automatica target </li>

----
25/12/2023 giorno 17
<li>presa di mira target immeditata cannoni </li>
----

26/12/2023 giorno 18
<li>bullet pool</li>

----
27/12/2023 giorno 19
<li>completare pool per bullet nemici</li>
<li>semplificare logica di movimento tank</li>
<li>texture dei bottoni per incominciare a disegnare logiche di produzione e upgrade</li>

----
28/12/2023 giorno 20
<li>produzione dei tank</li>
<li>avvio delle ricerche upgrade logica di base funzionante in UI</li>
da fare
<li>ricerca upgrade estendere a tutti gli upgrade possibili</li>
<li>calcolo e sottrazione costi energia tank</li>
<li>condizione di mancanza di energia</li>
<li>texture dei bullet</li>
<li>enegineering calcoli la vicinanza da un punto mediano rispetto alla base</li>


