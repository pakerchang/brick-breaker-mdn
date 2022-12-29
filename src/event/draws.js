import { collisionDetection } from "@/event/collide";
import { killBricks } from "@/event/killBricks";
import { keyDownHandler, keyUpHandler } from "@/event/actions";

const initGame = (canvas, ctx) => {
  let canvasData = {
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

  killBricks(bricksData);

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(ctx, canvasData, ballRadius);
    drawBricks(ctx, bricksData);
    drawPaddle(ctx, canvas, paddleData, paddleX);
    collisionDetection(bricksData, canvasData);

    if (canvasData.posX + canvasData.dx > canvas.width - ballRadius || canvasData.posX + canvasData.dx < ballRadius) {
      canvasData.dx = -canvasData.dx;
    }

    if (canvasData.posY + canvasData.dy < ballRadius) {
      canvasData.dy = -canvasData.dy;
    }

    if (canvasData.posY + canvasData.dy > canvas.height - ballRadius) {
      if (canvasData.posX > paddleX && canvasData.posX < paddleX + paddleData.paddleWidth) {
        if ((canvasData.posY = canvasData.posY - paddleData.paddleHeight)) {
          canvasData.dy = -canvasData.dy;
        }
      } else {
        alert("GAME OVER");
        resetGame(interval);
      }
    }

    if (paddleData.rightPressed && paddleX < canvas.width - paddleData.paddleWidth) {
      paddleX += 7;
    } else if (paddleData.leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    canvasData.posX += canvasData.dx;
    canvasData.posY += canvasData.dy;
  };

  const drawBall = (ctx, canvasData, ballRadius) => {
    ctx.beginPath();
    ctx.arc(canvasData.posX, canvasData.posY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  };

  const drawBricks = (ctx, bricksData) => {
    const checkBricks = bricksData.bricks.filter((item) => item.every((check) => check.status === 0));
    // If brick need to be dynamically, array length check need a variable convert detection refs
    if (checkBricks.length === 5) {
      alert("Good Game");
      return resetGame(interval);
    }
    for (let col = 0; col < bricksData.brickColCount; col++) {
      for (let row = 0; row < bricksData.brickRowCount; row++) {
        if (bricksData.bricks[col][row].status === 1) {
          let brickX = col * (bricksData.brickWidth + bricksData.brickPadding) + bricksData.brickOffsetLeft;
          let brickY = row * (bricksData.brickHeight + bricksData.brickPadding) + bricksData.brickOffsetTop;
          bricksData.bricks[col][row].x = brickX;
          bricksData.bricks[col][row].y = brickY;

          ctx.beginPath();
          ctx.rect(brickX, brickY, bricksData.brickWidth, bricksData.brickHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
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
