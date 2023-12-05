import Phaser from "phaser";
import * as dat from 'dat.gui';

export {config};

class setMapTest extends Phaser.Scene{
  constructor ()
  {super('helloworld');};



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
    this.add.image(700/2,450/2,'background');

    // camera controls

    const controlConfig = {
      camera: this.cameras.main,
      left:    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right:   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      up:      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down:    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      zoomIn:  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
      acceleration: 0.028,
      drag: 0.0006,
      maxSpeed: 0.4,
    }
    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    
    //  camera additional control
    let cam = this.cameras.main;

    this.input.on('wheel',(pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      cam.zoomY -= deltaY / 2500;
      cam.zoomX -= deltaY / 2500 ;
    });

    // gui è un debuggher grafico utile
    const gui = new dat.GUI();

    let help = {
      moveKey : '[ASDW]',
      zoomKey : '[ZX]',
      zoomWheel : '[mouse wheel]',
    }

    const f1 = gui.addFolder('Camera');
      f1.add(cam, 'scrollX').listen();
      f1.add(cam, 'scrollY').listen();
      f1.add(cam, 'zoomX').listen();
      f1.add(cam, 'zoomY').listen();
      f1.add(help, 'moveKey');
      f1.add(help, 'zoomKey');
      f1.add(help, 'zoomWheel');
      f1.open();
  };

  update(time, delta) {

    this.controls.update(delta);

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
