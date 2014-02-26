var UFO = cc.Sprite.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),
	
	velocityX: 0,
	velocityY: 3,
	position: 0,
	
	ctor:function(){
		this._super();
		
		//Carrega o sprite do disco voador
		this.initWithSpriteFrameName("ufo_35-22.png");
		
		//Posiciona o disco voador no lado esquerdo da tela numa altura aleatória
		this.setPosition(new cc.Point(Math.floor((Math.random()*screen.width), 0)));
        
		this.scheduleUpdate();
        layer.addChild(this);
    },

    update:function(){
    	this.move();
    
    	for(i=0; i<asteroids.length; i++)
    		this.collide(asteroids[i]);
    	
    	if(bullet != null){
			for(i=0; i<bullet.length; i++)
				this.collide(bullet[i]);
		}
    },
    
	
    appear:function(){
    	
    },
    
	//Move o disco voador de uma ponta a outra
	move:function(){
    	this.setPosition(new cc.Point(this.getPosition().x + this.velocityX, this.getPosition().y + this.velocityY));
		
		//Verifica saída da tela
		if(this.getPosition().x > screen.width)
			layer.removeChild(this);
	},
    
	shoot:function(dt) {
		bulletUFO.push(new Bullet());
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
        	
        	for(i=0; i<asteroids.length; i++){
    			if(asteroids[i] == object)
    				asteroids.splice(i, 1); //Remove 1 elemento no index i
    		}
        }
    },
	
    //Disco voador some
	die:function(){
    	layer.removeChild(this);
	},
    
    
    punctuate:function(){
    	scoreGame.score += 200;
//    	scoreGame.scoreLabel.setString(scoreGame.score);
    }
});
