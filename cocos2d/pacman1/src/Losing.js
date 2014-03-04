var losing = cc.Sprite.extend({
	
	ctor: function()
	{
		this._super();
		this.addGameOver();
	},
	
	addGameOver: function(){
		gameOver = cc.LabelTTF.create("GAME OVER", "fontName", 100);
		gameOver.setColor( new cc.Color3B(255, 0, 0) );
        gameOver.setPosition(new cc.Point(screen.width/2, screen.height/2) );        
	}
	
});