import { argv } from "yargs";
import { CleanTask } from "./task/CleanTask";
import { ConfigTask } from "./task/ConfigTask";
import { HelperTask } from "./task/HelperTask";

export class ProjectBuild {
  private watchModel = false;
  public async start() {
    const helpTask = new HelperTask();
    const cleanTask = new CleanTask();
    await cleanTask.start();
    await this.build();
  }
  public async build() {
    console.log("build");
  }
  public setWatchModel(watchModel: boolean = this.watchModel) {
    this.watchModel = watchModel;
  }
}

(async () => {
  const projectBuild = new ProjectBuild();
  if (argv.watch) {
    console.log("[yargs --watch ]" + "-".repeat(20));
    projectBuild.setWatchModel(true);
  }
  try {
    await projectBuild.start();
  } catch (error) {
    process.exit(1);
  }
})();
