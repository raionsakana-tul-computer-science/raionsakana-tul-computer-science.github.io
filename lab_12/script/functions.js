function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMaze() {
    console.log(numberOfPartsX);
    console.log(numberOfPartsY);

    for (var i = 0; i < numberOfPartsX; i++) {
        maze.push([i, 0]);
        maze.push([i, numberOfPartsY - sizeY]);
    }
    
    for (var i = 0; i < numberOfPartsY; i++) {
        maze.push([0, i]);
        maze.push([numberOfPartsX - sizeX, i]);
    }

    var startX = 0.2 * numberOfPartsX;
    for (var i = 0.8 * numberOfPartsY; i < numberOfPartsY; i++) {
        maze.push([startX, i]);
    }

    var startX = 0.6 * numberOfPartsX;
    for (var i = 0.2 * numberOfPartsY; i < 0.8 * numberOfPartsY; i++) {
        maze.push([startX, i]);
    }

    var startX = 0.3 * numberOfPartsX;
    for (var i = 0; i < 0.5 * numberOfPartsY; i++) {
        maze.push([startX, i]);
    }

    var startX = 0.5 * numberOfPartsX;
    for (var i = 0; i < 0.4 * numberOfPartsY; i++) {
        maze.push([startX, i]);
    }

    var startX = 0.7 * numberOfPartsX;
    for (var i = 0; i < 0.5 * numberOfPartsY; i++) {
        maze.push([startX, i]);
    }

    var startX = 0.1 * numberOfPartsX;
    for (var i = 0; i < 0.20 * numberOfPartsY; i++) {
        maze.push([startX, i]);
    }

    var startX = 0.9 * numberOfPartsX;
    for (var i = 0.5 * numberOfPartsY; i < 0.7 * numberOfPartsY; i++) {
        maze.push([startX, i]);
    }

    var startX = 0.8 * numberOfPartsX;
    for (var i = 0.4 * numberOfPartsY; i < 0.7 * numberOfPartsY; i++) {
        maze.push([startX, i]);
    }

    var startX = 0.5 * numberOfPartsX;
    for (var i = 0.5 * numberOfPartsY; i < 0.6 * numberOfPartsY; i++) {
        maze.push([startX, i]);
    }

    var startX = 0.3 * numberOfPartsX;
    for (var i = 0.9 * numberOfPartsY; i < 1 * numberOfPartsY; i++) {
        maze.push([startX, i]);
    }

    var startX = 0.4 * numberOfPartsX;
    for (var i = 0.8 * numberOfPartsY; i < 0.9 * numberOfPartsY; i++) {
        maze.push([startX, i]);
    }

    var startX = 0.6 * numberOfPartsX;
    for (var i = 0 * numberOfPartsY; i < 0.1 * numberOfPartsY; i++) {
        maze.push([startX, i]);
    }

    // ----

    var startY = 0.7 * numberOfPartsY;
    for (var i = 0; i < 0.5 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.3 * numberOfPartsY;
    for (var i = 0; i < 0.2 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.1 * numberOfPartsY;
    for (var i = 0.1 * numberOfPartsX; i < 0.2 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.2 * numberOfPartsY;
    for (var i = 0.2 * numberOfPartsX; i < 0.3 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.9 * numberOfPartsY;
    for (var i = 0.5 * numberOfPartsX; i < numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.1 * numberOfPartsY;
    for (var i = 0.8 * numberOfPartsX; i < numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.2 * numberOfPartsY;
    for (var i = 0.7 * numberOfPartsX; i < 0.9 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.3 * numberOfPartsY;
    for (var i = 0.8 * numberOfPartsX; i < numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.4 * numberOfPartsY;
    for (var i = 0.7 * numberOfPartsX; i < 0.9 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.6 * numberOfPartsY;
    for (var i = 0.7 * numberOfPartsX; i < 0.9 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.2 * numberOfPartsY;
    for (var i = 0.3 * numberOfPartsX; i < 0.4 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.1 * numberOfPartsY;
    for (var i = 0.4 * numberOfPartsX; i < 0.5 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.3 * numberOfPartsY;
    for (var i = 0.4 * numberOfPartsX; i < 0.5 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    // ---

    var startY = 0.6 * numberOfPartsY;
    for (var i = 0.1 * numberOfPartsX; i < 0.4 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.5 * numberOfPartsY;
    for (var i = 0.4 * numberOfPartsX; i < 0.6 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.9 * numberOfPartsY;
    for (var i = 0 * numberOfPartsX; i < 0.1 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.8 * numberOfPartsY;
    for (var i = 0.1 * numberOfPartsX; i < 0.2 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.4 * numberOfPartsY;
    for (var i = 0.1 * numberOfPartsX; i < 0.4 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.5 * numberOfPartsY;
    for (var i = 0* numberOfPartsX; i < 0.2 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.8 * numberOfPartsY;
    for (var i = 0.7 * numberOfPartsX; i < 1 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }

    var startY = 0.8 * numberOfPartsY;
    for (var i = 0.2 * numberOfPartsX; i < 0.5 * numberOfPartsX; i++) {
        maze.push([i, startY]);
    }
}

function drawBackground() {
    context.fillStyle = 'lightyellow';
    context.fillRect(0, 0, c.width, c.height);

    for (var i = 0; i < maze.length; i++) {
        context.fillStyle = 'darkblue';
        context.fillRect(maze[i][0], maze[i][1], sizeX, sizeY);
    }

}

function reload() {
    location.reload();
}

function move(e) {
    e.preventDefault();

    if (e.keyCode == LEFT) {
        turnLeftRight(playerMove.left);
    } else if (e.keyCode == RIGHT) {
        turnLeftRight(playerMove.right);
    } else if (e.keyCode == UP) {
        turnUpDown(playerMove.up);
    } else if (e.keyCode == DOWN) {
        turnUpDown(playerMove.down);
    }
}

function turnLeftRight(move) {
    if ((ball.positionX - ball.radius + move) > 0 && ((ball.positionX + ball.radius) + move) < c.width) {
        ball.positionX += move;
    }
}

function turnUpDown(move) {
    if ((ball.positionY - ball.radius + move) > 0 && ((ball.positionY + ball.radius) + move) < c.height) {
        ball.positionY += move;
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
            turnLeftRight(playerMove.right);
        } else if (event.gamma < accelerometer.right) {
            turnLeftRight(playerMove.left);
        }         
        
        if (event.beta > accelerometer.left) {
            turnUpDown(playerMove.right);
        } else if (event.beta < accelerometer.right) {
            turnUpDown(playerMove.left);
        }
    })
}

function useDeviceMotionIOS() {
    window.addEventListener("deviceorientation", (event) => {
        if (event.gamma < accelerometer.left) {
            turnLeftRight(playerMove.left);
        } else if (event.gamma > accelerometer.right) {
            turnLeftRight(playerMove.right);
        }

        alert(event.beta)

        if (event.beta < accelerometer.left) {
            turnUpDown(playerMove.right);
        } else if (event.beta > accelerometer.right) {
            turnUpDown(playerMove.left);
        }
    })
}

function drawBall() {
    context.fillStyle = 'darkred';

    context.beginPath();
    context.arc(ball.positionX, ball.positionY, ball.radius, 0, 2 * Math.PI);
    context.fill();
}