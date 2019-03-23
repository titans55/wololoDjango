/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A Cross Hatch effect filter.
 * 
 * @class CrossHatchFilter
 * @extends AbstractFilter
 * @constructor
 */
PIXI.CrossHatchFilter = function()
***REMOVED***
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = ***REMOVED***
        blur: ***REMOVED***type: '1f', value: 1 / 512***REMOVED***
    ***REMOVED***;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform float blur;',
        'uniform sampler2D uSampler;',

        'void main(void) ***REMOVED***',
        '    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);',

        '    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);',

        '    if (lum < 1.00) ***REMOVED***',
        '        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) ***REMOVED***',
        '            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);',
        '        ***REMOVED***',
        '    ***REMOVED***',

        '    if (lum < 0.75) ***REMOVED***',
        '        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0) ***REMOVED***',
        '            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);',
        '        ***REMOVED***',
        '    ***REMOVED***',

        '    if (lum < 0.50) ***REMOVED***',
        '        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0) ***REMOVED***',
        '            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);',
        '        ***REMOVED***',
        '    ***REMOVED***',

        '    if (lum < 0.3) ***REMOVED***',
        '        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0) ***REMOVED***',
        '            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);',
        '        ***REMOVED***',
        '    ***REMOVED***',
        '***REMOVED***'
    ];
***REMOVED***;

PIXI.CrossHatchFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.CrossHatchFilter.prototype.constructor = PIXI.CrossHatchFilter;

/**
 * Sets the strength of both the blur.
 *
 * @property blur
 * @type Number
 * @default 2
 */
Object.defineProperty(PIXI.CrossHatchFilter.prototype, 'blur', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.blur.value / (1/7000);
    ***REMOVED***,
    set: function(value) ***REMOVED***
        //this.padding = value;
        this.uniforms.blur.value = (1/7000) * value;
    ***REMOVED***
***REMOVED***);
