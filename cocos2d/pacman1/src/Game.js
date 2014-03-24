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

/* Box 2D */
/*var world = null;
var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2World = Box2D.Dynamics.b2World,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2Listener = Box2D.Dynamics.b2ContactListener;
	*/

var objects = null;

var gameLayer = cc.Layer.extend({
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	gameOver: null,
	_pac: null,	
	_blinky: null,
	_pinky: null,
	_inkey: null,
	_clyde: null,
	_score: [],
	map: null,
	
	init:function()
	{
		this._super();
		
		/* Configuracao do mundo Box 2D */
		//world = new b2World(new b2Vec2(0, 0), true);
		
		this.setKeyboardEnabled(true);
		
		map = cc.TMXTiledMap.create(tMap);		  
		//map.setPosition(cc.p(113, 50));
		this.addChild(map, 0, 1);		
		

		var group = map.getObjectGroup("Camada de Objetos");
        objects = group.getObjects();
						
        var decisionGroup = map.getObjectGroup("Camada de Decisao");
        decisionObjects = decisionGroup.getObjects();
        
        scoreObjects = map.getObjectGroup("Score").getObjects();
        
		this._pac = new Pac();
        map.addChild(this._pac);
		//this.addChild(this._pac);
        this._pac.setPosition(new cc.Point(screen.width/2 - 110, screen.height/2 - 210)); 
        this._pac.setAnimation("pac", "left", SPRITE_SIZE, 2, "left");        
        this._pac.getAnimation("left");  
        //LG.KEYS[cc.KEY.left] = true;
        //this._pac.setPositionOnScreen(LG.KEYS[e]);
        //this._pac.setDynamicPosition('left');
        
		//lifeGame.life = 2;
		//scoreGame.score = 0;
		screen = cc.Director.getInstance().getWinSizeInPixels();
		livePositionX = 30;
		/*				
		this._blinky = new Ghost();
		this._blinky.setGhost("blinky");
        map.addChild(this._blinky);
		//this.addChild(this._blinky);
        this._blinky.setPosition(new cc.Point(screen.width / 2 - 115, screen.height / 2 + 50));
        this._blinky.setAnimation("blinky", "up", SPRITE_SIZE, 2, "up");        
        this._blinky.getAnimation("up");  
        this._blinky.setPositionOnScreen("blinky", "right");
        */
        //this._blinky.setDynamicPosition("up");

		/*this._pinky = new Ghost();
		this._pinky.setGhost("pinky");
        map.addChild(this._pinky);
		//this.addChild(this._pinky);
        this._pinky.setPosition(new cc.Point(screen.width / 2 - 118, screen.height / 2 - 10));
        this._pinky.setAnimation("pinky", "up", SPRITE_SIZE, 2, "up");        
        this._pinky.getAnimation("up");
        //this._pinky.setDynamicPosition("left");
        //this._pinky.setPositionOnScreen("pinky");
        
        this._inkey = new Ghost();
		this._inkey.setGhost("inkey");
        map.addChild(this._inkey);
		//this.addChild(this._inkey);
        this._inkey.setPosition(new cc.Point(screen.width / 2 - 150, screen.height / 2 - 10));
        this._inkey.setAnimation("inkey", "up", SPRITE_SIZE, 2, "up");        
        this._inkey.getAnimation("up");
        //this._inkey.setDynamicPosition("down");
        //this._inkey.setPositionOnScreen("inkey");
        
        this._clyde = new Ghost();
		this._clyde.setGhost("clyde");
        map.addChild(this._clyde);
		//this.addChild(this._clyde);
        this._clyde.setPosition(new cc.Point(screen.width / 2 - 86, screen.height / 2 - 10));
        this._clyde.setAnimation("clyde", "up", SPRITE_SIZE, 2, "up");        
        this._clyde.getAnimation("up");
        //this._clyde.setDynamicPosition();
        //this._clyde.setPositionOnScreen("clyde");
		*/
		if (lifeGame.life == 2){
			this.addLives();
			this.addScore();
		}
		
		this.fillScore();
		//this.schedule(this.onClick, 3);
		this.scheduleUpdate();			
	
		return true;
	},
	
	update: function(){				
		this.verifiyCollisionBetweenPacScore();
		this.verifyCollisionBetweenPacMap();
		this.verifyCollisionBetweenPacGhost();	
		this.verifiyGhostDirection();								
	},	
	
	draw:function () {              
         for (var i = 0; i < objects.length; i++) {
            var dict = objects[i];
            if (!dict)
                break;

            var x = dict["x"];
            var y = dict["y"];
            var width = dict["width"];
            var height = dict["height"];

            cc.renderContext.lineWidth = 3;
            cc.renderContext.strokeStyle = "#ffffff";

            cc.drawingUtil.drawLine(cc.p(x, y), cc.p((x + width), y));
            cc.drawingUtil.drawLine(cc.p((x + width), y), cc.p((x + width), (y + height)));
            cc.drawingUtil.drawLine(cc.p((x + width), (y + height)), cc.p(x, (y + height)));
            cc.drawingUtil.drawLine(cc.p(x, (y + height)), cc.p(x, y));

            cc.renderContext.lineWidth = 1;
        }

    },
	
	addLives: function()
	{
		lifeGame.label = cc.LabelTTF.create("LIVES", "fontName", 20);
		lifeGame.label.setPosition( new cc.Point(screen.width/2 + 200, screen.height/2 - 350) );
		this.addChild( lifeGame.label );	
		cc.log(lifeGame.life);
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
		if (lifeGame.life != 0){					
			this.init();				
		}	
		else{
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
    },
	
	verifyCollisionBetweenPacMap: function(){
		for (var i = 0; i < objects.length; i++) {
            var dict = objects[i];
            if (!dict)
                break;

            var x = dict["x"];
            var y = dict["y"];
            var width = dict["width"];
            var height = dict["height"];
            
            
            point1 = cc.p(x, y);
            point2 = cc.p(width, height);
                        
                /*
            var react = cc.rect(x, y,
                        width, height);
                
            if(cc.rectIntersectsRect(react, this._pac.getBoundingBoxToWorld())){
            	cc.log("colidiu colidiu colidiu colidiu colidiu colidiu colidiu colidiu");
            	if(this._pac.xVelocity != 0){
            		this._pac.xVelocity = 0;
                }else if(this._pac.yVelocity != 0){
                	this._pac.yVelocity = 0;
                }
            }
            
            */
            
            
            
                        
            cc.renderContext.lineWidth = 3;
            cc.renderContext.strokeStyle = "#ffffff";

            cc.drawingUtil.drawLine(cc.p(x, y), cc.p(x + width, y));
            cc.drawingUtil.drawLine(cc.p(x + width, y), cc.p(x + width, y + height));
            cc.drawingUtil.drawLine(cc.p(x + width, y + height), cc.p(x, y + height));
            cc.drawingUtil.drawLine(cc.p(x, y + height), cc.p(x, y));

            cc.renderContext.lineWidth = 1;
									
			var rect1 = cc.rect(x, y, width, height);			
			
			var b = this._pac.getContentSize();
			var q = this._pac.getPosition();
			//var rect2 = cc.rect(q.x, q.y, b.width, b.height);
			var rect2 = cc.rect(q.x - b.width/2, q.y - b.height/2, b.width, b.height);
									
			if (cc.rectIntersectsRect(rect1, rect2)){	
				cc.log("colidiu colidiu colidiu colidiu");
				if(this._pac.xVelocity != 0){
					this._pac.xVelocity = 0;
                }else if(this._pac.yVelocity != 0){
					this._pac.yVelocity = 0;
                }							
				this._pac.stopAllActions();
			}			

        }
	},
	
	verifyCollisionBetweenPacGhost: function(){
		/*var a = this._blinky.getContentSize();
		var p = this._blinky.getPosition();
		var rect1 = cc.rect(p.x - a.width / 2, p.y - a.height / 2, a.width, a.height);
		
		var b = this._pac.getContentSize();
		var q = this._pac.getPosition();
		var rect2 = cc.rect(q.x - b.width / 2, q.y - b.height / 2, b.width, b.height);			
					
		if (cc.rectIntersectsRect(rect1, rect2)){							
			//this._pac.setDieAnimation();        
	        //this._pac.getAnimation("die"); 
			this.removeChild(this._pac);
	        this.removeLives();
		}*/
	},
	
	verifiyGhostDirection: function(){
		for (var i = 0; i < decisionObjects.length; i++) {
            var dict = decisionObjects[i];
            if (!dict)
                break;

            var x = dict["x"];
            var y = dict["y"];
            var width = dict["width"];
            var height = dict["height"];                               
            
            var point1 = cc.p(x, y);
            var point2 = cc.p(width, height);                      
            
            cc.renderContext.lineWidth = 3;
            cc.renderContext.strokeStyle = "#ffffff";

            cc.drawingUtil.drawLine(cc.p(x, y), cc.p(x + width, y));
            cc.drawingUtil.drawLine(cc.p(x + width, y), cc.p(x + width, y + height));
            cc.drawingUtil.drawLine(cc.p(x + width, y + height), cc.p(x, y + height));
            cc.drawingUtil.drawLine(cc.p(x, y + height), cc.p(x, y));

            cc.renderContext.lineWidth = 1;
									
			var rect1 = cc.rect(point1.x, point1.y, point2.width, point2.height);			
			
			/*var b = this._blinky.getContentSize();
			var q = this._blinky.getPosition();
			var rect2 = cc.rect(q.x - b.width / 2, q.y - b.height / 2, b.width, b.height);			
									
			if (cc.rectIntersectsRect(rect1, rect2)){	
				cc.log("colidiu ghost com parede colidiu ghost com parede colidiu ghost com parede colidiu ghost com parede");
				this._blinky.setPositionOnScreen("blinky", "up");							
			}				*/

        }
	},
	
	fillScore: function(){		
		for (var i = 0; i < scoreObjects.length; i++) {
            var dict = scoreObjects[i];
            if (!dict)
                break;

            var x = dict["x"];
            var y = dict["y"];            
            
            var point = cc.p(x, y);                                              											
			
			this._score[i] = cc.Sprite.create("res/images/score_6-4.png");
			map.addChild(this._score[i]);	        
	        this._score[i].setPosition(point);						
        }

	},	
	
	verifiyCollisionBetweenPacScore: function(){								
		for (var i = 0; i < this._score.length; i++) {
            this._score[i];
           
            var x = this._score[i].getPosition().x;
            var y = this._score[i].getPosition().y;       			
            var width = this._score[i].getContentSize().width;
            var height = this._score[i].getContentSize().height;                     
			var rect1 = cc.rect(x, y, width, height);				
    		
    		var b = this._pac.getContentSize();
    		var q = this._pac.getPosition();    		
			var rect2 = cc.rect(q.x - b.width/2, q.y - b.height/2, b.width, b.height);
    		if (cc.rectIntersectsRect(rect1, rect2)){										
    			map.removeChild(this._score[i]);
    			this._score[i].setPosition(-900,-900);
    			this.plusScore();
    		}									        	        			
        }
    },
	
	/*
	createBody: function ( position, shape, object, type, physics, group) {

        var bodyDef = new b2BodyDef();
		
		if (type == "dynamic")
			bodyDef.type = b2Body.b2_dynamicBody;

		if (type == "static")
			bodyDef.type = b2Body.b2_staticBody;
		
        
        bodyDef.position.Set( position.x / PTM_RATIO , position.y / PTM_RATIO );
        bodyDef.userData = object;
        bodyDef.bullet = true;
        
        shapeDef = new b2FixtureDef();
        shapeDef.shape = shape;
		
		if (group != null)

        shapeDef.filter.groupIndex = group;

		if (physics) {
			shapeDef.density = physics.density;
			shapeDef.friction = physics.friction;
			shapeDef.restitution = physics.restitution;
		}
		        
        var body = world.CreateBody(bodyDef);
        body.CreateFixture(shapeDef);
        
        return body;

    },*/

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