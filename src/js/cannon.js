import Phaser from "phaser";

import Bullet from './Bullet';

import {calculateDistance,calculateRotationAngle} from './mathFunction';

export default class cannon {
  constructor(scene, tank, id){

    this.scene = scene;
    this.tank = tank;
    this.id = id;

    this.range = 450;
    this.rotationVelocity = 0.5;
    this.rof = 120;
    this.shotCharge = 120;

    this.enemies = [];
    this.target = null;
    this.hookingAngle = 0;
    this.isShooting = false;

    this.cannon = scene.add.sprite(this.tank.x, this.tank.y, 'cannon');
    this.cannon.displayWidth = 64;
    this.cannon.displayHeight = 64;

    this.scanning = setInterval(() => {
      this.scanForEnemies();
    }, 1500);

    // create circle range 
    this.graphics = scene.add.graphics({ lineStyle: { width: 1, color: 0xF5FFF7 },    fillStyle: { color: 0xF5FFF7 , alpha:0.10 }});
    this.circle = new Phaser.Geom.Circle(this.tank.x, this.tank.y, this.range );
  
    // visualizza circle range 
    this.points = this.circle.getPoints(16);
  
    for (let i = 0; i < this.points.length; i++)
        {
            const p = this.points[i];
        
            this.graphics.fillRect(p.x - 4, p.y - 4, 8, 8);
    }
    // debug range -------------------------
    
  }


// ------------
  scanForEnemies(){

    if(this.tank.body){

        if(this.scene.enemiesGrp.length > 0){
          
              let enemiesScanned = []
              
              this.scene.enemiesGrp.forEach(enemy => {

                let distanceFromCannon =
                Math.floor(calculateDistance(this.circle.x, this.circle.y, enemy.enemy.x, enemy.enemy.y));
              
                if(distanceFromCannon < this.circle.radius){
                    
                    enemiesScanned.push(enemy);
                
                }else{
                  this.isShooting = false;
                }
              
              });
            
            if(enemiesScanned.length > 0){
              this.enemies = enemiesScanned;
              this.calculateClosestEnemy();
            }else{
              this.target = null;
            }
        }else{
          this.isShooting = false;
          this.target = null;
        }

    }else{
      clearInterval(this.scanning)
    }

  }
// ------------
  calculateClosestEnemy(){

    if(this.enemies.length > 0){
        
        let closestEnemy = this.enemies.reduce((closest, enemy) =>{
        
            const distanceTo = 
                  Math.floor(calculateDistance(this.circle.x, this.circle.y,enemy.position[0],enemy.position[1]));
          
            if(distanceTo < closest.distance){
              return {enemy, distance: distanceTo };
            }else{
              return closest;
            }
          
            }, { enemy: null, distance: Infinity }).enemy;
      

        this.target = [Math.floor(closestEnemy.enemy.x), Math.floor(closestEnemy.enemy.y)];

        this.setHookingAngle();
    }

  }
// ------------
  setHookingAngle(){

    let angle =
    Math.floor(calculateRotationAngle(this.cannon.x,this.cannon.y,this.target[0], this.target[1]));

    this.hookingAngle = angle;

  }
// ------------
  fire(){
    const bullet = new Bullet(this.scene, this.cannon.x, this.cannon.y, this.cannon.angle, 750, 8, 10, 1500 );
    this.scene.bulletsGrp.push(bullet);
    this.scene.bullets.add(bullet.bullet);
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
    this.cannon.x = this.tank.x;
    this.cannon.y = this.tank.y;
    this.circle.x = this.tank.x;
    this.circle.y = this.tank.y;

    // shot charging / reload
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
            console.warn('shooting true true')

          }

      }else{

          if(this.isShooting){
            this.isShooting = false;
            console.warn('shooting false ')

          }

      }
    

    }// <-- se abbiamo un target




    // debug range 
    this.points = this.circle.getPoints(128);

    // Pulisci i vecchi rettangoli
    this.graphics.clear();

    for (let i = 0; i < this.points.length; i++) {
        const p = this.points[i];
        // Disegna i nuovi rettangoli
        this.graphics.fillRect(p.x - 4, p.y - 4, 8, 8);
    }

  }
  
}//class