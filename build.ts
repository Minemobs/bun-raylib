import { suffix } from 'bun:ffi';

const files = ["lib", "utils"];

for(const file of files) {
    Bun.write(`./dist/${file}.ts`, Bun.file(`./src/${file}.ts`));
};

Bun.write("./dist/libraylib." + suffix, Bun.file("./natives/raylib/build/raylib/libraylib." + suffix));
await Bun.write("./dist/libraylibptr." + suffix, Bun.file("./libraylibptr." + suffix));