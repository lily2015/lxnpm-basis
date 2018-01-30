import * as webpack from "webpack";

export class WebpackBase {
  protected taskName = "WebpackTaskBase";
  protected watchModel = false;
  protected count = 1;

  public setWatch(watchModel: boolean) {
    this.watchModel = watchModel;
    return this;
  }

  protected webpack(config: any) {
    return new Promise((resolve, reject) => {
      const compiler = webpack(config);
      if (this.watchModel) {
        let ready = false;
        compiler.watch({}, (error, stats) => {
          if (ready === false) {
            ready = true;
            if (error === null) {
              resolve();
            } else {
              reject();
            }
          }
          this.done(error, stats);
        });
      } else {
        compiler.run((error, stats) => {
          this.done(error, stats);
          if (error === null) {
            resolve();
          } else {
            reject();
          }
        });
      }
    });
  }
  protected done(error: any, stats: any) {
    if (error === null) {
      console.info(this.taskName, "> done", this.count++);
    } else {
      console.info(stats.hasErrors(), stats.toJson());
      console.info(this.taskName, "> error", error);
    }
    if (stats.compilation.errors.length > 0) {
      const errors = stats.compilation.errors[0];
      try {
        console.warn(this.taskName, "> 代码有错误", errors.module.userRequest, "总错误数", stats.compilation.errors.length);
        console.error(this.taskName, "> error.message", errors.message);
      } catch (error) {
        console.error(this.taskName, "> error.message", errors);
      }
      // 编译失败，扔出异常中断编译服务
      if (this.watchModel === false) {
        console.error(this.taskName + "编译失败");
      }
    }
  }
}
