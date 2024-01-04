import Phaser from "phaser";
export {initializeMathFunction, fromPointerToTile, fromTileToWorldPoint, fromPositionToTile, fromTileToTargetObj, calculateDistance, ifTileInsideBound,ifTileIsAllowed, ifTileIsAllowedXY, calculateRotationAngle, calculateProportionalWidth,calculateIncrementBylevel, verifyPresenceOfEnergy,calculateMidPoint };

let grid = false;

function initializeMathFunction(gridIn){

grid = gridIn;
if(grid){
  console.log('mathFunction initialized')
}else{
  console.warn('mathFunction not initialize')
}
}
// from pointer to tile convert
function fromPointerToTile(scene, pointerX, pointerY){

  const tileX =  Math.floor(((scene.cameras.main.getWorldPoint(pointerX, pointerY).x) +2048) /32);
  const tileY =  Math.floor(((scene.cameras.main.getWorldPoint(pointerX, pointerY).y) +2048) /32);

  return [tileX,tileY]
}

// from tile to world point
function fromTileToWorldPoint (tileX, tileY){

  const  wordPX = ((tileX * 32) - 2048 +16);
  const  wordPY = ((tileY * 32) - 2048 +16);

  return [wordPX,wordPY]
}
// from tile to world point obj
function fromTileToTargetObj (tileX, tileY){

  const  wordPX = ((tileX * 32) - 2048 +16);
  const  wordPY = ((tileY * 32) - 2048 +16);

  return { x: wordPX, y: wordPY };
}


function fromPositionToTile(positionX, positionY){

  const tileX =  Math.floor((positionX +2048) /32);
  const tileY =  Math.floor((positionY +2048) /32);

  return [tileX,tileY]
}



//  Euclide disse che : "
//    la distanza tra due punti (x1,y1),(x2,x2) è data dalla:
//    radice quadrata di -> (x2 - x1) alla seconda + (y2 - y1) alla seconda 
//  "
function calculateDistance(positionX, positionY, targetX, targetY ){

  const dx = positionX - targetX;
  const dy = positionY - targetY;
  return Math.sqrt(dx * dx + dy * dy);

}

function ifTileInsideBound(tile){

  if((tile[0] > 2) && (tile[0] < 126) && (tile[1] > 2) && (tile[1] < 126)){

    return true;
  }else{

    return false;
  }
}

// grid array di oogni y contiene array di x 
function ifTileIsAllowed(tile){

  if(grid[tile[1]][tile[0]] !== 4){

    return true;
  }else{

    return false;
  }
}

function ifTileIsAllowedXY(tX,tY){

  if(grid[tY][tX] !== 4){

    return true;
  }else{

    return false;
  }
}

function calculateRotationAngle(originX, originY , targetX, targetY ){
  const angle = Math.atan2(targetY - originY, targetX - originX);
  const angleInDegrees = Phaser.Math.RadToDeg(angle);
  return angleInDegrees;
}

function calculateProportionalWidth(now, max, fixed){
  return (now / max) * fixed;
}

function calculateIncrementBylevel(initial, level, factor){

  let value = initial;

  if(level === 0){
    return initial;
  }else{

    for (let i = 0; i < level; i++) {
      value *= factor;
    }
    return value;

  }
}

function verifyPresenceOfEnergy(cost, energy) {
  if(cost <= energy){
    return true;
  }else{
    return false;
  }
}

function calculateMidPoint(x, y, x2, y2) {
  var puntoMedioX = Math.floor((x + x2) / 2);
  var puntoMedioY = Math.floor((y + y2) / 2);

  return [puntoMedioX, puntoMedioY];
}