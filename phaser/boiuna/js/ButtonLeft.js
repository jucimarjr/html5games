/*global Config*/

var ButtonLeft = function (game, hero) {
    "use strict";
    this.game = game;
    this.hero = hero;
    this.sprite = null;
};
ButtonLeft.prototype =  {
    preload: function () {
        "use strict";
        this.game.load.spritesheet('left', Config.buttonLeft.dir, Config.buttonLeft.frame.width, Config.buttonLeft.frame.height);
    },
    create: function () {
        "use strict";
        this.sprite = this.game.add.button(Config.buttonLeft.x, Config.buttonLeft.y, 'left', null, null, Config.buttonLeft.frame.over, Config.buttonLeft.frame.out, Config.buttonLeft.frame.down, Config.buttonLeft.frame.up);
        this.sprite.fixedToCamera = true;
    },
    update: function () {
        "use strict";
        if (this.sprite.frame ===  Config.buttonLeft.frame.down || this.game.input.keyboard.isDown(Config.buttonLeft.key)) {
			this.hero.sprite.anchor = Config.hero.anchor.left;
			this.hero.sprite.body.velocity.x = -Config.hero.velocity.run;
			if (this.hero.sprite.body.onFloor() && this.hero.sprite.key === 'hero-normal') {
				this.hero.sprite.animations.play('run');
			}
			this.hero.sprite.scale = Config.hero.scale.left;
            return true;
        }
        return false;
    }
};