#!/usr/bin/env node
import { argv } from "yargs";
import { Config } from "../web/libs/Config";
import { Logger } from "./libs/Logger";
import { LoggerConsole as console } from "./libs/LoggerConsole";
import { CleanTask } from "./task/CleanTask";
import { ConfigTask } from "./task/ConfigTask";
import { DevPublishTask } from "./task/DevPublishTask";
import { HelperTask } from "./task/HelperTask";
import { PackageInfo } from "./task/PackageInfo";
import { TSCompileTask } from "./task/TSCompileTask";
import { UglifyJSTask } from "./task/UglifyJSTask";

class Build {
  public async startup() {
    new Logger().replaceConsole();
    // build 清理
    new CleanTask().start();
    // config/app.json
    await new ConfigTask().run();
    // package.json
    await new PackageInfo(true);
    // 开始编译
    await new TSCompileTask().run();
    // await new UglifyJSTask().run();
    // 输出到目标文件夹
    const appJson = await new Config().getAppConfigJson();
    await new DevPublishTask().start(appJson.devOutputPath, appJson.devOutputBin);
  }
}
(async () => {
  new Build().startup();
})();
