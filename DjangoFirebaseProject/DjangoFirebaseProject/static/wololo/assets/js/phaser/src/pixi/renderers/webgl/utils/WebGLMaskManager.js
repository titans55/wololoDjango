/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
* @class WebGLMaskManager
* @constructor
* @private
*/
PIXI.WebGLMaskManager = function()
***REMOVED***
***REMOVED***;

PIXI.WebGLMaskManager.prototype.constructor = PIXI.WebGLMaskManager;

/**
* Sets the drawing context to the one given in parameter.
* 
* @method setContext 
* @param gl ***REMOVED***WebGLContext***REMOVED*** the current WebGL drawing context
*/
PIXI.WebGLMaskManager.prototype.setContext = function(gl)
***REMOVED***
    this.gl = gl;
***REMOVED***;

/**
* Applies the Mask and adds it to the current filter stack.
* 
* @method pushMask
* @param maskData ***REMOVED***Array***REMOVED***
* @param renderSession ***REMOVED***Object***REMOVED***
*/
PIXI.WebGLMaskManager.prototype.pushMask = function(maskData, renderSession)
***REMOVED***
    var gl = renderSession.gl;

    if (maskData.dirty)
    ***REMOVED***
        PIXI.WebGLGraphics.updateGraphics(maskData, gl);
    ***REMOVED***

    if (maskData._webGL[gl.id] === undefined || maskData._webGL[gl.id].data === undefined || maskData._webGL[gl.id].data.length === 0)
    ***REMOVED***
        return;
    ***REMOVED***

    renderSession.stencilManager.pushStencil(maskData, maskData._webGL[gl.id].data[0], renderSession);
***REMOVED***;

/**
* Removes the last filter from the filter stack and doesn't return it.
* 
* @method popMask
* @param maskData ***REMOVED***Array***REMOVED***
* @param renderSession ***REMOVED***Object***REMOVED*** an object containing all the useful parameters
*/
PIXI.WebGLMaskManager.prototype.popMask = function(maskData, renderSession)
***REMOVED***
    var gl = this.gl;

    if (maskData._webGL[gl.id] === undefined || maskData._webGL[gl.id].data === undefined || maskData._webGL[gl.id].data.length === 0)
    ***REMOVED***
        return;
    ***REMOVED***

    renderSession.stencilManager.popStencil(maskData, maskData._webGL[gl.id].data[0], renderSession);

***REMOVED***;

/**
* Destroys the mask stack.
* 
* @method destroy
*/
PIXI.WebGLMaskManager.prototype.destroy = function()
***REMOVED***
    this.gl = null;
***REMOVED***;
