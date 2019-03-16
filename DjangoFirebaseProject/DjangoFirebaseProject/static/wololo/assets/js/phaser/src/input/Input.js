/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Phaser.Input is the Input Manager for all types of Input across Phaser, including mouse, keyboard, touch and MSPointer.
* The Input manager is updated automatically by the core game loop.
*
* @class Phaser.Input
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Current game instance.
*/
Phaser.Input = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***HTMLCanvasElement***REMOVED*** hitCanvas - The canvas to which single pixels are drawn in order to perform pixel-perfect hit detection.
    * @default
    */
    this.hitCanvas = null;

    /**
    * @property ***REMOVED***CanvasRenderingContext2D***REMOVED*** hitContext - The context of the pixel perfect hit canvas.
    * @default
    */
    this.hitContext = null;

    /**
    * An array of callbacks that will be fired every time the activePointer receives a move event from the DOM.
    * To add a callback to this array please use `Input.addMoveCallback`.
    * @property ***REMOVED***array***REMOVED*** moveCallbacks
    * @protected
    */
    this.moveCallbacks = [];

    /**
    * @property ***REMOVED***function***REMOVED*** customCandidateHandler - See Input.setInteractiveCandidateHandler.
    * @private
    */
    this.customCandidateHandler = null;

    /**
    * @property ***REMOVED***object***REMOVED*** customCandidateHandlerContext - See Input.setInteractiveCandidateHandler.
    * @private
    */
    this.customCandidateHandlerContext = null;

    /**
    * @property ***REMOVED***number***REMOVED*** pollRate - How often should the input pointers be checked for updates? A value of 0 means every single frame (60fps); a value of 1 means every other frame (30fps) and so on.
    * @default
    */
    this.pollRate = 0;

    /**
    * When enabled, input (eg. Keyboard, Mouse, Touch) will be processed - as long as the individual sources are enabled themselves.
    *
    * When not enabled, _all_ input sources are ignored. To disable just one type of input; for example, the Mouse, use `input.mouse.enabled = false`.
    * @property ***REMOVED***boolean***REMOVED*** enabled
    * @default
    */
    this.enabled = true;

    /**
    * @property ***REMOVED***number***REMOVED*** multiInputOverride - Controls the expected behavior when using a mouse and touch together on a multi-input device.
    * @default
    */
    this.multiInputOverride = Phaser.Input.MOUSE_TOUCH_COMBINE;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** position - A point object representing the current position of the Pointer.
    * @default
    */
    this.position = null;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** speed - A point object representing the speed of the Pointer. Only really useful in single Pointer games; otherwise see the Pointer objects directly.
    */
    this.speed = null;

    /**
    * A Circle object centered on the x/y screen coordinates of the Input.
    * Default size of 44px (Apples recommended "finger tip" size) but can be changed to anything.
    * @property ***REMOVED***Phaser.Circle***REMOVED*** circle
    */
    this.circle = null;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** scale - The scale by which all input coordinates are multiplied; calculated by the ScaleManager. In an un-scaled game the values will be x = 1 and y = 1.
    */
    this.scale = null;

    /**
    * @property ***REMOVED***integer***REMOVED*** maxPointers - The maximum number of Pointers allowed to be active at any one time. A value of -1 is only limited by the total number of pointers. For lots of games it's useful to set this to 1.
    * @default -1 (Limited by total pointers.)
    */
    this.maxPointers = -1;

    /**
    * @property ***REMOVED***number***REMOVED*** tapRate - The number of milliseconds that the Pointer has to be pressed down and then released to be considered a tap or click.
    * @default
    */
    this.tapRate = 200;

    /**
    * @property ***REMOVED***number***REMOVED*** doubleTapRate - The number of milliseconds between taps of the same Pointer for it to be considered a double tap / click.
    * @default
    */
    this.doubleTapRate = 300;

    /**
    * @property ***REMOVED***number***REMOVED*** holdRate - The number of milliseconds that the Pointer has to be pressed down for it to fire a onHold event.
    * @default
    */
    this.holdRate = 2000;

    /**
    * @property ***REMOVED***number***REMOVED*** justPressedRate - The number of milliseconds below which the Pointer is considered justPressed.
    * @default
    */
    this.justPressedRate = 200;

    /**
    * @property ***REMOVED***number***REMOVED*** justReleasedRate - The number of milliseconds below which the Pointer is considered justReleased .
    * @default
    */
    this.justReleasedRate = 200;

    /**
    * Sets if the Pointer objects should record a history of x/y coordinates they have passed through.
    * The history is cleared each time the Pointer is pressed down.
    * The history is updated at the rate specified in Input.pollRate
    * @property ***REMOVED***boolean***REMOVED*** recordPointerHistory
    * @default
    */
    this.recordPointerHistory = false;

    /**
    * @property ***REMOVED***number***REMOVED*** recordRate - The rate in milliseconds at which the Pointer objects should update their tracking history.
    * @default
    */
    this.recordRate = 100;

    /**
    * The total number of entries that can be recorded into the Pointer objects tracking history.
    * If the Pointer is tracking one event every 100ms; then a trackLimit of 100 would store the last 10 seconds worth of history.
    * @property ***REMOVED***number***REMOVED*** recordLimit
    * @default
    */
    this.recordLimit = 100;

    /**
    * @property ***REMOVED***Phaser.Pointer***REMOVED*** pointer1 - A Pointer object.
    */
    this.pointer1 = null;

    /**
    * @property ***REMOVED***Phaser.Pointer***REMOVED*** pointer2 - A Pointer object.
    */
    this.pointer2 = null;

    /**
    * @property ***REMOVED***Phaser.Pointer***REMOVED*** pointer3 - A Pointer object.
    */
    this.pointer3 = null;

    /**
    * @property ***REMOVED***Phaser.Pointer***REMOVED*** pointer4 - A Pointer object.
    */
    this.pointer4 = null;

    /**
    * @property ***REMOVED***Phaser.Pointer***REMOVED*** pointer5 - A Pointer object.
    */
    this.pointer5 = null;

    /**
    * @property ***REMOVED***Phaser.Pointer***REMOVED*** pointer6 - A Pointer object.
    */
    this.pointer6 = null;

    /**
    * @property ***REMOVED***Phaser.Pointer***REMOVED*** pointer7 - A Pointer object.
    */
    this.pointer7 = null;

    /**
    * @property ***REMOVED***Phaser.Pointer***REMOVED*** pointer8 - A Pointer object.
    */
    this.pointer8 = null;

    /**
    * @property ***REMOVED***Phaser.Pointer***REMOVED*** pointer9 - A Pointer object.
    */
    this.pointer9 = null;

    /**
    * @property ***REMOVED***Phaser.Pointer***REMOVED*** pointer10 - A Pointer object.
    */
    this.pointer10 = null;

    /**
    * An array of non-mouse pointers that have been added to the game.
    * The properties `pointer1..N` are aliases for `pointers[0..N-1]`.
    * @property ***REMOVED***Phaser.Pointer[]***REMOVED*** pointers
    * @public
    * @readonly
    */
    this.pointers = [];

    /**
    * The most recently active Pointer object.
    * 
    * When you've limited max pointers to 1 this will accurately be either the first finger touched or mouse.
    * 
    * @property ***REMOVED***Phaser.Pointer***REMOVED*** activePointer
    */
    this.activePointer = null;

    /**
    * The mouse has its own unique Phaser.Pointer object which you can use if making a desktop specific game.
    * 
    * @property ***REMOVED***Pointer***REMOVED*** mousePointer
    */
    this.mousePointer = null;

    /**
    * The Mouse Input manager.
    * 
    * You should not usually access this manager directly, but instead use Input.mousePointer or Input.activePointer 
    * which normalizes all the input values for you, regardless of browser.
    * 
    * @property ***REMOVED***Phaser.Mouse***REMOVED*** mouse
    */
    this.mouse = null;

    /**
    * The Keyboard Input manager.
    * 
    * @property ***REMOVED***Phaser.Keyboard***REMOVED*** keyboard
    */
    this.keyboard = null;

    /**
    * The Touch Input manager.
    * 
    * You should not usually access this manager directly, but instead use Input.activePointer 
    * which normalizes all the input values for you, regardless of browser.
    * 
    * @property ***REMOVED***Phaser.Touch***REMOVED*** touch
    */
    this.touch = null;

    /**
    * The MSPointer Input manager.
    * 
    * You should not usually access this manager directly, but instead use Input.activePointer 
    * which normalizes all the input values for you, regardless of browser.
    * 
    * @property ***REMOVED***Phaser.MSPointer***REMOVED*** mspointer
    */
    this.mspointer = null;

    /**
    * The Gamepad Input manager.
    * 
    * @property ***REMOVED***Phaser.Gamepad***REMOVED*** gamepad
    */
    this.gamepad = null;

    /**
    * If the Input Manager has been reset locked then all calls made to InputManager.reset, 
    * such as from a State change, are ignored.
    * @property ***REMOVED***boolean***REMOVED*** resetLocked
    * @default
    */
    this.resetLocked = false;

    /**
    * A Signal that is dispatched each time a pointer is pressed down.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onDown
    */
    this.onDown = null;

    /**
    * A Signal that is dispatched each time a pointer is released.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onUp
    */
    this.onUp = null;

    /**
    * A Signal that is dispatched each time a pointer is tapped.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onTap
    */
    this.onTap = null;

    /**
    * A Signal that is dispatched each time a pointer is held down.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onHold
    */
    this.onHold = null;

    /**
    * You can tell all Pointers to ignore any Game Object with a `priorityID` lower than this value.
    * This is useful when stacking UI layers. Set to zero to disable.
    * @property ***REMOVED***number***REMOVED*** minPriorityID
    * @default
    */
    this.minPriorityID = 0;

    /**
    * A list of interactive objects. The InputHandler components add and remove themselves from this list.
    * @property ***REMOVED***Phaser.ArraySet***REMOVED*** interactiveItems
    */
    this.interactiveItems = new Phaser.ArraySet();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _localPoint - Internal cache var.
    * @private
    */
    this._localPoint = new Phaser.Point();

    /**
    * @property ***REMOVED***number***REMOVED*** _pollCounter - Internal var holding the current poll counter.
    * @private
    */
    this._pollCounter = 0;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _oldPosition - A point object representing the previous position of the Pointer.
    * @private
    */
    this._oldPosition = null;

    /**
    * @property ***REMOVED***number***REMOVED*** _x - x coordinate of the most recent Pointer event
    * @private
    */
    this._x = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _y - Y coordinate of the most recent Pointer event
    * @private
    */
    this._y = 0;

***REMOVED***;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Input.MOUSE_OVERRIDES_TOUCH = 0;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Input.TOUCH_OVERRIDES_MOUSE = 1;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Input.MOUSE_TOUCH_COMBINE = 2;

/**
* The maximum number of pointers that can be added. This excludes the mouse pointer.
* @constant
* @type ***REMOVED***integer***REMOVED***
*/
Phaser.Input.MAX_POINTERS = 10;

Phaser.Input.prototype = ***REMOVED***

    /**
    * Starts the Input Manager running.
    *
    * @method Phaser.Input#boot
    * @protected
    */
    boot: function () ***REMOVED***

        this.mousePointer = new Phaser.Pointer(this.game, 0, Phaser.PointerMode.CURSOR);
        this.addPointer();
        this.addPointer();

        this.mouse = new Phaser.Mouse(this.game);
        this.touch = new Phaser.Touch(this.game);
        this.mspointer = new Phaser.MSPointer(this.game);

        if (Phaser.Keyboard)
        ***REMOVED***
            this.keyboard = new Phaser.Keyboard(this.game);
        ***REMOVED***

        if (Phaser.Gamepad)
        ***REMOVED***
            this.gamepad = new Phaser.Gamepad(this.game);
        ***REMOVED***

        this.onDown = new Phaser.Signal();
        this.onUp = new Phaser.Signal();
        this.onTap = new Phaser.Signal();
        this.onHold = new Phaser.Signal();

        this.scale = new Phaser.Point(1, 1);
        this.speed = new Phaser.Point();
        this.position = new Phaser.Point();
        this._oldPosition = new Phaser.Point();

        this.circle = new Phaser.Circle(0, 0, 44);

        this.activePointer = this.mousePointer;

        this.hitCanvas = PIXI.CanvasPool.create(this, 1, 1);
        this.hitContext = this.hitCanvas.getContext('2d');

        this.mouse.start();
        this.touch.start();
        this.mspointer.start();
        this.mousePointer.active = true;

        if (this.keyboard)
        ***REMOVED***
            this.keyboard.start();
        ***REMOVED***

        var _this = this;

        this._onClickTrampoline = function (event) ***REMOVED***
            _this.onClickTrampoline(event);
        ***REMOVED***;

        this.game.canvas.addEventListener('click', this._onClickTrampoline, false);

    ***REMOVED***,

    /**
    * Stops all of the Input Managers from running.
    *
    * @method Phaser.Input#destroy
    */
    destroy: function () ***REMOVED***

        this.mouse.stop();
        this.touch.stop();
        this.mspointer.stop();

        if (this.keyboard)
        ***REMOVED***
            this.keyboard.stop();
        ***REMOVED***

        if (this.gamepad)
        ***REMOVED***
            this.gamepad.stop();
        ***REMOVED***

        this.moveCallbacks = [];

        PIXI.CanvasPool.remove(this);

        this.game.canvas.removeEventListener('click', this._onClickTrampoline);

    ***REMOVED***,

    /**
    * Adds a callback that is fired every time `Pointer.processInteractiveObjects` is called.
    * The purpose of `processInteractiveObjects` is to work out which Game Object the Pointer is going to
    * interact with. It works by polling all of the valid game objects, and then slowly discounting those
    * that don't meet the criteria (i.e. they aren't under the Pointer, are disabled, invisible, etc).
    *
    * Eventually a short-list of 'candidates' is created. These are all of the Game Objects which are valid
    * for input and overlap with the Pointer. If you need fine-grained control over which of the items is
    * selected then you can use this callback to do so.
    *
    * The callback will be sent 3 parameters:
    * 
    * 1) A reference to the Phaser.Pointer object that is processing the Items.
    * 2) An array containing all potential interactive candidates. This is an array of `InputHandler` objects, not Sprites.
    * 3) The current 'favorite' candidate, based on its priorityID and position in the display list.
    *
    * Your callback MUST return one of the candidates sent to it.
    * 
    * @method Phaser.Input#setInteractiveCandidateHandler
    * @param ***REMOVED***function***REMOVED*** callback - The callback that will be called each time `Pointer.processInteractiveObjects` is called. Set to `null` to disable.
    * @param ***REMOVED***object***REMOVED*** context - The context in which the callback will be called.
    */
    setInteractiveCandidateHandler: function (callback, context) ***REMOVED***

        this.customCandidateHandler = callback;
        this.customCandidateHandlerContext = context;

    ***REMOVED***,

    /**
    * Adds a callback that is fired every time the activePointer receives a DOM move event such as a mousemove or touchmove.
    *
    * The callback will be sent 4 parameters:
    * 
    * A reference to the Phaser.Pointer object that moved,
    * The x position of the pointer,
    * The y position,
    * A boolean indicating if the movement was the result of a 'click' event (such as a mouse click or touch down).
    * 
    * It will be called every time the activePointer moves, which in a multi-touch game can be a lot of times, so this is best
    * to only use if you've limited input to a single pointer (i.e. mouse or touch).
    * 
    * The callback is added to the Phaser.Input.moveCallbacks array and should be removed with Phaser.Input.deleteMoveCallback.
    * 
    * @method Phaser.Input#addMoveCallback
    * @param ***REMOVED***function***REMOVED*** callback - The callback that will be called each time the activePointer receives a DOM move event.
    * @param ***REMOVED***object***REMOVED*** context - The context in which the callback will be called.
    */
    addMoveCallback: function (callback, context) ***REMOVED***

        this.moveCallbacks.push(***REMOVED*** callback: callback, context: context ***REMOVED***);

    ***REMOVED***,

    /**
    * Removes the callback from the Phaser.Input.moveCallbacks array.
    * 
    * @method Phaser.Input#deleteMoveCallback
    * @param ***REMOVED***function***REMOVED*** callback - The callback to be removed.
    * @param ***REMOVED***object***REMOVED*** context - The context in which the callback exists.
    */
    deleteMoveCallback: function (callback, context) ***REMOVED***

        var i = this.moveCallbacks.length;

        while (i--)
        ***REMOVED***
            if (this.moveCallbacks[i].callback === callback && this.moveCallbacks[i].context === context)
            ***REMOVED***
                this.moveCallbacks.splice(i, 1);
                return;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Add a new Pointer object to the Input Manager.
    * By default Input creates 3 pointer objects: `mousePointer` (not include in part of general pointer pool), `pointer1` and `pointer2`.
    * This method adds an additional pointer, up to a maximum of Phaser.Input.MAX_POINTERS (default of 10).
    *
    * @method Phaser.Input#addPointer
    * @return ***REMOVED***Phaser.Pointer|null***REMOVED*** The new Pointer object that was created; null if a new pointer could not be added.
    */
    addPointer: function () ***REMOVED***

        if (this.pointers.length >= Phaser.Input.MAX_POINTERS)
        ***REMOVED***
            console.warn("Phaser.Input.addPointer: Maximum limit of " + Phaser.Input.MAX_POINTERS + " pointers reached.");
            return null;
        ***REMOVED***

        var id = this.pointers.length + 1;
        var pointer = new Phaser.Pointer(this.game, id, Phaser.PointerMode.TOUCH);

        this.pointers.push(pointer);
        this['pointer' + id] = pointer;

        return pointer;

    ***REMOVED***,

    /**
    * Updates the Input Manager. Called by the core Game loop.
    * 
    * @method Phaser.Input#update
    * @protected
    */
    update: function () ***REMOVED***

        if (this.keyboard)
        ***REMOVED***
            this.keyboard.update();
        ***REMOVED***

        if (this.pollRate > 0 && this._pollCounter < this.pollRate)
        ***REMOVED***
            this._pollCounter++;
            return;
        ***REMOVED***

        this.speed.x = this.position.x - this._oldPosition.x;
        this.speed.y = this.position.y - this._oldPosition.y;

        this._oldPosition.copyFrom(this.position);
        this.mousePointer.update();

        if (this.gamepad && this.gamepad.active)
        ***REMOVED***
            this.gamepad.update();
        ***REMOVED***

        for (var i = 0; i < this.pointers.length; i++)
        ***REMOVED***
            this.pointers[i].update();
        ***REMOVED***

        this._pollCounter = 0;

    ***REMOVED***,

    /**
    * Reset all of the Pointers and Input states.
    *
    * The optional `hard` parameter will reset any events or callbacks that may be bound.
    * Input.reset is called automatically during a State change or if a game loses focus / visibility.
    * To control control the reset manually set ***REMOVED***@link Phaser.InputManager.resetLocked***REMOVED*** to `true`.
    *
    * @method Phaser.Input#reset
    * @public
    * @param ***REMOVED***boolean***REMOVED*** [hard=false] - A soft reset won't reset any events or callbacks that are bound. A hard reset will.
    */
    reset: function (hard) ***REMOVED***

        if (!this.game.isBooted || this.resetLocked)
        ***REMOVED***
            return;
        ***REMOVED***

        if (hard === undefined) ***REMOVED*** hard = false; ***REMOVED***

        this.mousePointer.reset();

        if (this.keyboard)
        ***REMOVED***
            this.keyboard.reset(hard);
        ***REMOVED***

        if (this.gamepad)
        ***REMOVED***
            this.gamepad.reset();
        ***REMOVED***

        for (var i = 0; i < this.pointers.length; i++)
        ***REMOVED***
            this.pointers[i].reset();
        ***REMOVED***

        if (this.game.canvas.style.cursor !== 'none')
        ***REMOVED***
            this.game.canvas.style.cursor = 'inherit';
        ***REMOVED***

        if (hard)
        ***REMOVED***
            this.onDown.dispose();
            this.onUp.dispose();
            this.onTap.dispose();
            this.onHold.dispose();
            this.onDown = new Phaser.Signal();
            this.onUp = new Phaser.Signal();
            this.onTap = new Phaser.Signal();
            this.onHold = new Phaser.Signal();
            this.moveCallbacks = [];
        ***REMOVED***

        this._pollCounter = 0;

    ***REMOVED***,

    /**
    * Resets the speed and old position properties.
    *
    * @method Phaser.Input#resetSpeed
    * @param ***REMOVED***number***REMOVED*** x - Sets the oldPosition.x value.
    * @param ***REMOVED***number***REMOVED*** y - Sets the oldPosition.y value.
    */
    resetSpeed: function (x, y) ***REMOVED***

        this._oldPosition.setTo(x, y);
        this.speed.setTo(0, 0);

    ***REMOVED***,

    /**
    * Find the first free Pointer object and start it, passing in the event data.
    * This is called automatically by Phaser.Touch and Phaser.MSPointer.
    *
    * @method Phaser.Input#startPointer
    * @protected
    * @param ***REMOVED***any***REMOVED*** event - The event data from the Touch event.
    * @return ***REMOVED***Phaser.Pointer***REMOVED*** The Pointer object that was started or null if no Pointer object is available.
    */
    startPointer: function (event) ***REMOVED***

        if (this.maxPointers >= 0 && this.countActivePointers(this.maxPointers) >= this.maxPointers)
        ***REMOVED***
            return null;
        ***REMOVED***

        if (!this.pointer1.active)
        ***REMOVED***
            return this.pointer1.start(event);
        ***REMOVED***

        if (!this.pointer2.active)
        ***REMOVED***
            return this.pointer2.start(event);
        ***REMOVED***

        for (var i = 2; i < this.pointers.length; i++)
        ***REMOVED***
            var pointer = this.pointers[i];

            if (!pointer.active)
            ***REMOVED***
                return pointer.start(event);
            ***REMOVED***
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Updates the matching Pointer object, passing in the event data.
    * This is called automatically and should not normally need to be invoked.
    *
    * @method Phaser.Input#updatePointer
    * @protected
    * @param ***REMOVED***any***REMOVED*** event - The event data from the Touch event.
    * @return ***REMOVED***Phaser.Pointer***REMOVED*** The Pointer object that was updated; null if no pointer was updated.
    */
    updatePointer: function (event) ***REMOVED***

        if (this.pointer1.active && this.pointer1.identifier === event.identifier)
        ***REMOVED***
            return this.pointer1.move(event);
        ***REMOVED***

        if (this.pointer2.active && this.pointer2.identifier === event.identifier)
        ***REMOVED***
            return this.pointer2.move(event);
        ***REMOVED***

        for (var i = 2; i < this.pointers.length; i++)
        ***REMOVED***
            var pointer = this.pointers[i];

            if (pointer.active && pointer.identifier === event.identifier)
            ***REMOVED***
                return pointer.move(event);
            ***REMOVED***
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Stops the matching Pointer object, passing in the event data.
    *
    * @method Phaser.Input#stopPointer
    * @protected
    * @param ***REMOVED***any***REMOVED*** event - The event data from the Touch event.
    * @return ***REMOVED***Phaser.Pointer***REMOVED*** The Pointer object that was stopped or null if no Pointer object is available.
    */
    stopPointer: function (event) ***REMOVED***

        if (this.pointer1.active && this.pointer1.identifier === event.identifier)
        ***REMOVED***
            return this.pointer1.stop(event);
        ***REMOVED***

        if (this.pointer2.active && this.pointer2.identifier === event.identifier)
        ***REMOVED***
            return this.pointer2.stop(event);
        ***REMOVED***

        for (var i = 2; i < this.pointers.length; i++)
        ***REMOVED***
            var pointer = this.pointers[i];

            if (pointer.active && pointer.identifier === event.identifier)
            ***REMOVED***
                return pointer.stop(event);
            ***REMOVED***
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Returns the total number of active pointers, not exceeding the specified limit
    *
    * @name Phaser.Input#countActivePointers
    * @private
    * @property ***REMOVED***integer***REMOVED*** [limit=(max pointers)] - Stop counting after this.
    * @return ***REMOVED***integer***REMOVED*** The number of active pointers, or limit - whichever is less.
    */
    countActivePointers: function (limit) ***REMOVED***

        if (limit === undefined) ***REMOVED*** limit = this.pointers.length; ***REMOVED***

        var count = limit;

        for (var i = 0; i < this.pointers.length && count > 0; i++)
        ***REMOVED***
            var pointer = this.pointers[i];

            if (pointer.active)
            ***REMOVED***
                count--;
            ***REMOVED***
        ***REMOVED***

        return (limit - count);

    ***REMOVED***,

    /**
    * Get the first Pointer with the given active state.
    *
    * @method Phaser.Input#getPointer
    * @param ***REMOVED***boolean***REMOVED*** [isActive=false] - The state the Pointer should be in - active or inactive?
    * @return ***REMOVED***Phaser.Pointer***REMOVED*** A Pointer object or null if no Pointer object matches the requested state.
    */
    getPointer: function (isActive) ***REMOVED***

        if (isActive === undefined) ***REMOVED*** isActive = false; ***REMOVED***

        for (var i = 0; i < this.pointers.length; i++)
        ***REMOVED***
            var pointer = this.pointers[i];

            if (pointer.active === isActive)
            ***REMOVED***
                return pointer;
            ***REMOVED***
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Get the Pointer object whos `identifier` property matches the given identifier value.
    *
    * The identifier property is not set until the Pointer has been used at least once, as its populated by the DOM event.
    * Also it can change every time you press the pointer down, and is not fixed once set.
    * Note: Not all browsers set the identifier property and it's not part of the W3C spec, so you may need getPointerFromId instead.
    *
    * @method Phaser.Input#getPointerFromIdentifier
    * @param ***REMOVED***number***REMOVED*** identifier - The Pointer.identifier value to search for.
    * @return ***REMOVED***Phaser.Pointer***REMOVED*** A Pointer object or null if no Pointer object matches the requested identifier.
    */
    getPointerFromIdentifier: function (identifier) ***REMOVED***

        for (var i = 0; i < this.pointers.length; i++)
        ***REMOVED***
            var pointer = this.pointers[i];

            if (pointer.identifier === identifier)
            ***REMOVED***
                return pointer;
            ***REMOVED***
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Get the Pointer object whos `pointerId` property matches the given value.
    *
    * The pointerId property is not set until the Pointer has been used at least once, as its populated by the DOM event.
    * Also it can change every time you press the pointer down if the browser recycles it.
    *
    * @method Phaser.Input#getPointerFromId
    * @param ***REMOVED***number***REMOVED*** pointerId - The `pointerId` (not 'id') value to search for.
    * @return ***REMOVED***Phaser.Pointer***REMOVED*** A Pointer object or null if no Pointer object matches the requested identifier.
    */
    getPointerFromId: function (pointerId) ***REMOVED***

        for (var i = 0; i < this.pointers.length; i++)
        ***REMOVED***
            var pointer = this.pointers[i];

            if (pointer.pointerId === pointerId)
            ***REMOVED***
                return pointer;
            ***REMOVED***
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * This will return the local coordinates of the specified displayObject based on the given Pointer.
    *
    * @method Phaser.Input#getLocalPosition
    * @param ***REMOVED***Phaser.Sprite|Phaser.Image***REMOVED*** displayObject - The DisplayObject to get the local coordinates for.
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The Pointer to use in the check against the displayObject.
    * @return ***REMOVED***Phaser.Point***REMOVED*** A point containing the coordinates of the Pointer position relative to the DisplayObject.
    */
    getLocalPosition: function (displayObject, pointer, output) ***REMOVED***

        if (output === undefined) ***REMOVED*** output = new Phaser.Point(); ***REMOVED***

        var wt = displayObject.worldTransform;
        var id = 1 / (wt.a * wt.d + wt.c * -wt.b);

        return output.setTo(
            wt.d * id * pointer.x + -wt.c * id * pointer.y + (wt.ty * wt.c - wt.tx * wt.d) * id,
            wt.a * id * pointer.y + -wt.b * id * pointer.x + (-wt.ty * wt.a + wt.tx * wt.b) * id
        );

    ***REMOVED***,

    /**
    * Tests if the pointer hits the given object.
    *
    * @method Phaser.Input#hitTest
    * @param ***REMOVED***DisplayObject***REMOVED*** displayObject - The displayObject to test for a hit.
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The pointer to use for the test.
    * @param ***REMOVED***Phaser.Point***REMOVED*** localPoint - The local translated point.
    */
    hitTest: function (displayObject, pointer, localPoint) ***REMOVED***

        if (!displayObject.worldVisible)
        ***REMOVED***
            return false;
        ***REMOVED***

        this.getLocalPosition(displayObject, pointer, this._localPoint);

        localPoint.copyFrom(this._localPoint);

        if (displayObject.hitArea && displayObject.hitArea.contains)
        ***REMOVED***
            return (displayObject.hitArea.contains(this._localPoint.x, this._localPoint.y));
        ***REMOVED***
        else if (displayObject instanceof Phaser.TileSprite)
        ***REMOVED***
            var width = displayObject.width;
            var height = displayObject.height;
            var x1 = -width * displayObject.anchor.x;

            if (this._localPoint.x >= x1 && this._localPoint.x < x1 + width)
            ***REMOVED***
                var y1 = -height * displayObject.anchor.y;

                if (this._localPoint.y >= y1 && this._localPoint.y < y1 + height)
                ***REMOVED***
                    return true;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else if (displayObject instanceof PIXI.Sprite)
        ***REMOVED***
            var width = displayObject.texture.frame.width;
            var height = displayObject.texture.frame.height;
            var x1 = -width * displayObject.anchor.x;

            if (this._localPoint.x >= x1 && this._localPoint.x < x1 + width)
            ***REMOVED***
                var y1 = -height * displayObject.anchor.y;

                if (this._localPoint.y >= y1 && this._localPoint.y < y1 + height)
                ***REMOVED***
                    return true;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else if (displayObject instanceof Phaser.Graphics)
        ***REMOVED***
            for (var i = 0; i < displayObject.graphicsData.length; i++)
            ***REMOVED***
                var data = displayObject.graphicsData[i];

                if (!data.fill)
                ***REMOVED***
                    continue;
                ***REMOVED***

                //  Only deal with fills..
                if (data.shape && data.shape.contains(this._localPoint.x, this._localPoint.y))
                ***REMOVED***
                    return true;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        //  Didn't hit the parent, does it have any children?

        for (var i = 0; i < displayObject.children.length; i++)
        ***REMOVED***
            if (this.hitTest(displayObject.children[i], pointer, localPoint))
            ***REMOVED***
                return true;
            ***REMOVED***
        ***REMOVED***

        return false;
    ***REMOVED***,

    /**
    * Used for click trampolines. See ***REMOVED***@link Phaser.Pointer.addClickTrampoline***REMOVED***.
    *
    * @method Phaser.Input#onClickTrampoline
    * @private
    */
    onClickTrampoline: function () ***REMOVED***

        // It might not always be the active pointer, but this does work on
        // Desktop browsers (read: IE) with Mouse or MSPointer input.
        this.activePointer.processClickTrampolines();

    ***REMOVED***

***REMOVED***;

Phaser.Input.prototype.constructor = Phaser.Input;

/**
* The X coordinate of the most recently active pointer.
* This value takes game scaling into account automatically. See Pointer.screenX/clientX for source values.
* @name Phaser.Input#x
* @property ***REMOVED***number***REMOVED*** x
*/
Object.defineProperty(Phaser.Input.prototype, "x", ***REMOVED***

    get: function () ***REMOVED***
        return this._x;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this._x = Math.floor(value);
    ***REMOVED***

***REMOVED***);

/**
* The Y coordinate of the most recently active pointer.
* This value takes game scaling into account automatically. See Pointer.screenY/clientY for source values.
* @name Phaser.Input#y
* @property ***REMOVED***number***REMOVED*** y
*/
Object.defineProperty(Phaser.Input.prototype, "y", ***REMOVED***

    get: function () ***REMOVED***
        return this._y;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this._y = Math.floor(value);
    ***REMOVED***

***REMOVED***);

/**
* True if the Input is currently poll rate locked.
* @name Phaser.Input#pollLocked
* @property ***REMOVED***boolean***REMOVED*** pollLocked
* @readonly
*/
Object.defineProperty(Phaser.Input.prototype, "pollLocked", ***REMOVED***

    get: function () ***REMOVED***
        return (this.pollRate > 0 && this._pollCounter < this.pollRate);
    ***REMOVED***

***REMOVED***);

/**
* The total number of inactive Pointers.
* @name Phaser.Input#totalInactivePointers
* @property ***REMOVED***number***REMOVED*** totalInactivePointers
* @readonly
*/
Object.defineProperty(Phaser.Input.prototype, "totalInactivePointers", ***REMOVED***

    get: function () ***REMOVED***
        return this.pointers.length - this.countActivePointers();
    ***REMOVED***

***REMOVED***);

/**
* The total number of active Pointers, not counting the mouse pointer.
* @name Phaser.Input#totalActivePointers
* @property ***REMOVED***integers***REMOVED*** totalActivePointers
* @readonly
*/
Object.defineProperty(Phaser.Input.prototype, "totalActivePointers", ***REMOVED***

    get: function () ***REMOVED***
        return this.countActivePointers();
    ***REMOVED***

***REMOVED***);

/**
* The world X coordinate of the most recently active pointer.
* @name Phaser.Input#worldX
* @property ***REMOVED***number***REMOVED*** worldX - The world X coordinate of the most recently active pointer.
* @readonly
*/
Object.defineProperty(Phaser.Input.prototype, "worldX", ***REMOVED***

    get: function () ***REMOVED***
        return this.game.camera.view.x + this.x;
    ***REMOVED***

***REMOVED***);

/**
* The world Y coordinate of the most recently active pointer.
* @name Phaser.Input#worldY
* @property ***REMOVED***number***REMOVED*** worldY - The world Y coordinate of the most recently active pointer.
* @readonly
*/
Object.defineProperty(Phaser.Input.prototype, "worldY", ***REMOVED***

    get: function () ***REMOVED***
        return this.game.camera.view.y + this.y;
    ***REMOVED***

***REMOVED***);
