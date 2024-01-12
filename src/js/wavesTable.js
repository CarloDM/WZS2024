// singleTone class

class WavesTable {
  constructor(){

    const gateLTop    = [ -1840, -1776 ];  //L top
    const gateTop     = [ -16,   -1776 ];  //top
    const gateRtop    = [  1776, -1776 ];  //R top
    const gateR       = [  1744, -16   ];  //R
    const gateRBottom = [  1808,  1776 ];  //r bottom
    const gateBottom  = [ -16,    1776 ];  //bottom
    const gateLBottom = [ -1776,  1776 ];  //L bottom
    const gateL       = [ -1776, -16   ];  //L

    this.wavesCount = 0;
    this.waves = 
    [
      {
        types : [10,0,0],
        spawnCoordinates : [gateTop],
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
      },
      {
        types : [15,0,0],
        spawnCoordinates : [gateTop,gateBottom],
        levels : {
          enemySpeedTractionLevel : 0,
          enemyRangeOfViewLevel :   0,
          enemyMgDamageLevel :      0,
          enemyMgRofLevel :         0,
          enemyMgHpLevel :          0,
          enemyCannonDamageLevel :  0,
          enemyCannonRofLevel :     0,
          enemyCannonHpLevel :      0,
          enemyRocketDamageLevel :  1,
          enemyRocketRofLevel :     1,
          enemyRocketHpLevel :      1,
        }
      },
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