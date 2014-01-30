var Bola = cc.Sprite.extend({
	velx:0,
	vely:0,
	vel:0,
	dir:0,
	ctor:function(){
		this._super();
		this.initWithFile("assets/BOLA.png");
		this.reset();
        this.scheduleUpdate();
        
	},
	update:function(){
		this.setPosition(new cc.Point(this.getPosition().x-this.velx,this.getPosition().y-this.vely));
		if(this.getPositionY() < 10 || this.getPositionY() > 470){
			cc.AudioEngine.getInstance().setEffectsVolume(1);
	        cc.AudioEngine.getInstance().playEffect("assets/sound2.wav",false);
			this.vely = -this.vely;
			this.vel = this.vel + 0.1;
			cc.log("vel: "+this.vel);
		}
	},
	collideRect:function(p){
        var a = this.getContentSize();
        return cc.rect(p.x - a.width, p.y - a.height,a.width,a.height);
	},
	changeDir:function(dir){
        cc.AudioEngine.getInstance().setEffectsVolume(1);
        cc.AudioEngine.getInstance().playEffect("assets/sound1.wav",false);
		this.dir = this.dir + dir;
		this.vel = this.vel + 0.1;
		cc.log("vel: "+this.vel);
		this.velx = Math.sin(this.dir * 0.0174)* this.vel;
        this.vely = Math.cos(this.dir * 0.0174) * this.vel;
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
		this.vel = 4;
		this.velx = Math.sin(this.dir * 0.0174)* this.vel;
        this.vely = Math.cos(this.dir * 0.0174) * this.vel;
        cc.AudioEngine.getInstance().setEffectsVolume(1);
        cc.AudioEngine.getInstance().playEffect("assets/Hit.wav",false);
	}
});