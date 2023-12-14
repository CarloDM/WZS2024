export default class Enemy  {
  constructor(scene, id, position){
    this.scene = scene;
    this.id = id;
    this.position = position;
    // --------------


    this.enemy = scene.add.sprite(position[0],position[1],'enemy');
    this.enemy.displayWidth = 32;
    this.enemy.displayHeight = 32;
    this.enemy.angle = 0;
    scene.physics.world.enable(this.enemy);
    this.enemy.body.setCollideWorldBounds(true);
    this.enemy.body.setCircle(32);
    this.enemy.setOrigin(0.5, 0.5);
    this.enemy.setInteractive();
    this.enemy.body.setBounce(0,0)
  }

}    