#include "raylib.h"
#include "raylibptr.h"

RLAPI void ptr_DrawLineV(Vector2* startPos, Vector2* endPos, Color color) {
    return DrawLineV(*startPos, *endPos, color);
}

RLAPI void ptr_DrawTriangle(Vector2* v1, Vector2* v2, Vector2* v3, Color color) {
    return DrawTriangle(*v1, *v2, *v3, color);
}