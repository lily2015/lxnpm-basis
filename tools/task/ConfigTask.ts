import * as gulp from "gulp";
import * as jsonminify from "gulp-jsonminify";
import { LoggerConsole as console } from "../libs/LoggerConsole";
import { HelperTask } from "./HelperTask";

export class ConfigTask {
  public async run() {
    return new Promise((resolve, reject) => {
      const helperTask = new HelperTask();
      console.info("->", "ConfigTask", HelperTask.taking());
      gulp.task("ConfigTask", () => {
        return gulp.src("config/**/*.json")
          .on("end", () => {
            console.info("ConfigTask.done");
          }).on("error", (error: any) => {
            console.error("ConfigTask.error", error.message);
            helperTask.sendMessage("ConfigTask-Error", error.message);
          })
          .pipe(jsonminify())
          .pipe(gulp.dest("build/config"));
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
