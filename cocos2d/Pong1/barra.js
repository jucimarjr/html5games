var Barra = cc.Sprite.extend({
	up:false,
	down:false,
	ctor:function(pos){
		this._super();
		this.initWithFile("assets/BARRAMED.png");
		this.setPosition(pos, 240);
		this.scheduleUpdate();
	},
	update:function(dt){			
		if(this.up){
			this.setPositionY(this.getPositionY()+6);
			
		}
		if(this.down){
			this.setPositionY(this.getPositionY()-6);
		}
		if(this.getPositionY() > 464){
			this.setPositionY(464);
		}
		if(this.getPositionY() < 16){
			this.setPositionY(16);
		}
	},
	collideRect:function(p){
        var a = this.getContentSize();
        return cc.rect(p.x - a.width, p.y - a.height,a.width*2,a.height);
	}
});