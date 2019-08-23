/**
 * markdown UML渲染配置
 */

import mermaid, { mermaidAPI } from "mermaid";

mermaid.initialize({
  theme: "forest",
  // themeCSS: ".taskText text { font-size:30px }  ",
  // fontSize:'30px',
  // gantt:{
  //   fontSize:'30px',
  //   // barHeight:'50px'
  // },
  flowchart:{
     htmlLabels: false,
     
  }
});

export {mermaid,mermaidAPI}