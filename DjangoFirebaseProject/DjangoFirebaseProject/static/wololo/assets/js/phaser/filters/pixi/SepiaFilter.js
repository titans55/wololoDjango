/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * This applies a sepia effect to your Display Objects.
 * 
 * @class SepiaFilter
 * @extends AbstractFilter
 * @constructor
 */
PIXI.SepiaFilter = function()
***REMOVED***
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = ***REMOVED***
        sepia: ***REMOVED***type: '1f', value: 1***REMOVED***
    ***REMOVED***;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform float sepia;',
        'uniform sampler2D uSampler;',

        'const mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);',

        'void main(void) ***REMOVED***',
        '   gl_FragColor = texture2D(uSampler, vTextureCoord);',
        '   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);',
       // '   gl_FragColor = gl_FragColor * vColor;',
        '***REMOVED***'
    ];
***REMOVED***;

PIXI.SepiaFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.SepiaFilter.prototype.constructor = PIXI.SepiaFilter;

/**
 * The strength of the sepia. 1 will apply the full sepia effect, 0 will make the object its normal color.
 * @property sepia
 * @type Number
*/
Object.defineProperty(PIXI.SepiaFilter.prototype, 'sepia', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.sepia.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.uniforms.sepia.value = value;
    ***REMOVED***
***REMOVED***);
