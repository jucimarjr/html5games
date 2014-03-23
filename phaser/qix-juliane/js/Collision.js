Collision = function() {
};

Collision.prototype = {
	preload : function() {
	},

	create : function() {
	},
	
	update : function(sprite) {
		this.qixWithShape();
		
		if (ball.alive) {
			this.ballWithWall();
			
			if (line.position.length > 0)
				ball.collided = this.ballWithShape();
			else ball.collided = this.ballInsideShape();
		}
	},

	
	//Trata da colisão da bolinha com a linha
	ballWithLine : function() {
	},

	//Identifica se a bolinha está dentro das bordas
	ballInsideShape : function() {
		if ((ball.sprite.x < screenGame.thicknessBGame) ||
			(ball.sprite.x > game.world.width - screenGame.thicknessBGame) ||
			(ball.sprite.y < screenGame.thicknessBGame + screenGame.thicknessExtras) ||
			(ball.sprite.y > game.world.height - screenGame.thicknessBGame))
			return true;
		return false;
	},
	
	//Trata da colisão da bolinha com as bordas
	ballWithShape : function() {
		//Trata da colisão com as bordas verticais (esquerda/direita)
		if (ball.sprite.x < screenGame.thicknessBGame) {
			line.savePosition("COLLISION", ball.sprite.x - ball.sprite.width, ball.sprite.y + ball.sprite.height/2 + 0.45);
			line.savePosition("COLLISION", ball.sprite.x - ball.sprite.width, line.position[0].y);
		}
		else if (ball.sprite.x > game.world.width - screenGame.thicknessBGame) {
			line.savePosition("COLLISION", ball.sprite.x + ball.sprite.width, ball.sprite.y + ball.sprite.height/2 + 0.45);
			line.savePosition("COLLISION", ball.sprite.x + ball.sprite.width, line.position[0].y);
		}

		//Trata da colisão com as bordas horizontais (superior/inferior)
		else if (ball.sprite.y < screenGame.thicknessBGame + screenGame.thicknessExtras) {
			line.savePosition("COLLISION", ball.sprite.x + ball.sprite.width/2 + 0.45, line.position[0].y);
		}
		else if (ball.sprite.y > game.world.height - screenGame.thicknessBGame) {
			line.savePosition("COLLISION", ball.sprite.x + ball.sprite.width/2 + 0.45, line.position[0].y);
		} else {
			return false;
		}
		
		shape.draw(line.position);
		//Esvazia o vetor line.position
		line.position.length = 0;
		
		return true;
	},

	//Trata da colisão da bolinha com a parede do jogo
	ballWithWall : function() {
		if (ball.sprite.x <= 0.5*ball.sprite.width)
			ball.sprite.x = 0.5*ball.sprite.width;
		if (ball.sprite.x >= game.world.width - 1.5*ball.sprite.width)
			ball.sprite.x = game.world.width - 1.5*ball.sprite.width;
		if (ball.sprite.y <= screenGame.thicknessExtras + 0.5*ball.sprite.height)
			ball.sprite.y = screenGame.thicknessExtras + 0.5*ball.sprite.height;
		if (ball.sprite.y >= game.world.height - 1.5*ball.sprite.height)
			ball.sprite.y = game.world.height - 1.5*ball.sprite.height;
	},

	
	//Trata da colisão do qix com o corpo
	qixWithShape : function() {
		for (var i = 0; i < shape.bodyShape.length; i++) {
			for (var j = 0; j < shape.bodyShape[i].length; j++)
				game.physics.collide(qix.sprite, shape.bodyShape[i][j]);
		}
	}
};
