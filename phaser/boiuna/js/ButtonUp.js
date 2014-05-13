var ButtonUp = function (game, hero){
    this.game = game;
    this.hero = hero;
    this.sprite = null;
    this.jumpControl = 0;
};
ButtonUp.prototype =  {
    preload: function (){
      this.game.load.spritesheet('up', 'assets/spritesheets/ButtonUp_600-60.png', 150, 30);   
    },
    create: function (){
        this.sprite = this.game.add.button(100, 540, 'up', null, null, 0, 1, 2, 3);
        this.sprite.fixedToCamera = true;
    },
    update: function (){
         var cursors = this.game.input.keyboard.createCursorKeys();
        if ((this.sprite.frame === 2 || cursors.up.isDown) && this.hero.sprite.body.onFloor()) {
			this.hero.sprite.body.velocity.y = Config.hero.velocity.jump;
			this.jumpControl = this.jumpControl + 1;
            if (this.hero.sprite.key === 'hero-normal') {
			    this.hero.sprite.animations.stop();
                this.hero.sprite.frame = Config.hero.frame.normal.jumping;
            }
            return true;
		} else if ((this.sprite.frame === 2 || cursors.up.isDown) && this.jumpControl < Config.hero.jump.max && this.jumpControl !== 0) {
			this.hero.sprite.body.velocity.y = Config.hero.velocity.jump;
			this.jumpControl = this.jumpControl + 1;
            return true;
        } else if (!this.hero.sprite.body.onFloor()) {
			this.jumpControl = 0;
            if (this.hero.sprite.key === 'hero-normal') {
			    this.hero.sprite.frame = Config.hero.frame.normal.falling;
            }
            return true;
		}
        return false;
    }
}