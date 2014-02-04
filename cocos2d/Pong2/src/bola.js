var Bola = cc.Sprite.extend({
	velocidadeX:0,
	velocidadeY:0,
	velocidade:0,
	dir:0,
	
	ctor:function(){
		this._super();
		this.initWithFile("res/bola.png");
		this.reset();
        this.scheduleUpdate();
	},
	
	update:function(){
		this.setPosition(new cc.Point(this.getPosition().x-this.velocidadeocidadeX,this.getPosition().y-this.velocidadeocidadeY));
		if(this.getPositionY() < 10 || this.getPositionY() > 470){
			cc.AudioEngine.getInstance().setEffectsVolume(1);
	        cc.AudioEngine.getInstance().playEffect("audio/ping.wav",false);
			this.velocidadeocidadeY = -this.velocidadeocidadeY;
			this.velocidade = this.velocidade + 0.1;
			cc.log("velocidade: "+this.velocidade);
		}
	},
	
	collideRect:function(p){
        var a = this.getContentSize();
        return cc.rect(p.x - a.width, p.y - a.height,a.width,a.height);
	},
	
	changeDir:function(dir){
        cc.AudioEngine.getInstance().setEffectsVolume(1);
        cc.AudioEngine.getInstance().playEffect("audio/pong.mp3",false);
		this.dir = this.dir + dir;
		this.velocidade = this.velocidade + 0.1;
		cc.log("velocidade: "+this.velocidade);
		this.velocidadeocidadeX = Math.sin(this.dir * 0.0174)* this.velocidade;
        this.velocidadeocidadeY = Math.cos(this.dir * 0.0174) * this.velocidade;
	},
	
	reset:function(){
		this.setPosition(400,240);
		this.dir = Math.random()*360;
		if(this.dir< 180){
			if(this.dir < 45){
				this.dir = this.dir + 45;
			}else if(this.dir>135){
				this.dir = this.dir - 45;
			}
		}else{
			if(this.dir < 225){
				this.dir = this.dir + 45;
			}else if(this.dir > 315){
				this.dir = this.dir - 45;
			}
		}
		this.velocidade = 4;
		this.velocidadeocidadeX = Math.sin(this.dir * 0.0174)* this.velocidade;
        this.velocidadeocidadeY = Math.cos(this.dir * 0.0174) * this.velocidade;
        cc.AudioEngine.getInstance().setEffectsVolume(1);
        cc.AudioEngine.getInstance().playEffect("audio/inicio.mp3",false);
	}
});
