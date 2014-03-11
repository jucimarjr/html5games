var shootDelay = true;

var Particle = cc.Sprite.extend({
	//spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	//animeCache: cc.AnimationCache.getInstance(),
	//speed:220,
	//velocityX: 5,
	//velocityY: 5,
	
	//alive: true,
	velocityX: 0,
	velocityY: 0,
	
	angle: 0,
	alive: true,
	
	ctor:function(tipo){
		this._super();
		
		var rand = parseInt(tipo);
		//console.log("rand: "+parseInt(rand))
		cc.SpriteFrameCache.getInstance().addSpriteFrames("res/spritesheets/star.plist", "res/spritesheets/star.png");
		randPosition = Math.random()*480;
		console.log("randPosition: "+randPosition);
		switch (rand) {
		case 0:
			var _SpriteStar = cc.SpriteFrameCache.getInstance().getSpriteFrame("Star1_10-10.png");
			this.initWithSpriteFrame(_SpriteStar);
			this.setPosition(new cc.Point(randPosition, 500));
			//console.log("rand: "+rand);
			break;
		
		case 1:
			var _SpriteStar = cc.SpriteFrameCache.getInstance().getSpriteFrame("Star2_10-10.png");
			this.initWithSpriteFrame(_SpriteStar);
			this.setPosition(new cc.Point(screen /2 , screen / 2));
			break;
		
		case 2:
			var _SpriteStar = cc.SpriteFrameCache.getInstance().getSpriteFrame("Star3_10-10.png");
			this.initWithSpriteFrame(_SpriteStar);
			this.setPosition(new cc.Point(screen /2 , screen / 2));
			break;
		}
  
		this.velocityX = 20;
		this.velocityY = 0.1;
		
		this.scheduleUpdate();
        //this.createAnimation();
        layer.addChild(this);
       

    },
	
    update:function(dt){
    	 // Keys are only enabled on the browser
    	//this.move();
        
    },
    
    move:function(){
    	this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y - this.ySpeed));
    	if(this.getPosition().y<0){
    		layer.removeChild(this);
    	}
    }
    
	
})
