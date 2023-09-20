#pragma once
#include "raylib.h"

RLAPI void ptr_DrawLineV(Vector2* startPos, Vector2* endPos, Color color);
RLAPI void ptr_DrawTriangle(Vector2* v1, Vector2* v2, Vector2* v3, Color color);
RLAPI Texture* ptr_LoadTexture(const char* fileName);
RLAPI void ptr_DrawTexture(Texture* texture, int posX, int posY, Color tint);
RLAPI void ptr_UnloadTexture(Texture* texture);
RLAPI void freeMem(void* ptr);
RLAPI void ptr_DrawLineEx(Vector2* startPos, Vector2* endPos, float thick, Color color);
