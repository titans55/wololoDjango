/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * This filter applies a pixelate effect making display objects appear 'blocky'.
 * 
 * @class PixelateFilter
 * @extends AbstractFilter
 * @constructor
 */
PIXI.PixelateFilter = function()
***REMOVED***
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = ***REMOVED***
        invert: ***REMOVED***type: '1f', value: 0***REMOVED***,
        dimensions: ***REMOVED***type: '4fv', value:new PIXI.Float32Array([10000, 100, 10, 10])***REMOVED***,
        pixelSize: ***REMOVED***type: '2f', value:***REMOVED***x:10, y:10***REMOVED******REMOVED***
    ***REMOVED***;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform vec2 testDim;',
        'uniform vec4 dimensions;',
        'uniform vec2 pixelSize;',
        'uniform sampler2D uSampler;',

        'void main(void) ***REMOVED***',
        '   vec2 coord = vTextureCoord;',

        '   vec2 size = dimensions.xy/pixelSize;',

        '   vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;',
        '   gl_FragColor = texture2D(uSampler, color);',
        '***REMOVED***'
    ];
***REMOVED***;

PIXI.PixelateFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.PixelateFilter.prototype.constructor = PIXI.PixelateFilter;

/**
 * This a point that describes the size of the blocks. x is the width of the block and y is the height.
 * 
 * @property size
 * @type Point
 */
Object.defineProperty(PIXI.PixelateFilter.prototype, 'size', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.pixelSize.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.dirty = true;
        this.uniforms.pixelSize.value = value;
    ***REMOVED***
***REMOVED***);
