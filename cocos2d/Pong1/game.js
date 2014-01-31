gameLayer = cc.Layer.extend({
	barraesq:null,
	barradir:null,
	bola:null,
	fundo:null,
	score:null,
	verSkew:false,
	randX:0,
	randY:0,
	init:function(skew)
    {
        this._super();
        ponto1 = 0;
        ponto2 = 0;
        this.setKeyboardEnabled(true);
        this.fundo = cc.Sprite.create("assets/FUNDO.png");
        this.fundo.setPosition(400,240);
        this.addChild(this.fundo);
        this.score = cc.LabelTTF.create(ponto1 + " " + ponto2, "assets/Arcade Classic.ttf", 150);
        this.score.setPosition(400, 400);
        this.score.setColor(new cc.Color3B(50, 205, 50));
        this.addChild(this.score);
        this.bola = new Bola();
        this.addChild(this.bola);
        this.barraesq = new Barra(5);
        this.addChild(this.barraesq);
        this.barradir = new Barra(795);
        this.addChild(this.barradir);
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
    	if(this.verSkew){//efeito giratorio do menu
    		this.skewX = this.skewX + dt * this.randX;
    		this.skewY = this.skewY + dt * this.randY;
        	this.setSkewX(this.skewX);
        	this.setSkewY(this.skewY);
    	}    	
    	
    	if(this.collide(this.bola, this.barraesq)){//Verifcar colisão entre bola e barra esquerda
    		var bolaY = this.bola.getPositionY();//pega a posição da bola
    		var bolaCentro = bolaY - (this.bola.getContentSize().height/2);//centro da bola
    		var barraY = this.barraesq.getPositionY();//posição da barra
    		var barraCentro = this.barraesq.getContentSize().height/2;//centro da barra
    		var barraCentroPos = barraY - barraCentro;//posição do centro da barra
    		var distCent = bolaCentro - barraCentroPos;//distancia do ponto da colisão barra/bola 
    		var PorcDistCent = distCent/barraCentro;//em relação ao centro da barra
    		this.dir = (90 - PorcDistCent*90) + 180;//calculo da nova direção da bola
    		this.bola.changeDir(this.dir);//muda a direção da bola
    	}
    	if(this.collide(this.bola, this.barradir)){//a mesma coisa para a barra direita
    		var bolaY = this.bola.getPositionY();
    		var bolaCentro = bolaY - (this.bola.getContentSize().height/2);
    		var barraY = this.barradir.getPositionY();
    		var barraCentro = this.barradir.getContentSize().height/2;
    		var barraCentroPos = barraY - barraCentro;
    		var distCent = bolaCentro - barraCentroPos;
    		var PorcDistCent = distCent/barraCentro;
    		this.dir = 180 - (90 - PorcDistCent*90);
    		this.bola.changeDir(this.dir);
    	}
    	
    	
    	if(this.bola.getPositionX()<-40){//verifica se a bola saiu da tela pela esquerda
    		ponto2++;
    		this.bola.reset();
    		this.score.setString(ponto1 + " " + ponto2);
    	}
    	if(this.bola.getPositionX()>840){//verifica se a bola saiu da tela pela direita
    		ponto1++;
    		this.bola.reset();
    		this.score.setString(ponto1 + " " + ponto2);
    	}
    	
    	//verifica o numero de players selecionados no menu
    	if(players == 0){//As duas barras controladas pela IA
    		if(this.bola.getPositionX()>400){
    			if(this.bola.getPositionY()>this.barradir.getPositionY()){
            		this.onKeyDown(cc.KEY.up);
            		this.onKeyUp(cc.KEY.down);
            	}
            	if(this.bola.getPositionY()<this.barradir.getPositionY()){
            		this.onKeyDown(cc.KEY.down);
            		this.onKeyUp(cc.KEY.up);
            	}
    		}else{
    			if(this.bola.getPositionY()>this.barraesq.getPositionY()){
            		this.onKeyDown(cc.KEY.w);
            		this.onKeyUp(cc.KEY.s);
            	}
            	if(this.bola.getPositionY()<this.barraesq.getPositionY()){
            		this.onKeyDown(cc.KEY.s);
            		this.onKeyUp(cc.KEY.w);
            	}
    		}        	
    	}else if(players == 1){//Uma barra controlada pela IA
    		if(this.bola.getPositionX()<400 && this.bola.velx > 0){
    			if(this.bola.getPositionY()>this.barraesq.getPositionY()){
            		this.onKeyDown(cc.KEY.w);
            		this.onKeyUp(cc.KEY.s);
            	}
            	if(this.bola.getPositionY()<this.barraesq.getPositionY()){
            		this.onKeyDown(cc.KEY.s);
            		this.onKeyUp(cc.KEY.w);
            	}
    		}else{
    			this.onKeyUp(cc.KEY.w);
        		this.onKeyUp(cc.KEY.s);
    		}
    		
    	} 
    	if(!this.verSkew){
    		if(ponto1 >= 10 || ponto2 >= 10){//fim de jogo
        		this.bola.unscheduleUpdate();
        		this.unscheduleUpdate();
        		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new win()));
        	}
    	}
    	
    	
    	
    },
    onKeyDown:function(key) {//Verifica a tecla presionada
        if(key == cc.KEY.up){
        	this.barradir.up = true;
        }else if(key == cc.KEY.down){
        	this.barradir.down = true;
        }
        if(key == cc.KEY.w){
        	this.barraesq.up = true;
        }else if(key == cc.KEY.s){
        	this.barraesq.down = true;
        }
    },
    onKeyUp:function(key) {//verifica a tecla solta
    	if(key == cc.KEY.up){
        	this.barradir.up = false;
        }else if(key == cc.KEY.down){
        	this.barradir.down = false;
        }
        if(key == cc.KEY.w){
        	this.barraesq.up = false;
        }else if(key == cc.KEY.s){
        	this.barraesq.down = false;
        }
    },
    collide:function (a, b) {//calcula a colisão
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