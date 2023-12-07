import Phaser from "phaser";
import dat from 'dat.gui';

export default class Tank {
  constructor(scene, id, position){
    this.scene = scene;
    this.id = id;
    this.position = position;
    this.isTankSelected = false;

    this.tank = scene.add.sprite(position[0],position[1],'tankdebug');
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
    if(!this.isTankSelected){
      this.isTankSelected = true;
      this.tank.setTint(0x00ff00);
    }
  }

  setTankUnselected(){
    this.isTankSelected = false;
    this.tank.clearTint(); // Ripristina il colore originale
  }
  
  // handleTankClick() {
  //   this.setTankSelected();
  // }
}