import Phaser from "phaser";
import * as dat from 'dat.gui';

import CameraController from './cameraController';


export {config};

class setMapTest extends Phaser.Scene{
  constructor ()
  {super('setMapTest');
  this.isTankSelected = false;
  this.selectionRect = new Phaser.Geom.Rectangle(0, 0, 0, 0);
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

  /** @type {Phaser.GameObjects.Rectangle} */
  selection;
  aspect = 2;

  create() {
    this.cameraController = new CameraController(this);
    // primi due valori sono di centratura immagine di 2000px
    this.add.image(700/this.aspect,450/this.aspect,'background');

    this.selection = this.add.rectangle(0, 0, 0, 0, 0x1d7196, 0.5);
    this.input.on(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDown, this);
    this.input.on(Phaser.Input.Events.POINTER_MOVE, this.handlePointerMove, this);
    this.input.on(Phaser.Input.Events.POINTER_UP,   this.handlePointerUp,   this);

    //primi tank sprite
    this.tank = this.add.sprite(280,225,'tankdebug');
    const tankWidth = 25;
    const tankHeight = 25;
    this.tank.setOrigin(0.5, 0.5);
    this.tank.displayWidth = tankWidth;
    this.tank.displayHeight = tankHeight;
    this.tank.angle = 0;
    this.physics.world.enable(this.tank);
    this.tank.body.setCollideWorldBounds(true);
    this.tank.setInteractive();
    // this.tank.on('pointerdown', this.handleTankClick, this); // eeh ragioniamoci dentro alla creazione del selectionRect
  };

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

  // posiziona la casella
  handlePointerDown(pointer, currentlyOver)
  {

    this.selection.x = this.cameras.main.getWorldPoint(pointer.x, pointer.y).x;
    this.selection.y = this.cameras.main.getWorldPoint(pointer.x, pointer.y).y;

  }
  //impostiamo larghezza e altezza rettangolo
  handlePointerMove(pointer, currentlyOver)
  {
    if (!pointer.isDown)
    {
      return
    }

    const dx = this.cameras.main.getWorldPoint(pointer.x, pointer.y).x - this.cameras.main.getWorldPoint(pointer.prevPosition.x, pointer.prevPosition.y).x ;
    const dy = this.cameras.main.getWorldPoint(pointer.x, pointer.y).y - this.cameras.main.getWorldPoint(pointer.prevPosition.x, pointer.prevPosition.y).y ;
  
    this.selection.width += dx;
    this.selection.height += dy;

    this.selectionRect.x = this.selection.x;
    this.selectionRect.y = this.selection.y;
    this.selectionRect.width = this.selection.width;
    this.selectionRect.height = this.selection.height;

    if (this.selectionRect.width < 0)
    {
      this.selectionRect.x += this.selectionRect.width
      this.selectionRect.width *= -1
    }
    if (this.selectionRect.height < 0)
    {
      this.selectionRect.y += this.selectionRect.height
      this.selectionRect.height *= -1
    }

  }


  handlePointerUp(pointer, currentlyOver)
  {
    const selected = this.physics.overlapRect(
      this.selectionRect.x,
      this.selectionRect.y,
      this.selectionRect.width,
      this.selectionRect.height
    );
    console.log(selected.length);
    if(selected.length > 0){
      this.setTankSelected();
    }

    this.selection.width = 0
    this.selection.height = 0
    this.selectionRect.x = 0
    this.selectionRect.y = 0
    this.selectionRect.width = 0
    this.selectionRect.height = 0
  }

  // handlePointerUp(pointer, currentlyOver) {
  //   this.setTankSelected(this.physics.overlapRect(
  //     this.selectionRect.x,
  //     this.selectionRect.y,
  //     Math.abs(this.selectionRect.width),
  //     Math.abs(this.selectionRect.height)
  //   ));

  //   // Resetta i valori del rettangolo quando il puntatore viene rilasciato
  //   this.selection.width = 0;
  //   this.selection.height = 0;
  // }

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
