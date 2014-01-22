var aviso = cc.Layer.extend({
	init:function()
    {
		
        this._super();
        this.setTouchEnabled(true);
        var bg1 = cc.Sprite.create("aviso1.png");
        bg1.setPosition(400,300);
        var bg2 = cc.Sprite.create("aviso2.png");
        bg2.setPosition(400,900);
        this.addChild(bg1);
        this.addChild(bg2);
        bganim = window.setInterval(function(){
        	cc.log("mudou");
        	if(bg2.getPosition().y == 900)
        		bg2.setPosition(400,300);
        	else
        		bg2.setPosition(400,900);
        }, 500);
        
        var msg = cc.LabelTTF.create("WARNING", "Arial", 40);
        msg.setPosition(400, 300);
        msg.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        msg.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(msg);
        cc.AudioEngine.getInstance().setEffectsVolume(0.1);
        cc.AudioEngine.getInstance().playEffect("alarm",true);
        window.setTimeout(function(){
        	msg.setString("ALIENS SHIPS COMING");
        }, 3000);
        window.setTimeout(function(){
        	msg.setString("PROTECT THE CITYS");
        }, 6500);
        window.setTimeout(function(){
        	msg.setString("PREPARE THE MISSILES");
        }, 9000);
        msgtime = window.setTimeout(function(){
        	cc.Loader.preload([
            {src:"cidade.plist"},
            {src:"explosao.plist"},
            {src:"loading.plist"},
            {src:"missil.mp3"},
            {src:"bomb.mp3"}
        ],function(){
        		var scene = cc.Scene.create();
                scene.addChild(MissileCommandGame.create());
                cc.AudioEngine.getInstance().pauseAllEffects();
                clearInterval(bganim);
                clearTimeout(msgtime);
                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.5,scene));
        },this);
        }, 12000);
        return this;
    },
    onTouchesEnded:function (pTouch,pEvent){
        this.exit();
    },
    exit:function(){
    	cc.Loader.preload([
    	                   {src:"cidade.plist"},
    	                   {src:"explosao.plist"},
    	                   {src:"loading.plist"},
    	                   {src:"missil.mp3"},
    	                   {src:"bomb.mp3"}
    	               ],function(){
    	               		var scene = cc.Scene.create();
    	                       scene.addChild(MissileCommandGame.create());
    	                       cc.AudioEngine.getInstance().pauseAllEffects();
    	                       clearInterval(bganim);
    	                       clearTimeout(msgtime);
    	                       cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.5,scene));
    	               },this);
    }
});

aviso.create = function() {
    var sg = new aviso();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

aviso.scene = function () {
    var scene = cc.Scene.create();
    var layer = aviso.create();
    scene.addChild(layer, 1);
    return scene;
};