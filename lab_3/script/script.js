const LEFT = 37;
const RIGHT = 39;
const SPACE = 32;

const BEAM_MOVE = 10;
const PROBABILITY = 0.005;

const BOMBS_START_Y = 40;

const BOMBS_R = 50;
const BULLETS_R = 20;

var score = 0;

var beam_height = 20;
var beam_width = 200;

var bullets = []
var bombs = []

var c = document.getElementById("myCanvas");
var context = c.getContext("2d");

var beam_x = (c.width / 2) - (beam_width / 2);
var beam_y = 730;

context.beginPath();

function drawBeam() {
    context.fillStyle = 'brown';
    context.fillRect(beam_x, beam_y, beam_width, beam_height);
}

function drawBall(x, y, r) {
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.fill();
}

function drawBullets() {
    context.fillStyle = 'red';

    for (var i = 0; i < bullets.length; i++) {
        var x = bullets[i][0], y = bullets[i][1];
        drawBall(x, y, 20);
        bullets[i] = [x, y - 1];
        
        if (y <= 0) {
            bullets.splice(i, 1);
        }
    }
}

function drawBombs() {
    context.fillStyle = 'green';

    for (var i = 0; i < bombs.length; i++) {
        var x = bombs[i][0], y = bombs[i][1];
        drawBall(x, y, 50);
        bombs[i] = [x, y + 1];
        
        if (y > c.height) {
            bombs.splice(i, 1);
        }
    }
}

function makeBomb() {
    if (Math.random() < PROBABILITY) {
        relative_x = Math.random();
        if (relative_x > 0.1 && relative_x < 0.9 ) {
            bombs.push([(relative_x * c.width), BOMBS_START_Y])
        }
    }
}

function circlesColliding(c1, c2) {
    var dx = c2[0] - c1[0];
    var dy = c2[1] - c1[1];
    
    var rSum = BOMBS_R + BULLETS_R;
    return (dx * dx + dy * dy <= rSum * rSum);
}

function checkIfBulletDestroyedBomb() {
    for (var i = 0; i < bullets.length; i++) {
        for (var j = 0; j < bombs.length; j++) {
            if (circlesColliding(bombs[j], bullets[i])) {
                bombs.splice(j, 1);
                bullets.splice(i, 1);
                score += 1;
            }
        }
    }
}

function move(e) {
    if (e.keyCode == LEFT && beam_x > 0) {
        beam_x -= BEAM_MOVE;
    } else if (e.keyCode == RIGHT && beam_x < 810) {
        beam_x += BEAM_MOVE;
    } else if (e.keyCode == SPACE) {
        bullets.push([(beam_x + (beam_width / 2)), beam_y])
    }
}

function doJob() {
    makeBomb();
    checkIfBulletDestroyedBomb();

    context.clearRect(0, 0, c.width, c.height);
    
    drawBeam();
    drawBullets();
    drawBombs();

    document.getElementById("score").innerHTML = score;
}

context.fillStyle = 'brown';
context.fillRect(beam_x, beam_y, beam_width, beam_height);

document.onkeydown = move;
setInterval(doJob, 10);
