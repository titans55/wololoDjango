/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* "This world is but a canvas to our imagination." - Henry David Thoreau
*
* A game has only one world. The world is an abstract place in which all game objects live. It is not bound
* by stage limits and can be any size. You look into the world via cameras. All game objects live within
* the world at world-based coordinates. By default a world is created the same size as your Stage.
*
* @class Phaser.World
* @extends Phaser.Group
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Reference to the current game instance.
*/
Phaser.World = function (game) ***REMOVED***

    Phaser.Group.call(this, game, null, '__world', false);

    /**
    * The World has no fixed size, but it does have a bounds outside of which objects are no longer considered as being "in world" and you should use this to clean-up the display list and purge dead objects.
    * By default we set the Bounds to be from 0,0 to Game.width,Game.height. I.e. it will match the size given to the game constructor with 0,0 representing the top-left of the display.
    * However 0,0 is actually the center of the world, and if you rotate or scale the world all of that will happen from 0,0.
    * So if you want to make a game in which the world itself will rotate you should adjust the bounds so that 0,0 is the center point, i.e. set them to -1000,-1000,2000,2000 for a 2000x2000 sized world centered around 0,0.
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** bounds - Bound of this world that objects can not escape from.
    */
    this.bounds = new Phaser.Rectangle(0, 0, game.width, game.height);

    /**
    * @property ***REMOVED***Phaser.Camera***REMOVED*** camera - Camera instance.
    */
    this.camera = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _definedSize - True if the World has been given a specifically defined size (i.e. from a Tilemap or direct in code) or false if it's just matched to the Game dimensions.
    * @readonly
    */
    this._definedSize = false;

    /**
    * @property ***REMOVED***number***REMOVED*** width - The defined width of the World. Sometimes the bounds needs to grow larger than this (if you resize the game) but this retains the original requested dimension.
    */
    this._width = game.width;

    /**
    * @property ***REMOVED***number***REMOVED*** height - The defined height of the World. Sometimes the bounds needs to grow larger than this (if you resize the game) but this retains the original requested dimension.
    */
    this._height = game.height;

    this.game.state.onStateChange.add(this.stateChange, this);

***REMOVED***;

Phaser.World.prototype = Object.create(Phaser.Group.prototype);
Phaser.World.prototype.constructor = Phaser.World;

/**
* Initialises the game world.
*
* @method Phaser.World#boot
* @protected
*/
Phaser.World.prototype.boot = function () ***REMOVED***

    this.camera = new Phaser.Camera(this.game, 0, 0, 0, this.game.width, this.game.height);

    this.game.stage.addChild(this);

    this.camera.boot();

***REMOVED***;

/**
* Called whenever the State changes or resets.
* 
* It resets the world.x and world.y coordinates back to zero,
* then resets the Camera.
*
* @method Phaser.World#stateChange
* @protected
*/
Phaser.World.prototype.stateChange = function () ***REMOVED***

    this.x = 0;
    this.y = 0;

    this.camera.reset();

***REMOVED***;

/**
* Updates the size of this world and sets World.x/y to the given values
* The Camera bounds and Physics bounds (if set) are also updated to match the new World bounds.
*
* @method Phaser.World#setBounds
* @param ***REMOVED***number***REMOVED*** x - Top left most corner of the world.
* @param ***REMOVED***number***REMOVED*** y - Top left most corner of the world.
* @param ***REMOVED***number***REMOVED*** width - New width of the game world in pixels.
* @param ***REMOVED***number***REMOVED*** height - New height of the game world in pixels.
*/
Phaser.World.prototype.setBounds = function (x, y, width, height) ***REMOVED***

    this._definedSize = true;
    this._width = width;
    this._height = height;

    this.bounds.setTo(x, y, width, height);

    this.x = x;
    this.y = y;

    if (this.camera.bounds)
    ***REMOVED***
        //  The Camera can never be smaller than the game size
        this.camera.bounds.setTo(x, y, Math.max(width, this.game.width), Math.max(height, this.game.height));
    ***REMOVED***

    this.game.physics.setBoundsToWorld();

***REMOVED***;

/**
* Updates the size of this world. Note that this doesn't modify the world x/y coordinates, just the width and height.
*
* @method Phaser.World#resize
* @param ***REMOVED***number***REMOVED*** width - New width of the game world in pixels.
* @param ***REMOVED***number***REMOVED*** height - New height of the game world in pixels.
*/
Phaser.World.prototype.resize = function (width, height) ***REMOVED***

    //  Don't ever scale the World bounds lower than the original requested dimensions if it's a defined world size

    if (this._definedSize)
    ***REMOVED***
        if (width < this._width)
        ***REMOVED***
            width = this._width;
        ***REMOVED***

        if (height < this._height)
        ***REMOVED***
            height = this._height;
        ***REMOVED***
    ***REMOVED***

    this.bounds.width = width;
    this.bounds.height = height;

    this.game.camera.setBoundsToWorld();

    this.game.physics.setBoundsToWorld();

***REMOVED***;

/**
* Destroyer of worlds.
*
* @method Phaser.World#shutdown
*/
Phaser.World.prototype.shutdown = function () ***REMOVED***

    //  World is a Group, so run a soft destruction on this and all children.
    this.destroy(true, true);

***REMOVED***;

/**
* This will take the given game object and check if its x/y coordinates fall outside of the world bounds.
* If they do it will reposition the object to the opposite side of the world, creating a wrap-around effect.
* If sprite has a P2 body then the body (sprite.body) should be passed as first parameter to the function.
*
* Please understand there are limitations to this method. For example if you have scaled the World
* then objects won't always be re-positioned correctly, and you'll need to employ your own wrapping function.
*
* @method Phaser.World#wrap
* @param ***REMOVED***Phaser.Sprite|Phaser.Image|Phaser.TileSprite|Phaser.Text***REMOVED*** sprite - The object you wish to wrap around the world bounds.
* @param ***REMOVED***number***REMOVED*** [padding=0] - Extra padding added equally to the sprite.x and y coordinates before checking if within the world bounds. Ignored if useBounds is true.
* @param ***REMOVED***boolean***REMOVED*** [useBounds=false] - If useBounds is false wrap checks the object.x/y coordinates. If true it does a more accurate bounds check, which is more expensive.
* @param ***REMOVED***boolean***REMOVED*** [horizontal=true] - If horizontal is false, wrap will not wrap the object.x coordinates horizontally.
* @param ***REMOVED***boolean***REMOVED*** [vertical=true] - If vertical is false, wrap will not wrap the object.y coordinates vertically.
*/
Phaser.World.prototype.wrap = function (sprite, padding, useBounds, horizontal, vertical) ***REMOVED***

    if (padding === undefined) ***REMOVED*** padding = 0; ***REMOVED***
    if (useBounds === undefined) ***REMOVED*** useBounds = false; ***REMOVED***
    if (horizontal === undefined) ***REMOVED*** horizontal = true; ***REMOVED***
    if (vertical === undefined) ***REMOVED*** vertical = true; ***REMOVED***

    if (!useBounds)
    ***REMOVED***
        if (horizontal && sprite.x + padding < this.bounds.x)
        ***REMOVED***
            sprite.x = this.bounds.right + padding;
        ***REMOVED***
        else if (horizontal && sprite.x - padding > this.bounds.right)
        ***REMOVED***
            sprite.x = this.bounds.left - padding;
        ***REMOVED***

        if (vertical && sprite.y + padding < this.bounds.top)
        ***REMOVED***
            sprite.y = this.bounds.bottom + padding;
        ***REMOVED***
        else if (vertical && sprite.y - padding > this.bounds.bottom)
        ***REMOVED***
            sprite.y = this.bounds.top - padding;
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        sprite.getBounds();

        if (horizontal)
        ***REMOVED***
            if ((sprite.x + sprite._currentBounds.width) < this.bounds.x)
            ***REMOVED***
                sprite.x = this.bounds.right;
            ***REMOVED***
            else if (sprite.x > this.bounds.right)
            ***REMOVED***
                sprite.x = this.bounds.left;
            ***REMOVED***
        ***REMOVED***

        if (vertical)
        ***REMOVED***
            if ((sprite.y + sprite._currentBounds.height) < this.bounds.top)
            ***REMOVED***
                sprite.y = this.bounds.bottom;
            ***REMOVED***
            else if (sprite.y > this.bounds.bottom)
            ***REMOVED***
                sprite.y = this.bounds.top;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* @name Phaser.World#width
* @property ***REMOVED***number***REMOVED*** width - Gets or sets the current width of the game world. The world can never be smaller than the game (canvas) dimensions.
*/
Object.defineProperty(Phaser.World.prototype, "width", ***REMOVED***

    get: function () ***REMOVED***
        return this.bounds.width;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value < this.game.width)
        ***REMOVED***
            value = this.game.width;
        ***REMOVED***

        this.bounds.width = value;
        this._width = value;
        this._definedSize = true;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.World#height
* @property ***REMOVED***number***REMOVED*** height - Gets or sets the current height of the game world. The world can never be smaller than the game (canvas) dimensions.
*/
Object.defineProperty(Phaser.World.prototype, "height", ***REMOVED***

    get: function () ***REMOVED***
        return this.bounds.height;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value < this.game.height)
        ***REMOVED***
            value = this.game.height;
        ***REMOVED***

        this.bounds.height = value;
        this._height = value;
        this._definedSize = true;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.World#centerX
* @property ***REMOVED***number***REMOVED*** centerX - Gets the X position corresponding to the center point of the world.
* @readonly
*/
Object.defineProperty(Phaser.World.prototype, "centerX", ***REMOVED***

    get: function () ***REMOVED***
        return this.bounds.halfWidth + this.bounds.x;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.World#centerY
* @property ***REMOVED***number***REMOVED*** centerY - Gets the Y position corresponding to the center point of the world.
* @readonly
*/
Object.defineProperty(Phaser.World.prototype, "centerY", ***REMOVED***

    get: function () ***REMOVED***
        return this.bounds.halfHeight + this.bounds.y;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.World#randomX
* @property ***REMOVED***number***REMOVED*** randomX - Gets a random integer which is lesser than or equal to the current width of the game world.
* @readonly
*/
Object.defineProperty(Phaser.World.prototype, "randomX", ***REMOVED***

    get: function () ***REMOVED***

        if (this.bounds.x < 0)
        ***REMOVED***
            return this.game.rnd.between(this.bounds.x, (this.bounds.width - Math.abs(this.bounds.x)));
        ***REMOVED***
        else
        ***REMOVED***
            return this.game.rnd.between(this.bounds.x, this.bounds.width);
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.World#randomY
* @property ***REMOVED***number***REMOVED*** randomY - Gets a random integer which is lesser than or equal to the current height of the game world.
* @readonly
*/
Object.defineProperty(Phaser.World.prototype, "randomY", ***REMOVED***

    get: function () ***REMOVED***

        if (this.bounds.y < 0)
        ***REMOVED***
            return this.game.rnd.between(this.bounds.y, (this.bounds.height - Math.abs(this.bounds.y)));
        ***REMOVED***
        else
        ***REMOVED***
            return this.game.rnd.between(this.bounds.y, this.bounds.height);
        ***REMOVED***

    ***REMOVED***

***REMOVED***);
