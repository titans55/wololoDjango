/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * A set of functions used by the canvas renderer to draw the primitive graphics data.
 *
 * @class CanvasGraphics
 * @static
 */
PIXI.CanvasGraphics = function()
***REMOVED***
***REMOVED***;

/*
 * Renders a PIXI.Graphics object to a canvas.
 *
 * @method renderGraphics
 * @static
 * @param graphics ***REMOVED***Graphics***REMOVED*** the actual graphics object to render
 * @param context ***REMOVED***CanvasRenderingContext2D***REMOVED*** the 2d drawing method of the canvas
 */
PIXI.CanvasGraphics.renderGraphics = function(graphics, context)
***REMOVED***
    var worldAlpha = graphics.worldAlpha;

    if (graphics.dirty)
    ***REMOVED***
        this.updateGraphicsTint(graphics);
        graphics.dirty = false;
    ***REMOVED***

    for (var i = 0; i < graphics.graphicsData.length; i++)
    ***REMOVED***
        var data = graphics.graphicsData[i];
        var shape = data.shape;

        var fillColor = data._fillTint;
        var lineColor = data._lineTint;

        context.lineWidth = data.lineWidth;

        if (data.type === PIXI.Graphics.POLY)
        ***REMOVED***
            context.beginPath();

            var points = shape.points;

            context.moveTo(points[0], points[1]);

            for (var j=1; j < points.length/2; j++)
            ***REMOVED***
                context.lineTo(points[j * 2], points[j * 2 + 1]);
            ***REMOVED***

            if (shape.closed)
            ***REMOVED***
                context.lineTo(points[0], points[1]);
            ***REMOVED***

            // if the first and last point are the same close the path - much neater :)
            if (points[0] === points[points.length-2] && points[1] === points[points.length-1])
            ***REMOVED***
                context.closePath();
            ***REMOVED***

            if (data.fill)
            ***REMOVED***
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
                context.fill();
            ***REMOVED***

            if (data.lineWidth)
            ***REMOVED***
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = '#' + ('00000' + ( lineColor | 0).toString(16)).substr(-6);
                context.stroke();
            ***REMOVED***
        ***REMOVED***
        else if (data.type === PIXI.Graphics.RECT)
        ***REMOVED***
            if (data.fillColor || data.fillColor === 0)
            ***REMOVED***
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
                context.fillRect(shape.x, shape.y, shape.width, shape.height);
            ***REMOVED***

            if (data.lineWidth)
            ***REMOVED***
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = '#' + ('00000' + ( lineColor | 0).toString(16)).substr(-6);
                context.strokeRect(shape.x, shape.y, shape.width, shape.height);
            ***REMOVED***
        ***REMOVED***
        else if (data.type === PIXI.Graphics.CIRC)
        ***REMOVED***
            // TODO - need to be Undefined!
            context.beginPath();
            context.arc(shape.x, shape.y, shape.radius,0,2*Math.PI);
            context.closePath();

            if (data.fill)
            ***REMOVED***
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
                context.fill();
            ***REMOVED***

            if (data.lineWidth)
            ***REMOVED***
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = '#' + ('00000' + ( lineColor | 0).toString(16)).substr(-6);
                context.stroke();
            ***REMOVED***
        ***REMOVED***
        else if (data.type === PIXI.Graphics.ELIP)
        ***REMOVED***
            // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

            var w = shape.width * 2;
            var h = shape.height * 2;

            var x = shape.x - w/2;
            var y = shape.y - h/2;

            context.beginPath();

            var kappa = 0.5522848,
                ox = (w / 2) * kappa, // control point offset horizontal
                oy = (h / 2) * kappa, // control point offset vertical
                xe = x + w,           // x-end
                ye = y + h,           // y-end
                xm = x + w / 2,       // x-middle
                ym = y + h / 2;       // y-middle

            context.moveTo(x, ym);
            context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
            context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
            context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

            context.closePath();

            if (data.fill)
            ***REMOVED***
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
                context.fill();
            ***REMOVED***

            if (data.lineWidth)
            ***REMOVED***
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = '#' + ('00000' + ( lineColor | 0).toString(16)).substr(-6);
                context.stroke();
            ***REMOVED***
        ***REMOVED***
        else if (data.type === PIXI.Graphics.RREC)
        ***REMOVED***
            var rx = shape.x;
            var ry = shape.y;
            var width = shape.width;
            var height = shape.height;
            var radius = shape.radius;

            var maxRadius = Math.min(width, height) / 2 | 0;
            radius = radius > maxRadius ? maxRadius : radius;

            context.beginPath();
            context.moveTo(rx, ry + radius);
            context.lineTo(rx, ry + height - radius);
            context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
            context.lineTo(rx + width - radius, ry + height);
            context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
            context.lineTo(rx + width, ry + radius);
            context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
            context.lineTo(rx + radius, ry);
            context.quadraticCurveTo(rx, ry, rx, ry + radius);
            context.closePath();

            if (data.fillColor || data.fillColor === 0)
            ***REMOVED***
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
                context.fill();
            ***REMOVED***

            if (data.lineWidth)
            ***REMOVED***
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = '#' + ('00000' + ( lineColor | 0).toString(16)).substr(-6);
                context.stroke();
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/*
 * Renders a graphics mask
 *
 * @static
 * @private
 * @method renderGraphicsMask
 * @param graphics ***REMOVED***Graphics***REMOVED*** the graphics which will be used as a mask
 * @param context ***REMOVED***CanvasRenderingContext2D***REMOVED*** the context 2d method of the canvas
 */
PIXI.CanvasGraphics.renderGraphicsMask = function(graphics, context)
***REMOVED***
    var len = graphics.graphicsData.length;

    if (len === 0)
    ***REMOVED***
        return;
    ***REMOVED***

    context.beginPath();

    for (var i = 0; i < len; i++)
    ***REMOVED***
        var data = graphics.graphicsData[i];
        var shape = data.shape;

        if (data.type === PIXI.Graphics.POLY)
        ***REMOVED***

            var points = shape.points;
        
            context.moveTo(points[0], points[1]);

            for (var j=1; j < points.length/2; j++)
            ***REMOVED***
                context.lineTo(points[j * 2], points[j * 2 + 1]);
            ***REMOVED***

            // if the first and last point are the same close the path - much neater :)
            if (points[0] === points[points.length-2] && points[1] === points[points.length-1])
            ***REMOVED***
                context.closePath();
            ***REMOVED***

        ***REMOVED***
        else if (data.type === PIXI.Graphics.RECT)
        ***REMOVED***
            context.rect(shape.x, shape.y, shape.width, shape.height);
            context.closePath();
        ***REMOVED***
        else if (data.type === PIXI.Graphics.CIRC)
        ***REMOVED***
            // TODO - need to be Undefined!
            context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
            context.closePath();
        ***REMOVED***
        else if (data.type === PIXI.Graphics.ELIP)
        ***REMOVED***

            // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

            var w = shape.width * 2;
            var h = shape.height * 2;

            var x = shape.x - w/2;
            var y = shape.y - h/2;

            var kappa = 0.5522848,
                ox = (w / 2) * kappa, // control point offset horizontal
                oy = (h / 2) * kappa, // control point offset vertical
                xe = x + w,           // x-end
                ye = y + h,           // y-end
                xm = x + w / 2,       // x-middle
                ym = y + h / 2;       // y-middle

            context.moveTo(x, ym);
            context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
            context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
            context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
            context.closePath();
        ***REMOVED***
        else if (data.type === PIXI.Graphics.RREC)
        ***REMOVED***

            var rx = shape.x;
            var ry = shape.y;
            var width = shape.width;
            var height = shape.height;
            var radius = shape.radius;

            var maxRadius = Math.min(width, height) / 2 | 0;
            radius = radius > maxRadius ? maxRadius : radius;

            context.moveTo(rx, ry + radius);
            context.lineTo(rx, ry + height - radius);
            context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
            context.lineTo(rx + width - radius, ry + height);
            context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
            context.lineTo(rx + width, ry + radius);
            context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
            context.lineTo(rx + radius, ry);
            context.quadraticCurveTo(rx, ry, rx, ry + radius);
            context.closePath();
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

PIXI.CanvasGraphics.updateGraphicsTint = function(graphics)
***REMOVED***
    if (graphics.tint === 0xFFFFFF)
    ***REMOVED***
        return;
    ***REMOVED***

    var tintR = (graphics.tint >> 16 & 0xFF) / 255;
    var tintG = (graphics.tint >> 8 & 0xFF) / 255;
    var tintB = (graphics.tint & 0xFF)/ 255;

    for (var i = 0; i < graphics.graphicsData.length; i++)
    ***REMOVED***
        var data = graphics.graphicsData[i];

        var fillColor = data.fillColor | 0;
        var lineColor = data.lineColor | 0;

        data._fillTint = (((fillColor >> 16 & 0xFF) / 255 * tintR*255 << 16) + ((fillColor >> 8 & 0xFF) / 255 * tintG*255 << 8) +  (fillColor & 0xFF) / 255 * tintB*255);
        data._lineTint = (((lineColor >> 16 & 0xFF) / 255 * tintR*255 << 16) + ((lineColor >> 8 & 0xFF) / 255 * tintG*255 << 8) +  (lineColor & 0xFF) / 255 * tintB*255);

    ***REMOVED***

***REMOVED***;