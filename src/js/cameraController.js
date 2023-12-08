import Phaser from "phaser";
import dat from 'dat.gui';

export default class CameraController {
  constructor(scene) {
    // dichiaro main camera per leggibilità migliore
    const mainCamera = scene.cameras.main;

    // gli input vanno importati dalla scena passata quindi
    scene.input.on('wheel',(pointer, gameObjects, deltaX, deltaY, deltaZ) => {

      if(!((mainCamera.zoomY - deltaY / 2500) > 2 || (mainCamera.zoomY - deltaY / 2500 )< 0.34)){
        mainCamera.zoomY -= deltaY / 2500;
        mainCamera.zoomX -= deltaY / 2500;
      }

    });

    // configurazione per smooth key controll : input da tastiera
    const controlConfig = {
      camera:  mainCamera,

      left:    scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right:   scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      up:      scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down:    scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      zoomIn:  scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      zoomOut: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),

      acceleration: 0.028,
      drag: 0.0006,
      maxSpeed: 0.4,
      maxZoom: 2,
      minZoom: 0.34,
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    
    // impostazione del limite telecamera
    mainCamera.setBounds(-675, -800, 2055, 2050);

    // debugghing camera control ------------ :)
    const guiMCamera = new dat.GUI();

    let guiMCameraHelp = {
      moveKey : '[ADWS]',
      zoomKey : '[ZX]',
      zoomWheel : '[mouse wheel]',
    }

    const debuggherMCamera = guiMCamera.addFolder('Main Camera');
      debuggherMCamera.add(mainCamera, 'scrollX').listen();
      debuggherMCamera.add(mainCamera, 'scrollY').listen();
      debuggherMCamera.add(mainCamera, 'zoomX').listen();
      debuggherMCamera.add(mainCamera, 'zoomY').listen();
      debuggherMCamera.add(guiMCameraHelp, 'moveKey');
      debuggherMCamera.add(guiMCameraHelp, 'zoomKey');
      debuggherMCamera.add(guiMCameraHelp, 'zoomWheel');
      // debuggherMCamera.open();
    // ----------------------------------------
  }

  update(delta) {
    this.controls.update(delta);
  }
}