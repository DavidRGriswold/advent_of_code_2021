const fs = require('fs');
const { performance } = require('perf_hooks');
const { hasUncaughtExceptionCaptureCallback } = require('process');

fs.readFile('d8input.txt','utf-8',(err,data) => {
    if (!err) process(data);   
});

/** Process the data
 * @param {string} data 
 */
function process(data) {
    let inputs=[];
    let outputs=[];
    data.split("\n").forEach((line) => {
        inputs.push(line.split("|")[0].trim().split(" "));
        outputs.push(line.split("|")[1].trim().split(" "));
    });

    part1(outputs);
    part2(inputs,outputs);
}
/**
 * @param {string[]} outputs 
 */
function part1(outputs) {
    let total = 0; 
    for (line of outputs) {
        for (output of line) {
            if (output.length <= 4 || output.length == 7) {
                total++;
            }
        }
    }
    console.log(total);
}

/**
 * Part 2 god this is ugly as SHIT
 * @param {string[][]} allInputs 
 * @param {string[][]} allOutputs 
 */
function part2(allInputs,allOutputs) {
    let finalSum = 0;
    for (let i = 0; i < allInputs.length; i++) {
        let inputs = allInputs[i];
        let outputs = allOutputs[i];

        //what do we need to keep track of? positions for each char.
        let charPos = {};
        let charsToPositions={};

        let stringToNumber = {};
        //first sort the inputs by length
        inputs.sort((a,b)=>a.length-b.length);
        //then alphabatize each element
        inputs = inputs.map((v) => v.split("").sort().join(""));
        //save the four short ones
        stringToNumber[inputs[0]] = 1;
        stringToNumber[inputs[1]] = 7;
        stringToNumber[inputs[2]] = 4;
        stringToNumber[inputs[9]] = 8;
        
    
        // let's start by counting the occurences of each character
        let counts = {"a":0,"b":0,"c":0,"d":0,"e":0,"f":0,"g":0};
        for (let input of inputs) {
            for (let char of Object.keys(counts)) {
                if (input.indexOf(char) != -1) counts[char]++;
            }
        }
     
        //okay, now we have our counts. this lets us identify the bottom left (4)
        // the top left (6), and the bottom right (9)
        for (let char of Object.keys(counts)) {
            if (counts[char] == 4) {
                //this is the bottom left
                charPos.bottomleft = char;
            }else if (counts[char]==6) {
                charPos.topleft = char;
            }else if (counts[char]==9) {
                charPos.bottomright = char;
            }
        }

        //now we are ready to build the other strings
        //start by finding topright by removing it from the 1
        charPos.topright = removeChars(inputs[0],charPos.bottomright);
        //and find top by removing the 1 from the 7
        charPos.top = removeChars(inputs[1],inputs[0]);
        
        //now find the six by removing the topright from the 8
        let sixstring = removeChars(inputs[9],charPos.topright);
        stringToNumber[sixstring]=6;
        //make a 9 by removing the bottomright from the 8
        let ninestring = removeChars(inputs[9],charPos.bottomleft)
        stringToNumber[ninestring]=9;
        // make a 5 by removing the bottomleft from the 6
        let fivestring = removeChars(sixstring,charPos.bottomleft);
        stringToNumber[fivestring]=5;
        // make a 3 by removing the topleft from the 9
        let threestring = removeChars(ninestring,charPos.topleft);
        stringToNumber[threestring]=3;
        // at this point the only thing left is the 0 and the 2
        for (str of inputs) {
            if (stringToNumber[str]==undefined) {
                if (str.length == 6) {
                    stringToNumber[str]=0;
                }else {
                    stringToNumber[str]=2;
                }
            }
        }
        console.log(stringToNumber);

        let outputString = "";
        //now go through each output value and create a string
        for (output of outputs) {
            outputString += stringToNumber[output.split("").sort().join("")];
        }
        finalSum += Number(outputString);
    }
    console.log(finalSum);
}

function removeChars(string,chars) {
    var retChars = string.split("");
    for (char of chars.split("")) {
        retChars.splice(retChars.indexOf(char),1);
    }
    return retChars.join("");
}
