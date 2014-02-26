var HighScores = cc.Sprite.extend({
    highScore: null,	
    
    ctor: function()
    {
        this._super();		
		this.addHighScore(); 	
        
		cc.AudioEngine.getInstance().playMusic("res/audios/AsteroidsTonelo.mp3", true);
    },
    addHighScore:function(){
		this.highScore = cc.LabelTTF.create("ENTER YOUR NAME", "SFAtarianSystem", 50);
		this.highScore.setColor( new cc.Color3B(255, 255, 255) );
        this.highScore.setPosition(new cc.Point(screen.width/2, screen.height/2) );
        layer.addChild(this.highScore);				
    }	
});