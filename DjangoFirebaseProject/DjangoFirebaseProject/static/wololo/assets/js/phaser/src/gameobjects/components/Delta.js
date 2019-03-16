/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Delta component provides access to delta values between the Game Objects current and previous position.
*
* @class
*/
Phaser.Component.Delta = function () ***REMOVED******REMOVED***;

Phaser.Component.Delta.prototype = ***REMOVED***

    /**
    * Returns the delta x value. The difference between world.x now and in the previous frame.
    * 
    * The value will be positive if the Game Object has moved to the right or negative if to the left.
    *
    * @property ***REMOVED***number***REMOVED*** deltaX
    * @readonly
    */
    deltaX: ***REMOVED***

        get: function() ***REMOVED***

            return this.world.x - this.previousPosition.x;

        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns the delta y value. The difference between world.y now and in the previous frame.
    * 
    * The value will be positive if the Game Object has moved down or negative if up.
    *
    * @property ***REMOVED***number***REMOVED*** deltaY
    * @readonly
    */
    deltaY: ***REMOVED***

        get: function() ***REMOVED***

            return this.world.y - this.previousPosition.y;

        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns the delta z value. The difference between rotation now and in the previous frame.
    *
    * @property ***REMOVED***number***REMOVED*** deltaZ - The delta value.
    * @readonly
    */
    deltaZ: ***REMOVED***

        get: function() ***REMOVED***

            return this.rotation - this.previousRotation;

        ***REMOVED***

    ***REMOVED***

***REMOVED***;
