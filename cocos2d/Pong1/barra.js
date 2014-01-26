var Barra = cc.Sprite.extend({
	ctor:function(pos){
		this._super();
		this.initWithFile("BARRAMED.png");
		this.setPosition(pos, 240);
		this.scheduleUpdate();
	},
	update:function(){
		
	}
});