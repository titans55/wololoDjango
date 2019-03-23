/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
* @method initDefaultShaders
* @static
* @private
*/
PIXI.initDefaultShaders = function()
***REMOVED***
***REMOVED***;

/**
* @method CompileVertexShader
* @static
* @param gl ***REMOVED***WebGLContext***REMOVED*** the current WebGL drawing context
* @param shaderSrc ***REMOVED***Array***REMOVED***
* @return ***REMOVED***Any***REMOVED***
*/
PIXI.CompileVertexShader = function(gl, shaderSrc)
***REMOVED***
    return PIXI._CompileShader(gl, shaderSrc, gl.VERTEX_SHADER);
***REMOVED***;

/**
* @method CompileFragmentShader
* @static
* @param gl ***REMOVED***WebGLContext***REMOVED*** the current WebGL drawing context
* @param shaderSrc ***REMOVED***Array***REMOVED***
* @return ***REMOVED***Any***REMOVED***
*/
PIXI.CompileFragmentShader = function(gl, shaderSrc)
***REMOVED***
    return PIXI._CompileShader(gl, shaderSrc, gl.FRAGMENT_SHADER);
***REMOVED***;

/**
* @method _CompileShader
* @static
* @private
* @param gl ***REMOVED***WebGLContext***REMOVED*** the current WebGL drawing context
* @param shaderSrc ***REMOVED***Array***REMOVED***
* @param shaderType ***REMOVED***Number***REMOVED***
* @return ***REMOVED***Any***REMOVED***
*/
PIXI._CompileShader = function(gl, shaderSrc, shaderType)
***REMOVED***
    var src = shaderSrc;

    if (Array.isArray(shaderSrc))
    ***REMOVED***
        src = shaderSrc.join("\n");
    ***REMOVED***

    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    ***REMOVED***
        window.console.log(gl.getShaderInfoLog(shader));
        return null;
    ***REMOVED***

    return shader;
***REMOVED***;

/**
* @method compileProgram
* @static
* @param gl ***REMOVED***WebGLContext***REMOVED*** the current WebGL drawing context
* @param vertexSrc ***REMOVED***Array***REMOVED***
* @param fragmentSrc ***REMOVED***Array***REMOVED***
* @return ***REMOVED***Any***REMOVED***
*/
PIXI.compileProgram = function(gl, vertexSrc, fragmentSrc)
***REMOVED***
    var fragmentShader = PIXI.CompileFragmentShader(gl, fragmentSrc);
    var vertexShader = PIXI.CompileVertexShader(gl, vertexSrc);

    var shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
    ***REMOVED***
        window.console.log(gl.getProgramInfoLog(shaderProgram));
        window.console.log("Could not initialise shaders");
    ***REMOVED***

    return shaderProgram;
***REMOVED***;
