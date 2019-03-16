/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* This is the core internal game clock.
*
* It manages the elapsed time and calculation of elapsed values, used for game object motion and tweens,
* and also handles the standard Timer pool.
*
* To create a general timed event, use the master ***REMOVED***@link Phaser.Timer***REMOVED*** accessible through ***REMOVED***@link Phaser.Time.events events***REMOVED***.
*
* There are different *types* of time in Phaser:
*
* - ***Game time*** always runs at the speed of time in real life.
*
*   Unlike wall-clock time, *game time stops when Phaser is paused*.
*
*   Game time is used for ***REMOVED***@link Phaser.Timer timer events***REMOVED***.
*
* - ***Physics time*** represents the amount of time given to physics calculations.
*
*   *When ***REMOVED***@link #slowMotion***REMOVED*** is in effect physics time runs slower than game time.*
*   Like game time, physics time stops when Phaser is paused.
*
*   Physics time is used for physics calculations and ***REMOVED***@link Phaser.Tween tweens***REMOVED***.
*
* - ***REMOVED***@link https://en.wikipedia.org/wiki/Wall-clock_time ***Wall-clock time******REMOVED*** represents the duration between two events in real life time.
*
*   This time is independent of Phaser and always progresses, regardless of if Phaser is paused.
*
* @class Phaser.Time
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game A reference to the currently running game.
*/
Phaser.Time = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    * @protected
    */
    this.game = game;

    /**
    * The `Date.now()` value when the time was last updated.
    * @property ***REMOVED***integer***REMOVED*** time
    * @protected
    */
    this.time = 0;

    /**
    * The `now` when the previous update occurred.
    * @property ***REMOVED***number***REMOVED*** prevTime
    * @protected
    */
    this.prevTime = 0;

    /**
    * An increasing value representing cumulative milliseconds since an undisclosed epoch.
    *
    * While this value is in milliseconds and can be used to compute time deltas,
    * it must must _not_ be used with `Date.now()` as it may not use the same epoch / starting reference.
    *
    * The source may either be from a high-res source (eg. if RAF is available) or the standard Date.now;
    * the value can only be relied upon within a particular game instance.
    *
    * @property ***REMOVED***number***REMOVED*** now
    * @protected
    */
    this.now = 0;

    /**
    * Elapsed time since the last time update, in milliseconds, based on `now`.
    *
    * This value _may_ include time that the game is paused/inactive.
    *
    * _Note:_ This is updated only once per game loop - even if multiple logic update steps are done.
    * Use ***REMOVED***@link Phaser.Timer#physicsTime physicsTime***REMOVED*** as a basis of game/logic calculations instead.
    *
    * @property ***REMOVED***number***REMOVED*** elapsed
    * @see Phaser.Time.time
    * @protected
    */
    this.elapsed = 0;

    /**
    * The time in ms since the last time update, in milliseconds, based on `time`.
    *
    * This value is corrected for game pauses and will be "about zero" after a game is resumed.
    *
    * _Note:_ This is updated once per game loop - even if multiple logic update steps are done.
    * Use ***REMOVED***@link Phaser.Timer#physicsTime physicsTime***REMOVED*** as a basis of game/logic calculations instead.
    *
    * @property ***REMOVED***integer***REMOVED*** elapsedMS
    * @protected
    */
    this.elapsedMS = 0;

    /**
    * The physics update delta, in fractional seconds.
    *
    * This should be used as an applicable multiplier by all logic update steps (eg. `preUpdate/postUpdate/update`)
    * to ensure consistent game timing. Game/logic timing can drift from real-world time if the system
    * is unable to consistently maintain the desired FPS.
    *
    * With fixed-step updates this is normally equivalent to `1.0 / desiredFps`.
    *
    * @property ***REMOVED***number***REMOVED*** physicsElapsed
    */
    this.physicsElapsed = 1 / 60;

    /**
    * The physics update delta, in milliseconds - equivalent to `physicsElapsed * 1000`.
    *
    * @property ***REMOVED***number***REMOVED*** physicsElapsedMS
    */
    this.physicsElapsedMS = (1 / 60) * 1000;

    /**
    * The desiredFps multiplier as used by Game.update.
    * @property ***REMOVED***integer***REMOVED*** desiredFpsMult
    * @protected
    */
    this.desiredFpsMult = 1.0 / 60;

    /**
    * The desired frame rate of the game.
    *
    * This is used is used to calculate the physic/logic multiplier and how to apply catch-up logic updates.
    *
    * @property ***REMOVED***number***REMOVED*** _desiredFps
    * @private
    * @default
    */
    this._desiredFps = 60;

    /**
    * The suggested frame rate for your game, based on an averaged real frame rate.
    * This value is only populated if `Time.advancedTiming` is enabled.
    *
    * _Note:_ This is not available until after a few frames have passed; until then
    * it's set to the same value as desiredFps.
    *
    * @property ***REMOVED***number***REMOVED*** suggestedFps
    * @default
    */
    this.suggestedFps = this.desiredFps;

    /**
    * Scaling factor to make the game move smoothly in slow motion
    * - 1.0 = normal speed
    * - 2.0 = half speed
    * @property ***REMOVED***number***REMOVED*** slowMotion
    * @default
    */
    this.slowMotion = 1.0;

    /**
    * If true then advanced profiling, including the fps rate, fps min/max, suggestedFps and msMin/msMax are updated.
    * @property ***REMOVED***boolean***REMOVED*** advancedTiming
    * @default
    */
    this.advancedTiming = false;

    /**
    * Advanced timing result: The number of render frames record in the last second.
    *
    * Only calculated if ***REMOVED***@link Phaser.Time#advancedTiming advancedTiming***REMOVED*** is enabled.
    * @property ***REMOVED***integer***REMOVED*** frames
    * @readonly
    */
    this.frames = 0;

    /**
    * Advanced timing result: Frames per second.
    *
    * Only calculated if ***REMOVED***@link Phaser.Time#advancedTiming advancedTiming***REMOVED*** is enabled.
    * @property ***REMOVED***number***REMOVED*** fps
    * @readonly
    */
    this.fps = 0;

    /**
    * Advanced timing result: The lowest rate the fps has dropped to.
    *
    * Only calculated if ***REMOVED***@link Phaser.Time#advancedTiming advancedTiming***REMOVED*** is enabled.
    * This value can be manually reset.
    * @property ***REMOVED***number***REMOVED*** fpsMin
    */
    this.fpsMin = 1000;

    /**
    * Advanced timing result: The highest rate the fps has reached (usually no higher than 60fps).
    *
    * Only calculated if ***REMOVED***@link Phaser.Time#advancedTiming advancedTiming***REMOVED*** is enabled.
    * This value can be manually reset.
    * @property ***REMOVED***number***REMOVED*** fpsMax
    */
    this.fpsMax = 0;

    /**
    * Advanced timing result: The minimum amount of time the game has taken between consecutive frames.
    *
    * Only calculated if ***REMOVED***@link Phaser.Time#advancedTiming advancedTiming***REMOVED*** is enabled.
    * This value can be manually reset.
    * @property ***REMOVED***number***REMOVED*** msMin
    * @default
    */
    this.msMin = 1000;

    /**
    * Advanced timing result: The maximum amount of time the game has taken between consecutive frames.
    *
    * Only calculated if ***REMOVED***@link Phaser.Time#advancedTiming advancedTiming***REMOVED*** is enabled.
    * This value can be manually reset.
    * @property ***REMOVED***number***REMOVED*** msMax
    */
    this.msMax = 0;

    /**
    * Records how long the game was last paused, in milliseconds.
    * (This is not updated until the game is resumed.)
    * @property ***REMOVED***number***REMOVED*** pauseDuration
    */
    this.pauseDuration = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** timeToCall - The value that setTimeout needs to work out when to next update
    * @protected
    */
    this.timeToCall = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** timeExpected - The time when the next call is expected when using setTimer to control the update loop
    * @protected
    */
    this.timeExpected = 0;

    /**
    * A ***REMOVED***@link Phaser.Timer***REMOVED*** object bound to the master clock (this Time object) which events can be added to.
    * @property ***REMOVED***Phaser.Timer***REMOVED*** events
    */
    this.events = new Phaser.Timer(this.game, false);

    /**
    * @property ***REMOVED***number***REMOVED*** _frameCount - count the number of calls to time.update since the last suggestedFps was calculated
    * @private
    */
    this._frameCount = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _elapsedAcumulator - sum of the elapsed time since the last suggestedFps was calculated
    * @private
    */
    this._elapsedAccumulator = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _started - The time at which the Game instance started.
    * @private
    */
    this._started = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _timeLastSecond - The time (in ms) that the last second counter ticked over.
    * @private
    */
    this._timeLastSecond = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _pauseStarted - The time the game started being paused.
    * @private
    */
    this._pauseStarted = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _justResumed - Internal value used to recover from the game pause state.
    * @private
    */
    this._justResumed = false;

    /**
    * @property ***REMOVED***Phaser.Timer[]***REMOVED*** _timers - Internal store of Phaser.Timer objects.
    * @private
    */
    this._timers = [];

***REMOVED***;

Phaser.Time.prototype = ***REMOVED***

    /**
    * Called automatically by Phaser.Game after boot. Should not be called directly.
    *
    * @method Phaser.Time#boot
    * @protected
    */
    boot: function () ***REMOVED***

        this._started = Date.now();
        this.time = Date.now();
        this.events.start();
        this.timeExpected = this.time;

    ***REMOVED***,

    /**
    * Adds an existing Phaser.Timer object to the Timer pool.
    *
    * @method Phaser.Time#add
    * @param ***REMOVED***Phaser.Timer***REMOVED*** timer - An existing Phaser.Timer object.
    * @return ***REMOVED***Phaser.Timer***REMOVED*** The given Phaser.Timer object.
    */
    add: function (timer) ***REMOVED***

        this._timers.push(timer);

        return timer;

    ***REMOVED***,

    /**
    * Creates a new stand-alone Phaser.Timer object.
    *
    * @method Phaser.Time#create
    * @param ***REMOVED***boolean***REMOVED*** [autoDestroy=true] - A Timer that is set to automatically destroy itself will do so after all of its events have been dispatched (assuming no looping events).
    * @return ***REMOVED***Phaser.Timer***REMOVED*** The Timer object that was created.
    */
    create: function (autoDestroy) ***REMOVED***

        if (autoDestroy === undefined) ***REMOVED*** autoDestroy = true; ***REMOVED***

        var timer = new Phaser.Timer(this.game, autoDestroy);

        this._timers.push(timer);

        return timer;

    ***REMOVED***,

    /**
    * Remove all Timer objects, regardless of their state and clears all Timers from the ***REMOVED***@link Phaser.Time#events events***REMOVED*** timer.
    *
    * @method Phaser.Time#removeAll
    */
    removeAll: function () ***REMOVED***

        for (var i = 0; i < this._timers.length; i++)
        ***REMOVED***
            this._timers[i].destroy();
        ***REMOVED***

        this._timers = [];

        this.events.removeAll();

    ***REMOVED***,

    /**
    * Refreshes the Time.time and Time.elapsedMS properties from the system clock.
    *
    * @method Phaser.Time#refresh
    */
    refresh: function () ***REMOVED***

        //  Set to the old Date.now value
        var previousDateNow = this.time;

        // this.time always holds a Date.now value
        this.time = Date.now();

        //  Adjust accordingly.
        this.elapsedMS = this.time - previousDateNow;

    ***REMOVED***,

    /**
    * Updates the game clock and if enabled the advanced timing data. This is called automatically by Phaser.Game.
    *
    * @method Phaser.Time#update
    * @protected
    * @param ***REMOVED***number***REMOVED*** time - The current relative timestamp; see ***REMOVED***@link Phaser.Time#now now***REMOVED***.
    */
    update: function (time) ***REMOVED***

        //  Set to the old Date.now value
        var previousDateNow = this.time;

        // this.time always holds a Date.now value
        this.time = Date.now();

        //  Adjust accordingly.
        this.elapsedMS = this.time - previousDateNow;

        // 'now' is currently still holding the time of the last call, move it into prevTime
        this.prevTime = this.now;

        // update 'now' to hold the current time
        // this.now may hold the RAF high resolution time value if RAF is available (otherwise it also holds Date.now)
        this.now = time;

        // elapsed time between previous call and now - this could be a high resolution value
        this.elapsed = this.now - this.prevTime;

        if (this.game.raf._isSetTimeOut)
        ***REMOVED***
            // console.log('Time isSet', this._desiredFps, 'te', this.timeExpected, 'time', time);

            // time to call this function again in ms in case we're using timers instead of RequestAnimationFrame to update the game
            this.timeToCall = Math.floor(Math.max(0, (1000.0 / this._desiredFps) - (this.timeExpected - time)));

            // time when the next call is expected if using timers
            this.timeExpected = time + this.timeToCall;

            // console.log('Time expect', this.timeExpected);
        ***REMOVED***

        if (this.advancedTiming)
        ***REMOVED***
            this.updateAdvancedTiming();
        ***REMOVED***

        //  Paused but still running?
        if (!this.game.paused)
        ***REMOVED***
            //  Our internal Phaser.Timer
            this.events.update(this.time);

            if (this._timers.length)
            ***REMOVED***
                this.updateTimers();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Handles the updating of the Phaser.Timers (if any)
    * Called automatically by Time.update.
    *
    * @method Phaser.Time#updateTimers
    * @private
    */
    updateTimers: function () ***REMOVED***

        //  Any game level timers
        var i = 0;
        var len = this._timers.length;

        while (i < len)
        ***REMOVED***
            if (this._timers[i].update(this.time))
            ***REMOVED***
                i++;
            ***REMOVED***
            else
            ***REMOVED***
                //  Timer requests to be removed
                this._timers.splice(i, 1);
                len--;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Handles the updating of the advanced timing values (if enabled)
    * Called automatically by Time.update.
    *
    * @method Phaser.Time#updateAdvancedTiming
    * @private
    */
    updateAdvancedTiming: function () ***REMOVED***

        // count the number of time.update calls
        this._frameCount++;
        this._elapsedAccumulator += this.elapsed;

        // occasionally recalculate the suggestedFps based on the accumulated elapsed time
        if (this._frameCount >= this._desiredFps * 2)
        ***REMOVED***
            // this formula calculates suggestedFps in multiples of 5 fps
            this.suggestedFps = Math.floor(200 / (this._elapsedAccumulator / this._frameCount)) * 5;
            this._frameCount = 0;
            this._elapsedAccumulator = 0;
        ***REMOVED***

        this.msMin = Math.min(this.msMin, this.elapsed);
        this.msMax = Math.max(this.msMax, this.elapsed);

        this.frames++;

        if (this.now > this._timeLastSecond + 1000)
        ***REMOVED***
            this.fps = Math.round((this.frames * 1000) / (this.now - this._timeLastSecond));
            this.fpsMin = Math.min(this.fpsMin, this.fps);
            this.fpsMax = Math.max(this.fpsMax, this.fps);
            this._timeLastSecond = this.now;
            this.frames = 0;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called when the game enters a paused state.
    *
    * @method Phaser.Time#gamePaused
    * @private
    */
    gamePaused: function () ***REMOVED***

        this._pauseStarted = Date.now();

        this.events.pause();

        var i = this._timers.length;

        while (i--)
        ***REMOVED***
            this._timers[i]._pause();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called when the game resumes from a paused state.
    *
    * @method Phaser.Time#gameResumed
    * @private
    */
    gameResumed: function () ***REMOVED***

        // Set the parameter which stores Date.now() to make sure it's correct on resume
        this.time = Date.now();

        this.pauseDuration = this.time - this._pauseStarted;

        this.events.resume();

        var i = this._timers.length;

        while (i--)
        ***REMOVED***
            this._timers[i]._resume();
        ***REMOVED***

    ***REMOVED***,

    /**
    * The number of seconds that have elapsed since the game was started.
    *
    * @method Phaser.Time#totalElapsedSeconds
    * @return ***REMOVED***number***REMOVED*** The number of seconds that have elapsed since the game was started.
    */
    totalElapsedSeconds: function() ***REMOVED***
        return (this.time - this._started) * 0.001;
    ***REMOVED***,

    /**
    * How long has passed since the given time.
    *
    * @method Phaser.Time#elapsedSince
    * @param ***REMOVED***number***REMOVED*** since - The time you want to measure against.
    * @return ***REMOVED***number***REMOVED*** The difference between the given time and now.
    */
    elapsedSince: function (since) ***REMOVED***
        return this.time - since;
    ***REMOVED***,

    /**
    * How long has passed since the given time (in seconds).
    *
    * @method Phaser.Time#elapsedSecondsSince
    * @param ***REMOVED***number***REMOVED*** since - The time you want to measure (in seconds).
    * @return ***REMOVED***number***REMOVED*** Duration between given time and now (in seconds).
    */
    elapsedSecondsSince: function (since) ***REMOVED***
        return (this.time - since) * 0.001;
    ***REMOVED***,

    /**
    * Resets the private _started value to now and removes all currently running Timers.
    *
    * @method Phaser.Time#reset
    */
    reset: function () ***REMOVED***

        this._started = this.time;
        this.removeAll();

    ***REMOVED***

***REMOVED***;

/**
* The desired frame rate of the game.
*
* This is used is used to calculate the physic / logic multiplier and how to apply catch-up logic updates.
* 
* @name Phaser.Time#desiredFps
* @property ***REMOVED***integer***REMOVED*** desiredFps - The desired frame rate of the game. Defaults to 60.
*/
Object.defineProperty(Phaser.Time.prototype, "desiredFps", ***REMOVED***

    get: function () ***REMOVED***

        return this._desiredFps;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this._desiredFps = value;

        //  Set the physics elapsed time... this will always be 1 / this.desiredFps 
        //  because we're using fixed time steps in game.update
        this.physicsElapsed = 1 / value;

        this.physicsElapsedMS = this.physicsElapsed * 1000;

        this.desiredFpsMult = 1.0 / value;

    ***REMOVED***

***REMOVED***);

Phaser.Time.prototype.constructor = Phaser.Time;
