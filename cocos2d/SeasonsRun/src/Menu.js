var MenuLayer = cc.Layer.extend({
	title: null,
	
    init:function()
    {
        this._super();
        var tocando = 1;
        var screen = cc.Director.getInstance().getWinSizeInPixels();
		
        //Inicia pontuação
        if (typeof localStorage["scores"] == "undefined") {
            var lapTime = new Date();
            lapTime.setMinutes(0);
            lapTime.setSeconds(0);
            lapTime.setMilliseconds(0);
            localStorage["bestTime"] = lapTime;
            localStorage["bestScore"] = 0;
            localStorage["scores"] = "ok";
        }

		this.title = cc.LabelTTF.create("SEASONS RUN", "SFAtarianSystem", 70);
		this.title.setColor( new cc.Color3B(0, 0, 0) );
		this.title.setPosition(new cc.Point(screen.width/2, screen.height - 50) );
        this.addChild(this.title);        
        
        btSP = cc.Sprite.create("res/images/buttons/newBtnPlay_155-34.png");
        btSPSelected = cc.Sprite.create("res/images/buttons/btnPlaySelected_155-34.png");
        btMP = cc.Sprite.create("res/images/buttons/newBtnPlay_155-34.png");
        btMPSelected = cc.Sprite.create("res/images/buttons/btnPlaySelected_155-34.png");
        btCredits = cc.Sprite.create("res/images/buttons/newBtnCredits_256-34.png");
        btCreditsSelected = cc.Sprite.create("res/images/buttons/btnCreditsSelected_256-34.png");
                    
        var sPlay = cc.MenuItemSprite.create(btSP, btSPSelected, null, 'onSPlay', this);
        var mPlay = cc.MenuItemSprite.create(btMP, btMPSelected, null, 'onMPlay', this);
        mPlay.setPosition(0,-60);
        var credits = cc.MenuItemSprite.create(btCredits, btCreditsSelected, null, 'onCredits', this);
        credits.setPosition(0, -120);

        var menu = cc.Menu.create(sPlay,mPlay,credits);
        menu.setPosition(400,340);
      
        var label = cc.LabelTTF.create("Best: " + localStorage["bestScore"] + "m", "GhoulySolidRegular", 40);
        label.setPosition(new cc.Point(screen.width - 130, 30));
        label.setColor(new cc.Color4B(0, 0, 0, 255));
        this.addChild(label);

        this.addChild(menu);
        
        return this;	
    },

    onSPlay: function () {
        localStorage["gameType"] = "single";
        cc.Director.getInstance().replaceScene(cc.TransitionFadeBL.create(1.2, new GameScene()));
    },

    onMPlay: function () {
        localStorage["gameType"] = "multi";
        cc.Director.getInstance().replaceScene(cc.TransitionFadeBL.create(1.2, new GameScene()));
    },

    onCredits: function () {
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new Credits()));
    },

    onHowToPlay: function () {
      cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new HowToPlay()));
    },
    onHighScore: function () {
      cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new HighScores()));
    },

});

Menu = cc.Scene.extend({
    onEnter:function(){
        this._super();

		var layerMenu = new MenuLayer();
        layerMenu.init();
        this.addChild(layerMenu, 1);

        var layer = new GameLayer();
        layer.init();
        this.addChild(layer,0);

    }
});