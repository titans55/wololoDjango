/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A set of functions used by the webGL renderer to draw the primitive graphics data
 *
 * @class WebGLGraphics
 * @private
 * @static
 */
PIXI.WebGLGraphics = function()
***REMOVED***
***REMOVED***;

/**
 * The number of points beyond which Pixi swaps to using the Stencil Buffer to render the Graphics.
 *
 * @type ***REMOVED***number***REMOVED***
 */
PIXI.WebGLGraphics.stencilBufferLimit = 6;

/**
 * Renders the graphics object
 *
 * @static
 * @private
 * @method renderGraphics
 * @param graphics ***REMOVED***Graphics***REMOVED***
 * @param renderSession ***REMOVED***Object***REMOVED***
 */
PIXI.WebGLGraphics.renderGraphics = function(graphics, renderSession)//projection, offset)
***REMOVED***
    var gl = renderSession.gl;
    var projection = renderSession.projection,
        offset = renderSession.offset,
        shader = renderSession.shaderManager.primitiveShader,
        webGLData;

    if(graphics.dirty)
    ***REMOVED***
        PIXI.WebGLGraphics.updateGraphics(graphics, gl);
    ***REMOVED***

    var webGL = graphics._webGL[gl.id];

    // This  could be speeded up for sure!

    for (var i = 0; i < webGL.data.length; i++)
    ***REMOVED***
        if(webGL.data[i].mode === 1)
        ***REMOVED***
            webGLData = webGL.data[i];

            renderSession.stencilManager.pushStencil(graphics, webGLData, renderSession);

            // render quad..
            gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, ( webGLData.indices.length - 4 ) * 2 );
            
            renderSession.stencilManager.popStencil(graphics, webGLData, renderSession);
        ***REMOVED***
        else
        ***REMOVED***
            webGLData = webGL.data[i];
           

            renderSession.shaderManager.setShader( shader );//activatePrimitiveShader();
            shader = renderSession.shaderManager.primitiveShader;
            gl.uniformMatrix3fv(shader.translationMatrix, false, graphics.worldTransform.toArray(true));
            
            gl.uniform1f(shader.flipY, 1);
            
            gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
            gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);

            gl.uniform3fv(shader.tintColor, PIXI.hex2rgb(graphics.tint));

            gl.uniform1f(shader.alpha, graphics.worldAlpha);
            

            gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);

            gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 6, 0);
            gl.vertexAttribPointer(shader.colorAttribute, 4, gl.FLOAT, false,4 * 6, 2 * 4);

            // set the index buffer!
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);
            gl.drawElements(gl.TRIANGLE_STRIP,  webGLData.indices.length, gl.UNSIGNED_SHORT, 0 );
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

/**
 * Updates the graphics object
 *
 * @static
 * @private
 * @method updateGraphics
 * @param graphicsData ***REMOVED***Graphics***REMOVED*** The graphics object to update
 * @param gl ***REMOVED***WebGLContext***REMOVED*** the current WebGL drawing context
 */
PIXI.WebGLGraphics.updateGraphics = function(graphics, gl)
***REMOVED***
    // get the contexts graphics object
    var webGL = graphics._webGL[gl.id];
    // if the graphics object does not exist in the webGL context time to create it!
    if(!webGL)webGL = graphics._webGL[gl.id] = ***REMOVED***lastIndex:0, data:[], gl:gl***REMOVED***;

    // flag the graphics as not dirty as we are about to update it...
    graphics.dirty = false;

    var i;

    // if the user cleared the graphics object we will need to clear every object
    if(graphics.clearDirty)
    ***REMOVED***
        graphics.clearDirty = false;

        // lop through and return all the webGLDatas to the object pool so than can be reused later on
        for (i = 0; i < webGL.data.length; i++)
        ***REMOVED***
            var graphicsData = webGL.data[i];
            graphicsData.reset();
            PIXI.WebGLGraphics.graphicsDataPool.push( graphicsData );
        ***REMOVED***

        // clear the array and reset the index.. 
        webGL.data = [];
        webGL.lastIndex = 0;
    ***REMOVED***
    
    var webGLData;
    
    // loop through the graphics datas and construct each one..
    // if the object is a complex fill then the new stencil buffer technique will be used
    // other wise graphics objects will be pushed into a batch..
    for (i = webGL.lastIndex; i < graphics.graphicsData.length; i++)
    ***REMOVED***
        var data = graphics.graphicsData[i];

        if(data.type === PIXI.Graphics.POLY)
        ***REMOVED***
            // need to add the points the the graphics object..
            data.points = data.shape.points.slice();
            if(data.shape.closed)
            ***REMOVED***
                // close the poly if the value is true!
                if(data.points[0] !== data.points[data.points.length-2] || data.points[1] !== data.points[data.points.length-1])
                ***REMOVED***
                    data.points.push(data.points[0], data.points[1]);
                ***REMOVED***
            ***REMOVED***

            // MAKE SURE WE HAVE THE CORRECT TYPE..
            if(data.fill)
            ***REMOVED***
                if(data.points.length >= PIXI.WebGLGraphics.stencilBufferLimit)
                ***REMOVED***
                    if(data.points.length < PIXI.WebGLGraphics.stencilBufferLimit * 2)
                    ***REMOVED***
                        webGLData = PIXI.WebGLGraphics.switchMode(webGL, 0);
                        
                        var canDrawUsingSimple = PIXI.WebGLGraphics.buildPoly(data, webGLData);
                   //     console.log(canDrawUsingSimple);

                        if(!canDrawUsingSimple)
                        ***REMOVED***
                        //    console.log("<>>>")
                            webGLData = PIXI.WebGLGraphics.switchMode(webGL, 1);
                            PIXI.WebGLGraphics.buildComplexPoly(data, webGLData);
                        ***REMOVED***
                        
                    ***REMOVED***
                    else
                    ***REMOVED***
                        webGLData = PIXI.WebGLGraphics.switchMode(webGL, 1);
                        PIXI.WebGLGraphics.buildComplexPoly(data, webGLData);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***

            if(data.lineWidth > 0)
            ***REMOVED***
                webGLData = PIXI.WebGLGraphics.switchMode(webGL, 0);
                PIXI.WebGLGraphics.buildLine(data, webGLData);

            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            webGLData = PIXI.WebGLGraphics.switchMode(webGL, 0);
            
            if(data.type === PIXI.Graphics.RECT)
            ***REMOVED***
                PIXI.WebGLGraphics.buildRectangle(data, webGLData);
            ***REMOVED***
            else if(data.type === PIXI.Graphics.CIRC || data.type === PIXI.Graphics.ELIP)
            ***REMOVED***
                PIXI.WebGLGraphics.buildCircle(data, webGLData);
            ***REMOVED***
            else if(data.type === PIXI.Graphics.RREC)
            ***REMOVED***
                PIXI.WebGLGraphics.buildRoundedRectangle(data, webGLData);
            ***REMOVED***
        ***REMOVED***

        webGL.lastIndex++;
    ***REMOVED***

    // upload all the dirty data...
    for (i = 0; i < webGL.data.length; i++)
    ***REMOVED***
        webGLData = webGL.data[i];
        if(webGLData.dirty)webGLData.upload();
    ***REMOVED***
***REMOVED***;

/**
 * @static
 * @private
 * @method switchMode
 * @param webGL ***REMOVED***WebGLContext***REMOVED***
 * @param type ***REMOVED***Number***REMOVED***
 */
PIXI.WebGLGraphics.switchMode = function(webGL, type)
***REMOVED***
    var webGLData;

    if(!webGL.data.length)
    ***REMOVED***
        webGLData = PIXI.WebGLGraphics.graphicsDataPool.pop() || new PIXI.WebGLGraphicsData(webGL.gl);
        webGLData.mode = type;
        webGL.data.push(webGLData);
    ***REMOVED***
    else
    ***REMOVED***
        webGLData = webGL.data[webGL.data.length-1];

        if(webGLData.mode !== type || type === 1)
        ***REMOVED***
            webGLData = PIXI.WebGLGraphics.graphicsDataPool.pop() || new PIXI.WebGLGraphicsData(webGL.gl);
            webGLData.mode = type;
            webGL.data.push(webGLData);
        ***REMOVED***
    ***REMOVED***

    webGLData.dirty = true;

    return webGLData;
***REMOVED***;

/**
 * Builds a rectangle to draw
 *
 * @static
 * @private
 * @method buildRectangle
 * @param graphicsData ***REMOVED***Graphics***REMOVED*** The graphics object containing all the necessary properties
 * @param webGLData ***REMOVED***Object***REMOVED***
 */
PIXI.WebGLGraphics.buildRectangle = function(graphicsData, webGLData)
***REMOVED***
    // --- //
    // need to convert points to a nice regular data
    //
    var rectData = graphicsData.shape;
    var x = rectData.x;
    var y = rectData.y;
    var width = rectData.width;
    var height = rectData.height;

    if(graphicsData.fill)
    ***REMOVED***
        var color = PIXI.hex2rgb(graphicsData.fillColor);
        var alpha = graphicsData.fillAlpha;

        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;

        var verts = webGLData.points;
        var indices = webGLData.indices;

        var vertPos = verts.length / 6;

        // start
        verts.push(x, y);
        verts.push(r, g, b, alpha);

        verts.push(x + width, y);
        verts.push(r, g, b, alpha);

        verts.push(x , y + height);
        verts.push(r, g, b, alpha);

        verts.push(x + width, y + height);
        verts.push(r, g, b, alpha);

        // insert 2 dead triangles..
        indices.push(vertPos, vertPos, vertPos + 1, vertPos + 2, vertPos + 3, vertPos + 3);
    ***REMOVED***

    if (graphicsData.lineWidth)
    ***REMOVED***
        var tempPoints = graphicsData.points;

        graphicsData.points = [x, y,
                  x + width, y,
                  x + width, y + height,
                  x, y + height,
                  x, y];


        PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);

        graphicsData.points = tempPoints;
    ***REMOVED***
***REMOVED***;

/**
 * Builds a rounded rectangle to draw
 *
 * @static
 * @private
 * @method buildRoundedRectangle
 * @param graphicsData ***REMOVED***Graphics***REMOVED*** The graphics object containing all the necessary properties
 * @param webGLData ***REMOVED***Object***REMOVED***
 */
PIXI.WebGLGraphics.buildRoundedRectangle = function(graphicsData, webGLData)
***REMOVED***
    var rrectData = graphicsData.shape;
    var x = rrectData.x;
    var y = rrectData.y;
    var width = rrectData.width;
    var height = rrectData.height;

    var radius = rrectData.radius;

    var recPoints = [];
    recPoints.push(x, y + radius);
    recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x, y + height - radius, x, y + height, x + radius, y + height));
    recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + width - radius, y + height, x + width, y + height, x + width, y + height - radius));
    recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + width, y + radius, x + width, y, x + width - radius, y));
    recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + radius, y, x, y, x, y + radius));

    if (graphicsData.fill) ***REMOVED***
        var color = PIXI.hex2rgb(graphicsData.fillColor);
        var alpha = graphicsData.fillAlpha;

        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;

        var verts = webGLData.points;
        var indices = webGLData.indices;

        var vecPos = verts.length / 6;

        var triangles = PIXI.EarCut.Triangulate(recPoints, null, 2);

        var i = 0;

        for (i = 0; i < triangles.length; i+=3)
        ***REMOVED***
            indices.push(triangles[i] + vecPos);
            indices.push(triangles[i] + vecPos);
            indices.push(triangles[i+1] + vecPos);
            indices.push(triangles[i+2] + vecPos);
            indices.push(triangles[i+2] + vecPos);
        ***REMOVED***


        for (i = 0; i < recPoints.length; i++)
        ***REMOVED***
            verts.push(recPoints[i], recPoints[++i], r, g, b, alpha);
        ***REMOVED***
    ***REMOVED***

    if (graphicsData.lineWidth) ***REMOVED***
        var tempPoints = graphicsData.points;

        graphicsData.points = recPoints;

        PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);

        graphicsData.points = tempPoints;
    ***REMOVED***
***REMOVED***;

/**
 * Calculate the points for a quadratic bezier curve. (helper function..)
 * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
 *
 * @static
 * @private
 * @method quadraticBezierCurve
 * @param fromX ***REMOVED***Number***REMOVED*** Origin point x
 * @param fromY ***REMOVED***Number***REMOVED*** Origin point x
 * @param cpX ***REMOVED***Number***REMOVED*** Control point x
 * @param cpY ***REMOVED***Number***REMOVED*** Control point y
 * @param toX ***REMOVED***Number***REMOVED*** Destination point x
 * @param toY ***REMOVED***Number***REMOVED*** Destination point y
 * @return ***REMOVED***Array(Number)***REMOVED***
 */
PIXI.WebGLGraphics.quadraticBezierCurve = function(fromX, fromY, cpX, cpY, toX, toY) ***REMOVED***

    var xa,
        ya,
        xb,
        yb,
        x,
        y,
        n = 20,
        points = [];

    function getPt(n1 , n2, perc) ***REMOVED***
        var diff = n2 - n1;

        return n1 + ( diff * perc );
    ***REMOVED***

    var j = 0;
    for (var i = 0; i <= n; i++ )
    ***REMOVED***
        j = i / n;

        // The Green Line
        xa = getPt( fromX , cpX , j );
        ya = getPt( fromY , cpY , j );
        xb = getPt( cpX , toX , j );
        yb = getPt( cpY , toY , j );

        // The Black Dot
        x = getPt( xa , xb , j );
        y = getPt( ya , yb , j );

        points.push(x, y);
    ***REMOVED***
    return points;
***REMOVED***;

/**
 * Builds a circle to draw
 *
 * @static
 * @private
 * @method buildCircle
 * @param graphicsData ***REMOVED***Graphics***REMOVED*** The graphics object to draw
 * @param webGLData ***REMOVED***Object***REMOVED***
 */
PIXI.WebGLGraphics.buildCircle = function(graphicsData, webGLData)
***REMOVED***
    // need to convert points to a nice regular data
    var circleData = graphicsData.shape;
    var x = circleData.x;
    var y = circleData.y;
    var width;
    var height;
    
    // TODO - bit hacky??
    if(graphicsData.type === PIXI.Graphics.CIRC)
    ***REMOVED***
        width = circleData.radius;
        height = circleData.radius;
    ***REMOVED***
    else
    ***REMOVED***
        width = circleData.width;
        height = circleData.height;
    ***REMOVED***

    var totalSegs = 40;
    var seg = (Math.PI * 2) / totalSegs ;

    var i = 0;

    if(graphicsData.fill)
    ***REMOVED***
        var color = PIXI.hex2rgb(graphicsData.fillColor);
        var alpha = graphicsData.fillAlpha;

        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;

        var verts = webGLData.points;
        var indices = webGLData.indices;

        var vecPos = verts.length / 6;

        indices.push(vecPos);

        for (i = 0; i < totalSegs + 1 ; i++)
        ***REMOVED***
            verts.push(x,y, r, g, b, alpha);

            verts.push(x + Math.sin(seg * i) * width,
                       y + Math.cos(seg * i) * height,
                       r, g, b, alpha);

            indices.push(vecPos++, vecPos++);
        ***REMOVED***

        indices.push(vecPos-1);
    ***REMOVED***

    if(graphicsData.lineWidth)
    ***REMOVED***
        var tempPoints = graphicsData.points;

        graphicsData.points = [];

        for (i = 0; i < totalSegs + 1; i++)
        ***REMOVED***
            graphicsData.points.push(x + Math.sin(seg * i) * width,
                                     y + Math.cos(seg * i) * height);
        ***REMOVED***

        PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);

        graphicsData.points = tempPoints;
    ***REMOVED***
***REMOVED***;

/**
 * Builds a line to draw
 *
 * @static
 * @private
 * @method buildLine
 * @param graphicsData ***REMOVED***Graphics***REMOVED*** The graphics object containing all the necessary properties
 * @param webGLData ***REMOVED***Object***REMOVED***
 */
PIXI.WebGLGraphics.buildLine = function(graphicsData, webGLData)
***REMOVED***
    // TODO OPTIMISE!
    var i = 0;
    var points = graphicsData.points;
    if(points.length === 0)return;

    // if the line width is an odd number add 0.5 to align to a whole pixel
    if(graphicsData.lineWidth%2)
    ***REMOVED***
        for (i = 0; i < points.length; i++) ***REMOVED***
            points[i] += 0.5;
        ***REMOVED***
    ***REMOVED***

    // get first and last point.. figure out the middle!
    var firstPoint = new PIXI.Point( points[0], points[1] );
    var lastPoint = new PIXI.Point( points[points.length - 2], points[points.length - 1] );

    // if the first point is the last point - gonna have issues :)
    if(firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y)
    ***REMOVED***
        // need to clone as we are going to slightly modify the shape..
        points = points.slice();

        points.pop();
        points.pop();

        lastPoint = new PIXI.Point( points[points.length - 2], points[points.length - 1] );

        var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) *0.5;
        var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) *0.5;

        points.unshift(midPointX, midPointY);
        points.push(midPointX, midPointY);
    ***REMOVED***

    var verts = webGLData.points;
    var indices = webGLData.indices;
    var length = points.length / 2;
    var indexCount = points.length;
    var indexStart = verts.length/6;

    // DRAW the Line
    var width = graphicsData.lineWidth / 2;

    // sort color
    var color = PIXI.hex2rgb(graphicsData.lineColor);
    var alpha = graphicsData.lineAlpha;
    var r = color[0] * alpha;
    var g = color[1] * alpha;
    var b = color[2] * alpha;

    var px, py, p1x, p1y, p2x, p2y, p3x, p3y;
    var perpx, perpy, perp2x, perp2y, perp3x, perp3y;
    var a1, b1, c1, a2, b2, c2;
    var denom, pdist, dist;

    p1x = points[0];
    p1y = points[1];

    p2x = points[2];
    p2y = points[3];

    perpx = -(p1y - p2y);
    perpy =  p1x - p2x;

    dist = Math.sqrt(perpx*perpx + perpy*perpy);

    perpx /= dist;
    perpy /= dist;
    perpx *= width;
    perpy *= width;

    // start
    verts.push(p1x - perpx , p1y - perpy,
                r, g, b, alpha);

    verts.push(p1x + perpx , p1y + perpy,
                r, g, b, alpha);

    for (i = 1; i < length-1; i++)
    ***REMOVED***
        p1x = points[(i-1)*2];
        p1y = points[(i-1)*2 + 1];

        p2x = points[(i)*2];
        p2y = points[(i)*2 + 1];

        p3x = points[(i+1)*2];
        p3y = points[(i+1)*2 + 1];

        perpx = -(p1y - p2y);
        perpy = p1x - p2x;

        dist = Math.sqrt(perpx*perpx + perpy*perpy);
        perpx /= dist;
        perpy /= dist;
        perpx *= width;
        perpy *= width;

        perp2x = -(p2y - p3y);
        perp2y = p2x - p3x;

        dist = Math.sqrt(perp2x*perp2x + perp2y*perp2y);
        perp2x /= dist;
        perp2y /= dist;
        perp2x *= width;
        perp2y *= width;

        a1 = (-perpy + p1y) - (-perpy + p2y);
        b1 = (-perpx + p2x) - (-perpx + p1x);
        c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
        a2 = (-perp2y + p3y) - (-perp2y + p2y);
        b2 = (-perp2x + p2x) - (-perp2x + p3x);
        c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);

        denom = a1*b2 - a2*b1;

        if(Math.abs(denom) < 0.1 )
        ***REMOVED***

            denom+=10.1;
            verts.push(p2x - perpx , p2y - perpy,
                r, g, b, alpha);

            verts.push(p2x + perpx , p2y + perpy,
                r, g, b, alpha);

            continue;
        ***REMOVED***

        px = (b1*c2 - b2*c1)/denom;
        py = (a2*c1 - a1*c2)/denom;


        pdist = (px -p2x) * (px -p2x) + (py -p2y) + (py -p2y);


        if(pdist > 140 * 140)
        ***REMOVED***
            perp3x = perpx - perp2x;
            perp3y = perpy - perp2y;

            dist = Math.sqrt(perp3x*perp3x + perp3y*perp3y);
            perp3x /= dist;
            perp3y /= dist;
            perp3x *= width;
            perp3y *= width;

            verts.push(p2x - perp3x, p2y -perp3y);
            verts.push(r, g, b, alpha);

            verts.push(p2x + perp3x, p2y +perp3y);
            verts.push(r, g, b, alpha);

            verts.push(p2x - perp3x, p2y -perp3y);
            verts.push(r, g, b, alpha);

            indexCount++;
        ***REMOVED***
        else
        ***REMOVED***

            verts.push(px , py);
            verts.push(r, g, b, alpha);

            verts.push(p2x - (px-p2x), p2y - (py - p2y));
            verts.push(r, g, b, alpha);
        ***REMOVED***
    ***REMOVED***

    p1x = points[(length-2)*2];
    p1y = points[(length-2)*2 + 1];

    p2x = points[(length-1)*2];
    p2y = points[(length-1)*2 + 1];

    perpx = -(p1y - p2y);
    perpy = p1x - p2x;

    dist = Math.sqrt(perpx*perpx + perpy*perpy);
    perpx /= dist;
    perpy /= dist;
    perpx *= width;
    perpy *= width;

    verts.push(p2x - perpx , p2y - perpy);
    verts.push(r, g, b, alpha);

    verts.push(p2x + perpx , p2y + perpy);
    verts.push(r, g, b, alpha);

    indices.push(indexStart);

    for (i = 0; i < indexCount; i++)
    ***REMOVED***
        indices.push(indexStart++);
    ***REMOVED***

    indices.push(indexStart-1);
***REMOVED***;

/**
 * Builds a complex polygon to draw
 *
 * @static
 * @private
 * @method buildComplexPoly
 * @param graphicsData ***REMOVED***Graphics***REMOVED*** The graphics object containing all the necessary properties
 * @param webGLData ***REMOVED***Object***REMOVED***
 */
PIXI.WebGLGraphics.buildComplexPoly = function(graphicsData, webGLData)
***REMOVED***
    //TODO - no need to copy this as it gets turned into a FLoat32Array anyways..
    var points = graphicsData.points.slice();
    if(points.length < 6)return;

    // get first and last point.. figure out the middle!
    var indices = webGLData.indices;
    webGLData.points = points;
    webGLData.alpha = graphicsData.fillAlpha;
    webGLData.color = PIXI.hex2rgb(graphicsData.fillColor);

    /*
        calclate the bounds..
    */
    var minX = Infinity;
    var maxX = -Infinity;

    var minY = Infinity;
    var maxY = -Infinity;

    var x,y;

    // get size..
    for (var i = 0; i < points.length; i+=2)
    ***REMOVED***
        x = points[i];
        y = points[i+1];

        minX = x < minX ? x : minX;
        maxX = x > maxX ? x : maxX;

        minY = y < minY ? y : minY;
        maxY = y > maxY ? y : maxY;
    ***REMOVED***

    // add a quad to the end cos there is no point making another buffer!
    points.push(minX, minY,
                maxX, minY,
                maxX, maxY,
                minX, maxY);

    // push a quad onto the end.. 
    
    //TODO - this aint needed!
    var length = points.length / 2;
    for (i = 0; i < length; i++)
    ***REMOVED***
        indices.push( i );
    ***REMOVED***

***REMOVED***;

/**
 * Builds a polygon to draw
 *
 * @static
 * @private
 * @method buildPoly
 * @param graphicsData ***REMOVED***Graphics***REMOVED*** The graphics object containing all the necessary properties
 * @param webGLData ***REMOVED***Object***REMOVED***
 */
PIXI.WebGLGraphics.buildPoly = function(graphicsData, webGLData)
***REMOVED***
    var points = graphicsData.points;

    if(points.length < 6)return;
    // get first and last point.. figure out the middle!
    var verts = webGLData.points;
    var indices = webGLData.indices;

    var length = points.length / 2;

    // sort color
    var color = PIXI.hex2rgb(graphicsData.fillColor);
    var alpha = graphicsData.fillAlpha;
    var r = color[0] * alpha;
    var g = color[1] * alpha;
    var b = color[2] * alpha;

    var triangles = PIXI.EarCut.Triangulate(points, null, 2);

    if(!triangles)return false;

    var vertPos = verts.length / 6;

    var i = 0;

    for (i = 0; i < triangles.length; i+=3)
    ***REMOVED***
        indices.push(triangles[i] + vertPos);
        indices.push(triangles[i] + vertPos);
        indices.push(triangles[i+1] + vertPos);
        indices.push(triangles[i+2] +vertPos);
        indices.push(triangles[i+2] + vertPos);
    ***REMOVED***

    for (i = 0; i < length; i++)
    ***REMOVED***
        verts.push(points[i * 2], points[i * 2 + 1],
                   r, g, b, alpha);
    ***REMOVED***

    return true;
***REMOVED***;

PIXI.WebGLGraphics.graphicsDataPool = [];

/**
 * @class WebGLGraphicsData
 * @private
 * @static
 */
PIXI.WebGLGraphicsData = function(gl)
***REMOVED***
    this.gl = gl;

    //TODO does this need to be split before uploding??
    this.color = [0,0,0]; // color split!
    this.points = [];
    this.indices = [];
    this.buffer = gl.createBuffer();
    this.indexBuffer = gl.createBuffer();
    this.mode = 1;
    this.alpha = 1;
    this.dirty = true;
***REMOVED***;

/**
 * @method reset
 */
PIXI.WebGLGraphicsData.prototype.reset = function()
***REMOVED***
    this.points = [];
    this.indices = [];
***REMOVED***;

/**
 * @method upload
 */
PIXI.WebGLGraphicsData.prototype.upload = function()
***REMOVED***
    var gl = this.gl;

//    this.lastIndex = graphics.graphicsData.length;
    this.glPoints = new PIXI.Float32Array(this.points);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.glPoints, gl.STATIC_DRAW);

    this.glIndicies = new PIXI.Uint16Array(this.indices);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.glIndicies, gl.STATIC_DRAW);

    this.dirty = false;
***REMOVED***;
