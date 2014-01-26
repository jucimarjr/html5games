var Bola = cc.Sprite.extend({
	ctor:function(){
		this._super();
		this.initWithFile("BOLA.png");
		this.setPosition(200,200);
		this.scheduleUpdate();
	},
	update:function(){
		
	}
});