import Phaser from "phaser";
import * as dat from 'dat.gui';

import {setUpFinder,findPath} from "./Astar";

import CameraController from './cameraController';
import SelectionRect from './selectionRect';
import Tank from './tank';



export {config};


class setMapTest extends Phaser.Scene{
  constructor ()
  {super('setMapTest');
  this.wallsCord = []
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

    this.load.image('background','/texture/TS-clr-map-draft-01.jpg');

    this.load.image('tankdebug','/texture/tank.png'); //

    this.load.tilemapCSV('map','../tankSurvive/map/ts-map-collide-cost.csv');
  };



  create() {

    // mouse dx disabilitare cntx menu
    this.input.mouse.disableContextMenu();

    this.cameraController = new CameraController(this);
    // aggiungere immagine di background
    this.add.image(0,0,'background');
    // set up layer collisioni
    this.map = this.make.tilemap({key: 'map', tileWidth: 32, tileHeight:32});
    const layer = this.map.createLayer(0,'collision',-2048, -2048 )
    this.map.setCollisionBetween(4,5);
    
    // Initializing the pathfinder
    setUpFinder(this.map); 
//  @{findPath} example
    // findPath(110, 25, 20, 19)
    //   .then((Fpath) =>{
    //     console.log('Astar path founded', Fpath);

    //     for (let index = 0; index < Fpath.length; index++) {
    //       this.add.rectangle((Fpath[index].x * 32 ) -2032 , (Fpath[index].y * 32) -2032 , 32, 32, 0x1d7196, 0.5);
    //     }
        
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

// ---------------------------------------
      // debug collider wall
      // this.debugGraphics = this.add.graphics();
      // this.map.renderDebug(this.debugGraphics, {
      
      //   tileColor: null, // Non-colliding tiles
      
      //   collidingTileColor: new Phaser.Display.Color(180, 80, 0, 100), // Colliding tiles
      
      //   faceColor: new Phaser.Display.Color(20, 20, 20, 255) // Colliding face edges
      // });



    const tanks = this.physics.add.group();
    // primi tank sprite
    this.Tank1 = new Tank(this, 1 , [200,255]);
    this.Tank2 = new Tank(this, 2 , [350,255]);
    this.Tank3 = new Tank(this, 3 , [500,280]);
    this.Tank4 = new Tank(this, 4 , [650,310]);
    this.Tank5 = new Tank(this, 5 , [800,340]);
    this.Tank6 = new Tank(this, 6 , [390,370]);

    tanks.addMultiple([this.Tank1.tank,this.Tank2.tank, this.Tank3.tank, this.Tank4.tank, this.Tank5.tank, this.Tank6.tank,]);



    // collider ------------
    this.physics.add.collider(tanks);
    this.physics.add.collider(tanks, layer);
    // this.physics.add.collider(layer, tanks );

    // inizializza selettore tanks
    this.selectionRectManager = new SelectionRect(this, [this.Tank1, this.Tank2, this.Tank3, this.Tank4, this.Tank5, this.Tank6]);
  };

  update(time, delta) {

    this.cameraController.update(delta)
    this.Tank1.update();
    this.Tank2.update();
    this.Tank3.update();
    this.Tank4.update();
    this.Tank5.update();
    this.Tank6.update();
  };
}

const config = {
  type: Phaser.AUTO,
  width: 1400,
  height: 900,
  loader:{
    baseURL: '/src/assets/tankSurvive'
  },
  scene: setMapTest,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0 }, // Nessuna gravità
      debug: false,
    },
  },
}
