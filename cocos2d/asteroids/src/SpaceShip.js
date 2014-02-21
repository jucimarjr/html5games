 //Variáveis de JOGO
var screen = null;

//Variáveis de CONTROLE
var LG = {KEYS: []}; //Verifica se existe alguma tecla pressionada ou não

//Variáveis da NAVE
var shipSprite;
var angularVelocity = 3;
var velocityX = 3;
var velocityY = 3;

var angle = 0;
var angleAsteroid = 0;

var asteroides = [];

var SpaceShipLayer = cc.Layer.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),
    init:function()
    {
		//Habilita o teclado/touch como controle
		if ('keyboard' in sys.capabilities)
	    	this.setKeyboardEnabled(true);
		else if('touches' in sys.capabilities)
	        this.setTouchEnabled(true);
	    
		//Pega o tamanho da tela
	    screen = cc.Director.getInstance().getWinSize();
	    //Cria o Layer do jogo
		this.layerGame = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 480);    
	    
        //Coloca GameSpriteSheet na memória
        this.spriteFrameCache.addSpriteFrames("res/spritesheets/GameSpriteSheet.plist", "res/spritesheets/GameSpriteSheet.png");
        
        //Coloca a nave no centro da tela
        shipSprite = cc.Sprite.createWithSpriteFrameName("ship_14-24.png");
        shipSprite.setPosition(new cc.Point(screen.width/2, screen.height/2));
        this.layerGame.setPosition(new cc.Point(0.0,0.0));
        this.layerGame.addChild(shipSprite);
        
        //Coloca os asteroides na tela
        for(i=0; i<7; i++){
        	this.asteroides = new Asteroid();
        	this.asteroides.initBigAsteroid();
        	this.layerGame.addChild(this.asteroides);
        }      
        
        this.createAnimation();
        this.addChild(this.layerGame);
        this.scheduleUpdate();
        return true;
    },

    update:function(dt) {
    	//Rotaciona a nave
    	if (Math.abs(angle) >= 360)
    		angle = 0;
    	
    	//Se a tecla pressionada for "right", gira pra direita
    	if (LG.KEYS[cc.KEY.right]) {
    		angle += angularVelocity;
    		shipSprite.setRotation(angle);
    	}
    	//Se a tecla pressionada for "left", gira pra esquerda
    	if (LG.KEYS[cc.KEY.left]) {
    		angle -= angularVelocity;
    		shipSprite.setRotation(angle);
    	}
    	
    	//Move a nave para frente (de acordo com o sentido que ela se encontra)
    	if (LG.KEYS[cc.KEY.up]) {
			console.log("TecladoUp");
			
        	shipSprite.xSpeed = velocityX*Math.sin(Math.PI/180*angle);
        	shipSprite.ySpeed = velocityY*Math.cos(Math.PI/180*angle);
        	shipSprite.setPosition(new cc.Point(shipSprite.getPosition().x + shipSprite.xSpeed,shipSprite.getPosition().y + shipSprite.ySpeed));
			
			//Verifica saída da tela por um lado e entrada por outro
        	if(shipSprite.getPosition().x >= screen.width)
				shipSprite.setPosition(new cc.Point(shipSprite.getPosition().x - screen.width, shipSprite.getPosition().y));
			if(shipSprite.getPosition().x <= 0)
				shipSprite.setPosition(new cc.Point(shipSprite.getPosition().x + screen.width, shipSprite.getPosition().y));
			if(shipSprite.getPosition().y >= screen.height)
				shipSprite.setPosition(new cc.Point(shipSprite.getPosition().x, shipSprite.getPosition().y - screen.height));
			if(shipSprite.getPosition().y <= 0)
				shipSprite.setPosition(new cc.Point(shipSprite.getPosition().x, shipSprite.getPosition().y + screen.height));
    	}
    	
    	//Teletransporta a nave
    	if (!LG.KEYS[cc.KEY.up]) {
    		var animation = this.animeCache.getAnimation("shipFire");
			animation.setRestoreOriginalFrame(true);
			shipSprite.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));
			//- << Init::Animação da nave
    	}
    },

    
    onKeyDown: function(e) {
        LG.KEYS[e] = true;
		console.log("KeyDown");
    },

    onKeyUp: function(e) {
		console.log("KeyUp");
        LG.KEYS[e] = false;
    },
	
	createAnimation: function(){
		var animeFrames = [];
		animeFrames.push(this.spriteFrameCache.getSpriteFrame("ship_14-24.png"));
		animeFrames.push(this.spriteFrameCache.getSpriteFrame("shipFire1_14-24.png"));
		var animation = cc.Animation.create(animeFrames,0.1);
		this.animeCache.addAnimation(animation,"shipFire");
	}
});

var SpaceShipScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new SpaceShipLayer();
        layer.init();
        this.addChild(layer);
    }
});
