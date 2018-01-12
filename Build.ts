import { argv } from "yargs";
import { HelperTask } from "./tools/task/HelperTask";
// import { PackageInfo } from "./task/PackageInfo";
// import { PublishTask } from "./task/PublishTask";
// import { ShellTask } from "./task/ShellTask";
// import { SonarqubeScanner } from "./task/SonarqubeScanner";
// import { UglifyJSTask } from "./task/UglifyJSTask";

class Build {
  public async startup() {
    const task = new HelperTask();
    // if (argv.publish) {
    //   await new SonarqubeScanner().startup();
    // }
    // 清理及数据准备工作
    task.init();
    task.start();
    await task.cleanAndReplaceAsync();

    // 开始编译工作
    // await new PackageInfo().run();
    // await new ShellTask().run("tsc -p tools");
    // await new UglifyJSTask().run();
    // if (argv.publish) {
    //   开始发布任务
    //   await new PublishTask().start();
    // }
    task.end();
  }

}
(async () => {
  new Build().startup();
})();
