import { exec, execSync } from "child_process";
import * as Path from "path";
import { LoggerConsole as console } from "../libs/LoggerConsole";
import { HelperTask } from "./HelperTask";

export class ShellTask {
  public name = "ShellTask";
  public rootPath = Path.resolve("./");
  /**
   * @param cli
   */
  public async run(cli: string) {
    console.info("->", this.name, HelperTask.taking());
    console.info(this.name, "start", "cwd:", this.rootPath, "cli:", cli);
    try {
      const output = execSync(cli, {
        cwd: this.rootPath,
      });
      console.info(this.name + " | " + cli, "| output done", output.toString());
    } catch (error) {
      console.error(this.name, "stdout", error.stdout.toString());
      console.error(this.name, "stderr", error.stderr.toString());
      const msg = this.name + " 执行失败,请检查代码或命令:" + cli;
      throw new Error(msg);
    }
  }
  public async exec(cli: string) {
    console.info(this.name, "start", "cwd:", this.rootPath, "cli:", cli);
    try {
      const output = exec(cli, {
        cwd: this.rootPath,
      });
      console.log(this.name, "output", output.toString());
    } catch (error) {
      console.error(this.name, "stdout", error.stdout.toString());
      console.error(this.name, "stderr", error.stderr.toString());
      const msg = this.name + " 执行失败,请检查代码或命令:" + cli;
      throw new Error(msg);
    }
  }
}
