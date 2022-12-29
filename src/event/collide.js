const collisionDetection = (brickData, canvasData) => {
  let { brickColCount, brickRowCount, brickHeight, brickWidth, bricks } = brickData;
  const { posX, posY } = canvasData;
  for (let col = 0; col < brickColCount; col++) {
    for (let row = 0; row < brickRowCount; row++) {
      let tempBricks = bricks[col][row];
      if (tempBricks.status === 1) {
        if (
          posX > tempBricks.x &&
          posX < tempBricks.x + brickWidth &&
          posY > tempBricks.y &&
          posY < tempBricks.y + brickHeight
        ) {
          canvasData.dy = -canvasData.dy;
          tempBricks.status = 0;
        }
      }
    }
  }
};

export { collisionDetection };
