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
    Texture* texture = malloc(sizeof(Texture));
    Texture t = LoadTexture(fileName);
    *texture = t;
    return texture;
}

RLAPI Texture* ptr_LoadTextureFromImage(Image* image) {
    Texture* texture = malloc(sizeof(Texture));
    //SEGFAULTS HERE
    Texture t = LoadTextureFromImage(*image);
    *texture = t;
    return texture;
}

RLAPI Image* ptr_LoadImage(const char* fileName) {
    Image* image = malloc(sizeof(Image));
    Image t = LoadImage(fileName);
    *image = t;
    return image;
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

RLAPI void ptr_ImageResize(Image* image, int width, int height) {
    ImageResize(image, width, height);
}

RLAPI void ptr_ImageResizeNN(Image* image, int width, int height) {
    ImageResizeNN(image, width, height);
}

RLAPI void ptr_UnloadImage(Image* image) {
    UnloadImage(*image);
}