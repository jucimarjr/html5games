var Asteroid = cc.Sprite.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	asteroidSprite: null,
	velocityX: 3,
	velocityY: 3,
	msg:null,

    	initBigAsteroid:function()
    	{
		for(i=0; i<7; i++){
			//var asteroidSprite = cc.Sprite.createWithSpriteFrameName("asteroid2_118-118.png");
			var randomDir = Math.random()*2*Math.PI;
			
			asteroidSprite.xSpeed = velocityX*Math.cos(randomDir);
			asteroidSprite.ySpeed = velocityY*Math.sin(randomDir);
			this.layerGame.addChild(asteroidSprite);
			
			asteroidSprite.setPosition(new cc.Point(Math.random()*500, Math.random()*500));
			
<<<<<<< HEAD
			asteroidSprite.schedule(function(){
				//Rotaciona os asteroids
				angle += angularVelocity;
				this.setRotation(angle);
                if(angle > 360)
                    angle = 0;
				
     			this.setPosition(new cc.Point(this.getPosition().x + this.xSpeed, this.getPosition().y + this.ySpeed));
     			//Verifica saída da tela por um lado e entrada por outro
     			if(this.getPosition().x >= screen.width)
					this.setPosition(new cc.Point(this.getPosition().x - screen.width, this.getPosition().y));
				if(this.getPosition().x <= 0)
					this.setPosition(new cc.Point(this.getPosition().x + screen.width, this.getPosition().y));
				if(this.getPosition().y >= screen.height)
					this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y - screen.height));
				if(this.getPosition().y <= 0)
					this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y + screen.height));
=======
			asteroidSprite.schedule(function(){		
	  			this.setPosition(new cc.Point(this.getPosition().x + this.xSpeed, this.getPosition().y + this.ySpeed));
	     			if(this.getPosition().x > screen.width){
					this.setPosition(new cc.Point(this.getPosition().x - screen.width,this.getPosition().y));
				}
				if(this.getPosition().x < 0){
					this.setPosition(new cc.Point(this.getPosition().x + screen.width,this.getPosition().y));
				}
				if(this.getPosition().y > screen.width){
					this.setPosition(new cc.Point(this.getPosition().x ,this.getPosition().y - screen.width));
				}
				if(this.getPosition().y < 0){
					this.setPosition(new cc.Point(this.getPosition().x ,this.getPosition().y + screen.width));
				}
>>>>>>> c3a8ac2080469d095d2c809701eb3713ca689687
			});
		}
    }
});
