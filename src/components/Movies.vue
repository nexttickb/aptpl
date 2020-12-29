<template>
    <div class="product" style="flex:1;display:flex;flex-wrap:wrap" ref="content">
		<div :style="{width: itemSize + 'px', height: itemSize * 1.3 + 'px', marginTop: fontSize/4 + 'px', marginLeft: fontSize/4 + 'px'}" class="product-item bg3"  @click="onClickMovie(p)" v-for="p in movies">
			<div class="item-img">
				<div class="item-info">标题{{p.name}}</div>
			</div>
		</div>
		<More v-show="loadingMore"></More>
	</div>
</template>

<script>
import More from '@/components/More'
export default {
    name: 'Movies',
    props: {
    },
    components:{More},
    data() {
        return {
            pageNum:0,
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
				self.$nextTick(()=>{
					this.init();
				});
				if(res.data.name == 'Agent'){
			//		this.getList();
				}
			}
		});
		this.$refs.content.onscroll = (e)=>{
		//	console.log('top:' + e.target.scrollTop);
			const top = e.target.scrollTop;
			const opacity = top / 150;
			this.opacityStyle = {opacity};
			if(e.target.clientHeight + e.target.scrollTop >= e.target.scrollHeight){
				this.getMore(()=>{
					
				});
			}
		}
		for(let i = 0; i < 50; i++){
			this.movies.push({img:'', name:'电影名字' + i, star:5, explain:'好片子好。。。'});
		}
	},
    methods: {
		init(){
			this.fontSize = document.body.clientWidth/45;
			this.itemSize = parseInt(this.$refs.content.offsetWidth/5 - this.fontSize/4 - 3);
		},
		getMore(){
			this.loadingMore = true;
			setTimeout(()=>{
				for(let i = 0; i < 10; i++){
					this.movies.push({img:'', name:'电影名字' + i, star:5, explain:'好片子好。。。'});
				}
				this.loadingMore = false;
			}, 1000);
		},
		onClickMovie(m){
			RUNKIT.VoimBus.publish('movie', {type:'showMovie', data: m});
		},
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
