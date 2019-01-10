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
