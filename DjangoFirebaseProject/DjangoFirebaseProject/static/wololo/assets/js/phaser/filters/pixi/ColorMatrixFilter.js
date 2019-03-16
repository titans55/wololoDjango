/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The ColorMatrixFilter class lets you apply a 4x4 matrix transformation on the RGBA
 * color and alpha values of every pixel on your displayObject to produce a result
 * with a new set of RGBA color and alpha values. It's pretty powerful!
 * 
 * @class ColorMatrixFilter
 * @extends AbstractFilter
 * @constructor
 */
PIXI.ColorMatrixFilter = function()
***REMOVED***
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = ***REMOVED***
        matrix: ***REMOVED***type: 'mat4', value: [1,0,0,0,
                                       0,1,0,0,
                                       0,0,1,0,
                                       0,0,0,1]***REMOVED***
    ***REMOVED***;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform float invert;',
        'uniform mat4 matrix;',
        'uniform sampler2D uSampler;',

        'void main(void) ***REMOVED***',
        '   gl_FragColor = texture2D(uSampler, vTextureCoord) * matrix;',
      //  '   gl_FragColor = gl_FragColor;',
        '***REMOVED***'
    ];
***REMOVED***;

PIXI.ColorMatrixFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.ColorMatrixFilter.prototype.constructor = PIXI.ColorMatrixFilter;

/**
 * Sets the matrix of the color matrix filter
 *
 * @property matrix
 * @type Array(Number)
 * @default [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
 */
Object.defineProperty(PIXI.ColorMatrixFilter.prototype, 'matrix', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.matrix.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.uniforms.matrix.value = value;
    ***REMOVED***
***REMOVED***);