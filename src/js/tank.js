import Phaser from "phaser";
import dat from 'dat.gui';

export default class Tank {
  constructor(scene){
    this.scene = scene;

    this.tank = scene.add.sprite(280,225,'tankdebug');
    const tankWidth = 25;
    const tankHeight = 25;
    this.tank.setOrigin(0.5, 0.5);
    this.tank.displayWidth = tankWidth;
    this.tank.displayHeight = tankHeight;
    this.tank.angle = 0;
    scene.physics.world.enable(this.tank);
    this.tank.body.setCollideWorldBounds(true);
    this.tank.setInteractive();
    

    
  }

  setTankSelected() {
    this.isTankSelected = !this.isTankSelected;
  
    // Cambia il colore o l'aspetto del tank in base allo stato di selezione
    if (this.isTankSelected) {
      // Tank selezionato
      this.tank.setTint(0x00ff00); // Esempio: colora il tank di verde
    } else {
      // Tank non selezionato
      this.tank.clearTint(); // Ripristina il colore originale
    }
  }

  handleTankClick() {
    this.setTankSelected();
  }
}