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



  aspect = 2;

  create() {

    // this.physics.world.setBounds(-630, -775, 2000, 2010);
    this.cameraController = new CameraController(this);
    // primi due valori sono di centratura immagine di 2000px
    this.add.image(-0,-0,'background');


    this.map = this.make.tilemap({key: 'map', tileWidth: 32, tileHeight:32});
    const layer = this.map.createLayer(0,'ground',-2048, -2048 )
    this.map.setCollisionBetween(4,5);

  //   this.debugGraphics = this.add.graphics();
  //   this.map.renderDebug(this.debugGraphics, {
  //     tileColor: null, // Non-colliding tiles
  //     collidingTileColor: new Phaser.Display.Color(0, 0, 0, 0), // Colliding tiles
  //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
  // });



      // ### Pathfinding stuff ###
    // Initializing the pathfinder

    // console.log(this.map.height, this.map.width, this.map.layer.data );

    setUpFinder(this.map); //testing

    findPath(110, 25, 20, 19)
      .then((Fpath) =>{
        console.log('Astar path founded', Fpath);

        for (let index = 0; index < Fpath.length; index++) {
          this.add.rectangle((Fpath[index].x * 32 ) -2032 , (Fpath[index].y * 32) -2032 , 32, 32, 0x1d7196, 0.5);
        }
        
      })
      .catch((error) => {
        console.error(error);
      });

    findPath(20, 19, 107, 58)
      .then((Fpath) =>{
        console.log('Astar path founded', Fpath);

        for (let index = 0; index < Fpath.length; index++) {
          this.add.rectangle((Fpath[index].x * 32 ) -2032 , (Fpath[index].y * 32) -2032 , 32, 32, 0x1d7196, 0.5);
        }

      })
      .catch((error) => {
        console.error(error);
      });

    findPath(107, 58, 49, 119)
      .then((Fpath) =>{
        console.log('Astar path founded', Fpath);

        for (let index = 0; index < Fpath.length; index++) {
          this.add.rectangle((Fpath[index].x * 32 ) -2032 , (Fpath[index].y * 32) -2032 , 32, 32, 0x1d7196, 0.5);
        }

      })
      .catch((error) => {
        console.error(error);
      });



// ---------------------------------------


    const walls = this.physics.add.staticGroup();

    // walls.create(200,400,'wall').setScale(10).refreshBody();



    const tanks = this.physics.add.group();
    // primi tank sprite
    this.Tank1 = new Tank(this, 1 , [280,255]);
    this.Tank2 = new Tank(this, 2 , [350,255]);
    this.Tank3 = new Tank(this, 3 , [390,280]);
    this.Tank4 = new Tank(this, 4 , [390,310]);
    this.Tank5 = new Tank(this, 5 , [390,340]);
    this.Tank6 = new Tank(this, 6 , [390,370]);

    tanks.addMultiple([this.Tank1.tank,this.Tank2.tank, this.Tank3.tank, this.Tank4.tank, this.Tank5.tank, this.Tank6.tank,]);



    // collider
    this.physics.add.collider(tanks);
    this.physics.add.collider(walls, tanks);
    this.physics.add.collider(tanks, layer);
    // this.physics.add.collider(layer, tanks );


    // selettore mouse
    this.input.mouse.disableContextMenu();

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
  width: 1400/2,
  height: 900/2,
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
