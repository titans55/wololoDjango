/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The DisplacementFilter class uses the pixel values from the specified texture (called the displacement map) to perform a displacement of an object.
 * You can use this filter to apply all manor of crazy warping effects
 * Currently the r property of the texture is used offset the x and the g property of the texture is used to offset the y.
 * 
 * @class DisplacementFilter
 * @extends AbstractFilter
 * @constructor
 * @param texture ***REMOVED***Texture***REMOVED*** The texture used for the displacement map * must be power of 2 texture at the moment
 */
PIXI.DisplacementFilter = function(texture)
***REMOVED***
    PIXI.AbstractFilter.call( this );

    this.passes = [this];
    texture.baseTexture._powerOf2 = true;

    // set the uniforms
    this.uniforms = ***REMOVED***
        displacementMap: ***REMOVED***type: 'sampler2D', value:texture***REMOVED***,
        scale:           ***REMOVED***type: '2f', value:***REMOVED***x:30, y:30***REMOVED******REMOVED***,
        offset:          ***REMOVED***type: '2f', value:***REMOVED***x:0, y:0***REMOVED******REMOVED***,
        mapDimensions:   ***REMOVED***type: '2f', value:***REMOVED***x:1, y:5112***REMOVED******REMOVED***,
        dimensions:   ***REMOVED***type: '4fv', value:[0,0,0,0]***REMOVED***
    ***REMOVED***;

    if(texture.baseTexture.hasLoaded)
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
        'uniform sampler2D displacementMap;',
        'uniform sampler2D uSampler;',
        'uniform vec2 scale;',
        'uniform vec2 offset;',
        'uniform vec4 dimensions;',
        'uniform vec2 mapDimensions;',// = vec2(256.0, 256.0);',
        // 'const vec2 textureDimensions = vec2(750.0, 750.0);',

        'void main(void) ***REMOVED***',
        '   vec2 mapCords = vTextureCoord.xy;',
        //'   mapCords -= ;',
        '   mapCords += (dimensions.zw + offset)/ dimensions.xy ;',
        '   mapCords.y *= -1.0;',
        '   mapCords.y += 1.0;',
        '   vec2 matSample = texture2D(displacementMap, mapCords).xy;',
        '   matSample -= 0.5;',
        '   matSample *= scale;',
        '   matSample /= mapDimensions;',
        '   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + matSample.x, vTextureCoord.y + matSample.y));',
        '   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb, 1.0);',
        '   vec2 cord = vTextureCoord;',

        //'   gl_FragColor =  texture2D(displacementMap, cord);',
     //   '   gl_FragColor = gl_FragColor;',
        '***REMOVED***'
    ];
***REMOVED***;

PIXI.DisplacementFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.DisplacementFilter.prototype.constructor = PIXI.DisplacementFilter;

/**
 * Sets the map dimensions uniforms when the texture becomes available.
 *
 * @method onTextureLoaded
 */
PIXI.DisplacementFilter.prototype.onTextureLoaded = function()
***REMOVED***
    this.uniforms.mapDimensions.value.x = this.uniforms.displacementMap.value.width;
    this.uniforms.mapDimensions.value.y = this.uniforms.displacementMap.value.height;

    this.uniforms.displacementMap.value.baseTexture.off('loaded', this.boundLoadedFunction);
***REMOVED***;

/**
 * The texture used for the displacement map. Must be power of 2 texture.
 *
 * @property map
 * @type Texture
 */
Object.defineProperty(PIXI.DisplacementFilter.prototype, 'map', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.displacementMap.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.uniforms.displacementMap.value = value;
    ***REMOVED***
***REMOVED***);

/**
 * The multiplier used to scale the displacement result from the map calculation.
 *
 * @property scale
 * @type Point
 */
Object.defineProperty(PIXI.DisplacementFilter.prototype, 'scale', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.scale.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.uniforms.scale.value = value;
    ***REMOVED***
***REMOVED***);

/**
 * The offset used to move the displacement map.
 *
 * @property offset
 * @type Point
 */
Object.defineProperty(PIXI.DisplacementFilter.prototype, 'offset', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.offset.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.uniforms.offset.value = value;
    ***REMOVED***
***REMOVED***);
