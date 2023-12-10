import Phaser from "phaser";
import dat from 'dat.gui';
import {fromTileToTargetObj,fromTileToWorldPoint,fromPositionToTile} from "./mathFunction";
import {findPath} from "./Astar";

export default class Tank {
  constructor(scene, id, position){
    this.scene = scene;
    this.id = id;
    this.position = position;
    this.rotation = 0;
    this.isTankSelected = false;
    this.target = false;
    this.targets = []
    this.speed = 50;
    this.acceleration = 1;
    this.accIncrement = this.speed/60;
    this.break = false;
    this.friction = 0.96;
    this.tolerance = 32;



    this.tank = scene.add.sprite(position[0],position[1],'tankdebug');
    const tankWidth = 64;
    const tankHeight = 64;
    this.tank.setOrigin(0.5, 0.5);
    this.tank.displayWidth = tankWidth;
    this.tank.displayHeight = tankHeight;
    this.tank.angle = 0;

    scene.physics.world.enable(this.tank);
    this.tank.body.setCollideWorldBounds(true, 4, 4);
    this.tank.setInteractive();
    this.tank.body.setBounce(4,4)
    // console.log(this.tank.body)
    
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

  moveTankTo(target, tileTarget){

    this.targets = [];
    this.break = false;
    const tilePosition = fromPositionToTile(this.tank.x, this.tank.y);

    console.log('tank position', this.tank.x, this.tank.y, tilePosition )
    
    findPath(tilePosition[0], tilePosition[1], tileTarget[0], tileTarget[1])
      .then((Fpath) =>{

        console.log('Astar path founded', Fpath);
        Fpath.shift();
        const lastTile = Fpath[Fpath.length - 1];
        const filteredPath = Fpath.filter((tile, index) => index % 3 === 0);
        filteredPath.push(lastTile);


        this.target = fromTileToTargetObj(filteredPath[0].x,filteredPath[0].y);
        filteredPath.shift();


        this.scene.physics.moveToObject(this.tank,this.target , 1);
        
        const pathConvert = [];
        filteredPath.forEach(tile => {

          this.targets.push(fromTileToTargetObj(tile.x,tile.y))
        });
        console.log('conversione in array',this.targets);
        // this.targets = pathConvert;
      })
      .catch((error) => {
        console.error(error);
      });








  }

  moveTankToNext(target){
    console.log('move to next', target, this.targets)
    this.break = false;
    this.target = target;

    this.scene.physics.moveToObject(this.tank,this.target , 1);

  }

  pushTarget(target){

    if(!this.target && this.targets.length === 0){

      this.moveTankTo(target);

    }else{

      this.targets.push(target);

    }
  }
  
  update(){


        if(this.target){

          const distance = Phaser.Math.Distance.BetweenPoints(this.tank, this.target);
          if (distance < this.tolerance)
          {
              this.target = false;
              this.acceleration = this.speed;
              this.break = true;

              if(this.targets.length > 0 && !this.target){

                this.moveTankToNext(this.targets[0]) 
                this.targets.shift();

              }
          }

          if (!this.break && this.tank.body.speed > 0 && this.tank.body.speed <  this.speed  )
          {
            this.tank.rotation = this.tank.body.angle;
            this.acceleration += this.accIncrement;
            this.scene.physics.moveToObject(this.tank, this.target, this.acceleration);

          }else if (this.target){
            this.tank.rotation = this.tank.body.angle;
            this.break = true;
            this.acceleration = this.speed / 2;
            this.scene.physics.moveToObject(this.tank, this.target, this.speed);
            // Interpolate velocity toward (0, 0), starting at 10px away
            this.tank.body.velocity.lerp(
                Phaser.Math.Vector2.ZERO,
                Phaser.Math.Clamp(1 - distance / 50, 0, 1)
            );
        }
        
      }else{
        this.break = false;
      }
      //frizione
      this.tank.body.velocity.x *= this.friction;
      this.tank.body.velocity.y *= this.friction;
  }
}