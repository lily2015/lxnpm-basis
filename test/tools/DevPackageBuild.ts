import * as Tape from "blue-tape";
import { exec, execSync } from "child_process";
import * as path from "path";

// 打包发布 - 开发测试
Tape("DevPackageBuild", async () => {
  const rootPath = path.resolve("./");
  console.log("rootPath > ", rootPath);
  const output = execSync(`ts-node ${rootPath}/tools/PackageBuild`);
});
