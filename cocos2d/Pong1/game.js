gameLayer = cc.Layer.extend({
	barraesq:null,
	barradir:null,
	bola:null,
	fundo:null,
	ponto1:0,
	ponto2:0,
	score:null,
	init:function()
    {
        this._super();
        this.setKeyboardEnabled(true);
        this.fundo = cc.Sprite.create("assets/FUNDO.png");
        this.fundo.setPosition(400,240);
        this.addChild(this.fundo);
        this.score = cc.LabelTTF.create(this.ponto1 + " " + this.ponto2, "assets/Arcade Classic.ttf", 150);
        cc.log(this.score.getTextDefinition());
        this.score.setPosition(400, 400);
        this.score.setFontFillColor(new cc.Color3B(50, 205, 50));
        this.addChild(this.score);
        this.bola = new Bola();
        this.addChild(this.bola);
        this.barraesq = new Barra(4);
        this.addChild(this.barraesq);
        this.barradir = new Barra(796);
        this.addChild(this.barradir);
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
    update:function(dt){
    	if(this.collide(this.bola, this.barraesq)){
    		var bolaY = this.bola.getPositionY();
    		var bolaCentro = bolaY - (this.bola.getContentSize().height/2);
    		var barraY = this.barraesq.getPositionY();
    		var barraCentro = this.barraesq.getContentSize().height/2;
    		var barraCentroPos = barraY - barraCentro;
    		var distCent = bolaCentro - barraCentroPos;
    		var PorcDistCent = distCent/barraCentro;
    		this.dir = (90 - PorcDistCent*90) + 180;
    		this.bola.changeDir(this.dir);
    	}
    	if(this.collide(this.bola, this.barradir)){
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
    	if(this.bola.getPositionX()<-20){
    		this.ponto2++;
    		this.bola.reset();
    		this.score.setString(this.ponto1 + " " + this.ponto2);
    	}
    	if(this.bola.getPositionX()>820){
    		this.ponto1++;
    		this.bola.reset();
    		this.score.setString(this.ponto1 + " " + this.ponto2);
    	}
    	/*if(this.bola.getPositionY()>this.barradir.getPositionY()){
    		this.onKeyDown(cc.KEY.up);
    		this.onKeyUp(cc.KEY.down);
    	}
    	if(this.bola.getPositionY()<this.barradir.getPositionY()){
    		this.onKeyDown(cc.KEY.down);
    		this.onKeyUp(cc.KEY.up);
    	}*/
    	if(this.bola.getPositionY()>this.barraesq.getPositionY()){
    		this.onKeyDown(cc.KEY.w);
    		this.onKeyUp(cc.KEY.s);
    	}
    	if(this.bola.getPositionY()<this.barraesq.getPositionY()){
    		this.onKeyDown(cc.KEY.s);
    		this.onKeyUp(cc.KEY.w);
    	}
    	if(this.ponto1 >= 10 || this.ponto2 >= 10){
    		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new win()));
    	}
    },
    onKeyDown:function(key) {
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
    onKeyUp:function(key) {
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