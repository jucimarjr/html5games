var Game = function()
{
this.sprite;// mudar depois pra uma classe Player.
this.gravity = 1200;
this.frontGround;
this.frontGround2;
this.fire1;
this.rocks;
this.playing = false;
this.score = 0;
this.hud = null;
this.highscore = null;
this.high = 0;
};

Game.prototype.preload = function()
{
	game.load.spritesheet('rock','assets/spritesheets/rocks.png',58,58,4);
	game.load.spritesheet('playerOne','assets/spritesheets/playerOne.png',154,56,5);
	game.load.image('bg','assets/tileSprites/background.png');
	game.load.image('fg','assets/tileSprites/frontGround.png');
	game.load.image('fg2','assets/tileSprites/frontGround2.png');
	game.load.image('star','assets/spritesheets/star.png');
	game.load.spritesheet('fire1','assets/spritesheets/fireYelow.png',154,56,3);
};

Game.prototype.create = function()
{
	game.physics.startSystem(Phaser.Game.ARCADE);
	
		
	this.bg = game.add.tileSprite(0,0,8000,600,'bg');
	this.bg.autoScroll();
	this.frontGround2 = game.add.tileSprite(0,game.world.height-99,960,99,'fg2');
	this.frontGround = game.add.tileSprite(0,game.world.height-35,960,35,'fg');
	
	this.rocks = game.add.group();
	game.input.onDown.addOnce(this.start, this);
	
	this.stars = game.add.group();
	this.stars.createMultiple(30, 'star');	
	this.stars.enableBody = true;

	this.sprite = new Spaceman(game, 350,200,'playerOne');//game.add.sprite(350,200,'playerOne');
	game.add.tween(this.sprite).to({y:230}, 1200, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
	game.time.events.loop(Phaser.Timer.SECOND * 0.5 , this.spawnRock, this);
	game.time.events.loop(Phaser.Timer.SECOND * 0.2 , this.spawnStar, this);
	
	this.hud = game.add.text(game.world.centerX,75,parseInt(this.score/10),{
		font: "28px Arial", fill: "#ffffff" , align: "center"
	});
	this.highscore = game.add.text(790, 25,'Best: '+localStorage["score"],{
		font: "24px Arial", fill: "#ffffff" , align: "center"
	});
};

Game.prototype.start = function(){
	game.physics.arcade.gravity.y = this.gravity;
	game.tweens.removeAll();
	this.playing = true;
};

Game.prototype.update = function()
{	
	this.bg.x -= 0.2;
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
	if(this.playing)
		this.score+=2;
	this.hud.text = parseInt(this.score/10);
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
	if(game.physics.arcade.gravity.y !== 0){
		var r = new Rock(game, game.world.width, game.world.randomY); 
		this.rocks.add(r);
	}
};

Game.prototype.spawnStar = function(){
	var s = this.stars.getFirstDead();
	s.reset(game.world.width, game.world.randomY);
	game.physics.enable(s, Phaser.Physics.ARCADE);
	s.body.velocity.x = -4000;
	s.body.allowGravity = false;
	s.checkWorldBounds = true;
	s.outOfBoundsKill = true;
	s.alpha = 0.4;
};

Game.prototype.restart = function(){
	this.sprite.resetSpaceman();
	game.add.tween(this.sprite).to({y:230}, 1200, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
	this.rocks.removeAll(true);
	game.physics.arcade.gravity.y = 0;
	game.input.onDown.addOnce(this.start, this);
	this.playing = false;
	if(localStorage["score"] < parseInt(this.score/10)){
		localStorage["score"] = parseInt(this.score/10);
		this.highscore.text = 'Best: '+localStorage["score"];
	}
	this.score = 0;
};