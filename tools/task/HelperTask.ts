import { execSync } from "child_process";
import * as Notifier from "node-notifier";
import { argv } from "yargs";
import { Logger } from "../libs/Logger";
import { LoggerConsole as console } from "../libs/LoggerConsole";
import { CleanTask } from "./CleanTask";

export class HelperTask {
  // public static taking() {
  //   const now = new Date();
  //   const taking = now.getTime() - this.prevDateTime.getTime();
  //   this.prevDateTime = now;
  //   return `${taking / 1000} s`;
  // }
  // private static prevDateTime = new Date();
  // private startDateTime: any;
  // private endDateTime: any;
  // // 初始化
  // public init() {
  //   new Logger().replaceConsole();
  //   this.showVersion();
  //   process.once("SIGINT", () => {
  //     console.info("安全退出");
  //     process.exit();
  //   });
  // }
  // 编译开始
  // public start() {
  //   this.startDateTime = new Date();
  //   console.info(["-".repeat(50), "编译详细信息", "-".repeat(50)].join(""));
  // }
  // 编译结束
  // public end() {
  //   this.endDateTime = new Date();
  //   const dTime = (this.endDateTime.getTime() - this.startDateTime.getTime()) / 1000 + "s";
  //   console.info(["-".repeat(50), "编译信息结束", "-".repeat(50)].join(""), "\n", "编译总耗时", dTime, "\n");
  //   this.sendMessage("首次编译结束", "编译总耗时 " + dTime);
  // }
  // 清理之前编译
  // public async cleanTaskAsync() {
  //   await new CleanTask().start();
  // }
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
    console.info("->", "showVersion",
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
