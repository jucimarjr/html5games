/*global State, Config, Phaser*/

State.StoryAfter = function (game) {
	"use strict";
	this.game = game;
};
State.StoryAfter.prototype = {
	create: function () {
		"use strict";
		var background = this.game.add.sprite(Config.storyAfter.x, Config.storyAfter.y, 'story-after');
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