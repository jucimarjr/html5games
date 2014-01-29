var Powerup = cc.Sprite.extend({
	i:0,
	ctor:function(){
		this._super();
		this.i = Math.ceil(Math.random()*6);
		var src = "assets/PW"+this.i+".png";
		this.initWithFile(src);
		var pos = (Math.random()*400) + 200;
		this.setPosition(pos, 474);
		this.scheduleUpdate();
	},
	update:function(){
		this.setPositionY(this.getPositionY() - 2);
		if(this.getPositionY() < 9){
			this.remove();
		}
	},
	remove:function(){
		this.unscheduleAllCallbacks();
		this.setPositionY(900);
		this.removeFromParentAndCleanup(true);
	}
});
