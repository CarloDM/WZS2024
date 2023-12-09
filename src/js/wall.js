import Phaser from "phaser";

export default class wall {
  constructor(scene,position){
    this.scene = scene;
    this.position = position;

    this.wall = scene.add.sprite(position[0],position[1],'tankdebug');
    this.wall.setOrigin(0.5, 0.5);
    this.wall.displayWidth = 15;
    this.wall.displayHeight = 15;
    scene.physics.world.enable(this.wall);
    this.wall.body.setCollideWorldBounds(true);
    this.wall.setInteractive();

  }
}