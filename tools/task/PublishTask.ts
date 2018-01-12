import { execSync } from "child_process";
import * as Path from "path";
import { LoggerConsole as console } from "../libs/LoggerConsole";
import { HelperTask } from "./HelperTask";

export class PublishTask {
  public buildPath = Path.normalize("build");
  public async start() {
    console.info("->", "PublishTask", HelperTask.taking());
    console.info("PublishTask.start.buildPath", this.buildPath, HelperTask.taking());
    const output = execSync("npm publish", {
        cwd: this.buildPath,
    });
    console.warn("PublishTask.output", output.toString());
  }
}
export default PublishTask;
