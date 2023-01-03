const generateBrick = (bricksData) => {
  let { brickColCount, brickRowCount, bricks } = bricksData;
  const rows = new Array(brickRowCount).fill({ x: 0, y: 0, status: 1 });
  bricks = new Array(brickColCount).fill(rows);
  return bricks;
};

export { generateBrick };
