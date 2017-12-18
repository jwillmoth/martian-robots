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

function rotate(orientation, bLeft) {
    //get an array of the orientation values
    var arrOrientations = Object.keys(ORIENTATION).map((k) => ORIENTATION[k]);

    //rotate by looking at the next (for right) or previous (for left) value
    var modifier = (bLeft ? -1 : 1);
    var rotatedIndex = (arrOrientations.indexOf(orientation) + modifier) % arrOrientations.length;
    //slice can cope with negative indexes
    return arrOrientations.slice(rotatedIndex)[0];
}

function moveForward(x, y, orientation) {
    switch (orientation) {
        case ORIENTATION.NORTH:
            y++;
            break;
        case ORIENTATION.EAST:
            x++;
            break;
        case ORIENTATION.SOUTH:
            y--;
            break;
        case ORIENTATION.WEST:
            x--;
    }

    return {x: x, y: y}
}

class Robot {
    constructor(x, y, orientation, mars) {
        if (mars.isOffGrid(x, y)) throw 'Invalid coordinates';

        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.mars = mars;
        this.isLost = false;
    }

    move(instruction) {
        //don't move lost robots
        if (this.isLost) return;

        switch (instruction) {
            case INSTRUCTION.FORWARD:
                var {x:newX, y:newY} = moveForward(this.x, this.y, this.orientation);

                //check if moving would mean we've fallen off
                if (this.mars.isOffGrid(newX, newY)) {
                    //we have only actually fallen off if there isn't a scent here already
                    if (!this.mars.isScented(this.x, this.y)) {
                        this.isLost = true;
                        this.mars.addScented(this.x, this.y);
                    }
                } else {
                    this.x = newX;
                    this.y = newY;
                }
                break;
            case INSTRUCTION.LEFT:
                this.orientation = rotate(this.orientation, true);
                break;
            case INSTRUCTION.RIGHT:
                this.orientation = rotate(this.orientation, false);
                break;
            default:
                throw 'Invalid instruction.';
          }
    }

    static get INSTRUCTION() {
        return INSTRUCTION;
    }

    static get ORIENTATION() {
        return ORIENTATION;
    }

    toString() {
        return `${this.x} ${this.y} ${this.orientation}${this.isLost ? ' LOST': ''}`;
    }
}

module.exports = Robot;