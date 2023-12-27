import Mg            from "./userMachineGun";
import Cannon        from "./userCannon";
import Rocket        from "./userRocket";
import LifeReloadBar from "./lifeReloadBar";
import {findPath}    from "./Astar";
import {fromTileToTargetObj,fromPositionToTile} from "./mathFunction";

export default class Tank  {
  constructor( type, scene, id, position, hp, speed, target){
    this.scene = scene;
    this.id = id;
    this.position = position;
    this.type = type;

    this.rotation = 0;
    this.isTankSelected = false;
    this.target = target;
    this.targets = [];
    this.afterTargets = [];
    this.speed = speed;
    this.acceleration = 1;
    this.accIncrement = this.speed/60;
    this.break = false;
    this.isDirected = false;
    this.friction = 0.80;
    this.tolerance = 64;
    this.selftCheck = false;
// ------

    this.tank = scene.add.sprite(position[0],position[1],'tank');
    this.tank.setOrigin(0.5, 0.5);
    this.tank.displayWidth = 32;
    this.tank.displayHeight = 32;
    scene.physics.world.enable(this.tank);
    this.tank.body.setCollideWorldBounds(true, 4, 4);
    this.tank.body.setBounce(4,4)
    this.tank.body.setCircle(32);
    this.tank.setInteractive();
    this.tank.hp = hp;


    switch (this.type) {
      case 'machineGun':
        this.tank.cannon = new Mg(this.scene, this.tank, this.id);
        break;
      case 'cannon':
        this.tank.cannon = new Cannon(this.scene, this.tank, this.id);
        break;
      case 'rocket':
        this.tank.cannon = new Rocket(this.scene, this.tank, this.id);
        break;
    }

    
    this.tank.lifeBar = new LifeReloadBar(this.scene, this.tank , hp);


    this.tank.tankInstance = this;
  }// tank constructor end






// this class functions---------------------------

  setTankSelected() {
    if(!this.isTankSelected){
      this.isTankSelected = true;
      this.tank.setTint(0xED3818);
    }
  }

  setTankUnselected(){
    this.isTankSelected = false;
    this.tank.clearTint(); // Ripristina il colore originale
  }

  moveTankTo(tileTarget, clearAfter){

    if(clearAfter){
      this.afterTargets= [];
    }
    this.isDirected = false;
    this.targets = [];
    this.break = false;
    const tilePosition = fromPositionToTile(this.tank.x, this.tank.y);

    findPath(tilePosition[0], tilePosition[1], tileTarget[0], tileTarget[1])
      .then((Fpath) =>{

        Fpath.shift();
        const lastTile = Fpath[Fpath.length - 1];
        const filteredPath = Fpath.filter((tile, index) => index % 3 === 0);
        filteredPath.push(lastTile);


        this.target = fromTileToTargetObj(filteredPath[0].x,filteredPath[0].y);
        filteredPath.shift();


        this.scene.physics.moveToObject(this.tank,this.target , 1);
        this.isDirected = true;
        // this.selftMoveControll();


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

  //         const tilePosition =  fromPositionToTile(this.tank.x, this.tank.y);
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
  //                     this.tank.x -= 64;
  //                     this.tank.y += 64;
  //                     break;
  //                   case 1:
  //                     this.tank.x += 64;
  //                     this.tank.y -= 64;
  //                     break;
  //                   case 2:
  //                     this.tank.x += 64;
  //                     this.tank.y += 64;
  //                     break;
  //                   case 3:
  //                     this.tank.x -= 64;
  //                     this.tank.y -= 64;
  //                     break;

  //                 }


  //                 if(this.tank.body){
  //                   clearInterval(check);

  //                   this.selftCheck = false;
  //                   this.moveTankTo(targetTile);
  //                 }else{
  //                   clearInterval(check);
  //                   console.log('clear selft check because tank is die', this.id);
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

    this.scene.physics.moveToObject(this.tank,this.target , 1);

  }

  pushTarget(target){

    if(!this.target && this.targets.length === 0){

      this.moveTankTo(target, true);

    }else{

      this.afterTargets.push(target);

    }
  }

  takeDamage(damage){
    this.tank.hp -= damage;

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
      parentObject: this.tank ,
      animation: "up",
      animationEase: "Sine.easeOut",
      animationDistance: 16,
      timeToLive: 250,
      })
  }
  
  destroy() {
    // Assicurati che il tank esista prima di tentare la distruzione
    if (this.tank.body) {
      // Distruggi il corpo fisico
      this.tank.body.destroy();
    }
    // Distruggi il tank
    this.tank.cannon.destroy()
    this.tank.lifeBar.destroy();
    this.tank.destroy();

  }

  isDestroyed() {
    if(!this.tank.active){
      return true
    }else{
      return false
    }
  }
  
// --------------------------------


// ---------------------------update
  update(){

    this.tank.cannon.update();
    this.tank.lifeBar.update();

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
                  
              }else if(this.afterTargets.length > 0 && !this.target){
                  
                this.moveTankTo(this.afterTargets[0], false)
                this.afterTargets.shift();
              }else{
                this.isDirected = false;
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


        
    if(this.tank.hp <= 0){
      this.destroy()
    }

  }
}