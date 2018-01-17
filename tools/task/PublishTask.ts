import { execSync } from "child_process";
import * as fs from "fs-extra";
import * as path from "path";
import { argv } from "yargs";
import { LoggerConsole as console } from "../libs/LoggerConsole";
import { HelperTask } from "./HelperTask";

export class PublishTask {
  public buildPath = path.normalize("build");
  public async start() {
    console.info("PublishTask > start | cwd: ", this.buildPath);
    const output = execSync("npm publish", {
      cwd: this.buildPath,
    });
    console.warn("PublishTask > end");
  }
}
export default PublishTask;
