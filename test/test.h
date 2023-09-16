struct Vec3 {
  int x;
  int y;
  int z;
};

struct Vec3* add(struct Vec3* v1, struct Vec3* v2);
void printVec(struct Vec3* vec);
void freePtr(struct Vec3* vec);