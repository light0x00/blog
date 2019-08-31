export function isMobile() {
  var ua = navigator.userAgent;
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
    isMobile = isIphone || isAndroid;
  return isMobile;
}



export class StringUtils {
  static isEmpty(val: string) {
    return val == null || val == ''
  }
  static isNotEmpty(val: string) {
    return !StringUtils.isEmpty(val)
  }

  static anyEmpty(...vals: string[]) {
    for (let v of vals)
      if (StringUtils.isEmpty(v))
        return true;
    return false;
  }
}

export class NumberUtils {
  static gtZero(num: Number): boolean {
    return num != null && num > 0;
  }

  static gteZero(num: Number): boolean {
    return num != null && num >= 0;
  }

  static lteZeroOrNil(num: Number): boolean {
    return !this.gtZero(num)
  }

  static ltZeroOrNil(num: Number): boolean {
    return !this.gteZero(num)
  }

  static allGtZero(nums: Array<Number>): boolean {
    if (nums == null) return false;
    for (let num of nums) {
      if (NumberUtils.lteZeroOrNil(num)) {
        return false;
      }
    }
    return true;
  }
}