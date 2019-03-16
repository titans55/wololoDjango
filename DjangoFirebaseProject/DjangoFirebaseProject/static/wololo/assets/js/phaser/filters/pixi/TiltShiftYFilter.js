/**
 * @author Vico @vicocotea
 * original filter https://github.com/evanw/glfx.js/blob/master/src/filters/blur/tiltshift.js by Evan Wallace : http://madebyevan.com/
 */

/**
 * A TiltShiftYFilter.
 * 
 * @class TiltShiftYFilter
 * @extends AbstractFilter
 * @constructor
 */
PIXI.TiltShiftYFilter = function()
***REMOVED***
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    // set the uniforms
    this.uniforms = ***REMOVED***
        blur: ***REMOVED***type: '1f', value: 100.0***REMOVED***,
        gradientBlur: ***REMOVED***type: '1f', value: 600.0***REMOVED***,
        start: ***REMOVED***type: '2f', value:***REMOVED***x:0, y:window.screenHeight / 2***REMOVED******REMOVED***,
        end: ***REMOVED***type: '2f', value:***REMOVED***x:600, y:window.screenHeight / 2***REMOVED******REMOVED***,
        delta: ***REMOVED***type: '2f', value:***REMOVED***x:30, y:30***REMOVED******REMOVED***,
        texSize: ***REMOVED***type: '2f', value:***REMOVED***x:window.screenWidth, y:window.screenHeight***REMOVED******REMOVED***
    ***REMOVED***;
    
    this.updateDelta();

    this.fragmentSrc = [
        'precision mediump float;',
        'uniform sampler2D uSampler;',
        'uniform float blur;',
        'uniform float gradientBlur;',
        'uniform vec2 start;',
        'uniform vec2 end;',
        'uniform vec2 delta;',
        'uniform vec2 texSize;',
        'varying vec2 vTextureCoord;',

        'float random(vec3 scale, float seed) ***REMOVED***',
        '   return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);',
        '***REMOVED***',

        'void main(void) ***REMOVED***',
        '    vec4 color = vec4(0.0);',
        '    float total = 0.0;',
        
        '    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);',
        '    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));',
        '    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;',
        
        '    for (float t = -30.0; t <= 30.0; t++) ***REMOVED***',
        '        float percent = (t + offset - 0.5) / 30.0;',
        '        float weight = 1.0 - abs(percent);',
        '        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);',
        '        sample.rgb *= sample.a;',
        '        color += sample * weight;',
        '        total += weight;',
        '    ***REMOVED***',

        '    gl_FragColor = color / total;',
        '    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;',
        '***REMOVED***'
    ];
***REMOVED***;

PIXI.TiltShiftYFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.TiltShiftYFilter.prototype.constructor = PIXI.TiltShiftYFilter;

/**
 * The strength of the blur.
 *
 * @property blur
 * @type Number
 */
Object.defineProperty(PIXI.TiltShiftYFilter.prototype, 'blur', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.blur.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.dirty = true;
        this.uniforms.blur.value = value;
    ***REMOVED***
***REMOVED***);

/**
 * The strength of the gradient blur.
 *
 * @property gradientBlur
 * @type Number
 */
Object.defineProperty(PIXI.TiltShiftYFilter.prototype, 'gradientBlur', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.gradientBlur.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.dirty = true;
        this.uniforms.gradientBlur.value = value;
    ***REMOVED***
***REMOVED***);

/**
 * The Y value to start the effect at.
 *
 * @property start
 * @type Number
 */
Object.defineProperty(PIXI.TiltShiftYFilter.prototype, 'start', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.start.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.dirty = true;
        this.uniforms.start.value = value;
        this.updateDelta();
    ***REMOVED***
***REMOVED***);

/**
 * The Y value to end the effect at.
 *
 * @property end
 * @type Number
 */
Object.defineProperty(PIXI.TiltShiftYFilter.prototype, 'end', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.end.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.dirty = true;
        this.uniforms.end.value = value;
        this.updateDelta();
    ***REMOVED***
***REMOVED***);

/**
 * Updates the filter delta values.
 *
 * @method updateDelta
 */
PIXI.TiltShiftYFilter.prototype.updateDelta = function()***REMOVED***
    var dx = this.uniforms.end.value.x - this.uniforms.start.value.x;
    var dy = this.uniforms.end.value.y - this.uniforms.start.value.y;
    var d = Math.sqrt(dx * dx + dy * dy);
    this.uniforms.delta.value.x = -dy / d;
    this.uniforms.delta.value.y = dx / d;
***REMOVED***;
