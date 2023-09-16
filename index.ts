import {
  clearBackground,
  closeWindow,
  draw,
  drawText,
  initWindow,
  run,
  setTargetFPS,
} from "./lib";

const [WIDTH, HEIGHT] = [800, 450];

initWindow(WIDTH, HEIGHT, "Hello World");
setTargetFPS(60);

run(() => {
  draw(() => {
    clearBackground("WHITE");
    drawText("Hello World", 190, 200, 20, "BLACK");
  });
});

closeWindow();