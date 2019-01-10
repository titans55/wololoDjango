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

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Tween allows you to alter one or more properties of a target object over a defined period of time.
* This can be used for things such as alpha fading Sprites, scaling them or motion.
* Use `Tween.to` or `Tween.from` to set-up the tween values. You can create multiple tweens on the same object
* by calling Tween.to multiple times on the same Tween. Additional tweens specified in this way become "child" tweens and
* are played through in sequence. You can use Tween.timeScale and Tween.reverse to control the playback of this Tween and all of its children.
*
* @class Phaser.Tween
* @constructor
* @param ***REMOVED***object***REMOVED*** target - The target object, such as a Phaser.Sprite or Phaser.Sprite.scale.
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Current game instance.
* @param ***REMOVED***Phaser.TweenManager***REMOVED*** manager - The TweenManager responsible for looking after this Tween.
*/
Phaser.Tween = function (target, game, manager) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running Game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***object***REMOVED*** target - The target object, such as a Phaser.Sprite or property like Phaser.Sprite.scale.
    */
    this.target = target;

    /**
    * @property ***REMOVED***Phaser.TweenManager***REMOVED*** manager - Reference to the TweenManager responsible for updating this Tween.
    */
    this.manager = manager;

    /**
    * @property ***REMOVED***Array***REMOVED*** timeline - An Array of TweenData objects that comprise the different parts of this Tween.
    */
    this.timeline = [];

    /**
    * If set to `true` the current tween will play in reverse.
    * If the tween hasn't yet started this has no effect.
    * If there are child tweens then all child tweens will play in reverse from the current point.
    * @property ***REMOVED***boolean***REMOVED*** reverse
    * @default
    */
    this.reverse = false;

    /**
    * The speed at which the tweens will run. A value of 1 means it will match the game frame rate. 0.5 will run at half the frame rate. 2 at double the frame rate, etc.
    * If a tweens duration is 1 second but timeScale is 0.5 then it will take 2 seconds to complete.
    *
    * @property ***REMOVED***number***REMOVED*** timeScale
    * @default
    */
    this.timeScale = 1;

    /**
    * @property ***REMOVED***number***REMOVED*** repeatCounter - If the Tween and any child tweens are set to repeat this contains the current repeat count.
    */
    this.repeatCounter = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** pendingDelete - True if this Tween is ready to be deleted by the TweenManager.
    * @default
    * @readonly
    */
    this.pendingDelete = false;

    /**
    * The onStart event is fired when the Tween begins. If there is a delay before the tween starts then onStart fires after the delay is finished.
    * It will be sent 2 parameters: the target object and this tween.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onStart
    */
    this.onStart = new Phaser.Signal();

    /**
    * The onLoop event is fired if the Tween, or any child tweens loop.
    * It will be sent 2 parameters: the target object and this tween.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onLoop
    */
    this.onLoop = new Phaser.Signal();

    /**
    * The onRepeat event is fired if the Tween and all of its children repeats. If this tween has no children this will never be fired.
    * It will be sent 2 parameters: the target object and this tween.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onRepeat
    */
    this.onRepeat = new Phaser.Signal();

    /**
    * The onChildComplete event is fired when the Tween or any of its children completes.
    * Fires every time a child completes unless a child is set to repeat forever.
    * It will be sent 2 parameters: the target object and this tween.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onChildComplete
    */
    this.onChildComplete = new Phaser.Signal();

    /**
    * The onComplete event is fired when the Tween and all of its children completes. Does not fire if the Tween is set to loop or repeatAll(-1).
    * It will be sent 2 parameters: the target object and this tween.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onComplete
    */
    this.onComplete = new Phaser.Signal();

    /**
    * @property ***REMOVED***boolean***REMOVED*** isRunning - If the tween is running this is set to true, otherwise false. Tweens that are in a delayed state or waiting to start are considered as being running.
    * @default
    */
    this.isRunning = false;

    /**
    * @property ***REMOVED***number***REMOVED*** current - The current Tween child being run.
    * @default
    * @readonly
    */
    this.current = 0;

    /**
    * @property ***REMOVED***object***REMOVED*** properties - Target property cache used when building the child data values.
    */
    this.properties = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***Phaser.Tween***REMOVED*** chainedTween - If this Tween is chained to another this holds a reference to it.
    */
    this.chainedTween = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isPaused - Is this Tween paused or not?
    * @default
    */
    this.isPaused = false;

    /**
    * Is this Tween frame or time based? A frame based tween will use the physics elapsed timer when updating. This means
    * it will retain the same consistent frame rate, regardless of the speed of the device. The duration value given should
    * be given in frames.
    *
    * If the Tween uses a time based update (which is the default) then the duration is given in milliseconds.
    * In this situation a 2000ms tween will last exactly 2 seconds, regardless of the device and how many visual updates the tween
    * has actually been through. For very short tweens you may wish to experiment with a frame based update instead.
    *
    * The default value is whatever you've set in TweenManager.frameBased.
    *
    * @property ***REMOVED***boolean***REMOVED*** frameBased
    * @default
    */
    this.frameBased = manager.frameBased;

    /**
    * @property ***REMOVED***function***REMOVED*** _onUpdateCallback - An onUpdate callback.
    * @private
    * @default null
    */
    this._onUpdateCallback = null;

    /**
    * @property ***REMOVED***object***REMOVED*** _onUpdateCallbackContext - The context in which to call the onUpdate callback.
    * @private
    * @default null
    */
    this._onUpdateCallbackContext = null;

    /**
    * @property ***REMOVED***number***REMOVED*** _pausedTime - Private pause timer.
    * @private
    * @default
    */
    this._pausedTime = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _codePaused - Was the Tween paused by code or by Game focus loss?
    * @private
    */
    this._codePaused = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _hasStarted - Internal var to track if the Tween has started yet or not.
    * @private
    */
    this._hasStarted = false;
***REMOVED***;

Phaser.Tween.prototype = ***REMOVED***

    /**
    * Sets this tween to be a `to` tween on the properties given. A `to` tween starts at the current value and tweens to the destination value given.
    * For example a Sprite with an `x` coordinate of 100 could be tweened to `x` 200 by giving a properties object of `***REMOVED*** x: 200 ***REMOVED***`.
    * The ease function allows you define the rate of change. You can pass either a function such as Phaser.Easing.Circular.Out or a string such as "Circ".
    * ".easeIn", ".easeOut" and "easeInOut" variants are all supported for all ease types.
    *
    * @method Phaser.Tween#to
    * @param ***REMOVED***object***REMOVED*** properties - An object containing the properties you want to tween, such as `Sprite.x` or `Sound.volume`. Given as a JavaScript object.
    * @param ***REMOVED***number***REMOVED*** [duration=1000] - Duration of this tween in ms. Or if `Tween.frameBased` is true this represents the number of frames that should elapse.
    * @param ***REMOVED***function|string***REMOVED*** [ease=null] - Easing function. If not set it will default to Phaser.Easing.Default, which is Phaser.Easing.Linear.None by default but can be over-ridden.
    * @param ***REMOVED***boolean***REMOVED*** [autoStart=false] - Set to `true` to allow this tween to start automatically. Otherwise call Tween.start().
    * @param ***REMOVED***number***REMOVED*** [delay=0] - Delay before this tween will start in milliseconds. Defaults to 0, no delay.
    * @param ***REMOVED***number***REMOVED*** [repeat=0] - Should the tween automatically restart once complete? If you want it to run forever set as -1. This only effects this individual tween, not any chained tweens.
    * @param ***REMOVED***boolean***REMOVED*** [yoyo=false] - A tween that yoyos will reverse itself and play backwards automatically. A yoyo'd tween doesn't fire the Tween.onComplete event, so listen for Tween.onLoop instead.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** This Tween object.
    */
    to: function (properties, duration, ease, autoStart, delay, repeat, yoyo) ***REMOVED***

        if (duration === undefined || duration <= 0) ***REMOVED*** duration = 1000; ***REMOVED***
        if (ease === undefined || ease === null) ***REMOVED*** ease = Phaser.Easing.Default; ***REMOVED***
        if (autoStart === undefined) ***REMOVED*** autoStart = false; ***REMOVED***
        if (delay === undefined) ***REMOVED*** delay = 0; ***REMOVED***
        if (repeat === undefined) ***REMOVED*** repeat = 0; ***REMOVED***
        if (yoyo === undefined) ***REMOVED*** yoyo = false; ***REMOVED***

        if (typeof ease === 'string' && this.manager.easeMap[ease])
        ***REMOVED***
            ease = this.manager.easeMap[ease];
        ***REMOVED***

        if (this.isRunning)
        ***REMOVED***
            console.warn('Phaser.Tween.to cannot be called after Tween.start');
            return this;
        ***REMOVED***

        this.timeline.push(new Phaser.TweenData(this).to(properties, duration, ease, delay, repeat, yoyo));

        if (autoStart)
        ***REMOVED***
            this.start();
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Sets this tween to be a `from` tween on the properties given. A `from` tween sets the target to the destination value and tweens to its current value.
    * For example a Sprite with an `x` coordinate of 100 tweened from `x` 500 would be set to `x` 500 and then tweened to `x` 100 by giving a properties object of `***REMOVED*** x: 500 ***REMOVED***`.
    * The ease function allows you define the rate of change. You can pass either a function such as Phaser.Easing.Circular.Out or a string such as "Circ".
    * ".easeIn", ".easeOut" and "easeInOut" variants are all supported for all ease types.
    *
    * @method Phaser.Tween#from
    * @param ***REMOVED***object***REMOVED*** properties - An object containing the properties you want to tween., such as `Sprite.x` or `Sound.volume`. Given as a JavaScript object.
    * @param ***REMOVED***number***REMOVED*** [duration=1000] - Duration of this tween in ms. Or if `Tween.frameBased` is true this represents the number of frames that should elapse.
    * @param ***REMOVED***function|string***REMOVED*** [ease=null] - Easing function. If not set it will default to Phaser.Easing.Default, which is Phaser.Easing.Linear.None by default but can be over-ridden.
    * @param ***REMOVED***boolean***REMOVED*** [autoStart=false] - Set to `true` to allow this tween to start automatically. Otherwise call Tween.start().
    * @param ***REMOVED***number***REMOVED*** [delay=0] - Delay before this tween will start in milliseconds. Defaults to 0, no delay.
    * @param ***REMOVED***number***REMOVED*** [repeat=0] - Should the tween automatically restart once complete? If you want it to run forever set as -1. This only effects this individual tween, not any chained tweens.
    * @param ***REMOVED***boolean***REMOVED*** [yoyo=false] - A tween that yoyos will reverse itself and play backwards automatically. A yoyo'd tween doesn't fire the Tween.onComplete event, so listen for Tween.onLoop instead.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** This Tween object.
    */
    from: function (properties, duration, ease, autoStart, delay, repeat, yoyo) ***REMOVED***

        if (duration === undefined) ***REMOVED*** duration = 1000; ***REMOVED***
        if (ease === undefined || ease === null) ***REMOVED*** ease = Phaser.Easing.Default; ***REMOVED***
        if (autoStart === undefined) ***REMOVED*** autoStart = false; ***REMOVED***
        if (delay === undefined) ***REMOVED*** delay = 0; ***REMOVED***
        if (repeat === undefined) ***REMOVED*** repeat = 0; ***REMOVED***
        if (yoyo === undefined) ***REMOVED*** yoyo = false; ***REMOVED***

        if (typeof ease === 'string' && this.manager.easeMap[ease])
        ***REMOVED***
            ease = this.manager.easeMap[ease];
        ***REMOVED***

        if (this.isRunning)
        ***REMOVED***
            console.warn('Phaser.Tween.from cannot be called after Tween.start');
            return this;
        ***REMOVED***

        this.timeline.push(new Phaser.TweenData(this).from(properties, duration, ease, delay, repeat, yoyo));

        if (autoStart)
        ***REMOVED***
            this.start();
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Starts the tween running. Can also be called by the autoStart parameter of `Tween.to` or `Tween.from`.
    * This sets the `Tween.isRunning` property to `true` and dispatches a `Tween.onStart` signal.
    * If the Tween has a delay set then nothing will start tweening until the delay has expired.
    *
    * @method Phaser.Tween#start
    * @param ***REMOVED***number***REMOVED*** [index=0] - If this Tween contains child tweens you can specify which one to start from. The default is zero, i.e. the first tween created.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** This tween. Useful for method chaining.
    */
    start: function (index) ***REMOVED***

        if (index === undefined) ***REMOVED*** index = 0; ***REMOVED***

        if (this.game === null || this.target === null || this.timeline.length === 0 || this.isRunning)
        ***REMOVED***
            return this;
        ***REMOVED***

        //  Populate the tween data
        for (var i = 0; i < this.timeline.length; i++)
        ***REMOVED***
            //  Build our master property list with the starting values
            for (var property in this.timeline[i].vEnd)
            ***REMOVED***
                this.properties[property] = this.target[property] || 0;

                if (!Array.isArray(this.properties[property]))
                ***REMOVED***
                    //  Ensures we're using numbers, not strings
                    this.properties[property] *= 1.0;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        for (var i = 0; i < this.timeline.length; i++)
        ***REMOVED***
            this.timeline[i].loadValues();
        ***REMOVED***

        this.manager.add(this);

        this.isRunning = true;

        if (index < 0 || index > this.timeline.length - 1)
        ***REMOVED***
            index = 0;
        ***REMOVED***

        this.current = index;

        this.timeline[this.current].start();

        return this;

    ***REMOVED***,

    /**
    * Stops the tween if running and flags it for deletion from the TweenManager.
    * If called directly the `Tween.onComplete` signal is not dispatched and no chained tweens are started unless the complete parameter is set to `true`.
    * If you just wish to pause a tween then use Tween.pause instead.
    *
    * @method Phaser.Tween#stop
    * @param ***REMOVED***boolean***REMOVED*** [complete=false] - Set to `true` to dispatch the Tween.onComplete signal.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** This tween. Useful for method chaining.
    */
    stop: function (complete) ***REMOVED***

        if (complete === undefined) ***REMOVED*** complete = false; ***REMOVED***

        this.isRunning = false;

        this._onUpdateCallback = null;
        this._onUpdateCallbackContext = null;

        if (complete)
        ***REMOVED***
            this.onComplete.dispatch(this.target, this);
            this._hasStarted = false;

            if (this.chainedTween)
            ***REMOVED***
                this.chainedTween.start();
            ***REMOVED***
        ***REMOVED***

        this.manager.remove(this);

        return this;

    ***REMOVED***,

    /**
    * Updates either a single TweenData or all TweenData objects properties to the given value.
    * Used internally by methods like Tween.delay, Tween.yoyo, etc. but can also be called directly if you know which property you want to tweak.
    * The property is not checked, so if you pass an invalid one you'll generate a run-time error.
    *
    * @method Phaser.Tween#updateTweenData
    * @param ***REMOVED***string***REMOVED*** property - The property to update.
    * @param ***REMOVED***number|function***REMOVED*** value - The value to set the property to.
    * @param ***REMOVED***number***REMOVED*** [index=0] - If this tween has more than one child this allows you to target a specific child. If set to -1 it will set the delay on all the children.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** This tween. Useful for method chaining.
    */
    updateTweenData: function (property, value, index) ***REMOVED***

        if (this.timeline.length === 0) ***REMOVED*** return this; ***REMOVED***

        if (index === undefined) ***REMOVED*** index = 0; ***REMOVED***

        if (index === -1)
        ***REMOVED***
            for (var i = 0; i < this.timeline.length; i++)
            ***REMOVED***
                this.timeline[i][property] = value;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            this.timeline[index][property] = value;
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Sets the delay in milliseconds before this tween will start. If there are child tweens it sets the delay before the first child starts.
    * The delay is invoked as soon as you call `Tween.start`. If the tween is already running this method doesn't do anything for the current active tween.
    * If you have not yet called `Tween.to` or `Tween.from` at least once then this method will do nothing, as there are no tweens to delay.
    * If you have child tweens and pass -1 as the index value it sets the delay across all of them.
    *
    * @method Phaser.Tween#delay
    * @param ***REMOVED***number***REMOVED*** duration - The amount of time in ms that the Tween should wait until it begins once started is called. Set to zero to remove any active delay.
    * @param ***REMOVED***number***REMOVED*** [index=0] - If this tween has more than one child this allows you to target a specific child. If set to -1 it will set the delay on all the children.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** This tween. Useful for method chaining.
    */
    delay: function (duration, index) ***REMOVED***

        return this.updateTweenData('delay', duration, index);

    ***REMOVED***,

    /**
    * Sets the number of times this tween will repeat.
    * If you have not yet called `Tween.to` or `Tween.from` at least once then this method will do nothing, as there are no tweens to repeat.
    * If you have child tweens and pass -1 as the index value it sets the number of times they'll repeat across all of them.
    * If you wish to define how many times this Tween and all children will repeat see Tween.repeatAll.
    *
    * @method Phaser.Tween#repeat
    * @param ***REMOVED***number***REMOVED*** total - How many times a tween should repeat before completing. Set to zero to remove an active repeat. Set to -1 to repeat forever.
    * @param ***REMOVED***number***REMOVED*** [repeat=0] - This is the amount of time to pause (in ms) before the repeat will start.
    * @param ***REMOVED***number***REMOVED*** [index=0] - If this tween has more than one child this allows you to target a specific child. If set to -1 it will set the repeat value on all the children.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** This tween. Useful for method chaining.
    */
    repeat: function (total, repeatDelay, index) ***REMOVED***

        if (repeatDelay === undefined) ***REMOVED*** repeatDelay = 0; ***REMOVED***

        this.updateTweenData('repeatCounter', total, index);

        return this.updateTweenData('repeatDelay', repeatDelay, index);

    ***REMOVED***,

    /**
    * Sets the delay in milliseconds before this tween will repeat itself.
    * The repeatDelay is invoked as soon as you call `Tween.start`. If the tween is already running this method doesn't do anything for the current active tween.
    * If you have not yet called `Tween.to` or `Tween.from` at least once then this method will do nothing, as there are no tweens to set repeatDelay on.
    * If you have child tweens and pass -1 as the index value it sets the repeatDelay across all of them.
    *
    * @method Phaser.Tween#repeatDelay
    * @param ***REMOVED***number***REMOVED*** duration - The amount of time in ms that the Tween should wait until it repeats or yoyos once start is called. Set to zero to remove any active repeatDelay.
    * @param ***REMOVED***number***REMOVED*** [index=0] - If this tween has more than one child this allows you to target a specific child. If set to -1 it will set the repeatDelay on all the children.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** This tween. Useful for method chaining.
    */
    repeatDelay: function (duration, index) ***REMOVED***

        return this.updateTweenData('repeatDelay', duration, index);

    ***REMOVED***,

    /**
    * A Tween that has yoyo set to true will run through from its starting values to its end values and then play back in reverse from end to start.
    * Used in combination with repeat you can create endless loops.
    * If you have not yet called `Tween.to` or `Tween.from` at least once then this method will do nothing, as there are no tweens to yoyo.
    * If you have child tweens and pass -1 as the index value it sets the yoyo property across all of them.
    * If you wish to yoyo this Tween and all of its children then see Tween.yoyoAll.
    *
    * @method Phaser.Tween#yoyo
    * @param ***REMOVED***boolean***REMOVED*** enable - Set to true to yoyo this tween, or false to disable an already active yoyo.
    * @param ***REMOVED***number***REMOVED*** [yoyoDelay=0] - This is the amount of time to pause (in ms) before the yoyo will start.
    * @param ***REMOVED***number***REMOVED*** [index=0] - If this tween has more than one child this allows you to target a specific child. If set to -1 it will set yoyo on all the children.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** This tween. Useful for method chaining.
    */
    yoyo: function(enable, yoyoDelay, index) ***REMOVED***

        if (yoyoDelay === undefined) ***REMOVED*** yoyoDelay = 0; ***REMOVED***

        this.updateTweenData('yoyo', enable, index);

        return this.updateTweenData('yoyoDelay', yoyoDelay, index);

    ***REMOVED***,

    /**
    * Sets the delay in milliseconds before this tween will run a yoyo (only applies if yoyo is enabled).
    * The repeatDelay is invoked as soon as you call `Tween.start`. If the tween is already running this method doesn't do anything for the current active tween.
    * If you have not yet called `Tween.to` or `Tween.from` at least once then this method will do nothing, as there are no tweens to set repeatDelay on.
    * If you have child tweens and pass -1 as the index value it sets the repeatDelay across all of them.
    *
    * @method Phaser.Tween#yoyoDelay
    * @param ***REMOVED***number***REMOVED*** duration - The amount of time in ms that the Tween should wait until it repeats or yoyos once start is called. Set to zero to remove any active yoyoDelay.
    * @param ***REMOVED***number***REMOVED*** [index=0] - If this tween has more than one child this allows you to target a specific child. If set to -1 it will set the yoyoDelay on all the children.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** This tween. Useful for method chaining.
    */
    yoyoDelay: function (duration, index) ***REMOVED***

        return this.updateTweenData('yoyoDelay', duration, index);

    ***REMOVED***,

    /**
    * Set easing function this tween will use, i.e. Phaser.Easing.Linear.None.
    * The ease function allows you define the rate of change. You can pass either a function such as Phaser.Easing.Circular.Out or a string such as "Circ".
    * ".easeIn", ".easeOut" and "easeInOut" variants are all supported for all ease types.
    * If you have child tweens and pass -1 as the index value it sets the easing function defined here across all of them.
    *
    * @method Phaser.Tween#easing
    * @param ***REMOVED***function|string***REMOVED*** ease - The easing function this tween will use, i.e. Phaser.Easing.Linear.None.
    * @param ***REMOVED***number***REMOVED*** [index=0] - If this tween has more than one child this allows you to target a specific child. If set to -1 it will set the easing function on all children.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** This tween. Useful for method chaining.
    */
    easing: function (ease, index) ***REMOVED***

        if (typeof ease === 'string' && this.manager.easeMap[ease])
        ***REMOVED***
            ease = this.manager.easeMap[ease];
        ***REMOVED***

        return this.updateTweenData('easingFunction', ease, index);

    ***REMOVED***,

    /**
    * Sets the interpolation function the tween will use. By default it uses Phaser.Math.linearInterpolation.
    * Also available: Phaser.Math.bezierInterpolation and Phaser.Math.catmullRomInterpolation.
    * The interpolation function is only used if the target properties is an array.
    * If you have child tweens and pass -1 as the index value and it will set the interpolation function across all of them.
    *
    * @method Phaser.Tween#interpolation
    * @param ***REMOVED***function***REMOVED*** interpolation - The interpolation function to use (Phaser.Math.linearInterpolation by default)
    * @param ***REMOVED***object***REMOVED*** [context] - The context under which the interpolation function will be run.
    * @param ***REMOVED***number***REMOVED*** [index=0] - If this tween has more than one child this allows you to target a specific child. If set to -1 it will set the interpolation function on all children.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** This tween. Useful for method chaining.
    */
    interpolation: function (interpolation, context, index) ***REMOVED***

        if (context === undefined) ***REMOVED*** context = Phaser.Math; ***REMOVED***

        this.updateTweenData('interpolationFunction', interpolation, index);

        return this.updateTweenData('interpolationContext', context, index);

    ***REMOVED***,

    /**
    * Set how many times this tween and all of its children will repeat.
    * A tween (A) with 3 children (B,C,D) with a `repeatAll` value of 2 would play as: ABCDABCD before completing.
    *
    * @method Phaser.Tween#repeatAll
    * @param ***REMOVED***number***REMOVED*** [total=0] - How many times this tween and all children should repeat before completing. Set to zero to remove an active repeat. Set to -1 to repeat forever.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** This tween. Useful for method chaining.
    */
    repeatAll: function (total) ***REMOVED***

        if (total === undefined) ***REMOVED*** total = 0; ***REMOVED***

        this.repeatCounter = total;

        return this;

    ***REMOVED***,

    /**
    * This method allows you to chain tweens together. Any tween chained to this tween will have its `Tween.start` method called
    * as soon as this tween completes. If this tween never completes (i.e. repeatAll or loop is set) then the chain will never progress.
    * Note that `Tween.onComplete` will fire when *this* tween completes, not when the whole chain completes.
    * For that you should listen to `onComplete` on the final tween in your chain.
    *
    * If you pass multiple tweens to this method they will be joined into a single long chain.
    * For example if this is Tween A and you pass in B, C and D then B will be chained to A, C will be chained to B and D will be chained to C.
    * Any previously chained tweens that may have been set will be overwritten.
    *
    * @method Phaser.Tween#chain
    * @param ***REMOVED***...Phaser.Tween***REMOVED*** tweens - One or more tweens that will be chained to this one.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** This tween. Useful for method chaining.
    */
    chain: function () ***REMOVED***

        var i = arguments.length;

        while (i--)
        ***REMOVED***
            if (i > 0)
            ***REMOVED***
                arguments[i - 1].chainedTween = arguments[i];
            ***REMOVED***
            else
            ***REMOVED***
                this.chainedTween = arguments[i];
            ***REMOVED***
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Enables the looping of this tween. The tween will loop forever, and onComplete will never fire.
    *
    * If `value` is `true` then this is the same as setting `Tween.repeatAll(-1)`.
    * If `value` is `false` it is the same as setting `Tween.repeatAll(0)` and will reset the `repeatCounter` to zero.
    *
    * Usage:
    * game.add.tween(p).to(***REMOVED*** x: 700 ***REMOVED***, 1000, Phaser.Easing.Linear.None, true)
    * .to(***REMOVED*** y: 300 ***REMOVED***, 1000, Phaser.Easing.Linear.None)
    * .to(***REMOVED*** x: 0 ***REMOVED***, 1000, Phaser.Easing.Linear.None)
    * .to(***REMOVED*** y: 0 ***REMOVED***, 1000, Phaser.Easing.Linear.None)
    * .loop();
    * @method Phaser.Tween#loop
    * @param ***REMOVED***boolean***REMOVED*** [value=true] - If `true` this tween will loop once it reaches the end. Set to `false` to remove an active loop.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** This tween. Useful for method chaining.
    */
    loop: function (value) ***REMOVED***

        if (value === undefined) ***REMOVED*** value = true; ***REMOVED***

        this.repeatCounter = (value) ? -1 : 0;

        return this;

    ***REMOVED***,

    /**
    * Sets a callback to be fired each time this tween updates.
    *
    * @method Phaser.Tween#onUpdateCallback
    * @param ***REMOVED***function***REMOVED*** callback - The callback to invoke each time this tween is updated. Set to `null` to remove an already active callback.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context in which to call the onUpdate callback.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** This tween. Useful for method chaining.
    */
    onUpdateCallback: function (callback, callbackContext) ***REMOVED***

        this._onUpdateCallback = callback;
        this._onUpdateCallbackContext = callbackContext;

        return this;

    ***REMOVED***,

    /**
    * Pauses the tween. Resume playback with Tween.resume.
    *
    * @method Phaser.Tween#pause
    */
    pause: function () ***REMOVED***

        this.isPaused = true;

        this._codePaused = true;

        this._pausedTime = this.game.time.time;

    ***REMOVED***,

    /**
    * This is called by the core Game loop. Do not call it directly, instead use Tween.pause.
    *
    * @private
    * @method Phaser.Tween#_pause
    */
    _pause: function () ***REMOVED***

        if (!this._codePaused)
        ***REMOVED***
            this.isPaused = true;

            this._pausedTime = this.game.time.time;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Resumes a paused tween.
    *
    * @method Phaser.Tween#resume
    */
    resume: function () ***REMOVED***

        if (this.isPaused)
        ***REMOVED***
            this.isPaused = false;

            this._codePaused = false;

            for (var i = 0; i < this.timeline.length; i++)
            ***REMOVED***
                if (!this.timeline[i].isRunning)
                ***REMOVED***
                    this.timeline[i].startTime += (this.game.time.time - this._pausedTime);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * This is called by the core Game loop. Do not call it directly, instead use Tween.pause.
    * @method Phaser.Tween#_resume
    * @private
    */
    _resume: function () ***REMOVED***

        if (this._codePaused)
        ***REMOVED***
            return;
        ***REMOVED***
        else
        ***REMOVED***
            this.resume();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Core tween update function called by the TweenManager. Does not need to be invoked directly.
    *
    * @method Phaser.Tween#update
    * @param ***REMOVED***number***REMOVED*** time - A timestamp passed in by the TweenManager.
    * @return ***REMOVED***boolean***REMOVED*** false if the tween and all child tweens have completed and should be deleted from the manager, otherwise true (still active).
    */
    update: function (time) ***REMOVED***

        if (this.pendingDelete || !this.target)
        ***REMOVED***
            return false;
        ***REMOVED***

        if (this.isPaused)
        ***REMOVED***
            return true;
        ***REMOVED***

        var status = this.timeline[this.current].update(time);

        if (status === Phaser.TweenData.PENDING)
        ***REMOVED***
            return true;
        ***REMOVED***
        else if (status === Phaser.TweenData.RUNNING)
        ***REMOVED***
            if (!this._hasStarted)
            ***REMOVED***
                this.onStart.dispatch(this.target, this);
                this._hasStarted = true;
            ***REMOVED***

            if (this._onUpdateCallback !== null)
            ***REMOVED***
                this._onUpdateCallback.call(this._onUpdateCallbackContext, this, this.timeline[this.current].value, this.timeline[this.current]);
            ***REMOVED***

            //  In case the update callback modifies this tween
            return this.isRunning;
        ***REMOVED***
        else if (status === Phaser.TweenData.LOOPED)
        ***REMOVED***
            if (this.timeline[this.current].repeatCounter === -1)
            ***REMOVED***
                this.onLoop.dispatch(this.target, this);
            ***REMOVED***
            else
            ***REMOVED***
                this.onRepeat.dispatch(this.target, this);
            ***REMOVED***

            return true;
        ***REMOVED***
        else if (status === Phaser.TweenData.COMPLETE)
        ***REMOVED***
            var complete = false;

            //  What now?
            if (this.reverse)
            ***REMOVED***
                this.current--;

                if (this.current < 0)
                ***REMOVED***
                    this.current = this.timeline.length - 1;
                    complete = true;
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                this.current++;

                if (this.current === this.timeline.length)
                ***REMOVED***
                    this.current = 0;
                    complete = true;
                ***REMOVED***
            ***REMOVED***

            if (complete)
            ***REMOVED***
                //  We've reached the start or end of the child tweens (depending on Tween.reverse), should we repeat it?
                if (this.repeatCounter === -1)
                ***REMOVED***
                    this.timeline[this.current].start();
                    this.onLoop.dispatch(this.target, this);
                    return true;
                ***REMOVED***
                else if (this.repeatCounter > 0)
                ***REMOVED***
                    this.repeatCounter--;

                    this.timeline[this.current].start();
                    this.onRepeat.dispatch(this.target, this);
                    return true;
                ***REMOVED***
                else
                ***REMOVED***
                    //  No more repeats and no more children, so we're done
                    this.isRunning = false;
                    this.onComplete.dispatch(this.target, this);
                    this._hasStarted = false;

                    if (this.chainedTween)
                    ***REMOVED***
                        this.chainedTween.start();
                    ***REMOVED***

                    return false;
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                //  We've still got some children to go
                this.onChildComplete.dispatch(this.target, this);
                this.timeline[this.current].start();
                return true;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * This will generate an array populated with the tweened object values from start to end.
    * It works by running the tween simulation at the given frame rate based on the values set-up in Tween.to and Tween.from.
    * It ignores delay and repeat counts and any chained tweens, but does include child tweens.
    * Just one play through of the tween data is returned, including yoyo if set.
    *
    * @method Phaser.Tween#generateData
    * @param ***REMOVED***number***REMOVED*** [frameRate=60] - The speed in frames per second that the data should be generated at. The higher the value, the larger the array it creates.
    * @param ***REMOVED***array***REMOVED*** [data] - If given the generated data will be appended to this array, otherwise a new array will be returned.
    * @return ***REMOVED***array***REMOVED*** An array of tweened values.
    */
    generateData: function (frameRate, data) ***REMOVED***

        if (this.game === null || this.target === null)
        ***REMOVED***
            return null;
        ***REMOVED***

        if (frameRate === undefined) ***REMOVED*** frameRate = 60; ***REMOVED***
        if (data === undefined) ***REMOVED*** data = []; ***REMOVED***

        //  Populate the tween data
        for (var i = 0; i < this.timeline.length; i++)
        ***REMOVED***
            //  Build our master property list with the starting values
            for (var property in this.timeline[i].vEnd)
            ***REMOVED***
                this.properties[property] = this.target[property] || 0;

                if (!Array.isArray(this.properties[property]))
                ***REMOVED***
                    //  Ensures we're using numbers, not strings
                    this.properties[property] *= 1.0;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        for (var i = 0; i < this.timeline.length; i++)
        ***REMOVED***
            this.timeline[i].loadValues();
        ***REMOVED***

        for (var i = 0; i < this.timeline.length; i++)
        ***REMOVED***
            data = data.concat(this.timeline[i].generateData(frameRate));
        ***REMOVED***

        return data;

    ***REMOVED***

***REMOVED***;

/**
* @name Phaser.Tween#totalDuration
* @property ***REMOVED***Phaser.TweenData***REMOVED*** totalDuration - Gets the total duration of this Tween, including all child tweens, in milliseconds.
*/
Object.defineProperty(Phaser.Tween.prototype, 'totalDuration', ***REMOVED***

    get: function () ***REMOVED***

        var total = 0;

        for (var i = 0; i < this.timeline.length; i++)
        ***REMOVED***
            total += this.timeline[i].duration;
        ***REMOVED***

        return total;

    ***REMOVED***

***REMOVED***);

Phaser.Tween.prototype.constructor = Phaser.Tween;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Phaser.Tween contains at least one TweenData object. It contains all of the tween data values, such as the
* starting and ending values, the ease function, interpolation and duration. The Tween acts as a timeline manager for
* TweenData objects and can contain multiple TweenData objects.
*
* @class Phaser.TweenData
* @constructor
* @param ***REMOVED***Phaser.Tween***REMOVED*** parent - The Tween that owns this TweenData object.
*/
Phaser.TweenData = function (parent) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Tween***REMOVED*** parent - The Tween which owns this TweenData.
    */
    this.parent = parent;

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running Game.
    */
    this.game = parent.game;

    /**
    * @property ***REMOVED***object***REMOVED*** vStart - An object containing the values at the start of the tween.
    * @private
    */
    this.vStart = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***object***REMOVED*** vStartCache - Cached starting values.
    * @private
    */
    this.vStartCache = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***object***REMOVED*** vEnd - An object containing the values at the end of the tween.
    * @private
    */
    this.vEnd = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***object***REMOVED*** vEndCache - Cached ending values.
    * @private
    */
    this.vEndCache = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***number***REMOVED*** duration - The duration of the tween in ms.
    * @default
    */
    this.duration = 1000;

    /**
    * @property ***REMOVED***number***REMOVED*** percent - A value between 0 and 1 that represents how far through the duration this tween is.
    * @readonly
    */
    this.percent = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** value - The current calculated value.
    * @readonly
    */
    this.value = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** repeatCounter - If the Tween is set to repeat this contains the current repeat count.
    */
    this.repeatCounter = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** repeatDelay - The amount of time in ms between repeats of this tween.
    */
    this.repeatDelay = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** repeatTotal - The total number of times this Tween will repeat.
    * @readonly
    */
    this.repeatTotal = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** interpolate - True if the Tween will use interpolation (i.e. is an Array to Array tween)
    * @default
    */
    this.interpolate = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** yoyo - True if the Tween is set to yoyo, otherwise false.
    * @default
    */
    this.yoyo = false;

    /**
    * @property ***REMOVED***number***REMOVED*** yoyoDelay - The amount of time in ms between yoyos of this tween.
    */
    this.yoyoDelay = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** inReverse - When a Tween is yoyoing this value holds if it's currently playing forwards (false) or in reverse (true).
    * @default
    */
    this.inReverse = false;

    /**
    * @property ***REMOVED***number***REMOVED*** delay - The amount to delay by until the Tween starts (in ms). Only applies to the start, use repeatDelay to handle repeats.
    * @default
    */
    this.delay = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** dt - Current time value.
    */
    this.dt = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** startTime - The time the Tween started or null if it hasn't yet started.
    */
    this.startTime = null;

    /**
    * @property ***REMOVED***function***REMOVED*** easingFunction - The easing function used for the Tween.
    * @default Phaser.Easing.Default
    */
    this.easingFunction = Phaser.Easing.Default;

    /**
    * @property ***REMOVED***function***REMOVED*** interpolationFunction - The interpolation function used for the Tween.
    * @default Phaser.Math.linearInterpolation
    */
    this.interpolationFunction = Phaser.Math.linearInterpolation;

    /**
    * @property ***REMOVED***object***REMOVED*** interpolationContext - The interpolation function context used for the Tween.
    * @default Phaser.Math
    */
    this.interpolationContext = Phaser.Math;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isRunning - If the tween is running this is set to `true`. Unless Phaser.Tween a TweenData that is waiting for a delay to expire is *not* considered as running.
    * @default
    */
    this.isRunning = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isFrom - Is this a from tween or a to tween?
    * @default
    */
    this.isFrom = false;

***REMOVED***;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.TweenData.PENDING = 0;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.TweenData.RUNNING = 1;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.TweenData.LOOPED = 2;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.TweenData.COMPLETE = 3;

Phaser.TweenData.prototype = ***REMOVED***

    /**
    * Sets this tween to be a `to` tween on the properties given. A `to` tween starts at the current value and tweens to the destination value given.
    * For example a Sprite with an `x` coordinate of 100 could be tweened to `x` 200 by giving a properties object of `***REMOVED*** x: 200 ***REMOVED***`.
    *
    * @method Phaser.TweenData#to
    * @param ***REMOVED***object***REMOVED*** properties - The properties you want to tween, such as `Sprite.x` or `Sound.volume`. Given as a JavaScript object.
    * @param ***REMOVED***number***REMOVED*** [duration=1000] - Duration of this tween in ms.
    * @param ***REMOVED***function***REMOVED*** [ease=null] - Easing function. If not set it will default to Phaser.Easing.Default, which is Phaser.Easing.Linear.None by default but can be over-ridden at will.
    * @param ***REMOVED***number***REMOVED*** [delay=0] - Delay before this tween will start, defaults to 0 (no delay). Value given is in ms.
    * @param ***REMOVED***number***REMOVED*** [repeat=0] - Should the tween automatically restart once complete? If you want it to run forever set as -1. This ignores any chained tweens.
    * @param ***REMOVED***boolean***REMOVED*** [yoyo=false] - A tween that yoyos will reverse itself and play backwards automatically. A yoyo'd tween doesn't fire the Tween.onComplete event, so listen for Tween.onLoop instead.
    * @return ***REMOVED***Phaser.TweenData***REMOVED*** This Tween object.
    */
    to: function (properties, duration, ease, delay, repeat, yoyo) ***REMOVED***

        this.vEnd = properties;
        this.duration = duration;
        this.easingFunction = ease;
        this.delay = delay;
        this.repeatTotal = repeat;
        this.yoyo = yoyo;

        this.isFrom = false;

        return this;

    ***REMOVED***,

    /**
    * Sets this tween to be a `from` tween on the properties given. A `from` tween sets the target to the destination value and tweens to its current value.
    * For example a Sprite with an `x` coordinate of 100 tweened from `x` 500 would be set to `x` 500 and then tweened to `x` 100 by giving a properties object of `***REMOVED*** x: 500 ***REMOVED***`.
    *
    * @method Phaser.TweenData#from
    * @param ***REMOVED***object***REMOVED*** properties - The properties you want to tween, such as `Sprite.x` or `Sound.volume`. Given as a JavaScript object.
    * @param ***REMOVED***number***REMOVED*** [duration=1000] - Duration of this tween in ms.
    * @param ***REMOVED***function***REMOVED*** [ease=null] - Easing function. If not set it will default to Phaser.Easing.Default, which is Phaser.Easing.Linear.None by default but can be over-ridden at will.
    * @param ***REMOVED***number***REMOVED*** [delay=0] - Delay before this tween will start, defaults to 0 (no delay). Value given is in ms.
    * @param ***REMOVED***number***REMOVED*** [repeat=0] - Should the tween automatically restart once complete? If you want it to run forever set as -1. This ignores any chained tweens.
    * @param ***REMOVED***boolean***REMOVED*** [yoyo=false] - A tween that yoyos will reverse itself and play backwards automatically. A yoyo'd tween doesn't fire the Tween.onComplete event, so listen for Tween.onLoop instead.
    * @return ***REMOVED***Phaser.TweenData***REMOVED*** This Tween object.
    */
    from: function (properties, duration, ease, delay, repeat, yoyo) ***REMOVED***

        this.vEnd = properties;
        this.duration = duration;
        this.easingFunction = ease;
        this.delay = delay;
        this.repeatTotal = repeat;
        this.yoyo = yoyo;

        this.isFrom = true;

        return this;

    ***REMOVED***,

    /**
    * Starts the Tween running.
    *
    * @method Phaser.TweenData#start
    * @return ***REMOVED***Phaser.TweenData***REMOVED*** This Tween object.
    */
    start: function () ***REMOVED***

        this.startTime = this.game.time.time + this.delay;

        if (this.parent.reverse)
        ***REMOVED***
            this.dt = this.duration;
        ***REMOVED***
        else
        ***REMOVED***
            this.dt = 0;
        ***REMOVED***

        if (this.delay > 0)
        ***REMOVED***
            this.isRunning = false;
        ***REMOVED***
        else
        ***REMOVED***
            this.isRunning = true;
        ***REMOVED***

        if (this.isFrom)
        ***REMOVED***
            //  Reverse them all and instant set them
            for (var property in this.vStartCache)
            ***REMOVED***
                this.vStart[property] = this.vEndCache[property];
                this.vEnd[property] = this.vStartCache[property];
                this.parent.target[property] = this.vStart[property];
            ***REMOVED***
        ***REMOVED***

        this.value = 0;
        this.yoyoCounter = 0;
        this.repeatCounter = this.repeatTotal;

        return this;

    ***REMOVED***,

    /**
    * Loads the values from the target object into this Tween.
    *
    * @private
    * @method Phaser.TweenData#loadValues
    * @return ***REMOVED***Phaser.TweenData***REMOVED*** This Tween object.
    */
    loadValues: function () ***REMOVED***

        for (var property in this.parent.properties)
        ***REMOVED***
            //  Load the property from the parent object
            this.vStart[property] = this.parent.properties[property];

            //  Check if an Array was provided as property value
            if (Array.isArray(this.vEnd[property]))
            ***REMOVED***
                if (this.vEnd[property].length === 0)
                ***REMOVED***
                    continue;
                ***REMOVED***

                if (this.percent === 0)
                ***REMOVED***
                    //  Put the start value at the beginning of the array
                    //  but we only want to do this once, if the Tween hasn't run before
                    this.vEnd[property] = [this.vStart[property]].concat(this.vEnd[property]);
                ***REMOVED***
            ***REMOVED***

            if (typeof this.vEnd[property] !== 'undefined')
            ***REMOVED***
                if (typeof this.vEnd[property] === 'string')
                ***REMOVED***
                    //  Parses relative end values with start as base (e.g.: +10, -3)
                    this.vEnd[property] = this.vStart[property] + parseFloat(this.vEnd[property], 10);
                ***REMOVED***

                this.parent.properties[property] = this.vEnd[property];
            ***REMOVED***
            else
            ***REMOVED***
                //  Null tween
                this.vEnd[property] = this.vStart[property];
            ***REMOVED***

            this.vStartCache[property] = this.vStart[property];
            this.vEndCache[property] = this.vEnd[property];
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Updates this Tween. This is called automatically by Phaser.Tween.
    *
    * @protected
    * @method Phaser.TweenData#update
    * @param ***REMOVED***number***REMOVED*** time - A timestamp passed in by the Tween parent.
    * @return ***REMOVED***number***REMOVED*** The current status of this Tween. One of the Phaser.TweenData constants: PENDING, RUNNING, LOOPED or COMPLETE.
    */
    update: function (time) ***REMOVED***

        if (!this.isRunning)
        ***REMOVED***
            if (time >= this.startTime)
            ***REMOVED***
                this.isRunning = true;
            ***REMOVED***
            else
            ***REMOVED***
                return Phaser.TweenData.PENDING;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  Is Running, but is waiting to repeat
            if (time < this.startTime)
            ***REMOVED***
                return Phaser.TweenData.RUNNING;
            ***REMOVED***
        ***REMOVED***

        var ms = (this.parent.frameBased) ? this.game.time.physicsElapsedMS : this.game.time.elapsedMS;

        if (this.parent.reverse)
        ***REMOVED***
            this.dt -= ms * this.parent.timeScale;
            this.dt = Math.max(this.dt, 0);
        ***REMOVED***
        else
        ***REMOVED***
            this.dt += ms * this.parent.timeScale;
            this.dt = Math.min(this.dt, this.duration);
        ***REMOVED***

        this.percent = this.dt / this.duration;

        this.value = this.easingFunction(this.percent);

        for (var property in this.vEnd)
        ***REMOVED***
            var start = this.vStart[property];
            var end = this.vEnd[property];

            if (Array.isArray(end))
            ***REMOVED***
                this.parent.target[property] = this.interpolationFunction.call(this.interpolationContext, end, this.value);
            ***REMOVED***
            else
            ***REMOVED***
                this.parent.target[property] = start + ((end - start) * this.value);
            ***REMOVED***
        ***REMOVED***

        if ((!this.parent.reverse && this.percent === 1) || (this.parent.reverse && this.percent === 0))
        ***REMOVED***
            return this.repeat();
        ***REMOVED***
        
        return Phaser.TweenData.RUNNING;

    ***REMOVED***,

    /**
    * This will generate an array populated with the tweened object values from start to end.
    * It works by running the tween simulation at the given frame rate based on the values set-up in Tween.to and Tween.from.
    * Just one play through of the tween data is returned, including yoyo if set.
    *
    * @method Phaser.TweenData#generateData
    * @param ***REMOVED***number***REMOVED*** [frameRate=60] - The speed in frames per second that the data should be generated at. The higher the value, the larger the array it creates.
    * @return ***REMOVED***array***REMOVED*** An array of tweened values.
    */
    generateData: function (frameRate) ***REMOVED***

        if (this.parent.reverse)
        ***REMOVED***
            this.dt = this.duration;
        ***REMOVED***
        else
        ***REMOVED***
            this.dt = 0;
        ***REMOVED***

        var data = [];
        var complete = false;
        var fps = (1 / frameRate) * 1000;

        do
        ***REMOVED***
            if (this.parent.reverse)
            ***REMOVED***
                this.dt -= fps;
                this.dt = Math.max(this.dt, 0);
            ***REMOVED***
            else
            ***REMOVED***
                this.dt += fps;
                this.dt = Math.min(this.dt, this.duration);
            ***REMOVED***

            this.percent = this.dt / this.duration;

            this.value = this.easingFunction(this.percent);

            var blob = ***REMOVED******REMOVED***;

            for (var property in this.vEnd)
            ***REMOVED***
                var start = this.vStart[property];
                var end = this.vEnd[property];

                if (Array.isArray(end))
                ***REMOVED***
                    blob[property] = this.interpolationFunction(end, this.value);
                ***REMOVED***
                else
                ***REMOVED***
                    blob[property] = start + ((end - start) * this.value);
                ***REMOVED***
            ***REMOVED***

            data.push(blob);

            if ((!this.parent.reverse && this.percent === 1) || (this.parent.reverse && this.percent === 0))
            ***REMOVED***
                complete = true;
            ***REMOVED***

        ***REMOVED*** while (!complete);

        if (this.yoyo)
        ***REMOVED***
            var reversed = data.slice();
            reversed.reverse();
            data = data.concat(reversed);
        ***REMOVED***

        return data;

    ***REMOVED***,

    /**
    * Checks if this Tween is meant to repeat or yoyo and handles doing so.
    *
    * @private
    * @method Phaser.TweenData#repeat
    * @return ***REMOVED***number***REMOVED*** Either Phaser.TweenData.LOOPED or Phaser.TweenData.COMPLETE.
    */
    repeat: function () ***REMOVED***

        //  If not a yoyo and repeatCounter = 0 then we're done
        if (this.yoyo)
        ***REMOVED***
            //  We're already in reverse mode, which means the yoyo has finished and there's no repeats, so end
            if (this.inReverse && this.repeatCounter === 0)
            ***REMOVED***
                //  Restore the properties
                for (var property in this.vStartCache)
                ***REMOVED***
                    this.vStart[property] = this.vStartCache[property];
                    this.vEnd[property] = this.vEndCache[property];
                ***REMOVED***

                this.inReverse = false;

                return Phaser.TweenData.COMPLETE;
            ***REMOVED***

            this.inReverse = !this.inReverse;
        ***REMOVED***
        else
        ***REMOVED***
            if (this.repeatCounter === 0)
            ***REMOVED***
                return Phaser.TweenData.COMPLETE;
            ***REMOVED***
        ***REMOVED***

        if (this.inReverse)
        ***REMOVED***
            //  If inReverse we're going from vEnd to vStartCache
            for (var property in this.vStartCache)
            ***REMOVED***
                this.vStart[property] = this.vEndCache[property];
                this.vEnd[property] = this.vStartCache[property];
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  If not inReverse we're just repopulating the cache again
            for (var property in this.vStartCache)
            ***REMOVED***
                this.vStart[property] = this.vStartCache[property];
                this.vEnd[property] = this.vEndCache[property];
            ***REMOVED***

            //  -1 means repeat forever, otherwise decrement the repeatCounter
            //  We only decrement this counter if the tween isn't doing a yoyo, as that doesn't count towards the repeat total
            if (this.repeatCounter > 0)
            ***REMOVED***
                this.repeatCounter--;
            ***REMOVED***
        ***REMOVED***

        this.startTime = this.game.time.time;

        if (this.yoyo && this.inReverse)
        ***REMOVED***
            this.startTime += this.yoyoDelay;
        ***REMOVED***
        else if (!this.inReverse)
        ***REMOVED***
            this.startTime += this.repeatDelay;
        ***REMOVED***

        if (this.parent.reverse)
        ***REMOVED***
            this.dt = this.duration;
        ***REMOVED***
        else
        ***REMOVED***
            this.dt = 0;
        ***REMOVED***

        return Phaser.TweenData.LOOPED;

    ***REMOVED***

***REMOVED***;

Phaser.TweenData.prototype.constructor = Phaser.TweenData;

/* jshint curly: false */

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A collection of easing methods defining ease-in and ease-out curves.
*
* @class Phaser.Easing
*/
Phaser.Easing = ***REMOVED***

    /**
    * Linear easing.
    *
    * @class Phaser.Easing.Linear
    */
    Linear: ***REMOVED***

        /**
        * Linear Easing (no variation).
        *
        * @method Phaser.Easing.Linear#None
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** k.
        */
        None: function ( k ) ***REMOVED***

            return k;

        ***REMOVED***

    ***REMOVED***,

    /**
    * Quadratic easing.
    *
    * @class Phaser.Easing.Quadratic
    */
    Quadratic: ***REMOVED***

        /**
        * Ease-in.
        *
        * @method Phaser.Easing.Quadratic#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** k^2.
        */
        In: function ( k ) ***REMOVED***

            return k * k;

        ***REMOVED***,

        /**
        * Ease-out.
        *
        * @method Phaser.Easing.Quadratic#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** k* (2-k).
        */
        Out: function ( k ) ***REMOVED***

            return k * ( 2 - k );

        ***REMOVED***,

        /**
        * Ease-in/out.
        *
        * @method Phaser.Easing.Quadratic#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            if ( ( k *= 2 ) < 1 ) return 0.5 * k * k;
            return - 0.5 * ( --k * ( k - 2 ) - 1 );

        ***REMOVED***

    ***REMOVED***,

    /**
    * Cubic easing.
    *
    * @class Phaser.Easing.Cubic
    */
    Cubic: ***REMOVED***

        /**
        * Cubic ease-in.
        *
        * @method Phaser.Easing.Cubic#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            return k * k * k;

        ***REMOVED***,

        /**
        * Cubic ease-out.
        *
        * @method Phaser.Easing.Cubic#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            return --k * k * k + 1;

        ***REMOVED***,

        /**
        * Cubic ease-in/out.
        *
        * @method Phaser.Easing.Cubic#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k;
            return 0.5 * ( ( k -= 2 ) * k * k + 2 );

        ***REMOVED***

    ***REMOVED***,

    /**
    * Quartic easing.
    *
    * @class Phaser.Easing.Quartic
    */
    Quartic: ***REMOVED***

        /**
        * Quartic ease-in.
        *
        * @method Phaser.Easing.Quartic#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            return k * k * k * k;

        ***REMOVED***,

        /**
        * Quartic ease-out.
        *
        * @method Phaser.Easing.Quartic#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            return 1 - ( --k * k * k * k );

        ***REMOVED***,

        /**
        * Quartic ease-in/out.
        *
        * @method Phaser.Easing.Quartic#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            if ( ( k *= 2 ) < 1) return 0.5 * k * k * k * k;
            return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );

        ***REMOVED***

    ***REMOVED***,

    /**
    * Quintic easing.
    *
    * @class Phaser.Easing.Quintic
    */
    Quintic: ***REMOVED***

        /**
        * Quintic ease-in.
        *
        * @method Phaser.Easing.Quintic#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            return k * k * k * k * k;

        ***REMOVED***,

        /**
        * Quintic ease-out.
        *
        * @method Phaser.Easing.Quintic#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            return --k * k * k * k * k + 1;

        ***REMOVED***,

        /**
        * Quintic ease-in/out.
        *
        * @method Phaser.Easing.Quintic#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k * k * k;
            return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );

        ***REMOVED***

    ***REMOVED***,

    /**
    * Sinusoidal easing.
    *
    * @class Phaser.Easing.Sinusoidal
    */
    Sinusoidal: ***REMOVED***

        /**
        * Sinusoidal ease-in.
        *
        * @method Phaser.Easing.Sinusoidal#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            if (k === 0) return 0;
            if (k === 1) return 1;
            return 1 - Math.cos( k * Math.PI / 2 );

        ***REMOVED***,

        /**
        * Sinusoidal ease-out.
        *
        * @method Phaser.Easing.Sinusoidal#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            if (k === 0) return 0;
            if (k === 1) return 1;
            return Math.sin( k * Math.PI / 2 );

        ***REMOVED***,

        /**
        * Sinusoidal ease-in/out.
        *
        * @method Phaser.Easing.Sinusoidal#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            if (k === 0) return 0;
            if (k === 1) return 1;
            return 0.5 * ( 1 - Math.cos( Math.PI * k ) );

        ***REMOVED***

    ***REMOVED***,

    /**
    * Exponential easing.
    *
    * @class Phaser.Easing.Exponential
    */
    Exponential: ***REMOVED***

        /**
        * Exponential ease-in.
        *
        * @method Phaser.Easing.Exponential#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            return k === 0 ? 0 : Math.pow( 1024, k - 1 );

        ***REMOVED***,

        /**
        * Exponential ease-out.
        *
        * @method Phaser.Easing.Exponential#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            return k === 1 ? 1 : 1 - Math.pow( 2, - 10 * k );

        ***REMOVED***,

        /**
        * Exponential ease-in/out.
        *
        * @method Phaser.Easing.Exponential#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            if ( k === 0 ) return 0;
            if ( k === 1 ) return 1;
            if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 1024, k - 1 );
            return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );

        ***REMOVED***

    ***REMOVED***,

    /**
    * Circular easing.
    *
    * @class Phaser.Easing.Circular
    */
    Circular: ***REMOVED***

        /**
        * Circular ease-in.
        *
        * @method Phaser.Easing.Circular#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            return 1 - Math.sqrt( 1 - k * k );

        ***REMOVED***,

        /**
        * Circular ease-out.
        *
        * @method Phaser.Easing.Circular#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            return Math.sqrt( 1 - ( --k * k ) );

        ***REMOVED***,

        /**
        * Circular ease-in/out.
        *
        * @method Phaser.Easing.Circular#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            if ( ( k *= 2 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
            return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);

        ***REMOVED***

    ***REMOVED***,

    /**
    * Elastic easing.
    *
    * @class Phaser.Easing.Elastic
    */
    Elastic: ***REMOVED***

        /**
        * Elastic ease-in.
        *
        * @method Phaser.Easing.Elastic#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            var s, a = 0.1, p = 0.4;
            if ( k === 0 ) return 0;
            if ( k === 1 ) return 1;
            if ( !a || a < 1 ) ***REMOVED*** a = 1; s = p / 4; ***REMOVED***
            else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
            return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

        ***REMOVED***,

        /**
        * Elastic ease-out.
        *
        * @method Phaser.Easing.Elastic#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            var s, a = 0.1, p = 0.4;
            if ( k === 0 ) return 0;
            if ( k === 1 ) return 1;
            if ( !a || a < 1 ) ***REMOVED*** a = 1; s = p / 4; ***REMOVED***
            else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
            return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

        ***REMOVED***,

        /**
        * Elastic ease-in/out.
        *
        * @method Phaser.Easing.Elastic#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            var s, a = 0.1, p = 0.4;
            if ( k === 0 ) return 0;
            if ( k === 1 ) return 1;
            if ( !a || a < 1 ) ***REMOVED*** a = 1; s = p / 4; ***REMOVED***
            else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
            if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
            return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

        ***REMOVED***

    ***REMOVED***,

    /**
    * Back easing.
    *
    * @class Phaser.Easing.Back
    */
    Back: ***REMOVED***

        /**
        * Back ease-in.
        *
        * @method Phaser.Easing.Back#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            var s = 1.70158;
            return k * k * ( ( s + 1 ) * k - s );

        ***REMOVED***,

        /**
        * Back ease-out.
        *
        * @method Phaser.Easing.Back#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            var s = 1.70158;
            return --k * k * ( ( s + 1 ) * k + s ) + 1;

        ***REMOVED***,

        /**
        * Back ease-in/out.
        *
        * @method Phaser.Easing.Back#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            var s = 1.70158 * 1.525;
            if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
            return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

        ***REMOVED***

    ***REMOVED***,

    /**
    * Bounce easing.
    *
    * @class Phaser.Easing.Bounce
    */
    Bounce: ***REMOVED***

        /**
        * Bounce ease-in.
        *
        * @method Phaser.Easing.Bounce#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            return 1 - Phaser.Easing.Bounce.Out( 1 - k );

        ***REMOVED***,

        /**
        * Bounce ease-out.
        *
        * @method Phaser.Easing.Bounce#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            if ( k < ( 1 / 2.75 ) ) ***REMOVED***

                return 7.5625 * k * k;

            ***REMOVED*** else if ( k < ( 2 / 2.75 ) ) ***REMOVED***

                return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;

            ***REMOVED*** else if ( k < ( 2.5 / 2.75 ) ) ***REMOVED***

                return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;

            ***REMOVED*** else ***REMOVED***

                return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;

            ***REMOVED***

        ***REMOVED***,

        /**
        * Bounce ease-in/out.
        *
        * @method Phaser.Easing.Bounce#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            if ( k < 0.5 ) return Phaser.Easing.Bounce.In( k * 2 ) * 0.5;
            return Phaser.Easing.Bounce.Out( k * 2 - 1 ) * 0.5 + 0.5;

        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.Easing.Default = Phaser.Easing.Linear.None;
Phaser.Easing.Power0 = Phaser.Easing.Linear.None;
Phaser.Easing.Power1 = Phaser.Easing.Quadratic.Out;
Phaser.Easing.Power2 = Phaser.Easing.Cubic.Out;
Phaser.Easing.Power3 = Phaser.Easing.Quartic.Out;
Phaser.Easing.Power4 = Phaser.Easing.Quintic.Out;
