import * as fs from "fs-extra";
import { argv } from "yargs";
import { LoggerConsole as console } from "./LoggerConsole";

export class ConfigHelper {
  public static getPackageVersion() {
    let ver = 0;
    if (argv.version && argv.version !== true) {
      ver = argv.version;
    }
    const packageJSON = fs.readJSONSync("package.json");
    const version = packageJSON.version.split(".");
    version[2] = ver;
    return version.join(".");
  }
}
