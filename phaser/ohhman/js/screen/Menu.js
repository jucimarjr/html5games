Menu = function () {
	this.btnPlay = null;
    this.btnHighScores = null;
    this.btnHowToPlay = null;
    this.btnCredits = null;
};

Menu.prototype = {
	preload : function() {
		game.load.image('bgMenu', fp_bgMenu);
		game.load.atlas('ssButtons', fp_ssButtonsPNG, fp_ssButtonsJSON);
	},

	create : function() {
		var bg = game.add.sprite(0, 0, 'bgMenu');
		var fadeout = null;
		
	    this.btnPlay = game.add.button(400, 170, 'ssButtons',
	    function(){
	    	this.goPlay();
	    }, this);
	    this.btnPlay.setFrames(fp_btnPlaySelected, fp_btnPlay);
	    this.btnPlay.anchor.x = 0.5;
		    		
	    this.btnHighScores = game.add.button(400, 270, 'ssButtons',
	    function() {
	    	this.goHighScores();
	    }, this);
	    this.btnHighScores.setFrames(fp_btnHighScoresSelected, fp_btnHighScores);
	    this.btnHighScores.anchor.x = 0.5;

	    this.btnHowToPlay = game.add.button(400, 370, 'ssButtons',
	    function(){
	    	this.goHowToPlay();
	    }, this);
	    this.btnHowToPlay.setFrames(fp_btnHowToPlaySelected, fp_btnHowToPlay);
	    this.btnHowToPlay.anchor.x = 0.5;
		
	    this.btnCredits = game.add.button(400, 470, 'ssButtons',
	    function(){
	    	this.goCredits();
	    }, this);
	    this.btnCredits.setFrames(fp_btnCreditsSelected, fp_btnCredits);
	    this.btnCredits.anchor.x = 0.5;
	},


	goPlay : function(){
	    this.fadeOut();
	    fadeout.onComplete.add(function () {
	    	game.state.start('sceneGame');
	    });
	},

	goHighScores : function(){
	    this.fadeOut();
	    fadeout.onComplete.add(function () {
	       game.state.start('sceneHighScores');
	    });
	},

	goHowToPlay : function(){
	    this.fadeOut();
	    fadeout.onComplete.add(function () {
	    	game.state.start('sceneHowToPlay');
	    });
	},

	goCredits : function (){
	    this.fadeOut();
	    fadeout.onComplete.add(function () {
	        game.state.start('sceneCredits');
	    });
	},

	fadeOut : function() {
	    fadeout = game.add.tween(this.btnPlay).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
	    fadeout = game.add.tween(this.btnHowToPlay).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
	    fadeout = game.add.tween(this.btnHighScores).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
	    fadeout = game.add.tween(this.btnCredits).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
	}
};