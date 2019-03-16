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

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Timer is a way to create and manage ***REMOVED***@link Phaser.TimerEvent timer events***REMOVED*** that wait for a specific duration and then run a callback.
* Many different timer events, with individual delays, can be added to the same Timer.
*
* All Timer delays are in milliseconds (there are 1000 ms in 1 second); so a delay value of 250 represents a quarter of a second.
*
* Timers are based on real life time, adjusted for game pause durations.
* That is, *timer events are based on elapsed ***REMOVED***@link Phaser.Time game time***REMOVED**** and do *not* take physics time or slow motion into account.
*
* @class Phaser.Timer
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***boolean***REMOVED*** [autoDestroy=true] - If true, the timer will automatically destroy itself after all the events have been dispatched (assuming no looping events).
*/
Phaser.Timer = function (game, autoDestroy) ***REMOVED***

    if (autoDestroy === undefined) ***REMOVED*** autoDestroy = true; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    * @protected
    */
    this.game = game;

    /**
    * True if the Timer is actively running.
    *
    * Do not modify this boolean - use ***REMOVED***@link Phaser.Timer#pause pause***REMOVED*** (and ***REMOVED***@link Phaser.Timer#resume resume***REMOVED***) to pause the timer.
    * @property ***REMOVED***boolean***REMOVED*** running
    * @default
    * @readonly
    */
    this.running = false;

    /**
    * If true, the timer will automatically destroy itself after all the events have been dispatched (assuming no looping events).
    * @property ***REMOVED***boolean***REMOVED*** autoDestroy
    */
    this.autoDestroy = autoDestroy;

    /**
    * @property ***REMOVED***boolean***REMOVED*** expired - An expired Timer is one in which all of its events have been dispatched and none are pending.
    * @readonly
    * @default
    */
    this.expired = false;

    /**
    * @property ***REMOVED***number***REMOVED*** elapsed - Elapsed time since the last frame (in ms).
    * @protected
    */
    this.elapsed = 0;

    /**
    * @property ***REMOVED***Phaser.TimerEvent[]***REMOVED*** events - An array holding all of this timers Phaser.TimerEvent objects. Use the methods add, repeat and loop to populate it.
    */
    this.events = [];

    /**
    * This signal will be dispatched when this Timer has completed which means that there are no more events in the queue.
    *
    * The signal is supplied with one argument, `timer`, which is this Timer object.
    *
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onComplete
    */
    this.onComplete = new Phaser.Signal();

    /**
    * @property ***REMOVED***number***REMOVED*** nextTick - The time the next tick will occur.
    * @readonly
    * @protected
    */
    this.nextTick = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** timeCap - If the difference in time between two frame updates exceeds this value, the event times are reset to avoid catch-up situations.
    */
    this.timeCap = 1000;

    /**
    * @property ***REMOVED***boolean***REMOVED*** paused - The paused state of the Timer. You can pause the timer by calling Timer.pause() and Timer.resume() or by the game pausing.
    * @readonly
    * @default
    */
    this.paused = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _codePaused - Was the Timer paused by code or by Game focus loss?
    * @private
    */
    this._codePaused = false;

    /**
    * @property ***REMOVED***number***REMOVED*** _started - The time at which this Timer instance started running.
    * @private
    * @default
    */
    this._started = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _pauseStarted - The time the game started being paused.
    * @private
    */
    this._pauseStarted = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _pauseTotal - Total paused time.
    * @private
    */
    this._pauseTotal = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _now - The current start-time adjusted time.
    * @private
    */
    this._now = Date.now();

    /**
    * @property ***REMOVED***number***REMOVED*** _len - Temp. array length variable.
    * @private
    */
    this._len = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _marked - Temp. counter variable.
    * @private
    */
    this._marked = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _i - Temp. array counter variable.
    * @private
    */
    this._i = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _diff - Internal cache var.
    * @private
    */
    this._diff = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _newTick - Internal cache var.
    * @private
    */
    this._newTick = 0;

***REMOVED***;

/**
* Number of milliseconds in a minute.
* @constant
* @type ***REMOVED***integer***REMOVED***
*/
Phaser.Timer.MINUTE = 60000;

/**
* Number of milliseconds in a second.
* @constant
* @type ***REMOVED***integer***REMOVED***
*/
Phaser.Timer.SECOND = 1000;

/**
* Number of milliseconds in half a second.
* @constant
* @type ***REMOVED***integer***REMOVED***
*/
Phaser.Timer.HALF = 500;

/**
* Number of milliseconds in a quarter of a second.
* @constant
* @type ***REMOVED***integer***REMOVED***
*/
Phaser.Timer.QUARTER = 250;

Phaser.Timer.prototype = ***REMOVED***

    /**
    * Creates a new TimerEvent on this Timer.
    *
    * Use ***REMOVED***@link Phaser.Timer#add***REMOVED***, ***REMOVED***@link Phaser.Timer#repeat***REMOVED***, or ***REMOVED***@link Phaser.Timer#loop***REMOVED*** methods to create a new event.
    *
    * @method Phaser.Timer#create
    * @private
    * @param ***REMOVED***integer***REMOVED*** delay - The number of milliseconds, in ***REMOVED***@link Phaser.Time game time***REMOVED***, before the timer event occurs.
    * @param ***REMOVED***boolean***REMOVED*** loop - Should the event loop or not?
    * @param ***REMOVED***number***REMOVED*** repeatCount - The number of times the event will repeat.
    * @param ***REMOVED***function***REMOVED*** callback - The callback that will be called when the timer event occurs.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context in which the callback will be called.
    * @param ***REMOVED***any[]***REMOVED*** arguments - The values to be sent to your callback function when it is called.
    * @return ***REMOVED***Phaser.TimerEvent***REMOVED*** The Phaser.TimerEvent object that was created.
    */
    create: function (delay, loop, repeatCount, callback, callbackContext, args) ***REMOVED***

        delay = Math.round(delay);

        var tick = delay;

        if (this._now === 0)
        ***REMOVED***
            tick += this.game.time.time;
        ***REMOVED***
        else
        ***REMOVED***
            tick += this._now;
        ***REMOVED***

        var event = new Phaser.TimerEvent(this, delay, tick, repeatCount, loop, callback, callbackContext, args);

        this.events.push(event);

        this.order();

        this.expired = false;

        return event;

    ***REMOVED***,

    /**
    * Adds a new Event to this Timer.
    *
    * The event will fire after the given amount of `delay` in milliseconds has passed, once the Timer has started running.
    * The delay is in relation to when the Timer starts, not the time it was added. If the Timer is already running the delay will be calculated based on the timers current time.
    *
    * Make sure to call ***REMOVED***@link Phaser.Timer#start start***REMOVED*** after adding all of the Events you require for this Timer.
    *
    * @method Phaser.Timer#add
    * @param ***REMOVED***integer***REMOVED*** delay - The number of milliseconds, in ***REMOVED***@link Phaser.Time game time***REMOVED***, before the timer event occurs.
    * @param ***REMOVED***function***REMOVED*** callback - The callback that will be called when the timer event occurs.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context in which the callback will be called.
    * @param ***REMOVED***...****REMOVED*** arguments - Additional arguments that will be supplied to the callback.
    * @return ***REMOVED***Phaser.TimerEvent***REMOVED*** The Phaser.TimerEvent object that was created.
    */
    add: function (delay, callback, callbackContext) ***REMOVED***

        return this.create(delay, false, 0, callback, callbackContext, Array.prototype.slice.call(arguments, 3));

    ***REMOVED***,

    /**
    * Adds a new TimerEvent that will always play through once and then repeat for the given number of iterations.
    *
    * The event will fire after the given amount of `delay` in milliseconds has passed, once the Timer has started running.
    * The delay is in relation to when the Timer starts, not the time it was added.
    * If the Timer is already running the delay will be calculated based on the timers current time.
    *
    * Make sure to call ***REMOVED***@link Phaser.Timer#start start***REMOVED*** after adding all of the Events you require for this Timer.
    *
    * @method Phaser.Timer#repeat
    * @param ***REMOVED***integer***REMOVED*** delay - The number of milliseconds, in ***REMOVED***@link Phaser.Time game time***REMOVED***, before the timer event occurs.
    * @param ***REMOVED***number***REMOVED*** repeatCount - The number of times the event will repeat once is has finished playback. A repeatCount of 1 means it will repeat itself once, playing the event twice in total.
    * @param ***REMOVED***function***REMOVED*** callback - The callback that will be called when the timer event occurs.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context in which the callback will be called.
    * @param ***REMOVED***...****REMOVED*** arguments - Additional arguments that will be supplied to the callback.
    * @return ***REMOVED***Phaser.TimerEvent***REMOVED*** The Phaser.TimerEvent object that was created.
    */
    repeat: function (delay, repeatCount, callback, callbackContext) ***REMOVED***

        return this.create(delay, false, repeatCount, callback, callbackContext, Array.prototype.slice.call(arguments, 4));

    ***REMOVED***,

    /**
    * Adds a new looped Event to this Timer that will repeat forever or until the Timer is stopped.
    *
    * The event will fire after the given amount of `delay` in milliseconds has passed, once the Timer has started running.
    * The delay is in relation to when the Timer starts, not the time it was added. If the Timer is already running the delay will be calculated based on the timers current time.
    *
    * Make sure to call ***REMOVED***@link Phaser.Timer#start start***REMOVED*** after adding all of the Events you require for this Timer.
    *
    * @method Phaser.Timer#loop
    * @param ***REMOVED***integer***REMOVED*** delay - The number of milliseconds, in ***REMOVED***@link Phaser.Time game time***REMOVED***, before the timer event occurs.
    * @param ***REMOVED***function***REMOVED*** callback - The callback that will be called when the timer event occurs.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context in which the callback will be called.
    * @param ***REMOVED***...****REMOVED*** arguments - Additional arguments that will be supplied to the callback.
    * @return ***REMOVED***Phaser.TimerEvent***REMOVED*** The Phaser.TimerEvent object that was created.
    */
    loop: function (delay, callback, callbackContext) ***REMOVED***

        return this.create(delay, true, 0, callback, callbackContext, Array.prototype.slice.call(arguments, 3));

    ***REMOVED***,

    /**
    * Starts this Timer running.
    * @method Phaser.Timer#start
    * @param ***REMOVED***integer***REMOVED*** [delay=0] - The number of milliseconds, in ***REMOVED***@link Phaser.Time game time***REMOVED***, that should elapse before the Timer will start.
    */
    start: function (delay) ***REMOVED***

        if (this.running)
        ***REMOVED***
            return;
        ***REMOVED***

        this._started = this.game.time.time + (delay || 0);

        this.running = true;

        for (var i = 0; i < this.events.length; i++)
        ***REMOVED***
            this.events[i].tick = this.events[i].delay + this._started;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Stops this Timer from running. Does not cause it to be destroyed if autoDestroy is set to true.
    * @method Phaser.Timer#stop
    * @param ***REMOVED***boolean***REMOVED*** [clearEvents=true] - If true all the events in Timer will be cleared, otherwise they will remain.
    */
    stop: function (clearEvents) ***REMOVED***

        this.running = false;

        if (clearEvents === undefined) ***REMOVED*** clearEvents = true; ***REMOVED***

        if (clearEvents)
        ***REMOVED***
            this.events.length = 0;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Removes a pending TimerEvent from the queue.
    * @param ***REMOVED***Phaser.TimerEvent***REMOVED*** event - The event to remove from the queue.
    * @method Phaser.Timer#remove
    */
    remove: function (event) ***REMOVED***

        for (var i = 0; i < this.events.length; i++)
        ***REMOVED***
            if (this.events[i] === event)
            ***REMOVED***
                this.events[i].pendingDelete = true;
                return true;
            ***REMOVED***
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Orders the events on this Timer so they are in tick order.
    * This is called automatically when new events are created.
    * @method Phaser.Timer#order
    * @protected
    */
    order: function () ***REMOVED***

        if (this.events.length > 0)
        ***REMOVED***
            //  Sort the events so the one with the lowest tick is first
            this.events.sort(this.sortHandler);

            this.nextTick = this.events[0].tick;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sort handler used by Phaser.Timer.order.
    * @method Phaser.Timer#sortHandler
    * @private
    */
    sortHandler: function (a, b) ***REMOVED***

        if (a.tick < b.tick)
        ***REMOVED***
            return -1;
        ***REMOVED***
        else if (a.tick > b.tick)
        ***REMOVED***
            return 1;
        ***REMOVED***

        return 0;

    ***REMOVED***,

    /**
    * Clears any events from the Timer which have pendingDelete set to true and then resets the private _len and _i values.
    *
    * @method Phaser.Timer#clearPendingEvents
    * @protected
    */
    clearPendingEvents: function () ***REMOVED***

        this._i = this.events.length;

        while (this._i--)
        ***REMOVED***
            if (this.events[this._i].pendingDelete)
            ***REMOVED***
                this.events.splice(this._i, 1);
            ***REMOVED***
        ***REMOVED***

        this._len = this.events.length;
        this._i = 0;

    ***REMOVED***,

    /**
    * The main Timer update event, called automatically by Phaser.Time.update.
    *
    * @method Phaser.Timer#update
    * @protected
    * @param ***REMOVED***number***REMOVED*** time - The time from the core game clock.
    * @return ***REMOVED***boolean***REMOVED*** True if there are still events waiting to be dispatched, otherwise false if this Timer can be destroyed.
    */
    update: function (time) ***REMOVED***

        if (this.paused)
        ***REMOVED***
            return true;
        ***REMOVED***

        this.elapsed = time - this._now;
        this._now = time;

        //  spike-dislike
        if (this.elapsed > this.timeCap)
        ***REMOVED***
            //  For some reason the time between now and the last time the game was updated was larger than our timeCap.
            //  This can happen if the Stage.disableVisibilityChange is true and you swap tabs, which makes the raf pause.
            //  In this case we need to adjust the TimerEvents and nextTick.
            this.adjustEvents(time - this.elapsed);
        ***REMOVED***

        this._marked = 0;

        //  Clears events marked for deletion and resets _len and _i to 0.
        this.clearPendingEvents();

        if (this.running && this._now >= this.nextTick && this._len > 0)
        ***REMOVED***
            while (this._i < this._len && this.running)
            ***REMOVED***
                if (this._now >= this.events[this._i].tick && !this.events[this._i].pendingDelete)
                ***REMOVED***
                    //  (now + delay) - (time difference from last tick to now)
                    this._newTick = (this._now + this.events[this._i].delay) - (this._now - this.events[this._i].tick);

                    if (this._newTick < 0)
                    ***REMOVED***
                        this._newTick = this._now + this.events[this._i].delay;
                    ***REMOVED***

                    if (this.events[this._i].loop === true)
                    ***REMOVED***
                        this.events[this._i].tick = this._newTick;
                        this.events[this._i].callback.apply(this.events[this._i].callbackContext, this.events[this._i].args);
                    ***REMOVED***
                    else if (this.events[this._i].repeatCount > 0)
                    ***REMOVED***
                        this.events[this._i].repeatCount--;
                        this.events[this._i].tick = this._newTick;
                        this.events[this._i].callback.apply(this.events[this._i].callbackContext, this.events[this._i].args);
                    ***REMOVED***
                    else
                    ***REMOVED***
                        this._marked++;
                        this.events[this._i].pendingDelete = true;
                        this.events[this._i].callback.apply(this.events[this._i].callbackContext, this.events[this._i].args);
                    ***REMOVED***

                    this._i++;
                ***REMOVED***
                else
                ***REMOVED***
                    break;
                ***REMOVED***
            ***REMOVED***

            //  Are there any events left?
            if (this.events.length > this._marked)
            ***REMOVED***
                this.order();
            ***REMOVED***
            else
            ***REMOVED***
                this.expired = true;
                this.onComplete.dispatch(this);
            ***REMOVED***
        ***REMOVED***

        if (this.expired && this.autoDestroy)
        ***REMOVED***
            return false;
        ***REMOVED***
        else
        ***REMOVED***
            return true;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Pauses the Timer and all events in the queue.
    * @method Phaser.Timer#pause
    */
    pause: function () ***REMOVED***

        if (!this.running)
        ***REMOVED***
            return;
        ***REMOVED***

        this._codePaused = true;

        if (this.paused)
        ***REMOVED***
            return;
        ***REMOVED***

        this._pauseStarted = this.game.time.time;

        this.paused = true;

    ***REMOVED***,

    /**
    * Internal pause/resume control - user code should use Timer.pause instead.
    * @method Phaser.Timer#_pause
    * @private
    */
    _pause: function () ***REMOVED***

        if (this.paused || !this.running)
        ***REMOVED***
            return;
        ***REMOVED***

        this._pauseStarted = this.game.time.time;

        this.paused = true;

    ***REMOVED***,

    /**
    * Adjusts the time of all pending events and the nextTick by the given baseTime.
    *
    * @method Phaser.Timer#adjustEvents
    * @protected
    */
    adjustEvents: function (baseTime) ***REMOVED***

        for (var i = 0; i < this.events.length; i++)
        ***REMOVED***
            if (!this.events[i].pendingDelete)
            ***REMOVED***
                //  Work out how long there would have been from when the game paused until the events next tick
                var t = this.events[i].tick - baseTime;

                if (t < 0)
                ***REMOVED***
                    t = 0;
                ***REMOVED***

                //  Add the difference on to the time now
                this.events[i].tick = this._now + t;
            ***REMOVED***
        ***REMOVED***

        var d = this.nextTick - baseTime;

        if (d < 0)
        ***REMOVED***
            this.nextTick = this._now;
        ***REMOVED***
        else
        ***REMOVED***
            this.nextTick = this._now + d;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Resumes the Timer and updates all pending events.
    *
    * @method Phaser.Timer#resume
    */
    resume: function () ***REMOVED***

        if (!this.paused)
        ***REMOVED***
            return;
        ***REMOVED***

        var now = this.game.time.time;
        this._pauseTotal += now - this._now;
        this._now = now;

        this.adjustEvents(this._pauseStarted);

        this.paused = false;
        this._codePaused = false;

    ***REMOVED***,

    /**
    * Internal pause/resume control - user code should use Timer.resume instead.
    * @method Phaser.Timer#_resume
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
    * Removes all Events from this Timer and all callbacks linked to onComplete, but leaves the Timer running.    
    * The onComplete callbacks won't be called.
    *
    * @method Phaser.Timer#removeAll
    */
    removeAll: function () ***REMOVED***

        this.onComplete.removeAll();
        this.events.length = 0;
        this._len = 0;
        this._i = 0;

    ***REMOVED***,

    /**
    * Destroys this Timer. Any pending Events are not dispatched.
    * The onComplete callbacks won't be called.
    *
    * @method Phaser.Timer#destroy
    */
    destroy: function () ***REMOVED***

        this.onComplete.removeAll();
        this.running = false;
        this.events = [];
        this._len = 0;
        this._i = 0;

    ***REMOVED***

***REMOVED***;

/**
* @name Phaser.Timer#next
* @property ***REMOVED***number***REMOVED*** next - The time at which the next event will occur.
* @readonly
*/
Object.defineProperty(Phaser.Timer.prototype, "next", ***REMOVED***

    get: function () ***REMOVED***
        return this.nextTick;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Timer#duration
* @property ***REMOVED***number***REMOVED*** duration - The duration in ms remaining until the next event will occur.
* @readonly
*/
Object.defineProperty(Phaser.Timer.prototype, "duration", ***REMOVED***

    get: function () ***REMOVED***

        if (this.running && this.nextTick > this._now)
        ***REMOVED***
            return this.nextTick - this._now;
        ***REMOVED***
        else
        ***REMOVED***
            return 0;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Timer#length
* @property ***REMOVED***number***REMOVED*** length - The number of pending events in the queue.
* @readonly
*/
Object.defineProperty(Phaser.Timer.prototype, "length", ***REMOVED***

    get: function () ***REMOVED***
        return this.events.length;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Timer#ms
* @property ***REMOVED***number***REMOVED*** ms - The duration in milliseconds that this Timer has been running for.
* @readonly
*/
Object.defineProperty(Phaser.Timer.prototype, "ms", ***REMOVED***

    get: function () ***REMOVED***

        if (this.running)
        ***REMOVED***
            return this._now - this._started - this._pauseTotal;
        ***REMOVED***
        else
        ***REMOVED***
            return 0;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Timer#seconds
* @property ***REMOVED***number***REMOVED*** seconds - The duration in seconds that this Timer has been running for.
* @readonly
*/
Object.defineProperty(Phaser.Timer.prototype, "seconds", ***REMOVED***

    get: function () ***REMOVED***

        if (this.running)
        ***REMOVED***
            return this.ms * 0.001;
        ***REMOVED***
        else
        ***REMOVED***
            return 0;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

Phaser.Timer.prototype.constructor = Phaser.Timer;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A TimerEvent is a single event that is processed by a Phaser.Timer.
*
* It consists of a delay, which is a value in milliseconds after which the event will fire.
* When the event fires it calls a specific callback with the specified arguments.
* 
* TimerEvents are removed by their parent timer once finished firing or repeating.
* 
* Use ***REMOVED***@link Phaser.Timer#add***REMOVED***, ***REMOVED***@link Phaser.Timer#repeat***REMOVED***, or ***REMOVED***@link Phaser.Timer#loop***REMOVED*** methods to create a new event.
*
* @class Phaser.TimerEvent
* @constructor
* @param ***REMOVED***Phaser.Timer***REMOVED*** timer - The Timer object that this TimerEvent belongs to.
* @param ***REMOVED***number***REMOVED*** delay - The delay in ms at which this TimerEvent fires.
* @param ***REMOVED***number***REMOVED*** tick - The tick is the next game clock time that this event will fire at.
* @param ***REMOVED***number***REMOVED*** repeatCount - If this TimerEvent repeats it will do so this many times.
* @param ***REMOVED***boolean***REMOVED*** loop - True if this TimerEvent loops, otherwise false.
* @param ***REMOVED***function***REMOVED*** callback - The callback that will be called when the TimerEvent occurs.
* @param ***REMOVED***object***REMOVED*** callbackContext - The context in which the callback will be called.
* @param ***REMOVED***any[]***REMOVED*** arguments - Additional arguments to be passed to the callback.
*/
Phaser.TimerEvent = function (timer, delay, tick, repeatCount, loop, callback, callbackContext, args) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Timer***REMOVED*** timer - The Timer object that this TimerEvent belongs to.
    * @protected
    * @readonly
    */
    this.timer = timer;

    /**
    * @property ***REMOVED***number***REMOVED*** delay - The delay in ms at which this TimerEvent fires.
    */
    this.delay = delay;

    /**
    * @property ***REMOVED***number***REMOVED*** tick - The tick is the next game clock time that this event will fire at.
    */
    this.tick = tick;

    /**
    * @property ***REMOVED***number***REMOVED*** repeatCount - If this TimerEvent repeats it will do so this many times.
    */
    this.repeatCount = repeatCount - 1;

    /**
    * @property ***REMOVED***boolean***REMOVED*** loop - True if this TimerEvent loops, otherwise false.
    */
    this.loop = loop;

    /**
    * @property ***REMOVED***function***REMOVED*** callback - The callback that will be called when the TimerEvent occurs.
    */
    this.callback = callback;

    /**
    * @property ***REMOVED***object***REMOVED*** callbackContext - The context in which the callback will be called.
    */
    this.callbackContext = callbackContext;

    /**
    * @property ***REMOVED***any[]***REMOVED*** arguments - Additional arguments to be passed to the callback.
    */
    this.args = args;

    /**
    * @property ***REMOVED***boolean***REMOVED*** pendingDelete - A flag that controls if the TimerEvent is pending deletion.
    * @protected
    */
    this.pendingDelete = false;

***REMOVED***;

Phaser.TimerEvent.prototype.constructor = Phaser.TimerEvent;
