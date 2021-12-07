const { debug } = require('console');
const fs = require('fs');

fs.readFile('d7input.txt','utf-8',(err,data) => {
    if (err) {
        console.log(err);
        return;
    }
    part1(data);
    part2(data);
    
});

/**
 * 
 * @param {string} input 
 */
function part1(input) {
    let vals = input.split(",").map((v)=>{return Number(v.trim())});

    let min = vals.reduce((a,b)=>{return(Math.min(a,b))});
    let max = vals.reduce((a,b)=>{return(Math.max(a,b))});
   
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

function part2(input) {
    let vals = input.split(",").map((v)=>{return Number(v.trim())});

    let min = vals.reduce((a,b)=>{return(Math.min(a,b))});
    let max = vals.reduce((a,b)=>{return(Math.max(a,b))});
   
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
