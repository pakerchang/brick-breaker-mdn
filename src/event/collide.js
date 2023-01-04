import { updatePosition } from "@/event/updateState";

const collisionDetection = (brickData, ballData) => updatePosition(null, brickData, "collide", ballData);

export { collisionDetection };
