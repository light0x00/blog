export function isMobile() {
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
        isMobile = isIphone || isAndroid;
    return isMobile;
}






// export function makeDragable(ele) {
//     // ele.addEventListener('mousedown', () => { }, false);

//     window.addEventListener('mousedown',(e)=>{

//     }, false);

// }


