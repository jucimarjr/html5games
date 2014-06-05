
var Game = function(){};
Game.prototype.create = function()
{
	this.gameName;
	this.cameraSpeed = 5;
	this.player = new Dino();
	this.gravity = 800;
	this.objectHuman = new Array();
	this.objectEnemy = new Array(); 
	this.dificutyLevel = 1;
	this.waveDelay=45000;
	this.waveStarted = false;
	//audios
	track = game.add.audio('track',soundLevel,true);
	this.insertCoinSound = game.add.audio('insertCoin',soundLevel);
	//fisicas
	game.physics.startSystem(Phaser.Game.ARCADE);
	game.physics.arcade.gravity.y = this.gravity;
	//cenario
	this.bg = game.add.image(0,0,'backGround');
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
	this.layerBg2.scrollFactorX = 0.1;
	//this.layer4.debug = true;
	
	this.layer4.resizeWorld();
	
	//grupos
	this.cars = game.add.group();
	this.enemys = game.add.group();
	this.humans = game.add.group();
	this.humans.enableBody = true;
	this.objectCar= new Car();
	
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

	game.time.advancedTiming = true;
	this.fpsTxt = game.add.text(0,game.camera.height-30,'fps',style);
	this.fpsTxt.fixedToCamera = true;
	this.debugTxt = game.add.text(100,game.camera.height-30,'',style);
	this.debugTxt.fixedToCamera = true;
	//adicionando o player no mundo
	this.player.add(32,0);
	this.player.sprite.kill();
	this.player.hearts.visible =false;
	this.player.foods.visible =false;
	
	this.waveZeroCreate();
};

Game.prototype.update = function()
{
	game.scale.setShowAll();
	game.scale.refresh();	
	if(game.time.fps < 1)
		game.physics.arcade.gravity.y = 0;
	else game.physics.arcade.gravity.y = this.gravity;
	game.physics.arcade.collide(this.layer4, [this.humans, this.cars, this.player.sprite,this.enemys,bloodEmitter]);
	game.physics.arcade.collide(this.player.sprite, [this.humans,this.cars, this.enemys], this.player.smash,null, this.player );
	game.physics.arcade.overlap(this.player.sprite, this.cars, this.player.hitByCar,null, this.player );
	game.physics.arcade.overlap(this.player.sprite, [this.humans, this.enemys], this.player.bit,null, this.player );
	
	if(this.inGame)
	{
		if(this.player.hearts.countLiving()==0)
		{
			this.player.onAtackMode = false;
			this.player.sprite.body.velocity.x=0;
			this.player.sprite.animations.play('die');
			this.inGame = false;
		}
		else
		{
			this.scoreTxt.text = 'Score  '+ this.player.score;
			this.player.update();
		}
	}
	for(var i =0,l=this.objectEnemy.length; i<l;i++)
	{
		this.objectEnemy[i].update(this.player.sprite,this);
	}
	this.fpsTxt.text = game.time.fps + ' fps';
	//this.debugTxt.text =  this.player.killsToCallTank;this.player.enemysKiled; this.enemys.countLiving(); 

	if(this.player.killsToCallTank == this.player.killsNeeded)
	{
		this.callTank();
		this.player.killsToCallTank =0;
		this.player.killsNeeded =30;
	}
	if(this.player.enemysKiled>20)
		this.dificutyLevel = 2;
	if(this.player.enemysKiled>60)
		this.dificutyLevel = 3;
	if(this.enemys.countLiving() == 0 && this.waveStarted)
		this.CallEnemys();
	if(game.time.now>this.waveBeginDelay && this.inGame)
	{
		this.waveStarted= true;
		this.CallEnemys();
		this.waveBeginDelay = game.time.now + this.waveDelay;
	}
	
	for (var i = 0; i < this.objectHuman.length; i++)
	{
		this.objectHuman[i].update();	
	}
	
	if(!this.waveStarted)
		 this.waveZeroUpdate();
};

Game.prototype.goGame = function()
{
	var playsound = game.add.audio('playsound',soundLevel);
	playsound.play();
	this.fadeoutGoGame = game.add.tween(this.playButton).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 0, 15, true);
	this.fadeoutGoGameSound = game.add.tween(menuTrack).to( { volume: 0 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, true);
	this.fadeoutGoGame.onComplete.add(function()
	{ 
		this.waveBeginDelay = game.time.now + 100000; 
		this.carSpawnTime = game.time.now + 10000;
		this.player.hungryTime = game.time.now + this.player.hungryTimeDelay;
		this.player.hearts.visible = true;
		this.player.foods.visible = true;
		this.scoreTxt = game.add.text(game.camera.width-250,16,'Score 0',style2);
		this.scoreTxt.fixedToCamera = true;
		this.inGame =true;
		track.stop();
		track.play();
		this.cameraMove.stop();
		this.playButton.destroy();
		this.creditsButton.destroy();
		menuTrack.stop();
		this.player.sprite.revive();
		this.player.sprite.x = game.camera.x + game.camera.width/2;
		this.player.sprite.y = 1300;
		particlesExplodeBlue(this.player.sprite.x,this.player.sprite.y);
		game.camera.follow(this.player.sprite);
	},this);

};

Game.prototype.goCredits = function()
{
	var playsound = game.add.audio('creditsSound',soundLevel);
	playsound.play();
	this.fadeoutCredits = game.add.tween(this.creditsButton).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 0, 15, true);;
	this.fadeoutCredits.onComplete.add(function()
	{ 
		game.state.start('credits');
	});
};

Game.prototype.waveZeroCreate = function()
{
	
			
	this.carSpawnTime = 0;
	//instanciando e colocando humans no mapa
		//colocando os objetos criados no tiled
	this.map.createFromObjects('Camada de Objetos 1',2561,'humanTexture',0,true,false,this.humans);
	this.map.createFromObjects('Camada de Objetos 1',2562,'humanTexture',1,true,false,this.humans);
	this.map.createFromObjects('Camada de Objetos 1',2563,'humanTexture',2,true,false,this.humans);
	this.map.createFromObjects('Camada de Objetos 1',2564,'humanTexture',3,true,false,this.humans);
	this.map.createFromObjects('Camada de Objetos 1',2565,'humanTexture',4,true,false,this.humans);
	this.map.createFromObjects('Camada de Objetos 1',2566,'humanTexture',5,true,false,this.humans);
	this.map.createFromObjects('Camada de Objetos 1',2567,'humanTexture',6,true,false,this.humans);
	for (var i = 0,l = this.humans.total; i<l;i++ )
	{
		this.objectHuman[i] = new Human(this.humans.getAt(i),'stayJumping');
	}
	for(var i = 0, a = this.humans.total; i< 20;i++) //cria mais humans aleatorios pelo mapa
	{
		this.humans.create(300*i, 1400,'humanTexture',game.rnd.integerInRange(0,4));
		this.objectHuman[a+i] = new Human(this.humans.getAt(a+i),'stayNormal');
	}
	
};
Game.prototype.waveZeroUpdate = function()
{
	
	//spawnando os carros
	if(game.time.now > this.carSpawnTime )
	{
		var r = game.rnd.integerInRange(0,1);
		if (r==1)
		this.objectCar.addWithSpeed(game.camera.x ,1442,'carTexture',400);
		else
		this.objectCar.addWithSpeed(game.camera.x + game.camera.width ,1438,'carTexture',-400);
		this.cars.add(this.objectCar.sprite);
		this.carSpawnTime = game.time.now + 4000 + game.rnd.integerInRange(0,2000);
	}
	//adicionando comportamento nos humans
	
};

Game.prototype.callTank = function()
{
	if(this.player.sprite.x > game.world.width/2)
		this.objectEnemy[this.objectEnemy.length] = new Enemy(this.player,this.layer4,this.enemys.create(0,1400,'tank'),'follow','tank');
	else
		this.objectEnemy[this.objectEnemy.length] = new Enemy(this.player,this.layer4,this.enemys.create(game.world.width,1400,'tank'),'follow','tank');
};

Game.prototype.CallEnemys = function()
{
	switch (this.dificutyLevel)
	{
	case 1:
		if(this.player.sprite.x > game.world.width/2)
			this.objectEnemy[this.objectEnemy.length] = new Enemy(this.player,this.layer4,this.enemys.create(0,1400,'policeCar'),'followAndSpawn','police');
		else
			this.objectEnemy[this.objectEnemy.length] = new Enemy(this.player,this.layer4,this.enemys.create(game.world.width,1400,'policeCar'),'followAndSpawn','police');
	break;
	case 2:
		if(this.player.sprite.x > game.world.width/2)
			this.objectEnemy[this.objectEnemy.length] = new Enemy(this.player,this.layer4,this.enemys.create(0,1400,'specialOpsCar'),'followAndSpawn','truck');
		else
			this.objectEnemy[this.objectEnemy.length] = new Enemy(this.player,this.layer4,this.enemys.create(game.world.width,1400,'specialOpsCar'),'followAndSpawn','truck');
	break;
	case 3:
		if(this.player.sprite.x > game.world.width/2)
			this.objectEnemy[this.objectEnemy.length] = new Enemy(this.player,this.layer4,this.enemys.create(0,1400,'truck'),'followAndSpawn','truck');
		else
			this.objectEnemy[this.objectEnemy.length] = new Enemy(this.player,this.layer4,this.enemys.create(game.world.width,1400,'truck'),'followAndSpawn','truck');
	break;
	}
};

Game.prototype.render = function()
{
	//game.debug.body(this.player.sprite);
	//game.debug.body(this.objectEnemy[0].sprite);
};
function explode(x,y)
{
	var explosion = game.add.sprite(x,y,'explosion');
	var sfx = game.add.audio('explosion',soundLevel,false);
	sfx.play();
	explosion.anchor.setTo(0.5,0.5);
	explosion.animations.add('explode',[0,1,2,3,4,3,4],15,false);
	explosion.animations.getAnimation('explode').killOnComplete = true;
	explosion.animations.play('explode');
	particlesExplode(x,y);
}
function splashBlood1(x,y)
{
bloodEmitter= game.add.emitter(x,y,6);
bloodEmitter.makeParticles('particles',[0,1,2,3,4,5],4,true,false);
bloodEmitter.minParticleSpeed.setTo(-200,-100);
bloodEmitter.maxParticleSpeed.setTo(200, -300);
bloodEmitter.minRotation = 0;
bloodEmitter.maxRotation = 0;
bloodEmitter.gravity = 800;
bloodEmitter.start(true,2000,null,20);
}
function splashBlood2(x,y)
{
bloodEmitter= game.add.emitter(x,y,3);
bloodEmitter.makeParticles('particles',2,2,true,false);
bloodEmitter.minParticleSpeed.setTo(-50,-100);
bloodEmitter.maxParticleSpeed.setTo(50, -300);
bloodEmitter.minRotation = 0;
bloodEmitter.maxRotation = 0;
bloodEmitter.gravity = 800;
bloodEmitter.start(true,2000,null,20);
}
function particlesExplode(x,y)
{
bloodEmitter= game.add.emitter(x,y,1000);
bloodEmitter.makeParticles('particles',[0,3,4,5],30,true,false);
bloodEmitter.minParticleSpeed.setTo(-450,-300);
bloodEmitter.maxParticleSpeed.setTo(450, -900);
bloodEmitter.minRotation = 0;
bloodEmitter.maxRotation = 0;
bloodEmitter.gravity = 800;
bloodEmitter.start(true,2000,null,20);
}
function particlesExplodeBlue(x,y)
{
bloodEmitter= game.add.emitter(x,y,1000);
bloodEmitter.makeParticles('particles2',[0,3,4,5],180,true,false);
bloodEmitter.minParticleSpeed.setTo(-450,-300);
bloodEmitter.maxParticleSpeed.setTo(450, -900);
bloodEmitter.minRotation = 0;
bloodEmitter.maxRotation = 0;
bloodEmitter.gravity = 800;
bloodEmitter.start(true,2000,null,120);
}
function particlesExplodeSmall(x,y)
{
bloodEmitter= game.add.emitter(x,y,150);
bloodEmitter.makeParticles('particles',[0,3,4,5],15,true,false);
bloodEmitter.minParticleSpeed.setTo(-150,-100);
bloodEmitter.maxParticleSpeed.setTo(150, -500);
bloodEmitter.minRotation = 0;
bloodEmitter.maxRotation = 0;
bloodEmitter.gravity = 800;
bloodEmitter.start(true,2000,null,20);
}