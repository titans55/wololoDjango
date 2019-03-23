/**
* Original shader by 4rknova (https://www.shadertoy.com/view/lssGDn)
* Tweaked, uniforms added and converted to Phaser/PIXI by Richard Davey
*/
Phaser.Filter.Tunnel = function (game) ***REMOVED***

    Phaser.Filter.call(this, game);

    this.uniforms.alpha = ***REMOVED*** type: '1f', value: 1 ***REMOVED***;
    this.uniforms.origin = ***REMOVED*** type: '1f', value: 2.0 ***REMOVED***;
    this.uniforms.iChannel0 = ***REMOVED*** type: 'sampler2D', value: null, textureData: ***REMOVED*** repeat: true ***REMOVED*** ***REMOVED***;

    this.fragmentSrc = [

        "precision mediump float;",
        "uniform vec2      resolution;",
        "uniform float     time;",
        "uniform sampler2D iChannel0;",
        "uniform float     alpha;",
        "uniform float     origin;",

        "#define S 0.79577471545 // Precalculated 2.5 / PI",
        "#define E 0.0001",

        "void main(void)",
        "***REMOVED***",
            "vec2 p = (origin * gl_FragCoord.xy / resolution.xy - 1.0) * vec2(resolution.x / resolution.y, 1.0);",
            "vec2 t = vec2(S * atan(p.x, p.y), 1.0 / max(length(p), E));",
            "vec3 c = texture2D(iChannel0, t + vec2(time * 0.1, time)).xyz;",
            "gl_FragColor = vec4(c / (t.y + 0.5), alpha);",
        "***REMOVED***"

    ];

***REMOVED***;

Phaser.Filter.Tunnel.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Tunnel.prototype.constructor = Phaser.Filter.Tunnel;

Phaser.Filter.Tunnel.prototype.init = function (width, height, texture) ***REMOVED***

    this.setResolution(width, height);
    this.uniforms.iChannel0.value = texture;

    texture.baseTexture._powerOf2 = true;

***REMOVED***;

Object.defineProperty(Phaser.Filter.Tunnel.prototype, 'alpha', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.alpha.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.alpha.value = value;
    ***REMOVED***

***REMOVED***);

Object.defineProperty(Phaser.Filter.Tunnel.prototype, 'origin', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.origin.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.origin.value = value;
    ***REMOVED***

***REMOVED***);
