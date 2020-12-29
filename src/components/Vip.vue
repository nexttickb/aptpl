<template>
    <div class="my-body">
		<div class="page-title" :style="opacityStyle">
            <div class="title">套餐选择</div>
		</div>
		<div class="menu-item bg4" style="margin-top:-1.5rem;" ref='content'>
			<div class="bg1" style="height:6rem;display:flex;padding:0.2rem;">
			</div>
			<div style="border-top-radius:0.2rem;">
				<div class="card animated flipInX" style="display:flex;flex-direction:column" v-for="item in 5">
					<div style='height:1.2rem;line-height:1.2rem;padding:0 0.2rem 0 0.2rem;background:#38a3f1;color:#fff;border-radius:0.2rem 0.2rem 0 0;'>
						<span>青铜套餐</span>
						<span style="float:right">价格:<b>￥:198.00</b></span>
					</div>
					<div style='flex:1;padding:0.2rem;display:flex;'>
						<div style='flex:1;'>
							<p>获赞数: 100</p>
							<p>悬赏金额: 0.30元</p>
							<p>赠送(每天10条接单任务)</p>
						</div>
						<div style="width:3rem;margin-top:3rem;">
							<div class='btn'>购买</div>
						</div>
					</div>
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
			opacityStyle:{ opacity:0 },
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
		this.$refs.content.onscroll = (e)=>{
			console.log('top:' + e.target.scrollTop);
			const top = e.target.scrollTop;
			const opacity = top / 150;
			this.opacityStyle = {opacity};
			if(e.target.clientHeight + e.target.scrollTop >= e.target.scrollHeight){
				this.getMore(()=>{
					
				});
			}
		}
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

.card{
	background:#fff;display:flex;text-align:center;box-sizing: border-box;
	text-align:left;
	color:#888;
	margin:0.2rem;
	border-box:0.2rem #ccc;
	border-radius:0.2rem;
	box-shadow:0px 0px 0.3rem #ccc;
	font-size:0.5rem;
	line-height:0.6rem;

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
