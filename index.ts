import {
  clearBackground,
  closeWindow,
  draw,
  drawLineV,
  drawText,
  drawTriangle,
  getMouseX,
  getMouseY,
  initWindow,
  isKeyDown,
  run,
  setTargetFPS,
} from "./lib";
import { Keys } from "./utils";

const [WIDTH, HEIGHT] = [800, 450];

initWindow(WIDTH, HEIGHT, "Hello World");
setTargetFPS(60);

run(() => {
  draw(() => {
    clearBackground("RAY_WHITE");
    drawTriangle({x: 100.0, y: 10.0}, {x: 10.0, y: 100.0}, {x: 100.0, y: 100.0}, "BLACK");
    drawLineV({x: 100, y: 100}, {x: 200, y: 200}, "BLACK");
    if(isKeyDown(Keys.KEY_SPACE)) {
      drawText("Hello World", 190, 200, 20, "BLACK");
    }
    drawText("Mouse X: " + getMouseX(), WIDTH / 2, HEIGHT / 2 - 40, 20, "BLACK");
    drawText("Mouse Y: " + getMouseY(), WIDTH / 2, HEIGHT / 2 + 40, 20, "BLACK");
  });
});

closeWindow();