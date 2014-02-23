//var shipSprite;
var angularVelocity = 3;
var velocityX = 3;
var velocityY = 3;
var angle = 0;

var Ship = cc.Sprite.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),
	ctor:function () {
        this._super();
		
		//this.spriteFrameCache.addSpriteFrames("res/spritesheets/GameSpriteSheet.plist", "res/spritesheets/GameSpriteSheet.png");
        
		//Coloca a nave no centro da tela
		this.initWithSpriteFrameName("ship_14-24.png");
		this.setPosition(new cc.Point(screen.width/2, screen.height/2));
		
		this.scheduleUpdate();
		
		this.createAnimation();

        
    },update:function(dt){
		//console.log(">> Ship::Update");
		if (Math.abs(angle) >= 360)
    		angle = 0;
    	
    	//Se a tecla pressionada for "right", gira pra direita
    	if (LG.KEYS[cc.KEY.right]||LG.KEYS[cc.KEY.d]) {
			//console.log("a");
    		angle += angularVelocity;
    		this.setRotation(angle);
    	}
    	//Se a tecla pressionada for "left", gira pra esquerda
    	if (LG.KEYS[cc.KEY.left]||LG.KEYS[cc.KEY.a]) {
    		angle -= angularVelocity;
    		this.setRotation(angle);
    	}
    	
    	//Move a nave para frente (de acordo com o sentido que ela se encontra)
    	if (LG.KEYS[cc.KEY.up]||LG.KEYS[cc.KEY.w]) {
			//console.log("TecladoUp");
			
        	this.xSpeed = velocityX*Math.sin(Math.PI/180*angle);
        	this.ySpeed = velocityY*Math.cos(Math.PI/180*angle);
        	this.setPosition(new cc.Point(this.getPosition().x + this.xSpeed,this.getPosition().y + this.ySpeed));
			
			//Verifica saída da tela por um lado e entrada por outro
        	if(this.getPosition().x >= screen.width)
				this.setPosition(new cc.Point(this.getPosition().x - screen.width, this.getPosition().y));
			if(this.getPosition().x <= 0)
				this.setPosition(new cc.Point(this.getPosition().x + screen.width, this.getPosition().y));
			if(this.getPosition().y >= screen.height)
				this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y - screen.height));
			if(this.getPosition().y <= 0)
				this.setPosition(new cc.Point(this.getPosition().x, this.getPosition().y + screen.height));
    	}
    	
    	if (!LG.KEYS[cc.KEY.up]) {
    		var animation = this.animeCache.getAnimation("shipFire");
			animation.setRestoreOriginalFrame(true);
			this.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));
			//- << Init::Animação da nave
    	}
		
		if(LG.KEYS[cc.KEY.down]||LG.KEYS[cc.KEY.s]){
			console.log("baixo");
			this.setPosition(new cc.Point(Math.random()*800, Math.random()*480));
		}
		
		//console.log("<< Ship::Update");
	},
	
	createAnimation: function(){
		console.log(">> Ship::createAnimation");
		var animeFrames = [];
		animeFrames.push(this.spriteFrameCache.getSpriteFrame("ship_14-24.png"));
		animeFrames.push(this.spriteFrameCache.getSpriteFrame("shipFire1_14-24.png"));
		animeFrames.push(this.spriteFrameCache.getSpriteFrame("shipFire2_14-24.png"));
		var animation = cc.Animation.create(animeFrames,0.1);
		this.animeCache.addAnimation(animation,"shipFire");
		console.log("<< Ship::createAnimation");
	},
	animation: function(){
		var animation = this.animeCache.getAnimation("shipFire");
		animation.setRestoreOriginalFrame(true);
		this.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));	
	},
	
	    

});