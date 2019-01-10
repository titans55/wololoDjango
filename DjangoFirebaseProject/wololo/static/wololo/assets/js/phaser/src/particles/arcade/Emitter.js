/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Emitter is a lightweight particle emitter that uses Arcade Physics.
* It can be used for one-time explosions or for continuous effects like rain and fire.
* All it really does is launch Particle objects out at set intervals, and fixes their positions and velocities accordingly.
* 
* @class Phaser.Particles.Arcade.Emitter
* @constructor
* @extends Phaser.Group
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Current game instance.
* @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate within the Emitter that the particles are emitted from.
* @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate within the Emitter that the particles are emitted from.
* @param ***REMOVED***number***REMOVED*** [maxParticles=50] - The total number of particles in this emitter.
*/
Phaser.Particles.Arcade.Emitter = function (game, x, y, maxParticles) ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** maxParticles - The total number of particles in this emitter.
    * @default
    */
    this.maxParticles = maxParticles || 50;

    Phaser.Group.call(this, game);

    /**
    * @property ***REMOVED***string***REMOVED*** name - A handy string name for this emitter. Can be set to anything.
    */
    this.name = 'emitter' + this.game.particles.ID++;

    /**
    * @property ***REMOVED***number***REMOVED*** type - Internal Phaser Type value.
    * @protected
    */
    this.type = Phaser.EMITTER;

    /**
    * @property ***REMOVED***number***REMOVED*** physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.GROUP;

    /**
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** area - The area of the emitter. Particles can be randomly generated from anywhere within this rectangle.
    * @default
    */
    this.area = new Phaser.Rectangle(x, y, 1, 1);

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** minParticleSpeed - The minimum possible velocity of a particle.
    * @default
    */
    this.minParticleSpeed = new Phaser.Point(-100, -100);

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** maxParticleSpeed - The maximum possible velocity of a particle.
    * @default
    */
    this.maxParticleSpeed = new Phaser.Point(100, 100);

    /**
    * @property ***REMOVED***number***REMOVED*** minParticleScale - The minimum possible scale of a particle. This is applied to the X and Y axis. If you need to control each axis see minParticleScaleX.
    * @default
    */
    this.minParticleScale = 1;

    /**
    * @property ***REMOVED***number***REMOVED*** maxParticleScale - The maximum possible scale of a particle. This is applied to the X and Y axis. If you need to control each axis see maxParticleScaleX.
    * @default
    */
    this.maxParticleScale = 1;

    /**
    * @property ***REMOVED***array***REMOVED*** scaleData - An array of the calculated scale easing data applied to particles with scaleRates > 0.
    */
    this.scaleData = null;

    /**
    * @property ***REMOVED***number***REMOVED*** minRotation - The minimum possible angular velocity of a particle.
    * @default
    */
    this.minRotation = -360;

    /**
    * @property ***REMOVED***number***REMOVED*** maxRotation - The maximum possible angular velocity of a particle.
    * @default
    */
    this.maxRotation = 360;

    /**
    * @property ***REMOVED***number***REMOVED*** minParticleAlpha - The minimum possible alpha value of a particle.
    * @default
    */
    this.minParticleAlpha = 1;

    /**
    * @property ***REMOVED***number***REMOVED*** maxParticleAlpha - The maximum possible alpha value of a particle.
    * @default
    */
    this.maxParticleAlpha = 1;

    /**
    * @property ***REMOVED***array***REMOVED*** alphaData - An array of the calculated alpha easing data applied to particles with alphaRates > 0.
    */
    this.alphaData = null;

    /**
    * @property ***REMOVED***number***REMOVED*** gravity - Sets the `body.gravity.y` of each particle sprite to this value on launch.
    * @default
    */
    this.gravity = 100;

    /**
    * @property ***REMOVED***any***REMOVED*** particleClass - For emitting your own particle class types. They must extend Phaser.Particle.
    * @default
    */
    this.particleClass = Phaser.Particle;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** particleDrag - The X and Y drag component of particles launched from the emitter.
    */
    this.particleDrag = new Phaser.Point();

    /**
    * @property ***REMOVED***number***REMOVED*** angularDrag - The angular drag component of particles launched from the emitter if they are rotating.
    * @default
    */
    this.angularDrag = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** frequency - How often a particle is emitted in ms (if emitter is started with Explode === false).
    * @default
    */
    this.frequency = 100;

    /**
    * @property ***REMOVED***number***REMOVED*** lifespan - How long each particle lives once it is emitted in ms. Default is 2 seconds. Set lifespan to 'zero' for particles to live forever.
    * @default
    */
    this.lifespan = 2000;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** bounce - How much each particle should bounce on each axis. 1 = full bounce, 0 = no bounce.
    */
    this.bounce = new Phaser.Point();

    /**
    * @property ***REMOVED***boolean***REMOVED*** on - Determines whether the emitter is currently emitting particles. It is totally safe to directly toggle this.
    * @default
    */
    this.on = false;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** particleAnchor - When a particle is created its anchor will be set to match this Point object (defaults to x/y: 0.5 to aid in rotation)
    * @default
    */
    this.particleAnchor = new Phaser.Point(0.5, 0.5);

    /**
    * @property ***REMOVED***number***REMOVED*** blendMode - The blendMode as set on the particle when emitted from the Emitter. Defaults to NORMAL. Needs browser capable of supporting canvas blend-modes (most not available in WebGL)
    * @default
    */
    this.blendMode = Phaser.blendModes.NORMAL;

    /**
    * The point the particles are emitted from.
    * Emitter.x and Emitter.y control the containers location, which updates all current particles
    * Emitter.emitX and Emitter.emitY control the emission location relative to the x/y position.
    * @property ***REMOVED***number***REMOVED*** emitX
    */
    this.emitX = x;

    /**
    * The point the particles are emitted from.
    * Emitter.x and Emitter.y control the containers location, which updates all current particles
    * Emitter.emitX and Emitter.emitY control the emission location relative to the x/y position.
    * @property ***REMOVED***number***REMOVED*** emitY
    */
    this.emitY = y;

    /**
    * @property ***REMOVED***boolean***REMOVED*** autoScale - When a new Particle is emitted this controls if it will automatically scale in size. Use Emitter.setScale to configure.
    */
    this.autoScale = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** autoAlpha - When a new Particle is emitted this controls if it will automatically change alpha. Use Emitter.setAlpha to configure.
    */
    this.autoAlpha = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** particleBringToTop - If this is `true` then when the Particle is emitted it will be bought to the top of the Emitters display list.
    * @default
    */
    this.particleBringToTop = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** particleSendToBack - If this is `true` then when the Particle is emitted it will be sent to the back of the Emitters display list.
    * @default
    */
    this.particleSendToBack = false;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _minParticleScale - Internal particle scale var.
    * @private
    */
    this._minParticleScale = new Phaser.Point(1, 1);

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _maxParticleScale - Internal particle scale var.
    * @private
    */
    this._maxParticleScale = new Phaser.Point(1, 1);

    /**
    * @property ***REMOVED***number***REMOVED*** _quantity - Internal helper for deciding how many particles to launch.
    * @private
    */
    this._quantity = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _timer - Internal helper for deciding when to launch particles or kill them.
    * @private
    */
    this._timer = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _counter - Internal counter for figuring out how many particles to launch.
    * @private
    */
    this._counter = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _flowQuantity - Internal counter for figuring out how many particles to launch per flow update.
    * @private
    */
    this._flowQuantity = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _flowTotal - Internal counter for figuring out how many particles to launch in total.
    * @private
    */
    this._flowTotal = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _explode - Internal helper for the style of particle emission (all at once, or one at a time).
    * @private
    */
    this._explode = true;

    /**
    * @property ***REMOVED***any***REMOVED*** _frames - Internal helper for the particle frame.
    * @private
    */
    this._frames = null;

***REMOVED***;

Phaser.Particles.Arcade.Emitter.prototype = Object.create(Phaser.Group.prototype);
Phaser.Particles.Arcade.Emitter.prototype.constructor = Phaser.Particles.Arcade.Emitter;

/**
* Called automatically by the game loop, decides when to launch particles and when to "die".
* 
* @method Phaser.Particles.Arcade.Emitter#update
*/
Phaser.Particles.Arcade.Emitter.prototype.update = function () ***REMOVED***

    if (this.on && this.game.time.time >= this._timer)
    ***REMOVED***
        this._timer = this.game.time.time + this.frequency * this.game.time.slowMotion;

        if (this._flowTotal !== 0)
        ***REMOVED***
            if (this._flowQuantity > 0)
            ***REMOVED***
                for (var i = 0; i < this._flowQuantity; i++)
                ***REMOVED***
                    if (this.emitParticle())
                    ***REMOVED***
                        this._counter++;

                        if (this._flowTotal !== -1 && this._counter >= this._flowTotal)
                        ***REMOVED***
                            this.on = false;
                            break;
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                if (this.emitParticle())
                ***REMOVED***
                    this._counter++;

                    if (this._flowTotal !== -1 && this._counter >= this._flowTotal)
                    ***REMOVED***
                        this.on = false;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (this.emitParticle())
            ***REMOVED***
                this._counter++;

                if (this._quantity > 0 && this._counter >= this._quantity)
                ***REMOVED***
                    this.on = false;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***

    var i = this.children.length;

    while (i--)
    ***REMOVED***
        if (this.children[i].exists)
        ***REMOVED***
            this.children[i].update();
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* This function generates a new set of particles for use by this emitter.
* The particles are stored internally waiting to be emitted via Emitter.start.
*
* @method Phaser.Particles.Arcade.Emitter#makeParticles
* @param ***REMOVED***array|string***REMOVED*** keys - A string or an array of strings that the particle sprites will use as their texture. If an array one is picked at random.
* @param ***REMOVED***array|number***REMOVED*** [frames=0] - A frame number, or array of frames that the sprite will use. If an array one is picked at random.
* @param ***REMOVED***number***REMOVED*** [quantity] - The number of particles to generate. If not given it will use the value of Emitter.maxParticles. If the value is greater than Emitter.maxParticles it will use Emitter.maxParticles as the quantity.
* @param ***REMOVED***boolean***REMOVED*** [collide=false] - If you want the particles to be able to collide with other Arcade Physics bodies then set this to true.
* @param ***REMOVED***boolean***REMOVED*** [collideWorldBounds=false] - A particle can be set to collide against the World bounds automatically and rebound back into the World if this is set to true. Otherwise it will leave the World.
* @return ***REMOVED***Phaser.Particles.Arcade.Emitter***REMOVED*** This Emitter instance.
*/
Phaser.Particles.Arcade.Emitter.prototype.makeParticles = function (keys, frames, quantity, collide, collideWorldBounds) ***REMOVED***

    if (frames === undefined) ***REMOVED*** frames = 0; ***REMOVED***
    if (quantity === undefined) ***REMOVED*** quantity = this.maxParticles; ***REMOVED***
    if (collide === undefined) ***REMOVED*** collide = false; ***REMOVED***
    if (collideWorldBounds === undefined) ***REMOVED*** collideWorldBounds = false; ***REMOVED***

    var particle;
    var i = 0;
    var rndKey = keys;
    var rndFrame = frames;
    this._frames = frames;

    if (quantity > this.maxParticles)
    ***REMOVED***
        this.maxParticles = quantity;
    ***REMOVED***

    while (i < quantity)
    ***REMOVED***
        if (Array.isArray(keys))
        ***REMOVED***
            rndKey = this.game.rnd.pick(keys);
        ***REMOVED***

        if (Array.isArray(frames))
        ***REMOVED***
            rndFrame = this.game.rnd.pick(frames);
        ***REMOVED***

        particle = new this.particleClass(this.game, 0, 0, rndKey, rndFrame);

        this.game.physics.arcade.enable(particle, false);

        if (collide)
        ***REMOVED***
            particle.body.checkCollision.any = true;
            particle.body.checkCollision.none = false;
        ***REMOVED***
        else
        ***REMOVED***
            particle.body.checkCollision.none = true;
        ***REMOVED***

        particle.body.collideWorldBounds = collideWorldBounds;
        particle.body.skipQuadTree = true;

        particle.exists = false;
        particle.visible = false;
        particle.anchor.copyFrom(this.particleAnchor);

        this.add(particle);

        i++;
    ***REMOVED***

    return this;

***REMOVED***;

/**
* Call this function to turn off all the particles and the emitter.
*
* @method Phaser.Particles.Arcade.Emitter#kill
* @return ***REMOVED***Phaser.Particles.Arcade.Emitter***REMOVED*** This Emitter instance.
*/
Phaser.Particles.Arcade.Emitter.prototype.kill = function () ***REMOVED***

    this.on = false;
    this.alive = false;
    this.exists = false;

    return this;

***REMOVED***;

/**
* Handy for bringing game objects "back to life". Just sets alive and exists back to true.
*
* @method Phaser.Particles.Arcade.Emitter#revive
* @return ***REMOVED***Phaser.Particles.Arcade.Emitter***REMOVED*** This Emitter instance.
*/
Phaser.Particles.Arcade.Emitter.prototype.revive = function () ***REMOVED***

    this.alive = true;
    this.exists = true;

    return this;

***REMOVED***;

/**
* Call this function to emit the given quantity of particles at all once (an explosion)
* 
* @method Phaser.Particles.Arcade.Emitter#explode
* @param ***REMOVED***number***REMOVED*** [lifespan=0] - How long each particle lives once emitted in ms. 0 = forever.
* @param ***REMOVED***number***REMOVED*** [quantity=0] - How many particles to launch.
* @return ***REMOVED***Phaser.Particles.Arcade.Emitter***REMOVED*** This Emitter instance.
*/
Phaser.Particles.Arcade.Emitter.prototype.explode = function (lifespan, quantity) ***REMOVED***

    this._flowTotal = 0;

    this.start(true, lifespan, 0, quantity, false);

    return this;

***REMOVED***;

/**
* Call this function to start emitting a flow of particles at the given frequency.
* It will carry on going until the total given is reached.
* Each time the flow is run the quantity number of particles will be emitted together.
* If you set the total to be 20 and quantity to be 5 then flow will emit 4 times in total (4 x 5 = 20 total)
* If you set the total to be -1 then no quantity cap is used and it will keep emitting.
* 
* @method Phaser.Particles.Arcade.Emitter#flow
* @param ***REMOVED***number***REMOVED*** [lifespan=0] - How long each particle lives once emitted in ms. 0 = forever.
* @param ***REMOVED***number***REMOVED*** [frequency=250] - Frequency is how often to emit the particles, given in ms.
* @param ***REMOVED***number***REMOVED*** [quantity=1] - How many particles to launch each time the frequency is met. Can never be > Emitter.maxParticles.
* @param ***REMOVED***number***REMOVED*** [total=-1] - How many particles to launch in total. If -1 it will carry on indefinitely.
* @param ***REMOVED***boolean***REMOVED*** [immediate=true] - Should the flow start immediately (true) or wait until the first frequency event? (false)
* @return ***REMOVED***Phaser.Particles.Arcade.Emitter***REMOVED*** This Emitter instance.
*/
Phaser.Particles.Arcade.Emitter.prototype.flow = function (lifespan, frequency, quantity, total, immediate) ***REMOVED***

    if (quantity === undefined || quantity === 0) ***REMOVED*** quantity = 1; ***REMOVED***
    if (total === undefined) ***REMOVED*** total = -1; ***REMOVED***
    if (immediate === undefined) ***REMOVED*** immediate = true; ***REMOVED***

    if (quantity > this.maxParticles)
    ***REMOVED***
        quantity = this.maxParticles;
    ***REMOVED***

    this._counter = 0;
    this._flowQuantity = quantity;
    this._flowTotal = total;

    if (immediate)
    ***REMOVED***
        this.start(true, lifespan, frequency, quantity);

        this._counter += quantity;
        this.on = true;
        this._timer = this.game.time.time + frequency * this.game.time.slowMotion;
    ***REMOVED***
    else
    ***REMOVED***
        this.start(false, lifespan, frequency, quantity);
    ***REMOVED***

    return this;

***REMOVED***;

/**
* Call this function to start emitting particles.
* 
* @method Phaser.Particles.Arcade.Emitter#start
* @param ***REMOVED***boolean***REMOVED*** [explode=true] - Whether the particles should all burst out at once (true) or at the frequency given (false).
* @param ***REMOVED***number***REMOVED*** [lifespan=0] - How long each particle lives once emitted in ms. 0 = forever.
* @param ***REMOVED***number***REMOVED*** [frequency=250] - Ignored if Explode is set to true. Frequency is how often to emit 1 particle. Value given in ms.
* @param ***REMOVED***number***REMOVED*** [quantity=0] - How many particles to launch. 0 = "all of the particles" which will keep emitting until Emitter.maxParticles is reached.
* @param ***REMOVED***number***REMOVED*** [forceQuantity=false] - If `true` and creating a particle flow, the quantity emitted will be forced to the be quantity given in this call. This can never exceed Emitter.maxParticles.
* @return ***REMOVED***Phaser.Particles.Arcade.Emitter***REMOVED*** This Emitter instance.
*/
Phaser.Particles.Arcade.Emitter.prototype.start = function (explode, lifespan, frequency, quantity, forceQuantity) ***REMOVED***

    if (explode === undefined) ***REMOVED*** explode = true; ***REMOVED***
    if (lifespan === undefined) ***REMOVED*** lifespan = 0; ***REMOVED***
    if (frequency === undefined || frequency === null) ***REMOVED*** frequency = 250; ***REMOVED***
    if (quantity === undefined) ***REMOVED*** quantity = 0; ***REMOVED***
    if (forceQuantity === undefined) ***REMOVED*** forceQuantity = false; ***REMOVED***

    if (quantity > this.maxParticles)
    ***REMOVED***
        quantity = this.maxParticles;
    ***REMOVED***

    this.revive();

    this.visible = true;

    this.lifespan = lifespan;
    this.frequency = frequency;

    if (explode || forceQuantity)
    ***REMOVED***
        for (var i = 0; i < quantity; i++)
        ***REMOVED***
            this.emitParticle();
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        this.on = true;
        this._quantity = quantity;
        this._counter = 0;
        this._timer = this.game.time.time + frequency * this.game.time.slowMotion;
    ***REMOVED***

    return this;

***REMOVED***;

/**
* This function is used internally to emit the next particle in the queue.
*
* However it can also be called externally to emit a particle.
*
* When called externally you can use the arguments to override any defaults the Emitter has set.
*
* @method Phaser.Particles.Arcade.Emitter#emitParticle
* @param ***REMOVED***number***REMOVED*** [x] - The x coordinate to emit the particle from. If `null` or `undefined` it will use `Emitter.emitX` or if the Emitter has a width > 1 a random value between `Emitter.left` and `Emitter.right`.
* @param ***REMOVED***number***REMOVED*** [y] - The y coordinate to emit the particle from. If `null` or `undefined` it will use `Emitter.emitY` or if the Emitter has a height > 1 a random value between `Emitter.top` and `Emitter.bottom`.
* @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture***REMOVED*** [key] - This is the image or texture used by the Particle during rendering. It can be a string which is a reference to the Cache Image entry, or an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
* @param ***REMOVED***string|number***REMOVED*** [frame] - If this Particle is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
* @return ***REMOVED***boolean***REMOVED*** True if a particle was emitted, otherwise false.
*/
Phaser.Particles.Arcade.Emitter.prototype.emitParticle = function (x, y, key, frame) ***REMOVED***

    if (x === undefined) ***REMOVED*** x = null; ***REMOVED***
    if (y === undefined) ***REMOVED*** y = null; ***REMOVED***

    var particle = this.getFirstExists(false);

    if (particle === null)
    ***REMOVED***
        return false;
    ***REMOVED***

    var rnd = this.game.rnd;

    if (key !== undefined && frame !== undefined)
    ***REMOVED***
        particle.loadTexture(key, frame);
    ***REMOVED***
    else if (key !== undefined)
    ***REMOVED***
        particle.loadTexture(key);
    ***REMOVED***

    var emitX = this.emitX;
    var emitY = this.emitY;

    if (x !== null)
    ***REMOVED***
        emitX = x;
    ***REMOVED***
    else if (this.width > 1)
    ***REMOVED***
        emitX = rnd.between(this.left, this.right);
    ***REMOVED***

    if (y !== null)
    ***REMOVED***
        emitY = y;
    ***REMOVED***
    else if (this.height > 1)
    ***REMOVED***
        emitY = rnd.between(this.top, this.bottom);
    ***REMOVED***

    particle.reset(emitX, emitY);

    particle.angle = 0;
    particle.lifespan = this.lifespan;

    if (this.particleBringToTop)
    ***REMOVED***
        this.bringToTop(particle);
    ***REMOVED***
    else if (this.particleSendToBack)
    ***REMOVED***
        this.sendToBack(particle);
    ***REMOVED***

    if (this.autoScale)
    ***REMOVED***
        particle.setScaleData(this.scaleData);
    ***REMOVED***
    else if (this.minParticleScale !== 1 || this.maxParticleScale !== 1)
    ***REMOVED***
        particle.scale.set(rnd.realInRange(this.minParticleScale, this.maxParticleScale));
    ***REMOVED***
    else if ((this._minParticleScale.x !== this._maxParticleScale.x) || (this._minParticleScale.y !== this._maxParticleScale.y))
    ***REMOVED***
        particle.scale.set(rnd.realInRange(this._minParticleScale.x, this._maxParticleScale.x), rnd.realInRange(this._minParticleScale.y, this._maxParticleScale.y));
    ***REMOVED***

    if (frame === undefined)
    ***REMOVED***
        if (Array.isArray(this._frames))
        ***REMOVED***
            particle.frame = this.game.rnd.pick(this._frames);
        ***REMOVED***
        else
        ***REMOVED***
            particle.frame = this._frames;
        ***REMOVED***
    ***REMOVED***

    if (this.autoAlpha)
    ***REMOVED***
        particle.setAlphaData(this.alphaData);
    ***REMOVED***
    else
    ***REMOVED***
        particle.alpha = rnd.realInRange(this.minParticleAlpha, this.maxParticleAlpha);
    ***REMOVED***

    particle.blendMode = this.blendMode;

    var body = particle.body;

    body.updateBounds();

    body.bounce.copyFrom(this.bounce);
    body.drag.copyFrom(this.particleDrag);

    body.velocity.x = rnd.between(this.minParticleSpeed.x, this.maxParticleSpeed.x);
    body.velocity.y = rnd.between(this.minParticleSpeed.y, this.maxParticleSpeed.y);
    body.angularVelocity = rnd.between(this.minRotation, this.maxRotation);

    body.gravity.y = this.gravity;
    body.angularDrag = this.angularDrag;

    particle.onEmit();

    return true;

***REMOVED***;

/**
* Destroys this Emitter, all associated child Particles and then removes itself from the Particle Manager.
* 
* @method Phaser.Particles.Arcade.Emitter#destroy
*/
Phaser.Particles.Arcade.Emitter.prototype.destroy = function () ***REMOVED***

    this.game.particles.remove(this);

    Phaser.Group.prototype.destroy.call(this, true, false);

***REMOVED***;

/**
* A more compact way of setting the width and height of the emitter.
* 
* @method Phaser.Particles.Arcade.Emitter#setSize
* @param ***REMOVED***number***REMOVED*** width - The desired width of the emitter (particles are spawned randomly within these dimensions).
* @param ***REMOVED***number***REMOVED*** height - The desired height of the emitter.
* @return ***REMOVED***Phaser.Particles.Arcade.Emitter***REMOVED*** This Emitter instance.
*/
Phaser.Particles.Arcade.Emitter.prototype.setSize = function (width, height) ***REMOVED***

    this.area.width = width;
    this.area.height = height;

    return this;

***REMOVED***;

/**
* A more compact way of setting the X velocity range of the emitter.
* @method Phaser.Particles.Arcade.Emitter#setXSpeed
* @param ***REMOVED***number***REMOVED*** [min=0] - The minimum value for this range.
* @param ***REMOVED***number***REMOVED*** [max=0] - The maximum value for this range.
* @return ***REMOVED***Phaser.Particles.Arcade.Emitter***REMOVED*** This Emitter instance.
*/
Phaser.Particles.Arcade.Emitter.prototype.setXSpeed = function (min, max) ***REMOVED***

    min = min || 0;
    max = max || 0;

    this.minParticleSpeed.x = min;
    this.maxParticleSpeed.x = max;

    return this;

***REMOVED***;

/**
* A more compact way of setting the Y velocity range of the emitter.
* @method Phaser.Particles.Arcade.Emitter#setYSpeed
* @param ***REMOVED***number***REMOVED*** [min=0] - The minimum value for this range.
* @param ***REMOVED***number***REMOVED*** [max=0] - The maximum value for this range.
* @return ***REMOVED***Phaser.Particles.Arcade.Emitter***REMOVED*** This Emitter instance.
*/
Phaser.Particles.Arcade.Emitter.prototype.setYSpeed = function (min, max) ***REMOVED***

    min = min || 0;
    max = max || 0;

    this.minParticleSpeed.y = min;
    this.maxParticleSpeed.y = max;

    return this;

***REMOVED***;

/**
* A more compact way of setting the angular velocity constraints of the particles.
*
* @method Phaser.Particles.Arcade.Emitter#setRotation
* @param ***REMOVED***number***REMOVED*** [min=0] - The minimum value for this range.
* @param ***REMOVED***number***REMOVED*** [max=0] - The maximum value for this range.
* @return ***REMOVED***Phaser.Particles.Arcade.Emitter***REMOVED*** This Emitter instance.
*/
Phaser.Particles.Arcade.Emitter.prototype.setRotation = function (min, max) ***REMOVED***

    min = min || 0;
    max = max || 0;

    this.minRotation = min;
    this.maxRotation = max;

    return this;

***REMOVED***;

/**
* A more compact way of setting the alpha constraints of the particles.
* The rate parameter, if set to a value above zero, lets you set the speed at which the Particle change in alpha from min to max.
* If rate is zero, which is the default, the particle won't change alpha - instead it will pick a random alpha between min and max on emit.
*
* @method Phaser.Particles.Arcade.Emitter#setAlpha
* @param ***REMOVED***number***REMOVED*** [min=1] - The minimum value for this range.
* @param ***REMOVED***number***REMOVED*** [max=1] - The maximum value for this range.
* @param ***REMOVED***number***REMOVED*** [rate=0] - The rate (in ms) at which the particles will change in alpha from min to max, or set to zero to pick a random alpha between the two.
* @param ***REMOVED***function***REMOVED*** [ease=Phaser.Easing.Linear.None] - If you've set a rate > 0 this is the easing formula applied between the min and max values.
* @param ***REMOVED***boolean***REMOVED*** [yoyo=false] - If you've set a rate > 0 you can set if the ease will yoyo or not (i.e. ease back to its original values)
* @return ***REMOVED***Phaser.Particles.Arcade.Emitter***REMOVED*** This Emitter instance.
*/
Phaser.Particles.Arcade.Emitter.prototype.setAlpha = function (min, max, rate, ease, yoyo) ***REMOVED***

    if (min === undefined) ***REMOVED*** min = 1; ***REMOVED***
    if (max === undefined) ***REMOVED*** max = 1; ***REMOVED***
    if (rate === undefined) ***REMOVED*** rate = 0; ***REMOVED***
    if (ease === undefined) ***REMOVED*** ease = Phaser.Easing.Linear.None; ***REMOVED***
    if (yoyo === undefined) ***REMOVED*** yoyo = false; ***REMOVED***

    this.minParticleAlpha = min;
    this.maxParticleAlpha = max;
    this.autoAlpha = false;

    if (rate > 0 && min !== max)
    ***REMOVED***
        var tweenData = ***REMOVED*** v: min ***REMOVED***;
        var tween = this.game.make.tween(tweenData).to( ***REMOVED*** v: max ***REMOVED***, rate, ease);
        tween.yoyo(yoyo);

        this.alphaData = tween.generateData(60);

        //  Inverse it so we don't have to do array length look-ups in Particle update loops
        this.alphaData.reverse();
        this.autoAlpha = true;
    ***REMOVED***

    return this;

***REMOVED***;

/**
* A more compact way of setting the scale constraints of the particles.
* The rate parameter, if set to a value above zero, lets you set the speed and ease which the Particle uses to change in scale from min to max across both axis.
* If rate is zero, which is the default, the particle won't change scale during update, instead it will pick a random scale between min and max on emit.
*
* @method Phaser.Particles.Arcade.Emitter#setScale
* @param ***REMOVED***number***REMOVED*** [minX=1] - The minimum value of Particle.scale.x.
* @param ***REMOVED***number***REMOVED*** [maxX=1] - The maximum value of Particle.scale.x.
* @param ***REMOVED***number***REMOVED*** [minY=1] - The minimum value of Particle.scale.y.
* @param ***REMOVED***number***REMOVED*** [maxY=1] - The maximum value of Particle.scale.y.
* @param ***REMOVED***number***REMOVED*** [rate=0] - The rate (in ms) at which the particles will change in scale from min to max, or set to zero to pick a random size between the two.
* @param ***REMOVED***function***REMOVED*** [ease=Phaser.Easing.Linear.None] - If you've set a rate > 0 this is the easing formula applied between the min and max values.
* @param ***REMOVED***boolean***REMOVED*** [yoyo=false] - If you've set a rate > 0 you can set if the ease will yoyo or not (i.e. ease back to its original values)
* @return ***REMOVED***Phaser.Particles.Arcade.Emitter***REMOVED*** This Emitter instance.
*/
Phaser.Particles.Arcade.Emitter.prototype.setScale = function (minX, maxX, minY, maxY, rate, ease, yoyo) ***REMOVED***

    if (minX === undefined) ***REMOVED*** minX = 1; ***REMOVED***
    if (maxX === undefined) ***REMOVED*** maxX = 1; ***REMOVED***
    if (minY === undefined) ***REMOVED*** minY = 1; ***REMOVED***
    if (maxY === undefined) ***REMOVED*** maxY = 1; ***REMOVED***
    if (rate === undefined) ***REMOVED*** rate = 0; ***REMOVED***
    if (ease === undefined) ***REMOVED*** ease = Phaser.Easing.Linear.None; ***REMOVED***
    if (yoyo === undefined) ***REMOVED*** yoyo = false; ***REMOVED***

    //  Reset these
    this.minParticleScale = 1;
    this.maxParticleScale = 1;

    this._minParticleScale.set(minX, minY);
    this._maxParticleScale.set(maxX, maxY);

    this.autoScale = false;

    if (rate > 0 && ((minX !== maxX) || (minY !== maxY)))
    ***REMOVED***
        var tweenData = ***REMOVED*** x: minX, y: minY ***REMOVED***;
        var tween = this.game.make.tween(tweenData).to( ***REMOVED*** x: maxX, y: maxY ***REMOVED***, rate, ease);
        tween.yoyo(yoyo);

        this.scaleData = tween.generateData(60);

        //  Inverse it so we don't have to do array length look-ups in Particle update loops
        this.scaleData.reverse();
        this.autoScale = true;
    ***REMOVED***

    return this;

***REMOVED***;

/**
* Change the emitters center to match the center of any object with a `center` property, such as a Sprite.
* If the object doesn't have a center property it will be set to object.x + object.width / 2
*
* @method Phaser.Particles.Arcade.Emitter#at
* @param ***REMOVED***object|Phaser.Sprite|Phaser.Image|Phaser.TileSprite|Phaser.Text|PIXI.DisplayObject***REMOVED*** object - The object that you wish to match the center with.
* @return ***REMOVED***Phaser.Particles.Arcade.Emitter***REMOVED*** This Emitter instance.
*/
Phaser.Particles.Arcade.Emitter.prototype.at = function (object) ***REMOVED***

    if (object.center)
    ***REMOVED***
        this.emitX = object.center.x;
        this.emitY = object.center.y;
    ***REMOVED***
    else
    ***REMOVED***
        this.emitX = object.world.x + (object.anchor.x * object.width);
        this.emitY = object.world.y + (object.anchor.y * object.height);
    ***REMOVED***

    return this;

***REMOVED***;

/**
* @name Phaser.Particles.Arcade.Emitter#width
* @property ***REMOVED***number***REMOVED*** width - Gets or sets the width of the Emitter. This is the region in which a particle can be emitted.
*/
Object.defineProperty(Phaser.Particles.Arcade.Emitter.prototype, "width", ***REMOVED***

    get: function () ***REMOVED***
        return this.area.width;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this.area.width = value;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Particles.Arcade.Emitter#height
* @property ***REMOVED***number***REMOVED*** height - Gets or sets the height of the Emitter. This is the region in which a particle can be emitted.
*/
Object.defineProperty(Phaser.Particles.Arcade.Emitter.prototype, "height", ***REMOVED***

    get: function () ***REMOVED***
        return this.area.height;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this.area.height = value;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Particles.Arcade.Emitter#x
* @property ***REMOVED***number***REMOVED*** x - Gets or sets the x position of the Emitter.
*/
Object.defineProperty(Phaser.Particles.Arcade.Emitter.prototype, "x", ***REMOVED***

    get: function () ***REMOVED***
        return this.emitX;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this.emitX = value;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Particles.Arcade.Emitter#y
* @property ***REMOVED***number***REMOVED*** y - Gets or sets the y position of the Emitter.
*/
Object.defineProperty(Phaser.Particles.Arcade.Emitter.prototype, "y", ***REMOVED***

    get: function () ***REMOVED***
        return this.emitY;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this.emitY = value;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Particles.Arcade.Emitter#left
* @property ***REMOVED***number***REMOVED*** left - Gets the left position of the Emitter.
* @readonly
*/
Object.defineProperty(Phaser.Particles.Arcade.Emitter.prototype, "left", ***REMOVED***

    get: function () ***REMOVED***
        return Math.floor(this.x - (this.area.width / 2));
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Particles.Arcade.Emitter#right
* @property ***REMOVED***number***REMOVED*** right - Gets the right position of the Emitter.
* @readonly
*/
Object.defineProperty(Phaser.Particles.Arcade.Emitter.prototype, "right", ***REMOVED***

    get: function () ***REMOVED***
        return Math.floor(this.x + (this.area.width / 2));
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Particles.Arcade.Emitter#top
* @property ***REMOVED***number***REMOVED*** top - Gets the top position of the Emitter.
* @readonly
*/
Object.defineProperty(Phaser.Particles.Arcade.Emitter.prototype, "top", ***REMOVED***

    get: function () ***REMOVED***
        return Math.floor(this.y - (this.area.height / 2));
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Particles.Arcade.Emitter#bottom
* @property ***REMOVED***number***REMOVED*** bottom - Gets the bottom position of the Emitter.
* @readonly
*/
Object.defineProperty(Phaser.Particles.Arcade.Emitter.prototype, "bottom", ***REMOVED***

    get: function () ***REMOVED***
        return Math.floor(this.y + (this.area.height / 2));
    ***REMOVED***

***REMOVED***);
