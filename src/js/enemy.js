import Phaser from "phaser";

import Mg from "./enemyMachineGun";
import Cannon from "./enemyCannon";
import Rocket from "./enemyRocket";

import {fromTileToTargetObj,fromPositionToTile} from "./mathFunction";
import {findPath} from "./Astar";
import LifeBar from "./lifeBar";
import {calculateDistance,calculateRotationAngle,calculateIncrementBylevel} from './mathFunction';

export default class Enemy  {
  constructor(type, scene, id, position, hp){
    this.scene = scene;
    this.id = id;
    this.position = position;
    this.type = type;

    // --------------

    this.rotation = 0;
    this.isTankSelected = false;
    this.target = false;
    this.targets = [];
    this.speed = 50;
    this.acceleration = 1;
    this.accIncrement = this.speed/60;
    this.break = false;
    this.isDirected = false;
    this.friction = 0.80;
    this.tolerance = 128;
    this.selftCheck = false;

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

      // enemy deve preferire:
      //  edifici x i Cannoni 
      //  tank x rocket 
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



    // setTimeout(() => {
    //   this.scanTargets('buildings');

    // }, 2000);

    // aggiunge proprietà enemy instance alla sprite
    this.enemy.enemyInstance = this;
  }

  scanTargets(wich){

    if(this.enemy.body){

      let verifiedChoice = wich;

      if(this.scene.tanksGrp1.length < 1){
        verifiedChoice = 'buildings';
      }

      // se 0 building la base è stata distrutta
      if(this.scene.buildingsGrp.length < 1 && this.scene.tanksGrp1.length < 1){
        console.warn('GAME OVER');
      }else{

        let targetScanned = [];

        switch (verifiedChoice) {
          // scan su qualunque cosa vicina gli mg
          case 'all': 

            let buildings = this.scanBuildings();
            let tanks = this.scanTanks();
            targetScanned = buildings.concat(tanks);
  
            break;
          case 'buildings': 

            targetScanned = this.scanBuildings();
            
            break;
  
          case 'tanks': 

            targetScanned = this.scanTanks();
  
            break;
        }
        
        this.calculateClosestTarget(targetScanned);
        
      }

    }else{console.warn('no body')}//enemy distrutto
  };

  scanBuildings(){

    if(this.enemy.body){
      // scan su qualunque cosa vicina gli mg
      let targetScanned = [];

      if(this.scene.buildingsGrp.length > 0 ){

        this.scene.buildingsGrp.forEach(building => {
          if(building.gaiser){
            targetScanned.push( [building.gaiser.x, building.gaiser.y] );
          }
        });

      }

      return targetScanned;

    }else{
      return [0,0];
    }
  };

  scanTanks(){

    if(this.enemy.body){

      let targetScanned = [];

      if(this.scene.tanksGrp1.length > 0 ){

        this.scene.tanksGrp1.forEach(tank => {
          targetScanned.push( [tank.tank.x, tank.tank.y] );
        });

      return targetScanned;

      }else{
        return [0,0];
      }

    };

  }


  scanForClosestTarget(){

    if(this.enemy.body){
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

      this.calculateClosestTarget(targetScanned);

    }else{}
  };

  calculateClosestTarget(targets){

    if(targets.length > 0 ){

      let closestTarget = targets.reduce((closest, target) => {

        const distance = Math.floor(calculateDistance(this.enemy.x, this.enemy.y, target[0], target[1]));

        if(distance < closest.distance){
          return {target, distance: distance };
        }else{
          return closest;
        }
      
        }, { target: null, distance: Infinity });

        if(closestTarget.target !== null){
          this.target = closestTarget.target;
          this.moveTankTo(fromPositionToTile(this.target[0],this.target[1]));
        }else{
          console.error('reduce non ha dato risultato valido', closestTarget, targets, this.enemy.x, this.enemy.y );
        }

    } 
  }

  moveTankTo(tileTarget, clearAfter){

    if(clearAfter){
      this.afterTargets= [];
    }
    this.isDirected = false;
    this.targets = [];
    this.break = false;
    const tilePosition = fromPositionToTile(this.enemy.x, this.enemy.y);

    findPath(tilePosition[0], tilePosition[1], tileTarget[0], tileTarget[1])
      .then((Fpath) =>{

        Fpath.shift();
        const lastTile = Fpath[Fpath.length - 1];
        const filteredPath = Fpath.filter((tile, index) => index % 3 === 0);
        filteredPath.push(lastTile);


        this.target = fromTileToTargetObj(filteredPath[0].x,filteredPath[0].y);
        filteredPath.shift();


          this.scene.physics.moveToObject(this.enemy ,this.target , 1);
          this.isDirected = true;


        filteredPath.forEach(tile => {

          this.targets.push(fromTileToTargetObj(tile.x,tile.y))
        });

      })
      .catch((error) => {
        console.error(error);
      });

  };


  // selftMoveControll(){

  // if(!this.selftCheck){

  //   this.selftCheck = true;
  //   let positionVerified = [];

  //     let check = setInterval(() => {

  //       if(this.isDirected){

  //         const tilePosition =  fromPositionToTile(this.enemy.x, this.enemy.y);
  //         positionVerified.push(tilePosition);


  //           if(positionVerified.length >= 5){
  //             positionVerified.shift();
  //             if(
  //               positionVerified[0].toString() === positionVerified[1].toString() &&
  //               positionVerified[0].toString() === positionVerified[2].toString() &&
  //               positionVerified[0].toString() === positionVerified[3].toString() &&
  //               this.target
  //               ){

  //                 let targetPosition = null;

  //                 if(this.targets.length > 0){
  //                   targetPosition = this.targets[this.targets.length -1];
  //                 }else{
  //                   targetPosition = this.target;
  //                 }

  //                 const targetTile = fromPositionToTile(targetPosition.x, targetPosition.y );

  //                 //tentativi di sbroglio
  //                 let choice = Phaser.Math.Between(0, 3);
  //                 switch (choice) {

  //                   case 0:
  //                     this.enemy.x -= 64;
  //                     this.enemy.y += 64;
  //                     break;
  //                   case 1:
  //                     this.enemy.x += 64;
  //                     this.enemy.y -= 64;
  //                     break;
  //                   case 2:
  //                     this.enemy.x += 64;
  //                     this.enemy.y += 64;
  //                     break;
  //                   case 3:
  //                     this.enemy.x -= 64;
  //                     this.enemy.y -= 64;
  //                     break;

  //                 }


  //                 if(this.enemy.body){
  //                   clearInterval(check);

  //                   this.selftCheck = false;
  //                   this.moveTankTo(targetTile);
  //                 }else{
  //                   clearInterval(check);
  //                   console.log('clear selft check because enemy die', this.id);
  //                 }

  //               };
  //           }

  //       }else{

  //         clearInterval(check);
  //         positionVerified = [];
  //         this.selftCheck = false;
  //       }

  //     }, 3000);

  //     check;

  //   }else{};
  // }

  moveTankToNext(target){

    this.break = false;
    this.target = target;

      this.scene.physics.moveToObject(this.enemy,this.target , 1);

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

    if(isNaN(this.enemy.x)){
      console.log(this.id, 'cord pre:', this.enemy.x, this.enemy.y);
    }
    
    this.enemy.cannon.update();
    this.enemy.lifeBar.update()


    if(this.target){
      const distance = Phaser.Math.Distance.BetweenPoints(this.enemy, this.target);

      if (distance < this.tolerance)
      {
          this.target = false;
          this.acceleration = this.speed;
          this.break = true;
          
          if(this.targets.length > 0 && !this.target){
              
            this.moveTankToNext(this.targets[0]) 
            this.targets.shift();
              
          }else{
            this.isDirected = false;
          }

          if(isNaN(this.enemy.x)){
            console.log(this.id, 'cord mid:', this.enemy.x, this.enemy.y, this.enemy);
          }
      }
        


      if (!this.break && this.enemy.body.speed > 0 && this.enemy.body.speed <  this.speed  )
      {
        this.enemy.rotation = this.enemy.body.angle;
        this.acceleration += this.accIncrement;

          this.scene.physics.moveToObject(this.enemy, this.target, this.acceleration);

          if(isNaN(this.enemy.x)){
            console.log(this.id, 'cord if 1:', this.enemy.x, this.enemy.y);
          }
          
      }else if (this.target){
        this.enemy.rotation = this.enemy.body.angle;
        this.break = true;
        this.acceleration = this.speed / 2;

        if(isNaN(this.enemy.x)){
          console.log(this.id, 'cord if 2 try no block');
        }else{
          this.scene.physics.moveToObject(this.enemy, this.target, this.speed);
          // Interpolate velocity toward (0, 0), starting at 10px away
          this.enemy.body.velocity.lerp(
              Phaser.Math.Vector2.ZERO,
              Phaser.Math.Clamp(1 - distance / 50, 0, 1)
          );
        }


        if(isNaN(this.enemy.x)){
          console.log(this.id, 'cord if 2:', this.enemy.x, this.enemy.y);
        }
    }
    
    
    if(isNaN(this.enemy.x)){
      console.log(this.id, 'cord post:', this.enemy.x, this.enemy.y);
    }

  }else{
    this.break = false;
  }



    
    this.enemy.body.velocity.x *= 0.95;
    this.enemy.body.velocity.y *= 0.95;
  
  
    if(this.enemy.hp <= 0){
      this.destroy()
    }
  }

}    