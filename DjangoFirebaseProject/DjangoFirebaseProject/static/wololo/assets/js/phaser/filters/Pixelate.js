/**
* Original author of PixelateFilter: Mat Groves http://matgroves.com/ @Doormat23
* adapted for Phaser.js
*/

/**
* This filter applies a pixelate effect making display objects appear 'blocky'.
* @class PixelateFilter
* @constructor
*/
Phaser.Filter.Pixelate = function(game) ***REMOVED***

    Phaser.Filter.call(this, game);

    this.uniforms.invert = ***REMOVED*** type: '1f', value: 0 ***REMOVED***;
    this.uniforms.pixelSize = ***REMOVED*** type: '2f', value: ***REMOVED*** x: 1.0, y: 1.0 ***REMOVED*** ***REMOVED***;
    this.uniforms.dimensions = ***REMOVED*** type: '2f', value: ***REMOVED*** x: 1000.0, y: 1000.0 ***REMOVED*** ***REMOVED***;

    this.fragmentSrc = [

        "precision mediump float;",
        "varying vec2 vTextureCoord;",
        "uniform vec2 dimensions;",
        "uniform vec2 pixelSize;",
        "uniform sampler2D uSampler;",

        "void main(void)",
        "***REMOVED***",

            "vec2 coord = vTextureCoord;",
            "vec2 size = dimensions.xy/pixelSize;",
            "vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;",
            "gl_FragColor = texture2D(uSampler, color);",
        "***REMOVED***"
    ];
***REMOVED***;

Phaser.Filter.Pixelate.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Pixelate.prototype.constructor = Phaser.Filter.Pixelate;

/**
* An object with visible x and y properties that are used to define the size of the filter effect per pixel.
* 
* @property size
* @type Phaser.Point
*/
Object.defineProperty(Phaser.Filter.Pixelate.prototype, 'size', ***REMOVED***

    get: function() ***REMOVED***

        return this.uniforms.pixelSize.value;

    ***REMOVED***,

    set: function(value) ***REMOVED***

        this.dirty = true;
        this.uniforms.pixelSize.value = value;

    ***REMOVED***

***REMOVED***);

/**
* A value that defines the horizontal size of the filter effect per pixel.
* 
* @property sizeX
* @type number
*/
Object.defineProperty(Phaser.Filter.Pixelate.prototype, 'sizeX', ***REMOVED***

    get: function() ***REMOVED***

        return this.uniforms.pixelSize.value.x;

    ***REMOVED***,

    set: function(value) ***REMOVED***

        this.dirty = true;
        this.uniforms.pixelSize.value.x = value;

    ***REMOVED***

***REMOVED***);

/**
* A value that defines the vertical size of the filter effect per pixel.
* 
* @property sizeY
* @type number
*/
Object.defineProperty(Phaser.Filter.Pixelate.prototype, 'sizeY', ***REMOVED***

    get: function() ***REMOVED***

        return this.uniforms.pixelSize.value.y;

    ***REMOVED***,

    set: function(value) ***REMOVED***

        this.dirty = true;
        this.uniforms.pixelSize.value.y = value;

    ***REMOVED***

***REMOVED***);
