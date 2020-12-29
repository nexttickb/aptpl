<template>
    <div class="my-body" style="background:#fff">
		
		<div style="position:absolute;top:0;left:0;right:0;bottom:0.5rem;display:flex;flex-direction:column;">
			
			<Header></Header>
			
			<div class="page-body" style="flex:1;display:flex;overflow-y:hidden">
				<div style="width:6rem;display:flex;flex-direction:column;">
					<div style="height:2rem;background:#ccc;"></div>
					<div class="category bg3">
						<div class="category-item" v-for="i in 50">分类{{i}}</div>
					</div>
				</div>
				<Movies style="flex:1;"></Movies>
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
export default {
    name: 'Home',
    props: {
    },
    components:{UserInfo, Bottom, Header, Movies},
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


.bg1{
	background:#ccc;
}
.bg2{
	background:#ddd;
}
.bg3{
	background:#eee;
}
.bg4{
	background:#fff;
}

.hide{
	display:none;
}

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
.product{
	overflow-y:scroll;
}
.product-item{
	float:left;
	padding-bottom:0.2rem;
	font-size:0.6rem;
}
.product-item .item-img{
	width:100%;
	height:100%;
	margin-left:0.1rem;
}
.product-item .item-info{
}

.product-category-name{
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
