/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* This is where the magic happens. The Game object is the heart of your game,
* providing quick access to common functions and handling the boot process.
* 
* "Hell, there are no rules here - we're trying to accomplish something."
*                                                       Thomas A. Edison
*
* @class Phaser.Game
* @constructor
* @param ***REMOVED***number|string***REMOVED*** [width=800] - The width of your game in game pixels. If given as a string the value must be between 0 and 100 and will be used as the percentage width of the parent container, or the browser window if no parent is given.
* @param ***REMOVED***number|string***REMOVED*** [height=600] - The height of your game in game pixels. If given as a string the value must be between 0 and 100 and will be used as the percentage height of the parent container, or the browser window if no parent is given.
* @param ***REMOVED***number***REMOVED*** [renderer=Phaser.AUTO] - Which renderer to use: Phaser.AUTO will auto-detect, Phaser.WEBGL, Phaser.CANVAS or Phaser.HEADLESS (no rendering at all).
* @param ***REMOVED***string|HTMLElement***REMOVED*** [parent=''] - The DOM element into which this games canvas will be injected. Either a DOM ID (string) or the element itself.
* @param ***REMOVED***object***REMOVED*** [state=null] - The default state object. A object consisting of Phaser.State functions (preload, create, update, render) or null.
* @param ***REMOVED***boolean***REMOVED*** [transparent=false] - Use a transparent canvas background or not.
* @param ***REMOVED***boolean***REMOVED*** [antialias=true] - Draw all image textures anti-aliased or not. The default is for smooth textures, but disable if your game features pixel art.
* @param ***REMOVED***object***REMOVED*** [physicsConfig=null] - A physics configuration object to pass to the Physics world on creation.
*/
Phaser.Game = function (width, height, renderer, parent, state, transparent, antialias, physicsConfig) ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** id - Phaser Game ID (for when Pixi supports multiple instances).
    * @readonly
    */
    this.id = Phaser.GAMES.push(this) - 1;

    /**
    * @property ***REMOVED***object***REMOVED*** config - The Phaser.Game configuration object.
    */
    this.config = null;

    /**
    * @property ***REMOVED***object***REMOVED*** physicsConfig - The Phaser.Physics.World configuration object.
    */
    this.physicsConfig = physicsConfig;

    /**
    * @property ***REMOVED***string|HTMLElement***REMOVED*** parent - The Games DOM parent.
    * @default
    */
    this.parent = '';

    /**
    * The current Game Width in pixels.
    *
    * _Do not modify this property directly:_ use ***REMOVED***@link Phaser.ScaleManager#setGameSize***REMOVED*** - eg. `game.scale.setGameSize(width, height)` - instead.
    *
    * @property ***REMOVED***integer***REMOVED*** width
    * @readonly
    * @default
    */
    this.width = 800;

    /**
    * The current Game Height in pixels.
    *
    * _Do not modify this property directly:_ use ***REMOVED***@link Phaser.ScaleManager#setGameSize***REMOVED*** - eg. `game.scale.setGameSize(width, height)` - instead.
    *
    * @property ***REMOVED***integer***REMOVED*** height
    * @readonly
    * @default
    */
    this.height = 600;

    /**
    * The resolution of your game. This value is read only, but can be changed at start time it via a game configuration object.
    *
    * @property ***REMOVED***integer***REMOVED*** resolution
    * @readonly
    * @default
    */
    this.resolution = 1;

    /**
    * @property ***REMOVED***integer***REMOVED*** _width - Private internal var.
    * @private
    */
    this._width = 800;

    /**
    * @property ***REMOVED***integer***REMOVED*** _height - Private internal var.
    * @private
    */
    this._height = 600;

    /**
    * @property ***REMOVED***boolean***REMOVED*** transparent - Use a transparent canvas background or not.
    * @default
    */
    this.transparent = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** antialias - Anti-alias graphics. By default scaled images are smoothed in Canvas and WebGL, set anti-alias to false to disable this globally.
    * @default
    */
    this.antialias = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** preserveDrawingBuffer - The value of the preserveDrawingBuffer flag affects whether or not the contents of the stencil buffer is retained after rendering.
    * @default
    */
    this.preserveDrawingBuffer = false;

    /**
    * Clear the Canvas each frame before rendering the display list.
    * You can set this to `false` to gain some performance if your game always contains a background that completely fills the display.
    * @property ***REMOVED***boolean***REMOVED*** clearBeforeRender
    * @default
    */
    this.clearBeforeRender = true;

    /**
    * @property ***REMOVED***PIXI.CanvasRenderer|PIXI.WebGLRenderer***REMOVED*** renderer - The Pixi Renderer.
    * @protected
    */
    this.renderer = null;

    /**
    * @property ***REMOVED***number***REMOVED*** renderType - The Renderer this game will use. Either Phaser.AUTO, Phaser.CANVAS, Phaser.WEBGL, or Phaser.HEADLESS.
    * @readonly
    */
    this.renderType = Phaser.AUTO;

    /**
    * @property ***REMOVED***Phaser.StateManager***REMOVED*** state - The StateManager.
    */
    this.state = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isBooted - Whether the game engine is booted, aka available.
    * @readonly
    */
    this.isBooted = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isRunning - Is game running or paused?
    * @readonly
    */
    this.isRunning = false;

    /**
    * @property ***REMOVED***Phaser.RequestAnimationFrame***REMOVED*** raf - Automatically handles the core game loop via requestAnimationFrame or setTimeout
    * @protected
    */
    this.raf = null;

    /**
    * @property ***REMOVED***Phaser.GameObjectFactory***REMOVED*** add - Reference to the Phaser.GameObjectFactory.
    */
    this.add = null;

    /**
    * @property ***REMOVED***Phaser.GameObjectCreator***REMOVED*** make - Reference to the GameObject Creator.
    */
    this.make = null;

    /**
    * @property ***REMOVED***Phaser.Cache***REMOVED*** cache - Reference to the assets cache.
    */
    this.cache = null;

    /**
    * @property ***REMOVED***Phaser.Input***REMOVED*** input - Reference to the input manager
    */
    this.input = null;

    /**
    * @property ***REMOVED***Phaser.Loader***REMOVED*** load - Reference to the assets loader.
    */
    this.load = null;

    /**
    * @property ***REMOVED***Phaser.Math***REMOVED*** math - Reference to the math helper.
    */
    this.math = null;

    /**
    * @property ***REMOVED***Phaser.Net***REMOVED*** net - Reference to the network class.
    */
    this.net = null;

    /**
    * @property ***REMOVED***Phaser.ScaleManager***REMOVED*** scale - The game scale manager.
    */
    this.scale = null;

    /**
    * @property ***REMOVED***Phaser.SoundManager***REMOVED*** sound - Reference to the sound manager.
    */
    this.sound = null;

    /**
    * @property ***REMOVED***Phaser.Stage***REMOVED*** stage - Reference to the stage.
    */
    this.stage = null;

    /**
    * @property ***REMOVED***Phaser.Time***REMOVED*** time - Reference to the core game clock.
    */
    this.time = null;

    /**
    * @property ***REMOVED***Phaser.TweenManager***REMOVED*** tweens - Reference to the tween manager.
    */
    this.tweens = null;

    /**
    * @property ***REMOVED***Phaser.World***REMOVED*** world - Reference to the world.
    */
    this.world = null;

    /**
    * @property ***REMOVED***Phaser.Physics***REMOVED*** physics - Reference to the physics manager.
    */
    this.physics = null;
    
    /**
    * @property ***REMOVED***Phaser.PluginManager***REMOVED*** plugins - Reference to the plugin manager.
    */
    this.plugins = null;

    /**
    * @property ***REMOVED***Phaser.RandomDataGenerator***REMOVED*** rnd - Instance of repeatable random data generator helper.
    */
    this.rnd = null;

    /**
    * @property ***REMOVED***Phaser.Device***REMOVED*** device - Contains device information and capabilities.
    */
    this.device = Phaser.Device;

    /**
    * @property ***REMOVED***Phaser.Camera***REMOVED*** camera - A handy reference to world.camera.
    */
    this.camera = null;

    /**
    * @property ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - A handy reference to renderer.view, the canvas that the game is being rendered in to.
    */
    this.canvas = null;

    /**
    * @property ***REMOVED***CanvasRenderingContext2D***REMOVED*** context - A handy reference to renderer.context (only set for CANVAS games, not WebGL)
    */
    this.context = null;

    /**
    * @property ***REMOVED***Phaser.Utils.Debug***REMOVED*** debug - A set of useful debug utilities.
    */
    this.debug = null;

    /**
    * @property ***REMOVED***Phaser.Particles***REMOVED*** particles - The Particle Manager.
    */
    this.particles = null;

    /**
    * @property ***REMOVED***Phaser.Create***REMOVED*** create - The Asset Generator.
    */
    this.create = null;

    /**
    * If `false` Phaser will automatically render the display list every update. If `true` the render loop will be skipped.
    * You can toggle this value at run-time to gain exact control over when Phaser renders. This can be useful in certain types of game or application.
    * Please note that if you don't render the display list then none of the game object transforms will be updated, so use this value carefully.
    * @property ***REMOVED***boolean***REMOVED*** lockRender
    * @default
    */
    this.lockRender = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** stepping - Enable core loop stepping with Game.enableStep().
    * @default
    * @readonly
    */
    this.stepping = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** pendingStep - An internal property used by enableStep, but also useful to query from your own game objects.
    * @default
    * @readonly
    */
    this.pendingStep = false;

    /**
    * @property ***REMOVED***number***REMOVED*** stepCount - When stepping is enabled this contains the current step cycle.
    * @default
    * @readonly
    */
    this.stepCount = 0;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onPause - This event is fired when the game pauses.
    */
    this.onPause = null;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onResume - This event is fired when the game resumes from a paused state.
    */
    this.onResume = null;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onBlur - This event is fired when the game no longer has focus (typically on page hide).
    */
    this.onBlur = null;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onFocus - This event is fired when the game has focus (typically on page show).
    */
    this.onFocus = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _paused - Is game paused?
    * @private
    */
    this._paused = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _codePaused - Was the game paused via code or a visibility change?
    * @private
    */
    this._codePaused = false;

    /**
    * The ID of the current/last logic update applied this render frame, starting from 0.
    * The first update is `currentUpdateID === 0` and the last update is `currentUpdateID === updatesThisFrame.`
    * @property ***REMOVED***integer***REMOVED*** currentUpdateID
    * @protected
    */
    this.currentUpdateID = 0;

    /**
    * Number of logic updates expected to occur this render frame; will be 1 unless there are catch-ups required (and allowed).
    * @property ***REMOVED***integer***REMOVED*** updatesThisFrame
    * @protected
    */
    this.updatesThisFrame = 1;

    /**
    * @property ***REMOVED***number***REMOVED*** _deltaTime - Accumulate elapsed time until a logic update is due.
    * @private
    */
    this._deltaTime = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _lastCount - Remember how many 'catch-up' iterations were used on the logicUpdate last frame.
    * @private
    */
    this._lastCount = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _spiraling - If the 'catch-up' iterations are spiraling out of control, this counter is incremented.
    * @private
    */
    this._spiraling = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _kickstart - Force a logic update + render by default (always set on Boot and State swap)
    * @private
    */
    this._kickstart = true;

    /**
    * If the game is struggling to maintain the desired FPS, this signal will be dispatched.
    * The desired/chosen FPS should probably be closer to the ***REMOVED***@link Phaser.Time#suggestedFps***REMOVED*** value.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** fpsProblemNotifier
    * @public
    */
    this.fpsProblemNotifier = new Phaser.Signal();

    /**
    * @property ***REMOVED***boolean***REMOVED*** forceSingleUpdate - Should the game loop force a logic update, regardless of the delta timer? Set to true if you know you need this. You can toggle it on the fly.
    */
    this.forceSingleUpdate = true;

    /**
    * @property ***REMOVED***number***REMOVED*** _nextNotification - The soonest game.time.time value that the next fpsProblemNotifier can be dispatched.
    * @private
    */
    this._nextFpsNotification = 0;

    //  Parse the configuration object (if any)
    if (arguments.length === 1 && typeof arguments[0] === 'object')
    ***REMOVED***
        this.parseConfig(arguments[0]);
    ***REMOVED***
    else
    ***REMOVED***
        this.config = ***REMOVED*** enableDebug: true ***REMOVED***;

        if (typeof width !== 'undefined')
        ***REMOVED***
            this._width = width;
        ***REMOVED***

        if (typeof height !== 'undefined')
        ***REMOVED***
            this._height = height;
        ***REMOVED***

        if (typeof renderer !== 'undefined')
        ***REMOVED***
            this.renderType = renderer;
        ***REMOVED***

        if (typeof parent !== 'undefined')
        ***REMOVED***
            this.parent = parent;
        ***REMOVED***

        if (typeof transparent !== 'undefined')
        ***REMOVED***
            this.transparent = transparent;
        ***REMOVED***

        if (typeof antialias !== 'undefined')
        ***REMOVED***
            this.antialias = antialias;
        ***REMOVED***

        this.rnd = new Phaser.RandomDataGenerator([(Date.now() * Math.random()).toString()]);

        this.state = new Phaser.StateManager(this, state);
    ***REMOVED***

    this.device.whenReady(this.boot, this);

    return this;

***REMOVED***;

Phaser.Game.prototype = ***REMOVED***

    /**
    * Parses a Game configuration object.
    *
    * @method Phaser.Game#parseConfig
    * @protected
    */
    parseConfig: function (config) ***REMOVED***

        this.config = config;

        if (config['enableDebug'] === undefined)
        ***REMOVED***
            this.config.enableDebug = true;
        ***REMOVED***

        if (config['width'])
        ***REMOVED***
            this._width = config['width'];
        ***REMOVED***

        if (config['height'])
        ***REMOVED***
            this._height = config['height'];
        ***REMOVED***

        if (config['renderer'])
        ***REMOVED***
            this.renderType = config['renderer'];
        ***REMOVED***

        if (config['parent'])
        ***REMOVED***
            this.parent = config['parent'];
        ***REMOVED***

        if (config['transparent'] !== undefined)
        ***REMOVED***
            this.transparent = config['transparent'];
        ***REMOVED***

        if (config['antialias'] !== undefined)
        ***REMOVED***
            this.antialias = config['antialias'];
        ***REMOVED***

        if (config['resolution'])
        ***REMOVED***
            this.resolution = config['resolution'];
        ***REMOVED***

        if (config['preserveDrawingBuffer'] !== undefined)
        ***REMOVED***
            this.preserveDrawingBuffer = config['preserveDrawingBuffer'];
        ***REMOVED***

        if (config['physicsConfig'])
        ***REMOVED***
            this.physicsConfig = config['physicsConfig'];
        ***REMOVED***

        var seed = [(Date.now() * Math.random()).toString()];

        if (config['seed'])
        ***REMOVED***
            seed = config['seed'];
        ***REMOVED***

        this.rnd = new Phaser.RandomDataGenerator(seed);

        var state = null;

        if (config['state'])
        ***REMOVED***
            state = config['state'];
        ***REMOVED***

        this.state = new Phaser.StateManager(this, state);

    ***REMOVED***,

    /**
    * Initialize engine sub modules and start the game.
    *
    * @method Phaser.Game#boot
    * @protected
    */
    boot: function () ***REMOVED***

        if (this.isBooted)
        ***REMOVED***
            return;
        ***REMOVED***

        this.onPause = new Phaser.Signal();
        this.onResume = new Phaser.Signal();
        this.onBlur = new Phaser.Signal();
        this.onFocus = new Phaser.Signal();

        this.isBooted = true;

        PIXI.game = this;

        this.math = Phaser.Math;

        this.scale = new Phaser.ScaleManager(this, this._width, this._height);
        this.stage = new Phaser.Stage(this);

        this.setUpRenderer();

        this.world = new Phaser.World(this);
        this.add = new Phaser.GameObjectFactory(this);
        this.make = new Phaser.GameObjectCreator(this);
        this.cache = new Phaser.Cache(this);
        this.load = new Phaser.Loader(this);
        this.time = new Phaser.Time(this);
        this.tweens = new Phaser.TweenManager(this);
        this.input = new Phaser.Input(this);
        this.sound = new Phaser.SoundManager(this);
        this.physics = new Phaser.Physics(this, this.physicsConfig);
        this.particles = new Phaser.Particles(this);
        this.create = new Phaser.Create(this);
        this.plugins = new Phaser.PluginManager(this);
        this.net = new Phaser.Net(this);

        this.time.boot();
        this.stage.boot();
        this.world.boot();
        this.scale.boot();
        this.input.boot();
        this.sound.boot();
        this.state.boot();

        if (this.config['enableDebug'])
        ***REMOVED***
            this.debug = new Phaser.Utils.Debug(this);
            this.debug.boot();
        ***REMOVED***
        else
        ***REMOVED***
            this.debug = ***REMOVED*** preUpdate: function () ***REMOVED******REMOVED***, update: function () ***REMOVED******REMOVED***, reset: function () ***REMOVED******REMOVED*** ***REMOVED***;
        ***REMOVED***

        this.showDebugHeader();

        this.isRunning = true;

        if (this.config && this.config['forceSetTimeOut'])
        ***REMOVED***
            this.raf = new Phaser.RequestAnimationFrame(this, this.config['forceSetTimeOut']);
        ***REMOVED***
        else
        ***REMOVED***
            this.raf = new Phaser.RequestAnimationFrame(this, false);
        ***REMOVED***

        this._kickstart = true;

        if (window['focus'])
        ***REMOVED***
            if (!window['PhaserGlobal'] || (window['PhaserGlobal'] && !window['PhaserGlobal'].stopFocus))
            ***REMOVED***
                window.focus();
            ***REMOVED***
        ***REMOVED***

        this.raf.start();

    ***REMOVED***,

    /**
    * Displays a Phaser version debug header in the console.
    *
    * @method Phaser.Game#showDebugHeader
    * @protected
    */
    showDebugHeader: function () ***REMOVED***

        if (window['PhaserGlobal'] && window['PhaserGlobal'].hideBanner)
        ***REMOVED***
            return;
        ***REMOVED***

        var v = Phaser.VERSION;
        var r = 'Canvas';
        var a = 'HTML Audio';
        var c = 1;

        if (this.renderType === Phaser.WEBGL)
        ***REMOVED***
            r = 'WebGL';
            c++;
        ***REMOVED***
        else if (this.renderType === Phaser.HEADLESS)
        ***REMOVED***
            r = 'Headless';
        ***REMOVED***

        if (this.device.webAudio)
        ***REMOVED***
            a = 'WebAudio';
            c++;
        ***REMOVED***

        if (this.device.chrome)
        ***REMOVED***
            var args = [
                '%c %c %c Phaser v' + v + ' | Pixi.js | ' + r + ' | ' + a + '  %c %c ' + '%c http://phaser.io %c\u2665%c\u2665%c\u2665',
                'background: #fb8cb3',
                'background: #d44a52',
                'color: #ffffff; background: #871905;',
                'background: #d44a52',
                'background: #fb8cb3',
                'background: #ffffff'
            ];

            for (var i = 0; i < 3; i++)
            ***REMOVED***
                if (i < c)
                ***REMOVED***
                    args.push('color: #ff2424; background: #fff');
                ***REMOVED***
                else
                ***REMOVED***
                    args.push('color: #959595; background: #fff');
                ***REMOVED***
            ***REMOVED***

            console.log.apply(console, args);
        ***REMOVED***
        else if (window['console'])
        ***REMOVED***
            console.log('Phaser v' + v + ' | Pixi.js ' + PIXI.VERSION + ' | ' + r + ' | ' + a + ' | http://phaser.io');
        ***REMOVED***

    ***REMOVED***,

    /**
    * Checks if the device is capable of using the requested renderer and sets it up or an alternative if not.
    *
    * @method Phaser.Game#setUpRenderer
    * @protected
    */
    setUpRenderer: function () ***REMOVED***

        if (this.config['canvas'])
        ***REMOVED***
            this.canvas = this.config['canvas'];
        ***REMOVED***
        else
        ***REMOVED***
            this.canvas = Phaser.Canvas.create(this, this.width, this.height, this.config['canvasID'], true);
        ***REMOVED***

        if (this.config['canvasStyle'])
        ***REMOVED***
            this.canvas.style = this.config['canvasStyle'];
        ***REMOVED***
        else
        ***REMOVED***
            this.canvas.style['-webkit-full-screen'] = 'width: 100%; height: 100%';
        ***REMOVED***

        if (this.renderType === Phaser.HEADLESS || this.renderType === Phaser.CANVAS || (this.renderType === Phaser.AUTO && !this.device.webGL))
        ***REMOVED***
            if (this.device.canvas)
            ***REMOVED***
                //  They requested Canvas and their browser supports it
                this.renderType = Phaser.CANVAS;

                this.renderer = new PIXI.CanvasRenderer(this);

                this.context = this.renderer.context;
            ***REMOVED***
            else
            ***REMOVED***
                throw new Error('Phaser.Game - Cannot create Canvas or WebGL context, aborting.');
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  They requested WebGL and their browser supports it
            this.renderType = Phaser.WEBGL;

            this.renderer = new PIXI.WebGLRenderer(this);

            this.context = null;

            this.canvas.addEventListener('webglcontextlost', this.contextLost.bind(this), false);
            this.canvas.addEventListener('webglcontextrestored', this.contextRestored.bind(this), false);
        ***REMOVED***

        if (this.device.cocoonJS)
        ***REMOVED***
            this.canvas.screencanvas = (this.renderType === Phaser.CANVAS) ? true : false;
        ***REMOVED***

        if (this.renderType !== Phaser.HEADLESS)
        ***REMOVED***
            this.stage.smoothed = this.antialias;
            
            Phaser.Canvas.addToDOM(this.canvas, this.parent, false);
            Phaser.Canvas.setTouchAction(this.canvas);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Handles WebGL context loss.
    *
    * @method Phaser.Game#contextLost
    * @private
    * @param ***REMOVED***Event***REMOVED*** event - The webglcontextlost event.
    */
    contextLost: function (event) ***REMOVED***

        event.preventDefault();

        this.renderer.contextLost = true;

    ***REMOVED***,

    /**
    * Handles WebGL context restoration.
    *
    * @method Phaser.Game#contextRestored
    * @private
    */
    contextRestored: function () ***REMOVED***

        this.renderer.initContext();

        this.cache.clearGLTextures();

        this.renderer.contextLost = false;

    ***REMOVED***,

    /**
    * The core game loop.
    *
    * @method Phaser.Game#update
    * @protected
    * @param ***REMOVED***number***REMOVED*** time - The current time as provided by RequestAnimationFrame.
    */
    update: function (time) ***REMOVED***

        this.time.update(time);

        if (this._kickstart)
        ***REMOVED***
            this.updateLogic(this.time.desiredFpsMult);

            // call the game render update exactly once every frame
            this.updateRender(this.time.slowMotion * this.time.desiredFps);

            this._kickstart = false;

            return;
        ***REMOVED***

        // if the logic time is spiraling upwards, skip a frame entirely
        if (this._spiraling > 1 && !this.forceSingleUpdate)
        ***REMOVED***
            // cause an event to warn the program that this CPU can't keep up with the current desiredFps rate
            if (this.time.time > this._nextFpsNotification)
            ***REMOVED***
                // only permit one fps notification per 10 seconds
                this._nextFpsNotification = this.time.time + 10000;

                // dispatch the notification signal
                this.fpsProblemNotifier.dispatch();
            ***REMOVED***

            // reset the _deltaTime accumulator which will cause all pending dropped frames to be permanently skipped
            this._deltaTime = 0;
            this._spiraling = 0;

            // call the game render update exactly once every frame
            this.updateRender(this.time.slowMotion * this.time.desiredFps);
        ***REMOVED***
        else
        ***REMOVED***
            // step size taking into account the slow motion speed
            var slowStep = this.time.slowMotion * 1000.0 / this.time.desiredFps;

            // accumulate time until the slowStep threshold is met or exceeded... up to a limit of 3 catch-up frames at slowStep intervals
            this._deltaTime += Math.max(Math.min(slowStep * 3, this.time.elapsed), 0);

            // call the game update logic multiple times if necessary to "catch up" with dropped frames
            // unless forceSingleUpdate is true
            var count = 0;

            this.updatesThisFrame = Math.floor(this._deltaTime / slowStep);

            if (this.forceSingleUpdate)
            ***REMOVED***
                this.updatesThisFrame = Math.min(1, this.updatesThisFrame);
            ***REMOVED***

            while (this._deltaTime >= slowStep)
            ***REMOVED***
                this._deltaTime -= slowStep;
                this.currentUpdateID = count;

                this.updateLogic(this.time.desiredFpsMult);

                count++;

                if (this.forceSingleUpdate && count === 1)
                ***REMOVED***
                    break;
                ***REMOVED***
                else
                ***REMOVED***
                    this.time.refresh();
                ***REMOVED***
            ***REMOVED***

            // detect spiraling (if the catch-up loop isn't fast enough, the number of iterations will increase constantly)
            if (count > this._lastCount)
            ***REMOVED***
                this._spiraling++;
            ***REMOVED***
            else if (count < this._lastCount)
            ***REMOVED***
                // looks like it caught up successfully, reset the spiral alert counter
                this._spiraling = 0;
            ***REMOVED***

            this._lastCount = count;

            // call the game render update exactly once every frame unless we're playing catch-up from a spiral condition
            this.updateRender(this._deltaTime / slowStep);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Updates all logic subsystems in Phaser. Called automatically by Game.update.
    *
    * @method Phaser.Game#updateLogic
    * @protected
    * @param ***REMOVED***number***REMOVED*** timeStep - The current timeStep value as determined by Game.update.
    */
    updateLogic: function (timeStep) ***REMOVED***

        if (!this._paused && !this.pendingStep)
        ***REMOVED***
            if (this.stepping)
            ***REMOVED***
                this.pendingStep = true;
            ***REMOVED***

            this.scale.preUpdate();
            this.debug.preUpdate();
            this.camera.preUpdate();
            this.physics.preUpdate();
            this.state.preUpdate(timeStep);
            this.plugins.preUpdate(timeStep);
            this.stage.preUpdate();

            this.state.update();
            this.stage.update();
            this.tweens.update();
            this.sound.update();
            this.input.update();
            this.physics.update();
            this.particles.update();
            this.plugins.update();

            this.stage.postUpdate();
            this.plugins.postUpdate();
        ***REMOVED***
        else
        ***REMOVED***
            // Scaling and device orientation changes are still reflected when paused.
            this.scale.pauseUpdate();
            this.state.pauseUpdate();
            this.debug.preUpdate();
        ***REMOVED***

        this.stage.updateTransform();

    ***REMOVED***,

    /**
    * Runs the Render cycle.
    * It starts by calling State.preRender. In here you can do any last minute adjustments of display objects as required.
    * It then calls the renderer, which renders the entire display list, starting from the Stage object and working down.
    * It then calls plugin.render on any loaded plugins, in the order in which they were enabled.
    * After this State.render is called. Any rendering that happens here will take place on-top of the display list.
    * Finally plugin.postRender is called on any loaded plugins, in the order in which they were enabled.
    * This method is called automatically by Game.update, you don't need to call it directly.
    * Should you wish to have fine-grained control over when Phaser renders then use the `Game.lockRender` boolean.
    * Phaser will only render when this boolean is `false`.
    *
    * @method Phaser.Game#updateRender
    * @protected
    * @param ***REMOVED***number***REMOVED*** elapsedTime - The time elapsed since the last update.
    */
    updateRender: function (elapsedTime) ***REMOVED***

        if (this.lockRender)
        ***REMOVED***
            return;
        ***REMOVED***

        this.state.preRender(elapsedTime);

        if (this.renderType !== Phaser.HEADLESS)
        ***REMOVED***
            this.renderer.render(this.stage);

            this.plugins.render(elapsedTime);

            this.state.render(elapsedTime);
        ***REMOVED***

        this.plugins.postRender(elapsedTime);

    ***REMOVED***,

    /**
    * Enable core game loop stepping. When enabled you must call game.step() directly (perhaps via a DOM button?)
    * Calling step will advance the game loop by one frame. This is extremely useful for hard to track down errors!
    *
    * @method Phaser.Game#enableStep
    */
    enableStep: function () ***REMOVED***

        this.stepping = true;
        this.pendingStep = false;
        this.stepCount = 0;

    ***REMOVED***,

    /**
    * Disables core game loop stepping.
    *
    * @method Phaser.Game#disableStep
    */
    disableStep: function () ***REMOVED***

        this.stepping = false;
        this.pendingStep = false;

    ***REMOVED***,

    /**
    * When stepping is enabled you must call this function directly (perhaps via a DOM button?) to advance the game loop by one frame.
    * This is extremely useful to hard to track down errors! Use the internal stepCount property to monitor progress.
    *
    * @method Phaser.Game#step
    */
    step: function () ***REMOVED***

        this.pendingStep = false;
        this.stepCount++;

    ***REMOVED***,

    /**
    * Nukes the entire game from orbit.
    *
    * Calls destroy on Game.state, Game.sound, Game.scale, Game.stage, Game.input, Game.physics and Game.plugins.
    *
    * Then sets all of those local handlers to null, destroys the renderer, removes the canvas from the DOM
    * and resets the PIXI default renderer.
    *
    * @method Phaser.Game#destroy
    */
    destroy: function () ***REMOVED***

        this.raf.stop();

        this.state.destroy();
        this.sound.destroy();
        this.scale.destroy();
        this.stage.destroy();
        this.input.destroy();
        this.physics.destroy();
        this.plugins.destroy();

        this.state = null;
        this.sound = null;
        this.scale = null;
        this.stage = null;
        this.input = null;
        this.physics = null;
        this.plugins = null;

        this.cache = null;
        this.load = null;
        this.time = null;
        this.world = null;

        this.isBooted = false;

        this.renderer.destroy(false);

        Phaser.Canvas.removeFromDOM(this.canvas);

        PIXI.defaultRenderer = null;

        Phaser.GAMES[this.id] = null;

    ***REMOVED***,

    /**
    * Called by the Stage visibility handler.
    *
    * @method Phaser.Game#gamePaused
    * @param ***REMOVED***object***REMOVED*** event - The DOM event that caused the game to pause, if any.
    * @protected
    */
    gamePaused: function (event) ***REMOVED***

        //   If the game is already paused it was done via game code, so don't re-pause it
        if (!this._paused)
        ***REMOVED***
            this._paused = true;

            this.time.gamePaused();

            if (this.sound.muteOnPause)
            ***REMOVED***
                this.sound.setMute();
            ***REMOVED***

            this.onPause.dispatch(event);

            //  Avoids Cordova iOS crash event: https://github.com/photonstorm/phaser/issues/1800
            if (this.device.cordova && this.device.iOS)
            ***REMOVED***
                this.lockRender = true;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called by the Stage visibility handler.
    *
    * @method Phaser.Game#gameResumed
    * @param ***REMOVED***object***REMOVED*** event - The DOM event that caused the game to pause, if any.
    * @protected
    */
    gameResumed: function (event) ***REMOVED***

        //  Game is paused, but wasn't paused via code, so resume it
        if (this._paused && !this._codePaused)
        ***REMOVED***
            this._paused = false;

            this.time.gameResumed();

            this.input.reset();

            if (this.sound.muteOnPause)
            ***REMOVED***
                this.sound.unsetMute();
            ***REMOVED***

            this.onResume.dispatch(event);

            //  Avoids Cordova iOS crash event: https://github.com/photonstorm/phaser/issues/1800
            if (this.device.cordova && this.device.iOS)
            ***REMOVED***
                this.lockRender = false;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called by the Stage visibility handler.
    *
    * @method Phaser.Game#focusLoss
    * @param ***REMOVED***object***REMOVED*** event - The DOM event that caused the game to pause, if any.
    * @protected
    */
    focusLoss: function (event) ***REMOVED***

        this.onBlur.dispatch(event);

        if (!this.stage.disableVisibilityChange)
        ***REMOVED***
            this.gamePaused(event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called by the Stage visibility handler.
    *
    * @method Phaser.Game#focusGain
    * @param ***REMOVED***object***REMOVED*** event - The DOM event that caused the game to pause, if any.
    * @protected
    */
    focusGain: function (event) ***REMOVED***

        this.onFocus.dispatch(event);

        if (!this.stage.disableVisibilityChange)
        ***REMOVED***
            this.gameResumed(event);
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.Game.prototype.constructor = Phaser.Game;

/**
* The paused state of the Game. A paused game doesn't update any of its subsystems.
* When a game is paused the onPause event is dispatched. When it is resumed the onResume event is dispatched.
* @name Phaser.Game#paused
* @property ***REMOVED***boolean***REMOVED*** paused - Gets and sets the paused state of the Game.
*/
Object.defineProperty(Phaser.Game.prototype, "paused", ***REMOVED***

    get: function () ***REMOVED***
        return this._paused;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value === true)
        ***REMOVED***
            if (this._paused === false)
            ***REMOVED***
                this._paused = true;
                this.sound.setMute();
                this.time.gamePaused();
                this.onPause.dispatch(this);
            ***REMOVED***
            this._codePaused = true;
        ***REMOVED***
        else
        ***REMOVED***
            if (this._paused)
            ***REMOVED***
                this._paused = false;
                this.input.reset();
                this.sound.unsetMute();
                this.time.gameResumed();
                this.onResume.dispatch(this);
            ***REMOVED***
            this._codePaused = false;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
 * 
 * "Deleted code is debugged code." - Jeff Sickel
 *
 * ヽ(〃＾▽＾〃)ﾉ
 * 
*/
