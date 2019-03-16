/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * This greyscales the palette of your Display Objects.
 * 
 * @class GrayFilter
 * @extends AbstractFilter
 * @constructor
 */
PIXI.GrayFilter = function()
***REMOVED***
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = ***REMOVED***
        gray: ***REMOVED***type: '1f', value: 1***REMOVED***
    ***REMOVED***;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform sampler2D uSampler;',
        'uniform float gray;',

        'void main(void) ***REMOVED***',
        '   gl_FragColor = texture2D(uSampler, vTextureCoord);',
        '   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);',
     //   '   gl_FragColor = gl_FragColor;',
        '***REMOVED***'
    ];
***REMOVED***;

PIXI.GrayFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.GrayFilter.prototype.constructor = PIXI.GrayFilter;

/**
 * The strength of the gray. 1 will make the object black and white, 0 will make the object its normal color.
 * @property gray
 * @type Number
 */
Object.defineProperty(PIXI.GrayFilter.prototype, 'gray', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.gray.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.uniforms.gray.value = value;
    ***REMOVED***
***REMOVED***);
