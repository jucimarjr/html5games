var Game = function(){};

Game.prototype.preload = function()
{
	game.load.tilemap('stage', 'assets/map2.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('background', 'assets/bg.png');
	game.load.image('tileset', 'assets/tileset.png');
	game.load.spritesheet('mario', 'assets/mario.png', 36,54,5);
	game.load.image('star', 'assets/star.png');
};

Game.prototype.create = function()
{
	game.physics.startSystem(Phaser.Game.ARCADE);
	game.physics.arcade.gravity.y = 800;
	
	this.bg = game.add.tileSprite(0,-600,2000,1200,'background');
	this.bg.fixedToCamera = true;
	
	this.map = game.add.tilemap('stage');
	this.map.addTilesetImage('tileset','tileset');
	
	this.layer = this.map.createLayer('Camada de Tiles 1');
	this.layer.resizeWorld();
	this.map.setCollisionBetween(0,30, true,'Camada de Tiles 1');

	group = game.add.group();
	group.enableBody = true;
	this.map.createFromObjects('Camada de Objetos 1',17, 'star', 0,true,false,group);
	group.forEach(function (star){ star.body.allowGravity = false}, this);

	game.camera.y = 1000;
	this.sprite = game.add.sprite(10,1000 ,'mario', 3);
	this.sprite.anchor.setTo(.5, 1);
	game.physics.enable(this.sprite);
	this.sprite.smoothed = false; 
	this.sprite.body.checkCollision.up = false;
	this.sprite.body.checkCollision.left = false;
	this.sprite.body.checkCollision.right = false;
	this.sprite.animations.add('walk',[1,2,1,3],12,true);
	this.sprite.animations.add('jump',[4],1,false);
	this.sprite.animations.add('stop',[0],1,false);
	this.sprite.body.collideWorldBounds = true;
	game.camera.follow(this.sprite);
	this.cursors = game.input.keyboard.createCursorKeys();
	this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};

Game.prototype.update = function()
{	
	game.physics.arcade.collide(this.layer, this.sprite);
	game.physics.arcade.overlap(group, this.sprite, collision, null,this);

	this.sprite.body.velocity.x = 0;
	if(this.cursors.left.isDown)
	{
		
		this.sprite.scale.x = 1; 
		this.sprite.scale.x = -1;
		this.sprite.animations.play('walk');		
		this.sprite.body.velocity.x = -150;
	}
	else if(this.cursors.right.isDown)
	{
		this.sprite.scale.x = -1; 
		this.sprite.scale.x = 1;
		this.sprite.animations.play('walk');		
		this.sprite.body.velocity.x = 150;
	}
	else if(this.sprite.body.blocked.down)
	{
		this.sprite.animations.stop();
		this.sprite.frame = 0;
	}
	if(this.sprite.body.velocity.y !== 0)
		this.sprite.animations.play('jump');
	if (this.jumpButton.isDown && this.sprite.body.onFloor())
	{
		this.sprite.body.velocity.y = -450;
	}
};

function collision (sprite,star){
	star.kill();
}