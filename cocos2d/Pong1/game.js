gameLayer = cc.Layer.extend({
	barraesq:null,
	barradir:null,
	bola:null,
	fundo:null,
	init:function()
    {
        this._super();
        this.setKeyboardEnabled(true);
        this.fundo = cc.Sprite.create("assets/FUNDO.png");
        this.fundo.setPosition(400,240);
        this.addChild(this.fundo);
        this.bola = new Bola();
        this.addChild(this.bola);
        this.barraesq = new Barra(4);
        this.addChild(this.barraesq);
        this.barradir = new Barra(796);
        this.addChild(this.barradir);
        this.scheduleUpdate();
        
        return this;
    },
    dir:0,
    update:function(){
    	if(this.collide(this.bola, this.barraesq)){
    		var bolaY = this.bola.getPositionY();
    		var bolaCentro = bolaY - (this.bola.getContentSize().height/2);
    		var barraY = this.barraesq.getPositionY();
    		var barraCentro = this.barraesq.getContentSize().height/2;
    		var barraCentroPos = barraY - barraCentro;
    		var distCent = bolaCentro - barraCentroPos;
    		var PorcDistCent = distCent/barraCentro;
    		this.dir = (90 - PorcDistCent*90) + 180;
    		cc.log("Barraesq:");
    		cc.log("bolaY: "+bolaY);
    		cc.log("barraY: "+barraY);
    		cc.log("barraCentro: "+barraCentro);
    		cc.log("barraCentroPos: "+barraCentroPos);
    		cc.log("distCent: "+distCent);
    		cc.log("PorcDistCent: "+PorcDistCent);
    		cc.log("Direção: "+this.dir);
    		this.bola.changeDir(this.dir);
    	}
    	if(this.collide(this.bola, this.barradir)){
    		var bolaY = this.bola.getPositionY();
    		var barraY = this.barradir.getPositionY();
    		var barraCentro = this.barradir.getContentSize().height/2;
    		var barraCentroPos = barraY - barraCentro;
    		var distCent = bolaY - barraCentroPos;
    		var PorcDistCent = distCent/barraCentroPos;
    		this.dir = 180 - (90 - PorcDistCent*90);
    		cc.log("Barradir:");
    		cc.log("bolaY: "+bolaY);
    		cc.log("barraY: "+barraY);
    		cc.log("barraCentro: "+barraCentro);
    		cc.log("barraCentroPos: "+barraCentroPos);
    		cc.log("distCent: "+distCent);
    		cc.log("PorcDistCent: "+PorcDistCent);
    		cc.log("Direção: "+this.dir);
    		this.bola.changeDir(this.dir);
    	}
    	if(this.bola.getPositionX()<-20){
    		this.bola.reset();
    	}
    	if(this.bola.getPositionX()>820){
    		this.bola.reset();
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
    onEnter:function(){
    	this._super();
    	var layer = new gameLayer();
    	layer.init();
    	this.addChild(layer);
	}
});