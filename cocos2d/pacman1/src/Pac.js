var Pac = cc.Sprite.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),
	xVelocity:300,
    yVelocity:300,
	
	ctor:function(size, position){
		this._super();
					
		this.initWithSpriteFrameName("pacOpen_98-135.png");
		this.setPosition(new cc.Point(0, background.height - 70));
		
		this.createAnimation("pac", 2, "pac");
		
		var animation = this.animeCache.getAnimation("pac");
		animation.setRestoreOriginalFrame(true);
		this.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));
		
		this.scheduleUpdate();
			
		//layer.addChild(this);
	},
	
	update:function(dt){
		if(this.getPosition().x < background.width/2){
			var position = this.getPosition();
			position.x += this.xVelocity * dt;
	        this.setPosition(position);		        
		}		
	},
	
	createAnimation: function (spritePrefix, maxIndex, animationName) {        
        var animFrames = [];
        var frame;
        var str = "";
        var status = ["Close", "Open", "Close"];
        
        for (var i = 0; i <= maxIndex; i++) {
            str = spritePrefix + status[i] + "_98-135.png";
            cc.log(str);
            frame = this.spriteFrameCache.getSpriteFrame(str);            
            cc.log(frame);	
            animFrames.push(frame);
        }

        var animation = cc.Animation.create(animFrames, 0.1);
        this.animeCache.addAnimation(animation, animationName);        
    }
});