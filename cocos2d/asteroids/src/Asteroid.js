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
	},

	//Calcula o retângulo que envolve o sprite do asteroid para verificar a colisão
	collideRect:function(position){
		var size = this.getContentSize();
	    return cc.rect(position.x - size.width/2, position.y - size.height/2, size.width, size.height);
	},
	
	
	//Seta o asteroid: tamanho do sprite, velocidade e posição na tela
	setAsteroid:function(size, position) {
		var i = Math.floor((Math.random()*3)+1);
		
		switch (size) {
			case "big":
				this.initWithSpriteFrameName("asteroids"+i+"_80-80.png");
				this.angularVelocity = 1;
				this.velocityX = 1;
				this.velocityY = 1;
				
				//Coloca o asteroid numa posição aleatória
				this.setPosition(new cc.Point(Math.random()*500, Math.random()*500));
				break;
			
			case "medium":
				this.initWithSpriteFrameName("asteroids"+i+"_40-40.png");
				this.angularVelocity = 2;
				this.velocityX = 2;
				this.velocityY = 2;

				//Coloca o asteroid na posição em que se encontrava o asteroid grande
				this.setPosition(new cc.Point(position.x, position.y));
				break;
			
			case "small":
				this.initWithSpriteFrameName("asteroids"+i+"_20-20.png");
				this.angularVelocity = 3;
				this.velocityX = 3;
				this.velocityY = 3;
				
				//Coloca o asteroid na posição em que se encontrava o asteroid médio
				this.setPosition(new cc.Point(position.x, position.y));
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
	
	die:function(position){
		if (this.alive) {
			switch (this.size) {
				case "big":
					layer.removeChild(this);
					asteroids.push(new Asteroid("medium", position));
		        	asteroids.push(new Asteroid("medium", position));
		        	break;
				case "medium":
					layer.removeChild(this);
					asteroids.push(new Asteroid("small", position));
		        	asteroids.push(new Asteroid("small", position));
					break;
				case "small":
					layer.removeChild(this);
					this.size = null;
					break;
			}
		}
		this.alive = false;
	}
});
