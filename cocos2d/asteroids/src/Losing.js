var LosingLayer = cc.Layer.extend({
    
    /*asteroids:[],
    score: 0,
    scoreLabel: null,*/
    gameOver: null,
    
    init: function()
    {
        this._super();

	if ('touches' in sys.capabilities)
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities)
            this.setMouseEnabled(true);

	this.addAsteroids();
	this.addScore(); 
	this.addGameOver(); 	
        
        return this;

    },
    addAsteroids: function(){
	for(i=0; i<7; i++){
	       	this.asteroids = new Asteroid("large");
        	this.addChild(this.asteroids);
        }
    },
    addScore:function(){
        scoreLabel = cc.LabelTTF.create(score, "SFAtarianSystem", 24);
	scoreLabel.setColor( new cc.Color3B(255, 255, 255) );
        scoreLabel.setPosition(new cc.Point(screen.width - 40, screen.height - 40) );
        this.addChild(scoreLabel);
    },
    addGameOver:function(){
	this.gameOver = cc.LabelTTF.create("GAME OVER", "SFAtarianSystem", 40);
	this.gameOver.setColor( new cc.Color3B(255, 255, 255) );
        this.gameOver.setPosition(new cc.Point(screen.width/2, screen.height/2) );
        this.addChild(this.gameOver);
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

var Losing = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layerLosing = new LosingLayer();
        layerLosing.init();
        this.addChild(layerLosing);
    }
});
