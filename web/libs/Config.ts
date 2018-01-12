import * as fs from "fs-extra";
import * as path from "path";

export class Config {
  private rootPath = path.resolve("./");
  private buildPath = path.resolve("./build");
  private appConfigJson: any;

  public async getAppConfigJson() {
    const appConfig = fs.readFileSync(this.rootPath + "/config/app.json", "utf8");
    const appConfigJson = JSON.parse(appConfig);
    return appConfigJson;
  }
  public async getPort() {
    const appJson = await this.getAppConfigJson();
    const port = appJson.custom.port;
    return port;
  }
  public async getPorts() {
    const appJson = await this.getAppConfigJson();
    const ports = appJson.custom.ports;
    if (ports instanceof Array) {
      return ports;
    } else {
      console.log("ports 请使用数组形式，如：[3000, 3001, 3002]");
    }
  }
}
