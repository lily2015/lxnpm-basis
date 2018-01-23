import * as webpack from "webpack";
// import { WebpackConfig } from "./WebpackConfig";

export class WebpackHelper {
  private async webpack(config: object) {
    const compiler = webpack(config);
  }
}
