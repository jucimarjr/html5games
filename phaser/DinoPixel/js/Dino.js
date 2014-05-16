var Dino = function()
{
	this.sprite;
	this.jumpButton
	this.cursors;
	this.playerSpeed = 200;
	this.jumpForce = 520;
	this.soundJump;
}
Dino.prototype.add = function(posX, posY)
{
	this.sprite = game.add.sprite(posX, posY ,'dino');
	game.physics.enable(this.sprite);
	this.sprite.smoothed = false; // em false, se modificar o tamanho a imagem continua pixelada.
	this.sprite.anchor.setTo(0.4 ,0.5);
	this.sprite.scale.setTo(4,4); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< mudar isso depois, trocar o sprite por um 4x maior.
	this.sprite.animations.add('walk',[0,1,2,3,4,5,6,7],12,true);
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.checkCollision.up = false;
	this.sprite.body.checkCollision.left = false;
	this.sprite.body.checkCollision.right = false;
	this.sprite.body.setSize(8,32,-4,-4);
	this.cursors = game.input.keyboard.createCursorKeys();
	this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.soundJump = game.add.audio('jump',soundLevel,false);
}

Dino.prototype.enableMovement = function () 
{
	this.sprite.body.velocity.x = 0;
	if(this.cursors.left.isDown)
	{
		this.sprite.body.setSize(8,32,-2,-4);
		this.sprite.scale.setTo(-4,4);
		this.sprite.animations.play('walk');		
		this.sprite.body.velocity.x = -this.playerSpeed;
	}
	else if(this.cursors.right.isDown)
		{
		this.sprite.body.setSize(8,32,-4,-4);
		this.sprite.scale.setTo(4,4);
		this.sprite.animations.play('walk');		
		this.sprite.body.velocity.x = this.playerSpeed;
		}
	else 
		if(this.sprite.body.blocked.down)
	{
		this.sprite.animations.stop();
		this.sprite.frame = 1;
	}
	if(this.sprite.body.velocity.y < 0)
		this.sprite.frame = 9;
		else if(this.sprite.body.velocity.y > 0)
		this.sprite.frame = 8;
}

Dino.prototype.enableJump = function()
{
	if (this.jumpButton.isDown && this.sprite.body.onFloor())
	{
		this.soundJump.play();
		this.sprite.body.velocity.y = -this.jumpForce;
	}
}

