var Pac = cc.Sprite.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),
	
	ctor:function(size, position){
		this._super();
					
		this.initWithSpriteFrameName("pacOpen_98-135.png");
		this.setPosition(new cc.Point(0, background.height - 70));
		
		this.createAnimation("pac", 2, "pac");
		
		this.scheduleUpdate();
			
		//layer.addChild(this);
	},
	
	update:function(){
		var animation = this.animeCache.getAnimation("pac");
		animation.setRestoreOriginalFrame(true);
		this.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));
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
        
		/*
		var animeFrames = [];
		animeFrames.push(this.spriteFrameCache.getSpriteFrame("pacOpen_98-135.png"));
		animeFrames.push(this.spriteFrameCache.getSpriteFrame("pacClose_98-135.png"));
		animeFrames.push(this.spriteFrameCache.getSpriteFrame("pacOpen_98-135.png"));
		
		var animation = cc.Animation.create(animeFrames, 0.1);
		this.animCache.addAnimation(animation, "shipFire");
		*/
    }
});