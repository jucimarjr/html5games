
var asteroids = [];
var verify = null;

var MenuLayer = cc.Layer.extend({
	title: null,
	
    init:function()
    {
        this._super();
       // var tocando = 1;
        var screen = cc.Director.getInstance().getWinSizeInPixels();
		
		var fundo = cc.Sprite.create("res/screenshoots/Menu6_480-600.png");
        fundo.setPositionX(screen.width/2);
        fundo.setPositionY(screen.height/2);
        this.addChild(fundo);
        
		
		//this.title = cc.LabelTTF.create("ASTEROIDS", "SFAtarianSystem", 70);
		//this.title.setColor( new cc.Color3B(255, 255, 255) );
		//this.title.setPosition(new cc.Point(screen.width/2, screen.height - 50) );
        //this.addChild(this.title);        
		
		
//        var animation = cc.Animation.create();
//        for(var i = 0; i < 2; i++){
//        	var frameName = "res/nave_"+i+".png";
//        	animation.addSpriteFrameWithFile(frameName);
//        }
//      
//        animation.setDelayPerUnit(2.8/14);
//        animation.setRestoreOriginalFrame(true);
//      
//        var action_1 = cc.Animate.create(animation);
//        this.nave.runAction(cc.Sequence.create(action,action.reverse()));
        
        btPlay = cc.Sprite.create("res/buttons/btPlay_121-27.png");
        btPlaySelected = cc.Sprite.create("res/buttons/btPlaySelected_121-27.png");
        btHighScore = cc.Sprite.create("res/buttons/btHigh_341-27.png");
        btHighScoreSelected = cc.Sprite.create("res/buttons/btHighSelected_341-27.png");
        btHowToPlay = cc.Sprite.create("res/buttons/btHowTo_341-27.png");
        btHowToPLaySelected = cc.Sprite.create("res/buttons/btHowToSelected_341-27.png");
        btCredits = cc.Sprite.create("res/buttons/btCredits_215-27.png");
        btCreditsSelected = cc.Sprite.create("res/buttons/btCreditsSelected_215-27.png");
      
      
        /*btSound = cc.Sprite.create("assets/Telas/som.png");
        btSoundOff = cc.Sprite.create("assets/Telas/som_desligado.png");*/
              
        var play = cc.MenuItemSprite.create(btPlay,btPlaySelected,null,'onPlay',this);
        var highScore = cc.MenuItemSprite.create(btHighScore,btHighScoreSelected,null,'onHighScore',this);
        highScore.setPosition(0,-60);
        var howToPlay = cc.MenuItemSprite.create(btHowToPlay,btHowToPLaySelected,null,'onHowToPlay',this);
        howToPlay.setPosition(0,-120);
        var credits = cc.MenuItemSprite.create(btCredits,btCreditsSelected,null,'onCredits',this);
        credits.setPosition(0,-180);
        /*var item1 = cc.MenuItemToggle.create(
              cc.MenuItemSprite.create(btSound),
              cc.MenuItemSprite.create(btSoundOff));
          item1.setCallback(this.onMenuCallback, this);
          item1.setPosition(-290,-260)
        */
        var menu = cc.Menu.create(play,highScore,howToPlay,credits/*,item1*/);
        menu.setPosition(240,273);
      
        this.addChild(menu);
        
		
        
        return this;	
    },

   onPlay: function () {
//      if (cc.AudioEngine.getInstance().isMusicPlaying())
//          cc.AudioEngine.getInstance().stopMusic();
      cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new Game()));
    },

    onCredits: function () {
     // cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new Credits()));
    },

    onHowToPlay: function () {
      //cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new HowToPlay()));
    },
    onHighScore: function () {
      //cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new HighScores()));
    },
    //onMenuCallback:function (sender) {
//  	if (cc.AudioEngine.getInstance().isMusicPlaying()){
//  		cc.AudioEngine.getInstance().stopMusic();
//  	}else{
//  		cc.AudioEngine.getInstance().playMusic("Som/GhostBusters_.mp3", true);
//  	}
          
  	
      //cc.log("Callback called");
  //}



});

var Menu = cc.Scene.extend({
    onEnter:function(){
        this._super();
		/*
		O codigo abaixo adiciona o jogo por tras do menu
		Problema: Nao deveria aparecer a nave / vidas / pontos
		Pensar numa forma de solucinar
		Mesma ideia para telas de perdeu / ganhou.
		*/
		
		verify = false;
		
		//var gameLayer = new GameLayer();
		//gameLayer.initAsteroids();  	
    	//this.addChild(gameLayer);
        
		var layerMenu = new MenuLayer();
        layerMenu.init();
        this.addChild(layerMenu);
    }
});
