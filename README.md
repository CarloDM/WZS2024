# WZS2024 rts game v 0.1.0

This game, inspired by the open-source game Warzone 2100, is currently in development. While it doesn't aim to achieve the same level of complexity, it seeks to create a similar RTS dynamic focused on troop logistics and speed and accuracy in upgrade choices.

This application aims to be a minimal browser-based RTS game geared towards action. The current development state allows testing of the basic game dynamics, but it still lacks audio, a variety of animations and graphics, and some fundamental gameplay implementations such as building defensive turrets, a troop repair system, a special troop boosting system, and a game-saving system.

Technology i used are:

vite + vue + phaser. https://phaser.io/



easystarjs.

floatingNumbersPlugin for phaser by netgfx 
https://github.com/netgfx/Phaser-FloatingNumbersPlugin .

-----------------------------------------
----------------------
----------------------



05/12/2023 
Personal ToDo
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

----
  29/12/2023 giorno 21
<li>ricerca upgrade estendere a tutti gli upgrade possibili</li>
<li>texture bottoni upgrade & inserire Text del count down </li>

----
  03/01/2024 giorno 22
<li>calcolo e sottrazione costi energia tank & upgrade</li>
<li>condizione di mancanza di energia</li>
<li>engineering calcoli la vicinanza da un punto mediano rispetto alla base</li>

----
  07/01/2024 giorno 23
<li>waves table un iniziale level design sperimentare 10 livelli </li>


----
  12/01/2024 giorno 23
<li>test 2 waves</li>


----
  13/01/2024 giorno 24
<li>test 2 waves</li>
<li>mappa completare gaiser disposizione in un layer csv</li>

----
19/01/2024 giorno 25
DA FARE
<li>
convertire interfaccia in css esternamente al canvas di gioco phaser wip
<ol>
    <li>barra energia --ok</li>
    <li>waves countdown --ok</li>
</ol>
</li>

---
25/01/2024 giorno 26

  <li>approssimazione calcolo tempistiche dei timeout e intervall</li>
  <li>corretto funzionamento funzioni upgrade</li>
  <li>incrementare il costo dei tank per upgrade</li>
  <li>Aumentare costo e tempo di produzione per ogni tank s upgrade</li>
  <li>mappa minimappa in UI</li>
  <li>arrivare alla prima beta release priva di ulteriori funzionalità</li>

----
RELAESE SUCCESSIVE
DA FARE
<li>sistema di riparazione tank</li>
<li>sistema di boost tank</li>
<li>sistema di costruzione torrette</li>
<li>mappa completare texture </li>
<li>bullet texture</li>
<li>bullet explosion animation</li>
<li>tank explosion animation</li>
<li>audio immersivo</li>
<li>pagina Home</li>
<li>salvataggio partita</li>


