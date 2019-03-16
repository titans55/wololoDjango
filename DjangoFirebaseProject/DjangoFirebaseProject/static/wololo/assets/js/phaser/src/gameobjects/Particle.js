/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Create a new `Particle` object. Particles are extended Sprites that are emitted by a particle emitter such as Phaser.Particles.Arcade.Emitter.
* 
* @class Phaser.Particle
* @constructor
* @extends Phaser.Sprite
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***number***REMOVED*** x - The x coordinate (in world space) to position the Particle at.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate (in world space) to position the Particle at.
* @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture***REMOVED*** key - This is the image or texture used by the Particle during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
* @param ***REMOVED***string|number***REMOVED*** frame - If this Particle is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
*/
Phaser.Particle = function (game, x, y, key, frame) ***REMOVED***

    Phaser.Sprite.call(this, game, x, y, key, frame);

    /**
    * @property ***REMOVED***boolean***REMOVED*** autoScale - If this Particle automatically scales this is set to true by Particle.setScaleData.
    * @protected
    */
    this.autoScale = false;

    /**
    * @property ***REMOVED***array***REMOVED*** scaleData - A reference to the scaleData array owned by the Emitter that emitted this Particle.
    * @protected
    */
    this.scaleData = null;

    /**
    * @property ***REMOVED***number***REMOVED*** _s - Internal cache var for tracking auto scale.
    * @private
    */
    this._s = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** autoAlpha - If this Particle automatically changes alpha this is set to true by Particle.setAlphaData.
    * @protected
    */
    this.autoAlpha = false;

    /**
    * @property ***REMOVED***array***REMOVED*** alphaData - A reference to the alphaData array owned by the Emitter that emitted this Particle.
    * @protected
    */
    this.alphaData = null;

    /**
    * @property ***REMOVED***number***REMOVED*** _a - Internal cache var for tracking auto alpha.
    * @private
    */
    this._a = 0;

***REMOVED***;

Phaser.Particle.prototype = Object.create(Phaser.Sprite.prototype);
Phaser.Particle.prototype.constructor = Phaser.Particle;

/**
* Updates the Particle scale or alpha if autoScale and autoAlpha are set.
*
* @method Phaser.Particle#update
* @memberof Phaser.Particle
*/
Phaser.Particle.prototype.update = function() ***REMOVED***

    if (this.autoScale)
    ***REMOVED***
        this._s--;

        if (this._s)
        ***REMOVED***
            this.scale.set(this.scaleData[this._s].x, this.scaleData[this._s].y);
        ***REMOVED***
        else
        ***REMOVED***
            this.autoScale = false;
        ***REMOVED***
    ***REMOVED***

    if (this.autoAlpha)
    ***REMOVED***
        this._a--;

        if (this._a)
        ***REMOVED***
            this.alpha = this.alphaData[this._a].v;
        ***REMOVED***
        else
        ***REMOVED***
            this.autoAlpha = false;
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* Called by the Emitter when this particle is emitted. Left empty for you to over-ride as required.
*
* @method Phaser.Particle#onEmit
* @memberof Phaser.Particle
*/
Phaser.Particle.prototype.onEmit = function() ***REMOVED***
***REMOVED***;

/**
* Called by the Emitter if autoAlpha has been enabled. Passes over the alpha ease data and resets the alpha counter.
*
* @method Phaser.Particle#setAlphaData
* @memberof Phaser.Particle
*/
Phaser.Particle.prototype.setAlphaData = function(data) ***REMOVED***

    this.alphaData = data;
    this._a = data.length - 1;
    this.alpha = this.alphaData[this._a].v;
    this.autoAlpha = true;

***REMOVED***;

/**
* Called by the Emitter if autoScale has been enabled. Passes over the scale ease data and resets the scale counter.
*
* @method Phaser.Particle#setScaleData
* @memberof Phaser.Particle
*/
Phaser.Particle.prototype.setScaleData = function(data) ***REMOVED***

    this.scaleData = data;
    this._s = data.length - 1;
    this.scale.set(this.scaleData[this._s].x, this.scaleData[this._s].y);
    this.autoScale = true;

***REMOVED***;

/**
* Resets the Particle. This places the Particle at the given x/y world coordinates and then
* sets alive, exists, visible and renderable all to true. Also resets the outOfBounds state and health values.
* If the Particle has a physics body that too is reset.
*
* @method Phaser.Particle#reset
* @memberof Phaser.Particle
* @param ***REMOVED***number***REMOVED*** x - The x coordinate (in world space) to position the Particle at.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate (in world space) to position the Particle at.
* @param ***REMOVED***number***REMOVED*** [health=1] - The health to give the Particle.
* @return ***REMOVED***Phaser.Particle***REMOVED*** This instance.
*/
Phaser.Particle.prototype.reset = function(x, y, health) ***REMOVED***

    Phaser.Component.Reset.prototype.reset.call(this, x, y, health);

    this.alpha = 1;
    this.scale.set(1);

    this.autoScale = false;
    this.autoAlpha = false;

    return this;

***REMOVED***;
