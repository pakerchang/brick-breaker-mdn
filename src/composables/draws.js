class Draws {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.isPause = false;
    this.ballData = {
      posX: this.canvas.width / 2,
      posY: this.canvas.height - 30,
      dx: 2,
      dy: -1,
    };
    this.initPaddle = {
      paddleWidth: 240,
      paddleHeight: 10,
      rightPressed: false,
      leftPressed: false,
    };
    this.initBrick = {
      brickRowCount: 3,
      brickColCount: 5,
      brickWidth: 75,
      brickHeight: 20,
      brickPadding: 10,
      brickOffsetTop: 30,
      brickOffsetLeft: 30,
      bricks: [],
    };
    this.ballRadius = 10;
    this.paddleX = (canvas.width - paddleData.paddleWidth) / 2;
    this.interval = setInterval(() => !this.isPause && this.draw(), 10);
  }

  getKeyPressDown() {
    return document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Right" || e.key === "ArrowRight") {
          this.initPaddle.rightPressed = true;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
          this.isFinite.leftPressed = true;
        }
      },
      false
    );
  }

  getKeyPressUp() {
    return document.addEventListener(
      "keyup",
      (e) => {
        if (e.key === "Right" || e.key === "ArrowRight") {
          this.initPaddle.rightPressed = false;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
          this.isFinite.leftPressed = false;
        }
      },
      false
    );
  }

  resetGame() {
    clearInterval(this.interval);
    window.location.reload();
  }

  draw() {
    if (
      this.ballData.posX + this.ballData.dx > this.canvas.width - this.ballRadius ||
      this.ballData.posX + this.ballData.dx < this.ballRadius
    ) {
      this.ballData.dx = -this.ballData.dx;
    }

    if (ballData.posY + this.ballData.dy < this.ballRadius) {
      this.ballData.dy = -this.ballData.dy;
    }
    if (this.ballData.posY + this.ballData.dy > this.canvas.height - this.ballRadius) {
      if (this.ballData.posY > this.paddleX && this.ballData.posX < this.paddleX + this.initPaddle.paddleWidth) {
        if ((this.ballData.posY = this.ballData.posY - this.initPaddle.paddleHeight)) {
          this.ballData.dy = -this.ballData.dy;
        }
      } else {
        alert("GAME OVER");
        resetGame();
      }
    }

    this.ballData.posX += this.ballData.dx;
    this.ballData.posY += this.ballData.dy;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBall(this.ctx, this.ballData, this.ballRadius);
    this.drawBricks(this.ctx, this.this.initBrick);
    this.drawPaddle(this.ctx, this.canvas, this.initPaddle, this.paddleX);
    // collision
  }

  drawBricks() {
    const checkBricks = this.initBrick.bricks.filter((item) => item.every((check) => check.status === 0));

    if (checkBricks.length === 5) {
      return resetGame();
    }
    // updatePosition(this.ctx, this.initBrick,"brick")
  }

  drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.ballData.posX, this.ballData.posY, this.ballRadius, 0, Math.PI * 2);
    this.ctx = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawPaddle() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.paddleX,
      this.canvas.height - this.initPaddle.paddleHeight,
      this.initPaddle.paddleWidth,
      this.initPaddle.paddleHeight
    );
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }

  updatePosition() {
    const { brickColCount, brickRowCount, bricks } = this.initBrick;
    for (let col = 0; col < brickColCount; col++) {
      for (let row = 0; row < brickRowCount; row++) {
        if (bricks[col][row].status === 1) {
          //
        }
      }
    }
  }
}

export default Draws;
