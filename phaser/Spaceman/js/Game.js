var Game = function()
{
this.sprite;// mudar depois pra uma classe Player.
this.gravity = 1300;
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

Game.prototype.create = function()
{
	game.physics.startSystem(Phaser.Game.ARCADE);
	
	this.playing = false;
	this.bg = game.add.tileSprite(0,0,8000,600,'bg');
	//this.bg.autoScroll();
	this.frontGround2 = game.add.tileSprite(0,game.world.height-99,960,99,'fg2');
	this.frontGround = game.add.tileSprite(0,game.world.height-35,960,35,'fg');
	
	this.rocks = game.add.group();
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
	
	game.time.events.loop(Phaser.Timer.SECOND * 0.50 , this.spawnRock, this);
	game.time.events.loop(Phaser.Timer.SECOND * 0.2 , this.spawnStar, this);
	this.txt = game.add.text(370, 120, '',{
		font: "18px 'OCR A Std'", fill: "#ffffff" , align: "center"
	});
	this.txt.text = 'Pressione a tecla para voar.\nCuidado com as rochas.';
	this.control1 = game.add.sprite(480, 180, 'control1', 0);
	this.control1.animations.add('anim', [0,1],3,true).play();
	if(players == 2){
		this.txt.text += '\n\n\n\n\n\n\n\nPressione a tecla para voar.\nCuidado com as rochas.'
		this.control2 = game.add.sprite(410, 380, 'control2', 0);
		this.control2.animations.add('anim', [0,1],3,true).play();
	}
	this.hud = game.add.text(game.world.centerX,75,parseInt(this.score/10),{
		font: "18px 'OCR A Std'", fill: "#ffffff" , align: "center"
	});
	this.highscore = game.add.text(790, 25,'Best: '+localStorage["score"],{
		font: "18px 'OCR A Std'", fill: "#ffffff" , align: "center"
	});
	this.btn = game.add.button(game.world.width - 85, game.world.height - 85, 'back',function(){
		game.physics.arcade.gravity.y = 0;	
		game.sound.stopAll();
		game.state.start('menu', true);
	},null);	
	//game.input.onDown.addOnce(this.start, this);
	this.start1 = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL)
	this.start1.onDown.addOnce(this.start, this)
	if(players == 2) {
		this.start2 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
		this.start2.onDown.addOnce(this.start, this)
	}
	if(game.device.touch) game.input.onDown.addOnce(this.start, this);
	this.repeat = 5;
	this.started = false;
};

Game.prototype.countTime = function(){
	
	this.repeat--;
	this.hud.text = ""+this.repeat;
	if(this.repeat<=0){
		this.txt.text = '';
		this.control1.kill();
		this.control2.kill();
		this.start1.isDown = false;
		this.start2.isDown = false;
		this.hud.y = 75;
		this.hud.setStyle({
			font: "18px 'OCR A Std'", fill: "#ffffff" , align: "center"
		})
		game.tweens.removeAll();
		game.physics.arcade.gravity.y = this.gravity;
		console.log('play');
		this.playing = true;
	}
};

Game.prototype.start = function(){
	if(!this.started){
		//game.input.keyboard.reset(true);
		this.started = true;
		if(players == 1){
			this.txt.text = '';
			this.control1.kill();
			this.hud.y = 75;
			this.hud.setStyle({
				font: "18px 'OCR A Std'", fill: "#ffffff" , align: "center"
			})
			game.tweens.removeAll();
			game.physics.arcade.gravity.y = this.gravity;
			this.playing = true;
			game.input.keyboard.clearCaptures();
		}else{
			this.hud.text = ""+this.repeat;
			this.hud.setStyle({
				font: "36px 'OCR A Std'", fill: "#ffffff" , align: "center"
			})
			game.time.events.repeat(1000,5,this.countTime, this);
		}
	}
		
};

Game.prototype.update = function()
{	
	//this.bg.x -= 0.2;
	this.frontGround2.tilePosition.x -= 10;
	this.frontGround.tilePosition.x -= 15;
	this.hud.fill = '#ffffff';
	if(this.playing && players == 1){
		this.score+=2;
		this.hud.text = parseInt(this.score/10);
		game.physics.arcade.overlap(this.sprite.fire1, this.rocks, function(){
			this.score+=10;
			this.hud.fill = '#ff9900';
		}, null, this);
	}
	game.physics.arcade.collide(this.sprite, this.rocks, this.restart, null, this);
	if(players == 2){
		game.physics.arcade.collide(this.sprite2, this.rocks, this.restart, null, this);
		this.hud.y = 25;
		this.hud.x = 370;
	}
	
};

Game.prototype.render = function()
{
	/*
	game.debug.body(this.sprite);
	this.rocks.forEach(function(r){
		game.debug.body(r);
	})*/
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
	if(players == 1){
		this.sprite.explode();
		this.hud.text = 'Você morreu\nPontuação:\n'+parseInt(this.score/10);
		this.hud.y = 235;
		this.hud.x = 330;
		this.hud.setStyle({
			font: "36px 'OCR A Std'", fill: "#ffffff" , align: "center"
		})
	}else if(players == 2){
		//game.add.tween(this.sprite2).to({y:280}, 1200, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
		if(s.player == 1){
			s.explode();
			this.sprite2.body.velocity.setTo(0,0);
			//this.sprite2.kill();
			this.sprite2.resetSpaceman();
			this.point2++;			
		}else{
			s.explode();
			this.sprite.body.velocity.setTo(0,0);
			//this.sprite.kill();
			this.sprite.resetSpaceman();
			this.point1++;
		}
		this.hud.text = 'Player 1: '+this.point1 + '\n\n'+'Player 2: '+this.point2;
	}
	this.rocks.removeAll(true);
	game.physics.arcade.gravity.y = 0;
	this.playing = false;
	this.txt.text = 'Clique para reiniciar';
	this.txt.y = 500;
	if(localStorage["score"] < parseInt(this.score/10)){
		localStorage["score"] = parseInt(this.score/10);
		this.highscore.text = 'Best: '+localStorage["score"];
	}
	this.score = 0;
	this.started = false;
	this.repeat = 5;
};