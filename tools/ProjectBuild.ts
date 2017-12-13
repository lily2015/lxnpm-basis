import { argv } from "yargs";
import { HelperTask } from "./task/HelperTask";
import { CleanTask } from "./task/CleanTask";

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

