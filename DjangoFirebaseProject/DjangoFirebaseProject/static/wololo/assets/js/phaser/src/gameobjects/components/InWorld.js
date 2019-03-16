/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The InWorld component checks if a Game Object is within the Game World Bounds.
* An object is considered as being "in bounds" so long as its own bounds intersects at any point with the World bounds.
* If the AutoCull component is enabled on the Game Object then it will check the Game Object against the Camera bounds as well.
*
* @class
*/
Phaser.Component.InWorld = function () ***REMOVED******REMOVED***;

/**
 * The InWorld component preUpdate handler.
 * Called automatically by the Game Object.
 *
 * @method
 */
Phaser.Component.InWorld.preUpdate = function () ***REMOVED***

    //  Cache the bounds if we need it
    if (this.autoCull || this.checkWorldBounds)
    ***REMOVED***
        this._bounds.copyFrom(this.getBounds());

        this._bounds.x += this.game.camera.view.x;
        this._bounds.y += this.game.camera.view.y;

        if (this.autoCull)
        ***REMOVED***
            //  Won't get rendered but will still get its transform updated
            if (this.game.world.camera.view.intersects(this._bounds))
            ***REMOVED***
                this.renderable = true;
                this.game.world.camera.totalInView++;
            ***REMOVED***
            else
            ***REMOVED***
                this.renderable = false;

                if (this.outOfCameraBoundsKill)
                ***REMOVED***
                    this.kill();
                    return false;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        if (this.checkWorldBounds)
        ***REMOVED***
            //  The Sprite is already out of the world bounds, so let's check to see if it has come back again
            if (this._outOfBoundsFired && this.game.world.bounds.intersects(this._bounds))
            ***REMOVED***
                this._outOfBoundsFired = false;
                this.events.onEnterBounds$dispatch(this);
            ***REMOVED***
            else if (!this._outOfBoundsFired && !this.game.world.bounds.intersects(this._bounds))
            ***REMOVED***
                //  The Sprite WAS in the screen, but has now left.
                this._outOfBoundsFired = true;
                this.events.onOutOfBounds$dispatch(this);

                if (this.outOfBoundsKill)
                ***REMOVED***
                    this.kill();
                    return false;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return true;

***REMOVED***;

Phaser.Component.InWorld.prototype = ***REMOVED***

    /**
    * If this is set to `true` the Game Object checks if it is within the World bounds each frame. 
    * 
    * When it is no longer intersecting the world bounds it dispatches the `onOutOfBounds` event.
    * 
    * If it was *previously* out of bounds but is now intersecting the world bounds again it dispatches the `onEnterBounds` event.
    * 
    * It also optionally kills the Game Object if `outOfBoundsKill` is `true`.
    * 
    * When `checkWorldBounds` is enabled it forces the Game Object to calculate its full bounds every frame.
    * 
    * This is a relatively expensive operation, especially if enabled on hundreds of Game Objects. So enable it only if you know it's required,
    * or you have tested performance and find it acceptable.
    * 
    * @property ***REMOVED***boolean***REMOVED*** checkWorldBounds
    * @default
    */
    checkWorldBounds: false,

    /**
    * If this and the `checkWorldBounds` property are both set to `true` then the `kill` method is called as soon as `inWorld` returns false.
    * 
    * @property ***REMOVED***boolean***REMOVED*** outOfBoundsKill
    * @default
    */
    outOfBoundsKill: false,

    /**
     * If this and the `autoCull` property are both set to `true`, then the `kill` method
     * is called as soon as the Game Object leaves the camera bounds.
     *
     * @property ***REMOVED***boolean***REMOVED*** outOfCameraBoundsKill
     * @default
     */
    outOfCameraBoundsKill: false,

    /**
    * @property ***REMOVED***boolean***REMOVED*** _outOfBoundsFired - Internal state var.
    * @private
    */
    _outOfBoundsFired: false,

    /**
    * Checks if the Game Objects bounds are within, or intersect at any point with the Game World bounds.
    *
    * @property ***REMOVED***boolean***REMOVED*** inWorld
    * @readonly
    */
    inWorld: ***REMOVED***

        get: function () ***REMOVED***

            return this.game.world.bounds.intersects(this.getBounds());

        ***REMOVED***

    ***REMOVED***

***REMOVED***;
