/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Connects two bodies at given offset points, letting them rotate relative to each other around this point.
*
* @class Phaser.Physics.P2.PrismaticConstraint
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***p2.Body***REMOVED*** bodyA - First connected body.
* @param ***REMOVED***p2.Body***REMOVED*** bodyB - Second connected body.
* @param ***REMOVED***boolean***REMOVED*** [lockRotation=true] - If set to false, bodyB will be free to rotate around its anchor point.
* @param ***REMOVED***Array***REMOVED*** [anchorA] - Body A's anchor point, defined in its own local frame. The value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***Array***REMOVED*** [anchorB] - Body A's anchor point, defined in its own local frame. The value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***Array***REMOVED*** [axis] - An axis, defined in body A frame, that body B's anchor point may slide along. The value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***number***REMOVED*** [maxForce] - The maximum force that should be applied to constrain the bodies.
*/
Phaser.Physics.P2.PrismaticConstraint = function (world, bodyA, bodyB, lockRotation, anchorA, anchorB, axis, maxForce) ***REMOVED***

    if (lockRotation === undefined) ***REMOVED*** lockRotation = true; ***REMOVED***
    if (anchorA === undefined) ***REMOVED*** anchorA = [0, 0]; ***REMOVED***
    if (anchorB === undefined) ***REMOVED*** anchorB = [0, 0]; ***REMOVED***
    if (axis === undefined) ***REMOVED*** axis = [0, 0]; ***REMOVED***
    if (maxForce === undefined) ***REMOVED*** maxForce = Number.MAX_VALUE; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = world.game;

    /**
    * @property ***REMOVED***Phaser.Physics.P2***REMOVED*** world - Local reference to P2 World.
    */
    this.world = world;

    anchorA = [ world.pxmi(anchorA[0]), world.pxmi(anchorA[1]) ];
    anchorB = [ world.pxmi(anchorB[0]), world.pxmi(anchorB[1]) ];

    var options = ***REMOVED*** localAnchorA: anchorA, localAnchorB: anchorB, localAxisA: axis, maxForce: maxForce, disableRotationalLock: !lockRotation ***REMOVED***;

    p2.PrismaticConstraint.call(this, bodyA, bodyB, options);

***REMOVED***;

Phaser.Physics.P2.PrismaticConstraint.prototype = Object.create(p2.PrismaticConstraint.prototype);
Phaser.Physics.P2.PrismaticConstraint.prototype.constructor = Phaser.Physics.P2.PrismaticConstraint;
