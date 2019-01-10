/**
* Original shader by Daniil (https://www.shadertoy.com/view/4sl3DH)
* Tweaked, uniforms added and converted to Phaser/PIXI by Richard Davey
*/
Phaser.Filter.HueRotate = function (game) ***REMOVED***

    Phaser.Filter.call(this, game);

    this.uniforms.alpha = ***REMOVED*** type: '1f', value: 1.0 ***REMOVED***;
    this.uniforms.size = ***REMOVED*** type: '1f', value: 0.03 ***REMOVED***;
    this.uniforms.iChannel0 = ***REMOVED*** type: 'sampler2D', value: null, textureData: ***REMOVED*** repeat: true ***REMOVED*** ***REMOVED***;

    this.fragmentSrc = [

        "precision mediump float;",
        "uniform vec2      resolution;",
        "uniform float     time;",
        "uniform float     alpha;",
        "uniform sampler2D iChannel0;",

        "/* Simple hue rotation filter based on article:",
        "http://beesbuzz.biz/code/hsv_color_transforms.php",
        "*/",

        "#define SPEED 10.0",

        "void main(void)",
        "***REMOVED***",
            "vec2 uv = gl_FragCoord.xy / resolution.xy;",

            "float c = cos(time * SPEED);",
            "float s = sin(time * SPEED);",

            "mat4 hueRotation =",
            "mat4(   0.299,  0.587,  0.114, 0.0,",
            "0.299,  0.587,  0.114, 0.0,",
            "0.299,  0.587,  0.114, 0.0,",
            "0.000,  0.000,  0.000, 1.0) +",

            "mat4(   0.701, -0.587, -0.114, 0.0,",
            "-0.299,  0.413, -0.114, 0.0,",
            "-0.300, -0.588,  0.886, 0.0,",
            "0.000,  0.000,  0.000, 0.0) * c +",

            "mat4(   0.168,  0.330, -0.497, 0.0,",
            "-0.328,  0.035,  0.292, 0.0,",
            "1.250, -1.050, -0.203, 0.0,",
            "0.000,  0.000,  0.000, 0.0) * s;",

            "vec4 pixel = texture2D(iChannel0, uv);",

            "gl_FragColor = pixel * hueRotation;",
        "***REMOVED***"
    ];

***REMOVED***;

Phaser.Filter.HueRotate.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.HueRotate.prototype.constructor = Phaser.Filter.HueRotate;

Phaser.Filter.HueRotate.prototype.init = function (width, height, texture) ***REMOVED***

    this.setResolution(width, height);

    this.uniforms.iChannel0.value = texture;

***REMOVED***;

Object.defineProperty(Phaser.Filter.HueRotate.prototype, 'alpha', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.alpha.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.alpha.value = value;
    ***REMOVED***

***REMOVED***);
