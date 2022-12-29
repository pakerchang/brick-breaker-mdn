const killBricks = (bricksData) => {
  let { brickColCount, brickRowCount, bricks } = bricksData;
  for (let col = 0; col < brickColCount; col++) {
    bricks[col] = [];
    for (let row = 0; row < brickRowCount; row++) {
      bricks[col][row] = { x: 0, y: 0, status: 1 };
    }
  }
  return bricks;
};

export { killBricks };
