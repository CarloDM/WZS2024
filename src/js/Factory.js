import Tank from './tank';
import Enemy from "./enemy";
import Gaiser from "./gaiser";
import {calculateIncrementBylevel} from "./mathFunction";
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

    console.log('deck1 tap');
    if(!this.statusCounts.deck1IsProductive){

    }else{
      console.log('clear');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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

    console.log('deck2 tap');
    if(!this.statusCounts.deck2IsProductive){

    }else{
      console.log('clear');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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

    console.log('deck3 tap');
    if(!this.statusCounts.deck3IsProductive){

    }else{
      console.log('clear');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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

    console.log('deck4 tap');
    if(!this.statusCounts.deck4IsProductive){

    }else{
      console.log('clear');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
                  console.log(cd);
                  if(cd < 2){
                    console.log('clear count down');
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
  // decks production----------
  //  research upgrade
  researchSpeed(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[0] = true;
    
    const time = (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);

    switch (upgradeDeckID) {
      case 1:

      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.researchSpeedLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[0] = false;
        console.log(this.upgradeTable.researchSpeedLevel);
        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.researchSpeedLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[0] = false;
        console.log(this.upgradeTable.researchSpeedLevel);
        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.researchSpeedLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[0] = false;
        console.log(this.upgradeTable.researchSpeedLevel);
        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.researchSpeedLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[0] = false;
        console.log(this.upgradeTable.researchSpeedLevel);
        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
  energyEfficiency(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[1] = true;
    
    const time = (this.upgradeTable.energyEfficiency[this.upgradeTable.energyEfficiencyLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    console.log(time,upgradeDeckID);
    
    switch (upgradeDeckID) {
      case 1:
      console.log(upgradeDeckID);
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.energyEfficiencyLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[1] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.energyEfficiencyLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[1] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.energyEfficiencyLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[1] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.energyEfficiencyLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[1] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
  engineerEfficiency(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[2] = true;
    
    const time = (this.upgradeTable.engineerEfficiency[this.upgradeTable.engineerEfficiencyLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    console.log(time,upgradeDeckID);
    
    switch (upgradeDeckID) {
      case 1:
      console.log(upgradeDeckID);
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.engineerEfficiencyLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[2] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.engineerEfficiencyLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[2] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.engineerEfficiencyLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[2] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.engineerEfficiencyLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[2] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
  buildingsArmor(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[3] = true;
    
    const time = (this.upgradeTable.buildingsArmor[this.upgradeTable.buildingsArmorLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    console.log(time,upgradeDeckID);
    
    switch (upgradeDeckID) {
      case 1:
      console.log(upgradeDeckID);
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.buildingsArmorLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[3] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.buildingsArmorLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[3] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.buildingsArmorLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[3] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.buildingsArmorLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[3] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
  boostSpeed(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[4] = true;
    
    const time = (this.upgradeTable.boostSpeed[this.upgradeTable.boostSpeedLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    console.log(time,upgradeDeckID);
    
    switch (upgradeDeckID) {
      case 1:
      console.log(upgradeDeckID);
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.boostSpeedLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[4] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.boostSpeedLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[4] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.boostSpeedLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[4] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.boostSpeedLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[4] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
  tanksProductionSpeed(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[5] = true;
    
    const time = (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    console.log(time,upgradeDeckID);
    
    switch (upgradeDeckID) {
      case 1:
      console.log(upgradeDeckID);
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.tanksProductionSpeedLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[5] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.tanksProductionSpeedLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[5] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.tanksProductionSpeedLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[5] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.tanksProductionSpeedLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[5] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
  tanksSpeedTraction(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[6] = true;
    
    const time = (this.upgradeTable.tanksSpeedTraction[this.upgradeTable.tanksSpeedTractionLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    console.log(time,upgradeDeckID);
    
    switch (upgradeDeckID) {
      case 1:
      console.log(upgradeDeckID);
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.tanksSpeedTractionLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[6] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.tanksSpeedTractionLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[6] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.tanksSpeedTractionLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[6] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.tanksSpeedTractionLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[6] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
  tanksRangeOfView(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[7] = true;
    
    const time = (this.upgradeTable.tanksRangeOfView[this.upgradeTable.tanksRangeOfViewLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    console.log(time,upgradeDeckID);
    
    switch (upgradeDeckID) {
      case 1:
      console.log(upgradeDeckID);
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.tanksRangeOfViewLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[6] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.tanksRangeOfViewLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[7] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.tanksRangeOfViewLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[7] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.tanksRangeOfViewLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[7] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
  mgDamage(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[8] = true;
    
    const time = (this.upgradeTable.mgDamage[this.upgradeTable.mgDamageLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    console.log(time,upgradeDeckID);
    
    switch (upgradeDeckID) {
      case 1:
      console.log(upgradeDeckID);
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.mgDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[8] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.mgDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[8] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.mgDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[8] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.mgDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[8] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
  mgRof(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[9] = true;
    
    const time = (this.upgradeTable.mgRof[this.upgradeTable.mgRofLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    console.log(time,upgradeDeckID);
    
    switch (upgradeDeckID) {
      case 1:
      console.log(upgradeDeckID);
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.mgRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[9] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.mgRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[9] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.mgRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[9] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.mgRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[9] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
  mgHp(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[10] = true;
    
    const time = (this.upgradeTable.mgHp[this.upgradeTable.mgHpLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    console.log(time,upgradeDeckID);
    
    switch (upgradeDeckID) {
      case 1:
      console.log(upgradeDeckID);
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.mgHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[10] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.mgHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[10] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.mgHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[10] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.mgHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[10] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
  cannonDamage(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[11] = true;
    
    const time = (this.upgradeTable.cannonDamage[this.upgradeTable.cannonDamageLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    console.log(time,upgradeDeckID);
    
    switch (upgradeDeckID) {
      case 1:
      console.log(upgradeDeckID);
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.cannonDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[11] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.cannonDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[11] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.cannonDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[11] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.cannonDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[11] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
  cannonRof(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[12] = true;
    
    const time = (this.upgradeTable.cannonRof[this.upgradeTable.cannonRofLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    console.log(time,upgradeDeckID);
    
    switch (upgradeDeckID) {
      case 1:
      console.log(upgradeDeckID);
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.cannonRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[12] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.cannonRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[12] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.cannonRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[12] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.cannonRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[12] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
  cannonHp(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[13] = true;
    
    const time = (this.upgradeTable.cannonHp[this.upgradeTable.cannonHpLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    console.log(time,upgradeDeckID);
    
    switch (upgradeDeckID) {
      case 1:
      console.log(upgradeDeckID);
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.cannonHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[13] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.cannonHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[13] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.cannonHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[13] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.cannonHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[13] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
  RocketDamage(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[14] = true;
    
    const time = (this.upgradeTable.RocketDamage[this.upgradeTable.RocketDamageLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    console.log(time,upgradeDeckID);
    
    switch (upgradeDeckID) {
      case 1:
      console.log(upgradeDeckID);
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.RocketDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[14] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.RocketDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[14] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.RocketDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[14] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.RocketDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[14] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
  RocketRof(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[15] = true;
    
    const time = (this.upgradeTable.RocketRof[this.upgradeTable.RocketRofLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    console.log(time,upgradeDeckID);
    
    switch (upgradeDeckID) {
      case 1:
      console.log(upgradeDeckID);
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.RocketRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[15] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.RocketRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[15] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.RocketRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[15] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.RocketRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[15] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
  RocketHp(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[16] = true;
    
    const time = (this.upgradeTable.RocketHp[this.upgradeTable.RocketHpLevel].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, true);
    console.log(time,upgradeDeckID);
    
    switch (upgradeDeckID) {
      case 1:
      console.log(upgradeDeckID);
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.RocketHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[16] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          console.log('up 1 count down', cd);
        }, 1000);
        break;
      case 2:

      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.RocketHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[16] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          console.log('up 2 count down', cd);
        }, 1000);
        break;
      case 3:

      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.RocketHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[16] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          console.log('up 3 count down', cd);
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.RocketHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[16] = false;

        this.scene.cameraController.userInterface.istance.blockButton(upgradeDeckID, false);
      }, time);

        var cd = time /1000;

        this.upgrade4countDown = setInterval(() => {
          cd --;
          console.log('up 4 count down', cd);
        }, 1000);
        break;

    }      

  }
};
