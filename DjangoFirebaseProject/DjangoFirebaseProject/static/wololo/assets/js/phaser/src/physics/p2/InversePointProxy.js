/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A InversePointProxy is an internal class that allows for direct getter/setter style property access to Arrays and TypedArrays but inverses the values on set.
*
* @class Phaser.Physics.P2.InversePointProxy
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***any***REMOVED*** destination - The object to bind to.
*/
Phaser.Physics.P2.InversePointProxy = function (world, destination) ***REMOVED***

    this.world = world;
	this.destination = destination;

***REMOVED***;

Phaser.Physics.P2.InversePointProxy.prototype.constructor = Phaser.Physics.P2.InversePointProxy;

/**
* @name Phaser.Physics.P2.InversePointProxy#x
* @property ***REMOVED***number***REMOVED*** x - The x property of this InversePointProxy get and set in pixels.
*/
Object.defineProperty(Phaser.Physics.P2.InversePointProxy.prototype, "x", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.mpxi(this.destination[0]);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.destination[0] = this.world.pxmi(value);

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.InversePointProxy#y
* @property ***REMOVED***number***REMOVED*** y - The y property of this InversePointProxy get and set in pixels.
*/
Object.defineProperty(Phaser.Physics.P2.InversePointProxy.prototype, "y", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.mpxi(this.destination[1]);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.destination[1] = this.world.pxmi(value);

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.InversePointProxy#mx
* @property ***REMOVED***number***REMOVED*** mx - The x property of this InversePointProxy get and set in meters.
*/
Object.defineProperty(Phaser.Physics.P2.InversePointProxy.prototype, "mx", ***REMOVED***

    get: function () ***REMOVED***

        return this.destination[0];

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.destination[0] = -value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.InversePointProxy#my
* @property ***REMOVED***number***REMOVED*** my - The y property of this InversePointProxy get and set in meters.
*/
Object.defineProperty(Phaser.Physics.P2.InversePointProxy.prototype, "my", ***REMOVED***

    get: function () ***REMOVED***

        return this.destination[1];

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.destination[1] = -value;

    ***REMOVED***

***REMOVED***);
