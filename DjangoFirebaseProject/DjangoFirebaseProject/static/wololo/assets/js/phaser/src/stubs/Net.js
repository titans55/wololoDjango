/**
* @author       Steven Rogers <soldoutactivist@gmail.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* This is a stub for the Phaser Net Class.
* It allows you to exclude the default Net from your build, without making Game crash.
*/

var netNoop = function () ***REMOVED******REMOVED***;

Phaser.Net = netNoop;

Phaser.Net.prototype = ***REMOVED***
    isDisabled: true,

    getHostName: netNoop,
    checkDomainName: netNoop,
    updateQueryString: netNoop,
    getQueryString: netNoop,
    decodeURI: netNoop
***REMOVED***;

Phaser.Net.prototype.constructor = Phaser.Net;
