/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The AlphaMaskFilter class uses the pixel values from the specified texture (called the displacement map) to perform a displacement of an object.
 * You can use this filter to apply all manor of crazy warping effects
 * Currently the r property of the texture is used to offset the x and the g property of the texture is used to offset the y.
 * 
 * @class AlphaMaskFilter
 * @extends AbstractFilter
 * @constructor
 * @param texture ***REMOVED***Texture***REMOVED*** The texture used for the displacement map * must be power of 2 texture at the moment
 */
PIXI.AlphaMaskFilter = function(texture)
***REMOVED***
    PIXI.AbstractFilter.call(this);

    this.passes = [this];
    texture.baseTexture._powerOf2 = true;

    // set the uniforms
    this.uniforms = ***REMOVED***
        mask: ***REMOVED***type: 'sampler2D', value:texture***REMOVED***,
        mapDimensions:   ***REMOVED***type: '2f', value:***REMOVED***x:1, y:5112***REMOVED******REMOVED***,
        dimensions:   ***REMOVED***type: '4fv', value:[0,0,0,0]***REMOVED***
    ***REMOVED***;

    if (texture.baseTexture.hasLoaded)
    ***REMOVED***
        this.uniforms.mapDimensions.value.x = texture.width;
        this.uniforms.mapDimensions.value.y = texture.height;
    ***REMOVED***
    else
    ***REMOVED***
        this.boundLoadedFunction = this.onTextureLoaded.bind(this);

        texture.baseTexture.on('loaded', this.boundLoadedFunction);
    ***REMOVED***

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform sampler2D mask;',
        'uniform sampler2D uSampler;',
        'uniform vec2 offset;',
        'uniform vec4 dimensions;',
        'uniform vec2 mapDimensions;',

        'void main(void) ***REMOVED***',
        '   vec2 mapCords = vTextureCoord.xy;',
        '   mapCords += (dimensions.zw + offset)/ dimensions.xy ;',
        '   mapCords.y *= -1.0;',
        '   mapCords.y += 1.0;',
        '   mapCords *= dimensions.xy / mapDimensions;',

        '   vec4 original =  texture2D(uSampler, vTextureCoord);',
        '   float maskAlpha =  texture2D(mask, mapCords).r;',
        '   original *= maskAlpha;',
        '   gl_FragColor =  original;',
        '***REMOVED***'
    ];
***REMOVED***;

PIXI.AlphaMaskFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.AlphaMaskFilter.prototype.constructor = PIXI.AlphaMaskFilter;

/**
 * Sets the map dimensions uniforms when the texture becomes available.
 *
 * @method onTextureLoaded
 */
PIXI.AlphaMaskFilter.prototype.onTextureLoaded = function()
***REMOVED***
    this.uniforms.mapDimensions.value.x = this.uniforms.mask.value.width;
    this.uniforms.mapDimensions.value.y = this.uniforms.mask.value.height;

    this.uniforms.mask.value.baseTexture.off('loaded', this.boundLoadedFunction);
***REMOVED***;

/**
 * The texture used for the displacement map. Must be power of 2 sized texture.
 *
 * @property map
 * @type Texture
 */
Object.defineProperty(PIXI.AlphaMaskFilter.prototype, 'map', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.mask.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.mask.value = value;
    ***REMOVED***
***REMOVED***);
