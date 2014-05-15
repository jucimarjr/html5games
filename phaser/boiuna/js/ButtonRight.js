/*global Config*/

var ButtonRight = function (game, hero) {
    "use strict";
    this.game = game;
    this.hero = hero;
    this.sprite = null;
};
ButtonRight.prototype =  {
    preload: function () {
        "use strict";
        this.game.load.spritesheet('right', Config.buttonRight.dir, Config.buttonRight.frame.width, Config.buttonRight.frame.height);
    },
    create: function () {
        "use strict";
        this.sprite = this.game.add.button(Config.buttonRight.x, Config.buttonRight.y, 'right', null, null, Config.buttonRight.frame.over, Config.buttonRight.frame.out, Config.buttonRight.frame.down, Config.buttonRight.frame.up);
        this.sprite.fixedToCamera = true;
    },
    update: function () {
        "use strict";
        if (this.sprite.frame === Config.buttonRight.frame.down || this.game.input.keyboard.isDown(Config.buttonRight.key)) {
			this.hero.sprite.anchor = Config.hero.anchor.right;
			this.hero.sprite.body.velocity.x = Config.hero.velocity.run;
			if (this.hero.sprite.body.onFloor() && this.hero.sprite.key === 'hero-normal') {
				this.hero.sprite.animations.play('run');
			}
			this.hero.sprite.scale = Config.hero.scale.right;
            return true;
        }
        return false;
    }
};