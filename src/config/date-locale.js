import { enUS,zhCN } from 'date-fns/locale'

const locales = {enUS,zhCN }

if(navigator.language=="zh-CN")
    window.__localeId__="zhCN"
else
    window.__localeId__="enUS"

window.getDateLocale=()=>{
    return locales[window.__localeId__]
}
// export default locales;