export {fromPointerToTile, fromTileToWorldPoint, fromPositionToTile, fromTileToTargetObj, calculateDistance };


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