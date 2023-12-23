
// singleTone class


class StatusCounts {
  constructor(){
    this.energy = 1000;


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