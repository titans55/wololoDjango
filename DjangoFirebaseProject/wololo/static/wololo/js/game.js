var isVillageSelected = false;
var infos = JSON.parse($('.map-data').attr('map-data'))
var winW = document.body.offsetWidth;
var winH = document.body.offsetHeight;

game = new Phaser.Game(winW / 2, winH / 3 * 2, Phaser.AUTO, 'game-container', ***REMOVED*** preload: preload, create: create, update: update ***REMOVED***);

function preload() ***REMOVED***
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.load.image("tiles", "../static/wololo/mapAssets/tilesets/overworld_tileset_grass.png");
    game.load.tilemap('map', '../static/wololo/mapAssets/tilemaps/mapv3.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('castle', '../static/wololo/mapAssets/sprites/castle.png', ***REMOVED*** frameWidth: 48, frameHeight: 48 ***REMOVED***);
    game.load.spritesheet('pathDot', '../static/wololo/mapAssets/sprites/pathDot.png', ***REMOVED*** frameWidth: 16, frameHeight: 16 ***REMOVED***);
    game.load.spritesheet('selected', '../static/wololo/mapAssets/sprites/selection-circle_1_64x64.png', ***REMOVED*** frameWidth: 64, frameHeight: 64 ***REMOVED***);
***REMOVED***

function create() ***REMOVED***
    createMap();
    loadVillages(infos);

    

    // initialize pathfinding
    tile_dimensions = new Phaser.Point(map.tileWidth, map.tileHeight);
    this.pathfinding = this.game.plugins.add(PathfindingExample.Pathfinding, map.layers[1].data, [-1], tile_dimensions);
    let targetX = 112
    let targetY = 368
    let fromX = 0
    let fromY = 0
    if(fromX > targetX)***REMOVED***
        // pathStartX = 
        if(fromY > targetY)***REMOVED***
            let target_position = new Phaser.Point(targetX, targetY)
            let from = new Phaser.Point(fromX, fromY)
            this.pathfinding.find_path(from, target_position, this.move_through_path, this)
        ***REMOVED***else***REMOVED***
            let target_position = new Phaser.Point(targetX, targetY)
            let from = new Phaser.Point(fromX, fromY)
            this.pathfinding.find_path(from, target_position, this.move_through_path, this)
        ***REMOVED***
    ***REMOVED***else***REMOVED***
        if(fromY > targetY)***REMOVED***
            let target_position = new Phaser.Point(targetX, targetY)
            let from = new Phaser.Point(fromX, fromY)
            this.pathfinding.find_path(from, target_position, this.move_through_path, this)
        ***REMOVED***else***REMOVED***
            let target_position = new Phaser.Point(targetX, targetY)
            let from = new Phaser.Point(fromX, fromY)
            this.pathfinding.find_path(from, target_position, this.move_through_path, this)
        ***REMOVED***
    ***REMOVED***
    // let target_position = new Phaser.Point(targetX, targetY+16)
    // let from = new Phaser.Point(fromX, fromY+16)
    // this.pathfinding.find_path(from, target_position, this.move_through_path, this)
  

  
***REMOVED***

function update(time, delta) ***REMOVED***
    drag();
***REMOVED***

function createMap() ***REMOVED***
    map = game.add.tilemap('map');
    const tileset = map.addTilesetImage("Tile", "tiles");
    groundLayer = map.createLayer('groundLayer');
    groundLayer.resizeWorld();
    seaLayer = map.createLayer('seaLayer');
    // collision layer
    collision_tiles = [];
    seaLayer.layer.data.forEach(function (data_row) ***REMOVED*** // find tiles used in the layer
        data_row.forEach(function (tile) ***REMOVED***
            // check if it's a valid tile index and isn't already in the list
            if (tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) ***REMOVED***
                collision_tiles.push(tile.index);
            ***REMOVED***
        ***REMOVED***, this);
    ***REMOVED***, this);
    map.setCollision(collision_tiles, true, seaLayer.layer.name);
    // console.log(collision_tiles, "bababa")    
    seaLayer.resizeWorld();
***REMOVED***

function loadVillages(infos) ***REMOVED***
    var sprite
    infos.forEach(function(element) ***REMOVED***
        sprite = game.add.sprite(element.coords.x, element.coords.y, 'castle');
        sprite.village_id = element.village_id;
        sprite.user_id = element.user_id;
        sprite.owner = element.owner ? 'yours' : ''
        sprite.villageName = element.villageName;
        sprite.playerName = element.playerName;
        sprite.x = element.coords.x;
        sprite.y = element.coords.y;
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(onClickListener, sprite);
        sprite.events.onInputOver.add(onHoverListener, sprite);
        sprite.events.onInputOut.add(onOutListener, sprite);
    ***REMOVED***)
***REMOVED***

function onClickListener(sprite) ***REMOVED***
    if (isVillageSelected) ***REMOVED***
        console.log(selectedIndicator)
        selectedIndicator.kill();
        isVillageSelected = false;
    ***REMOVED***else***REMOVED***
        selectedIndicator = game.add.sprite(sprite.x - 10, sprite.y - 8, 'selected');
        isVillageSelected = true;
        initSideBar(sprite)
    ***REMOVED***
    
***REMOVED***

function onHoverListener(sprite, event) ***REMOVED***
    let mousePositionX = event.pageX;
    let mousePositionY = event.pageY;
    $('#tooltip span').html(sprite.playerName + "<br>" + sprite.villageName + "<br>" + sprite.owner);
    $('#tooltip').stop(false, true).fadeIn(1000);
    $('#tooltip').css(***REMOVED*** 'top': mousePositionY - winH / 18, 'left': mousePositionX - winW / 40 + 40 ***REMOVED***);
***REMOVED***

function onOutListener(sprite) ***REMOVED***
    $('#tooltip').stop(false, true).fadeOut(0);
***REMOVED***

function drag() ***REMOVED***
    if (game.input.activePointer.isDown) ***REMOVED***
        if (game.origDragPoint) ***REMOVED*** // move the camera by the amount the mouse has moved since last update
            game.camera.x += game.origDragPoint.x - game.input.activePointer.position.x;
            game.camera.y += game.origDragPoint.y - game.input.activePointer.position.y;
        ***REMOVED*** // set new drag origin to current position
        game.origDragPoint = game.input.activePointer.position.clone();
    ***REMOVED*** else ***REMOVED***
        game.origDragPoint = null;
    ***REMOVED***
***REMOVED***

//--//

function initSideBar(sprite)***REMOVED***
    $("#villageOverview").find(".card-title").html(sprite.villageName)
    $("#villageOverview").find(".card-text").html("Belongs to "+ sprite.playerName)
***REMOVED***