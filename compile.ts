import { suffix } from "bun:ffi";
import { existsSync } from "fs";

const raylibPath = Bun.main.split("/").slice(0, -1).join("/") + "/natives/raylib";
const raylibBuildPath = raylibPath + "/build";

if(!existsSync(raylibBuildPath)) throw new Error("The folder " + raylibPath + " doesn't exist. Please clone the repository correctly");

if(!existsSync(raylibBuildPath)) {
    Bun.spawnSync({ cwd: raylibBuildPath, cmd: ["mkdir build"] });
}

const cmakeStep = Bun.spawnSync({
    cwd: raylibBuildPath,
    cmd: ["cmake", "-DBUILD_SHARED_LIBS=ON", ".."]
});

if(!cmakeStep.success) {
    throw new Error(new TextDecoder().decode(cmakeStep.stderr));
}

const makeStep = Bun.spawnSync({
    cwd: raylibBuildPath,
    cmd: ["make"]
});

if(!makeStep.success) {
    throw new Error(new TextDecoder().decode(makeStep.stderr));
}

const symLinkStep = Bun.spawnSync({
    cmd: ["ln", "-s", "./natives/raylib/build/raylib/libraylib." + suffix, "."]
});