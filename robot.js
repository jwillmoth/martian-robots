'use strict';
require('./mars.js');

const INSTRUCTION = {
    FORWARD: "F",
    LEFT: "L",
    RIGHT: "R"
}

const ORIENTATION = {
    NORTH: "N",
    EAST: "E",
    SOUTH: "S",
    WEST: "W"
}

class Robot {
    constructor(x, y, orientation, mars) {
        this.x = x;
        this.y = y;
        this.orientation;
        this.mars = mars;
        this.isLost = false;
    }

    move(instruction) {
        //todo update position
        //check if lost
    }

    static get INSTRUCTION() {
        return INSTRUCTION;
    }

    static get ORIENTATION() {
        return ORIENTATION;
    }

    toString() {
        //todo output the robots position and orientation
    }
}

module.exports = Robot;