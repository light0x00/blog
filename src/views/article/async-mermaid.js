//渲染UML
import { mermaid, mermaidAPI } from "@/common/mermaid";
export function renderMermaid() {
    let eleMermaidList = document.querySelectorAll(
        ".markdown-body code.language-mermaid"
    );
    let seq = 0;
    for (let ele of eleMermaidList) {
        let svgBox = ele.parentNode;
        let graph = mermaidAPI.render(
            `mermaid-${seq}-${new Date().getTime()}`,
            ele.innerText,
            svgGraph => {
                svgBox.innerHTML = svgGraph;
            }
        );
        seq++;
    }
}