'use strict';
var Robot = require('../robot.js');
var Mars = require('../mars.js');
var expect = require('chai').expect;

function GetMars() {
    return new Mars(10, 10);
}

const defaultX = 5;
const defaultY = 7;
const defaultOrientation = Robot.ORIENTATION.EAST;
function GetRobot() {
    return new Robot(defaultX, defaultY, defaultOrientation, GetMars());
}

describe('Robot class', () => {
    it('should export a class', () => {
        expect(Robot).to.be.a('function');
    })

    describe('constructor', () => {
        it('should create robot instances with correct properties', () => {
            var normalRobot = GetRobot();
    
            expect(normalRobot).to.be.a('object');
            expect(normalRobot.x).to.equal(defaultX);
            expect(normalRobot.y).to.equal(defaultY);
            expect(normalRobot.orientation).to.equal(defaultOrientation);
            expect(normalRobot.isLost).to.be.false;    
        });

        it('should errors if given invalid co-ordinates', () => {
            expect(() => new Robot(-1, defaultY, defaultOrientation, GetMars())).to.throw();
            expect(() => new Robot(defaultX, 60, defaultOrientation, GetMars())).to.throw();
        })
    })
    
    it('should convert to string "X Y Orientation (\'LOST\' if lost)"', () => {
      expect(GetRobot().toString()).to.equal(defaultX + ' ' + defaultY + ' ' + defaultOrientation);
    })

    describe('move()', () => {
        it('should move forward given FORWARD instruction', () => {
            var normalRobot = GetRobot();
            normalRobot.move(Robot.INSTRUCTION.FORWARD);

            expect(normalRobot.x).to.equal(defaultX + 1);
            expect(normalRobot.y).to.equal(defaultY);
            expect(normalRobot.orientation).to.equal(defaultOrientation);
        });

        it('should turn left given LEFT instruction', () => {
            var normalRobot = GetRobot();
            normalRobot.move(Robot.INSTRUCTION.LEFT);

            expect(normalRobot.x).to.equal(defaultX);
            expect(normalRobot.y).to.equal(defaultY);
            expect(normalRobot.orientation).to.equal(Robot.ORIENTATION.NORTH);
        });

        it('should turn right given RIGHT instruction', () => {
            var normalRobot = GetRobot();
            normalRobot.move(Robot.INSTRUCTION.RIGHT);

            expect(normalRobot.x).to.equal(defaultX);
            expect(normalRobot.y).to.equal(defaultY);
            expect(normalRobot.orientation).to.equal(Robot.ORIENTATION.SOUTH);
        });
        
        describe('when it would move the robot off grid', () => {
            var normalMars = GetMars();
            var lostStartX = 0;
            var lostStartY = 0;
            var lostRobot = new Robot(lostStartX, lostStartY, Robot.ORIENTATION.SOUTH, normalMars);
            lostRobot.move(Robot.INSTRUCTION.FORWARD);

            it('should not change co-ordinates', () => {
                expect(lostRobot.x).to.equal(lostStartX);
                expect(lostRobot.y).to.equal(lostStartY);
            })
            
            it('should mark the co-ordinate as scented', () => {
                expect(normalMars.isScented(lostStartX, lostStartY)).to.be.true;
            })
            
            it('isLost should be true', () => {
                expect(lostRobot.isLost).to.be.true;
            })
        })
    })
})
