import * as gulp from "gulp";
import * as uglify from "gulp-uglify";
import { LoggerConsole as console } from "../libs/LoggerConsole";
import { HelperTask } from "./HelperTask";

export class UglifyJSTask {
  public run() {
    console.info("->", "UglifyJSTask", HelperTask.taking());
      return new Promise((resolve, reject) => {
        gulp.task("UglifyJSTask", () => {
          return gulp.src("build/**/*.js")
            .pipe(uglify())
            .pipe(gulp.dest("build"))
            .on("end", () => {
              console.info("UglifyJSTask.end");
              resolve();
            }).on("error", (error) => {
              console.info("UglifyJSTask.error");
              reject(error);
            });
        });
        gulp.start("UglifyJSTask");
    });
  }
}
export default UglifyJSTask;
