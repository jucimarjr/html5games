var sprite = cc.Sprite.extend({
	actions:null,
	ctor:function(){
		this._super();
		this.initWithFile("assets/tiles/sprite1.png");
		return this;
	},
	openOptions:function(){
		//cc.log("open Options");
	}
});