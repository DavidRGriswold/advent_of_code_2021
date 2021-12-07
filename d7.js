const { debug } = require('console');
const fs = require('fs');
const {
  performance
} = require('perf_hooks');

fs.readFile('d7input.txt','utf-8',(err,data) => {
    if (err) return;    
    let vals = data.split(",").map(Number).sort((a,b)=>a-b); 

    //Naive implementation, doesn't think about the math
    let t0 = performance.now();
    part1(vals);
    part2(vals);
    let t1 = performance.now();
    console.log("Naive version took " + (t1-t0) + "ms for both.");
    // mathematically smart implementation, 
    // realizes part 1 is based on median and part 2 on mean
    part1v2(vals);
    part2v2(vals);
    console.log("Mathy version took " + (performance.now()-t1) + "ms for both");
    
});

/**
 * Naive implementation of part 1
 * @param {number[]} vals
 */
function part1(vals) {
   
    let min = vals[0];
    let max = vals[vals.length-1];

    let leastSum = undefined;
    for (let pivot = min; pivot <=max; pivot++) {
        let sum = vals.reduce((a,b)=>a+Math.abs(b-pivot));
        if (leastSum == undefined || leastSum > sum) {
            leastSum = sum;
        }else break;
    }
    console.log(leastSum);
    
}
/**
 * Naive implementation of part 2
 * @param {number[]} vals 
 */
function part2(vals) {
    
    let min = vals[0];
    let max = vals[vals.length-1];
   
    // create an array of triangle numbers rather than recalculating each time
    let triangles = [0];
    for (let i = 1; i <=max;i++) {
        triangles[i]=triangles[i-1]+i;
    }
    let leastSum = undefined;
    for (let pivot = min; pivot <=max; pivot++) {
        let sum = vals.reduce((a,b)=>a+triangles[Math.abs(b-pivot)]);
        if (leastSum == undefined || leastSum > sum) {
            leastSum = sum;
        }else break;
    }
    console.log(leastSum);

    
}

/**
 * Smart mathy implementation of part 1
 * @param {number[]} vals 
 */
function part1v2(vals) {
    let median = vals[Math.floor(vals.length/2)];
    console.log(vals.reduce((a,b)=>a+Math.abs(b-median)));
}

/**
 * Smart mathy implementation of part 2
 * @param {number[]} vals 
 */
function part2v2(vals) {
    let sum = vals.reduce((a,b)=>a+b);
    let mean = Math.floor(sum/vals.length);
    console.log(vals.reduce((a,b)=>a+triangle(Math.abs(b-mean))));
}
/**
 * triangle number helper function
 * @param {number} v 
 * @returns 
 */
function triangle(v) {
    return v*(v+1)/2
}
