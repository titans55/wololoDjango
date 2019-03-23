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

    ***REMOVED***

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

***REMOVED***, null, true);
