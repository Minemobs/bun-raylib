import { dlopen, read, suffix } from "bun:ffi";
import { Color, Colors, Keys, MouseButton, Texture2D, Vector2, f32, i32, isInteger, textureToPointer, throwIfNotF32, throwIfNotI32, throwIfNotU32, toCString, vec2DToArray } from "./utils";

const path = `libraylib.${suffix}`;

const {
  symbols: raylib
} = dlopen(path, {
    InitWindow: {
        args: ["i32", "i32", "cstring"]
    },
    WindowShouldClose: {
        returns: "bool"
    },
    BeginDrawing: {},
    EndDrawing: {},
    CloseWindow: {},
    ClearBackground: {
        args: ["i32"]
    },
    DrawText: {
        args: ["cstring", "i32", "i32", "i32", "i32"]
    },
    SetTargetFPS: {
        args: ["i32"]
    },
    DrawCircleGradient: {
        args: ["f32", "i32", "i32", "i32", "i32"]
    },
    DrawFPS: {
        args: ["i32", "i32"]
    },
    IsKeyDown: {
        args: ["i32"],
        returns: "bool"
    },
    IsKeyReleased: {
        args: ["i32"],
        returns: "bool"
    },
    IsKeyPressed: {
        args: ["i32"],
        returns: "bool"
    },
    GetMouseX: {
        returns: "i32"
    },
    GetMouseY: {
        returns: "i32"
    },
    GetKeyPressed: {
        returns: "i32"
    },
    GetCharPressed: {
        returns: "i32"
    },
    IsMouseButtonReleased: {
        args: ["i32"],
        returns: "bool"
    },
    IsMouseButtonPressed: {
        args: ["i32"],
        returns: "bool"
    },
    IsMouseButtonDown: {
        args: ["i32"],
        returns: "bool"
    },
    DrawCircle: {
        args: ["i32", "i32", "f32", "i32"]
    },
    DrawRectangle: {
        args: ["i32", "i32", "i32", "i32", "i32"]
    },
    DrawLine: {
        args: ["i32", "i32", "i32", "i32", "i32"]
    },
    DrawPixel: {
        args: ["i32", "i32", "i32"]
    },
    GetFrameTime: {
        returns: "f32"
    },
    GetTime: {
        returns: "f64"
    }
});

const {
    symbols: raylibPtr,
} = dlopen(`libraylibptr.${suffix}`, {
    ptr_DrawLineV: {
        args: ["ptr", "ptr", "i32"],
    },
    ptr_DrawTriangle: {
        args: ["ptr", "ptr", "ptr", "i32"]
    },
    ptr_LoadTexture: {
        args: ["cstring"],
        returns: "ptr"
    },
    ptr_UnloadTexture: {
        args: ["ptr"]
    },
    ptr_DrawTexture: {
        args: ["ptr", "i32", "i32", "i32"]
    },
    freeMem: {
        args: ["ptr"]
    },
    ptr_DrawLineEx: {
        args: ["ptr", "ptr", "f32", "i32"]
    },
});

export function initWindow(width: i32, height: i32, title: string) {
    raylib.InitWindow(width, height, toCString(title));
}

function toColor(color: Color, variableName = "color") : number {
    if(typeof color === "string") return Colors[color];
    throwIfNotU32(color, variableName);
    return color;
}

export function clearBackground(color: Color) {
    raylib.ClearBackground(toColor(color));
}

export function draw(callback: () => void) {
    raylib.BeginDrawing();
    callback();
    raylib.EndDrawing();
}

export function run(callback: () => void) {
    while(!raylib.WindowShouldClose()) {
        callback();
    }
}

export function setTargetFPS(fps: i32) {
    throwIfNotI32(fps, "fps");
    raylib.SetTargetFPS(fps);
}

export function closeWindow() {
    raylib.CloseWindow();
}

export function drawCircleGradient(centerX: i32, centerY: i32, radiusF: f32, colorFrom: Color, colorTo: Color) {
    throwIfNotI32(centerX, "centerX");
    throwIfNotI32(centerY, "centerY");
    throwIfNotF32(radiusF, "radiusF");
    raylib.DrawCircleGradient(centerX, centerY, radiusF, toColor(colorFrom, "colorFrom"), toColor(colorTo, "colorTo"));
}

export function drawText(text: string, posX: number, posY: number, fontSize: number, color: Color) {
    throwIfNotI32(posX, "posX");
    throwIfNotI32(posY, "posY");
    throwIfNotI32(fontSize, "fontSize");
    raylib.DrawText(toCString(text), posX, posY, fontSize, toColor(color));
}

export function isKeyDown(key: Keys) : boolean {
    return raylib.IsKeyDown(key);
}
export function isKeyPressed(key: Keys) : boolean {
    return raylib.IsKeyPressed(key);
}
export function isKeyReleased(key: Keys) : boolean {
    return raylib.IsKeyReleased(key);
}

export function getMouseX() {
    return raylib.GetMouseX();
}

export function getMouseY() {
    return raylib.GetMouseY();
}

export function getCharPressed() : i32 {
    return raylib.GetCharPressed();
}

export function getKeyPressed() : Keys {
    return raylib.GetKeyPressed();
}

export function drawLineV(startPos: Vector2, endPos: Vector2, color: Color) {
    throwIfNotI32(startPos.x, "startPos.x");
    throwIfNotI32(startPos.y, "startPos.y");
    throwIfNotI32(endPos.x, "endPos.x");
    throwIfNotI32(endPos.y, "endPos.y");
    return raylibPtr.ptr_DrawLineV(vec2DToArray(startPos), vec2DToArray(endPos), toColor(color));
}

export function drawTriangle(v1: Vector2, v2: Vector2, v3: Vector2, color: Color) {
    throwIfNotI32(v1.x, "v1.x");
    throwIfNotI32(v1.y, "v1.y");
    throwIfNotI32(v2.x, "v2.x");
    throwIfNotI32(v2.y, "v2.y");
    throwIfNotI32(v3.x, "v3.x");
    throwIfNotI32(v3.y, "v3.y");
    return raylibPtr.ptr_DrawTriangle(vec2DToArray(v1), vec2DToArray(v2), vec2DToArray(v3), toColor(color));
}

export function isMouseButtonReleased(button: MouseButton) {
    return raylib.IsMouseButtonReleased(button);
}

export function isMouseButtonDown(button: MouseButton) {
    return raylib.IsMouseButtonDown(button);
}

export function isMouseButtonPressed(button: MouseButton) {
    return raylib.IsMouseButtonPressed(button);
}

export function loadTexture(filePath: string) : Texture2D {
    const pointer = raylibPtr.ptr_LoadTexture(toCString(filePath))!;
    const texture : Texture2D = {
        id: read.u32(pointer, 0),
        width: read.i32(pointer, 4),
        height: read.i32(pointer, 8),
        mimaps: read.i32(pointer, 12),
        format: read.i32(pointer, 16)
    };
    raylibPtr.freeMem(pointer);
    return texture;
}

export function unloadTexture(texture: Texture2D) {
    raylibPtr.ptr_UnloadTexture(textureToPointer(texture));
}

export function drawTexture(texture: Texture2D, vec: Vector2, color: Color) {
    throwIfNotI32(vec.x, "pos.x");
    throwIfNotI32(vec.y, "pos.y");
    raylibPtr.ptr_DrawTexture(textureToPointer(texture), vec.x, vec.y, toColor(color));
}

export function drawFPS(posX: i32, posY: i32) {
    throwIfNotI32(posX, "posX");
    throwIfNotI32(posY, "posY");
    raylib.DrawFPS(posX, posY);
}

export function drawCircle(centerX: i32, centerY: i32, radiusF: f32, color: Color) {
    throwIfNotI32(centerX, "centerX");
    throwIfNotI32(centerY, "centerY");
    throwIfNotF32(radiusF, "radiusF");
    raylib.DrawCircle(centerX, centerY, radiusF, toColor(color));
}

export function drawRectangle(posX: i32, posY: i32, width: i32, height: i32, color: Color) {
    throwIfNotI32(posX, "posX");
    throwIfNotI32(posY, "posY");
    throwIfNotI32(width, "width");
    throwIfNotI32(height, "height");
    raylib.DrawRectangle(posX, posY, width, height, toColor(color));
}

export function drawPixel(posX: i32, posY: i32, color: Color) {
    throwIfNotI32(posX, "posX");
    throwIfNotI32(posY, "posY");
    raylib.DrawPixel(posX, posY, toColor(color));
}

export function drawLine(startPos: Vector2, endPos: Vector2, color: Color) {
    throwIfNotI32(startPos.x, "startPos.x");
    throwIfNotI32(startPos.y, "startPos.y");
    throwIfNotI32(endPos.x, "endPos.x");
    throwIfNotI32(endPos.y, "endPos.y");
    raylib.DrawLine(startPos.x, startPos.y, endPos.x, endPos.y, toColor(color));
}

export function drawLineEx(startPos: Vector2, endPos: Vector2, thick: number, color: Color) {
    throwIfNotI32(startPos.x, "startPos.x");
    throwIfNotI32(startPos.y, "startPos.y");
    throwIfNotI32(endPos.x, "endPos.x");
    throwIfNotI32(endPos.y, "endPos.y");
    throwIfNotF32(thick, "thick");
    raylibPtr.ptr_DrawLineEx(vec2DToArray(startPos), vec2DToArray(endPos), thick, toColor(color));
}

export function getFrameTime() {
    return raylib.GetFrameTime();
}

export function deltaTime() {
    return getFrameTime();
}

export function getTime() {
    return raylib.GetTime();
}