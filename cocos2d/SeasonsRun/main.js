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
				[{ type: "image", src: "res/Runner/Runner0.png" },
                 { type: "plist", src: "res/Runner/Runner0.plist" },
                 { type: "image", src: "res/Maps/sun.png" },
                 { type: "image", src: "res/Maps/background_summer2.png" },
                 { type: "image", src: "res/Maps/coqueiro.png" },
                 { type: "image", src: "res/Maps/tiles2.png" },
                 { type: "image", src: "res/images/box.png" },
			     { type: "tilemap", src: "res/Maps/map0.tmx" },
                 { type: "tilemap", src: "res/Maps/map1.tmx" },
                 { type: "tilemap", src: "res/Maps/map2.tmx" },
                 { type: "tilemap", src: "res/Maps/map3.tmx" },
                 { type: "tilemap", src: "res/Maps/map4.tmx" },
                 { type: "tilemap", src: "res/Maps/map5.tmx" },
                 { type: "tilemap", src: "res/Maps/background_summer.tmx" },
                 { type: "tilemap", src: "res/Maps/background_summer_clouds.tmx" },
                 {
                     fontName: "Zion",
                     src: [
                              { src: "res/fonts/Zion.ttf", type: "truetype" }
                     ]
                 },
                 {
                     fontName: "PipeDream",
                     src: [
                              { src: "res/fonts/PipeDream.ttf", type: "truetype" }
                     ]
                 },
				],
				function () {
					cc.Director.getInstance().runWithScene(new this.startScene());
				}, 
		this);
		
		return true;
	}
});

var myApp = new cocos2dApp(SplashLudus);