import Phaser from "phaser";

import {calculateDistance,calculateRotationAngle} from './mathFunction';

export default class cannon {
  constructor(scene, tank, id){
    this.scene = scene;
    this.tank = tank;
    this.id = id;

    this.range = 450;
    this.rotationVelocity = 1;

    this.enemies = [];
    this.target = null;
    this.hookingAngle = 0;



    this.graphics = null;
    this.points = null;


    this.cannon = scene.add.sprite(this.tank.x, this.tank.y, 'cannon');
    this.cannon.angle = 180;


    this.scanning = setInterval(() => {
      this.scanForEnemies();
    }, 1500);






    // create circle range 
    this.graphics = scene.add.graphics({ lineStyle: { width: 1, color: 0xF5FFF7 },    fillStyle: { color: 0xF5FFF7 , alpha:0.20 }});
    this.circle = new Phaser.Geom.Circle(this.tank.x, this.tank.y, this.range );
  

  

    // visualizza circle range 
    this.points = this.circle.getPoints(8);
  
    for (let i = 0; i < this.points.length; i++)
        {
            const p = this.points[i];
        
            this.graphics.fillRect(p.x - 4, p.y - 4, 8, 8);
    }
    // debug range ------------a-------------
    
  }

  scanForEnemies(){

    if(this.tank.body){

        if(this.scene.enemiesGrp.length > 0){
        
              let enemiesScanned = []
              
              this.scene.enemiesGrp.forEach(enemy => {
              
                let distanceFromCannon =
                Math.floor(calculateDistance(this.circle.x, this.circle.y, enemy.position[0], enemy.position[1]));
                // console.log(distanceFromCannon, this.id);
              
                if(distanceFromCannon < this.circle.radius){
                
                    console.log('nemicoID:' , enemy.id ,'dentro raggio');
                    enemiesScanned.push(enemy);
                
                }else{
                  // console.log('nessun nemico')
                }
              
              });
            
            if(enemiesScanned.length > 0){
              this.enemies = enemiesScanned;
              this.calculateClosestEnemy();
            }else{
              this.target = null;
            }
        }


    }else{
      clearInterval(this.scanning)
    }

  }

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
      
        // console.log('nemico piu vicino ', closestEnemy.position)
        this.target = [Math.floor(closestEnemy.enemy.x), Math.floor(closestEnemy.enemy.y)];
        // console.log( [Math.floor(closestEnemy.enemy.x), Math.floor(closestEnemy.enemy.y)] );
        this.setHookingAngle();
    }

  }

  setHookingAngle(){
    let angle =
    Math.floor(calculateRotationAngle(this.cannon.x,this.cannon.y,this.target[0], this.target[1]));

    this.hookingAngle = angle;


  }

  destroy() {
    // Assicurati che il tank esista prima di tentare la distruzione
    if (this.cannon.body) {
      // Distruggi il corpo fisico
      this.cannon.body.destroy();
    }
    // Distruggi il tank & il suo cannone
    this.cannon.destroy();
    this.graphics.destroy();
    console.log('cannon also destroy')
  }



  update(){
    this.cannon.x = this.tank.x;
    this.cannon.y = this.tank.y;
    this.circle.x = this.tank.x;
    this.circle.y = this.tank.y;

    if(this.target){
      this.setHookingAngle();
      const angleDifference = Math.floor( Phaser.Math.Angle.ShortestBetween(this.hookingAngle, this.cannon.angle));
  
      if(angleDifference > 0){
  
          this.cannon.angle -= this.rotationVelocity;
  
      }else if (angleDifference < 0){
  
          this.cannon.angle += this.rotationVelocity;
        }

    }




    // debug range 
    this.points = this.circle.getPoints(16);

    // Pulisci i vecchi rettangoli
    this.graphics.clear();

    for (let i = 0; i < this.points.length; i++) {
        const p = this.points[i];
        // Disegna i nuovi rettangoli
        this.graphics.fillRect(p.x - 4, p.y - 4, 8, 8);
    }

  }
  
}//class