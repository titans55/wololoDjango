/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Phaser.Color class is a set of static methods that assist in color manipulation and conversion.
*
* @class Phaser.Color
*/
Phaser.Color = ***REMOVED***

    /**
    * Packs the r, g, b, a components into a single integer, for use with Int32Array.
    * If device is little endian then ABGR order is used. Otherwise RGBA order is used.
    *
    * @author Matt DesLauriers (@mattdesl)
    * @method Phaser.Color.packPixel
    * @static
    * @param ***REMOVED***number***REMOVED*** r - The red color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** g - The green color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** b - The blue color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** a - The alpha color component, in the range 0 - 255.
    * @return ***REMOVED***number***REMOVED*** The packed color as uint32
    */
    packPixel: function (r, g, b, a) ***REMOVED***

        if (Phaser.Device.LITTLE_ENDIAN)
        ***REMOVED***
            return ( (a << 24) | (b << 16) | (g <<  8) | r ) >>> 0;
        ***REMOVED***
        else
        ***REMOVED***
            return ( (r << 24) | (g << 16) | (b <<  8) | a ) >>> 0;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Unpacks the r, g, b, a components into the specified color object, or a new
    * object, for use with Int32Array. If little endian, then ABGR order is used when
    * unpacking, otherwise, RGBA order is used. The resulting color object has the
    * `r, g, b, a` properties which are unrelated to endianness.
    *
    * Note that the integer is assumed to be packed in the correct endianness. On little-endian
    * the format is 0xAABBGGRR and on big-endian the format is 0xRRGGBBAA. If you want a
    * endian-independent method, use fromRGBA(rgba) and toRGBA(r, g, b, a).
    *
    * @author Matt DesLauriers (@mattdesl)
    * @method Phaser.Color.unpackPixel
    * @static
    * @param ***REMOVED***number***REMOVED*** rgba - The integer, packed in endian order by packPixel.
    * @param ***REMOVED***object***REMOVED*** [out] - An object into which 3 properties will be created: r, g and b. If not provided a new object will be created.
    * @param ***REMOVED***boolean***REMOVED*** [hsl=false] - Also convert the rgb values into hsl?
    * @param ***REMOVED***boolean***REMOVED*** [hsv=false] - Also convert the rgb values into hsv?
    * @return ***REMOVED***object***REMOVED*** An object with the red, green and blue values set in the r, g and b properties.
    */
    unpackPixel: function (rgba, out, hsl, hsv) ***REMOVED***

        if (out === undefined || out === null) ***REMOVED*** out = Phaser.Color.createColor(); ***REMOVED***
        if (hsl === undefined || hsl === null) ***REMOVED*** hsl = false; ***REMOVED***
        if (hsv === undefined || hsv === null) ***REMOVED*** hsv = false; ***REMOVED***

        if (Phaser.Device.LITTLE_ENDIAN)
        ***REMOVED***
            out.a = ((rgba & 0xff000000) >>> 24);
            out.b = ((rgba & 0x00ff0000) >>> 16);
            out.g = ((rgba & 0x0000ff00) >>> 8);
            out.r = ((rgba & 0x000000ff));
        ***REMOVED***
        else
        ***REMOVED***
            out.r = ((rgba & 0xff000000) >>> 24);
            out.g = ((rgba & 0x00ff0000) >>> 16);
            out.b = ((rgba & 0x0000ff00) >>> 8);
            out.a = ((rgba & 0x000000ff));
        ***REMOVED***

        out.color = rgba;
        out.rgba = 'rgba(' + out.r + ',' + out.g + ',' + out.b + ',' + (out.a / 255) + ')';

        if (hsl)
        ***REMOVED***
            Phaser.Color.RGBtoHSL(out.r, out.g, out.b, out);
        ***REMOVED***

        if (hsv)
        ***REMOVED***
            Phaser.Color.RGBtoHSV(out.r, out.g, out.b, out);
        ***REMOVED***

        return out;

    ***REMOVED***,

    /**
    * A utility to convert an integer in 0xRRGGBBAA format to a color object.
    * This does not rely on endianness.
    *
    * @author Matt DesLauriers (@mattdesl)
    * @method Phaser.Color.fromRGBA
    * @static
    * @param ***REMOVED***number***REMOVED*** rgba - An RGBA hex
    * @param ***REMOVED***object***REMOVED*** [out] - The object to use, optional.
    * @return ***REMOVED***object***REMOVED*** A color object.
    */
    fromRGBA: function (rgba, out) ***REMOVED***

        if (!out)
        ***REMOVED***
            out = Phaser.Color.createColor();
        ***REMOVED***

        out.r = ((rgba & 0xff000000) >>> 24);
        out.g = ((rgba & 0x00ff0000) >>> 16);
        out.b = ((rgba & 0x0000ff00) >>> 8);
        out.a = ((rgba & 0x000000ff));

        out.rgba = 'rgba(' + out.r + ',' + out.g + ',' + out.b + ',' + out.a + ')';

        return out;

    ***REMOVED***,

    /**
    * A utility to convert RGBA components to a 32 bit integer in RRGGBBAA format.
    *
    * @author Matt DesLauriers (@mattdesl)
    * @method Phaser.Color.toRGBA
    * @static
    * @param ***REMOVED***number***REMOVED*** r - The red color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** g - The green color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** b - The blue color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** a - The alpha color component, in the range 0 - 255.
    * @return ***REMOVED***number***REMOVED*** A RGBA-packed 32 bit integer
    */
    toRGBA: function (r, g, b, a) ***REMOVED***

        return (r << 24) | (g << 16) | (b <<  8) | a;

    ***REMOVED***,

    /**
    * Converts RGBA components to a 32 bit integer in AABBGGRR format.
    *
    * @method Phaser.Color.toABGR
    * @static
    * @param ***REMOVED***number***REMOVED*** r - The red color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** g - The green color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** b - The blue color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** a - The alpha color component, in the range 0 - 255.
    * @return ***REMOVED***number***REMOVED*** A RGBA-packed 32 bit integer
    */
    toABGR: function (r, g, b, a) ***REMOVED***

        return ((a << 24) | (b << 16) | (g << 8) | r) >>> 0;

    ***REMOVED***,

    /**
    * Converts an RGB color value to HSL (hue, saturation and lightness).
    * Conversion forumla from http://en.wikipedia.org/wiki/HSL_color_space.
    * Assumes RGB values are contained in the set [0, 255] and returns h, s and l in the set [0, 1].
    * Based on code by Michael Jackson (https://github.com/mjijackson)
    *
    * @method Phaser.Color.RGBtoHSL
    * @static
    * @param ***REMOVED***number***REMOVED*** r - The red color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** g - The green color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** b - The blue color component, in the range 0 - 255.
    * @param ***REMOVED***object***REMOVED*** [out] - An object into which 3 properties will be created, h, s and l. If not provided a new object will be created.
    * @return ***REMOVED***object***REMOVED*** An object with the hue, saturation and lightness values set in the h, s and l properties.
    */
    RGBtoHSL: function (r, g, b, out) ***REMOVED***

        if (!out)
        ***REMOVED***
            out = Phaser.Color.createColor(r, g, b, 1);
        ***REMOVED***

        r /= 255;
        g /= 255;
        b /= 255;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);

        // achromatic by default
        out.h = 0;
        out.s = 0;
        out.l = (max + min) / 2;

        if (max !== min)
        ***REMOVED***
            var d = max - min;

            out.s = out.l > 0.5 ? d / (2 - max - min) : d / (max + min);

            if (max === r)
            ***REMOVED***
                out.h = (g - b) / d + (g < b ? 6 : 0);
            ***REMOVED***
            else if (max === g)
            ***REMOVED***
                out.h = (b - r) / d + 2;
            ***REMOVED***
            else if (max === b)
            ***REMOVED***
                out.h = (r - g) / d + 4;
            ***REMOVED***

            out.h /= 6;
        ***REMOVED***

        return out;

    ***REMOVED***,

    /**
    * Converts an HSL (hue, saturation and lightness) color value to RGB.
    * Conversion forumla from http://en.wikipedia.org/wiki/HSL_color_space.
    * Assumes HSL values are contained in the set [0, 1] and returns r, g and b values in the set [0, 255].
    * Based on code by Michael Jackson (https://github.com/mjijackson)
    *
    * @method Phaser.Color.HSLtoRGB
    * @static
    * @param ***REMOVED***number***REMOVED*** h - The hue, in the range 0 - 1.
    * @param ***REMOVED***number***REMOVED*** s - The saturation, in the range 0 - 1.
    * @param ***REMOVED***number***REMOVED*** l - The lightness, in the range 0 - 1.
    * @param ***REMOVED***object***REMOVED*** [out] - An object into which 3 properties will be created: r, g and b. If not provided a new object will be created.
    * @return ***REMOVED***object***REMOVED*** An object with the red, green and blue values set in the r, g and b properties.
    */
    HSLtoRGB: function (h, s, l, out) ***REMOVED***

        if (!out)
        ***REMOVED***
            out = Phaser.Color.createColor(l, l, l);
        ***REMOVED***
        else
        ***REMOVED***
            // achromatic by default
            out.r = l;
            out.g = l;
            out.b = l;
        ***REMOVED***

        if (s !== 0)
        ***REMOVED***
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            out.r = Phaser.Color.hueToColor(p, q, h + 1 / 3);
            out.g = Phaser.Color.hueToColor(p, q, h);
            out.b = Phaser.Color.hueToColor(p, q, h - 1 / 3);
        ***REMOVED***

        // out.r = (out.r * 255 | 0);
        // out.g = (out.g * 255 | 0);
        // out.b = (out.b * 255 | 0);

        out.r = Math.floor((out.r * 255 | 0));
        out.g = Math.floor((out.g * 255 | 0));
        out.b = Math.floor((out.b * 255 | 0));

        Phaser.Color.updateColor(out);

        return out;

    ***REMOVED***,

    /**
    * Converts an RGB color value to HSV (hue, saturation and value).
    * Conversion forumla from http://en.wikipedia.org/wiki/HSL_color_space.
    * Assumes RGB values are contained in the set [0, 255] and returns h, s and v in the set [0, 1].
    * Based on code by Michael Jackson (https://github.com/mjijackson)
    *
    * @method Phaser.Color.RGBtoHSV
    * @static
    * @param ***REMOVED***number***REMOVED*** r - The red color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** g - The green color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** b - The blue color component, in the range 0 - 255.
    * @param ***REMOVED***object***REMOVED*** [out] - An object into which 3 properties will be created, h, s and v. If not provided a new object will be created.
    * @return ***REMOVED***object***REMOVED*** An object with the hue, saturation and value set in the h, s and v properties.
    */
    RGBtoHSV: function (r, g, b, out) ***REMOVED***

        if (!out)
        ***REMOVED***
            out = Phaser.Color.createColor(r, g, b, 255);
        ***REMOVED***

        r /= 255;
        g /= 255;
        b /= 255;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var d = max - min;

        // achromatic by default
        out.h = 0;
        out.s = max === 0 ? 0 : d / max;
        out.v = max;

        if (max !== min)
        ***REMOVED***
            if (max === r)
            ***REMOVED***
                out.h = (g - b) / d + (g < b ? 6 : 0);
            ***REMOVED***
            else if (max === g)
            ***REMOVED***
                out.h = (b - r) / d + 2;
            ***REMOVED***
            else if (max === b)
            ***REMOVED***
                out.h = (r - g) / d + 4;
            ***REMOVED***

            out.h /= 6;
        ***REMOVED***

        return out;

    ***REMOVED***,

    /**
    * Converts an HSV (hue, saturation and value) color value to RGB.
    * Conversion forumla from http://en.wikipedia.org/wiki/HSL_color_space.
    * Assumes HSV values are contained in the set [0, 1] and returns r, g and b values in the set [0, 255].
    * Based on code by Michael Jackson (https://github.com/mjijackson)
    *
    * @method Phaser.Color.HSVtoRGB
    * @static
    * @param ***REMOVED***number***REMOVED*** h - The hue, in the range 0 - 1.
    * @param ***REMOVED***number***REMOVED*** s - The saturation, in the range 0 - 1.
    * @param ***REMOVED***number***REMOVED*** v - The value, in the range 0 - 1.
    * @param ***REMOVED***object***REMOVED*** [out] - An object into which 3 properties will be created: r, g and b. If not provided a new object will be created.
    * @return ***REMOVED***object***REMOVED*** An object with the red, green and blue values set in the r, g and b properties.
    */
    HSVtoRGB: function (h, s, v, out) ***REMOVED***

        if (out === undefined) ***REMOVED*** out = Phaser.Color.createColor(0, 0, 0, 1, h, s, 0, v); ***REMOVED***

        var r, g, b;
        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch (i % 6)
        ***REMOVED***
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        ***REMOVED***

        out.r = Math.floor(r * 255);
        out.g = Math.floor(g * 255);
        out.b = Math.floor(b * 255);

        Phaser.Color.updateColor(out);

        return out;

    ***REMOVED***,

    /**
    * Converts a hue to an RGB color.
    * Based on code by Michael Jackson (https://github.com/mjijackson)
    *
    * @method Phaser.Color.hueToColor
    * @static
    * @param ***REMOVED***number***REMOVED*** p
    * @param ***REMOVED***number***REMOVED*** q
    * @param ***REMOVED***number***REMOVED*** t
    * @return ***REMOVED***number***REMOVED*** The color component value.
    */
    hueToColor: function (p, q, t) ***REMOVED***

        if (t < 0)
        ***REMOVED***
            t += 1;
        ***REMOVED***

        if (t > 1)
        ***REMOVED***
            t -= 1;
        ***REMOVED***

        if (t < 1 / 6)
        ***REMOVED***
            return p + (q - p) * 6 * t;
        ***REMOVED***

        if (t < 1 / 2)
        ***REMOVED***
            return q;
        ***REMOVED***

        if (t < 2 / 3)
        ***REMOVED***
            return p + (q - p) * (2 / 3 - t) * 6;
        ***REMOVED***

        return p;

    ***REMOVED***,

    /**
    * A utility function to create a lightweight 'color' object with the default components.
    * Any components that are not specified will default to zero.
    *
    * This is useful when you want to use a shared color object for the getPixel and getPixelAt methods.
    *
    * @author Matt DesLauriers (@mattdesl)
    * @method Phaser.Color.createColor
    * @static
    * @param ***REMOVED***number***REMOVED*** [r=0] - The red color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** [g=0] - The green color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** [b=0] - The blue color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** [a=1] - The alpha color component, in the range 0 - 1.
    * @param ***REMOVED***number***REMOVED*** [h=0] - The hue, in the range 0 - 1.
    * @param ***REMOVED***number***REMOVED*** [s=0] - The saturation, in the range 0 - 1.
    * @param ***REMOVED***number***REMOVED*** [l=0] - The lightness, in the range 0 - 1.
    * @param ***REMOVED***number***REMOVED*** [v=0] - The value, in the range 0 - 1.
    * @return ***REMOVED***object***REMOVED*** The resulting object with r, g, b, a properties and h, s, l and v.
    */
    createColor: function (r, g, b, a, h, s, l, v) ***REMOVED***

        var out = ***REMOVED*** r: r || 0, g: g || 0, b: b || 0, a: a || 1, h: h || 0, s: s || 0, l: l || 0, v: v || 0, color: 0, color32: 0, rgba: '' ***REMOVED***;

        return Phaser.Color.updateColor(out);

    ***REMOVED***,

    /**
    * Takes a color object and updates the rgba, color and color32 properties.
    *
    * @method Phaser.Color.updateColor
    * @static
    * @param ***REMOVED***object***REMOVED*** out - The color object to update.
    * @returns ***REMOVED***number***REMOVED*** A native color value integer (format: 0xAARRGGBB).
    */
    updateColor: function (out) ***REMOVED***

        out.rgba = 'rgba(' + out.r.toString() + ',' + out.g.toString() + ',' + out.b.toString() + ',' + out.a.toString() + ')';
        out.color = Phaser.Color.getColor(out.r, out.g, out.b);
        out.color32 = Phaser.Color.getColor32(out.a * 255, out.r, out.g, out.b);

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

    ***REMOVED***,

    /**
    * Converts the given color values into a string.
    * If prefix was '#' it will be in the format `#RRGGBB` otherwise `0xAARRGGBB`.
    *
    * @method Phaser.Color.RGBtoString
    * @static
    * @param ***REMOVED***number***REMOVED*** r - The red color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** g - The green color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** b - The blue color component, in the range 0 - 255.
    * @param ***REMOVED***number***REMOVED*** [a=255] - The alpha color component, in the range 0 - 255.
    * @param ***REMOVED***string***REMOVED*** [prefix='#'] - The prefix used in the return string. If '#' it will return `#RRGGBB`, else `0xAARRGGBB`.
    * @return ***REMOVED***string***REMOVED*** A string containing the color values. If prefix was '#' it will be in the format `#RRGGBB` otherwise `0xAARRGGBB`.
    */
    RGBtoString: function (r, g, b, a, prefix) ***REMOVED***

        if (a === undefined) ***REMOVED*** a = 255; ***REMOVED***
        if (prefix === undefined) ***REMOVED*** prefix = '#'; ***REMOVED***

        if (prefix === '#')
        ***REMOVED***
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        ***REMOVED***
        else
        ***REMOVED***
            return '0x' + Phaser.Color.componentToHex(a) + Phaser.Color.componentToHex(r) + Phaser.Color.componentToHex(g) + Phaser.Color.componentToHex(b);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Converts a hex string into an integer color value.
    *
    * @method Phaser.Color.hexToRGB
    * @static
    * @param ***REMOVED***string***REMOVED*** hex - The hex string to convert. Can be in the short-hand format `#03f` or `#0033ff`.
    * @return ***REMOVED***number***REMOVED*** The rgb color value in the format 0xAARRGGBB.
    */
    hexToRGB: function (hex) ***REMOVED***

        var rgb = Phaser.Color.hexToColor(hex);

        if (rgb)
        ***REMOVED***
            return Phaser.Color.getColor32(rgb.a, rgb.r, rgb.g, rgb.b);
        ***REMOVED***

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

            if (!out)
            ***REMOVED***
                out = Phaser.Color.createColor(r, g, b);
            ***REMOVED***
            else
            ***REMOVED***
                out.r = r;
                out.g = g;
                out.b = b;
            ***REMOVED***
        ***REMOVED***

        return out;

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

        if (!out)
        ***REMOVED***
            out = Phaser.Color.createColor();
        ***REMOVED***

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

        //  The behavior is not consistent between hexToColor/webToColor on invalid input.
        //  This unifies both by returning a new object, but returning null may be better.
        if (!out)
        ***REMOVED***
            out = Phaser.Color.createColor();
        ***REMOVED***

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
    * Return a string containing a hex representation of the given color component.
    *
    * @method Phaser.Color.componentToHex
    * @static
    * @param ***REMOVED***number***REMOVED*** color - The color channel to get the hex value for, must be a value between 0 and 255.
    * @returns ***REMOVED***string***REMOVED*** A string of length 2 characters, i.e. 255 = ff, 100 = 64.
    */
    componentToHex: function (color) ***REMOVED***

        var hex = color.toString(16);

        return (hex.length === 1) ? '0' + hex : hex;

    ***REMOVED***,

    /**
    * Get HSV color wheel values in an array which will be 360 elements in size.
    *
    * @method Phaser.Color.HSVColorWheel
    * @static
    * @param ***REMOVED***number***REMOVED*** [s=1] - The saturation, in the range 0 - 1.
    * @param ***REMOVED***number***REMOVED*** [v=1] - The value, in the range 0 - 1.
    * @return ***REMOVED***array***REMOVED*** An array containing 360 elements corresponding to the HSV color wheel.
    */
    HSVColorWheel: function (s, v) ***REMOVED***

        if (s === undefined) ***REMOVED*** s = 1.0; ***REMOVED***
        if (v === undefined) ***REMOVED*** v = 1.0; ***REMOVED***

        var colors = [];

        for (var c = 0; c <= 359; c++)
        ***REMOVED***
            colors.push(Phaser.Color.HSVtoRGB(c / 359, s, v));
        ***REMOVED***

        return colors;

    ***REMOVED***,

    /**
    * Get HSL color wheel values in an array which will be 360 elements in size.
    *
    * @method Phaser.Color.HSLColorWheel
    * @static
    * @param ***REMOVED***number***REMOVED*** [s=0.5] - The saturation, in the range 0 - 1.
    * @param ***REMOVED***number***REMOVED*** [l=0.5] - The lightness, in the range 0 - 1.
    * @return ***REMOVED***array***REMOVED*** An array containing 360 elements corresponding to the HSL color wheel.
    */
    HSLColorWheel: function (s, l) ***REMOVED***

        if (s === undefined) ***REMOVED*** s = 0.5; ***REMOVED***
        if (l === undefined) ***REMOVED*** l = 0.5; ***REMOVED***

        var colors = [];

        for (var c = 0; c <= 359; c++)
        ***REMOVED***
            colors.push(Phaser.Color.HSLtoRGB(c / 359, s, l));
        ***REMOVED***

        return colors;

    ***REMOVED***,

    /**
    * Interpolates the two given colours based on the supplied step and currentStep properties.
    *
    * @method Phaser.Color.interpolateColor
    * @static
    * @param ***REMOVED***number***REMOVED*** color1 - The first color value.
    * @param ***REMOVED***number***REMOVED*** color2 - The second color value.
    * @param ***REMOVED***number***REMOVED*** steps - The number of steps to run the interpolation over.
    * @param ***REMOVED***number***REMOVED*** currentStep - The currentStep value. If the interpolation will take 100 steps, a currentStep value of 50 would be half-way between the two.
    * @param ***REMOVED***number***REMOVED*** alpha - The alpha of the returned color.
    * @returns ***REMOVED***number***REMOVED*** The interpolated color value.
    */
    interpolateColor: function (color1, color2, steps, currentStep, alpha) ***REMOVED***

        if (alpha === undefined) ***REMOVED*** alpha = 255; ***REMOVED***

        var src1 = Phaser.Color.getRGB(color1);
        var src2 = Phaser.Color.getRGB(color2);
        var r = (((src2.red - src1.red) * currentStep) / steps) + src1.red;
        var g = (((src2.green - src1.green) * currentStep) / steps) + src1.green;
        var b = (((src2.blue - src1.blue) * currentStep) / steps) + src1.blue;

        return Phaser.Color.getColor32(alpha, r, g, b);

    ***REMOVED***,

    /**
    * Interpolates the two given colours based on the supplied step and currentStep properties.
    *
    * @method Phaser.Color.interpolateColorWithRGB
    * @static
    * @param ***REMOVED***number***REMOVED*** color - The first color value.
    * @param ***REMOVED***number***REMOVED*** r - The red color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** g - The green color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** b - The blue color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** steps - The number of steps to run the interpolation over.
    * @param ***REMOVED***number***REMOVED*** currentStep - The currentStep value. If the interpolation will take 100 steps, a currentStep value of 50 would be half-way between the two.
    * @returns ***REMOVED***number***REMOVED*** The interpolated color value.
    */
    interpolateColorWithRGB: function (color, r, g, b, steps, currentStep) ***REMOVED***

        var src = Phaser.Color.getRGB(color);
        var or = (((r - src.red) * currentStep) / steps) + src.red;
        var og = (((g - src.green) * currentStep) / steps) + src.green;
        var ob = (((b - src.blue) * currentStep) / steps) + src.blue;

        return Phaser.Color.getColor(or, og, ob);

    ***REMOVED***,

    /**
    * Interpolates the two given colours based on the supplied step and currentStep properties.
    * @method Phaser.Color.interpolateRGB
    * @static
    * @param ***REMOVED***number***REMOVED*** r1 - The red color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** g1 - The green color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** b1 - The blue color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** r2 - The red color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** g2 - The green color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** b2 - The blue color value, between 0 and 0xFF (255).
    * @param ***REMOVED***number***REMOVED*** steps - The number of steps to run the interpolation over.
    * @param ***REMOVED***number***REMOVED*** currentStep - The currentStep value. If the interpolation will take 100 steps, a currentStep value of 50 would be half-way between the two.
    * @returns ***REMOVED***number***REMOVED*** The interpolated color value.
    */
    interpolateRGB: function (r1, g1, b1, r2, g2, b2, steps, currentStep) ***REMOVED***

        var r = (((r2 - r1) * currentStep) / steps) + r1;
        var g = (((g2 - g1) * currentStep) / steps) + g1;
        var b = (((b2 - b1) * currentStep) / steps) + b1;

        return Phaser.Color.getColor(r, g, b);

    ***REMOVED***,

    /**
    * Returns a random color value between black and white
    * Set the min value to start each channel from the given offset.
    * Set the max value to restrict the maximum color used per channel.
    *
    * @method Phaser.Color.getRandomColor
    * @static
    * @param ***REMOVED***number***REMOVED*** [min=0] - The lowest value to use for the color.
    * @param ***REMOVED***number***REMOVED*** [max=255] - The highest value to use for the color.
    * @param ***REMOVED***number***REMOVED*** [alpha=255] - The alpha value of the returning color (default 255 = fully opaque).
    * @returns ***REMOVED***number***REMOVED*** 32-bit color value with alpha.
    */
    getRandomColor: function (min, max, alpha) ***REMOVED***

        if (min === undefined) ***REMOVED*** min = 0; ***REMOVED***
        if (max === undefined) ***REMOVED*** max = 255; ***REMOVED***
        if (alpha === undefined) ***REMOVED*** alpha = 255; ***REMOVED***

        //  Sanity checks
        if (max > 255 || min > max)
        ***REMOVED***
            return Phaser.Color.getColor(255, 255, 255);
        ***REMOVED***

        var red = min + Math.round(Math.random() * (max - min));
        var green = min + Math.round(Math.random() * (max - min));
        var blue = min + Math.round(Math.random() * (max - min));

        return Phaser.Color.getColor32(alpha, red, green, blue);

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
    * Returns a CSS friendly string value from the given color.
    *
    * @method Phaser.Color.getWebRGB
    * @static
    * @param ***REMOVED***number|Object***REMOVED*** color - Color in RGB (0xRRGGBB), ARGB format (0xAARRGGBB) or an Object with r, g, b, a properties.
    * @returns ***REMOVED***string***REMOVED*** A string in the format: 'rgba(r,g,b,a)'
    */
    getWebRGB: function (color) ***REMOVED***

        if (typeof color === 'object')
        ***REMOVED***
            return 'rgba(' + color.r.toString() + ',' + color.g.toString() + ',' + color.b.toString() + ',' + (color.a / 255).toString() + ')';
        ***REMOVED***
        else
        ***REMOVED***
            var rgb = Phaser.Color.getRGB(color);
            return 'rgba(' + rgb.r.toString() + ',' + rgb.g.toString() + ',' + rgb.b.toString() + ',' + (rgb.a / 255).toString() + ')';
        ***REMOVED***

    ***REMOVED***,

    /**
    * Given a native color value (in the format 0xAARRGGBB) this will return the Alpha component, as a value between 0 and 255.
    *
    * @method Phaser.Color.getAlpha
    * @static
    * @param ***REMOVED***number***REMOVED*** color - In the format 0xAARRGGBB.
    * @returns ***REMOVED***number***REMOVED*** The Alpha component of the color, will be between 0 and 1 (0 being no Alpha (opaque), 1 full Alpha (transparent)).
    */
    getAlpha: function (color) ***REMOVED***
        return color >>> 24;
    ***REMOVED***,

    /**
    * Given a native color value (in the format 0xAARRGGBB) this will return the Alpha component as a value between 0 and 1.
    *
    * @method Phaser.Color.getAlphaFloat
    * @static
    * @param ***REMOVED***number***REMOVED*** color - In the format 0xAARRGGBB.
    * @returns ***REMOVED***number***REMOVED*** The Alpha component of the color, will be between 0 and 1 (0 being no Alpha (opaque), 1 full Alpha (transparent)).
    */
    getAlphaFloat: function (color) ***REMOVED***
        return (color >>> 24) / 255;
    ***REMOVED***,

    /**
    * Given a native color value (in the format 0xAARRGGBB) this will return the Red component, as a value between 0 and 255.
    *
    * @method Phaser.Color.getRed
    * @static
    * @param ***REMOVED***number***REMOVED*** color In the format 0xAARRGGBB.
    * @returns ***REMOVED***number***REMOVED*** The Red component of the color, will be between 0 and 255 (0 being no color, 255 full Red).
    */
    getRed: function (color) ***REMOVED***
        return color >> 16 & 0xFF;
    ***REMOVED***,

    /**
    * Given a native color value (in the format 0xAARRGGBB) this will return the Green component, as a value between 0 and 255.
    *
    * @method Phaser.Color.getGreen
    * @static
    * @param ***REMOVED***number***REMOVED*** color - In the format 0xAARRGGBB.
    * @returns ***REMOVED***number***REMOVED*** The Green component of the color, will be between 0 and 255 (0 being no color, 255 full Green).
    */
    getGreen: function (color) ***REMOVED***
        return color >> 8 & 0xFF;
    ***REMOVED***,

    /**
    * Given a native color value (in the format 0xAARRGGBB) this will return the Blue component, as a value between 0 and 255.
    *
    * @method Phaser.Color.getBlue
    * @static
    * @param ***REMOVED***number***REMOVED*** color - In the format 0xAARRGGBB.
    * @returns ***REMOVED***number***REMOVED*** The Blue component of the color, will be between 0 and 255 (0 being no color, 255 full Blue).
    */
    getBlue: function (color) ***REMOVED***
        return color & 0xFF;
    ***REMOVED***,

    /**
    * Blends the source color, ignoring the backdrop.
    *
    * @method Phaser.Color.blendNormal
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendNormal: function (a) ***REMOVED***
        return a;
    ***REMOVED***,

    /**
    * Selects the lighter of the backdrop and source colors.
    *
    * @method Phaser.Color.blendLighten
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendLighten: function (a, b) ***REMOVED***
        return (b > a) ? b : a;
    ***REMOVED***,

    /**
    * Selects the darker of the backdrop and source colors.
    *
    * @method Phaser.Color.blendDarken
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendDarken: function (a, b) ***REMOVED***
        return (b > a) ? a : b;
    ***REMOVED***,

    /**
    * Multiplies the backdrop and source color values.
    * The result color is always at least as dark as either of the two constituent
    * colors. Multiplying any color with black produces black;
    * multiplying with white leaves the original color unchanged.
    *
    * @method Phaser.Color.blendMultiply
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendMultiply: function (a, b) ***REMOVED***
        return (a * b) / 255;
    ***REMOVED***,

    /**
    * Takes the average of the source and backdrop colors.
    *
    * @method Phaser.Color.blendAverage
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendAverage: function (a, b) ***REMOVED***
        return (a + b) / 2;
    ***REMOVED***,

    /**
    * Adds the source and backdrop colors together and returns the value, up to a maximum of 255.
    *
    * @method Phaser.Color.blendAdd
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendAdd: function (a, b) ***REMOVED***
        return Math.min(255, a + b);
    ***REMOVED***,

    /**
    * Combines the source and backdrop colors and returns their value minus 255.
    *
    * @method Phaser.Color.blendSubtract
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendSubtract: function (a, b) ***REMOVED***
        return Math.max(0, a + b - 255);
    ***REMOVED***,

    /**
    * Subtracts the darker of the two constituent colors from the lighter.
    * 
    * Painting with white inverts the backdrop color; painting with black produces no change. 
    *
    * @method Phaser.Color.blendDifference
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendDifference: function (a, b) ***REMOVED***
        return Math.abs(a - b);
    ***REMOVED***,

    /**
    * Negation blend mode.
    *
    * @method Phaser.Color.blendNegation
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendNegation: function (a, b) ***REMOVED***
        return 255 - Math.abs(255 - a - b);
    ***REMOVED***,

    /**
    * Multiplies the complements of the backdrop and source color values, then complements the result.
    * The result color is always at least as light as either of the two constituent colors. 
    * Screening any color with white produces white; screening with black leaves the original color unchanged. 
    *
    * @method Phaser.Color.blendScreen
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendScreen: function (a, b) ***REMOVED***
        return 255 - (((255 - a) * (255 - b)) >> 8);
    ***REMOVED***,

    /**
    * Produces an effect similar to that of the Difference mode, but lower in contrast. 
    * Painting with white inverts the backdrop color; painting with black produces no change. 
    *
    * @method Phaser.Color.blendExclusion
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendExclusion: function (a, b) ***REMOVED***
        return a + b - 2 * a * b / 255;
    ***REMOVED***,

    /**
    * Multiplies or screens the colors, depending on the backdrop color.
    * Source colors overlay the backdrop while preserving its highlights and shadows. 
    * The backdrop color is not replaced, but is mixed with the source color to reflect the lightness or darkness of the backdrop.
    *
    * @method Phaser.Color.blendOverlay
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendOverlay: function (a, b) ***REMOVED***
        return b < 128 ? (2 * a * b / 255) : (255 - 2 * (255 - a) * (255 - b) / 255);
    ***REMOVED***,

    /**
    * Darkens or lightens the colors, depending on the source color value. 
    * 
    * If the source color is lighter than 0.5, the backdrop is lightened, as if it were dodged; 
    * this is useful for adding highlights to a scene. 
    * 
    * If the source color is darker than 0.5, the backdrop is darkened, as if it were burned in. 
    * The degree of lightening or darkening is proportional to the difference between the source color and 0.5; 
    * if it is equal to 0.5, the backdrop is unchanged.
    * 
    * Painting with pure black or white produces a distinctly darker or lighter area, but does not result in pure black or white. 
    * The effect is similar to shining a diffused spotlight on the backdrop. 
    *
    * @method Phaser.Color.blendSoftLight
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendSoftLight: function (a, b) ***REMOVED***
        return b < 128 ? (2 * ((a >> 1) + 64)) * (b / 255) : 255 - (2 * (255 - ((a >> 1) + 64)) * (255 - b) / 255);
    ***REMOVED***,

    /**
    * Multiplies or screens the colors, depending on the source color value. 
    * 
    * If the source color is lighter than 0.5, the backdrop is lightened, as if it were screened; 
    * this is useful for adding highlights to a scene. 
    * 
    * If the source color is darker than 0.5, the backdrop is darkened, as if it were multiplied; 
    * this is useful for adding shadows to a scene. 
    * 
    * The degree of lightening or darkening is proportional to the difference between the source color and 0.5; 
    * if it is equal to 0.5, the backdrop is unchanged.
    * 
    * Painting with pure black or white produces pure black or white. The effect is similar to shining a harsh spotlight on the backdrop. 
    *
    * @method Phaser.Color.blendHardLight
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendHardLight: function (a, b) ***REMOVED***
        return Phaser.Color.blendOverlay(b, a);
    ***REMOVED***,

    /**
    * Brightens the backdrop color to reflect the source color. 
    * Painting with black produces no change.
    *
    * @method Phaser.Color.blendColorDodge
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendColorDodge: function (a, b) ***REMOVED***
        return b === 255 ? b : Math.min(255, ((a << 8) / (255 - b)));
    ***REMOVED***,

    /**
    * Darkens the backdrop color to reflect the source color.
    * Painting with white produces no change. 
    *
    * @method Phaser.Color.blendColorBurn
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendColorBurn: function (a, b) ***REMOVED***
        return b === 0 ? b : Math.max(0, (255 - ((255 - a) << 8) / b));
    ***REMOVED***,

    /**
    * An alias for blendAdd, it simply sums the values of the two colors.
    *
    * @method Phaser.Color.blendLinearDodge
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendLinearDodge: function (a, b) ***REMOVED***
        return Phaser.Color.blendAdd(a, b);
    ***REMOVED***,

    /**
    * An alias for blendSubtract, it simply sums the values of the two colors and subtracts 255.
    *
    * @method Phaser.Color.blendLinearBurn
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendLinearBurn: function (a, b) ***REMOVED***
        return Phaser.Color.blendSubtract(a, b);
    ***REMOVED***,

    /**
    * This blend mode combines Linear Dodge and Linear Burn (rescaled so that neutral colors become middle gray).
    * Dodge applies to values of top layer lighter than middle gray, and burn to darker values.
    * The calculation simplifies to the sum of bottom layer and twice the top layer, subtract 128. The contrast decreases.
    *
    * @method Phaser.Color.blendLinearLight
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendLinearLight: function (a, b) ***REMOVED***
        return b < 128 ? Phaser.Color.blendLinearBurn(a, 2 * b) : Phaser.Color.blendLinearDodge(a, (2 * (b - 128)));
    ***REMOVED***,

    /**
    * This blend mode combines Color Dodge and Color Burn (rescaled so that neutral colors become middle gray).
    * Dodge applies when values in the top layer are lighter than middle gray, and burn to darker values.
    * The middle gray is the neutral color. When color is lighter than this, this effectively moves the white point of the bottom 
    * layer down by twice the difference; when it is darker, the black point is moved up by twice the difference. The perceived contrast increases.
    *
    * @method Phaser.Color.blendVividLight
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendVividLight: function (a, b) ***REMOVED***
        return b < 128 ? Phaser.Color.blendColorBurn(a, 2 * b) : Phaser.Color.blendColorDodge(a, (2 * (b - 128)));
    ***REMOVED***,

    /**
    * If the backdrop color (light source) is lighter than 50%, the blendDarken mode is used, and colors lighter than the backdrop color do not change.
    * If the backdrop color is darker than 50% gray, colors lighter than the blend color are replaced, and colors darker than the blend color do not change.
    *
    * @method Phaser.Color.blendPinLight
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendPinLight: function (a, b) ***REMOVED***
        return b < 128 ? Phaser.Color.blendDarken(a, 2 * b) : Phaser.Color.blendLighten(a, (2 * (b - 128)));
    ***REMOVED***,

    /**
    * Runs blendVividLight on the source and backdrop colors.
    * If the resulting color is 128 or more, it receives a value of 255; if less than 128, a value of 0.
    * Therefore, all blended pixels have red, green, and blue channel values of either 0 or 255.
    * This changes all pixels to primary additive colors (red, green, or blue), white, or black.
    *
    * @method Phaser.Color.blendHardMix
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendHardMix: function (a, b) ***REMOVED***
        return Phaser.Color.blendVividLight(a, b) < 128 ? 0 : 255;
    ***REMOVED***,

    /**
    * Reflect blend mode. This mode is useful when adding shining objects or light zones to images. 
    *
    * @method Phaser.Color.blendReflect
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendReflect: function (a, b) ***REMOVED***
        return b === 255 ? b : Math.min(255, (a * a / (255 - b)));
    ***REMOVED***,

    /**
    * Glow blend mode. This mode is a variation of reflect mode with the source and backdrop colors swapped.
    *
    * @method Phaser.Color.blendGlow
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendGlow: function (a, b) ***REMOVED***
        return Phaser.Color.blendReflect(b, a);
    ***REMOVED***,

    /**
    * Phoenix blend mode. This subtracts the lighter color from the darker color, and adds 255, giving a bright result.
    *
    * @method Phaser.Color.blendPhoenix
    * @static
    * @param ***REMOVED***integer***REMOVED*** a - The source color to blend, in the range 1 to 255.
    * @param ***REMOVED***integer***REMOVED*** b - The backdrop color to blend, in the range 1 to 255.
    * @returns ***REMOVED***integer***REMOVED*** The blended color value, in the range 1 to 255.
    */
    blendPhoenix: function (a, b) ***REMOVED***
        return Math.min(a, b) - Math.max(a, b) + 255;
    ***REMOVED***

***REMOVED***;
