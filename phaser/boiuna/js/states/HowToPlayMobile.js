/*global State, Config, Phaser*/

State.HowToPlayMobile = function (game) {
	"use strict";
	this.game = game;
};
State.HowToPlayMobile.prototype = {
	create: function () {
		"use strict";
		var background = this.game.add.sprite(Config.howToPlayMobile.x, Config.howToPlayMobile.y, 'how-to-play-mobile');
		background.inputEnabled = true;
		background.events.onInputDown.add(this.onClick, this);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
		if (this.game.input.keyboard.isDown(Config.global.key.nextScreen)) {
			this.game.state.start('Menu');
		}
	},
	onClick: function () {
		"use strict";
		this.game.state.start('Menu');
	}
};