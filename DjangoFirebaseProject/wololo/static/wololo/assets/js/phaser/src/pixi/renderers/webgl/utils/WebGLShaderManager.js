/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
* @class WebGLShaderManager
* @constructor
* @private
*/
PIXI.WebGLShaderManager = function()
***REMOVED***
    /**
     * @property maxAttibs
     * @type Number
     */
    this.maxAttibs = 10;

    /**
     * @property attribState
     * @type Array
     */
    this.attribState = [];

    /**
     * @property tempAttribState
     * @type Array
     */
    this.tempAttribState = [];

    for (var i = 0; i < this.maxAttibs; i++)
    ***REMOVED***
        this.attribState[i] = false;
    ***REMOVED***

    /**
     * @property stack
     * @type Array
     */
    this.stack = [];

***REMOVED***;

PIXI.WebGLShaderManager.prototype.constructor = PIXI.WebGLShaderManager;

/**
* Initialises the context and the properties.
* 
* @method setContext 
* @param gl ***REMOVED***WebGLContext***REMOVED*** the current WebGL drawing context
*/
PIXI.WebGLShaderManager.prototype.setContext = function(gl)
***REMOVED***
    this.gl = gl;
    
    // the next one is used for rendering primitives
    this.primitiveShader = new PIXI.PrimitiveShader(gl);

    // the next one is used for rendering triangle strips
    this.complexPrimitiveShader = new PIXI.ComplexPrimitiveShader(gl);

    // this shader is used for the default sprite rendering
    this.defaultShader = new PIXI.PixiShader(gl);

    // this shader is used for the fast sprite rendering
    this.fastShader = new PIXI.PixiFastShader(gl);

    // the next one is used for rendering triangle strips
    this.stripShader = new PIXI.StripShader(gl);

    this.setShader(this.defaultShader);
***REMOVED***;

/**
* Takes the attributes given in parameters.
* 
* @method setAttribs
* @param attribs ***REMOVED***Array***REMOVED*** attribs 
*/
PIXI.WebGLShaderManager.prototype.setAttribs = function(attribs)
***REMOVED***
    // reset temp state
    var i;

    for (i = 0; i < this.tempAttribState.length; i++)
    ***REMOVED***
        this.tempAttribState[i] = false;
    ***REMOVED***

    // set the new attribs
    for (i = 0; i < attribs.length; i++)
    ***REMOVED***
        var attribId = attribs[i];
        this.tempAttribState[attribId] = true;
    ***REMOVED***

    var gl = this.gl;

    for (i = 0; i < this.attribState.length; i++)
    ***REMOVED***
        if(this.attribState[i] !== this.tempAttribState[i])
        ***REMOVED***
            this.attribState[i] = this.tempAttribState[i];

            if(this.tempAttribState[i])
            ***REMOVED***
                gl.enableVertexAttribArray(i);
            ***REMOVED***
            else
            ***REMOVED***
                gl.disableVertexAttribArray(i);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

/**
* Sets the current shader.
* 
* @method setShader
* @param shader ***REMOVED***Any***REMOVED***
*/
PIXI.WebGLShaderManager.prototype.setShader = function(shader)
***REMOVED***
    if(this._currentId === shader._UID)return false;
    
    this._currentId = shader._UID;

    this.currentShader = shader;

    this.gl.useProgram(shader.program);
    this.setAttribs(shader.attributes);

    return true;
***REMOVED***;

/**
* Destroys this object.
* 
* @method destroy
*/
PIXI.WebGLShaderManager.prototype.destroy = function()
***REMOVED***
    this.attribState = null;

    this.tempAttribState = null;

    this.primitiveShader.destroy();

    this.complexPrimitiveShader.destroy();

    this.defaultShader.destroy();

    this.fastShader.destroy();

    this.stripShader.destroy();

    this.gl = null;
***REMOVED***;
