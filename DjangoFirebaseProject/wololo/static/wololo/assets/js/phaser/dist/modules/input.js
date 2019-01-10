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

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Mouse class is responsible for handling all aspects of mouse interaction with the browser.
*
* It captures and processes mouse events that happen on the game canvas object.
* It also adds a single `mouseup` listener to `window` which is used to capture the mouse being released
* when not over the game.
*
* You should not normally access this class directly, but instead use a Phaser.Pointer object
* which normalises all game input for you, including accurate button handling.
*
* @class Phaser.Mouse
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.Mouse = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***Phaser.Input***REMOVED*** input - A reference to the Phaser Input Manager.
    * @protected
    */
    this.input = game.input;

    /**
    * @property ***REMOVED***object***REMOVED*** callbackContext - The context under which callbacks are called.
    */
    this.callbackContext = this.game;

    /**
    * @property ***REMOVED***function***REMOVED*** mouseDownCallback - A callback that can be fired when the mouse is pressed down.
    */
    this.mouseDownCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** mouseUpCallback - A callback that can be fired when the mouse is released from a pressed down state.
    */
    this.mouseUpCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** mouseOutCallback - A callback that can be fired when the mouse is no longer over the game canvas.
    */
    this.mouseOutCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** mouseOverCallback - A callback that can be fired when the mouse enters the game canvas (usually after a mouseout).
    */
    this.mouseOverCallback = null;

    /**
     * @property ***REMOVED***function***REMOVED*** mouseWheelCallback - A callback that can be fired when the mousewheel is used.
     */
    this.mouseWheelCallback = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** capture - If true the DOM mouse events will have event.preventDefault applied to them, if false they will propagate fully.
    */
    this.capture = false;

    /**
    * This property was removed in Phaser 2.4 and should no longer be used.
    * Instead please see the Pointer button properties such as `Pointer.leftButton`, `Pointer.rightButton` and so on.
    * Or Pointer.button holds the DOM event button value if you require that.
    * @property ***REMOVED***number***REMOVED*** button
    * @default
    */
    this.button = -1;

    /**
     * The direction of the _last_ mousewheel usage 1 for up -1 for down.
     * @property ***REMOVED***number***REMOVED*** wheelDelta
     */
    this.wheelDelta = 0;

    /**
    * Mouse input will only be processed if enabled.
    * @property ***REMOVED***boolean***REMOVED*** enabled
    * @default
    */
    this.enabled = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** locked - If the mouse has been Pointer Locked successfully this will be set to true.
    * @default
    */
    this.locked = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** stopOnGameOut - If true Pointer.stop will be called if the mouse leaves the game canvas.
    * @default
    */
    this.stopOnGameOut = false;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** pointerLock - This event is dispatched when the browser enters or leaves pointer lock state.
    * @default
    */
    this.pointerLock = new Phaser.Signal();

    /**
    * The browser mouse DOM event. Will be null if no mouse event has ever been received.
    * Access this property only inside a Mouse event handler and do not keep references to it.
    * @property ***REMOVED***MouseEvent|null***REMOVED*** event
    * @default
    */
    this.event = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMouseDown - Internal event handler reference.
    * @private
    */
    this._onMouseDown = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMouseMove - Internal event handler reference.
    * @private
    */
    this._onMouseMove = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMouseUp - Internal event handler reference.
    * @private
    */
    this._onMouseUp = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMouseOut - Internal event handler reference.
    * @private
    */
    this._onMouseOut = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMouseOver - Internal event handler reference.
    * @private
    */
    this._onMouseOver = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMouseWheel - Internal event handler reference.
    * @private
    */
    this._onMouseWheel = null;

    /**
    * Wheel proxy event object, if required. Shared for all wheel events for this mouse.
    * @property ***REMOVED***Phaser.Mouse~WheelEventProxy***REMOVED*** _wheelEvent
    * @private
    */
    this._wheelEvent = null;

***REMOVED***;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Mouse.NO_BUTTON = -1;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Mouse.LEFT_BUTTON = 0;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Mouse.MIDDLE_BUTTON = 1;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Mouse.RIGHT_BUTTON = 2;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Mouse.BACK_BUTTON = 3;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Mouse.FORWARD_BUTTON = 4;

/**
 * @constant
 * @type ***REMOVED***number***REMOVED***
 */
Phaser.Mouse.WHEEL_UP = 1;

/**
 * @constant
 * @type ***REMOVED***number***REMOVED***
 */
Phaser.Mouse.WHEEL_DOWN = -1;

Phaser.Mouse.prototype = ***REMOVED***

    /**
    * Starts the event listeners running.
    * @method Phaser.Mouse#start
    */
    start: function () ***REMOVED***

        if (this.game.device.android && this.game.device.chrome === false)
        ***REMOVED***
            //  Android stock browser fires mouse events even if you preventDefault on the touchStart, so ...
            return;
        ***REMOVED***

        if (this._onMouseDown !== null)
        ***REMOVED***
            //  Avoid setting multiple listeners
            return;
        ***REMOVED***

        var _this = this;

        this._onMouseDown = function (event) ***REMOVED***
            return _this.onMouseDown(event);
        ***REMOVED***;

        this._onMouseMove = function (event) ***REMOVED***
            return _this.onMouseMove(event);
        ***REMOVED***;

        this._onMouseUp = function (event) ***REMOVED***
            return _this.onMouseUp(event);
        ***REMOVED***;

        this._onMouseUpGlobal = function (event) ***REMOVED***
            return _this.onMouseUpGlobal(event);
        ***REMOVED***;

        this._onMouseOutGlobal = function (event) ***REMOVED***
            return _this.onMouseOutGlobal(event);
        ***REMOVED***;

        this._onMouseOut = function (event) ***REMOVED***
            return _this.onMouseOut(event);
        ***REMOVED***;

        this._onMouseOver = function (event) ***REMOVED***
            return _this.onMouseOver(event);
        ***REMOVED***;

        this._onMouseWheel = function (event) ***REMOVED***
            return _this.onMouseWheel(event);
        ***REMOVED***;

        var canvas = this.game.canvas;

        canvas.addEventListener('mousedown', this._onMouseDown, true);
        canvas.addEventListener('mousemove', this._onMouseMove, true);
        canvas.addEventListener('mouseup', this._onMouseUp, true);

        if (!this.game.device.cocoonJS)
        ***REMOVED***
            window.addEventListener('mouseup', this._onMouseUpGlobal, true);
            window.addEventListener('mouseout', this._onMouseOutGlobal, true);
            canvas.addEventListener('mouseover', this._onMouseOver, true);
            canvas.addEventListener('mouseout', this._onMouseOut, true);
        ***REMOVED***

        var wheelEvent = this.game.device.wheelEvent;

        if (wheelEvent)
        ***REMOVED***
            canvas.addEventListener(wheelEvent, this._onMouseWheel, true);

            if (wheelEvent === 'mousewheel')
            ***REMOVED***
                this._wheelEvent = new WheelEventProxy(-1/40, 1);
            ***REMOVED***
            else if (wheelEvent === 'DOMMouseScroll')
            ***REMOVED***
                this._wheelEvent = new WheelEventProxy(1, 1);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * The internal method that handles the mouse down event from the browser.
    * @method Phaser.Mouse#onMouseDown
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseDown: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (this.mouseDownCallback)
        ***REMOVED***
            this.mouseDownCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        event['identifier'] = 0;

        this.input.mousePointer.start(event);

    ***REMOVED***,

    /**
    * The internal method that handles the mouse move event from the browser.
    * @method Phaser.Mouse#onMouseMove
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseMove: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (this.mouseMoveCallback)
        ***REMOVED***
            this.mouseMoveCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        event['identifier'] = 0;

        this.input.mousePointer.move(event);

    ***REMOVED***,

    /**
    * The internal method that handles the mouse up event from the browser.
    * @method Phaser.Mouse#onMouseUp
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseUp: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (this.mouseUpCallback)
        ***REMOVED***
            this.mouseUpCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        event['identifier'] = 0;

        this.input.mousePointer.stop(event);

    ***REMOVED***,

    /**
    * The internal method that handles the mouse up event from the window.
    *
    * @method Phaser.Mouse#onMouseUpGlobal
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseUpGlobal: function (event) ***REMOVED***

        if (!this.input.mousePointer.withinGame)
        ***REMOVED***
            if (this.mouseUpCallback)
            ***REMOVED***
                this.mouseUpCallback.call(this.callbackContext, event);
            ***REMOVED***

            event['identifier'] = 0;

            this.input.mousePointer.stop(event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The internal method that handles the mouse out event from the window.
    *
    * @method Phaser.Mouse#onMouseOutGlobal
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseOutGlobal: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        this.input.mousePointer.withinGame = false;

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        //  If we get a mouseout event from the window then basically
        //  something serious has gone down, usually along the lines of
        //  the browser opening a context-menu or similar.
        //  On OS X Chrome especially this is bad news, as it blocks
        //  us then getting a mouseup event, so we need to force that through.
        //
        //  No matter what, we must cancel the left and right buttons

        this.input.mousePointer.stop(event);
        this.input.mousePointer.leftButton.stop(event);
        this.input.mousePointer.rightButton.stop(event);

    ***REMOVED***,

    /**
    * The internal method that handles the mouse out event from the browser.
    *
    * @method Phaser.Mouse#onMouseOut
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseOut: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        this.input.mousePointer.withinGame = false;

        if (this.mouseOutCallback)
        ***REMOVED***
            this.mouseOutCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.stopOnGameOut)
        ***REMOVED***
            event['identifier'] = 0;

            this.input.mousePointer.stop(event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The internal method that handles the mouse over event from the browser.
    *
    * @method Phaser.Mouse#onMouseOver
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseOver: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        this.input.mousePointer.withinGame = true;

        if (this.mouseOverCallback)
        ***REMOVED***
            this.mouseOverCallback.call(this.callbackContext, event);
        ***REMOVED***

    ***REMOVED***,

    /**
     * The internal method that handles the mouse wheel event from the browser.
     *
     * @method Phaser.Mouse#onMouseWheel
     * @param ***REMOVED***MouseEvent***REMOVED*** event - The native event from the browser.
     */
    onMouseWheel: function (event) ***REMOVED***

        if (this._wheelEvent) ***REMOVED***
            event = this._wheelEvent.bindEvent(event);
        ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        // reverse detail for firefox
        this.wheelDelta = Phaser.Math.clamp(-event.deltaY, -1, 1);

        if (this.mouseWheelCallback)
        ***REMOVED***
            this.mouseWheelCallback.call(this.callbackContext, event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * If the browser supports it you can request that the pointer be locked to the browser window.
    * This is classically known as 'FPS controls', where the pointer can't leave the browser until the user presses an exit key.
    * If the browser successfully enters a locked state the event Phaser.Mouse.pointerLock will be dispatched and the first parameter will be 'true'.
    * @method Phaser.Mouse#requestPointerLock
    */
    requestPointerLock: function () ***REMOVED***

        if (this.game.device.pointerLock)
        ***REMOVED***
            var element = this.game.canvas;

            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

            element.requestPointerLock();

            var _this = this;

            this._pointerLockChange = function (event) ***REMOVED***
                return _this.pointerLockChange(event);
            ***REMOVED***;

            document.addEventListener('pointerlockchange', this._pointerLockChange, true);
            document.addEventListener('mozpointerlockchange', this._pointerLockChange, true);
            document.addEventListener('webkitpointerlockchange', this._pointerLockChange, true);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal pointerLockChange handler.
    *
    * @method Phaser.Mouse#pointerLockChange
    * @param ***REMOVED***Event***REMOVED*** event - The native event from the browser. This gets stored in Mouse.event.
    */
    pointerLockChange: function (event) ***REMOVED***

        var element = this.game.canvas;

        if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element)
        ***REMOVED***
            //  Pointer was successfully locked
            this.locked = true;
            this.pointerLock.dispatch(true, event);
        ***REMOVED***
        else
        ***REMOVED***
            //  Pointer was unlocked
            this.locked = false;
            this.pointerLock.dispatch(false, event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal release pointer lock handler.
    * @method Phaser.Mouse#releasePointerLock
    */
    releasePointerLock: function () ***REMOVED***

        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;

        document.exitPointerLock();

        document.removeEventListener('pointerlockchange', this._pointerLockChange, true);
        document.removeEventListener('mozpointerlockchange', this._pointerLockChange, true);
        document.removeEventListener('webkitpointerlockchange', this._pointerLockChange, true);

    ***REMOVED***,

    /**
    * Stop the event listeners.
    * @method Phaser.Mouse#stop
    */
    stop: function () ***REMOVED***

        var canvas = this.game.canvas;

        canvas.removeEventListener('mousedown', this._onMouseDown, true);
        canvas.removeEventListener('mousemove', this._onMouseMove, true);
        canvas.removeEventListener('mouseup', this._onMouseUp, true);
        canvas.removeEventListener('mouseover', this._onMouseOver, true);
        canvas.removeEventListener('mouseout', this._onMouseOut, true);

        var wheelEvent = this.game.device.wheelEvent;

        if (wheelEvent)
        ***REMOVED***
            canvas.removeEventListener(wheelEvent, this._onMouseWheel, true);
        ***REMOVED***

        window.removeEventListener('mouseup', this._onMouseUpGlobal, true);
        window.removeEventListener('mouseout', this._onMouseOutGlobal, true);

        document.removeEventListener('pointerlockchange', this._pointerLockChange, true);
        document.removeEventListener('mozpointerlockchange', this._pointerLockChange, true);
        document.removeEventListener('webkitpointerlockchange', this._pointerLockChange, true);

    ***REMOVED***

***REMOVED***;

Phaser.Mouse.prototype.constructor = Phaser.Mouse;

/* jshint latedef:nofunc */
/**
* A purely internal event support class to proxy 'wheelscroll' and 'DOMMouseWheel'
* events to 'wheel'-like events.
*
* See https://developer.mozilla.org/en-US/docs/Web/Events/mousewheel for choosing a scale and delta mode.
*
* @method Phaser.Mouse#WheelEventProxy
* @private
* @param ***REMOVED***number***REMOVED*** scaleFactor - Scale factor as applied to wheelDelta/wheelDeltaX or details.
* @param ***REMOVED***integer***REMOVED*** deltaMode - The reported delta mode.
*/
function WheelEventProxy (scaleFactor, deltaMode) ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** _scaleFactor - Scale factor as applied to wheelDelta/wheelDeltaX or details.
    * @private
    */
    this._scaleFactor = scaleFactor;

    /**
    * @property ***REMOVED***number***REMOVED*** _deltaMode - The reported delta mode.
    * @private
    */
    this._deltaMode = deltaMode;

    /**
    * @property ***REMOVED***any***REMOVED*** originalEvent - The original event _currently_ being proxied; the getters will follow suit.
    * @private
    */
    this.originalEvent = null;

***REMOVED***

WheelEventProxy.prototype = ***REMOVED******REMOVED***;
WheelEventProxy.prototype.constructor = WheelEventProxy;

WheelEventProxy.prototype.bindEvent = function (event) ***REMOVED***

    // Generate stubs automatically
    if (!WheelEventProxy._stubsGenerated && event)
    ***REMOVED***
        var makeBinder = function (name) ***REMOVED***

            return function () ***REMOVED***
                var v = this.originalEvent[name];
                return typeof v !== 'function' ? v : v.bind(this.originalEvent);
            ***REMOVED***;

        ***REMOVED***;

        for (var prop in event)
        ***REMOVED***
            if (!(prop in WheelEventProxy.prototype))
            ***REMOVED***
                Object.defineProperty(WheelEventProxy.prototype, prop, ***REMOVED***
                    get: makeBinder(prop)
                ***REMOVED***);
            ***REMOVED***
        ***REMOVED***
        WheelEventProxy._stubsGenerated = true;
    ***REMOVED***

    this.originalEvent = event;
    return this;

***REMOVED***;

Object.defineProperties(WheelEventProxy.prototype, ***REMOVED***
    "type": ***REMOVED*** value: "wheel" ***REMOVED***,
    "deltaMode": ***REMOVED*** get: function () ***REMOVED*** return this._deltaMode; ***REMOVED*** ***REMOVED***,
    "deltaY": ***REMOVED***
        get: function () ***REMOVED***
            return (this._scaleFactor * (this.originalEvent.wheelDelta || this.originalEvent.detail)) || 0;
        ***REMOVED***
    ***REMOVED***,
    "deltaX": ***REMOVED***
        get: function () ***REMOVED***
            return (this._scaleFactor * this.originalEvent.wheelDeltaX) || 0;
        ***REMOVED***
    ***REMOVED***,
    "deltaZ": ***REMOVED*** value: 0 ***REMOVED***
***REMOVED***);

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The MSPointer class handles Microsoft touch interactions with the game and the resulting Pointer objects.
*
* It will work only in Internet Explorer 10+ and Windows Store or Windows Phone 8 apps using JavaScript.
* http://msdn.microsoft.com/en-us/library/ie/hh673557(v=vs.85).aspx
*
* You should not normally access this class directly, but instead use a Phaser.Pointer object which 
* normalises all game input for you including accurate button handling.
*
* Please note that at the current time of writing Phaser does not yet support chorded button interactions:
* http://www.w3.org/TR/pointerevents/#chorded-button-interactions
*
* @class Phaser.MSPointer
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.MSPointer = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***Phaser.Input***REMOVED*** input - A reference to the Phaser Input Manager.
    * @protected
    */
    this.input = game.input;

    /**
    * @property ***REMOVED***object***REMOVED*** callbackContext - The context under which callbacks are called (defaults to game).
    */
    this.callbackContext = this.game;

    /**
    * @property ***REMOVED***function***REMOVED*** pointerDownCallback - A callback that can be fired on a MSPointerDown event.
    */
    this.pointerDownCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** pointerMoveCallback - A callback that can be fired on a MSPointerMove event.
    */
    this.pointerMoveCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** pointerUpCallback - A callback that can be fired on a MSPointerUp event.
    */
    this.pointerUpCallback = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** capture - If true the Pointer events will have event.preventDefault applied to them, if false they will propagate fully.
    */
    this.capture = true;

    /**
    * This property was removed in Phaser 2.4 and should no longer be used.
    * Instead please see the Pointer button properties such as `Pointer.leftButton`, `Pointer.rightButton` and so on.
    * Or Pointer.button holds the DOM event button value if you require that.
    * @property ***REMOVED***number***REMOVED*** button
    */
    this.button = -1;

    /**
    * The browser MSPointer DOM event. Will be null if no event has ever been received.
    * Access this property only inside a Pointer event handler and do not keep references to it.
    * @property ***REMOVED***MSPointerEvent|null***REMOVED*** event
    * @default
    */
    this.event = null;

    /**
    * MSPointer input will only be processed if enabled.
    * @property ***REMOVED***boolean***REMOVED*** enabled
    * @default
    */
    this.enabled = true;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMSPointerDown - Internal function to handle MSPointer events.
    * @private
    */
    this._onMSPointerDown = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMSPointerMove - Internal function to handle MSPointer events.
    * @private
    */
    this._onMSPointerMove = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMSPointerUp - Internal function to handle MSPointer events.
    * @private
    */
    this._onMSPointerUp = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMSPointerUpGlobal - Internal function to handle MSPointer events.
    * @private
    */
    this._onMSPointerUpGlobal = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMSPointerOut - Internal function to handle MSPointer events.
    * @private
    */
    this._onMSPointerOut = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMSPointerOver - Internal function to handle MSPointer events.
    * @private
    */
    this._onMSPointerOver = null;

***REMOVED***;

Phaser.MSPointer.prototype = ***REMOVED***

    /**
    * Starts the event listeners running.
    * @method Phaser.MSPointer#start
    */
    start: function () ***REMOVED***

        if (this._onMSPointerDown !== null)
        ***REMOVED***
            //  Avoid setting multiple listeners
            return;
        ***REMOVED***

        var _this = this;

        if (this.game.device.mspointer)
        ***REMOVED***
            this._onMSPointerDown = function (event) ***REMOVED***
                return _this.onPointerDown(event);
            ***REMOVED***;

            this._onMSPointerMove = function (event) ***REMOVED***
                return _this.onPointerMove(event);
            ***REMOVED***;

            this._onMSPointerUp = function (event) ***REMOVED***
                return _this.onPointerUp(event);
            ***REMOVED***;

            this._onMSPointerUpGlobal = function (event) ***REMOVED***
                return _this.onPointerUpGlobal(event);
            ***REMOVED***;

            this._onMSPointerOut = function (event) ***REMOVED***
                return _this.onPointerOut(event);
            ***REMOVED***;

            this._onMSPointerOver = function (event) ***REMOVED***
                return _this.onPointerOver(event);
            ***REMOVED***;

            var canvas = this.game.canvas;

            canvas.addEventListener('MSPointerDown', this._onMSPointerDown, false);
            canvas.addEventListener('MSPointerMove', this._onMSPointerMove, false);
            canvas.addEventListener('MSPointerUp', this._onMSPointerUp, false);

            //  IE11+ uses non-prefix events
            canvas.addEventListener('pointerdown', this._onMSPointerDown, false);
            canvas.addEventListener('pointermove', this._onMSPointerMove, false);
            canvas.addEventListener('pointerup', this._onMSPointerUp, false);

            canvas.style['-ms-content-zooming'] = 'none';
            canvas.style['-ms-touch-action'] = 'none';

            if (!this.game.device.cocoonJS)
            ***REMOVED***
                window.addEventListener('MSPointerUp', this._onMSPointerUpGlobal, true);
                canvas.addEventListener('MSPointerOver', this._onMSPointerOver, true);
                canvas.addEventListener('MSPointerOut', this._onMSPointerOut, true);

                //  IE11+ uses non-prefix events
                window.addEventListener('pointerup', this._onMSPointerUpGlobal, true);
                canvas.addEventListener('pointerover', this._onMSPointerOver, true);
                canvas.addEventListener('pointerout', this._onMSPointerOut, true);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * The function that handles the PointerDown event.
    * 
    * @method Phaser.MSPointer#onPointerDown
    * @param ***REMOVED***PointerEvent***REMOVED*** event - The native DOM event.
    */
    onPointerDown: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (this.pointerDownCallback)
        ***REMOVED***
            this.pointerDownCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        event.identifier = event.pointerId;

        if (event.pointerType === 'mouse' || event.pointerType === 0x00000004)
        ***REMOVED***
            this.input.mousePointer.start(event);
        ***REMOVED***
        else
        ***REMOVED***
            this.input.startPointer(event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The function that handles the PointerMove event.
    * @method Phaser.MSPointer#onPointerMove
    * @param ***REMOVED***PointerEvent***REMOVED*** event - The native DOM event.
    */
    onPointerMove: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (this.pointerMoveCallback)
        ***REMOVED***
            this.pointerMoveCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        event.identifier = event.pointerId;

        if (event.pointerType === 'mouse' || event.pointerType === 0x00000004)
        ***REMOVED***
            this.input.mousePointer.move(event);
        ***REMOVED***
        else
        ***REMOVED***
            this.input.updatePointer(event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The function that handles the PointerUp event.
    * @method Phaser.MSPointer#onPointerUp
    * @param ***REMOVED***PointerEvent***REMOVED*** event - The native DOM event.
    */
    onPointerUp: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (this.pointerUpCallback)
        ***REMOVED***
            this.pointerUpCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        event.identifier = event.pointerId;

        if (event.pointerType === 'mouse' || event.pointerType === 0x00000004)
        ***REMOVED***
            this.input.mousePointer.stop(event);
        ***REMOVED***
        else
        ***REMOVED***
            this.input.stopPointer(event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The internal method that handles the mouse up event from the window.
    * 
    * @method Phaser.MSPointer#onPointerUpGlobal
    * @param ***REMOVED***PointerEvent***REMOVED*** event - The native event from the browser. This gets stored in MSPointer.event.
    */
    onPointerUpGlobal: function (event) ***REMOVED***

        if ((event.pointerType === 'mouse' || event.pointerType === 0x00000004) && !this.input.mousePointer.withinGame)
        ***REMOVED***
            this.onPointerUp(event);
        ***REMOVED***
        else
        ***REMOVED***
            var pointer = this.input.getPointerFromIdentifier(event.identifier);

            if (pointer && pointer.withinGame)
            ***REMOVED***
                this.onPointerUp(event);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * The internal method that handles the pointer out event from the browser.
    *
    * @method Phaser.MSPointer#onPointerOut
    * @param ***REMOVED***PointerEvent***REMOVED*** event - The native event from the browser. This gets stored in MSPointer.event.
    */
    onPointerOut: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (event.pointerType === 'mouse' || event.pointerType === 0x00000004)
        ***REMOVED***
            this.input.mousePointer.withinGame = false;
        ***REMOVED***
        else
        ***REMOVED***
            var pointer = this.input.getPointerFromIdentifier(event.identifier);

            if (pointer)
            ***REMOVED***
                pointer.withinGame = false;
            ***REMOVED***
        ***REMOVED***

        if (this.input.mouse.mouseOutCallback)
        ***REMOVED***
            this.input.mouse.mouseOutCallback.call(this.input.mouse.callbackContext, event);
        ***REMOVED***

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.input.mouse.stopOnGameOut)
        ***REMOVED***
            event['identifier'] = 0;

            if (pointer)
            ***REMOVED***
                pointer.stop(event);
            ***REMOVED***
            else
            ***REMOVED***
                this.input.mousePointer.stop(event);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * The internal method that handles the pointer out event from the browser.
    *
    * @method Phaser.MSPointer#onPointerOut
    * @param ***REMOVED***PointerEvent***REMOVED*** event - The native event from the browser. This gets stored in MSPointer.event.
    */
    onPointerOver: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (event.pointerType === 'mouse' || event.pointerType === 0x00000004)
        ***REMOVED***
            this.input.mousePointer.withinGame = true;
        ***REMOVED***
        else
        ***REMOVED***
            var pointer = this.input.getPointerFromIdentifier(event.identifier);

            if (pointer)
            ***REMOVED***
                pointer.withinGame = true;
            ***REMOVED***
        ***REMOVED***

        if (this.input.mouse.mouseOverCallback)
        ***REMOVED***
            this.input.mouse.mouseOverCallback.call(this.input.mouse.callbackContext, event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Stop the event listeners.
    * @method Phaser.MSPointer#stop
    */
    stop: function () ***REMOVED***

        var canvas = this.game.canvas;

        canvas.removeEventListener('MSPointerDown', this._onMSPointerDown, false);
        canvas.removeEventListener('MSPointerMove', this._onMSPointerMove, false);
        canvas.removeEventListener('MSPointerUp', this._onMSPointerUp, false);

        //  IE11+ uses non-prefix events
        canvas.removeEventListener('pointerdown', this._onMSPointerDown, false);
        canvas.removeEventListener('pointermove', this._onMSPointerMove, false);
        canvas.removeEventListener('pointerup', this._onMSPointerUp, false);

        window.removeEventListener('MSPointerUp', this._onMSPointerUpGlobal, true);
        canvas.removeEventListener('MSPointerOver', this._onMSPointerOver, true);
        canvas.removeEventListener('MSPointerOut', this._onMSPointerOut, true);

        //  IE11+ uses non-prefix events
        window.removeEventListener('pointerup', this._onMSPointerUpGlobal, true);
        canvas.removeEventListener('pointerover', this._onMSPointerOver, true);
        canvas.removeEventListener('pointerout', this._onMSPointerOut, true);

    ***REMOVED***

***REMOVED***;

Phaser.MSPointer.prototype.constructor = Phaser.MSPointer;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @author       @karlmacklin <tacklemcclean@gmail.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* DeviceButtons belong to both `Phaser.Pointer` and `Phaser.SinglePad` (Gamepad) instances.
*
* For Pointers they represent the various buttons that can exist on mice and pens, such as the left button, right button,
* middle button and advanced buttons like back and forward.
*
* Access them via `Pointer.leftbutton`, `Pointer.rightButton` and so on.
*
* On Gamepads they represent all buttons on the pad: from shoulder buttons to action buttons.
*
* At the time of writing this there are device limitations you should be aware of:
*
* - On Windows, if you install a mouse driver, and its utility software allows you to customize button actions 
*   (e.g., IntelliPoint and SetPoint), the middle (wheel) button, the 4th button, and the 5th button might not be set, 
*   even when they are pressed.
* - On Linux (GTK), the 4th button and the 5th button are not supported.
* - On Mac OS X 10.5 there is no platform API for implementing any advanced buttons.
* 
* @class Phaser.DeviceButton
* @constructor
* @param ***REMOVED***Phaser.Pointer|Phaser.SinglePad***REMOVED*** parent - A reference to the parent of this button. Either a Pointer or a Gamepad.
* @param ***REMOVED***number***REMOVED*** buttonCode - The button code this DeviceButton is responsible for.
*/
Phaser.DeviceButton = function (parent, buttonCode) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Pointer|Phaser.SinglePad***REMOVED*** parent - A reference to the Pointer or Gamepad that owns this button.
    */
    this.parent = parent;

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = parent.game;

    /**
    * @property ***REMOVED***object***REMOVED*** event - The DOM event that caused the change in button state.
    * @default
    */
    this.event = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isDown - The "down" state of the button.
    * @default
    */
    this.isDown = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isUp - The "up" state of the button.
    * @default
    */
    this.isUp = true;

    /**
    * @property ***REMOVED***number***REMOVED*** timeDown - The timestamp when the button was last pressed down.
    * @default
    */
    this.timeDown = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** timeUp - The timestamp when the button was last released.
    * @default
    */
    this.timeUp = 0;

    /**
    * Gamepad only.
    * If a button is held down this holds down the number of times the button has 'repeated'.
    * @property ***REMOVED***number***REMOVED*** repeats
    * @default
    */
    this.repeats = 0;

    /**
    * True if the alt key was held down when this button was last pressed or released.
    * Not supported on Gamepads.
    * @property ***REMOVED***boolean***REMOVED*** altKey
    * @default
    */
    this.altKey = false;

    /**
    * True if the shift key was held down when this button was last pressed or released.
    * Not supported on Gamepads.
    * @property ***REMOVED***boolean***REMOVED*** shiftKey
    * @default
    */
    this.shiftKey = false;

    /**
    * True if the control key was held down when this button was last pressed or released.
    * Not supported on Gamepads.
    * @property ***REMOVED***boolean***REMOVED*** ctrlKey
    * @default
    */
    this.ctrlKey = false;

    /**
    * @property ***REMOVED***number***REMOVED*** value - Button value. Mainly useful for checking analog buttons (like shoulder triggers) on Gamepads.
    * @default
    */
    this.value = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** buttonCode - The buttoncode of this button if a Gamepad, or the DOM button event value if a Pointer.
    */
    this.buttonCode = buttonCode;

    /**
    * This Signal is dispatched every time this DeviceButton is pressed down.
    * It is only dispatched once (until the button is released again).
    * When dispatched it sends 2 arguments: A reference to this DeviceButton and the value of the button.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onDown
    */
    this.onDown = new Phaser.Signal();

    /**
    * This Signal is dispatched every time this DeviceButton is released from a down state.
    * It is only dispatched once (until the button is pressed again).
    * When dispatched it sends 2 arguments: A reference to this DeviceButton and the value of the button.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onUp
    */
    this.onUp = new Phaser.Signal();

    /**
    * Gamepad only.
    * This Signal is dispatched every time this DeviceButton changes floating value (between, but not exactly, 0 and 1).
    * When dispatched it sends 2 arguments: A reference to this DeviceButton and the value of the button.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onFloat
    */
    this.onFloat = new Phaser.Signal();

***REMOVED***;

Phaser.DeviceButton.prototype = ***REMOVED***

    /**
    * Called automatically by Phaser.Pointer and Phaser.SinglePad.
    * Handles the button down state.
    * 
    * @method Phaser.DeviceButton#start
    * @protected
    * @param ***REMOVED***object***REMOVED*** [event] - The DOM event that triggered the button change.
    * @param ***REMOVED***number***REMOVED*** [value] - The button value. Only get for Gamepads.
    */
    start: function (event, value) ***REMOVED***

        if (this.isDown)
        ***REMOVED***
            return;
        ***REMOVED***

        this.isDown = true;
        this.isUp = false;
        this.timeDown = this.game.time.time;
        this.repeats = 0;

        this.event = event;
        this.value = value;

        if (event)
        ***REMOVED***
            this.altKey = event.altKey;
            this.shiftKey = event.shiftKey;
            this.ctrlKey = event.ctrlKey;
        ***REMOVED***

        this.onDown.dispatch(this, value);

    ***REMOVED***,

    /**
    * Called automatically by Phaser.Pointer and Phaser.SinglePad.
    * Handles the button up state.
    * 
    * @method Phaser.DeviceButton#stop
    * @protected
    * @param ***REMOVED***object***REMOVED*** [event] - The DOM event that triggered the button change.
    * @param ***REMOVED***number***REMOVED*** [value] - The button value. Only get for Gamepads.
    */
    stop: function (event, value) ***REMOVED***

        if (this.isUp)
        ***REMOVED***
            return;
        ***REMOVED***

        this.isDown = false;
        this.isUp = true;
        this.timeUp = this.game.time.time;

        this.event = event;
        this.value = value;

        if (event)
        ***REMOVED***
            this.altKey = event.altKey;
            this.shiftKey = event.shiftKey;
            this.ctrlKey = event.ctrlKey;
        ***REMOVED***

        this.onUp.dispatch(this, value);

    ***REMOVED***,

    /**
    * Called automatically by Phaser.SinglePad.
    * 
    * @method Phaser.DeviceButton#padFloat
    * @protected
    * @param ***REMOVED***number***REMOVED*** value - Button value
    */
    padFloat: function (value) ***REMOVED***

        this.value = value;

        this.onFloat.dispatch(this, value);

    ***REMOVED***,

    /**
    * Returns the "just pressed" state of this button.
    * Just pressed is considered true if the button was pressed down within the duration given (default 250ms).
    * 
    * @method Phaser.DeviceButton#justPressed
    * @param ***REMOVED***number***REMOVED*** [duration=250] - The duration in ms below which the button is considered as being just pressed.
    * @return ***REMOVED***boolean***REMOVED*** True if the button is just pressed otherwise false.
    */
    justPressed: function (duration) ***REMOVED***

        duration = duration || 250;

        return (this.isDown && (this.timeDown + duration) > this.game.time.time);

    ***REMOVED***,

    /**
    * Returns the "just released" state of this button.
    * Just released is considered as being true if the button was released within the duration given (default 250ms).
    * 
    * @method Phaser.DeviceButton#justReleased
    * @param ***REMOVED***number***REMOVED*** [duration=250] - The duration in ms below which the button is considered as being just released.
    * @return ***REMOVED***boolean***REMOVED*** True if the button is just released otherwise false.
    */
    justReleased: function (duration) ***REMOVED***

        duration = duration || 250;

        return (this.isUp && (this.timeUp + duration) > this.game.time.time);

    ***REMOVED***,

    /**
    * Resets this DeviceButton, changing it to an isUp state and resetting the duration and repeats counters.
    * 
    * @method Phaser.DeviceButton#reset
    */
    reset: function () ***REMOVED***

        this.isDown = false;
        this.isUp = true;

        this.timeDown = this.game.time.time;
        this.repeats = 0;

        this.altKey = false;
        this.shiftKey = false;
        this.ctrlKey = false;

    ***REMOVED***,

    /**
    * Destroys this DeviceButton, this disposes of the onDown, onUp and onFloat signals 
    * and clears the parent and game references.
    * 
    * @method Phaser.DeviceButton#destroy
    */
    destroy: function () ***REMOVED***

        this.onDown.dispose();
        this.onUp.dispose();
        this.onFloat.dispose();

        this.parent = null;
        this.game = null;

    ***REMOVED***

***REMOVED***;

Phaser.DeviceButton.prototype.constructor = Phaser.DeviceButton;

/**
* How long the button has been held down for in milliseconds.
* If not currently down it returns -1.
* 
* @name Phaser.DeviceButton#duration
* @property ***REMOVED***number***REMOVED*** duration
* @readonly
*/
Object.defineProperty(Phaser.DeviceButton.prototype, "duration", ***REMOVED***

    get: function () ***REMOVED***

        if (this.isUp)
        ***REMOVED***
            return -1;
        ***REMOVED***

        return this.game.time.time - this.timeDown;

    ***REMOVED***

***REMOVED***);

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Pointer object is used by the Mouse, Touch and MSPoint managers and represents a single finger on the touch screen.
*
* @class Phaser.Pointer
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***number***REMOVED*** id - The ID of the Pointer object within the game. Each game can have up to 10 active pointers.
* @param ***REMOVED***Phaser.PointerMode***REMOVED*** pointerMode=(CURSOR|CONTACT) - The operational mode of this pointer, eg. CURSOR or TOUCH.
*/
Phaser.Pointer = function (game, id, pointerMode) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***number***REMOVED*** id - The ID of the Pointer object within the game. Each game can have up to 10 active pointers.
    */
    this.id = id;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.POINTER;

    /**
    * @property ***REMOVED***boolean***REMOVED*** exists - A Pointer object that exists is allowed to be checked for physics collisions and overlaps.
    * @default
    */
    this.exists = true;

    /**
    * @property ***REMOVED***number***REMOVED*** identifier - The identifier property of the Pointer as set by the DOM event when this Pointer is started.
    * @default
    */
    this.identifier = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** pointerId - The pointerId property of the Pointer as set by the DOM event when this Pointer is started. The browser can and will recycle this value.
    * @default
    */
    this.pointerId = null;

    /**
    * @property ***REMOVED***Phaser.PointerMode***REMOVED*** pointerMode - The operational mode of this pointer.
    */
    this.pointerMode = pointerMode || (Phaser.PointerMode.CURSOR | Phaser.PointerMode.CONTACT);

    /**
    * @property ***REMOVED***any***REMOVED*** target - The target property of the Pointer as set by the DOM event when this Pointer is started.
    * @default
    */
    this.target = null;

    /**
    * The button property of the most recent DOM event when this Pointer is started.
    * You should not rely on this value for accurate button detection, instead use the Pointer properties
    * `leftButton`, `rightButton`, `middleButton` and so on.
    * @property ***REMOVED***any***REMOVED*** button
    * @default
    */
    this.button = null;

    /**
    * If this Pointer is a Mouse or Pen / Stylus then you can access its left button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    * 
    * @property ***REMOVED***Phaser.DeviceButton***REMOVED*** leftButton
    * @default
    */
    this.leftButton = new Phaser.DeviceButton(this, Phaser.Pointer.LEFT_BUTTON);

    /**
    * If this Pointer is a Mouse or Pen / Stylus then you can access its middle button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    *
    * Please see the DeviceButton docs for details on browser button limitations.
    * 
    * @property ***REMOVED***Phaser.DeviceButton***REMOVED*** middleButton
    * @default
    */
    this.middleButton = new Phaser.DeviceButton(this, Phaser.Pointer.MIDDLE_BUTTON);

    /**
    * If this Pointer is a Mouse or Pen / Stylus then you can access its right button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    *
    * Please see the DeviceButton docs for details on browser button limitations.
    * 
    * @property ***REMOVED***Phaser.DeviceButton***REMOVED*** rightButton
    * @default
    */
    this.rightButton = new Phaser.DeviceButton(this, Phaser.Pointer.RIGHT_BUTTON);

    /**
    * If this Pointer is a Mouse or Pen / Stylus then you can access its X1 (back) button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    *
    * Please see the DeviceButton docs for details on browser button limitations.
    * 
    * @property ***REMOVED***Phaser.DeviceButton***REMOVED*** backButton
    * @default
    */
    this.backButton = new Phaser.DeviceButton(this, Phaser.Pointer.BACK_BUTTON);

    /**
    * If this Pointer is a Mouse or Pen / Stylus then you can access its X2 (forward) button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    *
    * Please see the DeviceButton docs for details on browser button limitations.
    * 
    * @property ***REMOVED***Phaser.DeviceButton***REMOVED*** forwardButton
    * @default
    */
    this.forwardButton = new Phaser.DeviceButton(this, Phaser.Pointer.FORWARD_BUTTON);

    /**
    * If this Pointer is a Pen / Stylus then you can access its eraser button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    *
    * Please see the DeviceButton docs for details on browser button limitations.
    * 
    * @property ***REMOVED***Phaser.DeviceButton***REMOVED*** eraserButton
    * @default
    */
    this.eraserButton = new Phaser.DeviceButton(this, Phaser.Pointer.ERASER_BUTTON);

    /**
    * @property ***REMOVED***boolean***REMOVED*** _holdSent - Local private variable to store the status of dispatching a hold event.
    * @private
    * @default
    */
    this._holdSent = false;

    /**
    * @property ***REMOVED***array***REMOVED*** _history - Local private variable storing the short-term history of pointer movements.
    * @private
    */
    this._history = [];

    /**
    * @property ***REMOVED***number***REMOVED*** _nextDrop - Local private variable storing the time at which the next history drop should occur.
    * @private
    */
    this._nextDrop = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _stateReset - Monitor events outside of a state reset loop.
    * @private
    */
    this._stateReset = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** withinGame - true if the Pointer is over the game canvas, otherwise false.
    */
    this.withinGame = false;

    /**
    * @property ***REMOVED***number***REMOVED*** clientX - The horizontal coordinate of the Pointer within the application's client area at which the event occurred (as opposed to the coordinates within the page).
    */
    this.clientX = -1;

    /**
    * @property ***REMOVED***number***REMOVED*** clientY - The vertical coordinate of the Pointer within the application's client area at which the event occurred (as opposed to the coordinates within the page).
    */
    this.clientY = -1;

    /**
    * @property ***REMOVED***number***REMOVED*** pageX - The horizontal coordinate of the Pointer relative to whole document.
    */
    this.pageX = -1;

    /**
    * @property ***REMOVED***number***REMOVED*** pageY - The vertical coordinate of the Pointer relative to whole document.
    */
    this.pageY = -1;

    /**
    * @property ***REMOVED***number***REMOVED*** screenX - The horizontal coordinate of the Pointer relative to the screen.
    */
    this.screenX = -1;

    /**
    * @property ***REMOVED***number***REMOVED*** screenY - The vertical coordinate of the Pointer relative to the screen.
    */
    this.screenY = -1;

    /**
    * @property ***REMOVED***number***REMOVED*** rawMovementX - The horizontal raw relative movement of the Pointer in pixels since last event.
    * @default
    */
    this.rawMovementX = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** rawMovementY - The vertical raw relative movement of the Pointer in pixels since last event.
    * @default
    */
    this.rawMovementY = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** movementX - The horizontal processed relative movement of the Pointer in pixels since last event.
    * @default
    */
    this.movementX = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** movementY - The vertical processed relative movement of the Pointer in pixels since last event.
    * @default
    */
    this.movementY = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** x - The horizontal coordinate of the Pointer. This value is automatically scaled based on the game scale.
    * @default
    */
    this.x = -1;

    /**
    * @property ***REMOVED***number***REMOVED*** y - The vertical coordinate of the Pointer. This value is automatically scaled based on the game scale.
    * @default
    */
    this.y = -1;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isMouse - If the Pointer is a mouse or pen / stylus this is true, otherwise false.
    */
    this.isMouse = (id === 0);

    /**
    * If the Pointer is touching the touchscreen, or *any* mouse or pen button is held down, isDown is set to true.
    * If you need to check a specific mouse or pen button then use the button properties, i.e. Pointer.rightButton.isDown.
    * @property ***REMOVED***boolean***REMOVED*** isDown
    * @default
    */
    this.isDown = false;

    /**
    * If the Pointer is not touching the touchscreen, or *all* mouse or pen buttons are up, isUp is set to true.
    * If you need to check a specific mouse or pen button then use the button properties, i.e. Pointer.rightButton.isUp.
    * @property ***REMOVED***boolean***REMOVED*** isUp
    * @default
    */
    this.isUp = true;

    /**
    * @property ***REMOVED***number***REMOVED*** timeDown - A timestamp representing when the Pointer first touched the touchscreen.
    * @default
    */
    this.timeDown = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** timeUp - A timestamp representing when the Pointer left the touchscreen.
    * @default
    */
    this.timeUp = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** previousTapTime - A timestamp representing when the Pointer was last tapped or clicked.
    * @default
    */
    this.previousTapTime = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** totalTouches - The total number of times this Pointer has been touched to the touchscreen.
    * @default
    */
    this.totalTouches = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** msSinceLastClick - The number of milliseconds since the last click or touch event.
    * @default
    */
    this.msSinceLastClick = Number.MAX_VALUE;

    /**
    * @property ***REMOVED***any***REMOVED*** targetObject - The Game Object this Pointer is currently over / touching / dragging.
    * @default
    */
    this.targetObject = null;

    /**
    * This array is erased and re-populated every time this Pointer is updated. It contains references to all
    * of the Game Objects that were considered as being valid for processing by this Pointer, this frame. To be
    * valid they must have suitable a `priorityID`, be Input enabled, visible and actually have the Pointer over
    * them. You can check the contents of this array in events such as `onInputDown`, but beware it is reset
    * every frame.
    * @property ***REMOVED***array***REMOVED*** interactiveCandidates
    * @default
    */
    this.interactiveCandidates = [];

    /**
    * @property ***REMOVED***boolean***REMOVED*** active - An active pointer is one that is currently pressed down on the display. A Mouse is always active.
    * @default
    */
    this.active = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** dirty - A dirty pointer needs to re-poll any interactive objects it may have been over, regardless if it has moved or not.
    * @default
    */
    this.dirty = false;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** position - A Phaser.Point object containing the current x/y values of the pointer on the display.
    */
    this.position = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** positionDown - A Phaser.Point object containing the x/y values of the pointer when it was last in a down state on the display.
    */
    this.positionDown = new Phaser.Point();
    
    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** positionUp - A Phaser.Point object containing the x/y values of the pointer when it was last released.
    */
    this.positionUp = new Phaser.Point();

    /**
    * A Phaser.Circle that is centered on the x/y coordinates of this pointer, useful for hit detection.
    * The Circle size is 44px (Apples recommended "finger tip" size).
    * @property ***REMOVED***Phaser.Circle***REMOVED*** circle
    */
    this.circle = new Phaser.Circle(0, 0, 44);

    /**
    * Click trampolines associated with this pointer. See `addClickTrampoline`.
    * @property ***REMOVED***object[]|null***REMOVED*** _clickTrampolines
    * @private
    */
    this._clickTrampolines = null;

    /**
    * When the Pointer has click trampolines the last target object is stored here
    * so it can be used to check for validity of the trampoline in a post-Up/'stop'.
    * @property ***REMOVED***object***REMOVED*** _trampolineTargetObject
    * @private
    */
    this._trampolineTargetObject = null;

***REMOVED***;

/**
* No buttons at all.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Pointer.NO_BUTTON = 0;

/**
* The Left Mouse button, or in PointerEvent devices a Touch contact or Pen contact.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Pointer.LEFT_BUTTON = 1;

/**
* The Right Mouse button, or in PointerEvent devices a Pen contact with a barrel button.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Pointer.RIGHT_BUTTON = 2;

/**
* The Middle Mouse button.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Pointer.MIDDLE_BUTTON = 4;

/**
* The X1 button. This is typically the mouse Back button, but is often reconfigured.
* On Linux (GTK) this is unsupported. On Windows if advanced pointer software (such as IntelliPoint) is installed this doesn't register.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Pointer.BACK_BUTTON = 8;

/**
* The X2 button. This is typically the mouse Forward button, but is often reconfigured.
* On Linux (GTK) this is unsupported. On Windows if advanced pointer software (such as IntelliPoint) is installed this doesn't register.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Pointer.FORWARD_BUTTON = 16;

/**
* The Eraser pen button on PointerEvent supported devices only.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Pointer.ERASER_BUTTON = 32;

Phaser.Pointer.prototype = ***REMOVED***

    /**
    * Resets the states of all the button booleans.
    * 
    * @method Phaser.Pointer#resetButtons
    * @protected
    */
    resetButtons: function () ***REMOVED***

        this.isDown = false;
        this.isUp = true;

        if (this.isMouse)
        ***REMOVED***
            this.leftButton.reset();
            this.middleButton.reset();
            this.rightButton.reset();
            this.backButton.reset();
            this.forwardButton.reset();
            this.eraserButton.reset();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called by updateButtons.
    * 
    * @method Phaser.Pointer#processButtonsDown
    * @private
    * @param ***REMOVED***integer***REMOVED*** buttons - The DOM event.buttons property.
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The DOM event.
    */
    processButtonsDown: function (buttons, event) ***REMOVED***

        //  Note: These are bitwise checks, not booleans

        if (Phaser.Pointer.LEFT_BUTTON & buttons)
        ***REMOVED***
            this.leftButton.start(event);
        ***REMOVED***

        if (Phaser.Pointer.RIGHT_BUTTON & buttons)
        ***REMOVED***
            this.rightButton.start(event);
        ***REMOVED***
                
        if (Phaser.Pointer.MIDDLE_BUTTON & buttons)
        ***REMOVED***
            this.middleButton.start(event);
        ***REMOVED***

        if (Phaser.Pointer.BACK_BUTTON & buttons)
        ***REMOVED***
            this.backButton.start(event);
        ***REMOVED***

        if (Phaser.Pointer.FORWARD_BUTTON & buttons)
        ***REMOVED***
            this.forwardButton.start(event);
        ***REMOVED***

        if (Phaser.Pointer.ERASER_BUTTON & buttons)
        ***REMOVED***
            this.eraserButton.start(event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called by updateButtons.
    * 
    * @method Phaser.Pointer#processButtonsUp
    * @private
    * @param ***REMOVED***integer***REMOVED*** buttons - The DOM event.buttons property.
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The DOM event.
    */
    processButtonsUp: function (button, event) ***REMOVED***

        //  Note: These are bitwise checks, not booleans

        if (button === Phaser.Mouse.LEFT_BUTTON)
        ***REMOVED***
            this.leftButton.stop(event);
        ***REMOVED***

        if (button === Phaser.Mouse.RIGHT_BUTTON)
        ***REMOVED***
            this.rightButton.stop(event);
        ***REMOVED***
                
        if (button === Phaser.Mouse.MIDDLE_BUTTON)
        ***REMOVED***
            this.middleButton.stop(event);
        ***REMOVED***

        if (button === Phaser.Mouse.BACK_BUTTON)
        ***REMOVED***
            this.backButton.stop(event);
        ***REMOVED***

        if (button === Phaser.Mouse.FORWARD_BUTTON)
        ***REMOVED***
            this.forwardButton.stop(event);
        ***REMOVED***

        if (button === 5)
        ***REMOVED***
            this.eraserButton.stop(event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called when the event.buttons property changes from zero.
    * Contains a button bitmask.
    * 
    * @method Phaser.Pointer#updateButtons
    * @protected
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The DOM event.
    */
    updateButtons: function (event) ***REMOVED***

        this.button = event.button;

        var down = (event.type.toLowerCase().substr(-4) === 'down');

        if (event.buttons !== undefined)
        ***REMOVED***
            if (down)
            ***REMOVED***
                this.processButtonsDown(event.buttons, event);
            ***REMOVED***
            else
            ***REMOVED***
                this.processButtonsUp(event.button, event);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  No buttons property (like Safari on OSX when using a trackpad)
            if (down)
            ***REMOVED***
                this.leftButton.start(event);
            ***REMOVED***
            else
            ***REMOVED***
                this.leftButton.stop(event);
                this.rightButton.stop(event);
            ***REMOVED***
        ***REMOVED***

        //  On OS X (and other devices with trackpads) you have to press CTRL + the pad
        //  to initiate a right-click event, so we'll check for that here ONLY if
        //  event.buttons = 1 (i.e. they only have a 1 button mouse or trackpad)

        if (event.buttons === 1 && event.ctrlKey && this.leftButton.isDown)
        ***REMOVED***
            this.leftButton.stop(event);
            this.rightButton.start(event);
        ***REMOVED***

        this.isUp = true;
        this.isDown = false;

        if (this.leftButton.isDown || this.rightButton.isDown || this.middleButton.isDown || this.backButton.isDown || this.forwardButton.isDown || this.eraserButton.isDown)
        ***REMOVED***
            this.isUp = false;
            this.isDown = true;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called when the Pointer is pressed onto the touchscreen.
    * @method Phaser.Pointer#start
    * @param ***REMOVED***any***REMOVED*** event - The DOM event from the browser.
    */
    start: function (event) ***REMOVED***

        var input = this.game.input;

        if (event['pointerId'])
        ***REMOVED***
            this.pointerId = event.pointerId;
        ***REMOVED***

        this.identifier = event.identifier;
        this.target = event.target;

        if (this.isMouse)
        ***REMOVED***
            this.updateButtons(event);
        ***REMOVED***
        else
        ***REMOVED***
            this.isDown = true;
            this.isUp = false;
        ***REMOVED***

        this.active = true;
        this.withinGame = true;
        this.dirty = false;

        this._history = [];
        this._clickTrampolines = null;
        this._trampolineTargetObject = null;

        //  Work out how long it has been since the last click
        this.msSinceLastClick = this.game.time.time - this.timeDown;
        this.timeDown = this.game.time.time;
        this._holdSent = false;

        //  This sets the x/y and other local values
        this.move(event, true);

        // x and y are the old values here?
        this.positionDown.setTo(this.x, this.y);

        if (input.multiInputOverride === Phaser.Input.MOUSE_OVERRIDES_TOUCH ||
            input.multiInputOverride === Phaser.Input.MOUSE_TOUCH_COMBINE ||
            (input.multiInputOverride === Phaser.Input.TOUCH_OVERRIDES_MOUSE && input.totalActivePointers === 0))
        ***REMOVED***
            input.x = this.x;
            input.y = this.y;
            input.position.setTo(this.x, this.y);
            input.onDown.dispatch(this, event);
            input.resetSpeed(this.x, this.y);
        ***REMOVED***

        this._stateReset = false;

        this.totalTouches++;

        if (this.targetObject !== null)
        ***REMOVED***
            this.targetObject._touchedHandler(this);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Called by the Input Manager.
    * @method Phaser.Pointer#update
    */
    update: function () ***REMOVED***

        var input = this.game.input;

        if (this.active)
        ***REMOVED***
            //  Force a check?
            if (this.dirty)
            ***REMOVED***
                if (input.interactiveItems.total > 0)
                ***REMOVED***
                    this.processInteractiveObjects(false);
                ***REMOVED***

                this.dirty = false;
            ***REMOVED***

            if (this._holdSent === false && this.duration >= input.holdRate)
            ***REMOVED***
                if (input.multiInputOverride === Phaser.Input.MOUSE_OVERRIDES_TOUCH ||
                    input.multiInputOverride === Phaser.Input.MOUSE_TOUCH_COMBINE ||
                    (input.multiInputOverride === Phaser.Input.TOUCH_OVERRIDES_MOUSE && input.totalActivePointers === 0))
                ***REMOVED***
                    input.onHold.dispatch(this);
                ***REMOVED***

                this._holdSent = true;
            ***REMOVED***

            //  Update the droppings history
            if (input.recordPointerHistory && this.game.time.time >= this._nextDrop)
            ***REMOVED***
                this._nextDrop = this.game.time.time + input.recordRate;

                this._history.push(***REMOVED***
                    x: this.position.x,
                    y: this.position.y
                ***REMOVED***);

                if (this._history.length > input.recordLimit)
                ***REMOVED***
                    this._history.shift();
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called when the Pointer is moved.
    * 
    * @method Phaser.Pointer#move
    * @param ***REMOVED***MouseEvent|PointerEvent|TouchEvent***REMOVED*** event - The event passed up from the input handler.
    * @param ***REMOVED***boolean***REMOVED*** [fromClick=false] - Was this called from the click event?
    */
    move: function (event, fromClick) ***REMOVED***

        var input = this.game.input;

        if (input.pollLocked)
        ***REMOVED***
            return;
        ***REMOVED***

        if (fromClick === undefined) ***REMOVED*** fromClick = false; ***REMOVED***

        if (event.button !== undefined)
        ***REMOVED***
            this.button = event.button;
        ***REMOVED***

        if (fromClick && this.isMouse)
        ***REMOVED***
            this.updateButtons(event);
        ***REMOVED***

        this.clientX = event.clientX;
        this.clientY = event.clientY;

        this.pageX = event.pageX;
        this.pageY = event.pageY;

        this.screenX = event.screenX;
        this.screenY = event.screenY;

        if (this.isMouse && input.mouse.locked && !fromClick)
        ***REMOVED***
            this.rawMovementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            this.rawMovementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

            this.movementX += this.rawMovementX;
            this.movementY += this.rawMovementY;
        ***REMOVED***

        this.x = (this.pageX - this.game.scale.offset.x) * input.scale.x;
        this.y = (this.pageY - this.game.scale.offset.y) * input.scale.y;

        this.position.setTo(this.x, this.y);
        this.circle.x = this.x;
        this.circle.y = this.y;

        if (input.multiInputOverride === Phaser.Input.MOUSE_OVERRIDES_TOUCH ||
            input.multiInputOverride === Phaser.Input.MOUSE_TOUCH_COMBINE ||
            (input.multiInputOverride === Phaser.Input.TOUCH_OVERRIDES_MOUSE && input.totalActivePointers === 0))
        ***REMOVED***
            input.activePointer = this;
            input.x = this.x;
            input.y = this.y;
            input.position.setTo(input.x, input.y);
            input.circle.x = input.x;
            input.circle.y = input.y;
        ***REMOVED***

        this.withinGame = this.game.scale.bounds.contains(this.pageX, this.pageY);

        //  If the game is paused we don't process any target objects or callbacks
        if (this.game.paused)
        ***REMOVED***
            return this;
        ***REMOVED***

        var i = input.moveCallbacks.length;

        while (i--)
        ***REMOVED***
            input.moveCallbacks[i].callback.call(input.moveCallbacks[i].context, this, this.x, this.y, fromClick);
        ***REMOVED***

        //  Easy out if we're dragging something and it still exists
        if (this.targetObject !== null && this.targetObject.isDragged === true)
        ***REMOVED***
            if (this.targetObject.update(this) === false)
            ***REMOVED***
                this.targetObject = null;
            ***REMOVED***
        ***REMOVED***
        else if (input.interactiveItems.total > 0)
        ***REMOVED***
            this.processInteractiveObjects(fromClick);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Process all interactive objects to find out which ones were updated in the recent Pointer move.
    * 
    * @method Phaser.Pointer#processInteractiveObjects
    * @protected
    * @param ***REMOVED***boolean***REMOVED*** [fromClick=false] - Was this called from the click event?
    * @return ***REMOVED***boolean***REMOVED*** True if this method processes an object (i.e. a Sprite becomes the Pointers currentTarget), otherwise false.
    */
    processInteractiveObjects: function (fromClick) ***REMOVED***

        //  Work out which object is on the top
        var highestRenderOrderID = 0;
        var highestInputPriorityID = -1;
        var candidateTarget = null;

        //  First pass gets all objects that the pointer is over that DON'T use pixelPerfect checks and get the highest ID
        //  We know they'll be valid for input detection but not which is the top just yet

        var currentNode = this.game.input.interactiveItems.first;

        this.interactiveCandidates = [];

        while (currentNode)
        ***REMOVED***
            //  Reset checked status
            currentNode.checked = false;

            if (currentNode.validForInput(highestInputPriorityID, highestRenderOrderID, false))
            ***REMOVED***
                //  Flag it as checked so we don't re-scan it on the next phase
                currentNode.checked = true;

                if ((fromClick && currentNode.checkPointerDown(this, true)) ||
                    (!fromClick && currentNode.checkPointerOver(this, true)))
                ***REMOVED***
                    highestRenderOrderID = currentNode.sprite.renderOrderID;
                    highestInputPriorityID = currentNode.priorityID;
                    candidateTarget = currentNode;
                    this.interactiveCandidates.push(currentNode);
                ***REMOVED***
            ***REMOVED***

            currentNode = this.game.input.interactiveItems.next;
        ***REMOVED***

        //  Then in the second sweep we process ONLY the pixel perfect ones that are checked and who have a higher ID
        //  because if their ID is lower anyway then we can just automatically discount them
        //  (A node that was previously checked did not request a pixel-perfect check.)

        currentNode = this.game.input.interactiveItems.first;

        while (currentNode)
        ***REMOVED***
            if (!currentNode.checked &&
                currentNode.validForInput(highestInputPriorityID, highestRenderOrderID, true))
            ***REMOVED***
                if ((fromClick && currentNode.checkPointerDown(this, false)) ||
                    (!fromClick && currentNode.checkPointerOver(this, false)))
                ***REMOVED***
                    highestRenderOrderID = currentNode.sprite.renderOrderID;
                    highestInputPriorityID = currentNode.priorityID;
                    candidateTarget = currentNode;
                    this.interactiveCandidates.push(currentNode);
                ***REMOVED***
            ***REMOVED***

            currentNode = this.game.input.interactiveItems.next;
        ***REMOVED***

        if (this.game.input.customCandidateHandler)
        ***REMOVED***
            candidateTarget = this.game.input.customCandidateHandler.call(this.game.input.customCandidateHandlerContext, this, this.interactiveCandidates, candidateTarget);
        ***REMOVED***

        this.swapTarget(candidateTarget, false);

        return (this.targetObject !== null);

    ***REMOVED***,

    /**
    * This will change the `Pointer.targetObject` object to be the one provided.
    * 
    * This allows you to have fine-grained control over which object the Pointer is targeting.
    *
    * Note that even if you set a new Target here, it is still able to be replaced by any other valid
    * target during the next Pointer update.
    *
    * @method Phaser.Pointer#swapTarget
    * @param ***REMOVED***Phaser.InputHandler***REMOVED*** newTarget - The new target for this Pointer. Note this is an `InputHandler`, so don't pass a Sprite, instead pass `sprite.input` to it.
    * @param ***REMOVED***boolean***REMOVED*** [silent=false] - If true the new target AND the old one will NOT dispatch their `onInputOver` or `onInputOut` events.
    */
    swapTarget: function (newTarget, silent) ***REMOVED***

        if (silent === undefined) ***REMOVED*** silent = false; ***REMOVED***

        //  Now we know the top-most item (if any) we can process it
        if (newTarget === null)
        ***REMOVED***
            //  The pointer isn't currently over anything, check if we've got a lingering previous target
            if (this.targetObject)
            ***REMOVED***
                this.targetObject._pointerOutHandler(this, silent);
                this.targetObject = null;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (this.targetObject === null)
            ***REMOVED***
                //  And now set the new one
                this.targetObject = newTarget;
                newTarget._pointerOverHandler(this, silent);
            ***REMOVED***
            else
            ***REMOVED***
                //  We've got a target from the last update
                if (this.targetObject === newTarget)
                ***REMOVED***
                    //  Same target as before, so update it
                    if (newTarget.update(this) === false)
                    ***REMOVED***
                        this.targetObject = null;
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    //  The target has changed, so tell the old one we've left it
                    this.targetObject._pointerOutHandler(this, silent);

                    //  And now set the new one
                    this.targetObject = newTarget;
                    this.targetObject._pointerOverHandler(this, silent);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called when the Pointer leaves the target area.
    *
    * @method Phaser.Pointer#leave
    * @param ***REMOVED***MouseEvent|PointerEvent|TouchEvent***REMOVED*** event - The event passed up from the input handler.
    */
    leave: function (event) ***REMOVED***

        this.withinGame = false;
        this.move(event, false);

    ***REMOVED***,

    /**
    * Called when the Pointer leaves the touchscreen.
    *
    * @method Phaser.Pointer#stop
    * @param ***REMOVED***MouseEvent|PointerEvent|TouchEvent***REMOVED*** event - The event passed up from the input handler.
    */
    stop: function (event) ***REMOVED***

        var input = this.game.input;

        if (this._stateReset && this.withinGame)
        ***REMOVED***
            event.preventDefault();
            return;
        ***REMOVED***

        this.timeUp = this.game.time.time;

        if (input.multiInputOverride === Phaser.Input.MOUSE_OVERRIDES_TOUCH ||
            input.multiInputOverride === Phaser.Input.MOUSE_TOUCH_COMBINE ||
            (input.multiInputOverride === Phaser.Input.TOUCH_OVERRIDES_MOUSE && input.totalActivePointers === 0))
        ***REMOVED***
            input.onUp.dispatch(this, event);

            //  Was it a tap?
            if (this.duration >= 0 && this.duration <= input.tapRate)
            ***REMOVED***
                //  Was it a double-tap?
                if (this.timeUp - this.previousTapTime < input.doubleTapRate)
                ***REMOVED***
                    //  Yes, let's dispatch the signal then with the 2nd parameter set to true
                    input.onTap.dispatch(this, true);
                ***REMOVED***
                else
                ***REMOVED***
                    //  Wasn't a double-tap, so dispatch a single tap signal
                    input.onTap.dispatch(this, false);
                ***REMOVED***

                this.previousTapTime = this.timeUp;
            ***REMOVED***
        ***REMOVED***

        if (this.isMouse)
        ***REMOVED***
            this.updateButtons(event);
        ***REMOVED***
        else
        ***REMOVED***
            this.isDown = false;
            this.isUp = true;
        ***REMOVED***

        //  Mouse is always active
        if (this.id > 0)
        ***REMOVED***
            this.active = false;
        ***REMOVED***

        this.withinGame = this.game.scale.bounds.contains(event.pageX, event.pageY);
        this.pointerId = null;
        this.identifier = null;
        
        this.positionUp.setTo(this.x, this.y);
        
        if (this.isMouse === false)
        ***REMOVED***
            input.currentPointers--;
        ***REMOVED***

        input.interactiveItems.callAll('_releasedHandler', this);

        if (this._clickTrampolines)
        ***REMOVED***
            this._trampolineTargetObject = this.targetObject;
        ***REMOVED***

        this.targetObject = null;

        return this;

    ***REMOVED***,

    /**
    * The Pointer is considered justPressed if the time it was pressed onto the touchscreen or clicked is less than justPressedRate.
    * Note that calling justPressed doesn't reset the pressed status of the Pointer, it will return `true` for as long as the duration is valid.
    * If you wish to check if the Pointer was pressed down just once then see the Sprite.events.onInputDown event.
    * @method Phaser.Pointer#justPressed
    * @param ***REMOVED***number***REMOVED*** [duration] - The time to check against. If none given it will use InputManager.justPressedRate.
    * @return ***REMOVED***boolean***REMOVED*** true if the Pointer was pressed down within the duration given.
    */
    justPressed: function (duration) ***REMOVED***

        duration = duration || this.game.input.justPressedRate;

        return (this.isDown === true && (this.timeDown + duration) > this.game.time.time);

    ***REMOVED***,

    /**
    * The Pointer is considered justReleased if the time it left the touchscreen is less than justReleasedRate.
    * Note that calling justReleased doesn't reset the pressed status of the Pointer, it will return `true` for as long as the duration is valid.
    * If you wish to check if the Pointer was released just once then see the Sprite.events.onInputUp event.
    * @method Phaser.Pointer#justReleased
    * @param ***REMOVED***number***REMOVED*** [duration] - The time to check against. If none given it will use InputManager.justReleasedRate.
    * @return ***REMOVED***boolean***REMOVED*** true if the Pointer was released within the duration given.
    */
    justReleased: function (duration) ***REMOVED***

        duration = duration || this.game.input.justReleasedRate;

        return (this.isUp && (this.timeUp + duration) > this.game.time.time);

    ***REMOVED***,

    /**
    * Add a click trampoline to this pointer.
    *
    * A click trampoline is a callback that is run on the DOM 'click' event; this is primarily
    * needed with certain browsers (ie. IE11) which restrict some actions like requestFullscreen
    * to the DOM 'click' event and rejects it for 'pointer*' and 'mouse*' events.
    *
    * This is used internally by the ScaleManager; click trampoline usage is uncommon.
    * Click trampolines can only be added to pointers that are currently down.
    *
    * @method Phaser.Pointer#addClickTrampoline
    * @protected
    * @param ***REMOVED***string***REMOVED*** name - The name of the trampoline; must be unique among active trampolines in this pointer.
    * @param ***REMOVED***function***REMOVED*** callback - Callback to run/trampoline.
    * @param ***REMOVED***object***REMOVED*** callbackContext - Context of the callback.
    * @param ***REMOVED***object[]|null***REMOVED*** callbackArgs - Additional callback args, if any. Supplied as an array.
    */
    addClickTrampoline: function (name, callback, callbackContext, callbackArgs) ***REMOVED***

        if (!this.isDown)
        ***REMOVED***
            return;
        ***REMOVED***

        var trampolines = (this._clickTrampolines = this._clickTrampolines || []);

        for (var i = 0; i < trampolines.length; i++)
        ***REMOVED***
            if (trampolines[i].name === name)
            ***REMOVED***
                trampolines.splice(i, 1);
                break;
            ***REMOVED***
        ***REMOVED***

        trampolines.push(***REMOVED***
            name: name,
            targetObject: this.targetObject,
            callback: callback,
            callbackContext: callbackContext,
            callbackArgs: callbackArgs
        ***REMOVED***);

    ***REMOVED***,

    /**
    * Fire all click trampolines for which the pointers are still referring to the registered object.
    * @method Phaser.Pointer#processClickTrampolines
    * @private
    */
    processClickTrampolines: function () ***REMOVED***

        var trampolines = this._clickTrampolines;

        if (!trampolines)
        ***REMOVED***
            return;
        ***REMOVED***

        for (var i = 0; i < trampolines.length; i++)
        ***REMOVED***
            var trampoline = trampolines[i];

            if (trampoline.targetObject === this._trampolineTargetObject)
            ***REMOVED***
                trampoline.callback.apply(trampoline.callbackContext, trampoline.callbackArgs);
            ***REMOVED***
        ***REMOVED***

        this._clickTrampolines = null;
        this._trampolineTargetObject = null;

    ***REMOVED***,

    /**
    * Resets the Pointer properties. Called by InputManager.reset when you perform a State change.
    * @method Phaser.Pointer#reset
    */
    reset: function () ***REMOVED***

        if (this.isMouse === false)
        ***REMOVED***
            this.active = false;
        ***REMOVED***

        this.pointerId = null;
        this.identifier = null;
        this.dirty = false;
        this.totalTouches = 0;
        this._holdSent = false;
        this._history.length = 0;
        this._stateReset = true;

        this.resetButtons();

        if (this.targetObject)
        ***REMOVED***
            this.targetObject._releasedHandler(this);
        ***REMOVED***

        this.targetObject = null;

    ***REMOVED***,

    /**
     * Resets the movementX and movementY properties. Use in your update handler after retrieving the values.
     * @method Phaser.Pointer#resetMovement
     */
    resetMovement: function() ***REMOVED***

        this.movementX = 0;
        this.movementY = 0;

    ***REMOVED***

***REMOVED***;

Phaser.Pointer.prototype.constructor = Phaser.Pointer;

/**
* How long the Pointer has been depressed on the touchscreen or *any* of the mouse buttons have been held down.
* If not currently down it returns -1.
* If you need to test a specific mouse or pen button then access the buttons directly, i.e. `Pointer.rightButton.duration`.
* 
* @name Phaser.Pointer#duration
* @property ***REMOVED***number***REMOVED*** duration
* @readonly
*/
Object.defineProperty(Phaser.Pointer.prototype, "duration", ***REMOVED***

    get: function () ***REMOVED***

        if (this.isUp)
        ***REMOVED***
            return -1;
        ***REMOVED***

        return this.game.time.time - this.timeDown;

    ***REMOVED***

***REMOVED***);

/**
* Gets the X value of this Pointer in world coordinates based on the world camera.
* @name Phaser.Pointer#worldX
* @property ***REMOVED***number***REMOVED*** worldX - The X value of this Pointer in world coordinates based on the world camera.
* @readonly
*/
Object.defineProperty(Phaser.Pointer.prototype, "worldX", ***REMOVED***

    get: function () ***REMOVED***

        return this.game.world.camera.x + this.x;

    ***REMOVED***

***REMOVED***);

/**
* Gets the Y value of this Pointer in world coordinates based on the world camera.
* @name Phaser.Pointer#worldY
* @property ***REMOVED***number***REMOVED*** worldY - The Y value of this Pointer in world coordinates based on the world camera.
* @readonly
*/
Object.defineProperty(Phaser.Pointer.prototype, "worldY", ***REMOVED***

    get: function () ***REMOVED***

        return this.game.world.camera.y + this.y;

    ***REMOVED***

***REMOVED***);

/**
* Enumeration categorizing operational modes of pointers.
*
* PointerType values represent valid bitmasks.
* For example, a value representing both Mouse and Touch devices
* can be expressed as `PointerMode.CURSOR | PointerMode.CONTACT`.
*
* Values may be added for future mode categorizations.
* @class Phaser.PointerMode
*/
Phaser.PointerMode = ***REMOVED***

    /**
    * A 'CURSOR' is a pointer with a *passive cursor* such as a mouse, touchpad, watcom stylus, or even TV-control arrow-pad.
    *
    * It has the property that a cursor is passively moved without activating the input.
    * This currently corresponds with ***REMOVED***@link Phaser.Pointer#isMouse***REMOVED*** property.
    * @constant
    */
    CURSOR: 1 << 0,

    /**
    * A 'CONTACT' pointer has an *active cursor* that only tracks movement when actived; notably this is a touch-style input.
    * @constant
    */
    CONTACT: 1 << 1

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Phaser.Touch handles touch events with your game. Note: Android 2.x only supports 1 touch event at once, no multi-touch.
*
* You should not normally access this class directly, but instead use a Phaser.Pointer object which normalises all game input for you.
*
* @class Phaser.Touch
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.Touch = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * Touch events will only be processed if enabled.
    * @property ***REMOVED***boolean***REMOVED*** enabled
    * @default
    */
    this.enabled = true;

    /**
    * An array of callbacks that will be fired every time a native touch start or touch end event is received from the browser.
    * This is used internally to handle audio and video unlocking on mobile devices.
    * To add a callback to this array please use `Touch.addTouchLockCallback`.
    * @property ***REMOVED***array***REMOVED*** touchLockCallbacks
    * @protected
    */
    this.touchLockCallbacks = [];

    /**
    * @property ***REMOVED***object***REMOVED*** callbackContext - The context under which callbacks are called.
    */
    this.callbackContext = this.game;

    /**
    * @property ***REMOVED***function***REMOVED*** touchStartCallback - A callback that can be fired on a touchStart event.
    */
    this.touchStartCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** touchMoveCallback - A callback that can be fired on a touchMove event.
    */
    this.touchMoveCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** touchEndCallback - A callback that can be fired on a touchEnd event.
    */
    this.touchEndCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** touchEnterCallback - A callback that can be fired on a touchEnter event.
    */
    this.touchEnterCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** touchLeaveCallback - A callback that can be fired on a touchLeave event.
    */
    this.touchLeaveCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** touchCancelCallback - A callback that can be fired on a touchCancel event.
    */
    this.touchCancelCallback = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** preventDefault - If true the TouchEvent will have prevent.default called on it.
    * @default
    */
    this.preventDefault = true;

    /**
    * @property ***REMOVED***TouchEvent***REMOVED*** event - The browser touch DOM event. Will be set to null if no touch event has ever been received.
    * @default
    */
    this.event = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onTouchStart - Internal event handler reference.
    * @private
    */
    this._onTouchStart = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onTouchMove - Internal event handler reference.
    * @private
    */
    this._onTouchMove = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onTouchEnd - Internal event handler reference.
    * @private
    */
    this._onTouchEnd = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onTouchEnter - Internal event handler reference.
    * @private
    */
    this._onTouchEnter = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onTouchLeave - Internal event handler reference.
    * @private
    */
    this._onTouchLeave = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onTouchCancel - Internal event handler reference.
    * @private
    */
    this._onTouchCancel = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onTouchMove - Internal event handler reference.
    * @private
    */
    this._onTouchMove = null;

***REMOVED***;

Phaser.Touch.prototype = ***REMOVED***

    /**
    * Starts the event listeners running.
    * @method Phaser.Touch#start
    */
    start: function () ***REMOVED***

        if (this._onTouchStart !== null)
        ***REMOVED***
            //  Avoid setting multiple listeners
            return;
        ***REMOVED***

        var _this = this;

        if (this.game.device.touch)
        ***REMOVED***
            this._onTouchStart = function (event) ***REMOVED***
                return _this.onTouchStart(event);
            ***REMOVED***;

            this._onTouchMove = function (event) ***REMOVED***
                return _this.onTouchMove(event);
            ***REMOVED***;

            this._onTouchEnd = function (event) ***REMOVED***
                return _this.onTouchEnd(event);
            ***REMOVED***;

            this._onTouchEnter = function (event) ***REMOVED***
                return _this.onTouchEnter(event);
            ***REMOVED***;

            this._onTouchLeave = function (event) ***REMOVED***
                return _this.onTouchLeave(event);
            ***REMOVED***;

            this._onTouchCancel = function (event) ***REMOVED***
                return _this.onTouchCancel(event);
            ***REMOVED***;

            this.game.canvas.addEventListener('touchstart', this._onTouchStart, false);
            this.game.canvas.addEventListener('touchmove', this._onTouchMove, false);
            this.game.canvas.addEventListener('touchend', this._onTouchEnd, false);
            this.game.canvas.addEventListener('touchcancel', this._onTouchCancel, false);

            if (!this.game.device.cocoonJS)
            ***REMOVED***
                this.game.canvas.addEventListener('touchenter', this._onTouchEnter, false);
                this.game.canvas.addEventListener('touchleave', this._onTouchLeave, false);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Consumes all touchmove events on the document (only enable this if you know you need it!).
    * @method Phaser.Touch#consumeTouchMove
    */
    consumeDocumentTouches: function () ***REMOVED***

        this._documentTouchMove = function (event) ***REMOVED***
            event.preventDefault();
        ***REMOVED***;

        document.addEventListener('touchmove', this._documentTouchMove, false);

    ***REMOVED***,

    /**
    * Adds a callback that is fired when a browser touchstart or touchend event is received.
    *
    * This is used internally to handle audio and video unlocking on mobile devices.
    *
    * If the callback returns 'true' then the callback is automatically deleted once invoked.
    *
    * The callback is added to the Phaser.Touch.touchLockCallbacks array and should be removed with Phaser.Touch.removeTouchLockCallback.
    * 
    * @method Phaser.Touch#addTouchLockCallback
    * @param ***REMOVED***function***REMOVED*** callback - The callback that will be called when a touchstart event is received.
    * @param ***REMOVED***object***REMOVED*** context - The context in which the callback will be called.
    * @param ***REMOVED***boolean***REMOVED*** [onEnd=false] - Will the callback fire on a touchstart (default) or touchend event?
    */
    addTouchLockCallback: function (callback, context, onEnd) ***REMOVED***

        if (onEnd === undefined) ***REMOVED*** onEnd = false; ***REMOVED***

        this.touchLockCallbacks.push(***REMOVED*** callback: callback, context: context, onEnd: onEnd ***REMOVED***);

    ***REMOVED***,

    /**
    * Removes the callback at the defined index from the Phaser.Touch.touchLockCallbacks array
    * 
    * @method Phaser.Touch#removeTouchLockCallback
    * @param ***REMOVED***function***REMOVED*** callback - The callback to be removed.
    * @param ***REMOVED***object***REMOVED*** context - The context in which the callback exists.
    * @return ***REMOVED***boolean***REMOVED*** True if the callback was deleted, otherwise false.
    */
    removeTouchLockCallback: function (callback, context) ***REMOVED***

        var i = this.touchLockCallbacks.length;

        while (i--)
        ***REMOVED***
            if (this.touchLockCallbacks[i].callback === callback && this.touchLockCallbacks[i].context === context)
            ***REMOVED***
                this.touchLockCallbacks.splice(i, 1);
                return true;
            ***REMOVED***
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * The internal method that handles the touchstart event from the browser.
    * @method Phaser.Touch#onTouchStart
    * @param ***REMOVED***TouchEvent***REMOVED*** event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchStart: function (event) ***REMOVED***

        var i = this.touchLockCallbacks.length;

        while (i--)
        ***REMOVED***
            var cb = this.touchLockCallbacks[i];

            if (!cb.onEnd && cb.callback.call(cb.context, this, event))
            ***REMOVED***
                this.touchLockCallbacks.splice(i, 1);
            ***REMOVED***
        ***REMOVED***

        this.event = event;

        if (!this.game.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.touchStartCallback)
        ***REMOVED***
            this.touchStartCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (this.preventDefault)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        //  event.targetTouches = list of all touches on the TARGET ELEMENT (i.e. game dom element)
        //  event.touches = list of all touches on the ENTIRE DOCUMENT, not just the target element
        //  event.changedTouches = the touches that CHANGED in this event, not the total number of them
        for (var i = 0; i < event.changedTouches.length; i++)
        ***REMOVED***
            this.game.input.startPointer(event.changedTouches[i]);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Touch cancel - touches that were disrupted (perhaps by moving into a plugin or browser chrome).
    * Occurs for example on iOS when you put down 4 fingers and the app selector UI appears.
    * @method Phaser.Touch#onTouchCancel
    * @param ***REMOVED***TouchEvent***REMOVED*** event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchCancel: function (event) ***REMOVED***

        this.event = event;

        if (this.touchCancelCallback)
        ***REMOVED***
            this.touchCancelCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.game.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.preventDefault)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        //  Touch cancel - touches that were disrupted (perhaps by moving into a plugin or browser chrome)
        //  http://www.w3.org/TR/touch-events/#dfn-touchcancel
        for (var i = 0; i < event.changedTouches.length; i++)
        ***REMOVED***
            this.game.input.stopPointer(event.changedTouches[i]);
        ***REMOVED***

    ***REMOVED***,

    /**
    * For touch enter and leave its a list of the touch points that have entered or left the target.
    * Doesn't appear to be supported by most browsers on a canvas element yet.
    * @method Phaser.Touch#onTouchEnter
    * @param ***REMOVED***TouchEvent***REMOVED*** event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchEnter: function (event) ***REMOVED***

        this.event = event;

        if (this.touchEnterCallback)
        ***REMOVED***
            this.touchEnterCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.game.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.preventDefault)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

    ***REMOVED***,

    /**
    * For touch enter and leave its a list of the touch points that have entered or left the target.
    * Doesn't appear to be supported by most browsers on a canvas element yet.
    * @method Phaser.Touch#onTouchLeave
    * @param ***REMOVED***TouchEvent***REMOVED*** event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchLeave: function (event) ***REMOVED***

        this.event = event;

        if (this.touchLeaveCallback)
        ***REMOVED***
            this.touchLeaveCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (this.preventDefault)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

    ***REMOVED***,

    /**
    * The handler for the touchmove events.
    * @method Phaser.Touch#onTouchMove
    * @param ***REMOVED***TouchEvent***REMOVED*** event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchMove: function (event) ***REMOVED***

        this.event = event;

        if (this.touchMoveCallback)
        ***REMOVED***
            this.touchMoveCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (this.preventDefault)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        for (var i = 0; i < event.changedTouches.length; i++)
        ***REMOVED***
            this.game.input.updatePointer(event.changedTouches[i]);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The handler for the touchend events.
    * @method Phaser.Touch#onTouchEnd
    * @param ***REMOVED***TouchEvent***REMOVED*** event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchEnd: function (event) ***REMOVED***

        var i = this.touchLockCallbacks.length;

        while (i--)
        ***REMOVED***
            var cb = this.touchLockCallbacks[i];

            if (cb.onEnd && cb.callback.call(cb.context, this, event))
            ***REMOVED***
                this.touchLockCallbacks.splice(i, 1);
            ***REMOVED***
        ***REMOVED***

        this.event = event;

        if (this.touchEndCallback)
        ***REMOVED***
            this.touchEndCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (this.preventDefault)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        //  For touch end its a list of the touch points that have been removed from the surface
        //  https://developer.mozilla.org/en-US/docs/DOM/TouchList
        //  event.changedTouches = the touches that CHANGED in this event, not the total number of them
        for (var i = 0; i < event.changedTouches.length; i++)
        ***REMOVED***
            this.game.input.stopPointer(event.changedTouches[i]);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Stop the event listeners.
    * @method Phaser.Touch#stop
    */
    stop: function () ***REMOVED***

        if (this.game.device.touch)
        ***REMOVED***
            this.game.canvas.removeEventListener('touchstart', this._onTouchStart);
            this.game.canvas.removeEventListener('touchmove', this._onTouchMove);
            this.game.canvas.removeEventListener('touchend', this._onTouchEnd);
            this.game.canvas.removeEventListener('touchenter', this._onTouchEnter);
            this.game.canvas.removeEventListener('touchleave', this._onTouchLeave);
            this.game.canvas.removeEventListener('touchcancel', this._onTouchCancel);
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.Touch.prototype.constructor = Phaser.Touch;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Input Handler is bound to a specific Sprite and is responsible for managing all Input events on that Sprite.
*
* @class Phaser.InputHandler
* @constructor
* @param ***REMOVED***Phaser.Sprite***REMOVED*** sprite - The Sprite object to which this Input Handler belongs.
*/
Phaser.InputHandler = function (sprite) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Sprite***REMOVED*** sprite - The Sprite object to which this Input Handler belongs.
    */
    this.sprite = sprite;

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = sprite.game;

    /**
    * @property ***REMOVED***boolean***REMOVED*** enabled - If enabled the Input Handler will process input requests and monitor pointer activity.
    * @default
    */
    this.enabled = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** checked - A disposable flag used by the Pointer class when performing priority checks.
    * @protected
    */
    this.checked = false;

    /**
    * The priorityID is used to determine which game objects should get priority when input events occur. For example if you have
    * several Sprites that overlap, by default the one at the top of the display list is given priority for input events. You can
    * stop this from happening by controlling the priorityID value. The higher the value, the more important they are considered to the Input events.
    * @property ***REMOVED***number***REMOVED*** priorityID
    * @default
    */
    this.priorityID = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** useHandCursor - On a desktop browser you can set the 'hand' cursor to appear when moving over the Sprite.
    * @default
    */
    this.useHandCursor = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _setHandCursor - Did this Sprite trigger the hand cursor?
    * @private
    */
    this._setHandCursor = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isDragged - true if the Sprite is being currently dragged.
    * @default
    */
    this.isDragged = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** allowHorizontalDrag - Controls if the Sprite is allowed to be dragged horizontally.
    * @default
    */
    this.allowHorizontalDrag = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** allowVerticalDrag - Controls if the Sprite is allowed to be dragged vertically.
    * @default
    */
    this.allowVerticalDrag = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** bringToTop - If true when this Sprite is clicked or dragged it will automatically be bought to the top of the Group it is within.
    * @default
    */
    this.bringToTop = false;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** snapOffset - A Point object that contains by how far the Sprite snap is offset.
    * @default
    */
    this.snapOffset = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** snapOnDrag - When the Sprite is dragged this controls if the center of the Sprite will snap to the pointer on drag or not.
    * @default
    */
    this.snapOnDrag = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** snapOnRelease - When the Sprite is dragged this controls if the Sprite will be snapped on release.
    * @default
    */
    this.snapOnRelease = false;

    /**
    * @property ***REMOVED***number***REMOVED*** snapX - When a Sprite has snapping enabled this holds the width of the snap grid.
    * @default
    */
    this.snapX = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** snapY - When a Sprite has snapping enabled this holds the height of the snap grid.
    * @default
    */
    this.snapY = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** snapOffsetX - This defines the top-left X coordinate of the snap grid.
    * @default
    */
    this.snapOffsetX = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** snapOffsetY - This defines the top-left Y coordinate of the snap grid..
    * @default
    */
    this.snapOffsetY = 0;

    /**
    * Set to true to use pixel perfect hit detection when checking if the pointer is over this Sprite.
    * The x/y coordinates of the pointer are tested against the image in combination with the InputHandler.pixelPerfectAlpha value.
    * This feature only works for display objects with image based textures such as Sprites. It won't work on BitmapText or Rope.
    * Warning: This is expensive, especially on mobile (where it's not even needed!) so only enable if required. Also see the less-expensive InputHandler.pixelPerfectClick.
    * @property ***REMOVED***boolean***REMOVED*** pixelPerfectOver - Use a pixel perfect check when testing for pointer over.
    * @default
    */
    this.pixelPerfectOver = false;

    /**
    * Set to true to use pixel perfect hit detection when checking if the pointer is over this Sprite when it's clicked or touched.
    * The x/y coordinates of the pointer are tested against the image in combination with the InputHandler.pixelPerfectAlpha value.
    * This feature only works for display objects with image based textures such as Sprites. It won't work on BitmapText or Rope.
    * Warning: This is expensive so only enable if you really need it.
    * @property ***REMOVED***boolean***REMOVED*** pixelPerfectClick - Use a pixel perfect check when testing for clicks or touches on the Sprite.
    * @default
    */
    this.pixelPerfectClick = false;

    /**
    * @property ***REMOVED***number***REMOVED*** pixelPerfectAlpha - The alpha tolerance threshold. If the alpha value of the pixel matches or is above this value, it's considered a hit.
    * @default
    */
    this.pixelPerfectAlpha = 255;

    /**
    * @property ***REMOVED***boolean***REMOVED*** draggable - Is this sprite allowed to be dragged by the mouse? true = yes, false = no
    * @default
    */
    this.draggable = false;

    /**
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** boundsRect - A region of the game world within which the sprite is restricted during drag.
    * @default
    */
    this.boundsRect = null;

    /**
    * @property ***REMOVED***Phaser.Sprite***REMOVED*** boundsSprite - A Sprite the bounds of which this sprite is restricted during drag.
    * @default
    */
    this.boundsSprite = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** scaleLayer - EXPERIMENTAL: Please do not use this property unless you know what it does. Likely to change in the future.
    */
    this.scaleLayer = false;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** dragOffset - The offset from the Sprites position that dragging takes place from.
    */
    this.dragOffset = new Phaser.Point();

    /**
    * @property ***REMOVED***boolean***REMOVED*** dragFromCenter - Is the Sprite dragged from its center, or the point at which the Pointer was pressed down upon it?
    */
    this.dragFromCenter = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** dragStopBlocksInputUp - If enabled, when the Sprite stops being dragged, it will only dispatch the `onDragStop` event, and not the `onInputUp` event. If set to `false` it will dispatch both events.
    */
    this.dragStopBlocksInputUp = false;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** dragStartPoint - The Point from which the most recent drag started from. Useful if you need to return an object to its starting position.
    */
    this.dragStartPoint = new Phaser.Point();

    /**
    * @property ***REMOVED***integer***REMOVED*** dragDistanceThreshold - The distance, in pixels, the pointer has to move while being held down, before the Sprite thinks it is being dragged.
    */
    this.dragDistanceThreshold = 0;

    /**
    * @property ***REMOVED***integer***REMOVED*** dragTimeThreshold - The amount of time, in ms, the pointer has to be held down over the Sprite before it thinks it is being dragged.
    */
    this.dragTimeThreshold = 0;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** downPoint - A Point object containing the coordinates of the Pointer when it was first pressed down onto this Sprite.
    */
    this.downPoint = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** snapPoint - If the sprite is set to snap while dragging this holds the point of the most recent 'snap' event.
    */
    this.snapPoint = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _dragPoint - Internal cache var.
    * @private
    */
    this._dragPoint = new Phaser.Point();

    /**
    * @property ***REMOVED***boolean***REMOVED*** _dragPhase - Internal cache var.
    * @private
    */
    this._dragPhase = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _pendingDrag - Internal cache var.
    * @private
    */
    this._pendingDrag = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _dragTimePass - Internal cache var.
    * @private
    */
    this._dragTimePass = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _dragDistancePass - Internal cache var.
    * @private
    */
    this._dragDistancePass = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _wasEnabled - Internal cache var.
    * @private
    */
    this._wasEnabled = false;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _tempPoint - Internal cache var.
    * @private
    */
    this._tempPoint = new Phaser.Point();

    /**
    * @property ***REMOVED***array***REMOVED*** _pointerData - Internal cache var.
    * @private
    */
    this._pointerData = [];

    this._pointerData.push(***REMOVED***
        id: 0,
        x: 0,
        y: 0,
        camX: 0,
        camY: 0,
        isDown: false,
        isUp: false,
        isOver: false,
        isOut: false,
        timeOver: 0,
        timeOut: 0,
        timeDown: 0,
        timeUp: 0,
        downDuration: 0,
        isDragged: false
    ***REMOVED***);

***REMOVED***;

Phaser.InputHandler.prototype = ***REMOVED***

    /**
    * Starts the Input Handler running. This is called automatically when you enable input on a Sprite, or can be called directly if you need to set a specific priority.
    * 
    * @method Phaser.InputHandler#start
    * @param ***REMOVED***number***REMOVED*** [priority=0] - Higher priority sprites take click priority over low-priority sprites when they are stacked on-top of each other.
    * @param ***REMOVED***boolean***REMOVED*** [useHandCursor=false] - If true the Sprite will show the hand cursor on mouse-over (doesn't apply to mobile browsers)
    * @return ***REMOVED***Phaser.Sprite***REMOVED*** The Sprite object to which the Input Handler is bound.
    */
    start: function (priority, useHandCursor) ***REMOVED***

        priority = priority || 0;
        if (useHandCursor === undefined) ***REMOVED*** useHandCursor = false; ***REMOVED***

        //  Turning on
        if (this.enabled === false)
        ***REMOVED***
            //  Register, etc
            this.game.input.interactiveItems.add(this);
            this.useHandCursor = useHandCursor;
            this.priorityID = priority;

            for (var i = 0; i < 10; i++)
            ***REMOVED***
                this._pointerData[i] = ***REMOVED***
                    id: i,
                    x: 0,
                    y: 0,
                    isDown: false,
                    isUp: false,
                    isOver: false,
                    isOut: false,
                    timeOver: 0,
                    timeOut: 0,
                    timeDown: 0,
                    timeUp: 0,
                    downDuration: 0,
                    isDragged: false
                ***REMOVED***;
            ***REMOVED***

            this.snapOffset = new Phaser.Point();
            this.enabled = true;
            this._wasEnabled = true;

        ***REMOVED***

        this.sprite.events.onAddedToGroup.add(this.addedToGroup, this);
        this.sprite.events.onRemovedFromGroup.add(this.removedFromGroup, this);

        return this.sprite;

    ***REMOVED***,

    /**
    * Handles when the parent Sprite is added to a new Group.
    *
    * @method Phaser.InputHandler#addedToGroup
    * @private
    */
    addedToGroup: function () ***REMOVED***

        if (this._dragPhase)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this._wasEnabled && !this.enabled)
        ***REMOVED***
            this.start();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Handles when the parent Sprite is removed from a Group.
    *
    * @method Phaser.InputHandler#removedFromGroup
    * @private
    */
    removedFromGroup: function () ***REMOVED***

        if (this._dragPhase)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.enabled)
        ***REMOVED***
            this._wasEnabled = true;
            this.stop();
        ***REMOVED***
        else
        ***REMOVED***
            this._wasEnabled = false;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Resets the Input Handler and disables it.
    * @method Phaser.InputHandler#reset
    */
    reset: function () ***REMOVED***

        this.enabled = false;

        for (var i = 0; i < 10; i++)
        ***REMOVED***
            this._pointerData[i] = ***REMOVED***
                id: i,
                x: 0,
                y: 0,
                isDown: false,
                isUp: false,
                isOver: false,
                isOut: false,
                timeOver: 0,
                timeOut: 0,
                timeDown: 0,
                timeUp: 0,
                downDuration: 0,
                isDragged: false
            ***REMOVED***;
        ***REMOVED***
    ***REMOVED***,

    /**
    * Stops the Input Handler from running.
    * @method Phaser.InputHandler#stop
    */
    stop: function () ***REMOVED***

        //  Turning off
        if (this.enabled === false)
        ***REMOVED***
            return;
        ***REMOVED***
        else
        ***REMOVED***
            //  De-register, etc
            this.enabled = false;
            this.game.input.interactiveItems.remove(this);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Clean up memory.
    * @method Phaser.InputHandler#destroy
    */
    destroy: function () ***REMOVED***

        if (this.sprite)
        ***REMOVED***
            if (this._setHandCursor)
            ***REMOVED***
                this.game.canvas.style.cursor = "default";
                this._setHandCursor = false;
            ***REMOVED***

            this.enabled = false;

            this.game.input.interactiveItems.remove(this);

            this._pointerData.length = 0;
            this.boundsRect = null;
            this.boundsSprite = null;
            this.sprite = null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Checks if the object this InputHandler is bound to is valid for consideration in the Pointer move event.
    * This is called by Phaser.Pointer and shouldn't typically be called directly.
    *
    * @method Phaser.InputHandler#validForInput
    * @protected
    * @param ***REMOVED***number***REMOVED*** highestID - The highest ID currently processed by the Pointer.
    * @param ***REMOVED***number***REMOVED*** highestRenderID - The highest Render Order ID currently processed by the Pointer.
    * @param ***REMOVED***boolean***REMOVED*** [includePixelPerfect=true] - If this object has `pixelPerfectClick` or `pixelPerfectOver` set should it be considered as valid?
    * @return ***REMOVED***boolean***REMOVED*** True if the object this InputHandler is bound to should be considered as valid for input detection.
    */
    validForInput: function (highestID, highestRenderID, includePixelPerfect) ***REMOVED***

        if (includePixelPerfect === undefined) ***REMOVED*** includePixelPerfect = true; ***REMOVED***

        if (!this.enabled ||
            this.sprite.scale.x === 0 ||
            this.sprite.scale.y === 0 ||
            this.priorityID < this.game.input.minPriorityID ||
            (this.sprite.parent && this.sprite.parent.ignoreChildInput))
        ***REMOVED***
            return false;
        ***REMOVED***

        //   If we're trying to specifically IGNORE pixel perfect objects, then set includePixelPerfect to false and skip it
        if (!includePixelPerfect && (this.pixelPerfectClick || this.pixelPerfectOver))
        ***REMOVED***
            return false;
        ***REMOVED***

        if (this.priorityID > highestID || (this.priorityID === highestID && this.sprite.renderOrderID > highestRenderID))
        ***REMOVED***
            return true;
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Is this object using pixel perfect checking?
    *
    * @method Phaser.InputHandler#isPixelPerfect
    * @return ***REMOVED***boolean***REMOVED*** True if the this InputHandler has either `pixelPerfectClick` or `pixelPerfectOver` set to `true`.
    */
    isPixelPerfect: function () ***REMOVED***

        return (this.pixelPerfectClick || this.pixelPerfectOver);

    ***REMOVED***,

    /**
    * The x coordinate of the Input pointer, relative to the top-left of the parent Sprite.
    * This value is only set when the pointer is over this Sprite.
    *
    * @method Phaser.InputHandler#pointerX
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***number***REMOVED*** The x coordinate of the Input pointer.
    */
    pointerX: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].x;

    ***REMOVED***,

    /**
    * The y coordinate of the Input pointer, relative to the top-left of the parent Sprite
    * This value is only set when the pointer is over this Sprite.
    *
    * @method Phaser.InputHandler#pointerY
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***number***REMOVED*** The y coordinate of the Input pointer.
    */
    pointerY: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].y;

    ***REMOVED***,

    /**
    * If the Pointer is down this returns true.
    * This *only* checks if the Pointer is down, not if it's down over any specific Sprite.
    *
    * @method Phaser.InputHandler#pointerDown
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***boolean***REMOVED*** - True if the given pointer is down, otherwise false.
    */
    pointerDown: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].isDown;

    ***REMOVED***,

    /**
    * If the Pointer is up this returns true.
    * This *only* checks if the Pointer is up, not if it's up over any specific Sprite.
    *
    * @method Phaser.InputHandler#pointerUp
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***boolean***REMOVED*** - True if the given pointer is up, otherwise false.
    */
    pointerUp: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].isUp;

    ***REMOVED***,

    /**
    * A timestamp representing when the Pointer first touched the touchscreen.
    *
    * @method Phaser.InputHandler#pointerTimeDown
    * @param ***REMOVED***integer***REMOVED*** [pointerId=(check all)]
    * @return ***REMOVED***number***REMOVED***
    */
    pointerTimeDown: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].timeDown;

    ***REMOVED***,

    /**
    * A timestamp representing when the Pointer left the touchscreen.
    *
    * @method Phaser.InputHandler#pointerTimeUp
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***number***REMOVED***
    */
    pointerTimeUp: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].timeUp;

    ***REMOVED***,

    /**
    * Is the Pointer over this Sprite?
    *
    * @method Phaser.InputHandler#pointerOver
    * @param ***REMOVED***integer***REMOVED*** [pointerId=(check all)] The ID number of a Pointer to check. If you don't provide a number it will check all Pointers.
    * @return ***REMOVED***boolean***REMOVED*** - True if the given pointer (if a index was given, or any pointer if not) is over this object.
    */
    pointerOver: function (pointerId) ***REMOVED***

        if (!this.enabled)
        ***REMOVED***
            return false;
        ***REMOVED***

        if (pointerId === undefined)
        ***REMOVED***
            for (var i = 0; i < 10; i++)
            ***REMOVED***
                if (this._pointerData[i].isOver)
                ***REMOVED***
                    return true;
                ***REMOVED***
            ***REMOVED***

            return false;
        ***REMOVED***
        else
        ***REMOVED***
            return this._pointerData[pointerId].isOver;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Is the Pointer outside of this Sprite?
    *
    * @method Phaser.InputHandler#pointerOut
    * @param ***REMOVED***integer***REMOVED*** [pointerId=(check all)] The ID number of a Pointer to check. If you don't provide a number it will check all Pointers.
    * @return ***REMOVED***boolean***REMOVED*** True if the given pointer (if a index was given, or any pointer if not) is out of this object.
    */
    pointerOut: function (pointerId) ***REMOVED***

        if (!this.enabled)
        ***REMOVED***
            return false;
        ***REMOVED***

        if (pointerId === undefined)
        ***REMOVED***
            for (var i = 0; i < 10; i++)
            ***REMOVED***
                if (this._pointerData[i].isOut)
                ***REMOVED***
                    return true;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            return this._pointerData[pointerId].isOut;
        ***REMOVED***

    ***REMOVED***,

    /**
    * A timestamp representing when the Pointer first touched the touchscreen.
    *
    * @method Phaser.InputHandler#pointerTimeOver
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***number***REMOVED***
    */
    pointerTimeOver: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].timeOver;

    ***REMOVED***,

    /**
    * A timestamp representing when the Pointer left the touchscreen.
    *
    * @method Phaser.InputHandler#pointerTimeOut
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***number***REMOVED***
    */
    pointerTimeOut: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].timeOut;

    ***REMOVED***,

    /**
    * Is this sprite being dragged by the mouse or not?
    *
    * @method Phaser.InputHandler#pointerDragged
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***boolean***REMOVED*** True if the pointer is dragging an object, otherwise false.
    */
    pointerDragged: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].isDragged;

    ***REMOVED***,

    /**
    * Checks if the given pointer is both down and over the Sprite this InputHandler belongs to.
    * Use the `fastTest` flag is to quickly check just the bounding hit area even if `InputHandler.pixelPerfectOver` is `true`.
    *
    * @method Phaser.InputHandler#checkPointerDown
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer
    * @param ***REMOVED***boolean***REMOVED*** [fastTest=false] - Force a simple hit area check even if `pixelPerfectOver` is true for this object?
    * @return ***REMOVED***boolean***REMOVED*** True if the pointer is down, otherwise false.
    */
    checkPointerDown: function (pointer, fastTest) ***REMOVED***

        if (!pointer.isDown ||
            !this.enabled ||
            !this.sprite ||
            !this.sprite.parent ||
            !this.sprite.visible ||
            !this.sprite.parent.visible ||
            this.sprite.worldScale.x === 0 ||
            this.sprite.worldScale.y === 0)
        ***REMOVED***
            return false;
        ***REMOVED***

        //  Need to pass it a temp point, in case we need it again for the pixel check
        if (this.game.input.hitTest(this.sprite, pointer, this._tempPoint))
        ***REMOVED***
            if (fastTest === undefined)
            ***REMOVED***
                fastTest = false;
            ***REMOVED***

            if (!fastTest && this.pixelPerfectClick)
            ***REMOVED***
                return this.checkPixel(this._tempPoint.x, this._tempPoint.y);
            ***REMOVED***
            else
            ***REMOVED***
                return true;
            ***REMOVED***
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Checks if the given pointer is over the Sprite this InputHandler belongs to.
    * Use the `fastTest` flag is to quickly check just the bounding hit area even if `InputHandler.pixelPerfectOver` is `true`.
    *
    * @method Phaser.InputHandler#checkPointerOver
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer
    * @param ***REMOVED***boolean***REMOVED*** [fastTest=false] - Force a simple hit area check even if `pixelPerfectOver` is true for this object?
    * @return ***REMOVED***boolean***REMOVED***
    */
    checkPointerOver: function (pointer, fastTest) ***REMOVED***

        if (!this.enabled ||
            !this.sprite ||
            !this.sprite.parent ||
            !this.sprite.visible ||
            !this.sprite.parent.visible ||
            this.sprite.worldScale.x === 0 ||
            this.sprite.worldScale.y === 0)
        ***REMOVED***
            return false;
        ***REMOVED***

        //  Need to pass it a temp point, in case we need it again for the pixel check
        if (this.game.input.hitTest(this.sprite, pointer, this._tempPoint))
        ***REMOVED***
            if (fastTest === undefined)
            ***REMOVED***
                fastTest = false;
            ***REMOVED***

            if (!fastTest && this.pixelPerfectOver)
            ***REMOVED***
                return this.checkPixel(this._tempPoint.x, this._tempPoint.y);
            ***REMOVED***
            else
            ***REMOVED***
                return true;
            ***REMOVED***
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Runs a pixel perfect check against the given x/y coordinates of the Sprite this InputHandler is bound to.
    * It compares the alpha value of the pixel and if >= InputHandler.pixelPerfectAlpha it returns true.
    *
    * @method Phaser.InputHandler#checkPixel
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate to check.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate to check.
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** [pointer] - The pointer to get the x/y coordinate from if not passed as the first two parameters.
    * @return ***REMOVED***boolean***REMOVED*** true if there is the alpha of the pixel is >= InputHandler.pixelPerfectAlpha
    */
    checkPixel: function (x, y, pointer) ***REMOVED***

        //  Grab a pixel from our image into the hitCanvas and then test it
        if (this.sprite.texture.baseTexture.source)
        ***REMOVED***
            if (x === null && y === null)
            ***REMOVED***
                //  Use the pointer parameter
                this.game.input.getLocalPosition(this.sprite, pointer, this._tempPoint);

                var x = this._tempPoint.x;
                var y = this._tempPoint.y;
            ***REMOVED***

            if (this.sprite.anchor.x !== 0)
            ***REMOVED***
                x -= -this.sprite.texture.frame.width * this.sprite.anchor.x;
            ***REMOVED***

            if (this.sprite.anchor.y !== 0)
            ***REMOVED***
                y -= -this.sprite.texture.frame.height * this.sprite.anchor.y;
            ***REMOVED***

            x += this.sprite.texture.frame.x;
            y += this.sprite.texture.frame.y;

            if (this.sprite.texture.trim)
            ***REMOVED***
                x -= this.sprite.texture.trim.x;
                y -= this.sprite.texture.trim.y;

                //  If the coordinates are outside the trim area we return false immediately, to save doing a draw call
                if (x < this.sprite.texture.crop.x || x > this.sprite.texture.crop.right || y < this.sprite.texture.crop.y || y > this.sprite.texture.crop.bottom)
                ***REMOVED***
                    this._dx = x;
                    this._dy = y;
                    return false;
                ***REMOVED***
            ***REMOVED***

            this._dx = x;
            this._dy = y;

            this.game.input.hitContext.clearRect(0, 0, 1, 1);
            this.game.input.hitContext.drawImage(this.sprite.texture.baseTexture.source, x, y, 1, 1, 0, 0, 1, 1);

            var rgb = this.game.input.hitContext.getImageData(0, 0, 1, 1);

            if (rgb.data[3] >= this.pixelPerfectAlpha)
            ***REMOVED***
                return true;
            ***REMOVED***
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Internal Update method. This is called automatically and handles the Pointer
    * and drag update loops.
    * 
    * @method Phaser.InputHandler#update
    * @protected
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer
    * @return ***REMOVED***boolean***REMOVED*** True if the pointer is still active, otherwise false.
    */
    update: function (pointer) ***REMOVED***

        if (this.sprite === null || this.sprite.parent === undefined)
        ***REMOVED***
            //  Abort. We've been destroyed.
            return;
        ***REMOVED***

        if (!this.enabled || !this.sprite.visible || !this.sprite.parent.visible)
        ***REMOVED***
            this._pointerOutHandler(pointer);
            return false;
        ***REMOVED***

        if (this._pendingDrag)
        ***REMOVED***
            if (!this._dragDistancePass)
            ***REMOVED***
                this._dragDistancePass = (Phaser.Math.distance(pointer.x, pointer.y, this.downPoint.x, this.downPoint.y) >= this.dragDistanceThreshold);
            ***REMOVED***

            if (this._dragDistancePass && this._dragTimePass)
            ***REMOVED***
                this.startDrag(pointer);
            ***REMOVED***

            return true;
        ***REMOVED***
        else if (this.draggable && this._draggedPointerID === pointer.id)
        ***REMOVED***
            return this.updateDrag(pointer, false);
        ***REMOVED***
        else if (this._pointerData[pointer.id].isOver)
        ***REMOVED***
            if (this.checkPointerOver(pointer))
            ***REMOVED***
                this._pointerData[pointer.id].x = pointer.x - this.sprite.x;
                this._pointerData[pointer.id].y = pointer.y - this.sprite.y;
                return true;
            ***REMOVED***
            else
            ***REMOVED***
                this._pointerOutHandler(pointer);
                return false;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***,

    /**
    * Internal method handling the pointer over event.
    * 
    * @method Phaser.InputHandler#_pointerOverHandler
    * @private
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The pointer that triggered the event
    * @param ***REMOVED***boolean***REMOVED*** [silent=false] - If silent is `true` then this method will not dispatch any Signals from the parent Sprite.
    */
    _pointerOverHandler: function (pointer, silent) ***REMOVED***

        if (this.sprite === null)
        ***REMOVED***
            //  Abort. We've been destroyed.
            return;
        ***REMOVED***

        var data = this._pointerData[pointer.id];

        if (data.isOver === false || pointer.dirty)
        ***REMOVED***
            var sendEvent = (data.isOver === false);

            data.isOver = true;
            data.isOut = false;
            data.timeOver = this.game.time.time;
            data.x = pointer.x - this.sprite.x;
            data.y = pointer.y - this.sprite.y;

            if (this.useHandCursor && data.isDragged === false)
            ***REMOVED***
                this.game.canvas.style.cursor = "pointer";
                this._setHandCursor = true;
            ***REMOVED***

            if (!silent && sendEvent && this.sprite && this.sprite.events)
            ***REMOVED***
                this.sprite.events.onInputOver$dispatch(this.sprite, pointer);
            ***REMOVED***

            if (this.sprite.parent && this.sprite.parent.type === Phaser.GROUP)
            ***REMOVED***
                this.sprite.parent.onChildInputOver.dispatch(this.sprite, pointer);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method handling the pointer out event.
    * 
    * @method Phaser.InputHandler#_pointerOutHandler
    * @private
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The pointer that triggered the event.
    * @param ***REMOVED***boolean***REMOVED*** [silent=false] - If silent is `true` then this method will not dispatch any Signals from the parent Sprite.
    */
    _pointerOutHandler: function (pointer, silent) ***REMOVED***

        if (this.sprite === null)
        ***REMOVED***
            //  Abort. We've been destroyed.
            return;
        ***REMOVED***

        var data = this._pointerData[pointer.id];

        data.isOver = false;
        data.isOut = true;
        data.timeOut = this.game.time.time;

        if (this.useHandCursor && data.isDragged === false)
        ***REMOVED***
            this.game.canvas.style.cursor = "default";
            this._setHandCursor = false;
        ***REMOVED***

        if (!silent && this.sprite && this.sprite.events)
        ***REMOVED***
            this.sprite.events.onInputOut$dispatch(this.sprite, pointer);

            if (this.sprite && this.sprite.parent && this.sprite.parent.type === Phaser.GROUP)
            ***REMOVED***
                this.sprite.parent.onChildInputOut.dispatch(this.sprite, pointer);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method handling the touched / clicked event.
    * 
    * @method Phaser.InputHandler#_touchedHandler
    * @private
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The pointer that triggered the event.
    */
    _touchedHandler: function (pointer) ***REMOVED***

        if (this.sprite === null)
        ***REMOVED***
            //  Abort. We've been destroyed.
            return;
        ***REMOVED***

        var data = this._pointerData[pointer.id];

        if (!data.isDown && data.isOver)
        ***REMOVED***
            if (this.pixelPerfectClick && !this.checkPixel(null, null, pointer))
            ***REMOVED***
                return;
            ***REMOVED***

            data.isDown = true;
            data.isUp = false;
            data.timeDown = this.game.time.time;

            this.downPoint.set(pointer.x, pointer.y);

            //  It's possible the onInputDown event creates a new Sprite that is on-top of this one, so we ought to force a Pointer update
            pointer.dirty = true;

            if (this.sprite && this.sprite.events)
            ***REMOVED***
                this.sprite.events.onInputDown$dispatch(this.sprite, pointer);

                //  The event above might have destroyed this sprite.
                if (this.sprite && this.sprite.parent && this.sprite.parent.type === Phaser.GROUP)
                ***REMOVED***
                    this.sprite.parent.onChildInputDown.dispatch(this.sprite, pointer);
                ***REMOVED***

                //  The events might have destroyed this sprite.
                if (this.sprite === null)
                ***REMOVED***
                    return;
                ***REMOVED***
            ***REMOVED***

            //  Start drag
            if (this.draggable && this.isDragged === false)
            ***REMOVED***
                if (this.dragTimeThreshold === 0 && this.dragDistanceThreshold === 0)
                ***REMOVED***
                    this.startDrag(pointer);
                ***REMOVED***
                else
                ***REMOVED***
                    this._pendingDrag = true;

                    this._dragDistancePass = (this.dragDistanceThreshold === 0);

                    if (this.dragTimeThreshold > 0)
                    ***REMOVED***
                        this._dragTimePass = false;
                        this.game.time.events.add(this.dragTimeThreshold, this.dragTimeElapsed, this, pointer);
                    ***REMOVED***
                    else
                    ***REMOVED***
                        this._dragTimePass = true;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***

            if (this.bringToTop)
            ***REMOVED***
                this.sprite.bringToTop();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method handling the drag threshold timer.
    * 
    * @method Phaser.InputHandler#dragTimeElapsed
    * @private
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer
    */
    dragTimeElapsed: function (pointer) ***REMOVED***

        this._dragTimePass = true;

        if (this._pendingDrag && this.sprite)
        ***REMOVED***
            if (this._dragDistancePass)
            ***REMOVED***
                this.startDrag(pointer);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method handling the pointer released event.
    * @method Phaser.InputHandler#_releasedHandler
    * @private
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer
    */
    _releasedHandler: function (pointer) ***REMOVED***

        if (this.sprite === null)
        ***REMOVED***
            //  Abort. We've been destroyed.
            return;
        ***REMOVED***

        var data = this._pointerData[pointer.id];

        //  If was previously touched by this Pointer, check if still is AND still over this item
        if (data.isDown && pointer.isUp)
        ***REMOVED***
            data.isDown = false;
            data.isUp = true;
            data.timeUp = this.game.time.time;
            data.downDuration = data.timeUp - data.timeDown;

            //  Only release the InputUp signal if the pointer is still over this sprite
            var isOver = this.checkPointerOver(pointer);

            if (this.sprite && this.sprite.events)
            ***REMOVED***
                if (!this.dragStopBlocksInputUp ||
                    this.dragStopBlocksInputUp && !(this.draggable && this.isDragged && this._draggedPointerID === pointer.id))
                ***REMOVED***
                    this.sprite.events.onInputUp$dispatch(this.sprite, pointer, isOver);
                ***REMOVED***

                if (this.sprite && this.sprite.parent && this.sprite.parent.type === Phaser.GROUP)
                ***REMOVED***
                    this.sprite.parent.onChildInputUp.dispatch(this.sprite, pointer, isOver);
                ***REMOVED***

                //  The onInputUp event may have changed the sprite so that checkPointerOver is no longer true, so update it.
                if (isOver)
                ***REMOVED***
                    isOver = this.checkPointerOver(pointer);
                ***REMOVED***
            ***REMOVED***
            
            data.isOver = isOver;

            if (!isOver && this.useHandCursor)
            ***REMOVED***
                this.game.canvas.style.cursor = "default";
                this._setHandCursor = false;
            ***REMOVED***

            //  It's possible the onInputUp event created a new Sprite that is on-top of this one, so force a Pointer update
            pointer.dirty = true;

            this._pendingDrag = false;

            //  Stop drag
            if (this.draggable && this.isDragged && this._draggedPointerID === pointer.id)
            ***REMOVED***
                this.stopDrag(pointer);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called as a Pointer actively drags this Game Object.
    * 
    * @method Phaser.InputHandler#updateDrag
    * @private
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The Pointer causing the drag update.
    * @param ***REMOVED***boolean***REMOVED*** fromStart - True if this is the first update, immediately after the drag has started.
    * @return ***REMOVED***boolean***REMOVED***
    */
    updateDrag: function (pointer, fromStart) ***REMOVED***

        if (fromStart === undefined) ***REMOVED*** fromStart = false; ***REMOVED***

        if (pointer.isUp)
        ***REMOVED***
            this.stopDrag(pointer);
            return false;
        ***REMOVED***

        var px = this.globalToLocalX(pointer.x) + this._dragPoint.x + this.dragOffset.x;
        var py = this.globalToLocalY(pointer.y) + this._dragPoint.y + this.dragOffset.y;

        if (this.sprite.fixedToCamera)
        ***REMOVED***
            if (this.allowHorizontalDrag)
            ***REMOVED***
                this.sprite.cameraOffset.x = px;
            ***REMOVED***

            if (this.allowVerticalDrag)
            ***REMOVED***
                this.sprite.cameraOffset.y = py;
            ***REMOVED***

            if (this.boundsRect)
            ***REMOVED***
                this.checkBoundsRect();
            ***REMOVED***

            if (this.boundsSprite)
            ***REMOVED***
                this.checkBoundsSprite();
            ***REMOVED***

            if (this.snapOnDrag)
            ***REMOVED***
                this.sprite.cameraOffset.x = Math.round((this.sprite.cameraOffset.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX + (this.snapOffsetX % this.snapX);
                this.sprite.cameraOffset.y = Math.round((this.sprite.cameraOffset.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY + (this.snapOffsetY % this.snapY);
                this.snapPoint.set(this.sprite.cameraOffset.x, this.sprite.cameraOffset.y);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            var cx = this.game.camera.x - this._pointerData[pointer.id].camX;
            var cy = this.game.camera.y - this._pointerData[pointer.id].camY;

            if (this.allowHorizontalDrag)
            ***REMOVED***
                this.sprite.x = px + cx;
            ***REMOVED***

            if (this.allowVerticalDrag)
            ***REMOVED***
                this.sprite.y = py + cy;
            ***REMOVED***

            if (this.boundsRect)
            ***REMOVED***
                this.checkBoundsRect();
            ***REMOVED***

            if (this.boundsSprite)
            ***REMOVED***
                this.checkBoundsSprite();
            ***REMOVED***

            if (this.snapOnDrag)
            ***REMOVED***
                this.sprite.x = Math.round((this.sprite.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX + (this.snapOffsetX % this.snapX);
                this.sprite.y = Math.round((this.sprite.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY + (this.snapOffsetY % this.snapY);
                this.snapPoint.set(this.sprite.x, this.sprite.y);
            ***REMOVED***
        ***REMOVED***

        this.sprite.events.onDragUpdate.dispatch(this.sprite, pointer, px, py, this.snapPoint, fromStart);

        return true;

    ***REMOVED***,

    /**
    * Returns true if the pointer has entered the Sprite within the specified delay time (defaults to 500ms, half a second)
    *
    * @method Phaser.InputHandler#justOver
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @param ***REMOVED***number***REMOVED*** delay - The time below which the pointer is considered as just over.
    * @return ***REMOVED***boolean***REMOVED***
    */
    justOver: function (pointerId, delay) ***REMOVED***

        pointerId = pointerId || 0;
        delay = delay || 500;

        return (this._pointerData[pointerId].isOver && this.overDuration(pointerId) < delay);

    ***REMOVED***,

    /**
    * Returns true if the pointer has left the Sprite within the specified delay time (defaults to 500ms, half a second)
    *
    * @method Phaser.InputHandler#justOut
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @param ***REMOVED***number***REMOVED*** delay - The time below which the pointer is considered as just out.
    * @return ***REMOVED***boolean***REMOVED***
    */
    justOut: function (pointerId, delay) ***REMOVED***

        pointerId = pointerId || 0;
        delay = delay || 500;

        return (this._pointerData[pointerId].isOut && (this.game.time.time - this._pointerData[pointerId].timeOut < delay));

    ***REMOVED***,

    /**
    * Returns true if the pointer has touched or clicked on the Sprite within the specified delay time (defaults to 500ms, half a second)
    *
    * @method Phaser.InputHandler#justPressed
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @param ***REMOVED***number***REMOVED*** delay - The time below which the pointer is considered as just over.
    * @return ***REMOVED***boolean***REMOVED***
    */
    justPressed: function (pointerId, delay) ***REMOVED***

        pointerId = pointerId || 0;
        delay = delay || 500;

        return (this._pointerData[pointerId].isDown && this.downDuration(pointerId) < delay);

    ***REMOVED***,

    /**
    * Returns true if the pointer was touching this Sprite, but has been released within the specified delay time (defaults to 500ms, half a second)
    *
    * @method Phaser.InputHandler#justReleased
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @param ***REMOVED***number***REMOVED*** delay - The time below which the pointer is considered as just out.
    * @return ***REMOVED***boolean***REMOVED***
    */
    justReleased: function (pointerId, delay) ***REMOVED***

        pointerId = pointerId || 0;
        delay = delay || 500;

        return (this._pointerData[pointerId].isUp && (this.game.time.time - this._pointerData[pointerId].timeUp < delay));

    ***REMOVED***,

    /**
    * If the pointer is currently over this Sprite this returns how long it has been there for in milliseconds.
    *
    * @method Phaser.InputHandler#overDuration
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***number***REMOVED*** The number of milliseconds the pointer has been over the Sprite, or -1 if not over.
    */
    overDuration: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        if (this._pointerData[pointerId].isOver)
        ***REMOVED***
            return this.game.time.time - this._pointerData[pointerId].timeOver;
        ***REMOVED***

        return -1;

    ***REMOVED***,

    /**
    * If the pointer is currently over this Sprite this returns how long it has been there for in milliseconds.
    *
    * @method Phaser.InputHandler#downDuration
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***number***REMOVED*** The number of milliseconds the pointer has been pressed down on the Sprite, or -1 if not over.
    */
    downDuration: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        if (this._pointerData[pointerId].isDown)
        ***REMOVED***
            return this.game.time.time - this._pointerData[pointerId].timeDown;
        ***REMOVED***

        return -1;

    ***REMOVED***,

    /**
    * Allow this Sprite to be dragged by any valid pointer.
    *
    * When the drag begins the Sprite.events.onDragStart event will be dispatched.
    * 
    * When the drag completes by way of the user letting go of the pointer that was dragging the sprite, the Sprite.events.onDragStop event is dispatched.
    *
    * You can control the thresholds over when a drag starts via the properties:
    * 
    * `Pointer.dragDistanceThreshold` the distance, in pixels, that the pointer has to move
    * before the drag will start.
    *
    * `Pointer.dragTimeThreshold` the time, in ms, that the pointer must be held down on
    * the Sprite before the drag will start.
    *
    * You can set either (or both) of these properties after enabling a Sprite for drag.
    *
    * For the duration of the drag the Sprite.events.onDragUpdate event is dispatched. This event is only dispatched when the pointer actually
    * changes position and moves. The event sends 5 parameters: `sprite`, `pointer`, `dragX`, `dragY` and `snapPoint`.
    * 
    * @method Phaser.InputHandler#enableDrag
    * @param ***REMOVED***boolean***REMOVED*** [lockCenter=false] - If false the Sprite will drag from where you click it minus the dragOffset. If true it will center itself to the tip of the mouse pointer.
    * @param ***REMOVED***boolean***REMOVED*** [bringToTop=false] - If true the Sprite will be bought to the top of the rendering list in its current Group.
    * @param ***REMOVED***boolean***REMOVED*** [pixelPerfect=false] - If true it will use a pixel perfect test to see if you clicked the Sprite. False uses the bounding box.
    * @param ***REMOVED***boolean***REMOVED*** [alphaThreshold=255] - If using pixel perfect collision this specifies the alpha level from 0 to 255 above which a collision is processed.
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** [boundsRect=null] - If you want to restrict the drag of this sprite to a specific Rectangle, pass the Phaser.Rectangle here, otherwise it's free to drag anywhere.
    * @param ***REMOVED***Phaser.Sprite***REMOVED*** [boundsSprite=null] - If you want to restrict the drag of this sprite to within the bounding box of another sprite, pass it here.
    */
    enableDrag: function (lockCenter, bringToTop, pixelPerfect, alphaThreshold, boundsRect, boundsSprite) ***REMOVED***

        if (lockCenter === undefined) ***REMOVED*** lockCenter = false; ***REMOVED***
        if (bringToTop === undefined) ***REMOVED*** bringToTop = false; ***REMOVED***
        if (pixelPerfect === undefined) ***REMOVED*** pixelPerfect = false; ***REMOVED***
        if (alphaThreshold === undefined) ***REMOVED*** alphaThreshold = 255; ***REMOVED***
        if (boundsRect === undefined) ***REMOVED*** boundsRect = null; ***REMOVED***
        if (boundsSprite === undefined) ***REMOVED*** boundsSprite = null; ***REMOVED***

        this._dragPoint = new Phaser.Point();
        this.draggable = true;
        this.bringToTop = bringToTop;
        this.dragOffset = new Phaser.Point();
        this.dragFromCenter = lockCenter;

        this.pixelPerfectClick = pixelPerfect;
        this.pixelPerfectAlpha = alphaThreshold;

        if (boundsRect)
        ***REMOVED***
            this.boundsRect = boundsRect;
        ***REMOVED***

        if (boundsSprite)
        ***REMOVED***
            this.boundsSprite = boundsSprite;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Stops this sprite from being able to be dragged.
    * If it is currently the target of an active drag it will be stopped immediately; also disables any set callbacks.
    *
    * @method Phaser.InputHandler#disableDrag
    */
    disableDrag: function () ***REMOVED***

        if (this._pointerData)
        ***REMOVED***
            for (var i = 0; i < 10; i++)
            ***REMOVED***
                this._pointerData[i].isDragged = false;
            ***REMOVED***
        ***REMOVED***

        this.draggable = false;
        this.isDragged = false;
        this._draggedPointerID = -1;
        this._pendingDrag = false;

    ***REMOVED***,

    /**
    * Called by Pointer when drag starts on this Sprite. Should not usually be called directly.
    *
    * @method Phaser.InputHandler#startDrag
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer
    */
    startDrag: function (pointer) ***REMOVED***

        var x = this.sprite.x;
        var y = this.sprite.y;

        this.isDragged = true;
        this._draggedPointerID = pointer.id;

        this._pointerData[pointer.id].camX = this.game.camera.x;
        this._pointerData[pointer.id].camY = this.game.camera.y;

        this._pointerData[pointer.id].isDragged = true;

        if (this.sprite.fixedToCamera)
        ***REMOVED***
            if (this.dragFromCenter)
            ***REMOVED***
                var bounds = this.sprite.getBounds();

                this.sprite.cameraOffset.x = this.globalToLocalX(pointer.x) + (this.sprite.cameraOffset.x - bounds.centerX);
                this.sprite.cameraOffset.y = this.globalToLocalY(pointer.y) + (this.sprite.cameraOffset.y - bounds.centerY);
            ***REMOVED***

            this._dragPoint.setTo(this.sprite.cameraOffset.x - pointer.x, this.sprite.cameraOffset.y - pointer.y);
        ***REMOVED***
        else
        ***REMOVED***
            if (this.dragFromCenter)
            ***REMOVED***
                var bounds = this.sprite.getBounds();

                this.sprite.x = this.globalToLocalX(pointer.x) + (this.sprite.x - bounds.centerX);
                this.sprite.y = this.globalToLocalY(pointer.y) + (this.sprite.y - bounds.centerY);
            ***REMOVED***

            this._dragPoint.setTo(this.sprite.x - this.globalToLocalX(pointer.x), this.sprite.y - this.globalToLocalY(pointer.y));
        ***REMOVED***

        this.updateDrag(pointer, true);

        if (this.bringToTop)
        ***REMOVED***
            this._dragPhase = true;
            this.sprite.bringToTop();
        ***REMOVED***

        this.dragStartPoint.set(x, y);

        this.sprite.events.onDragStart$dispatch(this.sprite, pointer, x, y);

        this._pendingDrag = false;

    ***REMOVED***,

    /**
    * Warning: EXPERIMENTAL
    *
    * @method Phaser.InputHandler#globalToLocalX
    * @param ***REMOVED***number***REMOVED*** x
    */
    globalToLocalX: function (x) ***REMOVED***

        if (this.scaleLayer)
        ***REMOVED***
            x -= this.game.scale.grid.boundsFluid.x;
            x *= this.game.scale.grid.scaleFluidInversed.x;
        ***REMOVED***

        return x;

    ***REMOVED***,

    /**
    * Warning: EXPERIMENTAL
    *
    * @method Phaser.InputHandler#globalToLocalY
    * @param ***REMOVED***number***REMOVED*** y
    */
    globalToLocalY: function (y) ***REMOVED***

        if (this.scaleLayer)
        ***REMOVED***
            y -= this.game.scale.grid.boundsFluid.y;
            y *= this.game.scale.grid.scaleFluidInversed.y;
        ***REMOVED***

        return y;

    ***REMOVED***,

    /**
    * Called by Pointer when drag is stopped on this Sprite. Should not usually be called directly.
    *
    * @method Phaser.InputHandler#stopDrag
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer
    */
    stopDrag: function (pointer) ***REMOVED***

        this.isDragged = false;
        this._draggedPointerID = -1;
        this._pointerData[pointer.id].isDragged = false;
        this._dragPhase = false;
        this._pendingDrag = false;

        if (this.snapOnRelease)
        ***REMOVED***
            if (this.sprite.fixedToCamera)
            ***REMOVED***
                this.sprite.cameraOffset.x = Math.round((this.sprite.cameraOffset.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX + (this.snapOffsetX % this.snapX);
                this.sprite.cameraOffset.y = Math.round((this.sprite.cameraOffset.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY + (this.snapOffsetY % this.snapY);
            ***REMOVED***
            else
            ***REMOVED***
                this.sprite.x = Math.round((this.sprite.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX + (this.snapOffsetX % this.snapX);
                this.sprite.y = Math.round((this.sprite.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY + (this.snapOffsetY % this.snapY);
            ***REMOVED***
        ***REMOVED***

        this.sprite.events.onDragStop$dispatch(this.sprite, pointer);

        if (this.checkPointerOver(pointer) === false)
        ***REMOVED***
            this._pointerOutHandler(pointer);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Restricts this sprite to drag movement only on the given axis. Note: If both are set to false the sprite will never move!
    *
    * @method Phaser.InputHandler#setDragLock
    * @param ***REMOVED***boolean***REMOVED*** [allowHorizontal=true] - To enable the sprite to be dragged horizontally set to true, otherwise false.
    * @param ***REMOVED***boolean***REMOVED*** [allowVertical=true] - To enable the sprite to be dragged vertically set to true, otherwise false.
    */
    setDragLock: function (allowHorizontal, allowVertical) ***REMOVED***

        if (allowHorizontal === undefined) ***REMOVED*** allowHorizontal = true; ***REMOVED***
        if (allowVertical === undefined) ***REMOVED*** allowVertical = true; ***REMOVED***

        this.allowHorizontalDrag = allowHorizontal;
        this.allowVerticalDrag = allowVertical;

    ***REMOVED***,

    /**
    * Make this Sprite snap to the given grid either during drag or when it's released.
    * For example 16x16 as the snapX and snapY would make the sprite snap to every 16 pixels.
    *
    * @method Phaser.InputHandler#enableSnap
    * @param ***REMOVED***number***REMOVED*** snapX - The width of the grid cell to snap to.
    * @param ***REMOVED***number***REMOVED*** snapY - The height of the grid cell to snap to.
    * @param ***REMOVED***boolean***REMOVED*** [onDrag=true] - If true the sprite will snap to the grid while being dragged.
    * @param ***REMOVED***boolean***REMOVED*** [onRelease=false] - If true the sprite will snap to the grid when released.
    * @param ***REMOVED***number***REMOVED*** [snapOffsetX=0] - Used to offset the top-left starting point of the snap grid.
    * @param ***REMOVED***number***REMOVED*** [snapOffsetY=0] - Used to offset the top-left starting point of the snap grid.
    */
    enableSnap: function (snapX, snapY, onDrag, onRelease, snapOffsetX, snapOffsetY) ***REMOVED***

        if (onDrag === undefined) ***REMOVED*** onDrag = true; ***REMOVED***
        if (onRelease === undefined) ***REMOVED*** onRelease = false; ***REMOVED***
        if (snapOffsetX === undefined) ***REMOVED*** snapOffsetX = 0; ***REMOVED***
        if (snapOffsetY === undefined) ***REMOVED*** snapOffsetY = 0; ***REMOVED***

        this.snapX = snapX;
        this.snapY = snapY;
        this.snapOffsetX = snapOffsetX;
        this.snapOffsetY = snapOffsetY;
        this.snapOnDrag = onDrag;
        this.snapOnRelease = onRelease;

    ***REMOVED***,

    /**
    * Stops the sprite from snapping to a grid during drag or release.
    *
    * @method Phaser.InputHandler#disableSnap
    */
    disableSnap: function () ***REMOVED***

        this.snapOnDrag = false;
        this.snapOnRelease = false;

    ***REMOVED***,

    /**
    * Bounds Rect check for the sprite drag
    *
    * @method Phaser.InputHandler#checkBoundsRect
    */
    checkBoundsRect: function () ***REMOVED***

        if (this.sprite.fixedToCamera)
        ***REMOVED***
            if (this.sprite.cameraOffset.x < this.boundsRect.left)
            ***REMOVED***
                this.sprite.cameraOffset.x = this.boundsRect.left;
            ***REMOVED***
            else if ((this.sprite.cameraOffset.x + this.sprite.width) > this.boundsRect.right)
            ***REMOVED***
                this.sprite.cameraOffset.x = this.boundsRect.right - this.sprite.width;
            ***REMOVED***

            if (this.sprite.cameraOffset.y < this.boundsRect.top)
            ***REMOVED***
                this.sprite.cameraOffset.y = this.boundsRect.top;
            ***REMOVED***
            else if ((this.sprite.cameraOffset.y + this.sprite.height) > this.boundsRect.bottom)
            ***REMOVED***
                this.sprite.cameraOffset.y = this.boundsRect.bottom - this.sprite.height;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (this.sprite.left < this.boundsRect.left)
            ***REMOVED***
                this.sprite.x = this.boundsRect.x + this.sprite.offsetX;
            ***REMOVED***
            else if (this.sprite.right > this.boundsRect.right)
            ***REMOVED***
                this.sprite.x = this.boundsRect.right - (this.sprite.width - this.sprite.offsetX);
            ***REMOVED***

            if (this.sprite.top < this.boundsRect.top)
            ***REMOVED***
                this.sprite.y = this.boundsRect.top + this.sprite.offsetY;
            ***REMOVED***
            else if (this.sprite.bottom > this.boundsRect.bottom)
            ***REMOVED***
                this.sprite.y = this.boundsRect.bottom - (this.sprite.height - this.sprite.offsetY);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Parent Sprite Bounds check for the sprite drag.
    *
    * @method Phaser.InputHandler#checkBoundsSprite
    */
    checkBoundsSprite: function () ***REMOVED***

        if (this.sprite.fixedToCamera && this.boundsSprite.fixedToCamera)
        ***REMOVED***
            if (this.sprite.cameraOffset.x < this.boundsSprite.cameraOffset.x)
            ***REMOVED***
                this.sprite.cameraOffset.x = this.boundsSprite.cameraOffset.x;
            ***REMOVED***
            else if ((this.sprite.cameraOffset.x + this.sprite.width) > (this.boundsSprite.cameraOffset.x + this.boundsSprite.width))
            ***REMOVED***
                this.sprite.cameraOffset.x = (this.boundsSprite.cameraOffset.x + this.boundsSprite.width) - this.sprite.width;
            ***REMOVED***

            if (this.sprite.cameraOffset.y < this.boundsSprite.cameraOffset.y)
            ***REMOVED***
                this.sprite.cameraOffset.y = this.boundsSprite.cameraOffset.y;
            ***REMOVED***
            else if ((this.sprite.cameraOffset.y + this.sprite.height) > (this.boundsSprite.cameraOffset.y + this.boundsSprite.height))
            ***REMOVED***
                this.sprite.cameraOffset.y = (this.boundsSprite.cameraOffset.y + this.boundsSprite.height) - this.sprite.height;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (this.sprite.left < this.boundsSprite.left)
            ***REMOVED***
                this.sprite.x = this.boundsSprite.left + this.sprite.offsetX;
            ***REMOVED***
            else if (this.sprite.right > this.boundsSprite.right)
            ***REMOVED***
                this.sprite.x = this.boundsSprite.right - (this.sprite.width - this.sprite.offsetX);
            ***REMOVED***

            if (this.sprite.top < this.boundsSprite.top)
            ***REMOVED***
                this.sprite.y = this.boundsSprite.top + this.sprite.offsetY;
            ***REMOVED***
            else if (this.sprite.bottom > this.boundsSprite.bottom)
            ***REMOVED***
                this.sprite.y = this.boundsSprite.bottom - (this.sprite.height - this.sprite.offsetY);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.InputHandler.prototype.constructor = Phaser.InputHandler;
