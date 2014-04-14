var Mapa = {};

Mapa = function(game) {
    this.game = game;

};
var map;
var tileset;
var layer;
var player;
var facing = "left";
var cursors;
var hozMove = 300;
var vertMove = -300;
var cursors;
Mapa.prototype.preload = function() {

    game.load.tileset('tiles', 'assets/tijolo22x32.png', 22, 32);
    game.load.image('nave', 'assets/phaser-ship.png');
    game.load.tilemap('map', 'assets/mapa.json', null, Phaser.Tilemap.TILED_JSON);
};

Mapa.prototype.create = function() {
    // Make the background color of the game's stage be white (#FFFFFF)
  //  game.stage.backgroundColor = '#FFB90F';
    map = game.add.tilemap('map');
    tileset = game.add.tileset('tiles');
     layer = game.add.tilemapLayer(0, 0, 900, 1000, tileset, map, 0);
    player = game.add.sprite(0, 0, 'nave');
    // Set the amount of bounce on the physics body of the 'player' sprite
    player.body.bounce.y = 0.1;
    player.body.linearDamping = 1;
    player.body.collideWorldBounds = true;
    // Tell the game's camera to follow the 'player' sprite
    game.camera.follow(player);

    // Have the game create cursor keys (usually arrow keys)
    //  and save the reference to 'cursors'
    cursors = game.input.keyboard.createCursorKeys();

};

Mapa.prototype.update = function() {
    game.angle += 1;

    // Using the physics system, check if 'player' is colliding
    //  with any tiles within 'layer'. If so, seperate them.
    game.physics.collide(player, layer);

    // Reset the x (horizontal) velocity
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    // Check if the left arrow key is being pressed
    if (cursors.left.isDown)
    {
        // Set the 'player' sprite's x velocity to a negative number:
        //  have it move left on the screen.
        player.body.velocity.x = -hozMove;
        game.camera.x += 3;

        // Check if 'facing' is not "left"
        if (facing !== "left")
        {
            // Set 'facing' to "left"
            facing = "left";
        }
    }
    // Check if the right arrow key is being pressed
    else if (cursors.right.isDown)
    {
        // Set the 'player' sprite's x velocity to a positive number:
        //  have it move right on the screen.
        player.body.velocity.x = hozMove;
        game.camera.x -= 3;

        // Check if 'facing' is not "right"
        if (facing !== "right")
        {
            // Set 'facing' to "right"
            facing = "right";
        }
    }
    if (cursors.up.isDown) {
        player.body.velocity.y = -hozMove;
        game.camera.y += 3;
        game.angle += 1;

    } else if (cursors.down.isDown) {
        player.body.velocity.y = hozMove;
        game.camera.y -= 3;
    }


    // Check if 'facing' is "left"
    if (facing === "left") {
        // Set the 'player' to the second (1) frame
        //  ('facing' is "left")
        player.frame = 1;
    } else {
        // Set the 'player' to the first (0) frame
        //  ('facing' is "right").
        player.frame = 0;

    }
};

