import EasyStar from "easystarjs";

export {setUpFinder,findPath};

const finder = new EasyStar.js();
if(finder){
  console.log('finder build')
}else{
  console.warn('finder error')
}

// let tilesData = []
// const grid = [];


function setUpFinder(grid){

  finder.setGrid(grid);
  
  // finder.enableDiagonals();
  
  finder.setAcceptableTiles([-1, 0, 1, 2, 3]);
  
  finder.setTileCost(3, 10); 
  finder.setTileCost(2, 3);
  
  finder.setIterationsPerCalculation(90000);

  if(grid){
    console.log('finder inizialized');
  }else{
    console.warn('finder not inizialized');
  }

}




function findPath(stpx, stpY, trpX, trpY){

  return new Promise((resolve, reject) =>{

    finder.findPath(stpx, stpY, trpX, trpY, function( path ) {

      if (path === null) {

        // console.error("Path was not found.");
        reject("Path was not found.");

      } else {

        // console.log("Path was found. The first Point is " + path[0].x + " " + path[0].y);
        resolve(path);

      }
    });
  
  finder.calculate();

  });



}