/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Connects two bodies at given offset points, letting them rotate relative to each other around this point.
*
* @class Phaser.Physics.P2.GearConstraint
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***p2.Body***REMOVED*** bodyA - First connected body.
* @param ***REMOVED***p2.Body***REMOVED*** bodyB - Second connected body.
* @param ***REMOVED***number***REMOVED*** [angle=0] - The relative angle
* @param ***REMOVED***number***REMOVED*** [ratio=1] - The gear ratio.
*/
Phaser.Physics.P2.GearConstraint = function (world, bodyA, bodyB, angle, ratio) ***REMOVED***

    if (angle === undefined) ***REMOVED*** angle = 0; ***REMOVED***
    if (ratio === undefined) ***REMOVED*** ratio = 1; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = world.game;

    /**
    * @property ***REMOVED***Phaser.Physics.P2***REMOVED*** world - Local reference to P2 World.
    */
    this.world = world;

    var options = ***REMOVED*** angle: angle, ratio: ratio ***REMOVED***;

    p2.GearConstraint.call(this, bodyA, bodyB, options);

***REMOVED***;

Phaser.Physics.P2.GearConstraint.prototype = Object.create(p2.GearConstraint.prototype);
Phaser.Physics.P2.GearConstraint.prototype.constructor = Phaser.Physics.P2.GearConstraint;
