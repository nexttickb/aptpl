<template>
    <div class="my-body animated bounceInRight">
		<div class="page-title bg1" style="">
            <div @click="goBack()" class="left"><</div>
            <div class="title">转钻记录</div>
            <div class="right"></div>
		</div>
		<div class="bg3" style="height:2rem;display:flex;padding:0.2rem;">
			<input v-model="startDate" style="flex:3" type="date" /><div style="width:1rem;line-height:2rem;text-align:center;"> - </div><input v-model="endDate" style="flex:3" type="date" /><button @click="doSearch" class='btn' style="flex:1;margin-left:0.2rem;">搜索</button>
		</div>
	
		<div class="menu-item bg4" style="">
			<div class="card-item" v-for="item in agentList">
				<div style="">转钻石:{{item.coinNumber}} <span class="text-id">目标账户:{{item.targetId}}</span></div>
				<div style="">转钻时间: {{item.dateTime}}</div>
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
			startDate:'',
			endDate:'',
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
			
			if('showPage' == res.type){
				if(res.data.name == 'TransferOrder'){
					this.getList();
				}
			}
		});
		let d=new Date();
		let date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
		this.startDate = date;
		this.endDate = date;
	},
    methods: {
        showPage(name, param){
            RUNKIT.APP.showPage(name, param || {}, this.$options.name); 
        },
		doSearch(){
			this.pageNum = 0;
			this.getList();
		},
		getList(num){
			if(typeof(num) == 'undefined') num = 0;
			this.pageNum += num;
			if(this.pageNum > this.maxPage)this.pageNum = this.maxPage;
			if(this.pageNum < 0)this.pageNum = 0;
			RUNKIT.APP.loading(1);
			RUNKIT.ServerApi.getTransferOrders({pageNum:this.pageNum, startDate:this.startDate, endDate:this.endDate}, (bl, res)=>{
				RUNKIT.APP.loading(0);
				//console.log(bl, JSON.stringify(res));
				this.agentList = res.data;
				if(res.data.length <= 0){
					this.maxPage = this.pageNum;
				}
			});
		},
        goBack(){
            this.showPage('Transfer');
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
	border-bottom:1px solid #eee;
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
