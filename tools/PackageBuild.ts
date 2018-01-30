#!/usr/bin/env node

import { argv } from "yargs";
import { Logger } from "./libs/Logger";
import { LoggerConsole as console } from "./libs/LoggerConsole";
import { CleanTask } from "./task/CleanTask";
import { ConfigTask } from "./task/ConfigTask";
import { HelperTask } from "./task/HelperTask";
import { PackageInfo } from "./task/PackageInfo";
import { PublishTask } from "./task/PublishTask";
import { TSCompileTask } from "./task/TSCompileTask";
import { UglifyJSTask } from "./task/UglifyJSTask";

class Build {
  public async startup() {
    new Logger().replaceConsole();
    // build 清理
    await new CleanTask().start();
    // config/app.json
    await new ConfigTask().run();
    // package.json
    await new PackageInfo(true);
    // 开始编译
    await new TSCompileTask().run();
    // 压缩
    await new UglifyJSTask().run();
    // 发布任务
    if (argv.publish) {
      await new PublishTask().start();
    }
  }
}
(async () => {
  new Build().startup();
})();
