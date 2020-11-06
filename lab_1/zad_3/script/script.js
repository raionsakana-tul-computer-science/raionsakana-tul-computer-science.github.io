var green = 255;
var blue = 0;

var stepBlue = 1;
var stepGreen = -1;

var y = 300;
var step = 1;

var c = document.getElementById("myCanvas");
var context = c.getContext("2d");

context.beginPath();
context.arc(300, y, 100, 0, 2 * Math.PI);
context.fillStyle = 'rgb(0, ' + green  + ', ' + blue + ')';
context.fill();

function changeColor() {
    green += stepGreen;
    blue += stepBlue;

    if (blue < 1 || blue > 254) {
        stepBlue *= -1;
    }

    if (green < 1 || green > 254) {
        stepGreen *= -1;
    }

    context.fillStyle = 'rgb(0, ' + green  + ', ' + blue + ')';
    context.fill();
}

function moveCircle() {
    context.clearRect(0, 0, c.width, c.height);
    y += step;

    if (y < 300 || y > (768 - 100)) {
        step *= -1; 
    }

    context.beginPath();
    context.arc(300, y, 100, 0, 2 * Math.PI);
}

function doJob() {
    moveCircle();
    changeColor();
}

setInterval(doJob, 1000 / 255);