#include "raylib.h"
#include <stdio.h>

Vector2 newVec(double x, double y) {
    Vector2 v = {x, y};
    return v;
}

int main() {
    const int WIDTH = 800;
    const int HEIGHT = 450;

    InitWindow(WIDTH, HEIGHT, "raylib [core] example - keyboard input");
    SetTargetFPS(60);
    while (!WindowShouldClose()) {
        BeginDrawing();
            ClearBackground(RAYWHITE);
        EndDrawing();
    }

    CloseWindow();
    return 0;
}