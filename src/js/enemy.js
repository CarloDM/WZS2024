import LifeBar from "./lifeBar";

export default class Enemy  {
  constructor(scene, id, position, hp){
    this.scene = scene;
    this.id = id;
    this.position = position;

    // --------------


    this.enemy = scene.add.sprite(position[0],position[1],'enemy');
    this.enemy.hp = hp
    this.enemy.displayWidth = 32;
    this.enemy.displayHeight = 32;
    this.enemy.angle = 0;
    scene.physics.world.enable(this.enemy);
    this.enemy.setOrigin(0.5, 0.5);
    this.enemy.body.setCollideWorldBounds(true);
    this.enemy.body.setCircle(32);
    this.enemy.body.setBounce(0,0);
    this.enemy.setInteractive();

    this.enemy.lifeBar = new LifeBar(this.scene, this.enemy , hp);

    // aggiunge proprietà enemy instance alla sprite
    this.enemy.enemyInstance = this;
  }
  
  takeDamage(damage){
    this.enemy.hp -= damage;

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
      parentObject: this.enemy ,
      animation: "up",
      animationEase: "Sine.easeOut",
      animationDistance: 16,
      timeToLive: 250,
      })
  }

  destroy() {

    if (this.enemy.body) {

      this.enemy.body.destroy();
    }
    this.enemy.lifeBar.destroy();
    this.enemy.destroy();

  }

  isDestroyed() {
    if(!this.enemy.active){
      return true
    }else{
      return false
    }
  }
  

  update(){

    this.enemy.lifeBar.update()

    this.enemy.body.velocity.x *= 0.95;
    this.enemy.body.velocity.y *= 0.95;
  
  
    if(this.enemy.hp <= 0){
      this.destroy()
    }
  }

}    