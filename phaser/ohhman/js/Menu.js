var Menu = {};

Menu = function (game) {
	this.game = game;

	this.btnPlay = null;
    this.btnHighScores = null;
    this.btnHowToPlay = null;
    this.btnCredits = null;
};

Menu.prototype.preload = function(){
	game.load.image('ssMenu', 'assets/screenshots/menu_800-600.png');
	game.load.atlas('botoes', 'assets/spritesheets/buttons_291-75-8.png',
    						  'assets/spritesheets/buttons_291-75-8.json');
};

Menu.prototype.create = function() {
	var bg = game.add.sprite(0, 0, 'ssMenu');
    var fadeout;

    this.btnPlay = game.add.button(game.world.centerX, game.world.centerY - 130, 'botoes',
    function(){
    	this.play();
    }, this);
    this.btnPlay.setFrames("btnPlaySelected_291-75.png", "btnPlay_291-75.png");
    this.btnPlay.anchor.x = 0.5;
	    		
    this.btnHighScores = game.add.button(game.world.centerX, game.world.centerY - 30, 'botoes',
    function() {
    	this.highScores();
    }, this);
    this.btnHighScores.setFrames("btnHighScoresSelected_291-75.png", "btnHighScores_291-75.png");
    this.btnHighScores.anchor.x = 0.5;

    this.btnHowToPlay = game.add.button(game.world.centerX, game.world.centerY + 70, 'botoes',
    function(){
    	this.howToPlay();
    }, this);
    this.btnHowToPlay.setFrames("btnHowToPlaySelected_291-75.png", "btnHowToPlay_291-75.png");
    this.btnHowToPlay.anchor.x = 0.5;
	
    this.btnCredits = game.add.button(game.world.centerX, game.world.centerY + 170, 'botoes',
    function(){
    	this.credits();
    }, this);
    this.btnCredits.setFrames("btnCreditsSelected_291-75.png", "btnCredits_291-75.png");
    this.btnCredits.anchor.x = 0.5;
};

Menu.prototype.play = function () {
    this.fadeOut();
    fadeout.onComplete.add(function () {
    //    this.game.state.start('game', Game);
    	this.game.state.start('win', Win);
    });
};

Menu.prototype.highScores = function () {
    this.fadeOut();
    fadeout.onComplete.add(function () {
        this.game.state.start('highScores', HighScores);
    });
};

Menu.prototype.howToPlay = function() {
    this.fadeOut();
    fadeout.onComplete.add(function () {
    	this.game.state.start('howToPlay', HowToPlay);
        //this.game.state.start('menu', Menu);
    });
};

Menu.prototype.credits = function () {
    this.fadeOut();
    fadeout.onComplete.add(function () {
        this.game.state.start('credits', Credits);
    });
};

Menu.prototype.fadeOut = function () {
    fadeout = game.add.tween(this.btnPlay).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
    fadeout = game.add.tween(this.btnHowToPlay).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
    fadeout = game.add.tween(this.btnHighScores).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
    fadeout = game.add.tween(this.btnCredits).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
};
