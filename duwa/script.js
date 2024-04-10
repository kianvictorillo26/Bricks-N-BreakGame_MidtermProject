var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var ballImage = new Image();
	ballImage.src = 'bowa-removebg-preview.png';
var x = canvas.width / 7;
var y = canvas.height -10;
var dx = 4;
var dy = -4;
var ballRadius = 10;
var boatImage = new Image();
boatImage.src = 'Untitled-design-unscreen.gif';
var boatPaddle = {
    width: 280,
    height: 65, 
    x: canvas.width / 2 - 50, 
    y: canvas.height - 60, 
};
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 6;
var brickColumnCount = 14;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffSetTop = 30;
var brickOffSetLeft = 30;
var score = 0;
var lives = 3;

var bricks = [];

for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 + boatPaddle.width / 2 && relativeX < canvas.width - boatPaddle.width / 2) {
        boatPaddle.x = relativeX - boatPaddle.width / 2;
    }
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding) + brickOffSetLeft);
                var brickY = (r * (brickHeight + brickPadding) + brickOffSetTop);
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "indianred";
                ctx.fill();
                ctx.strokeStyle = 'black';
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function drawBall() {
		ctx.drawImage(ballImage, x - ballRadius, y - ballRadius, ballRadius * 2, ballRadius * 2);
	
}

function drawBoatPaddle() {
    ctx.drawImage(boatImage, boatPaddle.x, boatPaddle.y, boatPaddle.width, boatPaddle.height);
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    ++score;
                    if (brickColumnCount * brickRowCount == score) {
                        alert("YOU WIN");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score:" + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives:" + lives, canvas.width - 65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBricks();
    drawLives();
    drawBall();
    drawBoatPaddle();
    drawScore();
    collisionDetection();

    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - 2 * ballRadius) {

        if (x > boatPaddle.x && x < boatPaddle.x + boatPaddle.width) {
            dy = -dy;
        }
        else {
            lives = lives - 1;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                boatPaddle.x = (canvas.width - boatPaddle.width) / 2;
            }
        }
    }

    if ((x + dx < ballRadius || (x + dx > canvas.width - ballRadius))) {
        dx = -dx;
    }
    if (rightPressed && boatPaddle.x < canvas.width - boatPaddle.width) {
        boatPaddle.x += 7;
    }
    else if (leftPressed && boatPaddle.x > 0) {
        boatPaddle.x -= 7;
    }
    x += dx;
    y += dy;
}

setInterval(draw, 1);
