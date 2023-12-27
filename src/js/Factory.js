import Tank from './tank';
import Enemy from "./enemy";
import Gaiser from "./gaiser";
import {calculateIncrementBylevel} from "./mathFunction";
import UpgradeTable from "./upgradeTable";
export default class TankFactory {
  constructor(scene){
    this.scene = scene;
    this.tankCount = 0;
    this.enemyCount = 0;
    this.upgradeTable = UpgradeTable.getInstance();

    this.mgTankCost = 100;
    this.cannonTankCost = 100;
    this.rocketTankCost = 100;

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

};
