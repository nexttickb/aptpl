<template>
    <div class="" style="background:#fff;box-sizing: border-box;">
		<Header :pname="'Play'" style="position:fixed;top:0;left:0;right:0;"></Header>
		<div class='bg2' style="width:100%;height:9rem;padding:0.2rem;margin-top:1.5rem;box-sizing: border-box;">
			<Player style="width:16rem;height:9rem;float:left;background:#000;"></Player>
			<div style="width:calc(100% - 16rem);float:left;height:9rem;box-sizing: border-box;" class="movie-info">
				<div style="width:100%">
					<div class="line"><b>电影名字</b><span>(2020)</span></div>
					<div class="line">语言:国语 地区:大陆 类型:国产</div>
					<div class="line" style="">主演:XXX XXX XXXX XXX XXX XXX XXX XXX</div>
					<div class="line2" style=""><span v-for='i in 10'>大明成华十四年年，大明成华十四年，</span></div>
					<div class="tools" style="padding:0.3rem;box-sizing: border-box;">
						<div class="tool-btn">
							<div class="tb-icon fa fa-arrows-alt"></div>
							<div class="tb-text">全屏播放</div>
						</div>
						<div class="tool-btn">
							<div class="tb-icon fa fa-star"></div>
							<div class="tb-text">收藏</div>
						</div>
					</div>
				</div>
			</div>
		</div>
						
		<div class='bg2' style="padding:0.2rem;">
			<button v-for="i in 10">第{{i}}集</button>
		</div>
		<div class='bg2' style="width:100%;height:500px;display:flex;">
			<Movies style="flex:1;"></Movies>
		</div>
	</div>
</template>

<script>
import UserInfo from '@/components/UserInfo'
import Bottom from '@/components/Bottom'
import Header from '@/components/Header'
import Movies from '@/components/Movies'
import Player from '@/components/Player'
export default {
    name: 'Home',
    props: {
    },
    components:{UserInfo, Bottom, Header, Movies, Player},
    data() {
        return {
            pageNum:0,
			userInfo:{},
			loadingMore:false,
			movies:[],
			maxPage:100,
			pageShowNum:5,
			fontSize:20,
			itemSize: 100
        }
    },
    computed: {
    },
	mounted:function(){
		var self = this;
		RUNKIT.VoimBus.subscribe('public', (topic, res)=>{
			if('userInfo' == res.type){
				self.userInfo = res.data;
				this.maxPage = Math.ceil(this.userInfo.agentNum / this.pageShowNum);
			}
			if('showPage' == res.type){
				if(res.data.name == 'Agent'){
			//		this.getList();
				}
			}
		});
		RUNKIT.VoimBus.subscribe('movie', (topic, res)=>{
			if('showMovie' == res.type){
				console.log(res.data);
				this.showPage('Play', {});
			}
		});
	},
    methods: {
        showPage(name, param){
            RUNKIT.APP.showPage(name, param || {}, this.$options.name);
        },
		getList(num){
			if(typeof(num) == 'undefined') num = 0;
			this.pageNum += num;
			if(this.pageNum > this.maxPage)this.pageNum = this.maxPage;
			if(this.pageNum < 0)this.pageNum = 0;
			RUNKIT.APP.loading(1);
			RUNKIT.ServerApi.getAgents(this.pageNum, (bl, res)=>{
				RUNKIT.APP.loading(0);
				//console.log(bl, JSON.stringify(res));
				this.agentList = res.data;
			});
		}
    }
}
</script>

<style lang='less'>

.hide{
	display:none;
}
.movie-info{
	flex:1;
	padding:0.2rem;
	font-size:0.8rem;
	box-sizing: border-box;
	p{
		margin:0;
		padding:0;
	}
	.line{
		font-size:0.6rem;
		height:1rem;
		line-height:1rem;
		text-overflow:ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.line2{
		font-size:0.6rem;
		height:2rem;
		line-height:1rem;
		box-orient: vertical;
		line-clamp:2;
		overflow: hidden;
		text-overflow:ellipsis;
	}
	.tools{
		width:100%;height:4rem;
		&>div{
			float:left;margin:0.2rem;
		}
		
		.tool-btn{
			text-align:center;
			width:3rem;
			height:3rem;
			background:#666;
			color:#ddd;
			border-radius:0.1rem;
			.tb-icon{
				font-size:1rem;
				height:1.6rem;
				line-height:2rem;
			}
			.tb-text{
				font-size:0.6rem;
				height:1.4rem;
				line-height:1.4rem;
			}
		}
	}
	
}
		

</style>
