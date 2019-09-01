

import cheerio from "cheerio";


// 流程图
// export function renderFlow() {
//     let eleFlowList = document.querySelectorAll(
//         ".markdown-body code.language-flow"
//     );

//     for (let eleFlow of eleFlowList) {
//         let rawCode = eleFlow.innerText;
//         let chart = flowchart.parse(rawCode);
//         let box = eleFlow.parentNode;
//         try {
//             chart.drawSVG(box);
//             eleFlow.remove();
//         } catch (e) {
//             console.log("flow解析失败");
//             box.querySelectorAll("svg").remove();
//         }
//     }
// }





export function makeDomLazy(rawHtml) {
    let $ = cheerio.load(rawHtml);
    let imgList = $("img");
    imgList.each((i, img) => {
        $(img).attr("data-src", $(img).attr("src"));
        $(img).removeAttr("src");
    });
    return $.html();
}
