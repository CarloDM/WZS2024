import Phaser from "phaser";
import UpgradeTable from "./upgradeTable";
import StatusCounts from "./statusCounts";
import LifeBar from "./lifeBar";

export default class Gaiser {
  constructor(scene, position, id){
    this.scene = scene;
    this.id = id;
    this.upgradeTable = UpgradeTable.getInstance();
    this.StatusCounts = StatusCounts.getInstance();
    this.exploited = false;
    this.hp = 100;

    this.gaiser = scene.add.sprite(position[0],position[1],'gaiser');
    this.gaiser.setOrigin(0.5, 0.5);
    this.gaiser.displayWidth = 32;
    this.gaiser.displayHeight = 32;
    scene.physics.world.enable(this.gaiser);
    this.gaiser.body.setCollideWorldBounds(true, 4, 4);
    this.gaiser.body.setCircle(32);
    this.gaiser.setInteractive();
    this.gaiser.hp = 100;



    this.gaiser.gaiserInstance = this;
  }

  startExtraction(){

    // let fakeDestruction = setInterval(() => {
    //   if(this.gaiser.hp > 0){
    //     this.gaiser.hp -= 5;
    //     console.log(this.gaiser.hp);
    //   }else{
    //     console.log('finita autodistruzione');

    //     clearInterval(fakeDestruction);
    //   }
    // }, 500);
    // fakeDestruction;

    let extractionInerval = setInterval(() => {

      if(this.exploited){
        this.extractEnergy();
      }else{
        
        console.log('extraction lost');

        clearInterval(extractionInerval);
        this.gaiser.setTint(0x000000);
        this.gaiser.lifeBar.destroy();
        this.scene.buildingsGrp.filter(item => item.id !== this.id);

        setTimeout(() => {
          console.log('gaiser disponibile');

          this.gaiser.clearTint();
          this.gaiser.hp = 100;
          this.scene.gaiserGrp.push(this);
        }, 30000);

      }
    }, 5000);

    extractionInerval;
    this.gaiser.setTint(0xED3818);
    this.gaiser.lifeBar = new LifeBar(this.scene, this.gaiser , 100);
  }

  extractEnergy(){
    if(this.exploited){
      this.StatusCounts.energy += 
        this.upgradeTable.energyEfficiency[this.upgradeTable.energyEfficiencyLevel].extractionRate * 5;
      

      this.scene.floatingNumbers.createFloatingText({
        textOptions: {
            fontFamily: 'monospace',
            fontSize: 15,
            color: "#F5FFF7",
            strokeThickness: 1,
            fontWeight: "light",
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
        
        text: '+' + this.upgradeTable.energyEfficiency[this.upgradeTable.energyEfficiencyLevel].extractionRate * 5,
        align: "center",
        offsetX: 0,
        offsetY: 0,
        parentObject: this.gaiser ,
        animation: "up",
        animationEase: "Sine.easeOut",
        animationDistance: 16,
        timeToLive: 2000,
        });
    }
  }

  update(){
    this.gaiser.lifeBar.update()

    if(this.gaiser.hp <= 0 && this.exploited){
      this.exploited = false;
    }
  }

}