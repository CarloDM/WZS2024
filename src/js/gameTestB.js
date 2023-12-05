import Phaser from "phaser";
import * as dat from 'dat.gui';

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
    // primi due valori sono di centratura immagine 2000px
    this.add.image(700/2,450/2,'background');

    // prendo e dichiaro la mainCamera & la controllo con gli input
    const mainCamera = this.cameras.main;

    this.input.on('wheel',(pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      if(!((mainCamera.zoomY - deltaY / 2500) > 2 || (mainCamera.zoomY - deltaY / 2500 )< 0.34)){
        mainCamera.zoomY -= deltaY / 2500;
        mainCamera.zoomX -= deltaY / 2500 ;
      }
    });

    const controlConfig = {
      camera:  mainCamera,
      left:    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right:   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      up:      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down:    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      zoomIn:  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
      acceleration: 0.028,
      drag: 0.0006,
      maxSpeed: 0.4,
      maxZoom: 2,
      minZoom: 0.34,
    }
    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    mainCamera.setBounds(-675, -800, 2055, 2050);


    // gui è un debuggher grafico utile ---------------
    const gui = new dat.GUI();

    let help = {
      moveKey : '[ASDW]',
      zoomKey : '[ZX]',
      zoomWheel : '[mouse wheel]',
    }

    const f1 = gui.addFolder('Camera');
      f1.add(mainCamera, 'scrollX').listen();
      f1.add(mainCamera, 'scrollY').listen();
      f1.add(mainCamera, 'zoomX').listen();
      f1.add(mainCamera, 'zoomY').listen();
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
