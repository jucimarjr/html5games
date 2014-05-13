var Select = {};

ship = 1;
shoot = 1;
color = 'blue';
damage = 5;
impulse = 1;

Select = function (game) {
    this.game = game;
    this.btnGroup = null;
};

Select.prototype.preload = function(){
	game.load.atlas('sprites', 'assets/spritesheets/sprites.png', 'assets/spritesheets/sprites.json');
};

Select.prototype.create = function() {
	this.btnGroup =  this.game.add.group();
	this.game.world.setBounds(0, 0, 800, 480);
    var fadeout;
    
    this.txt1 = this.game.add.text(20, 5 , "Select Your Ship: "+ship, {
        font: "28px Vector Battle", fill: "#ffffff" , align: "right"
    });
    
    this.txt2 = this.game.add.text(20, 155 , "Select the color of your ship: "+color, {
        font: "28px Vector Battle", fill: "#ffffff" , align: "right"
    });
    
    this.txt3 = this.game.add.text(20, 285 , "Select Your Shoot Type: "+shoot, {
        font: "28px Vector Battle", fill: "#ffffff" , align: "right"
    });
    
    this.btnGroup.add(this.txt1);
    this.btnGroup.add(this.txt2);
    this.btnGroup.add(this.txt3);
	
	var h = 65;
	
    var btnNave1 = this.game.add.button(50, h, 'sprites',
    function(){ this.selectNave(1); }, this);
    btnNave1.setFrames("btn-nave2.png","btn-nave2.png");
    btnNave1.anchor.x = 0.5;
	this.btnGroup.add(btnNave1);
	
	var btnNave2 = this.game.add.button(120, h, 'sprites',
    function(){ this.selectNave(2); }, this);
    btnNave2.setFrames("btn-nave1.png","btn-nave1.png");
    btnNave2.anchor.x = 0.5;
	this.btnGroup.add(btnNave2);
	
	var btnNave3 = this.game.add.button(190, h, 'sprites',
    function(){ this.selectNave(3); }, this);
    btnNave3.setFrames("btn-nave3.png","btn-nave3.png");
    btnNave3.anchor.x = 0.5;
	this.btnGroup.add(btnNave3);
	
	var btnNave4 = this.game.add.button(260, h, 'sprites',
    function(){ this.selectNave(4); }, this);
    btnNave4.setFrames("btn-nave4.png","btn-nave4.png");
    btnNave4.anchor.x = 0.5;
	this.btnGroup.add(btnNave4);
	
	var btnNave5 = this.game.add.button(330, h, 'sprites',
    function(){ this.selectNave(5); }, this);
    btnNave5.setFrames("btn-nave5.png","btn-nave5.png");
    btnNave5.anchor.x = 0.5;
	this.btnGroup.add(btnNave5);
	
	var btnNave6 = this.game.add.button(400, h, 'sprites',
    function(){ this.selectNave(6); }, this);
    btnNave6.setFrames("btn-nave6.png","btn-nave6.png");
    btnNave6.anchor.x = 0.5;
	this.btnGroup.add(btnNave6);
	
	var btnNave7 = this.game.add.button(470, h, 'sprites',
    function(){ this.selectNave(7); }, this);
    btnNave7.setFrames("btn-nave7.png","btn-nave7.png");
    btnNave7.anchor.x = 0.5;
	this.btnGroup.add(btnNave7);
	
	var btnNave8 = this.game.add.button(540, h, 'sprites',
    function(){ this.selectNave(8); }, this);
    btnNave8.setFrames("btn-nave8.png","btn-nave8.png");
    btnNave8.anchor.x = 0.5;
	this.btnGroup.add(btnNave8);
	
	h = 215;
	
	var btnBlue = this.game.add.button(50, h, 'sprites',
    function(){this.selectColor('blue');}, this);
    btnBlue.setFrames("btn-blue.png","btn-blue.png");
    btnBlue.anchor.x = 0.5;
	this.btnGroup.add(btnBlue);
	
	var btnGreen = this.game.add.button(120, h, 'sprites',
    function(){this.selectColor('green');}, this);
    btnGreen.setFrames("btn-green.png","btn-green.png");
    btnGreen.anchor.x = 0.5;
	this.btnGroup.add(btnGreen);
	
	var btnPurple = this.game.add.button(190, h, 'sprites',
    function(){this.selectColor('purple');}, this);
    btnPurple.setFrames("btn-purple.png","btn-purple.png");
    btnPurple.anchor.x = 0.5;
	this.btnGroup.add(btnPurple);
	
	var btnRed = this.game.add.button(260, h, 'sprites',
    function(){this.selectColor('red');}, this);
    btnRed.setFrames("btn-red.png","btn-red.png");
    btnRed.anchor.x = 0.5;
	this.btnGroup.add(btnRed);
	
	var btnOrange = this.game.add.button(330, h, 'sprites',
    function(){this.selectColor('orange');}, this);
    btnOrange.setFrames("btn-orange.png","btn-orange.png");
    btnOrange.anchor.x = 0.5;
	this.btnGroup.add(btnOrange);
	
	var btnWhite = this.game.add.button(400, h, 'sprites',
    function(){this.selectColor('white');}, this);
    btnWhite.setFrames("btn-white.png","btn-white.png");
    btnWhite.anchor.x = 0.5;
	this.btnGroup.add(btnWhite);
	
	h = 345;
	
	var btnBullet1 = this.game.add.button(50, h, 'sprites',
    function(){ this.selectBullet(1); }, this);
    btnBullet1.setFrames("btn-bullets1.png","btn-bullets1.png");
    btnBullet1.anchor.x = 0.5;
	this.btnGroup.add(btnBullet1);
	
	var btnBullet2 = this.game.add.button(120, h, 'sprites',
    function(){ this.selectBullet(2); }, this);
    btnBullet2.setFrames("btn-bullets2.png","btn-bullets2.png");
    btnBullet2.anchor.x = 0.5;
	this.btnGroup.add(btnBullet2);
	
	var btnBullet3 = this.game.add.button(190, h, 'sprites',
    function(){ this.selectBullet(3); }, this);
    btnBullet3.setFrames("btn-bullets3.png","btn-bullets3.png");
    btnBullet3.anchor.x = 0.5;
	this.btnGroup.add(btnBullet3);
	
	var btnBullet4 = this.game.add.button(260, h, 'sprites',
    function(){ this.selectBullet(4); }, this);
    btnBullet4.setFrames("btn-impact1.png","btn-impact1.png");
    btnBullet4.anchor.x = 0.5;
	this.btnGroup.add(btnBullet4);
	
	var btnBullet5 = this.game.add.button(330, h, 'sprites',
    function(){ this.selectBullet(5); }, this);
    btnBullet5.setFrames("btn-impact2.png","btn-impact2.png");
    btnBullet5.anchor.x = 0.5;
	this.btnGroup.add(btnBullet5);
	
	var btnBullet6 = this.game.add.button(400, h, 'sprites',
    function(){ this.selectBullet(6); }, this);
    btnBullet6.setFrames("btn-impact3.png","btn-impact3.png");
    btnBullet6.anchor.x = 0.5;
	this.btnGroup.add(btnBullet6);
	
	var btnBullet7 = this.game.add.button(470, h, 'sprites',
    function(){ this.selectBullet(7); }, this);
    btnBullet7.setFrames("btn-laser1.png","btn-laser1.png");
    btnBullet7.anchor.x = 0.5;
	this.btnGroup.add(btnBullet7);
	
	var btnBullet8 = this.game.add.button(540, h, 'sprites',
    function(){ this.selectBullet(8); }, this);
    btnBullet8.setFrames("btn-rodando.png","btn-rodando.png");
    btnBullet8.anchor.x = 0.5;
	this.btnGroup.add(btnBullet8);
	
	var btnBullet9 = this.game.add.button(610, h, 'sprites',
    function(){ this.selectBullet(9); }, this);
    btnBullet9.setFrames("btn-shoot1.png","btn-shoot1.png");
    btnBullet9.anchor.x = 0.5;
	this.btnGroup.add(btnBullet9);
	
	var btnBullet10 = this.game.add.button(680, h, 'sprites',
    function(){ this.selectBullet(10); }, this);
    btnBullet10.setFrames("btn-shoot2.png","btn-shoot2.png");
    btnBullet10.anchor.x = 0.5;
	this.btnGroup.add(btnBullet10);
	
	var btnBullet11 = this.game.add.button(750, h, 'sprites',
    function(){ this.selectBullet(11); }, this);
    btnBullet11.setFrames("btn-shoot3.png","btn-shoot3.png");
    btnBullet11.anchor.x = 0.5;
	this.btnGroup.add(btnBullet11);
	
	var btnPlay = game.add.button(game.world.centerX + 15, game.world.centerY + 200, 'botoes',
    function(){ this.play(); }, this);
    btnPlay.setFrames("btnPlay_155-34.png", 'btnPlaySelected_155-34.png');
    btnPlay.anchor.x = 0.5;
    this.btnGroup.add(btnPlay);
	
};

Select.prototype.play = function () {
    this.fadeOut();
    fadeout.onComplete.add(function () {
    	var msg = this.game.add.sprite(0,0,'msg');
    	msg.alpha = 0;
    	msg.anchor.setTo(0.5,0.5);
    	msg.x = game.width/2;
    	msg.y = game.height/2;
    	var fadein = game.add.tween(msg).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, true);
    	fadein.onComplete.add(function () {
    		var fade = game.add.tween(msg).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, true);
        	fade.onComplete.add(function () {
        		game.state.start('game', Game);
            });
        });
    	
    });
};


Select.prototype.fadeOut = function () {
    fadeout = game.add.tween(this.btnGroup).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
};

Select.prototype.selectNave = function(i){
	ship = i;
	this.txt1.content = "Selected Ship: "+ship;
};

Select.prototype.selectBullet = function(i){
	shoot = i;
	switch (i){
	case 1:
		damage = 5;
		impulse=1;
	break;
	case 2:
		damage = 3;
		impulse=2;
	break;
	case 3:
		damage = 2;
		impulse=1;
	break;
	case 4:
		damage = 0.2;
		impulse=0.2;
	break;
	case 5:
		damage = 0.2;
		impulse=0.2;
	break;
	case 6:
		damage = 0.2;
		impulse=0.2;
	break;
	case 7:
		damage = 0.5;
		impulse=0.1;
	break;
	case 8:
		damage = 2;
		impulse=2;
	break;
	case 9:
		damage = 4;
		impulse=2;
	break;
	case 10:
		damage = 2;
		impulse=1;
	break;
	case 11:
		damage = 1;
		impulse=2;
	break;
	}
	this.txt3.content = "Selected Shoot: "+shoot;
};

Select.prototype.selectColor = function(c){
	color = c;
	this.txt2.content = "Selected Color: "+color;
};