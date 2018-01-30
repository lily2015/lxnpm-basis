import { execSync } from "child_process";
import * as fs from "fs-extra";
import * as gulp from "gulp";
import * as rename from "gulp-rename";
import * as uglify from "gulp-uglify";
import * as path from "path";
import { ConstFloder } from "../const/ConstFloder";
import { LoggerConsole as console } from "../libs/LoggerConsole";
import { ShellTask } from "./ShellTask";

export class DevPublishTask {
  private outputPath: string;
  private outputBin: string;
  public async start(outputPath: string, outputBin: string) {
    this.outputPath = outputPath;
    this.outputBin = outputBin;
    // 测试输出路径
    await fs.removeSync(outputPath);
    console.info("DevPublishTask > start");
    await this.DevPublishBuild();
    await this.DevPublishBin();
    await this.ChmodChange();
  }

  public async DevPublishBuild() {
    console.info("DevPublishBuild > start");
    return new Promise((resolve, reject) => {
      gulp.task("DevPublishBuild", () => {
        return gulp.src(`${ConstFloder.buildInto}/**/*`)
          .pipe(gulp.dest(this.outputPath))
          .on("end", () => {
            console.info("DevPublishBuild > end");
            resolve();
          }).on("error", (error) => {
            console.info("DevPublishBuild > error");
            reject(error);
          });
      });
      gulp.start("DevPublishBuild");
    });
  }

  public async DevPublishBin() {
    console.info("DevPublishBin > start");
    return new Promise((resolve, reject) => {
      gulp.task("DevPublishBin", () => {
        return gulp.src(`${ConstFloder.buildInto}/tools/*.js`)
          .pipe(rename({ extname: "" }))
          .pipe(gulp.dest(this.outputBin))
          .on("end", () => {
            console.info("DevPublishBin > end");
            resolve();
          }).on("error", (error) => {
            console.info("DevPublishBin > error");
            reject(error);
          });
      });
      gulp.start("DevPublishBin");
    });
  }

  public async ChmodChange() {
    new ShellTask().run(`chmod -R a+x ${this.outputPath}/**/*.js`);
  }
}
