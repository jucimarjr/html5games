var Config = {
	global: {
		animationVelocity: 8,
		isMobile: navigator.userAgent.match(/Android/i)
					|| navigator.userAgent.match(/webOS/i)
					|| navigator.userAgent.match(/iPhone/i)
					|| navigator.userAgent.match(/iPad/i)
					|| navigator.userAgent.match(/iPod/i)
					|| navigator.userAgent.match(/BlackBerry/i)
					|| navigator.userAgent.match(/Windows Phone/i),
		screen: {
			width: 800,
			height: 600,
			resize: function (game) {
				"use strict";
				if (navigator.userAgent.match(/Android/i)
						|| navigator.userAgent.match(/webOS/i)
						|| navigator.userAgent.match(/iPhone/i)
						|| navigator.userAgent.match(/iPad/i)
						|| navigator.userAgent.match(/iPod/i)
						|| navigator.userAgent.match(/BlackBerry/i)
						|| navigator.userAgent.match(/Windows Phone/i)) {
					game.scale.setExactFit();
					game.scale.refresh();
					document.getElementById('everything').style.width = '100%';
				}
			}
		},
		key: {
			nextScreen: Phaser.Keyboard.ENTER,
			annoying: [Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.DOWN]
		}
	}
};

Config.audio = {
		dir: {
			music: {
				backgroundGame: 'assets/audios/hyrulecastle.mp3',
				slap: 'assets/audios/slap-soundmaster13-49669815.mp3',
				zombieDead: 'assets/audios/ugh.mp3'
			}
		}
};

Config.ludusSplash = {
		dir: 'assets/screenshots/SplashTeam_800-600.png',
		x: 0,
		y: 0,
		dim: 0,
		time: {
			dim: 2000,
			nextState: 4000
	}
};

//SponsorSplash
Config.sponsorSplash = {
	dir: 'assets/images/SponsorSplash_960-600.png',
	x: 0,
	y: 0,
	dim: 0,
	time: {
		dim: 2000,
		nextState: 4000
	}
};

Config.gameSplash = {
		dir: {
			background: 'assets/images/GameSplash_960-600.png',
			progressBar: 'assets/images/ProgressBar_960-30.png'
		},
		progressBar: {
			x: 0,
			y: 560
		},
		x: 0,
		y: 0,
		time: {
			nextState: 3000
	}
};
