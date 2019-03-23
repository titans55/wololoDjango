/**
* @author       @karlmacklin <tacklemcclean@gmail.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Gamepad class handles gamepad input and dispatches gamepad events.
*
* Remember to call `gamepad.start()`.
*
* HTML5 GAMEPAD API SUPPORT IS AT AN EXPERIMENTAL STAGE!
* At moment of writing this (end of 2013) only Chrome supports parts of it out of the box. Firefox supports it
* via prefs flags (about:config, search gamepad). The browsers map the same controllers differently.
* This class has constants for Windows 7 Chrome mapping of XBOX 360 controller.
*
* @class Phaser.Gamepad
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.Gamepad = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***object***REMOVED*** _gamepadIndexMap - Maps the browsers gamepad indices to our Phaser Gamepads
    * @private
    */
    this._gamepadIndexMap = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***Array***REMOVED*** _rawPads - The raw state of the gamepads from the browser
    * @private
    */
    this._rawPads = [];

    /**
    * @property ***REMOVED***boolean***REMOVED*** _active - Private flag for whether or not the API is polled
    * @private
    * @default
    */
    this._active = false;

    /**
    * Gamepad input will only be processed if enabled.
    * @property ***REMOVED***boolean***REMOVED*** enabled
    * @default
    */
    this.enabled = true;

    /**
    * Whether or not gamepads are supported in the current browser. Note that as of Dec. 2013 this check is actually not accurate at all due to poor implementation.
    * @property ***REMOVED***boolean***REMOVED*** _gamepadSupportAvailable - Are gamepads supported in this browser or not?
    * @private
    */
    this._gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads || (navigator.userAgent.indexOf('Firefox/') !== -1) || !!navigator.getGamepads;

    /**
    * Used to check for differences between earlier polls and current state of gamepads.
    * @property ***REMOVED***Array***REMOVED*** _prevRawGamepadTypes
    * @private
    * @default
    */
    this._prevRawGamepadTypes = [];

    /**
    * Used to check for differences between earlier polls and current state of gamepads.
    * @property ***REMOVED***Array***REMOVED*** _prevTimestamps
    * @private
    * @default
    */
    this._prevTimestamps = [];

    /**
    * @property ***REMOVED***object***REMOVED*** callbackContext - The context under which the callbacks are run.
    */
    this.callbackContext = this;

    /**
    * @property ***REMOVED***function***REMOVED*** onConnectCallback - This callback is invoked every time any gamepad is connected
    */
    this.onConnectCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onDisconnectCallback - This callback is invoked every time any gamepad is disconnected
    */
    this.onDisconnectCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onDownCallback - This callback is invoked every time any gamepad button is pressed down.
    */
    this.onDownCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onUpCallback - This callback is invoked every time any gamepad button is released.
    */
    this.onUpCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onAxisCallback - This callback is invoked every time any gamepad axis is changed.
    */
    this.onAxisCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onFloatCallback - This callback is invoked every time any gamepad button is changed to a value where value > 0 and value < 1.
    */
    this.onFloatCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _ongamepadconnected - Private callback for Firefox gamepad connection handling
    * @private
    */
    this._ongamepadconnected = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _gamepaddisconnected - Private callback for Firefox gamepad connection handling
    * @private
    */
    this._gamepaddisconnected = null;

    /**
    * @property ***REMOVED***Array<Phaser.SinglePad>***REMOVED*** _gamepads - The four Phaser Gamepads.
    * @private
    */
    this._gamepads = [
        new Phaser.SinglePad(game, this),
        new Phaser.SinglePad(game, this),
        new Phaser.SinglePad(game, this),
        new Phaser.SinglePad(game, this)
    ];

***REMOVED***;

Phaser.Gamepad.prototype = ***REMOVED***

    /**
    * Add callbacks to the main Gamepad handler to handle connect/disconnect/button down/button up/axis change/float value buttons.
    * 
    * @method Phaser.Gamepad#addCallbacks
    * @param ***REMOVED***object***REMOVED*** context - The context under which the callbacks are run.
    * @param ***REMOVED***object***REMOVED*** callbacks - Object that takes six different callback methods:
    * onConnectCallback, onDisconnectCallback, onDownCallback, onUpCallback, onAxisCallback, onFloatCallback
    */
    addCallbacks: function (context, callbacks) ***REMOVED***

        if (typeof callbacks !== 'undefined')
        ***REMOVED***
            this.onConnectCallback = (typeof callbacks.onConnect === 'function') ? callbacks.onConnect : this.onConnectCallback;
            this.onDisconnectCallback = (typeof callbacks.onDisconnect === 'function') ? callbacks.onDisconnect : this.onDisconnectCallback;
            this.onDownCallback = (typeof callbacks.onDown === 'function') ? callbacks.onDown : this.onDownCallback;
            this.onUpCallback = (typeof callbacks.onUp === 'function') ? callbacks.onUp : this.onUpCallback;
            this.onAxisCallback = (typeof callbacks.onAxis === 'function') ? callbacks.onAxis : this.onAxisCallback;
            this.onFloatCallback = (typeof callbacks.onFloat === 'function') ? callbacks.onFloat : this.onFloatCallback;
            this.callbackContext = context;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Starts the Gamepad event handling.
    * This MUST be called manually before Phaser will start polling the Gamepad API.
    *
    * @method Phaser.Gamepad#start
    */
    start: function () ***REMOVED***

        if (this._active)
        ***REMOVED***
            //  Avoid setting multiple listeners
            return;
        ***REMOVED***

        this._active = true;

        var _this = this;

        this._onGamepadConnected = function (event) ***REMOVED***
            return _this.onGamepadConnected(event);
        ***REMOVED***;

        this._onGamepadDisconnected = function (event) ***REMOVED***
            return _this.onGamepadDisconnected(event);
        ***REMOVED***;

        window.addEventListener('gamepadconnected', this._onGamepadConnected, false);
        window.addEventListener('gamepaddisconnected', this._onGamepadDisconnected, false);

    ***REMOVED***,

    /**
     * Handles the connection of a Gamepad.
     *
     * @method onGamepadConnected
     * @private
     * @param ***REMOVED***object***REMOVED*** event - The DOM event.
     */
    onGamepadConnected: function (event) ***REMOVED***

        var newPad = event.gamepad;
        this._rawPads.push(newPad);
        this._gamepads[newPad.index].connect(newPad);

    ***REMOVED***,

    /**
     * Handles the disconnection of a Gamepad.
     *
     * @method onGamepadDisconnected
     * @private
     * @param ***REMOVED***object***REMOVED*** event - The DOM event.
     */
    onGamepadDisconnected: function (event) ***REMOVED***

        var removedPad = event.gamepad;

        for (var i in this._rawPads)
        ***REMOVED***
            if (this._rawPads[i].index === removedPad.index)
            ***REMOVED***
                this._rawPads.splice(i,1);
            ***REMOVED***
        ***REMOVED***

        this._gamepads[removedPad.index].disconnect();

    ***REMOVED***,

    /**
    * Main gamepad update loop. Should not be called manually.
    * @method Phaser.Gamepad#update
    * @protected
    */
    update: function () ***REMOVED***

        this._pollGamepads();

        this.pad1.pollStatus();
        this.pad2.pollStatus();
        this.pad3.pollStatus();
        this.pad4.pollStatus();

    ***REMOVED***,

    /**
    * Updating connected gamepads (for Google Chrome). Should not be called manually.
    * 
    * @method Phaser.Gamepad#_pollGamepads
    * @private
    */
    _pollGamepads: function () ***REMOVED***

        if (!this._active)
        ***REMOVED***
            return;
        ***REMOVED***

        if (navigator['getGamepads'])
        ***REMOVED***
            var rawGamepads = navigator.getGamepads();
        ***REMOVED***
        else if (navigator['webkitGetGamepads'])
        ***REMOVED***
            var rawGamepads = navigator.webkitGetGamepads();
        ***REMOVED***
        else if (navigator['webkitGamepads'])
        ***REMOVED***
            var rawGamepads = navigator.webkitGamepads();
        ***REMOVED***

        if (rawGamepads)
        ***REMOVED***
            this._rawPads = [];

            var gamepadsChanged = false;

            for (var i = 0; i < rawGamepads.length; i++)
            ***REMOVED***
                if (typeof rawGamepads[i] !== this._prevRawGamepadTypes[i])
                ***REMOVED***
                    gamepadsChanged = true;
                    this._prevRawGamepadTypes[i] = typeof rawGamepads[i];
                ***REMOVED***

                if (rawGamepads[i])
                ***REMOVED***
                    this._rawPads.push(rawGamepads[i]);
                ***REMOVED***

                // Support max 4 pads at the moment
                if (i === 3)
                ***REMOVED***
                    break;
                ***REMOVED***
            ***REMOVED***

            for (var g = 0; g < this._gamepads.length; g++)
            ***REMOVED***
                this._gamepads[g]._rawPad = this._rawPads[g];
            ***REMOVED***

            if (gamepadsChanged)
            ***REMOVED***
                var validConnections = ***REMOVED*** rawIndices: ***REMOVED******REMOVED***, padIndices: ***REMOVED******REMOVED*** ***REMOVED***;
                var singlePad;

                for (var j = 0; j < this._gamepads.length; j++)
                ***REMOVED***
                    singlePad = this._gamepads[j];

                    if (singlePad.connected)
                    ***REMOVED***
                        for (var k = 0; k < this._rawPads.length; k++)
                        ***REMOVED***
                            if (this._rawPads[k].index === singlePad.index)
                            ***REMOVED***
                                validConnections.rawIndices[singlePad.index] = true;
                                validConnections.padIndices[j] = true;
                            ***REMOVED***
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***

                for (var l = 0; l < this._gamepads.length; l++)
                ***REMOVED***
                    singlePad = this._gamepads[l];

                    if (validConnections.padIndices[l])
                    ***REMOVED***
                        continue;
                    ***REMOVED***

                    if (this._rawPads.length < 1)
                    ***REMOVED***
                        singlePad.disconnect();
                    ***REMOVED***

                    for (var m = 0; m < this._rawPads.length; m++)
                    ***REMOVED***
                        if (validConnections.padIndices[l])
                        ***REMOVED***
                            break;
                        ***REMOVED***

                        var rawPad = this._rawPads[m];

                        if (rawPad)
                        ***REMOVED***
                            if (validConnections.rawIndices[rawPad.index])
                            ***REMOVED***
                                singlePad.disconnect();
                                continue;
                            ***REMOVED***
                            else
                            ***REMOVED***
                                singlePad.connect(rawPad);
                                validConnections.rawIndices[rawPad.index] = true;
                                validConnections.padIndices[l] = true;
                            ***REMOVED***
                        ***REMOVED***
                        else
                        ***REMOVED***
                            singlePad.disconnect();
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***,

    /**
    * Sets the deadZone variable for all four gamepads
    * @method Phaser.Gamepad#setDeadZones
    */
    setDeadZones: function (value) ***REMOVED***

        for (var i = 0; i < this._gamepads.length; i++)
        ***REMOVED***
            this._gamepads[i].deadZone = value;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Stops the Gamepad event handling.
    *
    * @method Phaser.Gamepad#stop
    */
    stop: function () ***REMOVED***

        this._active = false;

        window.removeEventListener('gamepadconnected', this._onGamepadConnected);
        window.removeEventListener('gamepaddisconnected', this._onGamepadDisconnected);

    ***REMOVED***,

    /**
    * Reset all buttons/axes of all gamepads
    * @method Phaser.Gamepad#reset
    */
    reset: function () ***REMOVED***

        this.update();

        for (var i = 0; i < this._gamepads.length; i++)
        ***REMOVED***
            this._gamepads[i].reset();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns the "just pressed" state of a button from ANY gamepad connected. Just pressed is considered true if the button was pressed down within the duration given (default 250ms).
    * @method Phaser.Gamepad#justPressed
    * @param ***REMOVED***number***REMOVED*** buttonCode - The buttonCode of the button to check for.
    * @param ***REMOVED***number***REMOVED*** [duration=250] - The duration below which the button is considered as being just pressed.
    * @return ***REMOVED***boolean***REMOVED*** True if the button is just pressed otherwise false.
    */
    justPressed: function (buttonCode, duration) ***REMOVED***

        for (var i = 0; i < this._gamepads.length; i++)
        ***REMOVED***
            if (this._gamepads[i].justPressed(buttonCode, duration) === true)
            ***REMOVED***
                return true;
            ***REMOVED***
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Returns the "just released" state of a button from ANY gamepad connected. Just released is considered as being true if the button was released within the duration given (default 250ms).
    * @method Phaser.Gamepad#justPressed
    * @param ***REMOVED***number***REMOVED*** buttonCode - The buttonCode of the button to check for.
    * @param ***REMOVED***number***REMOVED*** [duration=250] - The duration below which the button is considered as being just released.
    * @return ***REMOVED***boolean***REMOVED*** True if the button is just released otherwise false.
    */
    justReleased: function (buttonCode, duration) ***REMOVED***

        for (var i = 0; i < this._gamepads.length; i++)
        ***REMOVED***
            if (this._gamepads[i].justReleased(buttonCode, duration) === true)
            ***REMOVED***
                return true;
            ***REMOVED***
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Returns true if the button is currently pressed down, on ANY gamepad.
    * @method Phaser.Gamepad#isDown
    * @param ***REMOVED***number***REMOVED*** buttonCode - The buttonCode of the button to check for.
    * @return ***REMOVED***boolean***REMOVED*** True if a button is currently down.
    */
    isDown: function (buttonCode) ***REMOVED***

        for (var i = 0; i < this._gamepads.length; i++)
        ***REMOVED***
            if (this._gamepads[i].isDown(buttonCode) === true)
            ***REMOVED***
                return true;
            ***REMOVED***
        ***REMOVED***

        return false;
    ***REMOVED***,

    /**
     * Destroys this object and the associated event listeners.
     *
     * @method Phaser.Gamepad#destroy
     */
    destroy: function () ***REMOVED***

        this.stop();

        for (var i = 0; i < this._gamepads.length; i++)
        ***REMOVED***
            this._gamepads[i].destroy();
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.Gamepad.prototype.constructor = Phaser.Gamepad;

/**
* If the gamepad input is active or not - if not active it should not be updated from Input.js
* @name Phaser.Gamepad#active
* @property ***REMOVED***boolean***REMOVED*** active - If the gamepad input is active or not.
* @readonly
*/
Object.defineProperty(Phaser.Gamepad.prototype, "active", ***REMOVED***

    get: function () ***REMOVED***
        return this._active;
    ***REMOVED***

***REMOVED***);

/**
* Whether or not gamepads are supported in current browser.
* @name Phaser.Gamepad#supported
* @property ***REMOVED***boolean***REMOVED*** supported - Whether or not gamepads are supported in current browser.
* @readonly
*/
Object.defineProperty(Phaser.Gamepad.prototype, "supported", ***REMOVED***

    get: function () ***REMOVED***
        return this._gamepadSupportAvailable;
    ***REMOVED***

***REMOVED***);

/**
* How many live gamepads are currently connected.
* @name Phaser.Gamepad#padsConnected
* @property ***REMOVED***number***REMOVED*** padsConnected - How many live gamepads are currently connected.
* @readonly
*/
Object.defineProperty(Phaser.Gamepad.prototype, "padsConnected", ***REMOVED***

    get: function () ***REMOVED***
        return this._rawPads.length;
    ***REMOVED***

***REMOVED***);

/**
* Gamepad #1
* @name Phaser.Gamepad#pad1
* @property ***REMOVED***Phaser.SinglePad***REMOVED*** pad1 - Gamepad #1;
* @readonly
*/
Object.defineProperty(Phaser.Gamepad.prototype, "pad1", ***REMOVED***

    get: function () ***REMOVED***
        return this._gamepads[0];
    ***REMOVED***

***REMOVED***);

/**
* Gamepad #2
* @name Phaser.Gamepad#pad2
* @property ***REMOVED***Phaser.SinglePad***REMOVED*** pad2 - Gamepad #2
* @readonly
*/
Object.defineProperty(Phaser.Gamepad.prototype, "pad2", ***REMOVED***

    get: function () ***REMOVED***
        return this._gamepads[1];
    ***REMOVED***

***REMOVED***);

/**
* Gamepad #3
* @name Phaser.Gamepad#pad3
* @property ***REMOVED***Phaser.SinglePad***REMOVED*** pad3 - Gamepad #3
* @readonly
*/
Object.defineProperty(Phaser.Gamepad.prototype, "pad3", ***REMOVED***

    get: function () ***REMOVED***
        return this._gamepads[2];
    ***REMOVED***

***REMOVED***);

/**
* Gamepad #4
* @name Phaser.Gamepad#pad4
* @property ***REMOVED***Phaser.SinglePad***REMOVED*** pad4 - Gamepad #4
* @readonly
*/
Object.defineProperty(Phaser.Gamepad.prototype, "pad4", ***REMOVED***

    get: function () ***REMOVED***
        return this._gamepads[3];
    ***REMOVED***

***REMOVED***);

Phaser.Gamepad.BUTTON_0 = 0;
Phaser.Gamepad.BUTTON_1 = 1;
Phaser.Gamepad.BUTTON_2 = 2;
Phaser.Gamepad.BUTTON_3 = 3;
Phaser.Gamepad.BUTTON_4 = 4;
Phaser.Gamepad.BUTTON_5 = 5;
Phaser.Gamepad.BUTTON_6 = 6;
Phaser.Gamepad.BUTTON_7 = 7;
Phaser.Gamepad.BUTTON_8 = 8;
Phaser.Gamepad.BUTTON_9 = 9;
Phaser.Gamepad.BUTTON_10 = 10;
Phaser.Gamepad.BUTTON_11 = 11;
Phaser.Gamepad.BUTTON_12 = 12;
Phaser.Gamepad.BUTTON_13 = 13;
Phaser.Gamepad.BUTTON_14 = 14;
Phaser.Gamepad.BUTTON_15 = 15;

Phaser.Gamepad.AXIS_0 = 0;
Phaser.Gamepad.AXIS_1 = 1;
Phaser.Gamepad.AXIS_2 = 2;
Phaser.Gamepad.AXIS_3 = 3;
Phaser.Gamepad.AXIS_4 = 4;
Phaser.Gamepad.AXIS_5 = 5;
Phaser.Gamepad.AXIS_6 = 6;
Phaser.Gamepad.AXIS_7 = 7;
Phaser.Gamepad.AXIS_8 = 8;
Phaser.Gamepad.AXIS_9 = 9;

// Below mapping applies to XBOX 360 Wired and Wireless controller on Google Chrome (tested on Windows 7).
// - Firefox uses different map! Separate amount of buttons and axes. DPAD = axis and not a button.
// In other words - discrepancies when using gamepads.

Phaser.Gamepad.XBOX360_A = 0;
Phaser.Gamepad.XBOX360_B = 1;
Phaser.Gamepad.XBOX360_X = 2;
Phaser.Gamepad.XBOX360_Y = 3;
Phaser.Gamepad.XBOX360_LEFT_BUMPER = 4;
Phaser.Gamepad.XBOX360_RIGHT_BUMPER = 5;
Phaser.Gamepad.XBOX360_LEFT_TRIGGER = 6;
Phaser.Gamepad.XBOX360_RIGHT_TRIGGER = 7;
Phaser.Gamepad.XBOX360_BACK = 8;
Phaser.Gamepad.XBOX360_START = 9;
Phaser.Gamepad.XBOX360_STICK_LEFT_BUTTON = 10;
Phaser.Gamepad.XBOX360_STICK_RIGHT_BUTTON = 11;

Phaser.Gamepad.XBOX360_DPAD_LEFT = 14;
Phaser.Gamepad.XBOX360_DPAD_RIGHT = 15;
Phaser.Gamepad.XBOX360_DPAD_UP = 12;
Phaser.Gamepad.XBOX360_DPAD_DOWN = 13;

//  On FF 0 = Y, 1 = X, 2 = Y, 3 = X, 4 = left bumper, 5 = dpad left, 6 = dpad right
Phaser.Gamepad.XBOX360_STICK_LEFT_X = 0;
Phaser.Gamepad.XBOX360_STICK_LEFT_Y = 1;
Phaser.Gamepad.XBOX360_STICK_RIGHT_X = 2;
Phaser.Gamepad.XBOX360_STICK_RIGHT_Y = 3;

//  PlayStation 3 controller (masquerading as xbox360 controller) button mappings

Phaser.Gamepad.PS3XC_X = 0;
Phaser.Gamepad.PS3XC_CIRCLE = 1;
Phaser.Gamepad.PS3XC_SQUARE = 2;
Phaser.Gamepad.PS3XC_TRIANGLE = 3;
Phaser.Gamepad.PS3XC_L1 = 4;
Phaser.Gamepad.PS3XC_R1 = 5;
Phaser.Gamepad.PS3XC_L2 = 6; // analog trigger, range 0..1
Phaser.Gamepad.PS3XC_R2 = 7; // analog trigger, range 0..1
Phaser.Gamepad.PS3XC_SELECT = 8;
Phaser.Gamepad.PS3XC_START = 9;
Phaser.Gamepad.PS3XC_STICK_LEFT_BUTTON = 10;
Phaser.Gamepad.PS3XC_STICK_RIGHT_BUTTON = 11;
Phaser.Gamepad.PS3XC_DPAD_UP = 12;
Phaser.Gamepad.PS3XC_DPAD_DOWN = 13;
Phaser.Gamepad.PS3XC_DPAD_LEFT = 14;
Phaser.Gamepad.PS3XC_DPAD_RIGHT = 15;
Phaser.Gamepad.PS3XC_STICK_LEFT_X = 0; // analog stick, range -1..1
Phaser.Gamepad.PS3XC_STICK_LEFT_Y = 1; // analog stick, range -1..1
Phaser.Gamepad.PS3XC_STICK_RIGHT_X = 2; // analog stick, range -1..1
Phaser.Gamepad.PS3XC_STICK_RIGHT_Y = 3; // analog stick, range -1..1

/**
* @author       @karlmacklin <tacklemcclean@gmail.com>
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A single Phaser Gamepad
* 
* @class Phaser.SinglePad
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Current game instance.
* @param ***REMOVED***object***REMOVED*** padParent - The parent Phaser.Gamepad object (all gamepads reside under this)
*/
Phaser.SinglePad = function (game, padParent) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***number***REMOVED*** index - The gamepad index as per browsers data
    * @readonly
    */
    this.index = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** connected - Whether or not this particular gamepad is connected or not.
    * @readonly
    */
    this.connected = false;

    /**
    * @property ***REMOVED***object***REMOVED*** callbackContext - The context under which the callbacks are run.
    */
    this.callbackContext = this;

    /**
    * @property ***REMOVED***function***REMOVED*** onConnectCallback - This callback is invoked every time this gamepad is connected
    */
    this.onConnectCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onDisconnectCallback - This callback is invoked every time this gamepad is disconnected
    */
    this.onDisconnectCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onDownCallback - This callback is invoked every time a button is pressed down.
    */
    this.onDownCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onUpCallback - This callback is invoked every time a gamepad button is released.
    */
    this.onUpCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onAxisCallback - This callback is invoked every time an axis is changed.
    */
    this.onAxisCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onFloatCallback - This callback is invoked every time a button is changed to a value where value > 0 and value < 1.
    */
    this.onFloatCallback = null;

    /**
    * @property ***REMOVED***number***REMOVED*** deadZone - Dead zone for axis feedback - within this value you won't trigger updates.
    */
    this.deadZone = 0.26;

    /**
    * @property ***REMOVED***Phaser.Gamepad***REMOVED*** padParent - Main Phaser Gamepad object
    * @private
    */
    this._padParent = padParent;

    /**
    * @property ***REMOVED***object***REMOVED*** _rawPad - The 'raw' gamepad data.
    * @private
    */
    this._rawPad = null;

    /**
    * @property ***REMOVED***number***REMOVED*** _prevTimestamp - Used to check for differences between earlier polls and current state of gamepads.
    * @private
    */
    this._prevTimestamp = null;

    /**
    * @property ***REMOVED***Array***REMOVED*** _buttons - Array of Phaser.DeviceButton objects. This array is populated when the gamepad is connected.
    * @private
    */
    this._buttons = [];

    /**
    * @property ***REMOVED***number***REMOVED*** _buttonsLen - Length of the _buttons array.
    * @private
    */
    this._buttonsLen = 0;

    /**
    * @property ***REMOVED***Array***REMOVED*** _axes - Current axes state.
    * @private
    */
    this._axes = [];

    /**
    * @property ***REMOVED***number***REMOVED*** _axesLen - Length of the _axes array.
    * @private
    */
    this._axesLen = 0;

***REMOVED***;

Phaser.SinglePad.prototype = ***REMOVED***

    /**
    * Add callbacks to this Gamepad to handle connect / disconnect / button down / button up / axis change / float value buttons.
    * 
    * @method Phaser.SinglePad#addCallbacks
    * @param ***REMOVED***object***REMOVED*** context - The context under which the callbacks are run.
    * @param ***REMOVED***object***REMOVED*** callbacks - Object that takes six different callbak methods:
    * onConnectCallback, onDisconnectCallback, onDownCallback, onUpCallback, onAxisCallback, onFloatCallback
    */
    addCallbacks: function (context, callbacks) ***REMOVED***

        if (typeof callbacks !== 'undefined')
        ***REMOVED***
            this.onConnectCallback = (typeof callbacks.onConnect === 'function') ? callbacks.onConnect : this.onConnectCallback;
            this.onDisconnectCallback = (typeof callbacks.onDisconnect === 'function') ? callbacks.onDisconnect : this.onDisconnectCallback;
            this.onDownCallback = (typeof callbacks.onDown === 'function') ? callbacks.onDown : this.onDownCallback;
            this.onUpCallback = (typeof callbacks.onUp === 'function') ? callbacks.onUp : this.onUpCallback;
            this.onAxisCallback = (typeof callbacks.onAxis === 'function') ? callbacks.onAxis : this.onAxisCallback;
            this.onFloatCallback = (typeof callbacks.onFloat === 'function') ? callbacks.onFloat : this.onFloatCallback;

            this.callbackContext = context;
        ***REMOVED***
    ***REMOVED***,

    /**
    * Gets a DeviceButton object from this controller to be stored and referenced locally.
    * The DeviceButton object can then be polled, have events attached to it, etc.
    *
    * @method Phaser.SinglePad#getButton
    * @param ***REMOVED***number***REMOVED*** buttonCode - The buttonCode of the button, i.e. Phaser.Gamepad.BUTTON_0, Phaser.Gamepad.XBOX360_A, etc.
    * @return ***REMOVED***Phaser.DeviceButton***REMOVED*** The DeviceButton object which you can store locally and reference directly.
    */
    getButton: function (buttonCode) ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            return this._buttons[buttonCode];
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Main update function called by Phaser.Gamepad.
    * 
    * @method Phaser.SinglePad#pollStatus
    */
    pollStatus: function () ***REMOVED***

        if (!this.connected || !this.game.input.enabled || !this.game.input.gamepad.enabled || (this._rawPad.timestamp && (this._rawPad.timestamp === this._prevTimestamp)))
        ***REMOVED***
            return;
        ***REMOVED***

        for (var i = 0; i < this._buttonsLen; i++)
        ***REMOVED***
            var rawButtonVal = isNaN(this._rawPad.buttons[i]) ? this._rawPad.buttons[i].value : this._rawPad.buttons[i];

            if (rawButtonVal !== this._buttons[i].value)
            ***REMOVED***
                if (rawButtonVal === 1)
                ***REMOVED***
                    this.processButtonDown(i, rawButtonVal);
                ***REMOVED***
                else if (rawButtonVal === 0)
                ***REMOVED***
                    this.processButtonUp(i, rawButtonVal);
                ***REMOVED***
                else
                ***REMOVED***
                    this.processButtonFloat(i, rawButtonVal);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        
        for (var index = 0; index < this._axesLen; index++)
        ***REMOVED***
            var value = this._rawPad.axes[index];

            if ((value > 0 && value > this.deadZone) || (value < 0 && value < -this.deadZone))
            ***REMOVED***
                this.processAxisChange(index, value);
            ***REMOVED***
            else
            ***REMOVED***
                this.processAxisChange(index, 0);
            ***REMOVED***
        ***REMOVED***

        this._prevTimestamp = this._rawPad.timestamp;

    ***REMOVED***,

    /**
    * Gamepad connect function, should be called by Phaser.Gamepad.
    * 
    * @method Phaser.SinglePad#connect
    * @param ***REMOVED***object***REMOVED*** rawPad - The raw gamepad object
    */
    connect: function (rawPad) ***REMOVED***

        var triggerCallback = !this.connected;

        this.connected = true;
        this.index = rawPad.index;

        this._rawPad = rawPad;

        this._buttons = [];
        this._buttonsLen = rawPad.buttons.length;

        this._axes = [];
        this._axesLen = rawPad.axes.length;

        for (var a = 0; a < this._axesLen; a++)
        ***REMOVED***
            this._axes[a] = rawPad.axes[a];
        ***REMOVED***

        for (var buttonCode in rawPad.buttons)
        ***REMOVED***
            buttonCode = parseInt(buttonCode, 10);
            this._buttons[buttonCode] = new Phaser.DeviceButton(this, buttonCode);
        ***REMOVED***

        if (triggerCallback && this._padParent.onConnectCallback)
        ***REMOVED***
            this._padParent.onConnectCallback.call(this._padParent.callbackContext, this.index);
        ***REMOVED***

        if (triggerCallback && this.onConnectCallback)
        ***REMOVED***
            this.onConnectCallback.call(this.callbackContext);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Gamepad disconnect function, should be called by Phaser.Gamepad.
    * 
    * @method Phaser.SinglePad#disconnect
    */
    disconnect: function () ***REMOVED***

        var triggerCallback = this.connected;
        var disconnectingIndex = this.index;

        this.connected = false;
        this.index = null;

        this._rawPad = undefined;

        for (var i = 0; i < this._buttonsLen; i++)
        ***REMOVED***
            this._buttons[i].destroy();
        ***REMOVED***

        this._buttons = [];
        this._buttonsLen = 0;

        this._axes = [];
        this._axesLen = 0;

        if (triggerCallback && this._padParent.onDisconnectCallback)
        ***REMOVED***
            this._padParent.onDisconnectCallback.call(this._padParent.callbackContext, disconnectingIndex);
        ***REMOVED***

        if (triggerCallback && this.onDisconnectCallback)
        ***REMOVED***
            this.onDisconnectCallback.call(this.callbackContext);
        ***REMOVED***

    ***REMOVED***,

    /**
     * Destroys this object and associated callback references.
     *
     * @method Phaser.SinglePad#destroy
     */
    destroy: function () ***REMOVED***

        this._rawPad = undefined;

        for (var i = 0; i < this._buttonsLen; i++)
        ***REMOVED***
            this._buttons[i].destroy();
        ***REMOVED***

        this._buttons = [];
        this._buttonsLen = 0;

        this._axes = [];
        this._axesLen = 0;

        this.onConnectCallback = null;
        this.onDisconnectCallback = null;
        this.onDownCallback = null;
        this.onUpCallback = null;
        this.onAxisCallback = null;
        this.onFloatCallback = null;

    ***REMOVED***,

    /**
    * Handles changes in axis.
    * 
    * @method Phaser.SinglePad#processAxisChange
    * @param ***REMOVED***object***REMOVED*** axisState - State of the relevant axis
    */
    processAxisChange: function (index, value) ***REMOVED***

        if (this._axes[index] === value)
        ***REMOVED***
            return;
        ***REMOVED***

        this._axes[index] = value;

        if (this._padParent.onAxisCallback)
        ***REMOVED***
            this._padParent.onAxisCallback.call(this._padParent.callbackContext, this, index, value);
        ***REMOVED***

        if (this.onAxisCallback)
        ***REMOVED***
            this.onAxisCallback.call(this.callbackContext, this, index, value);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Handles button down press.
    * 
    * @method Phaser.SinglePad#processButtonDown
    * @param ***REMOVED***number***REMOVED*** buttonCode - Which buttonCode of this button
    * @param ***REMOVED***object***REMOVED*** value - Button value
    */
    processButtonDown: function (buttonCode, value) ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            this._buttons[buttonCode].start(null, value);
        ***REMOVED***

        if (this._padParent.onDownCallback)
        ***REMOVED***
            this._padParent.onDownCallback.call(this._padParent.callbackContext, buttonCode, value, this.index);
        ***REMOVED***

        if (this.onDownCallback)
        ***REMOVED***
            this.onDownCallback.call(this.callbackContext, buttonCode, value);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Handles button release.
    * 
    * @method Phaser.SinglePad#processButtonUp
    * @param ***REMOVED***number***REMOVED*** buttonCode - Which buttonCode of this button
    * @param ***REMOVED***object***REMOVED*** value - Button value
    */
    processButtonUp: function (buttonCode, value) ***REMOVED***

        if (this._padParent.onUpCallback)
        ***REMOVED***
            this._padParent.onUpCallback.call(this._padParent.callbackContext, buttonCode, value, this.index);
        ***REMOVED***

        if (this.onUpCallback)
        ***REMOVED***
            this.onUpCallback.call(this.callbackContext, buttonCode, value);
        ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            this._buttons[buttonCode].stop(null, value);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Handles buttons with floating values (like analog buttons that acts almost like an axis but still registers like a button)
    * 
    * @method Phaser.SinglePad#processButtonFloat
    * @param ***REMOVED***number***REMOVED*** buttonCode - Which buttonCode of this button
    * @param ***REMOVED***object***REMOVED*** value - Button value (will range somewhere between 0 and 1, but not specifically 0 or 1.
    */
    processButtonFloat: function (buttonCode, value) ***REMOVED***

        if (this._padParent.onFloatCallback)
        ***REMOVED***
            this._padParent.onFloatCallback.call(this._padParent.callbackContext, buttonCode, value, this.index);
        ***REMOVED***

        if (this.onFloatCallback)
        ***REMOVED***
            this.onFloatCallback.call(this.callbackContext, buttonCode, value);
        ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            this._buttons[buttonCode].padFloat(value);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns value of requested axis.
    * 
    * @method Phaser.SinglePad#axis
    * @param ***REMOVED***number***REMOVED*** axisCode - The index of the axis to check
    * @return ***REMOVED***number***REMOVED*** Axis value if available otherwise false
    */
    axis: function (axisCode) ***REMOVED***

        if (this._axes[axisCode])
        ***REMOVED***
            return this._axes[axisCode];
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Returns true if the button is pressed down.
    * 
    * @method Phaser.SinglePad#isDown
    * @param ***REMOVED***number***REMOVED*** buttonCode - The buttonCode of the button to check.
    * @return ***REMOVED***boolean***REMOVED*** True if the button is pressed down.
    */
    isDown: function (buttonCode) ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            return this._buttons[buttonCode].isDown;
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Returns true if the button is not currently pressed.
    * 
    * @method Phaser.SinglePad#isUp
    * @param ***REMOVED***number***REMOVED*** buttonCode - The buttonCode of the button to check.
    * @return ***REMOVED***boolean***REMOVED*** True if the button is not currently pressed down.
    */
    isUp: function (buttonCode) ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            return this._buttons[buttonCode].isUp;
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Returns the "just released" state of a button from this gamepad. Just released is considered as being true if the button was released within the duration given (default 250ms).
    * 
    * @method Phaser.SinglePad#justReleased
    * @param ***REMOVED***number***REMOVED*** buttonCode - The buttonCode of the button to check for.
    * @param ***REMOVED***number***REMOVED*** [duration=250] - The duration below which the button is considered as being just released.
    * @return ***REMOVED***boolean***REMOVED*** True if the button is just released otherwise false.
    */
    justReleased: function (buttonCode, duration) ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            return this._buttons[buttonCode].justReleased(duration);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns the "just pressed" state of a button from this gamepad. Just pressed is considered true if the button was pressed down within the duration given (default 250ms).
    * 
    * @method Phaser.SinglePad#justPressed
    * @param ***REMOVED***number***REMOVED*** buttonCode - The buttonCode of the button to check for.
    * @param ***REMOVED***number***REMOVED*** [duration=250] - The duration below which the button is considered as being just pressed.
    * @return ***REMOVED***boolean***REMOVED*** True if the button is just pressed otherwise false.
    */
    justPressed: function (buttonCode, duration) ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            return this._buttons[buttonCode].justPressed(duration);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns the value of a gamepad button. Intended mainly for cases when you have floating button values, for example
    * analog trigger buttons on the XBOX 360 controller.
    * 
    * @method Phaser.SinglePad#buttonValue
    * @param ***REMOVED***number***REMOVED*** buttonCode - The buttonCode of the button to check.
    * @return ***REMOVED***number***REMOVED*** Button value if available otherwise null. Be careful as this can incorrectly evaluate to 0.
    */
    buttonValue: function (buttonCode) ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            return this._buttons[buttonCode].value;
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Reset all buttons/axes of this gamepad.
    * 
    * @method Phaser.SinglePad#reset
    */
    reset: function () ***REMOVED***

        for (var j = 0; j < this._axes.length; j++)
        ***REMOVED***
            this._axes[j] = 0;
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.SinglePad.prototype.constructor = Phaser.SinglePad;
