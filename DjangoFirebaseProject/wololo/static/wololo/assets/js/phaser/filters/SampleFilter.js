/**
* A sample demonstrating how to create new Phaser Filters.
*/
Phaser.Filter.SampleFilter = function (game) ***REMOVED***

    Phaser.Filter.call(this, game);

    /**
    * By default the following uniforms are already created and available:
    *
    * uniform float time - The current number of elapsed milliseconds in the game.
    * uniform vec2 resolution - The dimensions of the filter. Can be set via setSize(width, height)
    * uniform vec2 mouse - The mouse / touch coordinates taken from the pointer given to the update function, if any.
    * uniform sampler2D uSampler - The current texture (usually the texture of the Sprite the shader is bound to)
    *
    * Add in any additional vars you require. Here is a new one called 'wobble' that is a 2f:
    *
    * this.uniforms.wobble = ***REMOVED*** type: '2f', value: ***REMOVED*** x: 0, y: 0 ***REMOVED******REMOVED***;
    *
    * The supported types are: 1f, 1fv, 1i, 2f, 2fv, 2i, 2iv, 3f, 3fv, 3i, 3iv, 4f, 4fv, 4i, 4iv, mat2, mat3, mat4 and sampler2D.
    */

    this.uniforms.divisor = ***REMOVED*** type: '1f', value: 0.5 ***REMOVED***;

    //  The fragment shader source
    this.fragmentSrc = [

        "precision mediump float;",
        "uniform vec2      resolution;",
        "uniform float     time;",
        "uniform float     divisor;",

        "void main(void) ***REMOVED***",
            "vec2 uv = gl_FragCoord.xy / resolution.xy;",
            "gl_FragColor = vec4(uv, divisor * sin(time), 0.0);",
        "***REMOVED***"
    ];

***REMOVED***;

Phaser.Filter.SampleFilter.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.SampleFilter.prototype.constructor = Phaser.Filter.SampleFilter;

Phaser.Filter.SampleFilter.prototype.init = function (width, height, divisor) ***REMOVED***

    if (typeof divisor == 'undefined') ***REMOVED*** divisor = 0.5; ***REMOVED***

    this.setResolution(width, height);
    this.uniforms.divisor.value = divisor;

***REMOVED***;
