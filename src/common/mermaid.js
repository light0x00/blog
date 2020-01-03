/**
 * markdown UML渲染配置
 */

import mermaid, { mermaidAPI } from "mermaid";

mermaid.initialize({
  theme: "forest",
  flowchart:{
     htmlLabels: false,
  }
});

export {mermaid,mermaidAPI}