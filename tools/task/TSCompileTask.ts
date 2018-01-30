import * as fs from "fs-extra";
import { ConstFloder } from "../const/ConstFloder";
import { LoggerConsole as console } from "../libs/LoggerConsole";
import { ShellTask } from "./ShellTask";

export class TSCompileTask {
  // private compileTarget = ["tools", "web", "src", "examples"];
  public run(cil: string = "tsc -p") {
    return new Promise((resolve, reject) => {
      console.info(`TSCompileTask > start`);
      ConstFloder.compileFrom.map((item, i) => {
        fs.exists(item, (exists) => {
          if (exists) {
            console.info(`TSCompileTask item > start > ${cil} | ${item}`);
            new ShellTask().run(`${cil} ./${item}`);
            console.info(`TSCompileTask > end > ${item}`);
          }
          if ((i + 1) === ConstFloder.compileFrom.length) {
            resolve();
          }
        });
      });
    });
  }
}
