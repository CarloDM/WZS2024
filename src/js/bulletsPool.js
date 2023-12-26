export default class BulletsPool {
  constructor(scene){
    this.scene = scene;
    this.bulletsGroup = this.scene.physucs.add.group({classType: Bullet, runChildUpdate: true });
    this.bullets = [];
  }
  createBullet(x, y, rotation, speed, size, damage, lifeTime){
    const bullet = this.bulletsGroup.get(x, y, 'bullet', size);
    if(!bullet) return;
    bullet.setProperties( rotation, speed,damage, lifeTime);
    this.bullets.push(bullet);
  }

  update(){
    this.bullets = this.bullets.filter(bullet => !bullet.isDestroyed());
    this.bullets.forEach(bullet => bullet.update());
  }
}