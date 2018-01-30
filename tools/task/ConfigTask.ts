import * as gulp from "gulp";
import * as jsonminify from "gulp-jsonminify";
import { ConstFloder } from "../const/ConstFloder";
import { LoggerConsole as console } from "../libs/LoggerConsole";

export class ConfigTask {
  public async run() {
    return new Promise((resolve, reject) => {
      gulp.series("ConfigTask");
      gulp.task("ConfigTask", () => {
        return gulp.src("config/**/*.json")
          .on("end", () => {
            console.info("ConfigTask > done");
            resolve();
          }).on("error", (error: any) => {
            console.error("ConfigTask > ", error.message);
            reject(error);
          })
          .pipe(jsonminify())
          .pipe(gulp.dest(`${ConstFloder.buildInto}/config`));
      });
    });
  }
}
