<template>
	<d-player class="bg1" style="width:100%;box-sizing:border-box;" ref="player" :options="options"></d-player>
</template>

<script>
import UserInfo from '@/components/UserInfo'
import dPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'
export default {
    name: 'Home',
    props: {
    },
    components:{UserInfo, dPlayer},
    data() {
        return {
			player: null,
			options: {
				video: {
					url: ''
				},
				contextmenu: [
					{}
				]
			},
			userInfo:{}
        }
    },
    computed: {
	
    },
	created(){

    	this._setVideoUrl(this.source)
	},
	mounted:function(){
		var self = this;
		RUNKIT.VoimBus.subscribe('player', (topic, res)=>{
			this._setVideoUrl(res.data.url);
		});
		RUNKIT.VoimBus.subscribe('public', (topic, res)=>{
			if('userInfo' == res.type){
				self.$set(this, 'userInfo', res.data);
			}
		});
		RUNKIT.VoimBus.subscribe('status', (topic, res)=>{
		//	console.log("Dash recv:", topic, res.data);
			
		});
		
		this.player = this.$refs.player.dp;
		setTimeout(()=>{
	//		this._setVideoUrl('https://tudou.com-l-tudou.com/20190705/20459_6c9a0ec3/index.m3u8');
		}, 1000);
	},
    methods: {
		_setVideoUrl(url) {
			if(!url)return;
			if(url.substr(0, 4) != "http"){
				console.log('error url:', url);
				return;
			}
			this.player.switchVideo({
				url: url
			});
			this.player.play();
		},
        showPage(name, param){
            RUNKIT.APP.showPage(name, param); 
        },
		alert(info){
			alert(info);
		}
    }
}
</script>

<style lang='less'>

</style>
