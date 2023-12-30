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


    //-- btn ------ upgrade
    this.buttonD = this.scene.add.sprite(0,0,'btnUpgrade');
    this.buttonD.text = this.scene.add.text(this.buttonD.x, this.buttonD.y, ' ', { fontSize: '8px', fill: '#ffffff' });
    this.buttonD.text.setOrigin(-0.70, -3.8);
    this.buttonD.setOrigin(0, 0);
    this.buttonD.on('pointerup' , () => this.btnFunction4(1), this);
    this.buttonD.setInteractive();
    this.container.add(this.buttonD);
    this.container.add(this.buttonD.text);
    //-- btn ------
    this.buttonE = this.scene.add.sprite(0,0,'btnUpgrade');
    this.buttonE.text = this.scene.add.text(this.buttonE.x, this.buttonE.y, ' ', { fontSize: '8px', fill: '#ffffff' });
    this.buttonE.text.setOrigin(-0.70, -3.8);
    this.buttonE.setOrigin(0, 0);
    this.buttonE.on('pointerup' , () => this.btnFunction4(2), this);
    this.buttonE.setInteractive();
    this.container.add(this.buttonE);
    this.container.add(this.buttonE.text);
    //-- btn ------
    this.buttonF = this.scene.add.sprite(0,0,'btnUpgrade');
    this.buttonF.text = this.scene.add.text(this.buttonF.x, this.buttonF.y, ' ', { fontSize: '8px', fill: '#ffffff' });
    this.buttonF.text.setOrigin(-0.70, -3.8);
    this.buttonF.setOrigin(0, 0);
    this.buttonF.on('pointerup' , () => this.btnFunction4(3), this);
    this.buttonF.setInteractive();
    this.container.add(this.buttonF);
    this.container.add(this.buttonF.text);
    //-- btn ------
    this.buttonG = this.scene.add.sprite(0,0,'btnUpgrade');
    this.buttonG.text = this.scene.add.text(this.buttonG.x, this.buttonG.y, ' ', { fontSize: '8px', fill: '#ffffff' });
    this.buttonG.text.setOrigin(-0.70, -3.8);
    this.buttonG.setOrigin(0, 0);
    this.buttonG.on('pointerup' , () => this.btnFunction4(4), this);
    this.buttonG.setInteractive();
    this.container.add(this.buttonG);
    this.container.add(this.buttonG.text);


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
    this.istance = this;
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
// upgrades ---------

  clearUpgradeButtons(){
    if(this.upgrade1){
      [this.upgrade1,this.upgrade2, this.upgrade3,this.upgrade4,this.upgrade5,this.upgrade6,this.upgrade7,this.upgrade8,this.upgrade9,this.upgrade10,this.upgrade11,this.upgrade12,this.upgrade13,this.upgrade14,this.upgrade15,this.upgrade16,this.upgrade17 ].forEach(btn => {btn.destroy()});
    }
  }

  btnFunction4(upgradeDeck){
    this.clearUpgradeButtons();
    console.log(upgradeDeck);

    this.upgrade1 =  
      this.scene.add.sprite(calculateProportionalWidth(30, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(80, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upResSpeed');
    this.upgrade2 =  
      this.scene.add.sprite(calculateProportionalWidth(42, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(80, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upEnergy');
    this.upgrade3 =  
      this.scene.add.sprite(calculateProportionalWidth(54, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(80, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upEngineering');
    this.upgrade4 =  
      this.scene.add.sprite(calculateProportionalWidth(66, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(80, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upBuildings');

    this.upgrade5 =  
      this.scene.add.sprite(calculateProportionalWidth(30, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(68, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upBoost');
    this.upgrade6 =  
      this.scene.add.sprite(calculateProportionalWidth(42, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(68, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upProduction');
    this.upgrade7 =  
      this.scene.add.sprite(calculateProportionalWidth(54, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(68, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upSpeedTraction');
    this.upgrade8 =  
      this.scene.add.sprite(calculateProportionalWidth(66, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(68, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upRangeOfView');

    this.upgrade9 =  
      this.scene.add.sprite(calculateProportionalWidth(30, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(56, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upMgDmg');
    this.upgrade10 = 
      this.scene.add.sprite(calculateProportionalWidth(42, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(56, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upMgRof');
    this.upgrade11 = 
      this.scene.add.sprite(calculateProportionalWidth(54, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(56, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upMgHp');

    this.upgrade12 = 
      this.scene.add.sprite(calculateProportionalWidth(30, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(44, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upCannonDmg');
    this.upgrade13 = 
      this.scene.add.sprite(calculateProportionalWidth(42, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(44, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upCannonRof');
    this.upgrade14 = 
      this.scene.add.sprite(calculateProportionalWidth(54, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(44, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upCannonHp');

    this.upgrade15 = 
      this.scene.add.sprite(calculateProportionalWidth(30, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(32, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upBRocketDmg');
    this.upgrade16 = 
      this.scene.add.sprite(calculateProportionalWidth(42, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(32, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upRocketRof');
    this.upgrade17 = 
      this.scene.add.sprite(calculateProportionalWidth(54, 110, this.camera.worldView.width -  (50 / this.camera.zoom)),
                            calculateProportionalWidth(32, 100, this.camera.worldView.height - (50 / this.camera.zoom)),'upRocketHp');

    [this.upgrade1,this.upgrade2, this.upgrade3,this.upgrade4,this.upgrade5,this.upgrade6,this.upgrade7,
      this.upgrade8,this.upgrade9,this.upgrade10,this.upgrade11,this.upgrade12,this.upgrade13,this.upgrade14,
      this.upgrade15,this.upgrade16, this.upgrade17 ].forEach( btn  => {
      btn.displayWidth = 84 / this.camera.zoom;
      btn.displayHeight = 84 / this.camera.zoom;
      btn.setInteractive();
      this.container.add(btn);
    });

    if(!this.upgradeTable.upgradeIdIsSearching[0]){
      this.upgrade1.on( 'pointerup' , () => this.makeUpgrade(1, upgradeDeck),this);
    }else{this.upgrade1.setTint(0xED3818);}

    if(!this.upgradeTable.upgradeIdIsSearching[1]){
      this.upgrade2.on( 'pointerup' , () => this.makeUpgrade(2, upgradeDeck),this);
    }else{this.upgrade2.setTint(0xED3818);}
    
    if(!this.upgradeTable.upgradeIdIsSearching[2]){
      this.upgrade3.on( 'pointerup' , () => this.makeUpgrade(3, upgradeDeck),this);
    }else{this.upgrade3.setTint(0xED3818);}

    if(!this.upgradeTable.upgradeIdIsSearching[3]){
      this.upgrade4.on( 'pointerup' , () => this.makeUpgrade(4, upgradeDeck),this);
    }else{this.upgrade4.setTint(0xED3818);}

    if(!this.upgradeTable.upgradeIdIsSearching[4]){
      this.upgrade5.on( 'pointerup' , () => this.makeUpgrade(5, upgradeDeck),this);
    }else{this.upgrade5.setTint(0xED3818);}

    if(!this.upgradeTable.upgradeIdIsSearching[5]){
      this.upgrade6.on( 'pointerup' , () => this.makeUpgrade(6, upgradeDeck),this);
    }else{this.upgrade6.setTint(0xED3818);}

    if(!this.upgradeTable.upgradeIdIsSearching[6]){
      this.upgrade7.on( 'pointerup' , () => this.makeUpgrade(7, upgradeDeck),this);
    }else{this.upgrade7.setTint(0xED3818);}

    if(!this.upgradeTable.upgradeIdIsSearching[7]){
      this.upgrade8.on( 'pointerup' , () => this.makeUpgrade(8, upgradeDeck),this);
    }else{this.upgrade8.setTint(0xED3818);}

    if(!this.upgradeTable.upgradeIdIsSearching[8]){
      this.upgrade9.on( 'pointerup' , () => this.makeUpgrade(9, upgradeDeck),this);
    }else{this.upgrade9.setTint(0xED3818);}

    if(!this.upgradeTable.upgradeIdIsSearching[9]){
      this.upgrade10.on( 'pointerup' , () => this.makeUpgrade(10, upgradeDeck),this);
    }else{this.upgrade10.setTint(0xED3818);}

    if(!this.upgradeTable.upgradeIdIsSearching[10]){
      this.upgrade11.on( 'pointerup' , () => this.makeUpgrade(11, upgradeDeck),this);
    }else{this.upgrade11.setTint(0xED3818);}

    if(!this.upgradeTable.upgradeIdIsSearching[11]){
      this.upgrade12.on( 'pointerup' , () => this.makeUpgrade(12, upgradeDeck),this);
    }else{this.upgrade12.setTint(0xED3818);}

    if(!this.upgradeTable.upgradeIdIsSearching[12]){
      this.upgrade13.on( 'pointerup' , () => this.makeUpgrade(13, upgradeDeck),this);
    }else{this.upgrade13.setTint(0xED3818);}

    if(!this.upgradeTable.upgradeIdIsSearching[13]){
      this.upgrade14.on( 'pointerup' , () => this.makeUpgrade(14, upgradeDeck),this);
    }else{this.upgrade14.setTint(0xED3818);}

    if(!this.upgradeTable.upgradeIdIsSearching[14]){
      this.upgrade15.on( 'pointerup' , () => this.makeUpgrade(15, upgradeDeck),this);
    }else{this.upgrade15.setTint(0xED3818);}

    if(!this.upgradeTable.upgradeIdIsSearching[15]){
      this.upgrade16.on( 'pointerup' , () => this.makeUpgrade(16, upgradeDeck),this);
    }else{this.upgrade16.setTint(0xED3818);}

    if(!this.upgradeTable.upgradeIdIsSearching[16]){
      this.upgrade17.on( 'pointerup' , () => this.makeUpgrade(17, upgradeDeck),this);
    }else{this.upgrade17.setTint(0xED3818);}



    // this.container.add(this.upgrade1,this.upgrade2 );
    // console.log('creare nuovo enemy');
    // this.scene.tankFactory.tankFactoryIstance.createEnemy([0,-1650]);
  }

  makeUpgrade(choice, upgradeDeckID){

    switch (choice) {
      case 1:
        console.log('case researchSpeed');
        this.scene.tankFactory.tankFactoryIstance.researchSpeed(upgradeDeckID);
        console.log(this.buttonD)
        this.clearUpgradeButtons();
        break;
      case 2:
        console.log('case energyEfficiency');
        this.scene.tankFactory.tankFactoryIstance.energyEfficiency(upgradeDeckID);
        this.clearUpgradeButtons();
        break;
      case 3:
        console.log('case engineerEfficiency');
        this.scene.tankFactory.tankFactoryIstance.engineerEfficiency(upgradeDeckID);
        this.clearUpgradeButtons();
        break;
      case 4:
        console.log('case buildingsArmor');
        this.scene.tankFactory.tankFactoryIstance.buildingsArmor(upgradeDeckID);
        this.clearUpgradeButtons();
        break;
      case 5:
        console.log('case boostSpeed');
        this.scene.tankFactory.tankFactoryIstance.boostSpeed(upgradeDeckID);
        this.clearUpgradeButtons();
        break;
      case 6:
        console.log('case tanksProductionSpeed');
        this.scene.tankFactory.tankFactoryIstance.tanksProductionSpeed(upgradeDeckID);
        this.clearUpgradeButtons();
        break;
      case 7:
        console.log('case tanksSpeedTraction');
        this.scene.tankFactory.tankFactoryIstance.tanksSpeedTraction(upgradeDeckID);
        this.clearUpgradeButtons();
        break;
      case 8:
        console.log('case tanksRangeOfView');
        this.scene.tankFactory.tankFactoryIstance.tanksRangeOfView(upgradeDeckID);
        this.clearUpgradeButtons();
        break;
      case 9:
        console.log('case mgDamage');
        this.scene.tankFactory.tankFactoryIstance.mgDamage(upgradeDeckID);
        this.clearUpgradeButtons();
        break;
      case 10:
        console.log('case mgRof');
        this.scene.tankFactory.tankFactoryIstance.mgRof(upgradeDeckID);
        this.clearUpgradeButtons();
        break;
      case 11:
        console.log('case mgHp');
        this.scene.tankFactory.tankFactoryIstance.mgHp(upgradeDeckID);
        this.clearUpgradeButtons();
        break;
      case 12:
        console.log('case cannonDamage');
        this.scene.tankFactory.tankFactoryIstance.cannonDamage(upgradeDeckID);
        this.clearUpgradeButtons();
        break;
      case 13:
        console.log('case cannonRof');
        this.scene.tankFactory.tankFactoryIstance.cannonRof(upgradeDeckID);
        this.clearUpgradeButtons();
        break;
      case 14:
        console.log('case cannonHp');
        this.scene.tankFactory.tankFactoryIstance.cannonHp(upgradeDeckID);
        this.clearUpgradeButtons();
        break;
      case 15:
        console.log('case RocketDamage');
        this.scene.tankFactory.tankFactoryIstance.RocketDamage(upgradeDeckID);
        this.clearUpgradeButtons();
        break;
      case 16:
        console.log('case RocketRof');
        this.scene.tankFactory.tankFactoryIstance.RocketRof(upgradeDeckID);
        this.clearUpgradeButtons();
        break;
      case 17:
        console.log('case RocketHp');
        this.scene.tankFactory.tankFactoryIstance.RocketHp(upgradeDeckID);
        this.clearUpgradeButtons();
        break;
    

    }
  }

  blockButton(id, onOff){

    switch (id) {
      
      case 1:
      if(onOff){
        this.buttonD.off('pointerup');
      }else{
        this.buttonD.on('pointerup' , () => this.btnFunction4(1), this);
      }
        break;
      case 2:
        if(onOff){
          this.buttonE.off('pointerup');
        }else{
          this.buttonE.on('pointerup' , () => this.btnFunction4(2), this);
        }
        break;
      case 3:
        if(onOff){
          this.buttonF.off('pointerup');
        }else{
          this.buttonF.on('pointerup' , () => this.btnFunction4(3), this);
        }
        break;
      case 4:
        if(onOff){
          this.buttonG.off('pointerup');
        }else{
          this.buttonG.on('pointerup' , () => this.btnFunction4(4), this);
        }
        break;
    }
  }
// upgrades ---------

// production tank --------------------------------
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
// production tank --------------------------------

  update(){
    const zoom = this.camera.zoom;
    
    if(this.zoom !== zoom){
      this.clearUpgradeButtons();
    }

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
    this.buttonD.text.setText(this.statusCounts.upgrade1Cd);
    this.buttonD.text.setFontSize(16 / zoom);
    this.buttonD.text.x = this.buttonD.x;
    this.buttonD.text.y = this.buttonD.y;

    
    this.buttonE.displayWidth = 75 /zoom;
    this.buttonE.displayHeight = 75 /zoom;
    this.buttonE.x = calculateProportionalWidth(42, 110, this.camera.worldView.width - (50 / this.camera.zoom));
    this.buttonE.y = calculateProportionalWidth(89, 100, this.camera.worldView.height - (50 / this.camera.zoom));
    this.buttonE.text.setText(this.statusCounts.upgrade2Cd);
    this.buttonE.text.setFontSize(16 / zoom);
    this.buttonE.text.x = this.buttonE.x;
    this.buttonE.text.y = this.buttonE.y;


    
    this.buttonF.displayWidth = 75 /zoom;
    this.buttonF.displayHeight = 75 /zoom;
    this.buttonF.x = calculateProportionalWidth(52, 110, this.camera.worldView.width - (50 / this.camera.zoom));
    this.buttonF.y = calculateProportionalWidth(89, 100, this.camera.worldView.height - (50 / this.camera.zoom));
    this.buttonF.text.setText(this.statusCounts.upgrade3Cd);
    this.buttonF.text.setFontSize(16 / zoom);
    this.buttonF.text.x = this.buttonF.x;
    this.buttonF.text.y = this.buttonF.y;

    
    this.buttonG.displayWidth = 75 /zoom;
    this.buttonG.displayHeight = 75 /zoom;
    this.buttonG.x = calculateProportionalWidth(62, 110, this.camera.worldView.width - (50 / this.camera.zoom));
    this.buttonG.y = calculateProportionalWidth(89, 100, this.camera.worldView.height - (50 / this.camera.zoom));
    this.buttonG.text.setText(this.statusCounts.upgrade4Cd);
    this.buttonG.text.setFontSize(16 / zoom);
    this.buttonG.text.x = this.buttonG.x;
    this.buttonG.text.y = this.buttonG.y;

    
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

    this.zoom = this.camera.zoom ;
  }
}