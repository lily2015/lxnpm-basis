import { argv } from "yargs";
import { Logger } from "./libs/Logger";
import { LoggerConsole as console } from "./libs/LoggerConsole";
import { CleanTask } from "./task/CleanTask";
import { HelperTask } from "./task/HelperTask";
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
      await new PublishTask().packageJson();
      await new PublishTask().start();
    }
  }

  // new Clean().start()
  //       let version = Number(process.argv[2])
  //       if (isNaN(version)) {
  //           // throw new Error("未能获jenkins的版本号")
  //           version = 0
  //       }

  //       // 开始编译工作
  //       let info = new PackageInfo()
  //       info.init()
  //       info.setVersion(version)
  //       info.replacePackage()
  //       info.outputPackageJson()
  //       let tsc = new TypescriptCompileTask()
  //       tsc.shell = "tsc -p tools/src"
  //       tsc.start()
  //       await new UglifyJSTask().run()

  //       // bin 拷贝任务
  //       // fs.copySync("src/bin", "build/bin")

  //       console.log("或许你正需要的信息")
  //       console.log(`npm install ${info.getPackageName()}@${info.getVersion()} --save`)
}
(async () => {
  new Build().startup();
})();
