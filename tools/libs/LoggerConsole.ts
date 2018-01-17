import { argv } from "yargs";

export class LoggerConsole {
  public static log(...args: any[]) {
    const message = LoggerConsole.serializeArgs(args);
    console.log(message);
  }
  public static info(...args: any[]) {
    const message = LoggerConsole.serializeArgs(args);
    console.info(message);
  }
  public static warn(...args: any[]) {
    const message = LoggerConsole.serializeArgs(args);
    console.warn(message);
  }
  public static error(...args: any[]) {
    const message = LoggerConsole.serializeArgs(args);
    console.error(message);
  }
  private static serializeArgs(args: any[]) {
    const message: any[] = [];
    args.map((value, index) => {
      switch (typeof value) {
      case "object":
        message.push(JSON.stringify(value));
        break;
      // case "string":
      //   message.push(value.replace(/\r|\n/g, ""));
      //   break;
      default:
        message.push(value);
        break;
      }
    });
    return message.join(" ");
  }
}
