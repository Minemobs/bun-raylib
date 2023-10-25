import {
  newVector,
  clearBackground,
  closeWindow,
  draw,
  drawCircle,
  drawFPS,
  drawLineEx,
  drawLineV,
  drawText,
  drawTriangle,
  getMouseX,
  getMouseY,
  initWindow,
  isKeyDown,
  isMouseButtonReleased,
  run,
  setTargetFPS,
  Keys,
  MouseButton,
  Vector2,
  i32,
  isInteger,
  clamp
} from "..";
import { beginMode2D, endMode2D } from "../src/lib";
import { Camera2D } from "../src/utils";

const [WIDTH, HEIGHT] = [800, 450] as const;

initWindow(WIDTH, HEIGHT, "Hello World");
setTargetFPS(60);

function testAllFunctions() {
  const array : Vector2[] = [];
  const camera: Camera2D = {
    offset: newVector(0),
    target: newVector(0),
    rotation: 0,
    zoom: 1
  };
  run(() => {
    draw(() => {
      drawFPS(10, 10);
      clearBackground("RAY_WHITE");
      beginMode2D(camera);
      drawTriangle({x: 100.0, y: 10.0}, {x: 10.0, y: 100.0}, {x: 100.0, y: 100.0}, "BLACK");
      drawLineV({x: 100, y: 100}, {x: 200, y: 200}, "BLACK");
      endMode2D();
      if(isMouseButtonReleased(MouseButton.LEFT)) {
        if(array.length == 2) {
          array[0] = array[1];
          array[1] = {x: getMouseX(), y: getMouseY()};
        } else {
          array.push({x: getMouseX(), y: getMouseY()});
        }
      }
      if(isKeyDown(Keys.KEY_SPACE)) {
        if(isKeyDown(Keys.KEY_LEFT_CONTROL)) camera.zoom -= 0.1;
        else camera.zoom += 0.1;
        camera.zoom = clamp(1, 2, camera.zoom);
      }
      if(array.length === 2) {
        drawLineEx(array[0], array[1], 10, "RED");
      }
      if(isKeyDown(Keys.KEY_SPACE)) {
        drawText("Hello World", 190, 200, 20, "BLACK");
      }
      drawText("Mouse X: " + getMouseX(), WIDTH / 2, HEIGHT / 2 - 40, 20, "BLACK");
      drawText("Mouse Y: " + getMouseY(), WIDTH / 2, HEIGHT / 2 + 40, 20, "BLACK");
    });
  });
}

function graph(margin: i32 = 100) {
  const pts: number[] = [];
  const mathFunction = (x: number) => x**2;
  for(let i = -100; i <= 100; i += 10) {
    const y = mathFunction(i);
    if(!isInteger(y)) continue;
    pts.push(y);
  }
  const x = (WIDTH - 2 * margin) / (pts.length - 1);
  const scale = (HEIGHT - 2 * margin) / pts.reduce((prev, curr) => Math.max(prev, curr), 0);
  
  run(() => {
    draw(() => {
      clearBackground("RAY_WHITE");
      const points = pts.map((y, i) => ({x: Math.round(margin + i * x), y: Math.round(HEIGHT - margin - scale * y)}));
      for(let i = 1; i < points.length; i++) {
        drawLineEx(points[i - 1], points[i], 3, "BLUE");
      }
      points.forEach(p => drawCircle(p.x, p.y, 2, "BLACK"));
    });
  });
}

// graph();
testAllFunctions();

closeWindow();
