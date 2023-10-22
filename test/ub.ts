import { clearBackground, closeWindow, deltaTime, draw, drawCircle, drawTexture, imageResize, imageResizeNN, initWindow, isKeyDown, loadImage, loadTexture, loadTextureFromImage, run, setTargetFPS, unloadImage } from "bun-raylib/lib";
import { Keys, Vector2, clampVector, copyVector, newVector, roundVector } from "bun-raylib/utils";

const [WIDTH, HEIGHT] = [800, 450] as const;
const PLAYER_SIZE = 50;
let playerPos: Vector2 = { x: Math.round(WIDTH / 2), y: Math.round(HEIGHT / 2) };

function loadPlayerTexture() {
    let img = loadImage("./player.png");
    img = imageResizeNN(img, PLAYER_SIZE, PLAYER_SIZE);
    const texture = loadTextureFromImage(img);
    unloadImage(img);
    return texture;
}

function loadPlatformTexture() {
    const img = imageResizeNN(loadImage("./platform.png"), 100, 20);
    const texture = loadTextureFromImage(img);
    unloadImage(img);
    return texture;
}

initWindow(WIDTH, HEIGHT, "Hello World");
setTargetFPS(60);

const playerTexture = loadPlayerTexture();
const platformTexture = loadPlatformTexture();
let platformPos: Vector2 = { x: Math.round((WIDTH - platformTexture.width / 2) / 2), y: 300 };

run(() => {
    handleMovement();
    draw(() => {
        clearBackground("PURPLE");
        drawTexture(platformTexture, platformPos, "WHITE");
        drawTexture(playerTexture, playerPos, "WHITE");
    });
});

closeWindow();

function handleMovement() {
    let newPlayerPos: Vector2 = copyVector(playerPos);
    if(isKeyDown(Keys.KEY_W)) {
        newPlayerPos.y -= 300 * deltaTime();
    }
    if (isKeyDown(Keys.KEY_S)) {
        newPlayerPos.y += 300 * deltaTime();
    }
    if (isKeyDown(Keys.KEY_A)) {
        newPlayerPos.x -= 300 * deltaTime();
    }
    if (isKeyDown(Keys.KEY_D)) {
        newPlayerPos.x += 300 * deltaTime();
    }

    playerPos = clampVector(newVector(0), {x: WIDTH - PLAYER_SIZE, y: HEIGHT - PLAYER_SIZE}, roundVector(newPlayerPos));
}