var Barra = cc.Sprite.extend({
	up:false,
	down:false,
	ver:true,
	ctor:function(pos){
		this._super();
		this.initWithFile("img/barra.png");
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
		if(this.getPositionY() > (465)){
			this.setPositionY((465));
		}
		if(this.getPositionY() < (15)){
			this.setPositionY((15));
		}
	},
	collideRect:function(p){
		var a = this.getContentSize();
		return cc.rect(p.x - a.width/2, p.y - a.height/2, a.width, a.height);
	}
});