import * as Koa from "koa";
import { Logger } from "../tools/libs/Logger";
import { LoggerConsole as console } from "../tools/libs/LoggerConsole";
import { Config } from "./libs/Config";

export class WebServer {
  private app = new Koa();
  private appConfig: any;
  private port: number;
  private appJson: any;
  // 启动server
  public async start() {
    await this.ready();
    // 端口监听
    this.app.listen(this.port);
    console.info(this.appJson.app_name, " is starting at port " + this.port);
  }
  // 启动准备
  public async ready() {
    // 日志
    new Logger().replaceConsole();
    // 取config
    this.appConfig = new Config();
    this.port  = await this.appConfig.getPort();
    this.appJson = await this.appConfig.getAppConfigJson();
    // this.app.use(new Logger().connectLogger(this.appJson));
  }
}
