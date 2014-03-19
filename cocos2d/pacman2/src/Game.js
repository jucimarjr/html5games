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
		
		if( 'touches' in sys.capabilities )
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities )
            this.setMouseEnabled(true);
		
		this.map = cc.TMXTiledMap.create(tMap);
		this.mapLayer = this.map.getLayer('tiles');
		this.tilesArray = this.mapLayer.getTiles();
		cc.log(this.mapLayer.getTiles());
		
		
		this.addChild(this.map);		
		
		this.setKeyboardEnabled(true);
				
		this._pac = new Pac();
		this.addChild(this._pac);
        //map.addChild(this._pac);
        this._pac.setPosition(new cc.Point(screen.width/2 - 350, screen.height - 350));
        //this._pac.scheduleUpdate();
        /*this._pac.setAnimation("pac", "right", SPRITE_SIZE, 2, "right");        
        this._pac.getAnimation("right");    
        this._pac.setDynamicPosition();
		*/
        
		lifeGame.life = 2;
		scoreGame.score = 0;
		screen = cc.Director.getInstance().getWinSizeInPixels();
		livePositionX = 30;
		
		
		
		this._blinky = new Ghost();
		this._blinky.setGhost("blinky");
        //map.addChild(this._blinky);
		this.addChild(this._blinky);
        this._blinky.setPosition(new cc.Point(screen.width/2, screen.height/2));
        this._blinky.setAnimation("blinky", "up", SPRITE_SIZE, 2, "up");        
        this._blinky.getAnimation("up");  
        this._blinky.setDynamicPosition("up");

		this._pinky = new Ghost();
		this._pinky.setGhost("pinky");
        //map.addChild(this._pinky);
		this.addChild(this._pinky);
        this._pinky.setPosition(new cc.Point(screen.width - 30, screen.height/2 - 110));
        this._pinky.setAnimation("pinky", "left", SPRITE_SIZE, 2, "left");        
        this._pinky.getAnimation("left");
        this._pinky.setDynamicPosition("left");
        
        this._inkey = new Ghost();
		this._inkey.setGhost("inkey");
        //map.addChild(this._inkey);
		this.addChild(this._inkey);
        this._inkey.setPosition(new cc.Point(screen.width/2 - 50, screen.height/2 - 50));
        this._inkey.setAnimation("inkey", "down", SPRITE_SIZE, 2, "down");        
        this._inkey.getAnimation("down");
        this._inkey.setDynamicPosition("down");
        
        this._clyde = new Ghost();
		this._clyde.setGhost("clyde");
        //map.addChild(this._clyde);
		this.addChild(this._clyde);
        this._clyde.setPosition(new cc.Point(screen.width/2 - 400, screen.height - 20));
        this._clyde.setAnimation("clyde", "right", SPRITE_SIZE, 2, "right");        
        this._clyde.getAnimation("right");
        this._clyde.setDynamicPosition();
			
		this.addLives();
		this.addScore();
		//this.schedule(this.onClick, 3);
		this.scheduleUpdate();	
		
		//this.schedule(this.update);
	
		return true;
	},
	
	update:function(dt){
		var mapWidth = this.map.getMapSize().width;
        var mapHeight = this.map.getMapSize().height;
        var tileWidth = this.map.getTileSize().width;
        var tileHeight = this.map.getTileSize().height;
        var collidableLayer = this.map.getLayer("tiles");
        var i, j;
        for (i = 0; i < mapWidth; i++) {
            for (j = 0; j < mapHeight; j++) {
                var tileCoord = new cc.Point(i, j);
                var gid = collidableLayer.getTileGIDAt(tileCoord);
                if (gid) {
                    var tileXPositon = i * tileWidth;
                    var tileYPosition = (mapHeight * tileHeight)
                            - ((j + 1) * tileHeight);
                    var react = cc.rect(tileXPositon, tileYPosition,
                            tileWidth, tileHeight);
                    
                    if(cc.rectIntersectsRect(react, this._pac.getBoundingBoxToWorld())){
                    	if(this._pac.xVelocity != 0){
                    		this._pac.xVelocity = 0;
                    	}else if(this._pac.yVelocity != 0){
                    		this._pac.yVelocity = 0;
                    	}
                    }
                }
            }
        }
    },
    
    collide:function (a, b) {
        var pos1 = a.getPosition();
        var pos2 = b.getPosition();

        var aRect = a.collideRect(pos1);
        var bRect = b.collideRect(pos2);
        return cc.rectIntersectsRect(aRect, bRect);
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
	
	onKeyDown:function (e) {
		//cc.log(e);
        LG.KEYS[e] = true;        
        if (LG.KEYS[cc.KEY.right]){
			/*
    		this.xSpeed = this.velocityX*Math.sin(Math.PI/180*this.angle);
        	this.ySpeed = this.velocityY*Math.cos(Math.PI/180*this.angle);
        	this.setPosition(new cc.Point(this.getPosition().x + this.xSpeed,this.getPosition().y + this.ySpeed));
        	*/
			//cc.log('right;');
			this._pac.setAnimation("pac", "right", SPRITE_SIZE, 2, "right");        
            this._pac.getAnimation("right"); 
            this._pac.setDirection('right');
    	}
    	if (LG.KEYS[cc.KEY.left]){
    		this._pac.setAnimation("pac", "left", SPRITE_SIZE, 2, "left");        
            this._pac.getAnimation("left"); 
            this._pac.setDirection('left');
    	}
    	if (LG.KEYS[cc.KEY.up]){
    		this._pac.setAnimation("pac", "up", SPRITE_SIZE, 2, "up");        
            this._pac.getAnimation("up"); 
            this._pac.setDirection('up');
    	}
    	if (LG.KEYS[cc.KEY.down]){
    		this._pac.setAnimation("pac", "down", SPRITE_SIZE, 2, "down");        
            this._pac.getAnimation("down"); 
            this._pac.setDirection('down');
    	}
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