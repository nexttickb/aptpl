<template>
<div class="" id="app" style="">
	<div v-show="isLoading" class="loading"><div>loading...</div></div>
    <Login v-show="nowPage == 'Login'" v-if="init"></Login>
    <UserInfo v-show="nowPage == 'UserInfo'" v-if="init"></UserInfo>
    <Agent v-show="nowPage == 'Agent'" v-if="init"></Agent>
    <AgentAdd v-show="nowPage == 'AgentAdd'" v-if="init"></AgentAdd>
    <Recharge v-show="nowPage == 'Recharge'" v-if="init"></Recharge>
	<RechargeOrder v-show="nowPage == 'RechargeOrder'" v-if="init"></RechargeOrder>
    <Transfer v-show="nowPage == 'Transfer'" v-if="init"></Transfer>
	<TransferOrder v-show="nowPage == 'TransferOrder'" v-if="init"></TransferOrder>
	<Market v-show="nowPage == 'Market'" v-if="init"></Market>
	<AgentUrls v-show="nowPage == 'AgentUrls'" v-if="init"></AgentUrls>
	<Vip v-show="nowPage == 'Vip'" v-if="init"></Vip>
	<Category v-show="nowPage == 'Category'" v-if="init"></Category>
	<TaskList v-show="nowPage == 'TaskList'" v-if="init"></TaskList>
	<Active v-show="nowPage == 'Active'" v-if="init"></Active>
	
	<Main v-show="nowPage == 'Main'" v-if="init"></Main>

</div>
</template>

<script>
//import Axios from 'axios'
import qs from 'qs'
import ServerApi from '@/components/ServerApi'
import VoimBus from '@/components/VoimBus'
import Store from '@/components/Store'

import Login from '@/components/Login'
import UserInfo from '@/components/UserInfo'
import Agent from '@/components/Agent'
import AgentAdd from '@/components/AgentAdd'
import Recharge from '@/components/Recharge'
import RechargeOrder from '@/components/RechargeOrder'
import Transfer from '@/components/Transfer'
import TransferOrder from '@/components/TransferOrder'
import Market from '@/components/Market'
import AgentUrls from '@/components/AgentUrls'
import Category from '@/components/Category.vue'
import Vip from '@/components/Vip'
import TaskList from '@/components/TaskList'
import Active from '@/components/Active'
//import Play from '@/components/Play'
import Main from '@/components/Main'
//import Television from '@/components/Television'

export default {
    name: 'app',
    components: {
        Login,UserInfo,Agent,TaskList,Active,AgentAdd,Recharge,Transfer,RechargeOrder,TransferOrder,Market,AgentUrls,Vip,Category,Main
    },
    data() {
        return {
			isLoading:false,
            nowPage:'Market',
			init:false
        }
    },
    mounted:function(){
        RUNKIT.ServerApi = new ServerApi();
		RUNKIT.VoimBus = new VoimBus();
		RUNKIT.Store = new Store();
		
        RUNKIT.APP = this;
//        RUNKIT.Axios = Axios;
		RUNKIT.qs = qs;
		
		RUNKIT.ServerApi.init();
		
		this.init = true;
		
		RUNKIT.VoimBus.subscribe('public', (topic, res)=>{
			
		});
    },
    computed: {
    },
    methods: {
        showPage(name, param){
			let prePage = '';
			if(name != this.nowPage){
				prePage = this.nowPage;
				this.nowPage = name;
			}
			RUNKIT.VoimBus.publish('public', {type:'showPage', data: {name:name, prePage:prePage, param:param}});
        },
		loading(bl){
			this.isLoading = bl;
		}
    }
}
</script>

<style lang='less'>

@import './assets/icon/icon.less';
@import './assets/fa-icons/icon.css';
@import './assets/animate.css';

body{
	
}

@bg-blue:#fff;
@line-color:#619AEB;
#app, .my-body{
    width:100%;height:100%;display:flex;flex-direction:column;
}

input{
	padding:0 0.2rem 0 0.2rem;
	outline:none;
}

.page-title{
    background:@bg-blue;
    font-size:0.8rem;
    height:1.5rem;
    display:flex;
	z-index:100;
    .title{
        flex:1;
        color:#fff;
        line-height:1.5rem;
        text-align:center;
    }
    .left{
        flex:1;
        color:#fff;
        line-height:1.5rem;
        padding:0 0.3rem 0 0.3rem;
    }
    .right{
        flex:1;
        color:#fff;
        line-height:1.5rem;
		text-align:right;
        padding:0 0.3rem 0 0.3rem;
    }
}

.home-user{
    @user-height:2.4rem;

    font-size:0.8rem;
    height:@user-height;
    display:flex;
    padding:0.3rem;
    .head-img{
        width:@user-height;
        height:@user-height;
        background:#666;
        border-radius:@user-height;
		background-size:100% 100%;
    }
	
    .user-info{
        margin-left:0.3rem;
        flex:1;height:@user-height;display:flex;flex-direction:column;line-height:@user-height/2;
        &>div:nth-child(1){
            color:#666; 
            font-size:0.9rem;
        }
        &>div:nth-child(2){
            color:#666; 
            font-size:0.7rem;
        }
    }
    .home-bar{
        .min-btn{
            background:#1FA700;
            width:100%;
            height:1.2rem;
            border:0;
            border-radius:0.2rem;
            color:#eeffff;
        }
    }
}
.user-count{
    @count-height:2.5rem;
    height:@count-height;display:flex;text-align:center;
	font-size:0.6rem;
    &>div{
        flex:1;display:flex;flex-direction:column;
       
        line-height:@count-height/2;
        &>div:nth-child(2){
            font-size:0.5rem;
        }
    }
    &>div:not(:first-child){
   
    }
}

.task-count{
    @count-height:2.5rem;
	margin:0.5rem;
    height:@count-height;display:flex;text-align:center;
    color:#333;font-size:0.5rem;
	border-radius:0.2rem;
	box-shadow:0px 0px 0.3rem #ccc;
    &>div{
        flex:1;display:flex;flex-direction:column;
        line-height:@count-height/3;
        &>div:nth-child(2){
            font-size:0.5rem;
        }
    }
    &>div:not(:first-child){
        border-left:1px solid #f5f5f5;
    }
}


.paging{
    @paging-height:2rem;
    height:@paging-height; 
    display:flex;
    text-align:center;
    line-height:@paging-height;
    font-size:0.8rem;
    &>div:nth-child(1){
       flex:1; 
    }  
    &>div:nth-child(2){
       flex:2; 
    }  
    &>div:nth-child(3){
       flex:1; 
    }  
}


.form{
	flex:1;padding:0.5rem;overflow-y:scroll;
    .form-group{
        @group-height:3rem;
        width:100%;
        height:@group-height;
        border-bottom:1px solid #eee;
        padding:0.2rem 0 0.3rem 0;
        .label(1){
            height:@group-height/0.3;line-height:@group-height * 0.3;
        }
        &>*:nth-child(2){
            height:@group-height * 0.7;line-height:@group-height * 0.7;
        }
        .input{
            .text, .select{
                width:100%;
                height:@group-height/2;line-height:@group-height/2;
                border:0;margin:0;padding:0;
                background:#eee;
            }
        }
        
    }
    
}
    .btn{
        border-radius:0.1rem;
        border:0;
        background:#38a3f1;
        color:#eff;
		text-align:center;
    }
    .big-btn{
        font-size:0.9rem;
        width:100%;
        margin:0.2rem;
    }


    
    .page-line{
        
    }
    .hide{
        display:none;
    }
	
	/***************弹出相关****************/
	
	.loading, alert{
		z-index:10000;position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.1);display: flex;box-sizing: border-box;
		&>div{
			margin: auto;background:#fff;padding:1rem;border-radius:1rem;
		}
	}
	.dialog{
		z-index:9000;
		position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.1);display: flex;box-sizing: border-box;
		&>div{
			margin: auto;background:#fff;padding:0rem 0.3rem 0 0.3rem;border-radius:0.2rem;
		}
		.dialog-title{
			border-bottom:1px solid #ccc;
			height:1.5rem;
			line-height:1.5rem;
			font-size:0.8rem;
		}
		.btn-close{
			width:1.2rem;
			height:1.2rem;
			margin-top:0.1rem;
			font-size:1rem;
			line-height:1.2rem;
			text-align:center;
			border-radius:0.3rem;
			border:1px solid #ccc;
			float:right;
		}
	}
	.bottom-dialog{
		z-index:8000;
		position:absolute;
		top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.1);display: flex;box-sizing: border-box;
		box-shadow: 10px 10px 5px #000;
		.dialog-title{
			border-bottom:1px solid #ccc;
			height:1.5rem;
			line-height:1.5rem;
			font-size:0.8rem;
		}
		&>div{
			position:absolute;
			bottom:0;left:0;right:0;
			margin: auto;background:#fff;padding:0rem 0.3rem 0 0.3rem;
		}
		.btn-close{
			width:1.2rem;
			height:1.2rem;
			margin-top:0.1rem;
			font-size:1rem;
			line-height:1.2rem;
			text-align:center;
			border-radius:0.3rem;
			border:1px solid #ccc;
			float:right;
		}
	}
    
	
	

</style>
