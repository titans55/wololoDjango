/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Create a new `Bullet` object. Bullets are used by the `Phaser.Weapon` class, and are normal Sprites,
* with a few extra properties in the data object to handle Weapon specific features.
* 
* @class Phaser.Bullet
* @constructor
* @extends Phaser.Sprite
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***number***REMOVED*** x - The x coordinate (in world space) to position the Particle at.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate (in world space) to position the Particle at.
* @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture***REMOVED*** key - This is the image or texture used by the Particle during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
* @param ***REMOVED***string|number***REMOVED*** frame - If this Particle is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
*/
Phaser.Bullet = function (game, x, y, key, frame) ***REMOVED***

    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.anchor.set(0.5);

    this.data = ***REMOVED***
        bulletManager: null,
        fromX: 0,
        fromY: 0,
        bodyDirty: true,
        rotateToVelocity: false,
        killType: 0,
        killDistance: 0
    ***REMOVED***;

***REMOVED***;

Phaser.Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Phaser.Bullet.prototype.constructor = Phaser.Bullet;

/**
* Kills the Bullet, freeing it up for re-use by the Weapon bullet pool.
* Also dispatches the `Weapon.onKill` signal.
*
* @method Phaser.Bullet#kill
* @memberof Phaser.Bullet
*/
Phaser.Bullet.prototype.kill = function () ***REMOVED***

    this.alive = false;
    this.exists = false;
    this.visible = false;

    this.data.bulletManager.onKill.dispatch(this);

    return this;

***REMOVED***;

/**
* Updates the Bullet, killing as required.
*
* @method Phaser.Bullet#kill
* @memberof Phaser.Bullet
*/
Phaser.Bullet.prototype.update = function () ***REMOVED***

    if (!this.exists)
    ***REMOVED***
        return;
    ***REMOVED***

    if (this.data.killType > Phaser.Weapon.KILL_LIFESPAN)
    ***REMOVED***
        if (this.data.killType === Phaser.Weapon.KILL_DISTANCE)
        ***REMOVED***
            if (this.game.physics.arcade.distanceToXY(this, this.data.fromX, this.data.fromY, true) > this.data.killDistance)
            ***REMOVED***
                this.kill();
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (!this.data.bulletManager.bulletBounds.intersects(this))
            ***REMOVED***
                this.kill();
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
    
    if (this.data.rotateToVelocity)
    ***REMOVED***
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    ***REMOVED***

    if (this.data.bulletManager.bulletWorldWrap)
    ***REMOVED***
        this.game.world.wrap(this, this.data.bulletManager.bulletWorldWrapPadding);
    ***REMOVED***

***REMOVED***;
