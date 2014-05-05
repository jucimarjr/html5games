var Hero = function (game){
	this.game = game;
	this.sprite = null;
	this.jumpControl = 0;
};
Hero.prototype = {
	preload:function(){
		this.game.load.spritesheet('hero', Config.hero.dir, Config.hero.frame.width, Config.hero.frame.height);
	},
	create:function(){
		this.sprite = game.add.sprite(Config.hero.xi, Config.hero.yi, 'hero');
		this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.gravity.y = Config.hero.gravity;  
		this.sprite.animations.add('walk', [1, 2], Config.global.animationVelocity, true);		
	},
	update:function(){
		if(this.sprite.x > Config.hero.cameraMove.xi && this.sprite.x < Config.hero.cameraMove.xf){
			game.camera.x = this.sprite.body.x - Config.hero.cameraMove.xi;
		}
		var cursors = game.input.keyboard.createCursorKeys();	
		this.sprite.body.velocity.setTo(Config.hero.velocity.initial.x,Config.hero.velocity.initial.y);
		if (cursors.right.isDown){
			this.sprite.anchor = Config.hero.anchor.right;
			this.sprite.body.velocity.x = Config.hero.velocity.run;
			if (this.sprite.y == Config.hero.jump.possible){
				this.sprite.animations.play('walk');	
			}
			this.sprite.scale = Config.hero.scale.right;
		}else if (cursors.left.isDown){
			this.sprite.anchor = Config.hero.anchor.left;
			this.sprite.body.velocity.x = -Config.hero.velocity.run;
			this.sprite.scale = Config.hero.scale.left;
			if (this.sprite.y == Config.hero.jump.possible){
				this.sprite.animations.play('walk');	
			}
			}else if(this.sprite.y == Config.hero.jump.possible){
			this.sprite.body.velocity.x = 0;
			this.sprite.animations.stop();
			this.sprite.frame = 0;
		}
		if (cursors.up.isDown && this.sprite.y == Config.hero.jump.possible){
			this.sprite.animations.stop();
			this.sprite.body.velocity.y = Config.hero.velocity.jump;
			this.jumpControl++;
			this.sprite.frame = 3;
		}else 
		if (cursors.up.isDown && this.jumpControl < Config.hero.jump.max && this.jumpControl != 0){
			this.sprite.body.velocity.y = Config.hero.velocity.jump;
			this.jumpControl++;
			}else if ( this.sprite.y != Config.hero.jump.possible){
			this.jumpControl = 0;
			this.sprite.frame = 4;
		}
	}
};
