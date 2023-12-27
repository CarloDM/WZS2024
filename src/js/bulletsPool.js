import Bullet from './Bullet';
export default class BulletsPool {
  constructor(scene){
    this.scene = scene;

    this.userBulletsGroup = this.scene.physics.add.group({classType: Bullet, runChildUpdate: true });
    this.userBullets = [];

    this.enemyBulletsGroup = this.scene.physics.add.group({classType: Bullet, runChildUpdate: true });
    this.enemyBullets = [];
  }


  createUserBullet(x, y, angle, speed, size, damage, lifeTime, type){

    const bullet = this.userBulletsGroup.get(x, y, 'bullet', size, type);
    if(!bullet) return;

    bullet.setProperties(angle, speed, size, damage, lifeTime);

    this.userBullets.push(bullet);
  }


  createEnemyBullet(x, y, angle, speed, size, damage, lifeTime, type){

    const bullet = this.enemyBulletsGroup.get(x, y, 'bullet', size, type);
    if(!bullet) return;

    bullet.setProperties(angle, speed, size, damage, lifeTime);

    this.enemyBullets.push(bullet);
  }


  update(){

    this.userBullets = this.userBullets.filter(bullet => !bullet.isDestroyed());
    this.userBullets.forEach(bullet => bullet.update());

    this.enemyBullets = this.enemyBullets.filter(bullet => !bullet.isDestroyed());
    this.enemyBullets.forEach(bullet => bullet.update());

  }
}