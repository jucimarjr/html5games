var Ghost = cc.Sprite.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),
	xVelocity:300,
    yVelocity:300,
    up:false,
	down:false,
	_currentRotation:0,
	//_currentPositionX: 0,
	//_currentPositionY: 0,
	velocityX: 0,
	velocityY: 0,
	
	init: function()
	{
		this._super();
		//this.scheduleUpdate();
		this.xSpeed = this.velocityX*Math.cos(randomDir);
		this.ySpeed = this.velocityY*Math.sin(randomDir);
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
	
    
	update:function(type, position){		
		
		switch (position) {
			case "left":
				this.setAnimation(type, position, "16-16", 2, position);        
		        this.getAnimation(position);				
				this.setPosition(new cc.Point(this.getPosition().x - this.xVelocity * 0.01, this.getPosition().y));
				break;
			
			case "pinky":
				this.initWithSpriteFrameName(type + "_right_four_16-16.png");
				this.velocityX = 0.5;
				this.velocityY = 0.5;
	
				//Coloca o asteroid na posição em que se encontrava o asteroid grande
				//this.setPosition(new cc.Point(position.x + 20, position.y + 20));
				break;
				
			case "inkey":
				this.initWithSpriteFrameName(type + "_right_four_16-16.png");
				this.velocityX = 0.5;
				this.velocityY = 0.5;
	
				//Coloca o asteroid na posição em que se encontrava o asteroid grande
				//this.setPosition(new cc.Point(position.x + 20, position.y + 20));
				break;
			
			case "clyde":
				this.initWithSpriteFrameName(type + "_right_four_16-16.png");
				this.velocityX = 0.5;
				this.velocityY = 0.5;
	
				//Coloca o asteroid na posição em que se encontrava o asteroid grande
				//this.setPosition(new cc.Point(position.x + 20, position.y + 20));
				break;
		}

	
    		
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
         var status = ["four", "three"];    
         
         for (var i = 0; i < maxIndex; i++) {
        	
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
    },
    
    setGhost:function(type) {
		var i = Math.floor((Math.random()*3)+1);
		
		switch (type) {
			case "blinky":
				this.initWithSpriteFrameName("blinky_right_four_16-16.png");
				this.velocityX = 0.5;
				this.velocityY = 0.5;
				
				//Coloca o asteroid numa posição aleatória
				//this.setPosition(new cc.Point(Math.random()*background.widht, Math.random()*background.height));
				break;
			
			case "pinky":
				this.initWithSpriteFrameName(type + "_right_four_16-16.png");
				this.velocityX = 0.5;
				this.velocityY = 0.5;

				//Coloca o asteroid na posição em que se encontrava o asteroid grande
				//this.setPosition(new cc.Point(position.x + 20, position.y + 20));
				break;
				
			case "inkey":
				this.initWithSpriteFrameName(type + "_right_four_16-16.png");
				this.velocityX = 0.5;
				this.velocityY = 0.5;

				//Coloca o asteroid na posição em que se encontrava o asteroid grande
				//this.setPosition(new cc.Point(position.x + 20, position.y + 20));
				break;
			
			case "clyde":
				this.initWithSpriteFrameName(type + "_right_four_16-16.png");
				this.velocityX = 0.5;
				this.velocityY = 0.5;

				//Coloca o asteroid na posição em que se encontrava o asteroid grande
				//this.setPosition(new cc.Point(position.x + 20, position.y + 20));
				break;
		}
	},
});