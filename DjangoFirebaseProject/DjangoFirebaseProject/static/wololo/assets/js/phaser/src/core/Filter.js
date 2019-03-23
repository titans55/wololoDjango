/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* This is a base Filter class to use for any Phaser filter development.
*
* The vast majority of filters (including all of those that ship with Phaser) use fragment shaders, and
* therefore only work in WebGL and are not supported by Canvas at all.
*
* @class Phaser.Filter
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***object***REMOVED*** uniforms - Uniform mappings object
* @param ***REMOVED***Array|string***REMOVED*** fragmentSrc - The fragment shader code. Either an array, one element per line of code, or a string.
*/
Phaser.Filter = function (game, uniforms, fragmentSrc) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object, either Phaser.WEBGL_FILTER or Phaser.CANVAS_FILTER.
    * @default
    */
    this.type = Phaser.WEBGL_FILTER;

    /**
    * An array of passes - some filters contain a few steps this array simply stores the steps in a linear fashion.
    * For example the blur filter has two passes blurX and blurY.
    * @property ***REMOVED***array***REMOVED*** passes - An array of filter objects.
    * @private
    */
    this.passes = [this];

    /**
    * @property ***REMOVED***array***REMOVED*** shaders - Array an array of shaders.
    * @private
    */
    this.shaders = [];

    /**
    * @property ***REMOVED***boolean***REMOVED*** dirty - Internal PIXI var.
    * @default
    */
    this.dirty = true;

    /**
    * @property ***REMOVED***number***REMOVED*** padding - Internal PIXI var.
    * @default
    */
    this.padding = 0;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** prevPoint - The previous position of the pointer (we don't update the uniform if the same)
    */
    this.prevPoint = new Phaser.Point();

    /*
    * The supported types are: 1f, 1fv, 1i, 2f, 2fv, 2i, 2iv, 3f, 3fv, 3i, 3iv, 4f, 4fv, 4i, 4iv, mat2, mat3, mat4 and sampler2D.
    */

    var d = new Date();

    /**
    * @property ***REMOVED***object***REMOVED*** uniforms - Default uniform mappings. Compatible with ShaderToy and GLSLSandbox.
    */
    this.uniforms = ***REMOVED***

        resolution: ***REMOVED*** type: '2f', value: ***REMOVED*** x: 256, y: 256 ***REMOVED******REMOVED***,
        time: ***REMOVED*** type: '1f', value: 0 ***REMOVED***,
        mouse: ***REMOVED*** type: '2f', value: ***REMOVED*** x: 0.0, y: 0.0 ***REMOVED*** ***REMOVED***,
        date: ***REMOVED*** type: '4fv', value: [ d.getFullYear(),  d.getMonth(),  d.getDate(), d.getHours() *60 * 60 + d.getMinutes() * 60 + d.getSeconds() ] ***REMOVED***,
        sampleRate: ***REMOVED*** type: '1f', value: 44100.0 ***REMOVED***,
        iChannel0: ***REMOVED*** type: 'sampler2D', value: null, textureData: ***REMOVED*** repeat: true ***REMOVED*** ***REMOVED***,
        iChannel1: ***REMOVED*** type: 'sampler2D', value: null, textureData: ***REMOVED*** repeat: true ***REMOVED*** ***REMOVED***,
        iChannel2: ***REMOVED*** type: 'sampler2D', value: null, textureData: ***REMOVED*** repeat: true ***REMOVED*** ***REMOVED***,
        iChannel3: ***REMOVED*** type: 'sampler2D', value: null, textureData: ***REMOVED*** repeat: true ***REMOVED*** ***REMOVED***

    ***REMOVED***;

    //  Copy over/replace any passed in the constructor
    if (uniforms)
    ***REMOVED***
        for (var key in uniforms)
        ***REMOVED***
            this.uniforms[key] = uniforms[key];
        ***REMOVED***
    ***REMOVED***

    /**
    * @property ***REMOVED***array|string***REMOVED*** fragmentSrc - The fragment shader code.
    */
    this.fragmentSrc = fragmentSrc || '';

***REMOVED***;

Phaser.Filter.prototype = ***REMOVED***

    /**
    * Should be over-ridden.
    * @method Phaser.Filter#init
    */
    init: function () ***REMOVED***
        //  This should be over-ridden. Will receive a variable number of arguments.
    ***REMOVED***,

    /**
    * Set the resolution uniforms on the filter.
    * @method Phaser.Filter#setResolution
    * @param ***REMOVED***number***REMOVED*** width - The width of the display.
    * @param ***REMOVED***number***REMOVED*** height - The height of the display.
    */
    setResolution: function (width, height) ***REMOVED***

        this.uniforms.resolution.value.x = width;
        this.uniforms.resolution.value.y = height;

    ***REMOVED***,

    /**
    * Updates the filter.
    * @method Phaser.Filter#update
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** [pointer] - A Pointer object to use for the filter. The coordinates are mapped to the mouse uniform.
    */
    update: function (pointer) ***REMOVED***

        if (typeof pointer !== 'undefined')
        ***REMOVED***
            var x = pointer.x / this.game.width;
            var y = 1 - pointer.y / this.game.height;

            if (x !== this.prevPoint.x || y !== this.prevPoint.y)
            ***REMOVED***
                this.uniforms.mouse.value.x = x.toFixed(2);
                this.uniforms.mouse.value.y = y.toFixed(2);
                this.prevPoint.set(x, y);
            ***REMOVED***
        ***REMOVED***

        this.uniforms.time.value = this.game.time.totalElapsedSeconds();

    ***REMOVED***,

    /**
    * Creates a new Phaser.Image object using a blank texture and assigns 
    * this Filter to it. The image is then added to the world.
    *
    * If you don't provide width and height values then Filter.width and Filter.height are used.
    *
    * If you do provide width and height values then this filter will be resized to match those
    * values.
    *
    * @method Phaser.Filter#addToWorld
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate to place the Image at.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate to place the Image at.
    * @param ***REMOVED***number***REMOVED*** [width] - The width of the Image. If not specified (or null) it will use Filter.width. If specified Filter.width will be set to this value.
    * @param ***REMOVED***number***REMOVED*** [height] - The height of the Image. If not specified (or null) it will use Filter.height. If specified Filter.height will be set to this value.
    * @param ***REMOVED***number***REMOVED*** [anchorX=0] - Set the x anchor point of the Image. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
    * @param ***REMOVED***number***REMOVED*** [anchorY=0] - Set the y anchor point of the Image. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
    * @return ***REMOVED***Phaser.Image***REMOVED*** The newly added Image object.
    */
    addToWorld: function (x, y, width, height, anchorX, anchorY) ***REMOVED***

        if (anchorX === undefined) ***REMOVED*** anchorX = 0; ***REMOVED***
        if (anchorY === undefined) ***REMOVED*** anchorY = 0; ***REMOVED***

        if (width !== undefined && width !== null)
        ***REMOVED***
            this.width = width;
        ***REMOVED***
        else
        ***REMOVED***
            width = this.width;
        ***REMOVED***

        if (height !== undefined && height !== null)
        ***REMOVED***
            this.height = height;
        ***REMOVED***
        else
        ***REMOVED***
            height = this.height;
        ***REMOVED***

        var image = this.game.add.image(x, y, '__default');

        image.width = width;
        image.height = height;

        image.anchor.set(anchorX, anchorY);

        image.filters = [ this ];

        return image;

    ***REMOVED***,

    /**
    * Clear down this Filter and null out references
    * @method Phaser.Filter#destroy
    */
    destroy: function () ***REMOVED***

        this.game = null;

    ***REMOVED***

***REMOVED***;

Phaser.Filter.prototype.constructor = Phaser.Filter;

/**
* @name Phaser.Filter#width
* @property ***REMOVED***number***REMOVED*** width - The width (resolution uniform)
*/
Object.defineProperty(Phaser.Filter.prototype, 'width', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.resolution.value.x;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.resolution.value.x = value;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Filter#height
* @property ***REMOVED***number***REMOVED*** height - The height (resolution uniform)
*/
Object.defineProperty(Phaser.Filter.prototype, 'height', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.resolution.value.y;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.resolution.value.y = value;
    ***REMOVED***

***REMOVED***);
