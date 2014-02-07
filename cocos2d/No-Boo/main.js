var cocos2dApp = cc.Application.extend({
    config: document['ccConfig'],
    ctor: function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        cc.setup(this.config['tag']);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();

    },
    applicationDidFinishLaunching: function () {
        // initialize director
        var director = cc.Director.getInstance();

        // turn on display FPS
        director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you donÕt call this
        director.setAnimationInterval(1.0 / this.config['frameRate']);

        //load resources
        cc.Loader.preload(
        		[
                 { type: "image", src: "assets/vermelho.png" },
                 { type: "plist", src: "assets/vermelho.plist" },
                 { type: "image", src: "assets/verde.png" },
                 { type: "plist", src: "assets/verde.plist" },
                 { type: "image", src: "assets/laranja.png" },
                 { type: "plist", src: "assets/laranja.plist" },
                 { type: "image", src: "assets/lilas.png" },
                 { type: "plist", src: "assets/lilas.plist" },
                 { type: "image", src: "assets/cinza.png" },
                 { type: "plist", src: "assets/cinza.plist" },
                 { type: "image", src: "assets/pac.png" },
                 { type: "plist", src: "assets/pac.plist" },
                 { type: "image", src: "assets/pacFail.png" },
                 { type: "plist", src: "assets/pacFail.plist" },

                 {
                     fontName: "GhoulySolidRegular",
                     src: [
                              { src: "fonts/Halloween.ttf", type: "truetype" }
                     ]
                 },

                 {
                     fontName: "Grinched",
                    src: [
                        { src: "fonts/Grinched.ttf", type: "truetype" }
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

var myApp = new cocos2dApp(SplashScene);