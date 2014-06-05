/*global State, Config, Phaser*/

State.DefeatScreen = function (game) {
	"use strict";
	this.game = game;
	this.background = null;
	this.key = null;
};
State.DefeatScreen.prototype = {
	create: function () {
		"use strict";
		this.game.score.calculateLoseScore();
		this.background = this.game.add.sprite(Config.defeatScreen.x, Config.defeatScreen.y, 'defeat-screen');
		this.background.inputEnabled = true;
		this.background.events.onInputDown.add(this.onFirstClick, this);
		this.key = this.game.input.keyboard.addKey(Config.global.key.nextScreen);
		this.key.onDown.add(this.onFirstClick, this);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},
	onFirstClick: function () {
		"use strict";
		var message, text, dragonPart, minutes, hours;
		this.background.events.onInputDown.removeAll();
		this.key.onDown.removeAll();
		this.background.alpha = Config.defeatScreen.dim;
		message = Config.defeatScreen.message.text.youGot + this.game.score.actualLoseScore + " " + Config.defeatScreen.message.text.dragonPart + "\n" + Config.defeatScreen.message.text.bestLoseScore + this.game.score.bestLoseScore + " " + Config.defeatScreen.message.text.dragonPart;
		text = this.game.add.text(Config.global.screen.width / 2, Config.global.screen.height / 2, message, Config.defeatScreen.message.style);
		text.anchor = Config.defeatScreen.message.anchor;
		this.key.onDown.add(this.onSecondClick, this);
		this.background.events.onInputDown.add(this.onSecondClick, this);
	},
	onSecondClick: function () {
		"use strict";
		this.game.sound.stopAll();
		this.game.sound.play('music-normal', 1, true);
		this.game.state.start('Menu');
	}
};