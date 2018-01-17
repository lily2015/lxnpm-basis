import * as fs from "fs-extra";
import { HelperTask } from "./HelperTask";

export class CleanTask {
  public start() {
    try {
      fs.removeSync("build");
      console.info("CleanTask > build目录已清理");
    } catch (error) {
      console.error("CleanTask > ", error.message);
    }
  }
}
