/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * This filter applies a twist effect making display objects appear twisted in the given direction.
 * 
 * @class TwistFilter
 * @extends AbstractFilter
 * @constructor
 */
PIXI.TwistFilter = function()
***REMOVED***
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = ***REMOVED***
        radius: ***REMOVED***type: '1f', value:0.5***REMOVED***,
        angle: ***REMOVED***type: '1f', value:5***REMOVED***,
        offset: ***REMOVED***type: '2f', value:***REMOVED***x:0.5, y:0.5***REMOVED******REMOVED***
    ***REMOVED***;

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform vec4 dimensions;',
        'uniform sampler2D uSampler;',

        'uniform float radius;',
        'uniform float angle;',
        'uniform vec2 offset;',

        'void main(void) ***REMOVED***',
        '   vec2 coord = vTextureCoord - offset;',
        '   float distance = length(coord);',

        '   if (distance < radius) ***REMOVED***',
        '       float ratio = (radius - distance) / radius;',
        '       float angleMod = ratio * ratio * angle;',
        '       float s = sin(angleMod);',
        '       float c = cos(angleMod);',
        '       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);',
        '   ***REMOVED***',

        '   gl_FragColor = texture2D(uSampler, coord+offset);',
        '***REMOVED***'
    ];
***REMOVED***;

PIXI.TwistFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.TwistFilter.prototype.constructor = PIXI.TwistFilter;

/**
 * This point describes the the offset of the twist.
 * 
 * @property offset
 * @type Point
 */
Object.defineProperty(PIXI.TwistFilter.prototype, 'offset', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.offset.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.dirty = true;
        this.uniforms.offset.value = value;
    ***REMOVED***
***REMOVED***);

/**
 * This radius of the twist.
 * 
 * @property radius
 * @type Number
 */
Object.defineProperty(PIXI.TwistFilter.prototype, 'radius', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.radius.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.dirty = true;
        this.uniforms.radius.value = value;
    ***REMOVED***
***REMOVED***);

/**
 * This angle of the twist.
 * 
 * @property angle
 * @type Number
 */
Object.defineProperty(PIXI.TwistFilter.prototype, 'angle', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.angle.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.dirty = true;
        this.uniforms.angle.value = value;
    ***REMOVED***
***REMOVED***);
