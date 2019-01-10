/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 p2.js authors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
!function(e)***REMOVED***if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&false)define(e);else***REMOVED***var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.p2=e()***REMOVED******REMOVED***(function()***REMOVED***var define,module,exports;return (function e(t,n,r)***REMOVED***function s(o,u)***REMOVED***if(!n[o])***REMOVED***if(!t[o])***REMOVED***var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")***REMOVED***var f=n[o]=***REMOVED***exports:***REMOVED******REMOVED******REMOVED***;t[o][0].call(f.exports,function(e)***REMOVED***var n=t[o][1][e];return s(n?n:e)***REMOVED***,f,f.exports,e,t,n,r)***REMOVED***return n[o].exports***REMOVED***var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s***REMOVED***)(***REMOVED***1:[function(_dereq_,module,exports)***REMOVED***
var Scalar = _dereq_('./Scalar');

module.exports = Line;

/**
 * Container for line-related functions
 * @class Line
 */
function Line()***REMOVED******REMOVED***;

/**
 * Compute the intersection between two lines.
 * @static
 * @method lineInt
 * @param  ***REMOVED***Array***REMOVED***  l1          Line vector 1
 * @param  ***REMOVED***Array***REMOVED***  l2          Line vector 2
 * @param  ***REMOVED***Number***REMOVED*** precision   Precision to use when checking if the lines are parallel
 * @return ***REMOVED***Array***REMOVED***              The intersection point.
 */
Line.lineInt = function(l1,l2,precision)***REMOVED***
    precision = precision || 0;
    var i = [0,0]; // point
    var a1, b1, c1, a2, b2, c2, det; // scalars
    a1 = l1[1][1] - l1[0][1];
    b1 = l1[0][0] - l1[1][0];
    c1 = a1 * l1[0][0] + b1 * l1[0][1];
    a2 = l2[1][1] - l2[0][1];
    b2 = l2[0][0] - l2[1][0];
    c2 = a2 * l2[0][0] + b2 * l2[0][1];
    det = a1 * b2 - a2*b1;
    if (!Scalar.eq(det, 0, precision)) ***REMOVED*** // lines are not parallel
        i[0] = (b2 * c1 - b1 * c2) / det;
        i[1] = (a1 * c2 - a2 * c1) / det;
    ***REMOVED***
    return i;
***REMOVED***;

/**
 * Checks if two line segments intersects.
 * @method segmentsIntersect
 * @param ***REMOVED***Array***REMOVED*** p1 The start vertex of the first line segment.
 * @param ***REMOVED***Array***REMOVED*** p2 The end vertex of the first line segment.
 * @param ***REMOVED***Array***REMOVED*** q1 The start vertex of the second line segment.
 * @param ***REMOVED***Array***REMOVED*** q2 The end vertex of the second line segment.
 * @return ***REMOVED***Boolean***REMOVED*** True if the two line segments intersect
 */
Line.segmentsIntersect = function(p1, p2, q1, q2)***REMOVED***
   var dx = p2[0] - p1[0];
   var dy = p2[1] - p1[1];
   var da = q2[0] - q1[0];
   var db = q2[1] - q1[1];

   // segments are parallel
   if(da*dy - db*dx == 0)
      return false;

   var s = (dx * (q1[1] - p1[1]) + dy * (p1[0] - q1[0])) / (da * dy - db * dx)
   var t = (da * (p1[1] - q1[1]) + db * (q1[0] - p1[0])) / (db * dx - da * dy)

   return (s>=0 && s<=1 && t>=0 && t<=1);
***REMOVED***;


***REMOVED***,***REMOVED***"./Scalar":4***REMOVED***],2:[function(_dereq_,module,exports)***REMOVED***
module.exports = Point;

/**
 * Point related functions
 * @class Point
 */
function Point()***REMOVED******REMOVED***;

/**
 * Get the area of a triangle spanned by the three given points. Note that the area will be negative if the points are not given in counter-clockwise order.
 * @static
 * @method area
 * @param  ***REMOVED***Array***REMOVED*** a
 * @param  ***REMOVED***Array***REMOVED*** b
 * @param  ***REMOVED***Array***REMOVED*** c
 * @return ***REMOVED***Number***REMOVED***
 */
Point.area = function(a,b,c)***REMOVED***
    return (((b[0] - a[0])*(c[1] - a[1]))-((c[0] - a[0])*(b[1] - a[1])));
***REMOVED***;

Point.left = function(a,b,c)***REMOVED***
    return Point.area(a,b,c) > 0;
***REMOVED***;

Point.leftOn = function(a,b,c) ***REMOVED***
    return Point.area(a, b, c) >= 0;
***REMOVED***;

Point.right = function(a,b,c) ***REMOVED***
    return Point.area(a, b, c) < 0;
***REMOVED***;

Point.rightOn = function(a,b,c) ***REMOVED***
    return Point.area(a, b, c) <= 0;
***REMOVED***;

var tmpPoint1 = [],
    tmpPoint2 = [];

/**
 * Check if three points are collinear
 * @method collinear
 * @param  ***REMOVED***Array***REMOVED*** a
 * @param  ***REMOVED***Array***REMOVED*** b
 * @param  ***REMOVED***Array***REMOVED*** c
 * @param  ***REMOVED***Number***REMOVED*** [thresholdAngle=0] Threshold angle to use when comparing the vectors. The function will return true if the angle between the resulting vectors is less than this value. Use zero for max precision.
 * @return ***REMOVED***Boolean***REMOVED***
 */
Point.collinear = function(a,b,c,thresholdAngle) ***REMOVED***
    if(!thresholdAngle)
        return Point.area(a, b, c) == 0;
    else ***REMOVED***
        var ab = tmpPoint1,
            bc = tmpPoint2;

        ab[0] = b[0]-a[0];
        ab[1] = b[1]-a[1];
        bc[0] = c[0]-b[0];
        bc[1] = c[1]-b[1];

        var dot = ab[0]*bc[0] + ab[1]*bc[1],
            magA = Math.sqrt(ab[0]*ab[0] + ab[1]*ab[1]),
            magB = Math.sqrt(bc[0]*bc[0] + bc[1]*bc[1]),
            angle = Math.acos(dot/(magA*magB));
        return angle < thresholdAngle;
    ***REMOVED***
***REMOVED***;

Point.sqdist = function(a,b)***REMOVED***
    var dx = b[0] - a[0];
    var dy = b[1] - a[1];
    return dx * dx + dy * dy;
***REMOVED***;

***REMOVED***,***REMOVED******REMOVED***],3:[function(_dereq_,module,exports)***REMOVED***
var Line = _dereq_("./Line")
,   Point = _dereq_("./Point")
,   Scalar = _dereq_("./Scalar")

module.exports = Polygon;

/**
 * Polygon class.
 * @class Polygon
 * @constructor
 */
function Polygon()***REMOVED***

    /**
     * Vertices that this polygon consists of. An array of array of numbers, example: [[0,0],[1,0],..]
     * @property vertices
     * @type ***REMOVED***Array***REMOVED***
     */
    this.vertices = [];
***REMOVED***

/**
 * Get a vertex at position i. It does not matter if i is out of bounds, this function will just cycle.
 * @method at
 * @param  ***REMOVED***Number***REMOVED*** i
 * @return ***REMOVED***Array***REMOVED***
 */
Polygon.prototype.at = function(i)***REMOVED***
    var v = this.vertices,
        s = v.length;
    return v[i < 0 ? i % s + s : i % s];
***REMOVED***;

/**
 * Get first vertex
 * @method first
 * @return ***REMOVED***Array***REMOVED***
 */
Polygon.prototype.first = function()***REMOVED***
    return this.vertices[0];
***REMOVED***;

/**
 * Get last vertex
 * @method last
 * @return ***REMOVED***Array***REMOVED***
 */
Polygon.prototype.last = function()***REMOVED***
    return this.vertices[this.vertices.length-1];
***REMOVED***;

/**
 * Clear the polygon data
 * @method clear
 * @return ***REMOVED***Array***REMOVED***
 */
Polygon.prototype.clear = function()***REMOVED***
    this.vertices.length = 0;
***REMOVED***;

/**
 * Append points "from" to "to"-1 from an other polygon "poly" onto this one.
 * @method append
 * @param ***REMOVED***Polygon***REMOVED*** poly The polygon to get points from.
 * @param ***REMOVED***Number***REMOVED***  from The vertex index in "poly".
 * @param ***REMOVED***Number***REMOVED***  to The end vertex index in "poly". Note that this vertex is NOT included when appending.
 * @return ***REMOVED***Array***REMOVED***
 */
Polygon.prototype.append = function(poly,from,to)***REMOVED***
    if(typeof(from) == "undefined") throw new Error("From is not given!");
    if(typeof(to) == "undefined")   throw new Error("To is not given!");

    if(to-1 < from)                 throw new Error("lol1");
    if(to > poly.vertices.length)   throw new Error("lol2");
    if(from < 0)                    throw new Error("lol3");

    for(var i=from; i<to; i++)***REMOVED***
        this.vertices.push(poly.vertices[i]);
    ***REMOVED***
***REMOVED***;

/**
 * Make sure that the polygon vertices are ordered counter-clockwise.
 * @method makeCCW
 */
Polygon.prototype.makeCCW = function()***REMOVED***
    var br = 0,
        v = this.vertices;

    // find bottom right point
    for (var i = 1; i < this.vertices.length; ++i) ***REMOVED***
        if (v[i][1] < v[br][1] || (v[i][1] == v[br][1] && v[i][0] > v[br][0])) ***REMOVED***
            br = i;
        ***REMOVED***
    ***REMOVED***

    // reverse poly if clockwise
    if (!Point.left(this.at(br - 1), this.at(br), this.at(br + 1))) ***REMOVED***
        this.reverse();
    ***REMOVED***
***REMOVED***;

/**
 * Reverse the vertices in the polygon
 * @method reverse
 */
Polygon.prototype.reverse = function()***REMOVED***
    var tmp = [];
    for(var i=0, N=this.vertices.length; i!==N; i++)***REMOVED***
        tmp.push(this.vertices.pop());
    ***REMOVED***
    this.vertices = tmp;
***REMOVED***;

/**
 * Check if a point in the polygon is a reflex point
 * @method isReflex
 * @param  ***REMOVED***Number***REMOVED***  i
 * @return ***REMOVED***Boolean***REMOVED***
 */
Polygon.prototype.isReflex = function(i)***REMOVED***
    return Point.right(this.at(i - 1), this.at(i), this.at(i + 1));
***REMOVED***;

var tmpLine1=[],
    tmpLine2=[];

/**
 * Check if two vertices in the polygon can see each other
 * @method canSee
 * @param  ***REMOVED***Number***REMOVED*** a Vertex index 1
 * @param  ***REMOVED***Number***REMOVED*** b Vertex index 2
 * @return ***REMOVED***Boolean***REMOVED***
 */
Polygon.prototype.canSee = function(a,b) ***REMOVED***
    var p, dist, l1=tmpLine1, l2=tmpLine2;

    if (Point.leftOn(this.at(a + 1), this.at(a), this.at(b)) && Point.rightOn(this.at(a - 1), this.at(a), this.at(b))) ***REMOVED***
        return false;
    ***REMOVED***
    dist = Point.sqdist(this.at(a), this.at(b));
    for (var i = 0; i !== this.vertices.length; ++i) ***REMOVED*** // for each edge
        if ((i + 1) % this.vertices.length === a || i === a) // ignore incident edges
            continue;
        if (Point.leftOn(this.at(a), this.at(b), this.at(i + 1)) && Point.rightOn(this.at(a), this.at(b), this.at(i))) ***REMOVED*** // if diag intersects an edge
            l1[0] = this.at(a);
            l1[1] = this.at(b);
            l2[0] = this.at(i);
            l2[1] = this.at(i + 1);
            p = Line.lineInt(l1,l2);
            if (Point.sqdist(this.at(a), p) < dist) ***REMOVED*** // if edge is blocking visibility to b
                return false;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return true;
***REMOVED***;

/**
 * Copy the polygon from vertex i to vertex j.
 * @method copy
 * @param  ***REMOVED***Number***REMOVED*** i
 * @param  ***REMOVED***Number***REMOVED*** j
 * @param  ***REMOVED***Polygon***REMOVED*** [targetPoly]   Optional target polygon to save in.
 * @return ***REMOVED***Polygon***REMOVED***                The resulting copy.
 */
Polygon.prototype.copy = function(i,j,targetPoly)***REMOVED***
    var p = targetPoly || new Polygon();
    p.clear();
    if (i < j) ***REMOVED***
        // Insert all vertices from i to j
        for(var k=i; k<=j; k++)
            p.vertices.push(this.vertices[k]);

    ***REMOVED*** else ***REMOVED***

        // Insert vertices 0 to j
        for(var k=0; k<=j; k++)
            p.vertices.push(this.vertices[k]);

        // Insert vertices i to end
        for(var k=i; k<this.vertices.length; k++)
            p.vertices.push(this.vertices[k]);
    ***REMOVED***

    return p;
***REMOVED***;

/**
 * Decomposes the polygon into convex pieces. Returns a list of edges [[p1,p2],[p2,p3],...] that cuts the polygon.
 * Note that this algorithm has complexity O(N^4) and will be very slow for polygons with many vertices.
 * @method getCutEdges
 * @return ***REMOVED***Array***REMOVED***
 */
Polygon.prototype.getCutEdges = function() ***REMOVED***
    var min=[], tmp1=[], tmp2=[], tmpPoly = new Polygon();
    var nDiags = Number.MAX_VALUE;

    for (var i = 0; i < this.vertices.length; ++i) ***REMOVED***
        if (this.isReflex(i)) ***REMOVED***
            for (var j = 0; j < this.vertices.length; ++j) ***REMOVED***
                if (this.canSee(i, j)) ***REMOVED***
                    tmp1 = this.copy(i, j, tmpPoly).getCutEdges();
                    tmp2 = this.copy(j, i, tmpPoly).getCutEdges();

                    for(var k=0; k<tmp2.length; k++)
                        tmp1.push(tmp2[k]);

                    if (tmp1.length < nDiags) ***REMOVED***
                        min = tmp1;
                        nDiags = tmp1.length;
                        min.push([this.at(i), this.at(j)]);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return min;
***REMOVED***;

/**
 * Decomposes the polygon into one or more convex sub-Polygons.
 * @method decomp
 * @return ***REMOVED***Array***REMOVED*** An array or Polygon objects.
 */
Polygon.prototype.decomp = function()***REMOVED***
    var edges = this.getCutEdges();
    if(edges.length > 0)
        return this.slice(edges);
    else
        return [this];
***REMOVED***;

/**
 * Slices the polygon given one or more cut edges. If given one, this function will return two polygons (false on failure). If many, an array of polygons.
 * @method slice
 * @param ***REMOVED***Array***REMOVED*** cutEdges A list of edges, as returned by .getCutEdges()
 * @return ***REMOVED***Array***REMOVED***
 */
Polygon.prototype.slice = function(cutEdges)***REMOVED***
    if(cutEdges.length == 0) return [this];
    if(cutEdges instanceof Array && cutEdges.length && cutEdges[0] instanceof Array && cutEdges[0].length==2 && cutEdges[0][0] instanceof Array)***REMOVED***

        var polys = [this];

        for(var i=0; i<cutEdges.length; i++)***REMOVED***
            var cutEdge = cutEdges[i];
            // Cut all polys
            for(var j=0; j<polys.length; j++)***REMOVED***
                var poly = polys[j];
                var result = poly.slice(cutEdge);
                if(result)***REMOVED***
                    // Found poly! Cut and quit
                    polys.splice(j,1);
                    polys.push(result[0],result[1]);
                    break;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return polys;
    ***REMOVED*** else ***REMOVED***

        // Was given one edge
        var cutEdge = cutEdges;
        var i = this.vertices.indexOf(cutEdge[0]);
        var j = this.vertices.indexOf(cutEdge[1]);

        if(i != -1 && j != -1)***REMOVED***
            return [this.copy(i,j),
                    this.copy(j,i)];
        ***REMOVED*** else ***REMOVED***
            return false;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

/**
 * Checks that the line segments of this polygon do not intersect each other.
 * @method isSimple
 * @param  ***REMOVED***Array***REMOVED*** path An array of vertices e.g. [[0,0],[0,1],...]
 * @return ***REMOVED***Boolean***REMOVED***
 * @todo Should it check all segments with all others?
 */
Polygon.prototype.isSimple = function()***REMOVED***
    var path = this.vertices;
    // Check
    for(var i=0; i<path.length-1; i++)***REMOVED***
        for(var j=0; j<i-1; j++)***REMOVED***
            if(Line.segmentsIntersect(path[i], path[i+1], path[j], path[j+1] ))***REMOVED***
                return false;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    // Check the segment between the last and the first point to all others
    for(var i=1; i<path.length-2; i++)***REMOVED***
        if(Line.segmentsIntersect(path[0], path[path.length-1], path[i], path[i+1] ))***REMOVED***
            return false;
        ***REMOVED***
    ***REMOVED***

    return true;
***REMOVED***;

function getIntersectionPoint(p1, p2, q1, q2, delta)***REMOVED***
    delta = delta || 0;
   var a1 = p2[1] - p1[1];
   var b1 = p1[0] - p2[0];
   var c1 = (a1 * p1[0]) + (b1 * p1[1]);
   var a2 = q2[1] - q1[1];
   var b2 = q1[0] - q2[0];
   var c2 = (a2 * q1[0]) + (b2 * q1[1]);
   var det = (a1 * b2) - (a2 * b1);

   if(!Scalar.eq(det,0,delta))
      return [((b2 * c1) - (b1 * c2)) / det, ((a1 * c2) - (a2 * c1)) / det]
   else
      return [0,0]
***REMOVED***

/**
 * Quickly decompose the Polygon into convex sub-polygons.
 * @method quickDecomp
 * @param  ***REMOVED***Array***REMOVED*** result
 * @param  ***REMOVED***Array***REMOVED*** [reflexVertices]
 * @param  ***REMOVED***Array***REMOVED*** [steinerPoints]
 * @param  ***REMOVED***Number***REMOVED*** [delta]
 * @param  ***REMOVED***Number***REMOVED*** [maxlevel]
 * @param  ***REMOVED***Number***REMOVED*** [level]
 * @return ***REMOVED***Array***REMOVED***
 */
Polygon.prototype.quickDecomp = function(result,reflexVertices,steinerPoints,delta,maxlevel,level)***REMOVED***
    maxlevel = maxlevel || 100;
    level = level || 0;
    delta = delta || 25;
    result = typeof(result)!="undefined" ? result : [];
    reflexVertices = reflexVertices || [];
    steinerPoints = steinerPoints || [];

    var upperInt=[0,0], lowerInt=[0,0], p=[0,0]; // Points
    var upperDist=0, lowerDist=0, d=0, closestDist=0; // scalars
    var upperIndex=0, lowerIndex=0, closestIndex=0; // Integers
    var lowerPoly=new Polygon(), upperPoly=new Polygon(); // polygons
    var poly = this,
        v = this.vertices;

    if(v.length < 3) return result;

    level++;
    if(level > maxlevel)***REMOVED***
        console.warn("quickDecomp: max level ("+maxlevel+") reached.");
        return result;
    ***REMOVED***

    for (var i = 0; i < this.vertices.length; ++i) ***REMOVED***
        if (poly.isReflex(i)) ***REMOVED***
            reflexVertices.push(poly.vertices[i]);
            upperDist = lowerDist = Number.MAX_VALUE;


            for (var j = 0; j < this.vertices.length; ++j) ***REMOVED***
                if (Point.left(poly.at(i - 1), poly.at(i), poly.at(j))
                        && Point.rightOn(poly.at(i - 1), poly.at(i), poly.at(j - 1))) ***REMOVED*** // if line intersects with an edge
                    p = getIntersectionPoint(poly.at(i - 1), poly.at(i), poly.at(j), poly.at(j - 1)); // find the point of intersection
                    if (Point.right(poly.at(i + 1), poly.at(i), p)) ***REMOVED*** // make sure it's inside the poly
                        d = Point.sqdist(poly.vertices[i], p);
                        if (d < lowerDist) ***REMOVED*** // keep only the closest intersection
                            lowerDist = d;
                            lowerInt = p;
                            lowerIndex = j;
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
                if (Point.left(poly.at(i + 1), poly.at(i), poly.at(j + 1))
                        && Point.rightOn(poly.at(i + 1), poly.at(i), poly.at(j))) ***REMOVED***
                    p = getIntersectionPoint(poly.at(i + 1), poly.at(i), poly.at(j), poly.at(j + 1));
                    if (Point.left(poly.at(i - 1), poly.at(i), p)) ***REMOVED***
                        d = Point.sqdist(poly.vertices[i], p);
                        if (d < upperDist) ***REMOVED***
                            upperDist = d;
                            upperInt = p;
                            upperIndex = j;
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***

            // if there are no vertices to connect to, choose a point in the middle
            if (lowerIndex == (upperIndex + 1) % this.vertices.length) ***REMOVED***
                //console.log("Case 1: Vertex("+i+"), lowerIndex("+lowerIndex+"), upperIndex("+upperIndex+"), poly.size("+this.vertices.length+")");
                p[0] = (lowerInt[0] + upperInt[0]) / 2;
                p[1] = (lowerInt[1] + upperInt[1]) / 2;
                steinerPoints.push(p);

                if (i < upperIndex) ***REMOVED***
                    //lowerPoly.insert(lowerPoly.end(), poly.begin() + i, poly.begin() + upperIndex + 1);
                    lowerPoly.append(poly, i, upperIndex+1);
                    lowerPoly.vertices.push(p);
                    upperPoly.vertices.push(p);
                    if (lowerIndex != 0)***REMOVED***
                        //upperPoly.insert(upperPoly.end(), poly.begin() + lowerIndex, poly.end());
                        upperPoly.append(poly,lowerIndex,poly.vertices.length);
                    ***REMOVED***
                    //upperPoly.insert(upperPoly.end(), poly.begin(), poly.begin() + i + 1);
                    upperPoly.append(poly,0,i+1);
                ***REMOVED*** else ***REMOVED***
                    if (i != 0)***REMOVED***
                        //lowerPoly.insert(lowerPoly.end(), poly.begin() + i, poly.end());
                        lowerPoly.append(poly,i,poly.vertices.length);
                    ***REMOVED***
                    //lowerPoly.insert(lowerPoly.end(), poly.begin(), poly.begin() + upperIndex + 1);
                    lowerPoly.append(poly,0,upperIndex+1);
                    lowerPoly.vertices.push(p);
                    upperPoly.vertices.push(p);
                    //upperPoly.insert(upperPoly.end(), poly.begin() + lowerIndex, poly.begin() + i + 1);
                    upperPoly.append(poly,lowerIndex,i+1);
                ***REMOVED***
            ***REMOVED*** else ***REMOVED***
                // connect to the closest point within the triangle
                //console.log("Case 2: Vertex("+i+"), closestIndex("+closestIndex+"), poly.size("+this.vertices.length+")\n");

                if (lowerIndex > upperIndex) ***REMOVED***
                    upperIndex += this.vertices.length;
                ***REMOVED***
                closestDist = Number.MAX_VALUE;

                if(upperIndex < lowerIndex)***REMOVED***
                    return result;
                ***REMOVED***

                for (var j = lowerIndex; j <= upperIndex; ++j) ***REMOVED***
                    if (Point.leftOn(poly.at(i - 1), poly.at(i), poly.at(j))
                            && Point.rightOn(poly.at(i + 1), poly.at(i), poly.at(j))) ***REMOVED***
                        d = Point.sqdist(poly.at(i), poly.at(j));
                        if (d < closestDist) ***REMOVED***
                            closestDist = d;
                            closestIndex = j % this.vertices.length;
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***

                if (i < closestIndex) ***REMOVED***
                    lowerPoly.append(poly,i,closestIndex+1);
                    if (closestIndex != 0)***REMOVED***
                        upperPoly.append(poly,closestIndex,v.length);
                    ***REMOVED***
                    upperPoly.append(poly,0,i+1);
                ***REMOVED*** else ***REMOVED***
                    if (i != 0)***REMOVED***
                        lowerPoly.append(poly,i,v.length);
                    ***REMOVED***
                    lowerPoly.append(poly,0,closestIndex+1);
                    upperPoly.append(poly,closestIndex,i+1);
                ***REMOVED***
            ***REMOVED***

            // solve smallest poly first
            if (lowerPoly.vertices.length < upperPoly.vertices.length) ***REMOVED***
                lowerPoly.quickDecomp(result,reflexVertices,steinerPoints,delta,maxlevel,level);
                upperPoly.quickDecomp(result,reflexVertices,steinerPoints,delta,maxlevel,level);
            ***REMOVED*** else ***REMOVED***
                upperPoly.quickDecomp(result,reflexVertices,steinerPoints,delta,maxlevel,level);
                lowerPoly.quickDecomp(result,reflexVertices,steinerPoints,delta,maxlevel,level);
            ***REMOVED***

            return result;
        ***REMOVED***
    ***REMOVED***
    result.push(this);

    return result;
***REMOVED***;

/**
 * Remove collinear points in the polygon.
 * @method removeCollinearPoints
 * @param  ***REMOVED***Number***REMOVED*** [precision] The threshold angle to use when determining whether two edges are collinear. Use zero for finest precision.
 * @return ***REMOVED***Number***REMOVED***           The number of points removed
 */
Polygon.prototype.removeCollinearPoints = function(precision)***REMOVED***
    var num = 0;
    for(var i=this.vertices.length-1; this.vertices.length>3 && i>=0; --i)***REMOVED***
        if(Point.collinear(this.at(i-1),this.at(i),this.at(i+1),precision))***REMOVED***
            // Remove the middle point
            this.vertices.splice(i%this.vertices.length,1);
            i--; // Jump one point forward. Otherwise we may get a chain removal
            num++;
        ***REMOVED***
    ***REMOVED***
    return num;
***REMOVED***;

***REMOVED***,***REMOVED***"./Line":1,"./Point":2,"./Scalar":4***REMOVED***],4:[function(_dereq_,module,exports)***REMOVED***
module.exports = Scalar;

/**
 * Scalar functions
 * @class Scalar
 */
function Scalar()***REMOVED******REMOVED***

/**
 * Check if two scalars are equal
 * @static
 * @method eq
 * @param  ***REMOVED***Number***REMOVED*** a
 * @param  ***REMOVED***Number***REMOVED*** b
 * @param  ***REMOVED***Number***REMOVED*** [precision]
 * @return ***REMOVED***Boolean***REMOVED***
 */
Scalar.eq = function(a,b,precision)***REMOVED***
    precision = precision || 0;
    return Math.abs(a-b) < precision;
***REMOVED***;

***REMOVED***,***REMOVED******REMOVED***],5:[function(_dereq_,module,exports)***REMOVED***
module.exports = ***REMOVED***
    Polygon : _dereq_("./Polygon"),
    Point : _dereq_("./Point"),
***REMOVED***;

***REMOVED***,***REMOVED***"./Point":2,"./Polygon":3***REMOVED***],6:[function(_dereq_,module,exports)***REMOVED***
module.exports=***REMOVED***
  "name": "p2",
  "version": "0.7.0",
  "description": "A JavaScript 2D physics engine.",
  "author": "Stefan Hedman <schteppe@gmail.com> (http://steffe.se)",
  "keywords": [
    "p2.js",
    "p2",
    "physics",
    "engine",
    "2d"
  ],
  "main": "./src/p2.js",
  "engines": ***REMOVED***
    "node": "*"
  ***REMOVED***,
  "repository": ***REMOVED***
    "type": "git",
    "url": "https://github.com/schteppe/p2.js.git"
  ***REMOVED***,
  "bugs": ***REMOVED***
    "url": "https://github.com/schteppe/p2.js/issues"
  ***REMOVED***,
  "licenses": [
    ***REMOVED***
      "type": "MIT"
    ***REMOVED***
  ],
  "devDependencies": ***REMOVED***
    "grunt": "^0.4.5",
    "grunt-contrib-jshint": "^0.11.2",
    "grunt-contrib-nodeunit": "^0.4.1",
    "grunt-contrib-uglify": "~0.4.0",
    "grunt-contrib-watch": "~0.5.0",
    "grunt-browserify": "~2.0.1",
    "grunt-contrib-concat": "^0.4.0"
  ***REMOVED***,
  "dependencies": ***REMOVED***
    "poly-decomp": "0.1.0"
  ***REMOVED***
***REMOVED***

***REMOVED***,***REMOVED******REMOVED***],7:[function(_dereq_,module,exports)***REMOVED***
var vec2 = _dereq_('../math/vec2')
,   Utils = _dereq_('../utils/Utils');

module.exports = AABB;

/**
 * Axis aligned bounding box class.
 * @class AABB
 * @constructor
 * @param ***REMOVED***Object***REMOVED***  [options]
 * @param ***REMOVED***Array***REMOVED***   [options.upperBound]
 * @param ***REMOVED***Array***REMOVED***   [options.lowerBound]
 */
function AABB(options)***REMOVED***

    /**
     * The lower bound of the bounding box.
     * @property lowerBound
     * @type ***REMOVED***Array***REMOVED***
     */
    this.lowerBound = vec2.create();
    if(options && options.lowerBound)***REMOVED***
        vec2.copy(this.lowerBound, options.lowerBound);
    ***REMOVED***

    /**
     * The upper bound of the bounding box.
     * @property upperBound
     * @type ***REMOVED***Array***REMOVED***
     */
    this.upperBound = vec2.create();
    if(options && options.upperBound)***REMOVED***
        vec2.copy(this.upperBound, options.upperBound);
    ***REMOVED***
***REMOVED***

var tmp = vec2.create();

/**
 * Set the AABB bounds from a set of points, transformed by the given position and angle.
 * @method setFromPoints
 * @param ***REMOVED***Array***REMOVED*** points An array of vec2's.
 * @param ***REMOVED***Array***REMOVED*** position
 * @param ***REMOVED***number***REMOVED*** angle
 * @param ***REMOVED***number***REMOVED*** skinSize Some margin to be added to the AABB.
 */
AABB.prototype.setFromPoints = function(points, position, angle, skinSize)***REMOVED***
    var l = this.lowerBound,
        u = this.upperBound;

    if(typeof(angle) !== "number")***REMOVED***
        angle = 0;
    ***REMOVED***

    // Set to the first point
    if(angle !== 0)***REMOVED***
        vec2.rotate(l, points[0], angle);
    ***REMOVED*** else ***REMOVED***
        vec2.copy(l, points[0]);
    ***REMOVED***
    vec2.copy(u, l);

    // Compute cosines and sines just once
    var cosAngle = Math.cos(angle),
        sinAngle = Math.sin(angle);
    for(var i = 1; i<points.length; i++)***REMOVED***
        var p = points[i];

        if(angle !== 0)***REMOVED***
            var x = p[0],
                y = p[1];
            tmp[0] = cosAngle * x -sinAngle * y;
            tmp[1] = sinAngle * x +cosAngle * y;
            p = tmp;
        ***REMOVED***

        for(var j=0; j<2; j++)***REMOVED***
            if(p[j] > u[j])***REMOVED***
                u[j] = p[j];
            ***REMOVED***
            if(p[j] < l[j])***REMOVED***
                l[j] = p[j];
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    // Add offset
    if(position)***REMOVED***
        vec2.add(this.lowerBound, this.lowerBound, position);
        vec2.add(this.upperBound, this.upperBound, position);
    ***REMOVED***

    if(skinSize)***REMOVED***
        this.lowerBound[0] -= skinSize;
        this.lowerBound[1] -= skinSize;
        this.upperBound[0] += skinSize;
        this.upperBound[1] += skinSize;
    ***REMOVED***
***REMOVED***;

/**
 * Copy bounds from an AABB to this AABB
 * @method copy
 * @param  ***REMOVED***AABB***REMOVED*** aabb
 */
AABB.prototype.copy = function(aabb)***REMOVED***
    vec2.copy(this.lowerBound, aabb.lowerBound);
    vec2.copy(this.upperBound, aabb.upperBound);
***REMOVED***;

/**
 * Extend this AABB so that it covers the given AABB too.
 * @method extend
 * @param  ***REMOVED***AABB***REMOVED*** aabb
 */
AABB.prototype.extend = function(aabb)***REMOVED***
    // Loop over x and y
    var i = 2;
    while(i--)***REMOVED***
        // Extend lower bound
        var l = aabb.lowerBound[i];
        if(this.lowerBound[i] > l)***REMOVED***
            this.lowerBound[i] = l;
        ***REMOVED***

        // Upper
        var u = aabb.upperBound[i];
        if(this.upperBound[i] < u)***REMOVED***
            this.upperBound[i] = u;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

/**
 * Returns true if the given AABB overlaps this AABB.
 * @method overlaps
 * @param  ***REMOVED***AABB***REMOVED*** aabb
 * @return ***REMOVED***Boolean***REMOVED***
 */
AABB.prototype.overlaps = function(aabb)***REMOVED***
    var l1 = this.lowerBound,
        u1 = this.upperBound,
        l2 = aabb.lowerBound,
        u2 = aabb.upperBound;

    //      l2        u2
    //      |---------|
    // |--------|
    // l1       u1

    return ((l2[0] <= u1[0] && u1[0] <= u2[0]) || (l1[0] <= u2[0] && u2[0] <= u1[0])) &&
           ((l2[1] <= u1[1] && u1[1] <= u2[1]) || (l1[1] <= u2[1] && u2[1] <= u1[1]));
***REMOVED***;

/**
 * @method containsPoint
 * @param  ***REMOVED***Array***REMOVED*** point
 * @return ***REMOVED***boolean***REMOVED***
 */
AABB.prototype.containsPoint = function(point)***REMOVED***
    var l = this.lowerBound,
        u = this.upperBound;
    return l[0] <= point[0] && point[0] <= u[0] && l[1] <= point[1] && point[1] <= u[1];
***REMOVED***;

/**
 * Check if the AABB is hit by a ray.
 * @method overlapsRay
 * @param  ***REMOVED***Ray***REMOVED*** ray
 * @return ***REMOVED***number***REMOVED*** -1 if no hit, a number between 0 and 1 if hit.
 */
AABB.prototype.overlapsRay = function(ray)***REMOVED***
    var t = 0;

    // ray.direction is unit direction vector of ray
    var dirFracX = 1 / ray.direction[0];
    var dirFracY = 1 / ray.direction[1];

    // this.lowerBound is the corner of AABB with minimal coordinates - left bottom, rt is maximal corner
    var t1 = (this.lowerBound[0] - ray.from[0]) * dirFracX;
    var t2 = (this.upperBound[0] - ray.from[0]) * dirFracX;
    var t3 = (this.lowerBound[1] - ray.from[1]) * dirFracY;
    var t4 = (this.upperBound[1] - ray.from[1]) * dirFracY;

    var tmin = Math.max(Math.max(Math.min(t1, t2), Math.min(t3, t4)));
    var tmax = Math.min(Math.min(Math.max(t1, t2), Math.max(t3, t4)));

    // if tmax < 0, ray (line) is intersecting AABB, but whole AABB is behing us
    if (tmax < 0)***REMOVED***
        //t = tmax;
        return -1;
    ***REMOVED***

    // if tmin > tmax, ray doesn't intersect AABB
    if (tmin > tmax)***REMOVED***
        //t = tmax;
        return -1;
    ***REMOVED***

    return tmin;
***REMOVED***;
***REMOVED***,***REMOVED***"../math/vec2":30,"../utils/Utils":57***REMOVED***],8:[function(_dereq_,module,exports)***REMOVED***
var vec2 = _dereq_('../math/vec2');
var Body = _dereq_('../objects/Body');

module.exports = Broadphase;

/**
 * Base class for broadphase implementations.
 * @class Broadphase
 * @constructor
 */
function Broadphase(type)***REMOVED***

    this.type = type;

    /**
     * The resulting overlapping pairs. Will be filled with results during .getCollisionPairs().
     * @property result
     * @type ***REMOVED***Array***REMOVED***
     */
    this.result = [];

    /**
     * The world to search for collision pairs in. To change it, use .setWorld()
     * @property world
     * @type ***REMOVED***World***REMOVED***
     * @readOnly
     */
    this.world = null;

    /**
     * The bounding volume type to use in the broadphase algorithms. Should be set to Broadphase.AABB or Broadphase.BOUNDING_CIRCLE.
     * @property ***REMOVED***Number***REMOVED*** boundingVolumeType
     */
    this.boundingVolumeType = Broadphase.AABB;
***REMOVED***

/**
 * Axis aligned bounding box type.
 * @static
 * @property ***REMOVED***Number***REMOVED*** AABB
 */
Broadphase.AABB = 1;

/**
 * Bounding circle type.
 * @static
 * @property ***REMOVED***Number***REMOVED*** BOUNDING_CIRCLE
 */
Broadphase.BOUNDING_CIRCLE = 2;

/**
 * Set the world that we are searching for collision pairs in.
 * @method setWorld
 * @param  ***REMOVED***World***REMOVED*** world
 */
Broadphase.prototype.setWorld = function(world)***REMOVED***
    this.world = world;
***REMOVED***;

/**
 * Get all potential intersecting body pairs.
 * @method getCollisionPairs
 * @param  ***REMOVED***World***REMOVED*** world The world to search in.
 * @return ***REMOVED***Array***REMOVED*** An array of the bodies, ordered in pairs. Example: A result of [a,b,c,d] means that the potential pairs are: (a,b), (c,d).
 */
Broadphase.prototype.getCollisionPairs = function(world)***REMOVED******REMOVED***;

var dist = vec2.create();

/**
 * Check whether the bounding radius of two bodies overlap.
 * @method  boundingRadiusCheck
 * @param  ***REMOVED***Body***REMOVED*** bodyA
 * @param  ***REMOVED***Body***REMOVED*** bodyB
 * @return ***REMOVED***Boolean***REMOVED***
 */
Broadphase.boundingRadiusCheck = function(bodyA, bodyB)***REMOVED***
    vec2.sub(dist, bodyA.position, bodyB.position);
    var d2 = vec2.squaredLength(dist),
        r = bodyA.boundingRadius + bodyB.boundingRadius;
    return d2 <= r*r;
***REMOVED***;

/**
 * Check whether the bounding radius of two bodies overlap.
 * @method  boundingRadiusCheck
 * @param  ***REMOVED***Body***REMOVED*** bodyA
 * @param  ***REMOVED***Body***REMOVED*** bodyB
 * @return ***REMOVED***Boolean***REMOVED***
 */
Broadphase.aabbCheck = function(bodyA, bodyB)***REMOVED***
    return bodyA.getAABB().overlaps(bodyB.getAABB());
***REMOVED***;

/**
 * Check whether the bounding radius of two bodies overlap.
 * @method  boundingRadiusCheck
 * @param  ***REMOVED***Body***REMOVED*** bodyA
 * @param  ***REMOVED***Body***REMOVED*** bodyB
 * @return ***REMOVED***Boolean***REMOVED***
 */
Broadphase.prototype.boundingVolumeCheck = function(bodyA, bodyB)***REMOVED***
    var result;

    switch(this.boundingVolumeType)***REMOVED***
    case Broadphase.BOUNDING_CIRCLE:
        result =  Broadphase.boundingRadiusCheck(bodyA,bodyB);
        break;
    case Broadphase.AABB:
        result = Broadphase.aabbCheck(bodyA,bodyB);
        break;
    default:
        throw new Error('Bounding volume type not recognized: '+this.boundingVolumeType);
    ***REMOVED***
    return result;
***REMOVED***;

/**
 * Check whether two bodies are allowed to collide at all.
 * @method  canCollide
 * @param  ***REMOVED***Body***REMOVED*** bodyA
 * @param  ***REMOVED***Body***REMOVED*** bodyB
 * @return ***REMOVED***Boolean***REMOVED***
 */
Broadphase.canCollide = function(bodyA, bodyB)***REMOVED***
    var KINEMATIC = Body.KINEMATIC;
    var STATIC = Body.STATIC;

    // Cannot collide static bodies
    if(bodyA.type === STATIC && bodyB.type === STATIC)***REMOVED***
        return false;
    ***REMOVED***

    // Cannot collide static vs kinematic bodies
    if( (bodyA.type === KINEMATIC && bodyB.type === STATIC) ||
        (bodyA.type === STATIC    && bodyB.type === KINEMATIC))***REMOVED***
        return false;
    ***REMOVED***

    // Cannot collide kinematic vs kinematic
    if(bodyA.type === KINEMATIC && bodyB.type === KINEMATIC)***REMOVED***
        return false;
    ***REMOVED***

    // Cannot collide both sleeping bodies
    if(bodyA.sleepState === Body.SLEEPING && bodyB.sleepState === Body.SLEEPING)***REMOVED***
        return false;
    ***REMOVED***

    // Cannot collide if one is static and the other is sleeping
    if( (bodyA.sleepState === Body.SLEEPING && bodyB.type === STATIC) ||
        (bodyB.sleepState === Body.SLEEPING && bodyA.type === STATIC))***REMOVED***
        return false;
    ***REMOVED***

    return true;
***REMOVED***;

Broadphase.NAIVE = 1;
Broadphase.SAP = 2;

***REMOVED***,***REMOVED***"../math/vec2":30,"../objects/Body":31***REMOVED***],9:[function(_dereq_,module,exports)***REMOVED***
var Circle = _dereq_('../shapes/Circle'),
    Plane = _dereq_('../shapes/Plane'),
    Shape = _dereq_('../shapes/Shape'),
    Particle = _dereq_('../shapes/Particle'),
    Broadphase = _dereq_('../collision/Broadphase'),
    vec2 = _dereq_('../math/vec2');

module.exports = NaiveBroadphase;

/**
 * Naive broadphase implementation. Does N^2 tests.
 *
 * @class NaiveBroadphase
 * @constructor
 * @extends Broadphase
 */
function NaiveBroadphase()***REMOVED***
    Broadphase.call(this, Broadphase.NAIVE);
***REMOVED***
NaiveBroadphase.prototype = new Broadphase();
NaiveBroadphase.prototype.constructor = NaiveBroadphase;

/**
 * Get the colliding pairs
 * @method getCollisionPairs
 * @param  ***REMOVED***World***REMOVED*** world
 * @return ***REMOVED***Array***REMOVED***
 */
NaiveBroadphase.prototype.getCollisionPairs = function(world)***REMOVED***
    var bodies = world.bodies,
        result = this.result;

    result.length = 0;

    for(var i=0, Ncolliding=bodies.length; i!==Ncolliding; i++)***REMOVED***
        var bi = bodies[i];

        for(var j=0; j<i; j++)***REMOVED***
            var bj = bodies[j];

            if(Broadphase.canCollide(bi,bj) && this.boundingVolumeCheck(bi,bj))***REMOVED***
                result.push(bi,bj);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return result;
***REMOVED***;

/**
 * Returns all the bodies within an AABB.
 * @method aabbQuery
 * @param  ***REMOVED***World***REMOVED*** world
 * @param  ***REMOVED***AABB***REMOVED*** aabb
 * @param ***REMOVED***array***REMOVED*** result An array to store resulting bodies in.
 * @return ***REMOVED***array***REMOVED***
 */
NaiveBroadphase.prototype.aabbQuery = function(world, aabb, result)***REMOVED***
    result = result || [];

    var bodies = world.bodies;
    for(var i = 0; i < bodies.length; i++)***REMOVED***
        var b = bodies[i];

        if(b.aabbNeedsUpdate)***REMOVED***
            b.updateAABB();
        ***REMOVED***

        if(b.aabb.overlaps(aabb))***REMOVED***
            result.push(b);
        ***REMOVED***
    ***REMOVED***

    return result;
***REMOVED***;
***REMOVED***,***REMOVED***"../collision/Broadphase":8,"../math/vec2":30,"../shapes/Circle":39,"../shapes/Particle":43,"../shapes/Plane":44,"../shapes/Shape":45***REMOVED***],10:[function(_dereq_,module,exports)***REMOVED***
var vec2 = _dereq_('../math/vec2')
,   sub = vec2.sub
,   add = vec2.add
,   dot = vec2.dot
,   Utils = _dereq_('../utils/Utils')
,   ContactEquationPool = _dereq_('../utils/ContactEquationPool')
,   FrictionEquationPool = _dereq_('../utils/FrictionEquationPool')
,   TupleDictionary = _dereq_('../utils/TupleDictionary')
,   Equation = _dereq_('../equations/Equation')
,   ContactEquation = _dereq_('../equations/ContactEquation')
,   FrictionEquation = _dereq_('../equations/FrictionEquation')
,   Circle = _dereq_('../shapes/Circle')
,   Convex = _dereq_('../shapes/Convex')
,   Shape = _dereq_('../shapes/Shape')
,   Body = _dereq_('../objects/Body')
,   Box = _dereq_('../shapes/Box');

module.exports = Narrowphase;

// Temp things
var yAxis = vec2.fromValues(0,1);

var tmp1 = vec2.fromValues(0,0)
,   tmp2 = vec2.fromValues(0,0)
,   tmp3 = vec2.fromValues(0,0)
,   tmp4 = vec2.fromValues(0,0)
,   tmp5 = vec2.fromValues(0,0)
,   tmp6 = vec2.fromValues(0,0)
,   tmp7 = vec2.fromValues(0,0)
,   tmp8 = vec2.fromValues(0,0)
,   tmp9 = vec2.fromValues(0,0)
,   tmp10 = vec2.fromValues(0,0)
,   tmp11 = vec2.fromValues(0,0)
,   tmp12 = vec2.fromValues(0,0)
,   tmp13 = vec2.fromValues(0,0)
,   tmp14 = vec2.fromValues(0,0)
,   tmp15 = vec2.fromValues(0,0)
,   tmp16 = vec2.fromValues(0,0)
,   tmp17 = vec2.fromValues(0,0)
,   tmp18 = vec2.fromValues(0,0)
,   tmpArray = [];

/**
 * Narrowphase. Creates contacts and friction given shapes and transforms.
 * @class Narrowphase
 * @constructor
 */
function Narrowphase()***REMOVED***

    /**
     * @property contactEquations
     * @type ***REMOVED***Array***REMOVED***
     */
    this.contactEquations = [];

    /**
     * @property frictionEquations
     * @type ***REMOVED***Array***REMOVED***
     */
    this.frictionEquations = [];

    /**
     * Whether to make friction equations in the upcoming contacts.
     * @property enableFriction
     * @type ***REMOVED***Boolean***REMOVED***
     */
    this.enableFriction = true;

    /**
     * Whether to make equations enabled in upcoming contacts.
     * @property enabledEquations
     * @type ***REMOVED***Boolean***REMOVED***
     */
    this.enabledEquations = true;

    /**
     * The friction slip force to use when creating friction equations.
     * @property slipForce
     * @type ***REMOVED***Number***REMOVED***
     */
    this.slipForce = 10.0;

    /**
     * The friction value to use in the upcoming friction equations.
     * @property frictionCoefficient
     * @type ***REMOVED***Number***REMOVED***
     */
    this.frictionCoefficient = 0.3;

    /**
     * Will be the .relativeVelocity in each produced FrictionEquation.
     * @property ***REMOVED***Number***REMOVED*** surfaceVelocity
     */
    this.surfaceVelocity = 0;

    /**
     * Keeps track of the allocated ContactEquations.
     * @property ***REMOVED***ContactEquationPool***REMOVED*** contactEquationPool
     *
     * @example
     *
     *     // Allocate a few equations before starting the simulation.
     *     // This way, no contact objects need to be created on the fly in the game loop.
     *     world.narrowphase.contactEquationPool.resize(1024);
     *     world.narrowphase.frictionEquationPool.resize(1024);
     */
    this.contactEquationPool = new ContactEquationPool(***REMOVED*** size: 32 ***REMOVED***);

    /**
     * Keeps track of the allocated ContactEquations.
     * @property ***REMOVED***FrictionEquationPool***REMOVED*** frictionEquationPool
     */
    this.frictionEquationPool = new FrictionEquationPool(***REMOVED*** size: 64 ***REMOVED***);

    /**
     * The restitution value to use in the next contact equations.
     * @property restitution
     * @type ***REMOVED***Number***REMOVED***
     */
    this.restitution = 0;

    /**
     * The stiffness value to use in the next contact equations.
     * @property ***REMOVED***Number***REMOVED*** stiffness
     */
    this.stiffness = Equation.DEFAULT_STIFFNESS;

    /**
     * The stiffness value to use in the next contact equations.
     * @property ***REMOVED***Number***REMOVED*** stiffness
     */
    this.relaxation = Equation.DEFAULT_RELAXATION;

    /**
     * The stiffness value to use in the next friction equations.
     * @property frictionStiffness
     * @type ***REMOVED***Number***REMOVED***
     */
    this.frictionStiffness = Equation.DEFAULT_STIFFNESS;

    /**
     * The relaxation value to use in the next friction equations.
     * @property frictionRelaxation
     * @type ***REMOVED***Number***REMOVED***
     */
    this.frictionRelaxation = Equation.DEFAULT_RELAXATION;

    /**
     * Enable reduction of friction equations. If disabled, a box on a plane will generate 2 contact equations and 2 friction equations. If enabled, there will be only one friction equation. Same kind of simplifications are made  for all collision types.
     * @property enableFrictionReduction
     * @type ***REMOVED***Boolean***REMOVED***
     * @deprecated This flag will be removed when the feature is stable enough.
     * @default true
     */
    this.enableFrictionReduction = true;

    /**
     * Keeps track of the colliding bodies last step.
     * @private
     * @property collidingBodiesLastStep
     * @type ***REMOVED***TupleDictionary***REMOVED***
     */
    this.collidingBodiesLastStep = new TupleDictionary();

    /**
     * Contact skin size value to use in the next contact equations.
     * @property ***REMOVED***Number***REMOVED*** contactSkinSize
     * @default 0.01
     */
    this.contactSkinSize = 0.01;
***REMOVED***

var bodiesOverlap_shapePositionA = vec2.create();
var bodiesOverlap_shapePositionB = vec2.create();

/**
 * @method bodiesOverlap
 * @param  ***REMOVED***Body***REMOVED*** bodyA
 * @param  ***REMOVED***Body***REMOVED*** bodyB
 * @return ***REMOVED***Boolean***REMOVED***
 * @todo shape world transforms are wrong
 */
Narrowphase.prototype.bodiesOverlap = function(bodyA, bodyB)***REMOVED***
    var shapePositionA = bodiesOverlap_shapePositionA;
    var shapePositionB = bodiesOverlap_shapePositionB;

    // Loop over all shapes of bodyA
    for(var k=0, Nshapesi=bodyA.shapes.length; k!==Nshapesi; k++)***REMOVED***
        var shapeA = bodyA.shapes[k];

        bodyA.toWorldFrame(shapePositionA, shapeA.position);

        // All shapes of body j
        for(var l=0, Nshapesj=bodyB.shapes.length; l!==Nshapesj; l++)***REMOVED***
            var shapeB = bodyB.shapes[l];

            bodyB.toWorldFrame(shapePositionB, shapeB.position);

            if(this[shapeA.type | shapeB.type](
                bodyA,
                shapeA,
                shapePositionA,
                shapeA.angle + bodyA.angle,
                bodyB,
                shapeB,
                shapePositionB,
                shapeB.angle + bodyB.angle,
                true
            ))***REMOVED***
                return true;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return false;
***REMOVED***;

/**
 * Check if the bodies were in contact since the last reset().
 * @method collidedLastStep
 * @param  ***REMOVED***Body***REMOVED*** bodyA
 * @param  ***REMOVED***Body***REMOVED*** bodyB
 * @return ***REMOVED***Boolean***REMOVED***
 */
Narrowphase.prototype.collidedLastStep = function(bodyA, bodyB)***REMOVED***
    var id1 = bodyA.id|0,
        id2 = bodyB.id|0;
    return !!this.collidingBodiesLastStep.get(id1, id2);
***REMOVED***;

/**
 * Throws away the old equations and gets ready to create new
 * @method reset
 */
Narrowphase.prototype.reset = function()***REMOVED***
    this.collidingBodiesLastStep.reset();

    var eqs = this.contactEquations;
    var l = eqs.length;
    while(l--)***REMOVED***
        var eq = eqs[l],
            id1 = eq.bodyA.id,
            id2 = eq.bodyB.id;
        this.collidingBodiesLastStep.set(id1, id2, true);
    ***REMOVED***

    var ce = this.contactEquations,
        fe = this.frictionEquations;
    for(var i=0; i<ce.length; i++)***REMOVED***
        this.contactEquationPool.release(ce[i]);
    ***REMOVED***
    for(var i=0; i<fe.length; i++)***REMOVED***
        this.frictionEquationPool.release(fe[i]);
    ***REMOVED***

    // Reset
    this.contactEquations.length = this.frictionEquations.length = 0;
***REMOVED***;

/**
 * Creates a ContactEquation, either by reusing an existing object or creating a new one.
 * @method createContactEquation
 * @param  ***REMOVED***Body***REMOVED*** bodyA
 * @param  ***REMOVED***Body***REMOVED*** bodyB
 * @return ***REMOVED***ContactEquation***REMOVED***
 */
Narrowphase.prototype.createContactEquation = function(bodyA, bodyB, shapeA, shapeB)***REMOVED***
    var c = this.contactEquationPool.get();
    c.bodyA = bodyA;
    c.bodyB = bodyB;
    c.shapeA = shapeA;
    c.shapeB = shapeB;
    c.restitution = this.restitution;
    c.firstImpact = !this.collidedLastStep(bodyA,bodyB);
    c.stiffness = this.stiffness;
    c.relaxation = this.relaxation;
    c.needsUpdate = true;
    c.enabled = this.enabledEquations;
    c.offset = this.contactSkinSize;

    return c;
***REMOVED***;

/**
 * Creates a FrictionEquation, either by reusing an existing object or creating a new one.
 * @method createFrictionEquation
 * @param  ***REMOVED***Body***REMOVED*** bodyA
 * @param  ***REMOVED***Body***REMOVED*** bodyB
 * @return ***REMOVED***FrictionEquation***REMOVED***
 */
Narrowphase.prototype.createFrictionEquation = function(bodyA, bodyB, shapeA, shapeB)***REMOVED***
    var c = this.frictionEquationPool.get();
    c.bodyA = bodyA;
    c.bodyB = bodyB;
    c.shapeA = shapeA;
    c.shapeB = shapeB;
    c.setSlipForce(this.slipForce);
    c.frictionCoefficient = this.frictionCoefficient;
    c.relativeVelocity = this.surfaceVelocity;
    c.enabled = this.enabledEquations;
    c.needsUpdate = true;
    c.stiffness = this.frictionStiffness;
    c.relaxation = this.frictionRelaxation;
    c.contactEquations.length = 0;
    return c;
***REMOVED***;

/**
 * Creates a FrictionEquation given the data in the ContactEquation. Uses same offset vectors ri and rj, but the tangent vector will be constructed from the collision normal.
 * @method createFrictionFromContact
 * @param  ***REMOVED***ContactEquation***REMOVED*** contactEquation
 * @return ***REMOVED***FrictionEquation***REMOVED***
 */
Narrowphase.prototype.createFrictionFromContact = function(c)***REMOVED***
    var eq = this.createFrictionEquation(c.bodyA, c.bodyB, c.shapeA, c.shapeB);
    vec2.copy(eq.contactPointA, c.contactPointA);
    vec2.copy(eq.contactPointB, c.contactPointB);
    vec2.rotate90cw(eq.t, c.normalA);
    eq.contactEquations.push(c);
    return eq;
***REMOVED***;

// Take the average N latest contact point on the plane.
Narrowphase.prototype.createFrictionFromAverage = function(numContacts)***REMOVED***
    var c = this.contactEquations[this.contactEquations.length - 1];
    var eq = this.createFrictionEquation(c.bodyA, c.bodyB, c.shapeA, c.shapeB);
    var bodyA = c.bodyA;
    var bodyB = c.bodyB;
    vec2.set(eq.contactPointA, 0, 0);
    vec2.set(eq.contactPointB, 0, 0);
    vec2.set(eq.t, 0, 0);
    for(var i=0; i!==numContacts; i++)***REMOVED***
        c = this.contactEquations[this.contactEquations.length - 1 - i];
        if(c.bodyA === bodyA)***REMOVED***
            vec2.add(eq.t, eq.t, c.normalA);
            vec2.add(eq.contactPointA, eq.contactPointA, c.contactPointA);
            vec2.add(eq.contactPointB, eq.contactPointB, c.contactPointB);
        ***REMOVED*** else ***REMOVED***
            vec2.sub(eq.t, eq.t, c.normalA);
            vec2.add(eq.contactPointA, eq.contactPointA, c.contactPointB);
            vec2.add(eq.contactPointB, eq.contactPointB, c.contactPointA);
        ***REMOVED***
        eq.contactEquations.push(c);
    ***REMOVED***

    var invNumContacts = 1/numContacts;
    vec2.scale(eq.contactPointA, eq.contactPointA, invNumContacts);
    vec2.scale(eq.contactPointB, eq.contactPointB, invNumContacts);
    vec2.normalize(eq.t, eq.t);
    vec2.rotate90cw(eq.t, eq.t);
    return eq;
***REMOVED***;

/**
 * Convex/line narrowphase
 * @method convexLine
 * @param  ***REMOVED***Body***REMOVED***       convexBody
 * @param  ***REMOVED***Convex***REMOVED***     convexShape
 * @param  ***REMOVED***Array***REMOVED***      convexOffset
 * @param  ***REMOVED***Number***REMOVED***     convexAngle
 * @param  ***REMOVED***Body***REMOVED***       lineBody
 * @param  ***REMOVED***Line***REMOVED***       lineShape
 * @param  ***REMOVED***Array***REMOVED***      lineOffset
 * @param  ***REMOVED***Number***REMOVED***     lineAngle
 * @param ***REMOVED***boolean***REMOVED***     justTest
 * @todo Implement me!
 */
Narrowphase.prototype[Shape.LINE | Shape.CONVEX] =
Narrowphase.prototype.convexLine = function(
    convexBody,
    convexShape,
    convexOffset,
    convexAngle,
    lineBody,
    lineShape,
    lineOffset,
    lineAngle,
    justTest
)***REMOVED***
    // TODO
    if(justTest)***REMOVED***
        return false;
    ***REMOVED*** else ***REMOVED***
        return 0;
    ***REMOVED***
***REMOVED***;

/**
 * Line/box narrowphase
 * @method lineBox
 * @param  ***REMOVED***Body***REMOVED***       lineBody
 * @param  ***REMOVED***Line***REMOVED***       lineShape
 * @param  ***REMOVED***Array***REMOVED***      lineOffset
 * @param  ***REMOVED***Number***REMOVED***     lineAngle
 * @param  ***REMOVED***Body***REMOVED***       boxBody
 * @param  ***REMOVED***Box***REMOVED***  boxShape
 * @param  ***REMOVED***Array***REMOVED***      boxOffset
 * @param  ***REMOVED***Number***REMOVED***     boxAngle
 * @param  ***REMOVED***Boolean***REMOVED***    justTest
 * @todo Implement me!
 */
Narrowphase.prototype[Shape.LINE | Shape.BOX] =
Narrowphase.prototype.lineBox = function(
    lineBody,
    lineShape,
    lineOffset,
    lineAngle,
    boxBody,
    boxShape,
    boxOffset,
    boxAngle,
    justTest
)***REMOVED***
    // TODO
    if(justTest)***REMOVED***
        return false;
    ***REMOVED*** else ***REMOVED***
        return 0;
    ***REMOVED***
***REMOVED***;

function setConvexToCapsuleShapeMiddle(convexShape, capsuleShape)***REMOVED***
    vec2.set(convexShape.vertices[0], -capsuleShape.length * 0.5, -capsuleShape.radius);
    vec2.set(convexShape.vertices[1],  capsuleShape.length * 0.5, -capsuleShape.radius);
    vec2.set(convexShape.vertices[2],  capsuleShape.length * 0.5,  capsuleShape.radius);
    vec2.set(convexShape.vertices[3], -capsuleShape.length * 0.5,  capsuleShape.radius);
***REMOVED***

var convexCapsule_tempRect = new Box(***REMOVED*** width: 1, height: 1 ***REMOVED***),
    convexCapsule_tempVec = vec2.create();

/**
 * Convex/capsule narrowphase
 * @method convexCapsule
 * @param  ***REMOVED***Body***REMOVED***       convexBody
 * @param  ***REMOVED***Convex***REMOVED***     convexShape
 * @param  ***REMOVED***Array***REMOVED***      convexPosition
 * @param  ***REMOVED***Number***REMOVED***     convexAngle
 * @param  ***REMOVED***Body***REMOVED***       capsuleBody
 * @param  ***REMOVED***Capsule***REMOVED***    capsuleShape
 * @param  ***REMOVED***Array***REMOVED***      capsulePosition
 * @param  ***REMOVED***Number***REMOVED***     capsuleAngle
 */
Narrowphase.prototype[Shape.CAPSULE | Shape.CONVEX] =
Narrowphase.prototype[Shape.CAPSULE | Shape.BOX] =
Narrowphase.prototype.convexCapsule = function(
    convexBody,
    convexShape,
    convexPosition,
    convexAngle,
    capsuleBody,
    capsuleShape,
    capsulePosition,
    capsuleAngle,
    justTest
)***REMOVED***

    // Check the circles
    // Add offsets!
    var circlePos = convexCapsule_tempVec;
    vec2.set(circlePos, capsuleShape.length/2,0);
    vec2.rotate(circlePos,circlePos,capsuleAngle);
    vec2.add(circlePos,circlePos,capsulePosition);
    var result1 = this.circleConvex(capsuleBody,capsuleShape,circlePos,capsuleAngle, convexBody,convexShape,convexPosition,convexAngle, justTest, capsuleShape.radius);

    vec2.set(circlePos,-capsuleShape.length/2, 0);
    vec2.rotate(circlePos,circlePos,capsuleAngle);
    vec2.add(circlePos,circlePos,capsulePosition);
    var result2 = this.circleConvex(capsuleBody,capsuleShape,circlePos,capsuleAngle, convexBody,convexShape,convexPosition,convexAngle, justTest, capsuleShape.radius);

    if(justTest && (result1 || result2))***REMOVED***
        return true;
    ***REMOVED***

    // Check center rect
    var r = convexCapsule_tempRect;
    setConvexToCapsuleShapeMiddle(r,capsuleShape);
    var result = this.convexConvex(convexBody,convexShape,convexPosition,convexAngle, capsuleBody,r,capsulePosition,capsuleAngle, justTest);

    return result + result1 + result2;
***REMOVED***;

/**
 * Capsule/line narrowphase
 * @method lineCapsule
 * @param  ***REMOVED***Body***REMOVED***       lineBody
 * @param  ***REMOVED***Line***REMOVED***       lineShape
 * @param  ***REMOVED***Array***REMOVED***      linePosition
 * @param  ***REMOVED***Number***REMOVED***     lineAngle
 * @param  ***REMOVED***Body***REMOVED***       capsuleBody
 * @param  ***REMOVED***Capsule***REMOVED***    capsuleShape
 * @param  ***REMOVED***Array***REMOVED***      capsulePosition
 * @param  ***REMOVED***Number***REMOVED***     capsuleAngle
 * @todo Implement me!
 */
Narrowphase.prototype[Shape.CAPSULE | Shape.LINE] =
Narrowphase.prototype.lineCapsule = function(
    lineBody,
    lineShape,
    linePosition,
    lineAngle,
    capsuleBody,
    capsuleShape,
    capsulePosition,
    capsuleAngle,
    justTest
)***REMOVED***
    // TODO
    if(justTest)***REMOVED***
        return false;
    ***REMOVED*** else ***REMOVED***
        return 0;
    ***REMOVED***
***REMOVED***;

var capsuleCapsule_tempVec1 = vec2.create();
var capsuleCapsule_tempVec2 = vec2.create();
var capsuleCapsule_tempRect1 = new Box(***REMOVED*** width: 1, height: 1 ***REMOVED***);

/**
 * Capsule/capsule narrowphase
 * @method capsuleCapsule
 * @param  ***REMOVED***Body***REMOVED***       bi
 * @param  ***REMOVED***Capsule***REMOVED***    si
 * @param  ***REMOVED***Array***REMOVED***      xi
 * @param  ***REMOVED***Number***REMOVED***     ai
 * @param  ***REMOVED***Body***REMOVED***       bj
 * @param  ***REMOVED***Capsule***REMOVED***    sj
 * @param  ***REMOVED***Array***REMOVED***      xj
 * @param  ***REMOVED***Number***REMOVED***     aj
 */
Narrowphase.prototype[Shape.CAPSULE | Shape.CAPSULE] =
Narrowphase.prototype.capsuleCapsule = function(bi,si,xi,ai, bj,sj,xj,aj, justTest)***REMOVED***

    var enableFrictionBefore;

    // Check the circles
    // Add offsets!
    var circlePosi = capsuleCapsule_tempVec1,
        circlePosj = capsuleCapsule_tempVec2;

    var numContacts = 0;


    // Need 4 circle checks, between all
    for(var i=0; i<2; i++)***REMOVED***

        vec2.set(circlePosi,(i===0?-1:1)*si.length/2,0);
        vec2.rotate(circlePosi,circlePosi,ai);
        vec2.add(circlePosi,circlePosi,xi);

        for(var j=0; j<2; j++)***REMOVED***

            vec2.set(circlePosj,(j===0?-1:1)*sj.length/2, 0);
            vec2.rotate(circlePosj,circlePosj,aj);
            vec2.add(circlePosj,circlePosj,xj);

            // Temporarily turn off friction
            if(this.enableFrictionReduction)***REMOVED***
                enableFrictionBefore = this.enableFriction;
                this.enableFriction = false;
            ***REMOVED***

            var result = this.circleCircle(bi,si,circlePosi,ai, bj,sj,circlePosj,aj, justTest, si.radius, sj.radius);

            if(this.enableFrictionReduction)***REMOVED***
                this.enableFriction = enableFrictionBefore;
            ***REMOVED***

            if(justTest && result)***REMOVED***
                return true;
            ***REMOVED***

            numContacts += result;
        ***REMOVED***
    ***REMOVED***

    if(this.enableFrictionReduction)***REMOVED***
        // Temporarily turn off friction
        enableFrictionBefore = this.enableFriction;
        this.enableFriction = false;
    ***REMOVED***

    // Check circles against the center boxs
    var rect = capsuleCapsule_tempRect1;
    setConvexToCapsuleShapeMiddle(rect,si);
    var result1 = this.convexCapsule(bi,rect,xi,ai, bj,sj,xj,aj, justTest);

    if(this.enableFrictionReduction)***REMOVED***
        this.enableFriction = enableFrictionBefore;
    ***REMOVED***

    if(justTest && result1)***REMOVED***
        return true;
    ***REMOVED***
    numContacts += result1;

    if(this.enableFrictionReduction)***REMOVED***
        // Temporarily turn off friction
        var enableFrictionBefore = this.enableFriction;
        this.enableFriction = false;
    ***REMOVED***

    setConvexToCapsuleShapeMiddle(rect,sj);
    var result2 = this.convexCapsule(bj,rect,xj,aj, bi,si,xi,ai, justTest);

    if(this.enableFrictionReduction)***REMOVED***
        this.enableFriction = enableFrictionBefore;
    ***REMOVED***

    if(justTest && result2)***REMOVED***
        return true;
    ***REMOVED***
    numContacts += result2;

    if(this.enableFrictionReduction)***REMOVED***
        if(numContacts && this.enableFriction)***REMOVED***
            this.frictionEquations.push(this.createFrictionFromAverage(numContacts));
        ***REMOVED***
    ***REMOVED***

    return numContacts;
***REMOVED***;

/**
 * Line/line narrowphase
 * @method lineLine
 * @param  ***REMOVED***Body***REMOVED***       bodyA
 * @param  ***REMOVED***Line***REMOVED***       shapeA
 * @param  ***REMOVED***Array***REMOVED***      positionA
 * @param  ***REMOVED***Number***REMOVED***     angleA
 * @param  ***REMOVED***Body***REMOVED***       bodyB
 * @param  ***REMOVED***Line***REMOVED***       shapeB
 * @param  ***REMOVED***Array***REMOVED***      positionB
 * @param  ***REMOVED***Number***REMOVED***     angleB
 * @todo Implement me!
 */
Narrowphase.prototype[Shape.LINE | Shape.LINE] =
Narrowphase.prototype.lineLine = function(
    bodyA,
    shapeA,
    positionA,
    angleA,
    bodyB,
    shapeB,
    positionB,
    angleB,
    justTest
)***REMOVED***
    // TODO
    if(justTest)***REMOVED***
        return false;
    ***REMOVED*** else ***REMOVED***
        return 0;
    ***REMOVED***
***REMOVED***;

/**
 * Plane/line Narrowphase
 * @method planeLine
 * @param  ***REMOVED***Body***REMOVED***   planeBody
 * @param  ***REMOVED***Plane***REMOVED***  planeShape
 * @param  ***REMOVED***Array***REMOVED***  planeOffset
 * @param  ***REMOVED***Number***REMOVED*** planeAngle
 * @param  ***REMOVED***Body***REMOVED***   lineBody
 * @param  ***REMOVED***Line***REMOVED***   lineShape
 * @param  ***REMOVED***Array***REMOVED***  lineOffset
 * @param  ***REMOVED***Number***REMOVED*** lineAngle
 */
Narrowphase.prototype[Shape.PLANE | Shape.LINE] =
Narrowphase.prototype.planeLine = function(planeBody, planeShape, planeOffset, planeAngle,
                                           lineBody,  lineShape,  lineOffset,  lineAngle, justTest)***REMOVED***
    var worldVertex0 = tmp1,
        worldVertex1 = tmp2,
        worldVertex01 = tmp3,
        worldVertex11 = tmp4,
        worldEdge = tmp5,
        worldEdgeUnit = tmp6,
        dist = tmp7,
        worldNormal = tmp8,
        worldTangent = tmp9,
        verts = tmpArray,
        numContacts = 0;

    // Get start and end points
    vec2.set(worldVertex0, -lineShape.length/2, 0);
    vec2.set(worldVertex1,  lineShape.length/2, 0);

    // Not sure why we have to use worldVertex*1 here, but it won't work otherwise. Tired.
    vec2.rotate(worldVertex01, worldVertex0, lineAngle);
    vec2.rotate(worldVertex11, worldVertex1, lineAngle);

    add(worldVertex01, worldVertex01, lineOffset);
    add(worldVertex11, worldVertex11, lineOffset);

    vec2.copy(worldVertex0,worldVertex01);
    vec2.copy(worldVertex1,worldVertex11);

    // Get vector along the line
    sub(worldEdge, worldVertex1, worldVertex0);
    vec2.normalize(worldEdgeUnit, worldEdge);

    // Get tangent to the edge.
    vec2.rotate90cw(worldTangent, worldEdgeUnit);

    vec2.rotate(worldNormal, yAxis, planeAngle);

    // Check line ends
    verts[0] = worldVertex0;
    verts[1] = worldVertex1;
    for(var i=0; i<verts.length; i++)***REMOVED***
        var v = verts[i];

        sub(dist, v, planeOffset);

        var d = dot(dist,worldNormal);

        if(d < 0)***REMOVED***

            if(justTest)***REMOVED***
                return true;
            ***REMOVED***

            var c = this.createContactEquation(planeBody,lineBody,planeShape,lineShape);
            numContacts++;

            vec2.copy(c.normalA, worldNormal);
            vec2.normalize(c.normalA,c.normalA);

            // distance vector along plane normal
            vec2.scale(dist, worldNormal, d);

            // Vector from plane center to contact
            sub(c.contactPointA, v, dist);
            sub(c.contactPointA, c.contactPointA, planeBody.position);

            // From line center to contact
            sub(c.contactPointB, v,    lineOffset);
            add(c.contactPointB, c.contactPointB, lineOffset);
            sub(c.contactPointB, c.contactPointB, lineBody.position);

            this.contactEquations.push(c);

            if(!this.enableFrictionReduction)***REMOVED***
                if(this.enableFriction)***REMOVED***
                    this.frictionEquations.push(this.createFrictionFromContact(c));
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    if(justTest)***REMOVED***
        return false;
    ***REMOVED***

    if(!this.enableFrictionReduction)***REMOVED***
        if(numContacts && this.enableFriction)***REMOVED***
            this.frictionEquations.push(this.createFrictionFromAverage(numContacts));
        ***REMOVED***
    ***REMOVED***

    return numContacts;
***REMOVED***;

Narrowphase.prototype[Shape.PARTICLE | Shape.CAPSULE] =
Narrowphase.prototype.particleCapsule = function(
    particleBody,
    particleShape,
    particlePosition,
    particleAngle,
    capsuleBody,
    capsuleShape,
    capsulePosition,
    capsuleAngle,
    justTest
)***REMOVED***
    return this.circleLine(particleBody,particleShape,particlePosition,particleAngle, capsuleBody,capsuleShape,capsulePosition,capsuleAngle, justTest, capsuleShape.radius, 0);
***REMOVED***;

/**
 * Circle/line Narrowphase
 * @method circleLine
 * @param  ***REMOVED***Body***REMOVED*** circleBody
 * @param  ***REMOVED***Circle***REMOVED*** circleShape
 * @param  ***REMOVED***Array***REMOVED*** circleOffset
 * @param  ***REMOVED***Number***REMOVED*** circleAngle
 * @param  ***REMOVED***Body***REMOVED*** lineBody
 * @param  ***REMOVED***Line***REMOVED*** lineShape
 * @param  ***REMOVED***Array***REMOVED*** lineOffset
 * @param  ***REMOVED***Number***REMOVED*** lineAngle
 * @param ***REMOVED***Boolean***REMOVED*** justTest If set to true, this function will return the result (intersection or not) without adding equations.
 * @param ***REMOVED***Number***REMOVED*** lineRadius Radius to add to the line. Can be used to test Capsules.
 * @param ***REMOVED***Number***REMOVED*** circleRadius If set, this value overrides the circle shape radius.
 */
Narrowphase.prototype[Shape.CIRCLE | Shape.LINE] =
Narrowphase.prototype.circleLine = function(
    circleBody,
    circleShape,
    circleOffset,
    circleAngle,
    lineBody,
    lineShape,
    lineOffset,
    lineAngle,
    justTest,
    lineRadius,
    circleRadius
)***REMOVED***
    var lineRadius = lineRadius || 0,
        circleRadius = typeof(circleRadius)!=="undefined" ? circleRadius : circleShape.radius,

        orthoDist = tmp1,
        lineToCircleOrthoUnit = tmp2,
        projectedPoint = tmp3,
        centerDist = tmp4,
        worldTangent = tmp5,
        worldEdge = tmp6,
        worldEdgeUnit = tmp7,
        worldVertex0 = tmp8,
        worldVertex1 = tmp9,
        worldVertex01 = tmp10,
        worldVertex11 = tmp11,
        dist = tmp12,
        lineToCircle = tmp13,
        lineEndToLineRadius = tmp14,

        verts = tmpArray;

    // Get start and end points
    vec2.set(worldVertex0, -lineShape.length/2, 0);
    vec2.set(worldVertex1,  lineShape.length/2, 0);

    // Not sure why we have to use worldVertex*1 here, but it won't work otherwise. Tired.
    vec2.rotate(worldVertex01, worldVertex0, lineAngle);
    vec2.rotate(worldVertex11, worldVertex1, lineAngle);

    add(worldVertex01, worldVertex01, lineOffset);
    add(worldVertex11, worldVertex11, lineOffset);

    vec2.copy(worldVertex0,worldVertex01);
    vec2.copy(worldVertex1,worldVertex11);

    // Get vector along the line
    sub(worldEdge, worldVertex1, worldVertex0);
    vec2.normalize(worldEdgeUnit, worldEdge);

    // Get tangent to the edge.
    vec2.rotate90cw(worldTangent, worldEdgeUnit);

    // Check distance from the plane spanned by the edge vs the circle
    sub(dist, circleOffset, worldVertex0);
    var d = dot(dist, worldTangent); // Distance from center of line to circle center
    sub(centerDist, worldVertex0, lineOffset);

    sub(lineToCircle, circleOffset, lineOffset);

    var radiusSum = circleRadius + lineRadius;

    if(Math.abs(d) < radiusSum)***REMOVED***

        // Now project the circle onto the edge
        vec2.scale(orthoDist, worldTangent, d);
        sub(projectedPoint, circleOffset, orthoDist);

        // Add the missing line radius
        vec2.scale(lineToCircleOrthoUnit, worldTangent, dot(worldTangent, lineToCircle));
        vec2.normalize(lineToCircleOrthoUnit,lineToCircleOrthoUnit);
        vec2.scale(lineToCircleOrthoUnit, lineToCircleOrthoUnit, lineRadius);
        add(projectedPoint,projectedPoint,lineToCircleOrthoUnit);

        // Check if the point is within the edge span
        var pos =  dot(worldEdgeUnit, projectedPoint);
        var pos0 = dot(worldEdgeUnit, worldVertex0);
        var pos1 = dot(worldEdgeUnit, worldVertex1);

        if(pos > pos0 && pos < pos1)***REMOVED***
            // We got contact!

            if(justTest)***REMOVED***
                return true;
            ***REMOVED***

            var c = this.createContactEquation(circleBody,lineBody,circleShape,lineShape);

            vec2.scale(c.normalA, orthoDist, -1);
            vec2.normalize(c.normalA, c.normalA);

            vec2.scale( c.contactPointA, c.normalA,  circleRadius);
            add(c.contactPointA, c.contactPointA, circleOffset);
            sub(c.contactPointA, c.contactPointA, circleBody.position);

            sub(c.contactPointB, projectedPoint, lineOffset);
            add(c.contactPointB, c.contactPointB, lineOffset);
            sub(c.contactPointB, c.contactPointB, lineBody.position);

            this.contactEquations.push(c);

            if(this.enableFriction)***REMOVED***
                this.frictionEquations.push(this.createFrictionFromContact(c));
            ***REMOVED***

            return 1;
        ***REMOVED***
    ***REMOVED***

    // Add corner
    verts[0] = worldVertex0;
    verts[1] = worldVertex1;

    for(var i=0; i<verts.length; i++)***REMOVED***
        var v = verts[i];

        sub(dist, v, circleOffset);

        if(vec2.squaredLength(dist) < Math.pow(radiusSum, 2))***REMOVED***

            if(justTest)***REMOVED***
                return true;
            ***REMOVED***

            var c = this.createContactEquation(circleBody,lineBody,circleShape,lineShape);

            vec2.copy(c.normalA, dist);
            vec2.normalize(c.normalA,c.normalA);

            // Vector from circle to contact point is the normal times the circle radius
            vec2.scale(c.contactPointA, c.normalA, circleRadius);
            add(c.contactPointA, c.contactPointA, circleOffset);
            sub(c.contactPointA, c.contactPointA, circleBody.position);

            sub(c.contactPointB, v, lineOffset);
            vec2.scale(lineEndToLineRadius, c.normalA, -lineRadius);
            add(c.contactPointB, c.contactPointB, lineEndToLineRadius);
            add(c.contactPointB, c.contactPointB, lineOffset);
            sub(c.contactPointB, c.contactPointB, lineBody.position);

            this.contactEquations.push(c);

            if(this.enableFriction)***REMOVED***
                this.frictionEquations.push(this.createFrictionFromContact(c));
            ***REMOVED***

            return 1;
        ***REMOVED***
    ***REMOVED***

    return 0;
***REMOVED***;

/**
 * Circle/capsule Narrowphase
 * @method circleCapsule
 * @param  ***REMOVED***Body***REMOVED***   bi
 * @param  ***REMOVED***Circle***REMOVED*** si
 * @param  ***REMOVED***Array***REMOVED***  xi
 * @param  ***REMOVED***Number***REMOVED*** ai
 * @param  ***REMOVED***Body***REMOVED***   bj
 * @param  ***REMOVED***Line***REMOVED***   sj
 * @param  ***REMOVED***Array***REMOVED***  xj
 * @param  ***REMOVED***Number***REMOVED*** aj
 */
Narrowphase.prototype[Shape.CIRCLE | Shape.CAPSULE] =
Narrowphase.prototype.circleCapsule = function(bi,si,xi,ai, bj,sj,xj,aj, justTest)***REMOVED***
    return this.circleLine(bi,si,xi,ai, bj,sj,xj,aj, justTest, sj.radius);
***REMOVED***;

/**
 * Circle/convex Narrowphase.
 * @method circleConvex
 * @param  ***REMOVED***Body***REMOVED*** circleBody
 * @param  ***REMOVED***Circle***REMOVED*** circleShape
 * @param  ***REMOVED***Array***REMOVED*** circleOffset
 * @param  ***REMOVED***Number***REMOVED*** circleAngle
 * @param  ***REMOVED***Body***REMOVED*** convexBody
 * @param  ***REMOVED***Convex***REMOVED*** convexShape
 * @param  ***REMOVED***Array***REMOVED*** convexOffset
 * @param  ***REMOVED***Number***REMOVED*** convexAngle
 * @param  ***REMOVED***Boolean***REMOVED*** justTest
 * @param  ***REMOVED***Number***REMOVED*** circleRadius
 */
Narrowphase.prototype[Shape.CIRCLE | Shape.CONVEX] =
Narrowphase.prototype[Shape.CIRCLE | Shape.BOX] =
Narrowphase.prototype.circleConvex = function(
    circleBody,
    circleShape,
    circleOffset,
    circleAngle,
    convexBody,
    convexShape,
    convexOffset,
    convexAngle,
    justTest,
    circleRadius
)***REMOVED***
    var circleRadius = typeof(circleRadius)==="number" ? circleRadius : circleShape.radius;

    var worldVertex0 = tmp1,
        worldVertex1 = tmp2,
        worldEdge = tmp3,
        worldEdgeUnit = tmp4,
        worldNormal = tmp5,
        centerDist = tmp6,
        convexToCircle = tmp7,
        orthoDist = tmp8,
        projectedPoint = tmp9,
        dist = tmp10,
        worldVertex = tmp11,

        closestEdge = -1,
        closestEdgeDistance = null,
        closestEdgeOrthoDist = tmp12,
        closestEdgeProjectedPoint = tmp13,
        candidate = tmp14,
        candidateDist = tmp15,
        minCandidate = tmp16,

        found = false,
        minCandidateDistance = Number.MAX_VALUE;

    var numReported = 0;

    // New algorithm:
    // 1. Check so center of circle is not inside the polygon. If it is, this wont work...
    // 2. For each edge
    // 2. 1. Get point on circle that is closest to the edge (scale normal with -radius)
    // 2. 2. Check if point is inside.

    var verts = convexShape.vertices;

    // Check all edges first
    for(var i=0; i!==verts.length+1; i++)***REMOVED***
        var v0 = verts[i%verts.length],
            v1 = verts[(i+1)%verts.length];

        vec2.rotate(worldVertex0, v0, convexAngle);
        vec2.rotate(worldVertex1, v1, convexAngle);
        add(worldVertex0, worldVertex0, convexOffset);
        add(worldVertex1, worldVertex1, convexOffset);
        sub(worldEdge, worldVertex1, worldVertex0);

        vec2.normalize(worldEdgeUnit, worldEdge);

        // Get tangent to the edge. Points out of the Convex
        vec2.rotate90cw(worldNormal, worldEdgeUnit);

        // Get point on circle, closest to the polygon
        vec2.scale(candidate,worldNormal,-circleShape.radius);
        add(candidate,candidate,circleOffset);

        if(pointInConvex(candidate,convexShape,convexOffset,convexAngle))***REMOVED***

            vec2.sub(candidateDist,worldVertex0,candidate);
            var candidateDistance = Math.abs(vec2.dot(candidateDist,worldNormal));

            if(candidateDistance < minCandidateDistance)***REMOVED***
                vec2.copy(minCandidate,candidate);
                minCandidateDistance = candidateDistance;
                vec2.scale(closestEdgeProjectedPoint,worldNormal,candidateDistance);
                vec2.add(closestEdgeProjectedPoint,closestEdgeProjectedPoint,candidate);
                found = true;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    if(found)***REMOVED***

        if(justTest)***REMOVED***
            return true;
        ***REMOVED***

        var c = this.createContactEquation(circleBody,convexBody,circleShape,convexShape);
        vec2.sub(c.normalA, minCandidate, circleOffset);
        vec2.normalize(c.normalA, c.normalA);

        vec2.scale(c.contactPointA,  c.normalA, circleRadius);
        add(c.contactPointA, c.contactPointA, circleOffset);
        sub(c.contactPointA, c.contactPointA, circleBody.position);

        sub(c.contactPointB, closestEdgeProjectedPoint, convexOffset);
        add(c.contactPointB, c.contactPointB, convexOffset);
        sub(c.contactPointB, c.contactPointB, convexBody.position);

        this.contactEquations.push(c);

        if(this.enableFriction)***REMOVED***
            this.frictionEquations.push( this.createFrictionFromContact(c) );
        ***REMOVED***

        return 1;
    ***REMOVED***

    // Check all vertices
    if(circleRadius > 0)***REMOVED***
        for(var i=0; i<verts.length; i++)***REMOVED***
            var localVertex = verts[i];
            vec2.rotate(worldVertex, localVertex, convexAngle);
            add(worldVertex, worldVertex, convexOffset);

            sub(dist, worldVertex, circleOffset);
            if(vec2.squaredLength(dist) < Math.pow(circleRadius, 2))***REMOVED***

                if(justTest)***REMOVED***
                    return true;
                ***REMOVED***

                var c = this.createContactEquation(circleBody,convexBody,circleShape,convexShape);

                vec2.copy(c.normalA, dist);
                vec2.normalize(c.normalA,c.normalA);

                // Vector from circle to contact point is the normal times the circle radius
                vec2.scale(c.contactPointA, c.normalA, circleRadius);
                add(c.contactPointA, c.contactPointA, circleOffset);
                sub(c.contactPointA, c.contactPointA, circleBody.position);

                sub(c.contactPointB, worldVertex, convexOffset);
                add(c.contactPointB, c.contactPointB, convexOffset);
                sub(c.contactPointB, c.contactPointB, convexBody.position);

                this.contactEquations.push(c);

                if(this.enableFriction)***REMOVED***
                    this.frictionEquations.push(this.createFrictionFromContact(c));
                ***REMOVED***

                return 1;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return 0;
***REMOVED***;

var pic_worldVertex0 = vec2.create(),
    pic_worldVertex1 = vec2.create(),
    pic_r0 = vec2.create(),
    pic_r1 = vec2.create();

/*
 * Check if a point is in a polygon
 */
function pointInConvex(worldPoint,convexShape,convexOffset,convexAngle)***REMOVED***
    var worldVertex0 = pic_worldVertex0,
        worldVertex1 = pic_worldVertex1,
        r0 = pic_r0,
        r1 = pic_r1,
        point = worldPoint,
        verts = convexShape.vertices,
        lastCross = null;
    for(var i=0; i!==verts.length+1; i++)***REMOVED***
        var v0 = verts[i%verts.length],
            v1 = verts[(i+1)%verts.length];

        // Transform vertices to world
        // @todo The point should be transformed to local coordinates in the convex, no need to transform each vertex
        vec2.rotate(worldVertex0, v0, convexAngle);
        vec2.rotate(worldVertex1, v1, convexAngle);
        add(worldVertex0, worldVertex0, convexOffset);
        add(worldVertex1, worldVertex1, convexOffset);

        sub(r0, worldVertex0, point);
        sub(r1, worldVertex1, point);
        var cross = vec2.crossLength(r0,r1);

        if(lastCross===null)***REMOVED***
            lastCross = cross;
        ***REMOVED***

        // If we got a different sign of the distance vector, the point is out of the polygon
        if(cross*lastCross <= 0)***REMOVED***
            return false;
        ***REMOVED***
        lastCross = cross;
    ***REMOVED***
    return true;
***REMOVED***

/**
 * Particle/convex Narrowphase
 * @method particleConvex
 * @param  ***REMOVED***Body***REMOVED*** particleBody
 * @param  ***REMOVED***Particle***REMOVED*** particleShape
 * @param  ***REMOVED***Array***REMOVED*** particleOffset
 * @param  ***REMOVED***Number***REMOVED*** particleAngle
 * @param  ***REMOVED***Body***REMOVED*** convexBody
 * @param  ***REMOVED***Convex***REMOVED*** convexShape
 * @param  ***REMOVED***Array***REMOVED*** convexOffset
 * @param  ***REMOVED***Number***REMOVED*** convexAngle
 * @param ***REMOVED***Boolean***REMOVED*** justTest
 * @todo use pointInConvex and code more similar to circleConvex
 * @todo don't transform each vertex, but transform the particle position to convex-local instead
 */
Narrowphase.prototype[Shape.PARTICLE | Shape.CONVEX] =
Narrowphase.prototype[Shape.PARTICLE | Shape.BOX] =
Narrowphase.prototype.particleConvex = function(
    particleBody,
    particleShape,
    particleOffset,
    particleAngle,
    convexBody,
    convexShape,
    convexOffset,
    convexAngle,
    justTest
)***REMOVED***
    var worldVertex0 = tmp1,
        worldVertex1 = tmp2,
        worldEdge = tmp3,
        worldEdgeUnit = tmp4,
        worldTangent = tmp5,
        centerDist = tmp6,
        convexToparticle = tmp7,
        orthoDist = tmp8,
        projectedPoint = tmp9,
        dist = tmp10,
        worldVertex = tmp11,
        closestEdge = -1,
        closestEdgeDistance = null,
        closestEdgeOrthoDist = tmp12,
        closestEdgeProjectedPoint = tmp13,
        r0 = tmp14, // vector from particle to vertex0
        r1 = tmp15,
        localPoint = tmp16,
        candidateDist = tmp17,
        minEdgeNormal = tmp18,
        minCandidateDistance = Number.MAX_VALUE;

    var numReported = 0,
        found = false,
        verts = convexShape.vertices;

    // Check if the particle is in the polygon at all
    if(!pointInConvex(particleOffset,convexShape,convexOffset,convexAngle))***REMOVED***
        return 0;
    ***REMOVED***

    if(justTest)***REMOVED***
        return true;
    ***REMOVED***

    // Check edges first
    var lastCross = null;
    for(var i=0; i!==verts.length+1; i++)***REMOVED***
        var v0 = verts[i%verts.length],
            v1 = verts[(i+1)%verts.length];

        // Transform vertices to world
        vec2.rotate(worldVertex0, v0, convexAngle);
        vec2.rotate(worldVertex1, v1, convexAngle);
        add(worldVertex0, worldVertex0, convexOffset);
        add(worldVertex1, worldVertex1, convexOffset);

        // Get world edge
        sub(worldEdge, worldVertex1, worldVertex0);
        vec2.normalize(worldEdgeUnit, worldEdge);

        // Get tangent to the edge. Points out of the Convex
        vec2.rotate90cw(worldTangent, worldEdgeUnit);

        // Check distance from the infinite line (spanned by the edge) to the particle
        sub(dist, particleOffset, worldVertex0);
        var d = dot(dist, worldTangent);
        sub(centerDist, worldVertex0, convexOffset);

        sub(convexToparticle, particleOffset, convexOffset);

        vec2.sub(candidateDist,worldVertex0,particleOffset);
        var candidateDistance = Math.abs(vec2.dot(candidateDist,worldTangent));

        if(candidateDistance < minCandidateDistance)***REMOVED***
            minCandidateDistance = candidateDistance;
            vec2.scale(closestEdgeProjectedPoint,worldTangent,candidateDistance);
            vec2.add(closestEdgeProjectedPoint,closestEdgeProjectedPoint,particleOffset);
            vec2.copy(minEdgeNormal,worldTangent);
            found = true;
        ***REMOVED***
    ***REMOVED***

    if(found)***REMOVED***
        var c = this.createContactEquation(particleBody,convexBody,particleShape,convexShape);

        vec2.scale(c.normalA, minEdgeNormal, -1);
        vec2.normalize(c.normalA, c.normalA);

        // Particle has no extent to the contact point
        vec2.set(c.contactPointA,  0, 0);
        add(c.contactPointA, c.contactPointA, particleOffset);
        sub(c.contactPointA, c.contactPointA, particleBody.position);

        // From convex center to point
        sub(c.contactPointB, closestEdgeProjectedPoint, convexOffset);
        add(c.contactPointB, c.contactPointB, convexOffset);
        sub(c.contactPointB, c.contactPointB, convexBody.position);

        this.contactEquations.push(c);

        if(this.enableFriction)***REMOVED***
            this.frictionEquations.push( this.createFrictionFromContact(c) );
        ***REMOVED***

        return 1;
    ***REMOVED***


    return 0;
***REMOVED***;

/**
 * Circle/circle Narrowphase
 * @method circleCircle
 * @param  ***REMOVED***Body***REMOVED*** bodyA
 * @param  ***REMOVED***Circle***REMOVED*** shapeA
 * @param  ***REMOVED***Array***REMOVED*** offsetA
 * @param  ***REMOVED***Number***REMOVED*** angleA
 * @param  ***REMOVED***Body***REMOVED*** bodyB
 * @param  ***REMOVED***Circle***REMOVED*** shapeB
 * @param  ***REMOVED***Array***REMOVED*** offsetB
 * @param  ***REMOVED***Number***REMOVED*** angleB
 * @param ***REMOVED***Boolean***REMOVED*** justTest
 * @param ***REMOVED***Number***REMOVED*** [radiusA] Optional radius to use for shapeA
 * @param ***REMOVED***Number***REMOVED*** [radiusB] Optional radius to use for shapeB
 */
Narrowphase.prototype[Shape.CIRCLE] =
Narrowphase.prototype.circleCircle = function(
    bodyA,
    shapeA,
    offsetA,
    angleA,
    bodyB,
    shapeB,
    offsetB,
    angleB,
    justTest,
    radiusA,
    radiusB
)***REMOVED***

    var dist = tmp1,
        radiusA = radiusA || shapeA.radius,
        radiusB = radiusB || shapeB.radius;

    sub(dist,offsetA,offsetB);
    var r = radiusA + radiusB;
    if(vec2.squaredLength(dist) > Math.pow(r,2))***REMOVED***
        return 0;
    ***REMOVED***

    if(justTest)***REMOVED***
        return true;
    ***REMOVED***

    var c = this.createContactEquation(bodyA,bodyB,shapeA,shapeB);
    sub(c.normalA, offsetB, offsetA);
    vec2.normalize(c.normalA,c.normalA);

    vec2.scale( c.contactPointA, c.normalA,  radiusA);
    vec2.scale( c.contactPointB, c.normalA, -radiusB);

    add(c.contactPointA, c.contactPointA, offsetA);
    sub(c.contactPointA, c.contactPointA, bodyA.position);

    add(c.contactPointB, c.contactPointB, offsetB);
    sub(c.contactPointB, c.contactPointB, bodyB.position);

    this.contactEquations.push(c);

    if(this.enableFriction)***REMOVED***
        this.frictionEquations.push(this.createFrictionFromContact(c));
    ***REMOVED***
    return 1;
***REMOVED***;

/**
 * Plane/Convex Narrowphase
 * @method planeConvex
 * @param  ***REMOVED***Body***REMOVED*** planeBody
 * @param  ***REMOVED***Plane***REMOVED*** planeShape
 * @param  ***REMOVED***Array***REMOVED*** planeOffset
 * @param  ***REMOVED***Number***REMOVED*** planeAngle
 * @param  ***REMOVED***Body***REMOVED*** convexBody
 * @param  ***REMOVED***Convex***REMOVED*** convexShape
 * @param  ***REMOVED***Array***REMOVED*** convexOffset
 * @param  ***REMOVED***Number***REMOVED*** convexAngle
 * @param ***REMOVED***Boolean***REMOVED*** justTest
 */
Narrowphase.prototype[Shape.PLANE | Shape.CONVEX] =
Narrowphase.prototype[Shape.PLANE | Shape.BOX] =
Narrowphase.prototype.planeConvex = function(
    planeBody,
    planeShape,
    planeOffset,
    planeAngle,
    convexBody,
    convexShape,
    convexOffset,
    convexAngle,
    justTest
)***REMOVED***
    var worldVertex = tmp1,
        worldNormal = tmp2,
        dist = tmp3;

    var numReported = 0;
    vec2.rotate(worldNormal, yAxis, planeAngle);

    for(var i=0; i!==convexShape.vertices.length; i++)***REMOVED***
        var v = convexShape.vertices[i];
        vec2.rotate(worldVertex, v, convexAngle);
        add(worldVertex, worldVertex, convexOffset);

        sub(dist, worldVertex, planeOffset);

        if(dot(dist,worldNormal) <= 0)***REMOVED***

            if(justTest)***REMOVED***
                return true;
            ***REMOVED***

            // Found vertex
            numReported++;

            var c = this.createContactEquation(planeBody,convexBody,planeShape,convexShape);

            sub(dist, worldVertex, planeOffset);

            vec2.copy(c.normalA, worldNormal);

            var d = dot(dist, c.normalA);
            vec2.scale(dist, c.normalA, d);

            // rj is from convex center to contact
            sub(c.contactPointB, worldVertex, convexBody.position);


            // ri is from plane center to contact
            sub( c.contactPointA, worldVertex, dist);
            sub( c.contactPointA, c.contactPointA, planeBody.position);

            this.contactEquations.push(c);

            if(!this.enableFrictionReduction)***REMOVED***
                if(this.enableFriction)***REMOVED***
                    this.frictionEquations.push(this.createFrictionFromContact(c));
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    if(this.enableFrictionReduction)***REMOVED***
        if(this.enableFriction && numReported)***REMOVED***
            this.frictionEquations.push(this.createFrictionFromAverage(numReported));
        ***REMOVED***
    ***REMOVED***

    return numReported;
***REMOVED***;

/**
 * Narrowphase for particle vs plane
 * @method particlePlane
 * @param  ***REMOVED***Body***REMOVED***       particleBody
 * @param  ***REMOVED***Particle***REMOVED***   particleShape
 * @param  ***REMOVED***Array***REMOVED***      particleOffset
 * @param  ***REMOVED***Number***REMOVED***     particleAngle
 * @param  ***REMOVED***Body***REMOVED***       planeBody
 * @param  ***REMOVED***Plane***REMOVED***      planeShape
 * @param  ***REMOVED***Array***REMOVED***      planeOffset
 * @param  ***REMOVED***Number***REMOVED***     planeAngle
 * @param ***REMOVED***Boolean***REMOVED***     justTest
 */
Narrowphase.prototype[Shape.PARTICLE | Shape.PLANE] =
Narrowphase.prototype.particlePlane = function(
    particleBody,
    particleShape,
    particleOffset,
    particleAngle,
    planeBody,
    planeShape,
    planeOffset,
    planeAngle,
    justTest
)***REMOVED***
    var dist = tmp1,
        worldNormal = tmp2;

    planeAngle = planeAngle || 0;

    sub(dist, particleOffset, planeOffset);
    vec2.rotate(worldNormal, yAxis, planeAngle);

    var d = dot(dist, worldNormal);

    if(d > 0)***REMOVED***
        return 0;
    ***REMOVED***
    if(justTest)***REMOVED***
        return true;
    ***REMOVED***

    var c = this.createContactEquation(planeBody,particleBody,planeShape,particleShape);

    vec2.copy(c.normalA, worldNormal);
    vec2.scale( dist, c.normalA, d );
    // dist is now the distance vector in the normal direction

    // ri is the particle position projected down onto the plane, from the plane center
    sub( c.contactPointA, particleOffset, dist);
    sub( c.contactPointA, c.contactPointA, planeBody.position);

    // rj is from the body center to the particle center
    sub( c.contactPointB, particleOffset, particleBody.position );

    this.contactEquations.push(c);

    if(this.enableFriction)***REMOVED***
        this.frictionEquations.push(this.createFrictionFromContact(c));
    ***REMOVED***
    return 1;
***REMOVED***;

/**
 * Circle/Particle Narrowphase
 * @method circleParticle
 * @param  ***REMOVED***Body***REMOVED*** circleBody
 * @param  ***REMOVED***Circle***REMOVED*** circleShape
 * @param  ***REMOVED***Array***REMOVED*** circleOffset
 * @param  ***REMOVED***Number***REMOVED*** circleAngle
 * @param  ***REMOVED***Body***REMOVED*** particleBody
 * @param  ***REMOVED***Particle***REMOVED*** particleShape
 * @param  ***REMOVED***Array***REMOVED*** particleOffset
 * @param  ***REMOVED***Number***REMOVED*** particleAngle
 * @param  ***REMOVED***Boolean***REMOVED*** justTest
 */
Narrowphase.prototype[Shape.CIRCLE | Shape.PARTICLE] =
Narrowphase.prototype.circleParticle = function(
    circleBody,
    circleShape,
    circleOffset,
    circleAngle,
    particleBody,
    particleShape,
    particleOffset,
    particleAngle,
    justTest
)***REMOVED***
    var dist = tmp1;

    sub(dist, particleOffset, circleOffset);
    if(vec2.squaredLength(dist) > Math.pow(circleShape.radius, 2))***REMOVED***
        return 0;
    ***REMOVED***
    if(justTest)***REMOVED***
        return true;
    ***REMOVED***

    var c = this.createContactEquation(circleBody,particleBody,circleShape,particleShape);
    vec2.copy(c.normalA, dist);
    vec2.normalize(c.normalA,c.normalA);

    // Vector from circle to contact point is the normal times the circle radius
    vec2.scale(c.contactPointA, c.normalA, circleShape.radius);
    add(c.contactPointA, c.contactPointA, circleOffset);
    sub(c.contactPointA, c.contactPointA, circleBody.position);

    // Vector from particle center to contact point is zero
    sub(c.contactPointB, particleOffset, particleBody.position);

    this.contactEquations.push(c);

    if(this.enableFriction)***REMOVED***
        this.frictionEquations.push(this.createFrictionFromContact(c));
    ***REMOVED***

    return 1;
***REMOVED***;

var planeCapsule_tmpCircle = new Circle(***REMOVED*** radius: 1 ***REMOVED***),
    planeCapsule_tmp1 = vec2.create(),
    planeCapsule_tmp2 = vec2.create(),
    planeCapsule_tmp3 = vec2.create();

/**
 * @method planeCapsule
 * @param  ***REMOVED***Body***REMOVED*** planeBody
 * @param  ***REMOVED***Circle***REMOVED*** planeShape
 * @param  ***REMOVED***Array***REMOVED*** planeOffset
 * @param  ***REMOVED***Number***REMOVED*** planeAngle
 * @param  ***REMOVED***Body***REMOVED*** capsuleBody
 * @param  ***REMOVED***Particle***REMOVED*** capsuleShape
 * @param  ***REMOVED***Array***REMOVED*** capsuleOffset
 * @param  ***REMOVED***Number***REMOVED*** capsuleAngle
 * @param ***REMOVED***Boolean***REMOVED*** justTest
 */
Narrowphase.prototype[Shape.PLANE | Shape.CAPSULE] =
Narrowphase.prototype.planeCapsule = function(
    planeBody,
    planeShape,
    planeOffset,
    planeAngle,
    capsuleBody,
    capsuleShape,
    capsuleOffset,
    capsuleAngle,
    justTest
)***REMOVED***
    var end1 = planeCapsule_tmp1,
        end2 = planeCapsule_tmp2,
        circle = planeCapsule_tmpCircle,
        dst = planeCapsule_tmp3;

    // Compute world end positions
    vec2.set(end1, -capsuleShape.length/2, 0);
    vec2.rotate(end1,end1,capsuleAngle);
    add(end1,end1,capsuleOffset);

    vec2.set(end2,  capsuleShape.length/2, 0);
    vec2.rotate(end2,end2,capsuleAngle);
    add(end2,end2,capsuleOffset);

    circle.radius = capsuleShape.radius;

    var enableFrictionBefore;

    // Temporarily turn off friction
    if(this.enableFrictionReduction)***REMOVED***
        enableFrictionBefore = this.enableFriction;
        this.enableFriction = false;
    ***REMOVED***

    // Do Narrowphase as two circles
    var numContacts1 = this.circlePlane(capsuleBody,circle,end1,0, planeBody,planeShape,planeOffset,planeAngle, justTest),
        numContacts2 = this.circlePlane(capsuleBody,circle,end2,0, planeBody,planeShape,planeOffset,planeAngle, justTest);

    // Restore friction
    if(this.enableFrictionReduction)***REMOVED***
        this.enableFriction = enableFrictionBefore;
    ***REMOVED***

    if(justTest)***REMOVED***
        return numContacts1 || numContacts2;
    ***REMOVED*** else ***REMOVED***
        var numTotal = numContacts1 + numContacts2;
        if(this.enableFrictionReduction)***REMOVED***
            if(numTotal)***REMOVED***
                this.frictionEquations.push(this.createFrictionFromAverage(numTotal));
            ***REMOVED***
        ***REMOVED***
        return numTotal;
    ***REMOVED***
***REMOVED***;

/**
 * Creates ContactEquations and FrictionEquations for a collision.
 * @method circlePlane
 * @param  ***REMOVED***Body***REMOVED***    bi     The first body that should be connected to the equations.
 * @param  ***REMOVED***Circle***REMOVED***  si     The circle shape participating in the collision.
 * @param  ***REMOVED***Array***REMOVED***   xi     Extra offset to take into account for the Shape, in addition to the one in circleBody.position. Will *not* be rotated by circleBody.angle (maybe it should, for sake of homogenity?). Set to null if none.
 * @param  ***REMOVED***Body***REMOVED***    bj     The second body that should be connected to the equations.
 * @param  ***REMOVED***Plane***REMOVED***   sj     The Plane shape that is participating
 * @param  ***REMOVED***Array***REMOVED***   xj     Extra offset for the plane shape.
 * @param  ***REMOVED***Number***REMOVED***  aj     Extra angle to apply to the plane
 */
Narrowphase.prototype[Shape.CIRCLE | Shape.PLANE] =
Narrowphase.prototype.circlePlane = function(   bi,si,xi,ai, bj,sj,xj,aj, justTest )***REMOVED***
    var circleBody = bi,
        circleShape = si,
        circleOffset = xi, // Offset from body center, rotated!
        planeBody = bj,
        shapeB = sj,
        planeOffset = xj,
        planeAngle = aj;

    planeAngle = planeAngle || 0;

    // Vector from plane to circle
    var planeToCircle = tmp1,
        worldNormal = tmp2,
        temp = tmp3;

    sub(planeToCircle, circleOffset, planeOffset);

    // World plane normal
    vec2.rotate(worldNormal, yAxis, planeAngle);

    // Normal direction distance
    var d = dot(worldNormal, planeToCircle);

    if(d > circleShape.radius)***REMOVED***
        return 0; // No overlap. Abort.
    ***REMOVED***

    if(justTest)***REMOVED***
        return true;
    ***REMOVED***

    // Create contact
    var contact = this.createContactEquation(planeBody,circleBody,sj,si);

    // ni is the plane world normal
    vec2.copy(contact.normalA, worldNormal);

    // rj is the vector from circle center to the contact point
    vec2.scale(contact.contactPointB, contact.normalA, -circleShape.radius);
    add(contact.contactPointB, contact.contactPointB, circleOffset);
    sub(contact.contactPointB, contact.contactPointB, circleBody.position);

    // ri is the distance from plane center to contact.
    vec2.scale(temp, contact.normalA, d);
    sub(contact.contactPointA, planeToCircle, temp ); // Subtract normal distance vector from the distance vector
    add(contact.contactPointA, contact.contactPointA, planeOffset);
    sub(contact.contactPointA, contact.contactPointA, planeBody.position);

    this.contactEquations.push(contact);

    if(this.enableFriction)***REMOVED***
        this.frictionEquations.push( this.createFrictionFromContact(contact) );
    ***REMOVED***

    return 1;
***REMOVED***;

/**
 * Convex/convex Narrowphase.See <a href="http://www.altdevblogaday.com/2011/05/13/contact-generation-between-3d-convex-meshes/">this article</a> for more info.
 * @method convexConvex
 * @param  ***REMOVED***Body***REMOVED*** bi
 * @param  ***REMOVED***Convex***REMOVED*** si
 * @param  ***REMOVED***Array***REMOVED*** xi
 * @param  ***REMOVED***Number***REMOVED*** ai
 * @param  ***REMOVED***Body***REMOVED*** bj
 * @param  ***REMOVED***Convex***REMOVED*** sj
 * @param  ***REMOVED***Array***REMOVED*** xj
 * @param  ***REMOVED***Number***REMOVED*** aj
 */
Narrowphase.prototype[Shape.CONVEX] =
Narrowphase.prototype[Shape.CONVEX | Shape.BOX] =
Narrowphase.prototype[Shape.BOX] =
Narrowphase.prototype.convexConvex = function(  bi,si,xi,ai, bj,sj,xj,aj, justTest, precision )***REMOVED***
    var sepAxis = tmp1,
        worldPoint = tmp2,
        worldPoint0 = tmp3,
        worldPoint1 = tmp4,
        worldEdge = tmp5,
        projected = tmp6,
        penetrationVec = tmp7,
        dist = tmp8,
        worldNormal = tmp9,
        numContacts = 0,
        precision = typeof(precision) === 'number' ? precision : 0;

    var found = Narrowphase.findSeparatingAxis(si,xi,ai,sj,xj,aj,sepAxis);
    if(!found)***REMOVED***
        return 0;
    ***REMOVED***

    // Make sure the separating axis is directed from shape i to shape j
    sub(dist,xj,xi);
    if(dot(sepAxis,dist) > 0)***REMOVED***
        vec2.scale(sepAxis,sepAxis,-1);
    ***REMOVED***

    // Find edges with normals closest to the separating axis
    var closestEdge1 = Narrowphase.getClosestEdge(si,ai,sepAxis,true), // Flipped axis
        closestEdge2 = Narrowphase.getClosestEdge(sj,aj,sepAxis);

    if(closestEdge1 === -1 || closestEdge2 === -1)***REMOVED***
        return 0;
    ***REMOVED***

    // Loop over the shapes
    for(var k=0; k<2; k++)***REMOVED***

        var closestEdgeA = closestEdge1,
            closestEdgeB = closestEdge2,
            shapeA =  si, shapeB =  sj,
            offsetA = xi, offsetB = xj,
            angleA = ai, angleB = aj,
            bodyA = bi, bodyB = bj;

        if(k === 0)***REMOVED***
            // Swap!
            var tmp;
            tmp = closestEdgeA;
            closestEdgeA = closestEdgeB;
            closestEdgeB = tmp;

            tmp = shapeA;
            shapeA = shapeB;
            shapeB = tmp;

            tmp = offsetA;
            offsetA = offsetB;
            offsetB = tmp;

            tmp = angleA;
            angleA = angleB;
            angleB = tmp;

            tmp = bodyA;
            bodyA = bodyB;
            bodyB = tmp;
        ***REMOVED***

        // Loop over 2 points in convex B
        for(var j=closestEdgeB; j<closestEdgeB+2; j++)***REMOVED***

            // Get world point
            var v = shapeB.vertices[(j+shapeB.vertices.length)%shapeB.vertices.length];
            vec2.rotate(worldPoint, v, angleB);
            add(worldPoint, worldPoint, offsetB);

            var insideNumEdges = 0;

            // Loop over the 3 closest edges in convex A
            for(var i=closestEdgeA-1; i<closestEdgeA+2; i++)***REMOVED***

                var v0 = shapeA.vertices[(i  +shapeA.vertices.length)%shapeA.vertices.length],
                    v1 = shapeA.vertices[(i+1+shapeA.vertices.length)%shapeA.vertices.length];

                // Construct the edge
                vec2.rotate(worldPoint0, v0, angleA);
                vec2.rotate(worldPoint1, v1, angleA);
                add(worldPoint0, worldPoint0, offsetA);
                add(worldPoint1, worldPoint1, offsetA);

                sub(worldEdge, worldPoint1, worldPoint0);

                vec2.rotate90cw(worldNormal, worldEdge); // Normal points out of convex 1
                vec2.normalize(worldNormal,worldNormal);

                sub(dist, worldPoint, worldPoint0);

                var d = dot(worldNormal,dist);

                if((i === closestEdgeA && d <= precision) || (i !== closestEdgeA && d <= 0))***REMOVED***
                    insideNumEdges++;
                ***REMOVED***
            ***REMOVED***

            if(insideNumEdges >= 3)***REMOVED***

                if(justTest)***REMOVED***
                    return true;
                ***REMOVED***

                // worldPoint was on the "inside" side of each of the 3 checked edges.
                // Project it to the center edge and use the projection direction as normal

                // Create contact
                var c = this.createContactEquation(bodyA,bodyB,shapeA,shapeB);
                numContacts++;

                // Get center edge from body A
                var v0 = shapeA.vertices[(closestEdgeA)   % shapeA.vertices.length],
                    v1 = shapeA.vertices[(closestEdgeA+1) % shapeA.vertices.length];

                // Construct the edge
                vec2.rotate(worldPoint0, v0, angleA);
                vec2.rotate(worldPoint1, v1, angleA);
                add(worldPoint0, worldPoint0, offsetA);
                add(worldPoint1, worldPoint1, offsetA);

                sub(worldEdge, worldPoint1, worldPoint0);

                vec2.rotate90cw(c.normalA, worldEdge); // Normal points out of convex A
                vec2.normalize(c.normalA,c.normalA);

                sub(dist, worldPoint, worldPoint0); // From edge point to the penetrating point
                var d = dot(c.normalA,dist);             // Penetration
                vec2.scale(penetrationVec, c.normalA, d);     // Vector penetration

                sub(c.contactPointA, worldPoint, offsetA);
                sub(c.contactPointA, c.contactPointA, penetrationVec);
                add(c.contactPointA, c.contactPointA, offsetA);
                sub(c.contactPointA, c.contactPointA, bodyA.position);

                sub(c.contactPointB, worldPoint, offsetB);
                add(c.contactPointB, c.contactPointB, offsetB);
                sub(c.contactPointB, c.contactPointB, bodyB.position);

                this.contactEquations.push(c);

                // Todo reduce to 1 friction equation if we have 2 contact points
                if(!this.enableFrictionReduction)***REMOVED***
                    if(this.enableFriction)***REMOVED***
                        this.frictionEquations.push(this.createFrictionFromContact(c));
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    if(this.enableFrictionReduction)***REMOVED***
        if(this.enableFriction && numContacts)***REMOVED***
            this.frictionEquations.push(this.createFrictionFromAverage(numContacts));
        ***REMOVED***
    ***REMOVED***

    return numContacts;
***REMOVED***;

// .projectConvex is called by other functions, need local tmp vectors
var pcoa_tmp1 = vec2.fromValues(0,0);

/**
 * Project a Convex onto a world-oriented axis
 * @method projectConvexOntoAxis
 * @static
 * @param  ***REMOVED***Convex***REMOVED*** convexShape
 * @param  ***REMOVED***Array***REMOVED*** convexOffset
 * @param  ***REMOVED***Number***REMOVED*** convexAngle
 * @param  ***REMOVED***Array***REMOVED*** worldAxis
 * @param  ***REMOVED***Array***REMOVED*** result
 */
Narrowphase.projectConvexOntoAxis = function(convexShape, convexOffset, convexAngle, worldAxis, result)***REMOVED***
    var max=null,
        min=null,
        v,
        value,
        localAxis = pcoa_tmp1;

    // Convert the axis to local coords of the body
    vec2.rotate(localAxis, worldAxis, -convexAngle);

    // Get projected position of all vertices
    for(var i=0; i<convexShape.vertices.length; i++)***REMOVED***
        v = convexShape.vertices[i];
        value = dot(v,localAxis);
        if(max === null || value > max)***REMOVED***
            max = value;
        ***REMOVED***
        if(min === null || value < min)***REMOVED***
            min = value;
        ***REMOVED***
    ***REMOVED***

    if(min > max)***REMOVED***
        var t = min;
        min = max;
        max = t;
    ***REMOVED***

    // Project the position of the body onto the axis - need to add this to the result
    var offset = dot(convexOffset, worldAxis);

    vec2.set( result, min + offset, max + offset);
***REMOVED***;

// .findSeparatingAxis is called by other functions, need local tmp vectors
var fsa_tmp1 = vec2.fromValues(0,0)
,   fsa_tmp2 = vec2.fromValues(0,0)
,   fsa_tmp3 = vec2.fromValues(0,0)
,   fsa_tmp4 = vec2.fromValues(0,0)
,   fsa_tmp5 = vec2.fromValues(0,0)
,   fsa_tmp6 = vec2.fromValues(0,0);

/**
 * Find a separating axis between the shapes, that maximizes the separating distance between them.
 * @method findSeparatingAxis
 * @static
 * @param  ***REMOVED***Convex***REMOVED***     c1
 * @param  ***REMOVED***Array***REMOVED***      offset1
 * @param  ***REMOVED***Number***REMOVED***     angle1
 * @param  ***REMOVED***Convex***REMOVED***     c2
 * @param  ***REMOVED***Array***REMOVED***      offset2
 * @param  ***REMOVED***Number***REMOVED***     angle2
 * @param  ***REMOVED***Array***REMOVED***      sepAxis     The resulting axis
 * @return ***REMOVED***Boolean***REMOVED***                Whether the axis could be found.
 */
Narrowphase.findSeparatingAxis = function(c1,offset1,angle1,c2,offset2,angle2,sepAxis)***REMOVED***
    var maxDist = null,
        overlap = false,
        found = false,
        edge = fsa_tmp1,
        worldPoint0 = fsa_tmp2,
        worldPoint1 = fsa_tmp3,
        normal = fsa_tmp4,
        span1 = fsa_tmp5,
        span2 = fsa_tmp6;

    if(c1 instanceof Box && c2 instanceof Box)***REMOVED***

        for(var j=0; j!==2; j++)***REMOVED***
            var c = c1,
                angle = angle1;
            if(j===1)***REMOVED***
                c = c2;
                angle = angle2;
            ***REMOVED***

            for(var i=0; i!==2; i++)***REMOVED***

                // Get the world edge
                if(i === 0)***REMOVED***
                    vec2.set(normal, 0, 1);
                ***REMOVED*** else if(i === 1) ***REMOVED***
                    vec2.set(normal, 1, 0);
                ***REMOVED***
                if(angle !== 0)***REMOVED***
                    vec2.rotate(normal, normal, angle);
                ***REMOVED***

                // Project hulls onto that normal
                Narrowphase.projectConvexOntoAxis(c1,offset1,angle1,normal,span1);
                Narrowphase.projectConvexOntoAxis(c2,offset2,angle2,normal,span2);

                // Order by span position
                var a=span1,
                    b=span2,
                    swapped = false;
                if(span1[0] > span2[0])***REMOVED***
                    b=span1;
                    a=span2;
                    swapped = true;
                ***REMOVED***

                // Get separating distance
                var dist = b[0] - a[1];
                overlap = (dist <= 0);

                if(maxDist===null || dist > maxDist)***REMOVED***
                    vec2.copy(sepAxis, normal);
                    maxDist = dist;
                    found = overlap;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED*** else ***REMOVED***

        for(var j=0; j!==2; j++)***REMOVED***
            var c = c1,
                angle = angle1;
            if(j===1)***REMOVED***
                c = c2;
                angle = angle2;
            ***REMOVED***

            for(var i=0; i!==c.vertices.length; i++)***REMOVED***
                // Get the world edge
                vec2.rotate(worldPoint0, c.vertices[i], angle);
                vec2.rotate(worldPoint1, c.vertices[(i+1)%c.vertices.length], angle);

                sub(edge, worldPoint1, worldPoint0);

                // Get normal - just rotate 90 degrees since vertices are given in CCW
                vec2.rotate90cw(normal, edge);
                vec2.normalize(normal,normal);

                // Project hulls onto that normal
                Narrowphase.projectConvexOntoAxis(c1,offset1,angle1,normal,span1);
                Narrowphase.projectConvexOntoAxis(c2,offset2,angle2,normal,span2);

                // Order by span position
                var a=span1,
                    b=span2,
                    swapped = false;
                if(span1[0] > span2[0])***REMOVED***
                    b=span1;
                    a=span2;
                    swapped = true;
                ***REMOVED***

                // Get separating distance
                var dist = b[0] - a[1];
                overlap = (dist <= 0);

                if(maxDist===null || dist > maxDist)***REMOVED***
                    vec2.copy(sepAxis, normal);
                    maxDist = dist;
                    found = overlap;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***


    /*
    // Needs to be tested some more
    for(var j=0; j!==2; j++)***REMOVED***
        var c = c1,
            angle = angle1;
        if(j===1)***REMOVED***
            c = c2;
            angle = angle2;
        ***REMOVED***

        for(var i=0; i!==c.axes.length; i++)***REMOVED***

            var normal = c.axes[i];

            // Project hulls onto that normal
            Narrowphase.projectConvexOntoAxis(c1, offset1, angle1, normal, span1);
            Narrowphase.projectConvexOntoAxis(c2, offset2, angle2, normal, span2);

            // Order by span position
            var a=span1,
                b=span2,
                swapped = false;
            if(span1[0] > span2[0])***REMOVED***
                b=span1;
                a=span2;
                swapped = true;
            ***REMOVED***

            // Get separating distance
            var dist = b[0] - a[1];
            overlap = (dist <= Narrowphase.convexPrecision);

            if(maxDist===null || dist > maxDist)***REMOVED***
                vec2.copy(sepAxis, normal);
                maxDist = dist;
                found = overlap;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
    */

    return found;
***REMOVED***;

// .getClosestEdge is called by other functions, need local tmp vectors
var gce_tmp1 = vec2.fromValues(0,0)
,   gce_tmp2 = vec2.fromValues(0,0)
,   gce_tmp3 = vec2.fromValues(0,0);

/**
 * Get the edge that has a normal closest to an axis.
 * @method getClosestEdge
 * @static
 * @param  ***REMOVED***Convex***REMOVED***     c
 * @param  ***REMOVED***Number***REMOVED***     angle
 * @param  ***REMOVED***Array***REMOVED***      axis
 * @param  ***REMOVED***Boolean***REMOVED***    flip
 * @return ***REMOVED***Number***REMOVED***             Index of the edge that is closest. This index and the next spans the resulting edge. Returns -1 if failed.
 */
Narrowphase.getClosestEdge = function(c,angle,axis,flip)***REMOVED***
    var localAxis = gce_tmp1,
        edge = gce_tmp2,
        normal = gce_tmp3;

    // Convert the axis to local coords of the body
    vec2.rotate(localAxis, axis, -angle);
    if(flip)***REMOVED***
        vec2.scale(localAxis,localAxis,-1);
    ***REMOVED***

    var closestEdge = -1,
        N = c.vertices.length,
        maxDot = -1;
    for(var i=0; i!==N; i++)***REMOVED***
        // Get the edge
        sub(edge, c.vertices[(i+1)%N], c.vertices[i%N]);

        // Get normal - just rotate 90 degrees since vertices are given in CCW
        vec2.rotate90cw(normal, edge);
        vec2.normalize(normal,normal);

        var d = dot(normal,localAxis);
        if(closestEdge === -1 || d > maxDot)***REMOVED***
            closestEdge = i % N;
            maxDot = d;
        ***REMOVED***
    ***REMOVED***

    return closestEdge;
***REMOVED***;

var circleHeightfield_candidate = vec2.create(),
    circleHeightfield_dist = vec2.create(),
    circleHeightfield_v0 = vec2.create(),
    circleHeightfield_v1 = vec2.create(),
    circleHeightfield_minCandidate = vec2.create(),
    circleHeightfield_worldNormal = vec2.create(),
    circleHeightfield_minCandidateNormal = vec2.create();

/**
 * @method circleHeightfield
 * @param  ***REMOVED***Body***REMOVED***           bi
 * @param  ***REMOVED***Circle***REMOVED***         si
 * @param  ***REMOVED***Array***REMOVED***          xi
 * @param  ***REMOVED***Body***REMOVED***           bj
 * @param  ***REMOVED***Heightfield***REMOVED***    sj
 * @param  ***REMOVED***Array***REMOVED***          xj
 * @param  ***REMOVED***Number***REMOVED***         aj
 */
Narrowphase.prototype[Shape.CIRCLE | Shape.HEIGHTFIELD] =
Narrowphase.prototype.circleHeightfield = function( circleBody,circleShape,circlePos,circleAngle,
                                                    hfBody,hfShape,hfPos,hfAngle, justTest, radius )***REMOVED***
    var data = hfShape.heights,
        radius = radius || circleShape.radius,
        w = hfShape.elementWidth,
        dist = circleHeightfield_dist,
        candidate = circleHeightfield_candidate,
        minCandidate = circleHeightfield_minCandidate,
        minCandidateNormal = circleHeightfield_minCandidateNormal,
        worldNormal = circleHeightfield_worldNormal,
        v0 = circleHeightfield_v0,
        v1 = circleHeightfield_v1;

    // Get the index of the points to test against
    var idxA = Math.floor( (circlePos[0] - radius - hfPos[0]) / w ),
        idxB = Math.ceil(  (circlePos[0] + radius - hfPos[0]) / w );

    /*if(idxB < 0 || idxA >= data.length)
        return justTest ? false : 0;*/

    if(idxA < 0)***REMOVED***
        idxA = 0;
    ***REMOVED***
    if(idxB >= data.length)***REMOVED***
        idxB = data.length-1;
    ***REMOVED***

    // Get max and min
    var max = data[idxA],
        min = data[idxB];
    for(var i=idxA; i<idxB; i++)***REMOVED***
        if(data[i] < min)***REMOVED***
            min = data[i];
        ***REMOVED***
        if(data[i] > max)***REMOVED***
            max = data[i];
        ***REMOVED***
    ***REMOVED***

    if(circlePos[1]-radius > max)***REMOVED***
        return justTest ? false : 0;
    ***REMOVED***

    /*
    if(circlePos[1]+radius < min)***REMOVED***
        // Below the minimum point... We can just guess.
        // TODO
    ***REMOVED***
    */

    // 1. Check so center of circle is not inside the field. If it is, this wont work...
    // 2. For each edge
    // 2. 1. Get point on circle that is closest to the edge (scale normal with -radius)
    // 2. 2. Check if point is inside.

    var found = false;

    // Check all edges first
    for(var i=idxA; i<idxB; i++)***REMOVED***

        // Get points
        vec2.set(v0,     i*w, data[i]  );
        vec2.set(v1, (i+1)*w, data[i+1]);
        vec2.add(v0,v0,hfPos);
        vec2.add(v1,v1,hfPos);

        // Get normal
        vec2.sub(worldNormal, v1, v0);
        vec2.rotate(worldNormal, worldNormal, Math.PI/2);
        vec2.normalize(worldNormal,worldNormal);

        // Get point on circle, closest to the edge
        vec2.scale(candidate,worldNormal,-radius);
        vec2.add(candidate,candidate,circlePos);

        // Distance from v0 to the candidate point
        vec2.sub(dist,candidate,v0);

        // Check if it is in the element "stick"
        var d = vec2.dot(dist,worldNormal);
        if(candidate[0] >= v0[0] && candidate[0] < v1[0] && d <= 0)***REMOVED***

            if(justTest)***REMOVED***
                return true;
            ***REMOVED***

            found = true;

            // Store the candidate point, projected to the edge
            vec2.scale(dist,worldNormal,-d);
            vec2.add(minCandidate,candidate,dist);
            vec2.copy(minCandidateNormal,worldNormal);

            var c = this.createContactEquation(hfBody,circleBody,hfShape,circleShape);

            // Normal is out of the heightfield
            vec2.copy(c.normalA, minCandidateNormal);

            // Vector from circle to heightfield
            vec2.scale(c.contactPointB,  c.normalA, -radius);
            add(c.contactPointB, c.contactPointB, circlePos);
            sub(c.contactPointB, c.contactPointB, circleBody.position);

            vec2.copy(c.contactPointA, minCandidate);
            vec2.sub(c.contactPointA, c.contactPointA, hfBody.position);

            this.contactEquations.push(c);

            if(this.enableFriction)***REMOVED***
                this.frictionEquations.push( this.createFrictionFromContact(c) );
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    // Check all vertices
    found = false;
    if(radius > 0)***REMOVED***
        for(var i=idxA; i<=idxB; i++)***REMOVED***

            // Get point
            vec2.set(v0, i*w, data[i]);
            vec2.add(v0,v0,hfPos);

            vec2.sub(dist, circlePos, v0);

            if(vec2.squaredLength(dist) < Math.pow(radius, 2))***REMOVED***

                if(justTest)***REMOVED***
                    return true;
                ***REMOVED***

                found = true;

                var c = this.createContactEquation(hfBody,circleBody,hfShape,circleShape);

                // Construct normal - out of heightfield
                vec2.copy(c.normalA, dist);
                vec2.normalize(c.normalA,c.normalA);

                vec2.scale(c.contactPointB, c.normalA, -radius);
                add(c.contactPointB, c.contactPointB, circlePos);
                sub(c.contactPointB, c.contactPointB, circleBody.position);

                sub(c.contactPointA, v0, hfPos);
                add(c.contactPointA, c.contactPointA, hfPos);
                sub(c.contactPointA, c.contactPointA, hfBody.position);

                this.contactEquations.push(c);

                if(this.enableFriction)***REMOVED***
                    this.frictionEquations.push(this.createFrictionFromContact(c));
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    if(found)***REMOVED***
        return 1;
    ***REMOVED***

    return 0;

***REMOVED***;

var convexHeightfield_v0 = vec2.create(),
    convexHeightfield_v1 = vec2.create(),
    convexHeightfield_tilePos = vec2.create(),
    convexHeightfield_tempConvexShape = new Convex(***REMOVED*** vertices: [vec2.create(),vec2.create(),vec2.create(),vec2.create()] ***REMOVED***);
/**
 * @method circleHeightfield
 * @param  ***REMOVED***Body***REMOVED***           bi
 * @param  ***REMOVED***Circle***REMOVED***         si
 * @param  ***REMOVED***Array***REMOVED***          xi
 * @param  ***REMOVED***Body***REMOVED***           bj
 * @param  ***REMOVED***Heightfield***REMOVED***    sj
 * @param  ***REMOVED***Array***REMOVED***          xj
 * @param  ***REMOVED***Number***REMOVED***         aj
 */
Narrowphase.prototype[Shape.BOX | Shape.HEIGHTFIELD] =
Narrowphase.prototype[Shape.CONVEX | Shape.HEIGHTFIELD] =
Narrowphase.prototype.convexHeightfield = function( convexBody,convexShape,convexPos,convexAngle,
                                                    hfBody,hfShape,hfPos,hfAngle, justTest )***REMOVED***
    var data = hfShape.heights,
        w = hfShape.elementWidth,
        v0 = convexHeightfield_v0,
        v1 = convexHeightfield_v1,
        tilePos = convexHeightfield_tilePos,
        tileConvex = convexHeightfield_tempConvexShape;

    // Get the index of the points to test against
    var idxA = Math.floor( (convexBody.aabb.lowerBound[0] - hfPos[0]) / w ),
        idxB = Math.ceil(  (convexBody.aabb.upperBound[0] - hfPos[0]) / w );

    if(idxA < 0)***REMOVED***
        idxA = 0;
    ***REMOVED***
    if(idxB >= data.length)***REMOVED***
        idxB = data.length-1;
    ***REMOVED***

    // Get max and min
    var max = data[idxA],
        min = data[idxB];
    for(var i=idxA; i<idxB; i++)***REMOVED***
        if(data[i] < min)***REMOVED***
            min = data[i];
        ***REMOVED***
        if(data[i] > max)***REMOVED***
            max = data[i];
        ***REMOVED***
    ***REMOVED***

    if(convexBody.aabb.lowerBound[1] > max)***REMOVED***
        return justTest ? false : 0;
    ***REMOVED***

    var found = false;
    var numContacts = 0;

    // Loop over all edges
    // TODO: If possible, construct a convex from several data points (need o check if the points make a convex shape)
    for(var i=idxA; i<idxB; i++)***REMOVED***

        // Get points
        vec2.set(v0,     i*w, data[i]  );
        vec2.set(v1, (i+1)*w, data[i+1]);
        vec2.add(v0,v0,hfPos);
        vec2.add(v1,v1,hfPos);

        // Construct a convex
        var tileHeight = 100; // todo
        vec2.set(tilePos, (v1[0] + v0[0])*0.5, (v1[1] + v0[1] - tileHeight)*0.5);

        vec2.sub(tileConvex.vertices[0], v1, tilePos);
        vec2.sub(tileConvex.vertices[1], v0, tilePos);
        vec2.copy(tileConvex.vertices[2], tileConvex.vertices[1]);
        vec2.copy(tileConvex.vertices[3], tileConvex.vertices[0]);
        tileConvex.vertices[2][1] -= tileHeight;
        tileConvex.vertices[3][1] -= tileHeight;

        // Do convex collision
        numContacts += this.convexConvex(   convexBody, convexShape, convexPos, convexAngle,
                                            hfBody, tileConvex, tilePos, 0, justTest);
    ***REMOVED***

    return numContacts;
***REMOVED***;
***REMOVED***,***REMOVED***"../equations/ContactEquation":21,"../equations/Equation":22,"../equations/FrictionEquation":23,"../math/vec2":30,"../objects/Body":31,"../shapes/Box":37,"../shapes/Circle":39,"../shapes/Convex":40,"../shapes/Shape":45,"../utils/ContactEquationPool":48,"../utils/FrictionEquationPool":49,"../utils/TupleDictionary":56,"../utils/Utils":57***REMOVED***],11:[function(_dereq_,module,exports)***REMOVED***
module.exports = Ray;

var vec2 = _dereq_('../math/vec2');
var RaycastResult = _dereq_('../collision/RaycastResult');
var Shape = _dereq_('../shapes/Shape');
var AABB = _dereq_('../collision/AABB');

/**
 * A line with a start and end point that is used to intersect shapes. For an example, see ***REMOVED******REMOVED***#crossLink "World/raycast:method"***REMOVED******REMOVED***World.raycast***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***
 * @class Ray
 * @constructor
 * @param ***REMOVED***object***REMOVED*** [options]
 * @param ***REMOVED***array***REMOVED*** [options.from]
 * @param ***REMOVED***array***REMOVED*** [options.to]
 * @param ***REMOVED***boolean***REMOVED*** [options.checkCollisionResponse=true]
 * @param ***REMOVED***boolean***REMOVED*** [options.skipBackfaces=false]
 * @param ***REMOVED***number***REMOVED*** [options.collisionMask=-1]
 * @param ***REMOVED***number***REMOVED*** [options.collisionGroup=-1]
 * @param ***REMOVED***number***REMOVED*** [options.mode=Ray.ANY]
 * @param ***REMOVED***number***REMOVED*** [options.callback]
 */
function Ray(options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    /**
     * Ray start point.
     * @property ***REMOVED***array***REMOVED*** from
     */
    this.from = options.from ? vec2.fromValues(options.from[0], options.from[1]) : vec2.create();

    /**
     * Ray end point
     * @property ***REMOVED***array***REMOVED*** to
     */
    this.to = options.to ? vec2.fromValues(options.to[0], options.to[1]) : vec2.create();

    /**
     * Set to true if you want the Ray to take .collisionResponse flags into account on bodies and shapes.
     * @property ***REMOVED***Boolean***REMOVED*** checkCollisionResponse
     */
    this.checkCollisionResponse = options.checkCollisionResponse !== undefined ? options.checkCollisionResponse : true;

    /**
     * If set to true, the ray skips any hits with normal.dot(rayDirection) < 0.
     * @property ***REMOVED***Boolean***REMOVED*** skipBackfaces
     */
    this.skipBackfaces = !!options.skipBackfaces;

    /**
     * @property ***REMOVED***number***REMOVED*** collisionMask
     * @default -1
     */
    this.collisionMask = options.collisionMask !== undefined ? options.collisionMask : -1;

    /**
     * @property ***REMOVED***number***REMOVED*** collisionGroup
     * @default -1
     */
    this.collisionGroup = options.collisionGroup !== undefined ? options.collisionGroup : -1;

    /**
     * The intersection mode. Should be ***REMOVED******REMOVED***#crossLink "Ray/ANY:property"***REMOVED******REMOVED***Ray.ANY***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***, ***REMOVED******REMOVED***#crossLink "Ray/ALL:property"***REMOVED******REMOVED***Ray.ALL***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** or ***REMOVED******REMOVED***#crossLink "Ray/CLOSEST:property"***REMOVED******REMOVED***Ray.CLOSEST***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***.
     * @property ***REMOVED***number***REMOVED*** mode
     */
    this.mode = options.mode !== undefined ? options.mode : Ray.ANY;

    /**
     * Current, user-provided result callback. Will be used if mode is Ray.ALL.
     * @property ***REMOVED***Function***REMOVED*** callback
     */
    this.callback = options.callback || function(result)***REMOVED******REMOVED***;

    /**
     * @readOnly
     * @property ***REMOVED***array***REMOVED*** direction
     */
    this.direction = vec2.create();

    /**
     * Length of the ray
     * @readOnly
     * @property ***REMOVED***number***REMOVED*** length
     */
    this.length = 1;

    this.update();
***REMOVED***
Ray.prototype.constructor = Ray;

/**
 * This raycasting mode will make the Ray traverse through all intersection points and only return the closest one.
 * @static
 * @property ***REMOVED***Number***REMOVED*** CLOSEST
 */
Ray.CLOSEST = 1;

/**
 * This raycasting mode will make the Ray stop when it finds the first intersection point.
 * @static
 * @property ***REMOVED***Number***REMOVED*** ANY
 */
Ray.ANY = 2;

/**
 * This raycasting mode will traverse all intersection points and executes a callback for each one.
 * @static
 * @property ***REMOVED***Number***REMOVED*** ALL
 */
Ray.ALL = 4;

/**
 * Should be called if you change the from or to point.
 * @method update
 */
Ray.prototype.update = function()***REMOVED***

    // Update .direction and .length
    var d = this.direction;
    vec2.sub(d, this.to, this.from);
    this.length = vec2.length(d);
    vec2.normalize(d, d);

***REMOVED***;

/**
 * @method intersectBodies
 * @param ***REMOVED***Array***REMOVED*** bodies An array of Body objects.
 */
Ray.prototype.intersectBodies = function (result, bodies) ***REMOVED***
    for (var i = 0, l = bodies.length; !result.shouldStop(this) && i < l; i++) ***REMOVED***
        var body = bodies[i];
        var aabb = body.getAABB();
        if(aabb.overlapsRay(this) >= 0 || aabb.containsPoint(this.from))***REMOVED***
            this.intersectBody(result, body);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

var intersectBody_worldPosition = vec2.create();

/**
 * Shoot a ray at a body, get back information about the hit.
 * @method intersectBody
 * @private
 * @param ***REMOVED***Body***REMOVED*** body
 */
Ray.prototype.intersectBody = function (result, body) ***REMOVED***
    var checkCollisionResponse = this.checkCollisionResponse;

    if(checkCollisionResponse && !body.collisionResponse)***REMOVED***
        return;
    ***REMOVED***

    var worldPosition = intersectBody_worldPosition;

    for (var i = 0, N = body.shapes.length; i < N; i++) ***REMOVED***
        var shape = body.shapes[i];

        if(checkCollisionResponse && !shape.collisionResponse)***REMOVED***
            continue; // Skip
        ***REMOVED***

        if((this.collisionGroup & shape.collisionMask) === 0 || (shape.collisionGroup & this.collisionMask) === 0)***REMOVED***
            continue;
        ***REMOVED***

        // Get world angle and position of the shape
        vec2.rotate(worldPosition, shape.position, body.angle);
        vec2.add(worldPosition, worldPosition, body.position);
        var worldAngle = shape.angle + body.angle;

        this.intersectShape(
            result,
            shape,
            worldAngle,
            worldPosition,
            body
        );

        if(result.shouldStop(this))***REMOVED***
            break;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

/**
 * @method intersectShape
 * @private
 * @param ***REMOVED***Shape***REMOVED*** shape
 * @param ***REMOVED***number***REMOVED*** angle
 * @param ***REMOVED***array***REMOVED*** position
 * @param ***REMOVED***Body***REMOVED*** body
 */
Ray.prototype.intersectShape = function(result, shape, angle, position, body)***REMOVED***
    var from = this.from;

    // Checking radius
    var distance = distanceFromIntersectionSquared(from, this.direction, position);
    if (distance > shape.boundingRadius * shape.boundingRadius) ***REMOVED***
        return;
    ***REMOVED***

    this._currentBody = body;
    this._currentShape = shape;

    shape.raycast(result, this, position, angle);

    this._currentBody = this._currentShape = null;
***REMOVED***;

/**
 * Get the AABB of the ray.
 * @method getAABB
 * @param  ***REMOVED***AABB***REMOVED*** aabb
 */
Ray.prototype.getAABB = function(result)***REMOVED***
    var to = this.to;
    var from = this.from;
    vec2.set(
        result.lowerBound,
        Math.min(to[0], from[0]),
        Math.min(to[1], from[1])
    );
    vec2.set(
        result.upperBound,
        Math.max(to[0], from[0]),
        Math.max(to[1], from[1])
    );
***REMOVED***;

var hitPointWorld = vec2.create();

/**
 * @method reportIntersection
 * @private
 * @param  ***REMOVED***number***REMOVED*** fraction
 * @param  ***REMOVED***array***REMOVED*** normal
 * @param  ***REMOVED***number***REMOVED*** [faceIndex=-1]
 * @return ***REMOVED***boolean***REMOVED*** True if the intersections should continue
 */
Ray.prototype.reportIntersection = function(result, fraction, normal, faceIndex)***REMOVED***
    var from = this.from;
    var to = this.to;
    var shape = this._currentShape;
    var body = this._currentBody;

    // Skip back faces?
    if(this.skipBackfaces && vec2.dot(normal, this.direction) > 0)***REMOVED***
        return;
    ***REMOVED***

    switch(this.mode)***REMOVED***

    case Ray.ALL:
        result.set(
            normal,
            shape,
            body,
            fraction,
            faceIndex
        );
        this.callback(result);
        break;

    case Ray.CLOSEST:

        // Store if closer than current closest
        if(fraction < result.fraction || !result.hasHit())***REMOVED***
            result.set(
                normal,
                shape,
                body,
                fraction,
                faceIndex
            );
        ***REMOVED***
        break;

    case Ray.ANY:

        // Report and stop.
        result.set(
            normal,
            shape,
            body,
            fraction,
            faceIndex
        );
        break;
    ***REMOVED***
***REMOVED***;

var v0 = vec2.create(),
    intersect = vec2.create();
function distanceFromIntersectionSquared(from, direction, position) ***REMOVED***

    // v0 is vector from from to position
    vec2.sub(v0, position, from);
    var dot = vec2.dot(v0, direction);

    // intersect = direction * dot + from
    vec2.scale(intersect, direction, dot);
    vec2.add(intersect, intersect, from);

    return vec2.squaredDistance(position, intersect);
***REMOVED***


***REMOVED***,***REMOVED***"../collision/AABB":7,"../collision/RaycastResult":12,"../math/vec2":30,"../shapes/Shape":45***REMOVED***],12:[function(_dereq_,module,exports)***REMOVED***
var vec2 = _dereq_('../math/vec2');
var Ray = _dereq_('../collision/Ray');

module.exports = RaycastResult;

/**
 * Storage for Ray casting hit data.
 * @class RaycastResult
 * @constructor
 */
function RaycastResult()***REMOVED***

	/**
	 * The normal of the hit, oriented in world space.
	 * @property ***REMOVED***array***REMOVED*** normal
	 */
	this.normal = vec2.create();

	/**
	 * The hit shape, or null.
	 * @property ***REMOVED***Shape***REMOVED*** shape
	 */
	this.shape = null;

	/**
	 * The hit body, or null.
	 * @property ***REMOVED***Body***REMOVED*** body
	 */
	this.body = null;

	/**
	 * The index of the hit triangle, if the hit shape was indexable.
	 * @property ***REMOVED***number***REMOVED*** faceIndex
	 * @default -1
	 */
	this.faceIndex = -1;

	/**
	 * Distance to the hit, as a fraction. 0 is at the "from" point, 1 is at the "to" point. Will be set to -1 if there was no hit yet.
	 * @property ***REMOVED***number***REMOVED*** fraction
	 * @default -1
	 */
	this.fraction = -1;

	/**
	 * If the ray should stop traversing.
	 * @readonly
	 * @property ***REMOVED***Boolean***REMOVED*** isStopped
	 */
	this.isStopped = false;
***REMOVED***

/**
 * Reset all result data. Must be done before re-using the result object.
 * @method reset
 */
RaycastResult.prototype.reset = function () ***REMOVED***
	vec2.set(this.normal, 0, 0);
	this.shape = null;
	this.body = null;
	this.faceIndex = -1;
	this.fraction = -1;
	this.isStopped = false;
***REMOVED***;

/**
 * Get the distance to the hit point.
 * @method getHitDistance
 * @param ***REMOVED***Ray***REMOVED*** ray
 */
RaycastResult.prototype.getHitDistance = function (ray) ***REMOVED***
	return vec2.distance(ray.from, ray.to) * this.fraction;
***REMOVED***;

/**
 * Returns true if the ray hit something since the last reset().
 * @method hasHit
 */
RaycastResult.prototype.hasHit = function () ***REMOVED***
	return this.fraction !== -1;
***REMOVED***;

/**
 * Get world hit point.
 * @method getHitPoint
 * @param ***REMOVED***array***REMOVED*** out
 * @param ***REMOVED***Ray***REMOVED*** ray
 */
RaycastResult.prototype.getHitPoint = function (out, ray) ***REMOVED***
	vec2.lerp(out, ray.from, ray.to, this.fraction);
***REMOVED***;

/**
 * Can be called while iterating over hits to stop searching for hit points.
 * @method stop
 */
RaycastResult.prototype.stop = function()***REMOVED***
	this.isStopped = true;
***REMOVED***;

/**
 * @method shouldStop
 * @private
 * @param ***REMOVED***Ray***REMOVED*** ray
 * @return ***REMOVED***boolean***REMOVED***
 */
RaycastResult.prototype.shouldStop = function(ray)***REMOVED***
	return this.isStopped || (this.fraction !== -1 && ray.mode === Ray.ANY);
***REMOVED***;

/**
 * @method set
 * @private
 * @param ***REMOVED***array***REMOVED*** normal
 * @param ***REMOVED***Shape***REMOVED*** shape
 * @param ***REMOVED***Body***REMOVED*** body
 * @param ***REMOVED***number***REMOVED*** fraction
 */
RaycastResult.prototype.set = function(
	normal,
	shape,
	body,
	fraction,
	faceIndex
)***REMOVED***
	vec2.copy(this.normal, normal);
	this.shape = shape;
	this.body = body;
	this.fraction = fraction;
	this.faceIndex = faceIndex;
***REMOVED***;
***REMOVED***,***REMOVED***"../collision/Ray":11,"../math/vec2":30***REMOVED***],13:[function(_dereq_,module,exports)***REMOVED***
var Utils = _dereq_('../utils/Utils')
,   Broadphase = _dereq_('../collision/Broadphase');

module.exports = SAPBroadphase;

/**
 * Sweep and prune broadphase along one axis.
 *
 * @class SAPBroadphase
 * @constructor
 * @extends Broadphase
 */
function SAPBroadphase()***REMOVED***
    Broadphase.call(this,Broadphase.SAP);

    /**
     * List of bodies currently in the broadphase.
     * @property axisList
     * @type ***REMOVED***Array***REMOVED***
     */
    this.axisList = [];

    /**
     * The axis to sort along. 0 means x-axis and 1 y-axis. If your bodies are more spread out over the X axis, set axisIndex to 0, and you will gain some performance.
     * @property axisIndex
     * @type ***REMOVED***Number***REMOVED***
     */
    this.axisIndex = 0;

    var that = this;
    this._addBodyHandler = function(e)***REMOVED***
        that.axisList.push(e.body);
    ***REMOVED***;

    this._removeBodyHandler = function(e)***REMOVED***
        // Remove from list
        var idx = that.axisList.indexOf(e.body);
        if(idx !== -1)***REMOVED***
            that.axisList.splice(idx,1);
        ***REMOVED***
    ***REMOVED***;
***REMOVED***
SAPBroadphase.prototype = new Broadphase();
SAPBroadphase.prototype.constructor = SAPBroadphase;

/**
 * Change the world
 * @method setWorld
 * @param ***REMOVED***World***REMOVED*** world
 */
SAPBroadphase.prototype.setWorld = function(world)***REMOVED***
    // Clear the old axis array
    this.axisList.length = 0;

    // Add all bodies from the new world
    Utils.appendArray(this.axisList, world.bodies);

    // Remove old handlers, if any
    world
        .off("addBody",this._addBodyHandler)
        .off("removeBody",this._removeBodyHandler);

    // Add handlers to update the list of bodies.
    world.on("addBody",this._addBodyHandler).on("removeBody",this._removeBodyHandler);

    this.world = world;
***REMOVED***;

/**
 * Sorts bodies along an axis.
 * @method sortAxisList
 * @param ***REMOVED***Array***REMOVED*** a
 * @param ***REMOVED***number***REMOVED*** axisIndex
 * @return ***REMOVED***Array***REMOVED***
 */
SAPBroadphase.sortAxisList = function(a, axisIndex)***REMOVED***
    axisIndex = axisIndex|0;
    for(var i=1,l=a.length; i<l; i++) ***REMOVED***
        var v = a[i];
        for(var j=i - 1;j>=0;j--) ***REMOVED***
            if(a[j].aabb.lowerBound[axisIndex] <= v.aabb.lowerBound[axisIndex])***REMOVED***
                break;
            ***REMOVED***
            a[j+1] = a[j];
        ***REMOVED***
        a[j+1] = v;
    ***REMOVED***
    return a;
***REMOVED***;

SAPBroadphase.prototype.sortList = function()***REMOVED***
    var bodies = this.axisList,
    axisIndex = this.axisIndex;

    // Sort the lists
    SAPBroadphase.sortAxisList(bodies, axisIndex);
***REMOVED***;

/**
 * Get the colliding pairs
 * @method getCollisionPairs
 * @param  ***REMOVED***World***REMOVED*** world
 * @return ***REMOVED***Array***REMOVED***
 */
SAPBroadphase.prototype.getCollisionPairs = function(world)***REMOVED***
    var bodies = this.axisList,
        result = this.result,
        axisIndex = this.axisIndex;

    result.length = 0;

    // Update all AABBs if needed
    var l = bodies.length;
    while(l--)***REMOVED***
        var b = bodies[l];
        if(b.aabbNeedsUpdate)***REMOVED***
            b.updateAABB();
        ***REMOVED***
    ***REMOVED***

    // Sort the lists
    this.sortList();

    // Look through the X list
    for(var i=0, N=bodies.length|0; i!==N; i++)***REMOVED***
        var bi = bodies[i];

        for(var j=i+1; j<N; j++)***REMOVED***
            var bj = bodies[j];

            // Bounds overlap?
            var overlaps = (bj.aabb.lowerBound[axisIndex] <= bi.aabb.upperBound[axisIndex]);
            if(!overlaps)***REMOVED***
                break;
            ***REMOVED***

            if(Broadphase.canCollide(bi,bj) && this.boundingVolumeCheck(bi,bj))***REMOVED***
                result.push(bi,bj);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return result;
***REMOVED***;

/**
 * Returns all the bodies within an AABB.
 * @method aabbQuery
 * @param  ***REMOVED***World***REMOVED*** world
 * @param  ***REMOVED***AABB***REMOVED*** aabb
 * @param ***REMOVED***array***REMOVED*** result An array to store resulting bodies in.
 * @return ***REMOVED***array***REMOVED***
 */
SAPBroadphase.prototype.aabbQuery = function(world, aabb, result)***REMOVED***
    result = result || [];

    this.sortList();

    var axisIndex = this.axisIndex;
    var axis = 'x';
    if(axisIndex === 1)***REMOVED*** axis = 'y'; ***REMOVED***
    if(axisIndex === 2)***REMOVED*** axis = 'z'; ***REMOVED***

    var axisList = this.axisList;
    var lower = aabb.lowerBound[axis];
    var upper = aabb.upperBound[axis];
    for(var i = 0; i < axisList.length; i++)***REMOVED***
        var b = axisList[i];

        if(b.aabbNeedsUpdate)***REMOVED***
            b.updateAABB();
        ***REMOVED***

        if(b.aabb.overlaps(aabb))***REMOVED***
            result.push(b);
        ***REMOVED***
    ***REMOVED***

    return result;
***REMOVED***;
***REMOVED***,***REMOVED***"../collision/Broadphase":8,"../utils/Utils":57***REMOVED***],14:[function(_dereq_,module,exports)***REMOVED***
module.exports = Constraint;

var Utils = _dereq_('../utils/Utils');

/**
 * Base constraint class.
 *
 * @class Constraint
 * @constructor
 * @author schteppe
 * @param ***REMOVED***Body***REMOVED*** bodyA
 * @param ***REMOVED***Body***REMOVED*** bodyB
 * @param ***REMOVED***Number***REMOVED*** type
 * @param ***REMOVED***Object***REMOVED*** [options]
 * @param ***REMOVED***Object***REMOVED*** [options.collideConnected=true]
 */
function Constraint(bodyA, bodyB, type, options)***REMOVED***

    /**
     * The type of constraint. May be one of Constraint.DISTANCE, Constraint.GEAR, Constraint.LOCK, Constraint.PRISMATIC or Constraint.REVOLUTE.
     * @property ***REMOVED***number***REMOVED*** type
     */
    this.type = type;

    options = Utils.defaults(options,***REMOVED***
        collideConnected : true,
        wakeUpBodies : true,
    ***REMOVED***);

    /**
     * Equations to be solved in this constraint
     *
     * @property equations
     * @type ***REMOVED***Array***REMOVED***
     */
    this.equations = [];

    /**
     * First body participating in the constraint.
     * @property bodyA
     * @type ***REMOVED***Body***REMOVED***
     */
    this.bodyA = bodyA;

    /**
     * Second body participating in the constraint.
     * @property bodyB
     * @type ***REMOVED***Body***REMOVED***
     */
    this.bodyB = bodyB;

    /**
     * Set to true if you want the connected bodies to collide.
     * @property collideConnected
     * @type ***REMOVED***Boolean***REMOVED***
     * @default true
     */
    this.collideConnected = options.collideConnected;

    // Wake up bodies when connected
    if(options.wakeUpBodies)***REMOVED***
        if(bodyA)***REMOVED***
            bodyA.wakeUp();
        ***REMOVED***
        if(bodyB)***REMOVED***
            bodyB.wakeUp();
        ***REMOVED***
    ***REMOVED***
***REMOVED***

/**
 * Updates the internal constraint parameters before solve.
 * @method update
 */
Constraint.prototype.update = function()***REMOVED***
    throw new Error("method update() not implmemented in this Constraint subclass!");
***REMOVED***;

/**
 * @static
 * @property ***REMOVED***number***REMOVED*** DISTANCE
 */
Constraint.DISTANCE = 1;

/**
 * @static
 * @property ***REMOVED***number***REMOVED*** GEAR
 */
Constraint.GEAR = 2;

/**
 * @static
 * @property ***REMOVED***number***REMOVED*** LOCK
 */
Constraint.LOCK = 3;

/**
 * @static
 * @property ***REMOVED***number***REMOVED*** PRISMATIC
 */
Constraint.PRISMATIC = 4;

/**
 * @static
 * @property ***REMOVED***number***REMOVED*** REVOLUTE
 */
Constraint.REVOLUTE = 5;

/**
 * Set stiffness for this constraint.
 * @method setStiffness
 * @param ***REMOVED***Number***REMOVED*** stiffness
 */
Constraint.prototype.setStiffness = function(stiffness)***REMOVED***
    var eqs = this.equations;
    for(var i=0; i !== eqs.length; i++)***REMOVED***
        var eq = eqs[i];
        eq.stiffness = stiffness;
        eq.needsUpdate = true;
    ***REMOVED***
***REMOVED***;

/**
 * Set relaxation for this constraint.
 * @method setRelaxation
 * @param ***REMOVED***Number***REMOVED*** relaxation
 */
Constraint.prototype.setRelaxation = function(relaxation)***REMOVED***
    var eqs = this.equations;
    for(var i=0; i !== eqs.length; i++)***REMOVED***
        var eq = eqs[i];
        eq.relaxation = relaxation;
        eq.needsUpdate = true;
    ***REMOVED***
***REMOVED***;

***REMOVED***,***REMOVED***"../utils/Utils":57***REMOVED***],15:[function(_dereq_,module,exports)***REMOVED***
var Constraint = _dereq_('./Constraint')
,   Equation = _dereq_('../equations/Equation')
,   vec2 = _dereq_('../math/vec2')
,   Utils = _dereq_('../utils/Utils');

module.exports = DistanceConstraint;

/**
 * Constraint that tries to keep the distance between two bodies constant.
 *
 * @class DistanceConstraint
 * @constructor
 * @author schteppe
 * @param ***REMOVED***Body***REMOVED*** bodyA
 * @param ***REMOVED***Body***REMOVED*** bodyB
 * @param ***REMOVED***object***REMOVED*** [options]
 * @param ***REMOVED***number***REMOVED*** [options.distance] The distance to keep between the anchor points. Defaults to the current distance between the bodies.
 * @param ***REMOVED***Array***REMOVED*** [options.localAnchorA] The anchor point for bodyA, defined locally in bodyA frame. Defaults to [0,0].
 * @param ***REMOVED***Array***REMOVED*** [options.localAnchorB] The anchor point for bodyB, defined locally in bodyB frame. Defaults to [0,0].
 * @param ***REMOVED***object***REMOVED*** [options.maxForce=Number.MAX_VALUE] Maximum force to apply.
 * @extends Constraint
 *
 * @example
 *     // If distance is not given as an option, then the current distance between the bodies is used.
 *     // In this example, the bodies will be constrained to have a distance of 2 between their centers.
 *     var bodyA = new Body(***REMOVED*** mass: 1, position: [-1, 0] ***REMOVED***);
 *     var bodyB = new Body(***REMOVED*** mass: 1, position: [1, 0] ***REMOVED***);
 *     var constraint = new DistanceConstraint(bodyA, bodyB);
 *     world.addConstraint(constraint);
 *
 * @example
 *     // Manually set the distance and anchors
 *     var constraint = new DistanceConstraint(bodyA, bodyB, ***REMOVED***
 *         distance: 1,          // Distance to keep between the points
 *         localAnchorA: [1, 0], // Point on bodyA
 *         localAnchorB: [-1, 0] // Point on bodyB
 *     ***REMOVED***);
 *     world.addConstraint(constraint);
 */
function DistanceConstraint(bodyA,bodyB,options)***REMOVED***
    options = Utils.defaults(options,***REMOVED***
        localAnchorA:[0,0],
        localAnchorB:[0,0]
    ***REMOVED***);

    Constraint.call(this,bodyA,bodyB,Constraint.DISTANCE,options);

    /**
     * Local anchor in body A.
     * @property localAnchorA
     * @type ***REMOVED***Array***REMOVED***
     */
    this.localAnchorA = vec2.fromValues(options.localAnchorA[0], options.localAnchorA[1]);

    /**
     * Local anchor in body B.
     * @property localAnchorB
     * @type ***REMOVED***Array***REMOVED***
     */
    this.localAnchorB = vec2.fromValues(options.localAnchorB[0], options.localAnchorB[1]);

    var localAnchorA = this.localAnchorA;
    var localAnchorB = this.localAnchorB;

    /**
     * The distance to keep.
     * @property distance
     * @type ***REMOVED***Number***REMOVED***
     */
    this.distance = 0;

    if(typeof(options.distance) === 'number')***REMOVED***
        this.distance = options.distance;
    ***REMOVED*** else ***REMOVED***
        // Use the current world distance between the world anchor points.
        var worldAnchorA = vec2.create(),
            worldAnchorB = vec2.create(),
            r = vec2.create();

        // Transform local anchors to world
        vec2.rotate(worldAnchorA, localAnchorA, bodyA.angle);
        vec2.rotate(worldAnchorB, localAnchorB, bodyB.angle);

        vec2.add(r, bodyB.position, worldAnchorB);
        vec2.sub(r, r, worldAnchorA);
        vec2.sub(r, r, bodyA.position);

        this.distance = vec2.length(r);
    ***REMOVED***

    var maxForce;
    if(typeof(options.maxForce)==="undefined" )***REMOVED***
        maxForce = Number.MAX_VALUE;
    ***REMOVED*** else ***REMOVED***
        maxForce = options.maxForce;
    ***REMOVED***

    var normal = new Equation(bodyA,bodyB,-maxForce,maxForce); // Just in the normal direction
    this.equations = [ normal ];

    /**
     * Max force to apply.
     * @property ***REMOVED***number***REMOVED*** maxForce
     */
    this.maxForce = maxForce;

    // g = (xi - xj).dot(n)
    // dg/dt = (vi - vj).dot(n) = G*W = [n 0 -n 0] * [vi wi vj wj]'

    // ...and if we were to include offset points:
    // g =
    //      (xj + rj - xi - ri).dot(n) - distance
    //
    // dg/dt =
    //      (vj + wj x rj - vi - wi x ri).dot(n) =
    //      ***REMOVED*** term 2 is near zero ***REMOVED*** =
    //      [-n   -ri x n   n   rj x n] * [vi wi vj wj]' =
    //      G * W
    //
    // => G = [-n -rixn n rjxn]

    var r = vec2.create();
    var ri = vec2.create(); // worldAnchorA
    var rj = vec2.create(); // worldAnchorB
    var that = this;
    normal.computeGq = function()***REMOVED***
        var bodyA = this.bodyA,
            bodyB = this.bodyB,
            xi = bodyA.position,
            xj = bodyB.position;

        // Transform local anchors to world
        vec2.rotate(ri, localAnchorA, bodyA.angle);
        vec2.rotate(rj, localAnchorB, bodyB.angle);

        vec2.add(r, xj, rj);
        vec2.sub(r, r, ri);
        vec2.sub(r, r, xi);

        //vec2.sub(r, bodyB.position, bodyA.position);
        return vec2.length(r) - that.distance;
    ***REMOVED***;

    // Make the contact constraint bilateral
    this.setMaxForce(maxForce);

    /**
     * If the upper limit is enabled or not.
     * @property ***REMOVED***Boolean***REMOVED*** upperLimitEnabled
     */
    this.upperLimitEnabled = false;

    /**
     * The upper constraint limit.
     * @property ***REMOVED***number***REMOVED*** upperLimit
     */
    this.upperLimit = 1;

    /**
     * If the lower limit is enabled or not.
     * @property ***REMOVED***Boolean***REMOVED*** lowerLimitEnabled
     */
    this.lowerLimitEnabled = false;

    /**
     * The lower constraint limit.
     * @property ***REMOVED***number***REMOVED*** lowerLimit
     */
    this.lowerLimit = 0;

    /**
     * Current constraint position. This is equal to the current distance between the world anchor points.
     * @property ***REMOVED***number***REMOVED*** position
     */
    this.position = 0;
***REMOVED***
DistanceConstraint.prototype = new Constraint();
DistanceConstraint.prototype.constructor = DistanceConstraint;

/**
 * Update the constraint equations. Should be done if any of the bodies changed position, before solving.
 * @method update
 */
var n = vec2.create();
var ri = vec2.create(); // worldAnchorA
var rj = vec2.create(); // worldAnchorB
DistanceConstraint.prototype.update = function()***REMOVED***
    var normal = this.equations[0],
        bodyA = this.bodyA,
        bodyB = this.bodyB,
        distance = this.distance,
        xi = bodyA.position,
        xj = bodyB.position,
        normalEquation = this.equations[0],
        G = normal.G;

    // Transform local anchors to world
    vec2.rotate(ri, this.localAnchorA, bodyA.angle);
    vec2.rotate(rj, this.localAnchorB, bodyB.angle);

    // Get world anchor points and normal
    vec2.add(n, xj, rj);
    vec2.sub(n, n, ri);
    vec2.sub(n, n, xi);
    this.position = vec2.length(n);

    var violating = false;
    if(this.upperLimitEnabled)***REMOVED***
        if(this.position > this.upperLimit)***REMOVED***
            normalEquation.maxForce = 0;
            normalEquation.minForce = -this.maxForce;
            this.distance = this.upperLimit;
            violating = true;
        ***REMOVED***
    ***REMOVED***

    if(this.lowerLimitEnabled)***REMOVED***
        if(this.position < this.lowerLimit)***REMOVED***
            normalEquation.maxForce = this.maxForce;
            normalEquation.minForce = 0;
            this.distance = this.lowerLimit;
            violating = true;
        ***REMOVED***
    ***REMOVED***

    if((this.lowerLimitEnabled || this.upperLimitEnabled) && !violating)***REMOVED***
        // No constraint needed.
        normalEquation.enabled = false;
        return;
    ***REMOVED***

    normalEquation.enabled = true;

    vec2.normalize(n,n);

    // Caluclate cross products
    var rixn = vec2.crossLength(ri, n),
        rjxn = vec2.crossLength(rj, n);

    // G = [-n -rixn n rjxn]
    G[0] = -n[0];
    G[1] = -n[1];
    G[2] = -rixn;
    G[3] = n[0];
    G[4] = n[1];
    G[5] = rjxn;
***REMOVED***;

/**
 * Set the max force to be used
 * @method setMaxForce
 * @param ***REMOVED***Number***REMOVED*** maxForce
 */
DistanceConstraint.prototype.setMaxForce = function(maxForce)***REMOVED***
    var normal = this.equations[0];
    normal.minForce = -maxForce;
    normal.maxForce =  maxForce;
***REMOVED***;

/**
 * Get the max force
 * @method getMaxForce
 * @return ***REMOVED***Number***REMOVED***
 */
DistanceConstraint.prototype.getMaxForce = function()***REMOVED***
    var normal = this.equations[0];
    return normal.maxForce;
***REMOVED***;

***REMOVED***,***REMOVED***"../equations/Equation":22,"../math/vec2":30,"../utils/Utils":57,"./Constraint":14***REMOVED***],16:[function(_dereq_,module,exports)***REMOVED***
var Constraint = _dereq_('./Constraint')
,   Equation = _dereq_('../equations/Equation')
,   AngleLockEquation = _dereq_('../equations/AngleLockEquation')
,   vec2 = _dereq_('../math/vec2');

module.exports = GearConstraint;

/**
 * Constrains the angle of two bodies to each other to be equal. If a gear ratio is not one, the angle of bodyA must be a multiple of the angle of bodyB.
 * @class GearConstraint
 * @constructor
 * @author schteppe
 * @param ***REMOVED***Body***REMOVED***            bodyA
 * @param ***REMOVED***Body***REMOVED***            bodyB
 * @param ***REMOVED***Object***REMOVED***          [options]
 * @param ***REMOVED***Number***REMOVED***          [options.angle=0] Relative angle between the bodies. Will be set to the current angle between the bodies (the gear ratio is accounted for).
 * @param ***REMOVED***Number***REMOVED***          [options.ratio=1] Gear ratio.
 * @param ***REMOVED***Number***REMOVED***          [options.maxTorque] Maximum torque to apply.
 * @extends Constraint
 *
 * @example
 *     var constraint = new GearConstraint(bodyA, bodyB);
 *     world.addConstraint(constraint);
 *
 * @example
 *     var constraint = new GearConstraint(bodyA, bodyB, ***REMOVED***
 *         ratio: 2,
 *         maxTorque: 1000
 *     ***REMOVED***);
 *     world.addConstraint(constraint);
 */
function GearConstraint(bodyA, bodyB, options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    Constraint.call(this, bodyA, bodyB, Constraint.GEAR, options);

    /**
     * The gear ratio.
     * @property ratio
     * @type ***REMOVED***Number***REMOVED***
     */
    this.ratio = options.ratio !== undefined ? options.ratio : 1;

    /**
     * The relative angle
     * @property angle
     * @type ***REMOVED***Number***REMOVED***
     */
    this.angle = options.angle !== undefined ? options.angle : bodyB.angle - this.ratio * bodyA.angle;

    // Send same parameters to the equation
    options.angle = this.angle;
    options.ratio = this.ratio;

    this.equations = [
        new AngleLockEquation(bodyA,bodyB,options),
    ];

    // Set max torque
    if(options.maxTorque !== undefined)***REMOVED***
        this.setMaxTorque(options.maxTorque);
    ***REMOVED***
***REMOVED***
GearConstraint.prototype = new Constraint();
GearConstraint.prototype.constructor = GearConstraint;

GearConstraint.prototype.update = function()***REMOVED***
    var eq = this.equations[0];
    if(eq.ratio !== this.ratio)***REMOVED***
        eq.setRatio(this.ratio);
    ***REMOVED***
    eq.angle = this.angle;
***REMOVED***;

/**
 * Set the max torque for the constraint.
 * @method setMaxTorque
 * @param ***REMOVED***Number***REMOVED*** torque
 */
GearConstraint.prototype.setMaxTorque = function(torque)***REMOVED***
    this.equations[0].setMaxTorque(torque);
***REMOVED***;

/**
 * Get the max torque for the constraint.
 * @method getMaxTorque
 * @return ***REMOVED***Number***REMOVED***
 */
GearConstraint.prototype.getMaxTorque = function(torque)***REMOVED***
    return this.equations[0].maxForce;
***REMOVED***;
***REMOVED***,***REMOVED***"../equations/AngleLockEquation":20,"../equations/Equation":22,"../math/vec2":30,"./Constraint":14***REMOVED***],17:[function(_dereq_,module,exports)***REMOVED***
var Constraint = _dereq_('./Constraint')
,   vec2 = _dereq_('../math/vec2')
,   Equation = _dereq_('../equations/Equation');

module.exports = LockConstraint;

/**
 * Locks the relative position and rotation between two bodies.
 *
 * @class LockConstraint
 * @constructor
 * @author schteppe
 * @param ***REMOVED***Body***REMOVED*** bodyA
 * @param ***REMOVED***Body***REMOVED*** bodyB
 * @param ***REMOVED***Object***REMOVED*** [options]
 * @param ***REMOVED***Array***REMOVED***  [options.localOffsetB] The offset of bodyB in bodyA's frame. If not given the offset is computed from current positions.
 * @param ***REMOVED***number***REMOVED*** [options.localAngleB] The angle of bodyB in bodyA's frame. If not given, the angle is computed from current angles.
 * @param ***REMOVED***number***REMOVED*** [options.maxForce]
 * @extends Constraint
 *
 * @example
 *     // Locks the relative position and rotation between bodyA and bodyB
 *     var constraint = new LockConstraint(bodyA, bodyB);
 *     world.addConstraint(constraint);
 */
function LockConstraint(bodyA, bodyB, options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    Constraint.call(this,bodyA,bodyB,Constraint.LOCK,options);

    var maxForce = ( typeof(options.maxForce)==="undefined" ? Number.MAX_VALUE : options.maxForce );

    var localAngleB = options.localAngleB || 0;

    // Use 3 equations:
    // gx =   (xj - xi - l) * xhat = 0
    // gy =   (xj - xi - l) * yhat = 0
    // gr =   (xi - xj + r) * that = 0
    //
    // ...where:
    //   l is the localOffsetB vector rotated to world in bodyA frame
    //   r is the same vector but reversed and rotated from bodyB frame
    //   xhat, yhat are world axis vectors
    //   that is the tangent of r
    //
    // For the first two constraints, we get
    // G*W = (vj - vi - ldot  ) * xhat
    //     = (vj - vi - wi x l) * xhat
    //
    // Since (wi x l) * xhat = (l x xhat) * wi, we get
    // G*W = [ -1   0   (-l x xhat)  1   0   0] * [vi wi vj wj]
    //
    // The last constraint gives
    // GW = (vi - vj + wj x r) * that
    //    = [  that   0  -that  (r x t) ]

    var x =     new Equation(bodyA,bodyB,-maxForce,maxForce),
        y =     new Equation(bodyA,bodyB,-maxForce,maxForce),
        rot =   new Equation(bodyA,bodyB,-maxForce,maxForce);

    var l = vec2.create(),
        g = vec2.create(),
        that = this;
    x.computeGq = function()***REMOVED***
        vec2.rotate(l, that.localOffsetB, bodyA.angle);
        vec2.sub(g, bodyB.position, bodyA.position);
        vec2.sub(g, g, l);
        return g[0];
    ***REMOVED***;
    y.computeGq = function()***REMOVED***
        vec2.rotate(l, that.localOffsetB, bodyA.angle);
        vec2.sub(g, bodyB.position, bodyA.position);
        vec2.sub(g, g, l);
        return g[1];
    ***REMOVED***;
    var r = vec2.create(),
        t = vec2.create();
    rot.computeGq = function()***REMOVED***
        vec2.rotate(r, that.localOffsetB, bodyB.angle - that.localAngleB);
        vec2.scale(r,r,-1);
        vec2.sub(g,bodyA.position,bodyB.position);
        vec2.add(g,g,r);
        vec2.rotate(t,r,-Math.PI/2);
        vec2.normalize(t,t);
        return vec2.dot(g,t);
    ***REMOVED***;

    /**
     * The offset of bodyB in bodyA's frame.
     * @property ***REMOVED***Array***REMOVED*** localOffsetB
     */
    this.localOffsetB = vec2.create();
    if(options.localOffsetB)***REMOVED***
        vec2.copy(this.localOffsetB, options.localOffsetB);
    ***REMOVED*** else ***REMOVED***
        // Construct from current positions
        vec2.sub(this.localOffsetB, bodyB.position, bodyA.position);
        vec2.rotate(this.localOffsetB, this.localOffsetB, -bodyA.angle);
    ***REMOVED***

    /**
     * The offset angle of bodyB in bodyA's frame.
     * @property ***REMOVED***Number***REMOVED*** localAngleB
     */
    this.localAngleB = 0;
    if(typeof(options.localAngleB) === 'number')***REMOVED***
        this.localAngleB = options.localAngleB;
    ***REMOVED*** else ***REMOVED***
        // Construct
        this.localAngleB = bodyB.angle - bodyA.angle;
    ***REMOVED***

    this.equations.push(x, y, rot);
    this.setMaxForce(maxForce);
***REMOVED***
LockConstraint.prototype = new Constraint();
LockConstraint.prototype.constructor = LockConstraint;

/**
 * Set the maximum force to be applied.
 * @method setMaxForce
 * @param ***REMOVED***Number***REMOVED*** force
 */
LockConstraint.prototype.setMaxForce = function(force)***REMOVED***
    var eqs = this.equations;
    for(var i=0; i<this.equations.length; i++)***REMOVED***
        eqs[i].maxForce =  force;
        eqs[i].minForce = -force;
    ***REMOVED***
***REMOVED***;

/**
 * Get the max force.
 * @method getMaxForce
 * @return ***REMOVED***Number***REMOVED***
 */
LockConstraint.prototype.getMaxForce = function()***REMOVED***
    return this.equations[0].maxForce;
***REMOVED***;

var l = vec2.create();
var r = vec2.create();
var t = vec2.create();
var xAxis = vec2.fromValues(1,0);
var yAxis = vec2.fromValues(0,1);
LockConstraint.prototype.update = function()***REMOVED***
    var x =   this.equations[0],
        y =   this.equations[1],
        rot = this.equations[2],
        bodyA = this.bodyA,
        bodyB = this.bodyB;

    vec2.rotate(l,this.localOffsetB,bodyA.angle);
    vec2.rotate(r,this.localOffsetB,bodyB.angle - this.localAngleB);
    vec2.scale(r,r,-1);

    vec2.rotate(t,r,Math.PI/2);
    vec2.normalize(t,t);

    x.G[0] = -1;
    x.G[1] =  0;
    x.G[2] = -vec2.crossLength(l,xAxis);
    x.G[3] =  1;

    y.G[0] =  0;
    y.G[1] = -1;
    y.G[2] = -vec2.crossLength(l,yAxis);
    y.G[4] =  1;

    rot.G[0] =  -t[0];
    rot.G[1] =  -t[1];
    rot.G[3] =  t[0];
    rot.G[4] =  t[1];
    rot.G[5] =  vec2.crossLength(r,t);
***REMOVED***;

***REMOVED***,***REMOVED***"../equations/Equation":22,"../math/vec2":30,"./Constraint":14***REMOVED***],18:[function(_dereq_,module,exports)***REMOVED***
var Constraint = _dereq_('./Constraint')
,   ContactEquation = _dereq_('../equations/ContactEquation')
,   Equation = _dereq_('../equations/Equation')
,   vec2 = _dereq_('../math/vec2')
,   RotationalLockEquation = _dereq_('../equations/RotationalLockEquation');

module.exports = PrismaticConstraint;

/**
 * Constraint that only allows bodies to move along a line, relative to each other. See <a href="http://www.iforce2d.net/b2dtut/joints-prismatic">this tutorial</a>. Also called "slider constraint".
 *
 * @class PrismaticConstraint
 * @constructor
 * @extends Constraint
 * @author schteppe
 * @param ***REMOVED***Body***REMOVED***    bodyA
 * @param ***REMOVED***Body***REMOVED***    bodyB
 * @param ***REMOVED***Object***REMOVED***  [options]
 * @param ***REMOVED***Number***REMOVED***  [options.maxForce]                Max force to be applied by the constraint
 * @param ***REMOVED***Array***REMOVED***   [options.localAnchorA]            Body A's anchor point, defined in its own local frame.
 * @param ***REMOVED***Array***REMOVED***   [options.localAnchorB]            Body B's anchor point, defined in its own local frame.
 * @param ***REMOVED***Array***REMOVED***   [options.localAxisA]              An axis, defined in body A frame, that body B's anchor point may slide along.
 * @param ***REMOVED***Boolean***REMOVED*** [options.disableRotationalLock]   If set to true, bodyB will be free to rotate around its anchor point.
 * @param ***REMOVED***Number***REMOVED***  [options.upperLimit]
 * @param ***REMOVED***Number***REMOVED***  [options.lowerLimit]
 * @todo Ability to create using only a point and a worldAxis
 */
function PrismaticConstraint(bodyA, bodyB, options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;
    Constraint.call(this,bodyA,bodyB,Constraint.PRISMATIC,options);

    // Get anchors
    var localAnchorA = vec2.fromValues(0,0),
        localAxisA = vec2.fromValues(1,0),
        localAnchorB = vec2.fromValues(0,0);
    if(options.localAnchorA)***REMOVED*** vec2.copy(localAnchorA, options.localAnchorA); ***REMOVED***
    if(options.localAxisA)***REMOVED*** vec2.copy(localAxisA,   options.localAxisA); ***REMOVED***
    if(options.localAnchorB)***REMOVED*** vec2.copy(localAnchorB, options.localAnchorB); ***REMOVED***

    /**
     * @property localAnchorA
     * @type ***REMOVED***Array***REMOVED***
     */
    this.localAnchorA = localAnchorA;

    /**
     * @property localAnchorB
     * @type ***REMOVED***Array***REMOVED***
     */
    this.localAnchorB = localAnchorB;

    /**
     * @property localAxisA
     * @type ***REMOVED***Array***REMOVED***
     */
    this.localAxisA = localAxisA;

    /*

    The constraint violation for the common axis point is

        g = ( xj + rj - xi - ri ) * t   :=  gg*t

    where r are body-local anchor points, and t is a tangent to the constraint axis defined in body i frame.

        gdot =  ( vj + wj x rj - vi - wi x ri ) * t + ( xj + rj - xi - ri ) * ( wi x t )

    Note the use of the chain rule. Now we identify the jacobian

        G*W = [ -t      -ri x t + t x gg     t    rj x t ] * [vi wi vj wj]

    The rotational part is just a rotation lock.

     */

    var maxForce = this.maxForce = typeof(options.maxForce)!=="undefined" ? options.maxForce : Number.MAX_VALUE;

    // Translational part
    var trans = new Equation(bodyA,bodyB,-maxForce,maxForce);
    var ri = new vec2.create(),
        rj = new vec2.create(),
        gg = new vec2.create(),
        t =  new vec2.create();
    trans.computeGq = function()***REMOVED***
        // g = ( xj + rj - xi - ri ) * t
        return vec2.dot(gg,t);
    ***REMOVED***;
    trans.updateJacobian = function()***REMOVED***
        var G = this.G,
            xi = bodyA.position,
            xj = bodyB.position;
        vec2.rotate(ri,localAnchorA,bodyA.angle);
        vec2.rotate(rj,localAnchorB,bodyB.angle);
        vec2.add(gg,xj,rj);
        vec2.sub(gg,gg,xi);
        vec2.sub(gg,gg,ri);
        vec2.rotate(t,localAxisA,bodyA.angle+Math.PI/2);

        G[0] = -t[0];
        G[1] = -t[1];
        G[2] = -vec2.crossLength(ri,t) + vec2.crossLength(t,gg);
        G[3] = t[0];
        G[4] = t[1];
        G[5] = vec2.crossLength(rj,t);
    ***REMOVED***;
    this.equations.push(trans);

    // Rotational part
    if(!options.disableRotationalLock)***REMOVED***
        var rot = new RotationalLockEquation(bodyA,bodyB,-maxForce,maxForce);
        this.equations.push(rot);
    ***REMOVED***

    /**
     * The position of anchor A relative to anchor B, along the constraint axis.
     * @property position
     * @type ***REMOVED***Number***REMOVED***
     */
    this.position = 0;

    // Is this one used at all?
    this.velocity = 0;

    /**
     * Set to true to enable lower limit.
     * @property lowerLimitEnabled
     * @type ***REMOVED***Boolean***REMOVED***
     */
    this.lowerLimitEnabled = typeof(options.lowerLimit)!=="undefined" ? true : false;

    /**
     * Set to true to enable upper limit.
     * @property upperLimitEnabled
     * @type ***REMOVED***Boolean***REMOVED***
     */
    this.upperLimitEnabled = typeof(options.upperLimit)!=="undefined" ? true : false;

    /**
     * Lower constraint limit. The constraint position is forced to be larger than this value.
     * @property lowerLimit
     * @type ***REMOVED***Number***REMOVED***
     */
    this.lowerLimit = typeof(options.lowerLimit)!=="undefined" ? options.lowerLimit : 0;

    /**
     * Upper constraint limit. The constraint position is forced to be smaller than this value.
     * @property upperLimit
     * @type ***REMOVED***Number***REMOVED***
     */
    this.upperLimit = typeof(options.upperLimit)!=="undefined" ? options.upperLimit : 1;

    // Equations used for limits
    this.upperLimitEquation = new ContactEquation(bodyA,bodyB);
    this.lowerLimitEquation = new ContactEquation(bodyA,bodyB);

    // Set max/min forces
    this.upperLimitEquation.minForce = this.lowerLimitEquation.minForce = 0;
    this.upperLimitEquation.maxForce = this.lowerLimitEquation.maxForce = maxForce;

    /**
     * Equation used for the motor.
     * @property motorEquation
     * @type ***REMOVED***Equation***REMOVED***
     */
    this.motorEquation = new Equation(bodyA,bodyB);

    /**
     * The current motor state. Enable or disable the motor using .enableMotor
     * @property motorEnabled
     * @type ***REMOVED***Boolean***REMOVED***
     */
    this.motorEnabled = false;

    /**
     * Set the target speed for the motor.
     * @property motorSpeed
     * @type ***REMOVED***Number***REMOVED***
     */
    this.motorSpeed = 0;

    var that = this;
    var motorEquation = this.motorEquation;
    var old = motorEquation.computeGW;
    motorEquation.computeGq = function()***REMOVED*** return 0; ***REMOVED***;
    motorEquation.computeGW = function()***REMOVED***
        var G = this.G,
            bi = this.bodyA,
            bj = this.bodyB,
            vi = bi.velocity,
            vj = bj.velocity,
            wi = bi.angularVelocity,
            wj = bj.angularVelocity;
        return this.gmult(G,vi,wi,vj,wj) + that.motorSpeed;
    ***REMOVED***;
***REMOVED***

PrismaticConstraint.prototype = new Constraint();
PrismaticConstraint.prototype.constructor = PrismaticConstraint;

var worldAxisA = vec2.create(),
    worldAnchorA = vec2.create(),
    worldAnchorB = vec2.create(),
    orientedAnchorA = vec2.create(),
    orientedAnchorB = vec2.create(),
    tmp = vec2.create();

/**
 * Update the constraint equations. Should be done if any of the bodies changed position, before solving.
 * @method update
 */
PrismaticConstraint.prototype.update = function()***REMOVED***
    var eqs = this.equations,
        trans = eqs[0],
        upperLimit = this.upperLimit,
        lowerLimit = this.lowerLimit,
        upperLimitEquation = this.upperLimitEquation,
        lowerLimitEquation = this.lowerLimitEquation,
        bodyA = this.bodyA,
        bodyB = this.bodyB,
        localAxisA = this.localAxisA,
        localAnchorA = this.localAnchorA,
        localAnchorB = this.localAnchorB;

    trans.updateJacobian();

    // Transform local things to world
    vec2.rotate(worldAxisA,      localAxisA,      bodyA.angle);
    vec2.rotate(orientedAnchorA, localAnchorA,    bodyA.angle);
    vec2.add(worldAnchorA,       orientedAnchorA, bodyA.position);
    vec2.rotate(orientedAnchorB, localAnchorB,    bodyB.angle);
    vec2.add(worldAnchorB,       orientedAnchorB, bodyB.position);

    var relPosition = this.position = vec2.dot(worldAnchorB,worldAxisA) - vec2.dot(worldAnchorA,worldAxisA);

    // Motor
    if(this.motorEnabled)***REMOVED***
        // G = [ a     a x ri   -a   -a x rj ]
        var G = this.motorEquation.G;
        G[0] = worldAxisA[0];
        G[1] = worldAxisA[1];
        G[2] = vec2.crossLength(worldAxisA,orientedAnchorB);
        G[3] = -worldAxisA[0];
        G[4] = -worldAxisA[1];
        G[5] = -vec2.crossLength(worldAxisA,orientedAnchorA);
    ***REMOVED***

    /*
        Limits strategy:
        Add contact equation, with normal along the constraint axis.
        min/maxForce is set so the constraint is repulsive in the correct direction.
        Some offset is added to either equation.contactPointA or .contactPointB to get the correct upper/lower limit.

                 ^
                 |
      upperLimit x
                 |    ------
         anchorB x<---|  B |
                 |    |    |
        ------   |    ------
        |    |   |
        |  A |-->x anchorA
        ------   |
                 x lowerLimit
                 |
                axis
     */


    if(this.upperLimitEnabled && relPosition > upperLimit)***REMOVED***
        // Update contact constraint normal, etc
        vec2.scale(upperLimitEquation.normalA, worldAxisA, -1);
        vec2.sub(upperLimitEquation.contactPointA, worldAnchorA, bodyA.position);
        vec2.sub(upperLimitEquation.contactPointB, worldAnchorB, bodyB.position);
        vec2.scale(tmp,worldAxisA,upperLimit);
        vec2.add(upperLimitEquation.contactPointA,upperLimitEquation.contactPointA,tmp);
        if(eqs.indexOf(upperLimitEquation) === -1)***REMOVED***
            eqs.push(upperLimitEquation);
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
        var idx = eqs.indexOf(upperLimitEquation);
        if(idx !== -1)***REMOVED***
            eqs.splice(idx,1);
        ***REMOVED***
    ***REMOVED***

    if(this.lowerLimitEnabled && relPosition < lowerLimit)***REMOVED***
        // Update contact constraint normal, etc
        vec2.scale(lowerLimitEquation.normalA, worldAxisA, 1);
        vec2.sub(lowerLimitEquation.contactPointA, worldAnchorA, bodyA.position);
        vec2.sub(lowerLimitEquation.contactPointB, worldAnchorB, bodyB.position);
        vec2.scale(tmp,worldAxisA,lowerLimit);
        vec2.sub(lowerLimitEquation.contactPointB,lowerLimitEquation.contactPointB,tmp);
        if(eqs.indexOf(lowerLimitEquation) === -1)***REMOVED***
            eqs.push(lowerLimitEquation);
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
        var idx = eqs.indexOf(lowerLimitEquation);
        if(idx !== -1)***REMOVED***
            eqs.splice(idx,1);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

/**
 * Enable the motor
 * @method enableMotor
 */
PrismaticConstraint.prototype.enableMotor = function()***REMOVED***
    if(this.motorEnabled)***REMOVED***
        return;
    ***REMOVED***
    this.equations.push(this.motorEquation);
    this.motorEnabled = true;
***REMOVED***;

/**
 * Disable the rotational motor
 * @method disableMotor
 */
PrismaticConstraint.prototype.disableMotor = function()***REMOVED***
    if(!this.motorEnabled)***REMOVED***
        return;
    ***REMOVED***
    var i = this.equations.indexOf(this.motorEquation);
    this.equations.splice(i,1);
    this.motorEnabled = false;
***REMOVED***;

/**
 * Set the constraint limits.
 * @method setLimits
 * @param ***REMOVED***number***REMOVED*** lower Lower limit.
 * @param ***REMOVED***number***REMOVED*** upper Upper limit.
 */
PrismaticConstraint.prototype.setLimits = function (lower, upper) ***REMOVED***
    if(typeof(lower) === 'number')***REMOVED***
        this.lowerLimit = lower;
        this.lowerLimitEnabled = true;
    ***REMOVED*** else ***REMOVED***
        this.lowerLimit = lower;
        this.lowerLimitEnabled = false;
    ***REMOVED***

    if(typeof(upper) === 'number')***REMOVED***
        this.upperLimit = upper;
        this.upperLimitEnabled = true;
    ***REMOVED*** else ***REMOVED***
        this.upperLimit = upper;
        this.upperLimitEnabled = false;
    ***REMOVED***
***REMOVED***;


***REMOVED***,***REMOVED***"../equations/ContactEquation":21,"../equations/Equation":22,"../equations/RotationalLockEquation":24,"../math/vec2":30,"./Constraint":14***REMOVED***],19:[function(_dereq_,module,exports)***REMOVED***
var Constraint = _dereq_('./Constraint')
,   Equation = _dereq_('../equations/Equation')
,   RotationalVelocityEquation = _dereq_('../equations/RotationalVelocityEquation')
,   RotationalLockEquation = _dereq_('../equations/RotationalLockEquation')
,   vec2 = _dereq_('../math/vec2');

module.exports = RevoluteConstraint;

var worldPivotA = vec2.create(),
    worldPivotB = vec2.create(),
    xAxis = vec2.fromValues(1,0),
    yAxis = vec2.fromValues(0,1),
    g = vec2.create();

/**
 * Connects two bodies at given offset points, letting them rotate relative to each other around this point.
 * @class RevoluteConstraint
 * @constructor
 * @author schteppe
 * @param ***REMOVED***Body***REMOVED***    bodyA
 * @param ***REMOVED***Body***REMOVED***    bodyB
 * @param ***REMOVED***Object***REMOVED***  [options]
 * @param ***REMOVED***Array***REMOVED***   [options.worldPivot] A pivot point given in world coordinates. If specified, localPivotA and localPivotB are automatically computed from this value.
 * @param ***REMOVED***Array***REMOVED***   [options.localPivotA] The point relative to the center of mass of bodyA which bodyA is constrained to.
 * @param ***REMOVED***Array***REMOVED***   [options.localPivotB] See localPivotA.
 * @param ***REMOVED***Number***REMOVED***  [options.maxForce] The maximum force that should be applied to constrain the bodies.
 * @extends Constraint
 *
 * @example
 *     // This will create a revolute constraint between two bodies with pivot point in between them.
 *     var bodyA = new Body(***REMOVED*** mass: 1, position: [-1, 0] ***REMOVED***);
 *     var bodyB = new Body(***REMOVED*** mass: 1, position: [1, 0] ***REMOVED***);
 *     var constraint = new RevoluteConstraint(bodyA, bodyB, ***REMOVED***
 *         worldPivot: [0, 0]
 *     ***REMOVED***);
 *     world.addConstraint(constraint);
 *
 *     // Using body-local pivot points, the constraint could have been constructed like this:
 *     var constraint = new RevoluteConstraint(bodyA, bodyB, ***REMOVED***
 *         localPivotA: [1, 0],
 *         localPivotB: [-1, 0]
 *     ***REMOVED***);
 */
function RevoluteConstraint(bodyA, bodyB, options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;
    Constraint.call(this,bodyA,bodyB,Constraint.REVOLUTE,options);

    var maxForce = this.maxForce = typeof(options.maxForce) !== "undefined" ? options.maxForce : Number.MAX_VALUE;

    /**
     * @property ***REMOVED***Array***REMOVED*** pivotA
     */
    this.pivotA = vec2.create();

    /**
     * @property ***REMOVED***Array***REMOVED*** pivotB
     */
    this.pivotB = vec2.create();

    if(options.worldPivot)***REMOVED***
        // Compute pivotA and pivotB
        vec2.sub(this.pivotA, options.worldPivot, bodyA.position);
        vec2.sub(this.pivotB, options.worldPivot, bodyB.position);
        // Rotate to local coordinate system
        vec2.rotate(this.pivotA, this.pivotA, -bodyA.angle);
        vec2.rotate(this.pivotB, this.pivotB, -bodyB.angle);
    ***REMOVED*** else ***REMOVED***
        // Get pivotA and pivotB
        vec2.copy(this.pivotA, options.localPivotA);
        vec2.copy(this.pivotB, options.localPivotB);
    ***REMOVED***

    // Equations to be fed to the solver
    var eqs = this.equations = [
        new Equation(bodyA,bodyB,-maxForce,maxForce),
        new Equation(bodyA,bodyB,-maxForce,maxForce),
    ];

    var x = eqs[0];
    var y = eqs[1];
    var that = this;

    x.computeGq = function()***REMOVED***
        vec2.rotate(worldPivotA, that.pivotA, bodyA.angle);
        vec2.rotate(worldPivotB, that.pivotB, bodyB.angle);
        vec2.add(g, bodyB.position, worldPivotB);
        vec2.sub(g, g, bodyA.position);
        vec2.sub(g, g, worldPivotA);
        return vec2.dot(g,xAxis);
    ***REMOVED***;

    y.computeGq = function()***REMOVED***
        vec2.rotate(worldPivotA, that.pivotA, bodyA.angle);
        vec2.rotate(worldPivotB, that.pivotB, bodyB.angle);
        vec2.add(g, bodyB.position, worldPivotB);
        vec2.sub(g, g, bodyA.position);
        vec2.sub(g, g, worldPivotA);
        return vec2.dot(g,yAxis);
    ***REMOVED***;

    y.minForce = x.minForce = -maxForce;
    y.maxForce = x.maxForce =  maxForce;

    this.motorEquation = new RotationalVelocityEquation(bodyA,bodyB);

    /**
     * Indicates whether the motor is enabled. Use .enableMotor() to enable the constraint motor.
     * @property ***REMOVED***Boolean***REMOVED*** motorEnabled
     * @readOnly
     */
    this.motorEnabled = false;

    /**
     * The constraint position.
     * @property angle
     * @type ***REMOVED***Number***REMOVED***
     * @readOnly
     */
    this.angle = 0;

    /**
     * Set to true to enable lower limit
     * @property lowerLimitEnabled
     * @type ***REMOVED***Boolean***REMOVED***
     */
    this.lowerLimitEnabled = false;

    /**
     * Set to true to enable upper limit
     * @property upperLimitEnabled
     * @type ***REMOVED***Boolean***REMOVED***
     */
    this.upperLimitEnabled = false;

    /**
     * The lower limit on the constraint angle.
     * @property lowerLimit
     * @type ***REMOVED***Boolean***REMOVED***
     */
    this.lowerLimit = 0;

    /**
     * The upper limit on the constraint angle.
     * @property upperLimit
     * @type ***REMOVED***Boolean***REMOVED***
     */
    this.upperLimit = 0;

    this.upperLimitEquation = new RotationalLockEquation(bodyA,bodyB);
    this.lowerLimitEquation = new RotationalLockEquation(bodyA,bodyB);
    this.upperLimitEquation.minForce = 0;
    this.lowerLimitEquation.maxForce = 0;
***REMOVED***
RevoluteConstraint.prototype = new Constraint();
RevoluteConstraint.prototype.constructor = RevoluteConstraint;

/**
 * Set the constraint angle limits.
 * @method setLimits
 * @param ***REMOVED***number***REMOVED*** lower Lower angle limit.
 * @param ***REMOVED***number***REMOVED*** upper Upper angle limit.
 */
RevoluteConstraint.prototype.setLimits = function (lower, upper) ***REMOVED***
    if(typeof(lower) === 'number')***REMOVED***
        this.lowerLimit = lower;
        this.lowerLimitEnabled = true;
    ***REMOVED*** else ***REMOVED***
        this.lowerLimit = lower;
        this.lowerLimitEnabled = false;
    ***REMOVED***

    if(typeof(upper) === 'number')***REMOVED***
        this.upperLimit = upper;
        this.upperLimitEnabled = true;
    ***REMOVED*** else ***REMOVED***
        this.upperLimit = upper;
        this.upperLimitEnabled = false;
    ***REMOVED***
***REMOVED***;

RevoluteConstraint.prototype.update = function()***REMOVED***
    var bodyA =  this.bodyA,
        bodyB =  this.bodyB,
        pivotA = this.pivotA,
        pivotB = this.pivotB,
        eqs =    this.equations,
        normal = eqs[0],
        tangent= eqs[1],
        x = eqs[0],
        y = eqs[1],
        upperLimit = this.upperLimit,
        lowerLimit = this.lowerLimit,
        upperLimitEquation = this.upperLimitEquation,
        lowerLimitEquation = this.lowerLimitEquation;

    var relAngle = this.angle = bodyB.angle - bodyA.angle;

    if(this.upperLimitEnabled && relAngle > upperLimit)***REMOVED***
        upperLimitEquation.angle = upperLimit;
        if(eqs.indexOf(upperLimitEquation) === -1)***REMOVED***
            eqs.push(upperLimitEquation);
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
        var idx = eqs.indexOf(upperLimitEquation);
        if(idx !== -1)***REMOVED***
            eqs.splice(idx,1);
        ***REMOVED***
    ***REMOVED***

    if(this.lowerLimitEnabled && relAngle < lowerLimit)***REMOVED***
        lowerLimitEquation.angle = lowerLimit;
        if(eqs.indexOf(lowerLimitEquation) === -1)***REMOVED***
            eqs.push(lowerLimitEquation);
        ***REMOVED***
    ***REMOVED*** else ***REMOVED***
        var idx = eqs.indexOf(lowerLimitEquation);
        if(idx !== -1)***REMOVED***
            eqs.splice(idx,1);
        ***REMOVED***
    ***REMOVED***

    /*

    The constraint violation is

        g = xj + rj - xi - ri

    ...where xi and xj are the body positions and ri and rj world-oriented offset vectors. Differentiate:

        gdot = vj + wj x rj - vi - wi x ri

    We split this into x and y directions. (let x and y be unit vectors along the respective axes)

        gdot * x = ( vj + wj x rj - vi - wi x ri ) * x
                 = ( vj*x + (wj x rj)*x -vi*x -(wi x ri)*x
                 = ( vj*x + (rj x x)*wj -vi*x -(ri x x)*wi
                 = [ -x   -(ri x x)   x   (rj x x)] * [vi wi vj wj]
                 = G*W

    ...and similar for y. We have then identified the jacobian entries for x and y directions:

        Gx = [ x   (rj x x)   -x   -(ri x x)]
        Gy = [ y   (rj x y)   -y   -(ri x y)]

     */

    vec2.rotate(worldPivotA, pivotA, bodyA.angle);
    vec2.rotate(worldPivotB, pivotB, bodyB.angle);

    // todo: these are a bit sparse. We could save some computations on making custom eq.computeGW functions, etc

    x.G[0] = -1;
    x.G[1] =  0;
    x.G[2] = -vec2.crossLength(worldPivotA,xAxis);
    x.G[3] =  1;
    x.G[4] =  0;
    x.G[5] =  vec2.crossLength(worldPivotB,xAxis);

    y.G[0] =  0;
    y.G[1] = -1;
    y.G[2] = -vec2.crossLength(worldPivotA,yAxis);
    y.G[3] =  0;
    y.G[4] =  1;
    y.G[5] =  vec2.crossLength(worldPivotB,yAxis);
***REMOVED***;

/**
 * Enable the rotational motor
 * @method enableMotor
 */
RevoluteConstraint.prototype.enableMotor = function()***REMOVED***
    if(this.motorEnabled)***REMOVED***
        return;
    ***REMOVED***
    this.equations.push(this.motorEquation);
    this.motorEnabled = true;
***REMOVED***;

/**
 * Disable the rotational motor
 * @method disableMotor
 */
RevoluteConstraint.prototype.disableMotor = function()***REMOVED***
    if(!this.motorEnabled)***REMOVED***
        return;
    ***REMOVED***
    var i = this.equations.indexOf(this.motorEquation);
    this.equations.splice(i,1);
    this.motorEnabled = false;
***REMOVED***;

/**
 * Check if the motor is enabled.
 * @method motorIsEnabled
 * @deprecated use property motorEnabled instead.
 * @return ***REMOVED***Boolean***REMOVED***
 */
RevoluteConstraint.prototype.motorIsEnabled = function()***REMOVED***
    return !!this.motorEnabled;
***REMOVED***;

/**
 * Set the speed of the rotational constraint motor
 * @method setMotorSpeed
 * @param  ***REMOVED***Number***REMOVED*** speed
 */
RevoluteConstraint.prototype.setMotorSpeed = function(speed)***REMOVED***
    if(!this.motorEnabled)***REMOVED***
        return;
    ***REMOVED***
    var i = this.equations.indexOf(this.motorEquation);
    this.equations[i].relativeVelocity = speed;
***REMOVED***;

/**
 * Get the speed of the rotational constraint motor
 * @method getMotorSpeed
 * @return ***REMOVED***Number***REMOVED*** The current speed, or false if the motor is not enabled.
 */
RevoluteConstraint.prototype.getMotorSpeed = function()***REMOVED***
    if(!this.motorEnabled)***REMOVED***
        return false;
    ***REMOVED***
    return this.motorEquation.relativeVelocity;
***REMOVED***;

***REMOVED***,***REMOVED***"../equations/Equation":22,"../equations/RotationalLockEquation":24,"../equations/RotationalVelocityEquation":25,"../math/vec2":30,"./Constraint":14***REMOVED***],20:[function(_dereq_,module,exports)***REMOVED***
var Equation = _dereq_("./Equation"),
    vec2 = _dereq_('../math/vec2');

module.exports = AngleLockEquation;

/**
 * Locks the relative angle between two bodies. The constraint tries to keep the dot product between two vectors, local in each body, to zero. The local angle in body i is a parameter.
 *
 * @class AngleLockEquation
 * @constructor
 * @extends Equation
 * @param ***REMOVED***Body***REMOVED*** bodyA
 * @param ***REMOVED***Body***REMOVED*** bodyB
 * @param ***REMOVED***Object***REMOVED*** [options]
 * @param ***REMOVED***Number***REMOVED*** [options.angle] Angle to add to the local vector in body A.
 * @param ***REMOVED***Number***REMOVED*** [options.ratio] Gear ratio
 */
function AngleLockEquation(bodyA, bodyB, options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;
    Equation.call(this,bodyA,bodyB,-Number.MAX_VALUE,Number.MAX_VALUE);
    this.angle = options.angle || 0;

    /**
     * The gear ratio.
     * @property ***REMOVED***Number***REMOVED*** ratio
     * @private
     * @see setRatio
     */
    this.ratio = typeof(options.ratio)==="number" ? options.ratio : 1;

    this.setRatio(this.ratio);
***REMOVED***
AngleLockEquation.prototype = new Equation();
AngleLockEquation.prototype.constructor = AngleLockEquation;

AngleLockEquation.prototype.computeGq = function()***REMOVED***
    return this.ratio * this.bodyA.angle - this.bodyB.angle + this.angle;
***REMOVED***;

/**
 * Set the gear ratio for this equation
 * @method setRatio
 * @param ***REMOVED***Number***REMOVED*** ratio
 */
AngleLockEquation.prototype.setRatio = function(ratio)***REMOVED***
    var G = this.G;
    G[2] =  ratio;
    G[5] = -1;
    this.ratio = ratio;
***REMOVED***;

/**
 * Set the max force for the equation.
 * @method setMaxTorque
 * @param ***REMOVED***Number***REMOVED*** torque
 */
AngleLockEquation.prototype.setMaxTorque = function(torque)***REMOVED***
    this.maxForce =  torque;
    this.minForce = -torque;
***REMOVED***;

***REMOVED***,***REMOVED***"../math/vec2":30,"./Equation":22***REMOVED***],21:[function(_dereq_,module,exports)***REMOVED***
var Equation = _dereq_("./Equation"),
    vec2 = _dereq_('../math/vec2');

module.exports = ContactEquation;

/**
 * Non-penetration constraint equation. Tries to make the contactPointA and contactPointB vectors coincide, while keeping the applied force repulsive.
 *
 * @class ContactEquation
 * @constructor
 * @extends Equation
 * @param ***REMOVED***Body***REMOVED*** bodyA
 * @param ***REMOVED***Body***REMOVED*** bodyB
 */
function ContactEquation(bodyA, bodyB)***REMOVED***
    Equation.call(this, bodyA, bodyB, 0, Number.MAX_VALUE);

    /**
     * Vector from body i center of mass to the contact point.
     * @property contactPointA
     * @type ***REMOVED***Array***REMOVED***
     */
    this.contactPointA = vec2.create();
    this.penetrationVec = vec2.create();

    /**
     * World-oriented vector from body A center of mass to the contact point.
     * @property contactPointB
     * @type ***REMOVED***Array***REMOVED***
     */
    this.contactPointB = vec2.create();

    /**
     * The normal vector, pointing out of body i
     * @property normalA
     * @type ***REMOVED***Array***REMOVED***
     */
    this.normalA = vec2.create();

    /**
     * The restitution to use (0=no bounciness, 1=max bounciness).
     * @property restitution
     * @type ***REMOVED***Number***REMOVED***
     */
    this.restitution = 0;

    /**
     * This property is set to true if this is the first impact between the bodies (not persistant contact).
     * @property firstImpact
     * @type ***REMOVED***Boolean***REMOVED***
     * @readOnly
     */
    this.firstImpact = false;

    /**
     * The shape in body i that triggered this contact.
     * @property shapeA
     * @type ***REMOVED***Shape***REMOVED***
     */
    this.shapeA = null;

    /**
     * The shape in body j that triggered this contact.
     * @property shapeB
     * @type ***REMOVED***Shape***REMOVED***
     */
    this.shapeB = null;
***REMOVED***
ContactEquation.prototype = new Equation();
ContactEquation.prototype.constructor = ContactEquation;
ContactEquation.prototype.computeB = function(a,b,h)***REMOVED***
    var bi = this.bodyA,
        bj = this.bodyB,
        ri = this.contactPointA,
        rj = this.contactPointB,
        xi = bi.position,
        xj = bj.position;

    var penetrationVec = this.penetrationVec,
        n = this.normalA,
        G = this.G;

    // Caluclate cross products
    var rixn = vec2.crossLength(ri,n),
        rjxn = vec2.crossLength(rj,n);

    // G = [-n -rixn n rjxn]
    G[0] = -n[0];
    G[1] = -n[1];
    G[2] = -rixn;
    G[3] = n[0];
    G[4] = n[1];
    G[5] = rjxn;

    // Calculate q = xj+rj -(xi+ri) i.e. the penetration vector
    vec2.add(penetrationVec,xj,rj);
    vec2.sub(penetrationVec,penetrationVec,xi);
    vec2.sub(penetrationVec,penetrationVec,ri);

    // Compute iteration
    var GW, Gq;
    if(this.firstImpact && this.restitution !== 0)***REMOVED***
        Gq = 0;
        GW = (1/b)*(1+this.restitution) * this.computeGW();
    ***REMOVED*** else ***REMOVED***
        Gq = vec2.dot(n,penetrationVec) + this.offset;
        GW = this.computeGW();
    ***REMOVED***

    var GiMf = this.computeGiMf();
    var B = - Gq * a - GW * b - h*GiMf;

    return B;
***REMOVED***;

***REMOVED***,***REMOVED***"../math/vec2":30,"./Equation":22***REMOVED***],22:[function(_dereq_,module,exports)***REMOVED***
module.exports = Equation;

var vec2 = _dereq_('../math/vec2'),
    Utils = _dereq_('../utils/Utils'),
    Body = _dereq_('../objects/Body');

/**
 * Base class for constraint equations.
 * @class Equation
 * @constructor
 * @param ***REMOVED***Body***REMOVED*** bodyA First body participating in the equation
 * @param ***REMOVED***Body***REMOVED*** bodyB Second body participating in the equation
 * @param ***REMOVED***number***REMOVED*** minForce Minimum force to apply. Default: -Number.MAX_VALUE
 * @param ***REMOVED***number***REMOVED*** maxForce Maximum force to apply. Default: Number.MAX_VALUE
 */
function Equation(bodyA, bodyB, minForce, maxForce)***REMOVED***

    /**
     * Minimum force to apply when solving.
     * @property minForce
     * @type ***REMOVED***Number***REMOVED***
     */
    this.minForce = typeof(minForce)==="undefined" ? -Number.MAX_VALUE : minForce;

    /**
     * Max force to apply when solving.
     * @property maxForce
     * @type ***REMOVED***Number***REMOVED***
     */
    this.maxForce = typeof(maxForce)==="undefined" ? Number.MAX_VALUE : maxForce;

    /**
     * First body participating in the constraint
     * @property bodyA
     * @type ***REMOVED***Body***REMOVED***
     */
    this.bodyA = bodyA;

    /**
     * Second body participating in the constraint
     * @property bodyB
     * @type ***REMOVED***Body***REMOVED***
     */
    this.bodyB = bodyB;

    /**
     * The stiffness of this equation. Typically chosen to a large number (~1e7), but can be chosen somewhat freely to get a stable simulation.
     * @property stiffness
     * @type ***REMOVED***Number***REMOVED***
     */
    this.stiffness = Equation.DEFAULT_STIFFNESS;

    /**
     * The number of time steps needed to stabilize the constraint equation. Typically between 3 and 5 time steps.
     * @property relaxation
     * @type ***REMOVED***Number***REMOVED***
     */
    this.relaxation = Equation.DEFAULT_RELAXATION;

    /**
     * The Jacobian entry of this equation. 6 numbers, 3 per body (x,y,angle).
     * @property G
     * @type ***REMOVED***Array***REMOVED***
     */
    this.G = new Utils.ARRAY_TYPE(6);
    for(var i=0; i<6; i++)***REMOVED***
        this.G[i]=0;
    ***REMOVED***

    this.offset = 0;

    this.a = 0;
    this.b = 0;
    this.epsilon = 0;
    this.timeStep = 1/60;

    /**
     * Indicates if stiffness or relaxation was changed.
     * @property ***REMOVED***Boolean***REMOVED*** needsUpdate
     */
    this.needsUpdate = true;

    /**
     * The resulting constraint multiplier from the last solve. This is mostly equivalent to the force produced by the constraint.
     * @property multiplier
     * @type ***REMOVED***Number***REMOVED***
     */
    this.multiplier = 0;

    /**
     * Relative velocity.
     * @property ***REMOVED***Number***REMOVED*** relativeVelocity
     */
    this.relativeVelocity = 0;

    /**
     * Whether this equation is enabled or not. If true, it will be added to the solver.
     * @property ***REMOVED***Boolean***REMOVED*** enabled
     */
    this.enabled = true;
***REMOVED***
Equation.prototype.constructor = Equation;

/**
 * The default stiffness when creating a new Equation.
 * @static
 * @property ***REMOVED***Number***REMOVED*** DEFAULT_STIFFNESS
 * @default 1e6
 */
Equation.DEFAULT_STIFFNESS = 1e6;

/**
 * The default relaxation when creating a new Equation.
 * @static
 * @property ***REMOVED***Number***REMOVED*** DEFAULT_RELAXATION
 * @default 4
 */
Equation.DEFAULT_RELAXATION = 4;

/**
 * Compute SPOOK parameters .a, .b and .epsilon according to the current parameters. See equations 9, 10 and 11 in the <a href="http://www8.cs.umu.se/kurser/5DV058/VT09/lectures/spooknotes.pdf">SPOOK notes</a>.
 * @method update
 */
Equation.prototype.update = function()***REMOVED***
    var k = this.stiffness,
        d = this.relaxation,
        h = this.timeStep;

    this.a = 4.0 / (h * (1 + 4 * d));
    this.b = (4.0 * d) / (1 + 4 * d);
    this.epsilon = 4.0 / (h * h * k * (1 + 4 * d));

    this.needsUpdate = false;
***REMOVED***;

/**
 * Multiply a jacobian entry with corresponding positions or velocities
 * @method gmult
 * @return ***REMOVED***Number***REMOVED***
 */
Equation.prototype.gmult = function(G,vi,wi,vj,wj)***REMOVED***
    return  G[0] * vi[0] +
            G[1] * vi[1] +
            G[2] * wi +
            G[3] * vj[0] +
            G[4] * vj[1] +
            G[5] * wj;
***REMOVED***;

/**
 * Computes the RHS of the SPOOK equation
 * @method computeB
 * @return ***REMOVED***Number***REMOVED***
 */
Equation.prototype.computeB = function(a,b,h)***REMOVED***
    var GW = this.computeGW();
    var Gq = this.computeGq();
    var GiMf = this.computeGiMf();
    return - Gq * a - GW * b - GiMf*h;
***REMOVED***;

/**
 * Computes G\*q, where q are the generalized body coordinates
 * @method computeGq
 * @return ***REMOVED***Number***REMOVED***
 */
var qi = vec2.create(),
    qj = vec2.create();
Equation.prototype.computeGq = function()***REMOVED***
    var G = this.G,
        bi = this.bodyA,
        bj = this.bodyB,
        xi = bi.position,
        xj = bj.position,
        ai = bi.angle,
        aj = bj.angle;

    return this.gmult(G, qi, ai, qj, aj) + this.offset;
***REMOVED***;

/**
 * Computes G\*W, where W are the body velocities
 * @method computeGW
 * @return ***REMOVED***Number***REMOVED***
 */
Equation.prototype.computeGW = function()***REMOVED***
    var G = this.G,
        bi = this.bodyA,
        bj = this.bodyB,
        vi = bi.velocity,
        vj = bj.velocity,
        wi = bi.angularVelocity,
        wj = bj.angularVelocity;
    return this.gmult(G,vi,wi,vj,wj) + this.relativeVelocity;
***REMOVED***;

/**
 * Computes G\*Wlambda, where W are the body velocities
 * @method computeGWlambda
 * @return ***REMOVED***Number***REMOVED***
 */
Equation.prototype.computeGWlambda = function()***REMOVED***
    var G = this.G,
        bi = this.bodyA,
        bj = this.bodyB,
        vi = bi.vlambda,
        vj = bj.vlambda,
        wi = bi.wlambda,
        wj = bj.wlambda;
    return this.gmult(G,vi,wi,vj,wj);
***REMOVED***;

/**
 * Computes G\*inv(M)\*f, where M is the mass matrix with diagonal blocks for each body, and f are the forces on the bodies.
 * @method computeGiMf
 * @return ***REMOVED***Number***REMOVED***
 */
var iMfi = vec2.create(),
    iMfj = vec2.create();
Equation.prototype.computeGiMf = function()***REMOVED***
    var bi = this.bodyA,
        bj = this.bodyB,
        fi = bi.force,
        ti = bi.angularForce,
        fj = bj.force,
        tj = bj.angularForce,
        invMassi = bi.invMassSolve,
        invMassj = bj.invMassSolve,
        invIi = bi.invInertiaSolve,
        invIj = bj.invInertiaSolve,
        G = this.G;

    vec2.scale(iMfi, fi, invMassi);
    vec2.multiply(iMfi, bi.massMultiplier, iMfi);
    vec2.scale(iMfj, fj,invMassj);
    vec2.multiply(iMfj, bj.massMultiplier, iMfj);

    return this.gmult(G,iMfi,ti*invIi,iMfj,tj*invIj);
***REMOVED***;

/**
 * Computes G\*inv(M)\*G'
 * @method computeGiMGt
 * @return ***REMOVED***Number***REMOVED***
 */
Equation.prototype.computeGiMGt = function()***REMOVED***
    var bi = this.bodyA,
        bj = this.bodyB,
        invMassi = bi.invMassSolve,
        invMassj = bj.invMassSolve,
        invIi = bi.invInertiaSolve,
        invIj = bj.invInertiaSolve,
        G = this.G;

    return  G[0] * G[0] * invMassi * bi.massMultiplier[0] +
            G[1] * G[1] * invMassi * bi.massMultiplier[1] +
            G[2] * G[2] *    invIi +
            G[3] * G[3] * invMassj * bj.massMultiplier[0] +
            G[4] * G[4] * invMassj * bj.massMultiplier[1] +
            G[5] * G[5] *    invIj;
***REMOVED***;

var addToWlambda_temp = vec2.create(),
    addToWlambda_Gi = vec2.create(),
    addToWlambda_Gj = vec2.create(),
    addToWlambda_ri = vec2.create(),
    addToWlambda_rj = vec2.create(),
    addToWlambda_Mdiag = vec2.create();

/**
 * Add constraint velocity to the bodies.
 * @method addToWlambda
 * @param ***REMOVED***Number***REMOVED*** deltalambda
 */
Equation.prototype.addToWlambda = function(deltalambda)***REMOVED***
    var bi = this.bodyA,
        bj = this.bodyB,
        temp = addToWlambda_temp,
        Gi = addToWlambda_Gi,
        Gj = addToWlambda_Gj,
        ri = addToWlambda_ri,
        rj = addToWlambda_rj,
        invMassi = bi.invMassSolve,
        invMassj = bj.invMassSolve,
        invIi = bi.invInertiaSolve,
        invIj = bj.invInertiaSolve,
        Mdiag = addToWlambda_Mdiag,
        G = this.G;

    Gi[0] = G[0];
    Gi[1] = G[1];
    Gj[0] = G[3];
    Gj[1] = G[4];

    // Add to linear velocity
    // v_lambda += inv(M) * delta_lamba * G
    vec2.scale(temp, Gi, invMassi*deltalambda);
    vec2.multiply(temp, temp, bi.massMultiplier);
    vec2.add( bi.vlambda, bi.vlambda, temp);
    // This impulse is in the offset frame
    // Also add contribution to angular
    //bi.wlambda -= vec2.crossLength(temp,ri);
    bi.wlambda += invIi * G[2] * deltalambda;


    vec2.scale(temp, Gj, invMassj*deltalambda);
    vec2.multiply(temp, temp, bj.massMultiplier);
    vec2.add( bj.vlambda, bj.vlambda, temp);
    //bj.wlambda -= vec2.crossLength(temp,rj);
    bj.wlambda += invIj * G[5] * deltalambda;
***REMOVED***;

/**
 * Compute the denominator part of the SPOOK equation: C = G\*inv(M)\*G' + eps
 * @method computeInvC
 * @param  ***REMOVED***Number***REMOVED*** eps
 * @return ***REMOVED***Number***REMOVED***
 */
Equation.prototype.computeInvC = function(eps)***REMOVED***
    return 1.0 / (this.computeGiMGt() + eps);
***REMOVED***;

***REMOVED***,***REMOVED***"../math/vec2":30,"../objects/Body":31,"../utils/Utils":57***REMOVED***],23:[function(_dereq_,module,exports)***REMOVED***
var vec2 = _dereq_('../math/vec2')
,   Equation = _dereq_('./Equation')
,   Utils = _dereq_('../utils/Utils');

module.exports = FrictionEquation;

/**
 * Constrains the slipping in a contact along a tangent
 *
 * @class FrictionEquation
 * @constructor
 * @param ***REMOVED***Body***REMOVED*** bodyA
 * @param ***REMOVED***Body***REMOVED*** bodyB
 * @param ***REMOVED***Number***REMOVED*** slipForce
 * @extends Equation
 */
function FrictionEquation(bodyA, bodyB, slipForce)***REMOVED***
    Equation.call(this, bodyA, bodyB, -slipForce, slipForce);

    /**
     * Relative vector from center of body A to the contact point, world oriented.
     * @property contactPointA
     * @type ***REMOVED***Array***REMOVED***
     */
    this.contactPointA = vec2.create();

    /**
     * Relative vector from center of body B to the contact point, world oriented.
     * @property contactPointB
     * @type ***REMOVED***Array***REMOVED***
     */
    this.contactPointB = vec2.create();

    /**
     * Tangent vector that the friction force will act along. World oriented.
     * @property t
     * @type ***REMOVED***Array***REMOVED***
     */
    this.t = vec2.create();

    /**
     * ContactEquations connected to this friction equation. The contact equations can be used to rescale the max force for the friction. If more than one contact equation is given, then the max force can be set to the average.
     * @property contactEquations
     * @type ***REMOVED***ContactEquation***REMOVED***
     */
    this.contactEquations = [];

    /**
     * The shape in body i that triggered this friction.
     * @property shapeA
     * @type ***REMOVED***Shape***REMOVED***
     * @todo Needed? The shape can be looked up via contactEquation.shapeA...
     */
    this.shapeA = null;

    /**
     * The shape in body j that triggered this friction.
     * @property shapeB
     * @type ***REMOVED***Shape***REMOVED***
     * @todo Needed? The shape can be looked up via contactEquation.shapeB...
     */
    this.shapeB = null;

    /**
     * The friction coefficient to use.
     * @property frictionCoefficient
     * @type ***REMOVED***Number***REMOVED***
     */
    this.frictionCoefficient = 0.3;
***REMOVED***
FrictionEquation.prototype = new Equation();
FrictionEquation.prototype.constructor = FrictionEquation;

/**
 * Set the slipping condition for the constraint. The friction force cannot be
 * larger than this value.
 * @method setSlipForce
 * @param  ***REMOVED***Number***REMOVED*** slipForce
 */
FrictionEquation.prototype.setSlipForce = function(slipForce)***REMOVED***
    this.maxForce = slipForce;
    this.minForce = -slipForce;
***REMOVED***;

/**
 * Get the max force for the constraint.
 * @method getSlipForce
 * @return ***REMOVED***Number***REMOVED***
 */
FrictionEquation.prototype.getSlipForce = function()***REMOVED***
    return this.maxForce;
***REMOVED***;

FrictionEquation.prototype.computeB = function(a,b,h)***REMOVED***
    var bi = this.bodyA,
        bj = this.bodyB,
        ri = this.contactPointA,
        rj = this.contactPointB,
        t = this.t,
        G = this.G;

    // G = [-t -rixt t rjxt]
    // And remember, this is a pure velocity constraint, g is always zero!
    G[0] = -t[0];
    G[1] = -t[1];
    G[2] = -vec2.crossLength(ri,t);
    G[3] = t[0];
    G[4] = t[1];
    G[5] = vec2.crossLength(rj,t);

    var GW = this.computeGW(),
        GiMf = this.computeGiMf();

    var B = /* - g * a  */ - GW * b - h*GiMf;

    return B;
***REMOVED***;

***REMOVED***,***REMOVED***"../math/vec2":30,"../utils/Utils":57,"./Equation":22***REMOVED***],24:[function(_dereq_,module,exports)***REMOVED***
var Equation = _dereq_("./Equation"),
    vec2 = _dereq_('../math/vec2');

module.exports = RotationalLockEquation;

/**
 * Locks the relative angle between two bodies. The constraint tries to keep the dot product between two vectors, local in each body, to zero. The local angle in body i is a parameter.
 *
 * @class RotationalLockEquation
 * @constructor
 * @extends Equation
 * @param ***REMOVED***Body***REMOVED*** bodyA
 * @param ***REMOVED***Body***REMOVED*** bodyB
 * @param ***REMOVED***Object***REMOVED*** [options]
 * @param ***REMOVED***Number***REMOVED*** [options.angle] Angle to add to the local vector in bodyA.
 */
function RotationalLockEquation(bodyA, bodyB, options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;
    Equation.call(this, bodyA, bodyB, -Number.MAX_VALUE, Number.MAX_VALUE);

    /**
     * @property ***REMOVED***number***REMOVED*** angle
     */
    this.angle = options.angle || 0;

    var G = this.G;
    G[2] =  1;
    G[5] = -1;
***REMOVED***
RotationalLockEquation.prototype = new Equation();
RotationalLockEquation.prototype.constructor = RotationalLockEquation;

var worldVectorA = vec2.create(),
    worldVectorB = vec2.create(),
    xAxis = vec2.fromValues(1,0),
    yAxis = vec2.fromValues(0,1);
RotationalLockEquation.prototype.computeGq = function()***REMOVED***
    vec2.rotate(worldVectorA,xAxis,this.bodyA.angle+this.angle);
    vec2.rotate(worldVectorB,yAxis,this.bodyB.angle);
    return vec2.dot(worldVectorA,worldVectorB);
***REMOVED***;

***REMOVED***,***REMOVED***"../math/vec2":30,"./Equation":22***REMOVED***],25:[function(_dereq_,module,exports)***REMOVED***
var Equation = _dereq_("./Equation"),
    vec2 = _dereq_('../math/vec2');

module.exports = RotationalVelocityEquation;

/**
 * Syncs rotational velocity of two bodies, or sets a relative velocity (motor).
 *
 * @class RotationalVelocityEquation
 * @constructor
 * @extends Equation
 * @param ***REMOVED***Body***REMOVED*** bodyA
 * @param ***REMOVED***Body***REMOVED*** bodyB
 */
function RotationalVelocityEquation(bodyA, bodyB)***REMOVED***
    Equation.call(this, bodyA, bodyB, -Number.MAX_VALUE, Number.MAX_VALUE);
    this.relativeVelocity = 1;
    this.ratio = 1;
***REMOVED***
RotationalVelocityEquation.prototype = new Equation();
RotationalVelocityEquation.prototype.constructor = RotationalVelocityEquation;
RotationalVelocityEquation.prototype.computeB = function(a,b,h)***REMOVED***
    var G = this.G;
    G[2] = -1;
    G[5] = this.ratio;

    var GiMf = this.computeGiMf();
    var GW = this.computeGW();
    var B = - GW * b - h*GiMf;

    return B;
***REMOVED***;

***REMOVED***,***REMOVED***"../math/vec2":30,"./Equation":22***REMOVED***],26:[function(_dereq_,module,exports)***REMOVED***
/**
 * Base class for objects that dispatches events.
 * @class EventEmitter
 * @constructor
 */
var EventEmitter = function () ***REMOVED******REMOVED***;

module.exports = EventEmitter;

EventEmitter.prototype = ***REMOVED***
    constructor: EventEmitter,

    /**
     * Add an event listener
     * @method on
     * @param  ***REMOVED***String***REMOVED*** type
     * @param  ***REMOVED***Function***REMOVED*** listener
     * @return ***REMOVED***EventEmitter***REMOVED*** The self object, for chainability.
     */
    on: function ( type, listener, context ) ***REMOVED***
        listener.context = context || this;
        if ( this._listeners === undefined )***REMOVED***
            this._listeners = ***REMOVED******REMOVED***;
        ***REMOVED***
        var listeners = this._listeners;
        if ( listeners[ type ] === undefined ) ***REMOVED***
            listeners[ type ] = [];
        ***REMOVED***
        if ( listeners[ type ].indexOf( listener ) === - 1 ) ***REMOVED***
            listeners[ type ].push( listener );
        ***REMOVED***
        return this;
    ***REMOVED***,

    /**
     * Check if an event listener is added
     * @method has
     * @param  ***REMOVED***String***REMOVED*** type
     * @param  ***REMOVED***Function***REMOVED*** listener
     * @return ***REMOVED***Boolean***REMOVED***
     */
    has: function ( type, listener ) ***REMOVED***
        if ( this._listeners === undefined )***REMOVED***
            return false;
        ***REMOVED***
        var listeners = this._listeners;
        if(listener)***REMOVED***
            if ( listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1 ) ***REMOVED***
                return true;
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
            if ( listeners[ type ] !== undefined ) ***REMOVED***
                return true;
            ***REMOVED***
        ***REMOVED***

        return false;
    ***REMOVED***,

    /**
     * Remove an event listener
     * @method off
     * @param  ***REMOVED***String***REMOVED*** type
     * @param  ***REMOVED***Function***REMOVED*** listener
     * @return ***REMOVED***EventEmitter***REMOVED*** The self object, for chainability.
     */
    off: function ( type, listener ) ***REMOVED***
        if ( this._listeners === undefined )***REMOVED***
            return this;
        ***REMOVED***
        var listeners = this._listeners;
        var index = listeners[ type ].indexOf( listener );
        if ( index !== - 1 ) ***REMOVED***
            listeners[ type ].splice( index, 1 );
        ***REMOVED***
        return this;
    ***REMOVED***,

    /**
     * Emit an event.
     * @method emit
     * @param  ***REMOVED***Object***REMOVED*** event
     * @param  ***REMOVED***String***REMOVED*** event.type
     * @return ***REMOVED***EventEmitter***REMOVED*** The self object, for chainability.
     */
    emit: function ( event ) ***REMOVED***
        if ( this._listeners === undefined )***REMOVED***
            return this;
        ***REMOVED***
        var listeners = this._listeners;
        var listenerArray = listeners[ event.type ];
        if ( listenerArray !== undefined ) ***REMOVED***
            event.target = this;
            for ( var i = 0, l = listenerArray.length; i < l; i ++ ) ***REMOVED***
                var listener = listenerArray[ i ];
                listener.call( listener.context, event );
            ***REMOVED***
        ***REMOVED***
        return this;
    ***REMOVED***
***REMOVED***;

***REMOVED***,***REMOVED******REMOVED***],27:[function(_dereq_,module,exports)***REMOVED***
var Material = _dereq_('./Material');
var Equation = _dereq_('../equations/Equation');

module.exports = ContactMaterial;

/**
 * Defines what happens when two materials meet, such as what friction coefficient to use. You can also set other things such as restitution, surface velocity and constraint parameters.
 * @class ContactMaterial
 * @constructor
 * @param ***REMOVED***Material***REMOVED*** materialA
 * @param ***REMOVED***Material***REMOVED*** materialB
 * @param ***REMOVED***Object***REMOVED***   [options]
 * @param ***REMOVED***Number***REMOVED***   [options.friction=0.3]       Friction coefficient.
 * @param ***REMOVED***Number***REMOVED***   [options.restitution=0]      Restitution coefficient aka "bounciness".
 * @param ***REMOVED***Number***REMOVED***   [options.stiffness]          ContactEquation stiffness.
 * @param ***REMOVED***Number***REMOVED***   [options.relaxation]         ContactEquation relaxation.
 * @param ***REMOVED***Number***REMOVED***   [options.frictionStiffness]  FrictionEquation stiffness.
 * @param ***REMOVED***Number***REMOVED***   [options.frictionRelaxation] FrictionEquation relaxation.
 * @param ***REMOVED***Number***REMOVED***   [options.surfaceVelocity=0]  Surface velocity.
 * @author schteppe
 */
function ContactMaterial(materialA, materialB, options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    if(!(materialA instanceof Material) || !(materialB instanceof Material))***REMOVED***
        throw new Error("First two arguments must be Material instances.");
    ***REMOVED***

    /**
     * The contact material identifier
     * @property id
     * @type ***REMOVED***Number***REMOVED***
     */
    this.id = ContactMaterial.idCounter++;

    /**
     * First material participating in the contact material
     * @property materialA
     * @type ***REMOVED***Material***REMOVED***
     */
    this.materialA = materialA;

    /**
     * Second material participating in the contact material
     * @property materialB
     * @type ***REMOVED***Material***REMOVED***
     */
    this.materialB = materialB;

    /**
     * Friction to use in the contact of these two materials
     * @property friction
     * @type ***REMOVED***Number***REMOVED***
     */
    this.friction    =  typeof(options.friction)    !== "undefined" ?   Number(options.friction)    : 0.3;

    /**
     * Restitution to use in the contact of these two materials
     * @property restitution
     * @type ***REMOVED***Number***REMOVED***
     */
    this.restitution =  typeof(options.restitution) !== "undefined" ?   Number(options.restitution) : 0.0;

    /**
     * Stiffness of the resulting ContactEquation that this ContactMaterial generate
     * @property stiffness
     * @type ***REMOVED***Number***REMOVED***
     */
    this.stiffness =            typeof(options.stiffness)           !== "undefined" ?   Number(options.stiffness)   : Equation.DEFAULT_STIFFNESS;

    /**
     * Relaxation of the resulting ContactEquation that this ContactMaterial generate
     * @property relaxation
     * @type ***REMOVED***Number***REMOVED***
     */
    this.relaxation =           typeof(options.relaxation)          !== "undefined" ?   Number(options.relaxation)  : Equation.DEFAULT_RELAXATION;

    /**
     * Stiffness of the resulting FrictionEquation that this ContactMaterial generate
     * @property frictionStiffness
     * @type ***REMOVED***Number***REMOVED***
     */
    this.frictionStiffness =    typeof(options.frictionStiffness)   !== "undefined" ?   Number(options.frictionStiffness)   : Equation.DEFAULT_STIFFNESS;

    /**
     * Relaxation of the resulting FrictionEquation that this ContactMaterial generate
     * @property frictionRelaxation
     * @type ***REMOVED***Number***REMOVED***
     */
    this.frictionRelaxation =   typeof(options.frictionRelaxation)  !== "undefined" ?   Number(options.frictionRelaxation)  : Equation.DEFAULT_RELAXATION;

    /**
     * Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.
     * @property ***REMOVED***Number***REMOVED*** surfaceVelocity
     */
    this.surfaceVelocity = typeof(options.surfaceVelocity)    !== "undefined" ?   Number(options.surfaceVelocity)    : 0;

    /**
     * Offset to be set on ContactEquations. A positive value will make the bodies penetrate more into each other. Can be useful in scenes where contacts need to be more persistent, for example when stacking. Aka "cure for nervous contacts".
     * @property contactSkinSize
     * @type ***REMOVED***Number***REMOVED***
     */
    this.contactSkinSize = 0.005;
***REMOVED***

ContactMaterial.idCounter = 0;

***REMOVED***,***REMOVED***"../equations/Equation":22,"./Material":28***REMOVED***],28:[function(_dereq_,module,exports)***REMOVED***
module.exports = Material;

/**
 * Defines a physics material.
 * @class Material
 * @constructor
 * @param ***REMOVED***number***REMOVED*** id Material identifier
 * @author schteppe
 */
function Material(id)***REMOVED***
    /**
     * The material identifier
     * @property id
     * @type ***REMOVED***Number***REMOVED***
     */
    this.id = id || Material.idCounter++;
***REMOVED***

Material.idCounter = 0;

***REMOVED***,***REMOVED******REMOVED***],29:[function(_dereq_,module,exports)***REMOVED***

    /*
        PolyK library
        url: http://polyk.ivank.net
        Released under MIT licence.

        Copyright (c) 2012 Ivan Kuckir

        Permission is hereby granted, free of charge, to any person
        obtaining a copy of this software and associated documentation
        files (the "Software"), to deal in the Software without
        restriction, including without limitation the rights to use,
        copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the
        Software is furnished to do so, subject to the following
        conditions:

        The above copyright notice and this permission notice shall be
        included in all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
        EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
        OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
        NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
        HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
        WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
        OTHER DEALINGS IN THE SOFTWARE.
    */

    var PolyK = ***REMOVED******REMOVED***;

    /*
        Is Polygon self-intersecting?

        O(n^2)
    */
    /*
    PolyK.IsSimple = function(p)
    ***REMOVED***
        var n = p.length>>1;
        if(n<4) return true;
        var a1 = new PolyK._P(), a2 = new PolyK._P();
        var b1 = new PolyK._P(), b2 = new PolyK._P();
        var c = new PolyK._P();

        for(var i=0; i<n; i++)
        ***REMOVED***
            a1.x = p[2*i  ];
            a1.y = p[2*i+1];
            if(i==n-1)  ***REMOVED*** a2.x = p[0    ];  a2.y = p[1    ]; ***REMOVED***
            else        ***REMOVED*** a2.x = p[2*i+2];  a2.y = p[2*i+3]; ***REMOVED***

            for(var j=0; j<n; j++)
            ***REMOVED***
                if(Math.abs(i-j) < 2) continue;
                if(j==n-1 && i==0) continue;
                if(i==n-1 && j==0) continue;

                b1.x = p[2*j  ];
                b1.y = p[2*j+1];
                if(j==n-1)  ***REMOVED*** b2.x = p[0    ];  b2.y = p[1    ]; ***REMOVED***
                else        ***REMOVED*** b2.x = p[2*j+2];  b2.y = p[2*j+3]; ***REMOVED***

                if(PolyK._GetLineIntersection(a1,a2,b1,b2,c) != null) return false;
            ***REMOVED***
        ***REMOVED***
        return true;
    ***REMOVED***

    PolyK.IsConvex = function(p)
    ***REMOVED***
        if(p.length<6) return true;
        var l = p.length - 4;
        for(var i=0; i<l; i+=2)
            if(!PolyK._convex(p[i], p[i+1], p[i+2], p[i+3], p[i+4], p[i+5])) return false;
        if(!PolyK._convex(p[l  ], p[l+1], p[l+2], p[l+3], p[0], p[1])) return false;
        if(!PolyK._convex(p[l+2], p[l+3], p[0  ], p[1  ], p[2], p[3])) return false;
        return true;
    ***REMOVED***
    */
    PolyK.GetArea = function(p)
    ***REMOVED***
        if(p.length <6) return 0;
        var l = p.length - 2;
        var sum = 0;
        for(var i=0; i<l; i+=2)
            sum += (p[i+2]-p[i]) * (p[i+1]+p[i+3]);
        sum += (p[0]-p[l]) * (p[l+1]+p[1]);
        return - sum * 0.5;
    ***REMOVED***
    /*
    PolyK.GetAABB = function(p)
    ***REMOVED***
        var minx = Infinity;
        var miny = Infinity;
        var maxx = -minx;
        var maxy = -miny;
        for(var i=0; i<p.length; i+=2)
        ***REMOVED***
            minx = Math.min(minx, p[i  ]);
            maxx = Math.max(maxx, p[i  ]);
            miny = Math.min(miny, p[i+1]);
            maxy = Math.max(maxy, p[i+1]);
        ***REMOVED***
        return ***REMOVED***x:minx, y:miny, width:maxx-minx, height:maxy-miny***REMOVED***;
    ***REMOVED***
    */

    PolyK.Triangulate = function(p)
    ***REMOVED***
        var n = p.length>>1;
        if(n<3) return [];
        var tgs = [];
        var avl = [];
        for(var i=0; i<n; i++) avl.push(i);

        var i = 0;
        var al = n;
        while(al > 3)
        ***REMOVED***
            var i0 = avl[(i+0)%al];
            var i1 = avl[(i+1)%al];
            var i2 = avl[(i+2)%al];

            var ax = p[2*i0],  ay = p[2*i0+1];
            var bx = p[2*i1],  by = p[2*i1+1];
            var cx = p[2*i2],  cy = p[2*i2+1];

            var earFound = false;
            if(PolyK._convex(ax, ay, bx, by, cx, cy))
            ***REMOVED***
                earFound = true;
                for(var j=0; j<al; j++)
                ***REMOVED***
                    var vi = avl[j];
                    if(vi==i0 || vi==i1 || vi==i2) continue;
                    if(PolyK._PointInTriangle(p[2*vi], p[2*vi+1], ax, ay, bx, by, cx, cy)) ***REMOVED***earFound = false; break;***REMOVED***
                ***REMOVED***
            ***REMOVED***
            if(earFound)
            ***REMOVED***
                tgs.push(i0, i1, i2);
                avl.splice((i+1)%al, 1);
                al--;
                i= 0;
            ***REMOVED***
            else if(i++ > 3*al) break;      // no convex angles :(
        ***REMOVED***
        tgs.push(avl[0], avl[1], avl[2]);
        return tgs;
    ***REMOVED***
    /*
    PolyK.ContainsPoint = function(p, px, py)
    ***REMOVED***
        var n = p.length>>1;
        var ax, ay, bx = p[2*n-2]-px, by = p[2*n-1]-py;
        var depth = 0;
        for(var i=0; i<n; i++)
        ***REMOVED***
            ax = bx;  ay = by;
            bx = p[2*i  ] - px;
            by = p[2*i+1] - py;
            if(ay< 0 && by< 0) continue;    // both "up" or both "donw"
            if(ay>=0 && by>=0) continue;    // both "up" or both "donw"
            if(ax< 0 && bx< 0) continue;

            var lx = ax + (bx-ax)*(-ay)/(by-ay);
            if(lx>0) depth++;
        ***REMOVED***
        return (depth & 1) == 1;
    ***REMOVED***

    PolyK.Slice = function(p, ax, ay, bx, by)
    ***REMOVED***
        if(PolyK.ContainsPoint(p, ax, ay) || PolyK.ContainsPoint(p, bx, by)) return [p.slice(0)];

        var a = new PolyK._P(ax, ay);
        var b = new PolyK._P(bx, by);
        var iscs = [];  // intersections
        var ps = [];    // points
        for(var i=0; i<p.length; i+=2) ps.push(new PolyK._P(p[i], p[i+1]));

        for(var i=0; i<ps.length; i++)
        ***REMOVED***
            var isc = new PolyK._P(0,0);
            isc = PolyK._GetLineIntersection(a, b, ps[i], ps[(i+1)%ps.length], isc);

            if(isc)
            ***REMOVED***
                isc.flag = true;
                iscs.push(isc);
                ps.splice(i+1,0,isc);
                i++;
            ***REMOVED***
        ***REMOVED***
        if(iscs.length == 0) return [p.slice(0)];
        var comp = function(u,v) ***REMOVED***return PolyK._P.dist(a,u) - PolyK._P.dist(a,v); ***REMOVED***
        iscs.sort(comp);

        var pgs = [];
        var dir = 0;
        while(iscs.length > 0)
        ***REMOVED***
            var n = ps.length;
            var i0 = iscs[0];
            var i1 = iscs[1];
            var ind0 = ps.indexOf(i0);
            var ind1 = ps.indexOf(i1);
            var solved = false;

            if(PolyK._firstWithFlag(ps, ind0) == ind1) solved = true;
            else
            ***REMOVED***
                i0 = iscs[1];
                i1 = iscs[0];
                ind0 = ps.indexOf(i0);
                ind1 = ps.indexOf(i1);
                if(PolyK._firstWithFlag(ps, ind0) == ind1) solved = true;
            ***REMOVED***
            if(solved)
            ***REMOVED***
                dir--;
                var pgn = PolyK._getPoints(ps, ind0, ind1);
                pgs.push(pgn);
                ps = PolyK._getPoints(ps, ind1, ind0);
                i0.flag = i1.flag = false;
                iscs.splice(0,2);
                if(iscs.length == 0) pgs.push(ps);
            ***REMOVED***
            else ***REMOVED*** dir++; iscs.reverse(); ***REMOVED***
            if(dir>1) break;
        ***REMOVED***
        var result = [];
        for(var i=0; i<pgs.length; i++)
        ***REMOVED***
            var pg = pgs[i];
            var npg = [];
            for(var j=0; j<pg.length; j++) npg.push(pg[j].x, pg[j].y);
            result.push(npg);
        ***REMOVED***
        return result;
    ***REMOVED***

    PolyK.Raycast = function(p, x, y, dx, dy, isc)
    ***REMOVED***
        var l = p.length - 2;
        var tp = PolyK._tp;
        var a1 = tp[0], a2 = tp[1],
        b1 = tp[2], b2 = tp[3], c = tp[4];
        a1.x = x; a1.y = y;
        a2.x = x+dx; a2.y = y+dy;

        if(isc==null) isc = ***REMOVED***dist:0, edge:0, norm:***REMOVED***x:0, y:0***REMOVED***, refl:***REMOVED***x:0, y:0***REMOVED******REMOVED***;
        isc.dist = Infinity;

        for(var i=0; i<l; i+=2)
        ***REMOVED***
            b1.x = p[i  ];  b1.y = p[i+1];
            b2.x = p[i+2];  b2.y = p[i+3];
            var nisc = PolyK._RayLineIntersection(a1, a2, b1, b2, c);
            if(nisc) PolyK._updateISC(dx, dy, a1, b1, b2, c, i/2, isc);
        ***REMOVED***
        b1.x = b2.x;  b1.y = b2.y;
        b2.x = p[0];  b2.y = p[1];
        var nisc = PolyK._RayLineIntersection(a1, a2, b1, b2, c);
        if(nisc) PolyK._updateISC(dx, dy, a1, b1, b2, c, p.length/2, isc);

        return (isc.dist != Infinity) ? isc : null;
    ***REMOVED***

    PolyK.ClosestEdge = function(p, x, y, isc)
    ***REMOVED***
        var l = p.length - 2;
        var tp = PolyK._tp;
        var a1 = tp[0],
        b1 = tp[2], b2 = tp[3], c = tp[4];
        a1.x = x; a1.y = y;

        if(isc==null) isc = ***REMOVED***dist:0, edge:0, point:***REMOVED***x:0, y:0***REMOVED***, norm:***REMOVED***x:0, y:0***REMOVED******REMOVED***;
        isc.dist = Infinity;

        for(var i=0; i<l; i+=2)
        ***REMOVED***
            b1.x = p[i  ];  b1.y = p[i+1];
            b2.x = p[i+2];  b2.y = p[i+3];
            PolyK._pointLineDist(a1, b1, b2, i>>1, isc);
        ***REMOVED***
        b1.x = b2.x;  b1.y = b2.y;
        b2.x = p[0];  b2.y = p[1];
        PolyK._pointLineDist(a1, b1, b2, l>>1, isc);

        var idst = 1/isc.dist;
        isc.norm.x = (x-isc.point.x)*idst;
        isc.norm.y = (y-isc.point.y)*idst;
        return isc;
    ***REMOVED***

    PolyK._pointLineDist = function(p, a, b, edge, isc)
    ***REMOVED***
        var x = p.x, y = p.y, x1 = a.x, y1 = a.y, x2 = b.x, y2 = b.y;

        var A = x - x1;
        var B = y - y1;
        var C = x2 - x1;
        var D = y2 - y1;

        var dot = A * C + B * D;
        var len_sq = C * C + D * D;
        var param = dot / len_sq;

        var xx, yy;

        if (param < 0 || (x1 == x2 && y1 == y2)) ***REMOVED***
            xx = x1;
            yy = y1;
        ***REMOVED***
        else if (param > 1) ***REMOVED***
            xx = x2;
            yy = y2;
        ***REMOVED***
        else ***REMOVED***
            xx = x1 + param * C;
            yy = y1 + param * D;
        ***REMOVED***

        var dx = x - xx;
        var dy = y - yy;
        var dst = Math.sqrt(dx * dx + dy * dy);
        if(dst<isc.dist)
        ***REMOVED***
            isc.dist = dst;
            isc.edge = edge;
            isc.point.x = xx;
            isc.point.y = yy;
        ***REMOVED***
    ***REMOVED***

    PolyK._updateISC = function(dx, dy, a1, b1, b2, c, edge, isc)
    ***REMOVED***
        var nrl = PolyK._P.dist(a1, c);
        if(nrl<isc.dist)
        ***REMOVED***
            var ibl = 1/PolyK._P.dist(b1, b2);
            var nx = -(b2.y-b1.y)*ibl;
            var ny =  (b2.x-b1.x)*ibl;
            var ddot = 2*(dx*nx+dy*ny);
            isc.dist = nrl;
            isc.norm.x = nx;
            isc.norm.y = ny;
            isc.refl.x = -ddot*nx+dx;
            isc.refl.y = -ddot*ny+dy;
            isc.edge = edge;
        ***REMOVED***
    ***REMOVED***

    PolyK._getPoints = function(ps, ind0, ind1)
    ***REMOVED***
        var n = ps.length;
        var nps = [];
        if(ind1<ind0) ind1 += n;
        for(var i=ind0; i<= ind1; i++) nps.push(ps[i%n]);
        return nps;
    ***REMOVED***

    PolyK._firstWithFlag = function(ps, ind)
    ***REMOVED***
        var n = ps.length;
        while(true)
        ***REMOVED***
            ind = (ind+1)%n;
            if(ps[ind].flag) return ind;
        ***REMOVED***
    ***REMOVED***
    */
    PolyK._PointInTriangle = function(px, py, ax, ay, bx, by, cx, cy)
    ***REMOVED***
        var v0x = cx-ax;
        var v0y = cy-ay;
        var v1x = bx-ax;
        var v1y = by-ay;
        var v2x = px-ax;
        var v2y = py-ay;

        var dot00 = v0x*v0x+v0y*v0y;
        var dot01 = v0x*v1x+v0y*v1y;
        var dot02 = v0x*v2x+v0y*v2y;
        var dot11 = v1x*v1x+v1y*v1y;
        var dot12 = v1x*v2x+v1y*v2y;

        var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
        var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

        // Check if point is in triangle
        return (u >= 0) && (v >= 0) && (u + v < 1);
    ***REMOVED***
    /*
    PolyK._RayLineIntersection = function(a1, a2, b1, b2, c)
    ***REMOVED***
        var dax = (a1.x-a2.x), dbx = (b1.x-b2.x);
        var day = (a1.y-a2.y), dby = (b1.y-b2.y);

        var Den = dax*dby - day*dbx;
        if (Den == 0) return null;  // parallel

        var A = (a1.x * a2.y - a1.y * a2.x);
        var B = (b1.x * b2.y - b1.y * b2.x);

        var I = c;
        var iDen = 1/Den;
        I.x = ( A*dbx - dax*B ) * iDen;
        I.y = ( A*dby - day*B ) * iDen;

        if(!PolyK._InRect(I, b1, b2)) return null;
        if((day>0 && I.y>a1.y) || (day<0 && I.y<a1.y)) return null;
        if((dax>0 && I.x>a1.x) || (dax<0 && I.x<a1.x)) return null;
        return I;
    ***REMOVED***

    PolyK._GetLineIntersection = function(a1, a2, b1, b2, c)
    ***REMOVED***
        var dax = (a1.x-a2.x), dbx = (b1.x-b2.x);
        var day = (a1.y-a2.y), dby = (b1.y-b2.y);

        var Den = dax*dby - day*dbx;
        if (Den == 0) return null;  // parallel

        var A = (a1.x * a2.y - a1.y * a2.x);
        var B = (b1.x * b2.y - b1.y * b2.x);

        var I = c;
        I.x = ( A*dbx - dax*B ) / Den;
        I.y = ( A*dby - day*B ) / Den;

        if(PolyK._InRect(I, a1, a2) && PolyK._InRect(I, b1, b2)) return I;
        return null;
    ***REMOVED***

    PolyK._InRect = function(a, b, c)
    ***REMOVED***
        if  (b.x == c.x) return (a.y>=Math.min(b.y, c.y) && a.y<=Math.max(b.y, c.y));
        if  (b.y == c.y) return (a.x>=Math.min(b.x, c.x) && a.x<=Math.max(b.x, c.x));

        if(a.x >= Math.min(b.x, c.x) && a.x <= Math.max(b.x, c.x)
        && a.y >= Math.min(b.y, c.y) && a.y <= Math.max(b.y, c.y))
        return true;
        return false;
    ***REMOVED***
    */
    PolyK._convex = function(ax, ay, bx, by, cx, cy)
    ***REMOVED***
        return (ay-by)*(cx-bx) + (bx-ax)*(cy-by) >= 0;
    ***REMOVED***
    /*
    PolyK._P = function(x,y)
    ***REMOVED***
        this.x = x;
        this.y = y;
        this.flag = false;
    ***REMOVED***
    PolyK._P.prototype.toString = function()
    ***REMOVED***
        return "Point ["+this.x+", "+this.y+"]";
    ***REMOVED***
    PolyK._P.dist = function(a,b)
    ***REMOVED***
        var dx = b.x-a.x;
        var dy = b.y-a.y;
        return Math.sqrt(dx*dx + dy*dy);
    ***REMOVED***

    PolyK._tp = [];
    for(var i=0; i<10; i++) PolyK._tp.push(new PolyK._P(0,0));
        */

module.exports = PolyK;

***REMOVED***,***REMOVED******REMOVED***],30:[function(_dereq_,module,exports)***REMOVED***
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * The vec2 object from glMatrix, with some extensions and some removed methods. See http://glmatrix.net.
 * @class vec2
 */

var vec2 = module.exports = ***REMOVED******REMOVED***;

var Utils = _dereq_('../utils/Utils');

/**
 * Make a cross product and only return the z component
 * @method crossLength
 * @static
 * @param  ***REMOVED***Array***REMOVED*** a
 * @param  ***REMOVED***Array***REMOVED*** b
 * @return ***REMOVED***Number***REMOVED***
 */
vec2.crossLength = function(a,b)***REMOVED***
    return a[0] * b[1] - a[1] * b[0];
***REMOVED***;

/**
 * Cross product between a vector and the Z component of a vector
 * @method crossVZ
 * @static
 * @param  ***REMOVED***Array***REMOVED*** out
 * @param  ***REMOVED***Array***REMOVED*** vec
 * @param  ***REMOVED***Number***REMOVED*** zcomp
 * @return ***REMOVED***Number***REMOVED***
 */
vec2.crossVZ = function(out, vec, zcomp)***REMOVED***
    vec2.rotate(out,vec,-Math.PI/2);// Rotate according to the right hand rule
    vec2.scale(out,out,zcomp);      // Scale with z
    return out;
***REMOVED***;

/**
 * Cross product between a vector and the Z component of a vector
 * @method crossZV
 * @static
 * @param  ***REMOVED***Array***REMOVED*** out
 * @param  ***REMOVED***Number***REMOVED*** zcomp
 * @param  ***REMOVED***Array***REMOVED*** vec
 * @return ***REMOVED***Number***REMOVED***
 */
vec2.crossZV = function(out, zcomp, vec)***REMOVED***
    vec2.rotate(out,vec,Math.PI/2); // Rotate according to the right hand rule
    vec2.scale(out,out,zcomp);      // Scale with z
    return out;
***REMOVED***;

/**
 * Rotate a vector by an angle
 * @method rotate
 * @static
 * @param  ***REMOVED***Array***REMOVED*** out
 * @param  ***REMOVED***Array***REMOVED*** a
 * @param  ***REMOVED***Number***REMOVED*** angle
 */
vec2.rotate = function(out,a,angle)***REMOVED***
    if(angle !== 0)***REMOVED***
        var c = Math.cos(angle),
            s = Math.sin(angle),
            x = a[0],
            y = a[1];
        out[0] = c*x -s*y;
        out[1] = s*x +c*y;
    ***REMOVED*** else ***REMOVED***
        out[0] = a[0];
        out[1] = a[1];
    ***REMOVED***
***REMOVED***;

/**
 * Rotate a vector 90 degrees clockwise
 * @method rotate90cw
 * @static
 * @param  ***REMOVED***Array***REMOVED*** out
 * @param  ***REMOVED***Array***REMOVED*** a
 * @param  ***REMOVED***Number***REMOVED*** angle
 */
vec2.rotate90cw = function(out, a) ***REMOVED***
    var x = a[0];
    var y = a[1];
    out[0] = y;
    out[1] = -x;
***REMOVED***;

/**
 * Transform a point position to local frame.
 * @method toLocalFrame
 * @param  ***REMOVED***Array***REMOVED*** out
 * @param  ***REMOVED***Array***REMOVED*** worldPoint
 * @param  ***REMOVED***Array***REMOVED*** framePosition
 * @param  ***REMOVED***Number***REMOVED*** frameAngle
 */
vec2.toLocalFrame = function(out, worldPoint, framePosition, frameAngle)***REMOVED***
    vec2.copy(out, worldPoint);
    vec2.sub(out, out, framePosition);
    vec2.rotate(out, out, -frameAngle);
***REMOVED***;

/**
 * Transform a point position to global frame.
 * @method toGlobalFrame
 * @param  ***REMOVED***Array***REMOVED*** out
 * @param  ***REMOVED***Array***REMOVED*** localPoint
 * @param  ***REMOVED***Array***REMOVED*** framePosition
 * @param  ***REMOVED***Number***REMOVED*** frameAngle
 */
vec2.toGlobalFrame = function(out, localPoint, framePosition, frameAngle)***REMOVED***
    vec2.copy(out, localPoint);
    vec2.rotate(out, out, frameAngle);
    vec2.add(out, out, framePosition);
***REMOVED***;

/**
 * Transform a vector to local frame.
 * @method vectorToLocalFrame
 * @param  ***REMOVED***Array***REMOVED*** out
 * @param  ***REMOVED***Array***REMOVED*** worldVector
 * @param  ***REMOVED***Number***REMOVED*** frameAngle
 */
vec2.vectorToLocalFrame = function(out, worldVector, frameAngle)***REMOVED***
    vec2.rotate(out, worldVector, -frameAngle);
***REMOVED***;

/**
 * Transform a point position to global frame.
 * @method toGlobalFrame
 * @param  ***REMOVED***Array***REMOVED*** out
 * @param  ***REMOVED***Array***REMOVED*** localVector
 * @param  ***REMOVED***Number***REMOVED*** frameAngle
 */
vec2.vectorToGlobalFrame = function(out, localVector, frameAngle)***REMOVED***
    vec2.rotate(out, localVector, frameAngle);
***REMOVED***;

/**
 * Compute centroid of a triangle spanned by vectors a,b,c. See http://easycalculation.com/analytical/learn-centroid.php
 * @method centroid
 * @static
 * @param  ***REMOVED***Array***REMOVED*** out
 * @param  ***REMOVED***Array***REMOVED*** a
 * @param  ***REMOVED***Array***REMOVED*** b
 * @param  ***REMOVED***Array***REMOVED*** c
 * @return  ***REMOVED***Array***REMOVED*** The out object
 */
vec2.centroid = function(out, a, b, c)***REMOVED***
    vec2.add(out, a, b);
    vec2.add(out, out, c);
    vec2.scale(out, out, 1/3);
    return out;
***REMOVED***;

/**
 * Creates a new, empty vec2
 * @static
 * @method create
 * @return ***REMOVED***Array***REMOVED*** a new 2D vector
 */
vec2.create = function() ***REMOVED***
    var out = new Utils.ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
***REMOVED***;

/**
 * Creates a new vec2 initialized with values from an existing vector
 * @static
 * @method clone
 * @param ***REMOVED***Array***REMOVED*** a vector to clone
 * @return ***REMOVED***Array***REMOVED*** a new 2D vector
 */
vec2.clone = function(a) ***REMOVED***
    var out = new Utils.ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
***REMOVED***;

/**
 * Creates a new vec2 initialized with the given values
 * @static
 * @method fromValues
 * @param ***REMOVED***Number***REMOVED*** x X component
 * @param ***REMOVED***Number***REMOVED*** y Y component
 * @return ***REMOVED***Array***REMOVED*** a new 2D vector
 */
vec2.fromValues = function(x, y) ***REMOVED***
    var out = new Utils.ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
***REMOVED***;

/**
 * Copy the values from one vec2 to another
 * @static
 * @method copy
 * @param ***REMOVED***Array***REMOVED*** out the receiving vector
 * @param ***REMOVED***Array***REMOVED*** a the source vector
 * @return ***REMOVED***Array***REMOVED*** out
 */
vec2.copy = function(out, a) ***REMOVED***
    out[0] = a[0];
    out[1] = a[1];
    return out;
***REMOVED***;

/**
 * Set the components of a vec2 to the given values
 * @static
 * @method set
 * @param ***REMOVED***Array***REMOVED*** out the receiving vector
 * @param ***REMOVED***Number***REMOVED*** x X component
 * @param ***REMOVED***Number***REMOVED*** y Y component
 * @return ***REMOVED***Array***REMOVED*** out
 */
vec2.set = function(out, x, y) ***REMOVED***
    out[0] = x;
    out[1] = y;
    return out;
***REMOVED***;

/**
 * Adds two vec2's
 * @static
 * @method add
 * @param ***REMOVED***Array***REMOVED*** out the receiving vector
 * @param ***REMOVED***Array***REMOVED*** a the first operand
 * @param ***REMOVED***Array***REMOVED*** b the second operand
 * @return ***REMOVED***Array***REMOVED*** out
 */
vec2.add = function(out, a, b) ***REMOVED***
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
***REMOVED***;

/**
 * Subtracts two vec2's
 * @static
 * @method subtract
 * @param ***REMOVED***Array***REMOVED*** out the receiving vector
 * @param ***REMOVED***Array***REMOVED*** a the first operand
 * @param ***REMOVED***Array***REMOVED*** b the second operand
 * @return ***REMOVED***Array***REMOVED*** out
 */
vec2.subtract = function(out, a, b) ***REMOVED***
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
***REMOVED***;

/**
 * Alias for vec2.subtract
 * @static
 * @method sub
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 * @static
 * @method multiply
 * @param ***REMOVED***Array***REMOVED*** out the receiving vector
 * @param ***REMOVED***Array***REMOVED*** a the first operand
 * @param ***REMOVED***Array***REMOVED*** b the second operand
 * @return ***REMOVED***Array***REMOVED*** out
 */
vec2.multiply = function(out, a, b) ***REMOVED***
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
***REMOVED***;

/**
 * Alias for vec2.multiply
 * @static
 * @method mul
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 * @static
 * @method divide
 * @param ***REMOVED***Array***REMOVED*** out the receiving vector
 * @param ***REMOVED***Array***REMOVED*** a the first operand
 * @param ***REMOVED***Array***REMOVED*** b the second operand
 * @return ***REMOVED***Array***REMOVED*** out
 */
vec2.divide = function(out, a, b) ***REMOVED***
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
***REMOVED***;

/**
 * Alias for vec2.divide
 * @static
 * @method div
 */
vec2.div = vec2.divide;

/**
 * Scales a vec2 by a scalar number
 * @static
 * @method scale
 * @param ***REMOVED***Array***REMOVED*** out the receiving vector
 * @param ***REMOVED***Array***REMOVED*** a the vector to scale
 * @param ***REMOVED***Number***REMOVED*** b amount to scale the vector by
 * @return ***REMOVED***Array***REMOVED*** out
 */
vec2.scale = function(out, a, b) ***REMOVED***
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
***REMOVED***;

/**
 * Calculates the euclidian distance between two vec2's
 * @static
 * @method distance
 * @param ***REMOVED***Array***REMOVED*** a the first operand
 * @param ***REMOVED***Array***REMOVED*** b the second operand
 * @return ***REMOVED***Number***REMOVED*** distance between a and b
 */
vec2.distance = function(a, b) ***REMOVED***
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
***REMOVED***;

/**
 * Alias for vec2.distance
 * @static
 * @method dist
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 * @static
 * @method squaredDistance
 * @param ***REMOVED***Array***REMOVED*** a the first operand
 * @param ***REMOVED***Array***REMOVED*** b the second operand
 * @return ***REMOVED***Number***REMOVED*** squared distance between a and b
 */
vec2.squaredDistance = function(a, b) ***REMOVED***
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
***REMOVED***;

/**
 * Alias for vec2.squaredDistance
 * @static
 * @method sqrDist
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 * @static
 * @method length
 * @param ***REMOVED***Array***REMOVED*** a vector to calculate length of
 * @return ***REMOVED***Number***REMOVED*** length of a
 */
vec2.length = function (a) ***REMOVED***
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
***REMOVED***;

/**
 * Alias for vec2.length
 * @method len
 * @static
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 * @static
 * @method squaredLength
 * @param ***REMOVED***Array***REMOVED*** a vector to calculate squared length of
 * @return ***REMOVED***Number***REMOVED*** squared length of a
 */
vec2.squaredLength = function (a) ***REMOVED***
    var x = a[0],
        y = a[1];
    return x*x + y*y;
***REMOVED***;

/**
 * Alias for vec2.squaredLength
 * @static
 * @method sqrLen
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 * @static
 * @method negate
 * @param ***REMOVED***Array***REMOVED*** out the receiving vector
 * @param ***REMOVED***Array***REMOVED*** a vector to negate
 * @return ***REMOVED***Array***REMOVED*** out
 */
vec2.negate = function(out, a) ***REMOVED***
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
***REMOVED***;

/**
 * Normalize a vec2
 * @static
 * @method normalize
 * @param ***REMOVED***Array***REMOVED*** out the receiving vector
 * @param ***REMOVED***Array***REMOVED*** a vector to normalize
 * @return ***REMOVED***Array***REMOVED*** out
 */
vec2.normalize = function(out, a) ***REMOVED***
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) ***REMOVED***
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    ***REMOVED***
    return out;
***REMOVED***;

/**
 * Calculates the dot product of two vec2's
 * @static
 * @method dot
 * @param ***REMOVED***Array***REMOVED*** a the first operand
 * @param ***REMOVED***Array***REMOVED*** b the second operand
 * @return ***REMOVED***Number***REMOVED*** dot product of a and b
 */
vec2.dot = function (a, b) ***REMOVED***
    return a[0] * b[0] + a[1] * b[1];
***REMOVED***;

/**
 * Returns a string representation of a vector
 * @static
 * @method str
 * @param ***REMOVED***Array***REMOVED*** vec vector to represent as a string
 * @return ***REMOVED***String***REMOVED*** string representation of the vector
 */
vec2.str = function (a) ***REMOVED***
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
***REMOVED***;

/**
 * Linearly interpolate/mix two vectors.
 * @static
 * @method lerp
 * @param ***REMOVED***Array***REMOVED*** out
 * @param ***REMOVED***Array***REMOVED*** a First vector
 * @param ***REMOVED***Array***REMOVED*** b Second vector
 * @param ***REMOVED***number***REMOVED*** t Lerp factor
 */
vec2.lerp = function (out, a, b, t) ***REMOVED***
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
***REMOVED***;

/**
 * Reflect a vector along a normal.
 * @static
 * @method reflect
 * @param ***REMOVED***Array***REMOVED*** out
 * @param ***REMOVED***Array***REMOVED*** vector
 * @param ***REMOVED***Array***REMOVED*** normal
 */
vec2.reflect = function(out, vector, normal)***REMOVED***
    var dot = vector[0] * normal[0] + vector[1] * normal[1];
    out[0] = vector[0] - 2 * normal[0] * dot;
    out[1] = vector[1] - 2 * normal[1] * dot;
***REMOVED***;

/**
 * Get the intersection point between two line segments.
 * @static
 * @method getLineSegmentsIntersection
 * @param  ***REMOVED***Array***REMOVED*** out
 * @param  ***REMOVED***Array***REMOVED*** p0
 * @param  ***REMOVED***Array***REMOVED*** p1
 * @param  ***REMOVED***Array***REMOVED*** p2
 * @param  ***REMOVED***Array***REMOVED*** p3
 * @return ***REMOVED***boolean***REMOVED*** True if there was an intersection, otherwise false.
 */
vec2.getLineSegmentsIntersection = function(out, p0, p1, p2, p3) ***REMOVED***
    var t = vec2.getLineSegmentsIntersectionFraction(p0, p1, p2, p3);
    if(t < 0)***REMOVED***
        return false;
    ***REMOVED*** else ***REMOVED***
        out[0] = p0[0] + (t * (p1[0] - p0[0]));
        out[1] = p0[1] + (t * (p1[1] - p0[1]));
        return true;
    ***REMOVED***
***REMOVED***;

/**
 * Get the intersection fraction between two line segments. If successful, the intersection is at p0 + t * (p1 - p0)
 * @static
 * @method getLineSegmentsIntersectionFraction
 * @param  ***REMOVED***Array***REMOVED*** p0
 * @param  ***REMOVED***Array***REMOVED*** p1
 * @param  ***REMOVED***Array***REMOVED*** p2
 * @param  ***REMOVED***Array***REMOVED*** p3
 * @return ***REMOVED***number***REMOVED*** A number between 0 and 1 if there was an intersection, otherwise -1.
 */
vec2.getLineSegmentsIntersectionFraction = function(p0, p1, p2, p3) ***REMOVED***
    var s1_x = p1[0] - p0[0];
    var s1_y = p1[1] - p0[1];
    var s2_x = p3[0] - p2[0];
    var s2_y = p3[1] - p2[1];

    var s, t;
    s = (-s1_y * (p0[0] - p2[0]) + s1_x * (p0[1] - p2[1])) / (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (p0[1] - p2[1]) - s2_y * (p0[0] - p2[0])) / (-s2_x * s1_y + s1_x * s2_y);
    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) ***REMOVED*** // Collision detected
        return t;
    ***REMOVED***
    return -1; // No collision
***REMOVED***;

***REMOVED***,***REMOVED***"../utils/Utils":57***REMOVED***],31:[function(_dereq_,module,exports)***REMOVED***
var vec2 = _dereq_('../math/vec2')
,   decomp = _dereq_('poly-decomp')
,   Convex = _dereq_('../shapes/Convex')
,   RaycastResult = _dereq_('../collision/RaycastResult')
,   Ray = _dereq_('../collision/Ray')
,   AABB = _dereq_('../collision/AABB')
,   EventEmitter = _dereq_('../events/EventEmitter');

module.exports = Body;

/**
 * A rigid body. Has got a center of mass, position, velocity and a number of
 * shapes that are used for collisions.
 *
 * @class Body
 * @constructor
 * @extends EventEmitter
 * @param ***REMOVED***Array***REMOVED*** [options.force]
 * @param ***REMOVED***Array***REMOVED*** [options.position]
 * @param ***REMOVED***Array***REMOVED*** [options.velocity]
 * @param ***REMOVED***Boolean***REMOVED*** [options.allowSleep]
 * @param ***REMOVED***Boolean***REMOVED*** [options.collisionResponse]
 * @param ***REMOVED***Number***REMOVED*** [options.angle=0]
 * @param ***REMOVED***Number***REMOVED*** [options.angularForce=0]
 * @param ***REMOVED***Number***REMOVED*** [options.angularVelocity=0]
 * @param ***REMOVED***Number***REMOVED*** [options.ccdIterations=10]
 * @param ***REMOVED***Number***REMOVED*** [options.ccdSpeedThreshold=-1]
 * @param ***REMOVED***Number***REMOVED*** [options.fixedRotation=false]
 * @param ***REMOVED***Number***REMOVED*** [options.gravityScale]
 * @param ***REMOVED***Number***REMOVED*** [options.id]
 * @param ***REMOVED***Number***REMOVED*** [options.mass=0] A number >= 0. If zero, the .type will be set to Body.STATIC.
 * @param ***REMOVED***Number***REMOVED*** [options.sleepSpeedLimit]
 * @param ***REMOVED***Number***REMOVED*** [options.sleepTimeLimit]
 * @param ***REMOVED***Object***REMOVED*** [options]
 *
 * @example
 *
 *     // Create a typical dynamic body
 *     var body = new Body(***REMOVED***
 *         mass: 1,
 *         position: [0, 0],
 *         angle: 0,
 *         velocity: [0, 0],
 *         angularVelocity: 0
 *     ***REMOVED***);
 *
 *     // Add a circular shape to the body
 *     body.addShape(new Circle(***REMOVED*** radius: 1 ***REMOVED***));
 *
 *     // Add the body to the world
 *     world.addBody(body);
 */
function Body(options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    EventEmitter.call(this);

    /**
     * The body identifyer
     * @property id
     * @type ***REMOVED***Number***REMOVED***
     */
    this.id = options.id || ++Body._idCounter;

    /**
     * The world that this body is added to. This property is set to NULL if the body is not added to any world.
     * @property world
     * @type ***REMOVED***World***REMOVED***
     */
    this.world = null;

    /**
     * The shapes of the body.
     *
     * @property shapes
     * @type ***REMOVED***Array***REMOVED***
     */
    this.shapes = [];

    /**
     * The mass of the body.
     * @property mass
     * @type ***REMOVED***number***REMOVED***
     */
    this.mass = options.mass || 0;

    /**
     * The inverse mass of the body.
     * @property invMass
     * @type ***REMOVED***number***REMOVED***
     */
    this.invMass = 0;

    /**
     * The inertia of the body around the Z axis.
     * @property inertia
     * @type ***REMOVED***number***REMOVED***
     */
    this.inertia = 0;

    /**
     * The inverse inertia of the body.
     * @property invInertia
     * @type ***REMOVED***number***REMOVED***
     */
    this.invInertia = 0;

    this.invMassSolve = 0;
    this.invInertiaSolve = 0;

    /**
     * Set to true if you want to fix the rotation of the body.
     * @property fixedRotation
     * @type ***REMOVED***Boolean***REMOVED***
     */
    this.fixedRotation = !!options.fixedRotation;

    /**
     * Set to true if you want to fix the body movement along the X axis. The body will still be able to move along Y.
     * @property ***REMOVED***Boolean***REMOVED*** fixedX
     */
    this.fixedX = !!options.fixedX;

    /**
     * Set to true if you want to fix the body movement along the Y axis. The body will still be able to move along X.
     * @property ***REMOVED***Boolean***REMOVED*** fixedY
     */
    this.fixedY = !!options.fixedY;

    /**
     * @private
     * @property ***REMOVED***array***REMOVED*** massMultiplier
     */
    this.massMultiplier = vec2.create();

    /**
     * The position of the body
     * @property position
     * @type ***REMOVED***Array***REMOVED***
     */
    this.position = vec2.fromValues(0,0);
    if(options.position)***REMOVED***
        vec2.copy(this.position, options.position);
    ***REMOVED***

    /**
     * The interpolated position of the body. Use this for rendering.
     * @property interpolatedPosition
     * @type ***REMOVED***Array***REMOVED***
     */
    this.interpolatedPosition = vec2.fromValues(0,0);

    /**
     * The interpolated angle of the body. Use this for rendering.
     * @property interpolatedAngle
     * @type ***REMOVED***Number***REMOVED***
     */
    this.interpolatedAngle = 0;

    /**
     * The previous position of the body.
     * @property previousPosition
     * @type ***REMOVED***Array***REMOVED***
     */
    this.previousPosition = vec2.fromValues(0,0);

    /**
     * The previous angle of the body.
     * @property previousAngle
     * @type ***REMOVED***Number***REMOVED***
     */
    this.previousAngle = 0;

    /**
     * The current velocity of the body.
     * @property velocity
     * @type ***REMOVED***Array***REMOVED***
     */
    this.velocity = vec2.fromValues(0,0);
    if(options.velocity)***REMOVED***
        vec2.copy(this.velocity, options.velocity);
    ***REMOVED***

    /**
     * Constraint velocity that was added to the body during the last step.
     * @property vlambda
     * @type ***REMOVED***Array***REMOVED***
     */
    this.vlambda = vec2.fromValues(0,0);

    /**
     * Angular constraint velocity that was added to the body during last step.
     * @property wlambda
     * @type ***REMOVED***Array***REMOVED***
     */
    this.wlambda = 0;

    /**
     * The angle of the body, in radians.
     * @property angle
     * @type ***REMOVED***number***REMOVED***
     * @example
     *     // The angle property is not normalized to the interval 0 to 2*pi, it can be any value.
     *     // If you need a value between 0 and 2*pi, use the following function to normalize it.
     *     function normalizeAngle(angle)***REMOVED***
     *         angle = angle % (2*Math.PI);
     *         if(angle < 0)***REMOVED***
     *             angle += (2*Math.PI);
     *         ***REMOVED***
     *         return angle;
     *     ***REMOVED***
     */
    this.angle = options.angle || 0;

    /**
     * The angular velocity of the body, in radians per second.
     * @property angularVelocity
     * @type ***REMOVED***number***REMOVED***
     */
    this.angularVelocity = options.angularVelocity || 0;

    /**
     * The force acting on the body. Since the body force (and ***REMOVED******REMOVED***#crossLink "Body/angularForce:property"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***) will be zeroed after each step, so you need to set the force before each step.
     * @property force
     * @type ***REMOVED***Array***REMOVED***
     *
     * @example
     *     // This produces a forcefield of 1 Newton in the positive x direction.
     *     for(var i=0; i<numSteps; i++)***REMOVED***
     *         body.force[0] = 1;
     *         world.step(1/60);
     *     ***REMOVED***
     *
     * @example
     *     // This will apply a rotational force on the body
     *     for(var i=0; i<numSteps; i++)***REMOVED***
     *         body.angularForce = -3;
     *         world.step(1/60);
     *     ***REMOVED***
     */
    this.force = vec2.create();
    if(options.force)***REMOVED***
        vec2.copy(this.force, options.force);
    ***REMOVED***

    /**
     * The angular force acting on the body. See ***REMOVED******REMOVED***#crossLink "Body/force:property"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***.
     * @property angularForce
     * @type ***REMOVED***number***REMOVED***
     */
    this.angularForce = options.angularForce || 0;

    /**
     * The linear damping acting on the body in the velocity direction. Should be a value between 0 and 1.
     * @property damping
     * @type ***REMOVED***Number***REMOVED***
     * @default 0.1
     */
    this.damping = typeof(options.damping) === "number" ? options.damping : 0.1;

    /**
     * The angular force acting on the body. Should be a value between 0 and 1.
     * @property angularDamping
     * @type ***REMOVED***Number***REMOVED***
     * @default 0.1
     */
    this.angularDamping = typeof(options.angularDamping) === "number" ? options.angularDamping : 0.1;

    /**
     * The type of motion this body has. Should be one of: ***REMOVED******REMOVED***#crossLink "Body/STATIC:property"***REMOVED******REMOVED***Body.STATIC***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***, ***REMOVED******REMOVED***#crossLink "Body/DYNAMIC:property"***REMOVED******REMOVED***Body.DYNAMIC***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** and ***REMOVED******REMOVED***#crossLink "Body/KINEMATIC:property"***REMOVED******REMOVED***Body.KINEMATIC***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***.
     *
     * * Static bodies do not move, and they do not respond to forces or collision.
     * * Dynamic bodies body can move and respond to collisions and forces.
     * * Kinematic bodies only moves according to its .velocity, and does not respond to collisions or force.
     *
     * @property type
     * @type ***REMOVED***number***REMOVED***
     *
     * @example
     *     // Bodies are static by default. Static bodies will never move.
     *     var body = new Body();
     *     console.log(body.type == Body.STATIC); // true
     *
     * @example
     *     // By setting the mass of a body to a nonzero number, the body
     *     // will become dynamic and will move and interact with other bodies.
     *     var dynamicBody = new Body(***REMOVED***
     *         mass : 1
     *     ***REMOVED***);
     *     console.log(dynamicBody.type == Body.DYNAMIC); // true
     *
     * @example
     *     // Kinematic bodies will only move if you change their velocity.
     *     var kinematicBody = new Body(***REMOVED***
     *         type: Body.KINEMATIC // Type can be set via the options object.
     *     ***REMOVED***);
     */
    this.type = Body.STATIC;

    if(typeof(options.type) !== 'undefined')***REMOVED***
        this.type = options.type;
    ***REMOVED*** else if(!options.mass)***REMOVED***
        this.type = Body.STATIC;
    ***REMOVED*** else ***REMOVED***
        this.type = Body.DYNAMIC;
    ***REMOVED***

    /**
     * Bounding circle radius.
     * @property boundingRadius
     * @type ***REMOVED***Number***REMOVED***
     */
    this.boundingRadius = 0;

    /**
     * Bounding box of this body.
     * @property aabb
     * @type ***REMOVED***AABB***REMOVED***
     */
    this.aabb = new AABB();

    /**
     * Indicates if the AABB needs update. Update it with ***REMOVED******REMOVED***#crossLink "Body/updateAABB:method"***REMOVED******REMOVED***.updateAABB()***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***.
     * @property aabbNeedsUpdate
     * @type ***REMOVED***Boolean***REMOVED***
     * @see updateAABB
     *
     * @example
     *     // Force update the AABB
     *     body.aabbNeedsUpdate = true;
     *     body.updateAABB();
     *     console.log(body.aabbNeedsUpdate); // false
     */
    this.aabbNeedsUpdate = true;

    /**
     * If true, the body will automatically fall to sleep. Note that you need to enable sleeping in the ***REMOVED******REMOVED***#crossLink "World"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** before anything will happen.
     * @property allowSleep
     * @type ***REMOVED***Boolean***REMOVED***
     * @default true
     */
    this.allowSleep = options.allowSleep !== undefined ? options.allowSleep : true;

    this.wantsToSleep = false;

    /**
     * One of ***REMOVED******REMOVED***#crossLink "Body/AWAKE:property"***REMOVED******REMOVED***Body.AWAKE***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***, ***REMOVED******REMOVED***#crossLink "Body/SLEEPY:property"***REMOVED******REMOVED***Body.SLEEPY***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** and ***REMOVED******REMOVED***#crossLink "Body/SLEEPING:property"***REMOVED******REMOVED***Body.SLEEPING***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***.
     *
     * The body is initially Body.AWAKE. If its velocity norm is below .sleepSpeedLimit, the sleepState will become Body.SLEEPY. If the body continues to be Body.SLEEPY for .sleepTimeLimit seconds, it will fall asleep (Body.SLEEPY).
     *
     * @property sleepState
     * @type ***REMOVED***Number***REMOVED***
     * @default Body.AWAKE
     */
    this.sleepState = Body.AWAKE;

    /**
     * If the speed (the norm of the velocity) is smaller than this value, the body is considered sleepy.
     * @property sleepSpeedLimit
     * @type ***REMOVED***Number***REMOVED***
     * @default 0.2
     */
    this.sleepSpeedLimit = options.sleepSpeedLimit !== undefined ? options.sleepSpeedLimit : 0.2;

    /**
     * If the body has been sleepy for this sleepTimeLimit seconds, it is considered sleeping.
     * @property sleepTimeLimit
     * @type ***REMOVED***Number***REMOVED***
     * @default 1
     */
    this.sleepTimeLimit = options.sleepTimeLimit !== undefined ? options.sleepTimeLimit : 1;

    /**
     * Gravity scaling factor. If you want the body to ignore gravity, set this to zero. If you want to reverse gravity, set it to -1.
     * @property ***REMOVED***Number***REMOVED*** gravityScale
     * @default 1
     */
    this.gravityScale = options.gravityScale !== undefined ? options.gravityScale : 1;

    /**
     * Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled. That means that this body will move through other bodies, but it will still trigger contact events, etc.
     * @property ***REMOVED***Boolean***REMOVED*** collisionResponse
     */
    this.collisionResponse = options.collisionResponse !== undefined ? options.collisionResponse : true;

    /**
     * How long the body has been sleeping.
     * @property ***REMOVED***Number***REMOVED*** idleTime
     */
    this.idleTime = 0;

    /**
     * The last time when the body went to SLEEPY state.
     * @property ***REMOVED***Number***REMOVED*** timeLastSleepy
     * @private
     */
    this.timeLastSleepy = 0;

    /**
     * If the body speed exceeds this threshold, CCD (continuous collision detection) will be enabled. Set it to a negative number to disable CCD completely for this body.
     * @property ***REMOVED***number***REMOVED*** ccdSpeedThreshold
     * @default -1
     */
    this.ccdSpeedThreshold = options.ccdSpeedThreshold !== undefined ? options.ccdSpeedThreshold : -1;

    /**
     * The number of iterations that should be used when searching for the time of impact during CCD. A larger number will assure that there's a small penetration on CCD collision, but a small number will give more performance.
     * @property ***REMOVED***number***REMOVED*** ccdIterations
     * @default 10
     */
    this.ccdIterations = options.ccdIterations !== undefined ? options.ccdIterations : 10;

    this.concavePath = null;

    this._wakeUpAfterNarrowphase = false;

    this.updateMassProperties();
***REMOVED***
Body.prototype = new EventEmitter();
Body.prototype.constructor = Body;

Body._idCounter = 0;

/**
 * @private
 * @method updateSolveMassProperties
 */
Body.prototype.updateSolveMassProperties = function()***REMOVED***
    if(this.sleepState === Body.SLEEPING || this.type === Body.KINEMATIC)***REMOVED***
        this.invMassSolve = 0;
        this.invInertiaSolve = 0;
    ***REMOVED*** else ***REMOVED***
        this.invMassSolve = this.invMass;
        this.invInertiaSolve = this.invInertia;
    ***REMOVED***
***REMOVED***;

/**
 * Set the total density of the body
 * @method setDensity
 * @param ***REMOVED***number***REMOVED*** density
 */
Body.prototype.setDensity = function(density) ***REMOVED***
    var totalArea = this.getArea();
    this.mass = totalArea * density;
    this.updateMassProperties();
***REMOVED***;

/**
 * Get the total area of all shapes in the body
 * @method getArea
 * @return ***REMOVED***Number***REMOVED***
 */
Body.prototype.getArea = function() ***REMOVED***
    var totalArea = 0;
    for(var i=0; i<this.shapes.length; i++)***REMOVED***
        totalArea += this.shapes[i].area;
    ***REMOVED***
    return totalArea;
***REMOVED***;

/**
 * Get the AABB from the body. The AABB is updated if necessary.
 * @method getAABB
 * @return ***REMOVED***AABB***REMOVED*** The AABB instance (this.aabb)
 */
Body.prototype.getAABB = function()***REMOVED***
    if(this.aabbNeedsUpdate)***REMOVED***
        this.updateAABB();
    ***REMOVED***
    return this.aabb;
***REMOVED***;

var shapeAABB = new AABB(),
    tmp = vec2.create();

/**
 * Updates the AABB of the Body, and set .aabbNeedsUpdate = false.
 * @method updateAABB
 */
Body.prototype.updateAABB = function() ***REMOVED***
    var shapes = this.shapes,
        N = shapes.length,
        offset = tmp,
        bodyAngle = this.angle;

    for(var i=0; i!==N; i++)***REMOVED***
        var shape = shapes[i],
            angle = shape.angle + bodyAngle;

        // Get shape world offset
        vec2.rotate(offset, shape.position, bodyAngle);
        vec2.add(offset, offset, this.position);

        // Get shape AABB
        shape.computeAABB(shapeAABB, offset, angle);

        if(i===0)***REMOVED***
            this.aabb.copy(shapeAABB);
        ***REMOVED*** else ***REMOVED***
            this.aabb.extend(shapeAABB);
        ***REMOVED***
    ***REMOVED***

    this.aabbNeedsUpdate = false;
***REMOVED***;

/**
 * Update the bounding radius of the body (this.boundingRadius). Should be done if any of the shape dimensions or positions are changed.
 * @method updateBoundingRadius
 */
Body.prototype.updateBoundingRadius = function()***REMOVED***
    var shapes = this.shapes,
        N = shapes.length,
        radius = 0;

    for(var i=0; i!==N; i++)***REMOVED***
        var shape = shapes[i],
            offset = vec2.length(shape.position),
            r = shape.boundingRadius;
        if(offset + r > radius)***REMOVED***
            radius = offset + r;
        ***REMOVED***
    ***REMOVED***

    this.boundingRadius = radius;
***REMOVED***;

/**
 * Add a shape to the body. You can pass a local transform when adding a shape,
 * so that the shape gets an offset and angle relative to the body center of mass.
 * Will automatically update the mass properties and bounding radius.
 *
 * @method addShape
 * @param  ***REMOVED***Shape***REMOVED***              shape
 * @param  ***REMOVED***Array***REMOVED*** [offset] Local body offset of the shape.
 * @param  ***REMOVED***Number***REMOVED***             [angle]  Local body angle.
 *
 * @example
 *     var body = new Body(),
 *         shape = new Circle(***REMOVED*** radius: 1 ***REMOVED***);
 *
 *     // Add the shape to the body, positioned in the center
 *     body.addShape(shape);
 *
 *     // Add another shape to the body, positioned 1 unit length from the body center of mass along the local x-axis.
 *     body.addShape(shape,[1,0]);
 *
 *     // Add another shape to the body, positioned 1 unit length from the body center of mass along the local y-axis, and rotated 90 degrees CCW.
 *     body.addShape(shape,[0,1],Math.PI/2);
 */
Body.prototype.addShape = function(shape, offset, angle)***REMOVED***
    if(shape.body)***REMOVED***
        throw new Error('A shape can only be added to one body.');
    ***REMOVED***
    shape.body = this;

    // Copy the offset vector
    if(offset)***REMOVED***
        vec2.copy(shape.position, offset);
    ***REMOVED*** else ***REMOVED***
        vec2.set(shape.position, 0, 0);
    ***REMOVED***

    shape.angle = angle || 0;

    this.shapes.push(shape);
    this.updateMassProperties();
    this.updateBoundingRadius();

    this.aabbNeedsUpdate = true;
***REMOVED***;

/**
 * Remove a shape
 * @method removeShape
 * @param  ***REMOVED***Shape***REMOVED*** shape
 * @return ***REMOVED***Boolean***REMOVED*** True if the shape was found and removed, else false.
 */
Body.prototype.removeShape = function(shape)***REMOVED***
    var idx = this.shapes.indexOf(shape);

    if(idx !== -1)***REMOVED***
        this.shapes.splice(idx,1);
        this.aabbNeedsUpdate = true;
        shape.body = null;
        return true;
    ***REMOVED*** else ***REMOVED***
        return false;
    ***REMOVED***
***REMOVED***;

/**
 * Updates .inertia, .invMass, .invInertia for this Body. Should be called when
 * changing the structure or mass of the Body.
 *
 * @method updateMassProperties
 *
 * @example
 *     body.mass += 1;
 *     body.updateMassProperties();
 */
Body.prototype.updateMassProperties = function()***REMOVED***
    if(this.type === Body.STATIC || this.type === Body.KINEMATIC)***REMOVED***

        this.mass = Number.MAX_VALUE;
        this.invMass = 0;
        this.inertia = Number.MAX_VALUE;
        this.invInertia = 0;

    ***REMOVED*** else ***REMOVED***

        var shapes = this.shapes,
            N = shapes.length,
            m = this.mass / N,
            I = 0;

        if(!this.fixedRotation)***REMOVED***
            for(var i=0; i<N; i++)***REMOVED***
                var shape = shapes[i],
                    r2 = vec2.squaredLength(shape.position),
                    Icm = shape.computeMomentOfInertia(m);
                I += Icm + m*r2;
            ***REMOVED***
            this.inertia = I;
            this.invInertia = I>0 ? 1/I : 0;

        ***REMOVED*** else ***REMOVED***
            this.inertia = Number.MAX_VALUE;
            this.invInertia = 0;
        ***REMOVED***

        // Inverse mass properties are easy
        this.invMass = 1 / this.mass;

        vec2.set(
            this.massMultiplier,
            this.fixedX ? 0 : 1,
            this.fixedY ? 0 : 1
        );
    ***REMOVED***
***REMOVED***;

var Body_applyForce_r = vec2.create();

/**
 * Apply force to a point relative to the center of mass of the body. This could for example be a point on the RigidBody surface. Applying force this way will add to Body.force and Body.angularForce. If relativePoint is zero, the force will be applied directly on the center of mass, and the torque produced will be zero.
 * @method applyForce
 * @param ***REMOVED***Array***REMOVED*** force The force to add.
 * @param ***REMOVED***Array***REMOVED*** [relativePoint] A world point to apply the force on.
 */
Body.prototype.applyForce = function(force, relativePoint)***REMOVED***

    // Add linear force
    vec2.add(this.force, this.force, force);

    if(relativePoint)***REMOVED***

        // Compute produced rotational force
        var rotForce = vec2.crossLength(relativePoint,force);

        // Add rotational force
        this.angularForce += rotForce;
    ***REMOVED***
***REMOVED***;

/**
 * Apply force to a body-local point.
 * @method applyForceLocal
 * @param  ***REMOVED***Array***REMOVED*** localForce The force vector to add, oriented in local body space.
 * @param  ***REMOVED***Array***REMOVED*** localPoint A point relative to the body in world space. If not given, it is set to zero and all of the impulse will be excerted on the center of mass.
 */
var Body_applyForce_forceWorld = vec2.create();
var Body_applyForce_pointWorld = vec2.create();
var Body_applyForce_pointLocal = vec2.create();
Body.prototype.applyForceLocal = function(localForce, localPoint)***REMOVED***
    localPoint = localPoint || Body_applyForce_pointLocal;
    var worldForce = Body_applyForce_forceWorld;
    var worldPoint = Body_applyForce_pointWorld;
    this.vectorToWorldFrame(worldForce, localForce);
    this.vectorToWorldFrame(worldPoint, localPoint);
    this.applyForce(worldForce, worldPoint);
***REMOVED***;

/**
 * Apply impulse to a point relative to the body. This could for example be a point on the Body surface. An impulse is a force added to a body during a short period of time (impulse = force * time). Impulses will be added to Body.velocity and Body.angularVelocity.
 * @method applyImpulse
 * @param  ***REMOVED***Array***REMOVED*** impulse The impulse vector to add, oriented in world space.
 * @param  ***REMOVED***Array***REMOVED*** [relativePoint] A point relative to the body in world space. If not given, it is set to zero and all of the impulse will be excerted on the center of mass.
 */
var Body_applyImpulse_velo = vec2.create();
Body.prototype.applyImpulse = function(impulseVector, relativePoint)***REMOVED***
    if(this.type !== Body.DYNAMIC)***REMOVED***
        return;
    ***REMOVED***

    // Compute produced central impulse velocity
    var velo = Body_applyImpulse_velo;
    vec2.scale(velo, impulseVector, this.invMass);
    vec2.multiply(velo, this.massMultiplier, velo);

    // Add linear impulse
    vec2.add(this.velocity, velo, this.velocity);

    if(relativePoint)***REMOVED***
        // Compute produced rotational impulse velocity
        var rotVelo = vec2.crossLength(relativePoint, impulseVector);
        rotVelo *= this.invInertia;

        // Add rotational Impulse
        this.angularVelocity += rotVelo;
    ***REMOVED***
***REMOVED***;

/**
 * Apply impulse to a point relative to the body. This could for example be a point on the Body surface. An impulse is a force added to a body during a short period of time (impulse = force * time). Impulses will be added to Body.velocity and Body.angularVelocity.
 * @method applyImpulseLocal
 * @param  ***REMOVED***Array***REMOVED*** impulse The impulse vector to add, oriented in world space.
 * @param  ***REMOVED***Array***REMOVED*** [relativePoint] A point relative to the body in world space. If not given, it is set to zero and all of the impulse will be excerted on the center of mass.
 */
var Body_applyImpulse_impulseWorld = vec2.create();
var Body_applyImpulse_pointWorld = vec2.create();
var Body_applyImpulse_pointLocal = vec2.create();
Body.prototype.applyImpulseLocal = function(localImpulse, localPoint)***REMOVED***
    localPoint = localPoint || Body_applyImpulse_pointLocal;
    var worldImpulse = Body_applyImpulse_impulseWorld;
    var worldPoint = Body_applyImpulse_pointWorld;
    this.vectorToWorldFrame(worldImpulse, localImpulse);
    this.vectorToWorldFrame(worldPoint, localPoint);
    this.applyImpulse(worldImpulse, worldPoint);
***REMOVED***;

/**
 * Transform a world point to local body frame.
 * @method toLocalFrame
 * @param  ***REMOVED***Array***REMOVED*** out          The vector to store the result in
 * @param  ***REMOVED***Array***REMOVED*** worldPoint   The input world point
 */
Body.prototype.toLocalFrame = function(out, worldPoint)***REMOVED***
    vec2.toLocalFrame(out, worldPoint, this.position, this.angle);
***REMOVED***;

/**
 * Transform a local point to world frame.
 * @method toWorldFrame
 * @param  ***REMOVED***Array***REMOVED*** out          The vector to store the result in
 * @param  ***REMOVED***Array***REMOVED*** localPoint   The input local point
 */
Body.prototype.toWorldFrame = function(out, localPoint)***REMOVED***
    vec2.toGlobalFrame(out, localPoint, this.position, this.angle);
***REMOVED***;

/**
 * Transform a world point to local body frame.
 * @method vectorToLocalFrame
 * @param  ***REMOVED***Array***REMOVED*** out          The vector to store the result in
 * @param  ***REMOVED***Array***REMOVED*** worldVector  The input world vector
 */
Body.prototype.vectorToLocalFrame = function(out, worldVector)***REMOVED***
    vec2.vectorToLocalFrame(out, worldVector, this.angle);
***REMOVED***;

/**
 * Transform a local point to world frame.
 * @method vectorToWorldFrame
 * @param  ***REMOVED***Array***REMOVED*** out          The vector to store the result in
 * @param  ***REMOVED***Array***REMOVED*** localVector  The input local vector
 */
Body.prototype.vectorToWorldFrame = function(out, localVector)***REMOVED***
    vec2.vectorToGlobalFrame(out, localVector, this.angle);
***REMOVED***;

/**
 * Reads a polygon shape path, and assembles convex shapes from that and puts them at proper offset points.
 * @method fromPolygon
 * @param ***REMOVED***Array***REMOVED*** path An array of 2d vectors, e.g. [[0,0],[0,1],...] that resembles a concave or convex polygon. The shape must be simple and without holes.
 * @param ***REMOVED***Object***REMOVED*** [options]
 * @param ***REMOVED***Boolean***REMOVED*** [options.optimalDecomp=false]   Set to true if you need optimal decomposition. Warning: very slow for polygons with more than 10 vertices.
 * @param ***REMOVED***Boolean***REMOVED*** [options.skipSimpleCheck=false] Set to true if you already know that the path is not intersecting itself.
 * @param ***REMOVED***Boolean|Number***REMOVED*** [options.removeCollinearPoints=false] Set to a number (angle threshold value) to remove collinear points, or false to keep all points.
 * @return ***REMOVED***Boolean***REMOVED*** True on success, else false.
 */
Body.prototype.fromPolygon = function(path,options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    // Remove all shapes
    for(var i=this.shapes.length; i>=0; --i)***REMOVED***
        this.removeShape(this.shapes[i]);
    ***REMOVED***

    var p = new decomp.Polygon();
    p.vertices = path;

    // Make it counter-clockwise
    p.makeCCW();

    if(typeof(options.removeCollinearPoints) === "number")***REMOVED***
        p.removeCollinearPoints(options.removeCollinearPoints);
    ***REMOVED***

    // Check if any line segment intersects the path itself
    if(typeof(options.skipSimpleCheck) === "undefined")***REMOVED***
        if(!p.isSimple())***REMOVED***
            return false;
        ***REMOVED***
    ***REMOVED***

    // Save this path for later
    this.concavePath = p.vertices.slice(0);
    for(var i=0; i<this.concavePath.length; i++)***REMOVED***
        var v = [0,0];
        vec2.copy(v,this.concavePath[i]);
        this.concavePath[i] = v;
    ***REMOVED***

    // Slow or fast decomp?
    var convexes;
    if(options.optimalDecomp)***REMOVED***
        convexes = p.decomp();
    ***REMOVED*** else ***REMOVED***
        convexes = p.quickDecomp();
    ***REMOVED***

    var cm = vec2.create();

    // Add convexes
    for(var i=0; i!==convexes.length; i++)***REMOVED***
        // Create convex
        var c = new Convex(***REMOVED*** vertices: convexes[i].vertices ***REMOVED***);

        // Move all vertices so its center of mass is in the local center of the convex
        for(var j=0; j!==c.vertices.length; j++)***REMOVED***
            var v = c.vertices[j];
            vec2.sub(v,v,c.centerOfMass);
        ***REMOVED***

        vec2.scale(cm,c.centerOfMass,1);
        c.updateTriangles();
        c.updateCenterOfMass();
        c.updateBoundingRadius();

        // Add the shape
        this.addShape(c,cm);
    ***REMOVED***

    this.adjustCenterOfMass();

    this.aabbNeedsUpdate = true;

    return true;
***REMOVED***;

var adjustCenterOfMass_tmp1 = vec2.fromValues(0,0),
    adjustCenterOfMass_tmp2 = vec2.fromValues(0,0),
    adjustCenterOfMass_tmp3 = vec2.fromValues(0,0),
    adjustCenterOfMass_tmp4 = vec2.fromValues(0,0);

/**
 * Moves the shape offsets so their center of mass becomes the body center of mass.
 * @method adjustCenterOfMass
 */
Body.prototype.adjustCenterOfMass = function()***REMOVED***
    var offset_times_area = adjustCenterOfMass_tmp2,
        sum =               adjustCenterOfMass_tmp3,
        cm =                adjustCenterOfMass_tmp4,
        totalArea =         0;
    vec2.set(sum,0,0);

    for(var i=0; i!==this.shapes.length; i++)***REMOVED***
        var s = this.shapes[i];
        vec2.scale(offset_times_area, s.position, s.area);
        vec2.add(sum, sum, offset_times_area);
        totalArea += s.area;
    ***REMOVED***

    vec2.scale(cm,sum,1/totalArea);

    // Now move all shapes
    for(var i=0; i!==this.shapes.length; i++)***REMOVED***
        var s = this.shapes[i];
        vec2.sub(s.position, s.position, cm);
    ***REMOVED***

    // Move the body position too
    vec2.add(this.position,this.position,cm);

    // And concave path
    for(var i=0; this.concavePath && i<this.concavePath.length; i++)***REMOVED***
        vec2.sub(this.concavePath[i], this.concavePath[i], cm);
    ***REMOVED***

    this.updateMassProperties();
    this.updateBoundingRadius();
***REMOVED***;

/**
 * Sets the force on the body to zero.
 * @method setZeroForce
 */
Body.prototype.setZeroForce = function()***REMOVED***
    vec2.set(this.force,0.0,0.0);
    this.angularForce = 0.0;
***REMOVED***;

Body.prototype.resetConstraintVelocity = function()***REMOVED***
    var b = this,
        vlambda = b.vlambda;
    vec2.set(vlambda,0,0);
    b.wlambda = 0;
***REMOVED***;

Body.prototype.addConstraintVelocity = function()***REMOVED***
    var b = this,
        v = b.velocity;
    vec2.add( v, v, b.vlambda);
    b.angularVelocity += b.wlambda;
***REMOVED***;

/**
 * Apply damping, see <a href="http://code.google.com/p/bullet/issues/detail?id=74">this</a> for details.
 * @method applyDamping
 * @param  ***REMOVED***number***REMOVED*** dt Current time step
 */
Body.prototype.applyDamping = function(dt)***REMOVED***
    if(this.type === Body.DYNAMIC)***REMOVED*** // Only for dynamic bodies
        var v = this.velocity;
        vec2.scale(v, v, Math.pow(1.0 - this.damping,dt));
        this.angularVelocity *= Math.pow(1.0 - this.angularDamping,dt);
    ***REMOVED***
***REMOVED***;

/**
 * Wake the body up. Normally you should not need this, as the body is automatically awoken at events such as collisions.
 * Sets the sleepState to ***REMOVED******REMOVED***#crossLink "Body/AWAKE:property"***REMOVED******REMOVED***Body.AWAKE***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** and emits the wakeUp event if the body wasn't awake before.
 * @method wakeUp
 */
Body.prototype.wakeUp = function()***REMOVED***
    var s = this.sleepState;
    this.sleepState = Body.AWAKE;
    this.idleTime = 0;
    if(s !== Body.AWAKE)***REMOVED***
        this.emit(Body.wakeUpEvent);
    ***REMOVED***
***REMOVED***;

/**
 * Force body sleep
 * @method sleep
 */
Body.prototype.sleep = function()***REMOVED***
    this.sleepState = Body.SLEEPING;
    this.angularVelocity = 0;
    this.angularForce = 0;
    vec2.set(this.velocity,0,0);
    vec2.set(this.force,0,0);
    this.emit(Body.sleepEvent);
***REMOVED***;

/**
 * Called every timestep to update internal sleep timer and change sleep state if needed.
 * @method sleepTick
 * @param ***REMOVED***number***REMOVED*** time The world time in seconds
 * @param ***REMOVED***boolean***REMOVED*** dontSleep
 * @param ***REMOVED***number***REMOVED*** dt
 */
Body.prototype.sleepTick = function(time, dontSleep, dt)***REMOVED***
    if(!this.allowSleep || this.type === Body.SLEEPING)***REMOVED***
        return;
    ***REMOVED***

    this.wantsToSleep = false;

    var sleepState = this.sleepState,
        speedSquared = vec2.squaredLength(this.velocity) + Math.pow(this.angularVelocity,2),
        speedLimitSquared = Math.pow(this.sleepSpeedLimit,2);

    // Add to idle time
    if(speedSquared >= speedLimitSquared)***REMOVED***
        this.idleTime = 0;
        this.sleepState = Body.AWAKE;
    ***REMOVED*** else ***REMOVED***
        this.idleTime += dt;
        this.sleepState = Body.SLEEPY;
    ***REMOVED***
    if(this.idleTime > this.sleepTimeLimit)***REMOVED***
        if(!dontSleep)***REMOVED***
            this.sleep();
        ***REMOVED*** else ***REMOVED***
            this.wantsToSleep = true;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

/**
 * Check if the body is overlapping another body. Note that this method only works if the body was added to a World and if at least one step was taken.
 * @method overlaps
 * @param  ***REMOVED***Body***REMOVED*** body
 * @return ***REMOVED***boolean***REMOVED***
 */
Body.prototype.overlaps = function(body)***REMOVED***
    return this.world.overlapKeeper.bodiesAreOverlapping(this, body);
***REMOVED***;

var integrate_fhMinv = vec2.create();
var integrate_velodt = vec2.create();

/**
 * Move the body forward in time given its current velocity.
 * @method integrate
 * @param  ***REMOVED***Number***REMOVED*** dt
 */
Body.prototype.integrate = function(dt)***REMOVED***
    var minv = this.invMass,
        f = this.force,
        pos = this.position,
        velo = this.velocity;

    // Save old position
    vec2.copy(this.previousPosition, this.position);
    this.previousAngle = this.angle;

    // Velocity update
    if(!this.fixedRotation)***REMOVED***
        this.angularVelocity += this.angularForce * this.invInertia * dt;
    ***REMOVED***
    vec2.scale(integrate_fhMinv, f, dt * minv);
    vec2.multiply(integrate_fhMinv, this.massMultiplier, integrate_fhMinv);
    vec2.add(velo, integrate_fhMinv, velo);

    // CCD
    if(!this.integrateToTimeOfImpact(dt))***REMOVED***

        // Regular position update
        vec2.scale(integrate_velodt, velo, dt);
        vec2.add(pos, pos, integrate_velodt);
        if(!this.fixedRotation)***REMOVED***
            this.angle += this.angularVelocity * dt;
        ***REMOVED***
    ***REMOVED***

    this.aabbNeedsUpdate = true;
***REMOVED***;

var result = new RaycastResult();
var ray = new Ray(***REMOVED***
    mode: Ray.ALL
***REMOVED***);
var direction = vec2.create();
var end = vec2.create();
var startToEnd = vec2.create();
var rememberPosition = vec2.create();
Body.prototype.integrateToTimeOfImpact = function(dt)***REMOVED***

    if(this.ccdSpeedThreshold < 0 || vec2.squaredLength(this.velocity) < Math.pow(this.ccdSpeedThreshold, 2))***REMOVED***
        return false;
    ***REMOVED***

    vec2.normalize(direction, this.velocity);

    vec2.scale(end, this.velocity, dt);
    vec2.add(end, end, this.position);

    vec2.sub(startToEnd, end, this.position);
    var startToEndAngle = this.angularVelocity * dt;
    var len = vec2.length(startToEnd);

    var timeOfImpact = 1;

    var hit;
    var that = this;
    result.reset();
    ray.callback = function (result) ***REMOVED***
        if(result.body === that)***REMOVED***
            return;
        ***REMOVED***
        hit = result.body;
        result.getHitPoint(end, ray);
        vec2.sub(startToEnd, end, that.position);
        timeOfImpact = vec2.length(startToEnd) / len;
        result.stop();
    ***REMOVED***;
    vec2.copy(ray.from, this.position);
    vec2.copy(ray.to, end);
    ray.update();
    this.world.raycast(result, ray);

    if(!hit)***REMOVED***
        return false;
    ***REMOVED***

    var rememberAngle = this.angle;
    vec2.copy(rememberPosition, this.position);

    // Got a start and end point. Approximate time of impact using binary search
    var iter = 0;
    var tmin = 0;
    var tmid = 0;
    var tmax = timeOfImpact;
    while (tmax >= tmin && iter < this.ccdIterations) ***REMOVED***
        iter++;

        // calculate the midpoint
        tmid = (tmax - tmin) / 2;

        // Move the body to that point
        vec2.scale(integrate_velodt, startToEnd, timeOfImpact);
        vec2.add(this.position, rememberPosition, integrate_velodt);
        this.angle = rememberAngle + startToEndAngle * timeOfImpact;
        this.updateAABB();

        // check overlap
        var overlaps = this.aabb.overlaps(hit.aabb) && this.world.narrowphase.bodiesOverlap(this, hit);

        if (overlaps) ***REMOVED***
            // change min to search upper interval
            tmin = tmid;
        ***REMOVED*** else ***REMOVED***
            // change max to search lower interval
            tmax = tmid;
        ***REMOVED***
    ***REMOVED***

    timeOfImpact = tmid;

    vec2.copy(this.position, rememberPosition);
    this.angle = rememberAngle;

    // move to TOI
    vec2.scale(integrate_velodt, startToEnd, timeOfImpact);
    vec2.add(this.position, this.position, integrate_velodt);
    if(!this.fixedRotation)***REMOVED***
        this.angle += startToEndAngle * timeOfImpact;
    ***REMOVED***

    return true;
***REMOVED***;

/**
 * Get velocity of a point in the body.
 * @method getVelocityAtPoint
 * @param  ***REMOVED***Array***REMOVED*** result A vector to store the result in
 * @param  ***REMOVED***Array***REMOVED*** relativePoint A world oriented vector, indicating the position of the point to get the velocity from
 * @return ***REMOVED***Array***REMOVED*** The result vector
 */
Body.prototype.getVelocityAtPoint = function(result, relativePoint)***REMOVED***
    vec2.crossVZ(result, relativePoint, this.angularVelocity);
    vec2.subtract(result, this.velocity, result);
    return result;
***REMOVED***;

/**
 * @event sleepy
 */
Body.sleepyEvent = ***REMOVED***
    type: "sleepy"
***REMOVED***;

/**
 * @event sleep
 */
Body.sleepEvent = ***REMOVED***
    type: "sleep"
***REMOVED***;

/**
 * @event wakeup
 */
Body.wakeUpEvent = ***REMOVED***
    type: "wakeup"
***REMOVED***;

/**
 * Dynamic body.
 * @property DYNAMIC
 * @type ***REMOVED***Number***REMOVED***
 * @static
 */
Body.DYNAMIC = 1;

/**
 * Static body.
 * @property STATIC
 * @type ***REMOVED***Number***REMOVED***
 * @static
 */
Body.STATIC = 2;

/**
 * Kinematic body.
 * @property KINEMATIC
 * @type ***REMOVED***Number***REMOVED***
 * @static
 */
Body.KINEMATIC = 4;

/**
 * @property AWAKE
 * @type ***REMOVED***Number***REMOVED***
 * @static
 */
Body.AWAKE = 0;

/**
 * @property SLEEPY
 * @type ***REMOVED***Number***REMOVED***
 * @static
 */
Body.SLEEPY = 1;

/**
 * @property SLEEPING
 * @type ***REMOVED***Number***REMOVED***
 * @static
 */
Body.SLEEPING = 2;


***REMOVED***,***REMOVED***"../collision/AABB":7,"../collision/Ray":11,"../collision/RaycastResult":12,"../events/EventEmitter":26,"../math/vec2":30,"../shapes/Convex":40,"poly-decomp":5***REMOVED***],32:[function(_dereq_,module,exports)***REMOVED***
var vec2 = _dereq_('../math/vec2');
var Spring = _dereq_('./Spring');
var Utils = _dereq_('../utils/Utils');

module.exports = LinearSpring;

/**
 * A spring, connecting two bodies.
 *
 * The Spring explicitly adds force and angularForce to the bodies.
 *
 * @class LinearSpring
 * @extends Spring
 * @constructor
 * @param ***REMOVED***Body***REMOVED*** bodyA
 * @param ***REMOVED***Body***REMOVED*** bodyB
 * @param ***REMOVED***Object***REMOVED*** [options]
 * @param ***REMOVED***number***REMOVED*** [options.restLength]   A number > 0. Default is the current distance between the world anchor points.
 * @param ***REMOVED***number***REMOVED*** [options.stiffness=100]  Spring constant (see Hookes Law). A number >= 0.
 * @param ***REMOVED***number***REMOVED*** [options.damping=1]      A number >= 0. Default: 1
 * @param ***REMOVED***Array***REMOVED***  [options.worldAnchorA]   Where to hook the spring to body A, in world coordinates. Overrides the option "localAnchorA" if given.
 * @param ***REMOVED***Array***REMOVED***  [options.worldAnchorB]
 * @param ***REMOVED***Array***REMOVED***  [options.localAnchorA]   Where to hook the spring to body A, in local body coordinates. Defaults to the body center.
 * @param ***REMOVED***Array***REMOVED***  [options.localAnchorB]
 */
function LinearSpring(bodyA,bodyB,options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    Spring.call(this, bodyA, bodyB, options);

    /**
     * Anchor for bodyA in local bodyA coordinates.
     * @property localAnchorA
     * @type ***REMOVED***Array***REMOVED***
     */
    this.localAnchorA = vec2.fromValues(0,0);

    /**
     * Anchor for bodyB in local bodyB coordinates.
     * @property localAnchorB
     * @type ***REMOVED***Array***REMOVED***
     */
    this.localAnchorB = vec2.fromValues(0,0);

    if(options.localAnchorA)***REMOVED*** vec2.copy(this.localAnchorA, options.localAnchorA); ***REMOVED***
    if(options.localAnchorB)***REMOVED*** vec2.copy(this.localAnchorB, options.localAnchorB); ***REMOVED***
    if(options.worldAnchorA)***REMOVED*** this.setWorldAnchorA(options.worldAnchorA); ***REMOVED***
    if(options.worldAnchorB)***REMOVED*** this.setWorldAnchorB(options.worldAnchorB); ***REMOVED***

    var worldAnchorA = vec2.create();
    var worldAnchorB = vec2.create();
    this.getWorldAnchorA(worldAnchorA);
    this.getWorldAnchorB(worldAnchorB);
    var worldDistance = vec2.distance(worldAnchorA, worldAnchorB);

    /**
     * Rest length of the spring.
     * @property restLength
     * @type ***REMOVED***number***REMOVED***
     */
    this.restLength = typeof(options.restLength) === "number" ? options.restLength : worldDistance;
***REMOVED***
LinearSpring.prototype = new Spring();
LinearSpring.prototype.constructor = LinearSpring;

/**
 * Set the anchor point on body A, using world coordinates.
 * @method setWorldAnchorA
 * @param ***REMOVED***Array***REMOVED*** worldAnchorA
 */
LinearSpring.prototype.setWorldAnchorA = function(worldAnchorA)***REMOVED***
    this.bodyA.toLocalFrame(this.localAnchorA, worldAnchorA);
***REMOVED***;

/**
 * Set the anchor point on body B, using world coordinates.
 * @method setWorldAnchorB
 * @param ***REMOVED***Array***REMOVED*** worldAnchorB
 */
LinearSpring.prototype.setWorldAnchorB = function(worldAnchorB)***REMOVED***
    this.bodyB.toLocalFrame(this.localAnchorB, worldAnchorB);
***REMOVED***;

/**
 * Get the anchor point on body A, in world coordinates.
 * @method getWorldAnchorA
 * @param ***REMOVED***Array***REMOVED*** result The vector to store the result in.
 */
LinearSpring.prototype.getWorldAnchorA = function(result)***REMOVED***
    this.bodyA.toWorldFrame(result, this.localAnchorA);
***REMOVED***;

/**
 * Get the anchor point on body B, in world coordinates.
 * @method getWorldAnchorB
 * @param ***REMOVED***Array***REMOVED*** result The vector to store the result in.
 */
LinearSpring.prototype.getWorldAnchorB = function(result)***REMOVED***
    this.bodyB.toWorldFrame(result, this.localAnchorB);
***REMOVED***;

var applyForce_r =              vec2.create(),
    applyForce_r_unit =         vec2.create(),
    applyForce_u =              vec2.create(),
    applyForce_f =              vec2.create(),
    applyForce_worldAnchorA =   vec2.create(),
    applyForce_worldAnchorB =   vec2.create(),
    applyForce_ri =             vec2.create(),
    applyForce_rj =             vec2.create(),
    applyForce_tmp =            vec2.create();

/**
 * Apply the spring force to the connected bodies.
 * @method applyForce
 */
LinearSpring.prototype.applyForce = function()***REMOVED***
    var k = this.stiffness,
        d = this.damping,
        l = this.restLength,
        bodyA = this.bodyA,
        bodyB = this.bodyB,
        r = applyForce_r,
        r_unit = applyForce_r_unit,
        u = applyForce_u,
        f = applyForce_f,
        tmp = applyForce_tmp;

    var worldAnchorA = applyForce_worldAnchorA,
        worldAnchorB = applyForce_worldAnchorB,
        ri = applyForce_ri,
        rj = applyForce_rj;

    // Get world anchors
    this.getWorldAnchorA(worldAnchorA);
    this.getWorldAnchorB(worldAnchorB);

    // Get offset points
    vec2.sub(ri, worldAnchorA, bodyA.position);
    vec2.sub(rj, worldAnchorB, bodyB.position);

    // Compute distance vector between world anchor points
    vec2.sub(r, worldAnchorB, worldAnchorA);
    var rlen = vec2.len(r);
    vec2.normalize(r_unit,r);

    //console.log(rlen)
    //console.log("A",vec2.str(worldAnchorA),"B",vec2.str(worldAnchorB))

    // Compute relative velocity of the anchor points, u
    vec2.sub(u, bodyB.velocity, bodyA.velocity);
    vec2.crossZV(tmp, bodyB.angularVelocity, rj);
    vec2.add(u, u, tmp);
    vec2.crossZV(tmp, bodyA.angularVelocity, ri);
    vec2.sub(u, u, tmp);

    // F = - k * ( x - L ) - D * ( u )
    vec2.scale(f, r_unit, -k*(rlen-l) - d*vec2.dot(u,r_unit));

    // Add forces to bodies
    vec2.sub( bodyA.force, bodyA.force, f);
    vec2.add( bodyB.force, bodyB.force, f);

    // Angular force
    var ri_x_f = vec2.crossLength(ri, f);
    var rj_x_f = vec2.crossLength(rj, f);
    bodyA.angularForce -= ri_x_f;
    bodyB.angularForce += rj_x_f;
***REMOVED***;

***REMOVED***,***REMOVED***"../math/vec2":30,"../utils/Utils":57,"./Spring":34***REMOVED***],33:[function(_dereq_,module,exports)***REMOVED***
var vec2 = _dereq_('../math/vec2');
var Spring = _dereq_('./Spring');

module.exports = RotationalSpring;

/**
 * A rotational spring, connecting two bodies rotation. This spring explicitly adds angularForce (torque) to the bodies.
 *
 * The spring can be combined with a ***REMOVED******REMOVED***#crossLink "RevoluteConstraint"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** to make, for example, a mouse trap.
 *
 * @class RotationalSpring
 * @extends Spring
 * @constructor
 * @param ***REMOVED***Body***REMOVED*** bodyA
 * @param ***REMOVED***Body***REMOVED*** bodyB
 * @param ***REMOVED***Object***REMOVED*** [options]
 * @param ***REMOVED***number***REMOVED*** [options.restAngle] The relative angle of bodies at which the spring is at rest. If not given, it's set to the current relative angle between the bodies.
 * @param ***REMOVED***number***REMOVED*** [options.stiffness=100] Spring constant (see Hookes Law). A number >= 0.
 * @param ***REMOVED***number***REMOVED*** [options.damping=1] A number >= 0.
 */
function RotationalSpring(bodyA, bodyB, options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    Spring.call(this, bodyA, bodyB, options);

    /**
     * Rest angle of the spring.
     * @property restAngle
     * @type ***REMOVED***number***REMOVED***
     */
    this.restAngle = typeof(options.restAngle) === "number" ? options.restAngle : bodyB.angle - bodyA.angle;
***REMOVED***
RotationalSpring.prototype = new Spring();
RotationalSpring.prototype.constructor = RotationalSpring;

/**
 * Apply the spring force to the connected bodies.
 * @method applyForce
 */
RotationalSpring.prototype.applyForce = function()***REMOVED***
    var k = this.stiffness,
        d = this.damping,
        l = this.restAngle,
        bodyA = this.bodyA,
        bodyB = this.bodyB,
        x = bodyB.angle - bodyA.angle,
        u = bodyB.angularVelocity - bodyA.angularVelocity;

    var torque = - k * (x - l) - d * u * 0;

    bodyA.angularForce -= torque;
    bodyB.angularForce += torque;
***REMOVED***;

***REMOVED***,***REMOVED***"../math/vec2":30,"./Spring":34***REMOVED***],34:[function(_dereq_,module,exports)***REMOVED***
var vec2 = _dereq_('../math/vec2');
var Utils = _dereq_('../utils/Utils');

module.exports = Spring;

/**
 * A spring, connecting two bodies. The Spring explicitly adds force and angularForce to the bodies and does therefore not put load on the constraint solver.
 *
 * @class Spring
 * @constructor
 * @param ***REMOVED***Body***REMOVED*** bodyA
 * @param ***REMOVED***Body***REMOVED*** bodyB
 * @param ***REMOVED***Object***REMOVED*** [options]
 * @param ***REMOVED***number***REMOVED*** [options.stiffness=100]  Spring constant (see Hookes Law). A number >= 0.
 * @param ***REMOVED***number***REMOVED*** [options.damping=1]      A number >= 0. Default: 1
 * @param ***REMOVED***Array***REMOVED***  [options.localAnchorA]   Where to hook the spring to body A, in local body coordinates. Defaults to the body center.
 * @param ***REMOVED***Array***REMOVED***  [options.localAnchorB]
 * @param ***REMOVED***Array***REMOVED***  [options.worldAnchorA]   Where to hook the spring to body A, in world coordinates. Overrides the option "localAnchorA" if given.
 * @param ***REMOVED***Array***REMOVED***  [options.worldAnchorB]
 */
function Spring(bodyA, bodyB, options)***REMOVED***
    options = Utils.defaults(options,***REMOVED***
        stiffness: 100,
        damping: 1,
    ***REMOVED***);

    /**
     * Stiffness of the spring.
     * @property stiffness
     * @type ***REMOVED***number***REMOVED***
     */
    this.stiffness = options.stiffness;

    /**
     * Damping of the spring.
     * @property damping
     * @type ***REMOVED***number***REMOVED***
     */
    this.damping = options.damping;

    /**
     * First connected body.
     * @property bodyA
     * @type ***REMOVED***Body***REMOVED***
     */
    this.bodyA = bodyA;

    /**
     * Second connected body.
     * @property bodyB
     * @type ***REMOVED***Body***REMOVED***
     */
    this.bodyB = bodyB;
***REMOVED***

/**
 * Apply the spring force to the connected bodies.
 * @method applyForce
 */
Spring.prototype.applyForce = function()***REMOVED***
    // To be implemented by subclasses
***REMOVED***;

***REMOVED***,***REMOVED***"../math/vec2":30,"../utils/Utils":57***REMOVED***],35:[function(_dereq_,module,exports)***REMOVED***
var vec2 = _dereq_('../math/vec2');
var Utils = _dereq_('../utils/Utils');
var Constraint = _dereq_('../constraints/Constraint');
var FrictionEquation = _dereq_('../equations/FrictionEquation');
var Body = _dereq_('../objects/Body');

module.exports = TopDownVehicle;

/**
 * @class TopDownVehicle
 * @constructor
 * @param ***REMOVED***Body***REMOVED*** chassisBody A dynamic body, already added to the world.
 * @param ***REMOVED***Object***REMOVED*** [options]
 *
 * @example
 *
 *     // Create a dynamic body for the chassis
 *     var chassisBody = new Body(***REMOVED***
 *         mass: 1
 *     ***REMOVED***);
 *     var boxShape = new Box(***REMOVED*** width: 0.5, height: 1 ***REMOVED***);
 *     chassisBody.addShape(boxShape);
 *     world.addBody(chassisBody);
 *
 *     // Create the vehicle
 *     var vehicle = new TopDownVehicle(chassisBody);
 *
 *     // Add one front wheel and one back wheel - we don't actually need four :)
 *     var frontWheel = vehicle.addWheel(***REMOVED***
 *         localPosition: [0, 0.5] // front
 *     ***REMOVED***);
 *     frontWheel.setSideFriction(4);
 *
 *     // Back wheel
 *     var backWheel = vehicle.addWheel(***REMOVED***
 *         localPosition: [0, -0.5] // back
 *     ***REMOVED***);
 *     backWheel.setSideFriction(3); // Less side friction on back wheel makes it easier to drift
 *     vehicle.addToWorld(world);
 *
 *     // Steer value zero means straight forward. Positive is left and negative right.
 *     frontWheel.steerValue = Math.PI / 16;
 *
 *     // Engine force forward
 *     backWheel.engineForce = 10;
 *     backWheel.setBrakeForce(0);
 */
function TopDownVehicle(chassisBody, options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    /**
     * @property ***REMOVED***Body***REMOVED*** chassisBody
     */
    this.chassisBody = chassisBody;

    /**
     * @property ***REMOVED***Array***REMOVED*** wheels
     */
    this.wheels = [];

    // A dummy body to constrain the chassis to
    this.groundBody = new Body(***REMOVED*** mass: 0 ***REMOVED***);

    this.world = null;

    var that = this;
    this.preStepCallback = function()***REMOVED***
        that.update();
    ***REMOVED***;
***REMOVED***

/**
 * @method addToWorld
 * @param ***REMOVED***World***REMOVED*** world
 */
TopDownVehicle.prototype.addToWorld = function(world)***REMOVED***
    this.world = world;
    world.addBody(this.groundBody);
    world.on('preStep', this.preStepCallback);
    for (var i = 0; i < this.wheels.length; i++) ***REMOVED***
        var wheel = this.wheels[i];
        world.addConstraint(wheel);
    ***REMOVED***
***REMOVED***;

/**
 * @method removeFromWorld
 * @param ***REMOVED***World***REMOVED*** world
 */
TopDownVehicle.prototype.removeFromWorld = function()***REMOVED***
    var world = this.world;
    world.removeBody(this.groundBody);
    world.off('preStep', this.preStepCallback);
    for (var i = 0; i < this.wheels.length; i++) ***REMOVED***
        var wheel = this.wheels[i];
        world.removeConstraint(wheel);
    ***REMOVED***
    this.world = null;
***REMOVED***;

/**
 * @method addWheel
 * @param ***REMOVED***object***REMOVED*** [wheelOptions]
 * @return ***REMOVED***WheelConstraint***REMOVED***
 */
TopDownVehicle.prototype.addWheel = function(wheelOptions)***REMOVED***
    var wheel = new WheelConstraint(this,wheelOptions);
    this.wheels.push(wheel);
    return wheel;
***REMOVED***;

/**
 * @method update
 */
TopDownVehicle.prototype.update = function()***REMOVED***
    for (var i = 0; i < this.wheels.length; i++) ***REMOVED***
        this.wheels[i].update();
    ***REMOVED***
***REMOVED***;

/**
 * @class WheelConstraint
 * @constructor
 * @extends ***REMOVED***Constraint***REMOVED***
 * @param ***REMOVED***Vehicle***REMOVED*** vehicle
 * @param ***REMOVED***object***REMOVED*** [options]
 * @param ***REMOVED***Array***REMOVED*** [options.localForwardVector]The local wheel forward vector in local body space. Default is zero.
 * @param ***REMOVED***Array***REMOVED*** [options.localPosition] The local position of the wheen in the chassis body. Default is zero - the center of the body.
 * @param ***REMOVED***Array***REMOVED*** [options.sideFriction=5] The max friction force in the sideways direction.
 */
function WheelConstraint(vehicle, options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    this.vehicle = vehicle;

    this.forwardEquation = new FrictionEquation(vehicle.chassisBody, vehicle.groundBody);

    this.sideEquation = new FrictionEquation(vehicle.chassisBody, vehicle.groundBody);

    /**
     * @property ***REMOVED***number***REMOVED*** steerValue
     */
    this.steerValue = 0;

    /**
     * @property ***REMOVED***number***REMOVED*** engineForce
     */
    this.engineForce = 0;

    this.setSideFriction(options.sideFriction !== undefined ? options.sideFriction : 5);

    /**
     * @property ***REMOVED***Array***REMOVED*** localForwardVector
     */
    this.localForwardVector = vec2.fromValues(0, 1);
    if(options.localForwardVector)***REMOVED***
        vec2.copy(this.localForwardVector, options.localForwardVector);
    ***REMOVED***

    /**
     * @property ***REMOVED***Array***REMOVED*** localPosition
     */
    this.localPosition = vec2.fromValues(0, 0);
    if(options.localPosition)***REMOVED***
        vec2.copy(this.localPosition, options.localPosition);
    ***REMOVED***

    Constraint.apply(this, vehicle.chassisBody, vehicle.groundBody);

    this.equations.push(
        this.forwardEquation,
        this.sideEquation
    );

    this.setBrakeForce(0);
***REMOVED***
WheelConstraint.prototype = new Constraint();

/**
 * @method setForwardFriction
 */
WheelConstraint.prototype.setBrakeForce = function(force)***REMOVED***
    this.forwardEquation.setSlipForce(force);
***REMOVED***;

/**
 * @method setSideFriction
 */
WheelConstraint.prototype.setSideFriction = function(force)***REMOVED***
    this.sideEquation.setSlipForce(force);
***REMOVED***;

var worldVelocity = vec2.create();
var relativePoint = vec2.create();

/**
 * @method getSpeed
 */
WheelConstraint.prototype.getSpeed = function()***REMOVED***
    this.vehicle.chassisBody.vectorToWorldFrame(relativePoint, this.localForwardVector);
    this.vehicle.chassisBody.getVelocityAtPoint(worldVelocity, relativePoint);
    return vec2.dot(worldVelocity, relativePoint);
***REMOVED***;

var tmpVec = vec2.create();

/**
 * @method update
 */
WheelConstraint.prototype.update = function()***REMOVED***

    // Directional
    this.vehicle.chassisBody.vectorToWorldFrame(this.forwardEquation.t, this.localForwardVector);
    vec2.rotate(this.sideEquation.t, this.localForwardVector, Math.PI / 2);
    this.vehicle.chassisBody.vectorToWorldFrame(this.sideEquation.t, this.sideEquation.t);

    vec2.rotate(this.forwardEquation.t, this.forwardEquation.t, this.steerValue);
    vec2.rotate(this.sideEquation.t, this.sideEquation.t, this.steerValue);

    // Attachment point
    this.vehicle.chassisBody.toWorldFrame(this.forwardEquation.contactPointB, this.localPosition);
    vec2.copy(this.sideEquation.contactPointB, this.forwardEquation.contactPointB);

    this.vehicle.chassisBody.vectorToWorldFrame(this.forwardEquation.contactPointA, this.localPosition);
    vec2.copy(this.sideEquation.contactPointA, this.forwardEquation.contactPointA);

    // Add engine force
    vec2.normalize(tmpVec, this.forwardEquation.t);
    vec2.scale(tmpVec, tmpVec, this.engineForce);

    this.vehicle.chassisBody.applyForce(tmpVec, this.forwardEquation.contactPointA);
***REMOVED***;
***REMOVED***,***REMOVED***"../constraints/Constraint":14,"../equations/FrictionEquation":23,"../math/vec2":30,"../objects/Body":31,"../utils/Utils":57***REMOVED***],36:[function(_dereq_,module,exports)***REMOVED***
// Export p2 classes
var p2 = module.exports = ***REMOVED***
    AABB :                          _dereq_('./collision/AABB'),
    AngleLockEquation :             _dereq_('./equations/AngleLockEquation'),
    Body :                          _dereq_('./objects/Body'),
    Broadphase :                    _dereq_('./collision/Broadphase'),
    Capsule :                       _dereq_('./shapes/Capsule'),
    Circle :                        _dereq_('./shapes/Circle'),
    Constraint :                    _dereq_('./constraints/Constraint'),
    ContactEquation :               _dereq_('./equations/ContactEquation'),
    ContactEquationPool :           _dereq_('./utils/ContactEquationPool'),
    ContactMaterial :               _dereq_('./material/ContactMaterial'),
    Convex :                        _dereq_('./shapes/Convex'),
    DistanceConstraint :            _dereq_('./constraints/DistanceConstraint'),
    Equation :                      _dereq_('./equations/Equation'),
    EventEmitter :                  _dereq_('./events/EventEmitter'),
    FrictionEquation :              _dereq_('./equations/FrictionEquation'),
    FrictionEquationPool :          _dereq_('./utils/FrictionEquationPool'),
    GearConstraint :                _dereq_('./constraints/GearConstraint'),
    GSSolver :                      _dereq_('./solver/GSSolver'),
    Heightfield :                   _dereq_('./shapes/Heightfield'),
    Line :                          _dereq_('./shapes/Line'),
    LockConstraint :                _dereq_('./constraints/LockConstraint'),
    Material :                      _dereq_('./material/Material'),
    Narrowphase :                   _dereq_('./collision/Narrowphase'),
    NaiveBroadphase :               _dereq_('./collision/NaiveBroadphase'),
    Particle :                      _dereq_('./shapes/Particle'),
    Plane :                         _dereq_('./shapes/Plane'),
    Pool :                          _dereq_('./utils/Pool'),
    RevoluteConstraint :            _dereq_('./constraints/RevoluteConstraint'),
    PrismaticConstraint :           _dereq_('./constraints/PrismaticConstraint'),
    Ray :                           _dereq_('./collision/Ray'),
    RaycastResult :                 _dereq_('./collision/RaycastResult'),
    Box :                           _dereq_('./shapes/Box'),
    RotationalVelocityEquation :    _dereq_('./equations/RotationalVelocityEquation'),
    SAPBroadphase :                 _dereq_('./collision/SAPBroadphase'),
    Shape :                         _dereq_('./shapes/Shape'),
    Solver :                        _dereq_('./solver/Solver'),
    Spring :                        _dereq_('./objects/Spring'),
    TopDownVehicle :                _dereq_('./objects/TopDownVehicle'),
    LinearSpring :                  _dereq_('./objects/LinearSpring'),
    RotationalSpring :              _dereq_('./objects/RotationalSpring'),
    Utils :                         _dereq_('./utils/Utils'),
    World :                         _dereq_('./world/World'),
    vec2 :                          _dereq_('./math/vec2'),
    version :                       _dereq_('../package.json').version,
***REMOVED***;

Object.defineProperty(p2, 'Rectangle', ***REMOVED***
    get: function() ***REMOVED***
        console.warn('The Rectangle class has been renamed to Box.');
        return this.Box;
    ***REMOVED***
***REMOVED***);
***REMOVED***,***REMOVED***"../package.json":6,"./collision/AABB":7,"./collision/Broadphase":8,"./collision/NaiveBroadphase":9,"./collision/Narrowphase":10,"./collision/Ray":11,"./collision/RaycastResult":12,"./collision/SAPBroadphase":13,"./constraints/Constraint":14,"./constraints/DistanceConstraint":15,"./constraints/GearConstraint":16,"./constraints/LockConstraint":17,"./constraints/PrismaticConstraint":18,"./constraints/RevoluteConstraint":19,"./equations/AngleLockEquation":20,"./equations/ContactEquation":21,"./equations/Equation":22,"./equations/FrictionEquation":23,"./equations/RotationalVelocityEquation":25,"./events/EventEmitter":26,"./material/ContactMaterial":27,"./material/Material":28,"./math/vec2":30,"./objects/Body":31,"./objects/LinearSpring":32,"./objects/RotationalSpring":33,"./objects/Spring":34,"./objects/TopDownVehicle":35,"./shapes/Box":37,"./shapes/Capsule":38,"./shapes/Circle":39,"./shapes/Convex":40,"./shapes/Heightfield":41,"./shapes/Line":42,"./shapes/Particle":43,"./shapes/Plane":44,"./shapes/Shape":45,"./solver/GSSolver":46,"./solver/Solver":47,"./utils/ContactEquationPool":48,"./utils/FrictionEquationPool":49,"./utils/Pool":55,"./utils/Utils":57,"./world/World":61***REMOVED***],37:[function(_dereq_,module,exports)***REMOVED***
var vec2 = _dereq_('../math/vec2')
,   Shape = _dereq_('./Shape')
,   Convex = _dereq_('./Convex');

module.exports = Box;

/**
 * Box shape class.
 * @class Box
 * @constructor
 * @param ***REMOVED***object***REMOVED*** [options] (Note that this options object will be passed on to the ***REMOVED******REMOVED***#crossLink "Shape"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** constructor.)
 * @param ***REMOVED***Number***REMOVED*** [options.width=1] Total width of the box
 * @param ***REMOVED***Number***REMOVED*** [options.height=1] Total height of the box
 * @extends Convex
 */
function Box(options)***REMOVED***
    if(typeof(arguments[0]) === 'number' && typeof(arguments[1]) === 'number')***REMOVED***
        options = ***REMOVED***
            width: arguments[0],
            height: arguments[1]
        ***REMOVED***;
        console.warn('The Rectangle has been renamed to Box and its constructor signature has changed. Please use the following format: new Box(***REMOVED*** width: 1, height: 1, ... ***REMOVED***)');
    ***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    /**
     * Total width of the box
     * @property width
     * @type ***REMOVED***Number***REMOVED***
     */
    var width = this.width = options.width || 1;

    /**
     * Total height of the box
     * @property height
     * @type ***REMOVED***Number***REMOVED***
     */
    var height = this.height = options.height || 1;

    var verts = [
        vec2.fromValues(-width/2, -height/2),
        vec2.fromValues( width/2, -height/2),
        vec2.fromValues( width/2,  height/2),
        vec2.fromValues(-width/2,  height/2)
    ];
    var axes = [
        vec2.fromValues(1, 0),
        vec2.fromValues(0, 1)
    ];

    options.vertices = verts;
    options.axes = axes;
    options.type = Shape.BOX;
    Convex.call(this, options);
***REMOVED***
Box.prototype = new Convex();
Box.prototype.constructor = Box;

/**
 * Compute moment of inertia
 * @method computeMomentOfInertia
 * @param  ***REMOVED***Number***REMOVED*** mass
 * @return ***REMOVED***Number***REMOVED***
 */
Box.prototype.computeMomentOfInertia = function(mass)***REMOVED***
    var w = this.width,
        h = this.height;
    return mass * (h*h + w*w) / 12;
***REMOVED***;

/**
 * Update the bounding radius
 * @method updateBoundingRadius
 */
Box.prototype.updateBoundingRadius = function()***REMOVED***
    var w = this.width,
        h = this.height;
    this.boundingRadius = Math.sqrt(w*w + h*h) / 2;
***REMOVED***;

var corner1 = vec2.create(),
    corner2 = vec2.create(),
    corner3 = vec2.create(),
    corner4 = vec2.create();

/**
 * @method computeAABB
 * @param  ***REMOVED***AABB***REMOVED***   out      The resulting AABB.
 * @param  ***REMOVED***Array***REMOVED***  position
 * @param  ***REMOVED***Number***REMOVED*** angle
 */
Box.prototype.computeAABB = function(out, position, angle)***REMOVED***
    out.setFromPoints(this.vertices,position,angle,0);
***REMOVED***;

Box.prototype.updateArea = function()***REMOVED***
    this.area = this.width * this.height;
***REMOVED***;


***REMOVED***,***REMOVED***"../math/vec2":30,"./Convex":40,"./Shape":45***REMOVED***],38:[function(_dereq_,module,exports)***REMOVED***
var Shape = _dereq_('./Shape')
,   vec2 = _dereq_('../math/vec2');

module.exports = Capsule;

/**
 * Capsule shape class.
 * @class Capsule
 * @constructor
 * @extends Shape
 * @param ***REMOVED***object***REMOVED*** [options] (Note that this options object will be passed on to the ***REMOVED******REMOVED***#crossLink "Shape"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** constructor.)
 * @param ***REMOVED***Number***REMOVED*** [options.length=1] The distance between the end points
 * @param ***REMOVED***Number***REMOVED*** [options.radius=1] Radius of the capsule
 * @example
 *     var capsuleShape = new Capsule(***REMOVED***
 *         length: 1,
 *         radius: 2
 *     ***REMOVED***);
 *     body.addShape(capsuleShape);
 */
function Capsule(options)***REMOVED***
    if(typeof(arguments[0]) === 'number' && typeof(arguments[1]) === 'number')***REMOVED***
        options = ***REMOVED***
            length: arguments[0],
            radius: arguments[1]
        ***REMOVED***;
        console.warn('The Capsule constructor signature has changed. Please use the following format: new Capsule(***REMOVED*** radius: 1, length: 1 ***REMOVED***)');
    ***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    /**
     * The distance between the end points.
     * @property ***REMOVED***Number***REMOVED*** length
     */
    this.length = options.length || 1;

    /**
     * The radius of the capsule.
     * @property ***REMOVED***Number***REMOVED*** radius
     */
    this.radius = options.radius || 1;

    options.type = Shape.CAPSULE;
    Shape.call(this, options);
***REMOVED***
Capsule.prototype = new Shape();
Capsule.prototype.constructor = Capsule;

/**
 * Compute the mass moment of inertia of the Capsule.
 * @method conputeMomentOfInertia
 * @param  ***REMOVED***Number***REMOVED*** mass
 * @return ***REMOVED***Number***REMOVED***
 * @todo
 */
Capsule.prototype.computeMomentOfInertia = function(mass)***REMOVED***
    // Approximate with rectangle
    var r = this.radius,
        w = this.length + r, // 2*r is too much, 0 is too little
        h = r*2;
    return mass * (h*h + w*w) / 12;
***REMOVED***;

/**
 * @method updateBoundingRadius
 */
Capsule.prototype.updateBoundingRadius = function()***REMOVED***
    this.boundingRadius = this.radius + this.length/2;
***REMOVED***;

/**
 * @method updateArea
 */
Capsule.prototype.updateArea = function()***REMOVED***
    this.area = Math.PI * this.radius * this.radius + this.radius * 2 * this.length;
***REMOVED***;

var r = vec2.create();

/**
 * @method computeAABB
 * @param  ***REMOVED***AABB***REMOVED***   out      The resulting AABB.
 * @param  ***REMOVED***Array***REMOVED***  position
 * @param  ***REMOVED***Number***REMOVED*** angle
 */
Capsule.prototype.computeAABB = function(out, position, angle)***REMOVED***
    var radius = this.radius;

    // Compute center position of one of the the circles, world oriented, but with local offset
    vec2.set(r,this.length / 2,0);
    if(angle !== 0)***REMOVED***
        vec2.rotate(r,r,angle);
    ***REMOVED***

    // Get bounds
    vec2.set(out.upperBound,  Math.max(r[0]+radius, -r[0]+radius),
                              Math.max(r[1]+radius, -r[1]+radius));
    vec2.set(out.lowerBound,  Math.min(r[0]-radius, -r[0]-radius),
                              Math.min(r[1]-radius, -r[1]-radius));

    // Add offset
    vec2.add(out.lowerBound, out.lowerBound, position);
    vec2.add(out.upperBound, out.upperBound, position);
***REMOVED***;

var intersectCapsule_hitPointWorld = vec2.create();
var intersectCapsule_normal = vec2.create();
var intersectCapsule_l0 = vec2.create();
var intersectCapsule_l1 = vec2.create();
var intersectCapsule_unit_y = vec2.fromValues(0,1);

/**
 * @method raycast
 * @param  ***REMOVED***RaycastResult***REMOVED*** result
 * @param  ***REMOVED***Ray***REMOVED*** ray
 * @param  ***REMOVED***array***REMOVED*** position
 * @param  ***REMOVED***number***REMOVED*** angle
 */
Capsule.prototype.raycast = function(result, ray, position, angle)***REMOVED***
    var from = ray.from;
    var to = ray.to;
    var direction = ray.direction;

    var hitPointWorld = intersectCapsule_hitPointWorld;
    var normal = intersectCapsule_normal;
    var l0 = intersectCapsule_l0;
    var l1 = intersectCapsule_l1;

    // The sides
    var halfLen = this.length / 2;
    for(var i=0; i<2; i++)***REMOVED***

        // get start and end of the line
        var y = this.radius * (i*2-1);
        vec2.set(l0, -halfLen, y);
        vec2.set(l1, halfLen, y);
        vec2.toGlobalFrame(l0, l0, position, angle);
        vec2.toGlobalFrame(l1, l1, position, angle);

        var delta = vec2.getLineSegmentsIntersectionFraction(from, to, l0, l1);
        if(delta >= 0)***REMOVED***
            vec2.rotate(normal, intersectCapsule_unit_y, angle);
            vec2.scale(normal, normal, (i*2-1));
            ray.reportIntersection(result, delta, normal, -1);
            if(result.shouldStop(ray))***REMOVED***
                return;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    // Circles
    var diagonalLengthSquared = Math.pow(this.radius, 2) + Math.pow(halfLen, 2);
    for(var i=0; i<2; i++)***REMOVED***
        vec2.set(l0, halfLen * (i*2-1), 0);
        vec2.toGlobalFrame(l0, l0, position, angle);

        var a = Math.pow(to[0] - from[0], 2) + Math.pow(to[1] - from[1], 2);
        var b = 2 * ((to[0] - from[0]) * (from[0] - l0[0]) + (to[1] - from[1]) * (from[1] - l0[1]));
        var c = Math.pow(from[0] - l0[0], 2) + Math.pow(from[1] - l0[1], 2) - Math.pow(this.radius, 2);
        var delta = Math.pow(b, 2) - 4 * a * c;

        if(delta < 0)***REMOVED***
            // No intersection
            continue;

        ***REMOVED*** else if(delta === 0)***REMOVED***
            // single intersection point
            vec2.lerp(hitPointWorld, from, to, delta);

            if(vec2.squaredDistance(hitPointWorld, position) > diagonalLengthSquared)***REMOVED***
                vec2.sub(normal, hitPointWorld, l0);
                vec2.normalize(normal,normal);
                ray.reportIntersection(result, delta, normal, -1);
                if(result.shouldStop(ray))***REMOVED***
                    return;
                ***REMOVED***
            ***REMOVED***

        ***REMOVED*** else ***REMOVED***
            var sqrtDelta = Math.sqrt(delta);
            var inv2a = 1 / (2 * a);
            var d1 = (- b - sqrtDelta) * inv2a;
            var d2 = (- b + sqrtDelta) * inv2a;

            if(d1 >= 0 && d1 <= 1)***REMOVED***
                vec2.lerp(hitPointWorld, from, to, d1);
                if(vec2.squaredDistance(hitPointWorld, position) > diagonalLengthSquared)***REMOVED***
                    vec2.sub(normal, hitPointWorld, l0);
                    vec2.normalize(normal,normal);
                    ray.reportIntersection(result, d1, normal, -1);
                    if(result.shouldStop(ray))***REMOVED***
                        return;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***

            if(d2 >= 0 && d2 <= 1)***REMOVED***
                vec2.lerp(hitPointWorld, from, to, d2);
                if(vec2.squaredDistance(hitPointWorld, position) > diagonalLengthSquared)***REMOVED***
                    vec2.sub(normal, hitPointWorld, l0);
                    vec2.normalize(normal,normal);
                    ray.reportIntersection(result, d2, normal, -1);
                    if(result.shouldStop(ray))***REMOVED***
                        return;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
***REMOVED***,***REMOVED***"../math/vec2":30,"./Shape":45***REMOVED***],39:[function(_dereq_,module,exports)***REMOVED***
var Shape = _dereq_('./Shape')
,    vec2 = _dereq_('../math/vec2');

module.exports = Circle;

/**
 * Circle shape class.
 * @class Circle
 * @extends Shape
 * @constructor
 * @param ***REMOVED***options***REMOVED*** [options] (Note that this options object will be passed on to the ***REMOVED******REMOVED***#crossLink "Shape"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** constructor.)
 * @param ***REMOVED***number***REMOVED*** [options.radius=1] The radius of this circle
 *
 * @example
 *     var circleShape = new Circle(***REMOVED*** radius: 1 ***REMOVED***);
 *     body.addShape(circleShape);
 */
function Circle(options)***REMOVED***
    if(typeof(arguments[0]) === 'number')***REMOVED***
        options = ***REMOVED***
            radius: arguments[0]
        ***REMOVED***;
        console.warn('The Circle constructor signature has changed. Please use the following format: new Circle(***REMOVED*** radius: 1 ***REMOVED***)');
    ***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    /**
     * The radius of the circle.
     * @property radius
     * @type ***REMOVED***number***REMOVED***
     */
    this.radius = options.radius || 1;

    options.type = Shape.CIRCLE;
    Shape.call(this, options);
***REMOVED***
Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;

/**
 * @method computeMomentOfInertia
 * @param  ***REMOVED***Number***REMOVED*** mass
 * @return ***REMOVED***Number***REMOVED***
 */
Circle.prototype.computeMomentOfInertia = function(mass)***REMOVED***
    var r = this.radius;
    return mass * r * r / 2;
***REMOVED***;

/**
 * @method updateBoundingRadius
 * @return ***REMOVED***Number***REMOVED***
 */
Circle.prototype.updateBoundingRadius = function()***REMOVED***
    this.boundingRadius = this.radius;
***REMOVED***;

/**
 * @method updateArea
 * @return ***REMOVED***Number***REMOVED***
 */
Circle.prototype.updateArea = function()***REMOVED***
    this.area = Math.PI * this.radius * this.radius;
***REMOVED***;

/**
 * @method computeAABB
 * @param  ***REMOVED***AABB***REMOVED***   out      The resulting AABB.
 * @param  ***REMOVED***Array***REMOVED***  position
 * @param  ***REMOVED***Number***REMOVED*** angle
 */
Circle.prototype.computeAABB = function(out, position, angle)***REMOVED***
    var r = this.radius;
    vec2.set(out.upperBound,  r,  r);
    vec2.set(out.lowerBound, -r, -r);
    if(position)***REMOVED***
        vec2.add(out.lowerBound, out.lowerBound, position);
        vec2.add(out.upperBound, out.upperBound, position);
    ***REMOVED***
***REMOVED***;

var Ray_intersectSphere_intersectionPoint = vec2.create();
var Ray_intersectSphere_normal = vec2.create();

/**
 * @method raycast
 * @param  ***REMOVED***RaycastResult***REMOVED*** result
 * @param  ***REMOVED***Ray***REMOVED*** ray
 * @param  ***REMOVED***array***REMOVED*** position
 * @param  ***REMOVED***number***REMOVED*** angle
 */
Circle.prototype.raycast = function(result, ray, position, angle)***REMOVED***
    var from = ray.from,
        to = ray.to,
        r = this.radius;

    var a = Math.pow(to[0] - from[0], 2) + Math.pow(to[1] - from[1], 2);
    var b = 2 * ((to[0] - from[0]) * (from[0] - position[0]) + (to[1] - from[1]) * (from[1] - position[1]));
    var c = Math.pow(from[0] - position[0], 2) + Math.pow(from[1] - position[1], 2) - Math.pow(r, 2);
    var delta = Math.pow(b, 2) - 4 * a * c;

    var intersectionPoint = Ray_intersectSphere_intersectionPoint;
    var normal = Ray_intersectSphere_normal;

    if(delta < 0)***REMOVED***
        // No intersection
        return;

    ***REMOVED*** else if(delta === 0)***REMOVED***
        // single intersection point
        vec2.lerp(intersectionPoint, from, to, delta);

        vec2.sub(normal, intersectionPoint, position);
        vec2.normalize(normal,normal);

        ray.reportIntersection(result, delta, normal, -1);

    ***REMOVED*** else ***REMOVED***
        var sqrtDelta = Math.sqrt(delta);
        var inv2a = 1 / (2 * a);
        var d1 = (- b - sqrtDelta) * inv2a;
        var d2 = (- b + sqrtDelta) * inv2a;

        if(d1 >= 0 && d1 <= 1)***REMOVED***
            vec2.lerp(intersectionPoint, from, to, d1);

            vec2.sub(normal, intersectionPoint, position);
            vec2.normalize(normal,normal);

            ray.reportIntersection(result, d1, normal, -1);

            if(result.shouldStop(ray))***REMOVED***
                return;
            ***REMOVED***
        ***REMOVED***

        if(d2 >= 0 && d2 <= 1)***REMOVED***
            vec2.lerp(intersectionPoint, from, to, d2);

            vec2.sub(normal, intersectionPoint, position);
            vec2.normalize(normal,normal);

            ray.reportIntersection(result, d2, normal, -1);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
***REMOVED***,***REMOVED***"../math/vec2":30,"./Shape":45***REMOVED***],40:[function(_dereq_,module,exports)***REMOVED***
var Shape = _dereq_('./Shape')
,   vec2 = _dereq_('../math/vec2')
,   polyk = _dereq_('../math/polyk')
,   decomp = _dereq_('poly-decomp');

module.exports = Convex;

/**
 * Convex shape class.
 * @class Convex
 * @constructor
 * @extends Shape
 * @param ***REMOVED***object***REMOVED*** [options] (Note that this options object will be passed on to the ***REMOVED******REMOVED***#crossLink "Shape"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** constructor.)
 * @param ***REMOVED***Array***REMOVED*** [options.vertices] An array of vertices that span this shape. Vertices are given in counter-clockwise (CCW) direction.
 * @param ***REMOVED***Array***REMOVED*** [options.axes] An array of unit length vectors, representing the symmetry axes in the convex.
 * @example
 *     // Create a box
 *     var vertices = [[-1,-1], [1,-1], [1,1], [-1,1]];
 *     var convexShape = new Convex(***REMOVED*** vertices: vertices ***REMOVED***);
 *     body.addShape(convexShape);
 */
function Convex(options)***REMOVED***
    if(Array.isArray(arguments[0]))***REMOVED***
        options = ***REMOVED***
            vertices: arguments[0],
            axes: arguments[1]
        ***REMOVED***;
        console.warn('The Convex constructor signature has changed. Please use the following format: new Convex(***REMOVED*** vertices: [...], ... ***REMOVED***)');
    ***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    /**
     * Vertices defined in the local frame.
     * @property vertices
     * @type ***REMOVED***Array***REMOVED***
     */
    this.vertices = [];

    // Copy the verts
    var vertices = options.vertices !== undefined ? options.vertices : [];
    for(var i=0; i < vertices.length; i++)***REMOVED***
        var v = vec2.create();
        vec2.copy(v, vertices[i]);
        this.vertices.push(v);
    ***REMOVED***

    /**
     * Axes defined in the local frame.
     * @property axes
     * @type ***REMOVED***Array***REMOVED***
     */
    this.axes = [];

    if(options.axes)***REMOVED***

        // Copy the axes
        for(var i=0; i < options.axes.length; i++)***REMOVED***
            var axis = vec2.create();
            vec2.copy(axis, options.axes[i]);
            this.axes.push(axis);
        ***REMOVED***

    ***REMOVED*** else ***REMOVED***

        // Construct axes from the vertex data
        for(var i = 0; i < this.vertices.length; i++)***REMOVED***
            // Get the world edge
            var worldPoint0 = this.vertices[i];
            var worldPoint1 = this.vertices[(i+1) % this.vertices.length];

            var normal = vec2.create();
            vec2.sub(normal, worldPoint1, worldPoint0);

            // Get normal - just rotate 90 degrees since vertices are given in CCW
            vec2.rotate90cw(normal, normal);
            vec2.normalize(normal, normal);

            this.axes.push(normal);
        ***REMOVED***

    ***REMOVED***

    /**
     * The center of mass of the Convex
     * @property centerOfMass
     * @type ***REMOVED***Array***REMOVED***
     */
    this.centerOfMass = vec2.fromValues(0,0);

    /**
     * Triangulated version of this convex. The structure is Array of 3-Arrays, and each subarray contains 3 integers, referencing the vertices.
     * @property triangles
     * @type ***REMOVED***Array***REMOVED***
     */
    this.triangles = [];

    if(this.vertices.length)***REMOVED***
        this.updateTriangles();
        this.updateCenterOfMass();
    ***REMOVED***

    /**
     * The bounding radius of the convex
     * @property boundingRadius
     * @type ***REMOVED***Number***REMOVED***
     */
    this.boundingRadius = 0;

    options.type = Shape.CONVEX;
    Shape.call(this, options);

    this.updateBoundingRadius();
    this.updateArea();
    if(this.area < 0)***REMOVED***
        throw new Error("Convex vertices must be given in conter-clockwise winding.");
    ***REMOVED***
***REMOVED***
Convex.prototype = new Shape();
Convex.prototype.constructor = Convex;

var tmpVec1 = vec2.create();
var tmpVec2 = vec2.create();

/**
 * Project a Convex onto a world-oriented axis
 * @method projectOntoAxis
 * @static
 * @param  ***REMOVED***Array***REMOVED*** offset
 * @param  ***REMOVED***Array***REMOVED*** localAxis
 * @param  ***REMOVED***Array***REMOVED*** result
 */
Convex.prototype.projectOntoLocalAxis = function(localAxis, result)***REMOVED***
    var max=null,
        min=null,
        v,
        value,
        localAxis = tmpVec1;

    // Get projected position of all vertices
    for(var i=0; i<this.vertices.length; i++)***REMOVED***
        v = this.vertices[i];
        value = vec2.dot(v, localAxis);
        if(max === null || value > max)***REMOVED***
            max = value;
        ***REMOVED***
        if(min === null || value < min)***REMOVED***
            min = value;
        ***REMOVED***
    ***REMOVED***

    if(min > max)***REMOVED***
        var t = min;
        min = max;
        max = t;
    ***REMOVED***

    vec2.set(result, min, max);
***REMOVED***;

Convex.prototype.projectOntoWorldAxis = function(localAxis, shapeOffset, shapeAngle, result)***REMOVED***
    var worldAxis = tmpVec2;

    this.projectOntoLocalAxis(localAxis, result);

    // Project the position of the body onto the axis - need to add this to the result
    if(shapeAngle !== 0)***REMOVED***
        vec2.rotate(worldAxis, localAxis, shapeAngle);
    ***REMOVED*** else ***REMOVED***
        worldAxis = localAxis;
    ***REMOVED***
    var offset = vec2.dot(shapeOffset, worldAxis);

    vec2.set(result, result[0] + offset, result[1] + offset);
***REMOVED***;


/**
 * Update the .triangles property
 * @method updateTriangles
 */
Convex.prototype.updateTriangles = function()***REMOVED***

    this.triangles.length = 0;

    // Rewrite on polyk notation, array of numbers
    var polykVerts = [];
    for(var i=0; i<this.vertices.length; i++)***REMOVED***
        var v = this.vertices[i];
        polykVerts.push(v[0],v[1]);
    ***REMOVED***

    // Triangulate
    var triangles = polyk.Triangulate(polykVerts);

    // Loop over all triangles, add their inertia contributions to I
    for(var i=0; i<triangles.length; i+=3)***REMOVED***
        var id1 = triangles[i],
            id2 = triangles[i+1],
            id3 = triangles[i+2];

        // Add to triangles
        this.triangles.push([id1,id2,id3]);
    ***REMOVED***
***REMOVED***;

var updateCenterOfMass_centroid = vec2.create(),
    updateCenterOfMass_centroid_times_mass = vec2.create(),
    updateCenterOfMass_a = vec2.create(),
    updateCenterOfMass_b = vec2.create(),
    updateCenterOfMass_c = vec2.create(),
    updateCenterOfMass_ac = vec2.create(),
    updateCenterOfMass_ca = vec2.create(),
    updateCenterOfMass_cb = vec2.create(),
    updateCenterOfMass_n = vec2.create();

/**
 * Update the .centerOfMass property.
 * @method updateCenterOfMass
 */
Convex.prototype.updateCenterOfMass = function()***REMOVED***
    var triangles = this.triangles,
        verts = this.vertices,
        cm = this.centerOfMass,
        centroid = updateCenterOfMass_centroid,
        n = updateCenterOfMass_n,
        a = updateCenterOfMass_a,
        b = updateCenterOfMass_b,
        c = updateCenterOfMass_c,
        ac = updateCenterOfMass_ac,
        ca = updateCenterOfMass_ca,
        cb = updateCenterOfMass_cb,
        centroid_times_mass = updateCenterOfMass_centroid_times_mass;

    vec2.set(cm,0,0);
    var totalArea = 0;

    for(var i=0; i!==triangles.length; i++)***REMOVED***
        var t = triangles[i],
            a = verts[t[0]],
            b = verts[t[1]],
            c = verts[t[2]];

        vec2.centroid(centroid,a,b,c);

        // Get mass for the triangle (density=1 in this case)
        // http://math.stackexchange.com/questions/80198/area-of-triangle-via-vectors
        var m = Convex.triangleArea(a,b,c);
        totalArea += m;

        // Add to center of mass
        vec2.scale(centroid_times_mass, centroid, m);
        vec2.add(cm, cm, centroid_times_mass);
    ***REMOVED***

    vec2.scale(cm,cm,1/totalArea);
***REMOVED***;

/**
 * Compute the mass moment of inertia of the Convex.
 * @method computeMomentOfInertia
 * @param  ***REMOVED***Number***REMOVED*** mass
 * @return ***REMOVED***Number***REMOVED***
 * @see http://www.gamedev.net/topic/342822-moment-of-inertia-of-a-polygon-2d/
 */
Convex.prototype.computeMomentOfInertia = function(mass)***REMOVED***
    var denom = 0.0,
        numer = 0.0,
        N = this.vertices.length;
    for(var j = N-1, i = 0; i < N; j = i, i ++)***REMOVED***
        var p0 = this.vertices[j];
        var p1 = this.vertices[i];
        var a = Math.abs(vec2.crossLength(p0,p1));
        var b = vec2.dot(p1,p1) + vec2.dot(p1,p0) + vec2.dot(p0,p0);
        denom += a * b;
        numer += a;
    ***REMOVED***
    return (mass / 6.0) * (denom / numer);
***REMOVED***;

/**
 * Updates the .boundingRadius property
 * @method updateBoundingRadius
 */
Convex.prototype.updateBoundingRadius = function()***REMOVED***
    var verts = this.vertices,
        r2 = 0;

    for(var i=0; i!==verts.length; i++)***REMOVED***
        var l2 = vec2.squaredLength(verts[i]);
        if(l2 > r2)***REMOVED***
            r2 = l2;
        ***REMOVED***
    ***REMOVED***

    this.boundingRadius = Math.sqrt(r2);
***REMOVED***;

/**
 * Get the area of the triangle spanned by the three points a, b, c. The area is positive if the points are given in counter-clockwise order, otherwise negative.
 * @static
 * @method triangleArea
 * @param ***REMOVED***Array***REMOVED*** a
 * @param ***REMOVED***Array***REMOVED*** b
 * @param ***REMOVED***Array***REMOVED*** c
 * @return ***REMOVED***Number***REMOVED***
 */
Convex.triangleArea = function(a,b,c)***REMOVED***
    return (((b[0] - a[0])*(c[1] - a[1]))-((c[0] - a[0])*(b[1] - a[1]))) * 0.5;
***REMOVED***;

/**
 * Update the .area
 * @method updateArea
 */
Convex.prototype.updateArea = function()***REMOVED***
    this.updateTriangles();
    this.area = 0;

    var triangles = this.triangles,
        verts = this.vertices;
    for(var i=0; i!==triangles.length; i++)***REMOVED***
        var t = triangles[i],
            a = verts[t[0]],
            b = verts[t[1]],
            c = verts[t[2]];

        // Get mass for the triangle (density=1 in this case)
        var m = Convex.triangleArea(a,b,c);
        this.area += m;
    ***REMOVED***
***REMOVED***;

/**
 * @method computeAABB
 * @param  ***REMOVED***AABB***REMOVED***   out
 * @param  ***REMOVED***Array***REMOVED***  position
 * @param  ***REMOVED***Number***REMOVED*** angle
 */
Convex.prototype.computeAABB = function(out, position, angle)***REMOVED***
    out.setFromPoints(this.vertices, position, angle, 0);
***REMOVED***;

var intersectConvex_rayStart = vec2.create();
var intersectConvex_rayEnd = vec2.create();
var intersectConvex_normal = vec2.create();

/**
 * @method raycast
 * @param  ***REMOVED***RaycastResult***REMOVED*** result
 * @param  ***REMOVED***Ray***REMOVED*** ray
 * @param  ***REMOVED***array***REMOVED*** position
 * @param  ***REMOVED***number***REMOVED*** angle
 */
Convex.prototype.raycast = function(result, ray, position, angle)***REMOVED***
    var rayStart = intersectConvex_rayStart;
    var rayEnd = intersectConvex_rayEnd;
    var normal = intersectConvex_normal;
    var vertices = this.vertices;

    // Transform to local shape space
    vec2.toLocalFrame(rayStart, ray.from, position, angle);
    vec2.toLocalFrame(rayEnd, ray.to, position, angle);

    var n = vertices.length;

    for (var i = 0; i < n && !result.shouldStop(ray); i++) ***REMOVED***
        var q1 = vertices[i];
        var q2 = vertices[(i+1) % n];
        var delta = vec2.getLineSegmentsIntersectionFraction(rayStart, rayEnd, q1, q2);

        if(delta >= 0)***REMOVED***
            vec2.sub(normal, q2, q1);
            vec2.rotate(normal, normal, -Math.PI / 2 + angle);
            vec2.normalize(normal, normal);
            ray.reportIntersection(result, delta, normal, i);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

***REMOVED***,***REMOVED***"../math/polyk":29,"../math/vec2":30,"./Shape":45,"poly-decomp":5***REMOVED***],41:[function(_dereq_,module,exports)***REMOVED***
var Shape = _dereq_('./Shape')
,    vec2 = _dereq_('../math/vec2')
,    Utils = _dereq_('../utils/Utils');

module.exports = Heightfield;

/**
 * Heightfield shape class. Height data is given as an array. These data points are spread out evenly with a distance "elementWidth".
 * @class Heightfield
 * @extends Shape
 * @constructor
 * @param ***REMOVED***object***REMOVED*** [options] (Note that this options object will be passed on to the ***REMOVED******REMOVED***#crossLink "Shape"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** constructor.)
 * @param ***REMOVED***array***REMOVED*** [options.heights] An array of Y values that will be used to construct the terrain.
 * @param ***REMOVED***Number***REMOVED*** [options.minValue] Minimum value of the data points in the data array. Will be computed automatically if not given.
 * @param ***REMOVED***Number***REMOVED*** [options.maxValue] Maximum value.
 * @param ***REMOVED***Number***REMOVED*** [options.elementWidth=0.1] World spacing between the data points in X direction.
 *
 * @example
 *     // Generate some height data (y-values).
 *     var heights = [];
 *     for(var i = 0; i < 1000; i++)***REMOVED***
 *         var y = 0.5 * Math.cos(0.2 * i);
 *         heights.push(y);
 *     ***REMOVED***
 *
 *     // Create the heightfield shape
 *     var heightfieldShape = new Heightfield(***REMOVED***
 *         heights: heights,
 *         elementWidth: 1 // Distance between the data points in X direction
 *     ***REMOVED***);
 *     var heightfieldBody = new Body();
 *     heightfieldBody.addShape(heightfieldShape);
 *     world.addBody(heightfieldBody);
 *
 * @todo Should use a scale property with X and Y direction instead of just elementWidth
 */
function Heightfield(options)***REMOVED***
    if(Array.isArray(arguments[0]))***REMOVED***
        options = ***REMOVED***
            heights: arguments[0]
        ***REMOVED***;

        if(typeof(arguments[1]) === 'object')***REMOVED***
            for(var key in arguments[1])***REMOVED***
                options[key] = arguments[1][key];
            ***REMOVED***
        ***REMOVED***

        console.warn('The Heightfield constructor signature has changed. Please use the following format: new Heightfield(***REMOVED*** heights: [...], ... ***REMOVED***)');
    ***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    /**
     * An array of numbers, or height values, that are spread out along the x axis.
     * @property ***REMOVED***array***REMOVED*** heights
     */
    this.heights = options.heights ? options.heights.slice(0) : [];

    /**
     * Max value of the heights
     * @property ***REMOVED***number***REMOVED*** maxValue
     */
    this.maxValue = options.maxValue || null;

    /**
     * Max value of the heights
     * @property ***REMOVED***number***REMOVED*** minValue
     */
    this.minValue = options.minValue || null;

    /**
     * The width of each element
     * @property ***REMOVED***number***REMOVED*** elementWidth
     */
    this.elementWidth = options.elementWidth || 0.1;

    if(options.maxValue === undefined || options.minValue === undefined)***REMOVED***
        this.updateMaxMinValues();
    ***REMOVED***

    options.type = Shape.HEIGHTFIELD;
    Shape.call(this, options);
***REMOVED***
Heightfield.prototype = new Shape();
Heightfield.prototype.constructor = Heightfield;

/**
 * Update the .minValue and the .maxValue
 * @method updateMaxMinValues
 */
Heightfield.prototype.updateMaxMinValues = function()***REMOVED***
    var data = this.heights;
    var maxValue = data[0];
    var minValue = data[0];
    for(var i=0; i !== data.length; i++)***REMOVED***
        var v = data[i];
        if(v > maxValue)***REMOVED***
            maxValue = v;
        ***REMOVED***
        if(v < minValue)***REMOVED***
            minValue = v;
        ***REMOVED***
    ***REMOVED***
    this.maxValue = maxValue;
    this.minValue = minValue;
***REMOVED***;

/**
 * @method computeMomentOfInertia
 * @param  ***REMOVED***Number***REMOVED*** mass
 * @return ***REMOVED***Number***REMOVED***
 */
Heightfield.prototype.computeMomentOfInertia = function(mass)***REMOVED***
    return Number.MAX_VALUE;
***REMOVED***;

Heightfield.prototype.updateBoundingRadius = function()***REMOVED***
    this.boundingRadius = Number.MAX_VALUE;
***REMOVED***;

Heightfield.prototype.updateArea = function()***REMOVED***
    var data = this.heights,
        area = 0;
    for(var i=0; i<data.length-1; i++)***REMOVED***
        area += (data[i]+data[i+1]) / 2 * this.elementWidth;
    ***REMOVED***
    this.area = area;
***REMOVED***;

var points = [
    vec2.create(),
    vec2.create(),
    vec2.create(),
    vec2.create()
];

/**
 * @method computeAABB
 * @param  ***REMOVED***AABB***REMOVED***   out      The resulting AABB.
 * @param  ***REMOVED***Array***REMOVED***  position
 * @param  ***REMOVED***Number***REMOVED*** angle
 */
Heightfield.prototype.computeAABB = function(out, position, angle)***REMOVED***
    vec2.set(points[0], 0, this.maxValue);
    vec2.set(points[1], this.elementWidth * this.heights.length, this.maxValue);
    vec2.set(points[2], this.elementWidth * this.heights.length, this.minValue);
    vec2.set(points[3], 0, this.minValue);
    out.setFromPoints(points, position, angle);
***REMOVED***;

/**
 * Get a line segment in the heightfield
 * @method getLineSegment
 * @param  ***REMOVED***array***REMOVED*** start Where to store the resulting start point
 * @param  ***REMOVED***array***REMOVED*** end Where to store the resulting end point
 * @param  ***REMOVED***number***REMOVED*** i
 */
Heightfield.prototype.getLineSegment = function(start, end, i)***REMOVED***
    var data = this.heights;
    var width = this.elementWidth;
    vec2.set(start, i * width, data[i]);
    vec2.set(end, (i + 1) * width, data[i + 1]);
***REMOVED***;

Heightfield.prototype.getSegmentIndex = function(position)***REMOVED***
    return Math.floor(position[0] / this.elementWidth);
***REMOVED***;

Heightfield.prototype.getClampedSegmentIndex = function(position)***REMOVED***
    var i = this.getSegmentIndex(position);
    i = Math.min(this.heights.length, Math.max(i, 0)); // clamp
    return i;
***REMOVED***;

var intersectHeightfield_hitPointWorld = vec2.create();
var intersectHeightfield_worldNormal = vec2.create();
var intersectHeightfield_l0 = vec2.create();
var intersectHeightfield_l1 = vec2.create();
var intersectHeightfield_localFrom = vec2.create();
var intersectHeightfield_localTo = vec2.create();
var intersectHeightfield_unit_y = vec2.fromValues(0,1);

// Returns 1 if the lines intersect, otherwise 0.
function getLineSegmentsIntersection (out, p0, p1, p2, p3) ***REMOVED***

    var s1_x, s1_y, s2_x, s2_y;
    s1_x = p1[0] - p0[0];
    s1_y = p1[1] - p0[1];
    s2_x = p3[0] - p2[0];
    s2_y = p3[1] - p2[1];

    var s, t;
    s = (-s1_y * (p0[0] - p2[0]) + s1_x * (p0[1] - p2[1])) / (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (p0[1] - p2[1]) - s2_y * (p0[0] - p2[0])) / (-s2_x * s1_y + s1_x * s2_y);
    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) ***REMOVED*** // Collision detected
        var intX = p0[0] + (t * s1_x);
        var intY = p0[1] + (t * s1_y);
        out[0] = intX;
        out[1] = intY;
        return t;
    ***REMOVED***
    return -1; // No collision
***REMOVED***

/**
 * @method raycast
 * @param  ***REMOVED***RayResult***REMOVED*** result
 * @param  ***REMOVED***Ray***REMOVED*** ray
 * @param  ***REMOVED***array***REMOVED*** position
 * @param  ***REMOVED***number***REMOVED*** angle
 */
Heightfield.prototype.raycast = function(result, ray, position, angle)***REMOVED***
    var from = ray.from;
    var to = ray.to;
    var direction = ray.direction;

    var hitPointWorld = intersectHeightfield_hitPointWorld;
    var worldNormal = intersectHeightfield_worldNormal;
    var l0 = intersectHeightfield_l0;
    var l1 = intersectHeightfield_l1;
    var localFrom = intersectHeightfield_localFrom;
    var localTo = intersectHeightfield_localTo;

    // get local ray start and end
    vec2.toLocalFrame(localFrom, from, position, angle);
    vec2.toLocalFrame(localTo, to, position, angle);

    // Get the segment range
    var i0 = this.getClampedSegmentIndex(localFrom);
    var i1 = this.getClampedSegmentIndex(localTo);
    if(i0 > i1)***REMOVED***
        var tmp = i0;
        i0 = i1;
        i1 = tmp;
    ***REMOVED***

    // The segments
    for(var i=0; i<this.heights.length - 1; i++)***REMOVED***
        this.getLineSegment(l0, l1, i);
        var t = vec2.getLineSegmentsIntersectionFraction(localFrom, localTo, l0, l1);
        if(t >= 0)***REMOVED***
            vec2.sub(worldNormal, l1, l0);
            vec2.rotate(worldNormal, worldNormal, angle + Math.PI / 2);
            vec2.normalize(worldNormal, worldNormal);
            ray.reportIntersection(result, t, worldNormal, -1);
            if(result.shouldStop(ray))***REMOVED***
                return;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
***REMOVED***,***REMOVED***"../math/vec2":30,"../utils/Utils":57,"./Shape":45***REMOVED***],42:[function(_dereq_,module,exports)***REMOVED***
var Shape = _dereq_('./Shape')
,   vec2 = _dereq_('../math/vec2');

module.exports = Line;

/**
 * Line shape class. The line shape is along the x direction, and stretches from [-length/2, 0] to [length/2,0].
 * @class Line
 * @param ***REMOVED***object***REMOVED*** [options] (Note that this options object will be passed on to the ***REMOVED******REMOVED***#crossLink "Shape"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** constructor.)
 * @param ***REMOVED***Number***REMOVED*** [options.length=1] The total length of the line
 * @extends Shape
 * @constructor
 */
function Line(options)***REMOVED***
    if(typeof(arguments[0]) === 'number')***REMOVED***
        options = ***REMOVED***
            length: arguments[0]
        ***REMOVED***;
        console.warn('The Line constructor signature has changed. Please use the following format: new Line(***REMOVED*** length: 1, ... ***REMOVED***)');
    ***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    /**
     * Length of this line
     * @property ***REMOVED***Number***REMOVED*** length
     * @default 1
     */
    this.length = options.length || 1;

    options.type = Shape.LINE;
    Shape.call(this, options);
***REMOVED***
Line.prototype = new Shape();
Line.prototype.constructor = Line;

Line.prototype.computeMomentOfInertia = function(mass)***REMOVED***
    return mass * Math.pow(this.length,2) / 12;
***REMOVED***;

Line.prototype.updateBoundingRadius = function()***REMOVED***
    this.boundingRadius = this.length/2;
***REMOVED***;

var points = [vec2.create(),vec2.create()];

/**
 * @method computeAABB
 * @param  ***REMOVED***AABB***REMOVED***   out      The resulting AABB.
 * @param  ***REMOVED***Array***REMOVED***  position
 * @param  ***REMOVED***Number***REMOVED*** angle
 */
Line.prototype.computeAABB = function(out, position, angle)***REMOVED***
    var l2 = this.length / 2;
    vec2.set(points[0], -l2,  0);
    vec2.set(points[1],  l2,  0);
    out.setFromPoints(points,position,angle,0);
***REMOVED***;

var raycast_hitPoint = vec2.create();
var raycast_normal = vec2.create();
var raycast_l0 = vec2.create();
var raycast_l1 = vec2.create();
var raycast_unit_y = vec2.fromValues(0,1);

/**
 * @method raycast
 * @param  ***REMOVED***RaycastResult***REMOVED*** result
 * @param  ***REMOVED***Ray***REMOVED*** ray
 * @param  ***REMOVED***number***REMOVED*** angle
 * @param  ***REMOVED***array***REMOVED*** position
 */
Line.prototype.raycast = function(result, ray, position, angle)***REMOVED***
    var from = ray.from;
    var to = ray.to;

    var l0 = raycast_l0;
    var l1 = raycast_l1;

    // get start and end of the line
    var halfLen = this.length / 2;
    vec2.set(l0, -halfLen, 0);
    vec2.set(l1, halfLen, 0);
    vec2.toGlobalFrame(l0, l0, position, angle);
    vec2.toGlobalFrame(l1, l1, position, angle);

    var fraction = vec2.getLineSegmentsIntersectionFraction(l0, l1, from, to);
    if(fraction >= 0)***REMOVED***
        var normal = raycast_normal;
        vec2.rotate(normal, raycast_unit_y, angle); // todo: this should depend on which side the ray comes from
        ray.reportIntersection(result, fraction, normal, -1);
    ***REMOVED***
***REMOVED***;
***REMOVED***,***REMOVED***"../math/vec2":30,"./Shape":45***REMOVED***],43:[function(_dereq_,module,exports)***REMOVED***
var Shape = _dereq_('./Shape')
,   vec2 = _dereq_('../math/vec2');

module.exports = Particle;

/**
 * Particle shape class.
 * @class Particle
 * @constructor
 * @param ***REMOVED***object***REMOVED*** [options] (Note that this options object will be passed on to the ***REMOVED******REMOVED***#crossLink "Shape"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** constructor.)
 * @extends Shape
 */
function Particle(options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;
	options.type = Shape.PARTICLE;
    Shape.call(this, options);
***REMOVED***
Particle.prototype = new Shape();
Particle.prototype.constructor = Particle;

Particle.prototype.computeMomentOfInertia = function(mass)***REMOVED***
    return 0; // Can't rotate a particle
***REMOVED***;

Particle.prototype.updateBoundingRadius = function()***REMOVED***
    this.boundingRadius = 0;
***REMOVED***;

/**
 * @method computeAABB
 * @param  ***REMOVED***AABB***REMOVED***   out
 * @param  ***REMOVED***Array***REMOVED***  position
 * @param  ***REMOVED***Number***REMOVED*** angle
 */
Particle.prototype.computeAABB = function(out, position, angle)***REMOVED***
    vec2.copy(out.lowerBound, position);
    vec2.copy(out.upperBound, position);
***REMOVED***;

***REMOVED***,***REMOVED***"../math/vec2":30,"./Shape":45***REMOVED***],44:[function(_dereq_,module,exports)***REMOVED***
var Shape =  _dereq_('./Shape')
,    vec2 =  _dereq_('../math/vec2')
,    Utils = _dereq_('../utils/Utils');

module.exports = Plane;

/**
 * Plane shape class. The plane is facing in the Y direction.
 * @class Plane
 * @extends Shape
 * @constructor
 * @param ***REMOVED***object***REMOVED*** [options] (Note that this options object will be passed on to the ***REMOVED******REMOVED***#crossLink "Shape"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** constructor.)
 */
function Plane(options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;
    options.type = Shape.PLANE;
    Shape.call(this, options);
***REMOVED***
Plane.prototype = new Shape();
Plane.prototype.constructor = Plane;

/**
 * Compute moment of inertia
 * @method computeMomentOfInertia
 */
Plane.prototype.computeMomentOfInertia = function(mass)***REMOVED***
    return 0; // Plane is infinite. The inertia should therefore be infinty but by convention we set 0 here
***REMOVED***;

/**
 * Update the bounding radius
 * @method updateBoundingRadius
 */
Plane.prototype.updateBoundingRadius = function()***REMOVED***
    this.boundingRadius = Number.MAX_VALUE;
***REMOVED***;

/**
 * @method computeAABB
 * @param  ***REMOVED***AABB***REMOVED***   out
 * @param  ***REMOVED***Array***REMOVED***  position
 * @param  ***REMOVED***Number***REMOVED*** angle
 */
Plane.prototype.computeAABB = function(out, position, angle)***REMOVED***
    var a = angle % (2 * Math.PI);
    var set = vec2.set;
    var max = Number.MAX_VALUE;
    var lowerBound = out.lowerBound;
    var upperBound = out.upperBound;

    if(a === 0)***REMOVED***
        // y goes from -inf to 0
        set(lowerBound, -max, -max);
        set(upperBound,  max,  0);

    ***REMOVED*** else if(a === Math.PI / 2)***REMOVED***

        // x goes from 0 to inf
        set(lowerBound, 0, -max);
        set(upperBound,      max,  max);

    ***REMOVED*** else if(a === Math.PI)***REMOVED***

        // y goes from 0 to inf
        set(lowerBound, -max, 0);
        set(upperBound,  max, max);

    ***REMOVED*** else if(a === 3*Math.PI/2)***REMOVED***

        // x goes from -inf to 0
        set(lowerBound, -max,     -max);
        set(upperBound,  0,  max);

    ***REMOVED*** else ***REMOVED***

        // Set max bounds
        set(lowerBound, -max, -max);
        set(upperBound,  max,  max);
    ***REMOVED***

    vec2.add(lowerBound, lowerBound, position);
    vec2.add(upperBound, upperBound, position);
***REMOVED***;

Plane.prototype.updateArea = function()***REMOVED***
    this.area = Number.MAX_VALUE;
***REMOVED***;

var intersectPlane_planePointToFrom = vec2.create();
var intersectPlane_dir_scaled_with_t = vec2.create();
var intersectPlane_hitPoint = vec2.create();
var intersectPlane_normal = vec2.create();
var intersectPlane_len = vec2.create();

/**
 * @method raycast
 * @param  ***REMOVED***RayResult***REMOVED*** result
 * @param  ***REMOVED***Ray***REMOVED*** ray
 * @param  ***REMOVED***array***REMOVED*** position
 * @param  ***REMOVED***number***REMOVED*** angle
 */
Plane.prototype.raycast = function(result, ray, position, angle)***REMOVED***
    var from = ray.from;
    var to = ray.to;
    var direction = ray.direction;
    var planePointToFrom = intersectPlane_planePointToFrom;
    var dir_scaled_with_t = intersectPlane_dir_scaled_with_t;
    var hitPoint = intersectPlane_hitPoint;
    var normal = intersectPlane_normal;
    var len = intersectPlane_len;

    // Get plane normal
    vec2.set(normal, 0, 1);
    vec2.rotate(normal, normal, angle);

    vec2.sub(len, from, position);
    var planeToFrom = vec2.dot(len, normal);
    vec2.sub(len, to, position);
    var planeToTo = vec2.dot(len, normal);

    if(planeToFrom * planeToTo > 0)***REMOVED***
        // "from" and "to" are on the same side of the plane... bail out
        return;
    ***REMOVED***

    if(vec2.squaredDistance(from, to) < planeToFrom * planeToFrom)***REMOVED***
        return;
    ***REMOVED***

    var n_dot_dir = vec2.dot(normal, direction);

    vec2.sub(planePointToFrom, from, position);
    var t = -vec2.dot(normal, planePointToFrom) / n_dot_dir / ray.length;

    ray.reportIntersection(result, t, normal, -1);
***REMOVED***;
***REMOVED***,***REMOVED***"../math/vec2":30,"../utils/Utils":57,"./Shape":45***REMOVED***],45:[function(_dereq_,module,exports)***REMOVED***
module.exports = Shape;

var vec2 = _dereq_('../math/vec2');

/**
 * Base class for shapes.
 * @class Shape
 * @constructor
 * @param ***REMOVED***object***REMOVED*** [options]
 * @param ***REMOVED***array***REMOVED*** [options.position]
 * @param ***REMOVED***number***REMOVED*** [options.angle=0]
 * @param ***REMOVED***number***REMOVED*** [options.collisionGroup=1]
 * @param ***REMOVED***number***REMOVED*** [options.collisionMask=1]
 * @param ***REMOVED***boolean***REMOVED*** [options.sensor=false]
 * @param ***REMOVED***boolean***REMOVED*** [options.collisionResponse=true]
 * @param ***REMOVED***object***REMOVED*** [options.type=0]
 */
function Shape(options)***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    /**
     * The body this shape is attached to. A shape can only be attached to a single body.
     * @property ***REMOVED***Body***REMOVED*** body
     */
    this.body = null;

    /**
     * Body-local position of the shape.
     * @property ***REMOVED***Array***REMOVED*** position
     */
    this.position = vec2.fromValues(0,0);
    if(options.position)***REMOVED***
        vec2.copy(this.position, options.position);
    ***REMOVED***

    /**
     * Body-local angle of the shape.
     * @property ***REMOVED***number***REMOVED*** angle
     */
    this.angle = options.angle || 0;

    /**
     * The type of the shape. One of:
     *
     * * ***REMOVED******REMOVED***#crossLink "Shape/CIRCLE:property"***REMOVED******REMOVED***Shape.CIRCLE***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***
     * * ***REMOVED******REMOVED***#crossLink "Shape/PARTICLE:property"***REMOVED******REMOVED***Shape.PARTICLE***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***
     * * ***REMOVED******REMOVED***#crossLink "Shape/PLANE:property"***REMOVED******REMOVED***Shape.PLANE***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***
     * * ***REMOVED******REMOVED***#crossLink "Shape/CONVEX:property"***REMOVED******REMOVED***Shape.CONVEX***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***
     * * ***REMOVED******REMOVED***#crossLink "Shape/LINE:property"***REMOVED******REMOVED***Shape.LINE***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***
     * * ***REMOVED******REMOVED***#crossLink "Shape/BOX:property"***REMOVED******REMOVED***Shape.BOX***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***
     * * ***REMOVED******REMOVED***#crossLink "Shape/CAPSULE:property"***REMOVED******REMOVED***Shape.CAPSULE***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***
     * * ***REMOVED******REMOVED***#crossLink "Shape/HEIGHTFIELD:property"***REMOVED******REMOVED***Shape.HEIGHTFIELD***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***
     *
     * @property ***REMOVED***number***REMOVED*** type
     */
    this.type = options.type || 0;

    /**
     * Shape object identifier.
     * @type ***REMOVED***Number***REMOVED***
     * @property id
     */
    this.id = Shape.idCounter++;

    /**
     * Bounding circle radius of this shape
     * @property boundingRadius
     * @type ***REMOVED***Number***REMOVED***
     */
    this.boundingRadius = 0;

    /**
     * Collision group that this shape belongs to (bit mask). See <a href="http://www.aurelienribon.com/blog/2011/07/box2d-tutorial-collision-filtering/">this tutorial</a>.
     * @property collisionGroup
     * @type ***REMOVED***Number***REMOVED***
     * @example
     *     // Setup bits for each available group
     *     var PLAYER = Math.pow(2,0),
     *         ENEMY =  Math.pow(2,1),
     *         GROUND = Math.pow(2,2)
     *
     *     // Put shapes into their groups
     *     player1Shape.collisionGroup = PLAYER;
     *     player2Shape.collisionGroup = PLAYER;
     *     enemyShape  .collisionGroup = ENEMY;
     *     groundShape .collisionGroup = GROUND;
     *
     *     // Assign groups that each shape collide with.
     *     // Note that the players can collide with ground and enemies, but not with other players.
     *     player1Shape.collisionMask = ENEMY | GROUND;
     *     player2Shape.collisionMask = ENEMY | GROUND;
     *     enemyShape  .collisionMask = PLAYER | GROUND;
     *     groundShape .collisionMask = PLAYER | ENEMY;
     *
     * @example
     *     // How collision check is done
     *     if(shapeA.collisionGroup & shapeB.collisionMask)!=0 && (shapeB.collisionGroup & shapeA.collisionMask)!=0)***REMOVED***
     *         // The shapes will collide
     *     ***REMOVED***
     */
    this.collisionGroup = options.collisionGroup !== undefined ? options.collisionGroup : 1;

    /**
     * Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled. That means that this shape will move through other body shapes, but it will still trigger contact events, etc.
     * @property ***REMOVED***Boolean***REMOVED*** collisionResponse
     */
    this.collisionResponse = options.collisionResponse !== undefined ? options.collisionResponse : true;

    /**
     * Collision mask of this shape. See .collisionGroup.
     * @property collisionMask
     * @type ***REMOVED***Number***REMOVED***
     */
    this.collisionMask = options.collisionMask !== undefined ? options.collisionMask : 1;

    /**
     * Material to use in collisions for this Shape. If this is set to null, the world will use default material properties instead.
     * @property material
     * @type ***REMOVED***Material***REMOVED***
     */
    this.material = options.material || null;

    /**
     * Area of this shape.
     * @property area
     * @type ***REMOVED***Number***REMOVED***
     */
    this.area = 0;

    /**
     * Set to true if you want this shape to be a sensor. A sensor does not generate contacts, but it still reports contact events. This is good if you want to know if a shape is overlapping another shape, without them generating contacts.
     * @property ***REMOVED***Boolean***REMOVED*** sensor
     */
    this.sensor = options.sensor !== undefined ? options.sensor : false;

    if(this.type)***REMOVED***
        this.updateBoundingRadius();
    ***REMOVED***

    this.updateArea();
***REMOVED***

Shape.idCounter = 0;

/**
 * @static
 * @property ***REMOVED***Number***REMOVED*** CIRCLE
 */
Shape.CIRCLE =      1;

/**
 * @static
 * @property ***REMOVED***Number***REMOVED*** PARTICLE
 */
Shape.PARTICLE =    2;

/**
 * @static
 * @property ***REMOVED***Number***REMOVED*** PLANE
 */
Shape.PLANE =       4;

/**
 * @static
 * @property ***REMOVED***Number***REMOVED*** CONVEX
 */
Shape.CONVEX =      8;

/**
 * @static
 * @property ***REMOVED***Number***REMOVED*** LINE
 */
Shape.LINE =        16;

/**
 * @static
 * @property ***REMOVED***Number***REMOVED*** BOX
 */
Shape.BOX =   32;

Object.defineProperty(Shape, 'RECTANGLE', ***REMOVED***
    get: function() ***REMOVED***
        console.warn('Shape.RECTANGLE is deprecated, use Shape.BOX instead.');
        return Shape.BOX;
    ***REMOVED***
***REMOVED***);

/**
 * @static
 * @property ***REMOVED***Number***REMOVED*** CAPSULE
 */
Shape.CAPSULE =     64;

/**
 * @static
 * @property ***REMOVED***Number***REMOVED*** HEIGHTFIELD
 */
Shape.HEIGHTFIELD = 128;

/**
 * Should return the moment of inertia around the Z axis of the body given the total mass. See <a href="http://en.wikipedia.org/wiki/List_of_moments_of_inertia">Wikipedia's list of moments of inertia</a>.
 * @method computeMomentOfInertia
 * @param  ***REMOVED***Number***REMOVED*** mass
 * @return ***REMOVED***Number***REMOVED*** If the inertia is infinity or if the object simply isn't possible to rotate, return 0.
 */
Shape.prototype.computeMomentOfInertia = function(mass)***REMOVED******REMOVED***;

/**
 * Returns the bounding circle radius of this shape.
 * @method updateBoundingRadius
 * @return ***REMOVED***Number***REMOVED***
 */
Shape.prototype.updateBoundingRadius = function()***REMOVED******REMOVED***;

/**
 * Update the .area property of the shape.
 * @method updateArea
 */
Shape.prototype.updateArea = function()***REMOVED***
    // To be implemented in all subclasses
***REMOVED***;

/**
 * Compute the world axis-aligned bounding box (AABB) of this shape.
 * @method computeAABB
 * @param  ***REMOVED***AABB***REMOVED*** out The resulting AABB.
 * @param  ***REMOVED***Array***REMOVED*** position World position of the shape.
 * @param  ***REMOVED***Number***REMOVED*** angle World angle of the shape.
 */
Shape.prototype.computeAABB = function(out, position, angle)***REMOVED***
    // To be implemented in each subclass
***REMOVED***;

/**
 * Perform raycasting on this shape.
 * @method raycast
 * @param  ***REMOVED***RayResult***REMOVED*** result Where to store the resulting data.
 * @param  ***REMOVED***Ray***REMOVED*** ray The Ray that you want to use for raycasting.
 * @param  ***REMOVED***array***REMOVED*** position World position of the shape (the .position property will be ignored).
 * @param  ***REMOVED***number***REMOVED*** angle World angle of the shape (the .angle property will be ignored).
 */
Shape.prototype.raycast = function(result, ray, position, angle)***REMOVED***
    // To be implemented in each subclass
***REMOVED***;
***REMOVED***,***REMOVED***"../math/vec2":30***REMOVED***],46:[function(_dereq_,module,exports)***REMOVED***
var vec2 = _dereq_('../math/vec2')
,   Solver = _dereq_('./Solver')
,   Utils = _dereq_('../utils/Utils')
,   FrictionEquation = _dereq_('../equations/FrictionEquation');

module.exports = GSSolver;

/**
 * Iterative Gauss-Seidel constraint equation solver.
 *
 * @class GSSolver
 * @constructor
 * @extends Solver
 * @param ***REMOVED***Object***REMOVED*** [options]
 * @param ***REMOVED***Number***REMOVED*** [options.iterations=10]
 * @param ***REMOVED***Number***REMOVED*** [options.tolerance=0]
 */
function GSSolver(options)***REMOVED***
    Solver.call(this,options,Solver.GS);
    options = options || ***REMOVED******REMOVED***;

    /**
     * The max number of iterations to do when solving. More gives better results, but is more expensive.
     * @property iterations
     * @type ***REMOVED***Number***REMOVED***
     */
    this.iterations = options.iterations || 10;

    /**
     * The error tolerance, per constraint. If the total error is below this limit, the solver will stop iterating. Set to zero for as good solution as possible, but to something larger than zero to make computations faster.
     * @property tolerance
     * @type ***REMOVED***Number***REMOVED***
     * @default 1e-7
     */
    this.tolerance = options.tolerance || 1e-7;

    this.arrayStep = 30;
    this.lambda = new Utils.ARRAY_TYPE(this.arrayStep);
    this.Bs =     new Utils.ARRAY_TYPE(this.arrayStep);
    this.invCs =  new Utils.ARRAY_TYPE(this.arrayStep);

    /**
     * Set to true to set all right hand side terms to zero when solving. Can be handy for a few applications.
     * @property useZeroRHS
     * @type ***REMOVED***Boolean***REMOVED***
     */
    this.useZeroRHS = false;

    /**
     * Number of solver iterations that are done to approximate normal forces. When these iterations are done, friction force will be computed from the contact normal forces. These friction forces will override any other friction forces set from the World for example.
     * The solver will use less iterations if the solution is below the .tolerance.
     * @property frictionIterations
     * @type ***REMOVED***Number***REMOVED***
     */
    this.frictionIterations = 0;

    /**
     * The number of iterations that were made during the last solve. If .tolerance is zero, this value will always be equal to .iterations, but if .tolerance is larger than zero, and the solver can quit early, then this number will be somewhere between 1 and .iterations.
     * @property ***REMOVED***Number***REMOVED*** usedIterations
     */
    this.usedIterations = 0;
***REMOVED***
GSSolver.prototype = new Solver();
GSSolver.prototype.constructor = GSSolver;

function setArrayZero(array)***REMOVED***
    var l = array.length;
    while(l--)***REMOVED***
        array[l] = +0.0;
    ***REMOVED***
***REMOVED***

/**
 * Solve the system of equations
 * @method solve
 * @param  ***REMOVED***Number***REMOVED***  h       Time step
 * @param  ***REMOVED***World***REMOVED***   world    World to solve
 */
GSSolver.prototype.solve = function(h, world)***REMOVED***

    this.sortEquations();

    var iter = 0,
        maxIter = this.iterations,
        maxFrictionIter = this.frictionIterations,
        equations = this.equations,
        Neq = equations.length,
        tolSquared = Math.pow(this.tolerance*Neq, 2),
        bodies = world.bodies,
        Nbodies = world.bodies.length,
        add = vec2.add,
        set = vec2.set,
        useZeroRHS = this.useZeroRHS,
        lambda = this.lambda;

    this.usedIterations = 0;

    if(Neq)***REMOVED***
        for(var i=0; i!==Nbodies; i++)***REMOVED***
            var b = bodies[i];

            // Update solve mass
            b.updateSolveMassProperties();
        ***REMOVED***
    ***REMOVED***

    // Things that does not change during iteration can be computed once
    if(lambda.length < Neq)***REMOVED***
        lambda = this.lambda =  new Utils.ARRAY_TYPE(Neq + this.arrayStep);
        this.Bs =               new Utils.ARRAY_TYPE(Neq + this.arrayStep);
        this.invCs =            new Utils.ARRAY_TYPE(Neq + this.arrayStep);
    ***REMOVED***
    setArrayZero(lambda);
    var invCs = this.invCs,
        Bs = this.Bs,
        lambda = this.lambda;

    for(var i=0; i!==equations.length; i++)***REMOVED***
        var c = equations[i];
        if(c.timeStep !== h || c.needsUpdate)***REMOVED***
            c.timeStep = h;
            c.update();
        ***REMOVED***
        Bs[i] =     c.computeB(c.a,c.b,h);
        invCs[i] =  c.computeInvC(c.epsilon);
    ***REMOVED***

    var q, B, c, deltalambdaTot,i,j;

    if(Neq !== 0)***REMOVED***

        for(i=0; i!==Nbodies; i++)***REMOVED***
            var b = bodies[i];

            // Reset vlambda
            b.resetConstraintVelocity();
        ***REMOVED***

        if(maxFrictionIter)***REMOVED***
            // Iterate over contact equations to get normal forces
            for(iter=0; iter!==maxFrictionIter; iter++)***REMOVED***

                // Accumulate the total error for each iteration.
                deltalambdaTot = 0.0;

                for(j=0; j!==Neq; j++)***REMOVED***
                    c = equations[j];

                    var deltalambda = GSSolver.iterateEquation(j,c,c.epsilon,Bs,invCs,lambda,useZeroRHS,h,iter);
                    deltalambdaTot += Math.abs(deltalambda);
                ***REMOVED***

                this.usedIterations++;

                // If the total error is small enough - stop iterate
                if(deltalambdaTot*deltalambdaTot <= tolSquared)***REMOVED***
                    break;
                ***REMOVED***
            ***REMOVED***

            GSSolver.updateMultipliers(equations, lambda, 1/h);

            // Set computed friction force
            for(j=0; j!==Neq; j++)***REMOVED***
                var eq = equations[j];
                if(eq instanceof FrictionEquation)***REMOVED***
                    var f = 0.0;
                    for(var k=0; k!==eq.contactEquations.length; k++)***REMOVED***
                        f += eq.contactEquations[k].multiplier;
                    ***REMOVED***
                    f *= eq.frictionCoefficient / eq.contactEquations.length;
                    eq.maxForce =  f;
                    eq.minForce = -f;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        // Iterate over all equations
        for(iter=0; iter!==maxIter; iter++)***REMOVED***

            // Accumulate the total error for each iteration.
            deltalambdaTot = 0.0;

            for(j=0; j!==Neq; j++)***REMOVED***
                c = equations[j];

                var deltalambda = GSSolver.iterateEquation(j,c,c.epsilon,Bs,invCs,lambda,useZeroRHS,h,iter);
                deltalambdaTot += Math.abs(deltalambda);
            ***REMOVED***

            this.usedIterations++;

            // If the total error is small enough - stop iterate
            if(deltalambdaTot*deltalambdaTot <= tolSquared)***REMOVED***
                break;
            ***REMOVED***
        ***REMOVED***

        // Add result to velocity
        for(i=0; i!==Nbodies; i++)***REMOVED***
            bodies[i].addConstraintVelocity();
        ***REMOVED***

        GSSolver.updateMultipliers(equations, lambda, 1/h);
    ***REMOVED***
***REMOVED***;

// Sets the .multiplier property of each equation
GSSolver.updateMultipliers = function(equations, lambda, invDt)***REMOVED***
    // Set the .multiplier property of each equation
    var l = equations.length;
    while(l--)***REMOVED***
        equations[l].multiplier = lambda[l] * invDt;
    ***REMOVED***
***REMOVED***;

GSSolver.iterateEquation = function(j,eq,eps,Bs,invCs,lambda,useZeroRHS,dt,iter)***REMOVED***
    // Compute iteration
    var B = Bs[j],
        invC = invCs[j],
        lambdaj = lambda[j],
        GWlambda = eq.computeGWlambda();

    var maxForce = eq.maxForce,
        minForce = eq.minForce;

    if(useZeroRHS)***REMOVED***
        B = 0;
    ***REMOVED***

    var deltalambda = invC * ( B - GWlambda - eps * lambdaj );

    // Clamp if we are not within the min/max interval
    var lambdaj_plus_deltalambda = lambdaj + deltalambda;
    if(lambdaj_plus_deltalambda < minForce*dt)***REMOVED***
        deltalambda = minForce*dt - lambdaj;
    ***REMOVED*** else if(lambdaj_plus_deltalambda > maxForce*dt)***REMOVED***
        deltalambda = maxForce*dt - lambdaj;
    ***REMOVED***
    lambda[j] += deltalambda;
    eq.addToWlambda(deltalambda);

    return deltalambda;
***REMOVED***;

***REMOVED***,***REMOVED***"../equations/FrictionEquation":23,"../math/vec2":30,"../utils/Utils":57,"./Solver":47***REMOVED***],47:[function(_dereq_,module,exports)***REMOVED***
var Utils = _dereq_('../utils/Utils')
,   EventEmitter = _dereq_('../events/EventEmitter');

module.exports = Solver;

/**
 * Base class for constraint solvers.
 * @class Solver
 * @constructor
 * @extends EventEmitter
 */
function Solver(options,type)***REMOVED***
    options = options || ***REMOVED******REMOVED***;

    EventEmitter.call(this);

    this.type = type;

    /**
     * Current equations in the solver.
     *
     * @property equations
     * @type ***REMOVED***Array***REMOVED***
     */
    this.equations = [];

    /**
     * Function that is used to sort all equations before each solve.
     * @property equationSortFunction
     * @type ***REMOVED***function|boolean***REMOVED***
     */
    this.equationSortFunction = options.equationSortFunction || false;
***REMOVED***
Solver.prototype = new EventEmitter();
Solver.prototype.constructor = Solver;

/**
 * Method to be implemented in each subclass
 * @method solve
 * @param  ***REMOVED***Number***REMOVED*** dt
 * @param  ***REMOVED***World***REMOVED*** world
 */
Solver.prototype.solve = function(dt,world)***REMOVED***
    throw new Error("Solver.solve should be implemented by subclasses!");
***REMOVED***;

var mockWorld = ***REMOVED***bodies:[]***REMOVED***;

/**
 * Solves all constraints in an island.
 * @method solveIsland
 * @param  ***REMOVED***Number***REMOVED*** dt
 * @param  ***REMOVED***Island***REMOVED*** island
 */
Solver.prototype.solveIsland = function(dt,island)***REMOVED***

    this.removeAllEquations();

    if(island.equations.length)***REMOVED***
        // Add equations to solver
        this.addEquations(island.equations);
        mockWorld.bodies.length = 0;
        island.getBodies(mockWorld.bodies);

        // Solve
        if(mockWorld.bodies.length)***REMOVED***
            this.solve(dt,mockWorld);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

/**
 * Sort all equations using the .equationSortFunction. Should be called by subclasses before solving.
 * @method sortEquations
 */
Solver.prototype.sortEquations = function()***REMOVED***
    if(this.equationSortFunction)***REMOVED***
        this.equations.sort(this.equationSortFunction);
    ***REMOVED***
***REMOVED***;

/**
 * Add an equation to be solved.
 *
 * @method addEquation
 * @param ***REMOVED***Equation***REMOVED*** eq
 */
Solver.prototype.addEquation = function(eq)***REMOVED***
    if(eq.enabled)***REMOVED***
        this.equations.push(eq);
    ***REMOVED***
***REMOVED***;

/**
 * Add equations. Same as .addEquation, but this time the argument is an array of Equations
 *
 * @method addEquations
 * @param ***REMOVED***Array***REMOVED*** eqs
 */
Solver.prototype.addEquations = function(eqs)***REMOVED***
    //Utils.appendArray(this.equations,eqs);
    for(var i=0, N=eqs.length; i!==N; i++)***REMOVED***
        var eq = eqs[i];
        if(eq.enabled)***REMOVED***
            this.equations.push(eq);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

/**
 * Remove an equation.
 *
 * @method removeEquation
 * @param ***REMOVED***Equation***REMOVED*** eq
 */
Solver.prototype.removeEquation = function(eq)***REMOVED***
    var i = this.equations.indexOf(eq);
    if(i !== -1)***REMOVED***
        this.equations.splice(i,1);
    ***REMOVED***
***REMOVED***;

/**
 * Remove all currently added equations.
 *
 * @method removeAllEquations
 */
Solver.prototype.removeAllEquations = function()***REMOVED***
    this.equations.length=0;
***REMOVED***;

Solver.GS = 1;
Solver.ISLAND = 2;

***REMOVED***,***REMOVED***"../events/EventEmitter":26,"../utils/Utils":57***REMOVED***],48:[function(_dereq_,module,exports)***REMOVED***
var ContactEquation = _dereq_('../equations/ContactEquation');
var Pool = _dereq_('./Pool');

module.exports = ContactEquationPool;

/**
 * @class
 */
function ContactEquationPool() ***REMOVED***
	Pool.apply(this, arguments);
***REMOVED***
ContactEquationPool.prototype = new Pool();
ContactEquationPool.prototype.constructor = ContactEquationPool;

/**
 * @method create
 * @return ***REMOVED***ContactEquation***REMOVED***
 */
ContactEquationPool.prototype.create = function () ***REMOVED***
	return new ContactEquation();
***REMOVED***;

/**
 * @method destroy
 * @param ***REMOVED***ContactEquation***REMOVED*** equation
 * @return ***REMOVED***ContactEquationPool***REMOVED***
 */
ContactEquationPool.prototype.destroy = function (equation) ***REMOVED***
	equation.bodyA = equation.bodyB = null;
	return this;
***REMOVED***;

***REMOVED***,***REMOVED***"../equations/ContactEquation":21,"./Pool":55***REMOVED***],49:[function(_dereq_,module,exports)***REMOVED***
var FrictionEquation = _dereq_('../equations/FrictionEquation');
var Pool = _dereq_('./Pool');

module.exports = FrictionEquationPool;

/**
 * @class
 */
function FrictionEquationPool() ***REMOVED***
	Pool.apply(this, arguments);
***REMOVED***
FrictionEquationPool.prototype = new Pool();
FrictionEquationPool.prototype.constructor = FrictionEquationPool;

/**
 * @method create
 * @return ***REMOVED***FrictionEquation***REMOVED***
 */
FrictionEquationPool.prototype.create = function () ***REMOVED***
	return new FrictionEquation();
***REMOVED***;

/**
 * @method destroy
 * @param ***REMOVED***FrictionEquation***REMOVED*** equation
 * @return ***REMOVED***FrictionEquationPool***REMOVED***
 */
FrictionEquationPool.prototype.destroy = function (equation) ***REMOVED***
	equation.bodyA = equation.bodyB = null;
	return this;
***REMOVED***;

***REMOVED***,***REMOVED***"../equations/FrictionEquation":23,"./Pool":55***REMOVED***],50:[function(_dereq_,module,exports)***REMOVED***
var IslandNode = _dereq_('../world/IslandNode');
var Pool = _dereq_('./Pool');

module.exports = IslandNodePool;

/**
 * @class
 */
function IslandNodePool() ***REMOVED***
	Pool.apply(this, arguments);
***REMOVED***
IslandNodePool.prototype = new Pool();
IslandNodePool.prototype.constructor = IslandNodePool;

/**
 * @method create
 * @return ***REMOVED***IslandNode***REMOVED***
 */
IslandNodePool.prototype.create = function () ***REMOVED***
	return new IslandNode();
***REMOVED***;

/**
 * @method destroy
 * @param ***REMOVED***IslandNode***REMOVED*** node
 * @return ***REMOVED***IslandNodePool***REMOVED***
 */
IslandNodePool.prototype.destroy = function (node) ***REMOVED***
	node.reset();
	return this;
***REMOVED***;

***REMOVED***,***REMOVED***"../world/IslandNode":60,"./Pool":55***REMOVED***],51:[function(_dereq_,module,exports)***REMOVED***
var Island = _dereq_('../world/Island');
var Pool = _dereq_('./Pool');

module.exports = IslandPool;

/**
 * @class
 */
function IslandPool() ***REMOVED***
	Pool.apply(this, arguments);
***REMOVED***
IslandPool.prototype = new Pool();
IslandPool.prototype.constructor = IslandPool;

/**
 * @method create
 * @return ***REMOVED***Island***REMOVED***
 */
IslandPool.prototype.create = function () ***REMOVED***
	return new Island();
***REMOVED***;

/**
 * @method destroy
 * @param ***REMOVED***Island***REMOVED*** island
 * @return ***REMOVED***IslandPool***REMOVED***
 */
IslandPool.prototype.destroy = function (island) ***REMOVED***
	island.reset();
	return this;
***REMOVED***;

***REMOVED***,***REMOVED***"../world/Island":58,"./Pool":55***REMOVED***],52:[function(_dereq_,module,exports)***REMOVED***
var TupleDictionary = _dereq_('./TupleDictionary');
var OverlapKeeperRecord = _dereq_('./OverlapKeeperRecord');
var OverlapKeeperRecordPool = _dereq_('./OverlapKeeperRecordPool');
var Utils = _dereq_('./Utils');

module.exports = OverlapKeeper;

/**
 * Keeps track of overlaps in the current state and the last step state.
 * @class OverlapKeeper
 * @constructor
 */
function OverlapKeeper() ***REMOVED***
    this.overlappingShapesLastState = new TupleDictionary();
    this.overlappingShapesCurrentState = new TupleDictionary();
    this.recordPool = new OverlapKeeperRecordPool(***REMOVED*** size: 16 ***REMOVED***);
    this.tmpDict = new TupleDictionary();
    this.tmpArray1 = [];
***REMOVED***

/**
 * Ticks one step forward in time. This will move the current overlap state to the "old" overlap state, and create a new one as current.
 * @method tick
 */
OverlapKeeper.prototype.tick = function() ***REMOVED***
    var last = this.overlappingShapesLastState;
    var current = this.overlappingShapesCurrentState;

    // Save old objects into pool
    var l = last.keys.length;
    while(l--)***REMOVED***
        var key = last.keys[l];
        var lastObject = last.getByKey(key);
        var currentObject = current.getByKey(key);
        if(lastObject)***REMOVED***
            // The record is only used in the "last" dict, and will be removed. We might as well pool it.
            this.recordPool.release(lastObject);
        ***REMOVED***
    ***REMOVED***

    // Clear last object
    last.reset();

    // Transfer from new object to old
    last.copy(current);

    // Clear current object
    current.reset();
***REMOVED***;

/**
 * @method setOverlapping
 * @param ***REMOVED***Body***REMOVED*** bodyA
 * @param ***REMOVED***Body***REMOVED*** shapeA
 * @param ***REMOVED***Body***REMOVED*** bodyB
 * @param ***REMOVED***Body***REMOVED*** shapeB
 */
OverlapKeeper.prototype.setOverlapping = function(bodyA, shapeA, bodyB, shapeB) ***REMOVED***
    var last = this.overlappingShapesLastState;
    var current = this.overlappingShapesCurrentState;

    // Store current contact state
    if(!current.get(shapeA.id, shapeB.id))***REMOVED***
        var data = this.recordPool.get();
        data.set(bodyA, shapeA, bodyB, shapeB);
        current.set(shapeA.id, shapeB.id, data);
    ***REMOVED***
***REMOVED***;

OverlapKeeper.prototype.getNewOverlaps = function(result)***REMOVED***
    return this.getDiff(this.overlappingShapesLastState, this.overlappingShapesCurrentState, result);
***REMOVED***;

OverlapKeeper.prototype.getEndOverlaps = function(result)***REMOVED***
    return this.getDiff(this.overlappingShapesCurrentState, this.overlappingShapesLastState, result);
***REMOVED***;

/**
 * Checks if two bodies are currently overlapping.
 * @method bodiesAreOverlapping
 * @param  ***REMOVED***Body***REMOVED*** bodyA
 * @param  ***REMOVED***Body***REMOVED*** bodyB
 * @return ***REMOVED***boolean***REMOVED***
 */
OverlapKeeper.prototype.bodiesAreOverlapping = function(bodyA, bodyB)***REMOVED***
    var current = this.overlappingShapesCurrentState;
    var l = current.keys.length;
    while(l--)***REMOVED***
        var key = current.keys[l];
        var data = current.data[key];
        if((data.bodyA === bodyA && data.bodyB === bodyB) || data.bodyA === bodyB && data.bodyB === bodyA)***REMOVED***
            return true;
        ***REMOVED***
    ***REMOVED***
    return false;
***REMOVED***;

OverlapKeeper.prototype.getDiff = function(dictA, dictB, result)***REMOVED***
    var result = result || [];
    var last = dictA;
    var current = dictB;

    result.length = 0;

    var l = current.keys.length;
    while(l--)***REMOVED***
        var key = current.keys[l];
        var data = current.data[key];

        if(!data)***REMOVED***
            throw new Error('Key '+key+' had no data!');
        ***REMOVED***

        var lastData = last.data[key];
        if(!lastData)***REMOVED***
            // Not overlapping in last state, but in current.
            result.push(data);
        ***REMOVED***
    ***REMOVED***

    return result;
***REMOVED***;

OverlapKeeper.prototype.isNewOverlap = function(shapeA, shapeB)***REMOVED***
    var idA = shapeA.id|0,
        idB = shapeB.id|0;
    var last = this.overlappingShapesLastState;
    var current = this.overlappingShapesCurrentState;
    // Not in last but in new
    return !!!last.get(idA, idB) && !!current.get(idA, idB);
***REMOVED***;

OverlapKeeper.prototype.getNewBodyOverlaps = function(result)***REMOVED***
    this.tmpArray1.length = 0;
    var overlaps = this.getNewOverlaps(this.tmpArray1);
    return this.getBodyDiff(overlaps, result);
***REMOVED***;

OverlapKeeper.prototype.getEndBodyOverlaps = function(result)***REMOVED***
    this.tmpArray1.length = 0;
    var overlaps = this.getEndOverlaps(this.tmpArray1);
    return this.getBodyDiff(overlaps, result);
***REMOVED***;

OverlapKeeper.prototype.getBodyDiff = function(overlaps, result)***REMOVED***
    result = result || [];
    var accumulator = this.tmpDict;

    var l = overlaps.length;

    while(l--)***REMOVED***
        var data = overlaps[l];

        // Since we use body id's for the accumulator, these will be a subset of the original one
        accumulator.set(data.bodyA.id|0, data.bodyB.id|0, data);
    ***REMOVED***

    l = accumulator.keys.length;
    while(l--)***REMOVED***
        var data = accumulator.getByKey(accumulator.keys[l]);
        if(data)***REMOVED***
            result.push(data.bodyA, data.bodyB);
        ***REMOVED***
    ***REMOVED***

    accumulator.reset();

    return result;
***REMOVED***;

***REMOVED***,***REMOVED***"./OverlapKeeperRecord":53,"./OverlapKeeperRecordPool":54,"./TupleDictionary":56,"./Utils":57***REMOVED***],53:[function(_dereq_,module,exports)***REMOVED***
module.exports = OverlapKeeperRecord;

/**
 * Overlap data container for the OverlapKeeper
 * @class OverlapKeeperRecord
 * @constructor
 * @param ***REMOVED***Body***REMOVED*** bodyA
 * @param ***REMOVED***Shape***REMOVED*** shapeA
 * @param ***REMOVED***Body***REMOVED*** bodyB
 * @param ***REMOVED***Shape***REMOVED*** shapeB
 */
function OverlapKeeperRecord(bodyA, shapeA, bodyB, shapeB)***REMOVED***
    /**
     * @property ***REMOVED***Shape***REMOVED*** shapeA
     */
    this.shapeA = shapeA;
    /**
     * @property ***REMOVED***Shape***REMOVED*** shapeB
     */
    this.shapeB = shapeB;
    /**
     * @property ***REMOVED***Body***REMOVED*** bodyA
     */
    this.bodyA = bodyA;
    /**
     * @property ***REMOVED***Body***REMOVED*** bodyB
     */
    this.bodyB = bodyB;
***REMOVED***

/**
 * Set the data for the record
 * @method set
 * @param ***REMOVED***Body***REMOVED*** bodyA
 * @param ***REMOVED***Shape***REMOVED*** shapeA
 * @param ***REMOVED***Body***REMOVED*** bodyB
 * @param ***REMOVED***Shape***REMOVED*** shapeB
 */
OverlapKeeperRecord.prototype.set = function(bodyA, shapeA, bodyB, shapeB)***REMOVED***
    OverlapKeeperRecord.call(this, bodyA, shapeA, bodyB, shapeB);
***REMOVED***;

***REMOVED***,***REMOVED******REMOVED***],54:[function(_dereq_,module,exports)***REMOVED***
var OverlapKeeperRecord = _dereq_('./OverlapKeeperRecord');
var Pool = _dereq_('./Pool');

module.exports = OverlapKeeperRecordPool;

/**
 * @class
 */
function OverlapKeeperRecordPool() ***REMOVED***
	Pool.apply(this, arguments);
***REMOVED***
OverlapKeeperRecordPool.prototype = new Pool();
OverlapKeeperRecordPool.prototype.constructor = OverlapKeeperRecordPool;

/**
 * @method create
 * @return ***REMOVED***OverlapKeeperRecord***REMOVED***
 */
OverlapKeeperRecordPool.prototype.create = function () ***REMOVED***
	return new OverlapKeeperRecord();
***REMOVED***;

/**
 * @method destroy
 * @param ***REMOVED***OverlapKeeperRecord***REMOVED*** record
 * @return ***REMOVED***OverlapKeeperRecordPool***REMOVED***
 */
OverlapKeeperRecordPool.prototype.destroy = function (record) ***REMOVED***
	record.bodyA = record.bodyB = record.shapeA = record.shapeB = null;
	return this;
***REMOVED***;

***REMOVED***,***REMOVED***"./OverlapKeeperRecord":53,"./Pool":55***REMOVED***],55:[function(_dereq_,module,exports)***REMOVED***
module.exports = Pool;

/**
 * @class Object pooling utility.
 */
function Pool(options) ***REMOVED***
	options = options || ***REMOVED******REMOVED***;

	/**
	 * @property ***REMOVED***Array***REMOVED*** objects
	 * @type ***REMOVED***Array***REMOVED***
	 */
	this.objects = [];

	if(options.size !== undefined)***REMOVED***
		this.resize(options.size);
	***REMOVED***
***REMOVED***

/**
 * @method resize
 * @param ***REMOVED***number***REMOVED*** size
 * @return ***REMOVED***Pool***REMOVED*** Self, for chaining
 */
Pool.prototype.resize = function (size) ***REMOVED***
	var objects = this.objects;

	while (objects.length > size) ***REMOVED***
		objects.pop();
	***REMOVED***

	while (objects.length < size) ***REMOVED***
		objects.push(this.create());
	***REMOVED***

	return this;
***REMOVED***;

/**
 * Get an object from the pool or create a new instance.
 * @method get
 * @return ***REMOVED***Object***REMOVED***
 */
Pool.prototype.get = function () ***REMOVED***
	var objects = this.objects;
	return objects.length ? objects.pop() : this.create();
***REMOVED***;

/**
 * Clean up and put the object back into the pool for later use.
 * @method release
 * @param ***REMOVED***Object***REMOVED*** object
 * @return ***REMOVED***Pool***REMOVED*** Self for chaining
 */
Pool.prototype.release = function (object) ***REMOVED***
	this.destroy(object);
	this.objects.push(object);
	return this;
***REMOVED***;

***REMOVED***,***REMOVED******REMOVED***],56:[function(_dereq_,module,exports)***REMOVED***
var Utils = _dereq_('./Utils');

module.exports = TupleDictionary;

/**
 * @class TupleDictionary
 * @constructor
 */
function TupleDictionary() ***REMOVED***

    /**
     * The data storage
     * @property data
     * @type ***REMOVED***Object***REMOVED***
     */
    this.data = ***REMOVED******REMOVED***;

    /**
     * Keys that are currently used.
     * @property ***REMOVED***Array***REMOVED*** keys
     */
    this.keys = [];
***REMOVED***

/**
 * Generate a key given two integers
 * @method getKey
 * @param  ***REMOVED***number***REMOVED*** i
 * @param  ***REMOVED***number***REMOVED*** j
 * @return ***REMOVED***string***REMOVED***
 */
TupleDictionary.prototype.getKey = function(id1, id2) ***REMOVED***
    id1 = id1|0;
    id2 = id2|0;

    if ( (id1|0) === (id2|0) )***REMOVED***
        return -1;
    ***REMOVED***

    // valid for values < 2^16
    return ((id1|0) > (id2|0) ?
        (id1 << 16) | (id2 & 0xFFFF) :
        (id2 << 16) | (id1 & 0xFFFF))|0
        ;
***REMOVED***;

/**
 * @method getByKey
 * @param  ***REMOVED***Number***REMOVED*** key
 * @return ***REMOVED***Object***REMOVED***
 */
TupleDictionary.prototype.getByKey = function(key) ***REMOVED***
    key = key|0;
    return this.data[key];
***REMOVED***;

/**
 * @method get
 * @param  ***REMOVED***Number***REMOVED*** i
 * @param  ***REMOVED***Number***REMOVED*** j
 * @return ***REMOVED***Number***REMOVED***
 */
TupleDictionary.prototype.get = function(i, j) ***REMOVED***
    return this.data[this.getKey(i, j)];
***REMOVED***;

/**
 * Set a value.
 * @method set
 * @param  ***REMOVED***Number***REMOVED*** i
 * @param  ***REMOVED***Number***REMOVED*** j
 * @param ***REMOVED***Number***REMOVED*** value
 */
TupleDictionary.prototype.set = function(i, j, value) ***REMOVED***
    if(!value)***REMOVED***
        throw new Error("No data!");
    ***REMOVED***

    var key = this.getKey(i, j);

    // Check if key already exists
    if(!this.data[key])***REMOVED***
        this.keys.push(key);
    ***REMOVED***

    this.data[key] = value;

    return key;
***REMOVED***;

/**
 * Remove all data.
 * @method reset
 */
TupleDictionary.prototype.reset = function() ***REMOVED***
    var data = this.data,
        keys = this.keys;

    var l = keys.length;
    while(l--) ***REMOVED***
        delete data[keys[l]];
    ***REMOVED***

    keys.length = 0;
***REMOVED***;

/**
 * Copy another TupleDictionary. Note that all data in this dictionary will be removed.
 * @method copy
 * @param ***REMOVED***TupleDictionary***REMOVED*** dict The TupleDictionary to copy into this one.
 */
TupleDictionary.prototype.copy = function(dict) ***REMOVED***
    this.reset();
    Utils.appendArray(this.keys, dict.keys);
    var l = dict.keys.length;
    while(l--)***REMOVED***
        var key = dict.keys[l];
        this.data[key] = dict.data[key];
    ***REMOVED***
***REMOVED***;

***REMOVED***,***REMOVED***"./Utils":57***REMOVED***],57:[function(_dereq_,module,exports)***REMOVED***
/* global P2_ARRAY_TYPE */

module.exports = Utils;

/**
 * Misc utility functions
 * @class Utils
 * @constructor
 */
function Utils()***REMOVED******REMOVED***

/**
 * Append the values in array b to the array a. See <a href="http://stackoverflow.com/questions/1374126/how-to-append-an-array-to-an-existing-javascript-array/1374131#1374131">this</a> for an explanation.
 * @method appendArray
 * @static
 * @param  ***REMOVED***Array***REMOVED*** a
 * @param  ***REMOVED***Array***REMOVED*** b
 */
Utils.appendArray = function(a,b)***REMOVED***
    if (b.length < 150000) ***REMOVED***
        a.push.apply(a, b);
    ***REMOVED*** else ***REMOVED***
        for (var i = 0, len = b.length; i !== len; ++i) ***REMOVED***
            a.push(b[i]);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

/**
 * Garbage free Array.splice(). Does not allocate a new array.
 * @method splice
 * @static
 * @param  ***REMOVED***Array***REMOVED*** array
 * @param  ***REMOVED***Number***REMOVED*** index
 * @param  ***REMOVED***Number***REMOVED*** howmany
 */
Utils.splice = function(array,index,howmany)***REMOVED***
    howmany = howmany || 1;
    for (var i=index, len=array.length-howmany; i < len; i++)***REMOVED***
        array[i] = array[i + howmany];
    ***REMOVED***
    array.length = len;
***REMOVED***;

/**
 * The array type to use for internal numeric computations throughout the library. Float32Array is used if it is available, but falls back on Array. If you want to set array type manually, inject it via the global variable P2_ARRAY_TYPE. See example below.
 * @static
 * @property ***REMOVED***function***REMOVED*** ARRAY_TYPE
 * @example
 *     <script>
 *         <!-- Inject your preferred array type before loading p2.js -->
 *         P2_ARRAY_TYPE = Array;
 *     </script>
 *     <script src="p2.js"></script>
 */
if(typeof P2_ARRAY_TYPE !== 'undefined') ***REMOVED***
    Utils.ARRAY_TYPE = P2_ARRAY_TYPE;
***REMOVED*** else if (typeof Float32Array !== 'undefined')***REMOVED***
    Utils.ARRAY_TYPE = Float32Array;
***REMOVED*** else ***REMOVED***
    Utils.ARRAY_TYPE = Array;
***REMOVED***

/**
 * Extend an object with the properties of another
 * @static
 * @method extend
 * @param  ***REMOVED***object***REMOVED*** a
 * @param  ***REMOVED***object***REMOVED*** b
 */
Utils.extend = function(a,b)***REMOVED***
    for(var key in b)***REMOVED***
        a[key] = b[key];
    ***REMOVED***
***REMOVED***;

/**
 * Extend an options object with default values.
 * @static
 * @method defaults
 * @param  ***REMOVED***object***REMOVED*** options The options object. May be falsy: in this case, a new object is created and returned.
 * @param  ***REMOVED***object***REMOVED*** defaults An object containing default values.
 * @return ***REMOVED***object***REMOVED*** The modified options object.
 */
Utils.defaults = function(options, defaults)***REMOVED***
    options = options || ***REMOVED******REMOVED***;
    for(var key in defaults)***REMOVED***
        if(!(key in options))***REMOVED***
            options[key] = defaults[key];
        ***REMOVED***
    ***REMOVED***
    return options;
***REMOVED***;

***REMOVED***,***REMOVED******REMOVED***],58:[function(_dereq_,module,exports)***REMOVED***
var Body = _dereq_('../objects/Body');

module.exports = Island;

/**
 * An island of bodies connected with equations.
 * @class Island
 * @constructor
 */
function Island()***REMOVED***

    /**
     * Current equations in this island.
     * @property equations
     * @type ***REMOVED***Array***REMOVED***
     */
    this.equations = [];

    /**
     * Current bodies in this island.
     * @property bodies
     * @type ***REMOVED***Array***REMOVED***
     */
    this.bodies = [];
***REMOVED***

/**
 * Clean this island from bodies and equations.
 * @method reset
 */
Island.prototype.reset = function()***REMOVED***
    this.equations.length = this.bodies.length = 0;
***REMOVED***;

var bodyIds = [];

/**
 * Get all unique bodies in this island.
 * @method getBodies
 * @return ***REMOVED***Array***REMOVED*** An array of Body
 */
Island.prototype.getBodies = function(result)***REMOVED***
    var bodies = result || [],
        eqs = this.equations;
    bodyIds.length = 0;
    for(var i=0; i!==eqs.length; i++)***REMOVED***
        var eq = eqs[i];
        if(bodyIds.indexOf(eq.bodyA.id)===-1)***REMOVED***
            bodies.push(eq.bodyA);
            bodyIds.push(eq.bodyA.id);
        ***REMOVED***
        if(bodyIds.indexOf(eq.bodyB.id)===-1)***REMOVED***
            bodies.push(eq.bodyB);
            bodyIds.push(eq.bodyB.id);
        ***REMOVED***
    ***REMOVED***
    return bodies;
***REMOVED***;

/**
 * Check if the entire island wants to sleep.
 * @method wantsToSleep
 * @return ***REMOVED***Boolean***REMOVED***
 */
Island.prototype.wantsToSleep = function()***REMOVED***
    for(var i=0; i<this.bodies.length; i++)***REMOVED***
        var b = this.bodies[i];
        if(b.type === Body.DYNAMIC && !b.wantsToSleep)***REMOVED***
            return false;
        ***REMOVED***
    ***REMOVED***
    return true;
***REMOVED***;

/**
 * Make all bodies in the island sleep.
 * @method sleep
 */
Island.prototype.sleep = function()***REMOVED***
    for(var i=0; i<this.bodies.length; i++)***REMOVED***
        var b = this.bodies[i];
        b.sleep();
    ***REMOVED***
    return true;
***REMOVED***;

***REMOVED***,***REMOVED***"../objects/Body":31***REMOVED***],59:[function(_dereq_,module,exports)***REMOVED***
var vec2 = _dereq_('../math/vec2')
,   Island = _dereq_('./Island')
,   IslandNode = _dereq_('./IslandNode')
,   IslandNodePool = _dereq_('./../utils/IslandNodePool')
,   IslandPool = _dereq_('./../utils/IslandPool')
,   Body = _dereq_('../objects/Body');

module.exports = IslandManager;

/**
 * Splits the system of bodies and equations into independent islands
 *
 * @class IslandManager
 * @constructor
 * @param ***REMOVED***Object***REMOVED*** [options]
 * @extends Solver
 */
function IslandManager(options)***REMOVED***

    /**
     * @property nodePool
     * @type ***REMOVED***IslandNodePool***REMOVED***
     */
    this.nodePool = new IslandNodePool(***REMOVED*** size: 16 ***REMOVED***);

    /**
     * @property islandPool
     * @type ***REMOVED***IslandPool***REMOVED***
     */
    this.islandPool = new IslandPool(***REMOVED*** size: 8 ***REMOVED***);

    /**
     * The equations to split. Manually fill this array before running .split().
     * @property ***REMOVED***Array***REMOVED*** equations
     */
    this.equations = [];

    /**
     * The resulting ***REMOVED******REMOVED***#crossLink "Island"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***s.
     * @property ***REMOVED***Array***REMOVED*** islands
     */
    this.islands = [];

    /**
     * The resulting graph nodes.
     * @property ***REMOVED***Array***REMOVED*** nodes
     */
    this.nodes = [];

    /**
     * The node queue, used when traversing the graph of nodes.
     * @private
     * @property ***REMOVED***Array***REMOVED*** queue
     */
    this.queue = [];
***REMOVED***

/**
 * Get an unvisited node from a list of nodes.
 * @static
 * @method getUnvisitedNode
 * @param  ***REMOVED***Array***REMOVED*** nodes
 * @return ***REMOVED***IslandNode|boolean***REMOVED*** The node if found, else false.
 */
IslandManager.getUnvisitedNode = function(nodes)***REMOVED***
    var Nnodes = nodes.length;
    for(var i=0; i!==Nnodes; i++)***REMOVED***
        var node = nodes[i];
        if(!node.visited && node.body.type === Body.DYNAMIC)***REMOVED***
            return node;
        ***REMOVED***
    ***REMOVED***
    return false;
***REMOVED***;

/**
 * Visit a node.
 * @method visit
 * @param  ***REMOVED***IslandNode***REMOVED*** node
 * @param  ***REMOVED***Array***REMOVED*** bds
 * @param  ***REMOVED***Array***REMOVED*** eqs
 */
IslandManager.prototype.visit = function (node,bds,eqs)***REMOVED***
    bds.push(node.body);
    var Neqs = node.equations.length;
    for(var i=0; i!==Neqs; i++)***REMOVED***
        var eq = node.equations[i];
        if(eqs.indexOf(eq) === -1)***REMOVED*** // Already added?
            eqs.push(eq);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

/**
 * Runs the search algorithm, starting at a root node. The resulting bodies and equations will be stored in the provided arrays.
 * @method bfs
 * @param  ***REMOVED***IslandNode***REMOVED*** root The node to start from
 * @param  ***REMOVED***Array***REMOVED*** bds  An array to append resulting Bodies to.
 * @param  ***REMOVED***Array***REMOVED*** eqs  An array to append resulting Equations to.
 */
IslandManager.prototype.bfs = function(root,bds,eqs)***REMOVED***

    // Reset the visit queue
    var queue = this.queue;
    queue.length = 0;

    // Add root node to queue
    queue.push(root);
    root.visited = true;
    this.visit(root,bds,eqs);

    // Process all queued nodes
    while(queue.length) ***REMOVED***

        // Get next node in the queue
        var node = queue.pop();

        // Visit unvisited neighboring nodes
        var child;
        while((child = IslandManager.getUnvisitedNode(node.neighbors))) ***REMOVED***
            child.visited = true;
            this.visit(child,bds,eqs);

            // Only visit the children of this node if it's dynamic
            if(child.body.type === Body.DYNAMIC)***REMOVED***
                queue.push(child);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

/**
 * Split the world into independent islands. The result is stored in .islands.
 * @method split
 * @param  ***REMOVED***World***REMOVED*** world
 * @return ***REMOVED***Array***REMOVED*** The generated islands
 */
IslandManager.prototype.split = function(world)***REMOVED***
    var bodies = world.bodies,
        nodes = this.nodes,
        equations = this.equations;

    // Move old nodes to the node pool
    while(nodes.length)***REMOVED***
        this.nodePool.release(nodes.pop());
    ***REMOVED***

    // Create needed nodes, reuse if possible
    for(var i=0; i!==bodies.length; i++)***REMOVED***
        var node = this.nodePool.get();
        node.body = bodies[i];
        nodes.push(node);
        // if(this.nodePool.length)***REMOVED***
        //     var node = this.nodePool.pop();
        //     node.reset();
        //     node.body = bodies[i];
        //     nodes.push(node);
        // ***REMOVED*** else ***REMOVED***
        //     nodes.push(new IslandNode(bodies[i]));
        // ***REMOVED***
    ***REMOVED***

    // Add connectivity data. Each equation connects 2 bodies.
    for(var k=0; k!==equations.length; k++)***REMOVED***
        var eq=equations[k],
            i=bodies.indexOf(eq.bodyA),
            j=bodies.indexOf(eq.bodyB),
            ni=nodes[i],
            nj=nodes[j];
        ni.neighbors.push(nj);
        nj.neighbors.push(ni);
        ni.equations.push(eq);
        nj.equations.push(eq);
    ***REMOVED***

    // Move old islands to the island pool
    var islands = this.islands;
    for(var i=0; i<islands.length; i++)***REMOVED***
        this.islandPool.release(islands[i]);
    ***REMOVED***
    islands.length = 0;

    // Get islands
    var child;
    while((child = IslandManager.getUnvisitedNode(nodes)))***REMOVED***

        // Create new island
        var island = this.islandPool.get();

        // Get all equations and bodies in this island
        this.bfs(child, island.bodies, island.equations);

        islands.push(island);
    ***REMOVED***

    return islands;
***REMOVED***;

***REMOVED***,***REMOVED***"../math/vec2":30,"../objects/Body":31,"./../utils/IslandNodePool":50,"./../utils/IslandPool":51,"./Island":58,"./IslandNode":60***REMOVED***],60:[function(_dereq_,module,exports)***REMOVED***
module.exports = IslandNode;

/**
 * Holds a body and keeps track of some additional properties needed for graph traversal.
 * @class IslandNode
 * @constructor
 * @param ***REMOVED***Body***REMOVED*** body
 */
function IslandNode(body)***REMOVED***

	/**
	 * The body that is contained in this node.
	 * @property ***REMOVED***Body***REMOVED*** body
	 */
    this.body = body;

    /**
     * Neighboring IslandNodes
     * @property ***REMOVED***Array***REMOVED*** neighbors
     */
    this.neighbors = [];

    /**
     * Equations connected to this node.
     * @property ***REMOVED***Array***REMOVED*** equations
     */
    this.equations = [];

    /**
     * If this node was visiting during the graph traversal.
     * @property visited
     * @type ***REMOVED***Boolean***REMOVED***
     */
    this.visited = false;
***REMOVED***

/**
 * Clean this node from bodies and equations.
 * @method reset
 */
IslandNode.prototype.reset = function()***REMOVED***
    this.equations.length = 0;
    this.neighbors.length = 0;
    this.visited = false;
    this.body = null;
***REMOVED***;

***REMOVED***,***REMOVED******REMOVED***],61:[function(_dereq_,module,exports)***REMOVED***
var  GSSolver = _dereq_('../solver/GSSolver')
,    Solver = _dereq_('../solver/Solver')
,    Ray = _dereq_('../collision/Ray')
,    vec2 = _dereq_('../math/vec2')
,    Circle = _dereq_('../shapes/Circle')
,    Convex = _dereq_('../shapes/Convex')
,    Line = _dereq_('../shapes/Line')
,    Plane = _dereq_('../shapes/Plane')
,    Capsule = _dereq_('../shapes/Capsule')
,    Particle = _dereq_('../shapes/Particle')
,    EventEmitter = _dereq_('../events/EventEmitter')
,    Body = _dereq_('../objects/Body')
,    Shape = _dereq_('../shapes/Shape')
,    LinearSpring = _dereq_('../objects/LinearSpring')
,    Material = _dereq_('../material/Material')
,    ContactMaterial = _dereq_('../material/ContactMaterial')
,    DistanceConstraint = _dereq_('../constraints/DistanceConstraint')
,    Constraint = _dereq_('../constraints/Constraint')
,    LockConstraint = _dereq_('../constraints/LockConstraint')
,    RevoluteConstraint = _dereq_('../constraints/RevoluteConstraint')
,    PrismaticConstraint = _dereq_('../constraints/PrismaticConstraint')
,    GearConstraint = _dereq_('../constraints/GearConstraint')
,    pkg = _dereq_('../../package.json')
,    Broadphase = _dereq_('../collision/Broadphase')
,    AABB = _dereq_('../collision/AABB')
,    SAPBroadphase = _dereq_('../collision/SAPBroadphase')
,    Narrowphase = _dereq_('../collision/Narrowphase')
,    Utils = _dereq_('../utils/Utils')
,    OverlapKeeper = _dereq_('../utils/OverlapKeeper')
,    IslandManager = _dereq_('./IslandManager')
,    RotationalSpring = _dereq_('../objects/RotationalSpring');

module.exports = World;

/**
 * The dynamics world, where all bodies and constraints live.
 *
 * @class World
 * @constructor
 * @param ***REMOVED***Object***REMOVED*** [options]
 * @param ***REMOVED***Solver***REMOVED*** [options.solver] Defaults to GSSolver.
 * @param ***REMOVED***Array***REMOVED*** [options.gravity] Defaults to y=-9.78.
 * @param ***REMOVED***Broadphase***REMOVED*** [options.broadphase] Defaults to SAPBroadphase
 * @param ***REMOVED***Boolean***REMOVED*** [options.islandSplit=true]
 * @extends EventEmitter
 *
 * @example
 *     var world = new World(***REMOVED***
 *         gravity: [0, -10],
 *         broadphase: new SAPBroadphase()
 *     ***REMOVED***);
 *     world.addBody(new Body());
 */
function World(options)***REMOVED***
    EventEmitter.apply(this);

    options = options || ***REMOVED******REMOVED***;

    /**
     * All springs in the world. To add a spring to the world, use ***REMOVED******REMOVED***#crossLink "World/addSpring:method"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***.
     *
     * @property springs
     * @type ***REMOVED***Array***REMOVED***
     */
    this.springs = [];

    /**
     * All bodies in the world. To add a body to the world, use ***REMOVED******REMOVED***#crossLink "World/addBody:method"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***.
     * @property ***REMOVED***Array***REMOVED*** bodies
     */
    this.bodies = [];

    /**
     * Disabled body collision pairs. See ***REMOVED******REMOVED***#crossLink "World/disableBodyCollision:method"***REMOVED******REMOVED***.
     * @private
     * @property ***REMOVED***Array***REMOVED*** disabledBodyCollisionPairs
     */
    this.disabledBodyCollisionPairs = [];

    /**
     * The solver used to satisfy constraints and contacts. Default is ***REMOVED******REMOVED***#crossLink "GSSolver"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***.
     * @property ***REMOVED***Solver***REMOVED*** solver
     */
    this.solver = options.solver || new GSSolver();

    /**
     * The narrowphase to use to generate contacts.
     *
     * @property narrowphase
     * @type ***REMOVED***Narrowphase***REMOVED***
     */
    this.narrowphase = new Narrowphase(this);

    /**
     * The island manager of this world.
     * @property ***REMOVED***IslandManager***REMOVED*** islandManager
     */
    this.islandManager = new IslandManager();

    /**
     * Gravity in the world. This is applied on all bodies in the beginning of each step().
     *
     * @property gravity
     * @type ***REMOVED***Array***REMOVED***
     */
    this.gravity = vec2.fromValues(0, -9.78);
    if(options.gravity)***REMOVED***
        vec2.copy(this.gravity, options.gravity);
    ***REMOVED***

    /**
     * Gravity to use when approximating the friction max force (mu*mass*gravity).
     * @property ***REMOVED***Number***REMOVED*** frictionGravity
     */
    this.frictionGravity = vec2.length(this.gravity) || 10;

    /**
     * Set to true if you want .frictionGravity to be automatically set to the length of .gravity.
     * @property ***REMOVED***Boolean***REMOVED*** useWorldGravityAsFrictionGravity
     * @default true
     */
    this.useWorldGravityAsFrictionGravity = true;

    /**
     * If the length of .gravity is zero, and .useWorldGravityAsFrictionGravity=true, then switch to using .frictionGravity for friction instead. This fallback is useful for gravityless games.
     * @property ***REMOVED***Boolean***REMOVED*** useFrictionGravityOnZeroGravity
     * @default true
     */
    this.useFrictionGravityOnZeroGravity = true;

    /**
     * The broadphase algorithm to use.
     *
     * @property broadphase
     * @type ***REMOVED***Broadphase***REMOVED***
     */
    this.broadphase = options.broadphase || new SAPBroadphase();
    this.broadphase.setWorld(this);

    /**
     * User-added constraints.
     *
     * @property constraints
     * @type ***REMOVED***Array***REMOVED***
     */
    this.constraints = [];

    /**
     * Dummy default material in the world, used in .defaultContactMaterial
     * @property ***REMOVED***Material***REMOVED*** defaultMaterial
     */
    this.defaultMaterial = new Material();

    /**
     * The default contact material to use, if no contact material was set for the colliding materials.
     * @property ***REMOVED***ContactMaterial***REMOVED*** defaultContactMaterial
     */
    this.defaultContactMaterial = new ContactMaterial(this.defaultMaterial,this.defaultMaterial);

    /**
     * For keeping track of what time step size we used last step
     * @property lastTimeStep
     * @type ***REMOVED***Number***REMOVED***
     */
    this.lastTimeStep = 1/60;

    /**
     * Enable to automatically apply spring forces each step.
     * @property applySpringForces
     * @type ***REMOVED***Boolean***REMOVED***
     * @default true
     */
    this.applySpringForces = true;

    /**
     * Enable to automatically apply body damping each step.
     * @property applyDamping
     * @type ***REMOVED***Boolean***REMOVED***
     * @default true
     */
    this.applyDamping = true;

    /**
     * Enable to automatically apply gravity each step.
     * @property applyGravity
     * @type ***REMOVED***Boolean***REMOVED***
     * @default true
     */
    this.applyGravity = true;

    /**
     * Enable/disable constraint solving in each step.
     * @property solveConstraints
     * @type ***REMOVED***Boolean***REMOVED***
     * @default true
     */
    this.solveConstraints = true;

    /**
     * The ContactMaterials added to the World.
     * @property contactMaterials
     * @type ***REMOVED***Array***REMOVED***
     */
    this.contactMaterials = [];

    /**
     * World time.
     * @property time
     * @type ***REMOVED***Number***REMOVED***
     */
    this.time = 0.0;
    this.accumulator = 0;

    /**
     * Is true during step().
     * @property ***REMOVED***Boolean***REMOVED*** stepping
     */
    this.stepping = false;

    /**
     * Bodies that are scheduled to be removed at the end of the step.
     * @property ***REMOVED***Array***REMOVED*** bodiesToBeRemoved
     * @private
     */
    this.bodiesToBeRemoved = [];

    /**
     * Whether to enable island splitting. Island splitting can be an advantage for both precision and performance. See ***REMOVED******REMOVED***#crossLink "IslandManager"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***.
     * @property ***REMOVED***Boolean***REMOVED*** islandSplit
     * @default true
     */
    this.islandSplit = typeof(options.islandSplit)!=="undefined" ? !!options.islandSplit : true;

    /**
     * Set to true if you want to the world to emit the "impact" event. Turning this off could improve performance.
     * @property emitImpactEvent
     * @type ***REMOVED***Boolean***REMOVED***
     * @default true
     */
    this.emitImpactEvent = true;

    // Id counters
    this._constraintIdCounter = 0;
    this._bodyIdCounter = 0;

    /**
     * Fired after the step().
     * @event postStep
     */
    this.postStepEvent = ***REMOVED***
        type : "postStep"
    ***REMOVED***;

    /**
     * Fired when a body is added to the world.
     * @event addBody
     * @param ***REMOVED***Body***REMOVED*** body
     */
    this.addBodyEvent = ***REMOVED***
        type : "addBody",
        body : null
    ***REMOVED***;

    /**
     * Fired when a body is removed from the world.
     * @event removeBody
     * @param ***REMOVED***Body***REMOVED*** body
     */
    this.removeBodyEvent = ***REMOVED***
        type : "removeBody",
        body : null
    ***REMOVED***;

    /**
     * Fired when a spring is added to the world.
     * @event addSpring
     * @param ***REMOVED***Spring***REMOVED*** spring
     */
    this.addSpringEvent = ***REMOVED***
        type : "addSpring",
        spring : null
    ***REMOVED***;

    /**
     * Fired when a first contact is created between two bodies. This event is fired after the step has been done.
     * @event impact
     * @param ***REMOVED***Body***REMOVED*** bodyA
     * @param ***REMOVED***Body***REMOVED*** bodyB
     */
    this.impactEvent = ***REMOVED***
        type: "impact",
        bodyA : null,
        bodyB : null,
        shapeA : null,
        shapeB : null,
        contactEquation : null
    ***REMOVED***;

    /**
     * Fired after the Broadphase has collected collision pairs in the world.
     * Inside the event handler, you can modify the pairs array as you like, to
     * prevent collisions between objects that you don't want.
     * @event postBroadphase
     * @param ***REMOVED***Array***REMOVED*** pairs An array of collision pairs. If this array is [body1,body2,body3,body4], then the body pairs 1,2 and 3,4 would advance to narrowphase.
     */
    this.postBroadphaseEvent = ***REMOVED***
        type: "postBroadphase",
        pairs: null
    ***REMOVED***;

    /**
     * How to deactivate bodies during simulation. Possible modes are: ***REMOVED******REMOVED***#crossLink "World/NO_SLEEPING:property"***REMOVED******REMOVED***World.NO_SLEEPING***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***, ***REMOVED******REMOVED***#crossLink "World/BODY_SLEEPING:property"***REMOVED******REMOVED***World.BODY_SLEEPING***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** and ***REMOVED******REMOVED***#crossLink "World/ISLAND_SLEEPING:property"***REMOVED******REMOVED***World.ISLAND_SLEEPING***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***.
     * If sleeping is enabled, you might need to ***REMOVED******REMOVED***#crossLink "Body/wakeUp:method"***REMOVED******REMOVED***wake up***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** the bodies if they fall asleep when they shouldn't. If you want to enable sleeping in the world, but want to disable it for a particular body, see ***REMOVED******REMOVED***#crossLink "Body/allowSleep:property"***REMOVED******REMOVED***Body.allowSleep***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***.
     * @property sleepMode
     * @type ***REMOVED***number***REMOVED***
     * @default World.NO_SLEEPING
     */
    this.sleepMode = World.NO_SLEEPING;

    /**
     * Fired when two shapes starts start to overlap. Fired in the narrowphase, during step.
     * @event beginContact
     * @param ***REMOVED***Shape***REMOVED*** shapeA
     * @param ***REMOVED***Shape***REMOVED*** shapeB
     * @param ***REMOVED***Body***REMOVED***  bodyA
     * @param ***REMOVED***Body***REMOVED***  bodyB
     * @param ***REMOVED***Array***REMOVED*** contactEquations
     */
    this.beginContactEvent = ***REMOVED***
        type: "beginContact",
        shapeA: null,
        shapeB: null,
        bodyA: null,
        bodyB: null,
        contactEquations: []
    ***REMOVED***;

    /**
     * Fired when two shapes stop overlapping, after the narrowphase (during step).
     * @event endContact
     * @param ***REMOVED***Shape***REMOVED*** shapeA
     * @param ***REMOVED***Shape***REMOVED*** shapeB
     * @param ***REMOVED***Body***REMOVED***  bodyA
     * @param ***REMOVED***Body***REMOVED***  bodyB
     */
    this.endContactEvent = ***REMOVED***
        type: "endContact",
        shapeA: null,
        shapeB: null,
        bodyA: null,
        bodyB: null
    ***REMOVED***;

    /**
     * Fired just before equations are added to the solver to be solved. Can be used to control what equations goes into the solver.
     * @event preSolve
     * @param ***REMOVED***Array***REMOVED*** contactEquations  An array of contacts to be solved.
     * @param ***REMOVED***Array***REMOVED*** frictionEquations An array of friction equations to be solved.
     */
    this.preSolveEvent = ***REMOVED***
        type: "preSolve",
        contactEquations: null,
        frictionEquations: null
    ***REMOVED***;

    // For keeping track of overlapping shapes
    this.overlappingShapesLastState = ***REMOVED*** keys:[] ***REMOVED***;
    this.overlappingShapesCurrentState = ***REMOVED*** keys:[] ***REMOVED***;

    /**
     * @property ***REMOVED***OverlapKeeper***REMOVED*** overlapKeeper
     */
    this.overlapKeeper = new OverlapKeeper();
***REMOVED***
World.prototype = new Object(EventEmitter.prototype);
World.prototype.constructor = World;

/**
 * Never deactivate bodies.
 * @static
 * @property ***REMOVED***number***REMOVED*** NO_SLEEPING
 */
World.NO_SLEEPING = 1;

/**
 * Deactivate individual bodies if they are sleepy.
 * @static
 * @property ***REMOVED***number***REMOVED*** BODY_SLEEPING
 */
World.BODY_SLEEPING = 2;

/**
 * Deactivates bodies that are in contact, if all of them are sleepy. Note that you must enable ***REMOVED******REMOVED***#crossLink "World/islandSplit:property"***REMOVED******REMOVED***.islandSplit***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** for this to work.
 * @static
 * @property ***REMOVED***number***REMOVED*** ISLAND_SLEEPING
 */
World.ISLAND_SLEEPING = 4;

/**
 * Add a constraint to the simulation.
 *
 * @method addConstraint
 * @param ***REMOVED***Constraint***REMOVED*** constraint
 * @example
 *     var constraint = new LockConstraint(bodyA, bodyB);
 *     world.addConstraint(constraint);
 */
World.prototype.addConstraint = function(constraint)***REMOVED***
    this.constraints.push(constraint);
***REMOVED***;

/**
 * Add a ContactMaterial to the simulation.
 * @method addContactMaterial
 * @param ***REMOVED***ContactMaterial***REMOVED*** contactMaterial
 */
World.prototype.addContactMaterial = function(contactMaterial)***REMOVED***
    this.contactMaterials.push(contactMaterial);
***REMOVED***;

/**
 * Removes a contact material
 *
 * @method removeContactMaterial
 * @param ***REMOVED***ContactMaterial***REMOVED*** cm
 */
World.prototype.removeContactMaterial = function(cm)***REMOVED***
    var idx = this.contactMaterials.indexOf(cm);
    if(idx!==-1)***REMOVED***
        Utils.splice(this.contactMaterials,idx,1);
    ***REMOVED***
***REMOVED***;

/**
 * Get a contact material given two materials
 * @method getContactMaterial
 * @param ***REMOVED***Material***REMOVED*** materialA
 * @param ***REMOVED***Material***REMOVED*** materialB
 * @return ***REMOVED***ContactMaterial***REMOVED*** The matching ContactMaterial, or false on fail.
 * @todo Use faster hash map to lookup from material id's
 */
World.prototype.getContactMaterial = function(materialA,materialB)***REMOVED***
    var cmats = this.contactMaterials;
    for(var i=0, N=cmats.length; i!==N; i++)***REMOVED***
        var cm = cmats[i];
        if( (cm.materialA.id === materialA.id) && (cm.materialB.id === materialB.id) ||
            (cm.materialA.id === materialB.id) && (cm.materialB.id === materialA.id) )***REMOVED***
            return cm;
        ***REMOVED***
    ***REMOVED***
    return false;
***REMOVED***;

/**
 * Removes a constraint
 *
 * @method removeConstraint
 * @param ***REMOVED***Constraint***REMOVED*** constraint
 */
World.prototype.removeConstraint = function(constraint)***REMOVED***
    var idx = this.constraints.indexOf(constraint);
    if(idx!==-1)***REMOVED***
        Utils.splice(this.constraints,idx,1);
    ***REMOVED***
***REMOVED***;

var step_r = vec2.create(),
    step_runit = vec2.create(),
    step_u = vec2.create(),
    step_f = vec2.create(),
    step_fhMinv = vec2.create(),
    step_velodt = vec2.create(),
    step_mg = vec2.create(),
    xiw = vec2.fromValues(0,0),
    xjw = vec2.fromValues(0,0),
    zero = vec2.fromValues(0,0),
    interpvelo = vec2.fromValues(0,0);

/**
 * Step the physics world forward in time.
 *
 * There are two modes. The simple mode is fixed timestepping without interpolation. In this case you only use the first argument. The second case uses interpolation. In that you also provide the time since the function was last used, as well as the maximum fixed timesteps to take.
 *
 * @method step
 * @param ***REMOVED***Number***REMOVED*** dt                       The fixed time step size to use.
 * @param ***REMOVED***Number***REMOVED*** [timeSinceLastCalled=0]  The time elapsed since the function was last called.
 * @param ***REMOVED***Number***REMOVED*** [maxSubSteps=10]         Maximum number of fixed steps to take per function call.
 *
 * @example
 *     // Simple fixed timestepping without interpolation
 *     var fixedTimeStep = 1 / 60;
 *     var world = new World();
 *     var body = new Body(***REMOVED*** mass: 1 ***REMOVED***);
 *     world.addBody(body);
 *
 *     function animate()***REMOVED***
 *         requestAnimationFrame(animate);
 *         world.step(fixedTimeStep);
 *         renderBody(body.position, body.angle);
 *     ***REMOVED***
 *
 *     // Start animation loop
 *     requestAnimationFrame(animate);
 *
 * @example
 *     // Fixed timestepping with interpolation
 *     var maxSubSteps = 10;
 *     var lastTimeSeconds;
 *
 *     function animate(t)***REMOVED***
 *         requestAnimationFrame(animate);
 *         timeSeconds = t / 1000;
 *         lastTimeSeconds = lastTimeSeconds || timeSeconds;
 *
 *         deltaTime = timeSeconds - lastTimeSeconds;
 *         world.step(fixedTimeStep, deltaTime, maxSubSteps);
 *
 *         renderBody(body.interpolatedPosition, body.interpolatedAngle);
 *     ***REMOVED***
 *
 *     // Start animation loop
 *     requestAnimationFrame(animate);
 *
 * @see http://bulletphysics.org/mediawiki-1.5.8/index.php/Stepping_The_World
 */
World.prototype.step = function(dt,timeSinceLastCalled,maxSubSteps)***REMOVED***
    maxSubSteps = maxSubSteps || 10;
    timeSinceLastCalled = timeSinceLastCalled || 0;

    if(timeSinceLastCalled === 0)***REMOVED*** // Fixed, simple stepping

        this.internalStep(dt);

        // Increment time
        this.time += dt;

    ***REMOVED*** else ***REMOVED***

        this.accumulator += timeSinceLastCalled;
        var substeps = 0;
        while (this.accumulator >= dt && substeps < maxSubSteps) ***REMOVED***
            // Do fixed steps to catch up
            this.internalStep(dt);
            this.time += dt;
            this.accumulator -= dt;
            substeps++;
        ***REMOVED***

        var t = (this.accumulator % dt) / dt;
        for(var j=0; j!==this.bodies.length; j++)***REMOVED***
            var b = this.bodies[j];
            vec2.lerp(b.interpolatedPosition, b.previousPosition, b.position, t);
            b.interpolatedAngle = b.previousAngle + t * (b.angle - b.previousAngle);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

var endOverlaps = [];

/**
 * Make a fixed step.
 * @method internalStep
 * @param  ***REMOVED***number***REMOVED*** dt
 * @private
 */
World.prototype.internalStep = function(dt)***REMOVED***
    this.stepping = true;

    var that = this,
        Nsprings = this.springs.length,
        springs = this.springs,
        bodies = this.bodies,
        g = this.gravity,
        solver = this.solver,
        Nbodies = this.bodies.length,
        broadphase = this.broadphase,
        np = this.narrowphase,
        constraints = this.constraints,
        t0, t1,
        fhMinv = step_fhMinv,
        velodt = step_velodt,
        mg = step_mg,
        scale = vec2.scale,
        add = vec2.add,
        rotate = vec2.rotate,
        islandManager = this.islandManager;

    this.overlapKeeper.tick();

    this.lastTimeStep = dt;

    // Update approximate friction gravity.
    if(this.useWorldGravityAsFrictionGravity)***REMOVED***
        var gravityLen = vec2.length(this.gravity);
        if(!(gravityLen === 0 && this.useFrictionGravityOnZeroGravity))***REMOVED***
            // Nonzero gravity. Use it.
            this.frictionGravity = gravityLen;
        ***REMOVED***
    ***REMOVED***

    // Add gravity to bodies
    if(this.applyGravity)***REMOVED***
        for(var i=0; i!==Nbodies; i++)***REMOVED***
            var b = bodies[i],
                fi = b.force;
            if(b.type !== Body.DYNAMIC || b.sleepState === Body.SLEEPING)***REMOVED***
                continue;
            ***REMOVED***
            vec2.scale(mg,g,b.mass*b.gravityScale); // F=m*g
            add(fi,fi,mg);
        ***REMOVED***
    ***REMOVED***

    // Add spring forces
    if(this.applySpringForces)***REMOVED***
        for(var i=0; i!==Nsprings; i++)***REMOVED***
            var s = springs[i];
            s.applyForce();
        ***REMOVED***
    ***REMOVED***

    if(this.applyDamping)***REMOVED***
        for(var i=0; i!==Nbodies; i++)***REMOVED***
            var b = bodies[i];
            if(b.type === Body.DYNAMIC)***REMOVED***
                b.applyDamping(dt);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    // Broadphase
    var result = broadphase.getCollisionPairs(this);

    // Remove ignored collision pairs
    var ignoredPairs = this.disabledBodyCollisionPairs;
    for(var i=ignoredPairs.length-2; i>=0; i-=2)***REMOVED***
        for(var j=result.length-2; j>=0; j-=2)***REMOVED***
            if( (ignoredPairs[i]   === result[j] && ignoredPairs[i+1] === result[j+1]) ||
                (ignoredPairs[i+1] === result[j] && ignoredPairs[i]   === result[j+1]))***REMOVED***
                result.splice(j,2);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    // Remove constrained pairs with collideConnected == false
    var Nconstraints = constraints.length;
    for(i=0; i!==Nconstraints; i++)***REMOVED***
        var c = constraints[i];
        if(!c.collideConnected)***REMOVED***
            for(var j=result.length-2; j>=0; j-=2)***REMOVED***
                if( (c.bodyA === result[j] && c.bodyB === result[j+1]) ||
                    (c.bodyB === result[j] && c.bodyA === result[j+1]))***REMOVED***
                    result.splice(j,2);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    // postBroadphase event
    this.postBroadphaseEvent.pairs = result;
    this.emit(this.postBroadphaseEvent);
    this.postBroadphaseEvent.pairs = null;

    // Narrowphase
    np.reset(this);
    for(var i=0, Nresults=result.length; i!==Nresults; i+=2)***REMOVED***
        var bi = result[i],
            bj = result[i+1];

        // Loop over all shapes of body i
        for(var k=0, Nshapesi=bi.shapes.length; k!==Nshapesi; k++)***REMOVED***
            var si = bi.shapes[k],
                xi = si.position,
                ai = si.angle;

            // All shapes of body j
            for(var l=0, Nshapesj=bj.shapes.length; l!==Nshapesj; l++)***REMOVED***
                var sj = bj.shapes[l],
                    xj = sj.position,
                    aj = sj.angle;

                var cm = this.defaultContactMaterial;
                if(si.material && sj.material)***REMOVED***
                    var tmp = this.getContactMaterial(si.material,sj.material);
                    if(tmp)***REMOVED***
                        cm = tmp;
                    ***REMOVED***
                ***REMOVED***

                this.runNarrowphase(np,bi,si,xi,ai,bj,sj,xj,aj,cm,this.frictionGravity);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    // Wake up bodies
    for(var i=0; i!==Nbodies; i++)***REMOVED***
        var body = bodies[i];
        if(body._wakeUpAfterNarrowphase)***REMOVED***
            body.wakeUp();
            body._wakeUpAfterNarrowphase = false;
        ***REMOVED***
    ***REMOVED***

    // Emit end overlap events
    if(this.has('endContact'))***REMOVED***
        this.overlapKeeper.getEndOverlaps(endOverlaps);
        var e = this.endContactEvent;
        var l = endOverlaps.length;
        while(l--)***REMOVED***
            var data = endOverlaps[l];
            e.shapeA = data.shapeA;
            e.shapeB = data.shapeB;
            e.bodyA = data.bodyA;
            e.bodyB = data.bodyB;
            this.emit(e);
        ***REMOVED***
        endOverlaps.length = 0;
    ***REMOVED***

    var preSolveEvent = this.preSolveEvent;
    preSolveEvent.contactEquations = np.contactEquations;
    preSolveEvent.frictionEquations = np.frictionEquations;
    this.emit(preSolveEvent);
    preSolveEvent.contactEquations = preSolveEvent.frictionEquations = null;

    // update constraint equations
    var Nconstraints = constraints.length;
    for(i=0; i!==Nconstraints; i++)***REMOVED***
        constraints[i].update();
    ***REMOVED***

    if(np.contactEquations.length || np.frictionEquations.length || Nconstraints)***REMOVED***
        if(this.islandSplit)***REMOVED***
            // Split into islands
            islandManager.equations.length = 0;
            Utils.appendArray(islandManager.equations, np.contactEquations);
            Utils.appendArray(islandManager.equations, np.frictionEquations);
            for(i=0; i!==Nconstraints; i++)***REMOVED***
                Utils.appendArray(islandManager.equations, constraints[i].equations);
            ***REMOVED***
            islandManager.split(this);

            for(var i=0; i!==islandManager.islands.length; i++)***REMOVED***
                var island = islandManager.islands[i];
                if(island.equations.length)***REMOVED***
                    solver.solveIsland(dt,island);
                ***REMOVED***
            ***REMOVED***

        ***REMOVED*** else ***REMOVED***

            // Add contact equations to solver
            solver.addEquations(np.contactEquations);
            solver.addEquations(np.frictionEquations);

            // Add user-defined constraint equations
            for(i=0; i!==Nconstraints; i++)***REMOVED***
                solver.addEquations(constraints[i].equations);
            ***REMOVED***

            if(this.solveConstraints)***REMOVED***
                solver.solve(dt,this);
            ***REMOVED***

            solver.removeAllEquations();
        ***REMOVED***
    ***REMOVED***

    // Step forward
    for(var i=0; i!==Nbodies; i++)***REMOVED***
        var body = bodies[i];

        // if(body.sleepState !== Body.SLEEPING && body.type !== Body.STATIC)***REMOVED***
        body.integrate(dt);
        // ***REMOVED***
    ***REMOVED***

    // Reset force
    for(var i=0; i!==Nbodies; i++)***REMOVED***
        bodies[i].setZeroForce();
    ***REMOVED***

    // Emit impact event
    if(this.emitImpactEvent && this.has('impact'))***REMOVED***
        var ev = this.impactEvent;
        for(var i=0; i!==np.contactEquations.length; i++)***REMOVED***
            var eq = np.contactEquations[i];
            if(eq.firstImpact)***REMOVED***
                ev.bodyA = eq.bodyA;
                ev.bodyB = eq.bodyB;
                ev.shapeA = eq.shapeA;
                ev.shapeB = eq.shapeB;
                ev.contactEquation = eq;
                this.emit(ev);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    // Sleeping update
    if(this.sleepMode === World.BODY_SLEEPING)***REMOVED***
        for(i=0; i!==Nbodies; i++)***REMOVED***
            bodies[i].sleepTick(this.time, false, dt);
        ***REMOVED***
    ***REMOVED*** else if(this.sleepMode === World.ISLAND_SLEEPING && this.islandSplit)***REMOVED***

        // Tell all bodies to sleep tick but dont sleep yet
        for(i=0; i!==Nbodies; i++)***REMOVED***
            bodies[i].sleepTick(this.time, true, dt);
        ***REMOVED***

        // Sleep islands
        for(var i=0; i<this.islandManager.islands.length; i++)***REMOVED***
            var island = this.islandManager.islands[i];
            if(island.wantsToSleep())***REMOVED***
                island.sleep();
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    this.stepping = false;

    // Remove bodies that are scheduled for removal
    var bodiesToBeRemoved = this.bodiesToBeRemoved;
    for(var i=0; i!==bodiesToBeRemoved.length; i++)***REMOVED***
        this.removeBody(bodiesToBeRemoved[i]);
    ***REMOVED***
    bodiesToBeRemoved.length = 0;

    this.emit(this.postStepEvent);
***REMOVED***;

/**
 * Runs narrowphase for the shape pair i and j.
 * @method runNarrowphase
 * @param  ***REMOVED***Narrowphase***REMOVED*** np
 * @param  ***REMOVED***Body***REMOVED*** bi
 * @param  ***REMOVED***Shape***REMOVED*** si
 * @param  ***REMOVED***Array***REMOVED*** xi
 * @param  ***REMOVED***Number***REMOVED*** ai
 * @param  ***REMOVED***Body***REMOVED*** bj
 * @param  ***REMOVED***Shape***REMOVED*** sj
 * @param  ***REMOVED***Array***REMOVED*** xj
 * @param  ***REMOVED***Number***REMOVED*** aj
 * @param  ***REMOVED***Number***REMOVED*** mu
 */
World.prototype.runNarrowphase = function(np,bi,si,xi,ai,bj,sj,xj,aj,cm,glen)***REMOVED***

    // Check collision groups and masks
    if(!((si.collisionGroup & sj.collisionMask) !== 0 && (sj.collisionGroup & si.collisionMask) !== 0))***REMOVED***
        return;
    ***REMOVED***

    // Get world position and angle of each shape
    vec2.rotate(xiw, xi, bi.angle);
    vec2.rotate(xjw, xj, bj.angle);
    vec2.add(xiw, xiw, bi.position);
    vec2.add(xjw, xjw, bj.position);
    var aiw = ai + bi.angle;
    var ajw = aj + bj.angle;

    np.enableFriction = cm.friction > 0;
    np.frictionCoefficient = cm.friction;
    var reducedMass;
    if(bi.type === Body.STATIC || bi.type === Body.KINEMATIC)***REMOVED***
        reducedMass = bj.mass;
    ***REMOVED*** else if(bj.type === Body.STATIC || bj.type === Body.KINEMATIC)***REMOVED***
        reducedMass = bi.mass;
    ***REMOVED*** else ***REMOVED***
        reducedMass = (bi.mass*bj.mass)/(bi.mass+bj.mass);
    ***REMOVED***
    np.slipForce = cm.friction*glen*reducedMass;
    np.restitution = cm.restitution;
    np.surfaceVelocity = cm.surfaceVelocity;
    np.frictionStiffness = cm.frictionStiffness;
    np.frictionRelaxation = cm.frictionRelaxation;
    np.stiffness = cm.stiffness;
    np.relaxation = cm.relaxation;
    np.contactSkinSize = cm.contactSkinSize;
    np.enabledEquations = bi.collisionResponse && bj.collisionResponse && si.collisionResponse && sj.collisionResponse;

    var resolver = np[si.type | sj.type],
        numContacts = 0;
    if (resolver) ***REMOVED***
        var sensor = si.sensor || sj.sensor;
        var numFrictionBefore = np.frictionEquations.length;
        if (si.type < sj.type) ***REMOVED***
            numContacts = resolver.call(np, bi,si,xiw,aiw, bj,sj,xjw,ajw, sensor);
        ***REMOVED*** else ***REMOVED***
            numContacts = resolver.call(np, bj,sj,xjw,ajw, bi,si,xiw,aiw, sensor);
        ***REMOVED***
        var numFrictionEquations = np.frictionEquations.length - numFrictionBefore;

        if(numContacts)***REMOVED***

            if( bi.allowSleep &&
                bi.type === Body.DYNAMIC &&
                bi.sleepState  === Body.SLEEPING &&
                bj.sleepState  === Body.AWAKE &&
                bj.type !== Body.STATIC
            )***REMOVED***
                var speedSquaredB = vec2.squaredLength(bj.velocity) + Math.pow(bj.angularVelocity,2);
                var speedLimitSquaredB = Math.pow(bj.sleepSpeedLimit,2);
                if(speedSquaredB >= speedLimitSquaredB*2)***REMOVED***
                    bi._wakeUpAfterNarrowphase = true;
                ***REMOVED***
            ***REMOVED***

            if( bj.allowSleep &&
                bj.type === Body.DYNAMIC &&
                bj.sleepState  === Body.SLEEPING &&
                bi.sleepState  === Body.AWAKE &&
                bi.type !== Body.STATIC
            )***REMOVED***
                var speedSquaredA = vec2.squaredLength(bi.velocity) + Math.pow(bi.angularVelocity,2);
                var speedLimitSquaredA = Math.pow(bi.sleepSpeedLimit,2);
                if(speedSquaredA >= speedLimitSquaredA*2)***REMOVED***
                    bj._wakeUpAfterNarrowphase = true;
                ***REMOVED***
            ***REMOVED***

            this.overlapKeeper.setOverlapping(bi, si, bj, sj);
            if(this.has('beginContact') && this.overlapKeeper.isNewOverlap(si, sj))***REMOVED***

                // Report new shape overlap
                var e = this.beginContactEvent;
                e.shapeA = si;
                e.shapeB = sj;
                e.bodyA = bi;
                e.bodyB = bj;

                // Reset contact equations
                e.contactEquations.length = 0;

                if(typeof(numContacts)==="number")***REMOVED***
                    for(var i=np.contactEquations.length-numContacts; i<np.contactEquations.length; i++)***REMOVED***
                        e.contactEquations.push(np.contactEquations[i]);
                    ***REMOVED***
                ***REMOVED***

                this.emit(e);
            ***REMOVED***

            // divide the max friction force by the number of contacts
            if(typeof(numContacts)==="number" && numFrictionEquations > 1)***REMOVED*** // Why divide by 1?
                for(var i=np.frictionEquations.length-numFrictionEquations; i<np.frictionEquations.length; i++)***REMOVED***
                    var f = np.frictionEquations[i];
                    f.setSlipForce(f.getSlipForce() / numFrictionEquations);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
 * Add a spring to the simulation
 *
 * @method addSpring
 * @param ***REMOVED***Spring***REMOVED*** spring
 */
World.prototype.addSpring = function(spring)***REMOVED***
    this.springs.push(spring);
    var evt = this.addSpringEvent;
    evt.spring = spring;
    this.emit(evt);
    evt.spring = null;
***REMOVED***;

/**
 * Remove a spring
 *
 * @method removeSpring
 * @param ***REMOVED***Spring***REMOVED*** spring
 */
World.prototype.removeSpring = function(spring)***REMOVED***
    var idx = this.springs.indexOf(spring);
    if(idx !== -1)***REMOVED***
        Utils.splice(this.springs,idx,1);
    ***REMOVED***
***REMOVED***;

/**
 * Add a body to the simulation
 *
 * @method addBody
 * @param ***REMOVED***Body***REMOVED*** body
 *
 * @example
 *     var world = new World(),
 *         body = new Body();
 *     world.addBody(body);
 * @todo What if this is done during step?
 */
World.prototype.addBody = function(body)***REMOVED***
    if(this.bodies.indexOf(body) === -1)***REMOVED***
        this.bodies.push(body);
        body.world = this;
        var evt = this.addBodyEvent;
        evt.body = body;
        this.emit(evt);
        evt.body = null;
    ***REMOVED***
***REMOVED***;

/**
 * Remove a body from the simulation. If this method is called during step(), the body removal is scheduled to after the step.
 *
 * @method removeBody
 * @param ***REMOVED***Body***REMOVED*** body
 */
World.prototype.removeBody = function(body)***REMOVED***
    if(this.stepping)***REMOVED***
        this.bodiesToBeRemoved.push(body);
    ***REMOVED*** else ***REMOVED***
        body.world = null;
        var idx = this.bodies.indexOf(body);
        if(idx!==-1)***REMOVED***
            Utils.splice(this.bodies,idx,1);
            this.removeBodyEvent.body = body;
            body.resetConstraintVelocity();
            this.emit(this.removeBodyEvent);
            this.removeBodyEvent.body = null;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

/**
 * Get a body by its id.
 * @method getBodyById
 * @param ***REMOVED***number***REMOVED*** id
 * @return ***REMOVED***Body***REMOVED*** The body, or false if it was not found.
 */
World.prototype.getBodyById = function(id)***REMOVED***
    var bodies = this.bodies;
    for(var i=0; i<bodies.length; i++)***REMOVED***
        var b = bodies[i];
        if(b.id === id)***REMOVED***
            return b;
        ***REMOVED***
    ***REMOVED***
    return false;
***REMOVED***;

/**
 * Disable collision between two bodies
 * @method disableBodyCollision
 * @param ***REMOVED***Body***REMOVED*** bodyA
 * @param ***REMOVED***Body***REMOVED*** bodyB
 */
World.prototype.disableBodyCollision = function(bodyA,bodyB)***REMOVED***
    this.disabledBodyCollisionPairs.push(bodyA,bodyB);
***REMOVED***;

/**
 * Enable collisions between the given two bodies
 * @method enableBodyCollision
 * @param ***REMOVED***Body***REMOVED*** bodyA
 * @param ***REMOVED***Body***REMOVED*** bodyB
 */
World.prototype.enableBodyCollision = function(bodyA,bodyB)***REMOVED***
    var pairs = this.disabledBodyCollisionPairs;
    for(var i=0; i<pairs.length; i+=2)***REMOVED***
        if((pairs[i] === bodyA && pairs[i+1] === bodyB) || (pairs[i+1] === bodyA && pairs[i] === bodyB))***REMOVED***
            pairs.splice(i,2);
            return;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

/**
 * Resets the World, removes all bodies, constraints and springs.
 *
 * @method clear
 */
World.prototype.clear = function()***REMOVED***

    this.time = 0;

    // Remove all solver equations
    if(this.solver && this.solver.equations.length)***REMOVED***
        this.solver.removeAllEquations();
    ***REMOVED***

    // Remove all constraints
    var cs = this.constraints;
    for(var i=cs.length-1; i>=0; i--)***REMOVED***
        this.removeConstraint(cs[i]);
    ***REMOVED***

    // Remove all bodies
    var bodies = this.bodies;
    for(var i=bodies.length-1; i>=0; i--)***REMOVED***
        this.removeBody(bodies[i]);
    ***REMOVED***

    // Remove all springs
    var springs = this.springs;
    for(var i=springs.length-1; i>=0; i--)***REMOVED***
        this.removeSpring(springs[i]);
    ***REMOVED***

    // Remove all contact materials
    var cms = this.contactMaterials;
    for(var i=cms.length-1; i>=0; i--)***REMOVED***
        this.removeContactMaterial(cms[i]);
    ***REMOVED***

    World.apply(this);
***REMOVED***;

var hitTest_tmp1 = vec2.create(),
    hitTest_zero = vec2.fromValues(0,0),
    hitTest_tmp2 = vec2.fromValues(0,0);

/**
 * Test if a world point overlaps bodies
 * @method hitTest
 * @param  ***REMOVED***Array***REMOVED***  worldPoint  Point to use for intersection tests
 * @param  ***REMOVED***Array***REMOVED***  bodies      A list of objects to check for intersection
 * @param  ***REMOVED***Number***REMOVED*** precision   Used for matching against particles and lines. Adds some margin to these infinitesimal objects.
 * @return ***REMOVED***Array***REMOVED***              Array of bodies that overlap the point
 * @todo Should use an api similar to the raycast function
 * @todo Should probably implement a .containsPoint method for all shapes. Would be more efficient
 */
World.prototype.hitTest = function(worldPoint,bodies,precision)***REMOVED***
    precision = precision || 0;

    // Create a dummy particle body with a particle shape to test against the bodies
    var pb = new Body(***REMOVED*** position:worldPoint ***REMOVED***),
        ps = new Particle(),
        px = worldPoint,
        pa = 0,
        x = hitTest_tmp1,
        zero = hitTest_zero,
        tmp = hitTest_tmp2;
    pb.addShape(ps);

    var n = this.narrowphase,
        result = [];

    // Check bodies
    for(var i=0, N=bodies.length; i!==N; i++)***REMOVED***
        var b = bodies[i];

        for(var j=0, NS=b.shapes.length; j!==NS; j++)***REMOVED***
            var s = b.shapes[j];

            // Get shape world position + angle
            vec2.rotate(x, s.position, b.angle);
            vec2.add(x, x, b.position);
            var a = s.angle + b.angle;

            if( (s instanceof Circle    && n.circleParticle  (b,s,x,a,     pb,ps,px,pa, true)) ||
                (s instanceof Convex    && n.particleConvex  (pb,ps,px,pa, b,s,x,a,     true)) ||
                (s instanceof Plane     && n.particlePlane   (pb,ps,px,pa, b,s,x,a,     true)) ||
                (s instanceof Capsule   && n.particleCapsule (pb,ps,px,pa, b,s,x,a,     true)) ||
                (s instanceof Particle  && vec2.squaredLength(vec2.sub(tmp,x,worldPoint)) < precision*precision)
                )***REMOVED***
                result.push(b);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return result;
***REMOVED***;

/**
 * Set the stiffness for all equations and contact materials.
 * @method setGlobalStiffness
 * @param ***REMOVED***Number***REMOVED*** stiffness
 */
World.prototype.setGlobalStiffness = function(stiffness)***REMOVED***

    // Set for all constraints
    var constraints = this.constraints;
    for(var i=0; i !== constraints.length; i++)***REMOVED***
        var c = constraints[i];
        for(var j=0; j !== c.equations.length; j++)***REMOVED***
            var eq = c.equations[j];
            eq.stiffness = stiffness;
            eq.needsUpdate = true;
        ***REMOVED***
    ***REMOVED***

    // Set for all contact materials
    var contactMaterials = this.contactMaterials;
    for(var i=0; i !== contactMaterials.length; i++)***REMOVED***
        var c = contactMaterials[i];
        c.stiffness = c.frictionStiffness = stiffness;
    ***REMOVED***

    // Set for default contact material
    var c = this.defaultContactMaterial;
    c.stiffness = c.frictionStiffness = stiffness;
***REMOVED***;

/**
 * Set the relaxation for all equations and contact materials.
 * @method setGlobalRelaxation
 * @param ***REMOVED***Number***REMOVED*** relaxation
 */
World.prototype.setGlobalRelaxation = function(relaxation)***REMOVED***

    // Set for all constraints
    for(var i=0; i !== this.constraints.length; i++)***REMOVED***
        var c = this.constraints[i];
        for(var j=0; j !== c.equations.length; j++)***REMOVED***
            var eq = c.equations[j];
            eq.relaxation = relaxation;
            eq.needsUpdate = true;
        ***REMOVED***
    ***REMOVED***

    // Set for all contact materials
    for(var i=0; i !== this.contactMaterials.length; i++)***REMOVED***
        var c = this.contactMaterials[i];
        c.relaxation = c.frictionRelaxation = relaxation;
    ***REMOVED***

    // Set for default contact material
    var c = this.defaultContactMaterial;
    c.relaxation = c.frictionRelaxation = relaxation;
***REMOVED***;

var tmpAABB = new AABB();
var tmpArray = [];

/**
 * Ray cast against all bodies in the world.
 * @method raycast
 * @param  ***REMOVED***RaycastResult***REMOVED*** result
 * @param  ***REMOVED***Ray***REMOVED*** ray
 * @return ***REMOVED***boolean***REMOVED*** True if any body was hit.
 *
 * @example
 *     var ray = new Ray(***REMOVED***
 *         mode: Ray.CLOSEST, // or ANY
 *         from: [0, 0],
 *         to: [10, 0],
 *     ***REMOVED***);
 *     var result = new RaycastResult();
 *     world.raycast(result, ray);
 *
 *     // Get the hit point
 *     var hitPoint = vec2.create();
 *     result.getHitPoint(hitPoint, ray);
 *     console.log('Hit point: ', hitPoint[0], hitPoint[1], ' at distance ' + result.getHitDistance(ray));
 *
 * @example
 *     var ray = new Ray(***REMOVED***
 *         mode: Ray.ALL,
 *         from: [0, 0],
 *         to: [10, 0],
 *         callback: function(result)***REMOVED***
 *
 *             // Print some info about the hit
 *             console.log('Hit body and shape: ', result.body, result.shape);
 *
 *             // Get the hit point
 *             var hitPoint = vec2.create();
 *             result.getHitPoint(hitPoint, ray);
 *             console.log('Hit point: ', hitPoint[0], hitPoint[1], ' at distance ' + result.getHitDistance(ray));
 *
 *             // If you are happy with the hits you got this far, you can stop the traversal here:
 *             result.stop();
 *         ***REMOVED***
 *     ***REMOVED***);
 *     var result = new RaycastResult();
 *     world.raycast(result, ray);
 */
World.prototype.raycast = function(result, ray)***REMOVED***

    // Get all bodies within the ray AABB
    ray.getAABB(tmpAABB);
    this.broadphase.aabbQuery(this, tmpAABB, tmpArray);
    ray.intersectBodies(result, tmpArray);
    tmpArray.length = 0;

    return result.hasHit();
***REMOVED***;

***REMOVED***,***REMOVED***"../../package.json":6,"../collision/AABB":7,"../collision/Broadphase":8,"../collision/Narrowphase":10,"../collision/Ray":11,"../collision/SAPBroadphase":13,"../constraints/Constraint":14,"../constraints/DistanceConstraint":15,"../constraints/GearConstraint":16,"../constraints/LockConstraint":17,"../constraints/PrismaticConstraint":18,"../constraints/RevoluteConstraint":19,"../events/EventEmitter":26,"../material/ContactMaterial":27,"../material/Material":28,"../math/vec2":30,"../objects/Body":31,"../objects/LinearSpring":32,"../objects/RotationalSpring":33,"../shapes/Capsule":38,"../shapes/Circle":39,"../shapes/Convex":40,"../shapes/Line":42,"../shapes/Particle":43,"../shapes/Plane":44,"../shapes/Shape":45,"../solver/GSSolver":46,"../solver/Solver":47,"../utils/OverlapKeeper":52,"../utils/Utils":57,"./IslandManager":59***REMOVED***]***REMOVED***,***REMOVED******REMOVED***,[36])
(36)
***REMOVED***);