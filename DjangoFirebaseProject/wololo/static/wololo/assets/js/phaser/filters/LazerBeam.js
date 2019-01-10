/**
* A sample demonstrating how to create new Phaser Filters.
*/
Phaser.Filter.LazerBeam = function (game) ***REMOVED***

    Phaser.Filter.call(this, game);

    this.uniforms.divisor = ***REMOVED*** type: '1f', value: 0.5 ***REMOVED***;

    this.fragmentSrc = [

        "precision mediump float;",
        "uniform vec2      resolution;",
        "uniform float     time;",
        "uniform float     divisor;",

        "void main(void) ***REMOVED***",

            "vec2 p = (gl_FragCoord.yx / resolution.yx) - .5;",
            "float sx = 0.3 * (p.x+ 0.8) * sin(900.0 * p.x - 1. * pow(time, 0.55)*5.);",
            "float dy = 4. / ( 500.0 * abs(p.y - sx));",
            "dy += 1./ (25. * length(p - vec2(p.x, 0)));",
            "gl_FragColor = vec4((p.x + 0.1) * dy, 0.3 * dy, dy, 1.1);",

        "***REMOVED***"
    ];

***REMOVED***;

Phaser.Filter.LazerBeam.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.LazerBeam.prototype.constructor = Phaser.Filter.LazerBeam;

Phaser.Filter.LazerBeam.prototype.init = function (width, height, divisor) ***REMOVED***

    if (typeof divisor == 'undefined') ***REMOVED*** divisor = 0.5; ***REMOVED***

    this.setResolution(width, height);
    this.uniforms.divisor.value = divisor;

***REMOVED***;
