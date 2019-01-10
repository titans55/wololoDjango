/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Physics Manager is responsible for looking after all of the running physics systems.
* Phaser supports 4 physics systems: Arcade Physics, P2, Ninja Physics and Box2D via a commercial plugin.
* 
* Game Objects (such as Sprites) can only belong to 1 physics system, but you can have multiple systems active in a single game.
*
* For example you could have P2 managing a polygon-built terrain landscape that an vehicle drives over, while it could be firing bullets that use the
* faster (due to being much simpler) Arcade Physics system.
*
* @class Phaser.Physics
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***object***REMOVED*** [physicsConfig=null] - A physics configuration object to pass to the Physics world on creation.
*/
Phaser.Physics = function (game, config) ***REMOVED***

    config = config || ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***object***REMOVED*** config - The physics configuration object as passed to the game on creation.
    */
    this.config = config;

    /**
    * @property ***REMOVED***Phaser.Physics.Arcade***REMOVED*** arcade - The Arcade Physics system.
    */
    this.arcade = null;

    /**
    * @property ***REMOVED***Phaser.Physics.P2***REMOVED*** p2 - The P2.JS Physics system.
    */
    this.p2 = null;

    /**
    * @property ***REMOVED***Phaser.Physics.Ninja***REMOVED*** ninja - The N+ Ninja Physics system.
    */
    this.ninja = null;

    /**
    * @property ***REMOVED***Phaser.Physics.Box2D***REMOVED*** box2d - The Box2D Physics system.
    */
    this.box2d = null;

    /**
    * @property ***REMOVED***Phaser.Physics.Chipmunk***REMOVED*** chipmunk - The Chipmunk Physics system (to be done).
    */
    this.chipmunk = null;

    /**
    * @property ***REMOVED***Phaser.Physics.Matter***REMOVED*** matter - The MatterJS Physics system (coming soon).
    */
    this.matter = null;

    this.parseConfig();

***REMOVED***;

/**
* @const
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Physics.ARCADE = 0;

/**
* @const
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Physics.P2JS = 1;

/**
* @const
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Physics.NINJA = 2;

/**
* @const
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Physics.BOX2D = 3;

/**
* @const
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Physics.CHIPMUNK = 4;

/**
* @const
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Physics.MATTERJS = 5;

Phaser.Physics.prototype = ***REMOVED***

    /**
    * Parses the Physics Configuration object passed to the Game constructor and starts any physics systems specified within.
    *
    * @method Phaser.Physics#parseConfig
    */
    parseConfig: function () ***REMOVED***

        if ((!this.config.hasOwnProperty('arcade') || this.config['arcade'] === true) && Phaser.Physics.hasOwnProperty('Arcade'))
        ***REMOVED***
            //  If Arcade isn't specified, we create it automatically if we can
            this.arcade = new Phaser.Physics.Arcade(this.game);
        ***REMOVED***

        if (this.config.hasOwnProperty('ninja') && this.config['ninja'] === true && Phaser.Physics.hasOwnProperty('Ninja'))
        ***REMOVED***
            this.ninja = new Phaser.Physics.Ninja(this.game);
        ***REMOVED***

        if (this.config.hasOwnProperty('p2') && this.config['p2'] === true && Phaser.Physics.hasOwnProperty('P2'))
        ***REMOVED***
            this.p2 = new Phaser.Physics.P2(this.game, this.config);
        ***REMOVED***

        if (this.config.hasOwnProperty('box2d') && this.config['box2d'] === true && Phaser.Physics.hasOwnProperty('BOX2D'))
        ***REMOVED***
            this.box2d = new Phaser.Physics.BOX2D(this.game, this.config);
        ***REMOVED***

        if (this.config.hasOwnProperty('matter') && this.config['matter'] === true && Phaser.Physics.hasOwnProperty('Matter'))
        ***REMOVED***
            this.matter = new Phaser.Physics.Matter(this.game, this.config);
        ***REMOVED***

    ***REMOVED***,

    /**
    * This will create an instance of the requested physics simulation.
    * Phaser.Physics.Arcade is running by default, but all others need activating directly.
    * 
    * You can start the following physics systems:
    * 
    * Phaser.Physics.P2JS - A full-body advanced physics system by Stefan Hedman.
    * Phaser.Physics.NINJA - A port of Metanet Softwares N+ physics system.
    * Phaser.Physics.BOX2D - A commercial Phaser Plugin (see http://phaser.io)
    *
    * Both Ninja Physics and Box2D require their respective plugins to be loaded before you can start them.
    * They are not bundled into the core Phaser library.
    *
    * If the physics world has already been created (i.e. in another state in your game) then 
    * calling startSystem will reset the physics world, not re-create it. If you need to start them again from their constructors 
    * then set Phaser.Physics.p2 (or whichever system you want to recreate) to `null` before calling `startSystem`.
    *
    * @method Phaser.Physics#startSystem
    * @param ***REMOVED***number***REMOVED*** system - The physics system to start: Phaser.Physics.ARCADE, Phaser.Physics.P2JS, Phaser.Physics.NINJA or Phaser.Physics.BOX2D.
    */
    startSystem: function (system) ***REMOVED***

        if (system === Phaser.Physics.ARCADE)
        ***REMOVED***
            this.arcade = new Phaser.Physics.Arcade(this.game);
        ***REMOVED***
        else if (system === Phaser.Physics.P2JS)
        ***REMOVED***
            if (this.p2 === null)
            ***REMOVED***
                this.p2 = new Phaser.Physics.P2(this.game, this.config);
            ***REMOVED***
            else
            ***REMOVED***
                this.p2.reset();
            ***REMOVED***
        ***REMOVED***
        else if (system === Phaser.Physics.NINJA)
        ***REMOVED***
            this.ninja = new Phaser.Physics.Ninja(this.game);
        ***REMOVED***
        else if (system === Phaser.Physics.BOX2D)
        ***REMOVED***
            if (this.box2d === null)
            ***REMOVED***
                this.box2d = new Phaser.Physics.Box2D(this.game, this.config);
            ***REMOVED***
            else
            ***REMOVED***
                this.box2d.reset();
            ***REMOVED***
        ***REMOVED***
        else if (system === Phaser.Physics.MATTERJS)
        ***REMOVED***
            if (this.matter === null)
            ***REMOVED***
                this.matter = new Phaser.Physics.Matter(this.game, this.config);
            ***REMOVED***
            else
            ***REMOVED***
                this.matter.reset();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * This will create a default physics body on the given game object or array of objects.
    * A game object can only have 1 physics body active at any one time, and it can't be changed until the object is destroyed.
    * It can be for any of the physics systems that have been started:
    *
    * Phaser.Physics.Arcade - A light weight AABB based collision system with basic separation.
    * Phaser.Physics.P2JS - A full-body advanced physics system supporting multiple object shapes, polygon loading, contact materials, springs and constraints.
    * Phaser.Physics.NINJA - A port of Metanet Softwares N+ physics system. Advanced AABB and Circle vs. Tile collision.
    * Phaser.Physics.BOX2D - A port of https://code.google.com/p/box2d-html5
    * Phaser.Physics.MATTER - A full-body and light-weight advanced physics system (still in development)
    * Phaser.Physics.CHIPMUNK is still in development.
    *
    * If you require more control over what type of body is created, for example to create a Ninja Physics Circle instead of the default AABB, then see the
    * individual physics systems `enable` methods instead of using this generic one.
    *
    * @method Phaser.Physics#enable
    * @param ***REMOVED***object|array***REMOVED*** object - The game object to create the physics body on. Can also be an array of objects, a body will be created on every object in the array.
    * @param ***REMOVED***number***REMOVED*** [system=Phaser.Physics.ARCADE] - The physics system that will be used to create the body. Defaults to Arcade Physics.
    * @param ***REMOVED***boolean***REMOVED*** [debug=false] - Enable the debug drawing for this body. Defaults to false.
    */
    enable: function (object, system, debug) ***REMOVED***

        if (system === undefined) ***REMOVED*** system = Phaser.Physics.ARCADE; ***REMOVED***
        if (debug === undefined) ***REMOVED*** debug = false; ***REMOVED***

        if (system === Phaser.Physics.ARCADE)
        ***REMOVED***
            this.arcade.enable(object);
        ***REMOVED***
        else if (system === Phaser.Physics.P2JS && this.p2)
        ***REMOVED***
            this.p2.enable(object, debug);
        ***REMOVED***
        else if (system === Phaser.Physics.NINJA && this.ninja)
        ***REMOVED***
            this.ninja.enableAABB(object);
        ***REMOVED***
        else if (system === Phaser.Physics.BOX2D && this.box2d)
        ***REMOVED***
            this.box2d.enable(object);
        ***REMOVED***
        else if (system === Phaser.Physics.MATTERJS && this.matter)
        ***REMOVED***
            this.matter.enable(object);
        ***REMOVED***
        else
        ***REMOVED***
            console.warn(object.key + ' is attempting to enable a physics body using an unknown physics system.');
        ***REMOVED***

    ***REMOVED***,

    /**
    * preUpdate checks.
    *
    * @method Phaser.Physics#preUpdate
    * @protected
    */
    preUpdate: function () ***REMOVED***

        //  ArcadePhysics / Ninja don't have a core to preUpdate

        if (this.p2)
        ***REMOVED***
            this.p2.preUpdate();
        ***REMOVED***

        if (this.box2d)
        ***REMOVED***
            this.box2d.preUpdate();
        ***REMOVED***

        if (this.matter)
        ***REMOVED***
            this.matter.preUpdate();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Updates all running physics systems.
    *
    * @method Phaser.Physics#update
    * @protected
    */
    update: function () ***REMOVED***

        //  ArcadePhysics / Ninja don't have a core to update

        if (this.p2)
        ***REMOVED***
            this.p2.update();
        ***REMOVED***

        if (this.box2d)
        ***REMOVED***
            this.box2d.update();
        ***REMOVED***

        if (this.matter)
        ***REMOVED***
            this.matter.update();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Updates the physics bounds to match the world dimensions.
    *
    * @method Phaser.Physics#setBoundsToWorld
    * @protected
    */
    setBoundsToWorld: function () ***REMOVED***

        if (this.arcade)
        ***REMOVED***
            this.arcade.setBoundsToWorld();
        ***REMOVED***

        if (this.ninja)
        ***REMOVED***
            this.ninja.setBoundsToWorld();
        ***REMOVED***

        if (this.p2)
        ***REMOVED***
            this.p2.setBoundsToWorld();
        ***REMOVED***

        if (this.box2d)
        ***REMOVED***
            this.box2d.setBoundsToWorld();
        ***REMOVED***

        if (this.matter)
        ***REMOVED***
            this.matter.setBoundsToWorld();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Clears down all active physics systems. This doesn't destroy them, it just clears them of objects and is called when the State changes.
    *
    * @method Phaser.Physics#clear
    * @protected
    */
    clear: function () ***REMOVED***

        if (this.p2)
        ***REMOVED***
            this.p2.clear();
        ***REMOVED***

        if (this.box2d)
        ***REMOVED***
            this.box2d.clear();
        ***REMOVED***

        if (this.matter)
        ***REMOVED***
            this.matter.clear();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Resets the active physics system. Called automatically on a Phaser.State swap.
    *
    * @method Phaser.Physics#reset
    * @protected
    */
    reset: function () ***REMOVED***

        if (this.p2)
        ***REMOVED***
            this.p2.reset();
        ***REMOVED***

        if (this.box2d)
        ***REMOVED***
            this.box2d.reset();
        ***REMOVED***

        if (this.matter)
        ***REMOVED***
            this.matter.reset();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Destroys all active physics systems. Usually only called on a Game Shutdown, not on a State swap.
    *
    * @method Phaser.Physics#destroy
    */
    destroy: function () ***REMOVED***

        if (this.p2)
        ***REMOVED***
            this.p2.destroy();
        ***REMOVED***

        if (this.box2d)
        ***REMOVED***
            this.box2d.destroy();
        ***REMOVED***

        if (this.matter)
        ***REMOVED***
            this.matter.destroy();
        ***REMOVED***

        this.arcade = null;
        this.ninja = null;
        this.p2 = null;
        this.box2d = null;
        this.matter = null;

    ***REMOVED***

***REMOVED***;

Phaser.Physics.prototype.constructor = Phaser.Physics;
