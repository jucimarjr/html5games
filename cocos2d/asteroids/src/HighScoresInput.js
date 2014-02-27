var HighScoresInput = cc.Sprite.extend({
    highScoreInput: null,	
    
    ctor: function()
    {
        this._super();		
		this.addHighScore(); 	
        
		cc.AudioEngine.getInstance().playMusic("res/audios/AsteroidsTonelo.mp3", true);
    },
    addHighScore:function(){
		this.highScoreInput = cc.LabelTTF.create("ENTER YOUR NAME", "SFAtarianSystem", 50);
		this.highScoreInput.setColor( new cc.Color3B(255, 255, 255) );
        this.highScoreInput.setPosition(new cc.Point(screen.width/2, screen.height/2) );
        layer.addChild(this.highScoreInput);		

		
		var input = cc.TextFieldTTF.create("<click here for input>",cc.size(screen.width/2, screen.height/2), cc.TEXT_ALIGNMENT_RIGHT,"Arial", 32);
		input.attachWithIME();
		input.setString("OK");		
		
		//var input = cc.TextFieldDelegate() ;
		layer.addChild(input);	
    }	
});