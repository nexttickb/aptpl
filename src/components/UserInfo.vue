<template>
    <div class="my-body animated" style="background:#efefef">
	<div style="flex:1;overflow-y:scroll;">
		    <div class="home-user" style="height:5rem;background:#ec4346">
		    	<div style="margin:auto;height:3.5rem;width:100%;display:flex;">
			<div class="head-img" style=""></div>
			<div class="user-info" style="">
				<div class="flex:1">用户名:{{userInfo.id}}</div>
				<div class="flex:1">info:{{userInfo.level}}</div>
			</div>
			<div class="home-bar" style="width:2.5rem;height:2.5rem;">
				<button @click="logout()" class="min-btn">退出</button>
			</div>
			</div>
		</div>
		
		<div class="user-count" style="">
			<div>
				<div class="">账户余额</div>
				<div class="">{{userInfo.agentNum || 0}}</div>
			</div>
			<div>
				<div class="">账户余额</div>
				<div class="">{{userInfo.agentNum || 0}}</div>
			</div>
		</div>
		<div class="" style="flex:1;margin:0.2rem;height:2rem;background:#fff;font-size:0.87rem;line-height:2rem;">
			<span>点击生成推广二维码</span>
		</div>
	
		<div class="menu-item" style="flex:1;margin:0.2rem;overflow-y:scroll">
			<div class="block" @click="showPage('RechargeOrder')" v-show="userInfo.level == 0 || 1">
                <div class='b-icon fas fa-users'></div>
                <div class='b-text'>充值记录</div>
            </div>
			
			<div class="block" @click="showPage('Agent')" v-show="userInfo.level == 0 || 1">
                <div class='b-icon fas fa-donate'></div>
                <div class='b-text'>我的客户</div>
            </div>
			
			<div class="block" @click="showPage('RechargeOrder')" v-show="userInfo.level == 0 || 1">
                <div class='b-icon fa fa-newspaper'></div>
                <div class='b-text'>资金明细</div>
            </div>
			
			<div class="block" @click="showPage('Withdraw')" v-show="userInfo.level == 0 || 1">
                <div class='b-icon far fa-gem'></div>
                <div class='b-text'>提现</div>
            </div>
			
			<div class="block" @click="showPage('AgentAdd')" v-show="userInfo.level == 0 || 1">
                <div class='b-icon far fa-gem'></div>
                <div class='b-text'>资料修改</div>
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
			userInfo:{}
        }
    },
    computed: {
    },
	mounted:function(){
		var self = this;
		RUNKIT.VoimBus.subscribe('public', (topic, res)=>{
			if('userInfo' == res.type){
				self.$set(this, 'userInfo', res.data);
			}
			
		});
	},
    methods: {
        showPage(name, param){
            RUNKIT.APP.showPage(name, param || {}, this.$options.name); 
        },
		alert(info){
			alert(info);
		}
    }
}
</script>

<style lang='less'>

.user-count{
	background:#efefef;
	margin-right:0.2rem;
	&>div{
		background:#fff;
		margin-left:0.2rem;
		margin-top:0.2rem;
	}
}

	.arrow-bottom:before {
		content: "\e60e";
	}
    .block{
	@box-height:4rem;
        float:left;
        width: calc(calc(100% / 3) - 0px);
        height:@box-height;
        box-sizing: border-box;
        text-align:center;
		.b-icon{
			 height:2rem;
			 line-height:2rem;
			 font-size:1.2rem;
			 color:#FF9800;
		}
		.b-text{
			height:@box-height * 0.25;
			font-size:0.6rem;
		}
    }
</style>
