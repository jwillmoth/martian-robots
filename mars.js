'use strict';

class Mars {
    constructor(maxX, maxY) {
        if (maxX > 50 || maxX < 0) throw new Error('Invalid maxX');
        if (maxY > 50 || maxY < 0) throw new Error('Invalid maxY');
        
        this.maxX = maxX;
        this.maxY = maxY;
        this.scentedPositions = new Array();
    }

    isOffGrid(x, y) {
        return (x > this.maxX || x < 0 || y > this.maxY || y < 0);
    }

    addScented(x, y) {
        if (this.isOffGrid(x, y)) throw new Error('Invalid coordinates');

        if (typeof(this.scentedPositions[x]) === 'undefined') {
            this.scentedPositions[x] = new Array();
        }
        this.scentedPositions[x][y] = true;
    }
    
    isScented(x, y) {
        if (this.isOffGrid(x, y)) throw new Error('Invalid coordinates');

        if (typeof(this.scentedPositions[x]) !== 'undefined') {
            return typeof(this.scentedPositions[x][y]) === 'boolean';
        }

        return false;
    }
}

module.exports = Mars;