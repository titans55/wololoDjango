/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Smoothed component allows a Game Object to control anti-aliasing of an image based texture.
*
* @class
*/
Phaser.Component.Smoothed = function () ***REMOVED******REMOVED***;

Phaser.Component.Smoothed.prototype = ***REMOVED***

    /**
    * Enable or disable texture smoothing for this Game Object.
    * 
    * It only takes effect if the Game Object is using an image based texture.
    * 
    * Smoothing is enabled by default.
    *
    * @property ***REMOVED***boolean***REMOVED*** smoothed
    */
    smoothed: ***REMOVED***

        get: function () ***REMOVED***

            return !this.texture.baseTexture.scaleMode;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (value)
            ***REMOVED***
                if (this.texture)
                ***REMOVED***
                    this.texture.baseTexture.scaleMode = 0;
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                if (this.texture)
                ***REMOVED***
                    this.texture.baseTexture.scaleMode = 1;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***

***REMOVED***;
