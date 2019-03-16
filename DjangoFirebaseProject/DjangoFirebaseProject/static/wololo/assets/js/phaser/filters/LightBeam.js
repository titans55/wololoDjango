/**
* Original shader from http://glsl.heroku.com/e#4122.10
* Tweaked, uniforms added and converted to Phaser/PIXI by Richard Davey
*/
Phaser.Filter.LightBeam = function (game) ***REMOVED***

    Phaser.Filter.call(this, game);

    this.uniforms.alpha = ***REMOVED*** type: '1f', value: 1 ***REMOVED***;
    this.uniforms.thickness = ***REMOVED*** type: '1f', value: 70.0 ***REMOVED***;
    this.uniforms.speed = ***REMOVED*** type: '1f', value: 1.0 ***REMOVED***;
    this.uniforms.red = ***REMOVED*** type: '1f', value: 2.0 ***REMOVED***;
    this.uniforms.green = ***REMOVED*** type: '1f', value: 1.0 ***REMOVED***;
    this.uniforms.blue = ***REMOVED*** type: '1f', value: 1.0 ***REMOVED***;

    this.fragmentSrc = [

        "precision mediump float;",
        "uniform vec2      resolution;",
        "uniform float     time;",
        "uniform float     alpha;",
        "uniform float     thickness;",
        "uniform float     speed;",
        "uniform float     red;",
        "uniform float     green;",
        "uniform float     blue;",

        "void main(void) ***REMOVED***",

            "vec2 uPos = (gl_FragCoord.xy / resolution.xy);",

            "uPos.y -= 0.50;",

            "float vertColor = 0.0;",

            "for (float i = 0.0; i < 1.0; i++)",
            "***REMOVED***",
                "float t = time * (i + speed);",
                "uPos.y += sin(uPos.x + t) * 0.2;",
                "float fTemp = abs(1.0 / uPos.y / thickness);",
                "vertColor += fTemp;",
            "***REMOVED***",

            "vec4 color = vec4(vertColor * red, vertColor * green, vertColor * blue, alpha);",
            "gl_FragColor = color;",
        "***REMOVED***"
    ];

***REMOVED***;

Phaser.Filter.LightBeam.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.LightBeam.prototype.constructor = Phaser.Filter.LightBeam;

Phaser.Filter.LightBeam.prototype.init = function (width, height) ***REMOVED***

    this.setResolution(width, height);

***REMOVED***;

Object.defineProperty(Phaser.Filter.LightBeam.prototype, 'alpha', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.alpha.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.alpha.value = value;
    ***REMOVED***

***REMOVED***);

Object.defineProperty(Phaser.Filter.LightBeam.prototype, 'red', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.red.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.red.value = value;
    ***REMOVED***

***REMOVED***);

Object.defineProperty(Phaser.Filter.LightBeam.prototype, 'green', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.green.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.green.value = value;
    ***REMOVED***

***REMOVED***);

Object.defineProperty(Phaser.Filter.LightBeam.prototype, 'blue', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.blue.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.blue.value = value;
    ***REMOVED***

***REMOVED***);

Object.defineProperty(Phaser.Filter.LightBeam.prototype, 'thickness', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.thickness.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.thickness.value = value;
    ***REMOVED***

***REMOVED***);

Object.defineProperty(Phaser.Filter.LightBeam.prototype, 'speed', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.speed.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.speed.value = value;
    ***REMOVED***

***REMOVED***);
