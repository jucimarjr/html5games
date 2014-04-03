gameLayer = cc.Layer.extend({
	barraEsq:null,
	barraDir:null,
	bola:null,
	fundo:null,
	score:null,
	verSkew:false,
	randX:0,
	randY:0,
	init:function(skew)
    {
        this._super();
        pontoPlayer = 0;
        pontoCpu = 0;
        this.setKeyboardEnabled(true);
        this.fundo = cc.Sprite.create("img/background.png");
        this.fundo.setPosition(400,240);
        this.addChild(this.fundo);
        this.score = cc.LabelTTF.create(pontoPlayer + "           " + pontoCpu, "img/atari1.ttf", 100);
        this.score.setPosition(400, 400);
        this.score.setColor(new cc.Color3B(200, 200, 200));
        this.addChild(this.score);
        this.bola = new Bola();
        this.addChild(this.bola);
        this.barraEsq = new Barra(10);
        this.addChild(this.barraEsq);
        this.barraDir = new Barra(790);
        this.addChild(this.barraDir);
        this.verSkew = skew;
        this.randX = 10 + Math.random()*20;
        this.randY = 10 + Math.random()*20;
        /*
        this.schedule(function(){
        	var pw = new Powerup();
        	this.addChild(pw);
        },8, cc.REPEAT_FOREVER, 0);
        */
        this.scheduleUpdate();
        return this;
    },
	dir:0,
    skewX:0,
    skewY:0,
    update:function(dt){
			
		if(this.collide(this.bola, this.barraEsq)){
    		var bolaY = this.bola.getPositionY();
    		var bolaCentro = bolaY - (this.bola.getContentSize().height/2);
    		var barraY = this.barraEsq.getPositionY();
    		var barraCentro = this.barraEsq.getContentSize().height/2;
    		var barraCentroPos = barraY - barraCentro;
    		var distCent = bolaCentro - barraCentroPos;
    		var PorcDistCent = distCent/barraCentro;
    		this.dir = (90 - PorcDistCent*90) + 180;
    		this.bola.changeDir(this.dir);
    	}
    	if(this.collide(this.bola, this.barraDir)){
    		var bolaY = this.bola.getPositionY();
    		var bolaCentro = bolaY - (this.bola.getContentSize().height/2);
    		var barraY = this.barraDir.getPositionY();
    		var barraCentro = this.barraDir.getContentSize().height/2;
    		var barraCentroPos = barraY - barraCentro;
    		var distCent = bolaCentro - barraCentroPos;
    		var PorcDistCent = distCent/barraCentro;
    		this.dir = 180 - (90 - PorcDistCent*90);
    		this.bola.changeDir(this.dir);
    	}
		
		if(this.bola.getPositionX()<0){//verifica se a bola saiu da tela pela esquerda
    		pontoPlayer++
    		this.bola.reset();
    		this.score.setString(pontoCpu + "           " + pontoPlayer);
    	}
    	if(this.bola.getPositionX()>800){//verifica se a bola saiu da tela pela direita
    		pontoCpu++;
    		this.bola.reset();
    		this.score.setString(pontoCpu + "           " + pontoPlayer);
    	}
		//Barra inimiga acionada
		/*
		if(this.bola.getPositionX()<400 && this.bola.dirx > 0){
    		if(this.bola.getPositionY()>this.barraEsq.getPositionY()){
           		this.onKeyDown(cc.KEY.w);
           		this.onKeyUp(cc.KEY.s);
           	}
           	if(this.bola.getPositionY()<this.barraEsq.getPositionY()){
           		this.onKeyDown(cc.KEY.s);
           		this.onKeyUp(cc.KEY.w);
           	}
    	}else{
    		this.onKeyUp(cc.KEY.w);
        	this.onKeyUp(cc.KEY.s);
    	}
		*/
		if(pontoPlayer == 1){
			this.bola.unscheduleUpdate();
			this.unscheduleUpdate();
			cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new win()));
		}else
			if(pontoCpu == 1){
				cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new lose()));
			}
		
	},
	onKeyDown:function(key) {//Verifica a tecla presionada
        //Player
		if(key == cc.KEY.up){
        	this.barraDir.up = true;
        }else if(key == cc.KEY.down){
        	this.barraDir.down = true;
        }
		//Cpu
		if(key == cc.KEY.w){
        	this.barraEsq.up = true;
        }else if(key == cc.KEY.s){
        	this.barraEsq.down = true;
        }
		
	},
	onKeyUp:function(key) {//verifica a tecla solta
    	//Player
		if(key == cc.KEY.up){
        	this.barraDir.up = false;
        }else if(key == cc.KEY.down){
        	this.barraDir.down = false;
        }
		//Cpu
		if(key == cc.KEY.w){
        	this.barraEsq.up = false;
        }else if(key == cc.KEY.s){
        	this.barraEsq.down = false;
        }
	},
	collide:function (a, b) {
        var pos1 = a.getPosition();
        var pos2 = b.getPosition();
        var aRect = a.collideRect(pos1);
        var bRect = b.collideRect(pos2);
        return cc.rectIntersectsRect(aRect, bRect);
    }	
});

game = cc.Scene.extend({
	onEnterTransitionDidFinish:function(){
    	this._super();
    	var layer = new gameLayer();
    	layer.init();
    	this.addChild(layer);
	}
});