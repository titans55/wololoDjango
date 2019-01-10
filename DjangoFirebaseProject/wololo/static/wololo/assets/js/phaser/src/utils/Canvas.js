/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Canvas class handles everything related to creating the `canvas` DOM tag that Phaser will use, 
* including styles, offset and aspect ratio.
*
* @class Phaser.Canvas
* @static
*/
Phaser.Canvas = ***REMOVED***

    /**
    * Creates a `canvas` DOM element. The element is not automatically added to the document.
    *
    * @method Phaser.Canvas.create
    * @param ***REMOVED***object***REMOVED*** parent - The object that will own the canvas that is created.
    * @param ***REMOVED***number***REMOVED*** [width=256] - The width of the canvas element.
    * @param ***REMOVED***number***REMOVED*** [height=256] - The height of the canvas element..
    * @param ***REMOVED***string***REMOVED*** [id=(none)] - If specified, and not the empty string, this will be set as the ID of the canvas element. Otherwise no ID will be set.
    * @param ***REMOVED***boolean***REMOVED*** [skipPool=false] - If `true` the canvas will not be placed in the CanvasPool global.
    * @return ***REMOVED***HTMLCanvasElement***REMOVED*** The newly created canvas element.
    */
    create: function (parent, width, height, id, skipPool) ***REMOVED***

        width = width || 256;
        height = height || 256;

        var canvas = (skipPool) ? document.createElement('canvas') : PIXI.CanvasPool.create(parent, width, height);

        if (typeof id === 'string' && id !== '')
        ***REMOVED***
            canvas.id = id;
        ***REMOVED***

        canvas.width = width;
        canvas.height = height;
        canvas.style.display = 'block';

        return canvas;

    ***REMOVED***,

    /**
    * Sets the background color behind the canvas. This changes the canvas style property.
    *
    * @method Phaser.Canvas.setBackgroundColor
    * @param ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - The canvas to set the background color on.
    * @param ***REMOVED***string***REMOVED*** [color='rgb(0,0,0)'] - The color to set. Can be in the format 'rgb(r,g,b)', or '#RRGGBB' or any valid CSS color.
    * @return ***REMOVED***HTMLCanvasElement***REMOVED*** Returns the source canvas.
    */
    setBackgroundColor: function (canvas, color) ***REMOVED***

        color = color || 'rgb(0,0,0)';

        canvas.style.backgroundColor = color;

        return canvas;

    ***REMOVED***,

    /**
    * Sets the touch-action property on the canvas style. Can be used to disable default browser touch actions.
    *
    * @method Phaser.Canvas.setTouchAction
    * @param ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - The canvas to set the touch action on.
    * @param ***REMOVED***string***REMOVED*** [value] - The touch action to set. Defaults to 'none'.
    * @return ***REMOVED***HTMLCanvasElement***REMOVED*** The source canvas.
    */
    setTouchAction: function (canvas, value) ***REMOVED***

        value = value || 'none';

        canvas.style.msTouchAction = value;
        canvas.style['ms-touch-action'] = value;
        canvas.style['touch-action'] = value;

        return canvas;

    ***REMOVED***,

    /**
    * Sets the user-select property on the canvas style. Can be used to disable default browser selection actions.
    *
    * @method Phaser.Canvas.setUserSelect
    * @param ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - The canvas to set the touch action on.
    * @param ***REMOVED***string***REMOVED*** [value] - The touch action to set. Defaults to 'none'.
    * @return ***REMOVED***HTMLCanvasElement***REMOVED*** The source canvas.
    */
    setUserSelect: function (canvas, value) ***REMOVED***

        value = value || 'none';

        canvas.style['-webkit-touch-callout'] = value;
        canvas.style['-webkit-user-select'] = value;
        canvas.style['-khtml-user-select'] = value;
        canvas.style['-moz-user-select'] = value;
        canvas.style['-ms-user-select'] = value;
        canvas.style['user-select'] = value;
        canvas.style['-webkit-tap-highlight-color'] = 'rgba(0, 0, 0, 0)';

        return canvas;

    ***REMOVED***,

    /**
    * Adds the given canvas element to the DOM. The canvas will be added as a child of the given parent.
    * If no parent is given it will be added as a child of the document.body.
    *
    * @method Phaser.Canvas.addToDOM
    * @param ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - The canvas to be added to the DOM.
    * @param ***REMOVED***string|HTMLElement***REMOVED*** parent - The DOM element to add the canvas to.
    * @param ***REMOVED***boolean***REMOVED*** [overflowHidden=true] - If set to true it will add the overflow='hidden' style to the parent DOM element.
    * @return ***REMOVED***HTMLCanvasElement***REMOVED*** Returns the source canvas.
    */
    addToDOM: function (canvas, parent, overflowHidden) ***REMOVED***

        var target;

        if (overflowHidden === undefined) ***REMOVED*** overflowHidden = true; ***REMOVED***

        if (parent)
        ***REMOVED***
            if (typeof parent === 'string')
            ***REMOVED***
                // hopefully an element ID
                target = document.getElementById(parent);
            ***REMOVED***
            else if (typeof parent === 'object' && parent.nodeType === 1)
            ***REMOVED***
                // quick test for a HTMLelement
                target = parent;
            ***REMOVED***
        ***REMOVED***

        // Fallback, covers an invalid ID and a non HTMLelement object
        if (!target)
        ***REMOVED***
            target = document.body;
        ***REMOVED***

        if (overflowHidden && target.style)
        ***REMOVED***
            target.style.overflow = 'hidden';
        ***REMOVED***

        target.appendChild(canvas);

        return canvas;

    ***REMOVED***,

    /**
    * Removes the given canvas element from the DOM.
    *
    * @method Phaser.Canvas.removeFromDOM
    * @param ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - The canvas to be removed from the DOM.
    */
    removeFromDOM: function (canvas) ***REMOVED***

        if (canvas.parentNode)
        ***REMOVED***
            canvas.parentNode.removeChild(canvas);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets the transform of the given canvas to the matrix values provided.
    *
    * @method Phaser.Canvas.setTransform
    * @param ***REMOVED***CanvasRenderingContext2D***REMOVED*** context - The context to set the transform on.
    * @param ***REMOVED***number***REMOVED*** translateX - The value to translate horizontally by.
    * @param ***REMOVED***number***REMOVED*** translateY - The value to translate vertically by.
    * @param ***REMOVED***number***REMOVED*** scaleX - The value to scale horizontally by.
    * @param ***REMOVED***number***REMOVED*** scaleY - The value to scale vertically by.
    * @param ***REMOVED***number***REMOVED*** skewX - The value to skew horizontaly by.
    * @param ***REMOVED***number***REMOVED*** skewY - The value to skew vertically by.
    * @return ***REMOVED***CanvasRenderingContext2D***REMOVED*** Returns the source context.
    */
    setTransform: function (context, translateX, translateY, scaleX, scaleY, skewX, skewY) ***REMOVED***

        context.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY);

        return context;

    ***REMOVED***,

    /**
    * Sets the Image Smoothing property on the given context. Set to false to disable image smoothing.
    * By default browsers have image smoothing enabled, which isn't always what you visually want, especially
    * when using pixel art in a game. Note that this sets the property on the context itself, so that any image
    * drawn to the context will be affected. This sets the property across all current browsers but support is
    * patchy on earlier browsers, especially on mobile.
    *
    * @method Phaser.Canvas.setSmoothingEnabled
    * @param ***REMOVED***CanvasRenderingContext2D***REMOVED*** context - The context to enable or disable the image smoothing on.
    * @param ***REMOVED***boolean***REMOVED*** value - If set to true it will enable image smoothing, false will disable it.
    * @return ***REMOVED***CanvasRenderingContext2D***REMOVED*** Returns the source context.
    */
    setSmoothingEnabled: function (context, value) ***REMOVED***

        var s = Phaser.Canvas.getSmoothingPrefix(context);

        if (s)
        ***REMOVED***
            context[s] = value;
        ***REMOVED***

        return context;

    ***REMOVED***,

    /**
    * Gets the Smoothing Enabled vendor prefix being used on the given context, or null if not set.
    *
    * @method Phaser.Canvas.getSmoothingPrefix
    * @param ***REMOVED***CanvasRenderingContext2D***REMOVED*** context - The context to enable or disable the image smoothing on.
    * @return ***REMOVED***string|null***REMOVED*** Returns the smoothingEnabled vendor prefix, or null if not set on the context.
    */
    getSmoothingPrefix: function (context) ***REMOVED***

        var vendor = [ 'i', 'webkitI', 'msI', 'mozI', 'oI' ];

        for (var prefix in vendor)
        ***REMOVED***
            var s = vendor[prefix] + 'mageSmoothingEnabled';

            if (s in context)
            ***REMOVED***
                return s;
            ***REMOVED***
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
     * Returns `true` if the given context has image smoothing enabled, otherwise returns `false`.
     *
     * @method Phaser.Canvas.getSmoothingEnabled
     * @param ***REMOVED***CanvasRenderingContext2D***REMOVED*** context - The context to check for smoothing on.
     * @return ***REMOVED***boolean***REMOVED*** True if the given context has image smoothing enabled, otherwise false.
     */
    getSmoothingEnabled: function (context) ***REMOVED***

        var s = Phaser.Canvas.getSmoothingPrefix(context);

        if (s)
        ***REMOVED***
            return context[s];
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets the CSS image-rendering property on the given canvas to be 'crisp' (aka 'optimize contrast' on webkit).
    * Note that if this doesn't given the desired result then see the setSmoothingEnabled.
    *
    * @method Phaser.Canvas.setImageRenderingCrisp
    * @param ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - The canvas to set image-rendering crisp on.
    * @return ***REMOVED***HTMLCanvasElement***REMOVED*** Returns the source canvas.
    */
    setImageRenderingCrisp: function (canvas) ***REMOVED***

        var types = [ 'optimizeSpeed', 'crisp-edges', '-moz-crisp-edges', '-webkit-optimize-contrast', 'optimize-contrast', 'pixelated' ];

        for (var i = 0; i < types.length; i++)
        ***REMOVED***
            canvas.style['image-rendering'] = types[i];
        ***REMOVED***

        canvas.style.msInterpolationMode = 'nearest-neighbor';

        return canvas;

    ***REMOVED***,

    /**
    * Sets the CSS image-rendering property on the given canvas to be 'bicubic' (aka 'auto').
    * Note that if this doesn't given the desired result then see the CanvasUtils.setSmoothingEnabled method.
    *
    * @method Phaser.Canvas.setImageRenderingBicubic
    * @param ***REMOVED***HTMLCanvasElement***REMOVED*** canvas The canvas to set image-rendering bicubic on.
    * @return ***REMOVED***HTMLCanvasElement***REMOVED*** Returns the source canvas.
    */
    setImageRenderingBicubic: function (canvas) ***REMOVED***

        canvas.style['image-rendering'] = 'auto';
        canvas.style.msInterpolationMode = 'bicubic';

        return canvas;

    ***REMOVED***

***REMOVED***;
