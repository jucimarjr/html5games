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
		if(this.getPositionY() > (474 - this.getContentSize().height/2)){
			this.setPositionY((474 - this.getContentSize().height/2));
		}
		if(this.getPositionY() < (6 + this.getContentSize().height/2)){
			this.setPositionY(6 + this.getContentSize().height/2);
		}
	},
	collideRect:function(p){
			var a = this.getContentSize();
			
			return cc.rect(p.x - a.width/2, p.y - a.height/2, a.width, a.height);
	}
});