'use strict';

var Mars = require('./mars.js');
var Robot = require('./robot.js');

function ParseInstructions(instructions) {
    //regex should match only expected instructions
    var rxAllInstructions = /^(\d+) (\d+)\n((\d+ \d+ [NESW]\n[RLF]+\n?)+)$/m;

    var matches = rxAllInstructions.exec(instructions);

    if (matches == null) throw 'Invalid instructions';

    var [, maxX, maxY, unparsedRobotInstructions] = matches;
    var mars = new Mars(maxX, maxY);

    var rxRobotInstructions = /(\d+) (\d+) ([NESW])\n([RLF]+)/gm;

    var robotInstructions = unparsedRobotInstructions.match(rxRobotInstructions);

    var results = robotInstructions.map((robotInstruction) => {
        //we're reusing this regex, we need to reset the lastIndex to avoid oddities.
        rxRobotInstructions.lastIndex = 0;
         let [,x,y,orientation,moves] = rxRobotInstructions.exec(robotInstruction);

        let robot = new Robot(x, y, orientation, mars);
        for (let i=0; i<moves.length; i++) {
            robot.move(moves.charAt(i));
        }
        return robot.toString();
    });
    
    return results.join('\n');
}

module.exports = ParseInstructions;