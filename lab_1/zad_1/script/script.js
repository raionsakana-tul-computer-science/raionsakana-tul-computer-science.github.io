var c = document.getElementById("myCanvas");
var context = c.getContext("2d");
var mark = true;

context.beginPath();
context.arc(300, 300, 300, 0, 2 * Math.PI);
context.fillStyle = 'green';
context.fill();

function changeColor() {
    context.fillStyle = mark ? 'blue' : 'green';
    mark = !mark;
    context.fill();
}

setInterval(changeColor, 1000);