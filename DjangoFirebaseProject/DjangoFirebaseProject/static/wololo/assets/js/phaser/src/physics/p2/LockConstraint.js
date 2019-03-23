/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Locks the relative position between two bodies.
*
* @class Phaser.Physics.P2.LockConstraint
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***p2.Body***REMOVED*** bodyA - First connected body.
* @param ***REMOVED***p2.Body***REMOVED*** bodyB - Second connected body.
* @param ***REMOVED***Array***REMOVED*** [offset] - The offset of bodyB in bodyA's frame. The value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***number***REMOVED*** [angle=0] - The angle of bodyB in bodyA's frame.
* @param ***REMOVED***number***REMOVED*** [maxForce] - The maximum force that should be applied to constrain the bodies.
*/
Phaser.Physics.P2.LockConstraint = function (world, bodyA, bodyB, offset, angle, maxForce) ***REMOVED***

    if (offset === undefined) ***REMOVED*** offset = [0, 0]; ***REMOVED***
    if (angle === undefined) ***REMOVED*** angle = 0; ***REMOVED***
    if (maxForce === undefined) ***REMOVED*** maxForce = Number.MAX_VALUE; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = world.game;

    /**
    * @property ***REMOVED***Phaser.Physics.P2***REMOVED*** world - Local reference to P2 World.
    */
    this.world = world;

    offset = [ world.pxm(offset[0]), world.pxm(offset[1]) ];

    var options = ***REMOVED*** localOffsetB: offset, localAngleB: angle, maxForce: maxForce ***REMOVED***;

    p2.LockConstraint.call(this, bodyA, bodyB, options);

***REMOVED***;

Phaser.Physics.P2.LockConstraint.prototype = Object.create(p2.LockConstraint.prototype);
Phaser.Physics.P2.LockConstraint.prototype.constructor = Phaser.Physics.P2.LockConstraint;
