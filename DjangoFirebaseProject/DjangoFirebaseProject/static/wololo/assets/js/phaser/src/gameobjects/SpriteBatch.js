/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The SpriteBatch class is a really fast version of the DisplayObjectContainer built purely for speed, so use when you need a lot of sprites or particles.
* It's worth mentioning that by default sprite batches are used through-out the renderer, so you only really need to use a SpriteBatch if you have over
* 1000 sprites that all share the same texture (or texture atlas). It's also useful if running in Canvas mode and you have a lot of un-rotated or un-scaled
* Sprites as it skips all of the Canvas setTransform calls, which helps performance, especially on mobile devices.
*
* Please note that any Sprite that is part of a SpriteBatch will not have its bounds updated, so will fail checks such as outOfBounds.
*
* @class Phaser.SpriteBatch
* @extends Phaser.Group
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***Phaser.Group|Phaser.Sprite|null***REMOVED*** parent - The parent Group, DisplayObject or DisplayObjectContainer that this Group will be added to. If `undefined` or `null` it will use game.world.
* @param ***REMOVED***string***REMOVED*** [name=group] - A name for this Group. Not used internally but useful for debugging.
* @param ***REMOVED***boolean***REMOVED*** [addToStage=false] - If set to true this Group will be added directly to the Game.Stage instead of Game.World.
*/
Phaser.SpriteBatch = function (game, parent, name, addToStage) ***REMOVED***

    if (parent === undefined || parent === null) ***REMOVED*** parent = game.world; ***REMOVED***

    PIXI.SpriteBatch.call(this);

    Phaser.Group.call(this, game, parent, name, addToStage);

    /**
    * @property ***REMOVED***number***REMOVED*** type - Internal Phaser Type value.
    * @protected
    */
    this.type = Phaser.SPRITEBATCH;

***REMOVED***;

Phaser.SpriteBatch.prototype = Phaser.Utils.extend(true, Phaser.SpriteBatch.prototype, PIXI.SpriteBatch.prototype, Phaser.Group.prototype);

Phaser.SpriteBatch.prototype.constructor = Phaser.SpriteBatch;
