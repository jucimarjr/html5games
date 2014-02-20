//Variáveis de JOGO
var screen = null;

//Variáveis do ASTEROID
var asteroidSprite;
var angularVelocity = 0.05;
var velocityX = 3;
var velocityY = 3;

var angle = 0;


var AsteroidLayer = cc.Layer.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	
    init:function()
    {
		var i;

		//Pega o tamanho da tela
	    screen = cc.Director.getInstance().getWinSize();
	    //Cria o Layer do jogo
		this.layerGame = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 480);    
	    
        //Coloca GameSpriteSheet na memória
        this.spriteFrameCache.addSpriteFrames("res/spritesheets/GameSpriteSheet.plist", "res/spritesheets/GameSpriteSheet.png");

        //Movimenta os asteroids aleatoriamente
		for(i=0; i<7; i++){
			var asteroidSprite = cc.Sprite.createWithSpriteFrameName("asteroid2_118-118.png");
			var randomDir = Math.random()*2*Math.PI;
			
			asteroidSprite.xSpeed = velocityX*Math.cos(randomDir);
			asteroidSprite.ySpeed = velocityY*Math.sin(randomDir);
			this.layerGame.addChild(asteroidSprite);
			
			asteroidSprite.setPosition(new cc.Point(Math.random()*500, Math.random()*500));
			
			asteroidSprite.schedule(function(){
				//Rotaciona os asteroids
				angle += angularVelocity;
				this.setRotation(angle);
                if(angle > 360)
                    angle = 0;
				
     			this.setPosition(new cc.Point(this.getPosition().x + this.xSpeed, this.getPosition().y + this.ySpeed));
     			//Verifica saída da tela por um lado e entrada por outro
     			if(this.getPosition().x >= screen.width)
					this.setPosition(new cc.Point(this.getPosition().x - screen.width, this.getPosition().y));
				if(this.getPosition().x <= 0)
					this.setPosition(new cc.Point(this.getPosition().x + screen.width, this.getPosition().y));
				if(this.getPosition().y >= screen.height)
					this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y - screen.height));
				if(this.getPosition().y <= 0)
					this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y + screen.height));
			});
		}
		
     	this.addChild(this.layerGame);
		return true;
    }
});

var AsteroidScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new AsteroidLayer();
        layer.init();
        this.addChild(layer);
    }
});
