/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A texture stores the information that represents an image. All textures have a base texture.
 *
 * @class BaseTexture
 * @uses EventTarget
 * @constructor
 * @param source ***REMOVED***String|Canvas***REMOVED*** the source object (image or canvas)
 * @param scaleMode ***REMOVED***Number***REMOVED*** See ***REMOVED******REMOVED***#crossLink "PIXI/scaleModes:property"***REMOVED******REMOVED***PIXI.scaleModes***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** for possible values
 */
PIXI.BaseTexture = function(source, scaleMode)
***REMOVED***
    /**
     * The Resolution of the texture. 
     *
     * @property resolution
     * @type Number
     */
    this.resolution = 1;
    
    /**
     * [read-only] The width of the base texture set when the image has loaded
     *
     * @property width
     * @type Number
     * @readOnly
     */
    this.width = 100;

    /**
     * [read-only] The height of the base texture set when the image has loaded
     *
     * @property height
     * @type Number
     * @readOnly
     */
    this.height = 100;

    /**
     * The scale mode to apply when scaling this texture
     * 
     * @property scaleMode
     * @type ***REMOVED***Number***REMOVED***
     * @default PIXI.scaleModes.LINEAR
     */
    this.scaleMode = scaleMode || PIXI.scaleModes.DEFAULT;

    /**
     * [read-only] Set to true once the base texture has loaded
     *
     * @property hasLoaded
     * @type Boolean
     * @readOnly
     */
    this.hasLoaded = false;

    /**
     * The image source that is used to create the texture.
     *
     * @property source
     * @type Image
     */
    this.source = source;

    /**
     * Controls if RGB channels should be pre-multiplied by Alpha  (WebGL only)
     *
     * @property premultipliedAlpha
     * @type Boolean
     * @default true
     */
    this.premultipliedAlpha = true;

    // used for webGL

    /**
     * @property _glTextures
     * @type Array
     * @private
     */
    this._glTextures = [];

    /**
     * Set this to true if a mipmap of this texture needs to be generated. This value needs to be set before the texture is used
     * Also the texture must be a power of two size to work
     * 
     * @property mipmap
     * @type ***REMOVED***Boolean***REMOVED***
     */
    this.mipmap = false;

    /**
     * @property _dirty
     * @type Array
     * @private
     */
    this._dirty = [true, true, true, true];

    if (!source)
    ***REMOVED***
        return;
    ***REMOVED***

    if ((this.source.complete || this.source.getContext) && this.source.width && this.source.height)
    ***REMOVED***
        this.hasLoaded = true;
        this.width = this.source.naturalWidth || this.source.width;
        this.height = this.source.naturalHeight || this.source.height;
        this.dirty();
    ***REMOVED***

    /**
     * A BaseTexture can be set to skip the rendering phase in the WebGL Sprite Batch.
     * 
     * You may want to do this if you have a parent Sprite with no visible texture (i.e. uses the internal `__default` texture)
     * that has children that you do want to render, without causing a batch flush in the process.
     * 
     * @property skipRender
     * @type Boolean
     */
    this.skipRender = false;

    /**
     * @property _powerOf2
     * @type Boolean
     * @private
     */
    this._powerOf2 = false;

***REMOVED***;

PIXI.BaseTexture.prototype.constructor = PIXI.BaseTexture;

/**
 * Forces this BaseTexture to be set as loaded, with the given width and height.
 * Then calls BaseTexture.dirty.
 * Important for when you don't want to modify the source object by forcing in `complete` or dimension properties it may not have.
 *
 * @method forceLoaded
 * @param ***REMOVED***number***REMOVED*** width - The new width to force the BaseTexture to be.
 * @param ***REMOVED***number***REMOVED*** height - The new height to force the BaseTexture to be.
 */
PIXI.BaseTexture.prototype.forceLoaded = function(width, height)
***REMOVED***
    this.hasLoaded = true;
    this.width = width;
    this.height = height;
    this.dirty();
***REMOVED***;

/**
 * Destroys this base texture
 *
 * @method destroy
 */
PIXI.BaseTexture.prototype.destroy = function()
***REMOVED***
    if (this.source)
    ***REMOVED***
        PIXI.CanvasPool.removeByCanvas(this.source);
    ***REMOVED***

    this.source = null;

    this.unloadFromGPU();
***REMOVED***;

/**
 * Changes the source image of the texture
 *
 * @method updateSourceImage
 * @param newSrc ***REMOVED***String***REMOVED*** the path of the image
 * @deprecated This method is deprecated. Please use Phaser.Sprite.loadTexture instead.
 */
PIXI.BaseTexture.prototype.updateSourceImage = function(newSrc)
***REMOVED***
    console.warn("PIXI.BaseTexture.updateSourceImage is deprecated. Use Phaser.Sprite.loadTexture instead.");
***REMOVED***;

/**
 * Sets all glTextures to be dirty.
 *
 * @method dirty
 */
PIXI.BaseTexture.prototype.dirty = function()
***REMOVED***
    for (var i = 0; i < this._glTextures.length; i++)
    ***REMOVED***
        this._dirty[i] = true;
    ***REMOVED***
***REMOVED***;

/**
 * Removes the base texture from the GPU, useful for managing resources on the GPU.
 * Atexture is still 100% usable and will simply be reuploaded if there is a sprite on screen that is using it.
 *
 * @method unloadFromGPU
 */
PIXI.BaseTexture.prototype.unloadFromGPU = function()
***REMOVED***
    this.dirty();

    // delete the webGL textures if any.
    for (var i = this._glTextures.length - 1; i >= 0; i--)
    ***REMOVED***
        var glTexture = this._glTextures[i];
        var gl = PIXI.glContexts[i];

        if(gl && glTexture)
        ***REMOVED***
            gl.deleteTexture(glTexture);
        ***REMOVED***
        
    ***REMOVED***

    this._glTextures.length = 0;

    this.dirty();
***REMOVED***;

/**
 * Helper function that creates a base texture from the given canvas element.
 *
 * @static
 * @method fromCanvas
 * @param canvas ***REMOVED***Canvas***REMOVED*** The canvas element source of the texture
 * @param scaleMode ***REMOVED***Number***REMOVED*** See ***REMOVED******REMOVED***#crossLink "PIXI/scaleModes:property"***REMOVED******REMOVED***PIXI.scaleModes***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** for possible values
 * @return ***REMOVED***BaseTexture***REMOVED***
 */
PIXI.BaseTexture.fromCanvas = function(canvas, scaleMode)
***REMOVED***
    if (canvas.width === 0)
    ***REMOVED***
        canvas.width = 1;
    ***REMOVED***

    if (canvas.height === 0)
    ***REMOVED***
        canvas.height = 1;
    ***REMOVED***

    return new PIXI.BaseTexture(canvas, scaleMode);
***REMOVED***;
