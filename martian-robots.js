'use strict';

var Mars = require('./mars.js');
var Robots = require('./robot.js');

var testString = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
`;

function ParseInstructions(instructions) {
    //todo
    //get all the right bits from the instructions

    var mars = new Mars(1, 1);
    var robotInstructions = new Array();

    var results = '';
    for (let robotInstruction of robotInstructions) {
        let robot = new Robot(x, y, orientation, mars);
        for (instruction of robotInstruction.instructions) {
            robot.move(instructions);
        }
        results += robot.toString();
    }
    
    return results;
}

console.log(ParseInstructions(testString));