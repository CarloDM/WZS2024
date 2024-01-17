import Phaser from "phaser";
import Stats from "stats.js";

import FloatingNumbersPlugin    from "./FloatingNumbersPlugin";
import {setUpFinder}            from "./Astar";
import {initializeMathFunction,fromTileToWorldPoint} from './mathFunction';
import CameraController         from './cameraController';
import SelectionRect            from './selectionRect';
import TankFactory              from './Factory';
import Engineering              from './engineering';
import BulletsPool              from './bulletsPool';

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
  this.buildings = [];

  this.tanksGrp1 = [];
  this.tanks = []

  this.enemiesGrp = [];
  this.enemies = [];

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
    this.load.image('background',       '/texture/clr-map.jpg');
    this.load.tilemapCSV('map',         '../tankSurvive/map/ts-map-collide-cost2.csv');
    this.load.image('gaiser',           '/texture/gaiser.png');
    this.load.tilemapCSV('gaiserMap',   '../tankSurvive/map/gaisersMap.csv');

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
    
    this.load.spritesheet('btn1',       '/icon/btn1.png',
    {frameWidth:64,frameHeight:64});
    this.load.spritesheet('btn2',       '/icon/btn2.png',
    {frameWidth:64,frameHeight:64});
    this.load.spritesheet('btnBoost',   '/icon/btnBoost.png',
    {frameWidth:64,frameHeight:64});
    this.load.spritesheet('btnDeck',    '/icon/btnDeck.png',
    {frameWidth:64,frameHeight:64});
    this.load.spritesheet('btnUpgrade', '/icon/btnUpgrade.png',
    {frameWidth:64,frameHeight:64});

    this.load.image('upResSpeed',      '/icon/up-resSpeed.png'); 
    this.load.image('upEnergy',        '/icon/up-enEfficiency.png'); 
    this.load.image('upEngineering',   '/icon/up-engineerEfficiency.png'); 
    this.load.image('upBuildings',     '/icon/up-buildingsArmor.png'); 
    this.load.image('upBoost',         '/icon/up-boostSpeed.png'); 
    this.load.image('upProduction',    '/icon/up-ProductionSpeed.png'); 
    this.load.image('upSpeedTraction', '/icon/up-SpeedTraction.png'); 
    this.load.image('upRangeOfView',   '/icon/up-RangeOfView.png'); 
    this.load.image('upMgDmg',         '/icon/up-mgDamage.png'); 
    this.load.image('upMgRof',         '/icon/up-mgRof.png'); 
    this.load.image('upMgHp',          '/icon/up-mgHp.png'); 
    this.load.image('upCannonDmg',     '/icon/up-cannonDamage.png'); 
    this.load.image('upCannonRof',     '/icon/up-cannonRof.png'); 
    this.load.image('upCannonHp',      '/icon/up-cannonHp.png'); 
    this.load.image('upBRocketDmg',    '/icon/up-RocketDamage.png'); 
    this.load.image('upRocketRof',     '/icon/up-RocketRof.png'); 
    this.load.image('upRocketHp',      '/icon/up-RocketHp.png'); 

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

    // set up layer gaiser coordinate
    this.gaisersMap = this.make.tilemap({key: 'gaiserMap', tileWidth: 32, tileHeight:32});
    this.gaisersMap.createLayer(0,'gaisersCoord',-2048, -2048 );

    // finder grid 
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

    const Base =  this.add.sprite(0, 0, 'base');

    const baseBit = this.add.sprite(0, 0, 'baseBitanim').play('baseBit');

    // inizializza gruppi fisici
    this.tanks     = this.physics.add.group();
    this.enemies   = this.physics.add.group();
    this.buildings = this.physics.add.group();

    this.engineering = new Engineering(this, [-100,+400]);

    this.tankFactory = new TankFactory(this);

    // gaiser create by gaisersMap!
    for (let y = 0; y < this.gaisersMap.height; y++) {
  
        for (let x = 0; x < this.gaisersMap.width; x++) {
  
          let tileID = this.gaisersMap.layer.data[y][x].index;

          if(tileID === 4){

            const coord = fromTileToWorldPoint(this.gaisersMap.layer.data[y][x].x, this.gaisersMap.layer.data[y][x].y)
            this.tankFactory.createGaiser([coord[0],coord[1]]);

          }
        }
    }

    this.bulletPool = new BulletsPool(this);

    // setta collider tra gruppi fisici e wall ------------
    this.physics.add.collider(this.tanks);
    this.physics.add.collider(this.tanks, layer);
    this.physics.add.collider(this.tanks, this.enemies);
    this.physics.add.collider(this.enemies);
    this.physics.add.collider(this.enemies, this.tanks);
    this.physics.add.collider(this.enemies, layer);

    // overlap meno dispendioso per innescare logiche di esplosione e danno (nessuna ripercussione fisica)
    this.physics.add.overlap(this.bulletPool.userBulletsGroup, this.enemies,    (bullet, enemy) => {

      enemy.enemyInstance.takeDamage(bullet.bulletInstance.damage);
      bullet.bulletInstance.explode();

    });

    this.physics.add.overlap(this.bulletPool.enemyBulletsGroup, this.tanks,     (bullet, tank) => {

      tank.tankInstance.takeDamage(bullet.bulletInstance.damage);
      bullet.bulletInstance.explode();

    });

    this.physics.add.overlap(this.bulletPool.enemyBulletsGroup, this.buildings, (bullet, building) => {

      building.gaiserInstance.takeDamage(bullet.bulletInstance.damage);
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
    this.engineering.update();
    this.cameraController.update(delta);
    this.bulletPool.update();


    this.tanksGrp1.forEach((tank,index) => {
      if (tank.isDestroyed()) {

        this.tanksGrp1.splice(index, 1);
      }else{

        tank.update();
      }
    });


    this.enemiesGrp.forEach((enemy, index) => {
      if(enemy.isDestroyed()){

        this.enemiesGrp.splice(index, 1);
      }else{

        if(isNaN(enemy.enemy.x)){
          // prevenire l errore fatale (bug non trovato ancora)
          console.warn('lost enemy:', enemy.enemy.x, enemy.id);
          this.enemiesGrp[index].destroy();
          this.enemiesGrp.splice(index, 1);
          console.warn('splice & destroy:', enemy.id);

        }else{
          enemy.update(time);
        }

      }
    });





    if(this.buildingsGrp.length > 0 ){

      this.buildingsGrp.forEach((building, index) => {

        if(building.gaiser){

          if(!building.exploited){

            this.buildingsGrp.splice(index, 1);

          }else{

            building.update();

          }
        }
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
