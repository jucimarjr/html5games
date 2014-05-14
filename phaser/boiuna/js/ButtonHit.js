/*global Config*/

var ButtonHit = function (game, hero) {
    "use strict";
    this.game = game;
    this.hero = hero;
};
ButtonHit.prototype = {
    preload: function () {
        "use strict";
        this.game.load.spritesheet('hit', Config.buttonHit.dir, Config.buttonHit.frame.width, Config.buttonHit.frame.height);
    },
    create: function () {
        "use strict";
        this.sprite = this.game.add.button(Config.buttonHit.x, Config.buttonHit.y, 'hit', null, null, Config.buttonHit.frame.over, Config.buttonHit.frame.out, Config.buttonHit.frame.down, Config.buttonHit.frame.up);
        this.sprite.fixedToCamera = true;
    },
    update: function () {
        "use strict";
        if ((this.sprite.frame ===  Config.buttonHit.frame.down || this.game.input.keyboard.isDown(Config.buttonHit.key)) &&
                this.hero.sprite.key !== 'hero-attack') {
            this.hero.sprite.loadTexture('hero-attack');
            this.hero.sprite.animations.add('attack', Config.hero.frame.attack.hit, Config.global.animationVelocity, true);
        } else if ((this.sprite.frame ===  Config.buttonHit.frame.down || this.game.input.keyboard.isDown(Config.buttonHit.key)) &&
                this.hero.sprite.key === 'hero-attack') {
            this.hero.sprite.animations.play('attack');
        } else if (this.hero.sprite.key !== 'hero-normal') {
            this.hero.sprite.loadTexture('hero-normal');
        }
    }
};