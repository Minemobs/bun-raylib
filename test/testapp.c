#include "raylib.h"

Vector2 newVec(double x, double y) {
    Vector2 v = {x, y};
    return v;
}

int main() {
    const int screenWidth = 800;
    const int screenHeight = 450;

    InitWindow(screenWidth, screenHeight, "raylib [core] example - keyboard input");
    SetTargetFPS(60);
    while (!WindowShouldClose()) {
        BeginDrawing();
            ClearBackground(RAYWHITE);
            DrawText("move the ball with arrow keys", 10, 10, 20, DARKGRAY);
            DrawTriangle(newVec(100, 10), newVec(10, 100), newVec(100, 100), RED);
        EndDrawing();
    }
    CloseWindow();

    return 0;
}