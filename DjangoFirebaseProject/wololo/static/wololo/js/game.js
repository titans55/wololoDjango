var isVillageSelected = false;
winW = document.body.offsetWidth;
winH = document.body.offsetHeight;
console.log(winW)
console.log(winH)
var game = new Phaser.Game(winW / 2, winH / 3 * 2, Phaser.AUTO, 'game-container', ***REMOVED*** preload: preload, create: create, update: update ***REMOVED***);
var infos = [
    ***REMOVED*** posX: 8, posY: 7, owner: 'Muco', soldiers: 186 ***REMOVED***,
    ***REMOVED*** posX: 280, posY: 40, owner: 'Muco', soldiers: 242 ***REMOVED***,
    ***REMOVED*** posX: 450, posY: 220, owner: 'Kutay', soldiers: 777 ***REMOVED***,
    ***REMOVED*** posX: 250, posY: 322, owner: 'Kutay', soldiers: 0 ***REMOVED***,
    ***REMOVED*** posX: 333, posY: 88, owner: 'Giannis', soldiers: 32 ***REMOVED***,
    ***REMOVED*** posX: 677, posY: 480, owner: 'Giannis', soldiers: 88 ***REMOVED***
]

function preload() ***REMOVED***
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.load.image("tiles", "static/wololo/mapAssets/tilesets/overworld_tileset_grass.png");
    game.load.tilemap('map', 'static/wololo/mapAssets/tilemaps/mapv2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('castle', 'static/wololo/mapAssets/sprites/castle.png', ***REMOVED*** frameWidth: 48, frameHeight: 48 ***REMOVED***);
    game.load.spritesheet('selected', 'static/wololo/mapAssets/sprites/selection-circle_1_64x64.png', ***REMOVED*** frameWidth: 64, frameHeight: 64 ***REMOVED***);
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
    infos.forEach(function(element) ***REMOVED***
        var sprite = game.add.sprite(element.posX, element.posY, 'castle');
        sprite.owner = element.owner;
        sprite.soldiers = element.soldiers;
        sprite.x = element.posX;
        sprite.y = element.posY;
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(onClickListener, sprite);
        sprite.events.onInputOver.add(onHoverListener, sprite);
        sprite.events.onInputOut.add(onOutListener, sprite);

    ***REMOVED***)
***REMOVED***

function onClickListener(sprite) ***REMOVED***
    console.log("This village owned by = " + sprite.owner)
    console.log("Number of soldiers = " + sprite.soldiers)
    console.log("Coords = " + sprite.x + " " + sprite.y)
    if (isVillageSelected) ***REMOVED***
        selectedIndicator.kill();
        isVillageSelected = false;
    ***REMOVED***
    selectedIndicator = game.add.sprite(sprite.x - 10, sprite.y - 8, 'selected');
    isVillageSelected = true;

***REMOVED***

function onHoverListener(sprite, event) ***REMOVED***
    console.log("hovering village of " + sprite.owner);
    let mousePositionX = event.pageX;
    let mousePositionY = event.pageY;

    $('#tooltip span').html(sprite.owner);
    $('#tooltip').stop(false, true).fadeIn(1000);
    $('#tooltip').css(***REMOVED*** 'top': mousePositionY - winH / 18, 'left': mousePositionX - winW / 40 + 40 ***REMOVED***);

***REMOVED***

function onOutListener(sprite) ***REMOVED***
    console.log("OUTTT " + sprite.owner)
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