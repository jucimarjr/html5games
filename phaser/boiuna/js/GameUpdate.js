var jumpControl = 0;
State.Game.prototype.update = function(){
	//h
	if(hero.x > Config.xBeginCameraMove && hero.x < Config.xEndCameraMove){
		game.camera.x = hero.body.x - Config.xBeginCameraMove;
	}
	var cursors = game.input.keyboard.createCursorKeys();	
	hero.body.velocity.setTo(Config.xHeroInitialVelocity, Config.yHeroInitialVelocity);
	if (cursors.right.isDown){
		hero.body.velocity.x = Config.heroRunVelocity;
		if (hero.y == Config.yCanJump){
			hero.animations.play('walk');	
		}
		hero.scale.setTo(1, 1);

	}else if (cursors.left.isDown){
        hero.body.velocity.x = -Config.heroRunVelocity;
		hero.scale.setTo(-1, 1);
		if (hero.y == Config.yCanJump){
			hero.animations.play('walk');	
		}
    }else if(hero.y == Config.yCanJump){
		hero.body.velocity.x = 0;
		hero.animations.stop();
		hero.frame = 0;
	}
	if (cursors.up.isDown && hero.y == Config.yCanJump){
		hero.body.velocity.y = Config.heroJumpVelocity;
		jumpControl++;
		hero.frame = 3;
	}else 
	if (cursors.up.isDown && jumpControl < Config.maxJump && jumpControl != 0){
		hero.body.velocity.y = Config.heroJumpVelocity;
		jumpControl++;
	}else if ( hero.y != Config.yCanJump){
		jumpControl = 0;
		hero.frame = 4;
	}
};