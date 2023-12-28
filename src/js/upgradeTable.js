
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
    ]


    // upgrade generali
    this.researchSpeedLevel = 0;
    this.researchSpeed = [
      {reductionFactor : 1,                         
        cost:100, time:20},
    ]
    
    this.energyEfficiencyLevel = 0;
    this.energyEfficiency = [
      {extractionRate : 1,                         
        cost:100, time:60},
    ]
    
    this.engineerEfficiencyLevel = 0;
    this.engineerEfficiency = [
      {mooveFactor : 60,  constructionTimeFactor: 2, 
        cost:100, time:60 },
    ]
    
    this.boostSpeedLevel = 0;
    this.boostSpeed = [
      {reductionFactor : 1, numbOftank: 6,          
        cost:100, time:60 },
    ]
    
    this.tanksProductionSpeedLevel = 0;
    this.tanksProductionSpeed = [ 
      {reductionFactor : 1,                         
        cost:0, time:0},
    ]

    this.tanksSpeedTractionLevel = 0;
        // incremento del costo 20% incremento del tempo 20%
    this.tanksSpeedTraction = [ 
      {incrementFactor : 1,                         
        cost:0, time:0},
        
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
    ]
    
    this.tanksRangeOfViewLevel = 0;
    this.tanksRangeOfView = [
      {incrementFactor : 1,                         
        cost:0, time:0},

      {incrementFactor : 1.055,                         
        cost:120, time:72},
      {incrementFactor : 1.055,                         
        cost:144, time:86},
      {incrementFactor : 1.055,                         
        cost:172, time:103},
      {incrementFactor : 1.055,                         
        cost:207, time:124},
      {incrementFactor : 1.055,                         
        cost:248, time:149},
      {incrementFactor : 1.055,                         
        cost:298, time:179},
      {incrementFactor : 1.055,                         
        cost:358, time:214},
      {incrementFactor : 1.055,                         
        cost:429, time:257},
      {incrementFactor : 1.055,                         
        cost:515, time:309},
      {incrementFactor : 1.055,                         
        cost:619, time:371},
    ]

    // upgrade specifici----

    // MachineGun 
    this.mgDamageLevel = 0;
    this.mgDamage = [
      {dmg : 2, 
      cost:100, time:60},

      {dmg : 2.8, 
      cost:100, time:60},
      {dmg : 3.6, 
      cost:100, time:60},
      {dmg : 4.4, 
      cost:100, time:60},
      {dmg : 5.1, 
      cost:100, time:60},
      {dmg : 6, 
      cost:100, time:60},
      {dmg : 6.8, 
      cost:100, time:60},
      {dmg : 7.6, 
      cost:100, time:60},
      {dmg : 8.4, 
      cost:100, time:60},
      {dmg : 9.2, 
      cost:100, time:60},

      {dmg : 10, 
      cost:100, time:60},
    ]

    this.mgRofLevel = 0;
    this.mgRof=[
      {rof : 20, rot: 0.7,
      cost:0, time:0},

      {rof : 18.5, rot: 0.95,
      cost:150, time:60},
      {rof : 17, rot: 1.2,
      cost:200, time:60},
      {rof : 15.5, rot: 1.45,
      cost:250, time:60},
      {rof : 14, rot: 1.7,
      cost:300, time:60},
      {rof : 12.5, rot: 1.95,
      cost:350, time:60},
      {rof : 11, rot: 2.2,
      cost:400, time:60},
      {rof : 9.5, rot: 2.45,
      cost:450, time:60},
      {rof : 8, rot: 2.7,
      cost:500, time:60},
      {rof : 6.5, rot: 2.95,
      cost:550, time:60},

      {rof : 5, rot: 3.2,
      cost:600, time:60},

    ]

    this.mgHpLevel = 0;
    this.mgHp = [
      {hp: 250,
      cost:100, time:60}
    ]

    
    // Cannon --------------
    this.cannonDamageLevel = 0;
    this.cannonDamage =[
      {dmg : 15,
      cost:0, time:0},

      {dmg : 38,
      cost:100, time:60},
      {dmg : 62,
      cost:100, time:60},
      {dmg : 85,
      cost:100, time:60},
      {dmg : 109,
      cost:100, time:60},
      {dmg : 132,
      cost:100, time:60},
      {dmg : 156,
      cost:100, time:60},
      {dmg : 179,
      cost:100, time:60},
      {dmg : 203,
      cost:100, time:60},
      {dmg : 226,
      cost:100, time:60},

      {dmg : 250,
      cost:100, time:60},
    ]

    this.cannonRofLevel = 0;
    this.cannonRof=[
      {rof : 120, rot: 0.35,
        cost:0, time:0},

      {rof : 114, rot: 0.45,
        cost:150, time:60},
      {rof : 108, rot: 0.55,
        cost:200, time:60},
      {rof : 102, rot: 0.66,
        cost:250, time:60},
      {rof : 96, rot: 0.76,
        cost:300, time:60},
      {rof : 90, rot: 0.87,
        cost:350, time:60},
      {rof : 84, rot: 0.97,
        cost:400, time:60},
      {rof : 78, rot: 1.1,
        cost:450, time:60},
      {rof : 72, rot: 1.2,
        cost:500, time:60},
      {rof : 66, rot: 1.3,
        cost:500, time:60},

      {rof : 60, rot: 1.5,
        cost:600, time:60},
    ]

    this.cannonHpLevel = 0;
    this.cannonHp=[
      {hp: 350,
      cost:100, time:60}
    ]
    
    // Rocket ---------------
    this.RocketDamageLevel = 0;
    this.RocketDamage =[
      {dmg : 25,
      cost:0, time:0},

      {dmg : 42.5,
      cost:100, time:60},
      {dmg : 60,
      cost:100, time:60},
      {dmg : 77.5,
      cost:100, time:60},
      {dmg : 95,
      cost:100, time:60},
      {dmg : 112,
      cost:100, time:60},
      {dmg : 130,
      cost:100, time:60},
      {dmg : 147,
      cost:100, time:60},
      {dmg : 165,
      cost:100, time:60},
      {dmg : 182,
      cost:100, time:60},

      {dmg : 200,
      cost:100, time:60},
    ]

    this.RocketRofLevel = 0;
    this.RocketRof=[
      {rof : 160, rot: 0.25,
        cost:100, time:60},

      {rof : 152, rot: 0.32,
        cost:100, time:60},
      {rof : 144, rot: 0.4,
        cost:100, time:60},
      {rof : 136, rot: 0.47,
        cost:100, time:60},
      {rof : 128, rot: 0.55,
        cost:100, time:60},
      {rof : 120, rot: 0.62,
        cost:100, time:60},
      {rof : 112, rot: 0.7,
        cost:100, time:60},
      {rof : 104, rot: 0.77,
        cost:100, time:60},
      {rof : 96, rot: 0.84,
        cost:100, time:60},
      {rof : 88, rot: 0.92,
        cost:100, time:60},

      {rof : 80, rot: 1,
        cost:100, time:60},
    ]

    this.RocketHpLevel = 0;
    this.RocketHp=[
      {hp: 300,
      cost:100, time:60}
    ]

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