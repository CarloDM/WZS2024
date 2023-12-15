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

    // aggiunge proprietà enemy instance alla sprite
    this.enemy.enemyInstance = this;
  }
  
  takeDamage(damage){
    

    // plug floating damage
    this.scene.floatingNumbers.createFloatingText({
      textOptions: {
          fontFamily: 'monospace',
          fontSize: 30,
          color: "#ff0000",
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
  
  });
  }

}    