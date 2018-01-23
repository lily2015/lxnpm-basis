import { execSync } from "child_process";
import * as fs from "fs-extra";
import * as gulp from "gulp";
import * as uglify from "gulp-uglify";
import * as path from "path";
import { ConstFloder } from "../const/ConstFloder";
import { LoggerConsole as console } from "../libs/LoggerConsole";

export class DevPublishTask {
  public async start(outputPath: string) {
    // 测试输出路径
    await fs.removeSync(outputPath);
    console.info("DevPublishTask > dev start");
    return new Promise((resolve, reject) => {
      gulp.task("DevPublishTask", () => {
        return gulp.src(`${ConstFloder.buildInto}/**/*`)
          .pipe(gulp.dest(outputPath))
          .on("end", () => {
            console.info("DevPublishTask > end");
            resolve();
          }).on("error", (error) => {
            console.info("DevPublishTask > error");
            reject(error);
          });
      });
      gulp.start("DevPublishTask");
    });
  }
}
export default DevPublishTask;
