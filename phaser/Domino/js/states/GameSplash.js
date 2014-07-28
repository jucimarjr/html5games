/*global setTimeout, State, Config, Phaser*/

State.GameSplash = function (game) {
	"use strict";
	this.game = game;
};
State.GameSplash.prototype = {
	preload: function () {
		"use strict";
		var sprite, progressBar;
		sprite = this.game.add.sprite(Config.gameSplash.x, Config.gameSplash.y, 'game-splash');
		progressBar = this.game.add.sprite(Config.gameSplash.progressBar.x, Config.gameSplash.progressBar.y, 'progress-bar');
		this.game.load.setPreloadSprite(progressBar);
		this.game.load.onLoadComplete.add(this.nextState, this);
		this.loadAssets();
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},
	nextState: function () {
		"use strict";
		setTimeout(function () {
			this.game.state.start('Menu');
		}, Config.gameSplash.time.nextState);
	},
	loadAssets: function () {
		"use strict";
		//Menu
		this.game.load.image('menu-background',  Config.menu.dir);
		this.game.load.spritesheet('button-play', Config.menu.buttonPlay.dir, Config.menu.buttonPlay.frame.width, Config.menu.buttonPlay.frame.height);
		this.game.load.spritesheet('button-credits', Config.menu.buttonCredits.dir, Config.menu.buttonCredits.frame.width, Config.menu.buttonCredits.frame.height);
		this.game.load.spritesheet('button-how-to-play', Config.menu.buttonHowToPlay.dir, Config.menu.buttonHowToPlay.frame.width, Config.menu.buttonHowToPlay.frame.height);
		//Credits
		this.game.load.image('credits', Config.credits.dir);
		//HowToPlay
		this.game.load.image('how-to-play', Config.howToPlay.dir);
		//Game
	}
};