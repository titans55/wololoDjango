/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Phaser.Color stub. This stub only includes the bare minimum functions that Phaser needs.
*
* @class Phaser.Color
*/
Phaser.Color = ***REMOVED***

    /**
    * Converts a value - a "hex" string, a "CSS 'web' string", or a number - into red, green, blue, and alpha components.
    *
    * The value can be a string (see `hexToColor` and `webToColor` for the supported formats) or a packed integer (see `getRGB`).
    *
    * An alpha channel is _not_ supported when specifying a hex string.
    *
    * @method Phaser.Color.valueToColor
    * @static
    * @param ***REMOVED***string|number***REMOVED*** value - The color expressed as a recognized string format or a packed integer.
    * @param ***REMOVED***object***REMOVED*** [out] - The object to use for the output. If not provided a new object will be created.
    * @return ***REMOVED***object***REMOVED*** The (`out`) object with the red, green, blue, and alpha values set as the r/g/b/a properties.
    */
    valueToColor: function (value, out) ***REMOVED***

        if (typeof value === 'string')
        ***REMOVED***
            if (value.indexOf('rgb') === 0)
            ***REMOVED***
                return Phaser.Color.webToColor(value, out);
            ***REMOVED***
            else
            ***REMOVED***
                //  `hexToColor` does not support alpha; match `createColor`.
                out.a = 1;
                return Phaser.Color.hexToColor(value, out);
            ***REMOVED***
        ***REMOVED***
        else if (typeof value === 'number')
        ***REMOVED***
            //  `getRGB` does not take optional object to modify;
            //  alpha is also adjusted to match `createColor`.
            var tempColor = Phaser.Color.getRGB(value);
            out.r = tempColor.r;
            out.g = tempColor.g;
            out.b = tempColor.b;
            out.a = tempColor.a / 255;
            return out;
        ***REMOVED***
        else
        ***REMOVED***
            return out;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Return the component parts of a color as an Object with the properties alpha, red, green, blue.
    *
    * Alpha will only be set if it exist in the given color (0xAARRGGBB)
    *
    * @method Phaser.Color.getRGB
    * @static
    * @param ***REMOVED***number***REMOVED*** color - Color in RGB (0xRRGGBB) or ARGB format (0xAARRGGBB).
    * @returns ***REMOVED***object***REMOVED*** An Object with properties: alpha, red, green, blue (also r, g, b and a). Alpha will only be present if a color value > 16777215 was given.
    */
    getRGB: function (color) ***REMOVED***

        if (color > 16777215)
        ***REMOVED***
            //  The color value has an alpha component
            return ***REMOVED***
                alpha: color >>> 24,
                red: color >> 16 & 0xFF,
                green: color >> 8 & 0xFF,
                blue: color & 0xFF,
                a: color >>> 24,
                r: color >> 16 & 0xFF,
                g: color >> 8 & 0xFF,
                b: color & 0xFF
            ***REMOVED***;
        ***REMOVED***
        else
        ***REMOVED***
            return ***REMOVED***
                alpha: 255,
                red: color >> 16 & 0xFF,
                green: color >> 8 & 0xFF,
                blue: color & 0xFF,
                a: 255,
                r: color >> 16 & 0xFF,
                g: color >> 8 & 0xFF,
                b: color & 0xFF
            ***REMOVED***;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Converts a CSS 'web' string into a Phaser Color object.
    *
    * The web string can be in the format `'rgb(r,g,b)'` or `'rgba(r,g,b,a)'` where r/g/b are in the range [0..255] and a is in the range [0..1].
    *
    * @method Phaser.Color.webToColor
    * @static
    * @param ***REMOVED***string***REMOVED*** web - The color string in CSS 'web' format.
    * @param ***REMOVED***object***REMOVED*** [out] - An object into which 4 properties will be created: r, g, b and a. If not provided a new object will be created.
    * @return ***REMOVED***object***REMOVED*** An object with the red, green, blue and alpha values set in the r, g, b and a properties.
    */
    webToColor: function (web, out) ***REMOVED***

        var result = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)$/.exec(web);

        if (result)
        ***REMOVED***
            out.r = parseInt(result[1], 10);
            out.g = parseInt(result[2], 10);
            out.b = parseInt(result[3], 10);
            out.a = result[4] !== undefined ? parseFloat(result[4]) : 1;
            Phaser.Color.updateColor(out);
        ***REMOVED***

        return out;

    ***REMOVED***,

    /**
    * Converts a hex string into a Phaser Color object.
    *
    * The hex string can supplied as `'#0033ff'` or the short-hand format of `'#03f'`; it can begin with an optional "#" or "0x", or be unprefixed.    
    *
    * An alpha channel is _not_ supported.
    *
    * @method Phaser.Color.hexToColor
    * @static
    * @param ***REMOVED***string***REMOVED*** hex - The color string in a hex format.
    * @param ***REMOVED***object***REMOVED*** [out] - An object into which 3 properties will be created or set: r, g and b. If not provided a new object will be created.
    * @return ***REMOVED***object***REMOVED*** An object with the red, green and blue values set in the r, g and b properties.
    */
    hexToColor: function (hex, out) ***REMOVED***

        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        hex = hex.replace(/^(?:#|0x)?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) ***REMOVED***
            return r + r + g + g + b + b;
        ***REMOVED***);

        var result = /^(?:#|0x)?([a-f\d]***REMOVED***2***REMOVED***)([a-f\d]***REMOVED***2***REMOVED***)([a-f\d]***REMOVED***2***REMOVED***)$/i.exec(hex);

        if (result)
        ***REMOVED***
            var r = parseInt(result[1], 16);
            var g = parseInt(result[2], 16);
            var b = parseInt(result[3], 16);

            out.r = r;
            out.g = g;
            out.b = b;
        ***REMOVED***

        return out;

    ***REMOVED***,

    /**
    * Takes a color object and updates the rgba property.
    *
    * @method Phaser.Color.updateColor
    * @static
    * @param ***REMOVED***object***REMOVED*** out - The color object to update.
    * @returns ***REMOVED***number***REMOVED*** A native color value integer (format: 0xAARRGGBB).
    */
    updateColor: function (out) ***REMOVED***

        out.rgba = 'rgba(' + out.r.toString() + ',' + out.g.toString() + ',' + out.b.toString() + ',' + out.a.toString() + ')';
        out.color = Phaser.Color.getColor(out.r, out.g, out.b);
        out.color32 = Phaser.Color.getColor32(out.a, out.r, out.g, out.b);

        return out;

    ***REMOVED***,

    /**
    * Given an alpha and 3 color values this will return an integer representation of it.
    *
    * @method Phaser.Color.getColor32
    * @static
    * @param ***REMOVED***number***REMOVED*** a - The alpha color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** r - The red color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** g - The green color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** b - The blue color component, in the range 0 - 255.
    * @returns ***REMOVED***number***REMOVED*** A native color value integer (format: 0xAARRGGBB).
    */
    getColor32: function (a, r, g, b) ***REMOVED***

        return a << 24 | r << 16 | g << 8 | b;

    ***REMOVED***,

    /**
    * Given 3 color values this will return an integer representation of it.
    *
    * @method Phaser.Color.getColor
    * @static
    * @param ***REMOVED***number***REMOVED*** r - The red color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** g - The green color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** b - The blue color component, in the range 0 - 255.
    * @returns ***REMOVED***number***REMOVED*** A native color value integer (format: 0xRRGGBB).
    */
    getColor: function (r, g, b) ***REMOVED***

        return r << 16 | g << 8 | b;

    ***REMOVED***

***REMOVED***;
