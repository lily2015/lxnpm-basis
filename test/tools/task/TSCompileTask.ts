import * as Tape from "blue-tape";
import * as fs from "fs-extra";
import { TSCompileTask } from "../../../tools/task/TSCompileTask";
// 编译目标文件是否存在
/* Tape("Tapetest", async () => {
  const folder = ["tools", "web", "src"];
  for (const item of folder) {
    fs.exists(item, (exists) => {
      console.log("exists==", exists);
    });
  }
}); */

// 编译
Tape("Tapetest", async () => {
  await new TSCompileTask().run();
});
