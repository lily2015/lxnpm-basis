import * as Tape from "blue-tape";
import { Config } from "../../web/Config";

// Tape("getAppConfigJson", async () => {
//   const getAppConfigJson = await new Config().getAppConfigJson();
//   console.log("json:", getAppConfigJson);
// });

// Tape("getPort", async () => {
//   const AppConfig = new Config();
//   const port = await AppConfig.getPort();
//   console.log("port : " + port);
// });

Tape("getPorts", async () => {
  const AppConfig = new Config();
  const ports = await AppConfig.getPorts();
  console.log("ports : " + ports);
});
