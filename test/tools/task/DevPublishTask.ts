import * as Tape from "blue-tape";
import * as fs from "fs-extra";
import { DevPublishTask } from "../../../tools/task/DevPublishTask";

// 清理
Tape("DevPublishTask", async () => {
  const outputPath = "/Users/lixue/lily2015/koa-react/node_modules/lxnpm-basis/";
  const outputBin = "/Users/lixue/lily2015/koa-react/node_modules/.bin/";
  console.log("===", new DevPublishTask().start(outputPath, outputBin));
});
