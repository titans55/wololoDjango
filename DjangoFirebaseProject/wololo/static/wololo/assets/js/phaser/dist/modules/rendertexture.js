/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A RenderTexture is a special texture that allows any displayObject to be rendered to it. It allows you to take many complex objects and
* render them down into a single quad (on WebGL) which can then be used to texture other display objects with. A way of generating textures at run-time.
* 
* @class Phaser.RenderTexture
* @constructor
* @extends PIXI.RenderTexture
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Current game instance.
* @param ***REMOVED***number***REMOVED*** [width=100] - The width of the render texture.
* @param ***REMOVED***number***REMOVED*** [height=100] - The height of the render texture.
* @param ***REMOVED***string***REMOVED*** [key=''] - The key of the RenderTexture in the Cache, if stored there.
* @param ***REMOVED***number***REMOVED*** [scaleMode=Phaser.scaleModes.DEFAULT] - One of the Phaser.scaleModes consts.
* @param ***REMOVED***number***REMOVED*** [resolution=1] - The resolution of the texture being generated.
*/
Phaser.RenderTexture = function (game, width, height, key, scaleMode, resolution) ***REMOVED***

    if (key === undefined) ***REMOVED*** key = ''; ***REMOVED***
    if (scaleMode === undefined) ***REMOVED*** scaleMode = Phaser.scaleModes.DEFAULT; ***REMOVED***
    if (resolution === undefined) ***REMOVED*** resolution = 1; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***string***REMOVED*** key - The key of the RenderTexture in the Cache, if stored there.
    */
    this.key = key;

    /**
    * @property ***REMOVED***number***REMOVED*** type - Base Phaser object type.
    */
    this.type = Phaser.RENDERTEXTURE;

    /**
    * @property ***REMOVED***PIXI.Matrix***REMOVED*** _tempMatrix - The matrix that is applied when display objects are rendered to this RenderTexture.
    * @private
    */
    this._tempMatrix = new PIXI.Matrix();

    PIXI.RenderTexture.call(this, width, height, this.game.renderer, scaleMode, resolution);

    this.render = Phaser.RenderTexture.prototype.render;

***REMOVED***;

Phaser.RenderTexture.prototype = Object.create(PIXI.RenderTexture.prototype);
Phaser.RenderTexture.prototype.constructor = Phaser.RenderTexture;

/**
* This function will draw the display object to the RenderTexture at the given coordinates.
*
* When the display object is drawn it takes into account scale and rotation.
*
* If you don't want those then use RenderTexture.renderRawXY instead.
*
* @method Phaser.RenderTexture.prototype.renderXY
* @param ***REMOVED***Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapText|Phaser.Group***REMOVED*** displayObject - The display object to render to this texture.
* @param ***REMOVED***number***REMOVED*** x - The x position to render the object at.
* @param ***REMOVED***number***REMOVED*** y - The y position to render the object at.
* @param ***REMOVED***boolean***REMOVED*** [clear=false] - If true the texture will be cleared before the display object is drawn.
*/
Phaser.RenderTexture.prototype.renderXY = function (displayObject, x, y, clear) ***REMOVED***

    displayObject.updateTransform();

    this._tempMatrix.copyFrom(displayObject.worldTransform);
    this._tempMatrix.tx = x;
    this._tempMatrix.ty = y;

    if (this.renderer.type === PIXI.WEBGL_RENDERER)
    ***REMOVED***
        this.renderWebGL(displayObject, this._tempMatrix, clear);
    ***REMOVED***
    else
    ***REMOVED***
        this.renderCanvas(displayObject, this._tempMatrix, clear);
    ***REMOVED***

***REMOVED***;

/**
* This function will draw the display object to the RenderTexture at the given coordinates.
*
* When the display object is drawn it doesn't take into account scale, rotation or translation.
*
* If you need those then use RenderTexture.renderXY instead.
*
* @method Phaser.RenderTexture.prototype.renderRawXY
* @param ***REMOVED***Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapText|Phaser.Group***REMOVED*** displayObject - The display object to render to this texture.
* @param ***REMOVED***number***REMOVED*** x - The x position to render the object at.
* @param ***REMOVED***number***REMOVED*** y - The y position to render the object at.
* @param ***REMOVED***boolean***REMOVED*** [clear=false] - If true the texture will be cleared before the display object is drawn.
*/
Phaser.RenderTexture.prototype.renderRawXY = function (displayObject, x, y, clear) ***REMOVED***

    this._tempMatrix.identity().translate(x, y);

    if (this.renderer.type === PIXI.WEBGL_RENDERER)
    ***REMOVED***
        this.renderWebGL(displayObject, this._tempMatrix, clear);
    ***REMOVED***
    else
    ***REMOVED***
        this.renderCanvas(displayObject, this._tempMatrix, clear);
    ***REMOVED***

***REMOVED***;

/**
* This function will draw the display object to the RenderTexture.
*
* In versions of Phaser prior to 2.4.0 the second parameter was a Phaser.Point object. 
* This is now a Matrix allowing you much more control over how the Display Object is rendered.
* If you need to replicate the earlier behavior please use Phaser.RenderTexture.renderXY instead.
*
* If you wish for the displayObject to be rendered taking its current scale, rotation and translation into account then either
* pass `null`, leave it undefined or pass `displayObject.worldTransform` as the matrix value.
*
* @method Phaser.RenderTexture.prototype.render
* @param ***REMOVED***Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapText|Phaser.Group***REMOVED*** displayObject - The display object to render to this texture.
* @param ***REMOVED***Phaser.Matrix***REMOVED*** [matrix] - Optional matrix to apply to the display object before rendering. If null or undefined it will use the worldTransform matrix of the given display object.
* @param ***REMOVED***boolean***REMOVED*** [clear=false] - If true the texture will be cleared before the display object is drawn.
*/
Phaser.RenderTexture.prototype.render = function (displayObject, matrix, clear) ***REMOVED***

    if (matrix === undefined || matrix === null)
    ***REMOVED***
        this._tempMatrix.copyFrom(displayObject.worldTransform);
    ***REMOVED***
    else
    ***REMOVED***
        this._tempMatrix.copyFrom(matrix);
    ***REMOVED***

    if (this.renderer.type === PIXI.WEBGL_RENDERER)
    ***REMOVED***
        this.renderWebGL(displayObject, this._tempMatrix, clear);
    ***REMOVED***
    else
    ***REMOVED***
        this.renderCanvas(displayObject, this._tempMatrix, clear);
    ***REMOVED***

***REMOVED***;
