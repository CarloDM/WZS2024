export default class Bullet extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, type) {
    super(scene, x, y, 'bullet');
    scene.physics.world.enable(this);
    this.scene = scene;
    this.bulletInstance = this;
    this.type = type;
  }//bullet constructor

  setProperties(angle, speed, size, damage, lifeTime ) {

    this.angle = angle;
    this.displayWidth = size;
    this.displayHeight = size;
    this.velocity = this.scene.physics.velocityFromAngle(angle, speed);
    this.damage = damage;

    this.body.setCollideWorldBounds(true, 1, 1);
    this.body.setVelocity(this.velocity.x, this.velocity.y);

    switch (this.type) {
      case 'machineGun':
        // this.setTexture('bulletMachineGun');
        break;
      case 'cannon':
        // this.setTexture('bulletCannon');
        break;
      case 'rocket':
        // this.setTexture('bulletRocket');
        break;
    }
  

    
    this.scene.time.delayedCall(lifeTime, () => {
    this.explode(); 
    });

  }

  explode() {
    if(this.active){
      const explosion = this.scene.add.sprite(this.x + this.velocity.x /30, this.y + this.velocity.y/30, 'explosion1')
      .play('explosion')
      .on('animationcomplete', () => {
        explosion.destroy();
      });
      this.destroy();
    }
  }

  destroy() {
    if(this.body){
      this.body.destroy();
    }
    super.destroy();
  }

  isDestroyed() {
    return !this.active;
  }
  


  
}//bullet class