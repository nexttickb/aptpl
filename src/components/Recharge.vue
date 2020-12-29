<template>
    <div class="my-body animated bounceInRight">
		<div class="page-title bg1" style="">
            <div @click="goBack()" class="left"><</div>
            <div class="title">购买钻石</div>
            <div class="right"></div>
		</div>

        <UserInfo></UserInfo>

      	<div class="bg3" style="height:2rem;line-height:2rem;padding-left:0.2rem;display:flex;">
			请选择购买数量
		</div>
	
		<div class="menu-item bg4" style="flex:1;padding:0.5rem;overflow-y:scroll">
			<div @click="buyProduct(item)" class="block" v-for="item in productList">
				<div class="inner">
                	<div style="">{{item.coinNumber}} 钻</div>
                	<div style="">￥{{item.amount}}</div>
				</div>
            </div>
		</div>

		<div class="" style="height:2rem;display:flex;">
			<button @click="showPage('RechargeOrder')" class="big-btn">充值记录</button>
		</div>
       

            <div v-show="showPayDialog" :class="[showPayDialog?'bottom-dialog':'hide']" style="">
                <div class="animated zoomInUp" style="flex:1;display:flex;flex-direction:column;">
                    <div class="dialog-title" style="">确认付款<div class="btn-close" @click="cancelPay">×</div></div>
                    <div class="" style="line-height:0.8rem;font-size:0.7rem;">
                        <p>订单详情</p>
                        <p>总金额：{{buyProductInfo.amount}}</p>	
                        <p>{{buyProductInfo.coinNumber}}钻石</p>	
                        <p>付款方式</p>	
					</div>
					<div>
                        <p><button class="btn big-btn" @click="doPay('wechat')">微信支付</button></p>	
                        <p><button class="btn big-btn" @click="doPay('alipay')">支付宝支付</button></p>	
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
			showPayDialog:false,
			buyProductInfo:{},
			productList:[]
        }
    },
    computed: {
    },
	mounted:function(){
		var self = this;
		RUNKIT.VoimBus.subscribe('public', (topic, res)=>{
			if('userInfo' == res.type){
				self.userInfo = res.data;
			}
			if('showPage' == res.type){
				if(res.data.name == 'Recharge'){
					this.getProducts();
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
		getProducts(){
			RUNKIT.APP.loading(1);
			RUNKIT.ServerApi.getCoinProduct({}, (bl, res)=>{
				RUNKIT.APP.loading(0);
				console.log(bl, JSON.stringify(res));
				if(!bl){
					return alert('获取系统数据失败，请稍后再试!');
				}
				this.productList = res.data;
			});
		},
		buyProduct(product){
			this.showPayDialog = true;
			this.buyProductInfo.amount = product.amount;
			this.buyProductInfo.coinNumber = product.coinNumber;
			this.buyProductInfo.productId = product.id;
		},
		doPay(payMethod){
			//TODO:支付后订单状态查询
			this.showPayDialog = false;
			RUNKIT.APP.loading(1);
			RUNKIT.ServerApi.buyCoin({productId:this.buyProductInfo.productId, payMethod:payMethod}, (bl, res)=>{
				RUNKIT.APP.loading(0);
				console.log(bl, JSON.stringify(res));
				alert(res.info);
			});
		},
		cancelPay(){
			this.showPayDialog = false;
		}
    }
}
</script>

<style lang="less">
    .block{
        float:left;
        width: calc(calc(100% / 3) - 0px);
        height:4rem;
        box-sizing: border-box;
        text-align:center;
		display:flex;
		flex-direction:column;
		padding:0.3rem;
		.inner{
			flex:1;
			border:1px solid #ccc;
			border-radius:0.3rem;
			line-height:1.5rem;
		}
    }
	.big-btn{
		font-size:0.9rem;
		width:100%;
		border-radius:0.2rem;
		border:0;
		margin:0.2rem;
		background:#1C83D0;
		color:#eff;
	}
</style>
