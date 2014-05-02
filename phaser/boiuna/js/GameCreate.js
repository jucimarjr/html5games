var hero;
State.Game.prototype.create = function(){
	game.world.setBounds(Config.xBeginWorldBounds, Config.yBeginWorldBounds, Config.xEndWorldBounds, Config.yEndWorldBounds);
	game.add.sprite(Config.xGameBackground, Config.yGameBackground, 'game-background');
	hero = game.add.sprite(Config.xBeginHero, Config.yBeginHero, 'hero');
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.enable(hero, Phaser.Physics.ARCADE);
    hero.body.collideWorldBounds = true;
	hero.body.gravity.y = Config.heroGravity;  
	hero.animations.add('walk', [1, 2], 6, true);
}