(function () {
    var d = document;
    var c = {
        menuType:"canvas",
        COCOS2D_DEBUG:2,
        box2d:false,
        chipmunk: false,
        showFPS:false,
        frameRate:60,
        tag:"game",
        engineDir:"../cocos2d/",
        appFiles:['game.js', 'menu.js', 'main.js', 'barra.js', 
				  'ball.js', 'credits.js', 'controls.js', 'win.js', 'lose.js']
    };
    window.addEventListener('DOMContentLoaded', function () {
        var s = d.createElement("script");
        s.src = c.engineDir + "jsloader.js";
        d.body.appendChild(s);
        s.c = c;
        s.id = "cocos2d-html5";
        document.ccConfig = c;
    });
})();