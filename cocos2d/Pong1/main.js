/**
 * Created by aluno on 14/11/13.
 */

var cocos2dApp = cc.Application.extend({
    config:document.ccConfig,
    ctor:function (scene) {
        this._super();
        this.startScene = scene; 
        cc.setup(this.config.tag);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        cc.AudioEngine.getInstance().init();
        
    },
    applicationDidFinishLaunching:function () {
        var director = cc.Director.getInstance();
        cc.EGLView.getInstance().setDesignResolutionSize(800, 480, cc.RESOLUTION_POLICY.SHOW_ALL);//Ajusta o tamanho do canvas a tela.
        director.setAnimationInterval(1.0 / this.config["frameRate"]);
        director.runWithScene(new this.startScene());
        return true;
    }
});
var myApp = new cocos2dApp();
