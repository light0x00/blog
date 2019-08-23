/* markdown渲染配置 */
import marked from "marked";
import hljs from "@/common/highlight";

marked.setOptions({
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  });

  export default marked