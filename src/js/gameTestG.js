import Phaser from "phaser";
import * as dat from 'dat.gui';
import EasyStar from "easystarjs"

import CameraController from './cameraController';
import SelectionRect from './selectionRect';
import Tank from './tank';
import Wall from './wall';

import {createArray} from './collidersGenByimg';
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

    this.load.image('background','backgroundgrid-test.jpg');
    this.load.image('collisionMap','collision-map-test.png');
    this.load.image('wall','wall.png');
    this.load.image('tankdebug','tankdebug.png');
    this.load.tilemapCSV('map','../assets/testA.csv');
    this.wallsCord = createArray();
  };



  aspect = 2;

  create() {

    this.physics.world.setBounds(-630, -775, 2000, 2010);
    this.cameraController = new CameraController(this);
    // primi due valori sono di centratura immagine di 2000px
    this.add.image(700/this.aspect,450/this.aspect,'background');
    this.add.image(700/this.aspect,450/this.aspect,'collisionMap');



    this.map = this.make.tilemap({key: 'map', tileWidth: 20, tileHeight:20});
    const layer = this.map.createLayer(0,'ground',-650, -775 )
    this.map.setCollisionBetween(3,14);


    this.debugGraphics = this.add.graphics();
    this.map.renderDebug(this.debugGraphics, {
      tileColor: null, // Non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
  });

      // ### Pathfinding stuff ###
    // Initializing the pathfinder

    // console.log(this.map.height, this.map.width, this.map.layer.data );

    this.finder = new EasyStar.js();

    const tilesData = this.map.layer.data;

    const grid = [];

    for (let y = 0; y < this.map.height; y++) {

      let col = [];

        for (let x = 0; x < this.map.width; x++) {

          let tileID = tilesData[y][x].index

          col.push(tileID);
        }

      grid.push(col);

    }
    console.log('grid',grid)

    this.finder.setGrid(grid);

    this.finder.setAcceptableTiles([-1, 0, 1, 2, 15]);

    const self = this;

    this.finder.findPath(46, 52, 64, 38, function( path ) {
      if (path === null) {
        console.log("Path was not found.");
      } else {
        console.log("Path was found. The first Point is " + path[0].x + " " + path[0].y);
        console.log(path)
        for (let index = 0; index < path.length; index++) {
          if(index % 6 === 0){
            self.add.rectangle((path[index].x * 20 ) -640 , (path[index].y * 20) - 765 , 20, 20, 0x1d7196, 0.5);
          }
          
        }
      }
    });

    this.finder.enableDiagonals();
    this.finder.setTileCost(15, 5);
    this.finder.setIterationsPerCalculation(1000);

    this.finder.calculate();
    this.finder.calculate();
    this.finder.calculate();
    this.finder.calculate();
    this.finder.calculate();




    this.debugGraphics2 = this.add.graphics();
    this.map.renderDebug(this.debugGraphics2, {
      tileColor: null, // Non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
  });





    const walls = this.physics.add.staticGroup();

    walls.create(200,400,'wall').setScale(10).refreshBody();



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
