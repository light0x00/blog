
export default {
    get(key: string) {
        return localStorage.getItem(key)
    },
    set(key: string, val: any) {
        let valStr
        if (val instanceof Object) {
            valStr = JSON.stringify(val)
        } else {
            valStr = val;
        }
        localStorage.setItem(key, valStr)
    },
    remove(key: string) {
        localStorage.removeItem(key)
    }
    ,
    getObject(key: string) {
        let valStr = localStorage.getItem(key)
        if (valStr == null) {
            return null;
        } else {
            try {
                return JSON.parse(valStr)
            } catch (e) {
                return valStr;
            }
        }
    }

}

