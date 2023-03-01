const updatePosition = (ctx, bricksData, updateType, ballData) => {
  const { brickColCount, brickRowCount } = bricksData;
  const { bricks } = bricksData;
  for (let col = 0; col < brickColCount; col++) {
    for (let row = 0; row < brickRowCount; row++) {
      if (bricks[col][row].status === 1) {
        updateType === "brick"
          ? updateBricks(ctx, bricks[col][row], bricksData, col, row)
          : updateCollide(bricks[col][row], bricksData, ballData);
      }
    }
  }
};

const updateBricks = (ctx, singleBrick, bricksData, colIndex, rowIndex) => {
  const { brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop } = bricksData;
  // Still need to fix props data
  let brickX = colIndex * (brickWidth + brickPadding) + brickOffsetLeft;
  let brickY = rowIndex * (brickHeight + brickPadding) + brickOffsetTop;
  singleBrick.x = brickX;
  singleBrick.y = brickY;
  ctx.beginPath();
  ctx.rect(brickX, brickY, brickWidth, brickHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const updateCollide = (singleBrick, bricksData, ballData) => {
  const { posX, posY } = ballData;
  const { brickWidth, brickHeight } = bricksData;
  const adjustAngle = (brickData, ballData, brickSize) => {
    const vertical = brickSize.brickHeight / 2;
    const horizontal = brickSize.brickWidth / 2; // main
    const collidePosX = ballData.posX - brickData.x;
    const collidePosY = ballData.posY - brickData.y;

    const collideHorizontal = collidePosX < horizontal ? "left" : "right";
    const collideVertical = collidePosY < vertical ? "top" : "bottom";

    // if < 37.5 return minus angle
    // else return plus angle

    return { collideHorizontal, collideVertical };
  };

  if (
    posX > singleBrick.x &&
    posX < singleBrick.x + brickWidth &&
    posY > singleBrick.y &&
    posY < singleBrick.y + brickHeight
  ) {
    const getBallAngle = adjustAngle(singleBrick, ballData, { brickWidth, brickHeight });
    // console.log(getBallAngle);

    // Add brick width position to change ballData's dy
    // Add a function to handle this
    ballData.dy = -ballData.dy;
    singleBrick.status = 0;
  }
};

export { updatePosition };
