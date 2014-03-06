var losing = cc.Sprite.extend({
	
	ctor: function()
	{
		this._super();
		this.initWithFile(sGameOver);
		this.setPosition(new cc.Point(background.width/2, background.height/2) );
		cc.log("no arquivo losing");
	}
	
});