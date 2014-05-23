/*global State, Config, Phaser*/

State.VictoryScreen = function (game) {
	"use strict";
	this.game = game;
	this.background = null;
	this.timePlayed = 0;
};
State.VictoryScreen.prototype = {
	create: function () {
		"use strict";
		this.timePlayed = this.game.time.now;
		this.background = this.game.add.sprite(Config.victoryScreen.x, Config.victoryScreen.y, 'victory-screen');
		this.background.inputEnabled = true;
		this.background.events.onInputDown.add(this.onFirstClick, this);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			this.game.state.start('Menu');
		}
	},
	onFirstClick: function () {
		"use strict";
		var message, text;
		this.background.events.onInputDown.removeAll();
		this.background.alpha = 0.3;
		message = "O seu tempo foi: " + this.timePlayed;
		text = this.game.add.text(Config.global.screen.width / 2, Config.global.screen.height / 2, message, { font: '16px Arial', fill: '#fff' });
		text.anchor.setTo(0.5, 0.5);
		this.background.events.onInputDown.add(this.onSecondClick, this);
	},
	onSecondClick: function () {
		"use strict";
		this.game.state.start('Menu');
	}
};