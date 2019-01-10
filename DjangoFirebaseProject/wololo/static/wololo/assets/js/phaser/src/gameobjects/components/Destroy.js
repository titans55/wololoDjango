/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Destroy component is responsible for destroying a Game Object.
*
* @class
*/
Phaser.Component.Destroy = function () ***REMOVED******REMOVED***;

Phaser.Component.Destroy.prototype = ***REMOVED***

    /**
    * As a Game Object runs through its destroy method this flag is set to true, 
    * and can be checked in any sub-systems or plugins it is being destroyed from.
    * @property ***REMOVED***boolean***REMOVED*** destroyPhase
    * @readOnly
    */
    destroyPhase: false,

    /**
    * Destroys the Game Object. This removes it from its parent group, destroys the input, event and animation handlers if present
    * and nulls its reference to `game`, freeing it up for garbage collection.
    * 
    * If this Game Object has the Events component it will also dispatch the `onDestroy` event.
    *
    * You can optionally also destroy the BaseTexture this Game Object is using. Be careful if you've
    * more than one Game Object sharing the same BaseTexture.
    *
    * @method
    * @param ***REMOVED***boolean***REMOVED*** [destroyChildren=true] - Should every child of this object have its destroy method called as well?
    * @param ***REMOVED***boolean***REMOVED*** [destroyTexture=false] - Destroy the BaseTexture this Game Object is using? Note that if another Game Object is sharing the same BaseTexture it will invalidate it.
    */
    destroy: function (destroyChildren, destroyTexture) ***REMOVED***

        if (this.game === null || this.destroyPhase) ***REMOVED*** return; ***REMOVED***

        if (destroyChildren === undefined) ***REMOVED*** destroyChildren = true; ***REMOVED***
        if (destroyTexture === undefined) ***REMOVED*** destroyTexture = false; ***REMOVED***

        this.destroyPhase = true;

        if (this.events)
        ***REMOVED***
            this.events.onDestroy$dispatch(this);
        ***REMOVED***

        if (this.parent)
        ***REMOVED***
            if (this.parent instanceof Phaser.Group)
            ***REMOVED***
                this.parent.remove(this);
            ***REMOVED***
            else
            ***REMOVED***
                this.parent.removeChild(this);
            ***REMOVED***
        ***REMOVED***

        if (this.input)
        ***REMOVED***
            this.input.destroy();
        ***REMOVED***

        if (this.animations)
        ***REMOVED***
            this.animations.destroy();
        ***REMOVED***

        if (this.body)
        ***REMOVED***
            this.body.destroy();
        ***REMOVED***

        if (this.events)
        ***REMOVED***
            this.events.destroy();
        ***REMOVED***

        this.game.tweens.removeFrom(this);

        var i = this.children.length;

        if (destroyChildren)
        ***REMOVED***
            while (i--)
            ***REMOVED***
                this.children[i].destroy(destroyChildren);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            while (i--)
            ***REMOVED***
                this.removeChild(this.children[i]);
            ***REMOVED***
        ***REMOVED***

        if (this._crop)
        ***REMOVED***
            this._crop = null;
            this.cropRect = null;
        ***REMOVED***

        if (this._frame)
        ***REMOVED***
            this._frame = null;
        ***REMOVED***

        if (Phaser.Video && this.key instanceof Phaser.Video)
        ***REMOVED***
            this.key.onChangeSource.remove(this.resizeFrame, this);
        ***REMOVED***

        if (Phaser.BitmapText && this._glyphs)
        ***REMOVED***
            this._glyphs = [];
        ***REMOVED***

        this.alive = false;
        this.exists = false;
        this.visible = false;

        this.filters = null;
        this.mask = null;
        this.game = null;

        this.data = ***REMOVED******REMOVED***;

        //  In case Pixi is still going to try and render it even though destroyed
        this.renderable = false;

        if (this.transformCallback)
        ***REMOVED***
            this.transformCallback = null;
            this.transformCallbackContext = null;
        ***REMOVED***

        //  Pixi level DisplayObject destroy
        this.hitArea = null;
        this.parent = null;
        this.stage = null;
        this.worldTransform = null;
        this.filterArea = null;
        this._bounds = null;
        this._currentBounds = null;
        this._mask = null;

        this._destroyCachedSprite();

        //  Texture?
        if (destroyTexture)
        ***REMOVED***
            this.texture.destroy(true);
        ***REMOVED***

        this.destroyPhase = false;
        this.pendingDestroy = false;

    ***REMOVED***

***REMOVED***;
