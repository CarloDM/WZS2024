import Phaser from "phaser";
import * as dat from 'dat.gui';

export {config};

class helloworld extends Phaser.Scene{
  constructor ()
  {super('helloworld');};



  preload(){

    const progress = this.add.graphics();

    this.load.on('progress', value =>
    {

        progress.clear();
        progress.fillStyle(0xffffff, 1);
        progress.fillRect(0, 270, 800 * value, 60);

    });

    this.load.on('complete', () =>
    {

        progress.destroy();

    });

  };

  init(){

    this.cameras.main.setBackgroundColor("#24252A");
  
    };

  create() {

    this.helloWorld = this.add.text(this.cameras.main.centerX,this.cameras.main.centerY,
      "Hello World",{ font: "40px Monospace",  fill: "#ffffff" });

    this.helloWorld.setOrigin(0.5);

    this.input.on('pointerdown', () => {
      this.scene.start('helloworlder');
    });

  }

  update() {

    this.helloWorld.angle += 1;

  };
}

class helloworlder extends Phaser.Scene{
  constructor ()
  {super('helloworlder');}
  
  preload(){};

  init(){

  this.cameras.main.setBackgroundColor("#24252A");

  };

  create() {

    this.helloWorld2 = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY,
      "Hello World",{ font: "40px Monospace",  fill: "#ffffff"});

    this.helloWorld2.setOrigin(0.5);

    this.input.on('pointerdown', () => {
      this.scene.start('helloworld');
    });

  };

  update() {

    this.helloWorld2.angle = 0;

  };
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  loader:{
    baseURL: '/src/assets/'
  },
  scene: [helloworld, helloworlder]
}
