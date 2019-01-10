/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
* @class WebGLBlendModeManager
* @constructor
* @param gl ***REMOVED***WebGLContext***REMOVED*** the current WebGL drawing context
*/
PIXI.WebGLBlendModeManager = function()
***REMOVED***
    /**
     * @property currentBlendMode
     * @type Number
     */
    this.currentBlendMode = 99999;
***REMOVED***;

PIXI.WebGLBlendModeManager.prototype.constructor = PIXI.WebGLBlendModeManager;

/**
 * Sets the WebGL Context.
 *
 * @method setContext
 * @param gl ***REMOVED***WebGLContext***REMOVED*** the current WebGL drawing context
 */
PIXI.WebGLBlendModeManager.prototype.setContext = function(gl)
***REMOVED***
    this.gl = gl;
***REMOVED***;

/**
* Sets-up the given blendMode from WebGL's point of view.
* 
* @method setBlendMode 
* @param blendMode ***REMOVED***Number***REMOVED*** the blendMode, should be a Pixi const, such as PIXI.BlendModes.ADD
*/
PIXI.WebGLBlendModeManager.prototype.setBlendMode = function(blendMode)
***REMOVED***
    if(this.currentBlendMode === blendMode)return false;

    this.currentBlendMode = blendMode;
    
    var blendModeWebGL = PIXI.blendModesWebGL[this.currentBlendMode];

    if (blendModeWebGL)
    ***REMOVED***
        this.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
    ***REMOVED***
    
    return true;
***REMOVED***;

/**
* Destroys this object.
* 
* @method destroy
*/
PIXI.WebGLBlendModeManager.prototype.destroy = function()
***REMOVED***
    this.gl = null;
***REMOVED***;
