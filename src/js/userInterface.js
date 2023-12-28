import UpgradeTable from "./upgradeTable";
import StatusCounts from "./statusCounts";
import {calculateProportionalWidth} from './mathFunction';
export default class UserInterface {
  constructor(scene){
    this.scene = scene;
    this.camera = this.scene.cameras.main;
    this.upgradeTable = UpgradeTable.getInstance();
    this.statusCounts = StatusCounts.getInstance();


    this.container = this.scene.add.container(
      this.camera.worldView.x + 25 / this.camera.zoom,
      this.camera.worldView.y + 25 / this.camera.zoom
      );
    

    // --- aggiunta btn
    this.energyBar = this.scene.add.rectangle(
      0,0,0,0, 0x1d7196, 0.5
    );
    this.energyBar.setOrigin(0, 0);
    this.container.add(this.energyBar);
    


    
    // --- aggiunta btn
    this.buttonA = this.scene.add.sprite(0,0,'btn1',[this.statusCounts.button1]);
    this.buttonA.setOrigin(0, 0);
    this.buttonA.on('pointerup' ,this.btnFunction, this);
    this.buttonA.setInteractive();
    this.container.add(this.buttonA);

    
    //-- btn ------
    this.buttonB = this.scene.add.sprite(0,0,'btn2');
    this.buttonB.setOrigin(0, 0);
    this.buttonB.on('pointerup' ,this.btnFunction2, this);
    this.buttonB.setInteractive();
    this.container.add(this.buttonB);
    //-- btn ------
    this.buttonC = this.scene.add.sprite(0,0,'btnBoost');
    this.buttonC.setOrigin(0, 0);
    this.buttonC.on('pointerup' ,this.btnFunction3, this);
    this.buttonC.setInteractive();
    this.container.add(this.buttonC);
    //-- btn ------
    this.buttonD = this.scene.add.sprite(0,0,'btnUpgrade');
    this.buttonD.setOrigin(0, 0);
    this.buttonD.on('pointerup' ,this.btnFunction4, this);
    this.buttonD.setInteractive();
    this.container.add(this.buttonD);
    //-- btn ------
    this.buttonE = this.scene.add.sprite(0,0,'btnUpgrade');
    this.buttonE.setOrigin(0, 0);
    this.container.add(this.buttonE);
    //-- btn ------
    this.buttonF = this.scene.add.sprite(0,0,'btnUpgrade');
    this.buttonF.setOrigin(0, 0);
    this.container.add(this.buttonF);
    //-- btn ------
    this.buttonG = this.scene.add.sprite(0,0,'btnUpgrade');
    this.buttonG.setOrigin(0, 0);
    this.container.add(this.buttonG);

    //-- btn ------DECK
    this.buttonH = this.scene.add.sprite(0,0,'btnDeck', [this.statusCounts.btnDeck1]);
    this.buttonH.setOrigin(0, 0);
    this.buttonH.on('pointerup' ,this.btnFunctionDeck1, this);
    this.buttonH.setInteractive();
    this.container.add(this.buttonH);
// ----
    this.buttonI = this.scene.add.sprite(0,0,'btnDeck', [this.statusCounts.btnDeck3]);
    this.buttonI.setOrigin(0, 0);
    this.buttonI.on('pointerup' ,this.btnFunctionDeck2, this);
    this.buttonI.setInteractive();
    this.container.add(this.buttonI);
// ----
    this.buttonL = this.scene.add.sprite(0,0,'btnDeck', [this.statusCounts.btnDeck2]);
    this.buttonL.setOrigin(0, 0);
    this.buttonL.on('pointerup' ,this.btnFunctionDeck3, this);
    this.buttonL.setInteractive();
    this.container.add(this.buttonL);
// ----
    this.buttonM = this.scene.add.sprite(0,0,'btnDeck', [this.statusCounts.btnDeck4]);
    this.buttonM.setOrigin(0, 0);
    this.buttonM.on('pointerup' ,this.btnFunctionDeck4, this);
    this.buttonM.setInteractive();
    this.container.add(this.buttonM);
// ----





    this.container.setDepth(999)
    this.scene.add.existing(this.container);
  }

  btnFunction(){
    if(this.statusCounts.button1 === 2)
        {this.statusCounts.button1 = 0;}
    else{this.statusCounts.button1 ++;}
    
    this.buttonA.setFrame(this.statusCounts.button1);




    // console.log('Il pulsante A è stato cliccato!');
    // let fattore = (10 - 2) / 10;
    // let valore = 2;
    // for (let index = 0; index < 10; index++) {
    //   valore += fattore;
    //     console.log(valore)
      
    // }
  }

  btnFunction2(){

    console.log('creare nuovo mg tank');
    this.scene.tankFactory.tankFactoryIstance.createRocketTank(0,0);
  }

  btnFunction4(){

    console.log('creare nuovo enemy');
    this.scene.tankFactory.tankFactoryIstance.createEnemy([0,-1650]);
  }

  btnFunction3(){

    if(this.upgradeTable.tanksSpeedTractionLevel < 10){
      
      console.log('fai upgrade di tank velocity & rangeview');
      this.upgradeTable.tanksSpeedTractionLevel ++
  
      this.scene.tanksGrp1.forEach(tank => {
  
        tank.speed *= 
          this.upgradeTable.tanksSpeedTraction[this.upgradeTable.tanksSpeedTractionLevel].incrementFactor;
  
        tank.speed = Math.floor(tank.speed);
  
      });
  
      this.upgradeTable.tanksRangeOfViewLevel ++
      this.scene.tanksGrp1.forEach(tank => {
        
        tank.tank.cannon.range *=
        this.upgradeTable.tanksRangeOfView[this.upgradeTable.tanksRangeOfViewLevel].incrementFactor;
  
        tank.tank.cannon.range = Math.floor(tank.tank.cannon.range);
        
      });
    }

  }

  btnFunctionDeck1(){
    if(this.statusCounts.btnDeck1 === 3)
    {this.statusCounts.btnDeck1 = 0;}
    else{this.statusCounts.btnDeck1 ++;}

    this.buttonH.setFrame(this.statusCounts.btnDeck1);

    this.scene.tankFactory.tankFactoryIstance.deck1Production();

    }

  btnFunctionDeck2(){
    if(this.statusCounts.btnDeck2 === 3)
    {this.statusCounts.btnDeck2 = 0;}
    else{this.statusCounts.btnDeck2 ++;}

    this.buttonI.setFrame(this.statusCounts.btnDeck2);

    this.scene.tankFactory.tankFactoryIstance.deck2Production();
    }

  btnFunctionDeck3(){
    if(this.statusCounts.btnDeck3 === 3)
    {this.statusCounts.btnDeck3 = 0;}
    else{this.statusCounts.btnDeck3 ++;}

    this.buttonL.setFrame(this.statusCounts.btnDeck3);

    this.scene.tankFactory.tankFactoryIstance.deck3Production();
    }

  btnFunctionDeck4(){
    if(this.statusCounts.btnDeck4 === 3)
    {this.statusCounts.btnDeck4 = 0;}
    else{this.statusCounts.btnDeck4 ++;}

    this.buttonM.setFrame(this.statusCounts.btnDeck4);

    this.scene.tankFactory.tankFactoryIstance.deck4Production();
    }

  update(){
    const zoom = this.camera.zoom

    this.container.x = this.camera.worldView.x + 25 / zoom;
    this.container.y = this.camera.worldView.y + 25 / zoom;

    this.energyBar.width = (this.camera.worldView.width * 0.8 );
    this.energyBar.height = 20 / zoom;
    this.energyBar.x = calculateProportionalWidth(10, 110, this.camera.worldView.width - (50 / this.camera.zoom));
    this.energyBar.y = calculateProportionalWidth(99, 100, this.camera.worldView.height - (50 / this.camera.zoom));

    this.buttonA.displayWidth = 75 / zoom;
    this.buttonA.displayHeight = 75 / zoom;
    this.buttonA.x = calculateProportionalWidth(2, 110, this.camera.worldView.width - (50 / this.camera.zoom));
    this.buttonA.y = calculateProportionalWidth(89, 100, this.camera.worldView.height - (50 / this.camera.zoom));



    this.buttonB.displayWidth = 75 /zoom;
    this.buttonB.displayHeight = 75 /zoom;
    this.buttonB.x = calculateProportionalWidth(12, 110, this.camera.worldView.width - (50 / this.camera.zoom));
    this.buttonB.y = calculateProportionalWidth(89, 100, this.camera.worldView.height - (50 / this.camera.zoom));

    
    this.buttonC.displayWidth = 75 /zoom;
    this.buttonC.displayHeight = 75 /zoom;
    this.buttonC.x = calculateProportionalWidth(22, 110, this.camera.worldView.width - (50 / this.camera.zoom));
    this.buttonC.y = calculateProportionalWidth(89, 100, this.camera.worldView.height - (50 / this.camera.zoom));

    
    this.buttonD.displayWidth = 75 /zoom;
    this.buttonD.displayHeight = 75 /zoom;
    this.buttonD.x = calculateProportionalWidth(32, 110, this.camera.worldView.width - (50 / this.camera.zoom));
    this.buttonD.y = calculateProportionalWidth(89, 100, this.camera.worldView.height - (50 / this.camera.zoom));

    
    this.buttonE.displayWidth = 75 /zoom;
    this.buttonE.displayHeight = 75 /zoom;
    this.buttonE.x = calculateProportionalWidth(42, 110, this.camera.worldView.width - (50 / this.camera.zoom));
    this.buttonE.y = calculateProportionalWidth(89, 100, this.camera.worldView.height - (50 / this.camera.zoom));

    
    this.buttonF.displayWidth = 75 /zoom;
    this.buttonF.displayHeight = 75 /zoom;
    this.buttonF.x = calculateProportionalWidth(52, 110, this.camera.worldView.width - (50 / this.camera.zoom));
    this.buttonF.y = calculateProportionalWidth(89, 100, this.camera.worldView.height - (50 / this.camera.zoom));

    
    this.buttonG.displayWidth = 75 /zoom;
    this.buttonG.displayHeight = 75 /zoom;
    this.buttonG.x = calculateProportionalWidth(62, 110, this.camera.worldView.width - (50 / this.camera.zoom));
    this.buttonG.y = calculateProportionalWidth(89, 100, this.camera.worldView.height - (50 / this.camera.zoom));

    
    this.buttonH.displayWidth = 75 /zoom;
    this.buttonH.displayHeight = 75 /zoom;
    this.buttonH.x = calculateProportionalWidth(72, 110, this.camera.worldView.width - (50 / this.camera.zoom));
    this.buttonH.y = calculateProportionalWidth(89, 100, this.camera.worldView.height - (50 / this.camera.zoom));

    
    this.buttonI.displayWidth = 75 /zoom;
    this.buttonI.displayHeight = 75 /zoom;
    this.buttonI.x = calculateProportionalWidth(82, 110, this.camera.worldView.width - (50 / this.camera.zoom));
    this.buttonI.y = calculateProportionalWidth(89, 100, this.camera.worldView.height - (50 / this.camera.zoom));

    
    this.buttonL.displayWidth = 75 /zoom;
    this.buttonL.displayHeight = 75 /zoom;
    this.buttonL.x = calculateProportionalWidth(92, 110, this.camera.worldView.width - (50 / this.camera.zoom));
    this.buttonL.y = calculateProportionalWidth(89, 100, this.camera.worldView.height - (50 / this.camera.zoom));

    
    this.buttonM.displayWidth = 75 /zoom;
    this.buttonM.displayHeight = 75 /zoom;
    this.buttonM.x = calculateProportionalWidth(102, 110, this.camera.worldView.width - (50 / this.camera.zoom));
    this.buttonM.y = calculateProportionalWidth(89, 100, this.camera.worldView.height - (50 / this.camera.zoom));


  }
}