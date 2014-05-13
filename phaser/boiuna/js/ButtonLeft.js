var ButtonLeft = function (game, hero){
    this.game = game;
    this.hero = hero;
    this.sprite = null;
};
ButtonLeft.prototype =  {
    preload: function (){
      this.game.load.spritesheet('left', 'assets/spritesheets/ButtonLeft_600-60.png', 150, 30);   
    },
    create: function (){
        this.sprite = this.game.add.button(0, 570, 'left', null, null, 0, 1, 2, 3);
        this.sprite.fixedToCamera = true;
    },
    update: function (){
        var cursors = this.game.input.keyboard.createCursorKeys();
        if (this.sprite.frame === 2 || cursors.left.isDown) {
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
}