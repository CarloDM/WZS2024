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
    console.log('newtank', this.tankCount)
    return new Tank(this.scene, this.tankCount, position);
  }

  createMultipleTanks(tankCount,  startingPosition) {
    const tanks = [];

    for (let i = 0; i < tankCount; i++) {

      const position = [startingPosition[0] + i * 128, startingPosition[1]];
      const tank = this.createTank(position);
      tanks.push(tank);
    }

    return tanks;
  }

  createEnemy(position){
    this.enemyCount ++
    console.log('new Enemy', this.enemyCount)
    return new Enemy(this.scene, this.enemyCount, position);
  }
  
  createMultipleEnemies(number,  startingPosition) {
    const enemies = [];
  
    for (let i = 0; i < number; i++) {
  
      const position = [startingPosition[0] + i * 128, startingPosition[1]];
      const enemy = this.createEnemy(position);
      enemies.push(enemy);
    }
  
    return enemies;
  }
};
