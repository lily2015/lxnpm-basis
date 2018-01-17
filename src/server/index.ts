import { WebServer } from "../../web/index";

(async () => {
  await new WebServer().start();
  console.log("=".repeat(30) + " 所有服务启动完成 " + "=".repeat(30));
})();
