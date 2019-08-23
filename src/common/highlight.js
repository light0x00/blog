
/**
 * markdown代码高亮配置
 */
import hljsCss from "highlight.js/styles/github.css";
import hljs from "highlight.js/lib/highlight";


hljs.registerLanguage('xml',  require(`highlight.js/lib/languages/xml`));
hljs.registerLanguage('javascript',  require(`highlight.js/lib/languages/javascript`));
hljs.registerLanguage('java',  require(`highlight.js/lib/languages/java`));
hljs.registerLanguage('json',  require(`highlight.js/lib/languages/json`));
hljs.registerLanguage('bash',  require(`highlight.js/lib/languages/bash`));
hljs.registerLanguage('sql',  require(`highlight.js/lib/languages/sql`));

  export default hljs;