var HighScoresLayer = cc.Layer.extend({

	title: null,

    init: function()
    {
        this._super();

	if ('touches' in sys.capabilities)
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities)
            this.setMouseEnabled(true);
		
		this.title = cc.LabelTTF.create("HIGH SCORES", "SFAtarianSystem", 70);
		this.title.setColor( new cc.Color3B(255, 255, 255) );
		this.title.setPosition(new cc.Point(screen.width/2, screen.height - 50) );
        this.addChild(this.title);    
		
		//this.showHighScore();
		
        return this;

    },
	showHighScore: function () {
		this.localStorage = cc.LabelTTF.create(localStorage["nameScore1"], "SFAtarianSystem", 70);
		this.localStorage.setColor( new cc.Color3B(255, 255, 255) );
		this.localStorage.setPosition(new cc.Point(screen.width / 2 - 150, 100 ) );
        this.addChild(this.localStorage);        
	},
    onMouseUp: function (event) {
        this.backMenu();
    },
    onTouchesEnded: function (touches, event) {
        this.backMenu();
    },
    backMenu: function (dt) {
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.0, new Menu()));
    }
});

var HighScores = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layerHighScores = new HighScoresLayer();
        layerHighScores.init();
        this.addChild(layerHighScores);
    }
});
