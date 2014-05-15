var Game = function()
{
this.sprite;// mudar depois pra uma classe Player.
this.gravity = 1000;
this.frontGround;
this.frontGround2;
this.fire1;
this.rocks;
this.start = false;
}

Game.prototype.preload = function()
{
	game.load.spritesheet('rock','assets/spritesheets/rocks.png',58,58,4);
	game.load.spritesheet('playerOne','assets/spritesheets/playerOne.png',154,56,5);
	game.load.image('bg','assets/tileSprites/background.png');
	game.load.image('fg','assets/tileSprites/frontGround.png')
	game.load.image('fg2','assets/tileSprites/frontGround2.png');
	game.load.spritesheet('fire1','assets/spritesheets/fireYelow.png',154,56,3);
}

Game.prototype.create = function()
{
	game.physics.startSystem(Phaser.Game.ARCADE);
	game.physics.arcade.gravity.y = this.gravity;
		
	game.add.sprite(0,0,'bg');
	this.frontGround2 = game.add.tileSprite(0,game.world.height-99,960,99,'fg2');
	this.frontGround = game.add.tileSprite(0,game.world.height-35,960,35,'fg');
	
	this.rocks = game.add.group();

	this.sprite = new Spaceman(game, 350,200,'playerOne');//game.add.sprite(350,200,'playerOne');
	game.time.events.loop(Phaser.Timer.SECOND * 0.5 , this.spawnRock, this);
};

Game.prototype.update = function()
{	
	this.sprite.update();
	if(this.sprite.inWorld == false)
	{
		this.restart();
	}
	//this.fire1.angle = this.sprite.angle;
	//this.fire1.x = this.sprite.x;
	//this.fire1.y = this.sprite.y;
	this.frontGround2.tilePosition.x -= 10;
	this.frontGround.tilePosition.x -= 15;
	
	game.physics.arcade.collide(this.sprite, this.rocks, this.restart, null, this);
};

Game.prototype.render = function()
{
	game.debug.body(this.sprite);
	this.rocks.forEach(function(r){
		game.debug.body(r);
	})
	//game.debug.body(this.rocks);
};

Game.prototype.spawnRock = function()
{
	var r = new Rock(game, game.world.width, game.world.randomY); 
	this.rocks.add(r.sprite);
};

Game.prototype.restart = function(){
	this.sprite.resetSpaceman();
	this.rocks.removeAll(true);
	
};