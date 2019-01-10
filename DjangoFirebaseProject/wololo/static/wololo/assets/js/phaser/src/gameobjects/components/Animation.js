/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Animation Component provides a `play` method, which is a proxy to the `AnimationManager.play` method.
*
* @class
*/
Phaser.Component.Animation = function () ***REMOVED******REMOVED***;

Phaser.Component.Animation.prototype = ***REMOVED***

    /**
    * Plays an Animation.
    * 
    * The animation should have previously been created via `animations.add`.
    * 
    * If the animation is already playing calling this again won't do anything.
    * If you need to reset an already running animation do so directly on the Animation object itself or via `AnimationManager.stop`.
    *
    * @method
    * @param ***REMOVED***string***REMOVED*** name - The name of the animation to be played, e.g. "fire", "walk", "jump". Must have been previously created via 'AnimationManager.add'.
    * @param ***REMOVED***number***REMOVED*** [frameRate=null] - The framerate to play the animation at. The speed is given in frames per second. If not provided the previously set frameRate of the Animation is used.
    * @param ***REMOVED***boolean***REMOVED*** [loop=false] - Should the animation be looped after playback. If not provided the previously set loop value of the Animation is used.
    * @param ***REMOVED***boolean***REMOVED*** [killOnComplete=false] - If set to true when the animation completes (only happens if loop=false) the parent Sprite will be killed.
    * @return ***REMOVED***Phaser.Animation***REMOVED*** A reference to playing Animation.
    */
    play: function (name, frameRate, loop, killOnComplete) ***REMOVED***

        if (this.animations)
        ***REMOVED***
            return this.animations.play(name, frameRate, loop, killOnComplete);
        ***REMOVED***

    ***REMOVED***

***REMOVED***;
