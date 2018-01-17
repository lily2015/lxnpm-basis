import * as Tape from "blue-tape";
import * as fs from "fs-extra";
import { CleanTask } from "../../../tools/task/CleanTask";

// 清理
Tape("CleanTask", async () => {
  await new CleanTask().start();
});
