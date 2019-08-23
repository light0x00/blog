//markdown目录
import tocbot from "tocbot";

export function markdownToc() {
    tocbot.init({
        tocSelector: ".markdown-toc",
        contentSelector: ".markdown-body",
        headingSelector: "h1,h2"
    });
    return tocbot;
}
