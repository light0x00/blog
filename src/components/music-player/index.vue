<template>
    <div>
        <div ref="player-container"></div>
    
    </div>
</template>

<script>
import jsmediatags from "jsmediatags";

function bytesToBase64URL(bytes, format) {
    var base64String = "";
    if (!bytes) return null;
    for (var i = 0; i < bytes.length; i++) {
        base64String += String.fromCharCode(bytes[i]);
    }
    return "data:" + format + ";base64," + window.btoa(base64String);
}

async function getMusicInfo(url) {
    return new Promise((rs, rj) => {
        jsmediatags.read(url, {
            onSuccess(info) {
                let r = {
                    name: info.tags.title,
                    artist: info.tags.artist,
                    album: info.tags.album,
                    cover: info.tags.picture ? bytesToBase64URL(
                        info.tags.picture.data,
                        info.tags.picture.format
                    ):undefined,
                    url
                };
                rs(r);
            },
            onError(e) {
                rj(e);
            }
        });
    });
}

export default {
    props: { url: { type: String, required: true } },
    async mounted() {
        await import(
            /* webpackChunkName:'aplayer' */ "aplayer/dist/APlayer.min.css"
        );
        let { default: APlayer } = await import(
            /* webpackChunkName:'aplayer' */ "aplayer"
        );
        let r = await getMusicInfo(this.url);
		if(r.cover!=undefined)
			this.$store.commit("bg/setImg",r.cover)
        const ap = new APlayer({
            container: this.$refs["player-container"],
			audio: [r],
			loop:'none',
			volume: 0.5,
			mutex:true
		});
		this.$once("hook:beforeDestroy",()=>{
			ap.destroy()
		})
    }
};
</script>

<style>

</style>