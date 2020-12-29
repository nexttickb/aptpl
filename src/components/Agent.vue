<template>
    <div class="my-body animated bounceInRight">
		<div class="page-title bg1" style="">
            <div @click="goBack()" class="left"><</div>
            <div class="title">我的代理</div>
            <div class="right"></div>
		</div>
		<div class="count-agent" style="">
			<div>代理人数：{{userInfo.agentNum || 0}}</div>
			<div></div>
		</div>
		<div class="tool-bar" style="" v-show="userInfo.level == 0 || userInfo.level == 1"><!-- 公司和合营公司有权限 代理自身没有 -->
			<button @click="showPage('AgentAdd')">添加代理</button><button @click="showPage('Agent')">代理返利</button>
		</div>
		
		<div class="menu-item bg4" style="">
			<div class="card-item" v-for="item in agentList">
				<div style="">{{item.name}} <span class="text-id">ID:{{item.id}}</span></div>
				<div style="">创建时间: {{item.createTime}}</div>
			</div>
			
			<div class="card-item" v-for="item in 0">
				<div style="">测试名字<span class="text-id">ID:120912</span></div>
				<div style="">创建时间: 2019-07-03 21:10:21</div>
			</div>
		</div>
		<div class="paging" style="">
			<div @click="getList(-1)">上一页</div><div>{{pageNum + 1}}</div><div @click="getList(1)">下一页</div>
		</div>

</div>
</template>

<script>
import UserInfo from '@/components/UserInfo'
export default {
    name: 'Home',
    props: {
    },
    components:{UserInfo},
    data() {
        return {
            pageNum:0,
			userInfo:{},
			agentList:[],
			maxPage:100,
			pageShowNum:5
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
					this.getList();
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
@card-height:3rem;

.count-agent{
	background:#1C83D0;
	color:#eff;
	@count-height:3rem;
	height:@count-height;
	line-height:@count-height;
	padding:0 0.3rem 0 0.3rem;
	&>div:nth-child(2){
		border-left:1px solid #619AEB;
	}
}
.tool-bar{
	height:2rem;
	padding:0.2rem;
	display:flex;	
	border-bottom:1px solid #ccc;
	&>button{
		flex:1;
		border-radius:0.2rem;
		border:0;
		margin:0.2rem;
		background:#1C83D0;
		color:#eff;
	}
}
.menu-item{
	flex:1;overflow-y:scroll;
	font-size:0.7rem;
}
.card-item{
	width:100%;
	height:@card-height;
	border-bottom:1px solid #ccc;
	font-size:0.8rem;
	line-height:@card-height * 0.45;
	.text-id{
		font-size:0.6rem;
		color:#999;
	}
	&>div:nth-child(2){
		font-size:0.6rem;
	}
}
</style>
