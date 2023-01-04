const updatePosition = (ctx, bricksData) => {
  const { brickColCount, brickRowCount } = bricksData;
  let { bricks } = bricksData;
  for (let col = 0; col < brickColCount; col++) {
    for (let row = 0; row < brickRowCount; row++) {
      if (bricks[col][row].status === 1) {
        return updateBricks(ctx, bricks[col][row], bricksData, col, row);
      }
    }
  }
};

const updateBricks = (ctx, singleBrick, bricksData, colIndex, rowIndex) => {
  const { brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop } = bricksData;
  // Still need to fix props data
  // How to get index of col and row?
  let brickX = colIndex * (brickWidth + brickPadding) + brickOffsetLeft;
  let brickY = rowIndex * (brickHeight + brickPadding) + brickOffsetTop;

  singleBrick.x = brickX;
  singleBrick.y = brickY;
  
  ctx.beginPath();
  ctx.rect(brickX, brickY, bricksData.brickWidth, bricksData.brickHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const updateCollide = () => {};

export { updatePosition, updateBricks, updateCollide };
