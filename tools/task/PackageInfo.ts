import * as fs from "fs-extra";
import * as Path from "path";
import { ConstFloder } from "../const/ConstFloder";
import { Utils } from "../libs/Utils";

export class PackageInfo {
  private version = 0;
  private packageJson: any;
  private utils = new Utils();
  private versionDate = this.utils.getDateTimeNumber(new Date());
  private rootPath = Path.normalize("./");
  private buildPath = Path.normalize(`./${ConstFloder.buildInto}`);
  constructor(auto = false) {
    if (auto) {
      console.info("packageinfo > auto: ", auto);
      this.init();
      this.setVersion(this.getProcessVersion());
      this.replacePackage();
      this.setCDN();
      this.outputPackageJson();
    }
  }

  public init() {
    this.mkdir();
    this.readPackageJson();
  }

  public mkdir() {
    try {
      fs.mkdirpSync(this.buildPath);
    } catch (error) {
      console.info("PackageInfo > Can not mkdir", this.buildPath);
    }
  }

  public getVersion() {
    return this.version;
  }

  public getPackageName() {
    return this.packageJson.name;
  }

  public getPackageJson() {
    return this.packageJson;
  }

  public getProcessVersion(must = false) {
    let version = Number(process.argv[2]);
    console.info("getProcessVersion > process.argv[2]: ", version);
    if (isNaN(version)) {
      version = 0;
    }
    return version;
  }

  public readPackageJson() {
    let packageJson: any = fs.readFileSync(this.rootPath + "/package.json", "utf8");
    packageJson = JSON.parse(packageJson);
    this.packageJson = packageJson;
  }

  public replacePackage() {
    let packageJson = this.packageJson;
    packageJson.scripts = !!packageJson.scriptOperation || packageJson.scripts;
    packageJson.scriptOperation = undefined;
    packageJson.devDependencies = undefined;
    packageJson = this.utils.ObjectSort(packageJson);
    this.packageJson = packageJson;
  }

  public outputPackageJson() {
    const packageJson = JSON.stringify(this.packageJson);
    fs.writeFileSync(this.buildPath + "/package.json", packageJson);
    fs.outputJSONSync(this.buildPath + "/config/version.json", {
      cdn: this.packageJson.cdn || "",
      version: this.version,
    });
  }

  public setBuildPath(buildPath: any) {
    this.buildPath = Path.normalize(buildPath);
  }

  public setCDN() {
    this.packageJson.cdn = this.packageJson.name + "/" + this.versionDate;
    console.info("PackageInfo > cdn", this.packageJson.cdn);
  }

  public getCDN() {
    return this.packageJson.cdn;
  }

  public setVersion(version: number) {
    const ver = this.packageJson.version.split(".");
    ver[2] = Number(ver[2]) + version;
    this.packageJson.version = ver.join(".");
    this.version = this.packageJson.version;
    console.info("PackageInfo > version", this.packageJson.version);
  }
}
