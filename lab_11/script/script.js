var c = document.getElementById("myCanvas");

c.width = window.innerWidth;
c.height = window.innerHeight - 145;

var context = c.getContext("2d");
context.font = "15px Arial";

// ----------------------------------------------------------------------------------------------------

const boxWidth = 0.05 * c.width;
const boxHeight = 0.05 * c.height;
const colors = ['red', 'orange', 'green', 'yellow', 'blue']

const numberOfBoxesInLineX = c.width / boxWidth;
const numberOfBoxesInLineY = c.height / (3 * boxHeight);

var tmpX = 0, tmpY = 0;
var boxes = [];

prepareBoxes();

// ----------------------------------------------------------------------------------------------------

function mainFunctionOfGame() {
    drawBoxes();

    clearInterval(timer);
    timer = setInterval(doJob, interval_time);
}

context.beginPath();
mainFunctionOfGame();
// document.onkeydown = move;
