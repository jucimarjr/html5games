/*global Phaser, Config*/
var ButtonHit = function (game, hero) {
    "use strict";
    this.game = game;
    this.hero = hero;
};
ButtonHit.prototype = {
    preload: function () {
        "use strict";
        this.game.load.spritesheet('hit', 'assets/spritesheets/ButtonHit_600-60.png', 150, 30);
    },
    create: function () {
        "use strict";
        this.sprite = this.game.add.button(810, 555, 'hit', null, null, 0, 1, 2, 3);
        this.sprite.fixedToCamera = true;
    },
    update: function () {
        "use strict";
        if ((this.sprite.frame === 2 || this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) && this.hero.sprite.key !== 'hero-attack') {
            this.hero.sprite.loadTexture('hero-attack');
            this.hero.sprite.animations.add('attack', Config.hero.frame.attack.hit, Config.global.animationVelocity, true);
        } else if ((this.sprite.frame === 2 || this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) && this.hero.sprite.key === 'hero-attack') {
            this.hero.sprite.animations.play('attack');
        } else if (this.hero.sprite.key !== 'hero-normal') {
            this.hero.sprite.loadTexture('hero-normal');
        }
    }
};