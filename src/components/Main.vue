<template>
<div class="main">
<Header :pname="'Main'" :title="'CC影视'" style="position:absolute;width:100%;top:0;"></Header>
<div class="main" style="position:absolute;width:100%;top:1.5rem;right:0;left:0;bottom:0;display:flex;flex-direction:column;">
	<div class="menus" style="">
		<div class="menu"><span class="fa fa-retweet"></span> 最新影视</div>
		<div class="menu"><span class="fa fa-bookmark"></span> 热门推荐</div>
		<div class="menu"><span class="fa fa-tv"></span> 电视直播</div>
		<div class="menu"><span class="fa fa-cog"></span> 系统设置</div>
	</div>
	<div ref="content" class="card-content" style="flex:1;overflow-y:scroll;">
		<div class="cards" :style="{width:cardSize * 7 + 50 + 'px',padding:'0.5rem 1rem 0rem 1rem'}">
			<div class="row">
				<div v-for="item in menu1" @click="clickMenu(item)" class="card" :style="{width: cardSize * item.col + 'px', height: cardSize + 'px'}">
					<div :style="{fontSize:cardSize * 0.36 + 'px',lineHeight:cardSize * 0.7 + 'px'}" :class="['icon',item.icon]"></div>
					<div :style="{fontSize:cardSize * 0.15 + 'px',height:cardSize * 0.3 + 'px'}" class="text">{{item.title}}</div>
				</div>
			</div>
			<div class="row">
				<div v-for="item in menu2" @click="clickMenu(item)" class="card" :style="{width: cardSize * item.col + 'px', height: cardSize + 'px'}">
					<div :style="{fontSize:cardSize * 0.36 + 'px',lineHeight:cardSize * 0.7 + 'px'}" :class="['icon',item.icon]"></div>
					<div :style="{fontSize:cardSize * 0.15 + 'px',height:cardSize * 0.3 + 'px'}" class="text">{{item.title}}</div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
</template>

<script>

import Bottom from '@/components/Bottom'
import Header from '@/components/Header'

export default {
    name: '',
    props: {
    },
    components:{Bottom, Header},
    data() {
        return {
			cardMargin:5,
			cardSize:0,
			menu1 : [
				{title:'观看历史',col:1,icon:'fa fa-tasks  ',img:'',action:'history',name:'',page:'Category'},
				{title:'我的收藏',col:1,icon:'fa fa-star   ',img:'',action:'favorites',name:'',page:'Category'},
				{title:'电视直播',col:1,icon:'fa fa-tv     ',img:'',action:'tv',name:'',page:'Television'},
				{title:'连续剧	',col:2,icon:'             ',img:'',action:'',name:'lianxuju',page:'Category'},
				{title:'综艺    ',col:2,icon:'             ',img:'',action:'',name:'zongyi',page:'Category'},
			],                                                                  
			menu2 : [                                                           
				{title:'搜索	',col:1,icon:'fa fa-search ',img:'',action:'search',name:'',page:'Category'},
				{title:'今日更新',col:1,icon:'fa fa-retweet',img:'',action:'today',name:'',page:'Category'},
				{title:'电影	',col:1,icon:'fa fa-film   ',img:'',action:'',name:'dianying',page:'Category'},
				{title:'动漫世界',col:2,icon:'             ',img:'',action:'',name:'dongman',page:'Category'},
				{title:'热门推荐',col:2,icon:'             ',img:'',action:'hot',name:'',page:'Category'},
			]
        }
    },
    computed: {
		
    },
	mounted:function(){
		var self = this;
		RUNKIT.VoimBus.subscribe('public', (topic, res)=>{
			if('showPage' == res.type){
				
			}
		});
		let height = this.$refs.content.offsetHeight;
		console.log('XXXX:', height/2 - 10);
		this.cardSize = height/2 - 30;
	},
    methods: {
		showPage(name, param){
            RUNKIT.APP.showPage(name, param || {}, this.$options.name); 
        },
		clickMenu(menu){
			console.log(menu);
			this.showPage(menu.page, menu);
		}
    }
}
</script>

<style lang='less'>

.main{
	background: linear-gradient(90deg, #aaa, #333);
}


.card-content{
	box-sizing:border-box;
}


.menus{
	display:flex;
	justify-content:space-around;
	height:1.5rem;
	.menu{
		font-size:1rem;
		float:left;
		margin-left:0.3rem;
		line-height:1.5rem;
		color:#eee;
	}
}

.notice{
	
}

.main{

}


.cards{
	overflow-x:visible;
}
.row {
    display: flex;
    flex-wrap: wrap;
	box-sizing:border-box;
	.card{
		background:rgba(100, 100, 100, 0.3);
		display:flex;text-align:center;box-sizing: border-box;
		text-align:left;
		color:#888;
		margin:0.2rem;
		border-box:0.2rem #ccc;
		border-radius:0.2rem;
		box-shadow:0px 0px 0.3rem #ccc;
		font-size:0.5rem;
		line-height:0.6rem;
		display:flex;
		flex-direction:column;
		color:#fff;
		text-align:center;
		.icon{
			flex:1;
			font-size:2rem;
			line-height:3rem;
		}
		.text{
			height:1.5rem;
		}
	}
}

</style>
