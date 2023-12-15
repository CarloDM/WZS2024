export default class Bullet {
  constructor(scene, x, y, rotation, speed ,size, damage, lifeTime){
    this.scene = scene;
    this.rotation = rotation;
    this.bullet = scene.add.sprite(x, y, 'bullet'); 
    this.bullet.setScale(size);
    this.velocity = scene.physics.velocityFromAngle(rotation, speed);
    this.damage = damage;
    // this.rotation = rotation;

    this.bullet.setOrigin(0.5, 0.5);
    this.bullet.displayWidth = size;
    this.bullet.displayHeight = size;
    
    scene.physics.world.enable(this.bullet);
    this.bullet.angle = this.rotation;
    this.bullet.body.setCollideWorldBounds(true, 1, 1);
    this.bullet.setInteractive();

    this.bullet.body.setVelocity(this.velocity.x, this.velocity.y);
    this.scene.add.existing(this.bullet);

    this.bullet.bulletInstance = this;

    setTimeout(() => {
      this.destroy();
    }, lifeTime);

  }//bullet constructor


  destroy() {
    if(this.bullet.body){
      this.bullet.body.destroy();
    }
    this.bullet.destroy();
  }

  isDestroyed() {
    if(!this.bullet.active){
      return true
    }else{
      return false
    }
  }
  

  update() {
  
    if(this.bullet.body){
      this.bullet.body.setVelocity(this.velocity.x,this.velocity.y);
    }
  }
  
}//bullet class