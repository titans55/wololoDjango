/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 * original filter: https://github.com/evanw/glfx.js/blob/master/src/filters/fun/dotscreen.js
 */

/**
 * This filter applies a dotscreen effect making display objects appear to be made out of black and white halftone dots like an old printer.
 * 
 * @class DotScreenFilter
 * @extends AbstractFilter
 * @constructor
 */
PIXI.DotScreenFilter = function()
***REMOVED***
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = ***REMOVED***
        scale: ***REMOVED***type: '1f', value:1***REMOVED***,
        angle: ***REMOVED***type: '1f', value:5***REMOVED***,
        dimensions:   ***REMOVED***type: '4fv', value:[0,0,0,0]***REMOVED***
    ***REMOVED***;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform vec4 dimensions;',
        'uniform sampler2D uSampler;',

        'uniform float angle;',
        'uniform float scale;',

        'float pattern() ***REMOVED***',
        '   float s = sin(angle), c = cos(angle);',
        '   vec2 tex = vTextureCoord * dimensions.xy;',
        '   vec2 point = vec2(',
        '       c * tex.x - s * tex.y,',
        '       s * tex.x + c * tex.y',
        '   ) * scale;',
        '   return (sin(point.x) * sin(point.y)) * 4.0;',
        '***REMOVED***',

        'void main() ***REMOVED***',
        '   vec4 color = texture2D(uSampler, vTextureCoord);',
        '   float average = (color.r + color.g + color.b) / 3.0;',
        '   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);',
        '***REMOVED***'
    ];
***REMOVED***;

PIXI.DotScreenFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.DotScreenFilter.prototype.constructor = PIXI.DotScreenFilter;

/**
 * The scale of the effect.
 * @property scale
 * @type Number
 */
Object.defineProperty(PIXI.DotScreenFilter.prototype, 'scale', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.scale.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.dirty = true;
        this.uniforms.scale.value = value;
    ***REMOVED***
***REMOVED***);

/**
 * The radius of the effect.
 * @property angle
 * @type Number
 */
Object.defineProperty(PIXI.DotScreenFilter.prototype, 'angle', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.angle.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.dirty = true;
        this.uniforms.angle.value = value;
    ***REMOVED***
***REMOVED***);
