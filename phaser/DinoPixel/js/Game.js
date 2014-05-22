var Game = function()
{
	this.carSpawnTime = 0;
	this.gameName;
	this.cameraSpeed = 5;
	this.player = new Dino();
	this.gravity = 800;
	this.layerBg1;
	this.layerBg2;
	this.layer; 
	this.layer2; 
	this.layer3; 
	this.layer4;
	this.bg; 		//sprite do backGround (estrelas).
	this.track;
	this.humans;
	this.objectHuman = new Array();
	this.objectCar;
	this.cars;
	this.map;
		this.playButton;
		this.creditsButton;
}
Game.prototype.create = function()
{
	//audios
	this.track = game.add.audio('track',soundLevel,true)
	this.insertCoinSound = game.add.audio('insertCoin',soundLevel);
	//fisicas
	game.physics.startSystem(Phaser.Game.ARCADE);
	game.physics.arcade.gravity.y = this.gravity;
	//cenario
	this.bg = game.add.tileSprite(0,0,960,600,'backGround');
	this.bg.fixedToCamera = true;
	this.map = game.add.tilemap('stage');
	this.map.addTilesetImage('cityThings','cityThings');
	this.map.addTilesetImage('urbanBuildings1','urbanBuildings1');
	this.map.addTilesetImage('urbanBuildings2','urbanBuildings2');
	this.layerBg2 = this.map.createLayer('bg2');
	this.layerBg1 = this.map.createLayer('bg1');
	this.layer = this.map.createLayer('Camada de Tiles 1');
	this.layer2 = this.map.createLayer('Camada de Tiles 2');
	this.layer3 = this.map.createLayer('Camada de Tiles 3');
	this.layer4 = this.map.createLayer('Camada de Tiles 4');
	this.map.setCollision([162,163,15,16,2086,2089,2090],true,'Camada de Tiles 4'); // IDs dos tiles que colidem (plataformas).
	this.map.setCollisionBetween(19,26, true,'Camada de Tiles 4'); // intervaldo de IDs dos tiles que colidem (plataformas).
	this.map.setCollisionBetween(2152,2156, true,'Camada de Tiles 4');
	this.map.setCollisionBetween(2083,2085, true,'Camada de Tiles 4');
	this.layerBg1.scrollFactorX = 0.3;
	this.layerBg2.scrollFactorX = 0.2;
	//this.layer4.debug = true;
	
	this.layer4.resizeWorld();
	//grupos
	this.cars = game.add.group();
	this.humans = game.add.group();
	this.objectCar= new Car();

	//instanciando e colocando humans no mapa
	for(var i = 0; i< 25; i++)
	{
		this.objectHuman[i] = new Human()
		this.objectHuman[i].add(200 * i,1300);
		this.humans.add(this.objectHuman[i].sprite);
	}
	//botoes do menu	
	this.pressStart = game.add.sprite(game.camera.width/2, game.camera.height - 60 ,'pressStart');
	this.pressStart.anchor.setTo(0.5, 0.5);
	this.pressStart.fixedToCamera = true;
	this.pressStart.alpha = 0;
	game.add.tween(this.pressStart).to( { alpha: 1 }, 100, Phaser.Easing.Linear.None, true, 100, 1000000, true);
	
	this.gameName = game.add.sprite(game.camera.width/2, 100 , 'splashGame');
	this.gameName.anchor.setTo(0.5, 0.5);
	this.gameName.smoothed = false;
	this.gameName.scale.setTo(1.2,1.2);
	this.gameName.fixedToCamera = true;
	this.gameName.y = 100;
	game.camera.y = game.world.height;
	this.cameraMove =game.add.tween(game.camera).to({ x: game.world.width - 960 }, 50000, Phaser.Easing.Linear.None, true).to({ x: 0 }, 50000, Phaser.Easing.Linear.None) .loop();

	game.input.onDown.addOnce(function()
	{
		this.insertCoinSound.play();
		this.gameName.destroy();
		this.pressStart.destroy();
		this.playButton = game.add.button(game.camera.width/2-180 , game.camera.height/2  - 168, 'playButton', this.goGame, this, 1,0);
		this.creditsButton = game.add.button(game.camera.width/2 - 265, game.camera.height/2 -10, 'creditsButton', this.goCredits, this, 1,0);
		this.playButton.fixedToCamera = true;
		this.creditsButton.fixedToCamera = true;
	},this);

		this.fpsTxt = game.add.text(0,0,'fps',style);
		this.fpsTxt.fixedToCamera = true;
	//adicionando o player no mundo
	this.player.add(32,1400);
	this.player.sprite.kill();
	this.player.hearts.visible =false;
	
}

Game.prototype.update = function()
{
	game.physics.arcade.collide(this.layer4, [this.humans, this.cars, this.player.sprite]);
	game.physics.arcade.collide(this.player.sprite, [this.humans,this.cars], this.player.smash,null, this.player );
	game.physics.arcade.overlap(this.player.sprite, this.cars, this.player.takeDamage,null, this.player );	
	if(this.inGame)
		this.scoreTxt.text = 'Score  '+ this.player.score;
	this.fpsTxt.text = game.time.fps + ' fps';

	this.player.enableMovement();
	this.player.enableJump();
	//spawnando os carros
	if(game.time.now > this.carSpawnTime)
	{
		var r = game.rnd.integerInRange(0,1);
		if (r==1)
		this.objectCar.addWithSpeed(game.camera.x ,1450,200);
		else
		this.objectCar.addWithSpeed(game.camera.x + game.camera.width ,1450,-200);
		this.cars.add(this.objectCar.sprite);
		this.objectCar.sprite.outOfBoundsKill = true;
		this.carSpawnTime = game.time.now + 2000 + game.rnd.integerInRange(0,1000);
	}
	//adicionando comportamento nos humans
	for (var i = 0; i < this.objectHuman.length; i++)
	{
		this.objectHuman[i].stayNormal();	
	}
}

Game.prototype.goGame = function()
{
	game.time.advancedTiming = true;
	var playsound = game.add.audio('playsound',soundLevel);
	playsound.play();
	this.fadeoutGoGame = game.add.tween(this.playButton).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 0, 15, true);
	this.fadeoutGoGameSound = game.add.tween(menuTrack).to( { volume: 0 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, true);
	this.fadeoutGoGame.onComplete.add(function()
	{ 
		this.player.hearts.visible = true;
		this.scoreTxt = game.add.text(game.camera.width-250,16,'Score 0',style2);
		this.scoreTxt.fixedToCamera = true;
		this.inGame =true;
		this.track.play();
		this.cameraMove.stop();
		this.playButton.destroy();
		this.creditsButton.destroy();
		menuTrack.stop();
		this.player.sprite.revive();
		this.player.sprite.x = game.camera.x + game.camera.width/2
		game.camera.follow(this.player.sprite);
	},this);

}

Game.prototype.goCredits = function()
{
	var playsound = game.add.audio('creditsSound',soundLevel);
	playsound.play();
	this.fadeoutCredits = game.add.tween(this.creditsButton).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 0, 15, true);;
	this.fadeoutCredits.onComplete.add(function()
	{ 
		game.state.start('credits')
	});
};