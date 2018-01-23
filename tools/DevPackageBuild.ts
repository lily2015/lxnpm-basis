#!/usr/bin/env node

import { argv } from "yargs";
import { Logger } from "./libs/Logger";
import { LoggerConsole as console } from "./libs/LoggerConsole";
import { CleanTask } from "./task/CleanTask";
import { DevPublishTask } from "./task/DevPublishTask";
import { HelperTask } from "./task/HelperTask";
import { PackageInfo } from "./task/PackageInfo";
import { TSCompileTask } from "./task/TSCompileTask";
import { UglifyJSTask } from "./task/UglifyJSTask";

class Build {
  public async startup() {
    await new Logger().replaceConsole();
    // build 清理
    await new CleanTask().start();
    // 开始编译
    await new TSCompileTask().run();
    await new UglifyJSTask().run();
    // 发布任务
    await new PackageInfo(true);

    // 输出到目标文件夹
    // const outputPath = "/Users/lixue/lily2015/testPublish/";
    const outputPath = "/Users/lixue/lily2015/koa-react/node_modules/lxnpm-basis/";
    await new DevPublishTask().start(outputPath);
  }
}
(async () => {
  new Build().startup();
})();
