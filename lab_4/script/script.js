var c = document.getElementById("myCanvas");
var context = c.getContext("2d");

// ----------------------------------------------------------------------------------------------------

const LEFT = 37;
const RIGHT = 39;
const PROBABILITY = 0.005;

// ----------------------------------------------------------------------------------------------------

const RED_LINE_WIDTH = 20;
const ROAD_LEFT = 1/5 * c.width;
const ROAD_WIDTH = 3/5 * c.width;

const RED_LINE_LEFT = ROAD_LEFT - RED_LINE_WIDTH;
const RED_LINE_RIGHT = ROAD_LEFT + ROAD_WIDTH;

const CAR_WIDTH = 1/10 * c.width;
const CAR_HEIGHT = 1/6 * c.height;

var car_left = (1/2 * c.width) + (1/6 * ROAD_WIDTH); 
var CAR_TOP = c.height - CAR_HEIGHT - 20;

const WHITE_LINE_WIDTH = 20;
const WHITE_LINE_LEFT = (1/2 * c.width) - (WHITE_LINE_WIDTH / 2);
const WHITE_LINE_HEIGHT = 50;

var number_of_white_lines = c.height / 90;
var white_lines = [];

const WHITE_RED_LINE_HEIGHT = 20;

var number_of_red_white_lines = c.height / 40;
var white_red_lines = [];

const RADIUS = 10;

var obstacles = [];

const OBSTACLE_START_Y = 50;
const OBSTACLE_WIDTH = 150;
const OBSTACLE_HEIGHT = 60;

var game_over = false;

// ----------------------------------------------------------------------------------------------------

var height_temp = 0;

for (var i = 0; i < number_of_white_lines; i++) {
    white_lines.push(height_temp);
    height_temp += 90;  
}

height_temp = 0;

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

        if (height >= c.height) {
            white_lines[i] = 0 - WHITE_LINE_HEIGHT + 20;
        } else {
            white_lines[i] = height + 1; 
        }
    }
}

function drawWhiteRedLines() {
    context.fillStyle = 'white';
    
    for (var i = 0; i < number_of_red_white_lines; i++) {
        var height = white_red_lines[i];

        context.fillRect(RED_LINE_LEFT, height, WHITE_LINE_WIDTH, WHITE_RED_LINE_HEIGHT);
        context.fillRect(RED_LINE_RIGHT, height, WHITE_LINE_WIDTH, WHITE_RED_LINE_HEIGHT);

        if (height >= c.height) {
            white_red_lines[i] = 0 - WHITE_RED_LINE_HEIGHT + 20;
        } else {
            white_red_lines[i] = height + 1; 
        }
    }
}

function drawRoad() {
    context.fillStyle = 'gray';
    context.fillRect(ROAD_LEFT, 0, ROAD_WIDTH, c.height);

    context.fillStyle = 'red';
    context.fillRect(RED_LINE_LEFT, 0, RED_LINE_WIDTH, c.height);
    context.fillRect(RED_LINE_RIGHT, 0, RED_LINE_WIDTH, c.height);

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

function drawObstacle(x, y) {
    context.fillRect(x, y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
}

function drawObstacles() {
    context.fillStyle = 'purple';

    for (var i = 0; i < obstacles.length; i++) {
        var x = obstacles[i][0], y = obstacles[i][1];
        drawObstacle(x, y);

        if (!boxesColliding(obstacles[i])) {
            obstacles[i] = [x, y + 1];
            
            if (y > c.height) {
                obstacles.splice(i, 1);
            }
        } else {
            game_over = true;
        }
    }
}

function makeObstacle() {
    if (Math.random() < PROBABILITY) {
        relative_x = Math.random();
        if (relative_x > 1/5 && relative_x < 4/5) {
            obstacles.push([(relative_x * ROAD_WIDTH), OBSTACLE_START_Y])
        }
    }
}

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

function move(e) {
    if (e.keyCode == LEFT && car_left > ROAD_LEFT) {
        car_left -= 10;
        for (var i = 0; i < car_wheels.length; i++) {
            car_wheels[i][0] -= 10;
        }
    } else if (e.keyCode == RIGHT && (car_left + CAR_WIDTH) < RED_LINE_RIGHT) {
        car_left += 10;
        for (var i = 0; i < car_wheels.length; i++) {
            car_wheels[i][0] += 10;
        }
    } 
}

function doJob() {
    if (!game_over) {
        context.fillStyle = 'lightgreen';
        context.fillRect(0, 0, c.width, c.height);
    
        makeObstacle();
    
        drawRoad();
        drawObstacles();
        drawCar();
    }
}

document.onkeydown = move;
setInterval(doJob, 6);
