const fs = require('fs');
const { performance } = require('perf_hooks');
const { hasUncaughtExceptionCaptureCallback } = require('process');

fs.readFile('d11input.txt', 'utf-8', (err, data) => {
    if (!err) process(data);
});

/**
 * Data processing
 * @param {string} input 
 */
function process(input) {
    //turn to array of numbers
    let vals = input.split("\n").map(line=>line.split("").map(Number));
    let vals2 = input.split("\n").map(line=>line.split("").map(Number));
    part1(vals);
    part2(vals2);
}

/**
 * Part 1
 * @param {number[][]} vals 
 */
function part1(vals) {
    let total = 0;
    for (let round = 1; round <= 100; round++) {
        total += doOneStep(vals);     
    }
    console.log(total);
    
}


/**
 * Part 2
 * @param {number[][]} vals
 */

 function part2(vals) {
    let found = false;
    let round = 0;
    while (true) {
        round++;
        let totalSize = vals.length * vals[0].length;
        let numFlashed = doOneStep(vals);
        if (numFlashed == totalSize) {
            console.log(round);
            return;
        }
    }
    
}

/**
 * 
 * @param {number[][]} vals 
 * @returns 
 */
function doOneStep(vals) {
    let flashers = []; // list of what to flash
        let flashed = [];
        //increase all vals
        for (let r = 0; r < vals.length; r++) {
            for (let c = 0; c < vals[r].length;c++) {
                vals[r][c]++
                if (vals[r][c]>9) {
                    flashers.push([r,c]);
                }
            }
        }
        // now start the flashing and flash until no more flashes
        while (flashers.length > 0) {
            let f = flashers.pop();
            flashed.push(f);
            let r = f[0];
            let c = f[1];
            vals[r][c]=-1; // will make 0 later
            //now increase all the surrounding ones
            for (let i = r-1; i <= r+1; i++) {
                if (i < 0 || i >= vals.length) continue;
                for (let j = c-1; j <= c+1; j++) {
                    if (j < 0 || j >= vals[0].length) continue;
                    if (i == r && j == c) continue;
                    if (vals[i][j]>=0) vals[i][j]++;
                    if (vals[i][j]==10) flashers.push([i,j]);
                }
            }
        }
        // flashing done! Let's add the total then make them all 0  
        for (f of flashed) {
            vals[f[0]][f[1]] = 0;
        }
        return flashed.length;
}
