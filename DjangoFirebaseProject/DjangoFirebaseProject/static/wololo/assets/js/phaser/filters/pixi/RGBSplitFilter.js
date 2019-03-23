/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * An RGB Split Filter.
 * 
 * @class RGBSplitFilter
 * @extends AbstractFilter
 * @constructor
 */
PIXI.RGBSplitFilter = function()
***REMOVED***
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = ***REMOVED***
        red: ***REMOVED***type: '2f', value: ***REMOVED***x:20, y:20***REMOVED******REMOVED***,
        green: ***REMOVED***type: '2f', value: ***REMOVED***x:-20, y:20***REMOVED******REMOVED***,
        blue: ***REMOVED***type: '2f', value: ***REMOVED***x:20, y:-20***REMOVED******REMOVED***,
        dimensions:   ***REMOVED***type: '4fv', value:[0,0,0,0]***REMOVED***
    ***REMOVED***;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform vec2 red;',
        'uniform vec2 green;',
        'uniform vec2 blue;',
        'uniform vec4 dimensions;',
        'uniform sampler2D uSampler;',

        'void main(void) ***REMOVED***',
        '   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;',
        '   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;',
        '   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;',
        '   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;',
        '***REMOVED***'
    ];
***REMOVED***;

PIXI.RGBSplitFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.RGBSplitFilter.prototype.constructor = PIXI.RGBSplitFilter;

/**
 * Red channel offset.
 * 
 * @property red
 * @type Point
 */
Object.defineProperty(PIXI.RGBSplitFilter.prototype, 'red', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.red.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.uniforms.red.value = value;
    ***REMOVED***
***REMOVED***);

/**
 * Green channel offset.
 * 
 * @property green
 * @type Point
 */
Object.defineProperty(PIXI.RGBSplitFilter.prototype, 'green', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.green.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.uniforms.green.value = value;
    ***REMOVED***
***REMOVED***);

/**
 * Blue offset.
 * 
 * @property blue
 * @type Point
 */
Object.defineProperty(PIXI.RGBSplitFilter.prototype, 'blue', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.blue.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.uniforms.blue.value = value;
    ***REMOVED***
***REMOVED***);
