var UFO = cc.Sprite.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),
	
	velocityX: 3,
	velocityY: 0,
	position: 0,
	
	ctor:function(){
		this._super();
		
		//Carrega o sprite do disco voador
		this.initWithSpriteFrameName("ufo_35-22.png");
		
		//Posiciona o disco voador no lado esquerdo da tela numa altura aleatória
		this.setPosition(new cc.Point(0, Math.floor((Math.random()*screen.height))));
        
		this.scheduleUpdate();
        layer.addChild(this);
    },

    update:function(){
    	this.move();
    },
    
	//Calcula o retângulo que envolve o sprite do disco voador para verificar a colisão
	collideRect:function(position){
		var size = this.getContentSize();
	    return cc.rect(position.x - size.width/2, position.y - size.height/2, size.width, size.height);
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
    
	shoot:function (dt) {
		
	},
	
	die:function(){

	}
});
