/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Creates a rotational spring, connecting two bodies. A spring can have a resting length, a stiffness and damping.
*
* @class Phaser.Physics.P2.RotationalSpring
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***p2.Body***REMOVED*** bodyA - First connected body.
* @param ***REMOVED***p2.Body***REMOVED*** bodyB - Second connected body.
* @param ***REMOVED***number***REMOVED*** [restAngle] - The relative angle of bodies at which the spring is at rest. If not given, it's set to the current relative angle between the bodies.
* @param ***REMOVED***number***REMOVED*** [stiffness=100] - Stiffness of the spring. A number >= 0.
* @param ***REMOVED***number***REMOVED*** [damping=1] - Damping of the spring. A number >= 0.
*/
Phaser.Physics.P2.RotationalSpring = function (world, bodyA, bodyB, restAngle, stiffness, damping) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = world.game;

    /**
    * @property ***REMOVED***Phaser.Physics.P2***REMOVED*** world - Local reference to P2 World.
    */
    this.world = world;

    if (restAngle === undefined) ***REMOVED*** restAngle = null; ***REMOVED***
    if (stiffness === undefined) ***REMOVED*** stiffness = 100; ***REMOVED***
    if (damping === undefined) ***REMOVED*** damping = 1; ***REMOVED***

    if (restAngle)
    ***REMOVED***
        restAngle = world.pxm(restAngle);
    ***REMOVED***

    var options = ***REMOVED***
        restAngle: restAngle,
        stiffness: stiffness,
        damping: damping
    ***REMOVED***;

    /**
    * @property ***REMOVED***p2.RotationalSpring***REMOVED*** data - The actual p2 spring object.
    */
    this.data = new p2.RotationalSpring(bodyA, bodyB, options);

    this.data.parent = this;

***REMOVED***;

Phaser.Physics.P2.Spring.prototype.constructor = Phaser.Physics.P2.Spring;
