/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
* @class FilterTexture
* @constructor
* @param gl ***REMOVED***WebGLContext***REMOVED*** the current WebGL drawing context
* @param width ***REMOVED***Number***REMOVED*** the horizontal range of the filter
* @param height ***REMOVED***Number***REMOVED*** the vertical range of the filter
* @param scaleMode ***REMOVED***Number***REMOVED*** See ***REMOVED******REMOVED***#crossLink "PIXI/scaleModes:property"***REMOVED******REMOVED***PIXI.scaleModes***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** for possible values
*/
PIXI.FilterTexture = function(gl, width, height, scaleMode)
***REMOVED***
    /**
     * @property gl
     * @type WebGLContext
     */
    this.gl = gl;

    // next time to create a frame buffer and texture

    /**
     * @property frameBuffer
     * @type Any
     */
    this.frameBuffer = gl.createFramebuffer();

    /**
     * @property texture
     * @type Any
     */
    this.texture = gl.createTexture();

    /**
     * @property scaleMode
     * @type Number
     */
    scaleMode = scaleMode || PIXI.scaleModes.DEFAULT;

    gl.bindTexture(gl.TEXTURE_2D,  this.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer );

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer );
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);

    // required for masking a mask??
    this.renderBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);
  
    this.resize(width, height);
***REMOVED***;

PIXI.FilterTexture.prototype.constructor = PIXI.FilterTexture;

/**
* Clears the filter texture.
* 
* @method clear
*/
PIXI.FilterTexture.prototype.clear = function()
***REMOVED***
    var gl = this.gl;
    
    gl.clearColor(0,0,0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
***REMOVED***;

/**
 * Resizes the texture to the specified width and height
 *
 * @method resize
 * @param width ***REMOVED***Number***REMOVED*** the new width of the texture
 * @param height ***REMOVED***Number***REMOVED*** the new height of the texture
 */
PIXI.FilterTexture.prototype.resize = function(width, height)
***REMOVED***
    if(this.width === width && this.height === height) return;

    this.width = width;
    this.height = height;

    var gl = this.gl;

    gl.bindTexture(gl.TEXTURE_2D,  this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  width , height , 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    // update the stencil buffer width and height
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, width , height );
***REMOVED***;

/**
* Destroys the filter texture.
* 
* @method destroy
*/
PIXI.FilterTexture.prototype.destroy = function()
***REMOVED***
    var gl = this.gl;
    gl.deleteFramebuffer( this.frameBuffer );
    gl.deleteTexture( this.texture );

    this.frameBuffer = null;
    this.texture = null;
***REMOVED***;