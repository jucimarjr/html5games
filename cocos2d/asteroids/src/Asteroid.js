var Asteroid = cc.Sprite.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	
	velocityX: 1,
	velocityY: 1,
	angle: 0,

	
	ctor:function(){
		this._super();
	
		//Carrega o sprite do asteroid
		this.initWithSpriteFrameName("asteroids1_80-80.png");
		
		var randomDir = Math.random()*2*Math.PI;
		this.xSpeed = this.velocityX*Math.cos(randomDir);
		this.ySpeed = this.velocityY*Math.sin(randomDir);
		
		//Posiciona aleatoriamente o asteroid
		this.setPosition(new cc.Point(Math.random()*500, Math.random()*500));
	
	
		this.schedule(function(){
			this.angle += 0.5;
			this.setRotation(this.angle);
            if(this.angle > 360)
            	this.angle = 0;
			
 			this.setPosition(new cc.Point(this.getPosition().x + this.xSpeed, this.getPosition().y + this.ySpeed));
 			if(this.getPosition().x > screen.width)
				this.setPosition(new cc.Point(this.getPosition().x - screen.width, this.getPosition().y));
			if(this.getPosition().x < 0)
				this.setPosition(new cc.Point(this.getPosition().x + screen.width, this.getPosition().y));
			if(this.getPosition().y > screen.height)
				this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y - screen.height));
			if(this.getPosition().y < 0)
				this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y + screen.height));
		});
	}
});
