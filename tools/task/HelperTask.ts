import { execSync } from "child_process";
import * as Notifier from "node-notifier";
import { argv } from "yargs";
import { Logger } from "../libs/Logger";
import { LoggerConsole as console } from "../libs/LoggerConsole";
import { CleanTask } from "./CleanTask";

export class HelperTask {
  // 跨平台系统通知
  public async sendMessage(titleStr: string, messageStr: string) {
    if (argv["no-notify"]) {
      return;
    }
    const msg = {
      message: messageStr.substr(0, 100),
      title: titleStr,
      wait: false,
    };
    Notifier.notify(msg);
  }
  // 关键应用版本
  public showVersion() {
    console.info(">", "showVersion",
      "node@" + execSync("node -v").toString().replace(/\r|\n/g, ""),
      "npm@v" + execSync("npm -v").toString().replace(/\r|\n/g, ""),
      "yarn@" + execSync("yarn -v").toString().replace(/\r|\n/g, ""),
      "typescipt@" + execSync("tsc -v").toString().replace(/\r|\n/g, ""),
    );
  }
  public getVersion(must = false) {
    let version = Number(process.argv[2]);
    if (isNaN(version)) {
      if (must) {
        throw new Error("HelperTask > 未能获jenkins的版本号");
      }
      version = 0;
    }
    return version;
  }
}
