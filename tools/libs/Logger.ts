import * as log4js from "log4js";
import { argv } from "yargs";

export class Logger {
  public replaceConsole() {
    const pattern = "[%-5p] %d{yyyy-MM-dd hh:mm:ss.SSS} %m";
    /**
     * log4js 2.x 的配置方式
     * https://log4js-node.github.io/log4js-node/migration-guide.html
     */
    const logConfig: any = {
      appenders: {
        out: { type: "console" },
        task: {
          type: "console",
          pattern: argv.watch === true ? `%[${pattern}%]` : pattern,
        },
      },
      categories: {
        default: { appenders: [ "out" ], level: "info" },
        task: { appenders: [ "task" ], level: "info"},
      },
    };
    log4js.configure(logConfig);
    console.log = log4js.getLogger("console").info.bind(log4js.getLogger("console"));
    console.info = log4js.getLogger("info").info.bind(log4js.getLogger("info"));
    console.warn = log4js.getLogger("warn").warn.bind(log4js.getLogger("warn"));
    console.error = log4js.getLogger("error").error.bind(log4js.getLogger("error"));
  }
}
