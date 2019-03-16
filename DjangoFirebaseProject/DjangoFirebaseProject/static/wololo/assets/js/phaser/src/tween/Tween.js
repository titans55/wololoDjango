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
