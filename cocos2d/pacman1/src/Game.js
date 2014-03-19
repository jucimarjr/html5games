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
		
		var map = cc.TMXTiledMap.create(tMap);		  
		map.setPosition(cc.p(113, 50));
		this.addChild(map);		
		
		this.setKeyboardEnabled(true);
				
		this._pac = new Pac();
        map.addChild(this._pac);
        this._pac.setPosition(new cc.Point(screen.width/2 - 110, screen.height/2 - 205));        
        
		lifeGame.life = 2;
		scoreGame.score = 0;
		screen = cc.Director.getInstance().getWinSizeInPixels();
		livePositionX = 30;
						
		this._blinky = new Ghost();
		this._blinky.setGhost("blinky");
        map.addChild(this._blinky);
        this._blinky.setPosition(new cc.Point(screen.width / 2 - 115, screen.height / 2 + 50));
        this._blinky.setAnimation("blinky", "up", SPRITE_SIZE, 2, "up");        
        this._blinky.getAnimation("up");  
        //this._blinky.setDynamicPosition("up");

		this._pinky = new Ghost();
		this._pinky.setGhost("pinky");
        map.addChild(this._pinky);
        this._pinky.setPosition(new cc.Point(screen.width / 2 - 118, screen.height / 2 - 10));
        this._pinky.setAnimation("pinky", "up", SPRITE_SIZE, 2, "up");        
        this._pinky.getAnimation("up");
        //this._pinky.setDynamicPosition("left");
        
        this._inkey = new Ghost();
		this._inkey.setGhost("inkey");
        map.addChild(this._inkey);
        this._inkey.setPosition(new cc.Point(screen.width / 2 - 150, screen.height / 2 - 10));
        this._inkey.setAnimation("inkey", "down", SPRITE_SIZE, 2, "down");        
        this._inkey.getAnimation("down");
        //this._inkey.setDynamicPosition("down");
        
        this._clyde = new Ghost();
		this._clyde.setGhost("clyde");
        map.addChild(this._clyde);
        this._clyde.setPosition(new cc.Point(screen.width / 2 - 86, screen.height / 2 - 10));
        this._clyde.setAnimation("clyde", "up", SPRITE_SIZE, 2, "up");        
        this._clyde.getAnimation("up");
        //this._clyde.setDynamicPosition();
			
		this.addLives();
		this.addScore();
		//this.schedule(this.onClick, 3);
		this.scheduleUpdate();			
	
		return true;
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
		lifeGame.label.setPosition( new cc.Point(screen.width/2 + 200, screen.height/2 - 350) );
		this.addChild( lifeGame.label );	
		
		for(var i = 0; i < lifeGame.life; i++)
		{									
			spriteLives[i] = cc.Sprite.create(sPacLife);			
			spriteLives[i].setPosition(screen.width/2 + 200 + lifeGame.positionX, screen.height/2 - 350);
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
		scoreGame.label.setPosition(new cc.Point(screen.width/2 - 300, screen.height/2 - 350) );
		this.addChild( scoreGame.label );	

    },	
	
	plusScore: function()
	{		
		scoreGame.score += 10;
		scoreGame.label.setString(scoreGame.text + " " + scoreGame.score);
	},	   
	
	onKeyDown:function (e) {		
        LG.KEYS[e] = true;    
        this._pac.setPositionOnScreen(e);  
    },

    onKeyUp:function (e) {
        LG.KEYS[e] = false;
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