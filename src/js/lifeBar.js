// import Phaser from "phaser";
import {calculateProportionalWidth} from "./mathFunction"

export default class LifeBar {
  constructor(scene, parent, hp ){
    this.scene = scene;
    this.parent = parent;
    this.hp = hp;
    this.lifeBar = this.scene.add.rectangle(this.parent.x, this.parent.y, this.parent.width /2 , 5, 0x00AB64, 0.75);
    this.lifeBar.container =  this.scene.add.rectangle(this.parent.x, this.parent.y, this.parent.width /2 , 5, 0x1d7196, 0);


    this.lifeBar.container.setStrokeStyle(1, 0x2C412C, 1);
    this.lifeBar.container.setOrigin(0.5, -4);

    this.lifeBar.setOrigin(0.5, -4);

  }


  destroy() {
    this.lifeBar.container.destroy();
    this.lifeBar.destroy();
  }


  update(){
    this.lifeBar.x = this.parent.x;
    this.lifeBar.y = this.parent.y;
    this.lifeBar.container.x = this.parent.x;
    this.lifeBar.container.y = this.parent.y;
    this.lifeBar.width = calculateProportionalWidth(this.parent.hp ,this.hp , this.parent.width /2 );

    if(this.lifeBar.width <= ((this.parent.width /2) /2) && this.lifeBar.width >= ((this.parent.width /2) /4) ){
      this.lifeBar.setFillStyle(0xEDB818, 0.75)
    }else if(this.lifeBar.width <= ((this.parent.width /2) /4)){
      this.lifeBar.setFillStyle(0xED3818, 0.9)
    }
  }
}