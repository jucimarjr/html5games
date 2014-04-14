var Bola = cc.Sprite.extend({
	dirx:0,
	diry:0,
	vel:0,
	dir:0,
	ctor:function(){
		this._super();
		this.initWithFile("img/ball.png");
		this.reset();
		this.setPosition(400, 240);
        this.scheduleUpdate();
	},
	update:function(){
		this.setPosition(new cc.Point(this.getPosition().x-this.dirx,this.getPosition().y-this.diry));
		if(this.getPositionY() > (480) || this.getPositionY() < (0)){
			this.diry = -this.diry;
			this.vel = this.vel + 0.1;
		}
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
		this.vel = 3;
		this.dirx = Math.sin(this.dir * 0.0174)* this.vel;
        this.diry = Math.cos(this.dir * 0.0174) * this.vel;
        //cc.AudioEngine.getInstance().setEffectsVolume(1);
        //cc.AudioEngine.getInstance().playEffect("assets/Hit.wav",false);
	},
	changeDir:function(dir){
        //cc.AudioEngine.getInstance().setEffectsVolume(1);
        //cc.AudioEngine.getInstance().playEffect("assets/sound1.wav",false);
		this.dir = this.dir + dir;
		this.vel = this.vel + 0.1;
		this.dirx = Math.sin(this.dir * 0.0174)* this.vel;
        this.diry = Math.cos(this.dir * 0.0174) * this.vel;
	},
	collideRect:function(p){
        var a = this.getContentSize();
        return cc.rect(p.x - a.width, p.y - a.height,a.width,a.height);
	},
	setDir:function(dir){
		this.dir = dir;
	}
});