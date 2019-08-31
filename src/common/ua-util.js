
/* https://www.npmjs.com/package/mobile-detect */

let browserInfo = {

}

var regex_ie = /msie [\d.]+;/gi ;
var regex_firfox = /firefox\/[\d.]+/gi
var regex_chrome = /chrome\/[\d.]+/gi ;
var regex_safari = /safari\/[\d.]+/gi ;

const ua = navigator.userAgent

if (ua.match(regex_safari)) {
    browserInfo.safari = true
} else if (ua.match(regex_chrome)) {
    browserInfo.chrome = true
} else if (ua.match(regex_ie)) {
    browserInfo.msie = true
} else if (ua.match(regex_firfox)) {
    browserInfo.firefox = true
}

console.log(platform)


