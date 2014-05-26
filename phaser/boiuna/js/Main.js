/*global Config, State, Phaser*/

var game = new Phaser.Game(Config.global.screen.width, Config.global.screen.height, Phaser.Auto, 'game');
game.state.add('LudusSplash', State.LudusSplash);
game.state.add('SponsorSplash', State.SponsorSplash);
game.state.add('GameSplash', State.GameSplash);
game.state.add('StoryBefore', State.StoryBefore);
game.state.add('StoryAfter', State.StoryAfter);
game.state.add('Menu', State.Menu);
game.state.add('HowToPlayMobile', State.HowToPlayMobile);
game.state.add('HowToPlayDesktop', State.HowToPlayDesktop);
game.state.add('Credits', State.Credits);
game.state.add('Game', State.Game);
game.state.add('VictoryScreen', State.VictoryScreen);
game.state.add('DefeatScreen', State.DefeatScreen);
game.state.start('LudusSplash');