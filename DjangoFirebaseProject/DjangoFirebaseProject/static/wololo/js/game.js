var isVillageSelected = false;
var infos = JSON.parse($('.map-data').attr('map-data'))
var selectedVillage = JSON.parse(($('.selected-village').attr('data')).replace(/'/g, '"'))

var winW = document.body.offsetWidth;
var winH = document.body.offsetHeight;

game = new Phaser.Game(winW / 2, winH / 3 * 2, Phaser.AUTO, 'game-container', ***REMOVED*** preload: preload, create: create, update: update ***REMOVED***);

function preload() ***REMOVED***
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    // game.load.image("tiles", "../static/wololo/mapAssets/tilesets/overworld_tileset_grass.png");
    // game.load.tilemap('map', '../static/wololo/mapAssets/tilemaps/mapv3.json', null, Phaser.Tilemap.TILED_JSON);
    // game.load.spritesheet('castle', '../static/wololo/mapAssets/sprites/castle.png', ***REMOVED*** frameWidth: 48, frameHeight: 48 ***REMOVED***);
    // game.load.spritesheet('pathDot', '../static/wololo/mapAssets/sprites/pathDot.png', ***REMOVED*** frameWidth: 16, frameHeight: 16 ***REMOVED***);
    // game.load.spritesheet('selected', '../static/wololo/mapAssets/sprites/selection-circle_1_64x64.png', ***REMOVED*** frameWidth: 64, frameHeight: 64 ***REMOVED***);
    game.load.image("tiles", " http://titans55.pythonanywhere.com/static/wololo/mapAssets/tilesets/overworld_tileset_grass.png");
    game.load.tilemap('map', ' http://titans55.pythonanywhere.com/static/wololo/mapAssets/tilemaps/mapv3.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('castle', ' http://titans55.pythonanywhere.com/static/wololo/mapAssets/sprites/castle.png', ***REMOVED*** frameWidth: 48, frameHeight: 48 ***REMOVED***);
    game.load.spritesheet('pathDot', ' http://titans55.pythonanywhere.com/static/wololo/mapAssets/sprites/pathDot.png', ***REMOVED*** frameWidth: 16, frameHeight: 16 ***REMOVED***);
    game.load.spritesheet('selected', ' http://titans55.pythonanywhere.com/static/wololo/mapAssets/sprites/selection-circle_1_64x64.png', ***REMOVED*** frameWidth: 64, frameHeight: 64 ***REMOVED***);
***REMOVED***

function create() ***REMOVED***
    createMap();
    loadVillages(infos);
    initSwitchVillage()
    
    console.log(infos)
    // initialize pathfinding

    // let targetX = 112
    // let targetY = 384
    // let fromX = 0
    // let fromY = 0
    // let target_position = new Phaser.Point(targetX, targetY)
    // let from = new Phaser.Point(fromX, fromY)
    
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
    tile_dimensions = new Phaser.Point(map.tileWidth, map.tileHeight);
    pathfinding = this.game.plugins.add(PathfindingExample.Pathfinding, map.layers[1].data, [-1], tile_dimensions);
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
    console.log(selectedVillage)
    if (isVillageSelected) ***REMOVED***
        console.log(selectedIndicator)
        selectedIndicator.kill();
        isVillageSelected = false;
        selectedIndicator = game.add.sprite(sprite.x - 10, sprite.y - 8, 'selected');
        isVillageSelected = true;
        initSideBar(sprite)

        removePathSprites()
        if(!sprite.owner)***REMOVED***
            let target_position = new Phaser.Point(sprite.x, sprite.y)
            let from = new Phaser.Point(selectedVillage.coords.x, selectedVillage.coords.y)
            pathfinding.find_path(from, target_position, this.move_through_path, this)
        ***REMOVED***
    ***REMOVED***else***REMOVED***
        selectedIndicator = game.add.sprite(sprite.x - 10, sprite.y - 8, 'selected');
        isVillageSelected = true;
        initSideBar(sprite)

        if(!sprite.owner)***REMOVED***
            let target_position = new Phaser.Point(sprite.x, sprite.y)
            let from = new Phaser.Point(selectedVillage.coords.x, selectedVillage.coords.y)
            pathfinding.find_path(from, target_position, this.move_through_path, this)
        ***REMOVED***
    ***REMOVED***
    
***REMOVED***

function onHoverListener(sprite, event) ***REMOVED***
    document.body.style.cursor = "pointer";

    let mousePositionX = event.pageX;
    let mousePositionY = event.pageY;
    $('#tooltip span').html(sprite.playerName + "<br>" + sprite.villageName + "<br>" + sprite.owner);
    $('#tooltip').stop(false, true).fadeIn(1000);
    $('#tooltip').css(***REMOVED*** 'top': mousePositionY - winH / 18, 'left': mousePositionX - winW / 40 + 40 ***REMOVED***);


    var tooltip = document.querySelectorAll('#tooltip');

    function fn(e) ***REMOVED***
        for (var i=tooltip.length; i--;) ***REMOVED***
            tooltip[i].style.left = e.pageX + 'px';
            tooltip[i].style.top = e.pageY + 'px';
        ***REMOVED***
    ***REMOVED***

    document.addEventListener('mousemove', fn, false);

***REMOVED***

function onOutListener(sprite) ***REMOVED***
    $('#tooltip').stop(false, true).fadeOut(0);

    document.body.style.cursor = "default";

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
    // $("#villageOverview").show()
    $("#villageOverview").removeClass("d-none")
    $("#villageOverview").addClass("animated")
    $("#villageOverview").find(".card-title").html(sprite.villageName)
    $("#villageOverview").find(".card-text").html("Belongs to "+ sprite.playerName)
***REMOVED***

function initSwitchVillage()***REMOVED***
    $(".switchVillage").on('click', function()***REMOVED***
        removePathSprites()
        let switchedVillageCoords = JSON.parse($(this).attr('coords').replace(/'/g, '"'))
        console.log(switchedVillageCoords)
        selectedVillage.coords.x = switchedVillageCoords.x
        selectedVillage.coords.y = switchedVillageCoords.y
    ***REMOVED***)
***REMOVED***

function removePathSprites()***REMOVED***
    if(pathSprites != undefined)***REMOVED***
        pathSprites.forEach(sprite => ***REMOVED*** 
            sprite.kill()
            console.log(sprite, "killing")
        ***REMOVED***);
    ***REMOVED***
***REMOVED***