import Tank from './tank';
import Enemy from "./enemy";
export default class TankFactory {
  constructor(scene){
    this.scene = scene;
    this.tankCount = 0;
    this.enemyCount = 0;
  }
  
  createTank(position){
    this.tankCount ++
    const newTank = new Tank(this.scene, this.tankCount, position, 500);
    this.scene.tanksGrp1.push(newTank);
    this.scene.tanks.add(newTank.tank);
  }

  createMultipleTanks(tankCount, startingPosition) {


    for (let i = 0; i < tankCount; i++) {

      const position = [startingPosition[0] + i * 128, startingPosition[1]];
      this.createTank(position);

    }

  }

  createEnemy(position){
    this.enemyCount ++

    const newEnemy = new Enemy(this.scene, this.enemyCount, position, 100);
    this.scene.enemiesGrp.push(newEnemy);
    this.scene.enemies.add(newEnemy.enemy);
  }
  
  createMultipleEnemies(number,  startingPosition) {
  
    for (let i = 0; i < number; i++) {
  
      const position = [startingPosition[0] + i * 128, startingPosition[1]];
      this.createEnemy(position);

    }
  

  }
};
