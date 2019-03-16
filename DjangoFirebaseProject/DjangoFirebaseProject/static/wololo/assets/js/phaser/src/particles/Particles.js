/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Phaser.Particles is the Particle Manager for the game. It is called during the game update loop and in turn updates any Emitters attached to it.
*
* @class Phaser.Particles
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.Particles = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running Game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***object***REMOVED*** emitters - Internal emitters store.
    */
    this.emitters = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***number***REMOVED*** ID -
    * @default
    */
    this.ID = 0;

***REMOVED***;

Phaser.Particles.prototype = ***REMOVED***

    /**
    * Adds a new Particle Emitter to the Particle Manager.
    * @method Phaser.Particles#add
    * @param ***REMOVED***Phaser.Emitter***REMOVED*** emitter - The emitter to be added to the particle manager.
    * @return ***REMOVED***Phaser.Emitter***REMOVED*** The emitter that was added.
    */
    add: function (emitter) ***REMOVED***

        this.emitters[emitter.name] = emitter;

        return emitter;

    ***REMOVED***,

    /**
    * Removes an existing Particle Emitter from the Particle Manager.
    * @method Phaser.Particles#remove
    * @param ***REMOVED***Phaser.Emitter***REMOVED*** emitter - The emitter to remove.
    */
    remove: function (emitter) ***REMOVED***

        delete this.emitters[emitter.name];

    ***REMOVED***,

    /**
    * Called by the core game loop. Updates all Emitters who have their exists value set to true.
    * @method Phaser.Particles#update
    * @protected
    */
    update: function () ***REMOVED***

        for (var key in this.emitters)
        ***REMOVED***
            if (this.emitters[key].exists)
            ***REMOVED***
                this.emitters[key].update();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.Particles.prototype.constructor = Phaser.Particles;
