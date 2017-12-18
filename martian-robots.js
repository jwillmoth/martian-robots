'use strict';

var Mars = require('./mars.js');
var Robot = require('./robot.js');

function ParseInstructions(instructions) {
    //regex should match only expected instructions
    var rxAllInstructions = /^(\d+) (\d+)\n((\d+ \d+ [NESW]\n[RLF]+\n?)+)$/m;

    var matches = rxAllInstructions.exec(instructions);

    if (matches == null) throw 'Invalid instructions';

    var maxX = matches[1];
    var maxY = matches[2];
    var mars = new Mars(maxX, maxY);

    var unparsedRobotInstructions = matches[3];

    var rxRobotInstructions = /(\d+) (\d+) ([NESW])\n([RLF]+)/gm;

    var robotInstructions = unparsedRobotInstructions.match(rxRobotInstructions);

    var results = robotInstructions.map((robotInstruction) => {
        //we're reusing this regex, we need to reset the lastIndex to avoid oddities.
        rxRobotInstructions.lastIndex = 0;
        var robotDetails = rxRobotInstructions.exec(robotInstruction);

        var x = robotDetails[1];
        var y = robotDetails[2];
        var orientation = robotDetails[3];
        var moves = robotDetails[4];

        let robot = new Robot(x, y, orientation, mars);
        for (let i=0; i<moves.length; i++) {
            robot.move(moves.charAt(i));
        }
        return robot.toString();
    });
    
    return results.join('\n');
}

module.exports = ParseInstructions;