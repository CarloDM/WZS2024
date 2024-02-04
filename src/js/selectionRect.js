import Phaser from "phaser";

import {
  fromPointerToTile,fromTileToWorldPoint,calculateDistance,
  ifTileInsideBound,ifTileIsAllowed,ifTileIsAllowedXY} 
from "./mathFunction";

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
        
          if (this.selectionRect.width < 25) {
            this.selectionRect.x += this.selectionRect.width;
            // this.selectionRect.width *= -1;
        }
        
        if (this.selectionRect.height < 25) {
            this.selectionRect.y += this.selectionRect.height;
            // this.selectionRect.height *= -1;
        }
        this.selectionRect.width = Math.abs(this.selection.width);
        this.selectionRect.height = Math.abs(this.selection.height);

        // Aggiorna la posizione del rettangolo in base alla direzione del movimento
        this.selectionRect.x = this.selection.width >= 25 ? this.selection.x : this.selection.x + this.selection.width;
        this.selectionRect.y = this.selection.height >= 25 ? this.selection.y : this.selection.y + this.selection.height;


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
    //verifica se è premuto ctrl per aggiungere after target 
    if (pointer.event.ctrlKey) {
      this.addMoreTarget= true;
    } else {
      this.addMoreTarget = false;
    }

    switch (pointer.event.button) {

      case  (0): // click sx selezione tank

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
          
      case  (2): //click dx move to
          
        if(!this.addMoreTarget){
            
          this.sendTargetToTanks(50, pointer, true);
            
        }else{ //click + ctrl dx move to after
          
          this.sendTargetToTanks(50, pointer, false);
            
        }
        
    }
}

  isAnySelected(tanks){
    return tanks.some(tank => tank.isTankSelected === true);
  }


  sendTargetToTanks(intervall, pointer, moveOrPush){
    
    const tileTargetInit =  fromPointerToTile(this.scene, pointer.x, pointer.y);
    let tileTarget =  fromPointerToTile(this.scene, pointer.x, pointer.y,);
    // console.log(fromTileToWorldPoint(tileTarget[0],tileTarget[1]));
    // console.log('TILE target xy',tileTarget, 'tile index', this.scene.grid[tileTarget[1]][tileTarget[0]] );

          if( ifTileInsideBound(tileTarget) && ifTileIsAllowed(tileTarget) ){
            
            let tankSelected = this.tanks.filter((tank) => tank.isTankSelected);
            let tanksCount = tankSelected.length

            // distribuire i selezionati per distanza in linea d aria
            if(tanksCount > 1){

              const centredWorldTarget = fromTileToWorldPoint(tileTarget[0],tileTarget[1]);

              tankSelected.sort((a,b) => 
              calculateDistance(a.tank.x, a.tank.y, centredWorldTarget[0],centredWorldTarget[1]) -
              calculateDistance(b.tank.x, b.tank.y, centredWorldTarget[0],centredWorldTarget[1])
              );

            }

            // spargere un pochino i target e inviare i tank ad intervalli per scremare
            let sheddingX = 0;
            let sheddingY = 0;
            let count = 1;
            let intervallCount = 0;

            const interval = setInterval(() => {
    
              intervallCount++;

                  if(tanksCount !== 0){
                      
                      if(count % 8 === 0 && ifTileIsAllowedXY(tileTarget[0] , tileTarget[1] + sheddingY)){

                        tileTarget = tileTargetInit;
                        sheddingX = 0;
                        sheddingY = 0;

                          if(tankSelected[count - 1].tank.body){

                            if(moveOrPush){
                              tankSelected[count - 1].moveTankTo(tileTarget,true);
                            }else{
                              tankSelected[count - 1].pushTarget(tileTarget);
                            }
                          }

                        tanksCount --;
                        count ++;
                          
                      }else if( count % 2 === 0 && ifTileIsAllowedXY(tileTarget[0] + sheddingX , tileTarget[1] + sheddingY) ){
                        tileTarget[0] += sheddingX;
                        tileTarget[1] += sheddingY;
                        sheddingX ++;
                        // sheddingY ++;

                        if(tankSelected[count - 1].tank.body){

                          if(moveOrPush){
                            tankSelected[count - 1].moveTankTo(tileTarget,true);
                          }else{
                            tankSelected[count - 1].pushTarget(tileTarget );
                          }
                        }

                        tanksCount --;
                        count ++;
                          
                      }else if( ifTileIsAllowedXY(tileTarget[0] - sheddingX , tileTarget[1] - sheddingY) ){
                        tileTarget[0] -= sheddingX;
                        tileTarget[1] -= sheddingY;
                        // sheddingX ++;
                        sheddingY ++;

                          if(tankSelected[count - 1].tank.body){

                            if(moveOrPush){
                              tankSelected[count - 1].moveTankTo(tileTarget,true);
                            }else{
                              tankSelected[count - 1].pushTarget(tileTarget );
                            }
                          }

                        tanksCount --;
                        count ++;
                          
                      }else{
                        sheddingX = 0;
                        sheddingY = 0;
                      }
                        
                  }else{
                    clearInterval(interval);
                  }
                    
              }, intervall);

          }else{console.error('invalid target')}
  }


} //export default