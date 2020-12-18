function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function prepareBoxes() {
    for (var i = 0; i < numberOfBoxesInLineX; i++) {
        tmpY = 0;

        for (var j = 0; j < numberOfBoxesInLineY; j++) {
            boxes.push([Math.floor(tmpX), Math.floor(tmpY), colors[getRandomInt(0, colors.length - 1)]]);
            tmpY += boxHeight;
        }

        tmpX += boxWidth;
    }
}

function drawBoxes() {
    for (var i = 0; i < boxes.length; i++) {
        context.fillStyle = boxes[i][2];
        context.fillRect(boxes[i][0], boxes[i][1], boxWidth, boxHeight);
    }
}

function drawBackground() {
    context.fillStyle = 'lightyellow';
    context.fillRect(0, 0, c.width, c.height);
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