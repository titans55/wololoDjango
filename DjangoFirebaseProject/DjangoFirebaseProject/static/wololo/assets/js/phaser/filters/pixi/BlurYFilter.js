/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The BlurYFilter applies a vertical Gaussian blur to an object.
 *
 * @class BlurYFilter
 * @extends AbstractFilter
 * @constructor
 */
PIXI.BlurYFilter = function()
***REMOVED***
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = ***REMOVED***
        blur: ***REMOVED***type: '1f', value: 1/512***REMOVED***
    ***REMOVED***;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform float blur;',
        'uniform sampler2D uSampler;',

        'void main(void) ***REMOVED***',
        '   vec4 sum = vec4(0.0);',

        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 4.0*blur)) * 0.05;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 3.0*blur)) * 0.09;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 2.0*blur)) * 0.12;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - blur)) * 0.15;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + blur)) * 0.15;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 2.0*blur)) * 0.12;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 3.0*blur)) * 0.09;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 4.0*blur)) * 0.05;',

        '   gl_FragColor = sum;',
        '***REMOVED***'
    ];
***REMOVED***;

PIXI.BlurYFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.BlurYFilter.prototype.constructor = PIXI.BlurYFilter;

/**
 * Sets the strength of both the blur.
 *
 * @property blur
 * @type Number
 * @default 2
 */
Object.defineProperty(PIXI.BlurYFilter.prototype, 'blur', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.blur.value / (1/7000);
    ***REMOVED***,
    set: function(value) ***REMOVED***
        //this.padding = value;
        this.uniforms.blur.value = (1/7000) * value;
    ***REMOVED***
***REMOVED***);
