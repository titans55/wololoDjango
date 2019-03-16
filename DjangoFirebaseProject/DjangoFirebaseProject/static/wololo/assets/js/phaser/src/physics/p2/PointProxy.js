/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A PointProxy is an internal class that allows for direct getter/setter style property access to Arrays and TypedArrays.
*
* @class Phaser.Physics.P2.PointProxy
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***any***REMOVED*** destination - The object to bind to.
*/
Phaser.Physics.P2.PointProxy = function (world, destination) ***REMOVED***

    this.world = world;
	this.destination = destination;

***REMOVED***;

Phaser.Physics.P2.PointProxy.prototype.constructor = Phaser.Physics.P2.PointProxy;

/**
* @name Phaser.Physics.P2.PointProxy#x
* @property ***REMOVED***number***REMOVED*** x - The x property of this PointProxy get and set in pixels.
*/
Object.defineProperty(Phaser.Physics.P2.PointProxy.prototype, "x", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.mpx(this.destination[0]);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.destination[0] = this.world.pxm(value);

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.PointProxy#y
* @property ***REMOVED***number***REMOVED*** y - The y property of this PointProxy get and set in pixels.
*/
Object.defineProperty(Phaser.Physics.P2.PointProxy.prototype, "y", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.mpx(this.destination[1]);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.destination[1] = this.world.pxm(value);

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.PointProxy#mx
* @property ***REMOVED***number***REMOVED*** mx - The x property of this PointProxy get and set in meters.
*/
Object.defineProperty(Phaser.Physics.P2.PointProxy.prototype, "mx", ***REMOVED***

    get: function () ***REMOVED***

        return this.destination[0];

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.destination[0] = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.PointProxy#my
* @property ***REMOVED***number***REMOVED*** my - The x property of this PointProxy get and set in meters.
*/
Object.defineProperty(Phaser.Physics.P2.PointProxy.prototype, "my", ***REMOVED***

    get: function () ***REMOVED***

        return this.destination[1];

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.destination[1] = value;

    ***REMOVED***

***REMOVED***);
