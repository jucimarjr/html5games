var Barra = cc.Sprite.extend({
	up:false,
	down:false,
	ver:true,
	
	ctor:function(pos, image){
		this._super();
		this.initWithFile(image);
		this.setPosition(pos, 240);
		this.scheduleUpdate();
	},
	
	update:function(dt){	
		var tela = cc.Director.getInstance().getWinSizeInPixels();
		
		if(this.up){
			this.setPositionY(this.getPositionY()+6);
		}
		
		if(this.down){
			this.setPositionY(this.getPositionY()-6);
		}
		
		if(this.getPositionY() > (tela.height - this.getContentSize().height/2)){
			this.setPositionY((tela.height - this.getContentSize().height/2));
		}
		
		if(this.getPositionY() < (6 + this.getContentSize().height/2)){
			this.setPositionY(6 + this.getContentSize().height/2);
		}
	},
	collideRect:function(p){
			var a = this.getContentSize();
			
			return cc.rect(p.x - a.width, p.y - a.height,a.width,a.height);
	}
});