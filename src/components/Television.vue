<template>
    <div class="my-body" style="background:#fff">
		
		<div style="position:absolute;top:0;left:0;right:0;bottom:0.5rem;display:flex;flex-direction:column;">
			<Header :pname="'Television'" :title="'电视直播'"></Header>
			<div class="page-body bg2" style="flex:1;display:flex;overflow-y:hidden">
				<div style="width:6rem;display:flex;flex-direction:column;">
					<div class="category bg3">
						<div class="category-item" v-for="i in 50">频道{{i}}</div>
					</div>
				</div>
				<Player style="flex:1;background:#000;"></Player>
			</div>
		</div>
		<Bottom style="position:absolute;bottom:0;left:0;right:0;height:0.5rem;"></Bottom>
	</div>
</template>

<script>
import UserInfo from '@/components/UserInfo'
import Bottom from '@/components/Bottom'
import Header from '@/components/Header'
import Movies from '@/components/Movies'
import Player from '@/components/Player'
export default {
    name: 'Television',
    props: {
    },
    components:{UserInfo, Bottom, Header, Movies, Player},
    data() {
        return {
			pageTitle:'',
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
				if(res.data.name == this.$options.name){
				//	console.log('111111111111',JSON.stringify(res));
					this.pageTitle = res.data.param.title;
				}
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
		},
        goBack(){
			
            this.showPage('Home');
        }
    }
}
</script>

<style lang='less'>

.category{
	overflow-y:scroll;
}
.category-item{
	float:left;
	width:calc(100% - 0.4rem);
	font-size:0.6rem;
	height:1.2rem;
	margin:0.2rem;
	border-bottom:1px solid #ccc;
}
.movies{
	overflow-y:scroll;
}
.movies-item{
	float:left;
	padding-bottom:0.2rem;
	font-size:0.6rem;
}
.movies-item .item-img{
	width:100%;
	height:100%;
	margin-left:0.1rem;
}
.movies-item .item-info{
}

.movies-category-name{
	height:1rem;
	font-size:0.6rem;
	line-height:1rem;
	background:#eee;
	border-left:0.1rem solid #aaa;
	padding-left:0.2rem;
	width:calc(100% - 0.3rem);
	float:left;
	margin:0;
}
		
		

</style>
