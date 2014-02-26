var shootDelay = true;

var SpaceShip = cc.Sprite.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),
	
	angularVelocity: 3,
	velocityX: 5,
	velocityY: 5,
	
	angle: 0,
	alive: true,

	
	ctor:function(){
		this._super();
		
		//Carrega o sprite da nave
		this.initWithSpriteFrameName("ship_14-24.png");
		//Posiciona a nave no centro da tela
		this.setPosition(new cc.Point(screen.width/2, screen.height/2));
        
		this.scheduleUpdate();
        this.createAnimation();
        layer.addChild(this);

    },

    update:function(){
    	for(i=0; i<asteroids.length; i++)
    		this.collide(asteroids[i]);
		for(i=0; i<bulletUFO.length; i++){
			if(bulletUFO != null)
				this.collide(bulletUFO[i]);
		}
    	if(ufo != null)
			this.collide(ufo);
    	
    	//Rotaciona a nave
    	if (Math.abs(this.angle) >= 360)
    		this.angle = 0;
    	
    	//Se a tecla pressionada for "right", gira pra direita
    	if (LG.KEYS[cc.KEY.right] || LG.KEYS[cc.KEY.d]) {
    		this.angle += this.angularVelocity;
    		this.setRotation(this.angle);
    	}
    	//Se a tecla pressionada for "left", gira pra esquerda
    	if (LG.KEYS[cc.KEY.left] || LG.KEYS[cc.KEY.a]){
    		this.angle -= this.angularVelocity;
    		this.setRotation(this.angle);
    	}
    	
    	//Move a nave para frente (de acordo com o sentido que ela se encontra)
    	if (LG.KEYS[cc.KEY.up] || LG.KEYS[cc.KEY.w]){
        	this.xSpeed = this.velocityX*Math.sin(Math.PI/180*this.angle);
        	this.ySpeed = this.velocityY*Math.cos(Math.PI/180*this.angle);
        	//Coloca a nave na posição calculada
        	this.setPosition(new cc.Point(this.getPosition().x + this.xSpeed,this.getPosition().y + this.ySpeed));
			
			//Verifica saída/entrada na tela
        	if(this.getPosition().x >= screen.width)
				this.setPosition(new cc.Point(this.getPosition().x - screen.width, this.getPosition().y));
			if(this.getPosition().x <= 0)
				this.setPosition(new cc.Point(this.getPosition().x + screen.width, this.getPosition().y));
			if(this.getPosition().y >= screen.height)
				this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y - screen.height));
			if(this.getPosition().y <= 0)
				this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y + screen.height));
    	}
    	
    	//Faz a animação da nave com fogo
    	if (!LG.KEYS[cc.KEY.up]){
    		var animation = this.animeCache.getAnimation("shipFire");
			animation.setRestoreOriginalFrame(true);
			this.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));
    	}
    	
    	//Teletransporta a nave
		if(LG.KEYS[cc.KEY.down] || LG.KEYS[cc.KEY.s]){
			this.setPosition(new cc.Point(Math.random()*800, Math.random()*480));
		}
		
		if(LG.KEYS[cc.KEY.space] || LG.KEYS[cc.KEY.b]){
			this.shoot();
		}
    },

	animation: function(){
		var animation = this.animeCache.getAnimation("shipFire");
		animation.setRestoreOriginalFrame(true);
		this.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));	
	},

	createAnimation: function(){
    	var animeFrames = [];
		animeFrames.push(this.spriteFrameCache.getSpriteFrame("ship_14-24.png"));
		animeFrames.push(this.spriteFrameCache.getSpriteFrame("shipFire1_14-24.png"));
		animeFrames.push(this.spriteFrameCache.getSpriteFrame("shipFire2_14-24.png"));
		
		var animation = cc.Animation.create(animeFrames, 0.1);
		this.animeCache.addAnimation(animation, "shipFire");
	},
	
	
	shoot:function(dt) {
		if (shootDelay){
		    shootDelay = false;
			bullet.push(new Bullet());
			setTimeout(function(){shootDelay = true;}, 200);
		}
	},
	
	//Calcula o retângulo que envolve o sprite da nave para verificar a colisão
	collideRect:function(position){
		var size = this.getContentSize();
	    return cc.rect(position.x - size.width/2, position.y - size.height/2, size.width, size.height);
	},
    //Verifica se há colisão
    collide:function(object){
		var object1Rect = this.collideRect(this.getPosition());
        var object2Rect = object.collideRect(object.getPosition());
      
        if(cc.rectIntersectsRect(object1Rect, object2Rect)){
        	this.die();

        	if(object == ufo)
        		ufo = null;
        	for(i=0; i<asteroids.length; i++){
    			if(object = asteroids[i])
    				asteroids.splice(i, 1); //Remove 1 elemento no index i
        	}
        }
    },
	
    //Explode a nave
	die:function(){
    	if (this.alive == true) {
    		this.removeLives(--numberLives);
    		
    		layer.removeChild(this);
        	//ADICIONAR A ANIMAÇÃO DA EXPLOSÃO DA NAVE AQUI
        	
			if (numberLives !== 0)
				ship = new SpaceShip();
		}
    	this.alive = false;
	},
    
	removeLives:function(numberLives){
		layer.removeChild(spriteLives[numberLives]);		
		if (numberLives == 0){		
        	losing = new Losing();			
			layer.removeChild(this);
			scoreGame.score = 0;
			setTimeout(function(){cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new Menu()));}, 1500);			
		}
	}
});
