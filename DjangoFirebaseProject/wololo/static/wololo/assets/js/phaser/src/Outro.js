/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

    if (typeof exports !== 'undefined') ***REMOVED***
        if (typeof module !== 'undefined' && module.exports) ***REMOVED***
            exports = module.exports = Phaser;
        ***REMOVED***
        exports.Phaser = Phaser;
    ***REMOVED*** else if (typeof define !== 'undefined' && define.amd) ***REMOVED***
        define('Phaser', (function() ***REMOVED*** return root.Phaser = Phaser; ***REMOVED***)() );
    ***REMOVED*** else ***REMOVED***
        root.Phaser = Phaser;
    ***REMOVED***

    return Phaser;
***REMOVED***).call(this);

/*
* "What matters in this life is not what we do but what we do for others, the legacy we leave and the imprint we make." - Eric Meyer
*/
