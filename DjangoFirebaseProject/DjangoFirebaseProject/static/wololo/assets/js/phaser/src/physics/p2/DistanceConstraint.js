/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A constraint that tries to keep the distance between two bodies constant.
*
* @class Phaser.Physics.P2.DistanceConstraint
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***p2.Body***REMOVED*** bodyA - First connected body.
* @param ***REMOVED***p2.Body***REMOVED*** bodyB - Second connected body.
* @param ***REMOVED***number***REMOVED*** distance - The distance to keep between the bodies.
* @param ***REMOVED***Array***REMOVED*** [localAnchorA] - The anchor point for bodyA, defined locally in bodyA frame. Defaults to [0,0].
* @param ***REMOVED***Array***REMOVED*** [localAnchorB] - The anchor point for bodyB, defined locally in bodyB frame. Defaults to [0,0].
* @param ***REMOVED***object***REMOVED*** [maxForce=Number.MAX_VALUE] - Maximum force to apply.
*/
Phaser.Physics.P2.DistanceConstraint = function (world, bodyA, bodyB, distance, localAnchorA, localAnchorB, maxForce) ***REMOVED***

    if (distance === undefined) ***REMOVED*** distance = 100; ***REMOVED***
    if (localAnchorA === undefined) ***REMOVED*** localAnchorA = [0, 0]; ***REMOVED***
    if (localAnchorB === undefined) ***REMOVED*** localAnchorB = [0, 0]; ***REMOVED***
    if (maxForce === undefined) ***REMOVED*** maxForce = Number.MAX_VALUE; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = world.game;

    /**
    * @property ***REMOVED***Phaser.Physics.P2***REMOVED*** world - Local reference to P2 World.
    */
    this.world = world;

    distance = world.pxm(distance);

    localAnchorA = [ world.pxmi(localAnchorA[0]), world.pxmi(localAnchorA[1]) ];
    localAnchorB = [ world.pxmi(localAnchorB[0]), world.pxmi(localAnchorB[1]) ];

    var options = ***REMOVED*** distance: distance, localAnchorA: localAnchorA, localAnchorB: localAnchorB, maxForce: maxForce ***REMOVED***;

    p2.DistanceConstraint.call(this, bodyA, bodyB, options);

***REMOVED***;

Phaser.Physics.P2.DistanceConstraint.prototype = Object.create(p2.DistanceConstraint.prototype);
Phaser.Physics.P2.DistanceConstraint.prototype.constructor = Phaser.Physics.P2.DistanceConstraint;
