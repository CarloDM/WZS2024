export default class cannon {
  constructor(scene, tank){
    this.scene = scene;
    this.tank = tank;


    this.cannon = scene.add.sprite(this.tank.x, this.tank.y, 'cannon');

  }

  destroy() {
    // Assicurati che il tank esista prima di tentare la distruzione
    if (this.cannon.body) {
      // Distruggi il corpo fisico
      this.cannon.body.destroy();
    }
    // Distruggi il tank
    this.cannon.destroy();
    console.log('cannon also destroy')
  }

  update(){
    this.cannon.x = this.tank.x;
    this.cannon.y = this.tank.y;
  }
}//class