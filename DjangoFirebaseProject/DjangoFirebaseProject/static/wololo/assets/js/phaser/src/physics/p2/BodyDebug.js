/**
* @author       George https://github.com/georgiee
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Draws a P2 Body to a Graphics instance for visual debugging.
* Needless to say, for every body you enable debug drawing on, you are adding processor and graphical overhead.
* So use sparingly and rarely (if ever) in production code.
*
* Also be aware that the Debug body is only updated when the Sprite it is connected to changes position. If you
* manipulate the sprite in any other way (such as moving it to another Group or bringToTop, etc) then you will
* need to manually adjust its BodyDebug as well.
*
* @class Phaser.Physics.P2.BodyDebug
* @constructor
* @extends Phaser.Group
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Game reference to the currently running game.
* @param ***REMOVED***Phaser.Physics.P2.Body***REMOVED*** body - The P2 Body to display debug data for.
* @param ***REMOVED***object***REMOVED*** settings - Settings object.
*/
Phaser.Physics.P2.BodyDebug = function(game, body, settings) ***REMOVED***

    Phaser.Group.call(this, game);

    /**
    * @property ***REMOVED***object***REMOVED*** defaultSettings - Default debug settings.
    * @private
    */
    var defaultSettings = ***REMOVED***
        pixelsPerLengthUnit: game.physics.p2.mpx(1),
        debugPolygons: false,
        lineWidth: 1,
        alpha: 0.5
    ***REMOVED***;

    this.settings = Phaser.Utils.extend(defaultSettings, settings);

    /**
    * @property ***REMOVED***number***REMOVED*** ppu - Pixels per Length Unit.
    */
    this.ppu = this.settings.pixelsPerLengthUnit;
    this.ppu = -1 * this.ppu;

    /**
    * @property ***REMOVED***Phaser.Physics.P2.Body***REMOVED*** body - The P2 Body to display debug data for.
    */
    this.body = body;

    /**
    * @property ***REMOVED***Phaser.Graphics***REMOVED*** canvas - The canvas to render the debug info to.
    */
    this.canvas = new Phaser.Graphics(game);

    this.canvas.alpha = this.settings.alpha;

    this.add(this.canvas);

    this.draw();

    this.updateSpriteTransform();

***REMOVED***;

Phaser.Physics.P2.BodyDebug.prototype = Object.create(Phaser.Group.prototype);
Phaser.Physics.P2.BodyDebug.prototype.constructor = Phaser.Physics.P2.BodyDebug;

Phaser.Utils.extend(Phaser.Physics.P2.BodyDebug.prototype, ***REMOVED***

    /**
    * Core update.
    *
    * @method Phaser.Physics.P2.BodyDebug#updateSpriteTransform
    */
    updateSpriteTransform: function() ***REMOVED***

        this.position.x = this.body.position[0] * this.ppu;
        this.position.y = this.body.position[1] * this.ppu;
        this.rotation = this.body.angle;

    ***REMOVED***,

    /**
    * Draws the P2 shapes to the Graphics object.
    *
    * @method Phaser.Physics.P2.BodyDebug#draw
    */
    draw: function() ***REMOVED***

        var angle, child, color, i, j, lineColor, lw, obj, offset, sprite, v, verts, vrot, _j, _ref1;

        obj = this.body;
        sprite = this.canvas;
        sprite.clear();
        color = parseInt(this.randomPastelHex(), 16);
        lineColor = 0xff0000;
        lw = this.lineWidth;

        if (obj instanceof p2.Body && obj.shapes.length)
        ***REMOVED***
            var l = obj.shapes.length;

            i = 0;

            while (i !== l)
            ***REMOVED***
                child = obj.shapes[i];
                offset = child.position || 0;
                angle = child.angle || 0;

                if (child instanceof p2.Circle)
                ***REMOVED***
                    this.drawCircle(sprite, offset[0] * this.ppu, offset[1] * this.ppu, angle, child.radius * this.ppu, color, lw);
                ***REMOVED***
                else if (child instanceof p2.Capsule)
                ***REMOVED***
                    this.drawCapsule(sprite, offset[0] * this.ppu, offset[1] * this.ppu, angle, child.length * this.ppu, child.radius * this.ppu, lineColor, color, lw);
                ***REMOVED***
                else if (child instanceof p2.Plane)
                ***REMOVED***
                    this.drawPlane(sprite, offset[0] * this.ppu, -offset[1] * this.ppu, color, lineColor, lw * 5, lw * 10, lw * 10, this.ppu * 100, angle);
                ***REMOVED***
                else if (child instanceof p2.Line)
                ***REMOVED***
                    this.drawLine(sprite, child.length * this.ppu, lineColor, lw);
                ***REMOVED***
                else if (child instanceof p2.Box)
                ***REMOVED***
                    this.drawRectangle(sprite, offset[0] * this.ppu, offset[1] * this.ppu, angle, child.width * this.ppu, child.height * this.ppu, lineColor, color, lw);
                ***REMOVED***
                else if (child instanceof p2.Convex)
                ***REMOVED***
                    verts = [];
                    vrot = p2.vec2.create();

                    for (j = _j = 0, _ref1 = child.vertices.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j)
                    ***REMOVED***
                        v = child.vertices[j];
                        p2.vec2.rotate(vrot, v, angle);
                        verts.push([(vrot[0] + offset[0]) * this.ppu, -(vrot[1] + offset[1]) * this.ppu]);
                    ***REMOVED***

                    this.drawConvex(sprite, verts, child.triangles, lineColor, color, lw, this.settings.debugPolygons, [offset[0] * this.ppu, -offset[1] * this.ppu]);
                ***REMOVED***

                i++;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Draws a p2.Box to the Graphics object.
    *
    * @method Phaser.Physics.P2.BodyDebug#drawRectangle
    * @private
    */
    drawRectangle: function(g, x, y, angle, w, h, color, fillColor, lineWidth) ***REMOVED***

        if (lineWidth === undefined) ***REMOVED*** lineWidth = 1; ***REMOVED***
        if (color === undefined) ***REMOVED*** color = 0x000000; ***REMOVED***

        g.lineStyle(lineWidth, color, 1);
        g.beginFill(fillColor);
        g.drawRect(x - w / 2, y - h / 2, w, h);

    ***REMOVED***,

    /**
    * Draws a p2.Circle to the Graphics object.
    *
    * @method Phaser.Physics.P2.BodyDebug#drawCircle
    * @private
    */
    drawCircle: function(g, x, y, angle, radius, color, lineWidth) ***REMOVED***

        if (lineWidth === undefined) ***REMOVED*** lineWidth = 1; ***REMOVED***
        if (color === undefined) ***REMOVED*** color = 0xffffff; ***REMOVED***
        g.lineStyle(lineWidth, 0x000000, 1);
        g.beginFill(color, 1.0);
        g.drawCircle(x, y, -radius*2);
        g.endFill();
        g.moveTo(x, y);
        g.lineTo(x + radius * Math.cos(-angle), y + radius * Math.sin(-angle));

    ***REMOVED***,

    /**
    * Draws a p2.Line to the Graphics object.
    *
    * @method Phaser.Physics.P2.BodyDebug#drawLine
    * @private
    */
    drawLine: function(g, len, color, lineWidth) ***REMOVED***

        if (lineWidth === undefined) ***REMOVED*** lineWidth = 1; ***REMOVED***
        if (color === undefined) ***REMOVED*** color = 0x000000; ***REMOVED***

        g.lineStyle(lineWidth * 5, color, 1);
        g.moveTo(-len / 2, 0);
        g.lineTo(len / 2, 0);

    ***REMOVED***,

    /**
    * Draws a p2.Convex to the Graphics object.
    *
    * @method Phaser.Physics.P2.BodyDebug#drawConvex
    * @private
    */
    drawConvex: function(g, verts, triangles, color, fillColor, lineWidth, debug, offset) ***REMOVED***

        var colors, i, v, v0, v1, x, x0, x1, y, y0, y1;

        if (lineWidth === undefined) ***REMOVED*** lineWidth = 1; ***REMOVED***
        if (color === undefined) ***REMOVED*** color = 0x000000; ***REMOVED***

        if (!debug)
        ***REMOVED***
            g.lineStyle(lineWidth, color, 1);
            g.beginFill(fillColor);
            i = 0;

            while (i !== verts.length)
            ***REMOVED***
                v = verts[i];
                x = v[0];
                y = v[1];

                if (i === 0)
                ***REMOVED***
                    g.moveTo(x, -y);
                ***REMOVED***
                else
                ***REMOVED***
                    g.lineTo(x, -y);
                ***REMOVED***

                i++;
            ***REMOVED***

            g.endFill();

            if (verts.length > 2)
            ***REMOVED***
                g.moveTo(verts[verts.length - 1][0], -verts[verts.length - 1][1]);
                return g.lineTo(verts[0][0], -verts[0][1]);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            colors = [0xff0000, 0x00ff00, 0x0000ff];
            i = 0;

            while (i !== verts.length + 1)
            ***REMOVED***
                v0 = verts[i % verts.length];
                v1 = verts[(i + 1) % verts.length];
                x0 = v0[0];
                y0 = v0[1];
                x1 = v1[0];
                y1 = v1[1];
                g.lineStyle(lineWidth, colors[i % colors.length], 1);
                g.moveTo(x0, -y0);
                g.lineTo(x1, -y1);
                g.drawCircle(x0, -y0, lineWidth * 2);
                i++;
            ***REMOVED***

            g.lineStyle(lineWidth, 0x000000, 1);
            return g.drawCircle(offset[0], offset[1], lineWidth * 2);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Draws a p2.Path to the Graphics object.
    *
    * @method Phaser.Physics.P2.BodyDebug#drawPath
    * @private
    */
    drawPath: function(g, path, color, fillColor, lineWidth) ***REMOVED***

        var area, i, lastx, lasty, p1x, p1y, p2x, p2y, p3x, p3y, v, x, y;
        if (lineWidth === undefined) ***REMOVED*** lineWidth = 1; ***REMOVED***
        if (color === undefined) ***REMOVED*** color = 0x000000; ***REMOVED***

        g.lineStyle(lineWidth, color, 1);

        if (typeof fillColor === "number")
        ***REMOVED***
            g.beginFill(fillColor);
        ***REMOVED***

        lastx = null;
        lasty = null;
        i = 0;

        while (i < path.length)
        ***REMOVED***
            v = path[i];
            x = v[0];
            y = v[1];

            if (x !== lastx || y !== lasty)
            ***REMOVED***
                if (i === 0)
                ***REMOVED***
                    g.moveTo(x, y);
                ***REMOVED***
                else
                ***REMOVED***
                    p1x = lastx;
                    p1y = lasty;
                    p2x = x;
                    p2y = y;
                    p3x = path[(i + 1) % path.length][0];
                    p3y = path[(i + 1) % path.length][1];
                    area = ((p2x - p1x) * (p3y - p1y)) - ((p3x - p1x) * (p2y - p1y));

                    if (area !== 0)
                    ***REMOVED***
                        g.lineTo(x, y);
                    ***REMOVED***
                ***REMOVED***
                lastx = x;
                lasty = y;
            ***REMOVED***

            i++;

        ***REMOVED***

        if (typeof fillColor === "number")
        ***REMOVED***
            g.endFill();
        ***REMOVED***

        if (path.length > 2 && typeof fillColor === "number")
        ***REMOVED***
            g.moveTo(path[path.length - 1][0], path[path.length - 1][1]);
            g.lineTo(path[0][0], path[0][1]);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Draws a p2.Plane to the Graphics object.
    *
    * @method Phaser.Physics.P2.BodyDebug#drawPlane
    * @private
    */
    drawPlane: function(g, x0, x1, color, lineColor, lineWidth, diagMargin, diagSize, maxLength, angle) ***REMOVED***

        var max, xd, yd;
        if (lineWidth === undefined) ***REMOVED*** lineWidth = 1; ***REMOVED***
        if (color === undefined) ***REMOVED*** color = 0xffffff; ***REMOVED***

        g.lineStyle(lineWidth, lineColor, 11);
        g.beginFill(color);
        max = maxLength;

        g.moveTo(x0, -x1);
        xd = x0 + Math.cos(angle) * this.game.width;
        yd = x1 + Math.sin(angle) * this.game.height;
        g.lineTo(xd, -yd);

        g.moveTo(x0, -x1);
        xd = x0 + Math.cos(angle) * -this.game.width;
        yd = x1 + Math.sin(angle) * -this.game.height;
        g.lineTo(xd, -yd);

    ***REMOVED***,

    /**
    * Draws a p2.Capsule to the Graphics object.
    *
    * @method Phaser.Physics.P2.BodyDebug#drawCapsule
    * @private
    */
    drawCapsule: function(g, x, y, angle, len, radius, color, fillColor, lineWidth) ***REMOVED***

        if (lineWidth === undefined) ***REMOVED*** lineWidth = 1; ***REMOVED***
        if (color === undefined) ***REMOVED*** color =  0x000000; ***REMOVED***

        g.lineStyle(lineWidth, color, 1);

        // Draw circles at ends
        var c = Math.cos(angle);
        var s = Math.sin(angle);

        g.beginFill(fillColor, 1);
        g.drawCircle(-len/2*c + x, -len/2*s + y, -radius * 2);
        g.drawCircle( len/2*c + x,  len/2*s + y, -radius * 2);
        g.endFill();

        // Draw rectangle
        g.lineStyle(lineWidth, color, 0);
        g.beginFill(fillColor, 1);
        g.moveTo(-len/2*c + radius*s + x, -len/2*s + radius*c + y);
        g.lineTo( len/2*c + radius*s + x,  len/2*s + radius*c + y);
        g.lineTo( len/2*c - radius*s + x,  len/2*s - radius*c + y);
        g.lineTo(-len/2*c - radius*s + x, -len/2*s - radius*c + y);
        g.endFill();

        // Draw lines in between
        g.lineStyle(lineWidth, color, 1);
        g.moveTo(-len/2*c + radius*s + x, -len/2*s + radius*c + y);
        g.lineTo( len/2*c + radius*s + x,  len/2*s + radius*c + y);
        g.moveTo(-len/2*c - radius*s + x, -len/2*s - radius*c + y);
        g.lineTo( len/2*c - radius*s + x,  len/2*s - radius*c + y);

    ***REMOVED***,

    /**
    * Picks a random pastel color.
    *
    * @method Phaser.Physics.P2.BodyDebug#randomPastelHex
    * @private
    */
    randomPastelHex: function() ***REMOVED***

        var blue, green, mix, red;
        mix = [255, 255, 255];

        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);

        red = Math.floor((red + 3 * mix[0]) / 4);
        green = Math.floor((green + 3 * mix[1]) / 4);
        blue = Math.floor((blue + 3 * mix[2]) / 4);

        return this.rgbToHex(red, green, blue);

    ***REMOVED***,

    /**
    * Converts from RGB to Hex.
    *
    * @method Phaser.Physics.P2.BodyDebug#rgbToHex
    * @private
    */
    rgbToHex: function(r, g, b) ***REMOVED***
        return this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    ***REMOVED***,

    /**
    * Component to hex conversion.
    *
    * @method Phaser.Physics.P2.BodyDebug#componentToHex
    * @private
    */
    componentToHex: function(c) ***REMOVED***

        var hex;
        hex = c.toString(16);

        if (hex.length === 2)
        ***REMOVED***
            return hex;
        ***REMOVED***
        else
        ***REMOVED***
            return hex + '0';
        ***REMOVED***

    ***REMOVED***

***REMOVED***);
