
var MenuLayer = cc.Layer.extend({
	
    init:function()
    {
        this._super();
        var tocando = 1;
        var tela = cc.Director.getInstance().getWinSizeInPixels();
        /*
        var fundo = cc.Sprite.create("res/black_screen.png");
        fundo.setPositionX(tela.width/2);
        fundo.setPositionY(tela.height/2);
        this.addChild(fundo);*/
        
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
        
        btPlay = cc.Sprite.create("res/images/buttons/btnPlay_155-34.png");
        btPlaySelected = cc.Sprite.create("res/images/buttons/btnPlaySelected_155-34.png");
        btHighScore = cc.Sprite.create("res/images/buttons/btnScore_356-34.png");
        btHighScoreSelected = cc.Sprite.create("res/images/buttons/btnScoreSelected_365-34.png");
        btHowToPlay = cc.Sprite.create("res/images/buttons/btnHowToPlay_381-34.png");
        btHowToPLaySelected = cc.Sprite.create("res/images/buttons/btnHowToPlaySelected_381-34.png");
        btCredits = cc.Sprite.create("res/images/buttons/btnCredits_256-34.png");
        btCreditsSelected = cc.Sprite.create("res/images/buttons/btnCreditsSelected_256-34.png");
      
      
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
        menu.setPosition(400,340);
      
        this.addChild(menu);
        

        
        return this;	
    },

    onPlay: function () {
//      if (cc.AudioEngine.getInstance().isMusicPlaying())
//          cc.AudioEngine.getInstance().stopMusic();
      cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameScene()));
    },

    onCredits: function () {
      cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new Credits()));
    },

    onHowToPlay: function () {
      cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new HowToPlay()));
    },
    onHighScore: function () {
      //cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new ComoJogarScene()));
    },
    onMenuCallback:function (sender) {
//  	if (cc.AudioEngine.getInstance().isMusicPlaying()){
//  		cc.AudioEngine.getInstance().stopMusic();
//  	}else{
//  		cc.AudioEngine.getInstance().playMusic("Som/GhostBusters_.mp3", true);
//  	}
          
  	
      cc.log("Callback called");
  }



});

var Menu = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layerMenu = new MenuLayer();
        layerMenu.init();
        this.addChild(layerMenu);
    }
});
