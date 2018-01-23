import * as Tape from "blue-tape";
import { exec, execSync } from "child_process";
import * as path from "path";

// 编译
Tape("ProjectBuild", async () => {
  const rootPath = path.resolve("./");
  const output = execSync(`ts-node ${rootPath}/tools/ProjectBuild.ts`);
});

// 编译 --watch
/* Tape("ProjectBuildWatch", async () => {
  const rootPath = path.resolve("./");
  const output = execSync(`ts-node ${rootPath}/tools/ProjectBuild.ts --watch`);
}); */
