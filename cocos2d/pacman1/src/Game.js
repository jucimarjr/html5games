var background = null;
var layer = null;
var spriteLives = [];

var lifeGame = {
	label: "LIVES", 
	life: 2,
	positionX: 50
};

var scoreGame = {
	label: "SCORE", 
	score: 0
};

var gameLayer = cc.Layer.extend({

	gameOver: null,
	score: 0,
	
	init:function()
	{
		background = cc.Director.getInstance().getWinSizeInPixels();
		livePositionX = 30;
		this.addLives();
		this.addScore();
		this.schedule(this.onClick, 3);
		this.scheduleUpdate();		
		return this;
	},
	
	onClick:function (dt) {
    	cc.log("tentando remover vidas");		
		if (lifeGame.life != 0){
			this.removeLives();		
			this.plusScore();
		}
			
    },
	
	addLives: function()
	{
		lifeGame.label = cc.LabelTTF.create("LIVES", "VectorB", 20);
		lifeGame.label.setPosition( new cc.Point(background.width/2 + 200, background.height - 460) );
		this.addChild( lifeGame.label );	
		
		for(var i = 0; i < lifeGame.life; i++)
		{									
			spriteLives[i] = cc.Sprite.create(sPacLife);			
			spriteLives[i].setPosition(background.width/2 + 200 + lifeGame.positionX, background.height - 460);
            this.addChild( spriteLives[i] );
			lifeGame.positionX += 20;
		}
	},
	
	removeLives: function()
	{		
		lifeGame.life--;
		this.removeChild( spriteLives[lifeGame.life] );	
		if (lifeGame.life == 0){		
			this.gameOver = new losing();				        
	        this.addChild( this.gameOver );			
		}		
	},
	
	addScore:function()
	{
		if (scoreGame.score == 0){
			cc.log("adicionando o primeiro score");
			scoreGame.label = cc.LabelTTF.create(scoreGame.label, "VectorB", 20);		
			scoreGame.label.setPosition(new cc.Point(background.width/2 - 300, background.height - 460) );
			this.addChild( scoreGame.label );	
		}
		
		scoreGame.score = cc.LabelTTF.create(this.score, "VectorB", 20);		
		scoreGame.score.setPosition(new cc.Point(background.width/2 - 250, background.height - 460) );
		this.addChild( scoreGame.score );	
    },
	
	plusScore: function()
	{		
		this.score += 10;
		scoreGame.score.setString(this.score);
	}
	
});

var game = cc.Scene.extend({
    onEnter:function()
	{
        this._super();
        var layer = new gameLayer();
        layer.init();
        this.addChild(layer);
    }
});