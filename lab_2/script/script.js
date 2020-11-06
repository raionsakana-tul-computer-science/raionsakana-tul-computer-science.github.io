var stairs_step = 0;
var ball_step = 1;

var stairs_x_step = 110;
var height_step = 110;
var stairs_x = 475;
var stairs_y = 658;
var height = 110;

var ball_x = 955;
var ball_y = 180;

var run = false;
var moveLeft = true;
var availableMove = 110;

var c = document.getElementById("myCanvas");
var context = c.getContext("2d");
context.beginPath();

async function drawStairs() {
    context.fillStyle = 'brown';

    var step;
    var stairs_x = 475;
    var stairs_y = 658;
    var height = 110;

    for (step = 0; step < stairs_step; step++) {
        context.fillRect(stairs_x, stairs_y, 110, height);

        stairs_x += stairs_x_step;
        stairs_y -= height_step;
        height += height_step;
    }

    if (stairs_step < 7) {
        stairs_step++;
    }

}

function moveCircle() {
    context.beginPath();
    context.arc(ball_x, ball_y, 40, 0, 2 * Math.PI);

    if (ball_x > 100 && ball_y < 730) {
        if (moveLeft) {
            ball_x -= 1; 
        } else {
            ball_y += 1;
        }

        availableMove -= 1;

        if (availableMove === 0) {
            availableMove = 110;
            moveLeft = !moveLeft;
        }

    }

    context.fillStyle = 'blue';
    context.fill()
}

async function prepareStairs() { 
    var stepsCounter;

    for (stepsCounter = 0; stepsCounter < 6; stepsCounter++) {
        drawStairs();
        await sleep(1000);
    }

    run = true;
}

function doJob() {
    if (run) {
        context.clearRect(0, 0, c.width, c.height);
        drawStairs();
    
        if (stairs_step > 6) {
            moveCircle();
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
prepareStairs();
setInterval(doJob, 10);