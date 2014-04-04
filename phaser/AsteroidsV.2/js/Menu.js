var Menu = {};

Menu = function (game) {
    this.game = game;
    this.btnPlay = null;
    this.btnHowToPlay = null;
    this.btnHighScores = null;
    this.btnCredits = null;
    this.msg = null;
};

Menu.prototype.preload = function(){

    //game.stage.backgroundColor = '#111111';
    game.load.atlas('botoes', 'assets/spritesheets/ButtonsSpriteSheet.png', 'assets/spritesheets/ButtonsSpriteSheet.json');
    game.load.image('msg', 'assets/tests/collectresources.png');
		
};

Menu.prototype.create = function() {
	this.game.world.setBounds(0, 0, 800, 480);
    var fadeout;

    this.btnPlay = game.add.button(game.world.centerX + 15, game.world.centerY - 110, 'botoes',
    function(){ this.play(); }, this);
    this.btnPlay.setFrames("btnPlay_155-34.png", 'btnPlaySelected_155-34.png');
    this.btnPlay.anchor.x = 0.5;
	    		
    this.btnHowToPlay = game.add.button(game.world.centerX + 15, game.world.centerY - 50, 'botoes',
    function(){ this.howToPlay(); }, this);
    this.btnHowToPlay.setFrames("btnHowToPlay_381-34.png", "btnHowToPlaySelected_381-34.png");
    this.btnHowToPlay.anchor.x = 0.5;
	
    this.btnHighScores = game.add.button(game.world.centerX + 15, game.world.centerY + 10, 'botoes',
    function () { this.highScores(); }, this);
    this.btnHighScores.setFrames("btnScore_356-34.png", "btnScoreSelected_365-34.png");
    this.btnHighScores.anchor.x = 0.5;

    this.btnCredits = game.add.button(game.world.centerX + 15, game.world.centerY + 70, 'botoes',
    function(){ this.credits(); }, this);
    this.btnCredits.setFrames('btnCredits_256-34.png', "btnCreditsSelected_256-34.png");
    this.btnCredits.anchor.x = 0.5;
   
};

Menu.prototype.play = function () {
    this.fadeOut();
    fadeout.onComplete.add(function () {
    	var msg = this.game.add.sprite(0,0,'msg');
    	msg.alpha = 0;
    	msg.anchor.setTo(0.5,0.5);
    	msg.x = game.width/2;
    	msg.y = game.height/2;
    	var fadein = game.add.tween(msg).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, true);
    	fadein.onComplete.add(function () {
    		var fade = game.add.tween(msg).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, true);
        	fade.onComplete.add(function () {
        		game.state.start('game', Game);
            });
        });
    	
    });
};

Menu.prototype.howToPlay = function() {
    this.fadeOut();
    fadeout.onComplete.add(function () {
        game.state.start('howToPlay', HowToPlay);
    });
};

Menu.prototype.highScores = function () {
    this.fadeOut();
    fadeout.onComplete.add(function () {
        game.state.start('highScore', HighScore);
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