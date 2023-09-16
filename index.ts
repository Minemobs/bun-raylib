import { dlopen, ptr, suffix, read, CString } from "bun:ffi";

const path = `libraylib.${suffix}`;

const Colors = {
    LIGHT_GRAY: getColor(200, 200, 200),
    GRAY: getColor(130, 130, 130),
    DARK_GRAY: getColor(80, 80, 80),
} as const;

const {
  symbols: { InitWindow, WindowShouldClose, BeginDrawing, ClearBackground, DrawText, EndDrawing, CloseWindow, SetTargetFPS, DrawCircleGradient },
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
    }
});

function clamp(min: number, max: number, num: number) {
    return Math.min(Math.max(num, min), max);
}

export function getColor(r: number, g: number, b: number, a = 255) {

    return (clamp(0, 255, r) & 0xff) | ((clamp(0, 255, g) & 0xff) << 8) | ((clamp(0, 255, b) & 0xff) << 16) | ((clamp(0, 255, a) & 0xff) << 24);
}

export function toCString(str: string) {
    return new TextEncoder().encode(str);
}

InitWindow(800, 450, toCString("raylib [core] example - basic window"));
SetTargetFPS(60);

while (!WindowShouldClose())
{
    BeginDrawing();
        ClearBackground(0xFFFFFF);
        DrawCircleGradient(60, 400, 200, Colors.LIGHT_GRAY, Colors.DARK_GRAY);
        DrawText(toCString("Congrats! You created your first window!"), 190, 200, 20, Colors.LIGHT_GRAY);
    EndDrawing();
}

CloseWindow();