var c = document.getElementById("myCanvas");

c.width = window.innerWidth;
c.height = window.innerHeight - 145;

var context = c.getContext("2d");
context.font = "15px Arial";

// ----------------------------------------------------------------------------------------------------

const maze = [];

// ----------------------------------------------------------------------------------------------------

function mainFunctionOfGame() {
    drawBackground();
    clearInterval(timer);
    timer = setInterval(mainFunctionOfGame, INTERVAL_TIME);
}

window.addEventListener("orientationchange", function() {
    if(window.orientation == 0) // Portrait
    {
      $("button").css({"background-color":"blue"});
    }
    else // Landscape
    {
      $("button").css({"background-color":"green"});
    }
}, false);


context.beginPath();
mainFunctionOfGame();
document.onkeydown = move;

