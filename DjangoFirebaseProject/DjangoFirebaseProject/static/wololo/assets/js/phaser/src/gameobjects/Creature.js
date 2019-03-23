/**
* @author       Richard Davey <rich@photonstorm.com>
* @author       Kestrel Moon Studios <creature@kestrelmoon.com>
* @copyright    2016 Photon Storm Ltd and Kestrel Moon Studios
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Creature is a custom Game Object used in conjunction with the Creature Runtime libraries by Kestrel Moon Studios.
* 
* It allows you to display animated Game Objects that were created with the [Creature Automated Animation Tool](http://www.kestrelmoon.com/creature/).
* 
* Note 1: You can only use Phaser.Creature objects in WebGL enabled games. They do not work in Canvas mode games.
*
* Note 2: You must use a build of Phaser that includes the CreatureMeshBone.js runtime and gl-matrix.js, or have them
* loaded before your Phaser game boots.
* 
* See the Phaser custom build process for more details.
* 
* By default the Creature runtimes are NOT included in any pre-configured version of Phaser.
* 
* So you'll need to do `grunt custom` to create a build that includes them.
*
* @class Phaser.Creature
* @extends PIXI.DisplayObjectContainer
* @extends Phaser.Component.Core
* @extends Phaser.Component.Angle
* @extends Phaser.Component.AutoCull
* @extends Phaser.Component.BringToTop
* @extends Phaser.Component.Destroy
* @extends Phaser.Component.FixedToCamera
* @extends Phaser.Component.LifeSpan
* @extends Phaser.Component.Reset
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***number***REMOVED*** x - The x coordinate of the Game Object. The coordinate is relative to any parent container this Game Object may be in.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate of the Game Object. The coordinate is relative to any parent container this Game Object may be in.
* @param ***REMOVED***string|PIXI.Texture***REMOVED*** key - The texture used by the Creature Object during rendering. It can be a string which is a reference to the Cache entry, or an instance of a PIXI.Texture.
* @param ***REMOVED***string***REMOVED*** mesh - The mesh data for the Creature Object. It should be a string which is a reference to the Cache JSON entry.
* @param ***REMOVED***string***REMOVED*** [animation='default'] - The animation within the mesh data  to play.
*/
Phaser.Creature = function (game, x, y, key, mesh, animation) ***REMOVED***

    if (animation === undefined) ***REMOVED*** animation = 'default'; ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.CREATURE;

    if (!game.cache.checkJSONKey(mesh))
    ***REMOVED***
        console.warn('Phaser.Creature: Invalid mesh key given. Not found in Phaser.Cache');
        return;
    ***REMOVED***

    var meshData = game.cache.getJSON(mesh);

    /**
    * @property ***REMOVED***Creature***REMOVED*** _creature - The Creature instance.
    * @private
    */
    this._creature = new Creature(meshData);

    /**
    * @property ***REMOVED***CreatureAnimation***REMOVED*** animation - The CreatureAnimation instance.
    */
    this.animation = new CreatureAnimation(meshData, animation, this._creature);

    /**
    * @property ***REMOVED***CreatureManager***REMOVED*** manager - The CreatureManager instance for this object.
    */
    this.manager = new CreatureManager(this._creature);

    /**
    * @property ***REMOVED***number***REMOVED*** timeDelta - How quickly the animation advances.
    * @default
    */
    this.timeDelta = 0.05;

    if (typeof key === 'string')
    ***REMOVED***
        var texture = new PIXI.Texture(game.cache.getBaseTexture(key));
    ***REMOVED***
    else
    ***REMOVED***
        var texture = key;
    ***REMOVED***

    /**
    * @property ***REMOVED***PIXI.Texture***REMOVED*** texture - The texture the animation is using.
    */
    this.texture = texture;

    PIXI.DisplayObjectContainer.call(this);

    this.dirty = true;
    this.blendMode = PIXI.blendModes.NORMAL;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** creatureBoundsMin - The minimum bounds point.
    * @protected
    */
    this.creatureBoundsMin = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** creatureBoundsMax - The maximum bounds point.
    * @protected
    */
    this.creatureBoundsMax = new Phaser.Point();
    
    var target = this.manager.target_creature;

    /**
    * @property ***REMOVED***PIXI.Float32Array***REMOVED*** vertices - The vertices data.
    * @protected
    */
    this.vertices = new PIXI.Float32Array(target.total_num_pts * 2);

    /**
    * @property ***REMOVED***PIXI.Float32Array***REMOVED*** uvs - The UV data.
    * @protected
    */
    this.uvs = new PIXI.Float32Array(target.total_num_pts * 2);
    
    /**
    * @property ***REMOVED***PIXI.Uint16Array***REMOVED*** indices
    * @protected
    */
    this.indices = new PIXI.Uint16Array(target.global_indices.length);

    for (var i = 0; i < this.indices.length; i++)
    ***REMOVED***
        this.indices[i] = target.global_indices[i];
    ***REMOVED***
    
    /**
    * @property ***REMOVED***PIXI.Uint16Array***REMOVED*** colors - The vertices colors
    * @protected
    */
    this.colors = new PIXI.Float32Array([1, 1, 1, 1]);

    this.updateRenderData(target.global_pts, target.global_uvs);

    this.manager.AddAnimation(this.animation);
    this.manager.SetActiveAnimationName(animation, false);

    Phaser.Component.Core.init.call(this, game, x, y);

***REMOVED***;

Phaser.Creature.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Phaser.Creature.prototype.constructor = Phaser.Creature;

Phaser.Component.Core.install.call(Phaser.Creature.prototype, [
    'Angle',
    'AutoCull',
    'BringToTop',
    'Destroy',
    'FixedToCamera',
    'LifeSpan',
    'Reset'
]);

Phaser.Creature.prototype.preUpdateInWorld = Phaser.Component.InWorld.preUpdate;
Phaser.Creature.prototype.preUpdateCore = Phaser.Component.Core.preUpdate;

/**
* Automatically called by World.preUpdate.
*
* @method Phaser.Creature#preUpdate
* @memberof Phaser.Creature
*/
Phaser.Creature.prototype.preUpdate = function () ***REMOVED***

    if (!this.preUpdateInWorld())
    ***REMOVED***
        return false;
    ***REMOVED***

    this.manager.Update(this.timeDelta);

    this.updateData();

    return this.preUpdateCore();

***REMOVED***;

/**
* 
*
* @method Phaser.Creature#_initWebGL
* @memberof Phaser.Creature
* @private
*/
Phaser.Creature.prototype._initWebGL = function (renderSession) ***REMOVED***

    // build the strip!
    var gl = renderSession.gl;
    
    this._vertexBuffer = gl.createBuffer();
    this._indexBuffer = gl.createBuffer();
    this._uvBuffer = gl.createBuffer();
    this._colorBuffer = gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,  this.uvs, gl.DYNAMIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this._colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
 
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

***REMOVED***;

/**
* @method Phaser.Creature#_renderWebGL
* @memberof Phaser.Creature
* @private
*/
Phaser.Creature.prototype._renderWebGL = function (renderSession) ***REMOVED***

    //  If the sprite is not visible or the alpha is 0 then no need to render this element
    if (!this.visible || this.alpha <= 0)
    ***REMOVED***
        return;
    ***REMOVED***

    renderSession.spriteBatch.stop();

    // init! init!
    if (!this._vertexBuffer)
    ***REMOVED***
        this._initWebGL(renderSession);
    ***REMOVED***
    
    renderSession.shaderManager.setShader(renderSession.shaderManager.stripShader);

    this._renderCreature(renderSession);

    renderSession.spriteBatch.start();

***REMOVED***;

/**
* @method Phaser.Creature#_renderCreature
* @memberof Phaser.Creature
* @private
*/
Phaser.Creature.prototype._renderCreature = function (renderSession) ***REMOVED***

    var gl = renderSession.gl;

    var projection = renderSession.projection;
    var offset = renderSession.offset;
    var shader = renderSession.shaderManager.stripShader;

    renderSession.blendModeManager.setBlendMode(this.blendMode);

    //  Set uniforms
    gl.uniformMatrix3fv(shader.translationMatrix, false, this.worldTransform.toArray(true));
    gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
    gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);
    gl.uniform1f(shader.alpha, this.worldAlpha);

    if (!this.dirty)
    ***REMOVED***
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);
        gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
        
        //  Update the uvs
        gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
        gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, 0, 0);
            
        gl.activeTexture(gl.TEXTURE0);

        //  Check if a texture is dirty..
        if (this.texture.baseTexture._dirty[gl.id])
        ***REMOVED***
            renderSession.renderer.updateTexture(this.texture.baseTexture);
        ***REMOVED***
        else
        ***REMOVED***
            //  Bind the current texture
            gl.bindTexture(gl.TEXTURE_2D, this.texture.baseTexture._glTextures[gl.id]);
        ***REMOVED***
    
        //  Don't need to upload!
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
    ***REMOVED***
    else
    ***REMOVED***
        this.dirty = false;

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
        
        //  Update the uvs
        gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, 0, 0);
            
        gl.activeTexture(gl.TEXTURE0);

        //  Check if a texture is dirty
        if (this.texture.baseTexture._dirty[gl.id])
        ***REMOVED***
            renderSession.renderer.updateTexture(this.texture.baseTexture);
        ***REMOVED***
        else
        ***REMOVED***
            gl.bindTexture(gl.TEXTURE_2D, this.texture.baseTexture._glTextures[gl.id]);
        ***REMOVED***
    
        //  Don't need to upload!
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    ***REMOVED***
    
    gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);

***REMOVED***;

/**
* @method Phaser.Creature#updateCreatureBounds
* @memberof Phaser.Creature
* @private
*/
Phaser.Creature.prototype.updateCreatureBounds = function () ***REMOVED***

    //  Update bounds based off world transform matrix
    var target = this.manager.target_creature;
        
    target.ComputeBoundaryMinMax();

    this.creatureBoundsMin.set(target.boundary_min[0], -target.boundary_min[1]);
    this.creatureBoundsMax.set(target.boundary_max[0], -target.boundary_max[1]);
    
    this.worldTransform.apply(this.creatureBoundsMin, this.creatureBoundsMin);  
    this.worldTransform.apply(this.creatureBoundsMax, this.creatureBoundsMax);              

***REMOVED***;

/**
* @method Phaser.Creature#updateData
* @memberof Phaser.Creature
* @private
*/
Phaser.Creature.prototype.updateData = function () ***REMOVED***

    var target = this.manager.target_creature;

    var read_pts = target.render_pts;
    var read_uvs = target.global_uvs;
    
    this.updateRenderData(read_pts, read_uvs);
    this.updateCreatureBounds();

    this.dirty = true;

***REMOVED***;

/**
* @method Phaser.Creature#updateRenderData
* @memberof Phaser.Creature
* @private
*/
Phaser.Creature.prototype.updateRenderData = function (verts, uvs) ***REMOVED***

    var target = this.manager.target_creature;

    var pt_index = 0;
    var uv_index = 0;
    
    var write_pt_index = 0;
    
    for (var i = 0; i < target.total_num_pts; i++)
    ***REMOVED***
        this.vertices[write_pt_index] = verts[pt_index];
        this.vertices[write_pt_index + 1] = -verts[pt_index + 1];
        
        this.uvs[uv_index] = uvs[uv_index];
        this.uvs[uv_index + 1] = uvs[uv_index + 1];
        
        pt_index += 3;
        uv_index += 2;
        
        write_pt_index += 2;
    ***REMOVED***

***REMOVED***;

/**
* Sets the Animation this Creature object will play, as defined in the mesh data.
*
* @method Phaser.Creature#setAnimation
* @memberof Phaser.Creature
* @param ***REMOVED***string***REMOVED*** key - The key of the animation to set, as defined in the mesh data.
*/
Phaser.Creature.prototype.setAnimation = function (key) ***REMOVED***

    this.manager.SetActiveAnimationName(key, true);

***REMOVED***;

/**
* Plays the currently set animation.
*
* @method Phaser.Creature#play
* @memberof Phaser.Creature
* @param ***REMOVED***boolean***REMOVED*** [loop=false] - Should the animation loop?
*/
Phaser.Creature.prototype.play = function (loop) ***REMOVED***

    if (loop === undefined) ***REMOVED*** loop = false; ***REMOVED***

    this.loop = loop;

    this.manager.SetIsPlaying(true);
    this.manager.RunAtTime(0);

***REMOVED***;

/**
* Stops the currently playing animation.
*
* @method Phaser.Creature#stop
* @memberof Phaser.Creature
*/
Phaser.Creature.prototype.stop = function () ***REMOVED***

    this.manager.SetIsPlaying(false);

***REMOVED***;

/**
* @name Phaser.Creature#isPlaying
* @property ***REMOVED***boolean***REMOVED*** isPlaying - Is the _current_ animation playing?
*/
Object.defineProperty(Phaser.Creature.prototype, 'isPlaying', ***REMOVED***

    get: function() ***REMOVED***

        return this.manager.GetIsPlaying();

    ***REMOVED***,

    set: function(value) ***REMOVED***

        this.manager.SetIsPlaying(value);

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Creature#loop
* @property ***REMOVED***boolean***REMOVED*** loop - Should the _current_ animation loop or not?
*/
Object.defineProperty(Phaser.Creature.prototype, 'loop', ***REMOVED***

    get: function() ***REMOVED***

        return this.manager.should_loop;

    ***REMOVED***,

    set: function(value) ***REMOVED***

        this.manager.SetShouldLoop(value);

    ***REMOVED***

***REMOVED***);
