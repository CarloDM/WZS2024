import Phaser from "phaser";
import Tank from './tank';
import Enemy from "./enemy";
import Gaiser from "./gaiser";
import {calculateIncrementBylevel, verifyPresenceOfEnergy} from "./mathFunction";
import UpgradeTable from "./upgradeTable";
import StatusCounts from "./statusCounts";
export default class TankFactory {
  constructor(scene){
    this.scene = scene;
    this.tankCount = 0;
    this.enemyCount = 0;
    this.upgradeTable = UpgradeTable.getInstance();
    this.statusCounts = StatusCounts.getInstance();
    
    this.mgTankCost = 100;
    this.cannonTankCost = 100;
    this.rocketTankCost = 100;
    
    this.deck1Timeout;
    this.deck1countDown;
    this.deck1Time;

    this.deck2Timeout;
    this.deck2countDown;
    this.deck2Time;
    
    this.deck3Timeout;
    this.deck3countDown;
    this.deck3Time;

    this.deck4Timeout;
    this.deck4countDown;
    this.deck4Time;
    

    this.tankFactoryIstance = this;
  }
  
  createMgTank(position){
    this.tankCount ++;
    
    const tankSpeed = calculateIncrementBylevel(34,
      this.upgradeTable.tanksSpeedTractionLevel,
      this.upgradeTable.tanksSpeedTraction[this.upgradeTable.tanksSpeedTractionLevel].incrementFactor);

    const newTank = new Tank('machineGun',
      this.scene, this.tankCount, position, 
      this.upgradeTable.mgHp[this.upgradeTable.mgHpLevel].hp, 
      tankSpeed,
      false, 
      );

    this.scene.tanksGrp1.push(newTank);
    this.scene.tanks.add(newTank.tank);
  }

  createCannonTank(position){
    this.tankCount ++;

    const tankSpeed = calculateIncrementBylevel(20,
      this.upgradeTable.tanksSpeedTractionLevel,
      this.upgradeTable.tanksSpeedTraction[this.upgradeTable.tanksSpeedTractionLevel].incrementFactor);

    const newTank = new Tank('cannon',
      this.scene, this.tankCount, position, 
      this.upgradeTable.cannonHp[this.upgradeTable.cannonHpLevel].hp, 
      tankSpeed,
      false, 
      );

    this.scene.tanksGrp1.push(newTank);
    this.scene.tanks.add(newTank.tank);
  }

  createRocketTank(position){
    this.tankCount ++

    const tankSpeed = calculateIncrementBylevel(27,
      this.upgradeTable.tanksSpeedTractionLevel,
      this.upgradeTable.tanksSpeedTraction[this.upgradeTable.tanksSpeedTractionLevel].incrementFactor);

    const newTank = new Tank('rocket',
      this.scene, this.tankCount, position, 
      this.upgradeTable.RocketHp[this.upgradeTable.RocketHpLevel].hp, 
      tankSpeed,
      false, 
      );

    this.scene.tanksGrp1.push(newTank);
    this.scene.tanks.add(newTank.tank);
  }

  createMultipleTanks(tankCount, startingPosition, type) {

    switch (type) {
      case 'machineGun':
        for (let i = 0; i < tankCount; i++) {
          const position = [startingPosition[0] + i * 128, startingPosition[1]];
          this.createMgTank(position);
        }
        break;

      case 'cannon':
        for (let i = 0; i < tankCount; i++) {
          const position = [startingPosition[0] + i * 128, startingPosition[1]];
          this.createCannonTank(position);
        }
        break;

      case 'rocket':
        for (let i = 0; i < tankCount; i++) {
          const position = [startingPosition[0] + i * 128, startingPosition[1]];
          this.createRocketTank(position);
        }
        break;
    }

  }

  // enemies--------
  createEnemy(position){
    this.enemyCount ++

    const newEnemy = 
      new Enemy('machineGun', this.scene, this.enemyCount, position, 500);
      
    this.scene.enemiesGrp.push(newEnemy);
    this.scene.enemies.add(newEnemy.enemy);
  }
  
  createMultipleEnemies(number,  startingPosition) {
  
    for (let i = 0; i < number; i++) {
  
      const position = [startingPosition[0] + i * 128, startingPosition[1]];
      this.createEnemy(position);

    }
  }

  createGaiser(position, id){

    const NewGaiser = new Gaiser(this.scene,position, id);
    this.scene.gaiserGrp.push(NewGaiser);
  }

  // decks production----------
  deck1Production(){

    
    if(!this.statusCounts.deck1IsProductive){

    }else{
      
      clearInterval(this.deck1Timeout);
      clearInterval(this.deck1countDown);
      this.statusCounts.deck1IsProductive = false;
    }

      if(this.statusCounts.btnDeck1 !== 0){

        switch (this.statusCounts.btnDeck1) {

          case 1:

              this.deck1Time = 
                (this.statusCounts.timeProductionTanks.mg * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);

                var cd = this.deck1Time /1000;
                this.deck1countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck1countDown);
                  }
                }, 1000);

              this.deck1Timeout = setInterval(() => {

                this.deck1Time = 
                (this.statusCounts.timeProductionTanks.mg * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
                cd = this.deck1Time /1000;
                this.deck1countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck1countDown);
                  }
                }, 1000);

                this.createMgTank([0,-200]);

              }, this.deck1Time);

              this.statusCounts.deck1IsProductive = true;

            break;
          case 2:

              this.deck1Time = 
                (this.statusCounts.timeProductionTanks.cannon * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
          
                var cd = this.deck1Time /1000;
                this.deck1countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck1countDown);
                  }
                }, 1000);
              
              this.deck1Timeout = setInterval(() => {
              
                this.deck1Time = 
                (this.statusCounts.timeProductionTanks.cannon * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
                cd = this.deck1Time /1000;
                this.deck1countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck1countDown);
                  }
                }, 1000);
              
                this.createCannonTank([0,-200]);
              
              }, this.deck1Time);
            
              this.statusCounts.deck1IsProductive = true;

            break;
          case 3:

              this.deck1Time = 
                (this.statusCounts.timeProductionTanks.rocket * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
          
                var cd = this.deck1Time /1000;
                this.deck1countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck1countDown);
                  }
                }, 1000);
              
              this.deck1Timeout = setInterval(() => {
              
                this.deck1Time = 
                (this.statusCounts.timeProductionTanks.rocket * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
                cd = this.deck1Time /1000;
                this.deck1countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck1countDown);
                  }
                }, 1000);
              
                this.createRocketTank([0,-200]);
              
              }, this.deck1Time);
            
              this.statusCounts.deck1IsProductive = true;


            break;
        }
      }else{
        // stop production deck 1
        clearInterval(this.deck1Timeout);
      }
  }
  deck2Production(){

    
    if(!this.statusCounts.deck2IsProductive){

    }else{
      
      clearInterval(this.deck2Timeout);
      clearInterval(this.deck2countDown);
      this.statusCounts.deck2IsProductive = false;
    }

      if(this.statusCounts.btnDeck2 !== 0){

        switch (this.statusCounts.btnDeck2) {

          case 1:

              this.deck2Time = 
                (this.statusCounts.timeProductionTanks.mg * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);

                var cd = this.deck2Time /1000;
                this.deck2countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck2countDown);
                  }
                }, 1000);

              this.deck2Timeout = setInterval(() => {

                this.deck2Time = 
                (this.statusCounts.timeProductionTanks.mg * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
                cd = this.deck2Time /1000;

                this.deck2countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck2countDown);
                  }
                }, 1000);

                this.createMgTank([200,0]);

              }, this.deck2Time);

              this.statusCounts.deck2IsProductive = true;

            break;
          case 2:

              this.deck2Time = 
                (this.statusCounts.timeProductionTanks.cannon * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
          
                var cd = this.deck2Time /1000;
                this.deck2countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck2countDown);
                  }
                }, 1000);
              
              this.deck2Timeout = setInterval(() => {
              
                this.deck2Time = 
                (this.statusCounts.timeProductionTanks.cannon * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
                cd = this.deck2Time /1000;
                this.deck2countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck2countDown);
                  }
                }, 1000);
              
                this.createCannonTank([200,0]);
              
              }, this.deck2Time);
            
              this.statusCounts.deck2IsProductive = true;

            break;
          case 3:

              this.deck2Time = 
                (this.statusCounts.timeProductionTanks.rocket * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
          
                var cd = this.deck2Time /1000;
                this.deck2countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck2countDown);
                  }
                }, 1000);
              
              this.deck2Timeout = setInterval(() => {
              
                this.deck2Time = 
                (this.statusCounts.timeProductionTanks.rocket * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
                cd = this.deck2Time /1000;
                this.deck2countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck2countDown);
                  }
                }, 1000);
              
                this.createRocketTank([200,0]);
              
              }, this.deck2Time);
            
              this.statusCounts.deck2IsProductive = true;


            break;
        }
      }else{

        clearInterval(this.deck2Timeout);
      }
  }
  deck3Production(){

    if(!this.statusCounts.deck3IsProductive){

    }else{
      
      clearInterval(this.deck3Timeout);
      clearInterval(this.deck3countDown);
      this.statusCounts.deck3IsProductive = false;
    }

      if(this.statusCounts.btnDeck3 !== 0){

        switch (this.statusCounts.btnDeck3) {

          case 1:

              this.deck3Time = 
                (this.statusCounts.timeProductionTanks.mg * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);

                var cd = this.deck3Time /1000;
                this.deck3countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck3countDown);
                  }
                }, 1000);

              this.deck3Timeout = setInterval(() => {

                this.deck3Time = 
                (this.statusCounts.timeProductionTanks.mg * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
                cd = this.deck3Time /1000;
                this.deck3countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck3countDown);
                  }
                }, 1000);

                this.createMgTank([0,200]);

              }, this.deck3Time);

              this.statusCounts.deck3IsProductive = true;

            break;
          case 2:

              this.deck3Time = 
                (this.statusCounts.timeProductionTanks.cannon * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
          
                var cd = this.deck3Time /1000;
                this.deck3countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck3countDown);
                  }
                }, 1000);
              
              this.deck3Timeout = setInterval(() => {
              
                this.deck3Time = 
                (this.statusCounts.timeProductionTanks.cannon * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
                cd = this.deck3Time /1000;
                this.deck3countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck3countDown);
                  }
                }, 1000);
              
                this.createCannonTank([0,200]);
              
              }, this.deck3Time);
            
              this.statusCounts.deck3IsProductive = true;

            break;
          case 3:

              this.deck3Time = 
                (this.statusCounts.timeProductionTanks.rocket * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
          
                var cd = this.deck3Time /1000;
                this.deck3countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck3countDown);
                  }
                }, 1000);
              
              this.deck3Timeout = setInterval(() => {
              
                this.deck3Time = 
                (this.statusCounts.timeProductionTanks.rocket * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
                cd = this.deck3Time /1000;
                this.deck3countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck3countDown);
                  }
                }, 1000);
              
                this.createRocketTank([0,200]);
              
              }, this.deck3Time);
            
              this.statusCounts.deck3IsProductive = true;


            break;
        }
      }else{
        clearInterval(this.deck3Timeout);
      }
  }
  deck4Production(){

    if(!this.statusCounts.deck4IsProductive){

    }else{
      
      clearInterval(this.deck4Timeout);
      clearInterval(this.deck4countDown);
      this.statusCounts.deck4IsProductive = false;
    }

      if(this.statusCounts.btnDeck4 !== 0){

        switch (this.statusCounts.btnDeck4) {

          case 1:

              this.deck4Time = 
                (this.statusCounts.timeProductionTanks.mg * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);

                var cd = this.deck4Time /1000;
                this.deck4countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck4countDown);
                  }
                }, 1000);

              this.deck4Timeout = setInterval(() => {

                this.deck4Time = 
                (this.statusCounts.timeProductionTanks.mg * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
                cd = this.deck4Time /1000;
                this.deck4countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck4countDown);
                  }
                }, 1000);

                this.createMgTank([-200,0]);

              }, this.deck4Time);

              this.statusCounts.deck4IsProductive = true;

            break;
          case 2:

              this.deck4Time = 
                (this.statusCounts.timeProductionTanks.cannon * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
          
                var cd = this.deck4Time /1000;
                this.deck4countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck4countDown);
                  }
                }, 1000);
              
              this.deck4Timeout = setInterval(() => {
              
                this.deck4Time = 
                (this.statusCounts.timeProductionTanks.cannon * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
                cd = this.deck4Time /1000;
                this.deck4countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck4countDown);
                  }
                }, 1000);
              
                this.createCannonTank([-200,0]);
              
              }, this.deck4Time);
            
              this.statusCounts.deck4IsProductive = true;

            break;
          case 3:

              this.deck4Time = 
                (this.statusCounts.timeProductionTanks.rocket * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
          
                var cd = this.deck4Time /1000;
                this.deck4countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck4countDown);
                  }
                }, 1000);
              
              this.deck4Timeout = setInterval(() => {
              
                this.deck4Time = 
                (this.statusCounts.timeProductionTanks.rocket * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
                cd = this.deck4Time /1000;
                this.deck4countDown = setInterval(() => {
                  cd --;
                  
                  if(cd < 2){
                    
                    clearInterval(this.deck4countDown);
                  }
                }, 1000);
              
                this.createRocketTank([-200,0]);
              
              }, this.deck4Time);
            
              this.statusCounts.deck4IsProductive = true;


            break;
        }
      }else{
        clearInterval(this.deck4Timeout);
      }
  }
  upgradeCountDown(cd, deck){
    switch (deck) {
      case 1:
        if(cd < 1){
          this.scene.cameraController.userInterface.buttonD.text.setText('');
        }else{
          this.scene.cameraController.userInterface.buttonD.text.setText(cd);
        }
        break;
      case 2:
        if(cd < 1){
          this.scene.cameraController.userInterface.buttonE.text.setText('');
        }else{
          this.scene.cameraController.userInterface.buttonE.text.setText(cd);
        }
        break;
      case 3:
        if(cd < 1){
          this.scene.cameraController.userInterface.buttonF.text.setText('');
        }else{
          this.scene.cameraController.userInterface.buttonF.text.setText(cd);
        }
        break;
      case 4:
        if(cd < 1){
          this.scene.cameraController.userInterface.buttonG.text.setText('');
        }else{
          this.scene.cameraController.userInterface.buttonG.text.setText(cd);
        }
        break;
    }

  }

  checkEnergy(upgradeDeckID, research, researchID){

    switch (upgradeDeckID) {
      case 1:
        this.scene.cameraController.userInterface.buttonD.setTexture(research);
        this.scene.cameraController.userInterface.buttonD.text.setText('wait');
      break
      case 2:
        this.scene.cameraController.userInterface.buttonE.setTexture(research);
        this.scene.cameraController.userInterface.buttonE.text.setText('wait');
      break
      case 3:
        this.scene.cameraController.userInterface.buttonF.setTexture(research);
        this.scene.cameraController.userInterface.buttonF.text.setText('wait');
      break
      case 4:
        this.scene.cameraController.userInterface.buttonG.setTexture(research);
        this.scene.cameraController.userInterface.buttonG.text.setText('wait');
      break
    }
    switch (researchID) {
      case 0:
        setTimeout(() => {
          this.researchSpeed(upgradeDeckID);
        }, 5000);
        break;
      case 1:
        setTimeout(() => {
          this.energyEfficiency(upgradeDeckID);
        }, 5000);
        break;
      case 2:
        setTimeout(() => {
          this.engineerEfficiency(upgradeDeckID);
        }, 5000);
        break;
      case 3:
        setTimeout(() => {
          this.buildingsArmor(upgradeDeckID);
        }, 5000);
        break;
      case 4:
        setTimeout(() => {
          this.boostSpeed(upgradeDeckID);
        }, 5000);
        break;
      case 5:
        setTimeout(() => {
          this.tanksProductionSpeed(upgradeDeckID);
        }, 5000);
        break;
      case 6:
        setTimeout(() => {
          this.tanksSpeedTraction(upgradeDeckID);
        }, 5000);
        break;
      case 7:
        setTimeout(() => {
          this.tanksRangeOfView(upgradeDeckID);
        }, 5000);
        break;
      case 8:
        setTimeout(() => {
          this.mgDamage(upgradeDeckID);
        }, 5000);
        break;
      case 9:
        setTimeout(() => {
          this.mgRof(upgradeDeckID);
        }, 5000);
        break;
      case 10:
        setTimeout(() => {
          this.mgHp(upgradeDeckID);
        }, 5000);
        break;
      case 11:
        setTimeout(() => {
          this.cannonDamage(upgradeDeckID);
        }, 5000);
        break;
      case 12:
        setTimeout(() => {
          this.cannonRof(upgradeDeckID);
        }, 5000);
        break;
      case 13:
        setTimeout(() => {
          this.cannonHp(upgradeDeckID);
        }, 5000);
        break;
      case 14:
        setTimeout(() => {
          this.RocketDamage(upgradeDeckID);
        }, 5000);
        break;
      case 15:
        setTimeout(() => {
          this.RocketRof(upgradeDeckID);
        }, 5000);
        break;
      case 16:
        setTimeout(() => {
          this.RocketHp(upgradeDeckID);
        }, 5000);
        break;
    }

  }
  
  // decks production----------
  //  research upgrade
  researchSpeed(upgradeDeckID){
    
    this.upgradeTable.upgradeIdIsSearching[0] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel + 1].cost, this.statusCounts.energy ));
    console.log(PresenceOfEnergy);

      if (PresenceOfEnergy){
        this.statusCounts.energy -= this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel + 1].cost; 

        const time = (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel + 1].time * 1000) *
        (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
        
    
        switch (upgradeDeckID) {
          case 1:
          this.scene.cameraController.userInterface.buttonD.setTexture('upResSpeed');
          this.upgrade1TimeOut = setTimeout(() => {
            
            clearInterval(this.upgrade1countDown);
    
            this.upgradeTable.researchSpeedLevel ++;  
            this.upgradeTable.upgradeIdIsSearching[0] = false;
            this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
            this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');
            
          }, time);
    
            var cd = (time /1000) - 1;
    
            this.upgrade1countDown = setInterval(() => {
              cd --;
              this.upgradeCountDown(cd,upgradeDeckID);
              
            }, 1000);
            break;
          case 2:
          this.scene.cameraController.userInterface.buttonE.setTexture('upResSpeed');
          this.upgrade2TimeOut = setTimeout(() => {
            clearInterval(this.upgrade2countDown);
    
            this.upgradeTable.researchSpeedLevel ++;  
            this.upgradeTable.upgradeIdIsSearching[0] = false;
            
            this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
            this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');
            
          }, time);
    
            var cd = (time /1000) - 1 ;
    
            this.upgrade2countDown = setInterval(() => {
              cd --;
              this.upgradeCountDown(cd,upgradeDeckID);
              
            }, 1000);
            break;
          case 3:
          this.scene.cameraController.userInterface.buttonF.setTexture('upResSpeed');
          this.upgrade3TimeOut = setTimeout(() => {
            clearInterval(this.upgrade3countDown);
    
            this.upgradeTable.researchSpeedLevel ++;  
            this.upgradeTable.upgradeIdIsSearching[0] = false;
            
            this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
            this.scene.cameraController.userInterface.buttonF.setTexture('btnUpgrade');
            
          }, time);
    
            var cd = (time /1000) - 1  ;
    
            this.upgrade3countDown = setInterval(() => {
              cd --;
              this.upgradeCountDown(cd,upgradeDeckID);
              
            }, 1000);
            break;
          case 4:
          this.scene.cameraController.userInterface.buttonG.setTexture('upResSpeed');
          this.upgrade4TimeOut = setTimeout(() => {
            clearInterval(this.upgrade4countDown);
    
            this.upgradeTable.researchSpeedLevel ++;  
            this.upgradeTable.upgradeIdIsSearching[0] = false;
            
            this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
            this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');
            
          }, time);
    
            var cd = (time /1000) - 1 ;
    
            this.upgrade4countDown = setInterval(() => {
              cd --;
              this.upgradeCountDown(cd,upgradeDeckID);
              
            }, 1000);
            break;
    
        }      
  
      }else{
        this.checkEnergy(upgradeDeckID,'upResSpeed', 0);
      }
  }

  energyEfficiency(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[1] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.energyEfficiency[this.upgradeTable.energyEfficiencyLevel + 1].cost, this.statusCounts.energy ));

    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.energyEfficiency[this.upgradeTable.energyEfficiencyLevel + 1].cost; 

      const time = (this.upgradeTable.energyEfficiency[this.upgradeTable.energyEfficiencyLevel + 1 ].time * 1000) *
      (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
      
      switch (upgradeDeckID) {
        case 1:
                this.scene.cameraController.userInterface.buttonD.setTexture('upEnergy');
        this.upgrade1TimeOut = setTimeout(() => {
          clearInterval(this.upgrade1countDown);

          this.upgradeTable.energyEfficiencyLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[1] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade1countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 2:
                this.scene.cameraController.userInterface.buttonE.setTexture('upEnergy');

        this.upgrade2TimeOut = setTimeout(() => {
          clearInterval(this.upgrade2countDown);

          this.upgradeTable.energyEfficiencyLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[1] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade2countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 3:
                this.scene.cameraController.userInterface.buttonE.setTexture('upEnergy');

        this.upgrade3TimeOut = setTimeout(() => {
          clearInterval(this.upgrade3countDown);

          this.upgradeTable.energyEfficiencyLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[1] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonF.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade3countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);
            this.statusCounts.upgrade3Cd = cd;

          }, 1000);
          break;
        case 4:
                this.scene.cameraController.userInterface.buttonE.setTexture('upEnergy');

        this.upgrade4TimeOut = setTimeout(() => {
          clearInterval(this.upgrade4countDown);

          this.upgradeTable.energyEfficiencyLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[1] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade4countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);
            this.statusCounts.upgrade4Cd = cd;

          }, 1000);
          break;

      }
    }else{
      this.checkEnergy(upgradeDeckID, 'upEnergy', 1);
    }      
  }
  engineerEfficiency(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[2] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    
    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.engineerEfficiency[this.upgradeTable.engineerEfficiencyLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.engineerEfficiency[this.upgradeTable.engineerEfficiencyLevel + 1].cost; 
      const time = (this.upgradeTable.engineerEfficiency[this.upgradeTable.engineerEfficiencyLevel + 1].time * 1000) *
      (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
      const engSpeed = this.upgradeTable.engineerEfficiency[this.upgradeTable.engineerEfficiencyLevel + 1].moveSpeed;
      switch (upgradeDeckID) {
        case 1:
          this.scene.cameraController.userInterface.buttonD.setTexture('upEngineering');

          this.upgrade1TimeOut = setTimeout(() => {
          clearInterval(this.upgrade1countDown);
          this.scene.engineering.speed = engSpeed;
          this.upgradeTable.engineerEfficiencyLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[2] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');
          
          

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade1countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 2:
          this.scene.cameraController.userInterface.buttonE.setTexture('upEngineering');

          this.upgrade2TimeOut = setTimeout(() => {
            clearInterval(this.upgrade2countDown);
            this.scene.engineering.speed = engSpeed;
            this.upgradeTable.engineerEfficiencyLevel ++;  
            this.upgradeTable.upgradeIdIsSearching[2] = false;

            this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
            this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');

          }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade2countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 3:
          this.scene.cameraController.userInterface.buttonF.setTexture('upEngineering');
          
          this.upgrade3TimeOut = setTimeout(() => {
          clearInterval(this.upgrade3countDown);
          this.scene.engineering.speed = engSpeed;

          this.upgradeTable.engineerEfficiencyLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[2] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonF.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade3countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 4:
                this.scene.cameraController.userInterface.buttonG.setTexture('upEngineering');

        this.upgrade4TimeOut = setTimeout(() => {
          clearInterval(this.upgrade4countDown);
          this.scene.engineering.speed = engSpeed;
          this.upgradeTable.engineerEfficiencyLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[2] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade4countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
      }

    }else{
      this.checkEnergy(upgradeDeckID, 'upEngineering', 2);
    }      

  }
  buildingsArmor(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[3] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.buildingsArmor[this.upgradeTable.buildingsArmorLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.buildingsArmor[this.upgradeTable.buildingsArmorLevel + 1].cost; 
      
      const time = (this.upgradeTable.buildingsArmor[this.upgradeTable.buildingsArmorLevel + 1].time * 1000) *
      (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);

      switch (upgradeDeckID) {
        case 1:
                this.scene.cameraController.userInterface.buttonD.setTexture('upBuildings');

        this.upgrade1TimeOut = setTimeout(() => {
          clearInterval(this.upgrade1countDown);

          this.upgradeTable.buildingsArmorLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[3] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade1countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 2:
                this.scene.cameraController.userInterface.buttonE.setTexture('upBuildings');

        this.upgrade2TimeOut = setTimeout(() => {
          clearInterval(this.upgrade2countDown);

          this.upgradeTable.buildingsArmorLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[3] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade2countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 3:
                this.scene.cameraController.userInterface.buttonF.setTexture('upBuildings');

        this.upgrade3TimeOut = setTimeout(() => {
          clearInterval(this.upgrade3countDown);

          this.upgradeTable.buildingsArmorLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[3] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonF.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade3countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 4:
                this.scene.cameraController.userInterface.buttonG.setTexture('upBuildings');

        this.upgrade4TimeOut = setTimeout(() => {
          clearInterval(this.upgrade4countDown);

          this.upgradeTable.buildingsArmorLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[3] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade4countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;

      }     
      
    }else{
        this.checkEnergy(upgradeDeckID, 'upBuildings', 3);
    }
  }
  boostSpeed(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[4] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.boostSpeed[this.upgradeTable.boostSpeedLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.boostSpeed[this.upgradeTable.boostSpeedLevel + 1].cost; 
      const time = (this.upgradeTable.boostSpeed[this.upgradeTable.boostSpeedLevel + 1].time * 1000) *
      (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
      
      switch (upgradeDeckID) {
        case 1:
                this.scene.cameraController.userInterface.buttonD.setTexture('upBoost');

        this.upgrade1TimeOut = setTimeout(() => {
          clearInterval(this.upgrade1countDown);

          this.upgradeTable.boostSpeedLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[4] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade1countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 2:
                this.scene.cameraController.userInterface.buttonE.setTexture('upBoost');

        this.upgrade2TimeOut = setTimeout(() => {
          clearInterval(this.upgrade2countDown);

          this.upgradeTable.boostSpeedLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[4] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade2countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 3:
                this.scene.cameraController.userInterface.buttonF.setTexture('upBoost');

        this.upgrade3TimeOut = setTimeout(() => {
          clearInterval(this.upgrade3countDown);

          this.upgradeTable.boostSpeedLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[4] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonf.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade3countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 4:
                this.scene.cameraController.userInterface.buttonG.setTexture('upBoost');

        this.upgrade4TimeOut = setTimeout(() => {
          clearInterval(this.upgrade4countDown);

          this.upgradeTable.boostSpeedLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[4] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade4countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;

      }      

    }else{
    this.checkEnergy(upgradeDeckID, 'upBuildings', 4);
    }
  } 
  tanksProductionSpeed(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[5] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){

      this.statusCounts.energy -= this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel + 1].cost; 
    
      const time = (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel + 1].time * 1000) *
      (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
      switch (upgradeDeckID) {
        case 1:
                this.scene.cameraController.userInterface.buttonD.setTexture('upProduction');

        this.upgrade1TimeOut = setTimeout(() => {
          clearInterval(this.upgrade1countDown);

          this.upgradeTable.tanksProductionSpeedLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[5] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade1countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 2:
                this.scene.cameraController.userInterface.buttonE.setTexture('upProduction');

        this.upgrade2TimeOut = setTimeout(() => {
          clearInterval(this.upgrade2countDown);

          this.upgradeTable.tanksProductionSpeedLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[5] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade2countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 3:
                this.scene.cameraController.userInterface.buttonF.setTexture('upProduction');

        this.upgrade3TimeOut = setTimeout(() => {
          clearInterval(this.upgrade3countDown);

          this.upgradeTable.tanksProductionSpeedLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[5] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonF.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade3countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 4:
                this.scene.cameraController.userInterface.buttonG.setTexture('upProduction');

        this.upgrade4TimeOut = setTimeout(() => {
          clearInterval(this.upgrade4countDown);

          this.upgradeTable.tanksProductionSpeedLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[5] = false;

          this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
          this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade4countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        } 
          
    }else{
    this.checkEnergy(upgradeDeckID, 'upProduction', 5);
    }
  }
  tanksSpeedTraction(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[6] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.tanksSpeedTraction[this.upgradeTable.tanksSpeedTractionLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.tanksSpeedTraction[this.upgradeTable.tanksSpeedTractionLevel + 1].cost; 
    const time = (this.upgradeTable.tanksSpeedTraction[this.upgradeTable.tanksSpeedTractionLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:
              this.scene.cameraController.userInterface.buttonD.setTexture('upSpeedTraction');
      
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.tanksSpeedTractionLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[6] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
              this.scene.cameraController.userInterface.buttonE.setTexture('upSpeedTraction');

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.tanksSpeedTractionLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[6] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
              this.scene.cameraController.userInterface.buttonF.setTexture('upSpeedTraction');

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.tanksSpeedTractionLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[6] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonF.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
              this.scene.cameraController.userInterface.buttonG.setTexture('upSpeedTraction');

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.tanksSpeedTractionLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[6] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;

    }
    }else{
    this.checkEnergy(upgradeDeckID, 'upSpeedTraction', 6);
    }      
  }
  tanksRangeOfView(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[7] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.tanksRangeOfView[this.upgradeTable.tanksRangeOfViewLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.tanksRangeOfView[this.upgradeTable.tanksRangeOfViewLevel + 1].cost; 
    const time = (this.upgradeTable.tanksRangeOfView[this.upgradeTable.tanksRangeOfViewLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:
        this.scene.cameraController.userInterface.buttonD.setTexture('upRangeOfView');

        
        this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.tanksRangeOfViewLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[6] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
              this.scene.cameraController.userInterface.buttonE.setTexture('upRangeOfView');

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.tanksRangeOfViewLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[7] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
              this.scene.cameraController.userInterface.buttonF.setTexture('upRangeOfView');

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.tanksRangeOfViewLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[7] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonF.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
              this.scene.cameraController.userInterface.buttonG.setTexture('upRangeOfView');

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.tanksRangeOfViewLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[7] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;

    } 
    }else{
      this.checkEnergy(upgradeDeckID, 'upRangeOfView', 7);
    }      

  }
  mgDamage(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[8] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.mgDamage[this.upgradeTable.mgDamageLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.mgDamage[this.upgradeTable.mgDamageLevel + 1].cost; 
    const time = (this.upgradeTable.mgDamage[this.upgradeTable.mgDamageLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:
              this.scene.cameraController.userInterface.buttonD.setTexture('upMgDmg');
      
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.mgDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[8] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
              this.scene.cameraController.userInterface.buttonE.setTexture('upMgDmg');

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.mgDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[8] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
              this.scene.cameraController.userInterface.buttonF.setTexture('upMgDmg');

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.mgDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[8] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonF.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
              this.scene.cameraController.userInterface.buttonG.setTexture('upMgDmg');

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.mgDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[8] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;

    }      
  }else{
    this.checkEnergy(upgradeDeckID, 'upMgDmg', 8);
    } 
  }
  mgRof(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[9] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.mgRof[this.upgradeTable.mgRofLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
    this.statusCounts.energy -= this.upgradeTable.mgRof[this.upgradeTable.mgRofLevel + 1].cost; 
    const time = (this.upgradeTable.mgRof[this.upgradeTable.mgRofLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:
              this.scene.cameraController.userInterface.buttonD.setTexture('upMgRof');
      
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.mgRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[9] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
              this.scene.cameraController.userInterface.buttonE.setTexture('upMgRof');

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.mgRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[9] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
              this.scene.cameraController.userInterface.buttonF.setTexture('upMgRof');

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.mgRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[9] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonF.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
              this.scene.cameraController.userInterface.buttonG.setTexture('upMgRof');

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.mgRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[9] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;

    }
  }else{
    this.checkEnergy(upgradeDeckID, 'upMgRof', 9);
    }       

  }
  mgHp(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[10] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.mgHp[this.upgradeTable.mgHpLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.mgHp[this.upgradeTable.mgHpLevel + 1].cost; 
    const time = (this.upgradeTable.mgHp[this.upgradeTable.mgHpLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:
              this.scene.cameraController.userInterface.buttonD.setTexture('upMgHp');
      
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.mgHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[10] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
              this.scene.cameraController.userInterface.buttonE.setTexture('upMgHp');

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.mgHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[10] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
              this.scene.cameraController.userInterface.buttonF.setTexture('upMgHp');

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.mgHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[10] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonF.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
              this.scene.cameraController.userInterface.buttonG.setTexture('upMgHp');

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.mgHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[10] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;

    } 
  }else{
    this.checkEnergy(upgradeDeckID, 'upMgHp', 10);
    }       

  }
  cannonDamage(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[11] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.cannonDamage[this.upgradeTable.cannonDamageLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.cannonDamage[this.upgradeTable.cannonDamageLevel + 1].cost; 

    const time = (this.upgradeTable.cannonDamage[this.upgradeTable.cannonDamageLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:
              this.scene.cameraController.userInterface.buttonD.setTexture('upCannonDmg');
      
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.cannonDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[11] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
              this.scene.cameraController.userInterface.buttonE.setTexture('upCannonDmg');

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.cannonDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[11] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
              this.scene.cameraController.userInterface.buttonF.setTexture('upCannonDmg');

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.cannonDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[11] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonF.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
              this.scene.cameraController.userInterface.buttonG.setTexture('upCannonDmg');

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.cannonDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[11] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;

    }  
  }else{
    this.checkEnergy(upgradeDeckID, 'upCannonDmg', 11);
    }       

  }
  cannonRof(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[12] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.cannonRof[this.upgradeTable.cannonRofLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.cannonRof[this.upgradeTable.cannonRof + 1].cost; 

    const time = (this.upgradeTable.cannonRof[this.upgradeTable.cannonRofLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:
      this.scene.cameraController.userInterface.buttonD.setTexture('upCannonRof');
      
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.cannonRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[12] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
      this.scene.cameraController.userInterface.buttonE.setTexture('upCannonRof');
      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.cannonRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[12] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
        this.scene.cameraController.userInterface.buttonF.setTexture('upCannonRof');

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.cannonRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[12] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonF.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
        this.scene.cameraController.userInterface.buttonG.setTexture('upCannonRof');

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.cannonRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[12] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;

    }   
  }else{
    this.checkEnergy(upgradeDeckID, 'upCannonRof', 12);
    }    

  }
  cannonHp(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[13] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.cannonHp[this.upgradeTable.cannonHpLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.cannonHp[this.upgradeTable.cannonHpLevel + 1].cost; 

    const time = (this.upgradeTable.cannonHp[this.upgradeTable.cannonHpLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:
        this.scene.cameraController.userInterface.buttonD.setTexture('upCannonHp');
      
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.cannonHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[13] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
        this.scene.cameraController.userInterface.buttonE.setTexture('upCannonHp');

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.cannonHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[13] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
        this.scene.cameraController.userInterface.buttonF.setTexture('upCannonHp');

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.cannonHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[13] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonF.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
        this.scene.cameraController.userInterface.buttonG.setTexture('upCannonHp');

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.cannonHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[13] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;

    }  
  }else{
    this.checkEnergy(upgradeDeckID, 'upCannonHp', 13);
    }      

  }
  RocketDamage(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[14] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.RocketDamage[this.upgradeTable.RocketDamageLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.RocketDamage[this.upgradeTable.RocketDamageLevel + 1].cost; 
    const time = (this.upgradeTable.RocketDamage[this.upgradeTable.RocketDamageLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:
        this.scene.cameraController.userInterface.buttonD.setTexture('upBRocketDmg');
      
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.RocketDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[14] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
        this.scene.cameraController.userInterface.buttonE.setTexture('upBRocketDmg');

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.RocketDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[14] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
        this.scene.cameraController.userInterface.buttonF.setTexture('upBRocketDmg');
      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.RocketDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[14] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonF.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
        this.scene.cameraController.userInterface.buttonG.setTexture('upBRocketDmg');

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.RocketDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[14] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;

    }    
  }else{
    this.checkEnergy(upgradeDeckID, 'upBRocketDmg', 14);
    }   

  }
  RocketRof(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[15] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.RocketRof[this.upgradeTable.RocketRofLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.RocketRof[this.upgradeTable.RocketRofLevel + 1].cost; 
    const time = (this.upgradeTable.RocketRof[this.upgradeTable.RocketRofLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:
        this.scene.cameraController.userInterface.buttonD.setTexture('upRocketRof');
      
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.RocketRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[15] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
        this.scene.cameraController.userInterface.buttonE.setTexture('upRocketRof');

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.RocketRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[15] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
        this.scene.cameraController.userInterface.buttonF.setTexture('upRocketRof');
      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.RocketRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[15] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonF.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
        this.scene.cameraController.userInterface.buttonG.setTexture('upRocketRof');
      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.RocketRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[15] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;

    } 
  }else{
    this.checkEnergy(upgradeDeckID, 'upRocketRof', 15);
    }        

  }
  RocketHp(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[16] = true;
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true); 

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.RocketHp[this.upgradeTable.RocketHpLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.RocketHp[this.upgradeTable.RocketHp + 1].cost; 

    const time = (this.upgradeTable.RocketHp[this.upgradeTable.RocketHpLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:
        this.scene.cameraController.userInterface.buttonD.setTexture('upRocketHp');
        this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.RocketHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[16] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonD.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
        this.scene.cameraController.userInterface.buttonE.setTexture('upRocketHp');
        this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.RocketHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[16] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonE.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
        this.scene.cameraController.userInterface.buttonF.setTexture('upRocketHp');
        this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.RocketHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[16] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonF.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
        this.scene.cameraController.userInterface.buttonG.setTexture('upRocketHp');
        this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.RocketHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[16] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
        this.scene.cameraController.userInterface.buttonG.setTexture('btnUpgrade');
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;

    }   
  }else{
    this.checkEnergy(upgradeDeckID, 'upRocketHp', 16);
    }    

  }
}
