var Asteroid = cc.Sprite.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	velocityX: 1,
	velocityY: 1,
	msg:null,

	initBigAsteroid:function()
	{
		this.initWithSpriteFrameName("asteroids1_80-80.png");
		var randomDir = Math.random()*2*Math.PI;
		
		this.xSpeed = this.velocityX*Math.cos(randomDir);
		this.ySpeed = this.velocityY*Math.sin(randomDir);
		
		this.setPosition(new cc.Point(Math.random()*500, Math.random()*500));
	
	
		this.schedule(function(){
			angleAsteroid += 0.05;
			this.setRotation(angleAsteroid);
            if(angleAsteroid > 360)
            	angleAsteroid = 0;
			
 			this.setPosition(new cc.Point(this.getPosition().x + this.xSpeed, this.getPosition().y + this.ySpeed));
 			if(this.getPosition().x > screen.width)
				this.setPosition(new cc.Point(this.getPosition().x - screen.width,this.getPosition().y));
			if(this.getPosition().x < 0)
				this.setPosition(new cc.Point(this.getPosition().x + screen.width,this.getPosition().y));
			if(this.getPosition().y > screen.height)
				this.setPosition(new cc.Point(this.getPosition().x ,this.getPosition().y - screen.height));
			if(this.getPosition().y < 0)
				this.setPosition(new cc.Point(this.getPosition().x ,this.getPosition().y + screen.height));
		});
	}
});
