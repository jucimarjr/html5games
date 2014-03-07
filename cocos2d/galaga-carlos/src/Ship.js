var SpaceShip = cc.Sprite.extend({
	//spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	
	//velocityX: 5,
	//velocityY: 5,
	//speed:220,
	
	ctor:function(){
		this._super();
		
		//Carrega o sprite da nave
		this.initWithSpriteFrameName("ShipWhite2_20-30.png");
		//Posiciona a nave no centro da tela
		this.setPosition(new cc.Point(screen.width/2, screen.height/2));
        
		this.scheduleUpdate();
        //this.createAnimation();
        layer.addChild(this);

    },
    
    /*update:function(){
    	
    	//Se a tecla pressionada for "right", gira pra direita
    	if (LG.KEYS[cc.KEY.right] || LG.KEYS[cc.KEY.d]) {
    		pos.x += dt * this.speed;
    		
    	}
    	//Se a tecla pressionada for "left", gira pra esquerda
    	if (LG.KEYS[cc.KEY.left] || LG.KEYS[cc.KEY.a]){
    		pos.x += dt * this.speed;
    	}
    	
    	//Move a nave para frente (de acordo com o sentido que ela se encontra)
    	
    	
    },*/
	
});