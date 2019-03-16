/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Phaser.Net handles browser URL related tasks such as checking host names, domain names and query string manipulation.
*
* @class Phaser.Net
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.Net = function (game) ***REMOVED***

    this.game = game;

***REMOVED***;

Phaser.Net.prototype = ***REMOVED***

    /**
    * Returns the hostname given by the browser.
    *
    * @method Phaser.Net#getHostName
    * @return ***REMOVED***string***REMOVED***
    */
    getHostName: function () ***REMOVED***

        if (window.location && window.location.hostname) ***REMOVED***
            return window.location.hostname;
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Compares the given domain name against the hostname of the browser containing the game.
    * If the domain name is found it returns true.
    * You can specify a part of a domain, for example 'google' would match 'google.com', 'google.co.uk', etc.
    * Do not include 'http://' at the start.
    *
    * @method Phaser.Net#checkDomainName
    * @param ***REMOVED***string***REMOVED*** domain
    * @return ***REMOVED***boolean***REMOVED*** true if the given domain fragment can be found in the window.location.hostname
    */
    checkDomainName: function (domain) ***REMOVED***
        return window.location.hostname.indexOf(domain) !== -1;
    ***REMOVED***,

    /**
    * Updates a value on the Query String and returns it in full.
    * If the value doesn't already exist it is set.
    * If the value exists it is replaced with the new value given. If you don't provide a new value it is removed from the query string.
    * Optionally you can redirect to the new url, or just return it as a string.
    *
    * @method Phaser.Net#updateQueryString
    * @param ***REMOVED***string***REMOVED*** key - The querystring key to update.
    * @param ***REMOVED***string***REMOVED*** value - The new value to be set. If it already exists it will be replaced.
    * @param ***REMOVED***boolean***REMOVED*** redirect - If true the browser will issue a redirect to the url with the new querystring.
    * @param ***REMOVED***string***REMOVED*** url - The URL to modify. If none is given it uses window.location.href.
    * @return ***REMOVED***string***REMOVED*** If redirect is false then the modified url and query string is returned.
    */
    updateQueryString: function (key, value, redirect, url) ***REMOVED***

        if (redirect === undefined) ***REMOVED*** redirect = false; ***REMOVED***
        if (url === undefined || url === '') ***REMOVED*** url = window.location.href; ***REMOVED***

        var output = '';
        var re = new RegExp("([?|&])" + key + "=.*?(&|#|$)(.*)", "gi");

        if (re.test(url))
        ***REMOVED***
            if (typeof value !== 'undefined' && value !== null)
            ***REMOVED***
                output = url.replace(re, '$1' + key + "=" + value + '$2$3');
            ***REMOVED***
            else
            ***REMOVED***
                output = url.replace(re, '$1$3').replace(/(&|\?)$/, '');
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (typeof value !== 'undefined' && value !== null)
            ***REMOVED***
                var separator = url.indexOf('?') !== -1 ? '&' : '?';
                var hash = url.split('#');
                url = hash[0] + separator + key + '=' + value;

                if (hash[1]) ***REMOVED***
                    url += '#' + hash[1];
                ***REMOVED***

                output = url;

            ***REMOVED***
            else
            ***REMOVED***
                output = url;
            ***REMOVED***
        ***REMOVED***

        if (redirect)
        ***REMOVED***
            window.location.href = output;
        ***REMOVED***
        else
        ***REMOVED***
            return output;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns the Query String as an object.
    * If you specify a parameter it will return just the value of that parameter, should it exist.
    *
    * @method Phaser.Net#getQueryString
    * @param ***REMOVED***string***REMOVED*** [parameter=''] - If specified this will return just the value for that key.
    * @return ***REMOVED***string|object***REMOVED*** An object containing the key value pairs found in the query string or just the value if a parameter was given.
    */
    getQueryString: function (parameter) ***REMOVED***

        if (parameter === undefined) ***REMOVED*** parameter = ''; ***REMOVED***

        var output = ***REMOVED******REMOVED***;
        var keyValues = location.search.substring(1).split('&');

        for (var i in keyValues)
        ***REMOVED***
            var key = keyValues[i].split('=');

            if (key.length > 1)
            ***REMOVED***
                if (parameter && parameter === this.decodeURI(key[0]))
                ***REMOVED***
                    return this.decodeURI(key[1]);
                ***REMOVED***
                else
                ***REMOVED***
                    output[this.decodeURI(key[0])] = this.decodeURI(key[1]);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Takes a Uniform Resource Identifier (URI) component (previously created by encodeURIComponent or by a similar routine) and
    * decodes it, replacing \ with spaces in the return. Used internally by the Net classes.
    *
    * @method Phaser.Net#decodeURI
    * @param ***REMOVED***string***REMOVED*** value - The URI component to be decoded.
    * @return ***REMOVED***string***REMOVED*** The decoded value.
    */
    decodeURI: function (value) ***REMOVED***
        return decodeURIComponent(value.replace(/\+/g, " "));
    ***REMOVED***

***REMOVED***;

Phaser.Net.prototype.constructor = Phaser.Net;
