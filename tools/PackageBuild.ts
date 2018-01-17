import { argv } from "yargs";
import { Logger } from "./libs/Logger";
import { LoggerConsole as console } from "./libs/LoggerConsole";
import { CleanTask } from "./task/CleanTask";
import { HelperTask } from "./task/HelperTask";
import { PackageInfo } from "./task/PackageInfo";
import { PublishTask } from "./task/PublishTask";
import { TSCompileTask } from "./task/TSCompileTask";
import { UglifyJSTask } from "./task/UglifyJSTask";

class Build {
  public async startup() {
    // build 清理
    await new CleanTask().start();
    // 开始编译
    await new TSCompileTask().run();
    await new UglifyJSTask().run();
    // 发布任务
    if (argv.publish) {
      await new PackageInfo(true);
      await new PublishTask().start();
    }
  }
}
(async () => {
  new Build().startup();
})();
