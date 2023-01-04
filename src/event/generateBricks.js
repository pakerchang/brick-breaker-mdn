const generateBrick = (bricksData) => {
  let { brickColCount, brickRowCount, bricks } = bricksData;
  for (let col = 0; col < brickColCount; col++) {
    bricks[col] = [];
    for (let row = 0; row < brickRowCount; row++) {
      bricks[col][row] = { x: 0, y: 0, status: 1 };
    }
  }
  // const rows = new Array(brickRowCount).fill({ x: 0, y: 0, status: 1 });
  // bricks = new Array(brickColCount).fill(rows);
  return bricks;
};

export { generateBrick };
