import Tank from './tank';
import Enemy from "./enemy";
import Gaiser from "./gaiser";
import {calculateIncrementBylevel, verifyPresenceOfEnergy} from "./mathFunction";
import UpgradeTable from "./upgradeTable";
import StatusCounts from "./statusCounts";
import WavesTable from "./wavesTable";

export default class TankFactory {
  constructor(scene){
    this.scene = scene;
    this.tankCount = 0;
    this.enemyCount = 0;
    this.upgradeTable = UpgradeTable.getInstance();
    this.statusCounts = StatusCounts.getInstance();
    this.wavesTable = WavesTable.getInstance();
    
    
    this.deck1Timeout;
    this.deck1countDown;
    this.deck1Time;
    this.deck1Cd = 'empty';
    
    this.deck2Timeout;
    this.deck2countDown;
    this.deck2Time;
    this.deck2Cd = 'empty';
    
    this.deck3Timeout;
    this.deck3countDown;
    this.deck3Time;
    this.deck3Cd = 'empty';
    
    this.deck4Timeout;
    this.deck4countDown;
    this.deck4Time;
    this.deck4Cd = 'empty';

    this.up1Cd = 'empty';
    this.up2Cd = 'empty';
    this.up3Cd = 'empty';
    this.up4Cd = 'empty';
    
    this.waveCd = 180;
    

    this.WavesInterval = setInterval(() => {
      if(this.waveCd < 1){
        this.waveCd = 179;
      }else{
        this.waveCd --;
      }
    }, 1000);

    this.WavesInterval = setInterval(() => {
      console.log('wave');

      this.waveStart(this.wavesTable.waves[this.wavesTable.wavesCount]);
      this.wavesTable.wavesCount ++;
    }, 180 * 1000);

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
  createMgEnemy(position){
    this.enemyCount ++;

    const tankSpeed = calculateIncrementBylevel(34,
      this.upgradeTable.enemySpeedTractionLevel,
      this.upgradeTable.tanksSpeedTraction[this.upgradeTable.enemySpeedTractionLevel].incrementFactor);

    const newEnemy = new Enemy('machineGun',
      this.scene, this.enemyCount, position, 
      this.upgradeTable.mgHp[this.upgradeTable.enemyMgHpLevel].hp, 
      tankSpeed,
      );
      
    this.scene.enemiesGrp.push(newEnemy);
    this.scene.enemies.add(newEnemy.enemy);
  }

  createCannonEnemy(position){
    this.enemyCount ++;

    const tankSpeed = calculateIncrementBylevel(20,
      this.upgradeTable.enemySpeedTractionLevel,
      this.upgradeTable.tanksSpeedTraction[this.upgradeTable.enemySpeedTractionLevel].incrementFactor);

    const newEnemy = new Enemy('cannon',
      this.scene, this.enemyCount, position, 
      this.upgradeTable.cannonHp[this.upgradeTable.enemyCannonHpLevel].hp, 
      tankSpeed,
      );
      
    this.scene.enemiesGrp.push(newEnemy);
    this.scene.enemies.add(newEnemy.enemy);
  }

  createRocketEnemy(position){
    this.enemyCount ++;

    const tankSpeed = calculateIncrementBylevel(27,
      this.upgradeTable.enemySpeedTractionLevel,
      this.upgradeTable.tanksSpeedTraction[this.upgradeTable.enemySpeedTractionLevel].incrementFactor);

    const newEnemy = new Enemy('rocket',
      this.scene, this.enemyCount, position, 
      this.upgradeTable.RocketHp[this.upgradeTable.enemyRocketHpLevel].hp, 
      tankSpeed,
      false, 
      );
      
    this.scene.enemiesGrp.push(newEnemy);
    this.scene.enemies.add(newEnemy.enemy);
  }

  waveStart(wave){
    console.log('enemies incoming!!!');
    this.upgradeEnemiesLevels(wave.levels);
    const numbOfGates = wave.spawnCoordinates.length;
    let gatesCount = 0;
    let totalSpawn = wave.types[0] + wave.types[1] + wave.types[2];
    let typeCounter = wave.types;
    let typeSelector = 0;
    console.log(totalSpawn , numbOfGates );

    let spawnInterval = setInterval(() => {
      if(totalSpawn === 0){
        clearInterval(spawnInterval);
        console.log('finish enemy spawns');
      }else{

        if(typeSelector === 0 ){

            if(gatesCount >= numbOfGates - 1){
              gatesCount = 0;
            }else{
              gatesCount ++;
            }

            if(typeCounter[0] > 0){

              this.createMgEnemy(wave.spawnCoordinates[gatesCount]);
              typeCounter[0] -= 1;
              totalSpawn --;
            }

          typeSelector ++;
        }else if(typeSelector === 1 ){

            if(gatesCount >= numbOfGates - 1){
              gatesCount = 0;
            }else{
              gatesCount ++;
            }

            if(typeCounter[1] > 0){

              this.createCannonEnemy(wave.spawnCoordinates[gatesCount]);
              typeCounter[1] -= 1;
              totalSpawn --;
            }

          typeSelector ++;
        }else if (typeSelector === 2){

          if(gatesCount >= numbOfGates - 1){
            gatesCount = 0;
          }else{
            gatesCount ++;
          }
          
          if(typeCounter[2] > 0){

            this.createRocketEnemy(wave.spawnCoordinates[gatesCount]);
            typeCounter[2] -= 1;
            totalSpawn --;
          }

          typeSelector = 0;
        }
      }
      console.log('spwan interval :', totalSpawn, typeSelector, gatesCount, typeCounter[0]) ;
    }, 250);
    spawnInterval;
  }

  upgradeEnemiesLevels(levels){

    this.upgradeTable.enemySpeedTractionLevel = levels.enemySpeedTractionLevel;
    this.upgradeTable.enemyRangeOfViewLevel   = levels.enemyRangeOfViewLevel;
    this.upgradeTable.enemyMgDamageLevel      = levels.enemyMgDamageLevel;
    this.upgradeTable.enemyMgRofLevel         = levels.enemyMgRofLevel;
    this.upgradeTable.enemyMgHpLevel          = levels.enemyMgHpLevel;
    this.upgradeTable.enemyCannonDamageLevel  = levels.enemyCannonDamageLevel;
    this.upgradeTable.enemyCannonRofLevel     = levels.enemyCannonRofLevel;
    this.upgradeTable.enemyCannonHpLevel      = levels.enemyCannonHpLevel;
    this.upgradeTable.enemyRocketDamageLevel  = levels.enemyRocketDamageLevel;
    this.upgradeTable.enemyRocketRofLevel     = levels.enemyRocketRofLevel;
    this.upgradeTable.enemyRocketHpLevel      = levels.enemyRocketHpLevel;

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

  deckCheckEnergy(upgradeDeckID){
    switch (upgradeDeckID) {
      case 1:
        this.deck1Cd = 'wait';
        setTimeout(() => {
          this.deck1Production();
        }, 5000);
        break;
      case 2:
        this.deck2Cd = 'wait';
        setTimeout(() => {
          this.deck2Production();
        }, 5000);
        break;
      case 3:
        this.deck3Cd = 'wait';
        setTimeout(() => {
          this.deck3Production();
        }, 5000);
        break;
      case 4:
        this.deck4Cd = 'wait';
        setTimeout(() => {
          this.deck4Production();
        }, 5000);
        break;
    }

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
            if(!verifyPresenceOfEnergy(this.statusCounts.mgCost, this.statusCounts.energy)){
              this.deckCheckEnergy(1);
            }else{
              
              this.deck1Time = 
                (this.statusCounts.timeProductionTanks.mg * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
  
              this.deck1Cd = this.deck1Time /1000;
              this.deck1countDown = setInterval(() => {
                this.deck1Cd --;
                
                if(this.deck1Cd < 2){
                  clearInterval(this.deck1countDown);
                }
              }, 1000);
  
              this.deck1Timeout = setTimeout(() => {
  
                this.statusCounts.energy -= this.statusCounts.mgCost;
                this.createMgTank([0,-200]);
                this.deck1Production();
  
              }, this.deck1Time);
  
              this.statusCounts.deck1IsProductive = true;
  
            break;
            }

          case 2:
            if(!verifyPresenceOfEnergy(this.statusCounts.cannonCost, this.statusCounts.energy)){
              this.deckCheckEnergy(1);
            }else{
              
              this.deck1Time = 
                (this.statusCounts.timeProductionTanks.cannon * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
          
              this.deck1Cd = this.deck1Time /1000;
              this.deck1countDown = setInterval(() => {
                this.deck1Cd  --;
                
                if(this.deck1Cd  < 2){
                  clearInterval(this.deck1countDown);
                }
              }, 1000);
              
              this.deck1Timeout = setTimeout(() => {
              
                this.statusCounts.energy -= this.statusCounts.cannonCost;
                this.createCannonTank([0,-200]);
                this.deck1Production();
              
              }, this.deck1Time);
            
              this.statusCounts.deck1IsProductive = true;

            break;
            }
          case 3:
            if(!verifyPresenceOfEnergy(this.statusCounts.rocketCost, this.statusCounts.energy)){
              this.deckCheckEnergy(1);
            }else{
              this.deck1Time = 
                (this.statusCounts.timeProductionTanks.rocket * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
          
              this.deck1Cd = this.deck1Time /1000;
              this.deck1countDown = setInterval(() => {
                this.deck1Cd --;
                
                if(this.deck1Cd < 2){
                  clearInterval(this.deck1countDown);
                }
              }, 1000);
              
              this.deck1Timeout = setTimeout(() => {
              
                this.statusCounts.energy -= this.statusCounts.rocketCost;
                this.createRocketTank([0,-200]);
                this.deck1Production();
              }, this.deck1Time);
            
              this.statusCounts.deck1IsProductive = true;

            break;
            }
        }
      }else{
        // stop production deck 1
        clearInterval(this.deck1Timeout);
        clearInterval(this.deck1countDown);
        this.deck1Cd = 'empty';
        this.statusCounts.deck1IsProductive = false;
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
            if(!verifyPresenceOfEnergy(this.statusCounts.mgCost, this.statusCounts.energy)){
              this.deckCheckEnergy(2);
            }else{
              this.deck2Time = 
                (this.statusCounts.timeProductionTanks.mg * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);

                this.deck2Cd  = this.deck2Time /1000;
                this.deck2countDown = setInterval(() => {
                  this.deck2Cd  --;
                  
                  if(this.deck2Cd  < 2){
                    clearInterval(this.deck2countDown);
                  }
                }, 1000);

              this.deck2Timeout = setInterval(() => {

                this.statusCounts.energy -= this.statusCounts.mgCost;
                this.createMgTank([200,0]);
                this.deck2Production();

              }, this.deck2Time);

              this.statusCounts.deck2IsProductive = true;

            break;
            }
          case 2:
            if(!verifyPresenceOfEnergy(this.statusCounts.cannonCost, this.statusCounts.energy)){
              this.deckCheckEnergy(2);
            }else{
              this.deck2Time = 
                (this.statusCounts.timeProductionTanks.cannon * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
          
                this.deck2Cd  = this.deck2Time /1000;
                this.deck2countDown = setInterval(() => {
                  this.deck2Cd  --;
                  
                  if(this.deck2Cd  < 2){
                    
                    clearInterval(this.deck2countDown);
                  }
                }, 1000);
              
              this.deck2Timeout = setTimeout(() => {
              
                this.statusCounts.energy -= this.statusCounts.cannonCost;
                this.createCannonTank([200,0]);
                this.deck2Production();
              
              }, this.deck2Time);
            
              this.statusCounts.deck2IsProductive = true;

            break;
            }
          case 3:
            if(!verifyPresenceOfEnergy(this.statusCounts.rocketCost, this.statusCounts.energy)){
              this.deckCheckEnergy(2);
            }else{
              this.deck2Time = 
                (this.statusCounts.timeProductionTanks.rocket * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
          
                this.deck2Cd  = this.deck2Time /1000;
                this.deck2countDown = setInterval(() => {
                  this.deck2Cd  --;
                  
                  if(this.deck2Cd  < 2){
                    
                    clearInterval(this.deck2countDown);
                  }
                }, 1000);
              
              this.deck2Timeout = setTimeout(() => {
              
                this.statusCounts.energy -= this.statusCounts.rocketCost;
                this.createRocketTank([200,0]);
                this.deck2Production();
              
              }, this.deck2Time);
            
              this.statusCounts.deck2IsProductive = true;


            break;
          }
        }
      }else{

        clearInterval(this.deck2Timeout);
        clearInterval(this.deck2countDown);
        this.deck2Cd = 0;
        this.statusCounts.deck2IsProductive = false;
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
            if(!verifyPresenceOfEnergy(this.statusCounts.mgCost, this.statusCounts.energy)){
              this.deckCheckEnergy(3);
            }else{
              this.deck3Time = 
                (this.statusCounts.timeProductionTanks.mg * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);

                this.deck3Cd  = this.deck3Time /1000;
                this.deck3countDown = setInterval(() => {
                  this.deck3Cd  --;
                  
                  if(this.deck3Cd  < 2){
                    
                    clearInterval(this.deck3countDown);
                  }
                }, 1000);

              this.deck3Timeout = setTimeout(() => {

                this.statusCounts.energy -= this.statusCounts.mgCost;
                this.createMgTank([0,200]);
                this.deck3Production();

              }, this.deck3Time);

              this.statusCounts.deck3IsProductive = true;

            break;
            }
          case 2:
            if(!verifyPresenceOfEnergy(this.statusCounts.cannonCost, this.statusCounts.energy)){
              this.deckCheckEnergy(3);
            }else{
              this.deck3Time = 
                (this.statusCounts.timeProductionTanks.cannon * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
          
                this.deck3Cd  = this.deck3Time /1000;
                this.deck3countDown = setInterval(() => {
                  this.deck3Cd  --;
                  
                  if(this.deck3Cd  < 2){
                    
                    clearInterval(this.deck3countDown);
                  }
                }, 1000);
              
              this.deck3Timeout = setTimeout(() => {
              
                this.statusCounts.energy -= this.statusCounts.cannonCost;
                this.createCannonTank([0,200]);
                this.deck3Production();
              
              }, this.deck3Time);
            
              this.statusCounts.deck3IsProductive = true;

            break;
            }
          case 3:
            if(!verifyPresenceOfEnergy(this.statusCounts.rocketCost, this.statusCounts.energy)){
              this.deckCheckEnergy(3);
            }else{
              this.deck3Time = 
                (this.statusCounts.timeProductionTanks.rocket * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
          
                this.deck3Cd  = this.deck3Time /1000;
                this.deck3countDown = setInterval(() => {
                  this.deck3Cd  --;
                  
                  if(this.deck3Cd  < 2){
                    
                    clearInterval(this.deck3countDown);
                  }
                }, 1000);
              
              this.deck3Timeout = setTimeout(() => {
              
                this.statusCounts.energy -= this.statusCounts.rocketCost;
                this.createRocketTank([0,200]);
                this.deck3Production();
              
              }, this.deck3Time);
            
              this.statusCounts.deck3IsProductive = true;


            break;
          }
        }
      }else{
        clearInterval(this.deck3Timeout);
        clearInterval(this.deck3countDown);
        this.deck3Cd = 0;
        this.statusCounts.deck3IsProductive = false;
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
            if(!verifyPresenceOfEnergy(this.statusCounts.mgCost, this.statusCounts.energy)){
              this.deckCheckEnergy(4);
            }else{
              this.deck4Time = 
                (this.statusCounts.timeProductionTanks.mg * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);

                this.deck4Cd = this.deck4Time /1000;
                this.deck4countDown = setInterval(() => {
                  this.deck4Cd --;
                  
                  if(this.deck4Cd < 2){
                    
                    clearInterval(this.deck4countDown);
                  }
                }, 1000);

              this.deck4Timeout = setTimeout(() => {

                this.statusCounts.energy -= this.statusCounts.mgCost;
                this.createMgTank([-200,0]);
                this.deck4Production();

              }, this.deck4Time);

              this.statusCounts.deck4IsProductive = true;

            break;
            }
          case 2:
            if(!verifyPresenceOfEnergy(this.statusCounts.cannonCost, this.statusCounts.energy)){
              this.deckCheckEnergy(4);
            }else{
              this.deck4Time = 
                (this.statusCounts.timeProductionTanks.cannon * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
          
                this.deck4Cd = this.deck4Time /1000;
                this.deck4countDown = setInterval(() => {
                  this.deck4Cd --;
                  
                  if(this.deck4Cd < 2){
                    
                    clearInterval(this.deck4countDown);
                  }
                }, 1000);
              
              this.deck4Timeout = setTimeout(() => {
              
                this.statusCounts.energy -= this.statusCounts.cannonCost;
                this.createCannonTank([-200,0]);
                this.deck4Production();
              
              }, this.deck4Time);
            
              this.statusCounts.deck4IsProductive = true;

            break;
            }
          case 3:
            if(!verifyPresenceOfEnergy(this.statusCounts.rocketCost, this.statusCounts.energy)){
              this.deckCheckEnergy(4);
            }else{
              this.deck4Time = 
                (this.statusCounts.timeProductionTanks.rocket * 1000) *
                (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel].reductionFactor);
          
                this.deck4Cd = this.deck4Time /1000;
                this.deck4countDown = setInterval(() => {
                  this.deck4Cd --;
                  
                  if(this.deck4Cd < 2){
                    
                    clearInterval(this.deck4countDown);
                  }
                }, 1000);
              
              this.deck4Timeout = setTimeout(() => {
              
                this.statusCounts.energy -= this.statusCounts.rocketCost;
                this.createRocketTank([-200,0]);
                this.deck4Production();
              
              }, this.deck4Time);
            
              this.statusCounts.deck4IsProductive = true;

              break;
            }
        }
      }else{
        clearInterval(this.deck4Timeout);
        clearInterval(this.deck4countDown);
        this.deck4Cd = 0;
        this.statusCounts.deck4IsProductive = false;
      }
  }
  upgradeCountDown(cd, deck){
    switch (deck) {

      case 1:
        if(cd < 1){
          this.up1Cd = 'empty';
        }else{
          this.up1Cd = cd;
        }
        break;
      case 2:
        if(cd < 1){
          this.up2Cd = 'empty';
        }else{
          this.up2Cd = cd;
        }
        break;
      case 3:
        if(cd < 1){
          this.up3Cd = 'empty';
        }else{
          this.up3Cd = cd;
        }
        break;
      case 4:
        if(cd < 1){
          this.up4Cd = 'empty';
        }else{
          this.up4Cd = cd;
        }
        break;
    }

  }

  checkEnergy(upgradeDeckID, research, researchID){

    switch (upgradeDeckID) {
      case 1:
        this.up1Cd ='wait';
      break
      case 2:
        this.up2Cd ='wait';
      break
      case 3:
        this.up3Cd ='wait';
      break
      case 4:
        this.up4Cd ='wait';
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
  
  //  research upgrade
  researchSpeed(upgradeDeckID){
    
    this.upgradeTable.upgradeIdIsSearching[0] = true;

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel + 1].cost, this.statusCounts.energy ));
    console.log(PresenceOfEnergy);

      if (PresenceOfEnergy){
        this.statusCounts.energy -= this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel + 1].cost; 

        const time = (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel + 1].time * 1000) *
        (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
        
    
        switch (upgradeDeckID) {
          case 1:
          this.upgrade1TimeOut = setTimeout(() => {
            
            clearInterval(this.upgrade1countDown);
    
            this.upgradeTable.researchSpeedLevel ++;  
            this.upgradeTable.upgradeIdIsSearching[0] = false;
            
          }, time);
    
            var cd = (time /1000) - 1;
    
            this.upgrade1countDown = setInterval(() => {
              cd --;
              this.upgradeCountDown(cd,upgradeDeckID);
              
            }, 1000);
            break;
          case 2:
          this.upgrade2TimeOut = setTimeout(() => {
            clearInterval(this.upgrade2countDown);
    
            this.upgradeTable.researchSpeedLevel ++;  
            this.upgradeTable.upgradeIdIsSearching[0] = false;
            
          }, time);
    
            var cd = (time /1000) - 1 ;
    
            this.upgrade2countDown = setInterval(() => {
              cd --;
              this.upgradeCountDown(cd,upgradeDeckID);
              
            }, 1000);
            break;
          case 3:
          this.upgrade3TimeOut = setTimeout(() => {
            clearInterval(this.upgrade3countDown);
    
            this.upgradeTable.researchSpeedLevel ++;  
            this.upgradeTable.upgradeIdIsSearching[0] = false;
            
          }, time);
    
            var cd = (time /1000) - 1  ;
    
            this.upgrade3countDown = setInterval(() => {
              cd --;
              this.upgradeCountDown(cd,upgradeDeckID);
              
            }, 1000);
            break;
          case 4:
          this.upgrade4TimeOut = setTimeout(() => {
            clearInterval(this.upgrade4countDown);
    
            this.upgradeTable.researchSpeedLevel ++;  
            this.upgradeTable.upgradeIdIsSearching[0] = false;
            
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

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.energyEfficiency[this.upgradeTable.energyEfficiencyLevel + 1].cost, this.statusCounts.energy ));

    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.energyEfficiency[this.upgradeTable.energyEfficiencyLevel + 1].cost; 

      const time = (this.upgradeTable.energyEfficiency[this.upgradeTable.energyEfficiencyLevel + 1 ].time * 1000) *
      (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
      
      switch (upgradeDeckID) {
        case 1:
        this.upgrade1TimeOut = setTimeout(() => {
          clearInterval(this.upgrade1countDown);

          this.upgradeTable.energyEfficiencyLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[1] = false;

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade1countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 2:
        this.upgrade2TimeOut = setTimeout(() => {
          clearInterval(this.upgrade2countDown);

          this.upgradeTable.energyEfficiencyLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[1] = false;

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade2countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 3:
        this.upgrade3TimeOut = setTimeout(() => {
          clearInterval(this.upgrade3countDown);

          this.upgradeTable.energyEfficiencyLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[1] = false;

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade3countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);
            this.statusCounts.upgrade3Cd = cd;

          }, 1000);
          break;
        case 4:
        this.upgrade4TimeOut = setTimeout(() => {
          clearInterval(this.upgrade4countDown);

          this.upgradeTable.energyEfficiencyLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[1] = false;

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
    
    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.engineerEfficiency[this.upgradeTable.engineerEfficiencyLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.engineerEfficiency[this.upgradeTable.engineerEfficiencyLevel + 1].cost; 
      const time = (this.upgradeTable.engineerEfficiency[this.upgradeTable.engineerEfficiencyLevel + 1].time * 1000) *
      (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
      const engSpeed = this.upgradeTable.engineerEfficiency[this.upgradeTable.engineerEfficiencyLevel + 1].moveSpeed;
      switch (upgradeDeckID) {
        case 1:
          this.upgrade1TimeOut = setTimeout(() => {
          clearInterval(this.upgrade1countDown);
          this.scene.engineering.speed = engSpeed;
          this.upgradeTable.engineerEfficiencyLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[2] = false;

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade1countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 2:
          this.upgrade2TimeOut = setTimeout(() => {
            clearInterval(this.upgrade2countDown);
            this.scene.engineering.speed = engSpeed;
            this.upgradeTable.engineerEfficiencyLevel ++;  
            this.upgradeTable.upgradeIdIsSearching[2] = false;

          }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade2countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 3:          
          this.upgrade3TimeOut = setTimeout(() => {
          clearInterval(this.upgrade3countDown);
          this.scene.engineering.speed = engSpeed;

          this.upgradeTable.engineerEfficiencyLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[2] = false;

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade3countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 4:
        this.upgrade4TimeOut = setTimeout(() => {
          clearInterval(this.upgrade4countDown);
          this.scene.engineering.speed = engSpeed;
          this.upgradeTable.engineerEfficiencyLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[2] = false;

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

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.buildingsArmor[this.upgradeTable.buildingsArmorLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.buildingsArmor[this.upgradeTable.buildingsArmorLevel + 1].cost; 
      
      const time = (this.upgradeTable.buildingsArmor[this.upgradeTable.buildingsArmorLevel + 1].time * 1000) *
      (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);

      switch (upgradeDeckID) {
        case 1:
        this.upgrade1TimeOut = setTimeout(() => {
          clearInterval(this.upgrade1countDown);

          this.upgradeTable.buildingsArmorLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[3] = false;

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade1countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 2:
        this.upgrade2TimeOut = setTimeout(() => {
          clearInterval(this.upgrade2countDown);

          this.upgradeTable.buildingsArmorLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[3] = false;

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade2countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 3:
        this.upgrade3TimeOut = setTimeout(() => {
          clearInterval(this.upgrade3countDown);

          this.upgradeTable.buildingsArmorLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[3] = false;

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade3countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 4:
        this.upgrade4TimeOut = setTimeout(() => {
          clearInterval(this.upgrade4countDown);

          this.upgradeTable.buildingsArmorLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[3] = false;

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

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.boostSpeed[this.upgradeTable.boostSpeedLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.boostSpeed[this.upgradeTable.boostSpeedLevel + 1].cost; 
      const time = (this.upgradeTable.boostSpeed[this.upgradeTable.boostSpeedLevel + 1].time * 1000) *
      (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
      
      switch (upgradeDeckID) {
        case 1:
        this.upgrade1TimeOut = setTimeout(() => {
          clearInterval(this.upgrade1countDown);

          this.upgradeTable.boostSpeedLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[4] = false;

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade1countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 2:
        this.upgrade2TimeOut = setTimeout(() => {
          clearInterval(this.upgrade2countDown);

          this.upgradeTable.boostSpeedLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[4] = false;

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade2countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 3:
        this.upgrade3TimeOut = setTimeout(() => {
          clearInterval(this.upgrade3countDown);

          this.upgradeTable.boostSpeedLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[4] = false;

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade3countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 4:
        this.upgrade4TimeOut = setTimeout(() => {
          clearInterval(this.upgrade4countDown);

          this.upgradeTable.boostSpeedLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[4] = false;

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

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){

      this.statusCounts.energy -= this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel + 1].cost; 
    
      const time = (this.upgradeTable.tanksProductionSpeed[this.upgradeTable.tanksProductionSpeedLevel + 1].time * 1000) *
      (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
      switch (upgradeDeckID) {
        case 1:
        this.upgrade1TimeOut = setTimeout(() => {
          clearInterval(this.upgrade1countDown);

          this.upgradeTable.tanksProductionSpeedLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[5] = false;

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade1countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 2:
        this.upgrade2TimeOut = setTimeout(() => {
          clearInterval(this.upgrade2countDown);

          this.upgradeTable.tanksProductionSpeedLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[5] = false;

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade2countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 3:
        this.upgrade3TimeOut = setTimeout(() => {
          clearInterval(this.upgrade3countDown);

          this.upgradeTable.tanksProductionSpeedLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[5] = false;

        }, time);

          var cd = (time /1000) - 1  ;

          this.upgrade3countDown = setInterval(() => {
            cd --;
            this.upgradeCountDown(cd,upgradeDeckID);

          }, 1000);
          break;
        case 4:
        this.upgrade4TimeOut = setTimeout(() => {
          clearInterval(this.upgrade4countDown);

          this.upgradeTable.tanksProductionSpeedLevel ++;  
          this.upgradeTable.upgradeIdIsSearching[5] = false;

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
  speedTractionUpdate(){
    this.scene.tanksGrp1.forEach(tank => {
      tank.tank.speed *= this.upgradeTable.tanksSpeedTraction[this.upgradeTable.tanksSpeedTractionLevel].incrementFactor;
    });
  }
  tanksSpeedTraction(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[6] = true;

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.tanksSpeedTraction[this.upgradeTable.tanksSpeedTractionLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.tanksSpeedTraction[this.upgradeTable.tanksSpeedTractionLevel + 1].cost; 
    const time = (this.upgradeTable.tanksSpeedTraction[this.upgradeTable.tanksSpeedTractionLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:      
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.tanksSpeedTractionLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[6] = false;
        this.speedTractionUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.tanksSpeedTractionLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[6] = false;
        this.speedTractionUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.tanksSpeedTractionLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[6] = false;
        this.speedTractionUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.tanksSpeedTractionLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[6] = false;
        this.speedTractionUpdate();
        
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
  RangeOfViewUpdate(){
    this.scene.tanksGrp1.forEach(tank => {
      tank.tank.cannon.range *= this.upgradeTable.tanksRangeOfView[this.upgradeTable.tanksRangeOfViewLevel].incrementFactor;
    });
  }
  tanksRangeOfView(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[7] = true;

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.tanksRangeOfView[this.upgradeTable.tanksRangeOfViewLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.tanksRangeOfView[this.upgradeTable.tanksRangeOfViewLevel + 1].cost; 
    const time = (this.upgradeTable.tanksRangeOfView[this.upgradeTable.tanksRangeOfViewLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:
        this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.tanksRangeOfViewLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[6] = false;
        this.RangeOfViewUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.tanksRangeOfViewLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[7] = false;
        this.RangeOfViewUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.tanksRangeOfViewLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[7] = false;
        this.RangeOfViewUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.tanksRangeOfViewLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[7] = false;
        this.RangeOfViewUpdate();
        
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
  mgDamageUpdate(){
    let machineGuns = this.scene.tanksGrp1.filter(tank => ( tank.type === 'machineGun'));
    machineGuns.forEach(tank => {
      tank.tank.cannon.damage = this.upgradeTable.mgDamage[this.upgradeTable.mgDamageLevel].dmg;
    });
  }
  mgDamage(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[8] = true;

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.mgDamage[this.upgradeTable.mgDamageLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.mgDamage[this.upgradeTable.mgDamageLevel + 1].cost; 

      const time = (this.upgradeTable.mgDamage[this.upgradeTable.mgDamageLevel + 1].time * 1000) *
        (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:      
        this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.mgDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[8] = false;

        this.mgDamageUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
        this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.mgDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[8] = false;

        this.mgDamageUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
        this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.mgDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[8] = false;

        this.mgDamageUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.mgDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[8] = false;

        this.mgDamageUpdate();
        
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
  mgRofUpdate(){
    let machineGuns = this.scene.tanksGrp1.filter(tank => ( tank.type === 'machineGun'));
    machineGuns.forEach(tank => {
      tank.tank.cannon.rof =              this.upgradeTable.mgRof[this.upgradeTable.mgRofLevel].rof;
      tank.tank.cannon.shotCharge =       this.upgradeTable.mgRof[this.upgradeTable.mgRofLevel].rof;
      tank.tank.cannon.rotationVelocity = this.upgradeTable.mgRof[this.upgradeTable.mgRofLevel].rot;
    });
  }
  mgRof(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[9] = true;

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.mgRof[this.upgradeTable.mgRofLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
    this.statusCounts.energy -= this.upgradeTable.mgRof[this.upgradeTable.mgRofLevel + 1].cost; 
    const time = (this.upgradeTable.mgRof[this.upgradeTable.mgRofLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:      
        this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.mgRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[9] = false;
        this.mgRofUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.mgRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[9] = false;
        this.mgRofUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.mgRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[9] = false;
        this.mgRofUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:

      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.mgRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[9] = false;
        this.mgRofUpdate();
        
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
  mgHpUpdate(){
    let machineGuns = this.scene.tanksGrp1.filter(tank => ( tank.type === 'machineGun'));
    machineGuns.forEach(tank => {
      tank.tank.maxHp = this.upgradeTable.mgHp[this.upgradeTable.mgHpLevel].hp;
    });
  }
  mgHp(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[10] = true;

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.mgHp[this.upgradeTable.mgHpLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.mgHp[this.upgradeTable.mgHpLevel + 1].cost; 
    const time = (this.upgradeTable.mgHp[this.upgradeTable.mgHpLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:      
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.mgHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[10] = false;
        this.mgHpUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.mgHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[10] = false;
        this.mgHpUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.mgHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[10] = false;
        this.mgHpUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.mgHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[10] = false;
        this.mgHpUpdate();;
        
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
  cannonDamageUpdate(){
    let cannons = this.scene.tanksGrp1.filter(tank => ( tank.type === 'cannon'));
    cannons.forEach(tank => {
      tank.tank.cannon.damage = this.upgradeTable.cannonDamage[this.upgradeTable.cannonDamageLevel].dmg;
    });
  }
  cannonDamage(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[11] = true;

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.cannonDamage[this.upgradeTable.cannonDamageLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.cannonDamage[this.upgradeTable.cannonDamageLevel + 1].cost; 

    const time = (this.upgradeTable.cannonDamage[this.upgradeTable.cannonDamageLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:      
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.cannonDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[11] = false;
        this.cannonDamageUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.cannonDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[11] = false;
        this.cannonDamageUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.cannonDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[11] = false;
        this.cannonDamageUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
        this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.cannonDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[11] = false;
        this.cannonDamageUpdate();
        
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
  cannonRofUpdate(){
    let cannons = this.scene.tanksGrp1.filter(tank => ( tank.type === 'cannon'));
    cannons.forEach(tank => {
      tank.tank.cannon.rof =              this.upgradeTable.cannonRof[this.upgradeTable.cannonRofLevel].rof;
      tank.tank.cannon.shotCharge =       this.upgradeTable.cannonRof[this.upgradeTable.cannonRofLevel].rof;
      tank.tank.cannon.rotationVelocity = this.upgradeTable.cannonRof[this.upgradeTable.cannonRofLevel].rot;
    });
  }
  cannonRof(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[12] = true;

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.cannonRof[this.upgradeTable.cannonRofLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.cannonRof[this.upgradeTable.cannonRofLevel + 1].cost; 

    const time = (this.upgradeTable.cannonRof[this.upgradeTable.cannonRofLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:      
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.cannonRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[12] = false;
        this.cannonRofUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.cannonRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[12] = false;
        this.cannonRofUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
        this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.cannonRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[12] = false;
        this.cannonRofUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.cannonRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[12] = false;
        this.cannonRofUpdate();
        
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
  cannonHpUpdate(){
    let cannons = this.scene.tanksGrp1.filter(tank => ( tank.type === 'cannon'));
    cannons.forEach(tank => {
      tank.tank.maxHp = this.upgradeTable.cannonHp[this.upgradeTable.cannonHpLevel].hp;
      tank.tank.lifeBar.maxHp = this.upgradeTable.cannonHp[this.upgradeTable.cannonHpLevel].hp;
    });
  }
  cannonHp(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[13] = true;

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.cannonHp[this.upgradeTable.cannonHpLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.cannonHp[this.upgradeTable.cannonHpLevel + 1].cost; 

    const time = (this.upgradeTable.cannonHp[this.upgradeTable.cannonHpLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:      
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.cannonHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[13] = false;
        this.cannonHpUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.cannonHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[13] = false;
        this.cannonHpUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.cannonHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[13] = false;
        this.cannonHpUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.cannonHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[13] = false;
        this.cannonHpUpdate();
        
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
  rocketDamageUpdate(){
    let rockets = this.scene.tanksGrp1.filter(tank => ( tank.type === 'rocket'));
    rockets.forEach(tank => {
      tank.tank.cannon.damage = this.upgradeTable.RocketDamage[this.upgradeTable.RocketDamageLevel].dmg;
    });
  }
  RocketDamage(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[14] = true;

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.RocketDamage[this.upgradeTable.RocketDamageLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.RocketDamage[this.upgradeTable.RocketDamageLevel + 1].cost; 
    const time = (this.upgradeTable.RocketDamage[this.upgradeTable.RocketDamageLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:      
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.RocketDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[14] = false;
        this.rocketDamageUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.RocketDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[14] = false;
        this.rocketDamageUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.RocketDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[14] = false;
        this.rocketDamageUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.RocketDamageLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[14] = false;
        this.rocketDamageUpdate();
        
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
  rocketRofUpdate(){
    let rockets = this.scene.tanksGrp1.filter(tank => ( tank.type === 'rocket'));
    rockets.forEach(tank => {
      tank.tank.cannon.rof =              this.upgradeTable.RocketRof[this.upgradeTable.RocketRofLevel].rof;
      tank.tank.cannon.shotCharge =       this.upgradeTable.RocketRof[this.upgradeTable.RocketRofLevel].rof;
      tank.tank.cannon.rotationVelocity = this.upgradeTable.RocketRof[this.upgradeTable.RocketRofLevel].rot;
    });
  }
  RocketRof(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[15] = true;

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.RocketRof[this.upgradeTable.RocketRofLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.RocketRof[this.upgradeTable.RocketRofLevel + 1].cost; 
    const time = (this.upgradeTable.RocketRof[this.upgradeTable.RocketRofLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:      
      this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.RocketRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[15] = false;
        this.rocketRofUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
      this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.RocketRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[15] = false;
        this.rocketRofUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
      this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.RocketRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[15] = false;
        this.rocketRofUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
      this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.RocketRofLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[15] = false;
        this.rocketRofUpdate();
        
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
  rocketHpUpdate(){
    let rockets = this.scene.tanksGrp1.filter(tank => ( tank.type === 'rocket'));
    rockets.forEach(tank => {
      tank.tank.maxHp = this.upgradeTable.RocketHp[this.upgradeTable.RocketHpLevel].hp;
    });
  }
  RocketHp(upgradeDeckID){

    this.upgradeTable.upgradeIdIsSearching[16] = true;

    let PresenceOfEnergy = (verifyPresenceOfEnergy(this.upgradeTable.RocketHp[this.upgradeTable.RocketHpLevel + 1].cost, this.statusCounts.energy ));
    
    if (PresenceOfEnergy){
      this.statusCounts.energy -= this.upgradeTable.RocketHp[this.upgradeTable.RocketHpLevel + 1].cost; 

    const time = (this.upgradeTable.RocketHp[this.upgradeTable.RocketHpLevel + 1].time * 1000) *
    (this.upgradeTable.researchSpeed[this.upgradeTable.researchSpeedLevel].reductionFactor);
    
    switch (upgradeDeckID) {
      case 1:
        this.upgrade1TimeOut = setTimeout(() => {
        clearInterval(this.upgrade1countDown);

        this.upgradeTable.RocketHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[16] = false;
        this.rocketHpUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade1countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 2:
        this.upgrade2TimeOut = setTimeout(() => {
        clearInterval(this.upgrade2countDown);

        this.upgradeTable.RocketHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[16] = false;
        this.rocketHpUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade2countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 3:
        this.upgrade3TimeOut = setTimeout(() => {
        clearInterval(this.upgrade3countDown);

        this.upgradeTable.RocketHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[16] = false;
        this.rocketHpUpdate();
        
      }, time);

        var cd = (time /1000) - 1  ;

        this.upgrade3countDown = setInterval(() => {
          cd --;
          this.upgradeCountDown(cd,upgradeDeckID);
          
        }, 1000);
        break;
      case 4:
        this.upgrade4TimeOut = setTimeout(() => {
        clearInterval(this.upgrade4countDown);

        this.upgradeTable.RocketHpLevel ++;  
        this.upgradeTable.upgradeIdIsSearching[16] = false;
        this.rocketHpUpdate();
        
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
