var screen = null;
var layer = null;

var menuLayer = cc.Layer.extend({
		
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),
	_pac: null,
	_blinky: null,
	_pinky: null,
	_inkey: null,
	_clyde: null,
	_blinky2: null,
	
	init: function(){
		this._super();
		this.spriteFrameCache.addSpriteFrames(ssGameList, ssGame);
		
		if( 'touches' in sys.capabilities )
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities )
            this.setMouseEnabled(true);
		
		screen = cc.Director.getInstance().getWinSizeInPixels();
		//layer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 480);	
		//var layer = cc.LayerColor.create(cc.c4b(255, 255, 0, 100));
		//this.addChild(layer);
		
		
		        
        
		
		/*this._blinky2 = cc.Sprite.create("res/images/blinky_right_four_32-32.png");
		this.addChild(this._blinky2);
		this._blinky2.setPosition(cc.p(60, screen.height / 4));
		
		*/
		
		/*
		var action = cc.Sequence.create(
	            cc.MoveBy.create(2, cc.p(screen.width - 80, 0))
	            //cc.MoveBy.create(2, cc.p(screen.width - 80, 0)).reverse(),
	            //cc.DelayTime.create(0.10),
	            //cc.FadeOut.create(1.0)
	        );
		var action = cc.Sequence.create(
				cc.MoveBy.create(2.0, cc.p(200, 0)),
	            cc.CallFunc.create(this.removeFromParent, this._blinky2, true)
	    );

		this._blinky2.runAction(action);
		*/
		
		/*var move1 = cc.MoveBy.create(3, cc.p(250, 0));
        var move2 = cc.MoveBy.create(3, cc.p(0, 50));
        var tog1 = cc.ToggleVisibility.create();
        var tog2 = cc.ToggleVisibility.create();
        var seq = cc.Sequence.create(move1, tog1, move2, tog2, move1.reverse());
        var action = cc.Repeat.create(
            cc.Sequence.create(seq, seq.reverse()), 3
        );


        // Test:
        //   Also test that the reverse of Hide is Show, and vice-versa
        this._blinky2.runAction(action);

        var move_tamara = cc.MoveBy.create(1, cc.p(100, 0));
        var move_tamara2 = cc.MoveBy.create(1, cc.p(50, 0));
        var hide = cc.Hide.create();
        var seq_tamara = cc.Sequence.create(move_tamara, hide, move_tamara2);
        var seq_back = seq_tamara.reverse();
        this._blinky3 = cc.Sprite.create("res/images/blinky_left_four_32-32.png");
		this.addChild(this._blinky3);
		this._blinky3.setPosition(cc.p(250, screen.height / 4));
		
        this._blinky3.runAction(cc.Sequence.create(seq_tamara, seq_back));*/
        
		/*this._blinky2 = new Ghost();
		this._blinky2.setGhost("blinky");
        this.addChild(this._blinky2);
        this._blinky2.setPosition(new cc.Point(screen.width/2 - 450, screen.height - 350));
        this._blinky2.setAnimation("blinky", "right", SPRITE_SIZE, 2, "right");
        var teste = this._blinky2.getAnimation("right");
        var action = cc.Animate.create(teste);
        this._blinky2.runAction(cc.Sequence.create(action, action.reverse()));
		*/
		

        this._pac = new Pac();
        this.addChild(this._pac);
        this._pac.setPosition(new cc.Point(screen.width/2 - 350, screen.height - 350));
        this._pac.setAnimation("pac", "right", SPRITE_SIZE, 2, "right");        
        var animation = this._pac.getAnimation("right");    
        this._pac.setDynamicPosition();
        
		this._blinky = new Ghost();
		this._blinky.setGhost("blinky");
        this.addChild(this._blinky);
        this._blinky.setPosition(new cc.Point(screen.width/2 - 450, screen.height - 350));
        this._blinky.setAnimation("blinky", "right", SPRITE_SIZE, 2, "right");        
        this._blinky.getAnimation("right");  
        this._blinky.setDynamicPosition();

		this._pinky = new Ghost();
		this._pinky.setGhost("pinky");
        this.addChild(this._pinky);
        this._pinky.setPosition(new cc.Point(screen.width/2 - 490, screen.height - 350));
        this._pinky.setAnimation("pinky", "right", SPRITE_SIZE, 2, "right");        
        this._pinky.getAnimation("right");
        this._pinky.setDynamicPosition();
        
        this._inkey = new Ghost();
		this._inkey.setGhost("inkey");
        this.addChild(this._inkey);
        this._inkey.setPosition(new cc.Point(screen.width/2 - 530, screen.height - 350));
        this._inkey.setAnimation("inkey", "right", SPRITE_SIZE, 2, "right");        
        this._inkey.getAnimation("right");
        this._inkey.setDynamicPosition();
        
        this._clyde = new Ghost();
		this._clyde.setGhost("clyde");
        this.addChild(this._clyde);
        this._clyde.setPosition(new cc.Point(screen.width/2 - 570, screen.height - 350));
        this._clyde.setAnimation("clyde", "right", SPRITE_SIZE, 2, "right");        
        this._clyde.getAnimation("right");
        this._clyde.setDynamicPosition();
        
        
        this.schedule(this.update);
		
		
        cc.MenuItemFont.setFontName("fontName");
        
        var menuItemCredits = new cc.MenuItemFont.create("CREDITS","credits",this);
        var menuItemPlay = new cc.MenuItemFont.create("PLAY GAME","play",this);
        var menuItemHowToPlay = new cc.MenuItemFont.create("HOW TO PLAY","howToPlay",this);

        menuItemCredits.setPosition(new cc.Point(screen.width/2-200,screen.height/2 - 100));
        menuItemPlay.setPosition(new cc.Point(screen.width/2,screen.height/2 - 100));
        menuItemHowToPlay.setPosition(new cc.Point(screen.width/2+250,screen.height/2 - 100));

        var menu = cc.Menu.create(menuItemCredits, menuItemPlay, menuItemHowToPlay);
        menu.setPosition(new cc.Point(0,-160));

        this.addChild(menu);
        
        this.schedule(this.bringTitle, 1);
        
	},
	
	update: function()
	{
		this._pac.setDynamicPosition();
		//this._blinky.setDynamicPosition();
		//this._pinky.setDynamicPosition();
		//this._inkey.setDynamicPosition();
		//this._clyde.setDynamicPosition();		
	},
	
	bringTitle: function (dt) {
		this.removeChild(this.pac);
		this.title = cc.Sprite.create(sMenuTitle);
		this.title.setPosition(new cc.Point(screen.width/2, screen.height - 70) );
        this.addChild(this.title);
        
    },
    
    credits:function () {
    	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new credits()));
    },
    
    play:function () {
    	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new game()));
    },
    
    howToPlay:function () {
    	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new howToPlay()));
    }
});

var menu = cc.Scene.extend({
	onEnter: function (){
		this._super();
		var layer = new menuLayer();
		layer.init();
		this.addChild(layer);
	}
});