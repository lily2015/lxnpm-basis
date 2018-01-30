#!/usr/bin/env node

import { argv } from "yargs";
import { Logger } from "./libs/Logger";
import { LoggerConsole as console } from "./libs/LoggerConsole";
import { CleanTask } from "./task/CleanTask";
import { ConfigTask } from "./task/ConfigTask";
import { HelperTask } from "./task/HelperTask";
import { PackageInfo } from "./task/PackageInfo";
// import { PublishTask } from "./task/PublishTask";
import { TSCompileTask } from "./task/TSCompileTask";
import { UglifyJSTask } from "./task/UglifyJSTask";

class Build {
  public async startup() {
    await new Logger().replaceConsole();
    // build 清理
    await new CleanTask().start();
    // config/app.json
    await new ConfigTask().run();
    // 取cdn
    const packageInfo = await new PackageInfo(true);
    const cdn = packageInfo.getCDN();
    // 开始编译
    await new TSCompileTask().run();
    await new UglifyJSTask().run();

  }
}
(async () => {
  new Build().startup();
})();
