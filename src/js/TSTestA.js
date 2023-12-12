import Phaser from "phaser";
import * as dat from 'dat.gui';
import Stats from "stats.js"

import {setUpFinder,findPath} from "./Astar";

import CameraController from './cameraController';
import SelectionRect from './selectionRect';
import Tank from './tank';



export {config};

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);


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

    this.Tank7 = new Tank(this, 7 , [200,0]);
    this.Tank8 = new Tank(this, 8 , [350,0]);
    this.Tank9 = new Tank(this, 9 , [500,100]);
    this.Tank10 = new Tank(this, 10 , [650,0]);
    this.Tank11= new Tank(this, 11 , [800,0]);
    this.Tank12= new Tank(this, 12 , [390,0]);

    tanks.addMultiple([
      this.Tank1.tank,this.Tank2.tank, this.Tank3.tank, this.Tank4.tank, this.Tank5.tank, this.Tank6.tank,
      this.Tank7.tank,this.Tank8.tank, this.Tank9.tank, this.Tank10.tank, this.Tank11.tank, this.Tank12.tank,
    ]);



    // collider ------------
    this.physics.add.collider(tanks);
    this.physics.add.collider(tanks, layer);


    // inizializza selettore tanks
    this.selectionRectManager = new SelectionRect(this, [
      this.Tank1, this.Tank2, this.Tank3, this.Tank4, this.Tank5, this.Tank6,
      this.Tank7,this.Tank8, this.Tank9, this.Tank10, this.Tank11, this.Tank12,
    ]);
  };

  update(time, delta) {
    stats.begin();

    this.cameraController.update(delta)
    this.Tank1.update();
    this.Tank2.update();
    this.Tank3.update();
    this.Tank4.update();
    this.Tank5.update();
    this.Tank6.update();

    this.Tank7.update();
    this.Tank8.update();
    this.Tank9.update();
    this.Tank10.update();
    this.Tank11.update();
    this.Tank12.update();

    stats.end();
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
      debug: true,
    },
  },
}
