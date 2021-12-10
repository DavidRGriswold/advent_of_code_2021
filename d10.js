const fs = require('fs');
const { performance } = require('perf_hooks');
const { hasUncaughtExceptionCaptureCallback } = require('process');

fs.readFile('d10input.txt', 'utf-8', (err, data) => {
    if (!err) process(data);
});

/** Process the data
 * @param {string} data 
 */
function process(data) {
    let allchars = [];
    data.split("\n").forEach((line) => {
        allchars.push(line.trim().split(""));
    })
    bothparts(allchars);
    //part2(allchars);
}

/**
 * Part 1
 * @param {string[][]} allchars 
 */
function bothparts(allchars) {
    let total1 = 0;
    let part2scores = [];
    for (let line of allchars) {
        total1 += part1scoreOf(line);
        let p2 = part2scoreOf(line);
        if (p2 > 0) part2scores.push(p2);
    }
    console.log(total1);
    part2scores.sort((a,b)=>a-b);
    console.log(part2scores[(part2scores.length-1)/2]);
}

/**
 * Find the score (for part 1)
 * @param {string[]} line 
 */
function part1scoreOf(line) {
    const opens = ["{", "<", "(", "["];
    const closes = ["}", ">", ")", "]"];
    const scores = [1197, 25137, 3, 57];
    let stack = [];
    for (let c of line) {
        if (opens.indexOf(c) >= 0) {
            stack.push(c);
        } else {
            if (opens.indexOf(stack.pop()) != closes.indexOf(c)) {
                //found a mismatch
                return scores[closes.indexOf(c)];
            }
        }
    }
    //if we make it here, never had a mismatch
    return 0;
}

function part2scoreOf(line) {
    const opens = ["{", "<", "(", "["];
    const closes = ["}", ">", ")", "]"];
    const scores = [3, 4, 1, 2];
    let stack = [];
    for (let c of line) {
        if (opens.indexOf(c) >= 0) {
            stack.push(c);
        } else {
            if (opens.indexOf(stack.pop()) != closes.indexOf(c)) {
                //found a mismatch, corrupted, return 0
                return 0;
            }
        }
    }
    //if we make it here, have incomplete, now complete it
    let score = 0;
    while (stack.length > 0) {
        let c = stack.pop();
        score *= 5;
        score += scores[opens.indexOf(c)];   
    }
    return score;
}
