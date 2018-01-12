import { argv } from "yargs";
import { ConfigTask } from "./tools/task/ConfigTask";
import { HelperTask } from "./tools/task/HelperTask";
import { PublishTask } from "./tools/task/PublishTask";
import { ShellTask } from "./tools/task/ShellTask";
import { UglifyJSTask } from "./tools/task/UglifyJSTask";

class Build {
  public async startup() {
    const task = new HelperTask();
    // 清理及数据准备工作
    task.init();
    task.start();
    await task.cleanTaskAsync();
    // 配置文件
    await new ConfigTask().run();
    // 开始编译
    await new ShellTask().run("tsc -p ./web");
    await new ShellTask().run("tsc -p ./tools");
    await new UglifyJSTask().run();
    // 发布任务
    if (argv.publish) {
      await new PublishTask().start();
    }
    task.end();
  }

}
(async () => {
  new Build().startup();
})();
