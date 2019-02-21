// NameSpace
var EasyStar = EasyStar || ***REMOVED******REMOVED***;

// For require.js
if (typeof define === "function" && define.amd) ***REMOVED***
	define("easystar", [], function() ***REMOVED***
		return EasyStar;
	***REMOVED***);
***REMOVED***

// For browserify and node.js
if (typeof module !== 'undefined' && module.exports) ***REMOVED***
	module.exports = EasyStar;
***REMOVED***
/**
* A simple Node that represents a single tile on the grid.
* @param ***REMOVED***Object***REMOVED*** parent The parent node.
* @param ***REMOVED***Number***REMOVED*** x The x position on the grid.
* @param ***REMOVED***Number***REMOVED*** y The y position on the grid.
* @param ***REMOVED***Number***REMOVED*** costSoFar How far this node is in moves*cost from the start.
* @param ***REMOVED***Number***REMOVED*** simpleDistanceToTarget Manhatten distance to the end point.
**/
EasyStar.Node = function(parent, x, y, costSoFar, simpleDistanceToTarget) ***REMOVED***
	this.parent = parent;
	this.x = x;
	this.y = y;
	this.costSoFar = costSoFar;
	this.simpleDistanceToTarget = simpleDistanceToTarget;

	/**
	* @return ***REMOVED***Number***REMOVED*** Best guess distance of a cost using this node.
	**/
	this.bestGuessDistance = function() ***REMOVED***
		return this.costSoFar + this.simpleDistanceToTarget;
	***REMOVED***
***REMOVED***;

// Constants
EasyStar.Node.OPEN_LIST = 0;
EasyStar.Node.CLOSED_LIST = 1;
/**
* This is an improved Priority Queue data type implementation that can be used to sort any object type.
* It uses a technique called a binary heap.
*
* For more on binary heaps see: http://en.wikipedia.org/wiki/Binary_heap
*
* @param ***REMOVED***String***REMOVED*** criteria The criteria by which to sort the objects.
* This should be a property of the objects you're sorting.
*
* @param ***REMOVED***Number***REMOVED*** heapType either PriorityQueue.MAX_HEAP or PriorityQueue.MIN_HEAP.
**/
EasyStar.PriorityQueue = function(criteria,heapType) ***REMOVED***
	this.length = 0; //The current length of heap.
	var queue = [];
	var isMax = false;

	//Constructor
	if (heapType==EasyStar.PriorityQueue.MAX_HEAP) ***REMOVED***
		isMax = true;
	***REMOVED*** else if (heapType==EasyStar.PriorityQueue.MIN_HEAP) ***REMOVED***
		isMax = false;
	***REMOVED*** else ***REMOVED***
		throw heapType + " not supported.";
	***REMOVED***

	/**
	* Inserts the value into the heap and sorts it.
	*
	* @param value The object to insert into the heap.
	**/
	this.insert = function(value) ***REMOVED***
		if (!value.hasOwnProperty(criteria)) ***REMOVED***
			throw "Cannot insert " + value + " because it does not have a property by the name of " + criteria + ".";
		***REMOVED***
		queue.push(value);
		this.length++;
		bubbleUp(this.length-1);
	***REMOVED***

	/**
	* Peeks at the highest priority element.
	*
	* @return the highest priority element
	**/
	this.getHighestPriorityElement = function() ***REMOVED***
		return queue[0];
	***REMOVED***

	/**
	* Removes and returns the highest priority element from the queue.
	*
	* @return the highest priority element
	**/
	this.shiftHighestPriorityElement = function() ***REMOVED***
		if (this.length === 0) ***REMOVED***
			throw ("There are no more elements in your priority queue.");
		***REMOVED*** else if (this.length === 1) ***REMOVED***
			var onlyValue = queue[0];
			queue = [];
                        this.length = 0;
			return onlyValue;
		***REMOVED***
		var oldRoot = queue[0];
		var newRoot = queue.pop();
		this.length--;
		queue[0] = newRoot;
		swapUntilQueueIsCorrect(0);
		return oldRoot;
	***REMOVED***

	var bubbleUp = function(index) ***REMOVED***
		if (index===0) ***REMOVED***
			return;
		***REMOVED***
		var parent = getParentOf(index);
		if (evaluate(index,parent)) ***REMOVED***
			swap(index,parent);
			bubbleUp(parent);
		***REMOVED*** else ***REMOVED***
			return;
		***REMOVED***
	***REMOVED***

	var swapUntilQueueIsCorrect = function(value) ***REMOVED***
		var left = getLeftOf(value);
		var right = getRightOf(value);
		if (evaluate(left,value)) ***REMOVED***
			swap(value,left);
			swapUntilQueueIsCorrect(left);
		***REMOVED*** else if (evaluate(right,value)) ***REMOVED***
			swap(value,right);
			swapUntilQueueIsCorrect(right);
		***REMOVED*** else if (value==0) ***REMOVED***
			return;
		***REMOVED*** else ***REMOVED***
			swapUntilQueueIsCorrect(0);
		***REMOVED***
	***REMOVED***

	var swap = function(self,target) ***REMOVED***
		var placeHolder = queue[self];
		queue[self] = queue[target];
		queue[target] = placeHolder;
	***REMOVED***

	var evaluate = function(self,target) ***REMOVED***
		if (queue[target]===undefined||queue[self]===undefined) ***REMOVED***
			return false;
		***REMOVED***

		var selfValue;
		var targetValue;

		// Check if the criteria should be the result of a function call.
		if (typeof queue[self][criteria] === 'function') ***REMOVED***
			selfValue = queue[self][criteria]();
			targetValue = queue[target][criteria]();
		***REMOVED*** else ***REMOVED***
			selfValue = queue[self][criteria];
			targetValue = queue[target][criteria];
		***REMOVED***

		if (isMax) ***REMOVED***
			if (selfValue > targetValue) ***REMOVED***
				return true;
			***REMOVED*** else ***REMOVED***
				return false;
			***REMOVED***
		***REMOVED*** else ***REMOVED***
			if (selfValue < targetValue) ***REMOVED***
				return true;
			***REMOVED*** else ***REMOVED***
				return false;
			***REMOVED***
		***REMOVED***
	***REMOVED***

	var getParentOf = function(index) ***REMOVED***
		return Math.floor((index-1) / 2);
	***REMOVED***

	var getLeftOf = function(index) ***REMOVED***
		return index*2 + 1;
	***REMOVED***

	var getRightOf = function(index) ***REMOVED***
		return index*2 + 2;
	***REMOVED***
***REMOVED***;

// Constants
EasyStar.PriorityQueue.MAX_HEAP = 0;
EasyStar.PriorityQueue.MIN_HEAP = 1;

/**
 * Represents a single instance of EasyStar.
 * A path that is in the queue to eventually be found.
 */
EasyStar.instance = function() ***REMOVED***
	this.isDoneCalculating = true;
	this.pointsToAvoid = ***REMOVED******REMOVED***;
	this.startX;
	this.callback;
	this.startY;
	this.endX;
	this.endY;
	this.nodeHash = ***REMOVED******REMOVED***;
	this.openList;
***REMOVED***;
/**
*	EasyStar.js
*	github.com/prettymuchbryce/EasyStarJS
*	Licensed under the MIT license.
*
*	Implementation By Bryce Neal (@prettymuchbryce)
**/
EasyStar.js = function() ***REMOVED***
	var STRAIGHT_COST = 1.0;
	var DIAGONAL_COST = 1.4;
	var syncEnabled = false;
	var pointsToAvoid = ***REMOVED******REMOVED***;
	var collisionGrid;
	var costMap = ***REMOVED******REMOVED***;
	var pointsToCost = ***REMOVED******REMOVED***;
	var allowCornerCutting = true;
	var iterationsSoFar;
	var instances = [];
	var iterationsPerCalculation = Number.MAX_VALUE;
	var acceptableTiles;
	var diagonalsEnabled = false;

	/**
	* Sets the collision grid that EasyStar uses.
	*
	* @param ***REMOVED***Array|Number***REMOVED*** tiles An array of numbers that represent
	* which tiles in your grid should be considered
	* acceptable, or "walkable".
	**/
	this.setAcceptableTiles = function(tiles) ***REMOVED***
		if (tiles instanceof Array) ***REMOVED***
			// Array
			acceptableTiles = tiles;
		***REMOVED*** else if (!isNaN(parseFloat(tiles)) && isFinite(tiles)) ***REMOVED***
			// Number
			acceptableTiles = [tiles];
		***REMOVED***
	***REMOVED***;

	/**
	* Enables sync mode for this EasyStar instance..
	* if you're into that sort of thing.
	**/
	this.enableSync = function() ***REMOVED***
		syncEnabled = true;
	***REMOVED***;

	/**
	* Disables sync mode for this EasyStar instance.
	**/
	this.disableSync = function() ***REMOVED***
		syncEnabled = false;
	***REMOVED***;

	/**
	 * Enable diagonal pathfinding.
	 */
	this.enableDiagonals = function() ***REMOVED***
		diagonalsEnabled = true;
	***REMOVED***

	/**
	 * Disable diagonal pathfinding.
	 */
	this.disableDiagonals = function() ***REMOVED***
		diagonalsEnabled = false;
	***REMOVED***

	/**
	* Sets the collision grid that EasyStar uses.
	*
	* @param ***REMOVED***Array***REMOVED*** grid The collision grid that this EasyStar instance will read from.
	* This should be a 2D Array of Numbers.
	**/
	this.setGrid = function(grid) ***REMOVED***
		collisionGrid = grid;

		//Setup cost map
		for (var y = 0; y < collisionGrid.length; y++) ***REMOVED***
			for (var x = 0; x < collisionGrid[0].length; x++) ***REMOVED***
				if (!costMap[collisionGrid[y][x]]) ***REMOVED***
					costMap[collisionGrid[y][x]] = 1
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***;

	/**
	* Sets the tile cost for a particular tile type.
	*
	* @param ***REMOVED***Number***REMOVED*** The tile type to set the cost for.
	* @param ***REMOVED***Number***REMOVED*** The multiplicative cost associated with the given tile.
	**/
	this.setTileCost = function(tileType, cost) ***REMOVED***
		costMap[tileType] = cost;
	***REMOVED***;

	/**
	* Sets the an additional cost for a particular point.
	* Overrides the cost from setTileCost.
	*
	* @param ***REMOVED***Number***REMOVED*** x The x value of the point to cost.
	* @param ***REMOVED***Number***REMOVED*** y The y value of the point to cost.
	* @param ***REMOVED***Number***REMOVED*** The multiplicative cost associated with the given point.
	**/
	this.setAdditionalPointCost = function(x, y, cost) ***REMOVED***
		pointsToCost[x + '_' + y] = cost;
	***REMOVED***;

	/**
	* Remove the additional cost for a particular point.
	*
	* @param ***REMOVED***Number***REMOVED*** x The x value of the point to stop costing.
	* @param ***REMOVED***Number***REMOVED*** y The y value of the point to stop costing.
	**/
	this.removeAdditionalPointCost = function(x, y) ***REMOVED***
		delete pointsToCost[x + '_' + y];
	***REMOVED***

	/**
	* Remove all additional point costs.
	**/
	this.removeAllAdditionalPointCosts = function() ***REMOVED***
		pointsToCost = ***REMOVED******REMOVED***;
	***REMOVED***

	/**
	* Sets the number of search iterations per calculation.
	* A lower number provides a slower result, but more practical if you
	* have a large tile-map and don't want to block your thread while
	* finding a path.
	*
	* @param ***REMOVED***Number***REMOVED*** iterations The number of searches to prefrom per calculate() call.
	**/
	this.setIterationsPerCalculation = function(iterations) ***REMOVED***
		iterationsPerCalculation = iterations;
	***REMOVED***;

	/**
	* Avoid a particular point on the grid,
	* regardless of whether or not it is an acceptable tile.
	*
	* @param ***REMOVED***Number***REMOVED*** x The x value of the point to avoid.
	* @param ***REMOVED***Number***REMOVED*** y The y value of the point to avoid.
	**/
	this.avoidAdditionalPoint = function(x, y) ***REMOVED***
		pointsToAvoid[x + "_" + y] = 1;
	***REMOVED***;

	/**
	* Stop avoiding a particular point on the grid.
	*
	* @param ***REMOVED***Number***REMOVED*** x The x value of the point to stop avoiding.
	* @param ***REMOVED***Number***REMOVED*** y The y value of the point to stop avoiding.
	**/
	this.stopAvoidingAdditionalPoint = function(x, y) ***REMOVED***
		delete pointsToAvoid[x + "_" + y];
	***REMOVED***;

	/**
	* Enables corner cutting in diagonal movement.
	**/
	this.enableCornerCutting = function() ***REMOVED***
		allowCornerCutting = true;
	***REMOVED***;

	/**
	* Disables corner cutting in diagonal movement.
	**/
	this.disableCornerCutting = function() ***REMOVED***
		allowCornerCutting = false;
	***REMOVED***;

	/**
	* Stop avoiding all additional points on the grid.
	**/
	this.stopAvoidingAllAdditionalPoints = function() ***REMOVED***
		pointsToAvoid = ***REMOVED******REMOVED***;
	***REMOVED***;

	/**
	* Find a path.
	*
	* @param ***REMOVED***Number***REMOVED*** startX The X position of the starting point.
	* @param ***REMOVED***Number***REMOVED*** startY The Y position of the starting point.
	* @param ***REMOVED***Number***REMOVED*** endX The X position of the ending point.
	* @param ***REMOVED***Number***REMOVED*** endY The Y position of the ending point.
	* @param ***REMOVED***Function***REMOVED*** callback A function that is called when your path
	* is found, or no path is found.
	*
	**/
	this.findPath = function(startX, startY, endX, endY, callback) ***REMOVED***
		// Wraps the callback for sync vs async logic
		var callbackWrapper = function(result) ***REMOVED***
			if (syncEnabled) ***REMOVED***
				callback(result);
			***REMOVED*** else ***REMOVED***
				setTimeout(function() ***REMOVED***
					callback(result);
				***REMOVED***);
			***REMOVED***
		***REMOVED***

		// No acceptable tiles were set
		if (acceptableTiles === undefined) ***REMOVED***
			throw new Error("You can't set a path without first calling setAcceptableTiles() on EasyStar.");
		***REMOVED***
		// No grid was set
		if (collisionGrid === undefined) ***REMOVED***
			throw new Error("You can't set a path without first calling setGrid() on EasyStar.");
		***REMOVED***

		// Start or endpoint outside of scope.
		if (startX < 0 || startY < 0 || endX < 0 || endX < 0 ||
		startX > collisionGrid[0].length-1 || startY > collisionGrid.length-1 ||
		endX > collisionGrid[0].length-1 || endY > collisionGrid.length-1) ***REMOVED***
			throw new Error("Your start or end point is outside the scope of your grid.");
		***REMOVED***

		// Start and end are the same tile.
		if (startX===endX && startY===endY) ***REMOVED***
			callbackWrapper([]);
			return;
		***REMOVED***

		// End point is not an acceptable tile.
		var endTile = collisionGrid[endY][endX];
		var isAcceptable = false;
		for (var i = 0; i < acceptableTiles.length; i++) ***REMOVED***
			if (endTile === acceptableTiles[i]) ***REMOVED***
				isAcceptable = true;
				break;
			***REMOVED***
		***REMOVED***

		if (isAcceptable === false) ***REMOVED***
			callbackWrapper(null);
			return;
		***REMOVED***

		// Create the instance
		var instance = new EasyStar.instance();
		instance.openList = new EasyStar.PriorityQueue("bestGuessDistance",EasyStar.PriorityQueue.MIN_HEAP);
		instance.isDoneCalculating = false;
		instance.nodeHash = ***REMOVED******REMOVED***;
		instance.startX = startX;
		instance.startY = startY;
		instance.endX = endX;
		instance.endY = endY;
		instance.callback = callbackWrapper;

		instance.openList.insert(coordinateToNode(instance, instance.startX,
			instance.startY, null, STRAIGHT_COST));

		instances.push(instance);
	***REMOVED***;

	/**
	* This method steps through the A* Algorithm in an attempt to
	* find your path(s). It will search 4-8 tiles (depending on diagonals) for every calculation.
	* You can change the number of calculations done in a call by using
	* easystar.setIteratonsPerCalculation().
	**/
	this.calculate = function() ***REMOVED***
		if (instances.length === 0 || collisionGrid === undefined || acceptableTiles === undefined) ***REMOVED***
			return;
		***REMOVED***
		for (iterationsSoFar = 0; iterationsSoFar < iterationsPerCalculation; iterationsSoFar++) ***REMOVED***
			if (instances.length === 0) ***REMOVED***
				return;
			***REMOVED***

			if (syncEnabled) ***REMOVED***
				// If this is a sync instance, we want to make sure that it calculates synchronously.
				iterationsSoFar = 0;
			***REMOVED***

			// Couldn't find a path.
			if (instances[0].openList.length === 0) ***REMOVED***
				var ic = instances[0];
				ic.callback(null);
				instances.shift();
				continue;
			***REMOVED***

			var searchNode = instances[0].openList.shiftHighestPriorityElement();

			var tilesToSearch = [];
			searchNode.list = EasyStar.Node.CLOSED_LIST;

			if (searchNode.y > 0) ***REMOVED***
				tilesToSearch.push(***REMOVED*** instance: instances[0], searchNode: searchNode,
					x: 0, y: -1, cost: STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y-1)***REMOVED***);
			***REMOVED***
			if (searchNode.x < collisionGrid[0].length-1) ***REMOVED***
				tilesToSearch.push(***REMOVED*** instance: instances[0], searchNode: searchNode,
					x: 1, y: 0, cost: STRAIGHT_COST * getTileCost(searchNode.x+1, searchNode.y)***REMOVED***);
			***REMOVED***
			if (searchNode.y < collisionGrid.length-1) ***REMOVED***
				tilesToSearch.push(***REMOVED*** instance: instances[0], searchNode: searchNode,
					x: 0, y: 1, cost: STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y+1)***REMOVED***);
			***REMOVED***
			if (searchNode.x > 0) ***REMOVED***
				tilesToSearch.push(***REMOVED*** instance: instances[0], searchNode: searchNode,
					x: -1, y: 0, cost: STRAIGHT_COST * getTileCost(searchNode.x-1, searchNode.y)***REMOVED***);
			***REMOVED***
			if (diagonalsEnabled) ***REMOVED***
				if (searchNode.x > 0 && searchNode.y > 0) ***REMOVED***

					if (allowCornerCutting ||
						(isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y-1) &&
						isTileWalkable(collisionGrid, acceptableTiles, searchNode.x-1, searchNode.y))) ***REMOVED***

						tilesToSearch.push(***REMOVED*** instance: instances[0], searchNode: searchNode,
							x: -1, y: -1, cost: DIAGONAL_COST * getTileCost(searchNode.x-1, searchNode.y-1)***REMOVED***);
					***REMOVED***
				***REMOVED***
				if (searchNode.x < collisionGrid[0].length-1 && searchNode.y < collisionGrid.length-1) ***REMOVED***

					if (allowCornerCutting ||
						(isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y+1) &&
						isTileWalkable(collisionGrid, acceptableTiles, searchNode.x+1, searchNode.y))) ***REMOVED***

						tilesToSearch.push(***REMOVED*** instance: instances[0], searchNode: searchNode,
							x: 1, y: 1, cost: DIAGONAL_COST * getTileCost(searchNode.x+1, searchNode.y+1)***REMOVED***);
					***REMOVED***
				***REMOVED***
				if (searchNode.x < collisionGrid[0].length-1 && searchNode.y > 0) ***REMOVED***

					if (allowCornerCutting ||
						(isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y-1) &&
						isTileWalkable(collisionGrid, acceptableTiles, searchNode.x+1, searchNode.y))) ***REMOVED***


						tilesToSearch.push(***REMOVED*** instance: instances[0], searchNode: searchNode,
							x: 1, y: -1, cost: DIAGONAL_COST * getTileCost(searchNode.x+1, searchNode.y-1)***REMOVED***);
					***REMOVED***
				***REMOVED***
				if (searchNode.x > 0 && searchNode.y < collisionGrid.length-1) ***REMOVED***

					if (allowCornerCutting ||
						(isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y+1) &&
						isTileWalkable(collisionGrid, acceptableTiles, searchNode.x-1, searchNode.y))) ***REMOVED***


						tilesToSearch.push(***REMOVED*** instance: instances[0], searchNode: searchNode,
							x: -1, y: 1, cost: DIAGONAL_COST * getTileCost(searchNode.x-1, searchNode.y+1)***REMOVED***);
					***REMOVED***
				***REMOVED***
			***REMOVED***

			// First sort all of the potential nodes we could search by their cost + heuristic distance.
			tilesToSearch.sort(function(a, b) ***REMOVED***
				var aCost = a.cost + getDistance(searchNode.x + a.x, searchNode.y + a.y, instances[0].endX, instances[0].endY)
				var bCost = b.cost + getDistance(searchNode.x + b.x, searchNode.y + b.y, instances[0].endX, instances[0].endY)
				if (aCost < bCost) ***REMOVED***
					return -1;
				***REMOVED*** else if (aCost === bCost) ***REMOVED***
					return 0;
				***REMOVED*** else ***REMOVED***
					return 1;
				***REMOVED***
			***REMOVED***);

			var isDoneCalculating = false;

			// Search all of the surrounding nodes
			for (var i = 0; i < tilesToSearch.length; i++) ***REMOVED***
				checkAdjacentNode(tilesToSearch[i].instance, tilesToSearch[i].searchNode,
					tilesToSearch[i].x, tilesToSearch[i].y, tilesToSearch[i].cost);
				if (tilesToSearch[i].instance.isDoneCalculating === true) ***REMOVED***
					isDoneCalculating = true;
					break;
				***REMOVED***
			***REMOVED***

			if (isDoneCalculating) ***REMOVED***
				instances.shift();
				continue;
			***REMOVED***

		***REMOVED***
	***REMOVED***;

	// Private methods follow
	var checkAdjacentNode = function(instance, searchNode, x, y, cost) ***REMOVED***
		var adjacentCoordinateX = searchNode.x+x;
		var adjacentCoordinateY = searchNode.y+y;

		if (pointsToAvoid[adjacentCoordinateX + "_" + adjacentCoordinateY] === undefined) ***REMOVED***
			// Handles the case where we have found the destination
			if (instance.endX === adjacentCoordinateX && instance.endY === adjacentCoordinateY) ***REMOVED***
				instance.isDoneCalculating = true;
				var path = [];
				var pathLen = 0;
				path[pathLen] = ***REMOVED***x: adjacentCoordinateX, y: adjacentCoordinateY***REMOVED***;
				pathLen++;
				path[pathLen] = ***REMOVED***x: searchNode.x, y:searchNode.y***REMOVED***;
				pathLen++;
				var parent = searchNode.parent;
				while (parent!=null) ***REMOVED***
					path[pathLen] = ***REMOVED***x: parent.x, y:parent.y***REMOVED***;
					pathLen++;
					parent = parent.parent;
				***REMOVED***
				path.reverse();
				var ic = instance;
				var ip = path;
				ic.callback(ip);
				return
			***REMOVED***

			if (isTileWalkable(collisionGrid, acceptableTiles, adjacentCoordinateX, adjacentCoordinateY)) ***REMOVED***
				var node = coordinateToNode(instance, adjacentCoordinateX,
					adjacentCoordinateY, searchNode, cost);

				if (node.list === undefined) ***REMOVED***
					node.list = EasyStar.Node.OPEN_LIST;
					instance.openList.insert(node);
				***REMOVED*** else if (node.list === EasyStar.Node.OPEN_LIST) ***REMOVED***
					if (searchNode.costSoFar + cost < node.costSoFar) ***REMOVED***
						node.costSoFar = searchNode.costSoFar + cost;
						node.parent = searchNode;
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***;

	// Helpers
	var isTileWalkable = function(collisionGrid, acceptableTiles, x, y) ***REMOVED***
		for (var i = 0; i < acceptableTiles.length; i++) ***REMOVED***
			if (collisionGrid[y][x] === acceptableTiles[i]) ***REMOVED***
				return true;
			***REMOVED***
		***REMOVED***

		return false;
	***REMOVED***;

	var getTileCost = function(x, y) ***REMOVED***
		return pointsToCost[x + '_' + y] || costMap[collisionGrid[y][x]]
	***REMOVED***;

	var coordinateToNode = function(instance, x, y, parent, cost) ***REMOVED***
		if (instance.nodeHash[x + "_" + y]!==undefined) ***REMOVED***
			return instance.nodeHash[x + "_" + y];
		***REMOVED***
		var simpleDistanceToTarget = getDistance(x, y, instance.endX, instance.endY);
		if (parent!==null) ***REMOVED***
			var costSoFar = parent.costSoFar + cost;
		***REMOVED*** else ***REMOVED***
			costSoFar = simpleDistanceToTarget;
		***REMOVED***
		var node = new EasyStar.Node(parent,x,y,costSoFar,simpleDistanceToTarget);
		instance.nodeHash[x + "_" + y] = node;
		return node;
	***REMOVED***;

	var getDistance = function(x1,y1,x2,y2) ***REMOVED***
		return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
	***REMOVED***;
***REMOVED***
