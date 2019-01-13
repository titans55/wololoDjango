var isVillageSelected = false;
var infos = JSON.parse($('.map-data').attr('map-data'))
var winW = document.body.offsetWidth;
var winH = document.body.offsetHeight;

var game = new Phaser.Game(winW / 2, winH / 3 * 2, Phaser.AUTO, 'game-container', ***REMOVED*** preload: preload, create: create, update: update ***REMOVED***);

function preload() ***REMOVED***
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.load.image("tiles", "../static/wololo/mapAssets/tilesets/overworld_tileset_grass.png");
    game.load.tilemap('map', '../static/wololo/mapAssets/tilemaps/mapv2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('castle', '../static/wololo/mapAssets/sprites/castle.png', ***REMOVED*** frameWidth: 48, frameHeight: 48 ***REMOVED***);
    game.load.spritesheet('selected', '../static/wololo/mapAssets/sprites/selection-circle_1_64x64.png', ***REMOVED*** frameWidth: 64, frameHeight: 64 ***REMOVED***);
***REMOVED***

function create() ***REMOVED***
    createMap();
    loadVillages(infos);
***REMOVED***

function update(time, delta) ***REMOVED***
    drag();
***REMOVED***

function createMap() ***REMOVED***
    map = game.add.tilemap('map');
    const tileset = map.addTilesetImage("Tile", "tiles");
    layer = map.createLayer('groundLayer');
    layer.resizeWorld();
***REMOVED***

function loadVillages(infos) ***REMOVED***
    var sprite
    infos.forEach(function(element) ***REMOVED***
        sprite = game.add.sprite(element.coords.x, element.coords.y, 'castle');
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
        selectedIndicator.kill();
        isVillageSelected = false;
    ***REMOVED***
    selectedIndicator = game.add.sprite(sprite.x - 10, sprite.y - 8, 'selected');
    isVillageSelected = true;
***REMOVED***

function onHoverListener(sprite, event) ***REMOVED***
    let mousePositionX = event.pageX;
    let mousePositionY = event.pageY;
    $('#tooltip span').html(sprite.playerName + "<br>" + sprite.villageName);
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