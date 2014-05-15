var Game = function()
{
this.sprite;// mudar depois pra uma classe Player.
this.gravity = 1800;
this.frontGround;
this.frontGround2;
this.fire1;
this.rocks;
this.playing = false;
this.score = 0;
this.hud = null;
this.highscore = null;
this.high = 0;
this.turbine = null;
};

Game.prototype.preload = function()
{
	game.load.spritesheet('rock','assets/spritesheets/rocks.png',58,58,4);
	game.load.spritesheet('playerOne','assets/spritesheets/playerOne.png',154,56,10);
	game.load.spritesheet('playerTwo','assets/spritesheets/playerTwo.png',154,56,5);
	game.load.image('bg','assets/tileSprites/background.png');
	game.load.image('fg','assets/tileSprites/frontGround.png');
	game.load.image('fg2','assets/tileSprites/frontGround2.png');
	game.load.image('star','assets/spritesheets/star.png');
	game.load.image('explosion','assets/spritesheets/fogo.png');
	game.load.spritesheet('fire1','assets/spritesheets/fireYelow.png',154,56,3);
	game.load.spritesheet('fire2','assets/spritesheets/fireBlue.png',154,56,3);
	game.load.audio('turbine', 'assets/sound/turbina2.wav');
	game.load.audio('hover', 'assets/sound/hover1.wav');
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

	this.sprite = new Spaceman(game, this, 350,200,'playerOne',1);//game.add.sprite(350,200,'playerOne');
	game.add.tween(this.sprite).to({y:230}, 1200, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
	if(players == 2){
		this.sprite2 = new Spaceman(game, this, 350,250,'playerTwo',2);//game.add.sprite(350,200,'playerOne');
		game.add.tween(this.sprite2).to({y:280}, 1200, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
		this.point1 = 0;
		this.point2 = 0;
	}
	
	game.time.events.loop(Phaser.Timer.SECOND * 0.5 , this.spawnRock, this);
	game.time.events.loop(Phaser.Timer.SECOND * 0.2 , this.spawnStar, this);
	this.txt = game.add.text(370, 120, '',{
		font: "24px Arial", fill: "#ffffff" , align: "center"
	});
	if(game.device.touch){
		this.txt.text = 'Tap te screen to fly.\nAvoid the rocks.';
	}else{
		this.txt.text = 'Click te screen to fly.\nAvoid the rocks.';
	}
	this.hud = game.add.text(game.world.centerX,75,parseInt(this.score/10),{
		font: "28px Arial", fill: "#ffffff" , align: "center"
	});
	this.highscore = game.add.text(790, 25,'Best: '+localStorage["score"],{
		font: "24px Arial", fill: "#ffffff" , align: "center"
	});
};

Game.prototype.start = function(){
	this.txt.text = '';
	game.physics.arcade.gravity.y = this.gravity;
	game.tweens.removeAll();
	this.playing = true;
};

Game.prototype.update = function()
{	
	this.bg.x -= 0.2;
	this.frontGround2.tilePosition.x -= 10;
	this.frontGround.tilePosition.x -= 15;
	if(this.playing && players == 1){
		this.score+=2;
		this.hud.text = parseInt(this.score/10);
		game.physics.arcade.overlap(this.sprite.fire1, this.rocks, function(){
			this.score+=2;
			this.hud.text += '\n2x';
		}, null, this);
	}
	game.physics.arcade.collide(this.sprite, this.rocks, this.restart, null, this);
	if(players == 2){
		game.physics.arcade.collide(this.sprite2, this.rocks, this.restart, null, this);
	}
	
};

Game.prototype.render = function()
{
	
	game.debug.body(this.sprite.fire1);
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
}

Game.prototype.restart = function(s, r){
	console.log(s);
	//game.add.tween(this.sprite).to({y:230}, 1200, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
	if(players == 1){
		this.sprite.explode();
	}else if(players == 2){
		//game.add.tween(this.sprite2).to({y:280}, 1200, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
		if(s.player == 1){
			s.explode();
			this.sprite2.resetSpaceman();
			this.point2++;
			this.hud.text = this.point1 + ' - ' + this.point2;
		}else{
			s.explode();
			this.sprite.resetSpaceman();
			this.point1++;
			this.hud.text = this.point1 + ' - ' + this.point2;
		}
	}
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