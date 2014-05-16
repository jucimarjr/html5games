var Spaceman = function(game, gameClass, x, y, sprite, player){
	Phaser.Sprite.call(this, game, x, y, sprite, 0);
	this.gameClass = gameClass;
	this.anchor.setTo(0.7,0.6);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	//this.sprite.body.collideWorldBounds = true;
	this.outOfBoundsKill = true;
	this.smoothed = true;
	this.body.setSize(80,20,10,0); 
	this.animations.add('flying',[0,1,2,3,4,3,2,1,0],5,true);
	//this.animations.add('explode',[5,6,7,8,9],10,false);
	this.animations.play('flying');
	game.add.existing(this);
	if(player == 1){
		this.fire1 = game.add.sprite(this.x, this.y, 'fire1');
	}else{
		this.fire1 = game.add.sprite(this.x, this.y, 'fire2');
	}
	game.physics.enable(this.fire1, Phaser.Physics.ARCADE); // abilita a fisica no fogo p/ ele poder acompanhar o personagem
	//this.fire1.body.collideWorldBounds = true;
	this.fire1.anchor.setTo(0.7,0.6);
	this.fire1.smoothed = true;
	this.fire1.animations.add('flying',[0,1,2,1],15,true);
	this.fire1.animations.play('flying');
	this.fire1.body.setSize(160,120,20,10);	//return this;
	this.upSpeed = 75;
	this.player = player;
	this.hover = game.add.audio('hover', 0.5);
	this.turbine = game.add.audio('turbine', 0.5);
	this.hover.play('', 0,1,true);
}

Spaceman.prototype = Object.create(Phaser.Sprite.prototype);
Spaceman.prototype.constructor = Spaceman;

Spaceman.prototype.create = function(){
	
};

Spaceman.prototype.update = function(){
	this.fire1.angle = this.angle;
	this.fire1.x = this.x;
	this.fire1.y = this.y;
	//
	if(game.device.touch){
		
	}else{
		if (game.input.activePointer.isDown && !game.tweens.isTweening(this) && this.player == 1)
		{
			if(!this.turbine.isPlaying){
				this.turbine.play();
			}
			this.fire1.body.velocity.y -= this.upSpeed;
			this.body.velocity.y -= this.upSpeed;
		}else{
			this.turbine.stop();
		}
		if(this.player == 2 && game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !game.tweens.isTweening(this)){
			this.fire1.body.velocity.y -= this.upSpeed;
			this.body.velocity.y -= this.upSpeed;
		}
	}
	
	if(this.inWorld == false)
	{
		this.gameClass.restart(this, null);
	}
	this.angle = this.body.velocity.y * 0.02
	this.fire1.angle = this.fire1.body.velocity.y * 0.02
};

Spaceman.prototype.resetSpaceman = function(){
	if(this.player == 1){
		this.loadTexture('playerOne');
		this.reset(350, 200);
		this.fire1.reset(350,200);
		game.add.tween(this).to({y:230}, 1200, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
	}		
	else{
		
		this.loadTexture('playerTwo');
		this.reset(350, 250);
		this.fire1.reset(350,250);
		game.add.tween(this).to({y:280}, 1200, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
	}
	//this.animations.play('flying');
};

Spaceman.prototype.explode = function(){
	this.body.velocity.x = 0;
	var emitter = game.add.emitter(this.x, this.y, 20);
    emitter.makeParticles('explosion');
    emitter.minParticleSpeed.setTo(-500, -500);
    emitter.maxParticleSpeed.setTo(500,500);
    emitter.gravity = 0;
    emitter.forEach(function(p){
    	game.add.tween(p).to({alpha:0},400,Phaser.Easing.Linear.None,true);
    })
    emitter.start(true, 400, null, 20);/*
	if(this.inWorld)
		this.animations.play('explode').onComplete.add(this.resetSpaceman, this);
	else*/
		this.resetSpaceman();
}