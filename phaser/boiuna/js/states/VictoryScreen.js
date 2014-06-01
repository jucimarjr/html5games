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
		this.game.score.calculateWinScore();
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
		var message, text, seconds, minutes, hours;
		this.background.events.onInputDown.removeAll();
		this.key.onDown.removeAll();
		this.background.alpha = Config.victoryScreen.dim;
		message = Config.victoryScreen.message.text.yourTimeWas + this.game.score.actualWinScore + " " + Config.victoryScreen.message.text.seconds + "\n" + Config.victoryScreen.message.text.bestWinScore + this.game.score.bestWinScore + " " + Config.victoryScreen.message.text.seconds;
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