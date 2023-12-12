import Phaser from "phaser";
import dat from 'dat.gui';
import {findPath} from "./Astar";
import {fromPointerToTile,fromTileToWorldPoint,calculateDistance} from "./mathFunction";

export default class SelectionRect {
  constructor(scene, tanks) {
    this.scene = scene;
    this.tanks = tanks;
    this.tolerance = 12;

      /** @type {Phaser.GameObjects.Rectangle} */
    this.selectionRect = new Phaser.Geom.Rectangle(0, 0, 0, 0);
    this.selection = scene.add.rectangle(0, 0, 0, 0, 0x1d7196, 0.5);
    scene.input.on(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDown, this);
    scene.input.on(Phaser.Input.Events.POINTER_MOVE, this.handlePointerMove, this);
    scene.input.on(Phaser.Input.Events.POINTER_UP, this.handlePointerUp, this);
    //pointer.event.button info clickDown-up sx down event === 0
    //pointer.event.button info clickDown-up wheel down event === 1
    //pointer.event.button info clickDown-up dx down event === 2


  }


  handlePointerDown(pointer, currentlyOver) {

    switch (pointer.event.button) {
      case  (0):
        this.selection.x = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y).x;
        this.selection.y = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y).y;
        break;
      case  (1):
        // console.log('premuta wheel');
        break;
      case  (2):
        // console.log('premuto dx');
        if(this.isAnySelected(this.tanks)){
          // console.log('qualcuno selezionato');
        }else{
          // console.log('nessuno selezionato');
        }
        break;
    }
  }

  handlePointerMove(pointer, currentlyOver) {
    if(pointer.event.button === 0){  

      if (!pointer.isDown) {
        return;
      }else if(pointer.isDown && (pointer.event.buttons === 1)){ //solo se down sx


          const dx= this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y).x -
                    this.scene.cameras.main.getWorldPoint(pointer.prevPosition.x, pointer.prevPosition.y).x;

          const dy= this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y).y -
                    this.scene.cameras.main.getWorldPoint(pointer.prevPosition.x, pointer.prevPosition.y).y;

          this.selection.width += dx;
          this.selection.height += dy;
        
          this.selectionRect.x = this.selection.x;
          this.selectionRect.y = this.selection.y;
          this.selectionRect.width = this.selection.width;
          this.selectionRect.height = this.selection.height;
        
          if (this.selectionRect.width < 0) {
            this.selectionRect.x += this.selectionRect.width;
            this.selectionRect.width *= -1;
          }
          if (this.selectionRect.height < 0) {
            this.selectionRect.y += this.selectionRect.height;
            this.selectionRect.height *= -1;
          }


      }
    } 
  }


  handlePointerUp(pointer, currentlyOver) {

    //verifica se è premuto shif per aggiungere alla selezione senza escludere
    if (pointer.event.shiftKey) {
      this.addActiveOnSelection = true;
    } else {
      this.addActiveOnSelection = false;
    }

    if (pointer.event.ctrlKey) {
      this.addMoreTarget= true;
    } else {
      this.addMoreTarget = false;
    }

    switch (pointer.event.button) {
      case  (0):

        this.selectionRect.x -= this.tolerance;
        this.selectionRect.y -= this.tolerance;
        this.selectionRect.width += 2 * this.tolerance;
        this.selectionRect.height += 2 * this.tolerance;

        if(!this.addActiveOnSelection){

          this.tanks.forEach((tank) => {
            if (
              tank.tank.x > this.selectionRect.x &&
              tank.tank.x + tank.tank.displayWidth < this.selectionRect.x + this.selectionRect.width &&
              tank.tank.y > this.selectionRect.y &&
              tank.tank.y + tank.tank.displayHeight < this.selectionRect.y + this.selectionRect.height
            ) {
              tank.setTankSelected();
            }else{
              tank.setTankUnselected();
            }
          });

        }else{
          
          this.tanks.forEach((tank) => {
            if (
              tank.tank.x > this.selectionRect.x &&
              tank.tank.x + tank.tank.displayWidth < this.selectionRect.x + this.selectionRect.width &&
              tank.tank.y > this.selectionRect.y &&
              tank.tank.y + tank.tank.displayHeight < this.selectionRect.y + this.selectionRect.height
            ) {
              tank.setTankSelected();
            }
          });
        }
  
        this.selection.width = 0;
        this.selection.height = 0;
        this.selectionRect.x = 0;
        this.selectionRect.y = 0;
        this.selectionRect.width = 0;
        this.selectionRect.height = 0;
        break;


      case  (1):
        // console.log('lasciata wheel');
        break;


      case  (2):
        // console.log('lasciato dx', pointer.event.ctrlKey);
        if(!this.addMoreTarget){

          const tileTarget =  fromPointerToTile(this.scene, pointer.x, pointer.y);
          console.log('TILE target xy',tileTarget);

          const centredWorldTarget = fromTileToWorldPoint(tileTarget[0],tileTarget[1]);

            const target = new Phaser.Math.Vector2();
            target.x = centredWorldTarget[0] ;
            target.y = centredWorldTarget[1] ;

            let sheddingX = 1;
            let sheddingY = 1;
            let count = 1;
            let tankSelected = this.tanks.filter((tank) => tank.isTankSelected);
            console.log(tankSelected[0].tank.x,tankSelected[0].tank.y, 'target', centredWorldTarget[0],centredWorldTarget[1] );
            // sort by distance
            tankSelected.sort((a,b) => 
            calculateDistance(a.tank.x, a.tank.y, centredWorldTarget[0],centredWorldTarget[1]) 
            - 
            calculateDistance(b.tank.x, b.tank.y, centredWorldTarget[0],centredWorldTarget[1])
            );

            let tanksCount = tankSelected.length
            console.log(tanksCount)

            const interval = setInterval(() => {
              // console.log('interval on');
                  if(tanksCount !== 0){
                    if(count % 2 === 0){
                      tileTarget[0] += sheddingX;
                      tileTarget[1] -= sheddingY;
                    }else{
                      tileTarget[0] -= sheddingX;
                      tileTarget[1] += sheddingY;
                    }
                  
                    tankSelected[count - 1].moveTankTo(tileTarget );
                    tanksCount --;
                    count ++;
                    sheddingX += 1;
                    sheddingY += 1;
                  }else{
                    clearInterval(interval);
                    // console.log('interval off')
                  }

              }, 450);




        }else {

          const target = new Phaser.Math.Vector2();
          target.x = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y).x;
          target.y = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y).y;

          this.tanks.forEach((tank) => {
            if(tank.isTankSelected){
            
              target.x += Phaser.Math.Between(-32, 32);
              target.y += Phaser.Math.Between(-32, 32);
            
              tank.pushTarget(target);
            }
          });


        }

        break;
    }

  }

  isAnySelected(tanks){
    return tanks.some(tank => tank.isTankSelected === true);
  }


} //export default