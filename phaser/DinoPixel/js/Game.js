var Game = function()
{
	this.player = new Dino();
	this.gravity = 800;
	this.layer, this.layer2, this.layer3, this.layer4, this.layer5, this.layer6;
	this.bg; 		//sprite do backGround
	this.layerBack1, this.layerBack2;
	this.track;
	this.humans;
	this.objectHuman = new Array();
	this.guy;
	this.SoundSmash;
	this.map;
	this.humanTexture = new Array();
		this.humanTexture[0] = 'regularGuy';
		this.humanTexture[1] = 'regularGirl';
		this.humanTexture[2] = 'man';
		this.humanTexture[3] = 'medic';
		this.humanTexture[4] = 'muscleMan';
		this.humanTexture[5] = 'worker1';
}
Game.prototype.create = function()
{
	this.track = game.add.audio('track',5,true);
	this.track.play();
	this.soundSmash = game.add.audio('smash',5,false);
	
	game.physics.startSystem(Phaser.Game.ARCADE);
	game.physics.arcade.gravity.y = this.gravity;

	this.bg = game.add.tileSprite(0,0,800,600,'backGround');
	this.bg.fixedToCamera = true;

	this.map = game.add.tilemap('stage');
	this.map.addTilesetImage('cityThings','cityThings');
	this.map.addTilesetImage('urbanBuildings1','urbanBuildings1');
	this.map.addTilesetImage('urbanBuildings2','urbanBuildings2');
	this.map.addTilesetImage('back2','back2');
	this.map.addTilesetImage('back1','back1');
	this.layerBack2 = this.map.createLayer('back2');
	this.layerBack1 =this. map.createLayer('back1');
	this.layerBg = this.map.createLayer('bg');
	this.layer = this.map.createLayer('Camada de Tiles 1');
	this.layer2 = this.map.createLayer('Camada de Tiles 2');
	this.layer3 = this.map.createLayer('Camada de Tiles 3');
	this.layer4 = this.map.createLayer('Camada de Tiles 4');
	this.layer5 = this.map.createLayer('Camada de Tiles 5');
	this.layer6 = this.map.createLayer('Camada de Tiles 6');
	this.map.setCollision([162,163,15,16,2086,2089,2090],true,'Camada de Tiles 6'); // IDs dos tiles que colidem (plataformas).
	this.map.setCollisionBetween(19,26, true,'Camada de Tiles 6'); // intervaldo de IDs dos tiles que colidem (plataformas).
	this.map.setCollisionBetween(2152,2156, true,'Camada de Tiles 6');
	this.map.setCollisionBetween(2083,2085, true,'Camada de Tiles 6');
	this.layerBack1.scrollFactorX = 0.35; // da o efeito de profundidade.
	this.layerBack2.scrollFactorX = 0.2;
	//this.layer.debug = true;
	//this.layer6.debug = true;
	this.layer.resizeWorld();
	
	this.humans = game.add.group();
	
	for(var i = 0; i< 60; i++)
	{
		this.objectHuman[i] = new Human()
		this.objectHuman[i].add(100 * i,1000, this.humanTexture[game.rnd.integerInRange(0 , this.humanTexture.length)]);
		this.humans.add(this.objectHuman[i].sprite);
	}
	
	
	
	this.player.add(32,1000);
	
	game.camera.follow(this.player.sprite);
	
}
Game.prototype.update = function()
{ 
	game.physics.arcade.collide(this.layer6, [this.humans, this.player.sprite]);
	
	for (var i = 0; i < this.objectHuman.length; i++)
	{
		this.objectHuman[i].stayNormal();
	}
	
	this.player.enableMovement(); // faz com que o personagem se mova quando pressionadas as teclas.
	this.player.enableJump(); // faz com que o personagem pule quando pressionada a tecla de pulo.
}

