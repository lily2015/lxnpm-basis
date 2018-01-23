import * as Tape from "blue-tape";
import * as fs from "fs-extra";
import { PackageInfo } from "../../../tools/task/PackageInfo";

// 清理
Tape("PackageInfo", async () => {
  const info = new PackageInfo(true);
  console.log("===", info.getCDN());
});
