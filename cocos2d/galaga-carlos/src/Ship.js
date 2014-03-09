var shootDelay = true;

var Ship = cc.Sprite.extend({
	//spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),
	
	velocityX: 5,
	velocityY: 5,
	
	alive: true,
	
	ctor:function(){
		this._super();
		
		//Carrega o sprite da nave
		 var spriteFrameChaceShip = cc.SpriteFrameCache.getInstance();
         cc.SpriteFrameCache.getInstance().addSpriteFrames("res/spritesheets/ship.plist", "res/spritesheets/ship.png");
         var _SpriteShip = cc.SpriteFrameCache.getInstance().getSpriteFrame("ShipWhite2_20-30.png");
         this.initWithSpriteFrame(_SpriteShip);
        
		//Posiciona a nave no centro da tela
		this.setPosition(new cc.Point(screen.width/2, screen.height/2));
        
		//this.scheduleUpdate();
        //this.createAnimation();
        layer.addChild(this);

    },
	
	
})
