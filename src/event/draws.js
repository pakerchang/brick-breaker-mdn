import { collisionDetection } from "@/event/collide";
import { generateBrick } from "@/event/generateBricks";
import { keyDownHandler, keyUpHandler } from "@/event/actions";
import { updatePosition } from "@/event/updateState";

const initGame = (canvas, ctx) => {
  let ballData = {
    posX: canvas.width / 2,
    posY: canvas.height - 30,
    dx: 2,
    dy: -2,
  };

  let paddleData = {
    paddleWidth: 240,
    paddleHeight: 10,
    rightPressed: false,
    leftPressed: false,
  };

  let bricksData = {
    brickRowCount: 3,
    brickColCount: 5,
    brickWidth: 75,
    brickHeight: 20,
    brickPadding: 10,
    brickOffsetTop: 30,
    brickOffsetLeft: 30,
    bricks: [],
  };
  let ballRadius = 10;
  let paddleX = (canvas.width - paddleData.paddleWidth) / 2;

  bricksData.bricks = generateBrick(bricksData);

  document.addEventListener("keydown", (e) => keyDownHandler(paddleData, e), false);
  document.addEventListener("keyup", (e) => keyUpHandler(paddleData, e), false);

  const pauseGame = () => {
    // When pause has been executed, need to store last game status to prepare data for update continue event
  };

  const resetGame = (interval) => {
    clearInterval(interval);
    window.location.reload();
  };

  const draw = () => {
    if (ballData.posX + ballData.dx > canvas.width - ballRadius || ballData.posX + ballData.dx < ballRadius) {
      ballData.dx = -ballData.dx;
    }

    if (ballData.posY + ballData.dy < ballRadius) {
      ballData.dy = -ballData.dy;
    }

    if (ballData.posY + ballData.dy > canvas.height - ballRadius) {
      if (ballData.posX > paddleX && ballData.posX < paddleX + paddleData.paddleWidth) {
        if ((ballData.posY = ballData.posY - paddleData.paddleHeight)) {
          ballData.dy = -ballData.dy;
        }
      } else {
        // alert("GAME OVER");
        // resetGame(interval);
      }
    }

    if (paddleData.rightPressed && paddleX < canvas.width - paddleData.paddleWidth) {
      paddleX += 7;
    } else if (paddleData.leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    ballData.posX += ballData.dx;
    ballData.posY += ballData.dy;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(ctx, ballData, ballRadius);
    drawBricks(ctx, bricksData);
    drawPaddle(ctx, canvas, paddleData, paddleX);
    collisionDetection(bricksData, ballData);
  };

  const drawBricks = (ctx, bricksData) => {
    const checkBricks = bricksData.bricks.filter((item) => item.every((check) => check.status === 0));
    // If brick need to be dynamically, array length check need a variable convert detection refs
    if (checkBricks.length === 5) {
      // alert("Good Game");
      return resetGame(interval);
    }
    updatePosition(ctx, bricksData, "brick");
  };

  const drawBall = (ctx, ballData, ballRadius) => {
    ctx.beginPath();
    ctx.arc(ballData.posX, ballData.posY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  };

  const drawPaddle = (ctx, canvas, paddleData, paddleX) => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleData.paddleHeight, paddleData.paddleWidth, paddleData.paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  };

  // If want change ball max speed or change game fps, need a variable to control setInterval second attr
  const interval = setInterval(draw, 10);
};
export { initGame };
