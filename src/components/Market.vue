<template>
    <div class="my-body animated">
		<div class="page-title" style="display:none">
			<div class="left fa fa-filter"></div>
            <div class="title">推广市场</div>
			<div class="right fa fa-search"></div>
		</div>
		<div class="page-title" :style="opacityStyle">
            <div class="title">name</div>
		</div>
		<div class="" style="box-sizing: border-box;margin-top:-1.5rem;flex:1;overflow-y:scroll" ref="content">

			<Swiper style="height:9rem;background:#666;" v-if="slidesReal.length > 0" :autoPlay='true' :showIndicator='true' interval="2500" duration="500">
				<Slide @click="clickSwiper" v-for="(item,index) in slidesReal" :key="index">
					slider{{index}}
				</Slide>
		   </Swiper>

			<Notices style="background:#fff;margin-top:0.2rem;height:1.2rem;font-size:0.6rem;box-sizing: border-box;margin:0.2rem;"></Notices>
			
			<div class="page-menu-1" style="">
				<div style="" class="item" @click="showPage('')">
					<div class="icon fa fa-layer-group" style=""></div>
					<div class="text" style="">加盟代理</div>
				</div>
				<div style="" class="item" @click="showPage('')">
					<div class="icon fa fa-link" style=""></div>
					<div class="text" style="">邀请好友</div>
				</div>
				<div style="" class="item" @click="showPage('')">
					<div class="icon fa fa-user-circle" style=""></div>
					<div class="text" style="">联系客服</div>
				</div>
			</div>
			
			<div class="page-tab1" style="background:#fff;margin-top:0.2rem;width:100%;height:5rem;box-sizing:border-box;display:flex">
				<div style="flex:1;margin:0.5rem;border-radius:0.3rem;line-height:3.6rem;text-align:center;background:#FFEB3B">
					<h1><span>话费</span><span>充值</span></h1>
				</div>
			</div>
			
			<div class="page-tab1" style="background:#fff;margin-top:0.2rem;width:100%;height:2rem;box-sizing:border-box;padding-left:0.5rem;display:flex">
				<div style="flex:1;text-align:left;line-height:2rem;">用户充值</div>
			</div>
			<div style="background:#fff;margin-top:0.2rem;wpadding-bottom:0.5rem;height:12rem;width:100%;overflow-y:scroll;">
				<div class="msg-list-item" style="height:3rem;display:flex;" v-for="item in agentList">
					<div style='width:3rem;height:3rem;'>
						<div style="width:3rem;height:3rem;display:flex;padding:0.3rem;box-sizing: border-box;">
							<div style="background:#ccc;flex:1;border-radius:0.3rem;" src=""></div>
						</div>
					</div>
					<div style='flex:1;display:flex;flex-direction:column;text-align:left;padding-top: 8px;padding-bottom: 8px;padding-left: 8px;'>
						<div style='flex:1;font-size:0.55rem;line-height:0.7rem;'>xxxxxxx</div>
						<div style='flex:1;font-size:0.55rem;line-height:0.7rem;'>xxxxxxxxxxxxxxx</div>
					</div>
					<div style='display:flex;align-items:center;width:3rem;height:3rem;padding:0.2rem;box-sizing:border-box;'>
						<div style="background:#ccc;width:2rem;color:#fff;border-radius:0.2rem;">300</div>
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
import More from '@/components/More'

import Notices from '@/components/Notices'

import { Swiper, Slide } from 'vue-swiper-component';
export default {
    name: 'Home',
    props: {
    },
    components:{UserInfo,Bottom,More,Swiper,Slide,Notices},
    data() {
        return {
			opacityStyle:{ opacity:0 },
			startDate:'',
			endDate:'',
            pageNum:0,
			userInfo:{},
			loadingMore:false,
			agentList:[],
			maxPage:100,
			pageShowNum:5,
			
			slidesReal:[{},{}]
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
		
		this.$refs.content.onscroll = (e)=>{
			console.log('top:' + e.target.scrollTop);
			const top = e.target.scrollTop;
			const opacity = top / 150;
			this.opacityStyle = {opacity};
			/*
			if(e.target.clientHeight + e.target.scrollTop >= e.target.scrollHeight){
				this.getMore(()=>{
					
				});
			}
			*/
		}
		for(let i = 0; i < 20; i++){
			this.agentList.push({img:'', name:'XXXX' + i, star:5, explain:'专注XXXX，百年老字号。'})
		}
	},
    methods: {
        showPage(name, param){
            RUNKIT.APP.showPage(name, param || {}, this.$options.name); 
        },
		doSearch(){
			this.pageNum = 0;
			this.getList();
		},
		clickSwiper(){
		
		},
		getMore(){
			this.loadingMore = true;
			setTimeout(()=>{
				for(let i = 0; i < 10; i++){
					this.agentList.push({img:'', name:'XXXX' + i, star:5, explain:'专注XXXX，百年老字号。'});
				}
				this.loadingMore = false;
			}, 1000);
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

<style lang='less' scope>
@card-height:4.5rem;

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

.msg-list-item{
	border-bottom:1px dashed #ccc;
	display:flex;
	text-align:center;
	box-sizing: border-box;
	color:#888;
	margin:0.2rem;
}


.page-menu-1{
	height:2.5rem;display:flex;text-align:center;box-sizing: border-box;;
	color:#fff;
	.item{
		flex:1;
		.icon{
			height:1.6rem;line-height:1.6rem;font-size:1.2rem;
		}
		.text{
			height:0.6rem;line-height:0.6rem;font-size:0.4rem;
		}
		&:active{
		}
	}
	.item:nth-child(1){
		background:#F44336;
	}
	.item:nth-child(2){
		background:#8bc34a;
	}
	.item:nth-child(3){
		background:#9c27b0;
	}
}

.page-tab{
	.active{
		background:#4060a0;
	}
	width:100%;height:2rem;display:flex
	&>div{
		flex:1;
		line-height:2rem;
		text-align:center;
	}
	
}

		
.tasks-card1{
	width:100%;height:12rem;
	box-sizing:border-box;
	margin-top:0.3rem;
	.card-title{
		border-left:0.3rem solid #2980df;
		font-size:0.9rem;
		margin:0;
	}
	.card-item{
		box-sizing:border-box;
		padding:0.1rem;
		width:50%;float:left;margin-top:0.3rem;display:flex;
		.item-icon{
			width:3rem;
		}
		.item-content{
			flex:1;
		}
	}

}					






h1 {
  margin: 0;
  padding: 0;
  color: white;
  text-shadow: 0 0.1em 20px black, 0.05em -0.03em 0 black, 0.05em 0.005em 0 black, 0em 0.08em 0 black, 0.05em 0.08em 0 black, 0px -0.03em 0 black, -0.03em -0.03em 0 black, -0.03em 0.08em 0 black, -0.03em 0 0 black;
}
h1 span {
  -webkit-transform: scale(0.9);
          transform: scale(0.9);
  display: inline-block;
}
h1 span:first-child {
  -webkit-animation: bop 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite alternate;
          animation: bop 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite alternate;
}
h1 span:last-child {
  -webkit-animation: bopB 1s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite alternate;
          animation: bopB 1s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite alternate;
}

@-webkit-keyframes bop {
  0% {
    -webkit-transform: scale(0.9);
            transform: scale(0.9);
  }
  50%,
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}

@keyframes bop {
  0% {
    -webkit-transform: scale(0.9);
            transform: scale(0.9);
  }
  50%,
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
@-webkit-keyframes bopB {
  0% {
    -webkit-transform: scale(0.9);
            transform: scale(0.9);
  }
  80%,
  100% {
    -webkit-transform: scale(1) rotateZ(-3deg);
            transform: scale(1) rotateZ(-3deg);
  }
}
@keyframes bopB {
  0% {
    -webkit-transform: scale(0.9);
            transform: scale(0.9);
  }
  80%,
  100% {
    -webkit-transform: scale(1) rotateZ(-3deg);
            transform: scale(1) rotateZ(-3deg);
  }
}

</style>
