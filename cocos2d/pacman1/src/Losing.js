var losing = cc.Sprite.extend({
	
	ctor: function()
	{
		this._super();
		this.initWithFile(sGameOver);
		this.setPosition(new cc.Point(screen.width/2, screen.height/2) );
		cc.log("no arquivo losing");
	}
	
});