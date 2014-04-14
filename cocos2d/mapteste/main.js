var cocos2dApp = cc.Application.extend({
	config:document['ccConfig'],
	ctor:function (scene) {
		this._super();
		this.startScene = scene;
		cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
		cc.initDebugSetting();
		cc.setup(this.config['tag']);
		cc.AppController.shareAppController().didFinishLaunchingWithOptions();
	},
	applicationDidFinishLaunching:function () {
		// initialize director
		var director = cc.Director.getInstance();
		
		// turn on display FPS
		director.setDisplayStats(this.config['showFPS']);
		
		// set FPS. the default value is 1.0/60 if you don’t call this
		director.setAnimationInterval(1.0 / this.config['frameRate']);
	
	//load resources
		cc.Loader.preload(
				[{ type: "image", src: "assets/tiles/tiles.png" },
				 { type: "tilemap", src: "assets/tiles/map.tmx" },
				 { type: "image", src: "assets/tiles/iso-test.png" },
				 { type: "tilemap", src: "assets/tiles/iso-test.tmx" }],
				function () {
					cc.Director.getInstance().runWithScene(new this.startScene());
				}, 
		this);
		
		return true;
	}
});

var myApp = new cocos2dApp(GameScene);