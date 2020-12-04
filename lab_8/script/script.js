var c = document.getElementById("myCanvas");
var context = c.getContext("2d");
context.font = "15px Arial";
var timer;

var accelerometer = {left: -2, right: 2, speed: 4}

// ----------------------------------------------------------------------------------------------------

const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;

const SPACE = 32;
const PROBABILITY = 0.005;

// ----------------------------------------------------------------------------------------------------

var ROAD_Y = -1000;
var ROAD_HEIGHT = c.height + 2000;

// ----------------------------------------------------------------------------------------------------

const RED_LINE_WIDTH = 20;
const ROAD_LEFT = 1/5 * c.width;
const ROAD_WIDTH = 3/5 * c.width;

const RED_LINE_LEFT = ROAD_LEFT - RED_LINE_WIDTH;
const RED_LINE_RIGHT = ROAD_LEFT + ROAD_WIDTH;

// ----------------------------------------------------------------------------------------------------

const CAR_WIDTH = 1/14 * c.width;
const CAR_HEIGHT = 1/6 * c.height;

var car_left = (1/2 * c.width) + (1/6 * ROAD_WIDTH); 
var CAR_TOP = c.height - CAR_HEIGHT - 20;

// ----------------------------------------------------------------------------------------------------

const WHITE_LINE_WIDTH = 20;
const WHITE_LINE_LEFT = (1/2 * c.width) - (WHITE_LINE_WIDTH / 2);
const WHITE_LINE_HEIGHT = 50;

var number_of_white_lines = ROAD_HEIGHT/ 90;
var white_lines = [];

// ----------------------------------------------------------------------------------------------------

const WHITE_RED_LINE_HEIGHT = 20;

var number_of_red_white_lines = ROAD_HEIGHT / 40;
var white_red_lines = [];

const RADIUS = 10;

// ----------------------------------------------------------------------------------------------------

var obstacles = [];

const OBSTACLE_START_Y = 50;
const OBSTACLE_WIDTH = 150;
const OBSTACLE_HEIGHT = 60;

// ----------------------------------------------------------------------------------------------------

var gifts = [];

const GIFT_START_Y = 50;
const GIFT_WIDTH = 60;
const GIFT_HEIGHT = 60;

// ----------------------------------------------------------------------------------------------------

var score = 0;
var game_over = false;
var interval_time = 0.005;
var MOVE = 2;

// ----------------------------------------------------------------------------------------------------

var bullets = []
const BULLET_RADIUS = 10;

// ----------------------------------------------------------------------------------------------------

var rotate = false;
var rotate_right = false;
var rotate_left = false;

var rotate_value = 0;
var rotate_step = 0;

// ----------------------------------------------------------------------------------------------------

var height_temp = ROAD_Y;

for (var i = 0; i < number_of_white_lines; i++) {
    white_lines.push(height_temp);
    height_temp += 90;  
}

height_temp = ROAD_Y;

for (var i = 0; i < number_of_red_white_lines; i++) {
    white_red_lines.push(height_temp);
    height_temp += 40;  
}

// ----------------------------------------------------------------------------------------------------

var car_wheels = [];
const CAR_WHEELS_MOVE = 15;

car_wheels.push([car_left + (RADIUS / 6), CAR_TOP + CAR_WHEELS_MOVE]);
car_wheels.push([car_left + (RADIUS / 6), CAR_TOP + CAR_HEIGHT - CAR_WHEELS_MOVE]);
car_wheels.push([car_left + CAR_WIDTH - (RADIUS / 6), CAR_TOP + CAR_WHEELS_MOVE]);
car_wheels.push([car_left + CAR_WIDTH - (RADIUS / 6), CAR_TOP + CAR_HEIGHT - CAR_WHEELS_MOVE]);

// ----------------------------------------------------------------------------------------------------

context.beginPath();

function drawWhiteLines() {
    context.fillStyle = 'white';
    
    for (var i = 0; i < number_of_white_lines; i++) {
        var height = white_lines[i];
        context.fillRect(WHITE_LINE_LEFT, height, WHITE_LINE_WIDTH, WHITE_LINE_HEIGHT);

        if (height >= ROAD_HEIGHT) {
            white_lines[i] = 0 - WHITE_LINE_HEIGHT + 20;
        } else {
            white_lines[i] = height + MOVE; 
        }
    }
}

function drawWhiteRedLines() {
    context.fillStyle = 'white';
    
    for (var i = 0; i < number_of_red_white_lines; i++) {
        var height = white_red_lines[i];

        context.fillRect(RED_LINE_LEFT, height, WHITE_LINE_WIDTH, WHITE_RED_LINE_HEIGHT);
        context.fillRect(RED_LINE_RIGHT, height, WHITE_LINE_WIDTH, WHITE_RED_LINE_HEIGHT);

        if (height >= ROAD_HEIGHT) {
            white_red_lines[i] = 0 - WHITE_RED_LINE_HEIGHT + 20;
        } else {
            white_red_lines[i] = height + MOVE; 
        }
    }
}

function drawRoad() {
    context.fillStyle = 'gray';
    context.fillRect(ROAD_LEFT, ROAD_Y, ROAD_WIDTH, ROAD_HEIGHT);

    context.fillStyle = 'red';
    context.fillRect(RED_LINE_LEFT, ROAD_Y, RED_LINE_WIDTH, ROAD_HEIGHT);
    context.fillRect(RED_LINE_RIGHT, ROAD_Y, RED_LINE_WIDTH, ROAD_HEIGHT);

    drawWhiteLines();
    drawWhiteRedLines();
}

function drawCar() {
    context.fillStyle = 'black';
    for (var i = 0; i < car_wheels.length; i++) {
        context.beginPath();
        context.arc(car_wheels[i][0], car_wheels[i][1], RADIUS, 0, 2 * Math.PI);
        context.fill();
    }

    context.fillStyle = 'darkgreen';
    context.fillRect(car_left, CAR_TOP, CAR_WIDTH, CAR_HEIGHT);
}

function drawBox(x, y, width, height) {
    context.fillRect(x, y, width, height);
}

function drawObstacles() {
    context.fillStyle = 'purple';

    for (var i = 0; i < obstacles.length; i++) {
        var x = obstacles[i][0], y = obstacles[i][1];
        drawBox(x, y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);

        if (!boxesColliding(obstacles[i])) {
            obstacles[i] = [x, y + MOVE];
            
            if (y > ROAD_HEIGHT) {
                obstacles.splice(i, 1);
            }
        } else {
            game_over = true;
        }
    }
}

function drawGifts() {
    context.fillStyle = 'yellow';

    for (var i = 0; i < gifts.length; i++) {
        var x = gifts[i][0], y = gifts[i][1];
        drawBox(x, y, GIFT_WIDTH, GIFT_HEIGHT);

        if (!boxesColliding(gifts[i])) {
            gifts[i] = [x, y + MOVE];
            
            if (y > ROAD_HEIGHT) {
                gifts.splice(i, 1);
            }
        } else {
            gifts.splice(i, 1);
            score += 1;
        }
    }
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
        drawBall(x, y, BULLET_RADIUS);
        bullets[i] = [x, y - MOVE];
        
        if (y <= 0) {
            bullets.splice(i, 1);
        }
    }
}

// ----------------------------------------------------------------------------------------------------

function makeObstacle() {
    if (Math.random() < PROBABILITY) {
        relative_x = Math.random();
        if (relative_x > 1/5 && relative_x < 4/5) {
            obstacles.push([(relative_x * ROAD_WIDTH), OBSTACLE_START_Y])
        }
    }
}

function makeGift() {
    if (Math.random() < PROBABILITY) {
        relative_x = Math.random();
        if (relative_x > 1/5 && relative_x < 4/5) {
            gifts.push([(relative_x * ROAD_WIDTH), GIFT_START_Y])
        }
    }
}

// ----------------------------------------------------------------------------------------------------

function doCurve() {
    if (!rotate) {
        if (Math.random() < PROBABILITY) {
            if (Math.random() > 0.5) {
                rotate_left = true;   
            } else {
                rotate_right = true;
            }
            rotate = true;
        }
    }
}

// ----------------------------------------------------------------------------------------------------

function boxesColliding(box) {
    return car_left < box[0] + OBSTACLE_WIDTH &&
        car_left + CAR_WIDTH > box[0] &&
        CAR_TOP < box[1] + OBSTACLE_HEIGHT &&
        CAR_TOP + CAR_HEIGHT > box[1]
}

function checkIfCarTouchObsticle() {
    for (var i = 0; i < obstacles.length; i++) {
        if (boxesColliding(obstacles[i])) {
            return true;
        }
    }

    return false;
}

function CircleAndRectangleColliding(rect, circle) {
    var dx = Math.abs(circle[0] - rect[0] - OBSTACLE_WIDTH/2);
    var dy = Math.abs(circle[1] - rect[1] - OBSTACLE_HEIGHT/2);

    if (dx > BULLET_RADIUS + OBSTACLE_WIDTH/2) { 
        return false; 
    }
    
    if (dy > BULLET_RADIUS + OBSTACLE_HEIGHT/2) { 
        return false; 
    }

    if (dx <= OBSTACLE_WIDTH/2) { 
        return true; 
    }
    
    if (dy <= OBSTACLE_HEIGHT/2) { 
        return true; 
    }

    var dx = dx - OBSTACLE_WIDTH/2;
    var dy = dy - OBSTACLE_HEIGHT/2;

    return (dx * dx + dy * dy <= BULLET_RADIUS * BULLET_RADIUS);
}

function checkIfBulletDestroyedBomb() {
    for (var i = 0; i < bullets.length; i++) {
        for (var j = 0; j < obstacles.length; j++) {
            if (CircleAndRectangleColliding(obstacles[j], bullets[i])) {
                obstacles.splice(j, 1);
                bullets.splice(i, 1);
            }
        }
    }
}

// ----------------------------------------------------------------------------------------------------

function turnLeft() {
    if (car_left > ROAD_LEFT) {
        car_left -= 20;
        for (var i = 0; i < car_wheels.length; i++) {
            car_wheels[i][0] -= 20;
        }
    }
}

function turnRight() {
    if ((car_left + CAR_WIDTH) < RED_LINE_RIGHT) {
        car_left += 20;
        for (var i = 0; i < car_wheels.length; i++) {
            car_wheels[i][0] += 20;
        }
    }
}

// ----------------------------------------------------------------------------------------------------

function fire() {
    bullets.push([(car_left + (CAR_WIDTH / 2)), CAR_TOP])
}

function fastUp() {
    if (MOVE < 8) {
        MOVE += 0.1;
    }
}

function slowDown() {
    if (MOVE > 0) {
        MOVE -= 0.1;
    }
}

// ----------------------------------------------------------------------------------------------------

function move(e) {
    if (e.keyCode == LEFT) {
        e.preventDefault();
        turnLeft();
    } else if (e.keyCode == RIGHT) {
        e.preventDefault()
        turnRight();
    } else if (e.keyCode == SPACE) {
        e.preventDefault()
        fire();
    } else if (e.keyCode == DOWN) {
        e.preventDefault()
        slowDown();
    } else if (e.keyCode == UP) {
        e.preventDefault()
        fastUp();
    }
}

// ----------------------------------------------------------------------------------------------------

var angle = 0.01; 

function draw() {
    if (rotate) {
        if (rotate_right) {
            if (rotate_step < 10) {
                rotate_value += angle;
            } else if (rotate_step >= 10 && rotate_step < 20) {
                rotate_value -= angle;
            }
            rotate_step += 1;
        } else if (rotate_left) {
            if (rotate_step < 10) {
                rotate_value -= angle;
            } else if (rotate_step >= 10 && rotate_step < 20) {
                rotate_value += angle;
            }
            rotate_step += 1;
        }
        
        if (rotate_step > 20) {
            rotate = !rotate;
            rotate_left = !rotate_left;
            rotate_right = !rotate_right;
            rotate_step = 0;
            rotate_value = 0;
        } 

        context.translate(context.width / 2, context.height / 2);
        context.rotate(rotate_value * Math.PI / 180);
        context.translate(-context.width / 2, -context.height / 2);
    }

    drawRoad();
    drawGifts();
    drawObstacles();

    drawCar();
    drawBullets();
}

function drawInfo() {
    context.fillStyle = 'darkblue';
    context.fillText("SCORE: " + score, 10, 20);  

    if (game_over) {
        context.fillStyle = 'darkred';
        context.fillText("GAME OVER", 10, 50); 
    }
}

// ----------------------------------------------------------------------------------------------------

function doJob() {
    if (!game_over) {
        
        context.fillStyle = 'lightgreen';
        context.fillRect(0, 0, c.width, c.height);
    
        makeObstacle();
        makeGift();
        checkIfBulletDestroyedBomb();
        doCurve();
        draw();
    }

    drawInfo();
    
    clearInterval(timer);
    timer = setInterval(doJob, interval_time);
}

// let acl = new Accelerometer({frequency: 60});

// acl.addEventListener('reading', () => {
//   if (acl.x < -4) {
//     turnRight();
//   } else if (acl.x > 4) {
//       turnLeft();
//   }

//   if (acl.z < 2) {
//     slowDown();
// } else if (acl.z > 8) {
//     fastUp();
//   }
// });


// acl.start();

window.addEventListener( "devicemotion", (event) => {
    if (event.accelerationIncludingGravity.x < accelerometer.left) {
        turnRight();
    } else if (event.accelerationIncludingGravity.x > accelerometer.right) {
        turnLeft();
    }
    
    if (Math.abs(event.accelerationIncludingGravity.z) > accelerometer.speed) {
        slowDown();
    } else if (Math.abs(event.accelerationIncludingGravity.z) <= accelerometer.speed) {
        fastUp();
    }
})

document.onkeydown = move;
timer = setInterval(doJob, interval_time);
