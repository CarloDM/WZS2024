import EasyStar from "easystarjs";

export {setUpFinder,findPath};

const finder = new EasyStar.js();
if(finder){
  console.log('finder build')
}else{
  console.warn('finder error')
}

let tilesData = []
const grid = [];


function setUpFinder(map){

  tilesData = map.layer.data;


  for (let y = 0; y < map.height; y++) {

    let col = [];

      for (let x = 0; x < map.width; x++) {

        let tileID = tilesData[y][x].index

        col.push(tileID);
      }

    grid.push(col);

  }


  // console.log('Astar grid',grid);

  finder.setGrid(grid);

  finder.enableDiagonals();

  finder.setAcceptableTiles([-1, 0, 1, 2, 3]);

  finder.setTileCost(3, 4); 
  finder.setTileCost(2, 3);

  finder.setIterationsPerCalculation(10000);

}




function findPath(stpx, stpY, trpX, trpY){

  return new Promise((resolve, reject) =>{

    finder.findPath(stpx, stpY, trpX, trpY, function( path ) {

      if (path === null) {

        // console.log("Path was not found.");
        reject("Path was not found.");

      } else {

        // console.log("Path was found. The first Point is " + path[0].x + " " + path[0].y);
        resolve(path);

      }
    });
  
  finder.calculate();

  });



}