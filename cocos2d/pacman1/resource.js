
//var dirSounds = "Sounds/";
var dirScreenShots = "res/screenshots/";
var dirImages = "res/images/";
var dirFonts = "res/fonts/";
var dirSpriteSheets = "res/spritesheets/";

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
var ssPacs = dirSpriteSheets + "PacsSpriteSheet.png";
var ssPacsList = dirSpriteSheets + "PacsSpriteSheet.plist";
 
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
	
	{type: "image", src: ssPacs},
    {type: "plist", src: ssPacsList}
    
 
];