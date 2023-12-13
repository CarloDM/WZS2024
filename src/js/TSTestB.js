import Phaser from "phaser";
import * as dat from 'dat.gui';
import Stats from "stats.js"

import {setUpFinder,findPath} from "./Astar";

import {initializeMathFunction} from './mathFunction';
import CameraController from './cameraController';
import SelectionRect from './selectionRect';
import TankFactory from './tankFactory';
import Tank from './tank';



export {config};

// --------------stats-----------
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
// -------------------

class setMapTest extends Phaser.Scene{
  constructor ()
  {super('setMapTest');

  this.tanksGrp1 = [];
  this.grid = [];

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
    this.load.image('cannon','/texture/cannonDebug.png'); //

    this.load.tilemapCSV('map','../tankSurvive/map/ts-map-collide-cost.csv');
  };

  


  create() {
    this.physics.world.setBounds(-2048,-2048, 4096, 4096);
    // mouse dx disabilitare cntx menu
    this.input.mouse.disableContextMenu();

    this.cameraController = new CameraController(this);
    // aggiungere immagine di background
    this.add.image(0,0,'background');
    // set up layer collisioni
    this.map = this.make.tilemap({key: 'map', tileWidth: 32, tileHeight:32});
    const layer = this.map.createLayer(0,'collision',-2048, -2048 );
    
    this.map.setCollisionBetween(4,5);

    let tilesData = this.map.layer.data;

    for (let y = 0; y < this.map.height; y++) {
  
      let col = [];
  
        for (let x = 0; x < this.map.width; x++) {
  
          let tileID = tilesData[y][x].index
  
          col.push(tileID);
        }
  
      this.grid.push(col);
  
    }
    
    // Initializing the pathfinder
    setUpFinder(this.grid); 
    initializeMathFunction(this.grid);


// ---------------------------------------
      // debug collider wall
      this.debugGraphics = this.add.graphics();
      this.map.renderDebug(this.debugGraphics, {
      
        tileColor: null, // Non-colliding tiles
      
        collidingTileColor: new Phaser.Display.Color(180, 80, 0, 100), // Colliding tiles
      
        faceColor: new Phaser.Display.Color(20, 20, 20, 255) // Colliding face edges
      });



    const tanks = this.physics.add.group();

    const tankFactory = new TankFactory(this);


    this.tanksGrp1 = tankFactory.createMultipleTanks(10, [-600,255]);
    const tanksGrp2 = tankFactory.createMultipleTanks(10, [-600,0]);
    const tanksGrp5 = tankFactory.createMultipleTanks(10, [-600,-200]);

    tanksGrp2.forEach(tank => {
      this.tanksGrp1.push(tank);
    });

    tanksGrp5.forEach(tank => {
      this.tanksGrp1.push(tank);
    });
    
    tanks.addMultiple(this.tanksGrp1.map(tank => tank.tank));


    // inizializza selettore tanks
    this.selectionRectManager = new SelectionRect(this, 
      this.tanksGrp1 
    );
    
    // collider ------------
    this.physics.add.collider(tanks);
    this.physics.add.collider(tanks, layer);
  
  };


  update(time, delta) {
    stats.begin();

    this.cameraController.update(delta);

    this.tanksGrp1.forEach((tank,index) => {
      if (tank.isDestroyed()) {
        console.log('splice dead tank')
        // Rimuovi il tank distrutto dalla lista
        this.tanksGrp1.splice(index, 1);
        
      }else{

        tank.update(); 

      }
    })



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
