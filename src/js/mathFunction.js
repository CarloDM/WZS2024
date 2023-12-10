export {fromPointerToTile, fromTileToWorldPoint, fromPositionToTile, fromTileToTargetObj };


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