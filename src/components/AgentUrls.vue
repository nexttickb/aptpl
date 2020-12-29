<template>
    <div class="my-body">
		<div class="page-title bg1" style="">
            <div class="title">name</div>
		</div>
		<div class="tool-bar" style="" v-show="userInfo.level == 0 || userInfo.level == 1"><!-- 公司和合营公司有权限 代理自身没有 -->
			<button @click="showPage('AgentAdd')">添加代理</button><button @click="showPage('Agent')">代理返利</button>
		</div>
		
		<div class="menu-item bg4" style="">
			<div class="page-menu-rl" style="">
				<div style="" class="item" @click="showPage('')">
					<div class="text" style="">待完成</div>
				</div>
				<div style="" class="item" @click="showPage('')">
					<div class="text" style="">待审核</div>
				</div>
				<div style="" class="item" @click="showPage('')">
					<div class="text" style="">已完成</div>
				</div>
			</div>
			<div class="card-list-item" style="height:3rem;display:flex;" v-for="item in agentList">
				<div style='width:2rem;height:3rem;'>
					<div style="width:2rem;font-size:0.5rem;height:0.8rem;line-height:0.8rem;color:#fff;background:#ccc;border-top-left-radius:0.2rem;">普通</div>
					<div style="width:2rem;height:2.2rem;display:flex;padding:0.3rem;box-sizing: border-box;">
						<div style="flex:1;background:#ccc;border-radius:0.3rem;" src=""></div>
					</div>
				</div>
				<div style='flex:1;display:flex;flex-direction:column;text-align:left;padding-top: 8px;padding-bottom: 8px;padding-left: 8px;'>
					<div style='flex:1;font-size:0.55rem;line-height:0.7rem;'>编号: 1 <span style="font-size:0.45rem;padding-left:0.2rem;padding-right:0.2rem;border:1px solid #ccc;border-radius:0.5rem;color:#ccc;">剩余:999</span></div>
					<div style='flex:1;font-size:0.55rem;line-height:0.7rem;'>要求: 点赞 </div>
					<div style='flex:1;font-size:0.55rem;line-height:0.7rem;'>需方: admin </div>
				</div>
				<div style='width:3rem;height:3rem;'>
					<div style="width:3rem;font-size:0.5rem;height:1.5rem;line-height:1.5rem;">￥ 0.30元</div>
					<div style="width:3rem;height:1.5rem;padding:0.2rem;box-sizing:border-box;">
						<div style="background:#ccc;color:#fff;border-radius:0.2rem;">领取</div>
					</div>
				</div>
			</div>
			<div class="card-list-item" style="height:4rem;display:flex;flex-direction:column" v-for="item in 10">
				<div style="flex:1;display:flex;">
					<div style='width:2rem;height:3rem;'>
						<div style="width:2rem;font-size:0.5rem;height:0.8rem;line-height:0.8rem;color:#fff;background:#ccc;border-top-left-radius:0.2rem;">普通</div>
						<div style="width:2rem;height:2.2rem;display:flex;padding:0.3rem;box-sizing: border-box;">
							<div style="flex:1;background:#ccc;border-radius:0.3rem;" src=""></div>
						</div>
					</div>
					<div style='flex:1;display:flex;flex-direction:column;text-align:left;padding-top: 8px;padding-bottom: 8px;padding-left: 8px;'>
						<div style='flex:1;font-size:0.55rem;line-height:0.7rem;'>编号: 1 <span style="font-size:0.45rem;padding-left:0.2rem;padding-right:0.2rem;border:1px solid #ccc;border-radius:0.5rem;color:#ccc;">剩余:999</span></div>
						<div style='flex:1;font-size:0.55rem;line-height:0.7rem;'>要求: 点赞 </div>
						<div style='flex:1;font-size:0.55rem;line-height:0.7rem;'>需方: admin </div>
					</div>
					<div style='width:3rem;height:3rem;'>
						<div style="width:3rem;font-size:0.5rem;height:1.5rem;line-height:1.5rem;">￥ 0.30元</div>
						<div style="width:3rem;height:1.5rem;padding:0.2rem;box-sizing:border-box;">
							<div style="background:#ccc;color:#fff;border-radius:0.2rem;">领取</div>
						</div>
					</div>
				</div>
				<div style='height:1rem;display:flex;border-box:box-sizing;font-size:0.5rem;'>
					<span style='flex:1;margin:0.2rem;border-radius:0.1rem;background:#ccc;font-color:#fff'>打开视频</span>
					<span style='flex:1;margin:0.2rem;border-radius:0.1rem;background:#ccc;font-color:#fff'>复制链接</span>
					<span style='flex:1;margin:0.2rem;border-radius:0.1rem;background:#ccc;font-color:#fff'>提交任务</span>
				</div>
			</div>
		</div>

		<Bottom></Bottom>
</div>
</template>

<script>
import UserInfo from '@/components/UserInfo'
import Bottom from '@/components/Bottom'
export default {
    name: 'Home',
    props: {
    },
    components:{UserInfo, Bottom},
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

.card-list-item{
	height:2.5rem;background:#fff;display:flex;text-align:center;box-sizing: border-box;
	color:#888;
	margin:0.2rem;
	border-box:0.2rem #ccc;
	border-radius:0.2rem;
	box-shadow:0px 0px 0.3rem #ccc;

}

.page-menu-rl{
	@height:2.5rem;
	@padding:0.8rem;
	height:@height;background:#fff;display:flex;text-align:center;box-sizing: border-box;
	color:#888;
	margin:0.2rem;
	padding:@padding;
	border-box:0.2rem #ccc;
	border-radius:0.2rem;
	box-shadow:0px 0px 0.3rem #ccc;
	.item{
		flex:1;
		display:flex;
		
		.icon{
			width:2.2rem;font-size:1rem;
		}
		.text{
			flex:1;font-size:0.6rem;text-align:left;
		}
		&:active{
			background:#fff;
		}
	}
}

</style>
