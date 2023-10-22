import { checkCollisionRecs, clearBackground, closeWindow, deltaTime, draw, drawTexture, imageResizeNN, initWindow, isKeyDown, loadImage, loadTextureFromImage, run, setTargetFPS, unloadImage, unloadTexture } from "bun-raylib/lib";
import { Keys, Rectangle, Texture, Vector2, clampVector, copyVector, newVector, roundVector } from "bun-raylib/utils";

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
let jumpingTick = 0;

run(() => {
    handleMovement();
    draw(() => {
        clearBackground("PURPLE");
        drawTexture(platformTexture, platformPos, "WHITE");
        drawTexture(playerTexture, playerPos, "WHITE");
    });
});

unloadTexture(playerTexture);
unloadTexture(platformTexture);
closeWindow();

function handleMovement() {
    let newPlayerPos: Vector2 = copyVector(playerPos);
    const movementSpeed = 300 * deltaTime();
    const platformRect = newRectangle(platformPos, { x: platformTexture.width, y: platformTexture.height });
    if(jumpingTick !== 0) {
        jumpingTick--;
        newPlayerPos.y -= 100 * deltaTime();
    }
    if (isKeyDown(Keys.KEY_A)) {
        newPlayerPos.x -= movementSpeed;
    }
    if (isKeyDown(Keys.KEY_D)) {
        newPlayerPos.x += movementSpeed;
    }
    const isOnGround = checkCollisionRecs(newRectangle(playerPos, newVector(PLAYER_SIZE)), platformRect);
    if (isKeyDown(Keys.KEY_SPACE) && isOnGround) {
        jumpingTick = 40;
    } else if(!isOnGround && jumpingTick === 0) {
        newPlayerPos.y += 200 * deltaTime();
    }
    playerPos = clampVector(newVector(0), {x: WIDTH - PLAYER_SIZE, y: HEIGHT - PLAYER_SIZE}, roundVector(newPlayerPos));
    if(playerPos.y === HEIGHT - PLAYER_SIZE) {
        playerPos.y = Math.round(HEIGHT / 2);
        playerPos.x = Math.round(WIDTH / 2);
    }
}

function newRectangle(pos: Vector2, size: Vector2): Rectangle {
    return { x: pos.x, y: pos.y, width: size.x, height: size.y };
}