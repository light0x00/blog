//图片查看器
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
export function imageViewer() {
    return new Viewer(document.querySelector(".markdown-body"), {
        button: false,
        // navbar: 0, //小图预览
        // title: 0, //图片名称
        toolbar: {
            prev: { show: 4, size: "large" },
            play: {
                show: 4,
                size: "large"
            },
            next: { show: 4, size: "large" }
        },
        transition: false
    });
}