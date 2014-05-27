/*global State, Config, Phaser*/

State.HowToPlayDesktop = function (game) {
	"use strict";
	this.game = game;
};
State.HowToPlayDesktop.prototype = {
	create: function () {
		"use strict";
		var background = this.game.add.sprite(Config.howToPlayDesktop.x, Config.howToPlayDesktop.y, 'how-to-play-desktop');
		background.inputEnabled = true;
		background.events.onInputDown.add(this.onClick, this);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
		if (this.game.input.keyboard.isDown(Config.global.key.nextScreen)) {
			this.game.state.start('HowToPlayMobile');
		}
	},
	onClick: function () {
		"use strict";
		this.game.state.start('HowToPlayMobile');
	}
};