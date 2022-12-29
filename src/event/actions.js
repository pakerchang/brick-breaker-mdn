const keyDownHandler = (paddleData, e) => {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddleData.rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddleData.leftPressed = true;
  }

  return paddleData;
};

const keyUpHandler = (paddleData, e) => {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddleData.rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddleData.leftPressed = false;
  }

  return paddleData;
};

export { keyDownHandler, keyUpHandler };
