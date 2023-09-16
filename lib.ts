import { dlopen, ptr, suffix } from "bun:ffi";
import { Color, Colors, Keys, Vector2, f32, i32, isInteger, throwIfNotF32, throwIfNotI32, toCString, vec2DToArray } from "./utils";

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
    }
});

export function initWindow(width: i32, height: i32, title: string) {
    raylib.InitWindow(width, height, toCString(title));
}

function toColor(color: Color) : number {
    if(typeof color === "number") return color;
    return Colors[color];
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

export function drawCircleGradient(centerX: i32, centerY: i32, radiusF: f32, colorFrom: keyof typeof Colors | number, colorTo: keyof typeof Colors | number) {
    throwIfNotI32(centerX, "centerX");
    throwIfNotI32(centerY, "centerY");
    throwIfNotF32(radiusF, "radiusF");
    if(typeof colorFrom === "number" && !isInteger(colorFrom)) throw new Error("colorFrom isn't a i32");
    if(typeof colorTo === "number" && !isInteger(colorTo)) throw new Error("colorTo isn't a i32");
    raylib.DrawCircleGradient(centerX, centerY, radiusF, toColor(colorFrom), toColor(colorTo));
}

export function drawText(text: string, posX: number, posY: number, fontSize: number, color: Color) {
    throwIfNotI32(posX, "posX");
    throwIfNotI32(posY, "posY");
    throwIfNotI32(fontSize, "fontSize");
    if(typeof color === "number" && !isInteger(color)) throw new Error("color isn't a i32");
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
    return raylibPtr.ptr_DrawLineV(vec2DToArray(startPos), vec2DToArray(endPos), toColor(color));
}

export function drawTriangle(v1: Vector2, v2: Vector2, v3: Vector2, color: Color) {
    return raylibPtr.ptr_DrawTriangle(vec2DToArray(v1), vec2DToArray(v2), vec2DToArray(v3), toColor(color));
}