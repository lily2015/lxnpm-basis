import * as Koa from "koa";

export class WebServer {
  private port = 3000;
  private app = new Koa();
  constructor() {
    this.app.listen(this.port);
    console.log("[demo] start-quick is starting at port " + this.port);
  }
}
