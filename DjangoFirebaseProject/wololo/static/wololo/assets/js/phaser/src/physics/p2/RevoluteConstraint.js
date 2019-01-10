/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Connects two bodies at given offset points, letting them rotate relative to each other around this point.
* The pivot points are given in world (pixel) coordinates.
*
* @class Phaser.Physics.P2.RevoluteConstraint
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***p2.Body***REMOVED*** bodyA - First connected body.
* @param ***REMOVED***Float32Array***REMOVED*** pivotA - The point relative to the center of mass of bodyA which bodyA is constrained to. The value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***p2.Body***REMOVED*** bodyB - Second connected body.
* @param ***REMOVED***Float32Array***REMOVED*** pivotB - The point relative to the center of mass of bodyB which bodyB is constrained to. The value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***number***REMOVED*** [maxForce=0] - The maximum force that should be applied to constrain the bodies.
* @param ***REMOVED***Float32Array***REMOVED*** [worldPivot=null] - A pivot point given in world coordinates. If specified, localPivotA and localPivotB are automatically computed from this value.
*/
Phaser.Physics.P2.RevoluteConstraint = function (world, bodyA, pivotA, bodyB, pivotB, maxForce, worldPivot) ***REMOVED***

    if (maxForce === undefined) ***REMOVED*** maxForce = Number.MAX_VALUE; ***REMOVED***
    if (worldPivot === undefined) ***REMOVED*** worldPivot = null; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = world.game;

    /**
    * @property ***REMOVED***Phaser.Physics.P2***REMOVED*** world - Local reference to P2 World.
    */
    this.world = world;

    pivotA = [ world.pxmi(pivotA[0]), world.pxmi(pivotA[1]) ];
    pivotB = [ world.pxmi(pivotB[0]), world.pxmi(pivotB[1]) ];

    if (worldPivot)
    ***REMOVED***
        worldPivot = [ world.pxmi(worldPivot[0]), world.pxmi(worldPivot[1]) ];
    ***REMOVED***

    var options = ***REMOVED*** worldPivot: worldPivot, localPivotA: pivotA, localPivotB: pivotB, maxForce: maxForce ***REMOVED***;

    p2.RevoluteConstraint.call(this, bodyA, bodyB, options);

***REMOVED***;

Phaser.Physics.P2.RevoluteConstraint.prototype = Object.create(p2.RevoluteConstraint.prototype);
Phaser.Physics.P2.RevoluteConstraint.prototype.constructor = Phaser.Physics.P2.RevoluteConstraint;
