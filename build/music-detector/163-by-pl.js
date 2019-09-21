let Axios = require('axios')

let config = {
    url: "https://music.163.com/weapi/playlist/detail",
    method: "POST",
    params: {
        "params": "iKXhS10Rb8HR01D+s0iEV8DtuK1WRCCGIygrHcn3s//nKKsmYS31zNHCikCC/6d/jVDkaSTkcODDT6L2NuV8G3ZZBVQWIpjrA8GPxyDoZNihB7FWPaj+LfCJh97WTsPZzBQ1GNdORoYhXYKsJMLkV1QZ55hS9pMSWzjzPSKlyFc76G+UdZhgro9+X89IAH6o",
        "encSecKey": "644cf0d6da398d675f3cb0d1349b271e37871a1e40315adcb11783da01b55643349b705712bc636c3f3dfcf64f1fdbae9a2ff5c96a0802239cb35f441cddf830787637d33927a0ea0b73c4e337fcf741528e04a6816853961d92c17b0222724172bd3c5b451c9bf43f991fd93c61e403d85867ec63b81cfbc55d26815eeac9ba"
    }
};

async function fetchMusic () {
    let res = await Axios.request(config);
    console.log(res.data.result.tracks)
    console.log(res.data.result.tracks)
    var playList = []
    let count = 0;
    for (let songInfo of res.data.result.tracks) {
        let { id, name, artists: [{ name: artist }],album:{picUrl:cover} } = songInfo;
        if(cover)
            cover=cover.replace(/^http(?!s)/,"https")
        playList.push({
            id,
            name,
            artist,
            url: `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
            cover
        })
        if (++count==30){
            break;
        }
    }
    return  playList;
}
module.exports = fetchMusic()

