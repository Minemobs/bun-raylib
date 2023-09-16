import { dlopen, ptr, suffix, read } from "bun:ffi";

const path = `${Bun.main.split("/").slice(0, -1).join("/")}/libtest.${suffix}`;

const {
  symbols: { add, printVec, freePtr },
} = dlopen(path, {
  add: {
    args: ["ptr", "ptr"],
    returns: "ptr",
  },
  printVec: {
    args: ["ptr"],
  },
  freePtr: {
    args: ["ptr"]
  }
});

function newVector(x: number, y: number, z: number) {
  return ptr(Int32Array.of(x, y, z));
}

const vec = add(newVector(10, 20, 30), newVector(-10, -20, -35))!;
printVec(vec);
freePtr(vec);