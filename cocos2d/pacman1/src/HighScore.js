var highScoreLayer = cc.Layer.extend({
	
	init: function(){
		this._super();		
		
		if ('touches' in sys.capabilities)
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities)
            this.setMouseEnabled(true);
		
		background = cc.Director.getInstance().getWinSizeInPixels();
		
		this.title = cc.Sprite.create(sMenuTitle);
		this.title.setPosition(new cc.Point(background.width/2, background.height - 70) );
        this.addChild(this.title);
		        
        this.play = cc.LabelTTF.create("YOUR SCORE", "fontName", background.width/30);
        this.play .setColor( new cc.Color3B(255, 255, 51) );
        this.play.setPosition(new cc.Point(background.width/2, background.height - 180));
        this.addChild(this.play);
        
        this.score = cc.LabelTTF.create(scoreGame.score , "fontName", background.width/30);
        this.score.setPosition(new cc.Point(background.width/2, background.height - 250));
        this.addChild(this.score);
        
        this.back = cc.LabelTTF.create("PLAY AGAIN?", "fontName", background.width/30);
        this.back.setPosition(new cc.Point(background.width/2, background.height - 420));
        this.addChild(this.back);
                
        this.scheduleUpdate();
	},
	
	onMouseUp: function (event) {
        this.backMenu();
    },
    
    backMenu: function (dt) {
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.0, new menu()));
    }
});

var highScore = cc.Scene.extend({
	onEnter: function (){
		this._super();
		var layer = new highScoreLayer();
		layer.init();
		this.addChild(layer);
	}
});