import Phaser from "phaser";
import Mg         from "./enemyMachineGun";
import Cannon     from "./enemyCannon";
import Rocket     from "./enemyRocket";
import LifeBar    from "./lifeBar";
import {findPath} from "./Astar";
import {fromTileToTargetObj,fromPositionToTile,calculateDistance} from "./mathFunction";

export default class Enemy  {
  constructor(type, scene, id, position, hp, speed){
    this.scene = scene;
    this.id = id;
    this.position = position;
    this.type = type;

    // --------------


    this.target = false;
    this.targets = [];
    this.speed = speed;
    this.acceleration = 1;
    this.accIncrement = this.speed/30;
    this.break = false;
    // this.isDirected = false;
    this.friction = 0.80;
    this.tolerance = 128;

    this.enemy = scene.add.sprite(position[0],position[1],'enemy');
    this.enemy.hp = hp
    this.enemy.displayWidth = 32;
    this.enemy.displayHeight = 32;
    this.enemy.angle = 0;
    scene.physics.world.enable(this.enemy);
    this.enemy.setOrigin(0.5, 0.5);
    this.enemy.body.setCollideWorldBounds(true);
    this.enemy.body.setCircle(32);
    this.enemy.body.setBounce(0,0);
    this.enemy.setInteractive();

    this.enemy.lifeBar = new LifeBar(this.scene, this.enemy , hp);

      switch (this.type) {
        case 'machineGun':
          this.enemy.cannon = new Mg(this.scene, this.enemy, this.id);
          break;
        case 'cannon':
          this.enemy.cannon = new Cannon(this.scene, this.enemy, this.id);
          break;
        case 'rocket':
          this.enemy.cannon = new Rocket(this.scene, this.enemy, this.id);
          break;
      }

      // this.debugScanning = setInterval(() => {
      //   this.scanTargets('all');
      // }, 5000);
// bun NaN semembra molto legato ai target, alla loro apparizione e scomparizione c è qualcosa...
    this.enemy.enemyInstance = this;
  }

  moveAway(){
    console.log('allontana');
    const coordinate = [
      [ -1840, -1776 ],
      [ -16,   -1776 ],
      [  1776, -1776 ],
      [  1744, -16   ],
      [  1808,  1776 ],
      [ -16,    1776 ],
      [ -1776,  1776 ],
      [ -1776, -16   ]
    ]
    const choice = Phaser.Math.Between(0,7);
    this.enemy.x = coordinate[choice][0];
    this.enemy.y = coordinate[choice][1];
    this.acceleration = 1;
    this.target = false;
    // this.enemy.cannon.scanCount = 0;
  }

  scanTargets(wich){

      let verifiedChoice = wich;

      if(this.scene.tanksGrp1.length < 1){
        verifiedChoice = 'buildings';
      }

      // se 0 building la base è stata distrutta
      if(this.scene.buildingsGrp.length < 1 && this.scene.tanksGrp1.length < 1){
        // console.warn('GAME OVER');
      }else{

        let targetScanned = [];

        switch (verifiedChoice) {
          // scan su qualunque cosa vicina gli mg
          case 'all': 

            let buildings = this.scanBuildings();
            let tanks = this.scanTanks();
            targetScanned = buildings.concat(tanks);
            // console.log('scann all');
            break;
          case 'buildings': 

            targetScanned = this.scanBuildings();
            // console.log('scann build',targetScanned, this.id );
            break;
  
          case 'tanks': 

            targetScanned = this.scanTanks();
            // console.log('scann tank');
            break;
        }
        if(targetScanned.length > 0){
          this.calculateClosestTarget(targetScanned);
        }
        
      }

  };

  scanBuildings(){

      let targetScanned = [];

      if(this.scene.buildingsGrp.length > 0 ){

        this.scene.buildingsGrp.forEach(building => {
          if(building.gaiser){
            targetScanned.push( [building.gaiser.x, building.gaiser.y] );
          }
        });

      }

      return targetScanned;

  };

  scanTanks(){

      let targetScanned = [];

      if(this.scene.tanksGrp1.length > 0 ){

        this.scene.tanksGrp1.forEach(tank => {
          targetScanned.push( [tank.tank.x, tank.tank.y] );
        });}

      return targetScanned;

  }

  scanForClosestTarget(){

      // scan su qualunque cosa vicina gli mg
      let targetScanned = [];

      if(this.scene.buildingsGrp.length > 0 ){

        this.scene.buildingsGrp.forEach(building => {
          targetScanned.push( [building.gaiser.x, building.gaiser.y] );
        });

      }
      if(this.scene.tanksGrp1.length > 0 ){

        this.scene.tanksGrp1.forEach(tank => {
          targetScanned.push( [tank.tank.x, tank.tank.y] );
        });

      }

      if(targetScanned.length > 0){
        this.calculateClosestTarget(targetScanned);
      }

  };

  calculateClosestTarget(targets){

      let closestTarget = targets.reduce((closest, target) => {

        const distance = Math.floor(calculateDistance(this.enemy.x, this.enemy.y, target[0], target[1]));

        if(distance < closest.distance){
          return {target, distance: distance };
        }else{
          return closest;
        }
      
        }, { target: null, distance: Infinity });

        if(closestTarget.target !== null){

          this.moveTankTo(fromPositionToTile(closestTarget.target[0],closestTarget.target[1]));

        }else{
          console.error('reduce non ha dato risultato valido', closestTarget, targets, this.enemy.x, this.enemy.y );
        }

  }

  moveTankTo(tileTarget){

    
    const tilePosition = fromPositionToTile(this.enemy.x, this.enemy.y);

    findPath(tilePosition[0], tilePosition[1], tileTarget[0], tileTarget[1])
      .then((Fpath) =>{

        if(Fpath.length > 5){

          Fpath.shift();
          
          const lastTile = Fpath[Fpath.length - 1];

          const filteredPath = Fpath.filter((tile, index) => index % 4 === 0);

          filteredPath.push(lastTile);

          this.target = fromTileToTargetObj(filteredPath[0].x,filteredPath[0].y);

          filteredPath.shift();

          this.scene.physics.moveToObject(this.enemy ,this.target , 1);

          this.targets = [];
          filteredPath.forEach(tile => {
            
          this.targets.push(fromTileToTargetObj(tile.x,tile.y))

            });

        }else{
          console.log('path maggiore di 5', this.id, this.target);
          // this.target = false;
        }


      })
      .catch((error) => {
        // console.error(error);
      });

  };

  moveTankToNext(target){

    this.target = target;
    const body = this.enemy.body;
    if(body){
    this.scene.physics.moveToObject(this.enemy,this.target , 1);
    }else{console.warn('somethings wrong!')}


  }
  
  takeDamage(damage){
    this.enemy.hp -= damage;

    // plug floating damage
    this.scene.floatingNumbers.createFloatingText({
      textOptions: {
          fontFamily: 'monospace',
          fontSize: 30,
          color: "#F5FFF7",
          strokeThickness: 1,
          fontWeight: "bold",
          stroke: "#000000",
          shadow: {
              offsetX: 0,
              offsetY: 1,
              color: '#000000',
              blur: 3,
              stroke: true,
              fill: true
          }
      },
      
      text: '-' + damage,
      align: "top-center",
      offsetX: 0,
      offsetY: 0,
      parentObject: this.enemy ,
      animation: "up",
      animationEase: "Sine.easeOut",
      animationDistance: 16,
      timeToLive: 250,
      })
  }

  destroy() {

    if (this.enemy.body) {

      this.enemy.body.destroy();
    }
    this.enemy.cannon.destroy()
    this.enemy.lifeBar.destroy();
    this.enemy.destroy();

  }

  isDestroyed() {
    if(!this.enemy.active){
      return true
    }else{
      return false
    }
  }
  
  update(){

    this.enemy.cannon.update();
    this.enemy.lifeBar.update()


    if(this.target){


        const distance = Phaser.Math.Distance.BetweenPoints(this.enemy, this.target);

        if (distance < this.tolerance){

            this.target = false;

            if(this.targets.length > 0 && !this.target){

              this.moveTankToNext(this.targets[0]) 
              this.targets.shift();

            }

        }else if (this.break && this.acceleration < this.speed && this.target){ 

          this.enemy.rotation = this.enemy.body.angle;
          this.acceleration += this.accIncrement;
          this.scene.physics.moveToObject(this.enemy, this.target, this.acceleration);

        }else if (this.target){

          if(this.break){
            this.break = false;
          }

          this.enemy.rotation = this.enemy.body.angle;
          this.scene.physics.moveToObject(this.enemy, this.target, this.speed);

        }
    

    }else if(!this.break){
      this.break = true;
      this.acceleration = 1;
    }


    this.enemy.body.velocity.x *= this.friction;
    this.enemy.body.velocity.y *= this.friction;
  
  
    if(this.enemy.hp <= 0){
      this.destroy()
    }
  }

}    