var shipSprite;
var angularVelocity = 3;
var velocityX = 3;
var velocityY = 3;

var Ship = cc.Sprite.extend{(
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),
    
	this.spriteFrameCache.addSpriteFrames("res/spritesheets/GameSpriteSheet.plist", "res/spritesheets/GameSpriteSheet.png");
        
    //Coloca a nave no centro da tela
    shipSprite = cc.Sprite.createWithSpriteFrameName("ship_14-24.png");
    shipSprite.setPosition(new cc.Point(screen.width/2, screen.height/2));
	//Variável global do Game.js para adicinaonar objetos no layer
    this.g_sharedGameLayer.setPosition(new cc.Point(0.0,0.0));
    this.g_sharedGameLayer.addChild(shipSprite);
        

)}