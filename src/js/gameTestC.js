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
    this.cameraController = new CameraController(this);
    // primi due valori sono di centratura immagine di 2000px
    this.add.image(700/this.aspect,450/this.aspect,'background');

    //primo tank sprite
    this.Tank = new Tank(this);

    // selettore mouse
    this.selectionRectManager = new SelectionRect(this, this.Tank);

  };




  update(time, delta) {

    this.cameraController.update(delta)

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
