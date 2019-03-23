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
