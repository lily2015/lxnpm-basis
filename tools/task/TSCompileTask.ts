import * as fs from "fs-extra";
import { ConstFloder } from "../const/ConstFloder";
import { LoggerConsole as console } from "../libs/LoggerConsole";
import { ShellTask } from "./ShellTask";

export class TSCompileTask {
  // private compileTarget = ["tools", "web", "src", "examples"];
  public async run() {
    for (const item of ConstFloder.compileFrom) {
      fs.exists(item, async (exists) => {
        if (exists) {
          await new ShellTask().run(`tsc -p ./${item}`);
          console.info(`TSCompileTask > end > ${item}`);
        }
      });
    }
  }
}
