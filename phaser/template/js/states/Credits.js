/*global State, Config, Phaser*/

State.Credits = function (game) {
	"use strict";
	this.game = game;
};
State.Credits.prototype = {
	preload: function () {
		"use strict";
	},
	create: function () {
		"use strict";
		var background = this.game.add.sprite(Config.credits.x, Config.credits.y, 'credits');
		background.inputEnabled = true;
		background.events.onInputDown.add(this.onClick, this);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			this.game.state.start('Menu');
		}
	},
	onClick: function () {
		"use strict";
		this.game.state.start('Menu');
	}
};
