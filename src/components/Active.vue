<template>
    <div class="my-body animated">
		<div class="page-title bg1" style="display:none">
			<div class="left fa fa-filter"></div>
            <div class="title">推广市场</div>
			<div class="right fa fa-search"></div>
		</div>
		<div class="page-title" :style="opacityStyle">
            <div class="title">name</div>
		</div>
		<div class="menu-item" style="box-sizing: border-box;margin-top:-1.5rem;" ref="content">

			
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

<style lang='less'>
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
.menu-item{
	flex:1;
	overflow-y:scroll;
	font-size:0.7rem;
	background:#fff;
}
.msg-list-item{
	border-bottom:1px dashed #ccc;
	display:flex;
	text-align:center;
	box-sizing: border-box;
	color:#888;
	margin:0.2rem;
}


.page-menu{
	height:2.5rem;background:#fff;display:flex;text-align:center;box-sizing: border-box;;
	color:#888;
	.item{
		flex:1;
		.icon{
			height:1.6rem;line-height:1.6rem;font-size:1.2rem;
		}
		.text{
			height:0.6rem;line-height:0.6rem;font-size:0.4rem;
		}
		&:active{
			background:#fff;
		}
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

		
.tasks-card{
	width:100%;height:12rem;
	box-sizing:border-box;
	margin-top:0.3rem;
	.card-title{
		border-left:0.3rem solid #ccc;
		font-size:0.9rem;
		margin:0;
	}
	.card-item{
		box-sizing:border-box;
		padding:0.1rem;
		background:#eee;
		width:50%;float:left;margin-top:0.3rem;display:flex;
		.item-icon{
			width:3rem;background:#ccc
		}
		.item-content{
			flex:1;
		}
	}

}					

</style>
