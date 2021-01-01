<template>
    <div class="my-body">
		
		<div style="height:5rem;background:#ccc;"></div>
		
      	<div class="bg3" style="height:2rem;font-size:0.8rem;line-height:2rem;padding-left:0.2rem;display:flex;">
			请选择提现额度
		</div>
	
		<div class="menu-item bg4" style="flex:1;padding:0.5rem;overflow-y:scroll">
			<div @click="buyProduct(item)" class="block" v-for="item in productList">
				<div class="inner">
                	<div style="">{{item.coinNumber}} </div>
				</div>
            </div>
		</div>
		
		<div class="" style="height:2rem;display:flex;">
			<button @click="showPage('')" class="big-btn">确认提现</button>
		</div>

        <div v-show="showPayDialog" :class="[showPayDialog?'bottom-dialog':'hide']" style="">
            <div class="animated zoomInUp" style="flex:1;display:flex;flex-direction:column;">
                <div class="dialog-title" style="">选择支付方式<div class="btn-close" @click="cancelPay">×</div></div>
                <div class="" style="line-height:0.8rem;font-size:0.7rem;">             
                    <p>总金额：{{buyProductInfo.amount}}</p>	
                    <p>付款方式：</p>
				</div>
				<div>
                    <p><button class="btn big-btn" @click="doPay('wechat')">微信支付</button></p>	
                    <p><button class="btn big-btn" @click="doPay('alipay')">支付宝支付</button></p>	
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
			showPayDialog:false,
			buyProductInfo:{},
			userInfo:{},
			productList:[
				{coinNumber:'100', amount:'100'},
				{coinNumber:'100', amount:'100'},
				{coinNumber:'100', amount:'100'},
				{coinNumber:'100', amount:'100'},
				{coinNumber:'100', amount:'100'},
				{coinNumber:'100', amount:'100'},
			]
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
			//		this.getProducts();
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
			line-height:2.5rem;
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
	.head-img{
        width:2rem;
        height:2rem;
        background:#666;
        border-radius:2rem;
		background-size:100% 100%;
    }
</style>
