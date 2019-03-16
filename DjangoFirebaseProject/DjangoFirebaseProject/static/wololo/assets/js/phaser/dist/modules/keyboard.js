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

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Keyboard class monitors keyboard input and dispatches keyboard events.
*
* _Note_: many keyboards are unable to process certain combinations of keys due to hardware limitations known as ghosting.
* See http://www.html5gamedevs.com/topic/4876-impossible-to-use-more-than-2-keyboard-input-buttons-at-the-same-time/ for more details.
*
* Also please be aware that certain browser extensions can disable or override Phaser keyboard handling.
* For example the Chrome extension vimium is known to disable Phaser from using the D key. And there are others.
* So please check your extensions before opening Phaser issues.
*
* @class Phaser.Keyboard
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.Keyboard = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = game;

    /**
    * Keyboard input will only be processed if enabled.
    * @property ***REMOVED***boolean***REMOVED*** enabled
    * @default
    */
    this.enabled = true;

    /**
    * @property ***REMOVED***object***REMOVED*** event - The most recent DOM event from keydown or keyup. This is updated every time a new key is pressed or released.
    */
    this.event = null;

    /**
    * @property ***REMOVED***object***REMOVED*** pressEvent - The most recent DOM event from keypress.
    */
    this.pressEvent = null;

    /**
    * @property ***REMOVED***object***REMOVED*** callbackContext - The context under which the callbacks are run.
    */
    this.callbackContext = this;

    /**
    * @property ***REMOVED***function***REMOVED*** onDownCallback - This callback is invoked every time a key is pressed down, including key repeats when a key is held down.
    */
    this.onDownCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onPressCallback - This callback is invoked every time a DOM onkeypress event is raised, which is only for printable keys.
    */
    this.onPressCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onUpCallback - This callback is invoked every time a key is released.
    */
    this.onUpCallback = null;

    /**
    * @property ***REMOVED***array<Phaser.Key>***REMOVED*** _keys - The array the Phaser.Key objects are stored in.
    * @private
    */
    this._keys = [];

    /**
    * @property ***REMOVED***array***REMOVED*** _capture - The array the key capture values are stored in.
    * @private
    */
    this._capture = [];

    /**
    * @property ***REMOVED***function***REMOVED*** _onKeyDown
    * @private
    * @default
    */
    this._onKeyDown = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onKeyPress
    * @private
    * @default
    */
    this._onKeyPress = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onKeyUp
    * @private
    * @default
    */
    this._onKeyUp = null;

    /**
    * @property ***REMOVED***number***REMOVED*** _i - Internal cache var
    * @private
    */
    this._i = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _k - Internal cache var
    * @private
    */
    this._k = 0;

***REMOVED***;

Phaser.Keyboard.prototype = ***REMOVED***

    /**
    * Add callbacks to the Keyboard handler so that each time a key is pressed down or released the callbacks are activated.
    *
    * @method Phaser.Keyboard#addCallbacks
    * @param ***REMOVED***object***REMOVED*** context - The context under which the callbacks are run.
    * @param ***REMOVED***function***REMOVED*** [onDown=null] - This callback is invoked every time a key is pressed down.
    * @param ***REMOVED***function***REMOVED*** [onUp=null] - This callback is invoked every time a key is released.
    * @param ***REMOVED***function***REMOVED*** [onPress=null] - This callback is invoked every time the onkeypress event is raised.
    */
    addCallbacks: function (context, onDown, onUp, onPress) ***REMOVED***

        this.callbackContext = context;

        if (onDown !== undefined && onDown !== null)
        ***REMOVED***
            this.onDownCallback = onDown;
        ***REMOVED***

        if (onUp !== undefined && onUp !== null)
        ***REMOVED***
            this.onUpCallback = onUp;
        ***REMOVED***

        if (onPress !== undefined && onPress !== null)
        ***REMOVED***
            this.onPressCallback = onPress;
        ***REMOVED***

    ***REMOVED***,

    /**
    * If you need more fine-grained control over a Key you can create a new Phaser.Key object via this method.
    * The Key object can then be polled, have events attached to it, etc.
    *
    * @method Phaser.Keyboard#addKey
    * @param ***REMOVED***integer***REMOVED*** keycode - The ***REMOVED***@link Phaser.KeyCode keycode***REMOVED*** of the key.
    * @return ***REMOVED***Phaser.Key***REMOVED*** The Key object which you can store locally and reference directly.
    */
    addKey: function (keycode) ***REMOVED***

        if (!this._keys[keycode])
        ***REMOVED***
            this._keys[keycode] = new Phaser.Key(this.game, keycode);

            this.addKeyCapture(keycode);
        ***REMOVED***

        return this._keys[keycode];

    ***REMOVED***,

    /**
    * A practical way to create an object containing user selected hotkeys.
    *
    * For example,
    *
    *     addKeys( ***REMOVED*** 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D ***REMOVED*** );
    *
    * would return an object containing properties (`up`, `down`, `left` and `right`) referring to ***REMOVED***@link Phaser.Key***REMOVED*** object.
    *
    * @method Phaser.Keyboard#addKeys
    * @param ***REMOVED***object***REMOVED*** keys - A key mapping object, i.e. `***REMOVED*** 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S ***REMOVED***` or `***REMOVED*** 'up': 52, 'down': 53 ***REMOVED***`.
    * @return ***REMOVED***object***REMOVED*** An object containing the properties mapped to ***REMOVED***@link Phaser.Key***REMOVED*** values.
    */
    addKeys: function (keys) ***REMOVED***

        var output = ***REMOVED******REMOVED***;

        for (var key in keys)
        ***REMOVED***
            output[key] = this.addKey(keys[key]);
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Removes a Key object from the Keyboard manager.
    *
    * @method Phaser.Keyboard#removeKey
    * @param ***REMOVED***integer***REMOVED*** keycode - The ***REMOVED***@link Phaser.KeyCode keycode***REMOVED*** of the key to remove.
    */
    removeKey: function (keycode) ***REMOVED***

        if (this._keys[keycode])
        ***REMOVED***
            this._keys[keycode] = null;

            this.removeKeyCapture(keycode);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Creates and returns an object containing 4 hotkeys for Up, Down, Left and Right.
    *
    * @method Phaser.Keyboard#createCursorKeys
    * @return ***REMOVED***object***REMOVED*** An object containing properties: `up`, `down`, `left` and `right` of ***REMOVED***@link Phaser.Key***REMOVED*** objects.
    */
    createCursorKeys: function () ***REMOVED***

        return this.addKeys(***REMOVED*** 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 'right': Phaser.KeyCode.RIGHT ***REMOVED***);

    ***REMOVED***,

    /**
    * Starts the Keyboard event listeners running (keydown and keyup). They are attached to the window.
    * This is called automatically by Phaser.Input and should not normally be invoked directly.
    *
    * @method Phaser.Keyboard#start
    * @protected
    */
    start: function () ***REMOVED***

        if (this.game.device.cocoonJS)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this._onKeyDown !== null)
        ***REMOVED***
            //  Avoid setting multiple listeners
            return;
        ***REMOVED***

        var _this = this;

        this._onKeyDown = function (event) ***REMOVED***
            return _this.processKeyDown(event);
        ***REMOVED***;

        this._onKeyUp = function (event) ***REMOVED***
            return _this.processKeyUp(event);
        ***REMOVED***;

        this._onKeyPress = function (event) ***REMOVED***
            return _this.processKeyPress(event);
        ***REMOVED***;

        window.addEventListener('keydown', this._onKeyDown, false);
        window.addEventListener('keyup', this._onKeyUp, false);
        window.addEventListener('keypress', this._onKeyPress, false);

    ***REMOVED***,

    /**
    * Stops the Keyboard event listeners from running (keydown, keyup and keypress). They are removed from the window.
    *
    * @method Phaser.Keyboard#stop
    */
    stop: function () ***REMOVED***

        window.removeEventListener('keydown', this._onKeyDown);
        window.removeEventListener('keyup', this._onKeyUp);
        window.removeEventListener('keypress', this._onKeyPress);

        this._onKeyDown = null;
        this._onKeyUp = null;
        this._onKeyPress = null;

    ***REMOVED***,

    /**
    * Stops the Keyboard event listeners from running (keydown and keyup). They are removed from the window.
    * Also clears all key captures and currently created Key objects.
    *
    * @method Phaser.Keyboard#destroy
    */
    destroy: function () ***REMOVED***

        this.stop();

        this.clearCaptures();

        this._keys.length = 0;
        this._i = 0;

    ***REMOVED***,

    /**
    * By default when a key is pressed Phaser will not stop the event from propagating up to the browser.
    * There are some keys this can be annoying for, like the arrow keys or space bar, which make the browser window scroll.
    *
    * The `addKeyCapture` method enables consuming keyboard event for specific keys so it doesn't bubble up to the the browser
    * and cause the default browser behavior.
    *
    * Pass in either a single keycode or an array/hash of keycodes.
    *
    * @method Phaser.Keyboard#addKeyCapture
    * @param ***REMOVED***integer|integer[]|object***REMOVED*** keycode - Either a single ***REMOVED***@link Phaser.KeyCode keycode***REMOVED*** or an array/hash of keycodes such as `[65, 67, 68]`.
    */
    addKeyCapture: function (keycode) ***REMOVED***

        if (typeof keycode === 'object')
        ***REMOVED***
            for (var key in keycode)
            ***REMOVED***
                this._capture[keycode[key]] = true;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            this._capture[keycode] = true;
        ***REMOVED***
    ***REMOVED***,

    /**
    * Removes an existing key capture.
    *
    * @method Phaser.Keyboard#removeKeyCapture
    * @param ***REMOVED***integer***REMOVED*** keycode - The ***REMOVED***@link Phaser.KeyCode keycode***REMOVED*** to remove capturing of.
    */
    removeKeyCapture: function (keycode) ***REMOVED***

        delete this._capture[keycode];

    ***REMOVED***,

    /**
    * Clear all set key captures.
    *
    * @method Phaser.Keyboard#clearCaptures
    */
    clearCaptures: function () ***REMOVED***

        this._capture = ***REMOVED******REMOVED***;

    ***REMOVED***,

    /**
    * Updates all currently defined keys.
    *
    * @method Phaser.Keyboard#update
    */
    update: function () ***REMOVED***

        this._i = this._keys.length;

        while (this._i--)
        ***REMOVED***
            if (this._keys[this._i])
            ***REMOVED***
                this._keys[this._i].update();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Process the keydown event.
    *
    * @method Phaser.Keyboard#processKeyDown
    * @param ***REMOVED***KeyboardEvent***REMOVED*** event
    * @protected
    */
    processKeyDown: function (event) ***REMOVED***

        this.event = event;

        if (!this.game.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        var key = event.keyCode;

        //   The event is being captured but another hotkey may need it
        if (this._capture[key])
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (!this._keys[key])
        ***REMOVED***
            this._keys[key] = new Phaser.Key(this.game, key);
        ***REMOVED***

        this._keys[key].processKeyDown(event);

        this._k = key;

        if (this.onDownCallback)
        ***REMOVED***
            this.onDownCallback.call(this.callbackContext, event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Process the keypress event.
    *
    * @method Phaser.Keyboard#processKeyPress
    * @param ***REMOVED***KeyboardEvent***REMOVED*** event
    * @protected
    */
    processKeyPress: function (event) ***REMOVED***

        this.pressEvent = event;

        if (!this.game.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.onPressCallback)
        ***REMOVED***
            this.onPressCallback.call(this.callbackContext, String.fromCharCode(event.charCode), event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Process the keyup event.
    *
    * @method Phaser.Keyboard#processKeyUp
    * @param ***REMOVED***KeyboardEvent***REMOVED*** event
    * @protected
    */
    processKeyUp: function (event) ***REMOVED***

        this.event = event;

        if (!this.game.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        var key = event.keyCode;

        if (this._capture[key])
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (!this._keys[key])
        ***REMOVED***
            this._keys[key] = new Phaser.Key(this.game, key);
        ***REMOVED***

        this._keys[key].processKeyUp(event);

        if (this.onUpCallback)
        ***REMOVED***
            this.onUpCallback.call(this.callbackContext, event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Resets all Keys.
    *
    * @method Phaser.Keyboard#reset
    * @param ***REMOVED***boolean***REMOVED*** [hard=true] - A soft reset won't reset any events or callbacks that are bound to the Keys. A hard reset will.
    */
    reset: function (hard) ***REMOVED***

        if (hard === undefined) ***REMOVED*** hard = true; ***REMOVED***

        this.event = null;

        var i = this._keys.length;

        while (i--)
        ***REMOVED***
            if (this._keys[i])
            ***REMOVED***
                this._keys[i].reset(hard);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns `true` if the Key was pressed down within the `duration` value given, or `false` if it either isn't down,
    * or was pressed down longer ago than then given duration.
    * 
    * @method Phaser.Keyboard#downDuration
    * @param ***REMOVED***integer***REMOVED*** keycode - The ***REMOVED***@link Phaser.KeyCode keycode***REMOVED*** of the key to check: i.e. Phaser.KeyCode.UP or Phaser.KeyCode.SPACEBAR.
    * @param ***REMOVED***number***REMOVED*** [duration=50] - The duration within which the key is considered as being just pressed. Given in ms.
    * @return ***REMOVED***boolean***REMOVED*** True if the key was pressed down within the given duration, false if not or null if the Key wasn't found.
    */
    downDuration: function (keycode, duration) ***REMOVED***

        if (this._keys[keycode])
        ***REMOVED***
            return this._keys[keycode].downDuration(duration);
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns `true` if the Key was pressed down within the `duration` value given, or `false` if it either isn't down,
    * or was pressed down longer ago than then given duration.
    * 
    * @method Phaser.Keyboard#upDuration
    * @param ***REMOVED***Phaser.KeyCode|integer***REMOVED*** keycode - The keycode of the key to check, i.e. Phaser.KeyCode.UP or Phaser.KeyCode.SPACEBAR.
    * @param ***REMOVED***number***REMOVED*** [duration=50] - The duration within which the key is considered as being just released. Given in ms.
    * @return ***REMOVED***boolean***REMOVED*** True if the key was released within the given duration, false if not or null if the Key wasn't found.
    */
    upDuration: function (keycode, duration) ***REMOVED***

        if (this._keys[keycode])
        ***REMOVED***
            return this._keys[keycode].upDuration(duration);
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns true of the key is currently pressed down. Note that it can only detect key presses on the web browser.
    *
    * @method Phaser.Keyboard#isDown
    * @param ***REMOVED***integer***REMOVED*** keycode - The ***REMOVED***@link Phaser.KeyCode keycode***REMOVED*** of the key to check: i.e. Phaser.KeyCode.UP or Phaser.KeyCode.SPACEBAR.
    * @return ***REMOVED***boolean***REMOVED*** True if the key is currently down, false if not or null if the Key wasn't found.
    */
    isDown: function (keycode) ***REMOVED***

        if (this._keys[keycode])
        ***REMOVED***
            return this._keys[keycode].isDown;
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

/**
* Returns the string value of the most recently pressed key.
* @name Phaser.Keyboard#lastChar
* @property ***REMOVED***string***REMOVED*** lastChar - The string value of the most recently pressed key.
* @readonly
*/
Object.defineProperty(Phaser.Keyboard.prototype, "lastChar", ***REMOVED***

    get: function () ***REMOVED***

        if (this.event.charCode === 32)
        ***REMOVED***
            return '';
        ***REMOVED***
        else
        ***REMOVED***
            return String.fromCharCode(this.pressEvent.charCode);
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* Returns the most recently pressed Key. This is a Phaser.Key object and it changes every time a key is pressed.
* @name Phaser.Keyboard#lastKey
* @property ***REMOVED***Phaser.Key***REMOVED*** lastKey - The most recently pressed Key.
* @readonly
*/
Object.defineProperty(Phaser.Keyboard.prototype, "lastKey", ***REMOVED***

    get: function () ***REMOVED***

        return this._keys[this._k];

    ***REMOVED***

***REMOVED***);

Phaser.Keyboard.prototype.constructor = Phaser.Keyboard;

/**
* A key code represents a physical key on a keyboard.
*
* The KeyCode class contains commonly supported keyboard key codes which can be used
* as keycode`-parameters in several ***REMOVED***@link Phaser.Keyboard***REMOVED*** and ***REMOVED***@link Phaser.Key***REMOVED*** methods.
*
* _Note_: These values should only be used indirectly, eg. as `Phaser.KeyCode.KEY`.
* Future versions may replace the actual values, such that they remain compatible with `keycode`-parameters.
* The current implementation maps to the ***REMOVED***@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode KeyboardEvent.keyCode***REMOVED*** property.
*
* _Note_: Use `Phaser.KeyCode.KEY` instead of `Phaser.Keyboard.KEY` to refer to a key code;
* the latter approach is supported for compatibility.
*
* @class Phaser.KeyCode
*/
Phaser.KeyCode = ***REMOVED***
    /** @static */
    A: "A".charCodeAt(0),
    /** @static */
    B: "B".charCodeAt(0),
    /** @static */
    C: "C".charCodeAt(0),
    /** @static */
    D: "D".charCodeAt(0),
    /** @static */
    E: "E".charCodeAt(0),
    /** @static */
    F: "F".charCodeAt(0),
    /** @static */
    G: "G".charCodeAt(0),
    /** @static */
    H: "H".charCodeAt(0),
    /** @static */
    I: "I".charCodeAt(0),
    /** @static */
    J: "J".charCodeAt(0),
    /** @static */
    K: "K".charCodeAt(0),
    /** @static */
    L: "L".charCodeAt(0),
    /** @static */
    M: "M".charCodeAt(0),
    /** @static */
    N: "N".charCodeAt(0),
    /** @static */
    O: "O".charCodeAt(0),
    /** @static */
    P: "P".charCodeAt(0),
    /** @static */
    Q: "Q".charCodeAt(0),
    /** @static */
    R: "R".charCodeAt(0),
    /** @static */
    S: "S".charCodeAt(0),
    /** @static */
    T: "T".charCodeAt(0),
    /** @static */
    U: "U".charCodeAt(0),
    /** @static */
    V: "V".charCodeAt(0),
    /** @static */
    W: "W".charCodeAt(0),
    /** @static */
    X: "X".charCodeAt(0),
    /** @static */
    Y: "Y".charCodeAt(0),
    /** @static */
    Z: "Z".charCodeAt(0),
    /** @static */
    ZERO: "0".charCodeAt(0),
    /** @static */
    ONE: "1".charCodeAt(0),
    /** @static */
    TWO: "2".charCodeAt(0),
    /** @static */
    THREE: "3".charCodeAt(0),
    /** @static */
    FOUR: "4".charCodeAt(0),
    /** @static */
    FIVE: "5".charCodeAt(0),
    /** @static */
    SIX: "6".charCodeAt(0),
    /** @static */
    SEVEN: "7".charCodeAt(0),
    /** @static */
    EIGHT: "8".charCodeAt(0),
    /** @static */
    NINE: "9".charCodeAt(0),
    /** @static */
    NUMPAD_0: 96,
    /** @static */
    NUMPAD_1: 97,
    /** @static */
    NUMPAD_2: 98,
    /** @static */
    NUMPAD_3: 99,
    /** @static */
    NUMPAD_4: 100,
    /** @static */
    NUMPAD_5: 101,
    /** @static */
    NUMPAD_6: 102,
    /** @static */
    NUMPAD_7: 103,
    /** @static */
    NUMPAD_8: 104,
    /** @static */
    NUMPAD_9: 105,
    /** @static */
    NUMPAD_MULTIPLY: 106,
    /** @static */
    NUMPAD_ADD: 107,
    /** @static */
    NUMPAD_ENTER: 108,
    /** @static */
    NUMPAD_SUBTRACT: 109,
    /** @static */
    NUMPAD_DECIMAL: 110,
    /** @static */
    NUMPAD_DIVIDE: 111,
    /** @static */
    F1: 112,
    /** @static */
    F2: 113,
    /** @static */
    F3: 114,
    /** @static */
    F4: 115,
    /** @static */
    F5: 116,
    /** @static */
    F6: 117,
    /** @static */
    F7: 118,
    /** @static */
    F8: 119,
    /** @static */
    F9: 120,
    /** @static */
    F10: 121,
    /** @static */
    F11: 122,
    /** @static */
    F12: 123,
    /** @static */
    F13: 124,
    /** @static */
    F14: 125,
    /** @static */
    F15: 126,
    /** @static */
    COLON: 186,
    /** @static */
    EQUALS: 187,
    /** @static */
    COMMA: 188,
    /** @static */
    UNDERSCORE: 189,
    /** @static */
    PERIOD: 190,
    /** @static */
    QUESTION_MARK: 191,
    /** @static */
    TILDE: 192,
    /** @static */
    OPEN_BRACKET: 219,
    /** @static */
    BACKWARD_SLASH: 220,
    /** @static */
    CLOSED_BRACKET: 221,
    /** @static */
    QUOTES: 222,
    /** @static */
    BACKSPACE: 8,
    /** @static */
    TAB: 9,
    /** @static */
    CLEAR: 12,
    /** @static */
    ENTER: 13,
    /** @static */
    SHIFT: 16,
    /** @static */
    CONTROL: 17,
    /** @static */
    ALT: 18,
    /** @static */
    CAPS_LOCK: 20,
    /** @static */
    ESC: 27,
    /** @static */
    SPACEBAR: 32,
    /** @static */
    PAGE_UP: 33,
    /** @static */
    PAGE_DOWN: 34,
    /** @static */
    END: 35,
    /** @static */
    HOME: 36,
    /** @static */
    LEFT: 37,
    /** @static */
    UP: 38,
    /** @static */
    RIGHT: 39,
    /** @static */
    DOWN: 40,
    /** @static */
    PLUS: 43,
    /** @static */
    MINUS: 44,
    /** @static */
    INSERT: 45,
    /** @static */
    DELETE: 46,
    /** @static */
    HELP: 47,
    /** @static */
    NUM_LOCK: 144
***REMOVED***;

// Duplicate Phaser.KeyCode values in Phaser.Keyboard for compatibility
for (var key in Phaser.KeyCode)
***REMOVED***
    if (Phaser.KeyCode.hasOwnProperty(key) && !key.match(/[a-z]/))
    ***REMOVED***
        Phaser.Keyboard[key] = Phaser.KeyCode[key];
    ***REMOVED***
***REMOVED***
