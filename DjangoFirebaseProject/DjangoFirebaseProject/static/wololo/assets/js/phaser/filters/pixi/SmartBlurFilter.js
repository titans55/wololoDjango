/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A Smart Blur Filter.
 * 
 * @class SmartBlurFilter
 * @extends AbstractFilter
 * @constructor
 */
PIXI.SmartBlurFilter = function()
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
        'uniform sampler2D uSampler;',
        //'uniform vec2 delta;',
        'const vec2 delta = vec2(1.0/10.0, 0.0);',
        //'uniform float darkness;',

        'float random(vec3 scale, float seed) ***REMOVED***',
        '   return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);',
        '***REMOVED***',


        'void main(void) ***REMOVED***',
        '   vec4 color = vec4(0.0);',
        '   float total = 0.0;',

        '   float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);',

        '   for (float t = -30.0; t <= 30.0; t++) ***REMOVED***',
        '       float percent = (t + offset - 0.5) / 30.0;',
        '       float weight = 1.0 - abs(percent);',
        '       vec4 sample = texture2D(uSampler, vTextureCoord + delta * percent);',
        '       sample.rgb *= sample.a;',
        '       color += sample * weight;',
        '       total += weight;',
        '   ***REMOVED***',

        '   gl_FragColor = color / total;',
        '   gl_FragColor.rgb /= gl_FragColor.a + 0.00001;',
        //'   gl_FragColor.rgb *= darkness;',
        '***REMOVED***'
    ];
***REMOVED***;

PIXI.SmartBlurFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.SmartBlurFilter.prototype.constructor = PIXI.SmartBlurFilter;

/**
 * The strength of the blur.
 *
 * @property blur
 * @type Number
 * @default 2
 */
Object.defineProperty(PIXI.SmartBlurFilter.prototype, 'blur', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.blur.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.uniforms.blur.value = value;
    ***REMOVED***
***REMOVED***);
