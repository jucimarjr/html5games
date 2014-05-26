/*global State, Config, Phaser*/

State.VictoryScreen = function (game) {
	"use strict";
	this.game = game;
	this.background = null;
	this.key = null;
};
State.VictoryScreen.prototype = {
	create: function () {
		"use strict";
		this.background = this.game.add.sprite(Config.victoryScreen.x, Config.victoryScreen.y, 'victory-screen');
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
		var message, text, seconds, minutes, hours, timePlayed;
		this.background.events.onInputDown.removeAll();
		this.key.onDown.removeAll();
		this.background.alpha = 0.1;
		timePlayed = this.game.endTime - this.game.beginTime;
		hours = Math.floor(timePlayed / 3600);
		if (hours < 10) {
			hours = "0" + hours;
		}
		minutes = Math.floor((timePlayed % 3600) / 60);
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		seconds = Math.floor(timePlayed % 3600 % 60);
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		message = Config.victoryScreen.message.text + hours + ":" + minutes + ":" + seconds;
		text = this.game.add.text(Config.global.screen.width / 2, Config.global.screen.height / 2, message, Config.victoryScreen.message.style);
		text.anchor = Config.victoryScreen.message.anchor;
		this.key.onDown.add(this.onSecondClick, this);
		this.background.events.onInputDown.add(this.onSecondClick, this);
	},
	onSecondClick: function () {
		"use strict";
		this.game.state.start('Menu');
	}
};