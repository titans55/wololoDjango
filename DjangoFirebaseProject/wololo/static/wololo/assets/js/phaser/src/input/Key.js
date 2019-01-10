/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* If you need more fine-grained control over the handling of specific keys you can create and use Phaser.Key objects.
* 
* @class Phaser.Key
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Current game instance.
* @param ***REMOVED***integer***REMOVED*** keycode - The key code this Key is responsible for. See ***REMOVED***@link Phaser.KeyCode***REMOVED***.
*/
Phaser.Key = function (game, keycode) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * The enabled state of the key - see `enabled`.
    * @property ***REMOVED***boolean***REMOVED*** _enabled
    * @private
    */
    this._enabled = true;

    /**
    * @property ***REMOVED***object***REMOVED*** event - Stores the most recent DOM event.
    * @readonly
    */
    this.event = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isDown - The "down" state of the key. This will remain `true` for as long as the keyboard thinks this key is held down.
    * @default
    */
    this.isDown = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isUp - The "up" state of the key. This will remain `true` for as long as the keyboard thinks this key is up.
    * @default
    */
    this.isUp = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** altKey - The down state of the ALT key, if pressed at the same time as this key.
    * @default
    */
    this.altKey = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** ctrlKey - The down state of the CTRL key, if pressed at the same time as this key.
    * @default
    */
    this.ctrlKey = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** shiftKey - The down state of the SHIFT key, if pressed at the same time as this key.
    * @default
    */
    this.shiftKey = false;

    /**
    * @property ***REMOVED***number***REMOVED*** timeDown - The timestamp when the key was last pressed down. This is based on Game.time.now.
    */
    this.timeDown = 0;

    /**
    * If the key is down this value holds the duration of that key press and is constantly updated.
    * If the key is up it holds the duration of the previous down session.
    * @property ***REMOVED***number***REMOVED*** duration - The number of milliseconds this key has been held down for.
    * @default
    */
    this.duration = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** timeUp - The timestamp when the key was last released. This is based on Game.time.now.
    * @default
    */
    this.timeUp = -2500;

    /**
    * @property ***REMOVED***number***REMOVED*** repeats - If a key is held down this holds down the number of times the key has 'repeated'.
    * @default
    */
    this.repeats = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** keyCode - The keycode of this key.
    */
    this.keyCode = keycode;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onDown - This Signal is dispatched every time this Key is pressed down. It is only dispatched once (until the key is released again).
    */
    this.onDown = new Phaser.Signal();

    /**
    * @property ***REMOVED***function***REMOVED*** onHoldCallback - A callback that is called while this Key is held down. Warning: Depending on refresh rate that could be 60+ times per second.
    */
    this.onHoldCallback = null;

    /**
    * @property ***REMOVED***object***REMOVED*** onHoldContext - The context under which the onHoldCallback will be called.
    */
    this.onHoldContext = null;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onUp - This Signal is dispatched every time this Key is released. It is only dispatched once (until the key is pressed and released again).
    */
    this.onUp = new Phaser.Signal();

    /**
     * @property ***REMOVED***boolean***REMOVED*** _justDown - True if the key has just been pressed (NOTE: requires to be reset, see justDown getter)
     * @private
     */
    this._justDown = false;

    /**
     * @property ***REMOVED***boolean***REMOVED*** _justUp - True if the key has just been pressed (NOTE: requires to be reset, see justDown getter)
     * @private
     */
    this._justUp = false;

***REMOVED***;

Phaser.Key.prototype = ***REMOVED***

    /**
    * Called automatically by Phaser.Keyboard.
    * 
    * @method Phaser.Key#update
    * @protected
    */
    update: function () ***REMOVED***

        if (!this._enabled) ***REMOVED*** return; ***REMOVED***

        if (this.isDown)
        ***REMOVED***
            this.duration = this.game.time.time - this.timeDown;
            this.repeats++;

            if (this.onHoldCallback)
            ***REMOVED***
                this.onHoldCallback.call(this.onHoldContext, this);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called automatically by Phaser.Keyboard.
    * 
    * @method Phaser.Key#processKeyDown
    * @param ***REMOVED***KeyboardEvent***REMOVED*** event - The DOM event that triggered this.
    * @protected
    */
    processKeyDown: function (event) ***REMOVED***

        if (!this._enabled) ***REMOVED*** return; ***REMOVED***

        this.event = event;

        // exit if this key down is from auto-repeat
        if (this.isDown)
        ***REMOVED***
            return;
        ***REMOVED***

        this.altKey = event.altKey;
        this.ctrlKey = event.ctrlKey;
        this.shiftKey = event.shiftKey;

        this.isDown = true;
        this.isUp = false;
        this.timeDown = this.game.time.time;
        this.duration = 0;
        this.repeats = 0;

        // _justDown will remain true until it is read via the justDown Getter
        // this enables the game to poll for past presses, or reset it at the start of a new game state
        this._justDown = true;

        this.onDown.dispatch(this);

    ***REMOVED***,

    /**
    * Called automatically by Phaser.Keyboard.
    * 
    * @method Phaser.Key#processKeyUp
    * @param ***REMOVED***KeyboardEvent***REMOVED*** event - The DOM event that triggered this.
    * @protected
    */
    processKeyUp: function (event) ***REMOVED***

        if (!this._enabled) ***REMOVED*** return; ***REMOVED***

        this.event = event;

        if (this.isUp)
        ***REMOVED***
            return;
        ***REMOVED***

        this.isDown = false;
        this.isUp = true;
        this.timeUp = this.game.time.time;
        this.duration = this.game.time.time - this.timeDown;

        // _justUp will remain true until it is read via the justUp Getter
        // this enables the game to poll for past presses, or reset it at the start of a new game state
        this._justUp = true;

        this.onUp.dispatch(this);

    ***REMOVED***,

    /**
    * Resets the state of this Key.
    *
    * This sets isDown to false, isUp to true, resets the time to be the current time, and _enables_ the key.
    * In addition, if it is a "hard reset", it clears clears any callbacks associated with the onDown and onUp events and removes the onHoldCallback.
    *
    * @method Phaser.Key#reset
    * @param ***REMOVED***boolean***REMOVED*** [hard=true] - A soft reset won't reset any events or callbacks; a hard reset will.
    */
    reset: function (hard) ***REMOVED***

        if (hard === undefined) ***REMOVED*** hard = true; ***REMOVED***

        this.isDown = false;
        this.isUp = true;
        this.timeUp = this.game.time.time;
        this.duration = 0;
        this._enabled = true; // .enabled causes reset(false)
        this._justDown = false;
        this._justUp = false;

        if (hard)
        ***REMOVED***
            this.onDown.removeAll();
            this.onUp.removeAll();
            this.onHoldCallback = null;
            this.onHoldContext = null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns `true` if the Key was pressed down within the `duration` value given, or `false` if it either isn't down,
    * or was pressed down longer ago than then given duration.
    * 
    * @method Phaser.Key#downDuration
    * @param ***REMOVED***number***REMOVED*** [duration=50] - The duration within which the key is considered as being just pressed. Given in ms.
    * @return ***REMOVED***boolean***REMOVED*** True if the key was pressed down within the given duration.
    */
    downDuration: function (duration) ***REMOVED***

        if (duration === undefined) ***REMOVED*** duration = 50; ***REMOVED***

        return (this.isDown && this.duration < duration);

    ***REMOVED***,

    /**
    * Returns `true` if the Key was pressed down within the `duration` value given, or `false` if it either isn't down,
    * or was pressed down longer ago than then given duration.
    * 
    * @method Phaser.Key#upDuration
    * @param ***REMOVED***number***REMOVED*** [duration=50] - The duration within which the key is considered as being just released. Given in ms.
    * @return ***REMOVED***boolean***REMOVED*** True if the key was released within the given duration.
    */
    upDuration: function (duration) ***REMOVED***

        if (duration === undefined) ***REMOVED*** duration = 50; ***REMOVED***

        return (!this.isDown && ((this.game.time.time - this.timeUp) < duration));

    ***REMOVED***

***REMOVED***;

/**
* The justDown value allows you to test if this Key has just been pressed down or not.
* When you check this value it will return `true` if the Key is down, otherwise `false`.
* You can only call justDown once per key press. It will only return `true` once, until the Key is released and pressed down again.
* This allows you to use it in situations where you want to check if this key is down without using a Signal, such as in a core game loop.
* 
* @property ***REMOVED***boolean***REMOVED*** justDown
* @memberof Phaser.Key
* @default false
*/
Object.defineProperty(Phaser.Key.prototype, "justDown", ***REMOVED***

    get: function () ***REMOVED***

        var current = this._justDown;
        this._justDown = false;
        return current;

    ***REMOVED***

***REMOVED***);

/**
* The justUp value allows you to test if this Key has just been released or not.
* When you check this value it will return `true` if the Key is up, otherwise `false`.
* You can only call justUp once per key release. It will only return `true` once, until the Key is pressed down and released again.
* This allows you to use it in situations where you want to check if this key is up without using a Signal, such as in a core game loop.
* 
* @property ***REMOVED***boolean***REMOVED*** justUp
* @memberof Phaser.Key
* @default false
*/
Object.defineProperty(Phaser.Key.prototype, "justUp", ***REMOVED***

    get: function () ***REMOVED***

        var current = this._justUp;
        this._justUp = false;
        return current;

    ***REMOVED***

***REMOVED***);

/**
* An enabled key processes its update and dispatches events.
* A key can be disabled momentarily at runtime instead of deleting it.
* 
* @property ***REMOVED***boolean***REMOVED*** enabled
* @memberof Phaser.Key
* @default true
*/
Object.defineProperty(Phaser.Key.prototype, "enabled", ***REMOVED***

    get: function () ***REMOVED***

        return this._enabled;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        value = !!value;

        if (value !== this._enabled)
        ***REMOVED***
            if (!value)
            ***REMOVED***
                this.reset(false);
            ***REMOVED***

            this._enabled = value;
        ***REMOVED***
    ***REMOVED***

***REMOVED***);

Phaser.Key.prototype.constructor = Phaser.Key;
