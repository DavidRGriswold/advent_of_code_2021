const { debug } = require('console');
const fs = require('fs');
const {
  performance
} = require('perf_hooks');

fs.readFile('d7input.txt','utf-8',(err,data) => {
    if (err) {
        console.log(err);
        return;
    }
    let vals = data.split(",").map((v)=>{return Number(v.trim())});
    vals.sort((a,b)=>a-b)
    
    let t0 = performance.now();
    part1(vals);
    let t1 = performance.now();

    part2(vals);
    let t2 = performance.now();
    console.log(`part 1: ${t1-t0} ms`);
    console.log(`part 2: ${t2-t1} ms`);
    
});

/**
 * 
 * @param {number[]} vals
 */
function part1(vals) {
   
    let min = vals[0];
    let max = vals[vals.length-1];

    let found = false;
    let pivot = Math.floor((max+min)/2);
    let center;
    while(!found) {
        // take advantage of the fact that being further from the
        // best point will consistently get larger and larger
        let left = 0, right = 0;
        center = 0;
        for (let i = 0; i< vals.length; i++) {
            left += Math.abs(vals[i] - (pivot-1));
            center += Math.abs(vals[i]-pivot);
            right += Math.abs(vals[i]-(pivot+1));
        }
        if (left > center && right > center) {
            //we have found it! center is min.
            found = true;
        }else if (left < center) {
            //need to move left
            max = pivot-1;
            pivot = Math.floor((max + min)/2);
        }else {
            //need to move right
            min = pivot+1;
            pivot = Math.floor((max+min)/2);
        }
    }
    console.log(center);

    
}
/**
 * 
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
    let found = false;
    let pivot = Math.floor((max+min)/2);
    let center;
    while(min<max && ! found) {
        let left = 0, right = 0;
        center = 0;
        for (let i = 0; i< vals.length; i++) {
            left += triangles[Math.abs(vals[i] - (pivot-1))];
            center += triangles[Math.abs(vals[i]-pivot)];
            right += triangles[Math.abs(vals[i]-(pivot+1))]; 
        }
        if (left >= center && right >= center) {
            //we have found it! center is min.
            found = true;
        }else if (left < center) {
            //need to move left
            max = pivot-1;
            pivot = Math.floor((max + min)/2);
        }else {
            //need to move right
            min = pivot+1;
            pivot = Math.floor((max+min)/2);
        }
    }
    console.log(center);

    
}
