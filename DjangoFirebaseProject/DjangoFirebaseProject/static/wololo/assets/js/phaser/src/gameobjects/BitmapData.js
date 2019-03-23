/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A BitmapData object contains a Canvas element to which you can draw anything you like via normal Canvas context operations.
* A single BitmapData can be used as the texture for one or many Images / Sprites. 
* So if you need to dynamically create a Sprite texture then they are a good choice.
*
* Important note: Every BitmapData creates its own Canvas element. Because BitmapData's are now Game Objects themselves, and don't
* live on the display list, they are NOT automatically cleared when you change State. Therefore you _must_ call BitmapData.destroy
* in your State's shutdown method if you wish to free-up the resources the BitmapData used, it will not happen for you.
*
* @class Phaser.BitmapData
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***string***REMOVED*** key - Internal Phaser reference key for the BitmapData.
* @param ***REMOVED***number***REMOVED*** [width=256] - The width of the BitmapData in pixels. If undefined or zero it's set to a default value.
* @param ***REMOVED***number***REMOVED*** [height=256] - The height of the BitmapData in pixels. If undefined or zero it's set to a default value.
* @param ***REMOVED***boolean***REMOVED*** [skipPool=false] - When this BitmapData generates its internal canvas to use for rendering, it will get the canvas from the CanvasPool if false, or create its own if true.
*/
Phaser.BitmapData = function (game, key, width, height, skipPool) ***REMOVED***

    if (width === undefined || width === 0) ***REMOVED*** width = 256; ***REMOVED***
    if (height === undefined || height === 0) ***REMOVED*** height = 256; ***REMOVED***
    if (skipPool === undefined) ***REMOVED*** skipPool = false; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***string***REMOVED*** key - The key of the BitmapData in the Cache, if stored there.
    */
    this.key = key;

    /**
    * @property ***REMOVED***number***REMOVED*** width - The width of the BitmapData in pixels.
    */
    this.width = width;

    /**
    * @property ***REMOVED***number***REMOVED*** height - The height of the BitmapData in pixels.
    */
    this.height = height;

    /**
    * @property ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - The canvas to which this BitmapData draws.
    * @default
    */
    this.canvas = Phaser.Canvas.create(this, width, height, null, skipPool);

    /**
    * @property ***REMOVED***CanvasRenderingContext2D***REMOVED*** context - The 2d context of the canvas.
    * @default
    */
    this.context = this.canvas.getContext('2d', ***REMOVED*** alpha: true ***REMOVED***);

    /**
    * @property ***REMOVED***CanvasRenderingContext2D***REMOVED*** ctx - A reference to BitmapData.context.
    */
    this.ctx = this.context;

    /**
    * @property ***REMOVED***string***REMOVED*** smoothProperty - The context property needed for smoothing this Canvas.
    */
    this.smoothProperty = (game.renderType === Phaser.CANVAS) ? game.renderer.renderSession.smoothProperty : Phaser.Canvas.getSmoothingPrefix(this.context);

    /**
    * @property ***REMOVED***ImageData***REMOVED*** imageData - The context image data.
    * Please note that a call to BitmapData.draw() or BitmapData.copy() does not update immediately this property for performance reason. Use BitmapData.update() to do so.
    * This property is updated automatically after the first game loop, according to the dirty flag property.
    */
    this.imageData = this.context.getImageData(0, 0, width, height);

    /**
    * A Uint8ClampedArray view into BitmapData.buffer.
    * Note that this is unavailable in some browsers (such as Epic Browser due to its security restrictions)
    * @property ***REMOVED***Uint8ClampedArray***REMOVED*** data
    */
    this.data = null;

    if (this.imageData)
    ***REMOVED***
        this.data = this.imageData.data;
    ***REMOVED***

    /**
    * @property ***REMOVED***Uint32Array***REMOVED*** pixels - An Uint32Array view into BitmapData.buffer.
    */
    this.pixels = null;

    /**
    * @property ***REMOVED***ArrayBuffer***REMOVED*** buffer - An ArrayBuffer the same size as the context ImageData.
    */
    if (this.data)
    ***REMOVED***
        if (this.imageData.data.buffer)
        ***REMOVED***
            this.buffer = this.imageData.data.buffer;
            this.pixels = new Uint32Array(this.buffer);
        ***REMOVED***
        else
        ***REMOVED***
            if (window['ArrayBuffer'])
            ***REMOVED***
                this.buffer = new ArrayBuffer(this.imageData.data.length);
                this.pixels = new Uint32Array(this.buffer);
            ***REMOVED***
            else
            ***REMOVED***
                this.pixels = this.imageData.data;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    /**
    * @property ***REMOVED***PIXI.BaseTexture***REMOVED*** baseTexture - The PIXI.BaseTexture.
    * @default
    */
    this.baseTexture = new PIXI.BaseTexture(this.canvas);

    /**
    * @property ***REMOVED***PIXI.Texture***REMOVED*** texture - The PIXI.Texture.
    * @default
    */
    this.texture = new PIXI.Texture(this.baseTexture);

    /**
    * @property ***REMOVED***Phaser.FrameData***REMOVED*** frameData - The FrameData container this BitmapData uses for rendering.
    */
    this.frameData = new Phaser.FrameData();

    /**
    * @property ***REMOVED***Phaser.Frame***REMOVED*** textureFrame - The Frame this BitmapData uses for rendering.
    * @default
    */
    this.textureFrame = this.frameData.addFrame(new Phaser.Frame(0, 0, 0, width, height, 'bitmapData'));

    this.texture.frame = this.textureFrame;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @default
    */
    this.type = Phaser.BITMAPDATA;

    /**
    * @property ***REMOVED***boolean***REMOVED*** disableTextureUpload - If disableTextureUpload is true this BitmapData will never send its image data to the GPU when its dirty flag is true.
    */
    this.disableTextureUpload = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** dirty - If dirty this BitmapData will be re-rendered.
    */
    this.dirty = false;

    //  Aliases
    this.cls = this.clear;

    /**
    * @property ***REMOVED***number***REMOVED*** _image - Internal cache var.
    * @private
    */
    this._image = null;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _pos - Internal cache var.
    * @private
    */
    this._pos = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _size - Internal cache var.
    * @private
    */
    this._size = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _scale - Internal cache var.
    * @private
    */
    this._scale = new Phaser.Point();

    /**
    * @property ***REMOVED***number***REMOVED*** _rotate - Internal cache var.
    * @private
    */
    this._rotate = 0;

    /**
    * @property ***REMOVED***object***REMOVED*** _alpha - Internal cache var.
    * @private
    */
    this._alpha = ***REMOVED*** prev: 1, current: 1 ***REMOVED***;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _anchor - Internal cache var.
    * @private
    */
    this._anchor = new Phaser.Point();

    /**
    * @property ***REMOVED***number***REMOVED*** _tempR - Internal cache var.
    * @private
    */
    this._tempR = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _tempG - Internal cache var.
    * @private
    */
    this._tempG = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _tempB - Internal cache var.
    * @private
    */
    this._tempB = 0;

    /**
    * @property ***REMOVED***Phaser.Circle***REMOVED*** _circle - Internal cache var.
    * @private
    */
    this._circle = new Phaser.Circle();

    /**
    * @property ***REMOVED***HTMLCanvasElement***REMOVED*** _swapCanvas - A swap canvas. Used by moveH and moveV, created in those methods.
    * @private
    */
    this._swapCanvas = undefined;

***REMOVED***;

Phaser.BitmapData.prototype = ***REMOVED***

    /**
    * Shifts the contents of this BitmapData by the distances given.
    * 
    * The image will wrap-around the edges on all sides if the wrap argument is true (the default).
    *
    * @method Phaser.BitmapData#move
    * @param ***REMOVED***integer***REMOVED*** x - The amount of pixels to horizontally shift the canvas by. Use a negative value to shift to the left, positive to the right.
    * @param ***REMOVED***integer***REMOVED*** y - The amount of pixels to vertically shift the canvas by. Use a negative value to shift up, positive to shift down.
    * @param ***REMOVED***boolean***REMOVED*** [wrap=true] - Wrap the content of the BitmapData.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    move: function (x, y, wrap) ***REMOVED***

        if (x !== 0)
        ***REMOVED***
            this.moveH(x, wrap);
        ***REMOVED***

        if (y !== 0)
        ***REMOVED***
            this.moveV(y, wrap);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Shifts the contents of this BitmapData horizontally.
    * 
    * The image will wrap-around the sides if the wrap argument is true (the default).
    *
    * @method Phaser.BitmapData#moveH
    * @param ***REMOVED***integer***REMOVED*** distance - The amount of pixels to horizontally shift the canvas by. Use a negative value to shift to the left, positive to the right.
    * @param ***REMOVED***boolean***REMOVED*** [wrap=true] - Wrap the content of the BitmapData.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    moveH: function (distance, wrap) ***REMOVED***

        if (wrap === undefined) ***REMOVED*** wrap = true; ***REMOVED***

        if (this._swapCanvas === undefined)
        ***REMOVED***
            this._swapCanvas = PIXI.CanvasPool.create(this, this.width, this.height);
        ***REMOVED***

        var c = this._swapCanvas;
        var ctx = c.getContext('2d');
        var h = this.height;
        var src = this.canvas;

        ctx.clearRect(0, 0, this.width, this.height);

        if (distance < 0)
        ***REMOVED***
            distance = Math.abs(distance);

            //  Moving to the left
            var w = this.width - distance;

            //  Left-hand chunk
            if (wrap)
            ***REMOVED***
                ctx.drawImage(src, 0, 0, distance, h, w, 0, distance, h);
            ***REMOVED***

            //  Rest of the image
            ctx.drawImage(src, distance, 0, w, h, 0, 0, w, h);
        ***REMOVED***
        else
        ***REMOVED***
            //  Moving to the right
            var w = this.width - distance;

            //  Right-hand chunk
            if (wrap)
            ***REMOVED***
                ctx.drawImage(src, w, 0, distance, h, 0, 0, distance, h);
            ***REMOVED***

            //  Rest of the image
            ctx.drawImage(src, 0, 0, w, h, distance, 0, w, h);
        ***REMOVED***

        this.clear();

        return this.copy(this._swapCanvas);

    ***REMOVED***,

    /**
    * Shifts the contents of this BitmapData vertically.
    * 
    * The image will wrap-around the sides if the wrap argument is true (the default).
    *
    * @method Phaser.BitmapData#moveV
    * @param ***REMOVED***integer***REMOVED*** distance - The amount of pixels to vertically shift the canvas by. Use a negative value to shift up, positive to shift down.
    * @param ***REMOVED***boolean***REMOVED*** [wrap=true] - Wrap the content of the BitmapData.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    moveV: function (distance, wrap) ***REMOVED***

        if (wrap === undefined) ***REMOVED*** wrap = true; ***REMOVED***

        if (this._swapCanvas === undefined)
        ***REMOVED***
            this._swapCanvas = PIXI.CanvasPool.create(this, this.width, this.height);
        ***REMOVED***

        var c = this._swapCanvas;
        var ctx = c.getContext('2d');
        var w = this.width;
        var src = this.canvas;

        ctx.clearRect(0, 0, this.width, this.height);

        if (distance < 0)
        ***REMOVED***
            distance = Math.abs(distance);

            //  Moving up
            var h = this.height - distance;

            //  Top chunk
            if (wrap)
            ***REMOVED***
                ctx.drawImage(src, 0, 0, w, distance, 0, h, w, distance);
            ***REMOVED***

            //  Rest of the image
            ctx.drawImage(src, 0, distance, w, h, 0, 0, w, h);
        ***REMOVED***
        else
        ***REMOVED***
            //  Moving down
            var h = this.height - distance;

            //  Bottom chunk
            if (wrap)
            ***REMOVED***
                ctx.drawImage(src, 0, h, w, distance, 0, 0, w, distance);
            ***REMOVED***

            //  Rest of the image
            ctx.drawImage(src, 0, 0, w, h, 0, distance, w, h);
        ***REMOVED***

        this.clear();

        return this.copy(this._swapCanvas);

    ***REMOVED***,

    /**
    * Updates the given objects so that they use this BitmapData as their texture.
    * This will replace any texture they will currently have set.
    *
    * @method Phaser.BitmapData#add
    * @param ***REMOVED***Phaser.Sprite|Phaser.Sprite[]|Phaser.Image|Phaser.Image[]***REMOVED*** object - Either a single Sprite/Image or an Array of Sprites/Images.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    add: function (object) ***REMOVED***

        if (Array.isArray(object))
        ***REMOVED***
            for (var i = 0; i < object.length; i++)
            ***REMOVED***
                if (object[i]['loadTexture'])
                ***REMOVED***
                    object[i].loadTexture(this);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            object.loadTexture(this);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Takes the given Game Object, resizes this BitmapData to match it and then draws it into this BitmapDatas canvas, ready for further processing.
    * The source game object is not modified by this operation.
    * If the source object uses a texture as part of a Texture Atlas or Sprite Sheet, only the current frame will be used for sizing.
    * If a string is given it will assume it's a cache key and look in Phaser.Cache for an image key matching the string.
    *
    * @method Phaser.BitmapData#load
    * @param ***REMOVED***Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapData|Image|HTMLCanvasElement|string***REMOVED*** source - The object that will be used to populate this BitmapData. If you give a string it will try and find the Image in the Game.Cache first.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    load: function (source) ***REMOVED***

        if (typeof source === 'string')
        ***REMOVED***
            source = this.game.cache.getImage(source);
        ***REMOVED***

        if (source)
        ***REMOVED***
            this.resize(source.width, source.height);
            this.cls();
        ***REMOVED***
        else
        ***REMOVED***
            return;
        ***REMOVED***

        this.draw(source);

        this.update();

        return this;

    ***REMOVED***,

    /**
    * Clears the BitmapData context using a clearRect.
    *
    * @method Phaser.BitmapData#cls
    */

    /**
    * Clears the BitmapData context using a clearRect.
    *
    * You can optionally define the area to clear.
    * If the arguments are left empty it will clear the entire canvas.
    *
    * You may need to call BitmapData.update after this in order to clear out the pixel data, 
    * but Phaser will not do this automatically for you.
    *
    * @method Phaser.BitmapData#clear
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate of the top-left of the area to clear.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate of the top-left of the area to clear.
    * @param ***REMOVED***number***REMOVED*** [width] - The width of the area to clear. If undefined it will use BitmapData.width.
    * @param ***REMOVED***number***REMOVED*** [height] - The height of the area to clear. If undefined it will use BitmapData.height.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    clear: function (x, y, width, height) ***REMOVED***

        if (x === undefined) ***REMOVED*** x = 0; ***REMOVED***
        if (y === undefined) ***REMOVED*** y = 0; ***REMOVED***
        if (width === undefined) ***REMOVED*** width = this.width; ***REMOVED***
        if (height === undefined) ***REMOVED*** height = this.height; ***REMOVED***

        this.context.clearRect(x, y, width, height);

        this.dirty = true;

        return this;

    ***REMOVED***,

    /**
    * Fills the BitmapData with the given color.
    *
    * @method Phaser.BitmapData#fill
    * @param ***REMOVED***number***REMOVED*** r - The red color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** g - The green color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** b - The blue color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** [a=1] - The alpha color value, between 0 and 1.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    fill: function (r, g, b, a) ***REMOVED***

        if (a === undefined) ***REMOVED*** a = 1; ***REMOVED***

        this.context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        this.context.fillRect(0, 0, this.width, this.height);
        this.dirty = true;

        return this;

    ***REMOVED***,

    /**
    * Creates a new Image element by converting this BitmapDatas canvas into a dataURL.
    *
    * The image is then stored in the image Cache using the key given.
    *
    * Finally a PIXI.Texture is created based on the image and returned.
    *
    * You can apply the texture to a sprite or any other supporting object by using either the
    * key or the texture. First call generateTexture:
    *
    * `var texture = bitmapdata.generateTexture('ball');`
    *
    * Then you can either apply the texture to a sprite:
    * 
    * `game.add.sprite(0, 0, texture);`
    *
    * or by using the string based key:
    *
    * `game.add.sprite(0, 0, 'ball');`
    *
    * @method Phaser.BitmapData#generateTexture
    * @param ***REMOVED***string***REMOVED*** key - The key which will be used to store the image in the Cache.
    * @return ***REMOVED***PIXI.Texture***REMOVED*** The newly generated texture.
    */
    generateTexture: function (key) ***REMOVED***

        var image = new Image();

        image.src = this.canvas.toDataURL("image/png");

        var obj = this.game.cache.addImage(key, '', image);

        return new PIXI.Texture(obj.base);

    ***REMOVED***,

    /**
    * Resizes the BitmapData. This changes the size of the underlying canvas and refreshes the buffer.
    *
    * @method Phaser.BitmapData#resize
    * @param ***REMOVED***integer***REMOVED*** width - The new width of the BitmapData.
    * @param ***REMOVED***integer***REMOVED*** height - The new height of the BitmapData.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    resize: function (width, height) ***REMOVED***

        if (width !== this.width || height !== this.height)
        ***REMOVED***
            this.width = width;
            this.height = height;

            this.canvas.width = width;
            this.canvas.height = height;

            if (this._swapCanvas !== undefined)
            ***REMOVED***
                this._swapCanvas.width = width;
                this._swapCanvas.height = height;
            ***REMOVED***

            this.baseTexture.width = width;
            this.baseTexture.height = height;

            this.textureFrame.width = width;
            this.textureFrame.height = height;

            this.texture.width = width;
            this.texture.height = height;

            this.texture.crop.width = width;
            this.texture.crop.height = height;

            this.update();
            this.dirty = true;
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * This re-creates the BitmapData.imageData from the current context.
    * It then re-builds the ArrayBuffer, the data Uint8ClampedArray reference and the pixels Int32Array.
    * If not given the dimensions defaults to the full size of the context.
    *
    * Warning: This is a very expensive operation, so use it sparingly.
    *
    * @method Phaser.BitmapData#update
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate of the top-left of the image data area to grab from.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate of the top-left of the image data area to grab from.
    * @param ***REMOVED***number***REMOVED*** [width=1] - The width of the image data area.
    * @param ***REMOVED***number***REMOVED*** [height=1] - The height of the image data area.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    update: function (x, y, width, height) ***REMOVED***

        if (x === undefined) ***REMOVED*** x = 0; ***REMOVED***
        if (y === undefined) ***REMOVED*** y = 0; ***REMOVED***
        if (width === undefined) ***REMOVED*** width = Math.max(1, this.width); ***REMOVED***
        if (height === undefined) ***REMOVED*** height = Math.max(1, this.height); ***REMOVED***

        this.imageData = this.context.getImageData(x, y, width, height);
        this.data = this.imageData.data;

        if (this.imageData.data.buffer)
        ***REMOVED***
            this.buffer = this.imageData.data.buffer;
            this.pixels = new Uint32Array(this.buffer);
        ***REMOVED***
        else
        ***REMOVED***
            if (window['ArrayBuffer'])
            ***REMOVED***
                this.buffer = new ArrayBuffer(this.imageData.data.length);
                this.pixels = new Uint32Array(this.buffer);
            ***REMOVED***
            else
            ***REMOVED***
                this.pixels = this.imageData.data;
            ***REMOVED***
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Scans through the area specified in this BitmapData and sends a color object for every pixel to the given callback.
    * The callback will be sent a color object with 6 properties: `***REMOVED*** r: number, g: number, b: number, a: number, color: number, rgba: string ***REMOVED***`.
    * Where r, g, b and a are integers between 0 and 255 representing the color component values for red, green, blue and alpha.
    * The `color` property is an Int32 of the full color. Note the endianess of this will change per system.
    * The `rgba` property is a CSS style rgba() string which can be used with context.fillStyle calls, among others.
    * The callback will also be sent the pixels x and y coordinates respectively.
    * The callback must return either `false`, in which case no change will be made to the pixel, or a new color object.
    * If a new color object is returned the pixel will be set to the r, g, b and a color values given within it.
    *
    * @method Phaser.BitmapData#processPixelRGB
    * @param ***REMOVED***function***REMOVED*** callback - The callback that will be sent each pixel color object to be processed.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context under which the callback will be called.
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate of the top-left of the region to process from.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate of the top-left of the region to process from.
    * @param ***REMOVED***number***REMOVED*** [width] - The width of the region to process.
    * @param ***REMOVED***number***REMOVED*** [height] - The height of the region to process.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    processPixelRGB: function (callback, callbackContext, x, y, width, height) ***REMOVED***

        if (x === undefined) ***REMOVED*** x = 0; ***REMOVED***
        if (y === undefined) ***REMOVED*** y = 0; ***REMOVED***
        if (width === undefined) ***REMOVED*** width = this.width; ***REMOVED***
        if (height === undefined) ***REMOVED*** height = this.height; ***REMOVED***

        var w = x + width;
        var h = y + height;
        var pixel = Phaser.Color.createColor();
        var result = ***REMOVED*** r: 0, g: 0, b: 0, a: 0 ***REMOVED***;
        var dirty = false;

        for (var ty = y; ty < h; ty++)
        ***REMOVED***
            for (var tx = x; tx < w; tx++)
            ***REMOVED***
                Phaser.Color.unpackPixel(this.getPixel32(tx, ty), pixel);

                result = callback.call(callbackContext, pixel, tx, ty);

                if (result !== false && result !== null && result !== undefined)
                ***REMOVED***
                    this.setPixel32(tx, ty, result.r, result.g, result.b, result.a, false);
                    dirty = true;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        if (dirty)
        ***REMOVED***
            this.context.putImageData(this.imageData, 0, 0);
            this.dirty = true;
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Scans through the area specified in this BitmapData and sends the color for every pixel to the given callback along with its x and y coordinates.
    * Whatever value the callback returns is set as the new color for that pixel, unless it returns the same color, in which case it's skipped.
    * Note that the format of the color received will be different depending on if the system is big or little endian.
    * It is expected that your callback will deal with endianess. If you'd rather Phaser did it then use processPixelRGB instead.
    * The callback will also be sent the pixels x and y coordinates respectively.
    *
    * @method Phaser.BitmapData#processPixel
    * @param ***REMOVED***function***REMOVED*** callback - The callback that will be sent each pixel color to be processed.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context under which the callback will be called.
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate of the top-left of the region to process from.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate of the top-left of the region to process from.
    * @param ***REMOVED***number***REMOVED*** [width] - The width of the region to process.
    * @param ***REMOVED***number***REMOVED*** [height] - The height of the region to process.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    processPixel: function (callback, callbackContext, x, y, width, height) ***REMOVED***

        if (x === undefined) ***REMOVED*** x = 0; ***REMOVED***
        if (y === undefined) ***REMOVED*** y = 0; ***REMOVED***
        if (width === undefined) ***REMOVED*** width = this.width; ***REMOVED***
        if (height === undefined) ***REMOVED*** height = this.height; ***REMOVED***

        var w = x + width;
        var h = y + height;
        var pixel = 0;
        var result = 0;
        var dirty = false;

        for (var ty = y; ty < h; ty++)
        ***REMOVED***
            for (var tx = x; tx < w; tx++)
            ***REMOVED***
                pixel = this.getPixel32(tx, ty);
                result = callback.call(callbackContext, pixel, tx, ty);

                if (result !== pixel)
                ***REMOVED***
                    this.pixels[ty * this.width + tx] = result;
                    dirty = true;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        if (dirty)
        ***REMOVED***
            this.context.putImageData(this.imageData, 0, 0);
            this.dirty = true;
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Replaces all pixels matching one color with another. The color values are given as two sets of RGBA values.
    * An optional region parameter controls if the replacement happens in just a specific area of the BitmapData or the entire thing. 
    *
    * @method Phaser.BitmapData#replaceRGB
    * @param ***REMOVED***number***REMOVED*** r1 - The red color value to be replaced. Between 0 and 255.
    * @param ***REMOVED***number***REMOVED*** g1 - The green color value to be replaced. Between 0 and 255.
    * @param ***REMOVED***number***REMOVED*** b1 - The blue color value to be replaced. Between 0 and 255.
    * @param ***REMOVED***number***REMOVED*** a1 - The alpha color value to be replaced. Between 0 and 255.
    * @param ***REMOVED***number***REMOVED*** r2 - The red color value that is the replacement color. Between 0 and 255.
    * @param ***REMOVED***number***REMOVED*** g2 - The green color value that is the replacement color. Between 0 and 255.
    * @param ***REMOVED***number***REMOVED*** b2 - The blue color value that is the replacement color. Between 0 and 255.
    * @param ***REMOVED***number***REMOVED*** a2 - The alpha color value that is the replacement color. Between 0 and 255.
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** [region] - The area to perform the search over. If not given it will replace over the whole BitmapData.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    replaceRGB: function (r1, g1, b1, a1, r2, g2, b2, a2, region) ***REMOVED***

        var sx = 0;
        var sy = 0;
        var w = this.width;
        var h = this.height;
        var source = Phaser.Color.packPixel(r1, g1, b1, a1);

        if (region !== undefined && region instanceof Phaser.Rectangle)
        ***REMOVED***
            sx = region.x;
            sy = region.y;
            w = region.width;
            h = region.height;
        ***REMOVED***

        for (var y = 0; y < h; y++)
        ***REMOVED***
            for (var x = 0; x < w; x++)
            ***REMOVED***
                if (this.getPixel32(sx + x, sy + y) === source)
                ***REMOVED***
                    this.setPixel32(sx + x, sy + y, r2, g2, b2, a2, false);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        this.context.putImageData(this.imageData, 0, 0);
        this.dirty = true;

        return this;

    ***REMOVED***,

    /**
    * Sets the hue, saturation and lightness values on every pixel in the given region, or the whole BitmapData if no region was specified.
    *
    * @method Phaser.BitmapData#setHSL
    * @param ***REMOVED***number***REMOVED*** [h=null] - The hue, in the range 0 - 1.
    * @param ***REMOVED***number***REMOVED*** [s=null] - The saturation, in the range 0 - 1.
    * @param ***REMOVED***number***REMOVED*** [l=null] - The lightness, in the range 0 - 1.
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** [region] - The area to perform the operation on. If not given it will run over the whole BitmapData.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    setHSL: function (h, s, l, region) ***REMOVED***
        
        var bHaveH = h || h === 0;
        var bHaveS = s || s === 0;
        var bHaveL = l || l === 0;

        if (!bHaveH && !bHaveS && !bHaveL)
        ***REMOVED***
            return;
        ***REMOVED***

        if (region === undefined)
        ***REMOVED***
            region = new Phaser.Rectangle(0, 0, this.width, this.height);
        ***REMOVED***

        var pixel = Phaser.Color.createColor();

        for (var y = region.y; y < region.bottom; y++)
        ***REMOVED***
            for (var x = region.x; x < region.right; x++)
            ***REMOVED***
                Phaser.Color.unpackPixel(this.getPixel32(x, y), pixel, true);

                if (bHaveH)
                ***REMOVED***
                    pixel.h = h;
                ***REMOVED***

                if (bHaveS)
                ***REMOVED***
                    pixel.s = s;
                ***REMOVED***

                if (bHaveL)
                ***REMOVED***
                    pixel.l = l;
                ***REMOVED***

                Phaser.Color.HSLtoRGB(pixel.h, pixel.s, pixel.l, pixel);
                this.setPixel32(x, y, pixel.r, pixel.g, pixel.b, pixel.a, false);
            ***REMOVED***
        ***REMOVED***

        this.context.putImageData(this.imageData, 0, 0);
        this.dirty = true;

        return this;

    ***REMOVED***,

    /**
    * Shifts any or all of the hue, saturation and lightness values on every pixel in the given region, or the whole BitmapData if no region was specified.
    * Shifting will add the given value onto the current h, s and l values, not replace them.
    * The hue is wrapped to keep it within the range 0 to 1. Saturation and lightness are clamped to not exceed 1.
    *
    * @method Phaser.BitmapData#shiftHSL
    * @param ***REMOVED***number***REMOVED*** [h=null] - The amount to shift the hue by.
    * @param ***REMOVED***number***REMOVED*** [s=null] - The amount to shift the saturation by.
    * @param ***REMOVED***number***REMOVED*** [l=null] - The amount to shift the lightness by.
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** [region] - The area to perform the operation on. If not given it will run over the whole BitmapData.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    shiftHSL: function (h, s, l, region) ***REMOVED***

        if (h === undefined || h === null) ***REMOVED*** h = false; ***REMOVED***
        if (s === undefined || s === null) ***REMOVED*** s = false; ***REMOVED***
        if (l === undefined || l === null) ***REMOVED*** l = false; ***REMOVED***

        if (!h && !s && !l)
        ***REMOVED***
            return;
        ***REMOVED***

        if (region === undefined)
        ***REMOVED***
            region = new Phaser.Rectangle(0, 0, this.width, this.height);
        ***REMOVED***

        var pixel = Phaser.Color.createColor();

        for (var y = region.y; y < region.bottom; y++)
        ***REMOVED***
            for (var x = region.x; x < region.right; x++)
            ***REMOVED***
                Phaser.Color.unpackPixel(this.getPixel32(x, y), pixel, true);

                if (h)
                ***REMOVED***
                    pixel.h = this.game.math.wrap(pixel.h + h, 0, 1);
                ***REMOVED***

                if (s)
                ***REMOVED***
                    pixel.s = this.game.math.clamp(pixel.s + s, 0, 1);
                ***REMOVED***

                if (l)
                ***REMOVED***
                    pixel.l = this.game.math.clamp(pixel.l + l, 0, 1);
                ***REMOVED***

                Phaser.Color.HSLtoRGB(pixel.h, pixel.s, pixel.l, pixel);
                this.setPixel32(x, y, pixel.r, pixel.g, pixel.b, pixel.a, false);
            ***REMOVED***
        ***REMOVED***

        this.context.putImageData(this.imageData, 0, 0);
        this.dirty = true;

        return this;

    ***REMOVED***,

    /**
    * Sets the color of the given pixel to the specified red, green, blue and alpha values.
    *
    * @method Phaser.BitmapData#setPixel32
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
    * @param ***REMOVED***number***REMOVED*** red - The red color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** green - The green color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** blue - The blue color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** alpha - The alpha color value, between 0 and 0xFF (255).
    * @param ***REMOVED***boolean***REMOVED*** [immediate=true] - If `true` the context.putImageData will be called and the dirty flag set.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    setPixel32: function (x, y, red, green, blue, alpha, immediate) ***REMOVED***

        if (immediate === undefined) ***REMOVED*** immediate = true; ***REMOVED***

        if (x >= 0 && x <= this.width && y >= 0 && y <= this.height)
        ***REMOVED***
            if (Phaser.Device.LITTLE_ENDIAN)
            ***REMOVED***
                this.pixels[y * this.width + x] = (alpha << 24) | (blue << 16) | (green << 8) | red;
            ***REMOVED***
            else
            ***REMOVED***
                this.pixels[y * this.width + x] = (red << 24) | (green << 16) | (blue << 8) | alpha;
            ***REMOVED***

            if (immediate)
            ***REMOVED***
                this.context.putImageData(this.imageData, 0, 0);
                this.dirty = true;
            ***REMOVED***
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Sets the color of the given pixel to the specified red, green and blue values.
    *
    * @method Phaser.BitmapData#setPixel
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
    * @param ***REMOVED***number***REMOVED*** red - The red color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** green - The green color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** blue - The blue color value, between 0 and 0xFF (255).
    * @param ***REMOVED***boolean***REMOVED*** [immediate=true] - If `true` the context.putImageData will be called and the dirty flag set.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    setPixel: function (x, y, red, green, blue, immediate) ***REMOVED***

        return this.setPixel32(x, y, red, green, blue, 255, immediate);

    ***REMOVED***,

    /**
    * Get the color of a specific pixel in the context into a color object.
    * If you have drawn anything to the BitmapData since it was created you must call BitmapData.update to refresh the array buffer,
    * otherwise this may return out of date color values, or worse - throw a run-time error as it tries to access an array element that doesn't exist.
    *
    * @method Phaser.BitmapData#getPixel
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
    * @param ***REMOVED***object***REMOVED*** [out] - An object into which 4 properties will be created: r, g, b and a. If not provided a new object will be created.
    * @return ***REMOVED***object***REMOVED*** An object with the red, green, blue and alpha values set in the r, g, b and a properties.
    */
    getPixel: function (x, y, out) ***REMOVED***

        if (!out)
        ***REMOVED***
            out = Phaser.Color.createColor();
        ***REMOVED***

        var index = ~~(x + (y * this.width));

        index *= 4;

        out.r = this.data[index];
        out.g = this.data[++index];
        out.b = this.data[++index];
        out.a = this.data[++index];

        return out;

    ***REMOVED***,

    /**
    * Get the color of a specific pixel including its alpha value.
    * If you have drawn anything to the BitmapData since it was created you must call BitmapData.update to refresh the array buffer,
    * otherwise this may return out of date color values, or worse - throw a run-time error as it tries to access an array element that doesn't exist.
    * Note that on little-endian systems the format is 0xAABBGGRR and on big-endian the format is 0xRRGGBBAA.
    *
    * @method Phaser.BitmapData#getPixel32
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
    * @return ***REMOVED***number***REMOVED*** A native color value integer (format: 0xAARRGGBB)
    */
    getPixel32: function (x, y) ***REMOVED***

        if (x >= 0 && x <= this.width && y >= 0 && y <= this.height)
        ***REMOVED***
            return this.pixels[y * this.width + x];
        ***REMOVED***

    ***REMOVED***,

    /**
    * Get the color of a specific pixel including its alpha value as a color object containing r,g,b,a and rgba properties.
    * If you have drawn anything to the BitmapData since it was created you must call BitmapData.update to refresh the array buffer,
    * otherwise this may return out of date color values, or worse - throw a run-time error as it tries to access an array element that doesn't exist.
    *
    * @method Phaser.BitmapData#getPixelRGB
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
    * @param ***REMOVED***object***REMOVED*** [out] - An object into which 3 properties will be created: r, g and b. If not provided a new object will be created.
    * @param ***REMOVED***boolean***REMOVED*** [hsl=false] - Also convert the rgb values into hsl?
    * @param ***REMOVED***boolean***REMOVED*** [hsv=false] - Also convert the rgb values into hsv?
    * @return ***REMOVED***object***REMOVED*** An object with the red, green and blue values set in the r, g and b properties.
    */
    getPixelRGB: function (x, y, out, hsl, hsv) ***REMOVED***

        return Phaser.Color.unpackPixel(this.getPixel32(x, y), out, hsl, hsv);

    ***REMOVED***,

    /**
    * Gets all the pixels from the region specified by the given Rectangle object.
    *
    * @method Phaser.BitmapData#getPixels
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** rect - The Rectangle region to get.
    * @return ***REMOVED***ImageData***REMOVED*** Returns a ImageData object containing a Uint8ClampedArray data property.
    */
    getPixels: function (rect) ***REMOVED***

        return this.context.getImageData(rect.x, rect.y, rect.width, rect.height);

    ***REMOVED***,

    /**
    * Scans the BitmapData, pixel by pixel, until it encounters a pixel that isn't transparent (i.e. has an alpha value > 0).
    * It then stops scanning and returns an object containing the color of the pixel in r, g and b properties and the location in the x and y properties.
    * 
    * The direction parameter controls from which direction it should start the scan:
    * 
    * 0 = top to bottom
    * 1 = bottom to top
    * 2 = left to right
    * 3 = right to left
    *
    * @method Phaser.BitmapData#getFirstPixel
    * @param ***REMOVED***number***REMOVED*** [direction=0] - The direction in which to scan for the first pixel. 0 = top to bottom, 1 = bottom to top, 2 = left to right and 3 = right to left.
    * @return ***REMOVED***object***REMOVED*** Returns an object containing the color of the pixel in the `r`, `g` and `b` properties and the location in the `x` and `y` properties.
    */
    getFirstPixel: function (direction) ***REMOVED***

        if (direction === undefined) ***REMOVED*** direction = 0; ***REMOVED***

        var pixel = Phaser.Color.createColor();

        var x = 0;
        var y = 0;
        var v = 1;
        var scan = false;

        if (direction === 1)
        ***REMOVED***
            v = -1;
            y = this.height;
        ***REMOVED***
        else if (direction === 3)
        ***REMOVED***
            v = -1;
            x = this.width;
        ***REMOVED***

        do ***REMOVED***

            Phaser.Color.unpackPixel(this.getPixel32(x, y), pixel);

            if (direction === 0 || direction === 1)
            ***REMOVED***
                //  Top to Bottom / Bottom to Top
                x++;

                if (x === this.width)
                ***REMOVED***
                    x = 0;
                    y += v;

                    if (y >= this.height || y <= 0)
                    ***REMOVED***
                        scan = true;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
            else if (direction === 2 || direction === 3)
            ***REMOVED***
                //  Left to Right / Right to Left
                y++;

                if (y === this.height)
                ***REMOVED***
                    y = 0;
                    x += v;

                    if (x >= this.width || x <= 0)
                    ***REMOVED***
                        scan = true;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        while (pixel.a === 0 && !scan);

        pixel.x = x;
        pixel.y = y;

        return pixel;

    ***REMOVED***,

    /**
    * Scans the BitmapData and calculates the bounds. This is a rectangle that defines the extent of all non-transparent pixels.
    * The rectangle returned will extend from the top-left of the image to the bottom-right, excluding transparent pixels.
    *
    * @method Phaser.BitmapData#getBounds
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** [rect] - If provided this Rectangle object will be populated with the bounds, otherwise a new object will be created.
    * @return ***REMOVED***Phaser.Rectangle***REMOVED*** A Rectangle whose dimensions encompass the full extent of non-transparent pixels in this BitmapData.
    */
    getBounds: function (rect) ***REMOVED***

        if (rect === undefined) ***REMOVED*** rect = new Phaser.Rectangle(); ***REMOVED***

        rect.x = this.getFirstPixel(2).x;

        //  If we hit this, there's no point scanning any more, the image is empty
        if (rect.x === this.width)
        ***REMOVED***
            return rect.setTo(0, 0, 0, 0);
        ***REMOVED***

        rect.y = this.getFirstPixel(0).y;
        rect.width = (this.getFirstPixel(3).x - rect.x) + 1;
        rect.height = (this.getFirstPixel(1).y - rect.y) + 1;

        return rect;

    ***REMOVED***,

    /**
    * Creates a new Phaser.Image object, assigns this BitmapData to be its texture, adds it to the world then returns it.
    *
    * @method Phaser.BitmapData#addToWorld
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate to place the Image at.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate to place the Image at.
    * @param ***REMOVED***number***REMOVED*** [anchorX=0] - Set the x anchor point of the Image. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
    * @param ***REMOVED***number***REMOVED*** [anchorY=0] - Set the y anchor point of the Image. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
    * @param ***REMOVED***number***REMOVED*** [scaleX=1] - The horizontal scale factor of the Image. A value of 1 means no scaling. 2 would be twice the size, and so on.
    * @param ***REMOVED***number***REMOVED*** [scaleY=1] - The vertical scale factor of the Image. A value of 1 means no scaling. 2 would be twice the size, and so on.
    * @return ***REMOVED***Phaser.Image***REMOVED*** The newly added Image object.
    */
    addToWorld: function (x, y, anchorX, anchorY, scaleX, scaleY) ***REMOVED***

        scaleX = scaleX || 1;
        scaleY = scaleY || 1;

        var image = this.game.add.image(x, y, this);

        image.anchor.set(anchorX, anchorY);
        image.scale.set(scaleX, scaleY);

        return image;

    ***REMOVED***,

    /**
     * Copies a rectangular area from the source object to this BitmapData. If you give `null` as the source it will copy from itself.
     * 
     * You can optionally resize, translate, rotate, scale, alpha or blend as it's drawn.
     * 
     * All rotation, scaling and drawing takes place around the regions center point by default, but can be changed with the anchor parameters.
     * 
     * Note that the source image can also be this BitmapData, which can create some interesting effects.
     * 
     * This method has a lot of parameters for maximum control.
     * You can use the more friendly methods like `copyRect` and `draw` to avoid having to remember them all.
     * 
     * You may prefer to use `copyTransform` if you're simply trying to draw a Sprite to this BitmapData,
     * and don't wish to translate, scale or rotate it from its original values.
     *
     * @method Phaser.BitmapData#copy
     * @param ***REMOVED***Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapData|Phaser.RenderTexture|Image|HTMLCanvasElement|string***REMOVED*** [source] - The source to copy from. If you give a string it will try and find the Image in the Game.Cache first. This is quite expensive so try to provide the image itself.
     * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate representing the top-left of the region to copy from the source image.
     * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate representing the top-left of the region to copy from the source image.
     * @param ***REMOVED***number***REMOVED*** [width] - The width of the region to copy from the source image. If not specified it will use the full source image width.
     * @param ***REMOVED***number***REMOVED*** [height] - The height of the region to copy from the source image. If not specified it will use the full source image height.
     * @param ***REMOVED***number***REMOVED*** [tx] - The x coordinate to translate to before drawing. If not specified it will default to the `x` parameter. If `null` and `source` is a Display Object, it will default to `source.x`.
     * @param ***REMOVED***number***REMOVED*** [ty] - The y coordinate to translate to before drawing. If not specified it will default to the `y` parameter. If `null` and `source` is a Display Object, it will default to `source.y`.
     * @param ***REMOVED***number***REMOVED*** [newWidth] - The new width of the block being copied. If not specified it will default to the `width` parameter.
     * @param ***REMOVED***number***REMOVED*** [newHeight] - The new height of the block being copied. If not specified it will default to the `height` parameter.
     * @param ***REMOVED***number***REMOVED*** [rotate=0] - The angle in radians to rotate the block to before drawing. Rotation takes place around the center by default, but can be changed with the `anchor` parameters.
     * @param ***REMOVED***number***REMOVED*** [anchorX=0] - The anchor point around which the block is rotated and scaled. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
     * @param ***REMOVED***number***REMOVED*** [anchorY=0] - The anchor point around which the block is rotated and scaled. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
     * @param ***REMOVED***number***REMOVED*** [scaleX=1] - The horizontal scale factor of the block. A value of 1 means no scaling. 2 would be twice the size, and so on.
     * @param ***REMOVED***number***REMOVED*** [scaleY=1] - The vertical scale factor of the block. A value of 1 means no scaling. 2 would be twice the size, and so on.
     * @param ***REMOVED***number***REMOVED*** [alpha=1] - The alpha that will be set on the context before drawing. A value between 0 (fully transparent) and 1, opaque.
     * @param ***REMOVED***string***REMOVED*** [blendMode=null] - The composite blend mode that will be used when drawing. The default is no blend mode at all. This is a Canvas globalCompositeOperation value such as 'lighter' or 'xor'.
     * @param ***REMOVED***boolean***REMOVED*** [roundPx=false] - Should the x and y values be rounded to integers before drawing? This prevents anti-aliasing in some instances.
     * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
     */
    copy: function (source, x, y, width, height, tx, ty, newWidth, newHeight, rotate, anchorX, anchorY, scaleX, scaleY, alpha, blendMode, roundPx) ***REMOVED***

        if (source === undefined || source === null) ***REMOVED*** source = this; ***REMOVED***

        if (source instanceof Phaser.RenderTexture || source instanceof PIXI.RenderTexture)
        ***REMOVED***
            source = source.getCanvas();
        ***REMOVED***

        this._image = source;

        if (source instanceof Phaser.Sprite || source instanceof Phaser.Image || source instanceof Phaser.Text || source instanceof PIXI.Sprite)
        ***REMOVED***
            //  Copy over sprite values
            this._pos.set(source.texture.crop.x, source.texture.crop.y);
            this._size.set(source.texture.crop.width, source.texture.crop.height);
            this._scale.set(source.scale.x, source.scale.y);
            this._anchor.set(source.anchor.x, source.anchor.y);
            this._rotate = source.rotation;
            this._alpha.current = source.alpha;

            if (source.texture instanceof Phaser.RenderTexture || source.texture instanceof PIXI.RenderTexture)
            ***REMOVED***
                this._image = source.texture.getCanvas();
            ***REMOVED***
            else
            ***REMOVED***
                this._image = source.texture.baseTexture.source;
            ***REMOVED***

            if (tx === undefined || tx === null) ***REMOVED*** tx = source.x; ***REMOVED***
            if (ty === undefined || ty === null) ***REMOVED*** ty = source.y; ***REMOVED***

            if (source.texture.trim)
            ***REMOVED***
                //  Offset the translation coordinates by the trim amount
                tx += source.texture.trim.x - source.anchor.x * source.texture.trim.width;
                ty += source.texture.trim.y - source.anchor.y * source.texture.trim.height;
            ***REMOVED***

            if (source.tint !== 0xFFFFFF)
            ***REMOVED***
                if (source.cachedTint !== source.tint)
                ***REMOVED***
                    source.cachedTint = source.tint;
                    source.tintedTexture = PIXI.CanvasTinter.getTintedTexture(source, source.tint);
                ***REMOVED***

                this._image = source.tintedTexture;
                this._pos.set(0);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  Reset
            this._pos.set(0);
            this._scale.set(1);
            this._anchor.set(0);
            this._rotate = 0;
            this._alpha.current = 1;

            if (source instanceof Phaser.BitmapData)
            ***REMOVED***
                this._image = source.canvas;
            ***REMOVED***
            else if (typeof source === 'string')
            ***REMOVED***
                source = this.game.cache.getImage(source);

                if (source === null)
                ***REMOVED***
                    return;
                ***REMOVED***
                else
                ***REMOVED***
                    this._image = source;
                ***REMOVED***
            ***REMOVED***

            this._size.set(this._image.width, this._image.height);
        ***REMOVED***

        //  The source region to copy from
        if (x === undefined || x === null) ***REMOVED*** x = 0; ***REMOVED***
        if (y === undefined || y === null) ***REMOVED*** y = 0; ***REMOVED***

        //  If they set a width/height then we override the frame values with them
        if (width)
        ***REMOVED***
            this._size.x = width;
        ***REMOVED***

        if (height)
        ***REMOVED***
            this._size.y = height;
        ***REMOVED***

        //  The destination region to copy to
        if (tx === undefined || tx === null) ***REMOVED*** tx = x; ***REMOVED***
        if (ty === undefined || ty === null) ***REMOVED*** ty = y; ***REMOVED***
        if (newWidth === undefined || newWidth === null) ***REMOVED*** newWidth = this._size.x; ***REMOVED***
        if (newHeight === undefined || newHeight === null) ***REMOVED*** newHeight = this._size.y; ***REMOVED***

        //  Rotation - if set this will override any potential Sprite value
        if (typeof rotate === 'number')
        ***REMOVED***
            this._rotate = rotate;
        ***REMOVED***

        //  Anchor - if set this will override any potential Sprite value
        if (typeof anchorX === 'number')
        ***REMOVED***
            this._anchor.x = anchorX;
        ***REMOVED***

        if (typeof anchorY === 'number')
        ***REMOVED***
            this._anchor.y = anchorY;
        ***REMOVED***

        //  Scaling - if set this will override any potential Sprite value
        if (typeof scaleX === 'number')
        ***REMOVED***
            this._scale.x = scaleX;
        ***REMOVED***

        if (typeof scaleY === 'number')
        ***REMOVED***
            this._scale.y = scaleY;
        ***REMOVED***

        //  Effects
        if (typeof alpha === 'number')
        ***REMOVED***
            this._alpha.current = alpha;
        ***REMOVED***

        if (blendMode === undefined) ***REMOVED*** blendMode = null; ***REMOVED***
        if (roundPx === undefined) ***REMOVED*** roundPx = false; ***REMOVED***

        if (this._alpha.current <= 0 || this._scale.x === 0 || this._scale.y === 0 || this._size.x === 0 || this._size.y === 0)
        ***REMOVED***
            //  Why bother wasting CPU cycles drawing something you can't see?
            return;
        ***REMOVED***

        var ctx = this.context;

        this._alpha.prev = ctx.globalAlpha;

        ctx.save();

        ctx.globalAlpha = this._alpha.current;

        if (blendMode)
        ***REMOVED***
            this.op = blendMode;
        ***REMOVED***

        if (roundPx)
        ***REMOVED***
            tx |= 0;
            ty |= 0;
        ***REMOVED***

        //  Doesn't work fully with children, or nested scale + rotation transforms (see copyTransform)
        ctx.translate(tx, ty);

        ctx.scale(this._scale.x, this._scale.y);

        ctx.rotate(this._rotate);

        ctx.drawImage(this._image, this._pos.x + x, this._pos.y + y, this._size.x, this._size.y, -newWidth * this._anchor.x, -newHeight * this._anchor.y, newWidth, newHeight);

        //  Carry on ...

        ctx.restore();

        ctx.globalAlpha = this._alpha.prev;

        this.dirty = true;

        return this;

    ***REMOVED***,

    /**
    * Draws the given `source` Game Object to this BitmapData, using its `worldTransform` property to set the
    * position, scale and rotation of where it is drawn. This function is used internally by `drawGroup`.
    * It takes the objects tint and scale mode into consideration before drawing.
    *
    * You can optionally specify Blend Mode and Round Pixels arguments.
    * 
    * @method Phaser.BitmapData#copyTransform
    * @param ***REMOVED***Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapData|Phaser.BitmapText***REMOVED*** [source] - The Game Object to draw.
    * @param ***REMOVED***string***REMOVED*** [blendMode=null] - The composite blend mode that will be used when drawing. The default is no blend mode at all. This is a Canvas globalCompositeOperation value such as 'lighter' or 'xor'.
    * @param ***REMOVED***boolean***REMOVED*** [roundPx=false] - Should the x and y values be rounded to integers before drawing? This prevents anti-aliasing in some instances.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    copyTransform: function (source, blendMode, roundPx) ***REMOVED***

        if (blendMode === undefined) ***REMOVED*** blendMode = null; ***REMOVED***
        if (roundPx === undefined) ***REMOVED*** roundPx = false; ***REMOVED***

        if (!source.hasOwnProperty('worldTransform') || !source.worldVisible || source.worldAlpha === 0)
        ***REMOVED***
            return this;
        ***REMOVED***

        var wt = source.worldTransform;

        this._pos.set(source.texture.crop.x, source.texture.crop.y);
        this._size.set(source.texture.crop.width, source.texture.crop.height);

        if (wt.a === 0 || wt.d === 0 || this._size.x === 0 || this._size.y === 0)
        ***REMOVED***
             // Why bother wasting CPU cycles drawing something you can't see?
            return this;
        ***REMOVED***

        if (source.texture instanceof Phaser.RenderTexture || source.texture instanceof PIXI.RenderTexture)
        ***REMOVED***
            this._image = source.texture.getCanvas();
        ***REMOVED***
        else
        ***REMOVED***
            this._image = source.texture.baseTexture.source;
        ***REMOVED***

        var tx = wt.tx;
        var ty = wt.ty;

        if (source.texture.trim)
        ***REMOVED***
            //  Offset the translation coordinates by the trim amount
            tx += source.texture.trim.x - source.anchor.x * source.texture.trim.width;
            ty += source.texture.trim.y - source.anchor.y * source.texture.trim.height;
        ***REMOVED***

        if (source.tint !== 0xFFFFFF)
        ***REMOVED***
            if (source.cachedTint !== source.tint)
            ***REMOVED***
                source.cachedTint = source.tint;
                source.tintedTexture = PIXI.CanvasTinter.getTintedTexture(source, source.tint);
            ***REMOVED***

            this._image = source.tintedTexture;
            this._pos.set(0);
        ***REMOVED***

        if (roundPx)
        ***REMOVED***
            tx |= 0;
            ty |= 0;
        ***REMOVED***

        var ctx = this.context;

        this._alpha.prev = ctx.globalAlpha;

        ctx.save();

        ctx.globalAlpha = this._alpha.current;

        if (blendMode)
        ***REMOVED***
            this.op = blendMode;
        ***REMOVED***

        ctx[this.smoothProperty] = (source.texture.baseTexture.scaleMode === PIXI.scaleModes.LINEAR);

        ctx.setTransform(wt.a, wt.b, wt.c, wt.d, tx, ty);

        ctx.drawImage(this._image,
            this._pos.x,
            this._pos.y,
            this._size.x,
            this._size.y,
            -this._size.x * source.anchor.x,
            -this._size.y * source.anchor.y,
            this._size.x,
            this._size.y);

        ctx.restore();

        ctx.globalAlpha = this._alpha.prev;

        this.dirty = true;

        return this;

    ***REMOVED***,

    /**
    * Copies the area defined by the Rectangle parameter from the source image to this BitmapData at the given location.
    *
    * @method Phaser.BitmapData#copyRect
    * @param ***REMOVED***Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapData|Phaser.RenderTexture|Image|string***REMOVED*** source - The Image to copy from. If you give a string it will try and find the Image in the Game.Cache.
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** area - The Rectangle region to copy from the source image.
    * @param ***REMOVED***number***REMOVED*** x - The destination x coordinate to copy the image to.
    * @param ***REMOVED***number***REMOVED*** y - The destination y coordinate to copy the image to.
    * @param ***REMOVED***number***REMOVED*** [alpha=1] - The alpha that will be set on the context before drawing. A value between 0 (fully transparent) and 1, opaque.
    * @param ***REMOVED***string***REMOVED*** [blendMode=null] - The composite blend mode that will be used when drawing. The default is no blend mode at all. This is a Canvas globalCompositeOperation value such as 'lighter' or 'xor'.
    * @param ***REMOVED***boolean***REMOVED*** [roundPx=false] - Should the x and y values be rounded to integers before drawing? This prevents anti-aliasing in some instances.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    copyRect: function (source, area, x, y, alpha, blendMode, roundPx) ***REMOVED***

        return this.copy(source, area.x, area.y, area.width, area.height, x, y, area.width, area.height, 0, 0, 0, 1, 1, alpha, blendMode, roundPx);

    ***REMOVED***,

    /**
    * Draws the given Phaser.Sprite, Phaser.Image or Phaser.Text to this BitmapData at the coordinates specified.
    * You can use the optional width and height values to 'stretch' the sprite as it is drawn. This uses drawImage stretching, not scaling.
    * 
    * The children will be drawn at their `x` and `y` world space coordinates. If this is outside the bounds of the BitmapData they won't be visible.
    * When drawing it will take into account the rotation, scale, scaleMode, alpha and tint values.
    * 
    * Note: You should ensure that at least 1 full update has taken place before calling this, 
    * otherwise the objects are likely to render incorrectly, if at all.
    * You can trigger an update yourself by calling `stage.updateTransform()` before calling `draw`.
    *
    * @method Phaser.BitmapData#draw
    * @param ***REMOVED***Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.RenderTexture***REMOVED*** source - The Sprite, Image or Text object to draw onto this BitmapData.
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate to translate to before drawing. If not specified it will default to `source.x`.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate to translate to before drawing. If not specified it will default to `source.y`.
    * @param ***REMOVED***number***REMOVED*** [width] - The new width of the Sprite being copied. If not specified it will default to `source.width`.
    * @param ***REMOVED***number***REMOVED*** [height] - The new height of the Sprite being copied. If not specified it will default to `source.height`.
    * @param ***REMOVED***string***REMOVED*** [blendMode=null] - The composite blend mode that will be used when drawing. The default is no blend mode at all. This is a Canvas globalCompositeOperation value such as 'lighter' or 'xor'.
    * @param ***REMOVED***boolean***REMOVED*** [roundPx=false] - Should the x and y values be rounded to integers before drawing? This prevents anti-aliasing in some instances.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    draw: function (source, x, y, width, height, blendMode, roundPx) ***REMOVED***

        //  By specifying null for most parameters it will tell `copy` to use the Sprite values instead, which is what we want here
        return this.copy(source, null, null, null, null, x, y, width, height, null, null, null, null, null, null, blendMode, roundPx);

    ***REMOVED***,

    /**
    * Draws the immediate children of a Phaser.Group to this BitmapData.
    * 
    * It's perfectly valid to pass in `game.world` as the Group, and it will iterate through the entire display list.
    * 
    * Children are drawn _only_ if they have their `exists` property set to `true`, and have image, or RenderTexture, based Textures.
    * 
    * The children will be drawn at their `x` and `y` world space coordinates. If this is outside the bounds of the BitmapData they won't be visible.
    * When drawing it will take into account the rotation, scale, scaleMode, alpha and tint values.
    * 
    * Note: You should ensure that at least 1 full update has taken place before calling this, 
    * otherwise the objects are likely to render incorrectly, if at all.
    * You can trigger an update yourself by calling `stage.updateTransform()` before calling `drawGroup`.
    *
    * @method Phaser.BitmapData#drawGroup
    * @param ***REMOVED***Phaser.Group***REMOVED*** group - The Group to draw onto this BitmapData. Can also be Phaser.World.
    * @param ***REMOVED***string***REMOVED*** [blendMode=null] - The composite blend mode that will be used when drawing. The default is no blend mode at all. This is a Canvas globalCompositeOperation value such as 'lighter' or 'xor'.
    * @param ***REMOVED***boolean***REMOVED*** [roundPx=false] - Should the x and y values be rounded to integers before drawing? This prevents anti-aliasing in some instances.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    drawGroup: function (group, blendMode, roundPx) ***REMOVED***

        if (group.total > 0)
        ***REMOVED***
            group.forEachExists(this.drawGroupProxy, this, blendMode, roundPx);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * A proxy for drawGroup that handles child iteration for more complex Game Objects.
    * 
    * @method Phaser.BitmapData#drawGroupProxy
    * @private
    * @param ***REMOVED***Phaser.Sprite|Phaser.Image|Phaser.BitmapText***REMOVED*** child - The child to draw.
    * @param ***REMOVED***string***REMOVED*** [blendMode=null] - The composite blend mode that will be used when drawing. The default is no blend mode at all. This is a Canvas globalCompositeOperation value such as 'lighter' or 'xor'.
    * @param ***REMOVED***boolean***REMOVED*** [roundPx=false] - Should the x and y values be rounded to integers before drawing? This prevents anti-aliasing in some instances.
    */
    drawGroupProxy: function (child, blendMode, roundPx) ***REMOVED***

        if (child.hasOwnProperty('texture'))
        ***REMOVED***
            this.copyTransform(child, blendMode, roundPx);
        ***REMOVED***

        if (child.type === Phaser.GROUP && child.exists)
        ***REMOVED***
            this.drawGroup(child, blendMode, roundPx);
        ***REMOVED***
        else
        ***REMOVED***
            if (child.hasOwnProperty('children') && child.children.length > 0)
            ***REMOVED***
                for (var i = 0; i < child.children.length; i++)
                ***REMOVED***
                    if (child.children[i].exists)
                    ***REMOVED***
                        this.copyTransform(child.children[i], blendMode, roundPx);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Draws the Game Object or Group to this BitmapData and then recursively iterates through all of its children.
    * 
    * If a child has an `exists` property then it (and its children) will be only be drawn if exists is `true`.
    * 
    * The children will be drawn at their `x` and `y` world space coordinates. If this is outside the bounds of the BitmapData 
    * they won't be drawn. Depending on your requirements you may need to resize the BitmapData in advance to match the 
    * bounds of the top-level Game Object.
    * 
    * When drawing it will take into account the child's world rotation, scale and alpha values.
    *
    * It's perfectly valid to pass in `game.world` as the parent object, and it will iterate through the entire display list.
    * 
    * Note: If you are trying to grab your entire game at the start of a State then you should ensure that at least 1 full update
    * has taken place before doing so, otherwise all of the objects will render with incorrect positions and scales. You can 
    * trigger an update yourself by calling `stage.updateTransform()` before calling `drawFull`.
    *
    * @method Phaser.BitmapData#drawFull
    * @param ***REMOVED***Phaser.World|Phaser.Group|Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapText***REMOVED*** parent - The Game Object to draw onto this BitmapData and then recursively draw all of its children.
    * @param ***REMOVED***string***REMOVED*** [blendMode=null] - The composite blend mode that will be used when drawing. The default is no blend mode at all. This is a Canvas globalCompositeOperation value such as 'lighter' or 'xor'.
    * @param ***REMOVED***boolean***REMOVED*** [roundPx=false] - Should the x and y values be rounded to integers before drawing? This prevents anti-aliasing in some instances.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    drawFull: function (parent, blendMode, roundPx) ***REMOVED***

        if (parent.worldVisible === false || parent.worldAlpha === 0 || (parent.hasOwnProperty('exists') && parent.exists === false))
        ***REMOVED***
            return this;
        ***REMOVED***

        if (parent.type !== Phaser.GROUP && parent.type !== Phaser.EMITTER && parent.type !== Phaser.BITMAPTEXT)
        ***REMOVED***
            if (parent.type === Phaser.GRAPHICS)
            ***REMOVED***
                var bounds = parent.getBounds();
                this.ctx.save();
                this.ctx.translate(bounds.x, bounds.y);
                PIXI.CanvasGraphics.renderGraphics(parent, this.ctx);
                this.ctx.restore();
            ***REMOVED***
            else
            ***REMOVED***
                this.copy(parent, null, null, null, null, parent.worldPosition.x, parent.worldPosition.y, null, null, parent.worldRotation, null, null, parent.worldScale.x, parent.worldScale.y, parent.worldAlpha, blendMode, roundPx);
            ***REMOVED***
        ***REMOVED***

        if (parent.children)
        ***REMOVED***
            for (var i = 0; i < parent.children.length; i++)
            ***REMOVED***
                this.drawFull(parent.children[i], blendMode, roundPx);
            ***REMOVED***
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Sets the shadow properties of this BitmapDatas context which will affect all draw operations made to it.
    * You can cancel an existing shadow by calling this method and passing no parameters.
    * Note: At the time of writing (October 2014) Chrome still doesn't support shadowBlur used with drawImage.
    *
    * @method Phaser.BitmapData#shadow
    * @param ***REMOVED***string***REMOVED*** color - The color of the shadow, given in a CSS format, i.e. `#000000` or `rgba(0,0,0,1)`. If `null` or `undefined` the shadow will be reset.
    * @param ***REMOVED***number***REMOVED*** [blur=5] - The amount the shadow will be blurred by. Low values = a crisp shadow, high values = a softer shadow.
    * @param ***REMOVED***number***REMOVED*** [x=10] - The horizontal offset of the shadow in pixels.
    * @param ***REMOVED***number***REMOVED*** [y=10] - The vertical offset of the shadow in pixels.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    shadow: function (color, blur, x, y) ***REMOVED***

        var ctx = this.context;

        if (color === undefined || color === null)
        ***REMOVED***
            ctx.shadowColor = 'rgba(0,0,0,0)';
        ***REMOVED***
        else
        ***REMOVED***
            ctx.shadowColor = color;
            ctx.shadowBlur = blur || 5;
            ctx.shadowOffsetX = x || 10;
            ctx.shadowOffsetY = y || 10;
        ***REMOVED***
        
        return this;

    ***REMOVED***,

    /**
    * Draws the image onto this BitmapData using an image as an alpha mask.
    *
    * @method Phaser.BitmapData#alphaMask
    * @param ***REMOVED***Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapData|Image|HTMLCanvasElement|string***REMOVED*** source - The source to copy from. If you give a string it will try and find the Image in the Game.Cache first. This is quite expensive so try to provide the image itself.
    * @param ***REMOVED***Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapData|Image|HTMLCanvasElement|string***REMOVED*** [mask] - The object to be used as the mask. If you give a string it will try and find the Image in the Game.Cache first. This is quite expensive so try to provide the image itself. If you don't provide a mask it will use this BitmapData as the mask.
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** [sourceRect] - A Rectangle where x/y define the coordinates to draw the Source image to and width/height define the size.
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** [maskRect] - A Rectangle where x/y define the coordinates to draw the Mask image to and width/height define the size.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    alphaMask: function (source, mask, sourceRect, maskRect) ***REMOVED***

        if (maskRect === undefined || maskRect === null)
        ***REMOVED***
            this.draw(mask).blendSourceAtop();
        ***REMOVED***
        else
        ***REMOVED***
            this.draw(mask, maskRect.x, maskRect.y, maskRect.width, maskRect.height).blendSourceAtop();
        ***REMOVED***

        if (sourceRect === undefined || sourceRect === null)
        ***REMOVED***
            this.draw(source).blendReset();
        ***REMOVED***
        else
        ***REMOVED***
            this.draw(source, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height).blendReset();
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Scans this BitmapData for all pixels matching the given r,g,b values and then draws them into the given destination BitmapData.
    * The original BitmapData remains unchanged.
    * The destination BitmapData must be large enough to receive all of the pixels that are scanned unless the 'resize' parameter is true.
    * Although the destination BitmapData is returned from this method, it's actually modified directly in place, meaning this call is perfectly valid:
    * `picture.extract(mask, r, g, b)`
    * You can specify optional r2, g2, b2 color values. If given the pixel written to the destination bitmap will be of the r2, g2, b2 color.
    * If not given it will be written as the same color it was extracted. You can provide one or more alternative colors, allowing you to tint
    * the color during extraction.
    *
    * @method Phaser.BitmapData#extract
    * @param ***REMOVED***Phaser.BitmapData***REMOVED*** destination - The BitmapData that the extracted pixels will be drawn to.
    * @param ***REMOVED***number***REMOVED*** r - The red color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** g - The green color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** b - The blue color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** [a=255] - The alpha color component, in the range 0 - 255 that the new pixel will be drawn at.
    * @param ***REMOVED***boolean***REMOVED*** [resize=false] - Should the destination BitmapData be resized to match this one before the pixels are copied?
    * @param ***REMOVED***number***REMOVED*** [r2] - An alternative red color component to be written to the destination, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** [g2] - An alternative green color component to be written to the destination, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** [b2] - An alternative blue color component to be written to the destination, in the range 0 - 255.
    * @returns ***REMOVED***Phaser.BitmapData***REMOVED*** The BitmapData that the extract pixels were drawn on.
    */
    extract: function (destination, r, g, b, a, resize, r2, g2, b2) ***REMOVED***

        if (a === undefined) ***REMOVED*** a = 255; ***REMOVED***
        if (resize === undefined) ***REMOVED*** resize = false; ***REMOVED***
        if (r2 === undefined) ***REMOVED*** r2 = r; ***REMOVED***
        if (g2 === undefined) ***REMOVED*** g2 = g; ***REMOVED***
        if (b2 === undefined) ***REMOVED*** b2 = b; ***REMOVED***

        if (resize)
        ***REMOVED***
            destination.resize(this.width, this.height);
        ***REMOVED***

        this.processPixelRGB(
            function (pixel, x, y)
            ***REMOVED***
                if (pixel.r === r && pixel.g === g && pixel.b === b)
                ***REMOVED***
                    destination.setPixel32(x, y, r2, g2, b2, a, false);
                ***REMOVED***
                return false;
            ***REMOVED***,
            this);

        destination.context.putImageData(destination.imageData, 0, 0);
        destination.dirty = true;

        return destination;

    ***REMOVED***,

    /**
    * Draws a filled Rectangle to the BitmapData at the given x, y coordinates and width / height in size.
    *
    * @method Phaser.BitmapData#rect
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the top-left of the Rectangle.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the top-left of the Rectangle.
    * @param ***REMOVED***number***REMOVED*** width - The width of the Rectangle.
    * @param ***REMOVED***number***REMOVED*** height - The height of the Rectangle.
    * @param ***REMOVED***string***REMOVED*** [fillStyle] - If set the context fillStyle will be set to this value before the rect is drawn.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    rect: function (x, y, width, height, fillStyle) ***REMOVED***

        if (typeof fillStyle !== 'undefined')
        ***REMOVED***
            this.context.fillStyle = fillStyle;
        ***REMOVED***

        this.context.fillRect(x, y, width, height);

        return this;

    ***REMOVED***,

    /**
    * Draws text to the BitmapData in the given font and color.
    * The default font is 14px Courier, so useful for quickly drawing debug text.
    * If you need to do a lot of font work to this BitmapData we'd recommend implementing your own text draw method.
    *
    * @method Phaser.BitmapData#text
    * @param ***REMOVED***string***REMOVED*** text - The text to write to the BitmapData.
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the top-left of the text string.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the top-left of the text string.
    * @param ***REMOVED***string***REMOVED*** [font='14px Courier'] - The font. This is passed directly to Context.font, so anything that can support, this can.
    * @param ***REMOVED***string***REMOVED*** [color='rgb(255,255,255)'] - The color the text will be drawn in.
    * @param ***REMOVED***boolean***REMOVED*** [shadow=true] - Draw a single pixel black shadow below the text (offset by text.x/y + 1)
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    text: function (text, x, y, font, color, shadow) ***REMOVED***

        if (x === undefined) ***REMOVED*** x = 0; ***REMOVED***
        if (y === undefined) ***REMOVED*** y = 0; ***REMOVED***
        if (font === undefined) ***REMOVED*** font = '14px Courier'; ***REMOVED***
        if (color === undefined) ***REMOVED*** color = 'rgb(255,255,255)'; ***REMOVED***
        if (shadow === undefined) ***REMOVED*** shadow = true; ***REMOVED***

        var ctx = this.context;
        var prevFont = ctx.font;

        ctx.font = font;

        if (shadow)
        ***REMOVED***
            ctx.fillStyle = 'rgb(0,0,0)';
            ctx.fillText(text, x + 1, y + 1);
        ***REMOVED***
        
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);

        ctx.font = prevFont;
        
        return this;

    ***REMOVED***,

    /**
    * Draws a filled Circle to the BitmapData at the given x, y coordinates and radius in size.
    *
    * @method Phaser.BitmapData#circle
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate to draw the Circle at. This is the center of the circle.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate to draw the Circle at. This is the center of the circle.
    * @param ***REMOVED***number***REMOVED*** radius - The radius of the Circle in pixels. The radius is half the diameter.
    * @param ***REMOVED***string***REMOVED*** [fillStyle] - If set the context fillStyle will be set to this value before the circle is drawn.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    circle: function (x, y, radius, fillStyle) ***REMOVED***

        var ctx = this.context;

        if (fillStyle !== undefined)
        ***REMOVED***
            ctx.fillStyle = fillStyle;
        ***REMOVED***

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.closePath();

        ctx.fill();

        return this;

    ***REMOVED***,

    /**
    * Draws a line between the coordinates given in the color and thickness specified.
    *
    * @method Phaser.BitmapData#line
    * @param ***REMOVED***number***REMOVED*** x1 - The x coordinate to start the line from.
    * @param ***REMOVED***number***REMOVED*** y1 - The y coordinate to start the line from.
    * @param ***REMOVED***number***REMOVED*** x2 - The x coordinate to draw the line to.
    * @param ***REMOVED***number***REMOVED*** y2 - The y coordinate to draw the line to.
    * @param ***REMOVED***string***REMOVED*** [color='#fff'] - The stroke color that the line will be drawn in.
    * @param ***REMOVED***number***REMOVED*** [width=1] - The line thickness.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    line: function (x1, y1, x2, y2, color, width) ***REMOVED***

        if (color === undefined) ***REMOVED*** color = '#fff'; ***REMOVED***
        if (width === undefined) ***REMOVED*** width = 1; ***REMOVED***

        var ctx = this.context;

        ctx.beginPath();

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.stroke();

        ctx.closePath();

        return this;

    ***REMOVED***,

    /**
    * Takes the given Line object and image and renders it to this BitmapData as a repeating texture line.
    *
    * @method Phaser.BitmapData#textureLine
    * @param ***REMOVED***Phaser.Line***REMOVED*** line - A Phaser.Line object that will be used to plot the start and end of the line.
    * @param ***REMOVED***string|Image***REMOVED*** image - The key of an image in the Phaser.Cache to use as the texture for this line, or an actual Image.
    * @param ***REMOVED***string***REMOVED*** [repeat='repeat-x'] - The pattern repeat mode to use when drawing the line. Either `repeat`, `repeat-x` or `no-repeat`.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    textureLine: function (line, image, repeat) ***REMOVED***

        if (repeat === undefined) ***REMOVED*** repeat = 'repeat-x'; ***REMOVED***

        if (typeof image === 'string')
        ***REMOVED***
            image = this.game.cache.getImage(image);

            if (!image)
            ***REMOVED***
                return;
            ***REMOVED***
        ***REMOVED***

        var width = line.length;

        if (repeat === 'no-repeat' && width > image.width)
        ***REMOVED***
            width = image.width;
        ***REMOVED***

        var ctx = this.context;

        ctx.fillStyle = ctx.createPattern(image, repeat);

        this._circle = new Phaser.Circle(line.start.x, line.start.y, image.height);

        this._circle.circumferencePoint(line.angle - 1.5707963267948966, false, this._pos);

        ctx.save();
        ctx.translate(this._pos.x, this._pos.y);
        ctx.rotate(line.angle);
        ctx.fillRect(0, 0, width, image.height);
        ctx.restore();

        this.dirty = true;

        return this;

    ***REMOVED***,

    /**
    * If the game is running in WebGL this will push the texture up to the GPU if it's dirty.
    * This is called automatically if the BitmapData is being used by a Sprite, otherwise you need to remember to call it in your render function.
    * If you wish to suppress this functionality set BitmapData.disableTextureUpload to `true`.
    *
    * @method Phaser.BitmapData#render
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    render: function () ***REMOVED***

        if (!this.disableTextureUpload && this.dirty)
        ***REMOVED***
            this.baseTexture.dirty();
            this.dirty = false;
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Destroys this BitmapData and puts the canvas it was using back into the canvas pool for re-use.
    *
    * @method Phaser.BitmapData#destroy
    */
    destroy: function () ***REMOVED***

        this.frameData.destroy();

        this.texture.destroy(true);

        PIXI.CanvasPool.remove(this);

    ***REMOVED***,

    /**
    * Resets the blend mode (effectively sets it to 'source-over')
    *
    * @method Phaser.BitmapData#blendReset
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendReset: function () ***REMOVED***

        this.op = 'source-over';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'source-over'
    *
    * @method Phaser.BitmapData#blendSourceOver
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendSourceOver: function () ***REMOVED***

        this.op = 'source-over';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'source-in'
    *
    * @method Phaser.BitmapData#blendSourceIn
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendSourceIn: function () ***REMOVED***

        this.op = 'source-in';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'source-out'
    *
    * @method Phaser.BitmapData#blendSourceOut
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendSourceOut: function () ***REMOVED***

        this.op = 'source-out';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'source-atop'
    *
    * @method Phaser.BitmapData#blendSourceAtop
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendSourceAtop: function () ***REMOVED***

        this.op = 'source-atop';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'destination-over'
    *
    * @method Phaser.BitmapData#blendDestinationOver
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendDestinationOver: function () ***REMOVED***

        this.op = 'destination-over';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'destination-in'
    *
    * @method Phaser.BitmapData#blendDestinationIn
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendDestinationIn: function () ***REMOVED***

        this.op = 'destination-in';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'destination-out'
    *
    * @method Phaser.BitmapData#blendDestinationOut
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendDestinationOut: function () ***REMOVED***

        this.op = 'destination-out';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'destination-atop'
    *
    * @method Phaser.BitmapData#blendDestinationAtop
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendDestinationAtop: function () ***REMOVED***

        this.op = 'destination-atop';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'xor'
    *
    * @method Phaser.BitmapData#blendXor
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendXor: function () ***REMOVED***

        this.op = 'xor';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'lighter'
    *
    * @method Phaser.BitmapData#blendAdd
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendAdd: function () ***REMOVED***

        this.op = 'lighter';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'multiply'
    *
    * @method Phaser.BitmapData#blendMultiply
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendMultiply: function () ***REMOVED***

        this.op = 'multiply';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'screen'
    *
    * @method Phaser.BitmapData#blendScreen
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendScreen: function () ***REMOVED***

        this.op = 'screen';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'overlay'
    *
    * @method Phaser.BitmapData#blendOverlay
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendOverlay: function () ***REMOVED***

        this.op = 'overlay';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'darken'
    *
    * @method Phaser.BitmapData#blendDarken
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendDarken: function () ***REMOVED***

        this.op = 'darken';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'lighten'
    *
    * @method Phaser.BitmapData#blendLighten
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendLighten: function () ***REMOVED***

        this.op = 'lighten';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'color-dodge'
    *
    * @method Phaser.BitmapData#blendColorDodge
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendColorDodge: function () ***REMOVED***

        this.op = 'color-dodge';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'color-burn'
    *
    * @method Phaser.BitmapData#blendColorBurn
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendColorBurn: function () ***REMOVED***

        this.op = 'color-burn';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'hard-light'
    *
    * @method Phaser.BitmapData#blendHardLight
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendHardLight: function () ***REMOVED***

        this.op = 'hard-light';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'soft-light'
    *
    * @method Phaser.BitmapData#blendSoftLight
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendSoftLight: function () ***REMOVED***

        this.op = 'soft-light';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'difference'
    *
    * @method Phaser.BitmapData#blendDifference
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendDifference: function () ***REMOVED***

        this.op = 'difference';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'exclusion'
    *
    * @method Phaser.BitmapData#blendExclusion
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendExclusion: function () ***REMOVED***

        this.op = 'exclusion';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'hue'
    *
    * @method Phaser.BitmapData#blendHue
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendHue: function () ***REMOVED***

        this.op = 'hue';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'saturation'
    *
    * @method Phaser.BitmapData#blendSaturation
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendSaturation: function () ***REMOVED***

        this.op = 'saturation';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'color'
    *
    * @method Phaser.BitmapData#blendColor
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendColor: function () ***REMOVED***

        this.op = 'color';
        return this;

    ***REMOVED***,

    /**
    * Sets the blend mode to 'luminosity'
    *
    * @method Phaser.BitmapData#blendLuminosity
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** This BitmapData object for method chaining.
    */
    blendLuminosity: function () ***REMOVED***

        this.op = 'luminosity';
        return this;

    ***REMOVED***

***REMOVED***;

/**
* @memberof Phaser.BitmapData
* @property ***REMOVED***boolean***REMOVED*** smoothed - Gets or sets this BitmapData.contexts smoothing enabled value.
*/
Object.defineProperty(Phaser.BitmapData.prototype, "smoothed", ***REMOVED***

    get: function () ***REMOVED***

        Phaser.Canvas.getSmoothingEnabled(this.context);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        Phaser.Canvas.setSmoothingEnabled(this.context, value);

    ***REMOVED***

***REMOVED***);

/**
* @memberof Phaser.BitmapData
* @property ***REMOVED***string***REMOVED*** op - A short-hand code to get or set the global composite operation of the BitmapDatas canvas.
*/
Object.defineProperty(Phaser.BitmapData.prototype, "op", ***REMOVED***

    get: function () ***REMOVED***

        return this.context.globalCompositeOperation;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.context.globalCompositeOperation = value;

    ***REMOVED***

***REMOVED***);

/**
 * Gets a JavaScript object that has 6 properties set that are used by BitmapData in a transform.
 *
 * @method Phaser.BitmapData.getTransform
 * @param ***REMOVED***number***REMOVED*** translateX - The x translate value.
 * @param ***REMOVED***number***REMOVED*** translateY - The y translate value.
 * @param ***REMOVED***number***REMOVED*** scaleX - The scale x value.
 * @param ***REMOVED***number***REMOVED*** scaleY - The scale y value.
 * @param ***REMOVED***number***REMOVED*** skewX - The skew x value.
 * @param ***REMOVED***number***REMOVED*** skewY - The skew y value.
 * @return ***REMOVED***object***REMOVED*** A JavaScript object containing all of the properties BitmapData needs for transforms.
 */
Phaser.BitmapData.getTransform = function (translateX, translateY, scaleX, scaleY, skewX, skewY) ***REMOVED***

    if (typeof translateX !== 'number') ***REMOVED*** translateX = 0; ***REMOVED***
    if (typeof translateY !== 'number') ***REMOVED*** translateY = 0; ***REMOVED***
    if (typeof scaleX !== 'number') ***REMOVED*** scaleX = 1; ***REMOVED***
    if (typeof scaleY !== 'number') ***REMOVED*** scaleY = 1; ***REMOVED***
    if (typeof skewX !== 'number') ***REMOVED*** skewX = 0; ***REMOVED***
    if (typeof skewY !== 'number') ***REMOVED*** skewY = 0; ***REMOVED***

    return ***REMOVED*** sx: scaleX, sy: scaleY, scaleX: scaleX, scaleY: scaleY, skewX: skewX, skewY: skewY, translateX: translateX, translateY: translateY, tx: translateX, ty: translateY ***REMOVED***;

***REMOVED***;

Phaser.BitmapData.prototype.constructor = Phaser.BitmapData;
