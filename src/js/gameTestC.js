import Phaser from "phaser";
import * as dat from 'dat.gui';

import CameraController from './cameraController';


export {config};

class setMapTest extends Phaser.Scene{
  constructor ()
  {super('setMapTest');};


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

  };

  create() {
    this.cameraController = new CameraController(this);
    // primi due valori sono di centratura immagine di 2000px
    this.add.image(700/2,450/2,'background');

    

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
  scene: setMapTest
}
