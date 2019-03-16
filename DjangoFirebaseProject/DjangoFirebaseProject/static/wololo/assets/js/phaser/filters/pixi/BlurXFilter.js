/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The BlurXFilter applies a horizontal Gaussian blur to an object.
 *
 * @class BlurXFilter
 * @extends AbstractFilter
 * @constructor
 */
PIXI.BlurXFilter = function()
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

        '   sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;',
        '   sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;',

        '   gl_FragColor = sum;',
        '***REMOVED***'
    ];
***REMOVED***;

PIXI.BlurXFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.BlurXFilter.prototype.constructor = PIXI.BlurXFilter;

/**
 * Sets the strength of both the blur.
 *
 * @property blur
 * @type Number
 * @default 2
 */
Object.defineProperty(PIXI.BlurXFilter.prototype, 'blur', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.blur.value / (1/7000);
    ***REMOVED***,
    set: function(value) ***REMOVED***

        this.dirty = true;
        this.uniforms.blur.value = (1/7000) * value;
    ***REMOVED***
***REMOVED***);
