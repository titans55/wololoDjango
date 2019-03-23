/**
* Original shader by TriggerHLM (https://www.shadertoy.com/view/MdXGDH)
* Tweaked, uniforms added and converted to Phaser/PIXI by Richard Davey
*/
Phaser.Filter.Plasma = function (game) ***REMOVED***

    Phaser.Filter.call(this, game);

    this.uniforms.alpha = ***REMOVED*** type: '1f', value: 1.0 ***REMOVED***;
    this.uniforms.size = ***REMOVED*** type: '1f', value: 0.03 ***REMOVED***;
    this.uniforms.redShift = ***REMOVED*** type: '1f', value: 0.5 ***REMOVED***;
    this.uniforms.greenShift = ***REMOVED*** type: '1f', value: 0.5 ***REMOVED***;
    this.uniforms.blueShift = ***REMOVED*** type: '1f', value: 0.9 ***REMOVED***;

    this.fragmentSrc = [

        "precision mediump float;",
        "uniform float     time;",
        "uniform float     alpha;",
        "uniform float     size;",
        "uniform float     redShift;",
        "uniform float     greenShift;",
        "uniform float     blueShift;",

        "const float PI = 3.14159265;",

        "float ptime = time * 0.1;",

        "void main(void) ***REMOVED***",

            "float color1, color2, color;",

            "color1 = (sin(dot(gl_FragCoord.xy, vec2(sin(ptime * 3.0), cos(ptime * 3.0))) * 0.02 + ptime * 3.0) + 1.0) / 2.0;",
            "vec2 center = vec2(640.0 / 2.0, 360.0 / 2.0) + vec2(640.0 / 2.0 * sin(-ptime * 3.0), 360.0 / 2.0 * cos(-ptime * 3.0));",
            "color2 = (cos(length(gl_FragCoord.xy - center) * size) + 1.0) / 2.0;",
            "color = (color1 + color2) / 2.0;",

            "float red = (cos(PI * color / redShift + ptime * 3.0) + 1.0) / 2.0;",
            "float green = (sin(PI * color / greenShift + ptime * 3.0) + 1.0) / 2.0;",
            "float blue = (sin(PI * color / blueShift + ptime * 3.0) + 1.0) / 2.0;",

            "gl_FragColor = vec4(red, green, blue, alpha);",
        "***REMOVED***"
    ];

***REMOVED***;

Phaser.Filter.Plasma.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Plasma.prototype.constructor = Phaser.Filter.Plasma;

Phaser.Filter.Plasma.prototype.init = function (width, height, alpha, size) ***REMOVED***

    this.setResolution(width, height);

    if (typeof alpha !== 'undefined') ***REMOVED***
        this.uniforms.alpha.value = alpha;
    ***REMOVED***

    if (typeof size !== 'undefined') ***REMOVED***
        this.uniforms.size.value = size;
    ***REMOVED***

***REMOVED***;

Object.defineProperty(Phaser.Filter.Plasma.prototype, 'alpha', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.alpha.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.alpha.value = value;
    ***REMOVED***

***REMOVED***);

Object.defineProperty(Phaser.Filter.Plasma.prototype, 'size', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.size.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.size.value = value;
    ***REMOVED***

***REMOVED***);

Object.defineProperty(Phaser.Filter.Plasma.prototype, 'redShift', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.redShift.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.redShift.value = value;
    ***REMOVED***

***REMOVED***);

Object.defineProperty(Phaser.Filter.Plasma.prototype, 'greenShift', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.greenShift.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.greenShift.value = value;
    ***REMOVED***

***REMOVED***);

Object.defineProperty(Phaser.Filter.Plasma.prototype, 'blueShift', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.blueShift.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.blueShift.value = value;
    ***REMOVED***

***REMOVED***);
