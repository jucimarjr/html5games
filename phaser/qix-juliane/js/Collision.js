Collision = function() {
};

Collision.prototype = {
	preload : function() {
	},

	create : function() {
	},
	
	update : function(sprite) {
		this.ballInsideShape(sprite);
		
		this.ballWithWall();
		if (!ball.collided) {
			this.ballWithShape();
		}
	},
	
	
	ballInsideShape : function(sprite) {
		var indexX = 0;
		var indexY = 0;
		
		for (var i = 0; i < shape.position.length; i++) {
			for (var j = 0; j < shape.position[i].length; j++) {

				indexX = j + 1;
				indexY = j + 2;
				if (j == shape.position[i].length - 1) {
					indexX = 0;
					indexY = 1;
				}
				if (j == shape.position[i].length - 2)
					indexY = 0;

				if ((sprite.x <= shape.position[i][j].x) && (sprite.x >= shape.position[i][indexX].x) ||
					(sprite.x >= shape.position[i][j].x) && (sprite.x <= shape.position[i][indexX].x)) {
					if ((sprite.y <= shape.position[i][j].y) && (sprite.y >= shape.position[i][indexY].y) ||
						(sprite.y >= shape.position[i][j].y) && (sprite.y <= shape.position[i][indexY].y)) {
							return true;
					}
				}
			}
		}
		
		return false;
	},
	
	
	//Trata da colisão da bolinha com a parede do jogo
	ballWithWall : function() {
		if (ball.sprite.x <= 0.5*ball.sprite.width)
			ball.sprite.x = 0.5*ball.sprite.width;
		if (ball.sprite.x >= game.world.width - 1.5*ball.sprite.width)
			ball.sprite.x = game.world.width - 1.5*ball.sprite.width;
		if (ball.sprite.y <= screenGame.thicknessExtras + 0.5*ball.sprite.height)
			ball.sprite.y = screenGame.thicknessExtras + 0.5*ball.sprite.height;
		if (ball.sprite.y >= game.world.height+screenGame.thicknessExtras - 1.5*ball.sprite.height)
			ball.sprite.y = game.world.height+screenGame.thicknessExtras - 1.5*ball.sprite.height;
	},
	
	//Trata da colisão da bolinha com o corpo
	ballWithShape : function() {
		//Trata da colisão com as bordas verticais (esquerda/direita)
		if (ball.sprite.x < screenGame.thicknessBGame) {
			line.savePosition("COLLISION", ball.sprite.x - ball.sprite.width, ball.sprite.y + ball.sprite.height/2 + 0.45);
			line.savePosition("COLLISION", ball.sprite.x - ball.sprite.width, line.position[0].y);
			ball.collided = true;
		}
		else if (ball.sprite.x > game.world.width - screenGame.thicknessBGame) {
			line.savePosition("COLLISION", ball.sprite.x + ball.sprite.width, ball.sprite.y + ball.sprite.height/2 + 0.45);
			line.savePosition("COLLISION", ball.sprite.x + ball.sprite.width, line.position[0].y);
			ball.collided = true;
		}

		//Trata da colisão com as bordas horizontais (superior/inferior)
		else if (ball.sprite.y < screenGame.thicknessBGame) {
			line.savePosition("COLLISION", ball.sprite.x + ball.sprite.width/2 + 0.45, line.position[0].y);
			ball.collided = true;
		}
		else if (ball.sprite.y > game.world.height+screenGame.thicknessExtras - screenGame.thicknessBGame) {
			line.savePosition("COLLISION", ball.sprite.x + ball.sprite.width/2 + 0.45, line.position[0].y);
			ball.collided = true;
		}
		
		if (ball.collided) {
			//Desenha o corpo
			shape.draw(line.position);
			//Esvazia o vetor line.position
			line.position.length = 0;
		}
	}
};
