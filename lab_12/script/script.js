var c = document.getElementById("myCanvas");

c.width = window.innerWidth;
c.height = window.innerHeight - 145;

var context = c.getContext("2d");
context.font = "15px Arial";

// ----------------------------------------------------------------------------------------------------

var player = {
    width: 0.1 * c.width,
    height: 0.02 * c.height,
    positionX: (c.width / 2) - (0.1 * c.width / 2),
    positionY: c.height - 40 
};

// ----------------------------------------------------------------------------------------------------

var box = {
    width: 0.05 * c.width,
    height: 0.05 * c.height,
};

const numberOfBoxesInLineX = c.width / box.width;
const numberOfBoxesInLineY = c.height / (3 * box.height);
const boxes = [];

var tmpX = 0, tmpY = 0;

prepareBoxes();

var ball = { 
    radius: 10, 
    bounce: 1, 
    positionX: player.positionX + (player.width / 2), 
    positionY: player.positionY - (player.height / 2), 
    velX: 0.8, 
    velY: -1 
};


// ----------------------------------------------------------------------------------------------------

function mainFunctionOfGame() {
    drawBackground();
    drawBoxes();
    drawPlayer();
    drawBall();
    updateBallPosition();
    clearInterval(timer);
    timer = setInterval(mainFunctionOfGame, INTERVAL_TIME);
}

context.beginPath();
mainFunctionOfGame();
document.onkeydown = move;
