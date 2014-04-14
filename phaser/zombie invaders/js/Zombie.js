var Zombie = function (index, game, person) {
	
    var x = game.world.randomX;
    var y = game.rnd.integerInRange(0, 100);
    //console.log("y =",y);

    this.game = game;
    //this.health = 3;
    this.spritePerson = person;
    this.alive = true;

    this.spriteZombie = this.game.add.sprite(x, y,'zombie');

    this.spriteZombie.name = index.toString();
    this.game.physics.enable(this.spriteZombie, Phaser.Physics.ARCADE);

    this.spriteZombie.body.immovable = false;
    this.spriteZombie.body.collideWorldBounds = true;
    this.spriteZombie.body.bounce.setTo(1, 1);
    
    this.spriteZombie.inputEnabled=true;
    this.spriteZombie.body.velocity.x  = 0;
    this.spriteZombie.events.onInputDown.add(elimine = function(spriteZombie){
    	spriteZombie.destroy();
	},null);
    
    this.spriteZombie.body.velocity.x  = Math.random()*10;
    this.spriteZombie.body.velocity.y  = Math.random()*10;
};
