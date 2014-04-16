var Mapa = {};

Mapa = function(game) {
    this.game = game;
    this.map;
    this.layer;
    this.player;
};

var tileset;
var facing = "left";
var cursors;
var hozMove = 300;
var vertMove = -300;
var cursors;
Mapa.prototype.preload = function() {

    game.load.image('tiles', 'assets/tijolo22x32.png', 22, 32);
    game.load.image('nave', 'assets/phaser-ship.png');
    game.load.tilemap('map', 'assets/mapa.json', null, Phaser.Tilemap.TILED_JSON);
};

Mapa.prototype.create = function() {
    // Make the background color of the game's stage be white (#FFFFFF)
    //  game.stage.backgroundColor = '#FFB90F';
    this.map = game.add.tilemap('map');
    this.tileset = this.map.addTilesetImage('tijolo', 'tiles');
    this.layer = this.map.createLayer('Camada de Tiles 1');
    this.layer.resizeWorld();
    this.map.setCollision(108);
    // tileset = game.add.tileset('tiles');
    // layer = game.add.tilemapLayer(0, 0, 900, 1000, tileset, map, 0);
    this.player = game.add.sprite(0, 0, 'nave');
    // Set the amount of bounce on the physics body of the 'player' sprite
    game.physics.enable(this.player);
    this.player.body.bounce.y = 0.1;
    this.player.body.linearDamping = 1;
    this.player.body.collideWorldBounds = true;
    // Tell the game's camera to follow the 'player' sprite
    game.camera.follow(this.player);
    cursors = game.input.keyboard.createCursorKeys();

};

Mapa.prototype.update = function() {
    game.angle += 1;

    //game.physics.collide(this.player, this.layer);
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;


    if (cursors.left.isDown)
    {
        this.player.body.velocity.x = -hozMove;
        game.camera.x += 3;

        if (facing !== "left")
        {

            facing = "left";
        }
    }

    else if (cursors.right.isDown)
    {
        this.player.body.velocity.x = hozMove;
        game.camera.x -= 3;
        if (facing !== "right")
        {
            facing = "right";
        }
    }
    if (cursors.up.isDown) {
        this.player.body.velocity.y = -hozMove;
        game.camera.y += 3;
        game.angle += 1;

    } else if (cursors.down.isDown) {
        this.player.body.velocity.y = hozMove;
        game.camera.y -= 3;
    }


    // Check if 'facing' is "left"
    if (facing === "left") {
        this.player.frame = 1;
    } else {
        this.player.frame = 0;
    }
};

Mapa.prototype.verifyMapCollision = function(layer) {
    game.physics.arcade.collide(this.sprite, layer);
};


