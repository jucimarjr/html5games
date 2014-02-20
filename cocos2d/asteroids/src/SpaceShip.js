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


var SpaceShipLayer = cc.Layer.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	
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
        shipSprite = cc.Sprite.createWithSpriteFrameName("ship_22-34.png");
        shipSprite.setPosition(new cc.Point(screen.width/2, screen.height/2));
        this.layerGame.setPosition(new cc.Point(0.0,0.0));
        this.layerGame.addChild(shipSprite);
        
        
//COLOCAR PARA O ARQUIVO ASTEROIDS.JS
        for(i=0; i<7; i++){
			var asteroidSprite = cc.Sprite.createWithSpriteFrameName("asteroid2_118-118.png");
			var randomDir = Math.random()*2*Math.PI;
			
			asteroidSprite.xSpeed = velocityX*Math.cos(randomDir);
			asteroidSprite.ySpeed = velocityY*Math.sin(randomDir);
			this.layerGame.addChild(asteroidSprite);
			
			asteroidSprite.setPosition(new cc.Point(Math.random()*500, Math.random()*500));
			
			asteroidSprite.schedule(function(){
				angleAsteroid += 0.05;
				this.setRotation(angleAsteroid);
                if(angleAsteroid > 360)
                	angleAsteroid = 0;
				
     			this.setPosition(new cc.Point(this.getPosition().x + this.xSpeed, this.getPosition().y + this.ySpeed));
     			if(this.getPosition().x > screen.width)
					this.setPosition(new cc.Point(this.getPosition().x - screen.width,this.getPosition().y));
				if(this.getPosition().x < 0)
					this.setPosition(new cc.Point(this.getPosition().x + screen.width,this.getPosition().y));
				if(this.getPosition().y > screen.height)
					this.setPosition(new cc.Point(this.getPosition().x ,this.getPosition().y - screen.height));
				if(this.getPosition().y < 0)
					this.setPosition(new cc.Point(this.getPosition().x ,this.getPosition().y + screen.height));
			});
		}
//ATÉ AQUI        
        
        
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
    	if (LG.KEYS[cc.KEY.down]) {
    		
    	}
    	
    	
    },

    
    onKeyDown: function (e) {
        LG.KEYS[e] = true;
    },

    onKeyUp: function (e) {
        LG.KEYS[e] = false;
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
