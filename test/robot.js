'use strict';
const Robot = require('../robot.js');
const Mars = require('../mars.js');
const expect = require('chai').expect;

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
            const normalRobot = GetRobot();
    
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
            const normalRobot = GetRobot();
            normalRobot.move(Robot.INSTRUCTION.FORWARD);

            expect(normalRobot.x).to.equal(defaultX + 1);
            expect(normalRobot.y).to.equal(defaultY);
            expect(normalRobot.orientation).to.equal(defaultOrientation);
        });

        it('should turn left given LEFT instruction', () => {
            const normalRobot = GetRobot();
            normalRobot.move(Robot.INSTRUCTION.LEFT);

            expect(normalRobot.x).to.equal(defaultX);
            expect(normalRobot.y).to.equal(defaultY);
            expect(normalRobot.orientation).to.equal(Robot.ORIENTATION.NORTH);
        });

        it('should turn right given RIGHT instruction', () => {
            const normalRobot = GetRobot();
            normalRobot.move(Robot.INSTRUCTION.RIGHT);

            expect(normalRobot.x).to.equal(defaultX);
            expect(normalRobot.y).to.equal(defaultY);
            expect(normalRobot.orientation).to.equal(Robot.ORIENTATION.SOUTH);
        });
        
        describe('when it would move the robot off grid', () => {
            const normalMars = GetMars();
            const lostStartX = 0;
            const lostStartY = 0;
            const lostRobot = new Robot(lostStartX, lostStartY, Robot.ORIENTATION.SOUTH, normalMars);
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

            describe('but the coordinate is scented', () => {
                const normalMarsWithScent = GetMars();
                const notLostStartX = 0;
                const notLostStartY = 0;
                normalMarsWithScent.addScented(notLostStartX, notLostStartY);
                const notLostRobot = new Robot(notLostStartX, notLostStartY, Robot.ORIENTATION.SOUTH, normalMarsWithScent);
                notLostRobot.move(Robot.INSTRUCTION.FORWARD);

                it('should not change co-ordinates', () => {
                    expect(notLostRobot.x).to.equal(notLostStartX);
                    expect(notLostRobot.y).to.equal(notLostStartY);
                })
                
                it('isLost should be false', () => {
                    expect(notLostRobot.isLost).to.be.false;
                })
            })
        })
    })
})
