import UpgradeTable from "./upgradeTable";
import {calculateDistance,calculateRotationAngle,calculateIncrementBylevel} from './mathFunction';

export default class cannon {
  constructor(scene, enemy, id){

    this.scene = scene;
    this.enemy = enemy;
    this.id = id;
    this.scanCount = 0;
    this.upgradeTable = UpgradeTable.getInstance();

    this.damage = this.upgradeTable.cannonDamage[this.upgradeTable.enemyCannonDamageLevel].dmg

    const range = 
      calculateIncrementBylevel(320,this.upgradeTable.enemyRangeOfViewLevel,this.upgradeTable.tanksRangeOfView[1].incrementFactor );
    this.range = range;

    this.rotationVelocity =  this.upgradeTable.cannonRof[this.upgradeTable.enemyCannonRofLevel].rot;

    this.rof =               this.upgradeTable.cannonRof[this.upgradeTable.enemyCannonRofLevel].rof;
    this.shotCharge =        this.upgradeTable.cannonRof[this.upgradeTable.enemyCannonRofLevel].rof;

    this.tanks = [];
    this.target = null;
    this.tankTarget = false;
    this.hookingAngle = 0;
    this.isShooting = false;

    this.cannon = scene.add.sprite(this.enemy.x, this.enemy.y, 'enemyCannon');
    this.cannon.displayWidth = 64;
    this.cannon.displayHeight = 64;

    // create circle range 
    this.graphics = scene.add.graphics({ lineStyle: { width: 1, color: 0xDBA0BD },    fillStyle: { color: 0xDBA0BD , alpha:0.3 }});

    this.circle = new Phaser.Geom.Circle(this.enemy.x, this.enemy.y, this.range );
  
    // visualizza circle range 
    this.points = this.circle.getPoints(16);
  
    for (let i = 0; i < this.points.length; i++)
        {
            const p = this.points[i];
        
            this.graphics.fillRect(p.x - 4, p.y - 4, 8, 8);
    }
    // debug range -------------------------
  }// constructor
// ------------
// lo scanning del cannone nemico si differenzia per
// - scannerizza tank non enemy
// - deve dare precedenza a bersagli tank rispetto a costruzioni
  scanForTanks(){

        if(this.scene.tanksGrp1.length > 0){
          
              let tankScanned = []
              
              this.scene.tanksGrp1.forEach(tank => {

                let distanceFromCannon =
                Math.floor(calculateDistance(this.circle.x, this.circle.y, tank.tank.x, tank.tank.y));
              
                if(distanceFromCannon < this.circle.radius){
                    
                    tankScanned.push(tank);
                
                }else{
                  this.isShooting = false;
                }
              
              });
            
            if(tankScanned.length > 0){

              this.tankTarget = true;
              this.tanks = tankScanned;
              this.calculateClosestTank();

            }else{

              this.target = null;
              this.tankTarget = false;
              this.scanForBuild();

            }

        }else{
          this.isShooting = false;
          this.target = null;
          this.tankTarget = false;
          this.scanForBuild();
        }

  }

  calculateClosestTank(){

    if(this.tanks.length > 0){
        
        let closestTank = this.tanks.reduce((closest, tank) =>{
        
            const distanceTo = 
                  Math.floor(calculateDistance(this.circle.x, this.circle.y,tank.tank.x,tank.tank.y));
          
            if(distanceTo < closest.distance){
              return {tank, distance: distanceTo };
            }else{
              return closest;
            }
          
            }, { tank: null, distance: Infinity }).tank;
      
        this.tank = closestTank;
        this.setHookingAngle();
    }

  }

  scanForBuild(){

      if(this.scene.buildingsGrp.length > 0){

        let buildingsScanned = [];

        this.scene.buildingsGrp.forEach(building => {

          if(building.gaiser){
            
            let distanceFromCannon =
            Math.floor(calculateDistance(this.circle.x, this.circle.y, building.gaiser.x, building.gaiser.y));
          
            if(distanceFromCannon < this.circle.radius){
                
                buildingsScanned.push(building);
                
                
            }else{
              this.isShooting = false;
            }
          }
        });

        if(buildingsScanned.length > 0){
          this.buildings = buildingsScanned;
          this.calculateClosestBuilding();
        }else{
          this.enemy.enemyInstance.scanTargets('buildings');
        }

      }else{
        this.isShooting = false;
        this.target = null;
        this.enemy.enemyInstance.scanTargets('buildings');
      }

  }

  calculateClosestBuilding(){
    
    if(this.buildings.length > 0){
        
        let closestBuilding= this.buildings.reduce((closest, building) =>{

            const distanceTo = 
                  Math.floor(calculateDistance(this.circle.x, this.circle.y,building.gaiser.x,building.gaiser.y));
          
            if(distanceTo < closest.distance){
              return {building, distance: distanceTo };
            }else{
              return closest;
            }
          
            }, { building: null, distance: Infinity }).building;

        this.building = closestBuilding;

        this.setHookingAngle();
    }

  }

// ------------
  setHookingAngle(){

    if(this.tankTarget){

      this.target = [Math.floor(this.tank.tank.x), Math.floor(this.tank.tank.y)];
      let angle =
        Math.floor(calculateRotationAngle(this.cannon.x,this.cannon.y,this.target[0], this.target[1]));
  
      this.hookingAngle = angle;

    }else{

      this.target = [Math.floor(this.building.gaiser.x), Math.floor(this.building.gaiser.y)];
      let angle =
        Math.floor(calculateRotationAngle(this.cannon.x,this.cannon.y,this.target[0], this.target[1]));
  
      this.hookingAngle = angle;

    }
  }

// ------------
  fire(){

    const bulletPool = this.scene.bulletPool;
    const x = this.cannon.x;
    const y = this.cannon.y;
    const angle = this.cannon.angle;
    const speed = 750;
    const size = 8;
    const damage = this.damage;
    const lifeTime = 800;
    const type = 'machineGun'

    bulletPool.createEnemyBullet(x, y, angle, speed, size, damage, lifeTime, type);
  }
  
// ------------
  destroy() {

    if (this.cannon.body) {
      // Distruggi il corpo fisico
      this.cannon.body.destroy();
    }

    this.cannon.destroy();
    this.graphics.destroy();

  }

// ------------// ------------
  update(){

    // muovi cannone copiando cordinate tank
    this.cannon.x = this.enemy.x;
    this.cannon.y = this.enemy.y;
    this.circle.x = this.enemy.x;
    this.circle.y = this.enemy.y;
    this.circle.radius = this.range;
    // scanning interval
    this.scanCount ++ ;
    if(this.scanCount === 240){
      this.scanForTanks()
      this.scanCount = 0;
    }

    // reload intervall
    if(this.shotCharge <= this.rof){
      this.shotCharge ++;
    }else if (this.isShooting){
      this.fire();
      this.shotCharge = 0;
    }


    if(this.target){
    
      //angolo di aggancio
      this.setHookingAngle();
    
      // determina la differenza tra angolo cannone e angolo di aggancio
      const angleDifference = Math.floor( Phaser.Math.Angle.ShortestBetween(this.hookingAngle, this.cannon.angle));
      
      //anima la rotazione
      if(angleDifference > 0){
      
        this.cannon.angle -= this.rotationVelocity;
        
      }else if (angleDifference < 0){
        
        this.cannon.angle += this.rotationVelocity;
      
      }

      // apre chiude il fuoco se bersaglio è sotto mira o no
      if(angleDifference < 3 && angleDifference > -3 ){

          if(!this.isShooting){

            this.isShooting = true ;

          }

      }else{

          if(this.isShooting){

            this.isShooting = false;

          }

      }

    }// <-- se abbiamo un target




    // debug range 
    this.points = this.circle.getPoints(64);

    // Pulisci i vecchi rettangoli
    this.graphics.clear();

    for (let i = 0; i < this.points.length; i++) {
        const p = this.points[i];
        // Disegna i nuovi rettangoli
        this.graphics.fillRect(p.x - 4, p.y - 4, 2, 2);
    }

  }
  
}//class