export class Utils {
  /**
   * 对一个js对象进行排序，按其名称字母
   * @param obj
   */
  public ObjectSort(obj: any) {
    if (obj instanceof Array) {
      return obj;
    }
    const newObj: any = {};
    let keys = Object.keys(obj);
    keys = keys.sort();
    keys.map((key) => {
      if (obj[key] instanceof Object && (typeof obj[key] === "function") === false) {
        newObj[key] = this.ObjectSort(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  }
  public formatByString(date: any, format: string) {
    const o: any = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "s+": date.getSeconds(),
        "u+": date.getMilliseconds(),
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
        if (o.hasOwnProperty(k)) {
            let pad = "00";
            if (k === "u+") {
                pad = "000";
            }
            if (new RegExp("(" + k + ")").test(format)) {
                format = format
                    .replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (pad + o[k]).substr(("" + o[k]).length));
            }
        }
    }
    return format;
  }
  /**
   * @param Date date
   * @return string  "yyyy-MM-dd hh:mm:ss.uuu"
   */
  public getDateTimeString(date: any) {
      return this.formatByString(date, "yyyy-MM-dd hh:mm:ss.uuu");
  }
  /**
   * @param Date date
   * @return string "yyyyMMddhhmmssuuu"
   */
  public getDateTimeNumber(date: any) {
      return this.formatByString(date, "yyyyMMddhhmmssuuu");
  }
}
