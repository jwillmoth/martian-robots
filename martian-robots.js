'use strict';

const Mars = require('./mars.js');
const Robot = require('./robot.js');

function ParseInstructions(instructions) {
    //regex should match only expected instructions
    const rxAllInstructions = /^(\d+) (\d+)\n((\d+ \d+ [NESW]\n[RLF]+\n?)+)$/m;

    const matches = rxAllInstructions.exec(instructions);

    if (matches == null) throw new Error('Invalid instructions');

    const [, maxX, maxY, unparsedRobotInstructions] = matches;
    const mars = new Mars(maxX, maxY);

    const rxRobotInstructions = /(\d+) (\d+) ([NESW])\n([RLF]+)/gm;

    const robotInstructions = unparsedRobotInstructions.match(rxRobotInstructions);

    const results = robotInstructions.map((robotInstruction) => {
        //we're reusing this regex so we need to reset the lastIndex to avoid oddities.
        rxRobotInstructions.lastIndex = 0;
        const [,x,y,orientation,moves] = rxRobotInstructions.exec(robotInstruction);

        const robot = new Robot(x, y, orientation, mars);
        for (let i=0; i<moves.length; i++) {
            robot.move(moves.charAt(i));
        }
        return robot.toString();
    });
    
    return results.join('\n');
}

module.exports = ParseInstructions;