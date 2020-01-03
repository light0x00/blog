import { enUS, zhCN } from 'date-fns/locale'
const locales = { enUS, zhCN }
//determine locale
let date_locale_key;
if (navigator.language == "zh-CN")
    date_locale_key = "zhCN"
else
    date_locale_key = "enUS"
//mount
window.date_locale = locales[date_locale_key]

import { formatDistanceToNow, parseISO } from "date-fns";
export function isoDateDistanceToNow(val) {
    return formatDistanceToNow(parseISO(val), { locale: window.date_locale });
}
