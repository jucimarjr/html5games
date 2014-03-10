var Pac = cc.Sprite.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),
	xVelocity:300,
    yVelocity:300,
    up:false,
	down:false,
	_currentRotation:0,
	//_currentPositionX: 0,
	//_currentPositionY: 0,
	
	ctor:function( ){
		this._super();		
		
		//this.initWithSpriteFrameName("pac_open_left_16-16.png");
		//this.setPosition(new cc.Point(background.width / 2 - 150, background.height / 2 - 70));
		this.initWithSpriteFrameName("pac_left_open_16-16.png");
		//this.setPosition(new cc.Point(background.width/2, background.height/2 - 100));
		//this._currentPositionX = background.width/2;
		//this._currentPositionY = background.height/2;
		
		/*this.setAnimation("pac", "top", "16-16", 2, "up");
		this.setAnimation("pac", "top", "16-16", 2, "down");
		this.setAnimation("pac", "top", "16-16", 2, "right");*/
		
		//this.scheduleUpdate();
	},
	
	handleKey: function(e)
    {
        if(e === cc.KEY.left)
        {
            this._currentRotation--;

        }
        else if(e === cc.KEY.right)
            this._currentRotation++;
        else if (e === cc.KEY.up){
        	this._currentPositionY++;
        	//this.getAnimation("up");
        }
        	

        if(this._currentRotation < 0) this._currentRotation = 360;
        if(this._currentRotation > 360) this._currentRotation = 0;
    },
	
    
	update:function(dt){
		this.setRotation(this._currentRotation);
		//this.setPosition(this._currentPositionY);
		/*if(this.getPosition().x < background.width/2){
					        
		}*/
	    /*
        if(this.up){
			this.setPositionY(this.getPositionY()+4);
		}
		if(this.down){
			this.setPositionY(this.getPositionY()-4);
		}
		*/
		
    	/*if (LG.KEYS[cc.KEY.up])
    		this.getAnimation("up");
    	else if (!LG.KEYS[cc.KEY.down])
    		this.getAnimation("down");
    	else if (LG.KEYS[cc.KEY.right])    	
    		this.getAnimation("right");
    	
    	else
    	{*/
    		/*var position = this.getPosition();
			position.x += this.xVelocity * dt;
	        this.setPosition(position);	*/
    	//}
    		
	},
    
    getAnimation: function (animationVar)
    {
    	var animation = this.animeCache.getAnimation(animationVar);
		animation.setRestoreOriginalFrame(true);
		this.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));
    },
    
    setAnimation: function(spritePrefix, position, size, maxIndex, animationName)
    {
    	 var animFrames = [];
         var frame;
         var str = "";         
         var status = ["open", "middle", "close"];    
         
         for (var i = 0; i <= maxIndex; i++) {
        	 if (status[i] == "close")
        		 str = spritePrefix + "_" + status[i] + "_" + size + ".png";
        	 else
        		 str = spritePrefix + "_" + position + "_" + status[i] + "_" + size + ".png";
             cc.log(str);
             frame = this.spriteFrameCache.getSpriteFrame(str);            
             cc.log(frame);	
             animFrames.push(frame);
         }         

         var animation = cc.Animation.create(animFrames, 0.1);
         this.animeCache.addAnimation(animation, animationName);        
         
    },    
    
    setDynamicPosition: function(dt)
    {
    	var position = this.getPosition();
    	position.x++;
		//position.x += this.xVelocity * dt;
        this.setPosition(position);
    }
});