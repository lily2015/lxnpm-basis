export class ConstFloder {
  // 项目可编译的文件夹集
  public static compileFrom: string[] = ["tools", "web", "src", "examples"];
  // 开发代码所在的文件夹
  public static compileSource: string = "src";
  // 项目输出文件夹
  public static buildInto: string = "build";
  // webpack entry
  public static wpEntry: string = "build";
}
