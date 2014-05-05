//FabioLahis
Config = {};

//Global
Config.global = {
	animationVelocity: 6,
	screen:{
		width:960, 
		height:600
	}
};

//LudusSplash
Config.ludusSplash = {
	dir:'assets/images/LudusSplash_960-600.png',
	x: 0,
	y: 0,
	millis:2000,
	nextState:4000
};

//GameSplash
Config.gameSplash = {
	dir: 'assets/images/GameSplash_960-600.png',
	x:0,
	y:0,
	millis:2000,
	nextState:4000
};

//Menu
Config.menu = {
	dir:'assets/images/MenuBackground_960-600.png',
	x:0,
	y:0,
	buttonPlay: {
		dir:'assets/spritesheets/ButtonPlay_600-95.png', 
		x: Config.global.screen.width*0.5, 
		y: Config.global.screen.height*0.4, 
		width:149, 
		height:94,
		anchor:{
			x:0.5,
			y:0.5
		}
	},
	buttonCredits:{
		dir:'assets/spritesheets/ButtonCredits_600-95.png', 
		x: Config.global.screen.width*0.5,
		y: Config.global.screen.height*0.7,
		width:149, 
		height:94,
		anchor:{
			x:0.5,
			y:0.5
		}
	},
	textStyle:{
		font: '25px Ms Sans Serif', 
		fill: '#ffffff'
	}
};

//Credits
Config.credits = {
	dir:'assets/images/Credits_960-600.png',
	x:0,
	y:0
};

//VictoryScreen
Config.victoryScreen = {
 	dir:'assets/images/VictoryScreen_960-600.png',
	x:0,
	y:0
};

//DefeatScreen
Config.defeatScreen = {
	dir: 'assets/images/DefeatScreen_960-600.png',
	x:0,
	y:0
};

//Level
Config.level = {
	dir:'assets/images/GameBackground_1920-600.png',
	x:0,
	y:0,
	worldBounds:{
		xi:0, 
		yi:0, 
		xf:1920, 
		yf:600
	}
};

//Hero
Config.hero = {
	dir:'assets/spritesheets/Hero_180-60.png',
	xi:0, 
	yi:540,
	velocity:{
		initial:{
			x:0,
			y:0
		}, 
		run:200, 
		jump:-300
	},
	gravity:9000,
	cameraMove:{
		xi:Config.level.worldBounds.xf/4, 
		xf:3*Config.level.worldBounds.xf/4
	},
	jump:{
		possible:540, 
		max:80
	},
	anchor:{
		right:{
			x:0,
			y:0
		}, 
		left:{
			x:0.5, 
			y:0
		}
	},
	scale:{
		right:{
			x:1, 
			y:1
		}, 
		left:{
			x:-1,
			y:1
		}
	},
	frame:{
		width:30,
		height:60
	}
};

//SmallDragon
Config.smallDragon = {
	dir:'assets/spritesheets/SmallDragon_90-60.png',
	xi:1920, 
	yi:0,
	velocity:150,
	scale:{
		right:{
			x:-1, 
			y:1
		}, 
		left:{
			x:1,
			y:1
		}
	},
	frame:{
		width:30,
		height:60
	}
}; 
//FabioLahis
//JacksonAntonio
//JacksonAntonio