import * as Tape from "blue-tape";
import * as fs from "fs-extra";
import { DevPublishTask } from "../../../tools/task/DevPublishTask";

// 清理
Tape("DevPublishTask", async () => {
  const task = new DevPublishTask();
  console.log("===", task.start());
});
