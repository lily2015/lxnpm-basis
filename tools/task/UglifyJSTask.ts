import * as gulp from "gulp";
import * as uglify from "gulp-uglify";
import { ConstFloder } from "../const/ConstFloder";
import { LoggerConsole as console } from "../libs/LoggerConsole";

export class UglifyJSTask {
  public run() {
    return new Promise((resolve, reject) => {
      gulp.task("UglifyJSTask", () => {
        return gulp.src(`${ConstFloder.buildInto}/**/*.js`)
          .pipe(uglify())
          .pipe(gulp.dest(ConstFloder.buildInto))
          .on("end", () => {
            console.info("UglifyJSTask > end");
            resolve();
          }).on("error", (error) => {
            console.info("UglifyJSTask > error");
            reject(error);
          });
      });
      gulp.start("UglifyJSTask");
    });
  }
}
export default UglifyJSTask;
