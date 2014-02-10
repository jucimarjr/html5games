//  Here is a custom game object
		Fantasma = function (corFantasma) {

		    Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, corFantasma);
		    game.add.existing(this);

		};

		Fantasma.prototype = Object.create(Phaser.Sprite.prototype);
		Fantasma.prototype.constructor = Fantasma;

		/**
		 * Automatically called by World.update
		 */
		Fantasma.prototype.update = function() {
			if(this.body.velocity.y>0){
				this.animations.play('baixo')
			}else {
				this.animations.play('cima')
			}

		};