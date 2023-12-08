import Phaser from "phaser";
import * as dat from 'dat.gui';

import CameraController from './cameraController';
import SelectionRect from './selectionRect';
import Tank from './tank';


export {config};


class setMapTest extends Phaser.Scene{
  constructor ()
  {super('setMapTest');
  };
  
  preload(){

    const progress = this.add.graphics();

    this.load.on('progress', value =>
    {

        progress.clear();
        progress.fillStyle(0xffffff, 1);
        progress.fillRect(0, 270, 800 * value, 60);

    });

    this.load.on('complete', () =>
    {

        progress.destroy();

    });

    this.load.image('background','backgroundgrid-test.jpg');
    this.load.image('tankdebug','tank.png');

  };



  aspect = 2;

  create() {
    this.physics.world.setBounds(-650, -780, 2000, 2010);
    this.cameraController = new CameraController(this);
    // primi due valori sono di centratura immagine di 2000px
    this.add.image(700/this.aspect,450/this.aspect,'background');

    //primi tank sprite
    this.Tank1 = new Tank(this, 1 , [280,255]);
    this.Tank2 = new Tank(this, 2 , [350,255]);
    this.Tank3 = new Tank(this, 3 , [390,280]);
    this.physics.add.collider(this.Tank1.tank, [this.Tank2.tank, this.Tank3.tank]);
    this.physics.add.collider(this.Tank2.tank, [this.Tank1.tank, this.Tank3.tank]);
    this.physics.add.collider(this.Tank3.tank, [this.Tank1.tank, this.Tank2.tank]);

    // selettore mouse
    this.input.mouse.disableContextMenu();
    this.selectionRectManager = new SelectionRect(this, [this.Tank1, this.Tank2, this.Tank3]);

  };




  update(time, delta) {

    this.cameraController.update(delta)
    this.Tank1.update();
    this.Tank2.update();
    this.Tank3.update();
  };
}

const config = {
  type: Phaser.AUTO,
  width: 1400/2,
  height: 900/2,
  loader:{
    baseURL: '/src/assets/'
  },
  scene: setMapTest,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0 }, // Nessuna gravità
      debug: true,
    },
  },
}
