/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Arcade Physics Tile map collision methods.
*
* @class Phaser.Physics.Arcade.TilemapCollision
* @constructor
*/
Phaser.Physics.Arcade.TilemapCollision = function () ***REMOVED******REMOVED***;

Phaser.Physics.Arcade.TilemapCollision.prototype = ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** TILE_BIAS - A value added to the delta values during collision with tiles. Adjust this if you get tunneling.
    */
    TILE_BIAS: 16,

    /**
    * An internal function. Use Phaser.Physics.Arcade.collide instead.
    *
    * @method Phaser.Physics.Arcade#collideSpriteVsTilemapLayer
    * @private
    * @param ***REMOVED***Phaser.Sprite***REMOVED*** sprite - The sprite to check.
    * @param ***REMOVED***Phaser.TilemapLayer***REMOVED*** tilemapLayer - The layer to check.
    * @param ***REMOVED***function***REMOVED*** collideCallback - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***function***REMOVED*** processCallback - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context in which to run the callbacks.
    * @param ***REMOVED***boolean***REMOVED*** overlapOnly - Just run an overlap or a full collision.
    */
    collideSpriteVsTilemapLayer: function (sprite, tilemapLayer, collideCallback, processCallback, callbackContext, overlapOnly) ***REMOVED***

        if (!sprite.body)
        ***REMOVED***
            return;
        ***REMOVED***

        var mapData = tilemapLayer.getTiles(
            sprite.body.position.x - sprite.body.tilePadding.x,
            sprite.body.position.y - sprite.body.tilePadding.y,
            sprite.body.width + sprite.body.tilePadding.x,
            sprite.body.height + sprite.body.tilePadding.y,
            false, false);

        if (mapData.length === 0)
        ***REMOVED***
            return;
        ***REMOVED***

        for (var i = 0; i < mapData.length; i++)
        ***REMOVED***
            if (processCallback)
            ***REMOVED***
                if (processCallback.call(callbackContext, sprite, mapData[i]))
                ***REMOVED***
                    if (this.separateTile(i, sprite.body, mapData[i], tilemapLayer, overlapOnly))
                    ***REMOVED***
                        this._total++;

                        if (collideCallback)
                        ***REMOVED***
                            collideCallback.call(callbackContext, sprite, mapData[i]);
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                if (this.separateTile(i, sprite.body, mapData[i], tilemapLayer, overlapOnly))
                ***REMOVED***
                    this._total++;

                    if (collideCallback)
                    ***REMOVED***
                        collideCallback.call(callbackContext, sprite, mapData[i]);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * An internal function. Use Phaser.Physics.Arcade.collide instead.
    *
    * @private
    * @method Phaser.Physics.Arcade#collideGroupVsTilemapLayer
    * @param ***REMOVED***Phaser.Group***REMOVED*** group - The Group to check.
    * @param ***REMOVED***Phaser.TilemapLayer***REMOVED*** tilemapLayer - The layer to check.
    * @param ***REMOVED***function***REMOVED*** collideCallback - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***function***REMOVED*** processCallback - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context in which to run the callbacks.
    * @param ***REMOVED***boolean***REMOVED*** overlapOnly - Just run an overlap or a full collision.
    */
    collideGroupVsTilemapLayer: function (group, tilemapLayer, collideCallback, processCallback, callbackContext, overlapOnly) ***REMOVED***

        if (group.length === 0)
        ***REMOVED***
            return;
        ***REMOVED***

        for (var i = 0; i < group.children.length; i++)
        ***REMOVED***
            if (group.children[i].exists)
            ***REMOVED***
                this.collideSpriteVsTilemapLayer(group.children[i], tilemapLayer, collideCallback, processCallback, callbackContext, overlapOnly);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * The core separation function to separate a physics body and a tile.
    *
    * @private
    * @method Phaser.Physics.Arcade#separateTile
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body - The Body object to separate.
    * @param ***REMOVED***Phaser.Tile***REMOVED*** tile - The tile to collide against.
    * @param ***REMOVED***Phaser.TilemapLayer***REMOVED*** tilemapLayer - The tilemapLayer to collide against.
    * @return ***REMOVED***boolean***REMOVED*** Returns true if the body was separated, otherwise false.
    */
    separateTile: function (i, body, tile, tilemapLayer, overlapOnly) ***REMOVED***

        if (!body.enable)
        ***REMOVED***
            return false;
        ***REMOVED***
        
        var tilemapLayerOffsetX = (!tilemapLayer.fixedToCamera) ? tilemapLayer.position.x : 0;
        var tilemapLayerOffsetY = (!tilemapLayer.fixedToCamera) ? tilemapLayer.position.y : 0;

        //  We re-check for collision in case body was separated in a previous step
        if (!tile.intersects((body.position.x - tilemapLayerOffsetX), (body.position.y - tilemapLayerOffsetY), (body.right - tilemapLayerOffsetX), (body.bottom - tilemapLayerOffsetY)))
        ***REMOVED***
            //  no collision so bail out (separated in a previous step)
            return false;
        ***REMOVED***
        else if (overlapOnly)
        ***REMOVED***
            //  There is an overlap, and we don't need to separate. Bail.
            return true;
        ***REMOVED***

        //  They overlap. Any custom callbacks?

        //  A local callback always takes priority over a layer level callback
        if (tile.collisionCallback && !tile.collisionCallback.call(tile.collisionCallbackContext, body.sprite, tile))
        ***REMOVED***
            //  If it returns true then we can carry on, otherwise we should abort.
            return false;
        ***REMOVED***
        else if (typeof tile.layer.callbacks !== 'undefined' && tile.layer.callbacks[tile.index] && !tile.layer.callbacks[tile.index].callback.call(tile.layer.callbacks[tile.index].callbackContext, body.sprite, tile))
        ***REMOVED***
            //  If it returns true then we can carry on, otherwise we should abort.
            return false;
        ***REMOVED***

        //  We don't need to go any further if this tile doesn't actually separate
        if (!tile.faceLeft && !tile.faceRight && !tile.faceTop && !tile.faceBottom)
        ***REMOVED***
            //   This could happen if the tile was meant to be collided with re: a callback, but otherwise isn't needed for separation
            return false;
        ***REMOVED***

        var ox = 0;
        var oy = 0;
        var minX = 0;
        var minY = 1;

        if (body.deltaAbsX() > body.deltaAbsY())
        ***REMOVED***
            //  Moving faster horizontally, check X axis first
            minX = -1;
        ***REMOVED***
        else if (body.deltaAbsX() < body.deltaAbsY())
        ***REMOVED***
            //  Moving faster vertically, check Y axis first
            minY = -1;
        ***REMOVED***

        if (body.deltaX() !== 0 && body.deltaY() !== 0 && (tile.faceLeft || tile.faceRight) && (tile.faceTop || tile.faceBottom))
        ***REMOVED***
            //  We only need do this if both axis have checking faces AND we're moving in both directions
            minX = Math.min(Math.abs((body.position.x - tilemapLayerOffsetX) - tile.right), Math.abs((body.right - tilemapLayerOffsetX) - tile.left));
            minY = Math.min(Math.abs((body.position.y - tilemapLayerOffsetY) - tile.bottom), Math.abs((body.bottom - tilemapLayerOffsetY) - tile.top));
        ***REMOVED***

        if (minX < minY)
        ***REMOVED***
            if (tile.faceLeft || tile.faceRight)
            ***REMOVED***
                ox = this.tileCheckX(body, tile, tilemapLayer);

                //  That's horizontal done, check if we still intersects? If not then we can return now
                if (ox !== 0 && !tile.intersects((body.position.x - tilemapLayerOffsetX), (body.position.y - tilemapLayerOffsetY), (body.right - tilemapLayerOffsetX), (body.bottom - tilemapLayerOffsetY)))
                ***REMOVED***
                    return true;
                ***REMOVED***
            ***REMOVED***

            if (tile.faceTop || tile.faceBottom)
            ***REMOVED***
                oy = this.tileCheckY(body, tile, tilemapLayer);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (tile.faceTop || tile.faceBottom)
            ***REMOVED***
                oy = this.tileCheckY(body, tile, tilemapLayer);

                //  That's vertical done, check if we still intersects? If not then we can return now
                if (oy !== 0 && !tile.intersects((body.position.x - tilemapLayerOffsetX), (body.position.y - tilemapLayerOffsetY), (body.right - tilemapLayerOffsetX), (body.bottom - tilemapLayerOffsetY)))
                ***REMOVED***
                    return true;
                ***REMOVED***
            ***REMOVED***

            if (tile.faceLeft || tile.faceRight)
            ***REMOVED***
                ox = this.tileCheckX(body, tile, tilemapLayer);
            ***REMOVED***
        ***REMOVED***

        return (ox !== 0 || oy !== 0);

    ***REMOVED***,

    /**
    * Check the body against the given tile on the X axis.
    *
    * @private
    * @method Phaser.Physics.Arcade#tileCheckX
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body - The Body object to separate.
    * @param ***REMOVED***Phaser.Tile***REMOVED*** tile - The tile to check.
    * @param ***REMOVED***Phaser.TilemapLayer***REMOVED*** tilemapLayer - The tilemapLayer to collide against.
    * @return ***REMOVED***number***REMOVED*** The amount of separation that occurred.
    */
    tileCheckX: function (body, tile, tilemapLayer) ***REMOVED***

        var ox = 0;
        var tilemapLayerOffsetX = (!tilemapLayer.fixedToCamera) ? tilemapLayer.position.x : 0;

        if (body.deltaX() < 0 && !body.blocked.left && tile.collideRight && body.checkCollision.left)
        ***REMOVED***
            //  Body is moving LEFT
            if (tile.faceRight && (body.x - tilemapLayerOffsetX) < tile.right)
            ***REMOVED***
                ox = (body.x - tilemapLayerOffsetX) - tile.right;

                if (ox < -this.TILE_BIAS)
                ***REMOVED***
                    ox = 0;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else if (body.deltaX() > 0 && !body.blocked.right && tile.collideLeft && body.checkCollision.right)
        ***REMOVED***
            //  Body is moving RIGHT
            if (tile.faceLeft && (body.right - tilemapLayerOffsetX) > tile.left)
            ***REMOVED***
                ox = (body.right - tilemapLayerOffsetX) - tile.left;

                if (ox > this.TILE_BIAS)
                ***REMOVED***
                    ox = 0;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        if (ox !== 0)
        ***REMOVED***
            if (body.customSeparateX)
            ***REMOVED***
                body.overlapX = ox;
            ***REMOVED***
            else
            ***REMOVED***
                this.processTileSeparationX(body, ox);
            ***REMOVED***
        ***REMOVED***

        return ox;

    ***REMOVED***,

    /**
    * Check the body against the given tile on the Y axis.
    *
    * @private
    * @method Phaser.Physics.Arcade#tileCheckY
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body - The Body object to separate.
    * @param ***REMOVED***Phaser.Tile***REMOVED*** tile - The tile to check.
    * @param ***REMOVED***Phaser.TilemapLayer***REMOVED*** tilemapLayer - The tilemapLayer to collide against.
    * @return ***REMOVED***number***REMOVED*** The amount of separation that occurred.
    */
    tileCheckY: function (body, tile, tilemapLayer) ***REMOVED***

        var oy = 0;
        var tilemapLayerOffsetY = (!tilemapLayer.fixedToCamera) ? tilemapLayer.position.y : 0;

        if (body.deltaY() < 0 && !body.blocked.up && tile.collideDown && body.checkCollision.up)
        ***REMOVED***
            //  Body is moving UP
            if (tile.faceBottom && (body.y - tilemapLayerOffsetY) < tile.bottom)
            ***REMOVED***
                oy = (body.y - tilemapLayerOffsetY) - tile.bottom;

                if (oy < -this.TILE_BIAS)
                ***REMOVED***
                    oy = 0;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else if (body.deltaY() > 0 && !body.blocked.down && tile.collideUp && body.checkCollision.down)
        ***REMOVED***
            //  Body is moving DOWN
            if (tile.faceTop && (body.bottom - tilemapLayerOffsetY) > tile.top)
            ***REMOVED***
                oy = (body.bottom - tilemapLayerOffsetY) - tile.top;

                if (oy > this.TILE_BIAS)
                ***REMOVED***
                    oy = 0;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        if (oy !== 0)
        ***REMOVED***
            if (body.customSeparateY)
            ***REMOVED***
                body.overlapY = oy;
            ***REMOVED***
            else
            ***REMOVED***
                this.processTileSeparationY(body, oy);
            ***REMOVED***
        ***REMOVED***

        return oy;

    ***REMOVED***,

    /**
    * Internal function to process the separation of a physics body from a tile.
    *
    * @private
    * @method Phaser.Physics.Arcade#processTileSeparationX
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body - The Body object to separate.
    * @param ***REMOVED***number***REMOVED*** x - The x separation amount.
    */
    processTileSeparationX: function (body, x) ***REMOVED***

        if (x < 0)
        ***REMOVED***
            body.blocked.left = true;
        ***REMOVED***
        else if (x > 0)
        ***REMOVED***
            body.blocked.right = true;
        ***REMOVED***

        body.position.x -= x;

        if (body.bounce.x === 0)
        ***REMOVED***
            body.velocity.x = 0;
        ***REMOVED***
        else
        ***REMOVED***
            body.velocity.x = -body.velocity.x * body.bounce.x;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal function to process the separation of a physics body from a tile.
    *
    * @private
    * @method Phaser.Physics.Arcade#processTileSeparationY
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body - The Body object to separate.
    * @param ***REMOVED***number***REMOVED*** y - The y separation amount.
    */
    processTileSeparationY: function (body, y) ***REMOVED***

        if (y < 0)
        ***REMOVED***
            body.blocked.up = true;
        ***REMOVED***
        else if (y > 0)
        ***REMOVED***
            body.blocked.down = true;
        ***REMOVED***

        body.position.y -= y;

        if (body.bounce.y === 0)
        ***REMOVED***
            body.velocity.y = 0;
        ***REMOVED***
        else
        ***REMOVED***
            body.velocity.y = -body.velocity.y * body.bounce.y;
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

//  Merge this with the Arcade Physics prototype
Phaser.Utils.mixinPrototype(Phaser.Physics.Arcade.prototype, Phaser.Physics.Arcade.TilemapCollision.prototype);
