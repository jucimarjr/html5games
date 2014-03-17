var screen = null;
var layer = null;
var spriteLives = [];

var lifeGame = {
	label: "LIVES", 
	life: 2,
	positionX: 50
};

var scoreGame = {
	label: null, 
	score: 0,
	text: "SCORE"
};

var LG = {KEYS: []};

var gameLayer = cc.Layer.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	gameOver: null,
	_pac: null,	
	_blinky: null,
	_pinky: null,
	_inkey: null,
	_clyde: null,
	
	init:function()
	{
		this._super();
		/*if ('keyboard' in sys.capabilities)
	    	this.setKeyboardEnabled(true);
		else if('touches' in sys.capabilities)
	        this.setTouchEnabled(true);
		*/
		
		
		var map = cc.TMXTiledMap.create(tMap);		
		this.addChild(map);		
		
        
		
		
	    		
		this.setKeyboardEnabled(true);
		
		lifeGame.life = 2;
		scoreGame.score = 0;
		screen = cc.Director.getInstance().getWinSizeInPixels();
		livePositionX = 30;
		
		cc.log("chamando game");
		
			
		this.addLives();
		this.addScore();
		//this.schedule(this.onClick, 3);
		//this.scheduleUpdate();	
		
		this.schedule(this.update);
	
		return true;
	},
	
	update: function()
	{
		//this._pac.setPositionOnScreen("left");	
		var i = Math.floor((Math.random()*4)+1);
		var position = ["right", "left", "up", "down"];  
		
	
		/*var j = Math.floor((Math.random()*4)+1);
		this._pinky.update("pinky", position[j]);
		
		var k= Math.floor((Math.random()*4)+1);
		this._inkey.update("inkey", position[k]);

		var l = Math.floor((Math.random()*4)+1);
		this._clyde.update("_clyde", position[l]);*/
		
		
	},
	
	onClick:function (dt) {    	
		if (lifeGame.life != 0){
			this.removeLives();		
			this.plusScore();
		}
			
    },
	
	addLives: function()
	{
		lifeGame.label = cc.LabelTTF.create("LIVES", "fontName", 20);
		lifeGame.label.setPosition( new cc.Point(screen.width/2 + 200, screen.height/2 - 330) );
		this.addChild( lifeGame.label );	
		
		for(var i = 0; i < lifeGame.life; i++)
		{									
			spriteLives[i] = cc.Sprite.create(sPacLife);			
			spriteLives[i].setPosition(screen.width/2 + 200 + lifeGame.positionX, screen.height/2 - 330);
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
			cc.Director.getInstance().replaceScene(cc.TransitionFade.create(10,new highScore()));
		}		
	},
	
	addScore:function()
	{			
		scoreGame.label = cc.LabelTTF.create(scoreGame.text + " " + scoreGame.score, "fontName", 20);		
		scoreGame.label.setPosition(new cc.Point(screen.width/2 - 300, screen.height/2 - 330) );
		this.addChild( scoreGame.label );	

    },	
	
	plusScore: function()
	{		
		scoreGame.score += 10;
		scoreGame.label.setString(scoreGame.text + " " + scoreGame.score);
	},	   

    onKeyUp: function (e) {
        LG.KEYS[e] = true;
    	
    },
    
    onKeyDown: function (e) {
        //LG.KEYS[e] = false;
       
        this._pac.setPositionOnScreen(e);        
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