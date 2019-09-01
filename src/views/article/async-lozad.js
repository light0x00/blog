//懒加载
import lozad from "lozad";
export function lazyObserve() {
    //图片懒加载
    const imgList = document.querySelectorAll(".markdown-body img");
    const observer = lozad(imgList); // passing a `NodeList` (e.g. `document.querySelectorAll()`) is also valid
    observer.observe();
}