var Barra = cc.Sprite.extend({
	up:false,
	down:false,
	ver:true,
	ctor:function(pos){
		this._super();
		this.initWithFile("assets/BARRAMED.png");
		this.setPosition(pos, 240);
		this.scheduleUpdate();
	},
	update:function(dt){			
		if(this.up){
			this.setPositionY(this.getPositionY()+4);
		}
		if(this.down){
			this.setPositionY(this.getPositionY()-4);
		}
		if(this.getPositionY() > 460){
			this.setPositionY(460);
		}
		if(this.getPositionY() < 20){
			this.setPositionY(20);
		}
	},
	collideRect:function(p){
			var a = this.getContentSize();
			return cc.rect(p.x - a.width, p.y - a.height,a.width*1.5,a.height);
	}
});