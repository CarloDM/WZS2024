import Phaser from "phaser";
import FloatingNumbersPlugin from "./FloatingNumbersPlugin";
import * as dat from 'dat.gui';
import Stats from "stats.js";


import {setUpFinder,findPath} from "./Astar";

import {initializeMathFunction} from './mathFunction';
import CameraController from './cameraController';
import SelectionRect from './selectionRect';
import TankFactory from './tankFactory';
import Engineering from './engineering';




export {config};

// --------------stats-----------
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
// -------------------

class setMapTest extends Phaser.Scene{
  constructor ()
  {super('setMapTest');

  this.grid = [];
  this.gaiserGrp = [];
  this.buildingsGrp = [];

  this.tanksGrp1 = [];
  this.tanks = []

  this.enemiesGrp = [];
  this.enemies = [];

  this.bulletsGrp = [];
  this.bullets = [];

  this.tankFactory = null;


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


    this.load.scenePlugin('floatingNumbersPlugin', FloatingNumbersPlugin, 'floatingNumbersPlugin', 'floatingNumbers');

    // load texture
    this.load.image('background',       '/texture/TS-clr-map-draft-01.jpg');
    this.load.tilemapCSV('map',         '../tankSurvive/map/ts-map-collide-cost.csv');
    this.load.image('gaiser',           '/texture/gaiser.png');

    this.load.image('base',             '/texture/BaseFactory.png'); 
    this.load.spritesheet('baseBitanim','/texture/BaseFactory-bitAnim.png',
    {frameWidth:256,frameHeight:256});
    
    this.load.image('engineering',      '/texture/engineering.png'); 

    this.load.image('tank',             '/texture/tank-traction.png'); 
    this.load.image('mg',               '/texture/MGun.png'); 
    this.load.image('cannon',           '/texture/cannon.png'); 
    this.load.image('rocket',           '/texture/rocket.png'); 

    this.load.image('bullet',           '/texture/bullet.png'); 
    this.load.spritesheet('explosion1', '/texture/explosion01.png',
    {frameWidth:32,frameHeight:32});

    this.load.image('enemy',             '/texture/enemy-traction.png'); 
    this.load.image('enemyMg',           '/texture/enemy-mg.png'); 
    this.load.image('enemyCannon',       '/texture/enemy-cannon.png'); 
    this.load.image('enemyRocket',       '/texture/enemy-rocket.png'); 

    this.load.image('btn',              '/texture/btn-test.png'); 


    
  };// preload end ------------------------------------------------------------------/



  create() {

    this.physics.world.setBounds(-2048,-2048, 4096, 4096);
    // mouse dx disabilitare cntx menu
    this.input.mouse.disableContextMenu();

    // aggiungere immagine di background
    this.add.image(0,0,'background');
    // set up layer collisioni
    this.map = this.make.tilemap({key: 'map', tileWidth: 32, tileHeight:32});
    const layer = this.map.createLayer(0,'collision',-2048, -2048 );
    
    this.map.setCollisionBetween(4,5);


    // ------------------debug walls tiles---------------------
      // debug collider wall
      // this.debugGraphics = this.add.graphics();
      // this.map.renderDebug(this.debugGraphics, {
      
      //   tileColor: null, // Non-colliding tiles
      
      //   collidingTileColor: new Phaser.Display.Color(180, 80, 0, 100), // Colliding tiles
      
      //   faceColor: new Phaser.Display.Color(20, 20, 20, 255) // Colliding face edges
      // });

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

    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion1', { start: 0, end: 15 }),
      frameRate: 15, 
      repeat: 0, 
    });


    this.anims.create({
      key: 'baseBit',
      frames: this.anims.generateFrameNumbers('baseBitanim', { start: 0, end: 57 }),
      frameRate: 20, 
      repeat: -1,
      // yoyo : true,
      delay: 3000,
      repeatDelay: 10000,

    });

    const Base =  this.add.sprite(0, 0, 'base')
    const baseBit = this.add.sprite(0, 0, 'baseBitanim').play('baseBit');


    // inizializza gruppi fisici
    this.tanks   = this.physics.add.group();
    this.enemies = this.physics.add.group();
    this.bullets = this.physics.add.group();
    
    this.ingBotty = new Engineering(this, [-100,+400])
    
    this.tankFactory = new TankFactory(this);

    this.tankFactory.createGaiser([128,+400],1);
    this.tankFactory.createGaiser([256,+400],2);
    this.tankFactory.createGaiser([400,-200],3);

    this.tankFactory.createMultipleTanks(1, [-600,-600], 'machineGun');
    this.tankFactory.createMultipleTanks(1, [-600,-0], 'cannon');
    this.tankFactory.createMultipleTanks(1, [-600, +600], 'rocket');

    // ---- primo enemy
    // this.tankFactory.createMultipleEnemies(1,[-800,-500]);
    // this.tankFactory.createMultipleEnemies(1,[-800, +100]);
    // this.tankFactory.createMultipleEnemies(1,[-800, +700]);


    // setta collider tra gruppi fisici e wall ------------
    this.physics.add.collider(this.tanks);
    this.physics.add.collider(this.tanks, layer);
    this.physics.add.collider(this.tanks, this.enemies);
    this.physics.add.collider(this.enemies);
    this.physics.add.collider(this.enemies, this.tanks);
    this.physics.add.collider(this.enemies, layer);


    this.physics.add.collider(this.bullets, this.enemies, (bullet, enemy) => {
      // Logica per la collisione tra proiettile e nemico
      enemy.body.setVelocity(0);
      enemy.enemyInstance.takeDamage(bullet.bulletInstance.damage);
      bullet.bulletInstance.explode();
    });


    // inizializza selettore tanks
    this.selectionRectManager = new SelectionRect(this, 
      this.tanksGrp1 
    );
    this.cameraController = new CameraController(this);
    this.scale.on('resize', this.handleResize, this);

    
  }; //----create
  
  handleResize(){
    // console.log('resize', this.scale.game.config , 'parentsize', this.scale.parentSize._width, this.scale.parentSize._height );
    // console.log(this.scale.canvas.width,this.scale.canvas.height )
    this.scale.canvas.width = this.scale.parentSize.width;
    this.scale.canvas.height = this.scale.parentSize.height;
    this.scale.gameSize.width = this.scale.parentSize.width;
    this.scale.gameSize.height = this.scale.parentSize.height;
    this.scale.baseSize.width = this.scale.parentSize.width;
    this.scale.baseSize.height = this.scale.parentSize.height;

  };
  
  update(time, delta) {
    stats.begin();
    this.ingBotty.update();

    this.cameraController.update(delta);

    this.tanksGrp1.forEach((tank,index) => {
      if (tank.isDestroyed()) {
        console.log('splice dead tank');

        this.tanksGrp1.splice(index, 1);
        
      }else{

        tank.update(); 

      }
    });



    this.enemiesGrp.forEach((enemy, index) => {
      if(enemy.isDestroyed()){
        console.log('splice dead enemy');

        this.enemiesGrp.splice(index, 1);
      }else{

        enemy.update();

      }
    });



    if(this.bulletsGrp.length > 0){
      this.bulletsGrp.forEach((bullet,index) => {
        
        if (bullet.isDestroyed()) {
          console.warn('splice dead bullet');

          this.bulletsGrp.splice(index, 1);
          
        }else{
  
          bullet.update(); 
  
        }
      });
    }

    if(this.buildingsGrp.length > 0 ){
      this.buildingsGrp.forEach((building, index) => {
        building.update();
      })
    }
    


    stats.end();
  };
}

const config = {
  type: Phaser.AUTO,
  width: '100%',
  height: '100%',

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

    scale: {
      mode:Phaser.Scale.Fit,
      autoCenter:Phaser.Scale.CENTER_BOTH,
      parent: 'gameContainer', 
    }
  },
}
