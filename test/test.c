#include <stdio.h>
#include <stdlib.h>
#include "test.h"

struct Vec3* add(struct Vec3* v1, struct Vec3* v2) {
  int x = v1->x + v2->x;
  int y = v1->y + v2->y;
  int z = v1->z + v2->z;
  struct Vec3* vec = malloc(sizeof(struct Vec3));
  vec->x = x;
  vec->y = y;
  vec->z = z;
  return vec;
}

void printVec(struct Vec3* vec) {
  printf("{x: %d, y: %d, z: %d}\n", vec->x, vec->y, vec->z);
}

void freePtr(struct Vec3* vec) {
  free(vec);
}