<template>
    <div class="my-body animated" style="background:#fff">
		<div class="page-title bg1" style="">
            <div class="title">name</div>
		</div>
		<div style="flex:1;overflow-y:scroll;">
        <div class="home-user" style="">
			<div class="head-img" style=""></div>
			<div class="user-info" style="">
				<div class="flex:1">用户名:{{userInfo.id}}</div>
				<div class="flex:1">info:{{userInfo.level}}</div>
			</div>
			<div class="home-bar" style="width:2.5rem;height:2.5rem;">
				<button @click="logout()" class="min-btn">退出</button>
			</div>
		</div>
		
		<div style="width:100%;height:9rem;box-sizing:border-box;padding:1rem;display:flex;">
			<div style="flex:1;background:#efd08f;border-radius:0.3rem;display:flex;flex-direction:column;">
				<div class="" style="height:1rem;display:flex;">
					<div style="flex:3;">余额</div>
					<div style="flex:1;"></div>
					<div style="flex:4"><div></div><div>China</div></div>
				</div>
				<div class="" style="flex:1;"></div>
			</div>
		</div>
		
		<div class="panel-title" style="width:100%;height:2rem;display:flex;font-size:0.6rem;">
			<div style="width:3.6rem">余额宝</div>
			<div style="flex:1;"></div>
			<div style="width:3.6rem">查看收益</div>
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
			<div>
				<div class="">账户余额</div>
				<div class="">{{userInfo.agentNum || 0}}</div>
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
			<div>
				<div class="">账户余额</div>
				<div class="">{{userInfo.agentNum || 0}}</div>
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
			<div>
				<div class="">账户余额</div>
				<div class="">{{userInfo.agentNum || 0}}</div>
			</div>
		</div>

	
		<div class="menu-item bg4" style="flex:1;padding:0.5rem;overflow-y:scroll">
			<div class="block" @click="showPage('Agent')" v-show="userInfo.level == 0 || 1">
                <div class='b-icon fas fa-users'></div>
                <div class='b-text'>我的店铺</div>
            </div>
			
			<div class="block" @click="alert('暂未开放')" v-show="userInfo.level == 0 || 1">
                <div class='b-icon fas fa-donate'></div>
                <div class='b-text'>发布任务</div>
            </div>
			
			<div class="block" @click="alert('暂未开放')" v-show="userInfo.level == 0 || 1">
                <div class='b-icon fa fa-newspaper'></div>
                <div class='b-text'>任务管理</div>
            </div>
			
			<div class="block" @click="showPage('Recharge')" v-show="userInfo.level == 0 || 1">
                <div class='b-icon fas fa-gem'></div>
                <div class='b-text'>提现记录</div>
            </div>

			<div class="block" @click="showPage('Transfer')" v-show="userInfo.level == 0 || 1">
                <div class='b-icon far fa-gem'></div>
                <div class='b-text'>提现</div>
            </div>
			
			<div class="block" @click="showPage('Transfer')" v-show="userInfo.level == 0 || 1">
                <div class='b-icon far fa-gem'></div>
                <div class='b-text'>资金明细</div>
            </div>
			
			<div class="block" @click="showPage('Transfer')" v-show="userInfo.level == 0 || 1">
                <div class='b-icon far fa-gem'></div>
                <div class='b-text'>我的邀请码</div>
            </div>
			
			<div class="block" @click="showPage('Transfer')" v-show="userInfo.level == 0 || 1">
                <div class='b-icon far fa-gem'></div>
                <div class='b-text'>我的团队</div>
            </div>
			
			<div class="block" @click="showPage('Transfer')" v-show="userInfo.level == 0 || 1">
                <div class='b-icon far fa-gem'></div>
                <div class='b-text'>资金明细</div>
            </div>
			
			<div class="block" @click="showPage('Transfer')" v-show="userInfo.level == 0 || 1">
                <div class='b-icon far fa-gem'></div>
                <div class='b-text'>我的邀请码</div>
            </div>
			
			<div class="block" @click="showPage('Transfer')" v-show="userInfo.level == 0 || 1">
                <div class='b-icon far fa-gem'></div>
                <div class='b-text'>我的团队</div>
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
	background:#fff;
	margin-right:0.1rem;
	&>div{
		background:#efefef;
		margin-left:0.1rem;
		margin-top:0.1rem;
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
			 color:rgb(219,109,94);
		}
		.b-text{
			height:@box-height * 0.25;
			font-size:0.6rem;
		}
    }
</style>
