import * as gulp from "gulp";
import * as jsonminify from "gulp-jsonminify";
import * as path from "path";
import { LoggerConsole as console } from "../libs/LoggerConsole";
import { HelperTask } from "./HelperTask";

export class ConfigTask {
  private rootPath = path.resolve("./");
  public async run() {
    return new Promise((resolve, reject) => {
      const helperTask = new HelperTask();
      console.info("->", "ConfigTask", HelperTask.taking());
      gulp.task("ConfigTask", () => {
        return gulp.src(this.rootPath + "config/**/*.json")
          // .on("end", () => {
          //   console.info("ConfigTask.done");
          // }).on("error", (error: any) => {
          //   console.error("ConfigTask.error", error.message);
          //   helperTask.sendMessage("ConfigTask-Error", error.message);
          // })
          .pipe(jsonminify())
          .pipe(gulp.dest(this.rootPath + "build/config"));
      });
      gulp.start("ConfigTask", (error: any) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    })
  }
}
