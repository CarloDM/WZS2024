// singleTone class

class WavesTable {
  constructor(){

    const gate1 = [ -1840, -1776 ];  //L top
    const gate2 = [ -16,   -1776 ];  //top
    const gate3 = [  1776, -1776 ];  //R top
    const gate4 = [  1744, -16   ];  //R
    const gate5 = [  1808,  1776 ];  //r bottom
    const gate6 = [ -16,    1776 ];  //bottom
    const gate7 = [ -1776,  1776 ];  //L bottom
    const gate8 = [ -1776, -16   ];  //L

    this.wavesCount = 0;
    this.waves = 
    [
      {
        enemiesNumber : 15,
        types : [2,2,4],
        spawnCoordinates : [gate1,gate2,gate3,gate4,gate5,gate6,gate7,gate8],
        levels : {
          enemySpeedTractionLevel : 0,
          enemyRangeOfViewLevel :   0,
          enemyMgDamageLevel :      0,
          enemyMgRofLevel :         0,
          enemyMgHpLevel :          0,
          enemyCannonDamageLevel :  0,
          enemyCannonRofLevel :     0,
          enemyCannonHpLevel :      0,
          enemyRocketDamageLevel :  0,
          enemyRocketRofLevel :     0,
          enemyRocketHpLevel :      0,
        }
      }
    ]

    this.WavesTable = this;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new WavesTable();
    }
    return this.instance;
  }
}

export default WavesTable;