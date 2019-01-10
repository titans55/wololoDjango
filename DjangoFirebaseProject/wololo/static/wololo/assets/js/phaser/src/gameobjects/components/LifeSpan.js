/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* LifeSpan Component Features.
*
* @class
*/
Phaser.Component.LifeSpan = function () ***REMOVED******REMOVED***;

/**
 * The LifeSpan component preUpdate handler.
 * Called automatically by the Game Object.
 *
 * @method
 */
Phaser.Component.LifeSpan.preUpdate = function () ***REMOVED***

    if (this.lifespan > 0)
    ***REMOVED***
        this.lifespan -= this.game.time.physicsElapsedMS;

        if (this.lifespan <= 0)
        ***REMOVED***
            this.kill();
            return false;
        ***REMOVED***
    ***REMOVED***

    return true;

***REMOVED***;

Phaser.Component.LifeSpan.prototype = ***REMOVED***

    /**
    * A useful flag to control if the Game Object is alive or dead.
    *
    * This is set automatically by the Health components `damage` method should the object run out of health.
    * Or you can toggle it via your game code.
    *
    * This property is mostly just provided to be used by your game - it doesn't effect rendering or logic updates.
    * However you can use `Group.getFirstAlive` in conjunction with this property for fast object pooling and recycling.
    * @property ***REMOVED***boolean***REMOVED*** alive
    * @default
    */
    alive: true,

    /**
    * The lifespan allows you to give a Game Object a lifespan in milliseconds.
    *
    * Once the Game Object is 'born' you can set this to a positive value.
    *
    * It is automatically decremented by the millisecond equivalent of `game.time.physicsElapsed` each frame.
    * When it reaches zero it will call the `kill` method.
    *
    * Very handy for particles, bullets, collectibles, or any other short-lived entity.
    *
    * @property ***REMOVED***number***REMOVED*** lifespan
    * @default
    */
    lifespan: 0,

    /**
    * Brings a 'dead' Game Object back to life, optionally resetting its health value in the process.
    *
    * A resurrected Game Object has its `alive`, `exists` and `visible` properties all set to true.
    *
    * It will dispatch the `onRevived` event. Listen to `events.onRevived` for the signal.
    *
    * @method
    * @param ***REMOVED***number***REMOVED*** [health=100] - The health to give the Game Object. Only set if the GameObject has the Health component.
    * @return ***REMOVED***PIXI.DisplayObject***REMOVED*** This instance.
    */
    revive: function (health) ***REMOVED***

        if (health === undefined) ***REMOVED*** health = 100; ***REMOVED***

        this.alive = true;
        this.exists = true;
        this.visible = true;

        if (typeof this.setHealth === 'function')
        ***REMOVED***
            this.setHealth(health);
        ***REMOVED***

        if (this.events)
        ***REMOVED***
            this.events.onRevived$dispatch(this);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Kills a Game Object. A killed Game Object has its `alive`, `exists` and `visible` properties all set to false.
    *
    * It will dispatch the `onKilled` event. You can listen to `events.onKilled` for the signal.
    *
    * Note that killing a Game Object is a way for you to quickly recycle it in an object pool,
    * it doesn't destroy the object or free it up from memory.
    *
    * If you don't need this Game Object any more you should call `destroy` instead.
    *
    * @method
    * @return ***REMOVED***PIXI.DisplayObject***REMOVED*** This instance.
    */
    kill: function () ***REMOVED***

        this.alive = false;
        this.exists = false;
        this.visible = false;

        if (this.events)
        ***REMOVED***
            this.events.onKilled$dispatch(this);
        ***REMOVED***

        return this;

    ***REMOVED***

***REMOVED***;
