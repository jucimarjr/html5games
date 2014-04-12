Zombie = function (index, game, zombie) {
	
    var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    //this.health = 3;
    this.zombie = zombie;
    this.alive = true;

    this.person = game.add.sprite(x, y,imagePessoa);

    this.person.name = index.toString();
    game.physics.enable(this.person, Phaser.Physics.ARCADE);

    this.person.body.immovable = false;
    this.person.body.collideWorldBounds = true;
    this.person.body.bounce.setTo(1, 1);

};
