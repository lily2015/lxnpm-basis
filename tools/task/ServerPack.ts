import * as fs from "fs-extra";
import * as Path from "path";
import * as webpack from "webpack";
import * as nodeExternals from "webpack-node-externals";
import { WebpackBase } from "../libs/WebpackBase";

export default class ServerPack extends WebpackBase {
  private rootPath: string = Path.normalize("./");
  private packageInfo: any;

  constructor(packageInfo: any, watchModel = false) {
    super();
    this.taskName = "ServerPack";
    this.packageInfo = packageInfo;
    this.watchModel = watchModel;
  }

  public async start() {
    await this.pack();
  }

  public async pack() {
    const config: any = {
      cache: true,
      debug: true,
      devtool: "source-map",
      entry: { index: Path.resolve(`${this.rootPath}/src/server/index`) },
      externals: [ nodeExternals() ],
      module: {
        loaders: [{
          exclude: /node_modules/,
          loader: "ts-loader",
          test: /((\.ts)|(\.tsx))$/,
        }],
      },
      name: "ServerPack",
      node: {
        Buffer: false,
        __dirname: false,
        __filename: false,
        console: false,
        global: false,
        process: false,
      },
      output: {
        filename: "[name].js",
        libraryTarget: "commonjs2",
        path: Path.resolve(`${this.rootPath}/build`),
      },
      plugins: [
        new webpack.NoErrorsPlugin(),
      ],
      resolve: {
        extensions: [".ts", ".tsx", ""],
        modulesDirectories: [
          Path.resolve(`${this.rootPath}/src`),
          Path.resolve(`${this.rootPath}/node_modules`),
        ],
      },
      target: "node",
    };
    if (this.watchModel === false) {
      config.debug = false;
      config.devtool = undefined;
      const minfiyOption = {
        comments: false,
        compress: {
          drop_console: false,
        },
      };
      config.plugins.push(new webpack.optimize.UglifyJsPlugin(minfiyOption));
    }
    await this.webpack(config);
  }
}
/**
 * NoErrorsPlugin: 用来跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误;
 */
