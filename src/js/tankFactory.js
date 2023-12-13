import Tank from './tank';
export default class TankFactory {
  constructor(scene){
    this.scene = scene;
    this.tankCount = 0;
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

};