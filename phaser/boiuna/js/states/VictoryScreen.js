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
		timePlayed = Math.floor(this.game.endTime - this.game.beginTime);
		if(timePlayed < this.game.bestScore || !("bestScore" in this.game)){
			this.game.bestScore = timePlayed;
		}
		message = Config.victoryScreen.message.text + timePlayed + " segundos\n Melhor tempo: " + this.game.bestScore + " segundos";
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