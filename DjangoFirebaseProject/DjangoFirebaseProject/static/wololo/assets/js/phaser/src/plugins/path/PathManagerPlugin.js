/**
* @author       Richard Davey <rich@photonstorm.com>
* @author       Pete Baron <pete@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* PathManager controls a list of Paths and a list of PathFollowers.
* It is the central control for the majority of the Pathing API.
*
* @class Phaser.Plugin.PathManager
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the current Phaser.Game instance.
* @param ***REMOVED***Phaser.PluginManager***REMOVED*** parent - The Phaser Plugin Manager which looks after this plugin.
*/
Phaser.Plugin.PathManager = function (game, parent) ***REMOVED***

    Phaser.Plugin.call(this, game, parent);

    /**
     * @property ***REMOVED***array***REMOVED*** _list - list of paths
     * @private
     */
    this._list = [];

    /**
     * @property ***REMOVED***array***REMOVED*** _followers - list of path followers
     * @private
     */
    this._followers = [];

    this._branchRegistry = ***REMOVED******REMOVED***;

***REMOVED***;

Phaser.Plugin.PathManager.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.PathManager.prototype.constructor = Phaser.Plugin.PathManager;

/**
 * create a new Path from JSON data
 *
 * JSON data format:
 * required: "coordinateSystem":, "smoothness":, "loops":, "speed":, "pointList":[ ***REMOVED***"x":, "y":***REMOVED***, ... ]
 * optional: "branchFrom": ***REMOVED*** "path":, "point": ***REMOVED***, "joinTo": ***REMOVED*** "path":, "point": ***REMOVED***
 */
Phaser.Plugin.PathManager.prototype.createPathsFromJSON = function(jsonKey) ***REMOVED***

    var parse = this.game.cache.getJSON(jsonKey);
    var path;
    var createdPaths = [];
    var branchList = [];

    parse.paths.forEach(function(config) ***REMOVED***
        path = new Phaser.Path(config.coordinateSystem, config.loops);
        path.name = config.name;
        this.addPoints(path, config.pointList, config.speed);
        this._list.push(path);
        createdPaths.push(path);
        config.pointList.reduce(function(list, pnt, index) ***REMOVED***
            if (pnt.branchType === Phaser.Path.BranchTypes.ATTACHED) ***REMOVED***
                list.push(***REMOVED***
                    path: path.name,
                    branchPath: pnt.branchPath,
                    pointIndex: index,
                    type: pnt.branchType
                ***REMOVED***);
            ***REMOVED*** else if (pnt.branchType === Phaser.Path.BranchTypes.JOINED) ***REMOVED***
                list.push(***REMOVED***
                    path: pnt.branchPath,
                    branchPath: path.name,
                    pointIndex: pnt.branchPointIndex,
                    type: pnt.branchType
                ***REMOVED***);
            ***REMOVED***
            return list;
        ***REMOVED***, branchList);
    ***REMOVED***, this);
    branchList.forEach(function(branch) ***REMOVED***
        var mainPath = this.findPathByName(branch.path);
        var branchPath = this.findPathByName(branch.branchPath);
        var mainPathPointIndex = branch.pointIndex;
        if (branch.type === Phaser.Path.BranchTypes.ATTACHED) ***REMOVED***
            this.attachBranch(branchPath, mainPath, mainPathPointIndex);
        ***REMOVED*** else if (branch.type === Phaser.Path.BranchTypes.JOINED) ***REMOVED***
            this.joinBranch(branchPath, mainPath, mainPathPointIndex, false);
        ***REMOVED***
    ***REMOVED***, this);

    return createdPaths;
***REMOVED***;

Phaser.Plugin.PathManager.prototype.addPath = function(path) ***REMOVED***

    //  if path has points then addPoints, otherwise don't
    // this.addPoints(path, parse.pointList, parse.speed);

    this._list.push(path);

    return path;

***REMOVED***;

// create a branching path and attach the start to an existing path
// when a PathFollower encounters the attachment point, it will be able to switch onto this new branch
//
// @param: count ***REMOVED***value, optional***REMOVED***, make this branch counted (it won't be taken until a follower has passed it enough times)
Phaser.Plugin.PathManager.prototype.attachBranch = function(branchPath, mainPath, mainPathPointIndex, count) ***REMOVED***

    if (typeof mainPath === 'string') ***REMOVED***
        mainPath = this.findPathByName(mainPath);
    ***REMOVED***

    var branchFromPoint = new Phaser.PathPoint();

    if (mainPath.getPathPoint(mainPathPointIndex, branchFromPoint)) ***REMOVED***
        // move the first point of the branchPath to the branchFromPoint location
        branchPath.origin = branchFromPoint;
        var branchToPoint = branchPath.getPathPointReference(0);

        // attach the branch (use point reference so the changes go into the path)
        var branchFromPointRef = mainPath.getPathPointReference(mainPathPointIndex);

        this._branchAttach(branchFromPointRef, branchPath, 0);
        branchFromPointRef.branchType = Phaser.Path.BranchTypes.ATTACHED;

        // attach the branch's first point back to where it branched off from (for path reversal)
        branchToPoint.branchPath = mainPath;

        branchToPoint.branchPointIndex = mainPathPointIndex;

        // make sure this branch knows that it's using offset coordinates based on the first path point location
        branchPath.coordinateSystem = Phaser.Path.CoordinateSystems.OFFSET;
        branchPath.type = Phaser.Path.PathTypes.BRANCH;

        // set up counted branches data
        if (count !== undefined) ***REMOVED***
            branchFromPointRef.data = ***REMOVED***
                type: Phaser.PathPoint.DATA_COUNTER,
                value: count
            ***REMOVED***;
        ***REMOVED***

        if (this._branchRegistry[branchPath.name]) ***REMOVED***
            this._branchRegistry[branchPath.name].push(branchFromPointRef);
        ***REMOVED*** else ***REMOVED***
            this._branchRegistry[branchPath.name] = [branchFromPointRef];
        ***REMOVED***
    ***REMOVED***

***REMOVED***;



// attach the end of a path to an existing path
// when a PathFollower encounters the attachment point, it will automatically switch onto the attached path
Phaser.Plugin.PathManager.prototype.joinBranch = function(branchPath, mainPath, mainPathPointIndex, addPoint) ***REMOVED***
    if (typeof addPoint === 'undefined') ***REMOVED***
        addPoint = true;
    ***REMOVED***
    if (typeof mainPath === 'string') ***REMOVED***
        mainPath = this.findPathByName(mainPath);
    ***REMOVED***

    var mainPathJoinPoint, branchLastPoint;

    mainPathJoinPoint = new Phaser.PathPoint();
    mainPath.getPathPoint(mainPathPointIndex, mainPathJoinPoint);

    if (mainPathJoinPoint) ***REMOVED***
        if (addPoint) ***REMOVED***


            var newBranchPoint = new Phaser.PathPoint();
            if (branchPath.getPathPoint(0, newBranchPoint)) ***REMOVED***
                // make sure the newly added last path point is relative to the previously added first path point for the branch path by subtracting it out
                branchLastPoint = branchPath.addPathPoint(mainPathJoinPoint.x - newBranchPoint.x, mainPathJoinPoint.y - newBranchPoint.y, mainPathJoinPoint.vx, mainPathJoinPoint.vy, 1.0);
                this._branchAttach(branchLastPoint, mainPath, mainPathPointIndex);
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
            branchLastPoint = branchPath.getPathPointReference(branchPath.length - 1);
            this._branchAttach(branchLastPoint, mainPath, mainPathPointIndex);
        ***REMOVED***
        branchLastPoint.branchType = Phaser.Path.BranchTypes.JOINED;
    ***REMOVED***
    if (this._branchRegistry[branchPath.name]) ***REMOVED***
        this._branchRegistry[branchPath.name].push(branchLastPoint);
    ***REMOVED*** else ***REMOVED***
        this._branchRegistry[branchPath.name] = [branchLastPoint];
    ***REMOVED***
***REMOVED***;

// internal function, set the branching parameters of a PathPoint
Phaser.Plugin.PathManager.prototype._branchAttach = function(attachPoint, branchingPath, branchToPointIndex) ***REMOVED***
    attachPoint.branchPath = branchingPath;
    attachPoint.branchPointIndex = branchToPointIndex;
***REMOVED***;

Phaser.Plugin.PathManager.prototype._branchDetach = function(attachedPoint) ***REMOVED***
    attachedPoint.branchPath = null;
    attachedPoint.branchPointIndex = null;
***REMOVED***;


Phaser.Plugin.PathManager.prototype.removeBranch = function(branch) ***REMOVED***
    if (typeof branch === 'string') ***REMOVED***
        branch = this.findPathByName(branch);
    ***REMOVED***
    this._branchRegistry[branch.name].forEach(function(point) ***REMOVED***
        this._branchDetach(point);
    ***REMOVED***, this);
    this._branchRegistry[branch.name] = null;
    this.removePath(this.pathIndex(branch));

***REMOVED***;

// @return: the Path object which is at 'index' in the list
Phaser.Plugin.PathManager.prototype.getPath = function(index) ***REMOVED***
    return this._list[index];
***REMOVED***;



// add a list of points to a Path
Phaser.Plugin.PathManager.prototype.addPoints = function(path, pointList, speed) ***REMOVED***
    if (speed === undefined) speed = 1.0;

    for (var i = 0; i < pointList.length; i++) ***REMOVED***
        path.addPathPoint(pointList[i].x, pointList[i].y, pointList[i].vx, pointList[i].vy, speed, pointList[i].data);
    ***REMOVED***

    return path.numPoints();
***REMOVED***;

// @return: the Path object matching 'name' in the list
Phaser.Plugin.PathManager.prototype.findPathByName = function(name) ***REMOVED***
    for (var i = 0; i < this._list.length; i++) ***REMOVED***
        if (this._list[i].name == name) ***REMOVED***
            return this._list[i];
        ***REMOVED***
    ***REMOVED***

    return null;

***REMOVED***;


Phaser.Plugin.PathManager.prototype.findPathByPoint = function(point) ***REMOVED***
    var l = this._list.length;

    for (var i = 0; i < l; i++) ***REMOVED***
        if (this._list[i].pointIndex(point) > -1) ***REMOVED***
            return this._list[i];
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/*
 *  FOLLOWERS
 *
 *  the following functions control PathFollower objects
 *
 */

// create a new PathFollower and add it to the list
// @param: physicsAdjustTime - how quickly does a physics object attempt to get back to the path's virtual particle position (milliseconds), 0 = it's not a physics object
// @return: the new PathFollower object
Phaser.Plugin.PathManager.prototype.addFollower = function(path, follower, speed, rotationOffset, angularOffset, callbackAtEnd, physicsAdjustTime) ***REMOVED***

    var f = new Phaser.PathFollower(path, follower, speed, rotationOffset, angularOffset, callbackAtEnd, physicsAdjustTime);

    this._followers.push(f);

    return f;

***REMOVED***;

// update all PathFollower objects in the _followers list
// this will automatically move them along the Paths
//  was called updateFollowers
Phaser.Plugin.PathManager.prototype.update = function() ***REMOVED***

    //  move this to a plugin var
    //var elapsedTime = 1.0;

    for (var i = this._followers.length - 1; i >= 0; --i) ***REMOVED***
        var f = this._followers[i];

        // when a follower's update returns false, kill it
        if (!f.update(this.game.time.elpased)) ***REMOVED***
            // callback for this follower when it dies
            if (f.callbackAtEnd) ***REMOVED***
                f.callbackAtEnd(f.follower);
            ***REMOVED***

            // destroy the follower
            f.destroy();

            // remove the follower from the list
            this._followers.splice(i, 1);
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

// remove all PathFollowers on this path without destroying their attached graphic objects
// (eg. a long line of enemies use a path to enter, then switch to AI control on arrival maintaining their relative positions)
Phaser.Plugin.PathManager.prototype.removeAllFollowers = function(path) ***REMOVED***
    for (var i = this._followers.length - 1; i >= 0; --i) ***REMOVED***
        var f = this._followers[i];

        if (f.path == path) ***REMOVED***
            // callback for this follower when it dies
            if (f.callbackAtEnd) ***REMOVED***
                f.callbackAtEnd(f.follower);
            ***REMOVED***

            // destroy the follower
            f.destroy();

            // remove the follower from the list
            this._followers.splice(i, 1);
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

Phaser.Plugin.PathManager.prototype.pathIndex = function(path) ***REMOVED***
    return this._list.indexOf(path);
***REMOVED***;

Phaser.Plugin.PathManager.prototype.removePath = function(pathIndex) ***REMOVED***
    this.removeAllFollowers(this.getPath(pathIndex));
    if (pathIndex < this._list.length) ***REMOVED***
        return this._list.splice(pathIndex, 1);
    ***REMOVED*** else ***REMOVED***
        throw new Error("ERROR: Cannot remove non-existent path");
    ***REMOVED***
***REMOVED***;



/*
 *  DEBUG DRAWING OF ALL PATHS
 */

// draw all paths
Phaser.Plugin.PathManager.prototype.drawPaths = function(graphics) ***REMOVED***
    for (var i = 0; i < this._list.length; i++) ***REMOVED***
        this._list[i].debug(graphics);
    ***REMOVED***
***REMOVED***;