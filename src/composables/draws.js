class Draws {
  constructor() {
    this.brickColor = "#0095DD";
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
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
    this.paddleX = (this.canvas.width - this.initPaddle.paddleWidth) / 2;
    this.interval = undefined;
  }
  getKeyPressDown(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.initPaddle.rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.initPaddle.leftPressed = true;
    }
  }

  getKeyPressUp(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.initPaddle.rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.initPaddle.leftPressed = false;
    }
  }

  generateBricks() {
    for (let col = 0; col < this.initBrick.brickColCount; col++) {
      this.initBrick.bricks[col] = [];
      for (let row = 0; row < this.initBrick.brickRowCount; row++) {
        this.initBrick.bricks[col][row] = { x: 0, y: 0, status: 1 };
      }
    }
  }

  resetGame() {
    clearInterval(this.interval);
    window.location.reload();
  }
  mappingBrick(fn) {
    for (let col = 0; col < this.initBrick.brickColCount; col++) {
      for (let row = 0; row < this.initBrick.brickRowCount; row++) {
        if (this.initBrick.bricks[col][row].status === 1) {
          this.initBrick.bricks[col][row] = fn(this.ctx, this.brickColor, col, row, this.initBrick);
        }
      }
    }
  }

  draw() {
    if (
      this.ballData.posX + this.ballData.dx > this.canvas.width - this.ballRadius ||
      this.ballData.posX + this.ballData.dx < this.ballRadius
    ) {
      this.ballData.dx = -this.ballData.dx;
    }

    if (this.ballData.posY + this.ballData.dy < this.ballRadius) {
      this.ballData.dy = -this.ballData.dy;
    }

    if (this.ballData.posY + this.ballData.dy > this.canvas.height - this.ballRadius) {
      if (this.ballData.posY > this.paddleX && this.ballData.posX < this.paddleX + this.initPaddle.paddleWidth) {
        if ((this.ballData.posY = this.ballData.posY - this.initPaddle.paddleHeight)) {
          this.ballData.dy = -this.ballData.dy;
        }
      } else {
        // alert("GAME OVER");
        // this.resetGame();
      }
    }

    this.ballData.posX += this.ballData.dx;
    this.ballData.posY += this.ballData.dy;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.mappingBrick(this.drawBricks);
    this.drawPaddle();
    this.drawBall();
  }

  drawBricks(ctx, brickColor, col, row, brickData) {
    const { brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft, bricks } = brickData;
    const checkBricks = bricks.filter((item) => item.every((check) => check.status === 0));

    if (checkBricks.length === 5) {
      // alert("Good Game")
      return this.resetGame();
    }
    let brickX = col * (brickWidth + brickPadding) + brickOffsetLeft;
    let brickY = row * (brickHeight + brickPadding) + brickOffsetTop;

    bricks[col][row].x = brickX;
    bricks[col][row].y = brickY;
    ctx.beginPath();
    ctx.rect(brickX, brickY, brickWidth, brickHeight);
    ctx.fillStyle = brickColor;
    ctx.closePath();
    ctx.fill();
    ctx.closePath();
    return bricks[col][row];
  }

  drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.ballData.posX, this.ballData.posY, this.ballRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.brickColor;
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
    this.ctx.fillStyle = this.brickColor;
    this.ctx.fill();
    this.ctx.closePath();
  }

  updateCollide(singleBrick) {
    const { posX, posY } = this.ballData;
    const { brickWidth, brickHeight } = this.initBrick;
    const posXMaxRange = singleBrick.x + brickWidth;
    const posYMaxRange = singleBrick.y + brickHeight;

    function adjustAngle() {
      const vertical = brickHeight / 2;
      const horizontal = brickWidth / 2;
      const collidePosX = posX - singleBrick.x;
      const collidePosY = posY - singleBrick.y;

      const collideHorizontal = collidePosX < horizontal ? "left" : "right";
      const collideVertical = collidePosY < vertical ? "top" : "bottom";

      return { collideHorizontal, collideVertical };
    }
    if (posX > singleBrick.x && posX < posXMaxRange && posY < singleBrick.y && posYMaxRange) {
      const getBallAngle = adjustAngle();
      // console.log(getBallAngle);
      // console.log(this.initBrick.bricks);
      //
      // is possiable use getBallAngle data to change ball dy or dx
      this.ballData.dy = -this.ballData.dy;
      singleBrick.status = 0;
    }
  }
  initGame() {
    document.addEventListener("keydown", (e) => this.getKeyPressDown(e), false);
    document.addEventListener("keyup", (e) => this.getKeyPressUp(e), false);
    document.getElementById("paused").addEventListener("click", (e) => (this.isPause = true));
    document.getElementById("start").addEventListener("click", (e) => (this.isPause = false));
    this.generateBricks();

    return (this.interval = setInterval(() => !this.isPause && this.draw(), 10));
  }
}

export default Draws;
