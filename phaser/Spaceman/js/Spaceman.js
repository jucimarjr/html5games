var Spaceman = function(game, gameClass, x, y, sprite, player){
	Phaser.Sprite.call(this, game, x, y, sprite, 0);
	this.gameClass = gameClass;
	this.anchor.setTo(0.7,0.6);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	//this.sprite.body.collideWorldBounds = true;
	this.outOfBoundsKill = true;
	this.smoothed = true;
	this.body.setSize(60,20,10,0); 
	this.animations.add('flying',[0,1,2,3,4,3,2,1,0],5,true);
	this.animations.add('explode',[5,6,7,8],10,false);
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
	this.upSpeed = 60;
	this.player = player;
	if(sound){
		this.music = game.add.audio('game', 0.5).play('',0,1,true);
		this.hover = game.add.audio('hover', 0.5);
		this.turbine = game.add.audio('turbine', 0.7);
		this.explosion = game.add.audio('explosion', 0.5);
		this.hover.play('', 0,1,true);
	}
	this.alive = true;
}

Spaceman.prototype = Object.create(Phaser.Sprite.prototype);
Spaceman.prototype.constructor = Spaceman;

Spaceman.prototype.update = function(){
	this.fire1.angle = this.angle;
	this.fire1.x = this.x;
	this.fire1.y = this.y;
	//
	if(game.device.touch){
		
	}else{
		console.log(!this.animations.getAnimation('explode').isPlaying);
		if(!this.animations.getAnimation('explode').isPlaying){
			if (game.input.activePointer.isDown && !game.tweens.isTweening(this) && this.player == 1 && this.gameClass.playing == true)
			{
				if(sound){if(!this.turbine.isPlaying){
					this.turbine.play();
				}}
				this.fire1.body.velocity.y -= this.upSpeed;
				this.body.velocity.y -= this.upSpeed;
			}else{
				if(sound)this.turbine.stop();
			}
			if(this.player == 2 && game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !game.tweens.isTweening(this) && this.gameClass.playing == true){
				this.fire1.body.velocity.y -= this.upSpeed;
				this.body.velocity.y -= this.upSpeed;
			}
		}		
	}
	
	if(this.inWorld == false && this.alive)
	{
		this.gameClass.restart(this, null);
	}
	this.angle = this.body.velocity.y * 0.02
};

Spaceman.prototype.resetSpaceman = function(){
	if(this.player == 1){
		this.reset(350, 200);
		this.fire1.reset(350,200);
		game.add.tween(this).to({y:230}, 1200, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
	}		
	else{		
		this.reset(350, 250);
		this.fire1.reset(350,250);
		game.add.tween(this).to({y:280}, 1200, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
	}
	this.fire1.alpha = 1;
	this.animations.play('flying');
	this.gameClass.hud.y = 75;
	this.gameClass.hud.x = game.world.centerX;
	this.gameClass.hud.text = 0;
	this.gameClass.hud.setStyle({
		font: "18px 'OCR A Std'", fill: "#ffffff" , align: "center"
	})
	this.gameClass.txt.text = '';
	game.input.onDown.addOnce(this.gameClass.start, this.gameClass);
	game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(this.gameClass.start, this.gameClass)
	//this.animations.play('flying');
};

Spaceman.prototype.explode = function(){
	this.body.velocity.setTo(0,0);
	//this.body.acceleration.y = this.gameClass.gravity;
	var emitter = game.add.emitter(this.x, this.y, 30);
    emitter.makeParticles('explosion');
    emitter.minParticleSpeed.setTo(-1000, -1000);
    emitter.maxParticleSpeed.setTo(1000,1000);
    emitter.gravity = 0;
    emitter.forEach(function(p){
    	game.add.tween(p).to({alpha:0},500,Phaser.Easing.Linear.None,true);
    })
	this.fire1.alpha = 0;
    emitter.start(true, 1000, null, 30);	
	game.input.onDown.addOnce(this.resetSpaceman, this);
    if(sound)this.explosion.play();	
	if(this.inWorld)this.animations.play('explode').onComplete.addOnce(this.kill, this);
	else this.kill();
	this.alive = false;
}