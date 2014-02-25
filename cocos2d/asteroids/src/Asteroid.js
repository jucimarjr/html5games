var Asteroid = cc.Sprite.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	
	size: null,
	angularVelocity: 0,
	velocityX: 0,
	velocityY: 0,
	
	angle: 0,
	alive: true,
	
	
	ctor:function(size, position){
		this._super();
	
		//Carrega o sprite do asteroid de acordo com o seu tamanho
		this.size = size;
		this.setAsteroid(this.size, position);
		
		var randomDir = Math.random()*2*Math.PI;
		this.xSpeed = this.velocityX*Math.cos(randomDir);
		this.ySpeed = this.velocityY*Math.sin(randomDir);
		
			
		this.scheduleUpdate();
			
		layer.addChild(this);
	},

	update:function(){
		this.move();
		
		if (verify)	{
			this.collide(ship);

			if(bullet != null){
				for(i=0; i<bullet.length; i++)
					this.collide(bullet[i]);
			}

			for(i=0; i<bulletUFO.length; i++){
				if(bulletUFO != null)
					this.collide(bulletUFO[i]);
			}
			
			if(ufo != null)
				this.collide(ufo);
		}
	},

	
	//Seta o asteroid: tamanho do sprite, velocidade e posição na tela
	setAsteroid:function(size, position) {
		var i = Math.floor((Math.random()*3)+1);
		
		switch (size) {
			case "big":
				this.initWithSpriteFrameName("asteroids"+i+"_80-80.png");
				this.angularVelocity = 0.5;
				this.velocityX = 0.5;
				this.velocityY = 0.5;
				
				//Coloca o asteroid numa posição aleatória
				this.setPosition(new cc.Point(Math.random()*500, Math.random()*500));
				break;
			
			case "medium":
				this.initWithSpriteFrameName("asteroids"+i+"_40-40.png");
				this.angularVelocity = 1;
				this.velocityX = 1;
				this.velocityY = 1;

				//Coloca o asteroid na posição em que se encontrava o asteroid grande
				this.setPosition(new cc.Point(position.x + 20, position.y + 20));
				break;
			
			case "small":
				this.initWithSpriteFrameName("asteroids"+i+"_20-20.png");
				this.angularVelocity = 1.5;
				this.velocityX = 1.5;
				this.velocityY = 1.5;
				
				//Coloca o asteroid na posição em que se encontrava o asteroid médio
				this.setPosition(new cc.Point(position.x + 20, position.y + 20));
				break;
		}
	},
	
	//Move aleatoriamente e rotaciona os asteroids
	move:function(){
		//Rotaciona automaticamente o asteroid
		if(this.angle > 360)
        	this.angle = this.angularVelocity;
		this.angle += 0.5;
		this.setRotation(this.angle);
		//Coloca a nave na posição calculada
		this.setPosition(new cc.Point(this.getPosition().x + this.xSpeed, this.getPosition().y + this.ySpeed));
		
		//Verifica saída/entrada na tela
		if(this.getPosition().x > screen.width)
			this.setPosition(new cc.Point(this.getPosition().x - screen.width, this.getPosition().y));
		if(this.getPosition().x < 0)
			this.setPosition(new cc.Point(this.getPosition().x + screen.width, this.getPosition().y));
		if(this.getPosition().y > screen.height)
			this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y - screen.height));
		if(this.getPosition().y < 0)
			this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y + screen.height));
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

        	for(i=0; i<bullet.length; i++)
        		if(object == bullet[i]){
        			bullet.splice(i, 1); //Remove 1 elemento no index i
        			this.punctuate();
        		}
        	
        	if(object == ufo)
        		ufo = null;
        	
        }
    },
    
	die:function(){
    	//O asteroid é removido no SpaceShip.js e no UFO.js
    	
    	if (this.alive) {
			switch (this.size) {
				case "big":
					layer.removeChild(this);
					asteroids.push(new Asteroid("medium", this.getPosition()));
		        	asteroids.push(new Asteroid("medium", this.getPosition()));
		        	break;
				case "medium":
					layer.removeChild(this);
					asteroids.push(new Asteroid("small", this.getPosition()));
		        	asteroids.push(new Asteroid("small", this.getPosition()));
					break;
				case "small":
					layer.removeChild(this);
					this.size = null;
					break;
			}
		}
		this.alive = false;
	},
    
	
    punctuate:function(){
    	switch (this.size) {
		case "big":
			scoreGame.score += 20;
			break;
		case "medium":
			scoreGame.score += 50;
			break;
		case "small":
			scoreGame.score += 100;
			break;
    	}
    	scoreGame.scoreLabel.setString(scoreGame.score);
    }
});
