var Hero = function (game){
	this.game = game;
	this.sprite = null;
	this.jumpControl = 0;
};
Hero.prototype = {
	preload:function(){
		this.game.load.spritesheet('hero', Config.dirHero, 30, 60);
	},
	create:function(){
		this.sprite = game.add.sprite(Config.xBeginHero, Config.yBeginHero, 'hero');
		this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.gravity.y = Config.heroGravity;  
		this.sprite.animations.add('walk', [1, 2], 6, true);		
	},
	update:function(){
		if(this.sprite.x > Config.xBeginCameraMove && this.sprite.x < Config.xEndCameraMove){
			game.camera.x = this.sprite.body.x - Config.xBeginCameraMove;
		}
		var cursors = game.input.keyboard.createCursorKeys();	
		this.sprite.body.velocity.setTo(Config.xHeroInitialVelocity, Config.yHeroInitialVelocity);
		if (cursors.right.isDown){
			this.sprite.anchor.setTo(0,0);
			this.sprite.body.velocity.x = Config.heroRunVelocity;
			if (this.sprite.y == Config.yCanJump){
				this.sprite.animations.play('walk');	
			}
			this.sprite.scale.setTo(1, 1);
		}else if (cursors.left.isDown){
			this.sprite.anchor.setTo(0.5,0);
			this.sprite.body.velocity.x = -Config.heroRunVelocity;
			this.sprite.scale.setTo(-1, 1);
			if (this.sprite.y == Config.yCanJump){
				this.sprite.animations.play('walk');	
			}
			}else if(this.sprite.y == Config.yCanJump){
			this.sprite.body.velocity.x = 0;
			this.sprite.animations.stop();
			this.sprite.frame = 0;
		}
		if (cursors.up.isDown && this.sprite.y == Config.yCanJump){
			this.sprite.body.velocity.y = Config.heroJumpVelocity;
			this.jumpControl++;
			this.sprite.frame = 3;
		}else 
		if (cursors.up.isDown && this.jumpControl < Config.maxJump && this.jumpControl != 0){
			this.sprite.body.velocity.y = Config.heroJumpVelocity;
			this.jumpControl++;
			}else if ( this.sprite.y != Config.yCanJump){
			this.jumpControl = 0;
			this.sprite.frame = 4;
		}
	}
};
