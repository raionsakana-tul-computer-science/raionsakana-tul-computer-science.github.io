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

generateMaze();

context.beginPath();
mainFunctionOfGame();
document.onkeydown = move;

