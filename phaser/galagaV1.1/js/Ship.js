var shootDelay = true;

var Ship = cc.Sprite.extend({
	//spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),
	speed:220,
	velocityX: 5,
	velocityY: 5,
	
	alive: true,
	
	ctor:function(){
		this._super();
		
		//Carrega o sprite da nave
		 //var spriteFrameChaceShip = cc.SpriteFrameCache.getInstance();
         cc.SpriteFrameCache.getInstance().addSpriteFrames("res/spritesheets/ship.plist", "res/spritesheets/ship.png");
         var _SpriteShip = cc.SpriteFrameCache.getInstance().getSpriteFrame("ShipWhite2_20-30.png");
         this.initWithSpriteFrame(_SpriteShip);
        
		//Posiciona a nave no centro da tela
		this.setPosition(new cc.Point(screen.width/2, 50));
        
		this.scheduleUpdate();
        //this.createAnimation();
        layer.addChild(this);
       

    },
	
    update:function(dt){
    	 // Keys are only enabled on the browser
        if (sys.platform == 'browser') {
            var pos = this.getPosition();
            if ((LG.KEYS[cc.KEY.a] || LG.KEYS[cc.KEY.left]) && pos.x >= 0) {
                pos.x -= dt * this.speed;
            }
            if ((LG.KEYS[cc.KEY.d] || LG.KEYS[cc.KEY.right]) && pos.x <= 480) {
                pos.x += dt * this.speed;
            }
            this.setPosition(pos);
        }
    },
	
})
