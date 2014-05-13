var ButtonRight = function (game, hero){
    this.game = game;
    this.hero = hero;
    this.sprite = null;
};
ButtonRight.prototype =  {
    preload: function (){
      this.game.load.spritesheet('right', 'assets/spritesheets/ButtonRight_600-60.png', 150, 30);   
    },
    create: function (){
        this.sprite = this.game.add.button(200, 570, 'right', null, null, 0, 1, 2, 3);
        this.sprite.fixedToCamera = true;
    },
    update: function (){
        var cursors = this.game.input.keyboard.createCursorKeys();
        if (this.sprite.frame === 2 || cursors.right.isDown) {
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
}