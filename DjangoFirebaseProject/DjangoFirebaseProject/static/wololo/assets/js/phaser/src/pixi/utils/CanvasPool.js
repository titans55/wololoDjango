/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The CanvasPool is a global static object that allows Pixi and Phaser to pool canvas DOM elements.
*
* @class CanvasPool
* @static
*/
PIXI.CanvasPool = ***REMOVED***

    /**
    * Creates a new Canvas DOM element, or pulls one from the pool if free.
    * 
    * @method create
    * @static
    * @param parent ***REMOVED***any***REMOVED*** The parent of the canvas element.
    * @param width ***REMOVED***number***REMOVED*** The width of the canvas element.
    * @param height ***REMOVED***number***REMOVED*** The height of the canvas element.
    * @return ***REMOVED***HTMLCanvasElement***REMOVED*** The canvas element.
    */
    create: function (parent, width, height) ***REMOVED***

        var idx = PIXI.CanvasPool.getFirst();
        var canvas;

        if (idx === -1)
        ***REMOVED***
            var container = ***REMOVED***
                parent: parent,
                canvas: document.createElement('canvas')
            ***REMOVED***

            PIXI.CanvasPool.pool.push(container);

            canvas = container.canvas;
        ***REMOVED***
        else
        ***REMOVED***
            PIXI.CanvasPool.pool[idx].parent = parent;

            canvas = PIXI.CanvasPool.pool[idx].canvas;
        ***REMOVED***

        if (width !== undefined)
        ***REMOVED***
            canvas.width = width;
            canvas.height = height;
        ***REMOVED***

        return canvas;

    ***REMOVED***,

    /**
    * Gets the first free canvas index from the pool.
    * 
    * @method getFirst
    * @static
    * @return ***REMOVED***number***REMOVED***
    */
    getFirst: function () ***REMOVED***

        var pool = PIXI.CanvasPool.pool;

        for (var i = 0; i < pool.length; i++)
        ***REMOVED***
            if (!pool[i].parent)
            ***REMOVED***
                return i;
            ***REMOVED***
        ***REMOVED***

        return -1;

    ***REMOVED***,

    /**
    * Removes the parent from a canvas element from the pool, freeing it up for re-use.
    * 
    * @method remove
    * @param parent ***REMOVED***any***REMOVED*** The parent of the canvas element.
    * @static
    */
    remove: function (parent) ***REMOVED***

        var pool = PIXI.CanvasPool.pool;

        for (var i = 0; i < pool.length; i++)
        ***REMOVED***
            if (pool[i].parent === parent)
            ***REMOVED***
                pool[i].parent = null;
                pool[i].canvas.width = 1;
                pool[i].canvas.height = 1;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Removes the parent from a canvas element from the pool, freeing it up for re-use.
    * 
    * @method removeByCanvas
    * @param canvas ***REMOVED***HTMLCanvasElement***REMOVED*** The canvas element to remove
    * @static
    */
    removeByCanvas: function (canvas) ***REMOVED***

        var pool = PIXI.CanvasPool.pool;

        for (var i = 0; i < pool.length; i++)
        ***REMOVED***
            if (pool[i].canvas === canvas)
            ***REMOVED***
                pool[i].parent = null;
                pool[i].canvas.width = 1;
                pool[i].canvas.height = 1;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Gets the total number of used canvas elements in the pool.
    * 
    * @method getTotal
    * @static
    * @return ***REMOVED***number***REMOVED*** The number of in-use (parented) canvas elements in the pool.
    */
    getTotal: function () ***REMOVED***

        var pool = PIXI.CanvasPool.pool;
        var c = 0;

        for (var i = 0; i < pool.length; i++)
        ***REMOVED***
            if (pool[i].parent)
            ***REMOVED***
                c++;
            ***REMOVED***
        ***REMOVED***

        return c;

    ***REMOVED***,

    /**
    * Gets the total number of free canvas elements in the pool.
    * 
    * @method getFree
    * @static
    * @return ***REMOVED***number***REMOVED*** The number of free (un-parented) canvas elements in the pool.
    */
    getFree: function () ***REMOVED***

        var pool = PIXI.CanvasPool.pool;
        var c = 0;

        for (var i = 0; i < pool.length; i++)
        ***REMOVED***
            if (!pool[i].parent)
            ***REMOVED***
                c++;
            ***REMOVED***
        ***REMOVED***

        return c;

    ***REMOVED***

***REMOVED***;

/**
 * The pool into which the canvas dom elements are placed.
 *
 * @property pool
 * @type Array
 * @static
 */
PIXI.CanvasPool.pool = [];
