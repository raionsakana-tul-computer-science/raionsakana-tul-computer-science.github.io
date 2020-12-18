var c = document.getElementById("myCanvas");

c.width = window.innerWidth;
c.height = window.innerHeight - 145;

var context = c.getContext("2d");
context.font = "15px Arial";
var timer;

var accelerometer = {left: -2, right: 2, speedUp: 7, speedDown: 4}

// ----------------------------------------------------------------------------------------------------

const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;

const SPACE = 32;
const PROBABILITY = 0.005;

// ----------------------------------------------------------------------------------------------------

const boxWidth = 0.05 * c.width;
const boxHeight = 0.05 * c.height;
const colors = ['red', 'orange', 'green', 'yellow', 'blue']

const numberOfBoxesInLineX = c.width / boxWidth;
const numberOfBoxesInLineY = c.height / (3 * boxHeight);

var tmpX = 0, tmpY = 0;
var boxes = [];

for (var i = 0; i < numberOfBoxesInLineX; i++) {
    tmpY = 0;

    for (var j = 0; j < numberOfBoxesInLineY; j++) {
        boxes.push([Math.floor(tmpX), Math.floor(tmpY), colors[getRandomInt(0, colors.length - 1)]]);
        tmpY += boxHeight;
    }

    tmpX += boxWidth;
}

// ----------------------------------------------------------------------------------------------------

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

context.beginPath();

function drawBoxes() {
    for (var i = 0; i < boxes.length; i++) {
        context.fillStyle = boxes[i][2];
        context.fillRect(boxes[i][0], boxes[i][1], boxWidth, boxHeight);
    }
}

// ----------------------------------------------------------------------------------------------------



// ----------------------------------------------------------------------------------------------------

function doJob() {
    drawBoxes();

    clearInterval(timer);
    timer = setInterval(doJob, interval_time);
}

function permission() {
    if (typeof(DeviceMotionEvent) !== "undefined" && typeof(DeviceMotionEvent.requestPermission) === "function") {
        DeviceMotionEvent.requestPermission().then(response => {
            if (response == "granted") {
                useDeviceMotionIOS();
            }
        }).catch(console.error)
    } else {
        useDeviceMotionAndroid();
    }
}

function useDeviceMotionAndroid() {
    window.addEventListener("deviceorientation", (event) => {
        if (event.gamma > accelerometer.left) {
            turnRight();
        } else if (event.gamma < accelerometer.right) {
            turnLeft();
        }
    })
}

function useDeviceMotionIOS() {
    window.addEventListener("deviceorientation", (event) => {
        if (event.gamma < accelerometer.left) {
            turnLeft();
        } else if (event.gamma > accelerometer.right) {
            turnRight();
        }
    })
}

doJob();

// document.onkeydown = move;
// timer = setInterval(doJob, interval_time);