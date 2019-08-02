/* TODO: 做成一个借接口,这样每次加载页面都是最新的歌曲信息 */
let Axios = require('axios')

let config = {
    url: "https://music.163.com/weapi/v1/play/record?csrf_token",
    method: "POST",
    params: {
        "params": "fOgnxoWtRB2PMrjtSCw9tMSBkn9lCgSjNbR1IFwMG7WuwDkS4DejnIGG3NX/6SSeGCa+74yMn4pQROspYoI96IkPCBCfZV8nWp2hfIt4k9bd3h+ypkvP2bAjTxLnBKpzWSq851GPA5h6xDFR9LhAnCpbaXdSIq2qgO5NZcK37HUsVQGS5+sZQD6e2VJCNWil",
        "encSecKey": "5f00e745b5973303226f434340da0667be95450b12477534b9f779b77a9b9f9ec7d712e83b0779fdccf65053194cf93109852323f7ec64d8e91ed3307389b06fb124e66e60710fdfed1cf727585d014dd3cfd40bab81046b3bc9765e121a15fa24d331d908a0d45fd178b6b84fdb69ba533a70917f5d3340a589e928a5dfeece"
    }
};

async function fetchMusic () {
    let res = await Axios.request(config);
    var playList = []
    for (let songInfo of res.data.allData) {
        let { id, name, ar: [{ name: artist }],al:{picUrl:cover} } = songInfo.song;
        console.log(cover)
        if(cover)
            cover=cover.replace(/^http(?!s)/,"https")
        playList.push({
            id,
            name,
            artist,
            url: `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
            cover
        })
    }
    return  playList;
}

module.exports = fetchMusic()

