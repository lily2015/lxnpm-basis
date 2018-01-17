import * as fs from "fs-extra";
import { LoggerConsole as console } from "../libs/LoggerConsole";
import { ShellTask } from "./ShellTask";

export class TSCompileTask {
  private compileTarget = ["tools", "web", "src"];
  public async run() {
    for (const item of this.compileTarget) {
      fs.exists(item, async (exists) => {
        if (exists) {
          await new ShellTask().run(`tsc -p ./${item}`);
        }
      });
    }
  }
}
