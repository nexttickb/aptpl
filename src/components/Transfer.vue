<template>
    <div class="my-body animated bounceInRight">
		<div class="page-title bg1" style="">
            <div @click="goBack()" class="left"><</div>
            <div class="title">充值</div>
            <div class="right"></div>
		</div>
		<div class="bg3" style="height:2rem;display:flex;padding:0.2rem;">
			<input v-model="searchKey" style="flex:3" type="text" /><button @click="doSearch" class='btn' style="flex:1;margin-left:0.2rem;">搜索</button>
		</div>
		<div class="" style="height:2rem;display:flex;padding:0.2rem;">
			<button @click="showPage('TransferOrder')" class="btn big-btn" style="flex:1;">充值记录</button>
		</div>
		<div class="" style="height:2rem;line-height:2rem;display:flex;font-size:0.8rem">
			<div class="table-item">
				<div style="">#用户名</div>
				<div style="">#ID</div>
				<div style="">#操作</div>
			</div>
		</div>
		<div class="menu-item bg4" style="flex:1;padding:0.5rem;overflow-y:scroll">
			<div v-for="item in searchList" class="table-item">
				<div style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis">{{item.name}}</div>
				<div style="">{{item.id}}</div>
				<div style=""><button @click="transOpen(item)" style="width:100%;">充值</button></div>
			</div>
		</div>

      
            <div v-show="showTransDialog" class="dialog" style="padding:0.2rem;">     
                <div class="animated zoomIn" style="flex:1;display:flex;flex-direction:column;">
                    <div class="dialog-title">充值<div class="btn-close" @click="cancelPay">×</div></div>
                    <div class="" style="line-height:0.8rem;font-size:0.7rem;">
                        <p>您向</p>
                        <p>用户名: {{transUserInfo.name}}</p>	
                        <p>ID: {{transUserInfo.id}}</p>	
                        <p><input v-model="transUserInfo.coin" type='text' style="height:0.8rem;border:1px solid #ccc;" /> 钻石</p>	
                        <p><button @click='doTrans' class="btn big-btn">确认充值</button></p>	
                    </div>
                </div>        
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
			showTransDialog:false,
			transUserInfo:{},
			searchKey:'',
			searchList:[]
        }
    },
    computed: {
    },
	mounted:function(){
		var self = this;
		RUNKIT.VoimBus.subscribe('public', (topic, res)=>{
			if('showPage' == res.type){
				if(res.data.name == 'Transfer'){
			//		this.getDefaultUser();
				}
			}
		});
	},
    methods: {
        showPage(name, param){
            RUNKIT.APP.showPage(name, param || {}, this.$options.name); 
        },
        goBack(){
            this.showPage('Home');
        },
		doSearch(){
			RUNKIT.APP.loading(1);
			RUNKIT.ServerApi.searchUser({key:this.searchKey}, (bl, res)=>{
				RUNKIT.APP.loading(0);
				console.log(bl, JSON.stringify(res));
				if(!bl){
					return alert('啥也没搜索到!');
				}
				this.searchList = res.data;
			});
		},
		getDefaultUser(){
			RUNKIT.APP.loading(1);
			RUNKIT.ServerApi.searchUser({}, (bl, res)=>{
				RUNKIT.APP.loading(0);
				console.log(bl, JSON.stringify(res));
				if(bl){
					this.searchList = res.data;
				}
			});
		},
		transOpen(info){
			this.showTransDialog = true;
			this.transUserInfo.name = info.name;
			this.transUserInfo.id = info.id;
			this.transUserInfo.level = info.level;
			his.transUserInfo.coin = 0;
		},
		doTrans(){
			if(this.transUserInfo.coin == 0){
				return;
			}
			if(this.transUserInfo.coin > 0){
				RUNKIT.APP.loading(1);
				RUNKIT.ServerApi.transferCoin({userId:this.transUserInfo.id,coin:this.transUserInfo.coin, userType:this.transUserInfo.level}, (bl, res)=>{
					RUNKIT.APP.loading(0);
					console.log(bl, JSON.stringify(res));
					alert(res.info);
					this.cancelPay();
				});
				return;
			}
			if(this.transUserInfo.coin < 0){
				RUNKIT.APP.loading(1);
				RUNKIT.ServerApi.destroyCoin({userId:this.transUserInfo.id,coin:this.transUserInfo.coin, userType:this.transUserInfo.level}, (bl, res)=>{
					RUNKIT.APP.loading(0);
					console.log(bl, JSON.stringify(res));
					alert(res.info);
					this.cancelPay();
				});
				return;
			}
			
		},
		cancelPay(){
			this.showTransDialog = false;
			this.transUserInfo.name = '';
			this.transUserInfo.id = '';
			this.transUserInfo.level = '';
			this.transUserInfo.coin = 0;
		}
    }
}
</script>

<style lang='less'>


.table-item{
	width:100%;
	height:1.5rem;
	display:flex;
}
.table-item div{
	flex:1;
}

</style>
