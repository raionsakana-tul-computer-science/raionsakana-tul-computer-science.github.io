function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMaze() {
    var numberOfPartsX = window.innerWidth / 100;
    var numberOfPartsY = window.innerHeight / 100;

    for (var i = 0; i < numberOfPartsX; i++) {
        maze.push([i, 0]);
        maze.push([i, numberOfPartsY - 1]);
    }
    
    for (var i = 0; i < numberOfPartsY; i++) {
        maze.push([0, i]);
        maze.push([numberOfPartsX - 1, i]);
    }
}

function drawBackground() {
    context.fillStyle = 'lightyellow';
    context.fillRect(0, 0, c.width, c.height);
}

function move(e) {
    e.preventDefault();

    if (e.keyCode == LEFT) {
        turn(playerMove.left);
    } else if (e.keyCode == RIGHT) {
        turn(playerMove.right);
    } else if (e.keyCode == SPACE) {
        isBallMoving = true;
    }
}

function turn(move) {
    if ((player.positionX + move) > 0 && ((player.positionX + player.width) + move) < c.width) {
        player.positionX += move;
    }
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

    timer = setInterval(mainFunctionOfGame, interval_time);
}

function useDeviceMotionAndroid() {
    window.addEventListener("deviceorientation", (event) => {
        if (event.gamma > accelerometer.left) {
            turn(playerMove.right);
        } else if (event.gamma < accelerometer.right) {
            turn(playerMove.left);
        }
    })
}

function useDeviceMotionIOS() {
    window.addEventListener("deviceorientation", (event) => {
        if (event.gamma < accelerometer.left) {
            turn(playerMove.left);
        } else if (event.gamma > accelerometer.right) {
            turn(playerMove.right);
        }
    })
}

function drawBall() {
    context.fillStyle = 'darkred';

    context.beginPath();
    context.arc(ball.positionX, ball.positionY, ball.radius, 0, 2 * Math.PI);
    context.fill();
}

function resetBall() {
    isBallMoving = false;
    ball.positionX = player.positionX + player.width / 2;
    ball.positionY = player.positionY - player.height / 2;
}

function updateBallPosition() {
    if (isBallMoving) {
        ball.positionX += ball.velX;
        ball.positionY += ball.velY;

        if (ball.positionY - ball.radius > c.height) {
            // resetBall(); 
        } else if (ball.positionY - ball.radius <= 0) {
            ball.velY *= -ball.bounce;
            ball.positionY = ball.radius;
        } else if (ball.positionX - ball.radius <= 0) {
            ball.velX *= -ball.bounce;
            ball.positionX = ball.radius;
        } else if (ball.positionX + ball.radius >= c.width) {
            ball.positionX = c.width - ball.radius;
        }
            
        ball.positionX += ball.velX;
        ball.positionY += ball.velY
    }
}