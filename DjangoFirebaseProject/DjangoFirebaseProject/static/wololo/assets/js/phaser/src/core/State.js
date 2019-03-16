/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* This is a base State class which can be extended if you are creating your own game.
* It provides quick access to common functions such as the camera, cache, input, match, sound and more.
*
* @class Phaser.State
* @constructor
*/
Phaser.State = function () ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - This is a reference to the currently running Game.
    */
    this.game = null;

    /**
    * @property ***REMOVED***string***REMOVED*** key - The string based identifier given to the State when added into the State Manager.
    */
    this.key = '';

    /**
    * @property ***REMOVED***Phaser.GameObjectFactory***REMOVED*** add - A reference to the GameObjectFactory which can be used to add new objects to the World.
    */
    this.add = null;

    /**
    * @property ***REMOVED***Phaser.GameObjectCreator***REMOVED*** make - A reference to the GameObjectCreator which can be used to make new objects.
    */
    this.make = null;

    /**
    * @property ***REMOVED***Phaser.Camera***REMOVED*** camera - A handy reference to World.camera.
    */
    this.camera = null;

    /**
    * @property ***REMOVED***Phaser.Cache***REMOVED*** cache - A reference to the game cache which contains any loaded or generated assets, such as images, sound and more.
    */
    this.cache = null;

    /**
    * @property ***REMOVED***Phaser.Input***REMOVED*** input - A reference to the Input Manager.
    */
    this.input = null;

    /**
    * @property ***REMOVED***Phaser.Loader***REMOVED*** load - A reference to the Loader, which you mostly use in the preload method of your state to load external assets.
    */
    this.load = null;

    /**
    * @property ***REMOVED***Phaser.Math***REMOVED*** math - A reference to Math class with lots of helpful functions.
    */
    this.math = null;

    /**
    * @property ***REMOVED***Phaser.SoundManager***REMOVED*** sound - A reference to the Sound Manager which can create, play and stop sounds, as well as adjust global volume.
    */
    this.sound = null;

    /**
    * @property ***REMOVED***Phaser.ScaleManager***REMOVED*** scale - A reference to the Scale Manager which controls the way the game scales on different displays.
    */
    this.scale = null;

    /**
    * @property ***REMOVED***Phaser.Stage***REMOVED*** stage - A reference to the Stage.
    */
    this.stage = null;

    /**
    * @property ***REMOVED***Phaser.StateManager***REMOVED*** stage - A reference to the State Manager, which controls state changes.
    */
    this.state = null;

    /**
    * @property ***REMOVED***Phaser.Time***REMOVED*** time - A reference to the game clock and timed events system.
    */
    this.time = null;

    /**
    * @property ***REMOVED***Phaser.TweenManager***REMOVED*** tweens - A reference to the tween manager.
    */
    this.tweens = null;

    /**
    * @property ***REMOVED***Phaser.World***REMOVED*** world - A reference to the game world. All objects live in the Game World and its size is not bound by the display resolution.
    */
    this.world = null;

    /**
    * @property ***REMOVED***Phaser.Particles***REMOVED*** particles - The Particle Manager. It is called during the core gameloop and updates any Particle Emitters it has created.
    */
    this.particles = null;

    /**
    * @property ***REMOVED***Phaser.Physics***REMOVED*** physics - A reference to the physics manager which looks after the different physics systems available within Phaser.
    */
    this.physics = null;

    /**
    * @property ***REMOVED***Phaser.RandomDataGenerator***REMOVED*** rnd - A reference to the seeded and repeatable random data generator.
    */
    this.rnd = null;

***REMOVED***;

Phaser.State.prototype = ***REMOVED***

    /**
    * init is the very first function called when your State starts up. It's called before preload, create or anything else.
    * If you need to route the game away to another State you could do so here, or if you need to prepare a set of variables
    * or objects before the preloading starts.
    *
    * @method Phaser.State#init
    */
    init: function () ***REMOVED***
    ***REMOVED***,

    /**
    * preload is called first. Normally you'd use this to load your game assets (or those needed for the current State)
    * You shouldn't create any objects in this method that require assets that you're also loading in this method, as
    * they won't yet be available.
    *
    * @method Phaser.State#preload
    */
    preload: function () ***REMOVED***
    ***REMOVED***,

    /**
    * loadUpdate is called during the Loader process. This only happens if you've set one or more assets to load in the preload method.
    *
    * @method Phaser.State#loadUpdate
    */
    loadUpdate: function () ***REMOVED***
    ***REMOVED***,

    /**
    * loadRender is called during the Loader process. This only happens if you've set one or more assets to load in the preload method.
    * The difference between loadRender and render is that any objects you render in this method you must be sure their assets exist.
    *
    * @method Phaser.State#loadRender
    */
    loadRender: function () ***REMOVED***
    ***REMOVED***,

    /**
    * create is called once preload has completed, this includes the loading of any assets from the Loader.
    * If you don't have a preload method then create is the first method called in your State.
    *
    * @method Phaser.State#create
    */
    create: function () ***REMOVED***
    ***REMOVED***,

    /**
    * The update method is left empty for your own use.
    * It is called during the core game loop AFTER debug, physics, plugins and the Stage have had their preUpdate methods called.
    * It is called BEFORE Stage, Tweens, Sounds, Input, Physics, Particles and Plugins have had their postUpdate methods called.
    *
    * @method Phaser.State#update
    */
    update: function () ***REMOVED***
    ***REMOVED***,

    /**
    * The preRender method is called after all Game Objects have been updated, but before any rendering takes place.
    *
    * @method Phaser.State#preRender
    */
    preRender: function () ***REMOVED***
    ***REMOVED***,

    /**
    * Nearly all display objects in Phaser render automatically, you don't need to tell them to render.
    * However the render method is called AFTER the game renderer and plugins have rendered, so you're able to do any
    * final post-processing style effects here. Note that this happens before plugins postRender takes place.
    *
    * @method Phaser.State#render
    */
    render: function () ***REMOVED***
    ***REMOVED***,

    /**
    * If your game is set to Scalemode RESIZE then each time the browser resizes it will call this function, passing in the new width and height.
    *
    * @method Phaser.State#resize
    */
    resize: function () ***REMOVED***
    ***REMOVED***,

    /**
    * This method will be called if the core game loop is paused.
    *
    * @method Phaser.State#paused
    */
    paused: function () ***REMOVED***
    ***REMOVED***,

    /**
    * This method will be called when the core game loop resumes from a paused state.
    *
    * @method Phaser.State#resumed
    */
    resumed: function () ***REMOVED***
    ***REMOVED***,

    /**
    * pauseUpdate is called while the game is paused instead of preUpdate, update and postUpdate.
    *
    * @method Phaser.State#pauseUpdate
    */
    pauseUpdate: function () ***REMOVED***
    ***REMOVED***,

    /**
    * This method will be called when the State is shutdown (i.e. you switch to another state from this one).
    *
    * @method Phaser.State#shutdown
    */
    shutdown: function () ***REMOVED***
    ***REMOVED***

***REMOVED***;

Phaser.State.prototype.constructor = Phaser.State;
