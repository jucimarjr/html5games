HowToPlay = function (game) {
    this.game = game;
    this.background = null;
    this.countFrames;
	this.btnBack = null;
	this.fadeout;
	this.btnProximo;
	this.btnBack;
	this.spriteHowToPlayScene;
};

HowToPlay.prototype.create = function()
{
	this.countFrames = 0;
	this.background = this.game.add.sprite(0, 0,'screenBlack');
	this.spriteHowtoPlay = this.game.add.sprite(300,100,'howTo');
	this.spriteHowToPlayScene = this.game.add.sprite(300,143,'htp1');
	
	this.btnProximo = game.add.button(545,460, 'buttonsNext',
    	    function(){ this.ProximoFrame(); }, this);
    	    this.btnProximo.setFrames('proximoSelecionado.png','proximo.png');
    	    this.btnProximo.anchor.x = 0.5;
    		    		
    this.btnBack = game.add.button(375, 460, 'buttons',
    	    function(){ this.goMenu(); }, this);
    	    this.btnBack.setFrames(btVoltar,btVoltar);
    	    this.btnBack.anchor.x = 0.5;
};

HowToPlay.prototype.goMenu = function()
{
	console.log("goMenu");
	this.fadeout = game.add.tween(this.btnBack).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
	this.fadeout.onComplete.add(function () 
			{
				this.game.state.start('menu', Menu);
			},this);
};



HowToPlay.prototype.ProximoFrame = function()
{
	console.log("action");
	this.countFrames +=1;
	if (this.countFrames == 1)
	{
		this.spriteHowToPlayScene = this.game.add.sprite(300,143,'htp2');
	}
	else if (this.countFrames > 1)
	{
		this.game.state.start('menu', Menu);
	}
};