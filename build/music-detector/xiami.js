// var shell = require("shelljs");


/* TODO: 做成一个借接口,这样每次加载页面都是最新的歌曲信息 */
let Axios = require('axios')

let cookie = 'xmgid=5a052073-7193-4724-a5a7-73e863c3e56b; xm_sg_tk=7f46aa1801c3344d91009a1f07807311_1567387968303; xm_sg_tk.sig=cOZm6UbhU_Ioy1SczdJ1Bhw6y3W0KeB7t3ptWJaI0hw; _uab_collina=156738795393735617023279; cna=kHCBE30w/GACAbSpacaoQGsH; _xm_umtoken=T4D1BF456B35E227005A86CAF44123BC424E333D4EB6DAEB49BF514D252; _xm_cf_=iQxDdyuz1MMlGyskh_7ShEJJ; l=cBg6ghuVqHI3ipIXBOfgiuIRGbQTaIOf1sPzw4ggSICP9f5JylSPWZEKLJ8vCnGVLsT2R3oZjBdUBVLz2yUihPjvMo8nmdvA.; isg=BDo6WDC2M9kSDL81BZC-xQP4i2acQ7Z9Z26ZxEQyv02VN9lxLH7J1YIBh4NOpzZd'

//
let config = {
    url: "https://www.xiami.com/api/song/getArtistSongs\?_q\=%7B%22pagingVO%22:%7B%22page%22:1,%22pageSize%22:60%7D,%22artistId%22:%2296600%22%7D\&_s\=41695e950b06d04a15a280e26f876f98",
    headers: {
        cookie
    },
    method: "GET",
};

async function fetchMusic() {
    let res = await Axios.request(config);
    // let { result: { data: { songs: rawPlayList } } } = res
    // var playList = []
    // let count = 0;
    console.log(res)

    // _q: {"songIds":[1770772272]}
    // _s: a543bfaf9b9924ee9c3a50826ee14a71

    let res2 = await Axios.request({
        url:"https://s320.xiami.net/600/96600/2104652377/1810458898_1551800360170_4977.mp3",
        method: "GET",
        headers: {
            cookie
        },
        params: {
            _q: { "songIds": [1770772272] },
            _s: 'a543bfaf9b9924ee9c3a50826ee14a71'
        }
    })
    console.log(res2)

}

fetchMusic()





https://s320.xiami.net/600/96600/2104652377/1810458898_1551800360170_4977.mp3?ccode = xiami_web_web & expire=86400 & duration=232 & psid=e1f903004e1d50814d137ca03f855c80 & ups_client_netip=117.150.141.3 & ups_ts=1567387987 & ups_userid=0 & utid=kHCBE30w / GACAbSpacaoQGsH & vid=1810458898 & fn=1810458898_1551800360170_4977.mp3 & vkey=B69e4bf9c21575b830051a564f933ff1a --coo