Zombie = function (index, game, person) {
	
    var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    //this.health = 3;
    this.person = person;
    this.alive = true;

    this.zombie = game.add.sprite(x, y,imageZombie);

    this.zombie.name = index.toString();
    game.physics.enable(this.zombie, Phaser.Physics.ARCADE);

    this.zombie.body.immovable = false;
    this.zombie.body.collideWorldBounds = true;
    this.zombie.body.bounce.setTo(1, 1);

};

