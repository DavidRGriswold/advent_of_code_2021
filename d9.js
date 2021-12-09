const fs = require('fs');
const { performance } = require('perf_hooks');
const { hasUncaughtExceptionCaptureCallback } = require('process');

fs.readFile('d9input.txt', 'utf-8', (err, data) => {
  if (!err) process(data);
});

/** Process the data
 * @param {string} data 
 */
function process(data) {
  let allchars = [];
  data.split("\n").forEach((line) => {
    allchars.push(line.split("").map(Number));
  })
  part1(allchars);
  part2(allchars);
}

/**
 * 
 * @param {number[][]} allchars 
 */
function part1(allchars) {
  let total = 0;
  let nrows = allchars.length;
  let ncols = allchars[0].length;
  for (let row = 0; row < nrows; row++) {
    for (let col = 0; col < ncols; col++) {
      let val = allchars[row][col];
      if ((row == 0 || allchars[row-1][col] > val) &&
          (row == nrows-1 || allchars[row+1][col] > val) &&
          (col == 0 || allchars[row][col-1] > val) &&
          (col == ncols -1 || allchars[row][col+1] > val)) {
            total += val + 1;
      }
    }
  }
  console.log(total)
}

/**
 * 
 * @param {number[][]} allchars 
 */
function part2(allchars) {
  let basinsizes = [];
  let basins = [];
  nrows = allchars.length;
  ncols = allchars[0].length;
  for (let row = 0; row < nrows; row++) {
    for (let col = 0; col < ncols; col++) {
      let val = allchars[row][col];
      if ((row == 0 || allchars[row-1][col] > val) &&
          (row == nrows-1 || allchars[row+1][col] > val) &&
          (col == 0 || allchars[row][col-1] > val) &&
          (col == ncols -1 || allchars[row][col+1] > val)) {
            basins.push([row,col]);
      }
    }
  }

  for (basin of basins) {
    basinsizes.push(getBasinSize(allchars,basin[0],basin[1]));
  } 
  //find three largest basins
  console.log(basinsizes);
  basinsizes.sort((a,b)=>b-a);
  console.log(basinsizes[0]*basinsizes[1]*basinsizes[2]);

  
}

/**
 * Returns the sum of this value plus all values
 * surrounding it greater than it, recursively.
 * Once a square has been counted, make it 9 so it doesn't get double counted.
 * @param {*} allchars 
 * @param {*} row 
 * @param {*} col 
 */
function getBasinSize(allchars,row,col) {
  let val = allchars[row][col]
  if (val ==9) return 0;
  let surroundings = 0;
  if (row > 0 && allchars[row-1][col]>val&& allchars[row-1][col]<9) {
    surroundings += getBasinSize(allchars,row-1,col);
  }
  if (row < allchars.length-1 && allchars[row+1][col]>val && allchars[row+1][col]<9) {
    surroundings += getBasinSize(allchars,row+1,col);
  }
  if (col > 0 && allchars[row][col-1]>val&& allchars[row][col-1]<9) {
    surroundings += getBasinSize(allchars,row,col-1);
  }
  if (col < allchars[0].length-1 && allchars[row][col+1]>val && allchars[row][col+1]<9) {
    surroundings += getBasinSize(allchars,row,col+1);
  }
  allchars[row][col]=9;
  return 1 + surroundings;
}
