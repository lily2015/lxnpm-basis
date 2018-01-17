import * as Tape from "blue-tape";
import { exec, execSync } from "child_process";
import * as path from "path";

// 清理
Tape("PackageBuild", async () => {
  const rootPath = path.resolve("./");
  const output = execSync(`ts-node ${rootPath}/tools/PackageBuild.ts`);
});
