var background = null;
var layer = null;

var menuLayer = cc.Layer.extend({
		
	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animCache: cc.AnimationCache.getInstance(),
	
	init: function(){
		this._super();
		this.spriteFrameCache.addSpriteFrames(ssPacsList, ssPacs);		
		
		background = cc.Director.getInstance().getWinSizeInPixels();
		layer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 480);
		/*this.title = cc.Sprite.create(sMenuTitle);
		this.title.setPosition(new cc.Point(background.width/2, background.height - 70) );
        this.addChild(this.title);  */
		
		this.teste = new Pac();
		this.addChild(this.teste);
		
		
        /*
		this.createAnimations("pac", 2, "pac");
		this.teste = cc.Sprite.createWithSpriteFrameName("pacClose_98-135.png");
		this.teste.setPosition(new cc.Point(0, background.height - 70));
		this.addChild(this.teste);
		
		var animation = this.animCache.getAnimation("pac");
		animation.setRestoreOriginalFrame(true);
		this.teste.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));		
        */  
        this.play = cc.LabelTTF.create("PLAY GAME", "Joystix", background.width/30);
        this.play.setPosition(new cc.Point(background.width/2, background.height - 400));
        this.addChild(this.play);
        
        //layer.addChild(this.play);
        
        //this.addChild(layer);
        
        //this.teste.scheduleUpdate();
        
        
	},
	
	createAnimations: function (spritePrefix, maxIndex, animationName) {

        
        var animFrames = [];
        var frame;
        var str = "";
        var status = ["Open", "Close", "Open"];
        
        for (var i = 0; i <= maxIndex; i++) {
            str = spritePrefix + status[i] + "_98-135.png";
            cc.log(str);
            frame = this.spriteFrameCache.getSpriteFrame(str);            
            cc.log(frame);	
            animFrames.push(frame);
        }

        var animation = cc.Animation.create(animFrames, 0.1);
        this.animCache.addAnimation(animation, animationName);
        
		/*
		var animeFrames = [];
		animeFrames.push(this.spriteFrameCache.getSpriteFrame("pacOpen_98-135.png"));
		animeFrames.push(this.spriteFrameCache.getSpriteFrame("pacClose_98-135.png"));
		animeFrames.push(this.spriteFrameCache.getSpriteFrame("pacOpen_98-135.png"));
		
		var animation = cc.Animation.create(animeFrames, 0.1);
		this.animCache.addAnimation(animation, "shipFire");
		*/
    }
});

var menu = cc.Scene.extend({
	onEnter: function (){
		this._super();
		var layer = new menuLayer();
		layer.init();
		this.addChild(layer);
	}
});