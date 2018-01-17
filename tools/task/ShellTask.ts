import { exec, execSync } from "child_process";
import * as Path from "path";
import { LoggerConsole as console } from "../libs/LoggerConsole";

export class ShellTask {
  public rootPath = Path.resolve("./");
  /**
   * @param cli
   */
  public async run(cli: string) {
    try {
      const output = execSync(cli, {
        cwd: this.rootPath,
      });
      console.info("ShellTask execSync" + " | " + cli, "| cwd", this.rootPath);
    } catch (error) {
      console.error("ShellTask execSync", "stdout", error.stdout.toString(), "stderr", error.stderr.toString());
      const msg = "ShellTask" + " 执行失败,请检查代码或命令:" + cli;
      throw new Error(msg);
    }
  }
  public async exec(cli: string) {
    try {
      const output = exec(cli, {
        cwd: this.rootPath,
      });
      console.info("ShellTask exec" + " | " + cli, "| cwd", this.rootPath);
    } catch (error) {
      console.error("ShellTask exec", "stdout", error.stdout.toString(), "stderr", error.stderr.toString());
      const msg = "ShellTask" + " 执行失败,请检查代码或命令:" + cli;
      throw new Error(msg);
    }
  }
}
