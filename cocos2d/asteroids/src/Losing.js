var Losing = cc.Sprite.extend({
    gameOver: null,	
    
    ctor: function()
    {
        this._super();		
		this.addGameOver(); 	
        
		cc.AudioEngine.getInstance().playMusic("res/audios/AsteroidsTonelo.mp3", true);
    },
    addGameOver:function(){
		this.gameOver = cc.LabelTTF.create("GAME OVER", "SFAtarianSystem", 100);
		this.gameOver.setColor( new cc.Color3B(255, 255, 255) );
        this.gameOver.setPosition(new cc.Point(screen.width/2, screen.height/2) );
        layer.addChild(this.gameOver);				
    }	
});