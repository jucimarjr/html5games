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
				[{ type: "image", src: "Imagens/barra_vermelha.png" },
                 { type: "plist", src: "barra_vermelha.plist" },
                 { type: "image", src: "Imagens/barra_verde.png" },
                 { type: "plist", src: "barra_verde.plist" },
                 { type: "image", src: "Imagens/barra_azul.png" },
                 { type: "plist", src: "barra_azul.plist" },
				],
				function () {
				    cc.Director.getInstance().runWithScene(new this.startScene());
				},
		this);

        return true;
    }
});

var myApp = new cocos2dApp(SplashScene);