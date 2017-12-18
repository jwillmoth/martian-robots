'use strict';

var parseInstructions = require('../martian-robots.js');
var expect = require('chai').expect;

var sampleInstructions = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;

var sampleOutput = `1 1 E
3 3 N LOST
2 3 S`;

describe('martian-robots problem solution', () => {
    it('should export a function', () => {
        expect(parseInstructions).to.be.a('function');
    })

    it('should return output matching the sample data output', () => {
        expect(parseInstructions(sampleInstructions)).to.equal(sampleOutput);
    })
})



