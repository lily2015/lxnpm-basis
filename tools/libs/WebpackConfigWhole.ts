import * as klaw from "klaw";
import * as path from "path";
import { Config } from "../../web/libs/Config";
import { ConstFloder } from "../const/ConstFloder";

// 统一打包时配置
export class WebpackConfig {
  private cndPath: string;
  private async getConfig() {
    const appJson: any = new Config();
    this.cndPath = await appJson.getAppConfigJson().cndPath;
  }
  private async setConfig() {
    const entry = {};
    const config = {
      entry: __dirname + ConstFloder.compileSource,
      output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
      },
      module: {
        rules: [
          {
            test: /((\.ts)|(\.tsx))$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "ts-loader",
                options: {
                  compilerOptions: {
                    declaration: false,
                  },
                },
              },
            ],
          },
          {
            test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 8192,
                  name: "assets/[name]_[hash:8].[ext]",
                  publicPath: this.cndPath,
                  emitFile: false,
                },
              },
            ],
          },
        ],
      },
    };
  }
}
