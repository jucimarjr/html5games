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
    game.load.atlas('botoes', 'assets/screenshots/screens.png', 'assets/screenshots/screens.json');
    game.load.image('msg', 'assets/screenshots/collectresources.png');
    game.load.image('title', 'assets/screenshots/Klix1.png');
		
};

Menu.prototype.create = function() {
	this.game.world.setBounds(0, 0, 800, 480);
    var fadeout;
    
    this.title = game.add.sprite(0, -230, 'title');
    
    
    this.btnPlay = game.add.button(game.world.centerX + 15, game.world.centerY - 90, 'botoes',
    function(){ this.play(); }, this);
    this.btnPlay.setFrames("btnplay2.png", 'btnplay1.png');
    this.btnPlay.anchor.x = 0.5;
	    		
    this.btnHowToPlay = game.add.button(game.world.centerX + 15, game.world.centerY - 30, 'botoes',
    function(){ this.howToPlay(); }, this);
    this.btnHowToPlay.setFrames("btnhowto2.png", "btnhowto1.png");
    this.btnHowToPlay.anchor.x = 0.5;
	
    this.btnHighScores = game.add.button(game.world.centerX + 15, game.world.centerY + 30, 'botoes',
    function () { this.highScores(); }, this);
    this.btnHighScores.setFrames("btnscores2.png", "btnscores1.png");
    this.btnHighScores.anchor.x = 0.5;

    this.btnCredits = game.add.button(game.world.centerX + 15, game.world.centerY + 90, 'botoes',
    function(){ this.credits(); }, this);
    this.btnCredits.setFrames('btncredits2.png', "btncredits1.png");
    this.btnCredits.anchor.x = 0.5;
    
    var keyUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
	keyUp.onDown.add(function () {this.setButton('up')}, this);
	var keyDown = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	keyDown.onDown.add(function () {this.setButton('down')}, this);
	var keySelect = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	keySelect.onDown.add(function () {
		if(game.state.current == 'menu'){
		switch(this.button){
		case 1:this.play();break;
		case 2:this.howToPlay();break;
		case 3:this.highScores();break;
		case 4:this.credits();break;
		}}
	}, this);
};

Menu.prototype.setButton = function(key){
	if(key == 'up'){
		this.button--;
		if(this.button<1){
			this.button = 4;
		}
	}else if(key == 'down'){
		this.button++;
		if(this.button>4){
			this.button = 1;
		}
	}
	console.log(this.button);
	switch(this.button){
	case 1:
		this.btnPlay.setFrames("btnplay1.png", 'btnplay2.png');
		this.btnHowToPlay.setFrames("btnhowto2.png", "btnhowto1.png");
		this.btnHighScores.setFrames("btnscores2.png", "btnscores1.png");
		this.btnCredits.setFrames('btncredits2.png', "btncredits1.png");
	break;
	case 2:
		this.btnPlay.setFrames("btnplay2.png", 'btnplay1.png');
		this.btnHowToPlay.setFrames("btnhowto1.png", "btnhowto2.png");
		this.btnHighScores.setFrames("btnscores2.png", "btnscores1.png");
		this.btnCredits.setFrames('btncredits2.png', "btncredits1.png");
	break;
	case 3:
		this.btnPlay.setFrames("btnplay2.png", 'btnplay1.png');
		this.btnHowToPlay.setFrames("btnhowto2.png", "btnhowto1.png");
		this.btnHighScores.setFrames("btnscores1.png", "btnscores2.png");
		this.btnCredits.setFrames('btncredits2.png', "btncredits1.png");
	break;
	case 4:
		this.btnPlay.setFrames("btnplay2.png", 'btnplay1.png');
		this.btnHowToPlay.setFrames("btnhowto2.png", "btnhowto1.png");
		this.btnHighScores.setFrames("btnscores2.png", "btnscores1.png");
		this.btnCredits.setFrames('btncredits1.png', "btncredits2.png");
	break;
	}
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
        		game.state.start('game');
            });
        });
    	
    });
};

Menu.prototype.howToPlay = function() {
    this.fadeOut();
    fadeout.onComplete.add(function () {
        game.state.start('howToPlay');
    });
};

Menu.prototype.highScores = function () {
    this.fadeOut();
    fadeout.onComplete.add(function () {
        game.state.start('highScore');
    });
};

Menu.prototype.credits = function () {
    this.fadeOut();
    fadeout.onComplete.add(function () {
        this.game.state.start('credits');
    });
};

Menu.prototype.fadeOut = function () {
	fadeout = game.add.tween(this.title).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
    fadeout = game.add.tween(this.btnPlay).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
    fadeout = game.add.tween(this.btnHowToPlay).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
    fadeout = game.add.tween(this.btnHighScores).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
    fadeout = game.add.tween(this.btnCredits).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
};