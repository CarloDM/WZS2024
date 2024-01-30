// singleTone class

class StatusCounts {
  constructor(){
    this.energy = 1000;

    this.timeProductionTanks ={
      mg : 40, cannon : 40, rocket: 40,
    }

    this.mgCost = 40;
    this.cannonCost = 45;
    this.rocketCost = 50;

    this.button1 = 0;

    this.btnDeck1 = 0;
    this.deck1IsProductive = false;

    this.btnDeck2 = 0;
    this.deck2IsProductive = false;

    this.btnDeck3 = 0;
    this.deck3IsProductive = false;
    
    this.btnDeck4 = 0;
    this.deck4IsProductive = false;
    

    
    this.upgrade1IsProductive = false;

    this.upgrade2IsProductive = false;

    this.upgrade3IsProductive = false;
    
    this.upgrade4IsProductive = false;



    this.StatusCounts = this;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new StatusCounts();
    }
    return this.instance;
  }
}

export default StatusCounts;