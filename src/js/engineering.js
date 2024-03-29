import Phaser from "phaser";
import UpgradeTable from "./upgradeTable";
import {calculateDistance,calculateRotationAngle,calculateIncrementBylevel, calculateMidPoint} from './mathFunction';

import {fromTileToTargetObj,fromPositionToTile} from "./mathFunction";
import {findPath} from "./Astar";

export default class Engineering  {
  constructor(scene, position){
    this.scene = scene;
    this.position = position;
    this.upgradeTable = UpgradeTable.getInstance();

    this.rotation = 0;

    this.target = false;
    this.targets = [];
    this.gaiserIndex = null;
    this.afterTargets = [];

    this.speed = 
      this.upgradeTable.engineerEfficiency[this.upgradeTable.engineerEfficiencyLevel].moveSpeed;

    this.acceleration = 1;
    this.accIncrement = this.speed/60;
    this.break = false;
    this.isDirected = false;
    this.friction = 0.80;
    this.tolerance = 64;
    this.range = 250;

    this.isWorking = false;
// ------

    this.engineering = scene.add.sprite(position[0],position[1],'engineering');
    this.engineering.setOrigin(0.5, 0.5);
    this.engineering.displayWidth = 48;
    this.engineering.displayHeight = 48;
    scene.physics.world.enable(this.engineering);
    this.engineering.body.setCollideWorldBounds(true, 4, 4);
    this.engineering.body.setBounce(4,4)
    this.engineering.body.setCircle(48);
    this.engineering.setInteractive();

    setTimeout(() => {
      this.scanForGaiser();
    }, 2000);

    this.engineering.engineeringInstance = this;

  }// engineering constructor end


// this class functions---------------------------
  scanForGaiser(){

    if(this.engineering.body){

      let gaiserScanned = [];
      // console.log(this.scene.gaiserGrp);
      if(this.scene.gaiserGrp.length > 0){

        this.scene.gaiserGrp.forEach(gaiser => {

          gaiserScanned.push(gaiser.gaiser);

        });

      }else{
        // console.log('non trovo altri', this.scene.gaiserGrp);
        setTimeout(() => {
          this.scanForGaiser();
        }, 5000);
      }

      this.calculateClosestFromBase(gaiserScanned);

    }else{
      // clearInterval(this.scanning)
    }

  }

  calculateClosestFromBase(gaisers){

    if(this.scene.gaiserGrp.length > 0){

      let midPoint = calculateMidPoint( 0, 0, this.engineering.x, this.engineering.y);

      let closestGaiser = gaisers.map((gaiser, index)=>{
      
        const distanceToBase = Math.floor(calculateDistance(midPoint[0] ,midPoint[1], gaiser.x, gaiser.y));
      
        return { x: gaiser.x , y: gaiser.y , distance: distanceToBase, index };
      
      })
      .reduce((closest, current) =>{
      
        if(current.distance < closest.distance){
          return current
        }else{
          return closest;
        }
        }, { x: null, y: null, distance: Infinity, index: -1 });
      
        this.target = [Math.floor(closestGaiser.x), Math.floor(closestGaiser.y)];
        this.gaiserIndex = closestGaiser.index ;
      
        this.moveTankTo(fromPositionToTile(this.target[0],this.target[1]));


    }else{
      // console.log('gaiser finiti');
    }
  }

  moveTankTo(tileTarget, clearAfter){

    if(clearAfter){
      this.afterTargets= [];
    }
    this.isDirected = false;
    this.targets = [];
    this.break = false;
    const tilePosition = fromPositionToTile(this.engineering.x, this.engineering.y);

    findPath(tilePosition[0], tilePosition[1], tileTarget[0], tileTarget[1])
      .then((Fpath) =>{

        Fpath.shift();
        const lastTile = Fpath[Fpath.length - 1];
        const filteredPath = Fpath.filter((tile, index) => index % 3 === 0);
        filteredPath.push(lastTile);

        this.target = fromTileToTargetObj(filteredPath[0].x,filteredPath[0].y);
        filteredPath.shift();

        this.scene.physics.moveToObject(this.engineering,this.target , 1);
        this.isDirected = true;

        filteredPath.forEach(tile => {

          this.targets.push(fromTileToTargetObj(tile.x,tile.y))
        });

      })
      .catch((error) => {
        console.error(error);
      });

  };

  moveTankToNext(target){

    this.break = false;
    this.target = target;

    this.scene.physics.moveToObject(this.engineering,this.target , 1);

  }

  build(){

    // console.log('building', this.scene.gaiserGrp[this.gaiserIndex] );

    setTimeout(() => {
        
        this.scene.gaiserGrp[this.gaiserIndex].exploited = true;
        this.scene.gaiserGrp[this.gaiserIndex].gaiser.gaiserInstance.startExtraction();
        // console.log('builded', this.scene.gaiserGrp[this.gaiserIndex]);
        
        this.scene.buildingsGrp.push(this.scene.gaiserGrp[this.gaiserIndex]);
        this.scene.buildings.add(this.scene.gaiserGrp[this.gaiserIndex].gaiser);
        this.scene.gaiserGrp.splice(this.gaiserIndex, 1);

        this.isWorking = false;
        this.scanForGaiser();
        
      
    },
    (30 * this.upgradeTable.engineerEfficiency[this.upgradeTable.engineerEfficiencyLevel].constructionTimeFactor) * 1000);
  }

  destroy() {

    if (this.engineering.body) {

      this.engineering.body.destroy();
    }


    this.tank.destroy();

  }

  isDestroyed() {
    if(!this.engineering.active){
      return true
    }else{
      return false
    }
  }
  

// ---------------------------update
  update(){


        if(this.target){

          const distance = Phaser.Math.Distance.BetweenPoints(this.engineering, this.target);

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
                // console.log('arrivato');
              
                if(!this.isWorking){
                  this.isWorking = true ;
                  this.build();
                }
              }
          }
            


          if (!this.break && this.engineering.body.speed > 0 && this.engineering.body.speed <  this.speed  )
          {
            this.engineering.rotation = this.engineering.body.angle;
            this.acceleration += this.accIncrement;
            this.scene.physics.moveToObject(this.engineering, this.target, this.acceleration);
              
          }else if (this.target){
            this.engineering.rotation = this.engineering.body.angle;
            this.break = true;
            this.acceleration = this.speed / 2;
            this.scene.physics.moveToObject(this.engineering, this.target, this.speed);
            // Interpolate velocity toward (0, 0), starting at 10px away
            this.engineering.body.velocity.lerp(
                Phaser.Math.Vector2.ZERO,
                Phaser.Math.Clamp(1 - distance / 50, 0, 1)
            );
        }
        
      }else{
        this.break = false;
      }
      //frizione
      this.engineering.body.velocity.x *= this.friction;
      this.engineering.body.velocity.y *= this.friction;

  }
}