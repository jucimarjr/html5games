var background = null;
var layer = null;
var spriteLives = [];

var lifeGame = {
	label: null, 
	life: 2,
	positionX: 50
};

var gameLayer = cc.Layer.extend({

	gameOver: null,
	
	init:function()
	{
		background = cc.Director.getInstance().getWinSizeInPixels();
		livePositionX = 30;
		this.addLives();
		this.schedule(this.onClick, 3);
		this.scheduleUpdate();
		return this;
	},
	
	onClick:function (dt) {
    	cc.log("tentando remover vidas");
		if (lifeGame.life != 0)
			this.removeLives();		
    },
	
	addLives: function()
	{
		lifeGame.label = cc.LabelTTF.create("LIVES", "VectorB", 20);
		lifeGame.label.setPosition( new cc.Point(background.width/2, background.height - 460) );
		this.addChild( lifeGame.label );	
		
		for(var i = 0; i < lifeGame.life; i++)
		{									
			spriteLives[i] = cc.Sprite.create(sPacLife);			
			spriteLives[i].setPosition(background.width/2 + lifeGame.positionX, background.height - 460);
            this.addChild( spriteLives[i] );
			lifeGame.positionX += 20;
		}
	},
	
	removeLives: function()
	{		
		cc.log("em removeLives");
		lifeGame.life--;
		this.removeChild( spriteLives[lifeGame.life] );	
		if (lifeGame.life == 0){		
			this.gameOver = new losing();				        
			cc.log("no if zero" + this.gameOver );
	        this.addChild( this.gameOver );
			cc.log("depois de adicionar");
		}		
	},
	
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