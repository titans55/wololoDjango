/**
* Original shader from http://glsl.heroku.com/e#9213.0
* Tweaked, uniforms added and converted to Phaser/PIXI by Richard Davey
*/
Phaser.Filter.Marble = function (game) ***REMOVED***

    Phaser.Filter.call(this, game);

    this.uniforms.alpha = ***REMOVED*** type: '1f', value: 1.0 ***REMOVED***;

    // Drives speed, higher number will make it slower.
    this.uniforms.fluid_speed = ***REMOVED*** type: '1f', value: 10.0 ***REMOVED***;

    this.uniforms.color_intensity = ***REMOVED*** type: '1f', value: 0.30 ***REMOVED***;

    //  The fragment shader source
    this.fragmentSrc = [

        "precision mediump float;",
        "uniform vec2      resolution;",
        "uniform float     time;",
        "uniform vec2      mouse;",
        "uniform float     alpha;",
        "uniform float     fluid_speed;",
        "uniform float     color_intensity;",

        "const int   complexity      = 40;    // More points of color.",
        "const float mouse_factor    = 25.0;  // Makes it more/less jumpy.",
        "const float mouse_offset    = 5.0;   // Drives complexity in the amount of curls/cuves.  Zero is a single whirlpool.",

        "const float Pi = 3.14159;",

        "float sinApprox(float x) ***REMOVED***",
            "x = Pi + (2.0 * Pi) * floor(x / (2.0 * Pi)) - x;",
            "return (4.0 / Pi) * x - (4.0 / Pi / Pi) * x * abs(x);",
        "***REMOVED***",

        "float cosApprox(float x) ***REMOVED***",
            "return sinApprox(x + 0.5 * Pi);",
        "***REMOVED***",

        "void main()",
        "***REMOVED***",
            "vec2 p=(2.0*gl_FragCoord.xy-resolution)/max(resolution.x,resolution.y);",
            "for(int i=1;i<complexity;i++)",
            "***REMOVED***",
                "vec2 newp=p;",
                "newp.x+=0.6/float(i)*sin(float(i)*p.y+time/fluid_speed+0.3*float(i))+mouse.y/mouse_factor+mouse_offset;",
                "newp.y+=0.6/float(i)*sin(float(i)*p.x+time/fluid_speed+0.3*float(i+10))-mouse.x/mouse_factor+mouse_offset;",
                "p=newp;",
            "***REMOVED***",
            "vec3 col=vec3(color_intensity*sin(3.0*p.x)+color_intensity,color_intensity*sin(3.0*p.y)+color_intensity,color_intensity*sin(p.x+p.y)+color_intensity);",
            "gl_FragColor=vec4(col, alpha);",
        "***REMOVED***"
    ];

***REMOVED***;

Phaser.Filter.Marble.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Marble.prototype.constructor = Phaser.Filter.Marble;

Phaser.Filter.Marble.prototype.init = function (width, height, speed, intensity) ***REMOVED***

    this.setResolution(width, height);

    if (typeof speed === 'undefined') ***REMOVED*** speed = 10.0; ***REMOVED***
    if (typeof intensity === 'undefined') ***REMOVED*** intensity = 0.30; ***REMOVED***

    this.uniforms.fluid_speed.value = speed;
    this.uniforms.color_intensity.value = intensity;

***REMOVED***;

Object.defineProperty(Phaser.Filter.Marble.prototype, 'alpha', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.alpha.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.alpha.value = value;
    ***REMOVED***

***REMOVED***);

Object.defineProperty(Phaser.Filter.Marble.prototype, 'speed', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.fluid_speed.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.fluid_speed.value = value;
    ***REMOVED***

***REMOVED***);

Object.defineProperty(Phaser.Filter.Marble.prototype, 'intensity', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.color_intensity.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.color_intensity.value = value;
    ***REMOVED***

***REMOVED***);
