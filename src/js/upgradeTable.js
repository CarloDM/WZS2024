
// singleTone class
// il concetto di singleton è utile quando desideri assicurarti che ci sia una sola istanza di una classe in un'applicazione. 
// Questo può essere particolarmente utile per situazioni in cui vuoi condividere dati o funzionalità globali in tutto il tuo programma.

class UpgradeTable {
  constructor(){

    this.upgradeIdIsSearching = [
      false,false,false,false,
      false,false,false,false,
      false,false,false,false,
      false,false,false,false,
      false
    ]

    // upgrade generali
    this.researchSpeedLevel = 0;
    this.researchSpeed = [
      {reductionFactor : 1,                         
        cost:0, time:10},

      {reductionFactor : 0.95,                         
        cost:30, time:90},
      {reductionFactor : 0.90,                         
        cost:60, time:120},
      {reductionFactor : 0.85,                         
        cost:90, time:140},
      {reductionFactor : 0.80,                         
        cost:120, time:150},
      {reductionFactor : 0.75,                         
        cost:170, time:150},
      {reductionFactor : 0.70,                         
        cost:200, time:180},
      {reductionFactor : 0.65,                         
        cost:260, time:210},
      {reductionFactor : 0.55,                         
        cost:340, time:240},
      {reductionFactor : 0.45,                         
        cost:420, time:270},
      {reductionFactor : 0.30,                         
        cost:600, time:300},
        
      {reductionFactor : ' ',                         
        cost:' ', time: ' '},
    ]
    
    this.energyEfficiencyLevel = 0;
    this.energyEfficiency = [
      {extractionRate : 1,                         
        cost:0, time:0},

      {extractionRate : 1.1,                         
        cost:40, time:30},
      {extractionRate : 1.2,                         
        cost:120, time:60},
      {extractionRate : 1.3,                         
        cost:180, time:120},
      {extractionRate : 1.4,                         
        cost:250, time:150},
      {extractionRate : 1.5,                         
        cost:380, time:180},
      {extractionRate : 1.6,                         
        cost:460, time:210},
      {extractionRate : 1.7,                         
        cost:600, time:240},
      {extractionRate : 1.8,                         
        cost:720, time:270},
      {extractionRate : 1.9,                         
        cost:840, time:300},
      {extractionRate : 2,                         
        cost:1000, time:330},

      {cost:' '},
    ]
    
    this.engineerEfficiencyLevel  = 0;
    this.engineerEfficiency = [
      {moveSpeed : 25,  constructionTimeFactor: 1, 
        cost:0, time:60 },

      {moveSpeed : 34,  constructionTimeFactor: 0.95, 
        cost:30, time: 60 },
      {moveSpeed : 44,  constructionTimeFactor: 0.90, 
        cost:60, time: 90 },
      {moveSpeed : 53,  constructionTimeFactor: 0.85, 
        cost:120, time: 120 },
      {moveSpeed : 63,  constructionTimeFactor: 0.80, 
        cost:200, time: 150 },
      {moveSpeed : 72,  constructionTimeFactor: 0.75, 
        cost:250, time: 180 },
      {moveSpeed : 82,  constructionTimeFactor: 0.70, 
        cost:300, time: 210 },
      {moveSpeed : 91,  constructionTimeFactor: 0.65, 
        cost:400, time: 240 },
      {moveSpeed : 101,  constructionTimeFactor: 0.5, 
        cost:600, time: 300 },
      {moveSpeed : 110,  constructionTimeFactor: 0.35, 
        cost:750, time: 360 },
      {moveSpeed : 120,  constructionTimeFactor: 0.25, 
        cost:1000, time: 420 },

      {cost:' '},
      ]

    this.buildingsArmorLevel  = 0;
    this.buildingsArmor = [
      {armorFactor : 1, 
        cost:100, time:60 },

      {armorFactor : 1, 
        cost:'ComingSoon', time:1 },
      {armorFactor : 1, 
        cost:1, time:1 },
      {armorFactor : 1, 
        cost:1, time:1 },
      {armorFactor : 1, 
        cost:1, time:1 },
      {armorFactor : 1, 
        cost:1, time:1 },
      {armorFactor : 1, 
        cost:1, time:1 },
      {armorFactor : 1, 
        cost:1, time:1 },
      {armorFactor : 1, 
        cost:1, time:1 },
      {armorFactor : 1, 
        cost:1, time:1 },
      {armorFactor : 1, 
        cost:1, time:1 },

      {cost:''},
    ]
    
    this.boostSpeedLevel = 0;
    this.boostSpeed = [
      {reductionFactor : 1, numbOftank: 6,          
        cost:0, time:0 },

      {reductionFactor : 0.95, numbOftank: 9,          
        cost:'ComingSoon', time:1 },
      {reductionFactor : 0.90, numbOftank: 12,          
        cost:1, time:1 },
      {reductionFactor : 0.85, numbOftank: 15,          
        cost:1, time:1 },
      {reductionFactor : 0.80, numbOftank: 18,          
        cost:1, time:1 },
      {reductionFactor : 0.75, numbOftank: 21,          
        cost:1, time:1 },
      {reductionFactor : 0.70, numbOftank: 24,          
        cost:1, time:1 },
      {reductionFactor : 0.65, numbOftank: 27,          
        cost:1, time:1 },
      {reductionFactor : 0.60, numbOftank: 30,          
        cost:1, time:1 },
      {reductionFactor : 0.55, numbOftank: 33,          
        cost:1, time:1 },
      {reductionFactor : 0.5, numbOftank: 36,          
        cost:1, time:1 },

      {cost:''},
    ]
    
    this.tanksProductionSpeedLevel = 0;
    this.tanksProductionSpeed = [ 
      {reductionFactor : 1,                         
        cost:0, time:0},

      {reductionFactor : 1,                         
        cost:50, time:60},
      {reductionFactor : 0.9,                         
        cost:100, time:90},
      {reductionFactor : 0.8,                         
        cost:150, time:120},
      {reductionFactor : 0.7,                         
        cost:250, time:150},
      {reductionFactor : 0.6,                         
        cost:400, time:180},
      {reductionFactor : 0.5,                         
        cost:500, time:210},
      {reductionFactor : 0.4,                         
        cost:600, time:240},
      {reductionFactor : 0.3,                         
        cost:700, time:270},
      {reductionFactor : 0.2,                         
        cost:800, time:300},
      {reductionFactor : 0.1,                         
        cost:900, time:330},

      {cost:''},
    ]

    this.tanksSpeedTractionLevel = 0;
    // incremento del costo 20% incremento del tempo 20%
    this.tanksSpeedTraction = [ 
      {incrementFactor : 1,                         
        cost:100, time:60},
        
      {incrementFactor : 1.11,                         
        cost:120, time:72},
      {incrementFactor : 1.11,                         
        cost:144, time:86},
      {incrementFactor : 1.11,                         
        cost:172, time:103},
      {incrementFactor : 1.11,                         
        cost:207, time:124},
      {incrementFactor : 1.11,                         
        cost:248, time:149},
      {incrementFactor : 1.11,                         
        cost:298, time:179},
      {incrementFactor : 1.11,                         
        cost:358, time:214},
      {incrementFactor : 1.11,                         
        cost:429, time:257},
      {incrementFactor : 1.11,                         
        cost:515, time:309},
      {incrementFactor : 1.11,                         
        cost:619, time:371},

      {cost:''},
    ]
    
    this.tanksRangeOfViewLevel = 0;
    this.tanksRangeOfView = [
      {incrementFactor : 1,                         
        cost:0, time:60},

      {incrementFactor : 1.055,                         
        cost:120, time:72},
      {incrementFactor : 1.055,                         
        cost:144, time:86},
      {incrementFactor : 1.055,                         
        cost:200, time:103},
      {incrementFactor : 1.055,                         
        cost:250, time:124},
      {incrementFactor : 1.055,                         
        cost:300, time:149},
      {incrementFactor : 1.055,                         
        cost:400, time:179},
      {incrementFactor : 1.055,                         
        cost:500, time:214},
      {incrementFactor : 1.055,                         
        cost:600, time:257},
      {incrementFactor : 1.055,                         
        cost:700, time:309},
      {incrementFactor : 1.055,                         
        cost:800, time:371},

      {cost:''},
    ]

    // upgrade specifici----

    // MachineGun 
    this.mgDamageLevel = 0;
    this.mgDamage = [
      {dmg : 2, 
      cost:100, time:60},

      {dmg : 2.8, 
      cost:200, time:90},
      {dmg : 3.6, 
      cost:300, time:120},
      {dmg : 4.4, 
      cost:400, time:150},
      {dmg : 5.1, 
      cost:500, time:180},
      {dmg : 6, 
      cost:600, time:210},
      {dmg : 6.8, 
      cost:700, time:240},
      {dmg : 7.6, 
      cost:800, time:270},
      {dmg : 8.4, 
      cost:900, time:300},
      {dmg : 9.2, 
      cost:1000, time:330},
      {dmg : 10, 
      cost:1100, time:360},

      {cost:''},
    ]

    this.mgRofLevel = 0;
    this.mgRof=[
      {rof : 20, rot: 0.7,
      cost:100, time:60},

      {rof : 18.5, rot: 0.95,
      cost:150, time:90},
      {rof : 17, rot: 1.2,
      cost:200, time:120},
      {rof : 15.5, rot: 1.45,
      cost:250, time:150},
      {rof : 14, rot: 1.7,
      cost:300, time:180},
      {rof : 12.5, rot: 1.95,
      cost:350, time:210},
      {rof : 11, rot: 2.2,
      cost:400, time:240},
      {rof : 9.5, rot: 2.45,
      cost:450, time:270},
      {rof : 8, rot: 2.7,
      cost:500, time:300},
      {rof : 6.5, rot: 2.95,
      cost:550, time:330},
      {rof : 5, rot: 3.2,
      cost:600, time:360},

      {cost:''},
    ]

    this.mgHpLevel = 0;
    this.mgHp = [
      {hp: 220,
      cost:100, time:60},
      
      {hp: 270,
      cost:100, time:90},
      {hp: 295,
      cost:150, time:120},
      {hp: 295,
      cost:200, time:150},
      {hp: 345,
      cost:250, time:180},
      {hp: 370,
      cost:300, time:210},
      {hp: 395,
      cost:350, time:240},
      {hp: 420,
      cost:400, time:270},
      {hp: 450,
      cost:450, time:300},
      {hp: 470,
      cost:500, time:330},
      {hp: 500,
      cost:550, time:360},

      {cost:''},
    ]
    
    // Cannon --------------
    this.cannonDamageLevel = 0;
    this.cannonDamage =[
      {dmg : 15,
      cost:100, time:60},

      {dmg : 38,
      cost:100, time:90},
      {dmg : 62,
      cost:200, time:120},
      {dmg : 85,
      cost:300, time:150},
      {dmg : 109,
      cost:400, time:180},
      {dmg : 132,
      cost:500, time:210},
      {dmg : 156,
      cost:600, time:240},
      {dmg : 179,
      cost:700, time:270},
      {dmg : 203,
      cost:800, time:300},
      {dmg : 226,
      cost:900, time:330},
      {dmg : 250,
      cost:1000, time:360},

      {cost:''},
    ]

    this.cannonRofLevel = 0;
    this.cannonRof=[
      {rof : 120, rot: 0.35,
        cost:100, time:60},

      {rof : 114, rot: 0.45,
        cost:150, time:90},
      {rof : 108, rot: 0.55,
        cost:200, time:120},
      {rof : 102, rot: 0.66,
        cost:250, time:150},
      {rof : 96, rot: 0.76,
        cost:300, time:180},
      {rof : 90, rot: 0.87,
        cost:350, time:210},
      {rof : 84, rot: 0.97,
        cost:400, time:240},
      {rof : 78, rot: 1.1,
        cost:450, time:270},
      {rof : 72, rot: 1.2,
        cost:500, time:300},
      {rof : 66, rot: 1.3,
        cost:500, time:330},
      {rof : 60, rot: 1.5,
        cost:600, time:350},

      {cost:''},
    ]

    this.cannonHpLevel = 0;
    this.cannonHp=[
      {hp: 370,
      cost:0, time:0},

      {hp: 407,
      cost:100, time:90},
      {hp: 444,
      cost:200, time:120},
      {hp: 481,
      cost:300, time:150},
      {hp: 518,
      cost:400, time:180},
      {hp: 555,
      cost:500, time:210},
      {hp: 592,
      cost:600, time:240},
      {hp: 629,
      cost:700, time:270},
      {hp: 666,
      cost:800, time:300},
      {hp: 703,
      cost:900, time:330},
      {hp: 740,
      cost:1000, time:350},

      {cost:''},

    ]
    
    // Rocket ---------------
    this.RocketDamageLevel = 0;
    this.RocketDamage =[
      {dmg : 25,
      cost:0, time:0},

      {dmg : 42.5,
      cost:100, time:60},
      {dmg : 60,
      cost:200, time:90},
      {dmg : 77.5,
      cost:300, time:120},
      {dmg : 95,
      cost:400, time:150},
      {dmg : 112,
      cost:450, time:180},
      {dmg : 130,
      cost:550, time:210},
      {dmg : 147,
      cost:650, time:240},
      {dmg : 165,
      cost:700, time:270},
      {dmg : 182,
      cost:800, time:300},
      {dmg : 200,
      cost:900, time:330},

      {cost:''},
    ]

    this.RocketRofLevel = 0;
    this.RocketRof=[
      {rof : 160, rot: 0.25,
        cost:0, time:0},

      {rof : 152, rot: 0.32,
        cost:60, time:60},
      {rof : 144, rot: 0.4,
        cost:120, time:90},
      {rof : 136, rot: 0.47,
        cost:180, time:120},
      {rof : 128, rot: 0.55,
        cost:240, time:150},
      {rof : 120, rot: 0.62,
        cost:300, time:180},
      {rof : 112, rot: 0.7,
        cost:360, time:210},
      {rof : 104, rot: 0.77,
        cost:420, time:240},
      {rof : 96, rot: 0.84,
        cost:480, time:270},
      {rof : 88, rot: 0.92,
        cost:540, time:300},
      {rof : 80, rot: 1,
        cost:600, time:330},
      
      {cost:''},
    ]

    this.RocketHpLevel = 0;
    this.RocketHp=[
      {hp: 300,
      cost:100, time:60},

      {hp: 330,
      cost:100, time:90},
      {hp: 360,
      cost:200, time:120},
      {hp: 390,
      cost:300, time:150},
      {hp: 420,
      cost:400, time:180},
      {hp: 450,
      cost:500, time:210},
      {hp: 480,
      cost:600, time:240},
      {hp: 510,
      cost:700, time:270},
      {hp: 540,
      cost:800, time:300},
      {hp: 570,
      cost:900, time:330},
      {hp: 600,
      cost:1000, time:360},

      {cost:''},
    ]

    
    // enemies upgrade level
    this.enemySpeedTractionLevel = 0;
    this.enemyRangeOfViewLevel =  0;
    this.enemyMgDamageLevel = 0;
    this.enemyMgRofLevel = 0;
    this.enemyMgHpLevel = 0;
    this.enemyCannonDamageLevel = 0;
    this.enemyCannonRofLevel = 0;
    this.enemyCannonHpLevel = 0;
    this.enemyRocketDamageLevel = 0;
    this.enemyRocketRofLevel = 0;
    this.enemyRocketHpLevel = 0;
    

    this.UpgradeTable = this;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UpgradeTable();
    }
    return this.instance;
  }
}

export default UpgradeTable;