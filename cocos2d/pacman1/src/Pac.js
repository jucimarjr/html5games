var Pac = cc.Sprite.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),
	xVelocity:2,
    yVelocity:0,
    up:false,
	down:false,
	left:false,
	right:false,
	_currentRotation:0,
	_currentPosition:0,
	//_currentPositionX: 0,
	//_currentPositionY: 0,
	
	ctor:function( ){
		this._super();		
		this.initWithSpriteFrameName("pac_left_open_32-32.png");
		//this.setAnimation("pac", "right", SPRITE_SIZE, 2, "right");        
        //this.getAnimation("right");    
        //this.setDynamicPosition();		
		
		this.scheduleUpdate();
	},		
    
	update:function(dt){
		//this.setPosition(this._currentPosition);
		
		cc.log("no update");
		
		this.setPosition(this.getPosition().x + this.xVelocity, this.getPosition().y + this.yVelocity);
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
		/*
		if (LG.KEYS[cc.KEY.right]){
			/*
    		this.xSpeed = this.velocityX*Math.sin(Math.PI/180*this.angle);
        	this.ySpeed = this.velocityY*Math.cos(Math.PI/180*this.angle);
        	this.setPosition(new cc.Point(this.getPosition().x + this.xSpeed,this.getPosition().y + this.ySpeed));
        	
			cc.log('right;');
			this.setAnimation("pac", "right", SPRITE_SIZE, 2, "right");        
            this.getAnimation("right"); 
    	}
    	if (LG.KEYS[cc.KEY.left]){
    		this.setAnimation("pac", "left", SPRITE_SIZE, 2, "left");        
            this.getAnimation("left"); 
    	}
    	if (LG.KEYS[cc.KEY.up]){
    		this.setAnimation("pac", "up", SPRITE_SIZE, 2, "up");        
            this.getAnimation("up"); 
    	}
    	if (LG.KEYS[cc.KEY.down]){
    		this.setAnimation("pac", "down", SPRITE_SIZE, 2, "down");        
            this.getAnimation("down"); 
    	}
    	*/
	},
    
	setDirection: function(direction){
		if(direction == 'right'){			
			this.xVelocity = 2;
			this.yVelocity = 0;	
		}
		if(direction == 'left'){
			this.xVelocity = -2;
			this.yVelocity = 0;
		}
		if(direction == 'up'){
			this.xVelocity = 0;
			this.yVelocity = 2;
		}
		if(direction == 'down'){
			this.xVelocity = 0;
			this.yVelocity = -2;
		}
	},
	
    getAnimation: function (animationVar)
    {
    	var animation = this.animeCache.getAnimation(animationVar);
		animation.setRestoreOriginalFrame(true);
		this.stopAllActions();
				
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
             //cc.log(str);
             frame = this.spriteFrameCache.getSpriteFrame(str);            
             //cc.log(frame);	
             animFrames.push(frame);
         }         

         var animation = cc.Animation.create(animFrames, 0.1);
         this.animeCache.addAnimation(animation, animationName);                  
         
    },    
    
    setDynamicPosition: function(dt)
    {
    	var position = this.getPosition();
    	position.x++;
        this.setPosition(position);
    	
    	/*var move = cc.MoveBy.create(2, cc.p(screen.width - 100, 0));
    	
        var action = cc.Sequence.create(
        		cc.MoveBy.create(2, cc.p(screen.width - 100, 0)),
	            cc.CallFunc.create(this.removeFromParent, this, true)
	            //move.reverse(),
	            //cc.DelayTime.create(0.10)
	   );
       
		this.runAction(action);*/
    },
    
    setPositionOnScreen: function(e)
    {    	    	    	
    	if (LG.KEYS[cc.KEY.right]){
			this.setAnimation("pac", "right", SPRITE_SIZE, 2, "right");        
            this.getAnimation("right");
            this.setDirection('right');
            
    	}
    	if (LG.KEYS[cc.KEY.left]){
    		this.setAnimation("pac", "left", SPRITE_SIZE, 2, "left");        
            this.getAnimation("left"); 
            this.setDirection('left');
    	}
    	if (LG.KEYS[cc.KEY.up]){
    		this.setAnimation("pac", "up", SPRITE_SIZE, 2, "up");        
            this.getAnimation("up"); 
            this.setDirection('up');
    	}
    	if (LG.KEYS[cc.KEY.down]){
    		this.setAnimation("pac", "down", SPRITE_SIZE, 2, "down");        
            this.getAnimation("down"); 
            this.setDirection('down');
    	}    	
    },
    
    setDieAnimation:function()
    {
    	var animFrames = [];
        var frame;
        var str = "";                 
        
        for (var i = 0; i <= 9; i++) {
        	if (i == 0)
        		str = "pac_up_open_32-32.png"; 
        	else
        		str = "pac_up_open_" + i + "_32-32.png";
            frame = this.spriteFrameCache.getSpriteFrame(str);                        
            animFrames.push(frame);
        }         

        var animation = cc.Animation.create(animFrames, 0.1);
        this.animeCache.addAnimation(animation, "die");  
    }
});