var Menu = {};

Menu = function (game) {
    this.game = game;
    this.btnPlay = null;
    this.btnHowToPlay = null;
    this.btnHighScores = null;
    this.btnCredits = null;
};

Menu.prototype.preload = function(){
	//game.load.atlas('background','assets/screenshots/Menu6_480-600.png');
	//game.load.atlas('botoes', 'assets/spritesheets/buttonsArray.png', 'assets/spritesheets/buttonsArray.json');
		
};

Menu.prototype.create = function() {
	var background = game.add.sprite(0, 0, 'Menu');
	var anim = background.animations.add('menu_animation');
	background.animations.play('menu_animation', 2, true);
	background.name = 'background';
	

    var fadeout;
    
    var music;
    
    music = game.add.audio('Menu_Sound',1,true);

    music.play('',0,1,true);

//    this.btnPlay = game.add.button(game.world.centerX, game.world.centerY - 30, 'botoes',
//    	    function(){ this.play(); }, this);
//    	    this.btnPlay.setFrames("btPlaySelected_121-27.png","btPlay_121-27.png");
//    	    this.btnPlay.anchor.x = 0.5;
//    		    		
//    	    this.btnHowToPlay = game.add.button(game.world.centerX, game.world.centerY + 20, 'botoes',
//    	    function(){ this.howToPlay(); }, this);
//    	    this.btnHowToPlay.setFrames("btHowToSelected_341-27.png","btHowTo_341-27.png");
//    	    this.btnHowToPlay.anchor.x = 0.5;
//    		
//    	    this.btnHighScores = game.add.button(game.world.centerX, game.world.centerY + 70, 'botoes',
//    	    function () { this.highScores(); }, this);
//    	    this.btnHighScores.setFrames("btHighSelected_341-27.png","btHigh_341-27.png");
//    	    this.btnHighScores.anchor.x = 0.5;
//
//    	    this.btnCredits = game.add.button(game.world.centerX, game.world.centerY + 120, 'botoes',
//    	    function(){ this.credits(); }, this);
//    	    this.btnCredits.setFrames("btCreditsSelected_215-27.png","btCredits_215-27.png");
//    	    this.btnCredits.anchor.x = 0.5;
   
};

//Menu.prototype.play = function () {
//    this.fadeOut();
//    fadeout.onComplete.add(function () {
//    	
//        this.game.state.start('game', Game);
//        console.log("play");
//    });
//};
//
//Menu.prototype.howToPlay = function() {
//    this.fadeOut();
//    fadeout.onComplete.add(function () {
//        //this.game.state.start('HowToPlay', HowToPlay);
//    });
//}
//
//Menu.prototype.highScores = function () {
//    this.fadeOut();
//    fadeout.onComplete.add(function () {
//        //this.game.state.start('HighScore', HighScore);
//    });
//}
//
//Menu.prototype.credits = function () {
//    this.fadeOut();
//    fadeout.onComplete.add(function () {
//        //this.game.state.start('Credits', Credits);
//    });
//};

//Menu.prototype.fadeOut = function () {
//    fadeout = game.add.tween(this.btnPlay).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
//    fadeout = game.add.tween(this.btnHowToPlay).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
//    fadeout = game.add.tween(this.btnHighScores).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
//    fadeout = game.add.tween(this.btnCredits).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
//};