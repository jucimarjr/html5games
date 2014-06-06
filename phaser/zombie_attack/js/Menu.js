var Menu = {};

Menu = function (game) {
    this.game = game;
    this.background = null;
    this.btnPlay = null;
    this.btnHowToPlay = null;
    this.btnHighScores = null;
    this.btnCredits = null;
    this.btnBack = null;
};

Menu.prototype.preload = function(){
	this.game.load.image('menu', screenMenu);
	//game.load.atlas('buttons', spriteSheetsImageButtons, spriteSheetsJsonButtons);
	this.game.load.atlas('buttons', spriteSheetsImageButtons, spriteSheetsJsonButtons);
};

Menu.prototype.create = function() {
	
	this.background = this.game.add.sprite(0, 0, 'menu');
	this.background.name = 'background';
	

    var fadeout;
    
    this.btnPlay = game.add.button(410,397, 'buttons',
    	    function(){ this.play(); }, this);
    	    this.btnPlay.setFrames(btPlaySelecionado,btPlay);
    	    this.btnPlay.anchor.x = 0.5;
    		    		
    this.btnHowToPlay = game.add.button(324, 467, 'buttons',
    	    function(){ this.howToPlay(); }, this);
    	    this.btnHowToPlay.setFrames(btHowToPlaySelelecionado,btHowToPlay);
    	    this.btnHowToPlay.anchor.x = 0.5;
    		
    this.btnHighScores = game.add.button(489, 467, 'buttons',
    	    function () { this.highScores(); }, this);
    	    this.btnHighScores.setFrames(btScoreSelecionado,btScore);
    	    this.btnHighScores.anchor.x = 0.5;

    this.btnCredits = game.add.button(410, 535, 'buttons',
    	    function(){ this.credits(this.background, this); }, this);
    	    this.btnCredits.setFrames(btCreditsSelected,btCredits);
    	    this.btnCredits.anchor.x = 0.5;
   
};

Menu.prototype.play = function () {
    this.fadeOut();
    fadeout.onComplete.add(function () {
        this.game.state.start('game', Game);
    });
};

Menu.prototype.howToPlay = function() {
    this.fadeOut();
    fadeout.onComplete.add(function () {
        this.game.state.start('howtoplay', HowToPlay);
    });
};

Menu.prototype.highScores = function () {
    this.fadeOut();
    fadeout.onComplete.add(function () {
        this.game.state.start('gameover', GameOver);
    });
}

Menu.prototype.credits = function (background,parent) {
    this.fadeOut();
    fadeout.onComplete.add(function () {
      //this.game.state.start('Credits', Credits);
    	background.alpha = 0.75;
    	this.game.add.tween(background).to( { alpha: 0}, Phaser.Easing.Linear.None, true, 0, 1000, false);
    	
    	credits = game.add.sprite(-50, 200, 'credits');

        credits.scale.setTo(0.5, 0.5);

        creditsArrives = game.add.tween(credits);
        
        creditsArrives.to({x:300}, 1000, Phaser.Easing.Bounce.Out);
        //creditsArrives.onComplete.add(backMenu, this);
        
        btnBack = game.add.button(500, 420, 'buttons',
        function(){parent.BackMenu(credits); }, this);
        btnBack.setFrames(btVoltar,btVoltar);
        btnBack.anchor.x = 0.5;
        
        creditsArrives.start();
        
    });
};

Menu.prototype.BackMenu = function(credits) {
	creditscreditsArrives = game.add.tween(credits);
    
	creditsArrives.to({ x: -300 }, 1000, Phaser.Easing.Bounce.Out);
	creditsArrives.start();
	//while(creditsArrives.isRunning){}
	this.create();
};

Menu.prototype.fadeOut = function () {
    fadeout = game.add.tween(this.btnPlay).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
    fadeout = game.add.tween(this.btnHowToPlay).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
    fadeout = game.add.tween(this.btnHighScores).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
    fadeout = game.add.tween(this.btnCredits).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
};