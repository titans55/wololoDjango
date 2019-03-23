/*
Copyright (c) 2016, Mapbox

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
*/

/**
* @class EarCut
*/
PIXI.EarCut = ***REMOVED******REMOVED***;

PIXI.EarCut.Triangulate = function (data, holeIndices, dim) ***REMOVED***

    dim = dim || 2;

    var hasHoles = holeIndices && holeIndices.length,
        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
        outerNode = PIXI.EarCut.linkedList(data, 0, outerLen, dim, true),
        triangles = [];

    if (!outerNode) return triangles;

    var minX, minY, maxX, maxY, x, y, size;

    if (hasHoles) outerNode = PIXI.EarCut.eliminateHoles(data, holeIndices, outerNode, dim);

    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
    if (data.length > 80 * dim) ***REMOVED***
        minX = maxX = data[0];
        minY = maxY = data[1];

        for (var i = dim; i < outerLen; i += dim) ***REMOVED***
            x = data[i];
            y = data[i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        ***REMOVED***

        // minX, minY and size are later used to transform coords into integers for z-order calculation
        size = Math.max(maxX - minX, maxY - minY);
    ***REMOVED***

    PIXI.EarCut.earcutLinked(outerNode, triangles, dim, minX, minY, size);

    return triangles;
***REMOVED***

// create a circular doubly linked list from polygon points in the specified winding order

PIXI.EarCut.linkedList = function (data, start, end, dim, clockwise) ***REMOVED***
    var sum = 0,
        i, j, last;

    // calculate original winding order of a polygon ring
    for (i = start, j = end - dim; i < end; i += dim) ***REMOVED***
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    ***REMOVED***

    // link points into circular doubly-linked list in the specified winding order
    if (clockwise === (sum > 0)) ***REMOVED***
        for (i = start; i < end; i += dim) last = PIXI.EarCut.insertNode(i, data[i], data[i + 1], last);
    ***REMOVED*** else ***REMOVED***
        for (i = end - dim; i >= start; i -= dim) last = PIXI.EarCut.insertNode(i, data[i], data[i + 1], last);
    ***REMOVED***

    return last;
***REMOVED***

// eliminate colinear or duplicate points

PIXI.EarCut.filterPoints = function (start, end) ***REMOVED***
    if (!start) return start;
    if (!end) end = start;

    var p = start,
        again;
    do ***REMOVED***
        again = false;

        if (!p.steiner && (PIXI.EarCut.equals(p, p.next) || PIXI.EarCut.area(p.prev, p, p.next) === 0)) ***REMOVED***
            PIXI.EarCut.removeNode(p);
            p = end = p.prev;
            if (p === p.next) return null;
            again = true;

        ***REMOVED*** else ***REMOVED***
            p = p.next;
        ***REMOVED***
    ***REMOVED*** while (again || p !== end);

    return end;
***REMOVED***

// main ear slicing loop which triangulates a polygon (given as a linked list)

PIXI.EarCut.earcutLinked = function (ear, triangles, dim, minX, minY, size, pass) ***REMOVED***
    if (!ear) return;

    // interlink polygon nodes in z-order
    if (!pass && size) PIXI.EarCut.indexCurve(ear, minX, minY, size);

    var stop = ear,
        prev, next;

    // iterate through ears, slicing them one by one
    while (ear.prev !== ear.next) ***REMOVED***
        prev = ear.prev;
        next = ear.next;

        if (size ? PIXI.EarCut.isEarHashed(ear, minX, minY, size) : PIXI.EarCut.isEar(ear)) ***REMOVED***
            // cut off the triangle
            triangles.push(prev.i / dim);
            triangles.push(ear.i / dim);
            triangles.push(next.i / dim);

            PIXI.EarCut.removeNode(ear);

            // skipping the next vertice leads to less sliver triangles
            ear = next.next;
            stop = next.next;

            continue;
        ***REMOVED***

        ear = next;

        // if we looped through the whole remaining polygon and can't find any more ears
        if (ear === stop) ***REMOVED***
            // try filtering points and slicing again
            if (!pass) ***REMOVED***
                PIXI.EarCut.earcutLinked(PIXI.EarCut.filterPoints(ear), triangles, dim, minX, minY, size, 1);

                // if this didn't work, try curing all small self-intersections locally
            ***REMOVED*** else if (pass === 1) ***REMOVED***
                ear = PIXI.EarCut.cureLocalIntersections(ear, triangles, dim);
                PIXI.EarCut.earcutLinked(ear, triangles, dim, minX, minY, size, 2);

                // as a last resort, try splitting the remaining polygon into two
            ***REMOVED*** else if (pass === 2) ***REMOVED***
                PIXI.EarCut.splitEarcut(ear, triangles, dim, minX, minY, size);
            ***REMOVED***

            break;
        ***REMOVED***
    ***REMOVED***
***REMOVED***

// check whether a polygon node forms a valid ear with adjacent nodes

PIXI.EarCut.isEar = function (ear) ***REMOVED***
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (PIXI.EarCut.area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // now make sure we don't have other points inside the potential ear
    var p = ear.next.next;

    while (p !== ear.prev) ***REMOVED***
        if (PIXI.EarCut.pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            PIXI.EarCut.area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    ***REMOVED***

    return true;
***REMOVED***

PIXI.EarCut.isEarHashed = function (ear, minX, minY, size) ***REMOVED***
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (PIXI.EarCut.area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // triangle bbox; min & max are calculated like this for speed
    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x),
        minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y),
        maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x),
        maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);

    // z-order range for the current triangle bbox;
    var minZ = PIXI.EarCut.zOrder(minTX, minTY, minX, minY, size),
        maxZ = PIXI.EarCut.zOrder(maxTX, maxTY, minX, minY, size);

    // first look for points inside the triangle in increasing z-order
    var p = ear.nextZ;

    while (p && p.z <= maxZ) ***REMOVED***
        if (p !== ear.prev && p !== ear.next &&
            PIXI.EarCut.pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            PIXI.EarCut.area(p.prev, p, p.next) >= 0) return false;
        p = p.nextZ;
    ***REMOVED***

    // then look for points in decreasing z-order
    p = ear.prevZ;

    while (p && p.z >= minZ) ***REMOVED***
        if (p !== ear.prev && p !== ear.next &&
            PIXI.EarCut.pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            PIXI.EarCut.area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
    ***REMOVED***

    return true;
***REMOVED***

// go through all polygon nodes and cure small local self-intersections

PIXI.EarCut.cureLocalIntersections = function (start, triangles, dim) ***REMOVED***
    var p = start;
    do ***REMOVED***
        var a = p.prev,
            b = p.next.next;

        // a self-intersection where edge (v[i-1],v[i]) intersects (v[i+1],v[i+2])
        if (PIXI.EarCut.intersects(a, p, p.next, b) && PIXI.EarCut.locallyInside(a, b) && PIXI.EarCut.locallyInside(b, a)) ***REMOVED***

            triangles.push(a.i / dim);
            triangles.push(p.i / dim);
            triangles.push(b.i / dim);

            // remove two nodes involved
            PIXI.EarCut.removeNode(p);
            PIXI.EarCut.removeNode(p.next);

            p = start = b;
        ***REMOVED***
        p = p.next;
    ***REMOVED*** while (p !== start);

    return p;
***REMOVED***

// try splitting polygon into two and triangulate them independently

PIXI.EarCut.splitEarcut = function (start, triangles, dim, minX, minY, size) ***REMOVED***
    // look for a valid diagonal that divides the polygon into two
    var a = start;
    do ***REMOVED***
        var b = a.next.next;
        while (b !== a.prev) ***REMOVED***
            if (a.i !== b.i && PIXI.EarCut.isValidDiagonal(a, b)) ***REMOVED***
                // split the polygon in two by the diagonal
                var c = PIXI.EarCut.splitPolygon(a, b);

                // filter colinear points around the cuts
                a = PIXI.EarCut.filterPoints(a, a.next);
                c = PIXI.EarCut.filterPoints(c, c.next);

                // run earcut on each half
                PIXI.EarCut.earcutLinked(a, triangles, dim, minX, minY, size);
                PIXI.EarCut.earcutLinked(c, triangles, dim, minX, minY, size);
                return;
            ***REMOVED***
            b = b.next;
        ***REMOVED***
        a = a.next;
    ***REMOVED*** while (a !== start);
***REMOVED***

// link every hole into the outer loop, producing a single-ring polygon without holes

PIXI.EarCut.eliminateHoles = function (data, holeIndices, outerNode, dim) ***REMOVED***
    var queue = [],
        i, len, start, end, list;

    for (i = 0, len = holeIndices.length; i < len; i++) ***REMOVED***
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = PIXI.EarCut.linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(PIXI.EarCut.getLeftmost(list));
    ***REMOVED***

    queue.sort(compareX);

    // process holes from left to right
    for (i = 0; i < queue.length; i++) ***REMOVED***
        PIXI.EarCut.eliminateHole(queue[i], outerNode);
        outerNode = PIXI.EarCut.filterPoints(outerNode, outerNode.next);
    ***REMOVED***

    return outerNode;
***REMOVED***

PIXI.EarCut.compareX = function (a, b) ***REMOVED***
    return a.x - b.x;
***REMOVED***

// find a bridge between vertices that connects hole with an outer ring and and link it

PIXI.EarCut.eliminateHole = function (hole, outerNode) ***REMOVED***
    outerNode = PIXI.EarCut.findHoleBridge(hole, outerNode);
    if (outerNode) ***REMOVED***
        var b = PIXI.EarCut.splitPolygon(outerNode, hole);
        PIXI.EarCut.filterPoints(b, b.next);
    ***REMOVED***
***REMOVED***

// David Eberly's algorithm for finding a bridge between hole and outer polygon

PIXI.EarCut.findHoleBridge = function (hole, outerNode) ***REMOVED***
    var p = outerNode,
        hx = hole.x,
        hy = hole.y,
        qx = -Infinity,
        m;

    // find a segment intersected by a ray from the hole's leftmost point to the left;
    // segment's endpoint with lesser x will be potential connection point
    do ***REMOVED***
        if (hy <= p.y && hy >= p.next.y) ***REMOVED***
            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) ***REMOVED***
                qx = x;
                m = p.x < p.next.x ? p : p.next;
            ***REMOVED***
        ***REMOVED***
        p = p.next;
    ***REMOVED*** while (p !== outerNode);

    if (!m) return null;

    if (hole.x === m.x) return m.prev; // hole touches outer segment; pick lower endpoint

    // look for points inside the triangle of hole point, segment intersection and endpoint;
    // if there are no points found, we have a valid connection;
    // otherwise choose the point of the minimum angle with the ray as connection point

    var stop = m,
        tanMin = Infinity,
        tan;

    p = m.next;

    while (p !== stop) ***REMOVED***
        if (hx >= p.x && p.x >= m.x &&
            PIXI.EarCut.pointInTriangle(hy < m.y ? hx : qx, hy, m.x, m.y, hy < m.y ? qx : hx, hy, p.x, p.y)) ***REMOVED***

            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

            if ((tan < tanMin || (tan === tanMin && p.x > m.x)) && PIXI.EarCut.locallyInside(p, hole)) ***REMOVED***
                m = p;
                tanMin = tan;
            ***REMOVED***
        ***REMOVED***

        p = p.next;
    ***REMOVED***

    return m;
***REMOVED***

// interlink polygon nodes in z-order

PIXI.EarCut.indexCurve = function (start, minX, minY, size) ***REMOVED***
    var p = start;
    do ***REMOVED***
        if (p.z === null) p.z = PIXI.EarCut.zOrder(p.x, p.y, minX, minY, size);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    ***REMOVED*** while (p !== start);

    p.prevZ.nextZ = null;
    p.prevZ = null;

    PIXI.EarCut.sortLinked(p);
***REMOVED***

// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html

PIXI.EarCut.sortLinked = function (list) ***REMOVED***
    var i, p, q, e, tail, numMerges, pSize, qSize,
        inSize = 1;

    do ***REMOVED***
        p = list;
        list = null;
        tail = null;
        numMerges = 0;

        while (p) ***REMOVED***
            numMerges++;
            q = p;
            pSize = 0;
            for (i = 0; i < inSize; i++) ***REMOVED***
                pSize++;
                q = q.nextZ;
                if (!q) break;
            ***REMOVED***

            qSize = inSize;

            while (pSize > 0 || (qSize > 0 && q)) ***REMOVED***

                if (pSize === 0) ***REMOVED***
                    e = q;
                    q = q.nextZ;
                    qSize--;
                ***REMOVED*** else if (qSize === 0 || !q) ***REMOVED***
                    e = p;
                    p = p.nextZ;
                    pSize--;
                ***REMOVED*** else if (p.z <= q.z) ***REMOVED***
                    e = p;
                    p = p.nextZ;
                    pSize--;
                ***REMOVED*** else ***REMOVED***
                    e = q;
                    q = q.nextZ;
                    qSize--;
                ***REMOVED***

                if (tail) tail.nextZ = e;
                else list = e;

                e.prevZ = tail;
                tail = e;
            ***REMOVED***

            p = q;
        ***REMOVED***

        tail.nextZ = null;
        inSize *= 2;

    ***REMOVED*** while (numMerges > 1);

    return list;
***REMOVED***

// z-order of a point given coords and size of the data bounding box

PIXI.EarCut.zOrder = function (x, y, minX, minY, size) ***REMOVED***
    // coords are transformed into non-negative 15-bit integer range
    x = 32767 * (x - minX) / size;
    y = 32767 * (y - minY) / size;

    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;

    y = (y | (y << 8)) & 0x00FF00FF;
    y = (y | (y << 4)) & 0x0F0F0F0F;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;

    return x | (y << 1);
***REMOVED***

// find the leftmost node of a polygon ring

PIXI.EarCut.getLeftmost = function (start) ***REMOVED***
    var p = start,
        leftmost = start;
    do ***REMOVED***
        if (p.x < leftmost.x) leftmost = p;
        p = p.next;
    ***REMOVED*** while (p !== start);

    return leftmost;
***REMOVED***

// check if a point lies within a convex triangle

PIXI.EarCut.pointInTriangle = function (ax, ay, bx, by, cx, cy, px, py) ***REMOVED***
    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
        (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
        (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
***REMOVED***

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)

PIXI.EarCut.isValidDiagonal = function (a, b) ***REMOVED***
    return PIXI.EarCut.equals(a, b) || a.next.i !== b.i && a.prev.i !== b.i && !PIXI.EarCut.intersectsPolygon(a, b) &&
        PIXI.EarCut.locallyInside(a, b) && PIXI.EarCut.locallyInside(b, a) && PIXI.EarCut.middleInside(a, b);
***REMOVED***

// signed area of a triangle

PIXI.EarCut.area = function (p, q, r) ***REMOVED***
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
***REMOVED***

// check if two points are equal

PIXI.EarCut.equals = function (p1, p2) ***REMOVED***
    return p1.x === p2.x && p1.y === p2.y;
***REMOVED***

// check if two segments intersect

PIXI.EarCut.intersects = function (p1, q1, p2, q2) ***REMOVED***
    return PIXI.EarCut.area(p1, q1, p2) > 0 !== PIXI.EarCut.area(p1, q1, q2) > 0 &&
        PIXI.EarCut.area(p2, q2, p1) > 0 !== PIXI.EarCut.area(p2, q2, q1) > 0;
***REMOVED***

// check if a polygon diagonal intersects any polygon segments

PIXI.EarCut.intersectsPolygon = function (a, b) ***REMOVED***
    var p = a;
    do ***REMOVED***
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
            PIXI.EarCut.intersects(p, p.next, a, b)) return true;
        p = p.next;
    ***REMOVED*** while (p !== a);

    return false;
***REMOVED***

// check if a polygon diagonal is locally inside the polygon

PIXI.EarCut.locallyInside = function (a, b) ***REMOVED***
    return PIXI.EarCut.area(a.prev, a, a.next) < 0 ?
        PIXI.EarCut.area(a, b, a.next) >= 0 && PIXI.EarCut.area(a, a.prev, b) >= 0 :
        PIXI.EarCut.area(a, b, a.prev) < 0 || PIXI.EarCut.area(a, a.next, b) < 0;
***REMOVED***

// check if the middle point of a polygon diagonal is inside the polygon

PIXI.EarCut.middleInside = function (a, b) ***REMOVED***
    var p = a,
        inside = false,
        px = (a.x + b.x) / 2,
        py = (a.y + b.y) / 2;
    do ***REMOVED***
        if (((p.y > py) !== (p.next.y > py)) && (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
            inside = !inside;
        p = p.next;
    ***REMOVED*** while (p !== a);

    return inside;
***REMOVED***

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring

PIXI.EarCut.splitPolygon = function (a, b) ***REMOVED***
    var a2 = new PIXI.EarCut.Node(a.i, a.x, a.y),
        b2 = new PIXI.EarCut.Node(b.i, b.x, b.y),
        an = a.next,
        bp = b.prev;

    a.next = b;
    b.prev = a;

    a2.next = an;
    an.prev = a2;

    b2.next = a2;
    a2.prev = b2;

    bp.next = b2;
    b2.prev = bp;

    return b2;
***REMOVED***

// create a node and optionally link it with previous one (in a circular doubly linked list)

PIXI.EarCut.insertNode = function (i, x, y, last) ***REMOVED***
    var p = new PIXI.EarCut.Node(i, x, y);

    if (!last) ***REMOVED***
        p.prev = p;
        p.next = p;

    ***REMOVED*** else ***REMOVED***
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    ***REMOVED***
    return p;
***REMOVED***

PIXI.EarCut.removeNode = function (p) ***REMOVED***
    p.next.prev = p.prev;
    p.prev.next = p.next;

    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
***REMOVED***

PIXI.EarCut.Node = function (i, x, y) ***REMOVED***
    // vertice index in coordinates array
    this.i = i;

    // vertex coordinates
    this.x = x;
    this.y = y;

    // previous and next vertice nodes in a polygon ring
    this.prev = null;
    this.next = null;

    // z-order curve value
    this.z = null;

    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;

    // indicates whether this is a steiner point
    this.steiner = false;
***REMOVED***
