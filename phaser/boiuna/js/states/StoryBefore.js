/*global State, Config, Phaser*/

State.StoryBefore = function (game) {
	"use strict";
	this.game = game;
};
State.StoryBefore.prototype = {
	create: function () {
		"use strict";
		var background;
		background = this.game.add.sprite(Config.storyBefore.x, Config.storyBefore.y, 'story-before');
		background.inputEnabled = true;
		background.events.onInputDown.add(this.onClick, this);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
		if (this.game.input.keyboard.isDown(Config.global.key.nextScreen)) {
			this.game.state.start('StoryAfter');
		}
	},
	onClick: function () {
		"use strict";
		this.game.state.start('StoryAfter');
	}
};