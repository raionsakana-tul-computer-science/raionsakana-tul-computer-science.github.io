var green = 255;
var blue = 0;

var stepBlue = 1;
var stepGreen = -1;

var c = document.getElementById("myCanvas");
var context = c.getContext("2d");

context.beginPath();
context.arc(300, 300, 300, 0, 2 * Math.PI);
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

setInterval(changeColor, 1000 / 255);