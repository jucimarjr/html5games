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
        		 {type: "image", src: "res/screenshots/splashTeam_800-480.png"},

                 {type: "image", src: "res/spritesheets/TitlesSpriteSheet.png"},
                 {type: "image", src: "res/spritesheets/TitlesSpriteSheet.plist"},
        		 
        		 {type: "image", src: "res/spritesheets/GameSpriteSheet.png"},
                 {type: "plist", src: "res/spritesheets/GameSpriteSheet.plist"},
                 {type: "image", src: "res/spritesheets/ButtonsSpriteSheet.png"},
                 {type: "plist", src: "res/spritesheets/ButtonsSpriteSheet.plist"},
				 

                 {
                     fontName: "SFAtarianSystem",
                     src: [{src: "res/fonts/SFAtarianSystem.ttf", type: "truetype"}]
                 },

                 {
                    fontName: "VectorB",
                    src: [{src: "res/fonts/VectorB.ttf", type: "truetype"}]
                },
               ],
               
               function () {
				    cc.Director.getInstance().runWithScene(new this.startScene());
        	   }, this);

        return true;
    }
});

var myApp = new cocos2dApp(Menu);
//var myApp = new cocos2dApp(GameScene);
