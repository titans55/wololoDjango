/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * This lowers the color depth of your image by the given amount, producing an image with a smaller palette.
 * 
 * @class ColorStepFilter
 * @extends AbstractFilter
 * @constructor
 */
PIXI.ColorStepFilter = function()
***REMOVED***
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = ***REMOVED***
        step: ***REMOVED***type: '1f', value: 5***REMOVED***
    ***REMOVED***;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform sampler2D uSampler;',
        'uniform float step;',

        'void main(void) ***REMOVED***',
        '   vec4 color = texture2D(uSampler, vTextureCoord);',
        '   color = floor(color * step) / step;',
        '   gl_FragColor = color;',
        '***REMOVED***'
    ];
***REMOVED***;

PIXI.ColorStepFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.ColorStepFilter.prototype.constructor = PIXI.ColorStepFilter;

/**
 * The number of steps to reduce the palette by.
 *
 * @property step
 * @type Number
 */
Object.defineProperty(PIXI.ColorStepFilter.prototype, 'step', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.step.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.uniforms.step.value = value;
    ***REMOVED***
***REMOVED***);
