/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

    if (typeof exports !== 'undefined') ***REMOVED***
        if (typeof module !== 'undefined' && module.exports) ***REMOVED***
            exports = module.exports = PIXI;
        ***REMOVED***
        exports.PIXI = PIXI;
    ***REMOVED*** else if (typeof define !== 'undefined' && define.amd) ***REMOVED***
        define('PIXI', (function() ***REMOVED*** return root.PIXI = PIXI; ***REMOVED***)() );
    ***REMOVED*** else ***REMOVED***
        root.PIXI = PIXI;
    ***REMOVED***

    return PIXI;
***REMOVED***).call(this);