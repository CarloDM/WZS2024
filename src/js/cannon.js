import Phaser from "phaser";
export default class cannon {
  constructor(scene, tank){
    this.scene = scene;
    this.tank = tank;

    this.range = 450;

    this.graphics = null;
    this.points = null;

    this.cannon = scene.add.sprite(this.tank.x, this.tank.y, 'cannon');

    // debug range 
        this.graphics = scene.add.graphics({ lineStyle: { width: 1, color: 0xF5FFF7 },    fillStyle: { color: 0xF5FFF7 , alpha:0.2 }});
        this.circle = new Phaser.Geom.Circle(this.tank.x, this.tank.y, this.range );
        
        this.points = this.circle.getPoints(8);
      
        for (let i = 0; i < this.points.length; i++)
        {
            const p = this.points[i];
        
            this.graphics.fillRect(p.x - 4, p.y - 4, 8, 8);
        }

  }



  destroy() {
    // Assicurati che il tank esista prima di tentare la distruzione
    if (this.cannon.body) {
      // Distruggi il corpo fisico
      this.cannon.body.destroy();
    }
    // Distruggi il tank & il suo cannone
    this.cannon.destroy();
    console.log('cannon also destroy')
  }

  update(){
    this.cannon.x = this.tank.x;
    this.cannon.y = this.tank.y;
    this.circle.x = this.tank.x;
    this.circle.y = this.tank.y;


    // debug range 
    this.points = this.circle.getPoints(16);

    // Pulisci i vecchi rettangoli
    this.graphics.clear();

    for (let i = 0; i < this.points.length; i++) {
        const p = this.points[i];
        // Disegna i nuovi rettangoli
        this.graphics.fillRect(p.x - 4, p.y - 4, 8, 8);
    }

  }
}//class