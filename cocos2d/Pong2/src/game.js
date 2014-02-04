gameLayer = cc.Layer.extend({
	fundo:null,
	
	bola:null,
	barraEsquerda:null,
	barraDireita:null,
	
	pontuacaoEsquerda:0,
	pontuacaoDireita:0,
	pontuacaoGeral:null,
	
	verSkew:false,
	randX:0,
	randY:0,
	
	init:function(skew)
    {
        this._super();
        this.setKeyboardEnabled(true);
        
        var tela = cc.Director.getInstance().getWinSizeInPixels();
        this.fundo = cc.Sprite.create("res/jogo.png");
        this.fundo.setPosition(tela.width/2,tela.height/2);
        this.addChild(this.fundo);
        
        this.pontuacaoGeral = cc.LabelTTF.create(this.pontuacaoEsquerda + " " + this.pontuacaoDireita, "Arcade", 150);
        cc.log(this.pontuacaoGeral.getTextDefinition());
        this.pontuacaoGeral.setPosition(tela.width/2,tela.height - 75);
        this.addChild(this.pontuacaoGeral);
        
        this.bola = new Bola();
        this.addChild(this.bola);
        this.barraEsquerda = new Barra(10, "res/barraEsquerda.png");
        this.addChild(this.barraEsquerda);
        this.barraDireita = new Barra(tela.width - 10, "res/barraDireita.png");
        this.addChild(this.barraDireita);
        
        this.verSkew = skew;
        this.randX = 10 + Math.random()*20;
        this.randY = 10 + Math.random()*20;
        
        this.scheduleUpdate();
        return this;
    },
    
    dir:0,
    skewX:0,
    skewY:0,
    
    update:function(dt){
    	var tela = cc.Director.getInstance().getWinSizeInPixels();
    	
    	if(this.verSkew){
    		this.skewX = this.skewX + dt * this.randX;
    		this.skewY = this.skewY + dt * this.randY;
        	this.setSkewX(this.skewX);
        	this.setSkewY(this.skewY);
    	}    	
    	if(this.collide(this.bola, this.barraEsquerda)){
    		cc.log(this.barraDireita.getContentSize().height);
    		var bolaY = this.bola.getPositionY();
    		var bolaCentro = bolaY - (this.bola.getContentSize().height/2);
    		var barraY = this.barraEsquerda.getPositionY();
    		var barraCentro = this.barraEsquerda.getContentSize().height/2;
    		var barraCentroPos = barraY - barraCentro;
    		var distCent = bolaCentro - barraCentroPos;
    		var PorcDistCent = distCent/barraCentro;
    		this.dir = (90 - PorcDistCent*90) + 180;
    		this.bola.changeDir(this.dir);
    	}
    	if(this.collide(this.bola, this.barraDireita)){
    		var bolaY = this.bola.getPositionY();
    		var bolaCentro = bolaY - (this.bola.getContentSize().height/2);
    		var barraY = this.barraDireita.getPositionY();
    		var barraCentro = this.barraDireita.getContentSize().height/2;
    		var barraCentroPos = barraY - barraCentro;
    		var distCent = bolaCentro - barraCentroPos;
    		var PorcDistCent = distCent/barraCentro;
    		this.dir = 180 - (90 - PorcDistCent*90);
    		this.bola.changeDir(this.dir);
    	}
    	if(this.bola.getPositionX()<-20){
    		this.pontuacaoDireita++;
    		this.bola.reset();
    		this.pontuacaoGeral.setString(this.pontuacaoEsquerda + " " + this.pontuacaoDireita);
    	}
    	if(this.bola.getPositionX()>tela.width + 20){
    		this.pontuacaoEsquerda++;
    		this.bola.reset();
    		this.pontuacaoGeral.setString(this.pontuacaoEsquerda + " " + this.pontuacaoDireita);
    	}

		if(this.bola.getPositionY()>this.barraEsquerda.getPositionY()){
    		this.onKeyDown(cc.KEY.w);
    		this.onKeyUp(cc.KEY.s);
    	}
    	if(this.bola.getPositionY()<this.barraEsquerda.getPositionY()){
    		this.onKeyDown(cc.KEY.s);
    		this.onKeyUp(cc.KEY.w);
    	}

    	if(this.pontuacaoEsquerda >= 10 || this.pontuacaoDireita >= 10){
    		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new win()));
    	}
    },
    onKeyDown:function(key) {
        if(key == cc.KEY.up){
        	this.barraDireita.up = true;
        }else if(key == cc.KEY.down){
        	this.barraDireita.down = true;
        }
        if(key == cc.KEY.w){
        	this.barraEsquerda.up = true;
        }else if(key == cc.KEY.s){
        	this.barraEsquerda.down = true;
        }
    },
    onKeyUp:function(key) {
    	if(key == cc.KEY.up){
        	this.barraDireita.up = false;
        }else if(key == cc.KEY.down){
        	this.barraDireita.down = false;
        }
        if(key == cc.KEY.w){
        	this.barraEsquerda.up = false;
        }else if(key == cc.KEY.s){
        	this.barraEsquerda.down = false;
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