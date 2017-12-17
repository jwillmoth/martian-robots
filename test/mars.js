'use strict';
var Mars = require('../mars.js');
var expect = require('chai').expect;

describe('Mars class', () => {
    it('should export a class', () => {
        expect(Mars).to.be.a('function');
    })

    it('should have a constructor(maxX, maxY) where maxX and maxY are valid between 0 and 50', () => {
        var normalMars = new Mars(10, 10);
        expect(normalMars).to.be.a('object');
    
        expect(() => new Mars(-1, -1)).to.throw();
        expect(() => new Mars(100, 100)).to.throw();
    })

    it('should have maxX and maxY properties', () => {
        var normalMars = new Mars(10, 10);

        expect(normalMars.maxX).to.be.a('number');
        expect(normalMars.maxX).to.equal(10);

        expect(normalMars.maxY).to.be.a('number');
        expect(normalMars.maxY).to.equal(10);
    })

    describe('isOffGrid()', () => {
        it('should return false for valid grid co-ordinates', () => {
            var normalMars = new Mars(10, 10);

            expect(normalMars.isOffGrid).to.be.a('function');
            expect(normalMars.isOffGrid(5,5)).to.be.false;
        })

        it('should return true for off-grid co-ordinates', () => {
            var normalMars = new Mars(10, 10);

            expect(normalMars.isOffGrid(5, 11)).to.be.true;
            expect(normalMars.isOffGrid(11 ,5)).to.be.true;
            expect(normalMars.isOffGrid(5,-1)).to.be.true;
            expect(normalMars.isOffGrid(-1, 5)).to.be.true;
        })        
    })

    describe('addScented()', () => {
        it('should allow you to add a scented co-ordinate', () => {
            var normalMars = new Mars(10, 10);

            expect(normalMars.addScented).to.be.a('function');
            expect(() => normalMars.addScented(5,5)).not.to.throw();
        })
        
        it('should error if you attempt to set an off-grid co-ordinate as scented', () => {
            var normalMars = new Mars(10, 10);

            expect(() => normalMars.addScented(11,11)).to.throw();
        })
    })

    describe('isScented()', () => {
        it('should return false for co-ordinates on a fresh grid and error for off-grid co-ordinates', () => {
            var normalMars = new Mars(10, 10);

            expect(normalMars.isScented).to.be.a('function');
            expect(normalMars.isScented(1,1)).to.be.false;
            expect(() => normalMars.isScented(11,11)).to.throw();
        })

        it('should return true for co-ordinates that have been added as scented', () => {
            var normalMars = new Mars(10, 10);
            normalMars.addScented(6,6)
            expect(normalMars.isScented(6,6)).to.be.true;
        })
    })
})
