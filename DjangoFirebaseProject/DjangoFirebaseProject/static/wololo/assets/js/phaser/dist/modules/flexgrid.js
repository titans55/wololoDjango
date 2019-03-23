/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* WARNING: This is an EXPERIMENTAL class. The API will change significantly in the coming versions and is incomplete.
* Please try to avoid using in production games with a long time to build.
* This is also why the documentation is incomplete.
* 
* FlexGrid is a a responsive grid manager that works in conjunction with the ScaleManager RESIZE scaling mode and FlexLayers
* to provide for game object positioning in a responsive manner.
*
* @class Phaser.FlexGrid
* @constructor
* @param ***REMOVED***Phaser.ScaleManager***REMOVED*** manager - The ScaleManager.
* @param ***REMOVED***number***REMOVED*** width - The width of the game.
* @param ***REMOVED***number***REMOVED*** height - The height of the game.
*/
Phaser.FlexGrid = function (manager, width, height) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running Game.
    */
    this.game = manager.game;

    /**
    * @property ***REMOVED***Phaser.ScaleManager***REMOVED*** manager - A reference to the ScaleManager.
    */
    this.manager = manager;

    //  The perfect dimensions on which everything else is based
    this.width = width;
    this.height = height;

    this.boundsCustom = new Phaser.Rectangle(0, 0, width, height);
    this.boundsFluid = new Phaser.Rectangle(0, 0, width, height);
    this.boundsFull = new Phaser.Rectangle(0, 0, width, height);
    this.boundsNone = new Phaser.Rectangle(0, 0, width, height);

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** position - 
    * @readonly
    */
    this.positionCustom = new Phaser.Point(0, 0);
    this.positionFluid = new Phaser.Point(0, 0);
    this.positionFull = new Phaser.Point(0, 0);
    this.positionNone = new Phaser.Point(0, 0);

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** scaleFactor - The scale factor based on the game dimensions vs. the scaled dimensions.
    * @readonly
    */
    this.scaleCustom = new Phaser.Point(1, 1);
    this.scaleFluid = new Phaser.Point(1, 1);
    this.scaleFluidInversed = new Phaser.Point(1, 1);
    this.scaleFull = new Phaser.Point(1, 1);
    this.scaleNone = new Phaser.Point(1, 1);

    this.customWidth = 0;
    this.customHeight = 0;
    this.customOffsetX = 0;
    this.customOffsetY = 0;

    this.ratioH = width / height;
    this.ratioV = height / width;

    this.multiplier = 0;

    this.layers = [];

***REMOVED***;

Phaser.FlexGrid.prototype = ***REMOVED***

    /**
     * Sets the core game size. This resets the w/h parameters and bounds.
     *
     * @method Phaser.FlexGrid#setSize
     * @param ***REMOVED***number***REMOVED*** width - The new dimensions.
     * @param ***REMOVED***number***REMOVED*** height - The new dimensions.
     */
    setSize: function (width, height) ***REMOVED***

        //  These are locked and don't change until setSize is called again
        this.width = width;
        this.height = height;

        this.ratioH = width / height;
        this.ratioV = height / width;

        this.scaleNone = new Phaser.Point(1, 1);

        this.boundsNone.width = this.width;
        this.boundsNone.height = this.height;

        this.refresh();

    ***REMOVED***,

    //  Need ability to create your own layers with custom scaling, etc.

    /**
     * A custom layer is centered on the game and maintains its aspect ratio as it scales up and down.
     *
     * @method Phaser.FlexGrid#createCustomLayer
     * @param ***REMOVED***number***REMOVED*** width - Width of this layer in pixels.
     * @param ***REMOVED***number***REMOVED*** height - Height of this layer in pixels.
     * @param ***REMOVED***PIXI.DisplayObject[]***REMOVED*** [children] - An array of children that are used to populate the FlexLayer.
     * @return ***REMOVED***Phaser.FlexLayer***REMOVED*** The Layer object.
     */
    createCustomLayer: function (width, height, children, addToWorld) ***REMOVED***

        if (addToWorld === undefined) ***REMOVED*** addToWorld = true; ***REMOVED***

        this.customWidth = width;
        this.customHeight = height;

        this.boundsCustom.width = width;
        this.boundsCustom.height = height;

        var layer = new Phaser.FlexLayer(this, this.positionCustom, this.boundsCustom, this.scaleCustom);

        if (addToWorld)
        ***REMOVED***
            this.game.world.add(layer);
        ***REMOVED***

        this.layers.push(layer);

        if (typeof children !== 'undefined' && typeof children !== null)
        ***REMOVED***
            layer.addMultiple(children);
        ***REMOVED***

        return layer;

    ***REMOVED***,

    /**
     * A fluid layer is centered on the game and maintains its aspect ratio as it scales up and down.
     *
     * @method Phaser.FlexGrid#createFluidLayer
     * @param ***REMOVED***array***REMOVED*** [children] - An array of children that are used to populate the FlexLayer.
     * @return ***REMOVED***Phaser.FlexLayer***REMOVED*** The Layer object.
     */
    createFluidLayer: function (children, addToWorld) ***REMOVED***

        if (addToWorld === undefined) ***REMOVED*** addToWorld = true; ***REMOVED***

        var layer = new Phaser.FlexLayer(this, this.positionFluid, this.boundsFluid, this.scaleFluid);

        if (addToWorld)
        ***REMOVED***
            this.game.world.add(layer);
        ***REMOVED***

        this.layers.push(layer);

        if (typeof children !== 'undefined' && typeof children !== null)
        ***REMOVED***
            layer.addMultiple(children);
        ***REMOVED***

        return layer;

    ***REMOVED***,

    /**
     * A full layer is placed at 0,0 and extends to the full size of the game. Children are scaled according to the fluid ratios.
     *
     * @method Phaser.FlexGrid#createFullLayer
     * @param ***REMOVED***array***REMOVED*** [children] - An array of children that are used to populate the FlexLayer.
     * @return ***REMOVED***Phaser.FlexLayer***REMOVED*** The Layer object.
     */
    createFullLayer: function (children) ***REMOVED***

        var layer = new Phaser.FlexLayer(this, this.positionFull, this.boundsFull, this.scaleFluid);

        this.game.world.add(layer);

        this.layers.push(layer);

        if (typeof children !== 'undefined')
        ***REMOVED***
            layer.addMultiple(children);
        ***REMOVED***

        return layer;

    ***REMOVED***,

    /**
     * A fixed layer is centered on the game and is the size of the required dimensions and is never scaled.
     *
     * @method Phaser.FlexGrid#createFixedLayer
     * @param ***REMOVED***PIXI.DisplayObject[]***REMOVED*** [children] - An array of children that are used to populate the FlexLayer.
     * @return ***REMOVED***Phaser.FlexLayer***REMOVED*** The Layer object.
     */
    createFixedLayer: function (children) ***REMOVED***

        var layer = new Phaser.FlexLayer(this, this.positionNone, this.boundsNone, this.scaleNone);

        this.game.world.add(layer);

        this.layers.push(layer);

        if (typeof children !== 'undefined')
        ***REMOVED***
            layer.addMultiple(children);
        ***REMOVED***

        return layer;

    ***REMOVED***,

    /**
     * Resets the layer children references
     *
     * @method Phaser.FlexGrid#reset
     */
    reset: function () ***REMOVED***

        var i = this.layers.length;

        while (i--)
        ***REMOVED***
            if (!this.layers[i].persist)
            ***REMOVED***
                //  Remove references to this class
                this.layers[i].position = null;
                this.layers[i].scale = null;
                this.layers.slice(i, 1);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
     * Called when the game container changes dimensions.
     *
     * @method Phaser.FlexGrid#onResize
     * @param ***REMOVED***number***REMOVED*** width - The new width of the game container.
     * @param ***REMOVED***number***REMOVED*** height - The new height of the game container.
     */
    onResize: function (width, height) ***REMOVED***

        this.ratioH = width / height;
        this.ratioV = height / width;

        this.refresh(width, height);

    ***REMOVED***,

    /**
     * Updates all internal vars such as the bounds and scale values.
     *
     * @method Phaser.FlexGrid#refresh
     */
    refresh: function () ***REMOVED***

        this.multiplier = Math.min((this.manager.height / this.height), (this.manager.width / this.width));

        this.boundsFluid.width = Math.round(this.width * this.multiplier);
        this.boundsFluid.height = Math.round(this.height * this.multiplier);

        this.scaleFluid.set(this.boundsFluid.width / this.width, this.boundsFluid.height / this.height);
        this.scaleFluidInversed.set(this.width / this.boundsFluid.width, this.height / this.boundsFluid.height);

        this.scaleFull.set(this.boundsFull.width / this.width, this.boundsFull.height / this.height);

        this.boundsFull.width = Math.round(this.manager.width * this.scaleFluidInversed.x);
        this.boundsFull.height = Math.round(this.manager.height * this.scaleFluidInversed.y);

        this.boundsFluid.centerOn(this.manager.bounds.centerX, this.manager.bounds.centerY);
        this.boundsNone.centerOn(this.manager.bounds.centerX, this.manager.bounds.centerY);

        this.positionFluid.set(this.boundsFluid.x, this.boundsFluid.y);
        this.positionNone.set(this.boundsNone.x, this.boundsNone.y);

    ***REMOVED***,

    /**
     * Fits a sprites width to the bounds.
     *
     * @method Phaser.FlexGrid#fitSprite
     * @param ***REMOVED***Phaser.Sprite***REMOVED*** sprite - The Sprite to fit.
     */
    fitSprite: function (sprite) ***REMOVED***

        this.manager.scaleSprite(sprite);

        sprite.x = this.manager.bounds.centerX;
        sprite.y = this.manager.bounds.centerY;

    ***REMOVED***,

    /**
     * Call in the render function to output the bounds rects.
     *
     * @method Phaser.FlexGrid#debug
     */
    debug: function () ***REMOVED***

        // for (var i = 0; i < this.layers.length; i++)
        // ***REMOVED***
        //     this.layers[i].debug();
        // ***REMOVED***

        // this.game.debug.text(this.boundsFull.width + ' x ' + this.boundsFull.height, this.boundsFull.x + 4, this.boundsFull.y + 16);
        // this.game.debug.geom(this.boundsFull, 'rgba(0,0,255,0.9', false);

        this.game.debug.text(this.boundsFluid.width + ' x ' + this.boundsFluid.height, this.boundsFluid.x + 4, this.boundsFluid.y + 16);
        this.game.debug.geom(this.boundsFluid, 'rgba(255,0,0,0.9', false);

        // this.game.debug.text(this.boundsNone.width + ' x ' + this.boundsNone.height, this.boundsNone.x + 4, this.boundsNone.y + 16);
        // this.game.debug.geom(this.boundsNone, 'rgba(0,255,0,0.9', false);

        // this.game.debug.text(this.boundsCustom.width + ' x ' + this.boundsCustom.height, this.boundsCustom.x + 4, this.boundsCustom.y + 16);
        // this.game.debug.geom(this.boundsCustom, 'rgba(255,255,0,0.9', false);

    ***REMOVED***

***REMOVED***;

Phaser.FlexGrid.prototype.constructor = Phaser.FlexGrid;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* WARNING: This is an EXPERIMENTAL class. The API will change significantly in the coming versions and is incomplete.
* Please try to avoid using in production games with a long time to build.
* This is also why the documentation is incomplete.
* 
* A responsive grid layer.
*
* @class Phaser.FlexLayer
* @extends Phaser.Group
* @constructor
* @param ***REMOVED***Phaser.FlexGrid***REMOVED*** manager - The FlexGrid that owns this FlexLayer.
* @param ***REMOVED***Phaser.Point***REMOVED*** position - A reference to the Point object used for positioning.
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** bounds - A reference to the Rectangle used for the layer bounds.
* @param ***REMOVED***Phaser.Point***REMOVED*** scale - A reference to the Point object used for layer scaling.
*/
Phaser.FlexLayer = function (manager, position, bounds, scale) ***REMOVED***

    Phaser.Group.call(this, manager.game, null, '__flexLayer' + manager.game.rnd.uuid(), false);

    /**
    * @property ***REMOVED***Phaser.ScaleManager***REMOVED*** scale - A reference to the ScaleManager.
    */
    this.manager = manager.manager;

    /**
    * @property ***REMOVED***Phaser.FlexGrid***REMOVED*** grid - A reference to the FlexGrid that owns this layer.
    */
    this.grid = manager;

    /**
     * Should the FlexLayer remain through a State swap?
     *
     * @type ***REMOVED***boolean***REMOVED***
     */
    this.persist = false;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** position
    */
    this.position = position;

    /**
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** bounds
    */
    this.bounds = bounds;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** scale
    */
    this.scale = scale;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** topLeft
    */
    this.topLeft = bounds.topLeft;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** topMiddle
    */
    this.topMiddle = new Phaser.Point(bounds.halfWidth, 0);

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** topRight
    */
    this.topRight = bounds.topRight;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** bottomLeft
    */
    this.bottomLeft = bounds.bottomLeft;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** bottomMiddle
    */
    this.bottomMiddle = new Phaser.Point(bounds.halfWidth, bounds.bottom);

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** bottomRight
    */
    this.bottomRight = bounds.bottomRight;

***REMOVED***;

Phaser.FlexLayer.prototype = Object.create(Phaser.Group.prototype);
Phaser.FlexLayer.prototype.constructor = Phaser.FlexLayer;

/**
 * Resize.
 *
 * @method Phaser.FlexLayer#resize
 */
Phaser.FlexLayer.prototype.resize = function () ***REMOVED***
***REMOVED***;

/**
 * Debug.
 *
 * @method Phaser.FlexLayer#debug
 */
Phaser.FlexLayer.prototype.debug = function () ***REMOVED***

    this.game.debug.text(this.bounds.width + ' x ' + this.bounds.height, this.bounds.x + 4, this.bounds.y + 16);
    this.game.debug.geom(this.bounds, 'rgba(0,0,255,0.9', false);

    this.game.debug.geom(this.topLeft, 'rgba(255,255,255,0.9');
    this.game.debug.geom(this.topMiddle, 'rgba(255,255,255,0.9');
    this.game.debug.geom(this.topRight, 'rgba(255,255,255,0.9');

***REMOVED***;
