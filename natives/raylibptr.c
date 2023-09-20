#include "raylib.h"
#include <stdlib.h>
#include <stdio.h>
#include "raylibptr.h"

RLAPI void ptr_DrawLineV(Vector2* startPos, Vector2* endPos, Color color) {
    return DrawLineV(*startPos, *endPos, color);
}

RLAPI void ptr_DrawTriangle(Vector2* v1, Vector2* v2, Vector2* v3, Color color) {
    return DrawTriangle(*v1, *v2, *v3, color);
}

RLAPI Texture* ptr_LoadTexture(const char* fileName) {
    Texture* texture = calloc(1, sizeof(Texture));
    Texture t = LoadTexture(fileName);
    *texture = t;
    return texture;
}

RLAPI void ptr_DrawTexture(Texture* texture, int posX, int posY, Color tint) {
    DrawTexture(*texture, posX, posY, tint);
}

RLAPI void freeMem(void* ptr) {
    free(ptr);
}

RLAPI void ptr_UnloadTexture(Texture* texture) {
    UnloadTexture(*texture);
}

RLAPI void ptr_DrawLineEx(Vector2* startPos, Vector2* endPos, float thick, Color color) {
    DrawLineEx(*startPos, *endPos, thick, color);
}