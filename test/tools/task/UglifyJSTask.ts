import * as Tape from "blue-tape";
import * as fs from "fs-extra";
import { UglifyJSTask } from "../../../tools/task/UglifyJSTask";

// 清理
Tape("UglifyJSTask", async () => {
  await new UglifyJSTask().run();
});
