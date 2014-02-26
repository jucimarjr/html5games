var Losing = cc.Sprite.extend({
    //gameOver: null,	
    
    ctor: function()
    {
        this._super();		
		cc.AudioEngine.getInstance().playMusic("res/audios/AsteroidsTonelo.mp3", true);
		
		this.addGameOver(); 			
		cc.log("losing");		
    },
    addGameOver:function(){
		gameOver = cc.LabelTTF.create("GAME OVER", "SFAtarianSystem", 100);
		gameOver.setColor( new cc.Color3B(255, 255, 255) );
        gameOver.setPosition(new cc.Point(screen.width/2, screen.height/2) );
        layer.addChild(gameOver);					
    }	
});