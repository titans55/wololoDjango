/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 * @author Richard Davey http://www.photonstorm.com @photonstorm
 */

/**
* @class PixiShader
* @constructor
* @param gl ***REMOVED***WebGLContext***REMOVED*** the current WebGL drawing context
*/
PIXI.PixiShader = function(gl)
***REMOVED***
    /**
     * @property _UID
     * @type Number
     * @private
     */
    this._UID = PIXI._UID++;

    /**
     * @property gl
     * @type WebGLContext
     */
    this.gl = gl;

    /**
     * The WebGL program.
     * @property program
     * @type Any
     */
    this.program = null;

    /**
     * The fragment shader.
     * @property fragmentSrc
     * @type Array
     */
    this.fragmentSrc = [
        'precision lowp float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform sampler2D uSampler;',
        'void main(void) ***REMOVED***',
        '   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;',
        '***REMOVED***'
    ];

    /**
     * A local texture counter for multi-texture shaders.
     * @property textureCount
     * @type Number
     */
    this.textureCount = 0;

    /**
     * A local flag
     * @property firstRun
     * @type Boolean
     * @private
     */
    this.firstRun = true;

    /**
     * A dirty flag
     * @property dirty
     * @type Boolean
     */
    this.dirty = true;

    /**
     * Uniform attributes cache.
     * @property attributes
     * @type Array
     * @private
     */
    this.attributes = [];

    this.init();
***REMOVED***;

PIXI.PixiShader.prototype.constructor = PIXI.PixiShader;

/**
* Initialises the shader.
*
* @method init
*/
PIXI.PixiShader.prototype.init = function()
***REMOVED***
    var gl = this.gl;

    var program = PIXI.compileProgram(gl, this.vertexSrc || PIXI.PixiShader.defaultVertexSrc, this.fragmentSrc);

    gl.useProgram(program);

    // get and store the uniforms for the shader
    this.uSampler = gl.getUniformLocation(program, 'uSampler');
    this.projectionVector = gl.getUniformLocation(program, 'projectionVector');
    this.offsetVector = gl.getUniformLocation(program, 'offsetVector');
    this.dimensions = gl.getUniformLocation(program, 'dimensions');

    // get and store the attributes
    this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    this.aTextureCoord = gl.getAttribLocation(program, 'aTextureCoord');
    this.colorAttribute = gl.getAttribLocation(program, 'aColor');

    // Begin worst hack eva //

    // WHY??? ONLY on my chrome pixel the line above returns -1 when using filters?
    // maybe its something to do with the current state of the gl context.
    // I'm convinced this is a bug in the chrome browser as there is NO reason why this should be returning -1 especially as it only manifests on my chrome pixel
    // If theres any webGL people that know why could happen please help :)
    if(this.colorAttribute === -1)
    ***REMOVED***
        this.colorAttribute = 2;
    ***REMOVED***

    this.attributes = [this.aVertexPosition, this.aTextureCoord, this.colorAttribute];

    // End worst hack eva //

    // add those custom shaders!
    for (var key in this.uniforms)
    ***REMOVED***
        // get the uniform locations..
        this.uniforms[key].uniformLocation = gl.getUniformLocation(program, key);
    ***REMOVED***

    this.initUniforms();

    this.program = program;
***REMOVED***;

/**
* Initialises the shader uniform values.
*
* Uniforms are specified in the GLSL_ES Specification: http://www.khronos.org/registry/webgl/specs/latest/1.0/
* http://www.khronos.org/registry/gles/specs/2.0/GLSL_ES_Specification_1.0.17.pdf
*
* @method initUniforms
*/
PIXI.PixiShader.prototype.initUniforms = function()
***REMOVED***
    this.textureCount = 1;
    var gl = this.gl;
    var uniform;

    for (var key in this.uniforms)
    ***REMOVED***
        uniform = this.uniforms[key];

        var type = uniform.type;

        if (type === 'sampler2D')
        ***REMOVED***
            uniform._init = false;

            if (uniform.value !== null)
            ***REMOVED***
                this.initSampler2D(uniform);
            ***REMOVED***
        ***REMOVED***
        else if (type === 'mat2' || type === 'mat3' || type === 'mat4')
        ***REMOVED***
            //  These require special handling
            uniform.glMatrix = true;
            uniform.glValueLength = 1;

            if (type === 'mat2')
            ***REMOVED***
                uniform.glFunc = gl.uniformMatrix2fv;
            ***REMOVED***
            else if (type === 'mat3')
            ***REMOVED***
                uniform.glFunc = gl.uniformMatrix3fv;
            ***REMOVED***
            else if (type === 'mat4')
            ***REMOVED***
                uniform.glFunc = gl.uniformMatrix4fv;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  GL function reference
            uniform.glFunc = gl['uniform' + type];

            if (type === '2f' || type === '2i')
            ***REMOVED***
                uniform.glValueLength = 2;
            ***REMOVED***
            else if (type === '3f' || type === '3i')
            ***REMOVED***
                uniform.glValueLength = 3;
            ***REMOVED***
            else if (type === '4f' || type === '4i')
            ***REMOVED***
                uniform.glValueLength = 4;
            ***REMOVED***
            else
            ***REMOVED***
                uniform.glValueLength = 1;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* Initialises a Sampler2D uniform (which may only be available later on after initUniforms once the texture has loaded)
*
* @method initSampler2D
*/
PIXI.PixiShader.prototype.initSampler2D = function(uniform)
***REMOVED***
    if (!uniform.value || !uniform.value.baseTexture || !uniform.value.baseTexture.hasLoaded)
    ***REMOVED***
        return;
    ***REMOVED***

    var gl = this.gl;

    gl.activeTexture(gl['TEXTURE' + this.textureCount]);
    gl.bindTexture(gl.TEXTURE_2D, uniform.value.baseTexture._glTextures[gl.id]);

    //  Extended texture data
    if (uniform.textureData)
    ***REMOVED***
        var data = uniform.textureData;

        // GLTexture = mag linear, min linear_mipmap_linear, wrap repeat + gl.generateMipmap(gl.TEXTURE_2D);
        // GLTextureLinear = mag/min linear, wrap clamp
        // GLTextureNearestRepeat = mag/min NEAREST, wrap repeat
        // GLTextureNearest = mag/min nearest, wrap clamp
        // AudioTexture = whatever + luminance + width 512, height 2, border 0
        // KeyTexture = whatever + luminance + width 256, height 2, border 0

        //  magFilter can be: gl.LINEAR, gl.LINEAR_MIPMAP_LINEAR or gl.NEAREST
        //  wrapS/T can be: gl.CLAMP_TO_EDGE or gl.REPEAT

        var magFilter = (data.magFilter) ? data.magFilter : gl.LINEAR;
        var minFilter = (data.minFilter) ? data.minFilter : gl.LINEAR;
        var wrapS = (data.wrapS) ? data.wrapS : gl.CLAMP_TO_EDGE;
        var wrapT = (data.wrapT) ? data.wrapT : gl.CLAMP_TO_EDGE;
        var format = (data.luminance) ? gl.LUMINANCE : gl.RGBA;

        if (data.repeat)
        ***REMOVED***
            wrapS = gl.REPEAT;
            wrapT = gl.REPEAT;
        ***REMOVED***

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, !!data.flipY);

        if (data.width)
        ***REMOVED***
            var width = (data.width) ? data.width : 512;
            var height = (data.height) ? data.height : 2;
            var border = (data.border) ? data.border : 0;

            // void texImage2D(GLenum target, GLint level, GLenum internalformat, GLsizei width, GLsizei height, GLint border, GLenum format, GLenum type, ArrayBufferView? pixels);
            gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, border, format, gl.UNSIGNED_BYTE, null);
        ***REMOVED***
        else
        ***REMOVED***
            //  void texImage2D(GLenum target, GLint level, GLenum internalformat, GLenum format, GLenum type, ImageData? pixels);
            gl.texImage2D(gl.TEXTURE_2D, 0, format, gl.RGBA, gl.UNSIGNED_BYTE, uniform.value.baseTexture.source);
        ***REMOVED***

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
    ***REMOVED***

    gl.uniform1i(uniform.uniformLocation, this.textureCount);

    uniform._init = true;

    this.textureCount++;

***REMOVED***;

/**
* Updates the shader uniform values.
*
* @method syncUniforms
*/
PIXI.PixiShader.prototype.syncUniforms = function()
***REMOVED***
    this.textureCount = 1;
    var uniform;
    var gl = this.gl;

    //  This would probably be faster in an array and it would guarantee key order
    for (var key in this.uniforms)
    ***REMOVED***
        uniform = this.uniforms[key];

        if (uniform.glValueLength === 1)
        ***REMOVED***
            if (uniform.glMatrix === true)
            ***REMOVED***
                uniform.glFunc.call(gl, uniform.uniformLocation, uniform.transpose, uniform.value);
            ***REMOVED***
            else
            ***REMOVED***
                uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value);
            ***REMOVED***
        ***REMOVED***
        else if (uniform.glValueLength === 2)
        ***REMOVED***
            uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y);
        ***REMOVED***
        else if (uniform.glValueLength === 3)
        ***REMOVED***
            uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y, uniform.value.z);
        ***REMOVED***
        else if (uniform.glValueLength === 4)
        ***REMOVED***
            uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y, uniform.value.z, uniform.value.w);
        ***REMOVED***
        else if (uniform.type === 'sampler2D')
        ***REMOVED***
            if (uniform._init)
            ***REMOVED***
                gl.activeTexture(gl['TEXTURE' + this.textureCount]);

                if(uniform.value.baseTexture._dirty[gl.id])
                ***REMOVED***
                    PIXI.instances[gl.id].updateTexture(uniform.value.baseTexture);
                ***REMOVED***
                else
                ***REMOVED***
                    // bind the current texture
                    gl.bindTexture(gl.TEXTURE_2D, uniform.value.baseTexture._glTextures[gl.id]);
                ***REMOVED***

                //  gl.bindTexture(gl.TEXTURE_2D, uniform.value.baseTexture._glTextures[gl.id] || PIXI.createWebGLTexture( uniform.value.baseTexture, gl));
                gl.uniform1i(uniform.uniformLocation, this.textureCount);
                this.textureCount++;
            ***REMOVED***
            else
            ***REMOVED***
                this.initSampler2D(uniform);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* Destroys the shader.
*
* @method destroy
*/
PIXI.PixiShader.prototype.destroy = function()
***REMOVED***
    this.gl.deleteProgram( this.program );
    this.uniforms = null;
    this.gl = null;

    this.attributes = null;
***REMOVED***;

/**
* The Default Vertex shader source.
*
* @property defaultVertexSrc
* @type String
*/
PIXI.PixiShader.defaultVertexSrc = [
    'attribute vec2 aVertexPosition;',
    'attribute vec2 aTextureCoord;',
    'attribute vec4 aColor;',

    'uniform vec2 projectionVector;',
    'uniform vec2 offsetVector;',

    'varying vec2 vTextureCoord;',
    'varying vec4 vColor;',

    'const vec2 center = vec2(-1.0, 1.0);',

    'void main(void) ***REMOVED***',
    '   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);',
    '   vTextureCoord = aTextureCoord;',
    '   vColor = vec4(aColor.rgb * aColor.a, aColor.a);',
    '***REMOVED***'
];