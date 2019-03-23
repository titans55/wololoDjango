/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* DOM utility class.
*
* Provides a useful Window and Element functions as well as cross-browser compatibility buffer.
*
* Some code originally derived from ***REMOVED***@link https://github.com/ryanve/verge verge***REMOVED***.
* Some parts were inspired by the research of Ryan Van Etten, released under MIT License 2013.
* 
* @class Phaser.DOM
* @static
*/
Phaser.DOM = ***REMOVED***

    /**
    * Get the [absolute] position of the element relative to the Document.
    *
    * The value may vary slightly as the page is scrolled due to rounding errors.
    *
    * @method Phaser.DOM.getOffset
    * @param ***REMOVED***DOMElement***REMOVED*** element - The targeted element that we want to retrieve the offset.
    * @param ***REMOVED***Phaser.Point***REMOVED*** [point] - The point we want to take the x/y values of the offset.
    * @return ***REMOVED***Phaser.Point***REMOVED*** - A point objet with the offsetX and Y as its properties.
    */
    getOffset: function (element, point) ***REMOVED***

        point = point || new Phaser.Point();

        var box = element.getBoundingClientRect();

        var scrollTop = Phaser.DOM.scrollY;
        var scrollLeft = Phaser.DOM.scrollX;
        var clientTop = document.documentElement.clientTop;
        var clientLeft = document.documentElement.clientLeft;

        point.x = box.left + scrollLeft - clientLeft;
        point.y = box.top + scrollTop - clientTop;

        return point;

    ***REMOVED***,

    /**
    * A cross-browser element.getBoundingClientRect method with optional cushion.
    * 
    * Returns a plain object containing the properties `top/bottom/left/right/width/height` with respect to the top-left corner of the current viewport.
    * Its properties match the native rectangle.
    * The cushion parameter is an amount of pixels (+/-) to cushion the element.
    * It adjusts the measurements such that it is possible to detect when an element is near the viewport.
    * 
    * @method Phaser.DOM.getBounds
    * @param ***REMOVED***DOMElement|Object***REMOVED*** element - The element or stack (uses first item) to get the bounds for.
    * @param ***REMOVED***number***REMOVED*** [cushion] - A +/- pixel adjustment amount.
    * @return ***REMOVED***Object|boolean***REMOVED*** A plain object containing the properties `top/bottom/left/right/width/height` or `false` if a non-valid element is given.
    */
    getBounds: function (element, cushion) ***REMOVED***

        if (cushion === undefined) ***REMOVED*** cushion = 0; ***REMOVED***

        element = element && !element.nodeType ? element[0] : element;

        if (!element || element.nodeType !== 1)
        ***REMOVED***
            return false;
        ***REMOVED***
        else
        ***REMOVED***
            return this.calibrate(element.getBoundingClientRect(), cushion);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Calibrates element coordinates for `inLayoutViewport` checks.
    *
    * @method Phaser.DOM.calibrate
    * @private
    * @param ***REMOVED***object***REMOVED*** coords - An object containing the following properties: `***REMOVED***top: number, right: number, bottom: number, left: number***REMOVED***`
    * @param ***REMOVED***number***REMOVED*** [cushion] - A value to adjust the coordinates by.
    * @return ***REMOVED***object***REMOVED*** The calibrated element coordinates
    */
    calibrate: function (coords, cushion) ***REMOVED***

        cushion = +cushion || 0;

        var output = ***REMOVED*** width: 0, height: 0, left: 0, right: 0, top: 0, bottom: 0 ***REMOVED***;

        output.width = (output.right = coords.right + cushion) - (output.left = coords.left - cushion);
        output.height = (output.bottom = coords.bottom + cushion) - (output.top = coords.top - cushion);

        return output;

    ***REMOVED***,

    /**
    * Get the Visual viewport aspect ratio (or the aspect ratio of an object or element)    
    * 
    * @method Phaser.DOM.getAspectRatio
    * @param ***REMOVED***(DOMElement|Object)***REMOVED*** [object=(visualViewport)] - The object to determine the aspect ratio for. Must have public `width` and `height` properties or methods.
    * @return ***REMOVED***number***REMOVED*** The aspect ratio.
    */
    getAspectRatio: function (object) ***REMOVED***

        object = null == object ? this.visualBounds : 1 === object.nodeType ? this.getBounds(object) : object;

        var w = object['width'];
        var h = object['height'];

        if (typeof w === 'function')
        ***REMOVED***
            w = w.call(object);
        ***REMOVED***

        if (typeof h === 'function')
        ***REMOVED***
            h = h.call(object);
        ***REMOVED***

        return w / h;

    ***REMOVED***,

    /**
    * Tests if the given DOM element is within the Layout viewport.
    * 
    * The optional cushion parameter allows you to specify a distance.
    * 
    * inLayoutViewport(element, 100) is `true` if the element is in the viewport or 100px near it.
    * inLayoutViewport(element, -100) is `true` if the element is in the viewport or at least 100px near it.
    * 
    * @method Phaser.DOM.inLayoutViewport
    * @param ***REMOVED***DOMElement|Object***REMOVED*** element - The DOM element to check. If no element is given it defaults to the Phaser game canvas.
    * @param ***REMOVED***number***REMOVED*** [cushion] - The cushion allows you to specify a distance within which the element must be within the viewport.
    * @return ***REMOVED***boolean***REMOVED*** True if the element is within the viewport, or within `cushion` distance from it.
    */
    inLayoutViewport: function (element, cushion) ***REMOVED***

        var r = this.getBounds(element, cushion);

        return !!r && r.bottom >= 0 && r.right >= 0 && r.top <= this.layoutBounds.width && r.left <= this.layoutBounds.height;

    ***REMOVED***,

    /**
    * Returns the device screen orientation.
    *
    * Orientation values: 'portrait-primary', 'landscape-primary', 'portrait-secondary', 'landscape-secondary'.
    *
    * Order of resolving:
    * - Screen Orientation API, or variation of - Future track. Most desktop and mobile browsers.
    * - Screen size ratio check - If fallback is 'screen', suited for desktops.
    * - Viewport size ratio check - If fallback is 'viewport', suited for mobile.
    * - window.orientation - If fallback is 'window.orientation', works iOS and probably most Android; non-recommended track.
    * - Media query
    * - Viewport size ratio check (probably only IE9 and legacy mobile gets here..)
    *
    * See
    * - https://w3c.github.io/screen-orientation/ (conflicts with mozOrientation/msOrientation)
    * - https://developer.mozilla.org/en-US/docs/Web/API/Screen.orientation (mozOrientation)
    * - http://msdn.microsoft.com/en-us/library/ie/dn342934(v=vs.85).aspx
    * - https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Testing_media_queries
    * - http://stackoverflow.com/questions/4917664/detect-viewport-orientation
    * - http://www.matthewgifford.com/blog/2011/12/22/a-misconception-about-window-orientation
    *
    * @method Phaser.DOM.getScreenOrientation
    * @protected
    * @param ***REMOVED***string***REMOVED*** [primaryFallback=(none)] - Specify 'screen', 'viewport', or 'window.orientation'.
    */
    getScreenOrientation: function (primaryFallback) ***REMOVED***

        var screen = window.screen;
        var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;

        if (orientation && typeof orientation.type === 'string')
        ***REMOVED***
            // Screen Orientation API specification
            return orientation.type;
        ***REMOVED***
        else if (typeof orientation === 'string')
        ***REMOVED***
            // moz/ms-orientation are strings
            return orientation;
        ***REMOVED***

        var PORTRAIT = 'portrait-primary';
        var LANDSCAPE = 'landscape-primary';
        
        if (primaryFallback === 'screen')
        ***REMOVED***
            return (screen.height > screen.width) ? PORTRAIT : LANDSCAPE;
        ***REMOVED***
        else if (primaryFallback === 'viewport')
        ***REMOVED***
            return (this.visualBounds.height > this.visualBounds.width) ? PORTRAIT : LANDSCAPE;
        ***REMOVED***
        else if (primaryFallback === 'window.orientation' && typeof window.orientation === 'number')
        ***REMOVED***
            // This may change by device based on "natural" orientation.
            return (window.orientation === 0 || window.orientation === 180) ? PORTRAIT : LANDSCAPE;
        ***REMOVED***
        else if (window.matchMedia)
        ***REMOVED***
            if (window.matchMedia("(orientation: portrait)").matches)
            ***REMOVED***
                return PORTRAIT;
            ***REMOVED***
            else if (window.matchMedia("(orientation: landscape)").matches)
            ***REMOVED***
                return LANDSCAPE;
            ***REMOVED***
        ***REMOVED***

        return (this.visualBounds.height > this.visualBounds.width) ? PORTRAIT : LANDSCAPE;

    ***REMOVED***,

    /**
    * The bounds of the Visual viewport, as discussed in 
    * ***REMOVED***@link http://www.quirksmode.org/mobile/viewports.html A tale of two viewports — part one***REMOVED***
    * with one difference: the viewport size _excludes_ scrollbars, as found on some desktop browsers.   
    *
    * Supported mobile:
    *   iOS/Safari, Android 4, IE10, Firefox OS (maybe not Firefox Android), Opera Mobile 16
    *
    * The properties change dynamically.
    *
    * @type ***REMOVED***Phaser.Rectangle***REMOVED***
    * @property ***REMOVED***number***REMOVED*** x - Scroll, left offset - eg. "scrollX"
    * @property ***REMOVED***number***REMOVED*** y - Scroll, top offset - eg. "scrollY"
    * @property ***REMOVED***number***REMOVED*** width - Viewport width in pixels.
    * @property ***REMOVED***number***REMOVED*** height - Viewport height in pixels.
    * @readonly
    */
    visualBounds: new Phaser.Rectangle(),

    /**
    * The bounds of the Layout viewport, as discussed in 
    * ***REMOVED***@link http://www.quirksmode.org/mobile/viewports2.html A tale of two viewports — part two***REMOVED***;
    * but honoring the constraints as specified applicable viewport meta-tag.
    *
    * The bounds returned are not guaranteed to be fully aligned with CSS media queries (see
    * ***REMOVED***@link http://www.matanich.com/2013/01/07/viewport-size/ What size is my viewport?***REMOVED***).
    *
    * This is _not_ representative of the Visual bounds: in particular the non-primary axis will
    * generally be significantly larger than the screen height on mobile devices when running with a
    * constrained viewport.
    *
    * The properties change dynamically.
    *
    * @type ***REMOVED***Phaser.Rectangle***REMOVED***
    * @property ***REMOVED***number***REMOVED*** width - Viewport width in pixels.
    * @property ***REMOVED***number***REMOVED*** height - Viewport height in pixels.
    * @readonly
    */
    layoutBounds: new Phaser.Rectangle(),

    /**
    * The size of the document / Layout viewport.
    *
    * This incorrectly reports the dimensions in IE.
    *
    * The properties change dynamically.
    *
    * @type ***REMOVED***Phaser.Rectangle***REMOVED***
    * @property ***REMOVED***number***REMOVED*** width - Document width in pixels.
    * @property ***REMOVED***number***REMOVED*** height - Document height in pixels.
    * @readonly
    */
    documentBounds: new Phaser.Rectangle()

***REMOVED***;

Phaser.Device.whenReady(function (device) ***REMOVED***

    // All target browsers should support page[XY]Offset.
    var scrollX = window && ('pageXOffset' in window) ?
        function () ***REMOVED*** return window.pageXOffset; ***REMOVED*** :
        function () ***REMOVED*** return document.documentElement.scrollLeft; ***REMOVED***;

    var scrollY = window && ('pageYOffset' in window) ?
        function () ***REMOVED*** return window.pageYOffset; ***REMOVED*** :
        function () ***REMOVED*** return document.documentElement.scrollTop; ***REMOVED***;

    /**
    * A cross-browser window.scrollX.
    *
    * @name Phaser.DOM.scrollX
    * @property ***REMOVED***number***REMOVED*** scrollX
    * @readonly
    * @protected
    */
    Object.defineProperty(Phaser.DOM, "scrollX", ***REMOVED***
        get: scrollX
    ***REMOVED***);

    /**
    * A cross-browser window.scrollY.
    *
    * @name Phaser.DOM.scrollY
    * @property ***REMOVED***number***REMOVED*** scrollY
    * @readonly
    * @protected
    */
    Object.defineProperty(Phaser.DOM, "scrollY", ***REMOVED***
        get: scrollY
    ***REMOVED***);

    Object.defineProperty(Phaser.DOM.visualBounds, "x", ***REMOVED***
        get: scrollX
    ***REMOVED***);

    Object.defineProperty(Phaser.DOM.visualBounds, "y", ***REMOVED***
        get: scrollY
    ***REMOVED***);

    Object.defineProperty(Phaser.DOM.layoutBounds, "x", ***REMOVED***
        value: 0
    ***REMOVED***);

    Object.defineProperty(Phaser.DOM.layoutBounds, "y", ***REMOVED***
        value: 0
    ***REMOVED***);

    var treatAsDesktop = device.desktop &&
        (document.documentElement.clientWidth <= window.innerWidth) &&
        (document.documentElement.clientHeight <= window.innerHeight);

    // Desktop browsers align the layout viewport with the visual viewport.
    // This differs from mobile browsers with their zooming design.
    // Ref. http://quirksmode.org/mobile/tableViewport.html  
    if (treatAsDesktop)
    ***REMOVED***

        // PST- When scrollbars are not included this causes upstream issues in ScaleManager.
        // So reverted to the old "include scrollbars."
        var clientWidth = function () ***REMOVED***
            return Math.max(window.innerWidth, document.documentElement.clientWidth);
        ***REMOVED***;
        var clientHeight = function () ***REMOVED***
            return Math.max(window.innerHeight, document.documentElement.clientHeight);
        ***REMOVED***;

        // Interested in area sans-scrollbar
        Object.defineProperty(Phaser.DOM.visualBounds, "width", ***REMOVED***
            get: clientWidth
        ***REMOVED***);

        Object.defineProperty(Phaser.DOM.visualBounds, "height", ***REMOVED***
            get: clientHeight
        ***REMOVED***);

        Object.defineProperty(Phaser.DOM.layoutBounds, "width", ***REMOVED***
            get: clientWidth
        ***REMOVED***);

        Object.defineProperty(Phaser.DOM.layoutBounds, "height", ***REMOVED***
            get: clientHeight
        ***REMOVED***);

    ***REMOVED*** else ***REMOVED***

        Object.defineProperty(Phaser.DOM.visualBounds, "width", ***REMOVED***
            get: function () ***REMOVED***
                return window.innerWidth;
            ***REMOVED***
        ***REMOVED***);

        Object.defineProperty(Phaser.DOM.visualBounds, "height", ***REMOVED***
            get: function () ***REMOVED***
                return window.innerHeight;
            ***REMOVED***
        ***REMOVED***);

        Object.defineProperty(Phaser.DOM.layoutBounds, "width", ***REMOVED***

            get: function () ***REMOVED***
                var a = document.documentElement.clientWidth;
                var b = window.innerWidth;

                return a < b ? b : a; // max
            ***REMOVED***

        ***REMOVED***);

        Object.defineProperty(Phaser.DOM.layoutBounds, "height", ***REMOVED***

            get: function () ***REMOVED***
                var a = document.documentElement.clientHeight;
                var b = window.innerHeight;

                return a < b ? b : a; // max
            ***REMOVED***

        ***REMOVED***);

    ***REMOVED***

    // For Phaser.DOM.documentBounds
    // Ref. http://www.quirksmode.org/mobile/tableViewport_desktop.html

    Object.defineProperty(Phaser.DOM.documentBounds, "x", ***REMOVED***
        value: 0
    ***REMOVED***);

    Object.defineProperty(Phaser.DOM.documentBounds, "y", ***REMOVED***
        value: 0
    ***REMOVED***);

    Object.defineProperty(Phaser.DOM.documentBounds, "width", ***REMOVED***

        get: function () ***REMOVED***
            var d = document.documentElement;
            return Math.max(d.clientWidth, d.offsetWidth, d.scrollWidth);
        ***REMOVED***

    ***REMOVED***);

    Object.defineProperty(Phaser.DOM.documentBounds, "height", ***REMOVED***

        get: function () ***REMOVED***
            var d = document.documentElement;
            return Math.max(d.clientHeight, d.offsetHeight, d.scrollHeight);
        ***REMOVED***

    ***REMOVED***);

***REMOVED***, null, true);
