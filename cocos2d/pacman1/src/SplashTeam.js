var splashTeamLayer = cc.Layer.extend({
    init: function(){
        this._super();
        
        var background = cc.Director.getInstance().getWinSizeInPixels();
        var screen =  cc.Sprite.create(sSplashTeam);
        screen.setPositionX(background.width/2);
        screen.setPositionY(background.height/2);
        this.addChild(screen);
        
        this.schedule(this.onClick, 3);
        
        return this;
    },
	
	onClick:function (dt) {
    	var scene = cc.Scene.create();
		scene.addChild(new splashGame());
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.5,scene));
    }
});

var splashTeam = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new splashTeamLayer();
        layer.init();
        this.addChild(layer);
    }
});
