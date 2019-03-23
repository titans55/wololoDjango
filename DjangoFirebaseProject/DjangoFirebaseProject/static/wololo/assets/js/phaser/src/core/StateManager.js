/* jshint newcap: false */

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The State Manager is responsible for loading, setting up and switching game states.
*
* @class Phaser.StateManager
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***Phaser.State|Object***REMOVED*** [pendingState=null] - A State object to seed the manager with.
*/
Phaser.StateManager = function (game, pendingState) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***object***REMOVED*** states - The object containing Phaser.States.
    */
    this.states = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***Phaser.State***REMOVED*** _pendingState - The state to be switched to in the next frame.
    * @private
    */
    this._pendingState = null;

    if (typeof pendingState !== 'undefined' && pendingState !== null)
    ***REMOVED***
        this._pendingState = pendingState;
    ***REMOVED***

    /**
    * @property ***REMOVED***boolean***REMOVED*** _clearWorld - Clear the world when we switch state?
    * @private
    */
    this._clearWorld = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _clearCache - Clear the cache when we switch state?
    * @private
    */
    this._clearCache = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _created - Flag that sets if the State has been created or not.
    * @private
    */
    this._created = false;

    /**
    * @property ***REMOVED***any[]***REMOVED*** _args - Temporary container when you pass vars from one State to another.
    * @private
    */
    this._args = [];

    /**
    * @property ***REMOVED***string***REMOVED*** current - The current active State object.
    * @default
    */
    this.current = '';

    /**
    * onStateChange is a Phaser.Signal that is dispatched whenever the game changes state.
    * 
    * It is dispatched only when the new state is started, which isn't usually at the same time as StateManager.start
    * is called because state swapping is done in sync with the game loop. It is dispatched *before* any of the new states
    * methods (such as preload and create) are called, and *after* the previous states shutdown method has been run.
    *
    * The callback you specify is sent two parameters: the string based key of the new state, 
    * and the second parameter is the string based key of the old / previous state.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onStateChange
    */
    this.onStateChange = new Phaser.Signal();

    /**
    * @property ***REMOVED***function***REMOVED*** onInitCallback - This is called when the state is set as the active state.
    * @default
    */
    this.onInitCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onPreloadCallback - This is called when the state starts to load assets.
    * @default
    */
    this.onPreloadCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onCreateCallback - This is called when the state preload has finished and creation begins.
    * @default
    */
    this.onCreateCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onUpdateCallback - This is called when the state is updated, every game loop. It doesn't happen during preload (@see onLoadUpdateCallback).
    * @default
    */
    this.onUpdateCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onRenderCallback - This is called post-render. It doesn't happen during preload (see onLoadRenderCallback).
    * @default
    */
    this.onRenderCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onResizeCallback - This is called if ScaleManager.scalemode is RESIZE and a resize event occurs. It's passed the new width and height.
    * @default
    */
    this.onResizeCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onPreRenderCallback - This is called before the state is rendered and before the stage is cleared but after all game objects have had their final properties adjusted.
    * @default
    */
    this.onPreRenderCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onLoadUpdateCallback - This is called when the State is updated during the preload phase.
    * @default
    */
    this.onLoadUpdateCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onLoadRenderCallback - This is called when the State is rendered during the preload phase.
    * @default
    */
    this.onLoadRenderCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onPausedCallback - This is called when the game is paused.
    * @default
    */
    this.onPausedCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onResumedCallback - This is called when the game is resumed from a paused state.
    * @default
    */
    this.onResumedCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onPauseUpdateCallback - This is called every frame while the game is paused.
    * @default
    */
    this.onPauseUpdateCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onShutDownCallback - This is called when the state is shut down (i.e. swapped to another state).
    * @default
    */
    this.onShutDownCallback = null;

***REMOVED***;

Phaser.StateManager.prototype = ***REMOVED***

    /**
    * The Boot handler is called by Phaser.Game when it first starts up.
    * @method Phaser.StateManager#boot
    * @private
    */
    boot: function () ***REMOVED***

        this.game.onPause.add(this.pause, this);
        this.game.onResume.add(this.resume, this);

        if (this._pendingState !== null && typeof this._pendingState !== 'string')
        ***REMOVED***
            this.add('default', this._pendingState, true);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Adds a new State into the StateManager. You must give each State a unique key by which you'll identify it.
    * The State can be either a Phaser.State object (or an object that extends it), a plain JavaScript object or a function.
    * If a function is given a new state object will be created by calling it.
    *
    * @method Phaser.StateManager#add
    * @param ***REMOVED***string***REMOVED*** key - A unique key you use to reference this state, i.e. "MainMenu", "Level1".
    * @param ***REMOVED***Phaser.State|object|function***REMOVED*** state  - The state you want to switch to.
    * @param ***REMOVED***boolean***REMOVED*** [autoStart=false]  - If true the State will be started immediately after adding it.
    */
    add: function (key, state, autoStart) ***REMOVED***

        if (autoStart === undefined) ***REMOVED*** autoStart = false; ***REMOVED***

        var newState;

        if (state instanceof Phaser.State)
        ***REMOVED***
            newState = state;
        ***REMOVED***
        else if (typeof state === 'object')
        ***REMOVED***
            newState = state;
            newState.game = this.game;
        ***REMOVED***
        else if (typeof state === 'function')
        ***REMOVED***
            newState = new state(this.game);
        ***REMOVED***

        this.states[key] = newState;

        if (autoStart)
        ***REMOVED***
            if (this.game.isBooted)
            ***REMOVED***
                this.start(key);
            ***REMOVED***
            else
            ***REMOVED***
                this._pendingState = key;
            ***REMOVED***
        ***REMOVED***

        return newState;

    ***REMOVED***,

    /**
    * Delete the given state.
    * @method Phaser.StateManager#remove
    * @param ***REMOVED***string***REMOVED*** key - A unique key you use to reference this state, i.e. "MainMenu", "Level1".
    */
    remove: function (key) ***REMOVED***

        if (this.current === key)
        ***REMOVED***
            this.callbackContext = null;

            this.onInitCallback = null;
            this.onShutDownCallback = null;

            this.onPreloadCallback = null;
            this.onLoadRenderCallback = null;
            this.onLoadUpdateCallback = null;
            this.onCreateCallback = null;
            this.onUpdateCallback = null;
            this.onPreRenderCallback = null;
            this.onRenderCallback = null;
            this.onResizeCallback = null;
            this.onPausedCallback = null;
            this.onResumedCallback = null;
            this.onPauseUpdateCallback = null;
        ***REMOVED***

        delete this.states[key];

    ***REMOVED***,

    /**
    * Start the given State. If a State is already running then State.shutDown will be called (if it exists) before switching to the new State.
    *
    * @method Phaser.StateManager#start
    * @param ***REMOVED***string***REMOVED*** key - The key of the state you want to start.
    * @param ***REMOVED***boolean***REMOVED*** [clearWorld=true] - Clear everything in the world? This clears the World display list fully (but not the Stage, so if you've added your own objects to the Stage they will need managing directly)
    * @param ***REMOVED***boolean***REMOVED*** [clearCache=false] - Clear the Game.Cache? This purges out all loaded assets. The default is false and you must have clearWorld=true if you want to clearCache as well.
    * @param ***REMOVED***...****REMOVED*** parameter - Additional parameters that will be passed to the State.init function (if it has one).
    */
    start: function (key, clearWorld, clearCache) ***REMOVED***

        if (clearWorld === undefined) ***REMOVED*** clearWorld = true; ***REMOVED***
        if (clearCache === undefined) ***REMOVED*** clearCache = false; ***REMOVED***

        if (this.checkState(key))
        ***REMOVED***
            //  Place the state in the queue. It will be started the next time the game loop begins.
            this._pendingState = key;
            this._clearWorld = clearWorld;
            this._clearCache = clearCache;

            if (arguments.length > 3)
            ***REMOVED***
                this._args = Array.prototype.splice.call(arguments, 3);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Restarts the current State. State.shutDown will be called (if it exists) before the State is restarted.
    *
    * @method Phaser.StateManager#restart
    * @param ***REMOVED***boolean***REMOVED*** [clearWorld=true] - Clear everything in the world? This clears the World display list fully (but not the Stage, so if you've added your own objects to the Stage they will need managing directly)
    * @param ***REMOVED***boolean***REMOVED*** [clearCache=false] - Clear the Game.Cache? This purges out all loaded assets. The default is false and you must have clearWorld=true if you want to clearCache as well.
    * @param ***REMOVED***...****REMOVED*** parameter - Additional parameters that will be passed to the State.init function if it has one.
    */
    restart: function (clearWorld, clearCache) ***REMOVED***

        if (clearWorld === undefined) ***REMOVED*** clearWorld = true; ***REMOVED***
        if (clearCache === undefined) ***REMOVED*** clearCache = false; ***REMOVED***

        //  Place the state in the queue. It will be started the next time the game loop starts.
        this._pendingState = this.current;
        this._clearWorld = clearWorld;
        this._clearCache = clearCache;

        if (arguments.length > 2)
        ***REMOVED***
            this._args = Array.prototype.slice.call(arguments, 2);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Used by onInit and onShutdown when those functions don't exist on the state
    * @method Phaser.StateManager#dummy
    * @private
    */
    dummy: function () ***REMOVED***
    ***REMOVED***,

    /**
    * preUpdate is called right at the start of the game loop. It is responsible for changing to a new state that was requested previously.
    *
    * @method Phaser.StateManager#preUpdate
    */
    preUpdate: function () ***REMOVED***

        if (this._pendingState && this.game.isBooted)
        ***REMOVED***
            var previousStateKey = this.current;

            //  Already got a state running?
            this.clearCurrentState();

            this.setCurrentState(this._pendingState);

            this.onStateChange.dispatch(this.current, previousStateKey);

            if (this.current !== this._pendingState)
            ***REMOVED***
                return;
            ***REMOVED***
            else
            ***REMOVED***
                this._pendingState = null;
            ***REMOVED***

            //  If StateManager.start has been called from the init of a State that ALSO has a preload, then
            //  onPreloadCallback will be set, but must be ignored
            if (this.onPreloadCallback)
            ***REMOVED***
                this.game.load.reset(true);
                this.onPreloadCallback.call(this.callbackContext, this.game);

                //  Is the loader empty?
                if (this.game.load.totalQueuedFiles() === 0 && this.game.load.totalQueuedPacks() === 0)
                ***REMOVED***
                    this.loadComplete();
                ***REMOVED***
                else
                ***REMOVED***
                    //  Start the loader going as we have something in the queue
                    this.game.load.start();
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                //  No init? Then there was nothing to load either
                this.loadComplete();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * This method clears the current State, calling its shutdown callback. The process also removes any active tweens,
    * resets the camera, resets input, clears physics, removes timers and if set clears the world and cache too.
    *
    * @method Phaser.StateManager#clearCurrentState
    */
    clearCurrentState: function () ***REMOVED***

        if (this.current)
        ***REMOVED***
            if (this.onShutDownCallback)
            ***REMOVED***
                this.onShutDownCallback.call(this.callbackContext, this.game);
            ***REMOVED***

            this.game.tweens.removeAll();

            this.game.camera.reset();

            this.game.input.reset(true);

            this.game.physics.clear();

            this.game.time.removeAll();

            this.game.scale.reset(this._clearWorld);

            if (this.game.debug)
            ***REMOVED***
                this.game.debug.reset();
            ***REMOVED***

            if (this._clearWorld)
            ***REMOVED***
                this.game.world.shutdown();

                if (this._clearCache)
                ***REMOVED***
                    this.game.cache.destroy();
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Checks if a given phaser state is valid. A State is considered valid if it has at least one of the core functions: preload, create, update or render.
    *
    * @method Phaser.StateManager#checkState
    * @param ***REMOVED***string***REMOVED*** key - The key of the state you want to check.
    * @return ***REMOVED***boolean***REMOVED*** true if the State has the required functions, otherwise false.
    */
    checkState: function (key) ***REMOVED***

        if (this.states[key])
        ***REMOVED***
            if (this.states[key]['preload'] || this.states[key]['create'] || this.states[key]['update'] || this.states[key]['render'])
            ***REMOVED***
                return true;
            ***REMOVED***
            else
            ***REMOVED***
                console.warn("Invalid Phaser State object given. Must contain at least a one of the required functions: preload, create, update or render");
                return false;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            console.warn("Phaser.StateManager - No state found with the key: " + key);
            return false;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Links game properties to the State given by the key.
    *
    * @method Phaser.StateManager#link
    * @param ***REMOVED***string***REMOVED*** key - State key.
    * @protected
    */
    link: function (key) ***REMOVED***

        this.states[key].game = this.game;
        this.states[key].add = this.game.add;
        this.states[key].make = this.game.make;
        this.states[key].camera = this.game.camera;
        this.states[key].cache = this.game.cache;
        this.states[key].input = this.game.input;
        this.states[key].load = this.game.load;
        this.states[key].math = this.game.math;
        this.states[key].sound = this.game.sound;
        this.states[key].scale = this.game.scale;
        this.states[key].state = this;
        this.states[key].stage = this.game.stage;
        this.states[key].time = this.game.time;
        this.states[key].tweens = this.game.tweens;
        this.states[key].world = this.game.world;
        this.states[key].particles = this.game.particles;
        this.states[key].rnd = this.game.rnd;
        this.states[key].physics = this.game.physics;
        this.states[key].key = key;

    ***REMOVED***,

    /**
    * Nulls all State level Phaser properties, including a reference to Game.
    *
    * @method Phaser.StateManager#unlink
    * @param ***REMOVED***string***REMOVED*** key - State key.
    * @protected
    */
    unlink: function (key) ***REMOVED***

        if (this.states[key])
        ***REMOVED***
            this.states[key].game = null;
            this.states[key].add = null;
            this.states[key].make = null;
            this.states[key].camera = null;
            this.states[key].cache = null;
            this.states[key].input = null;
            this.states[key].load = null;
            this.states[key].math = null;
            this.states[key].sound = null;
            this.states[key].scale = null;
            this.states[key].state = null;
            this.states[key].stage = null;
            this.states[key].time = null;
            this.states[key].tweens = null;
            this.states[key].world = null;
            this.states[key].particles = null;
            this.states[key].rnd = null;
            this.states[key].physics = null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets the current State. Should not be called directly (use StateManager.start)
    *
    * @method Phaser.StateManager#setCurrentState
    * @param ***REMOVED***string***REMOVED*** key - State key.
    * @private
    */
    setCurrentState: function (key) ***REMOVED***

        this.callbackContext = this.states[key];

        this.link(key);

        //  Used when the state is set as being the current active state
        this.onInitCallback = this.states[key]['init'] || this.dummy;

        this.onPreloadCallback = this.states[key]['preload'] || null;
        this.onLoadRenderCallback = this.states[key]['loadRender'] || null;
        this.onLoadUpdateCallback = this.states[key]['loadUpdate'] || null;
        this.onCreateCallback = this.states[key]['create'] || null;
        this.onUpdateCallback = this.states[key]['update'] || null;
        this.onPreRenderCallback = this.states[key]['preRender'] || null;
        this.onRenderCallback = this.states[key]['render'] || null;
        this.onResizeCallback = this.states[key]['resize'] || null;
        this.onPausedCallback = this.states[key]['paused'] || null;
        this.onResumedCallback = this.states[key]['resumed'] || null;
        this.onPauseUpdateCallback = this.states[key]['pauseUpdate'] || null;

        //  Used when the state is no longer the current active state
        this.onShutDownCallback = this.states[key]['shutdown'] || this.dummy;

        //  Reset the physics system, but not on the first state start
        if (this.current !== '')
        ***REMOVED***
            this.game.physics.reset();
        ***REMOVED***

        this.current = key;
        this._created = false;

        //  At this point key and pendingState should equal each other
        this.onInitCallback.apply(this.callbackContext, this._args);

        //  If they no longer do then the init callback hit StateManager.start
        if (key === this._pendingState)
        ***REMOVED***
            this._args = [];
        ***REMOVED***

        this.game._kickstart = true;

    ***REMOVED***,

    /**
     * Gets the current State.
     *
     * @method Phaser.StateManager#getCurrentState
     * @return ***REMOVED***Phaser.State***REMOVED***
     * @public
     */
    getCurrentState: function() ***REMOVED***
        return this.states[this.current];
    ***REMOVED***,

    /**
    * @method Phaser.StateManager#loadComplete
    * @protected
    */
    loadComplete: function () ***REMOVED***

        //  Make sure to do load-update one last time before state is set to _created
        if (this._created === false && this.onLoadUpdateCallback)
        ***REMOVED***
            this.onLoadUpdateCallback.call(this.callbackContext, this.game);
        ***REMOVED***

        if (this._created === false && this.onCreateCallback)
        ***REMOVED***
            this._created = true;
            this.onCreateCallback.call(this.callbackContext, this.game);
        ***REMOVED***
        else
        ***REMOVED***
            this._created = true;
        ***REMOVED***

    ***REMOVED***,

    /**
    * @method Phaser.StateManager#pause
    * @protected
    */
    pause: function () ***REMOVED***

        if (this._created && this.onPausedCallback)
        ***REMOVED***
            this.onPausedCallback.call(this.callbackContext, this.game);
        ***REMOVED***

    ***REMOVED***,

    /**
    * @method Phaser.StateManager#resume
    * @protected
    */
    resume: function () ***REMOVED***

        if (this._created && this.onResumedCallback)
        ***REMOVED***
            this.onResumedCallback.call(this.callbackContext, this.game);
        ***REMOVED***

    ***REMOVED***,

    /**
    * @method Phaser.StateManager#update
    * @protected
    */
    update: function () ***REMOVED***

        if (this._created)
        ***REMOVED***
            if (this.onUpdateCallback)
            ***REMOVED***
                this.onUpdateCallback.call(this.callbackContext, this.game);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (this.onLoadUpdateCallback)
            ***REMOVED***
                this.onLoadUpdateCallback.call(this.callbackContext, this.game);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * @method Phaser.StateManager#pauseUpdate
    * @protected
    */
    pauseUpdate: function () ***REMOVED***

        if (this._created)
        ***REMOVED***
            if (this.onPauseUpdateCallback)
            ***REMOVED***
                this.onPauseUpdateCallback.call(this.callbackContext, this.game);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (this.onLoadUpdateCallback)
            ***REMOVED***
                this.onLoadUpdateCallback.call(this.callbackContext, this.game);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * @method Phaser.StateManager#preRender
    * @protected
    * @param ***REMOVED***number***REMOVED*** elapsedTime - The time elapsed since the last update.
    */
    preRender: function (elapsedTime) ***REMOVED***

        if (this._created && this.onPreRenderCallback)
        ***REMOVED***
            this.onPreRenderCallback.call(this.callbackContext, this.game, elapsedTime);
        ***REMOVED***

    ***REMOVED***,

    /**
    * @method Phaser.StateManager#resize
    * @protected
    */
    resize: function (width, height) ***REMOVED***

        if (this.onResizeCallback)
        ***REMOVED***
            this.onResizeCallback.call(this.callbackContext, width, height);
        ***REMOVED***

    ***REMOVED***,

    /**
    * @method Phaser.StateManager#render
    * @protected
    */
    render: function () ***REMOVED***

        if (this._created)
        ***REMOVED***
            if (this.onRenderCallback)
            ***REMOVED***
                if (this.game.renderType === Phaser.CANVAS)
                ***REMOVED***
                    this.game.context.save();
                    this.game.context.setTransform(1, 0, 0, 1, 0, 0);
                    this.onRenderCallback.call(this.callbackContext, this.game);
                    this.game.context.restore();
                ***REMOVED***
                else
                ***REMOVED***
                    this.onRenderCallback.call(this.callbackContext, this.game);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (this.onLoadRenderCallback)
            ***REMOVED***
                this.onLoadRenderCallback.call(this.callbackContext, this.game);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Removes all StateManager callback references to the State object, nulls the game reference and clears the States object.
    * You don't recover from this without rebuilding the Phaser instance again.
    * @method Phaser.StateManager#destroy
    */
    destroy: function () ***REMOVED***

        this._clearWorld = true;
        this._clearCache = true;

        this.clearCurrentState();

        this.callbackContext = null;

        this.onInitCallback = null;
        this.onShutDownCallback = null;

        this.onPreloadCallback = null;
        this.onLoadRenderCallback = null;
        this.onLoadUpdateCallback = null;
        this.onCreateCallback = null;
        this.onUpdateCallback = null;
        this.onRenderCallback = null;
        this.onPausedCallback = null;
        this.onResumedCallback = null;
        this.onPauseUpdateCallback = null;

        this.game = null;
        this.states = ***REMOVED******REMOVED***;
        this._pendingState = null;
        this.current = '';

    ***REMOVED***

***REMOVED***;

Phaser.StateManager.prototype.constructor = Phaser.StateManager;

/**
* @name Phaser.StateManager#created
* @property ***REMOVED***boolean***REMOVED*** created - True if the current state has had its `create` method run (if it has one, if not this is true by default).
* @readOnly
*/
Object.defineProperty(Phaser.StateManager.prototype, "created", ***REMOVED***

    get: function () ***REMOVED***

        return this._created;

    ***REMOVED***

***REMOVED***);

/**
* "It's like nailing jelly to a kitten" - Gary Penn
*/
