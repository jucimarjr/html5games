var Game = {};
Game = function()
{
    this.color = new Array(); // Array com cada um de seus elements contendo a imagem de um bloco de uma cor.
		this.color[0] = 'redBlock';
		this.color[1] = 'orangeBlock';
		this.color[2] = 'yelowBlock';
		this.color[3] = 'greenBlock';
		this.color[4] = 'blueBlock';
	this.player;
	this.ball;
	this.ballFall = true;
	this.blocks;
	this.score;
	this.lives;
	this.cursors;
	this.style = { font: "65px Arial", fill: "#ff0000", align: "center" };
	this.textScore;
	this.textLives;
	this.playerSpeed = 550;
	this.ballSpeed = 330;
	this.lives;
	this.score;
	this.soundHitPlayerAndWall;
	this.soundHitBlock;
	this.soundGameOver;
	this.soundBallFall;
	this.soundNewLevel;
	this.blockSprt;
	this.playerSprt
	this.block;
}

Game.prototype.create = function()
{
	//sons
		this.soundHitPlayerAndWall = game.add.audio('hitPlayer');
		this.soundHitBlock = game.add.audio('hit1');
		this.soundGameOver = game.add.audio('gameOver');
		this.soundBallFall = game.add.audio('ballFall');
		this.soundNewLevel = game.add.audio('Explosion1');
		
		// interface
		this.lives = 3;
		this.score = 0;
		this.textScore = game.add.text(game.world.x, 0, 'Score: '+this.score, { font: "22px Monospace", fill: "#ffffff", align: "center" });
		this.textLives = game.add.text(game.world.width - 200, 0, 'Lives: ' + this.lives, { font: "22px Monospace", fill: "#ffffff", align: "center" });
		 // cria os sprites p/ usar seus atributos na hora de cria-los.
		this.blockSprt = game.add.sprite(0,0,'blueBlock');
		this.blockSprt.kill();
		this.playerSprt = game.add.sprite(0,0,'player');
		this.playerSprt.kill();
		
		this.blocks = game.add.group();
		// Cria a grade de blocos
		
		this.player = game.add.sprite(game.world.width/2 ,game.world.height - this.playerSprt.height, 'player');
		this.player.anchor.setTo(0.5,0.5);
		this.player.body.collideWorldBounds = true;
		this.player.body.immovable = true

		this.ball = game.add.sprite(game.world.width/2 , game.world.height - 50,'ball');
		this.ball.body.collideWorldBounds = true;
		this.ball.anchor.setTo(0.5,0.5);
		this.ball.body.velocity.y = -this.ballSpeed;
		this.ball.body.bounce.y = 1;
		this.ball.body.bounce.x = 1;
		this.newLevel()
		// Controles
		this.cursors = game.input.keyboard.createCursorKeys();
}

Game.prototype.update = function()
{
	game.physics.collide(this.player, this.ball,this.manageCollision,null,this);
		game.physics.collide(this.ball, this.blocks,this.breakBlock, null, this);
		game.physics.setBoundsToWorld(true,true,true,false);
		if(this.ball.y > game.world.height && this.ballFall){
			this.ballFall = false;
			this.soundBallFall.play();	
			}
	    if(this.ball.y > game.world.height + 100){ //se a bola sair da tela.
			this.lives --;
			this.textLives.content = 'Lives: ' + this.lives;
			if(this.lives > 0)
				this.restartPosition();
			else
			this.gameOver();
    }
    	if(!game.input.activePointer.isDown)
			this.player.body.velocity.x = 0;
		if( this.cursors.left.isDown )
			this.player.body.velocity.x = -this.playerSpeed;
			else if ( this.cursors.right.isDown )
				this.player.body.velocity.x = this.playerSpeed;

			//move on mobie
	game.input.onDown.add(function()
	{
		if(game.input.x > game.world.width/2)
			this.player.body.velocity.x = this.playerSpeed;
		else if(game.input.x < game.world.width/2)
			this.player.body.velocity.x = -this.playerSpeed;
	},this);

	game.input.onUp.add(function(){
		this.player.body.velocity.x = 0;
	},this)
}

Game.prototype.restartPosition = function()
{
	this.ballFall = true;
		this.player.x = game.world.width/2 ;
		this.ball.x = game.world.width/2;
		this.ball.y = game.world.height - 50;
		this.ball.body.velocity.x = Math.random () * this.ballSpeed*2 - this.ballSpeed ;
		this.ball.body.velocity.y = -this.ballSpeed;
}

Game.prototype.gameOver = function()
{
	this.soundGameOver.play();
		this.ball.kill();
		this.ball.x = game.world.width/2;
		this.ball.y = game.world.height - 50;
	    var gO = game.add.sprite(game.world.centerX - 200, game.world.centerY-50,'gameOver');
	    game.input.onDown.add(function() {
        game.state.start('game');
        })
    
}

Game.prototype.newLevel = function()
{
	this.soundNewLevel.play();
		this.restartPosition();
		for(var i = 0; i < 5; i++){ 
			for (var j = 0; j < 8; j++){
				this.block = this.blocks.create(j * (this.blockSprt.width + 3) + 29, i * (this.blockSprt.height + 3 )+ 80, this.color[i]);	// Organiza os blocos, botando espaços entre si e entre as bordas da tela
				this.block.body.immovable = true;
			}
		}
}

Game.prototype.manageCollision = function(player, ball)
{
	this.soundHitPlayerAndWall.play();
	if(this.player.body.velocity.x > 0 )
			this.ball.body.velocity.x = this.ballSpeed * Math.random () + this.ballSpeed/2;
		else if(player.body.velocity.x < 0 )
				this.ball.body.velocity.x = -this.ballSpeed * Math.random () - this.ballSpeed/2;
				else
				this.ball.body.velocity.x = Math.random () * this.ballSpeed*2 - this.ballSpeed ;
}

Game.prototype.breakBlock = function(ball,block)
{
	this.soundHitBlock.play();
		block.destroy();
		if (this.blocks.countLiving() == 0)
			this.newLevel();
		this.score += 5; 
		this.textScore.content = 'Score: '+ this.score;
}