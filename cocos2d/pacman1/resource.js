
//var dirSounds = "Sounds/";
var dirScreenShots = "res/screenshots/";
var dirImages = "res/images/";
var dirFonts = "res/fonts/";
var dirSpriteSheets = "res/spritesheets/";
var dirTiledMap = "res/tiledmap";

/*
 
var s_bgMusic = dirSounds + "background-music.mp3";
var s_bgMusicOgg = dirSounds + "background-music.ogg";
var s_bgMusicCaf = dirSounds + "background-music.caf";
 
var s_shootEffect = dirSounds + "pew-pew-lei.mp3";
var s_shootEffectOgg = dirSounds + "pew-pew-lei.ogg";
var s_shootEffectWav = dirSounds + "pew-pew-lei.wav";
*/
var sJoystixFont = dirFonts + "Joystix.ttf";

var sSplashTeam = dirScreenShots + "splashTeam_800-480.png";
var sSplashGame = dirScreenShots + "splashGame_800-480.png";
var sMenuTitle = dirImages + "menuTitle_595-135.png";
var ssGame = dirSpriteSheets + "GameSpriteSheet.png";
var ssGameList = dirSpriteSheets + "GameSpriteSheet.plist";
var sPacLife = dirImages + "pac_left_middle_16-16.png";
var sGameOver = dirImages + "game_over_217-32.png";
var tMap = dirTiledMap + "background2.tmx";
var sMap = dirImages + "background_empty_227-247.png";
 
var resource = [
    /*
 
    {type:"sound", src:s_bgMusic},
    {type:"sound", src:s_bgMusicOgg},
    {type:"sound", src:s_bgMusicCaf},
 
    {type:"sound", src:s_shootEffect},
    {type:"sound", src:s_shootEffectOgg},
    {type:"sound", src:s_shootEffectWav},
    */
    {fontName: "fontName", src: [{src: sJoystixFont, type: "truetype"}]},
    
    {type: "image", src: sSplashTeam},									  
	{type: "image", src: sSplashGame},
	{type: "image", src: sMenuTitle},
	
	{type: "image", src: ssGame},
    {type: "plist", src: ssGameList},
	
	{type: "image", src: sPacLife},
	{type: "image", src: sGameOver},
	
	{type: 'tmx', src: tMap},
	{type: 'image', src: sMap},
    
 
];