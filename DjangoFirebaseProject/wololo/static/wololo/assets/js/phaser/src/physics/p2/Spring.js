/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Creates a linear spring, connecting two bodies. A spring can have a resting length, a stiffness and damping.
*
* @class Phaser.Physics.P2.Spring
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***p2.Body***REMOVED*** bodyA - First connected body.
* @param ***REMOVED***p2.Body***REMOVED*** bodyB - Second connected body.
* @param ***REMOVED***number***REMOVED*** [restLength=1] - Rest length of the spring. A number > 0.
* @param ***REMOVED***number***REMOVED*** [stiffness=100] - Stiffness of the spring. A number >= 0.
* @param ***REMOVED***number***REMOVED*** [damping=1] - Damping of the spring. A number >= 0.
* @param ***REMOVED***Array***REMOVED*** [worldA] - Where to hook the spring to body A in world coordinates. This value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***Array***REMOVED*** [worldB] - Where to hook the spring to body B in world coordinates. This value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***Array***REMOVED*** [localA] - Where to hook the spring to body A in local body coordinates. This value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***Array***REMOVED*** [localB] - Where to hook the spring to body B in local body coordinates. This value is an array with 2 elements matching x and y, i.e: [32, 32].
*/
Phaser.Physics.P2.Spring = function (world, bodyA, bodyB, restLength, stiffness, damping, worldA, worldB, localA, localB) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = world.game;

    /**
    * @property ***REMOVED***Phaser.Physics.P2***REMOVED*** world - Local reference to P2 World.
    */
    this.world = world;

    if (restLength === undefined) ***REMOVED*** restLength = 1; ***REMOVED***
    if (stiffness === undefined) ***REMOVED*** stiffness = 100; ***REMOVED***
    if (damping === undefined) ***REMOVED*** damping = 1; ***REMOVED***

    restLength = world.pxm(restLength);

    var options = ***REMOVED***
        restLength: restLength,
        stiffness: stiffness,
        damping: damping
    ***REMOVED***;

    if (typeof worldA !== 'undefined' && worldA !== null)
    ***REMOVED***
        options.worldAnchorA = [ world.pxm(worldA[0]), world.pxm(worldA[1]) ];
    ***REMOVED***

    if (typeof worldB !== 'undefined' && worldB !== null)
    ***REMOVED***
        options.worldAnchorB = [ world.pxm(worldB[0]), world.pxm(worldB[1]) ];
    ***REMOVED***

    if (typeof localA !== 'undefined' && localA !== null)
    ***REMOVED***
        options.localAnchorA = [ world.pxm(localA[0]), world.pxm(localA[1]) ];
    ***REMOVED***

    if (typeof localB !== 'undefined' && localB !== null)
    ***REMOVED***
        options.localAnchorB = [ world.pxm(localB[0]), world.pxm(localB[1]) ];
    ***REMOVED***

    /**
    * @property ***REMOVED***p2.LinearSpring***REMOVED*** data - The actual p2 spring object.
    */
    this.data = new p2.LinearSpring(bodyA, bodyB, options);

    this.data.parent = this;

***REMOVED***;

Phaser.Physics.P2.Spring.prototype.constructor = Phaser.Physics.P2.Spring;
