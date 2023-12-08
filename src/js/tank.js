import Phaser, { Time } from "phaser";
import dat from 'dat.gui';

export default class Tank {
  constructor(scene, id, position, worldBounds){
    this.scene = scene;
    this.id = id;
    this.position = position;
    this.isTankSelected = false;
    this.target = false;
    this.speed = 20;
    this.acceleration = 1;
    this.break = false;
    this.accIncrement = this.speed/60;

    this.tank = scene.add.sprite(position[0],position[1],'tankdebug');
    const tankWidth = 25;
    const tankHeight = 25;
    this.tank.setOrigin(0.5, 0.5);
    this.tank.displayWidth = tankWidth;
    this.tank.displayHeight = tankHeight;
    this.tank.angle = 0;

    scene.physics.world.enable(this.tank);
    this.tank.body.setCollideWorldBounds(true);
    this.tank.setInteractive();

    
  }

  setTankSelected() {
    if(!this.isTankSelected){
      this.isTankSelected = true;
      this.tank.setTint(0x00ff00);
    }
  }

  setTankUnselected(){
    this.isTankSelected = false;
    this.tank.clearTint(); // Ripristina il colore originale
  }

  moveTankTo(target){
    this.break = false;
    this.target = target;

    this.scene.physics.moveToObject(this.tank,this.target , 1);

  }
  
  update(){
            //  4 is our distance tolerance, i.e. how close the source can get to the target
        //  before it is considered as being there. The faster it moves, the more tolerance is required.



        if(this.target){
          const tolerance = 0.5;
          const distance = Phaser.Math.Distance.BetweenPoints(this.tank, this.target);
          if (distance < tolerance)
          {
              this.tank.body.reset(this.target.x, this.target.y);
              this.target = false;
              this.acceleration = 1;
              this.break = false;
          }

          if (!this.break && this.tank.body.speed > 0 && this.tank.body.speed <  this.speed  )
          {

            this.acceleration += this.accIncrement;
            this.scene.physics.moveToObject(this.tank, this.target, this.acceleration);

          }else if (this.target){

            this.break = true;
            this.acceleration = this.speed / 4;
            this.scene.physics.moveToObject(this.tank, this.target, this.speed);
            // Interpolate velocity toward (0, 0), starting at 10px away
            this.tank.body.velocity.lerp(
                Phaser.Math.Vector2.ZERO,
                Phaser.Math.Clamp(1 - distance / 50, 0, 1)
            );
        }

        }
  }
}