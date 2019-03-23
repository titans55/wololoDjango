/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Phaser.Game has a single instance of the TweenManager through which all Tween objects are created and updated.
* Tweens are hooked into the game clock and pause system, adjusting based on the game state.
*
* TweenManager is based heavily on tween.js by http://soledadpenades.com.
* The difference being that tweens belong to a games instance of TweenManager, rather than to a global TWEEN object.
* It also has callbacks swapped for Signals and a few issues patched with regard to properties and completion errors.
* Please see https://github.com/sole/tween.js for a full list of contributors.
* 
* @class Phaser.TweenManager
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.TweenManager = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = game;

    /**
    * Are all newly created Tweens frame or time based? A frame based tween will use the physics elapsed timer when updating. This means
    * it will retain the same consistent frame rate, regardless of the speed of the device. The duration value given should
    * be given in frames.
    * 
    * If the Tween uses a time based update (which is the default) then the duration is given in milliseconds.
    * In this situation a 2000ms tween will last exactly 2 seconds, regardless of the device and how many visual updates the tween
    * has actually been through. For very short tweens you may wish to experiment with a frame based update instead.
    * @property ***REMOVED***boolean***REMOVED*** frameBased
    * @default
    */
    this.frameBased = false;

    /**
    * @property ***REMOVED***array<Phaser.Tween>***REMOVED*** _tweens - All of the currently running tweens.
    * @private
    */
    this._tweens = [];

    /**
    * @property ***REMOVED***array<Phaser.Tween>***REMOVED*** _add - All of the tweens queued to be added in the next update.
    * @private
    */
    this._add = [];

    this.easeMap = ***REMOVED***

        "Power0": Phaser.Easing.Power0,
        "Power1": Phaser.Easing.Power1,
        "Power2": Phaser.Easing.Power2,
        "Power3": Phaser.Easing.Power3,
        "Power4": Phaser.Easing.Power4,

        "Linear": Phaser.Easing.Linear.None,
        "Quad": Phaser.Easing.Quadratic.Out,
        "Cubic": Phaser.Easing.Cubic.Out,
        "Quart": Phaser.Easing.Quartic.Out,
        "Quint": Phaser.Easing.Quintic.Out,
        "Sine": Phaser.Easing.Sinusoidal.Out,
        "Expo": Phaser.Easing.Exponential.Out,
        "Circ": Phaser.Easing.Circular.Out,
        "Elastic": Phaser.Easing.Elastic.Out,
        "Back": Phaser.Easing.Back.Out,
        "Bounce": Phaser.Easing.Bounce.Out,

        "Quad.easeIn": Phaser.Easing.Quadratic.In,
        "Cubic.easeIn": Phaser.Easing.Cubic.In,
        "Quart.easeIn": Phaser.Easing.Quartic.In,
        "Quint.easeIn": Phaser.Easing.Quintic.In,
        "Sine.easeIn": Phaser.Easing.Sinusoidal.In,
        "Expo.easeIn": Phaser.Easing.Exponential.In,
        "Circ.easeIn": Phaser.Easing.Circular.In,
        "Elastic.easeIn": Phaser.Easing.Elastic.In,
        "Back.easeIn": Phaser.Easing.Back.In,
        "Bounce.easeIn": Phaser.Easing.Bounce.In,

        "Quad.easeOut": Phaser.Easing.Quadratic.Out,
        "Cubic.easeOut": Phaser.Easing.Cubic.Out,
        "Quart.easeOut": Phaser.Easing.Quartic.Out,
        "Quint.easeOut": Phaser.Easing.Quintic.Out,
        "Sine.easeOut": Phaser.Easing.Sinusoidal.Out,
        "Expo.easeOut": Phaser.Easing.Exponential.Out,
        "Circ.easeOut": Phaser.Easing.Circular.Out,
        "Elastic.easeOut": Phaser.Easing.Elastic.Out,
        "Back.easeOut": Phaser.Easing.Back.Out,
        "Bounce.easeOut": Phaser.Easing.Bounce.Out,

        "Quad.easeInOut": Phaser.Easing.Quadratic.InOut,
        "Cubic.easeInOut": Phaser.Easing.Cubic.InOut,
        "Quart.easeInOut": Phaser.Easing.Quartic.InOut,
        "Quint.easeInOut": Phaser.Easing.Quintic.InOut,
        "Sine.easeInOut": Phaser.Easing.Sinusoidal.InOut,
        "Expo.easeInOut": Phaser.Easing.Exponential.InOut,
        "Circ.easeInOut": Phaser.Easing.Circular.InOut,
        "Elastic.easeInOut": Phaser.Easing.Elastic.InOut,
        "Back.easeInOut": Phaser.Easing.Back.InOut,
        "Bounce.easeInOut": Phaser.Easing.Bounce.InOut

    ***REMOVED***;

    this.game.onPause.add(this._pauseAll, this);
    this.game.onResume.add(this._resumeAll, this);

***REMOVED***;

Phaser.TweenManager.prototype = ***REMOVED***

    /**
    * Get all the tween objects in an array.
    * @method Phaser.TweenManager#getAll
    * @returns ***REMOVED***Phaser.Tween[]***REMOVED*** Array with all tween objects.
    */
    getAll: function () ***REMOVED***

        return this._tweens;

    ***REMOVED***,

    /**
    * Remove all tweens running and in the queue. Doesn't call any of the tween onComplete events.
    * @method Phaser.TweenManager#removeAll
    */
    removeAll: function () ***REMOVED***

        for (var i = 0; i < this._tweens.length; i++)
        ***REMOVED***
            this._tweens[i].pendingDelete = true;
        ***REMOVED***

        this._add = [];

    ***REMOVED***,
    
    /**
    * Remove all tweens from a specific object, array of objects or Group.
    * 
    * @method Phaser.TweenManager#removeFrom
    * @param ***REMOVED***object|object[]|Phaser.Group***REMOVED*** obj - The object you want to remove the tweens from.
    * @param ***REMOVED***boolean***REMOVED*** [children=true] - If passing a group, setting this to true will remove the tweens from all of its children instead of the group itself.
    */
    removeFrom: function (obj, children) ***REMOVED***
        
        if (children === undefined) ***REMOVED*** children = true; ***REMOVED***

        var i;
        var len;

        if (Array.isArray(obj))
        ***REMOVED***
            for (i = 0, len = obj.length; i < len; i++)
            ***REMOVED***
                this.removeFrom(obj[i]);
            ***REMOVED***
        ***REMOVED***
        else if (obj.type === Phaser.GROUP && children)
        ***REMOVED***
            for (var i = 0, len = obj.children.length; i < len; i++)
            ***REMOVED***
                this.removeFrom(obj.children[i]);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            for (i = 0, len = this._tweens.length; i < len; i++)
            ***REMOVED***
                if (obj === this._tweens[i].target)
                ***REMOVED***
                    this.remove(this._tweens[i]);
                ***REMOVED***
            ***REMOVED***

            for (i = 0, len = this._add.length; i < len; i++)
            ***REMOVED***
                if (obj === this._add[i].target)
                ***REMOVED***
                    this.remove(this._add[i]);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        
    ***REMOVED***,

    /**
    * Add a new tween into the TweenManager.
    *
    * @method Phaser.TweenManager#add
    * @param ***REMOVED***Phaser.Tween***REMOVED*** tween - The tween object you want to add.
    * @returns ***REMOVED***Phaser.Tween***REMOVED*** The tween object you added to the manager.
    */
    add: function (tween) ***REMOVED***

        tween._manager = this;
        this._add.push(tween);

    ***REMOVED***,

    /**
    * Create a tween object for a specific object. The object can be any JavaScript object or Phaser object such as Sprite.
    *
    * @method Phaser.TweenManager#create
    * @param ***REMOVED***object***REMOVED*** object - Object the tween will be run on.
    * @returns ***REMOVED***Phaser.Tween***REMOVED*** The newly created tween object.
    */
    create: function (object) ***REMOVED***

        return new Phaser.Tween(object, this.game, this);

    ***REMOVED***,

    /**
    * Remove a tween from this manager.
    *
    * @method Phaser.TweenManager#remove
    * @param ***REMOVED***Phaser.Tween***REMOVED*** tween - The tween object you want to remove.
    */
    remove: function (tween) ***REMOVED***

        var i = this._tweens.indexOf(tween);

        if (i !== -1)
        ***REMOVED***
            this._tweens[i].pendingDelete = true;
        ***REMOVED***
        else
        ***REMOVED***
            i = this._add.indexOf(tween);

            if (i !== -1)
            ***REMOVED***
                this._add[i].pendingDelete = true;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Update all the tween objects you added to this manager.
    *
    * @method Phaser.TweenManager#update
    * @returns ***REMOVED***boolean***REMOVED*** Return false if there's no tween to update, otherwise return true.
    */
    update: function () ***REMOVED***

        var addTweens = this._add.length;
        var numTweens = this._tweens.length;

        if (numTweens === 0 && addTweens === 0)
        ***REMOVED***
            return false;
        ***REMOVED***

        var i = 0;

        while (i < numTweens)
        ***REMOVED***
            if (this._tweens[i].update(this.game.time.time))
            ***REMOVED***
                i++;
            ***REMOVED***
            else
            ***REMOVED***
                this._tweens.splice(i, 1);

                numTweens--;
            ***REMOVED***
        ***REMOVED***

        //  If there are any new tweens to be added, do so now - otherwise they can be spliced out of the array before ever running
        if (addTweens > 0)
        ***REMOVED***
            this._tweens = this._tweens.concat(this._add);
            this._add.length = 0;
        ***REMOVED***

        return true;

    ***REMOVED***,

    /**
    * Checks to see if a particular Sprite is currently being tweened.
    *
    * @method Phaser.TweenManager#isTweening
    * @param ***REMOVED***object***REMOVED*** object - The object to check for tweens against.
    * @returns ***REMOVED***boolean***REMOVED*** Returns true if the object is currently being tweened, false if not.
    */
    isTweening: function(object) ***REMOVED***

        return this._tweens.some(function(tween) ***REMOVED***
            return tween.target === object;
        ***REMOVED***);

    ***REMOVED***,

    /**
    * Private. Called by game focus loss. Pauses all currently running tweens.
    *
    * @method Phaser.TweenManager#_pauseAll
    * @private
    */
    _pauseAll: function () ***REMOVED***

        for (var i = this._tweens.length - 1; i >= 0; i--)
        ***REMOVED***
            this._tweens[i]._pause();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Private. Called by game focus loss. Resumes all currently paused tweens.
    *
    * @method Phaser.TweenManager#_resumeAll
    * @private
    */
    _resumeAll: function () ***REMOVED***

        for (var i = this._tweens.length - 1; i >= 0; i--)
        ***REMOVED***
            this._tweens[i]._resume();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Pauses all currently running tweens.
    *
    * @method Phaser.TweenManager#pauseAll
    */
    pauseAll: function () ***REMOVED***

        for (var i = this._tweens.length - 1; i >= 0; i--)
        ***REMOVED***
            this._tweens[i].pause();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Resumes all currently paused tweens.
    *
    * @method Phaser.TweenManager#resumeAll
    */
    resumeAll: function () ***REMOVED***

        for (var i = this._tweens.length - 1; i >= 0; i--)
        ***REMOVED***
            this._tweens[i].resume(true);
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.TweenManager.prototype.constructor = Phaser.TweenManager;
