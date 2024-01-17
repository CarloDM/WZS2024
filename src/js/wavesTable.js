// singleTone class

class WavesTable {
  constructor(){

    const gateLTop    = [ -1840, -1776 ];  //L top
    const gateTop     = [ -16,   -1776 ];  //top
    const gateRTop    = [  1776, -1776 ];  //R top
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
          enemyMgRofLevel :         2,
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
        types : [15,5,5],
        spawnCoordinates : [gateTop,gateBottom,gateR,gateL],
        levels : {
          enemySpeedTractionLevel : 0,
          enemyRangeOfViewLevel :   1,
          enemyMgDamageLevel :      1,
          enemyMgRofLevel :         1,
          enemyMgHpLevel :          1,
          enemyCannonDamageLevel :  1,
          enemyCannonRofLevel :     1,
          enemyCannonHpLevel :      1,
          enemyRocketDamageLevel :  1,
          enemyRocketRofLevel :     1,
          enemyRocketHpLevel :      1,
        }
      },
      {
        types : [20,8,8],
        spawnCoordinates : [gateLTop,gateTop,gateRTop],
        levels : {
          enemySpeedTractionLevel : 0,
          enemyRangeOfViewLevel :   1,
          enemyMgDamageLevel :      1,
          enemyMgRofLevel :         1,
          enemyMgHpLevel :          1,
          enemyCannonDamageLevel :  1,
          enemyCannonRofLevel :     2,
          enemyCannonHpLevel :      1,
          enemyRocketDamageLevel :  1,
          enemyRocketRofLevel :     1,
          enemyRocketHpLevel :      0,
        }
      },
      {
        types : [30,12,12],
        spawnCoordinates : [gateRBottom,gateBottom,gateLBottom],
        levels : {
          enemySpeedTractionLevel : 1,
          enemyRangeOfViewLevel :   1,
          enemyMgDamageLevel :      1,
          enemyMgRofLevel :         3,
          enemyMgHpLevel :          1,
          enemyCannonDamageLevel :  1,
          enemyCannonRofLevel :     3,
          enemyCannonHpLevel :      1,
          enemyRocketDamageLevel :  1,
          enemyRocketRofLevel :     1,
          enemyRocketHpLevel :      1,
        }
      },
      {
        types : [10,10,30],
        spawnCoordinates : [gateRTop,gateR,gateRBottom],
        levels : {
          enemySpeedTractionLevel : 1,
          enemyRangeOfViewLevel :   2,
          enemyMgDamageLevel :      2,
          enemyMgRofLevel :         2,
          enemyMgHpLevel :          2,
          enemyCannonDamageLevel :  2,
          enemyCannonRofLevel :     2,
          enemyCannonHpLevel :      1,
          enemyRocketDamageLevel :  2,
          enemyRocketRofLevel :     2,
          enemyRocketHpLevel :      1,
        }
      },
      {
        types : [10,30,10],
        spawnCoordinates : [gateLTop,gateL,gateLBottom],
        levels : {
          enemySpeedTractionLevel : 1,
          enemyRangeOfViewLevel :   2,
          enemyMgDamageLevel :      2,
          enemyMgRofLevel :         2,
          enemyMgHpLevel :          2,
          enemyCannonDamageLevel :  1,
          enemyCannonRofLevel :     1,
          enemyCannonHpLevel :      1,
          enemyRocketDamageLevel :  2,
          enemyRocketRofLevel :     2,
          enemyRocketHpLevel :      2,
        }
      },
      {
        types : [18,18,18],
        spawnCoordinates : [gateLTop,gateL,gateLBottom,gateRTop,gateR,gateRBottom],
        levels : {
          enemySpeedTractionLevel : 2,
          enemyRangeOfViewLevel :   2,
          enemyMgDamageLevel :      4,
          enemyMgRofLevel :         3,
          enemyMgHpLevel :          4,
          enemyCannonDamageLevel :  4,
          enemyCannonRofLevel :     3,
          enemyCannonHpLevel :      4,
          enemyRocketDamageLevel :  4,
          enemyRocketRofLevel :     3,
          enemyRocketHpLevel :      4,
        }
      },
      {
        types : [18,18,18],
        spawnCoordinates : [gateLTop,gateL,gateLBottom,gateRTop,gateR,gateRBottom],
        levels : {
          enemySpeedTractionLevel : 3,
          enemyRangeOfViewLevel :   3,
          enemyMgDamageLevel :      4,
          enemyMgRofLevel :         4,
          enemyMgHpLevel :          4,
          enemyCannonDamageLevel :  4,
          enemyCannonRofLevel :     4,
          enemyCannonHpLevel :      4,
          enemyRocketDamageLevel :  4,
          enemyRocketRofLevel :     4,
          enemyRocketHpLevel :      4,
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