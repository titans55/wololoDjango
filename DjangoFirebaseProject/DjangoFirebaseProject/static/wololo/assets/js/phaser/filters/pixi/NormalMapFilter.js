/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * The NormalMapFilter class uses the pixel values from the specified texture (called the displacement map) to perform a displacement of an object. 
 * You can use this filter to apply all manor of crazy warping effects
 * Currently the r property of the texture is used offset the x and the g property of the texture is used to offset the y.
 * 
 * @class NormalMapFilter
 * @extends AbstractFilter
 * @constructor
 * @param texture ***REMOVED***Texture***REMOVED*** The texture used for the displacement map * must be power of 2 texture at the moment
 */
PIXI.NormalMapFilter = function(texture)
***REMOVED***
    PIXI.AbstractFilter.call( this );
    
    this.passes = [this];
    texture.baseTexture._powerOf2 = true;

    // set the uniforms
    this.uniforms = ***REMOVED***
        displacementMap: ***REMOVED***type: 'sampler2D', value:texture***REMOVED***,
        scale:           ***REMOVED***type: '2f', value:***REMOVED***x:15, y:15***REMOVED******REMOVED***,
        offset:          ***REMOVED***type: '2f', value:***REMOVED***x:0, y:0***REMOVED******REMOVED***,
        mapDimensions:   ***REMOVED***type: '2f', value:***REMOVED***x:1, y:1***REMOVED******REMOVED***,
        dimensions:   ***REMOVED***type: '4f', value:[0,0,0,0]***REMOVED***,
    //  LightDir: ***REMOVED***type: 'f3', value:[0, 1, 0]***REMOVED***,
        LightPos: ***REMOVED***type: '3f', value:[0, 1, 0]***REMOVED***
    ***REMOVED***;
    

    if(texture.baseTexture.hasLoaded)
    ***REMOVED***
        this.uniforms.mapDimensions.value.x = texture.width;
        this.uniforms.mapDimensions.value.y = texture.height;
    ***REMOVED***
    else
    ***REMOVED***
        this.boundLoadedFunction = this.onTextureLoaded.bind(this);

        texture.baseTexture.on("loaded", this.boundLoadedFunction);
    ***REMOVED***

    this.fragmentSrc = [
      "precision mediump float;",
      "varying vec2 vTextureCoord;",
      "varying float vColor;",
      "uniform sampler2D displacementMap;",
      "uniform sampler2D uSampler;",
     
      "uniform vec4 dimensions;",
      
        "const vec2 Resolution = vec2(1.0,1.0);",      //resolution of screen
        "uniform vec3 LightPos;",    //light position, normalized
        "const vec4 LightColor = vec4(1.0, 1.0, 1.0, 1.0);",      //light RGBA -- alpha is intensity
        "const vec4 AmbientColor = vec4(1.0, 1.0, 1.0, 0.5);",    //ambient RGBA -- alpha is intensity 
        "const vec3 Falloff = vec3(0.0, 1.0, 0.2);",         //attenuation coefficients

        "uniform vec3 LightDir;",//" = vec3(1.0, 0.0, 1.0);",


      "uniform vec2 mapDimensions;",// = vec2(256.0, 256.0);",
     

      "void main(void) ***REMOVED***",
        "vec2 mapCords = vTextureCoord.xy;",

        "vec4 color = texture2D(uSampler, vTextureCoord.st);",
        "vec3 nColor = texture2D(displacementMap, vTextureCoord.st).rgb;",
 

        "mapCords *= vec2(dimensions.x/512.0, dimensions.y/512.0);",
      
        "mapCords.y *= -1.0;",
        "mapCords.y += 1.0;",

        //RGBA of our diffuse color
        "vec4 DiffuseColor = texture2D(uSampler, vTextureCoord);",

        //RGB of our normal map
        "vec3 NormalMap = texture2D(displacementMap, mapCords).rgb;",

        //The delta position of light
        //"vec3 LightDir = vec3(LightPos.xy - (gl_FragCoord.xy / Resolution.xy), LightPos.z);",
        "vec3 LightDir = vec3(LightPos.xy - (mapCords.xy), LightPos.z);",
        //Correct for aspect ratio
        //"LightDir.x *= Resolution.x / Resolution.y;",

        //Determine distance (used for attenuation) BEFORE we normalize our LightDir
        "float D = length(LightDir);",

        //normalize our vectors
        "vec3 N = normalize(NormalMap * 2.0 - 1.0);",
        "vec3 L = normalize(LightDir);",

        //Pre-multiply light color with intensity
        //Then perform "N dot L" to determine our diffuse term
        "vec3 Diffuse = (LightColor.rgb * LightColor.a) * max(dot(N, L), 0.0);",

        //pre-multiply ambient color with intensity
        "vec3 Ambient = AmbientColor.rgb * AmbientColor.a;",

        //calculate attenuation
        "float Attenuation = 1.0 / ( Falloff.x + (Falloff.y*D) + (Falloff.z*D*D) );",

        //the calculation which brings it all together
        "vec3 Intensity = Ambient + Diffuse * Attenuation;",
        "vec3 FinalColor = DiffuseColor.rgb * Intensity;",
        "gl_FragColor = vColor * vec4(FinalColor, DiffuseColor.a);",
        //"gl_FragColor = vec4(1.0, 0.0, 0.0, Attenuation);",//vColor * vec4(FinalColor, DiffuseColor.a);",
    /*
        // normalise color
        "vec3 normal = normalize(nColor * 2.0 - 1.0);",
        
        "vec3 deltaPos = vec3( (light.xy - gl_FragCoord.xy) / resolution.xy, light.z );",

        "float lambert = clamp(dot(normal, lightDir), 0.0, 1.0);",

        "float d = sqrt(dot(deltaPos, deltaPos));", 
        "float att = 1.0 / ( attenuation.x + (attenuation.y*d) + (attenuation.z*d*d) );",

        "vec3 result = (ambientColor * ambientIntensity) + (lightColor.rgb * lambert) * att;",
        "result *= color.rgb;",
       
        "gl_FragColor = vec4(result, 1.0);",*/

        

      "***REMOVED***"
    ];
    
***REMOVED***;

PIXI.NormalMapFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.NormalMapFilter.prototype.constructor = PIXI.NormalMapFilter;

/**
 * Sets the map dimensions uniforms when the texture becomes available.
 *
 * @method onTextureLoaded
 */
PIXI.NormalMapFilter.prototype.onTextureLoaded = function()
***REMOVED***
    this.uniforms.mapDimensions.value.x = this.uniforms.displacementMap.value.width;
    this.uniforms.mapDimensions.value.y = this.uniforms.displacementMap.value.height;

    this.uniforms.displacementMap.value.baseTexture.off("loaded", this.boundLoadedFunction);
***REMOVED***;

/**
 * The texture used for the displacement map. Must be power of 2 texture.
 *
 * @property map
 * @type Texture
 */
Object.defineProperty(PIXI.NormalMapFilter.prototype, 'map', ***REMOVED***
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
Object.defineProperty(PIXI.NormalMapFilter.prototype, 'scale', ***REMOVED***
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
Object.defineProperty(PIXI.NormalMapFilter.prototype, 'offset', ***REMOVED***
    get: function() ***REMOVED***
        return this.uniforms.offset.value;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.uniforms.offset.value = value;
    ***REMOVED***
***REMOVED***);
