var Menu = {};

Menu = function (game) {
    this.game = game;
    this.btnPlay = null;
    this.btnHowToPlay = null;
    this.btnHighScores = null;
    this.btnCredits = null;
    this.msg = null;
    this.button = 0;
};

Menu.prototype.preload = function(){

    //game.stage.backgroundColor = '#111111';
    game.load.spritesheet('botoes', 'assets/screens/btns.png', 438, 72);
    game.load.image('title', 'assets/screens/tiledbackground4.png');
		
};

Menu.prototype.create = function() {
	this.game.world.setBounds(0, 0, 800, 480);
    var fadeout;
    
    this.title = game.add.sprite(game.world.centerX,game.world.centerY, 'title');
    this.title.anchor.setTo(0.5,0.5);
    this.button = 1;
    this.btnPlay = game.add.button(game.world.centerX + 15, game.world.centerY + 70, 'botoes',
    function(){ this.play(); }, this);
    this.btnPlay.setFrames(0, 0);
    this.btnPlay.anchor.x = 0.5;

    this.btnCredits = game.add.button(game.world.centerX + 15, game.world.centerY + 150, 'botoes',
    function(){ this.credits(); }, this);
    this.btnCredits.setFrames(1, 1);
    this.btnCredits.anchor.x = 0.5;
};

Menu.prototype.play = function () {
    this.fadeOut();
    fadeout.onComplete.add(function () {
    	game.state.start('game');
    });
};

Menu.prototype.credits = function () {
    this.fadeOut();
    fadeout.onComplete.add(function () {
        this.game.state.start('credits');
    });
};

Menu.prototype.fadeOut = function () {
	fadeout = game.add.tween(this.title).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true)
										.to({ x: 1500 }, 1, Phaser.Easing.Linear.None, true, 0, 0, true);
    fadeout = game.add.tween(this.btnPlay).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true)
    									  .to({ x: 1500 }, 1, Phaser.Easing.Linear.None, true, 0, 0, true);
    fadeout = game.add.tween(this.btnCredits).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true)
    										 .to({ x: 1500 }, 1, Phaser.Easing.Linear.None, true, 0, 0, true);
};