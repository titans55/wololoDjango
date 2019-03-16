/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The LoadTexture component manages the loading of a texture into the Game Object and the changing of frames.
*
* @class
*/
Phaser.Component.LoadTexture = function () ***REMOVED******REMOVED***;

Phaser.Component.LoadTexture.prototype = ***REMOVED***

    /**
    * @property ***REMOVED***boolean***REMOVED*** customRender - Does this texture require a custom render call? (as set by BitmapData, Video, etc)
    * @private
    */
    customRender: false,

    /**
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** _frame - Internal cache var.
    * @private
    */
    _frame: null,

    /**
    * Changes the base texture the Game Object is using. The old texture is removed and the new one is referenced or fetched from the Cache.
    * 
    * If your Game Object is using a frame from a texture atlas and you just wish to change to another frame, then see the `frame` or `frameName` properties instead.
    * 
    * You should only use `loadTexture` if you want to replace the base texture entirely.
    * 
    * Calling this method causes a WebGL texture update, so use sparingly or in low-intensity portions of your game, or if you know the new texture is already on the GPU.
    *
    * You can use the new const `Phaser.PENDING_ATLAS` as the texture key for any sprite. 
    * Doing this then sets the key to be the `frame` argument (the frame is set to zero). 
    * 
    * This allows you to create sprites using `load.image` during development, and then change them 
    * to use a Texture Atlas later in development by simply searching your code for 'PENDING_ATLAS' 
    * and swapping it to be the key of the atlas data.
    *
    * Note: You cannot use a RenderTexture as a texture for a TileSprite.
    *
    * @method
    * @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture***REMOVED*** key - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache Image entry, or an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
    * @param ***REMOVED***string|number***REMOVED*** [frame] - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
    * @param ***REMOVED***boolean***REMOVED*** [stopAnimation=true] - If an animation is already playing on this Sprite you can choose to stop it or let it carry on playing.
    */
    loadTexture: function (key, frame, stopAnimation) ***REMOVED***

        if (key === Phaser.PENDING_ATLAS)
        ***REMOVED***
            key = frame;
            frame = 0;
        ***REMOVED***
        else
        ***REMOVED***
            frame = frame || 0;
        ***REMOVED***

        if ((stopAnimation || stopAnimation === undefined) && this.animations)
        ***REMOVED***
            this.animations.stop();
        ***REMOVED***

        this.key = key;
        this.customRender = false;
        var cache = this.game.cache;

        var setFrame = true;
        var smoothed = !this.texture.baseTexture.scaleMode;

        if (Phaser.RenderTexture && key instanceof Phaser.RenderTexture)
        ***REMOVED***
            this.key = key.key;
            this.setTexture(key);
        ***REMOVED***
        else if (Phaser.BitmapData && key instanceof Phaser.BitmapData)
        ***REMOVED***
            this.customRender = true;

            this.setTexture(key.texture);

            if (cache.hasFrameData(key.key, Phaser.Cache.BITMAPDATA))
            ***REMOVED***
                setFrame = !this.animations.loadFrameData(cache.getFrameData(key.key, Phaser.Cache.BITMAPDATA), frame);
            ***REMOVED***
            else
            ***REMOVED***
                setFrame = !this.animations.loadFrameData(key.frameData, 0);
            ***REMOVED***
        ***REMOVED***
        else if (Phaser.Video && key instanceof Phaser.Video)
        ***REMOVED***
            this.customRender = true;

            //  This works from a reference, which probably isn't what we need here
            var valid = key.texture.valid;
            this.setTexture(key.texture);
            this.setFrame(key.texture.frame.clone());
            key.onChangeSource.add(this.resizeFrame, this);
            this.texture.valid = valid;
        ***REMOVED***
        else if (Phaser.Tilemap && key instanceof Phaser.TilemapLayer)
        ***REMOVED***
            // this.customRender = true;

            this.setTexture(PIXI.Texture.fromCanvas(key.canvas));
        ***REMOVED***
        else if (key instanceof PIXI.Texture)
        ***REMOVED***
            this.setTexture(key);
        ***REMOVED***
        else
        ***REMOVED***
            var img = cache.getImage(key, true);

            this.key = img.key;
            this.setTexture(new PIXI.Texture(img.base));

            if (key === '__default')
            ***REMOVED***
                this.texture.baseTexture.skipRender = true;
            ***REMOVED***
            else
            ***REMOVED***
                this.texture.baseTexture.skipRender = false;
            ***REMOVED***

            setFrame = !this.animations.loadFrameData(img.frameData, frame);
        ***REMOVED***
        
        if (setFrame)
        ***REMOVED***
            this._frame = Phaser.Rectangle.clone(this.texture.frame);
        ***REMOVED***

        if (!smoothed)
        ***REMOVED***
            this.texture.baseTexture.scaleMode = 1;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets the texture frame the Game Object uses for rendering.
    * 
    * This is primarily an internal method used by `loadTexture`, but is exposed for the use of plugins and custom classes.
    *
    * @method
    * @param ***REMOVED***Phaser.Frame***REMOVED*** frame - The Frame to be used by the texture.
    */
    setFrame: function (frame) ***REMOVED***

        this._frame = frame;

        this.texture.frame.x = frame.x;
        this.texture.frame.y = frame.y;
        this.texture.frame.width = frame.width;
        this.texture.frame.height = frame.height;

        this.texture.crop.x = frame.x;
        this.texture.crop.y = frame.y;
        this.texture.crop.width = frame.width;
        this.texture.crop.height = frame.height;

        if (frame.trimmed)
        ***REMOVED***
            if (this.texture.trim)
            ***REMOVED***
                this.texture.trim.x = frame.spriteSourceSizeX;
                this.texture.trim.y = frame.spriteSourceSizeY;
                this.texture.trim.width = frame.sourceSizeW;
                this.texture.trim.height = frame.sourceSizeH;
            ***REMOVED***
            else
            ***REMOVED***
                this.texture.trim = ***REMOVED*** x: frame.spriteSourceSizeX, y: frame.spriteSourceSizeY, width: frame.sourceSizeW, height: frame.sourceSizeH ***REMOVED***;
            ***REMOVED***

            this.texture.width = frame.sourceSizeW;
            this.texture.height = frame.sourceSizeH;
            this.texture.frame.width = frame.sourceSizeW;
            this.texture.frame.height = frame.sourceSizeH;
        ***REMOVED***
        else if (!frame.trimmed && this.texture.trim)
        ***REMOVED***
            this.texture.trim = null;
        ***REMOVED***

        if (this.cropRect)
        ***REMOVED***
            this.updateCrop();
        ***REMOVED***
        
        this.texture.requiresReTint = true;
        
        this.texture._updateUvs();

        if (this.tilingTexture)
        ***REMOVED***
            this.refreshTexture = true;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Resizes the Frame dimensions that the Game Object uses for rendering.
    * 
    * You shouldn't normally need to ever call this, but in the case of special texture types such as Video or BitmapData
    * it can be useful to adjust the dimensions directly in this way.
    *
    * @method
    * @param ***REMOVED***object***REMOVED*** parent - The parent texture object that caused the resize, i.e. a Phaser.Video object.
    * @param ***REMOVED***integer***REMOVED*** width - The new width of the texture.
    * @param ***REMOVED***integer***REMOVED*** height - The new height of the texture.
    */
    resizeFrame: function (parent, width, height) ***REMOVED***

        this.texture.frame.resize(width, height);
        this.texture.setFrame(this.texture.frame);

    ***REMOVED***,

    /**
    * Resets the texture frame dimensions that the Game Object uses for rendering.
    *
    * @method
    */
    resetFrame: function () ***REMOVED***

        if (this._frame)
        ***REMOVED***
            this.setFrame(this._frame);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Gets or sets the current frame index of the texture being used to render this Game Object.
    *
    * To change the frame set `frame` to the index of the new frame in the sprite sheet you wish this Game Object to use,
    * for example: `player.frame = 4`.
    * 
    * If the frame index given doesn't exist it will revert to the first frame found in the texture.
    * 
    * If you are using a texture atlas then you should use the `frameName` property instead.
    * 
    * If you wish to fully replace the texture being used see `loadTexture`.
    * @property ***REMOVED***integer***REMOVED*** frame
    */
    frame: ***REMOVED***

        get: function () ***REMOVED***
            return this.animations.frame;
        ***REMOVED***,

        set: function (value) ***REMOVED***
            this.animations.frame = value;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Gets or sets the current frame name of the texture being used to render this Game Object.
    * 
    * To change the frame set `frameName` to the name of the new frame in the texture atlas you wish this Game Object to use, 
    * for example: `player.frameName = "idle"`.
    *
    * If the frame name given doesn't exist it will revert to the first frame found in the texture and throw a console warning.
    * 
    * If you are using a sprite sheet then you should use the `frame` property instead.
    * 
    * If you wish to fully replace the texture being used see `loadTexture`.
    * @property ***REMOVED***string***REMOVED*** frameName
    */
    frameName: ***REMOVED***

        get: function () ***REMOVED***
            return this.animations.frameName;
        ***REMOVED***,

        set: function (value) ***REMOVED***
            this.animations.frameName = value;
        ***REMOVED***

    ***REMOVED***

***REMOVED***;
