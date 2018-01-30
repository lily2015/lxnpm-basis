import * as fs from "fs-extra";
import { ConstFloder } from "../const/ConstFloder";
import { HelperTask } from "./HelperTask";

export class CleanTask {
  public async start() {
    try {
      fs.removeSync(ConstFloder.buildInto);
      console.info(`CleanTask > ${ConstFloder.buildInto}目录已清理`);
    } catch (error) {
      console.error("CleanTask > ", error.message);
    }
  }
}
