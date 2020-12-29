<template>
<div class="my-body">
		<div class="page-title bg1" style="">
            <div class="title">我的代理</div>
		</div>
		<div class="" style="height:7rem;display:flex;padding:0.2rem;background:#1C83D0;margin-bottom:1rem;display:flex;padding-top:2rem;">
			<div style="flex:1"></div>
            <div style="width:5rem;height:5rem;" class="logo"></div>
			<div style="flex:1"></div>
		</div>
		<div class="" style="height:1rem;display:flex;padding:0.2rem;">
			手机号
		</div>
		<div class="" style="height:2rem;display:flex;padding:0.2rem;">
			<input v-model="params.phone" placeholder="请填写手机号" style="border:1px solid #ccc;;flex:3;font-size:0.7rem;" type="text" />
		</div>
		<div class="" style="height:1rem;display:flex;padding:0.2rem;">
			验证码
		</div>
		<div class="" style="height:2rem;display:flex;padding:0.2rem;">
			<input v-model="params.code" placeholder="短信验证码" style="border:1px solid #ccc;flex:2;font-size:0.7rem;" type="text" /><button @click="sendSms" :enable="countdown == 120" class='btn' style="flex:1;margin-left:0.2rem;">{{countdown == 120?"获取验证码":countdown+"后重新获取"}}</button>
		</div>
		<div class="" style="height:2rem;display:flex;padding:0.2rem;">
			<button @click="doLogin" class="btn big-btn" style="flex:1;">登录</button>
		</div>

</div>
</template>

<script>
export default {
    name: '',
    props: {
    },
    components:{},
    data() {
        return {
			params:{phone:'', code:''},
			countdown : 120,
			timer : false,
			clickCount : 0,
        }
    },
	mounted:function(){
		RUNKIT.VoimBus.subscribe('public', (topic, res)=>{
			
		});
		RUNKIT.VoimBus.subscribe('login', (topic, res)=>{
			
			
		});
	},
    computed: {
    },
    methods: {
        showPage(name, param){
            RUNKIT.APP.showPage(name, param || {}, this.$options.name); 
        },
        doLogin(){
			if(!this.fnMobileCode(this.params.code)){
				return alert('验证码格式不正确!');
			}
			if(!this.fnIphone(this.params.phone)){
				return alert('手机号格式不正确!');
			}
			RUNKIT.APP.loading(1);
			RUNKIT.ServerApi.login(this.params, (bl, res)=>{
				RUNKIT.APP.loading(0);
				if(!bl)return alert('服务器请求异常');
				if(0 == res.status){
					this.onLogin();
				}else{
					return alert(res.info);
				}
			});
            
        },
		sendSms(){
			if(!this.fnIphone(this.params.phone)){
				return alert('手机号格式不正确!');
			}
			if(this.countdown != 120)return;
			this.settimeCode(60);
			RUNKIT.APP.loading(1);
			RUNKIT.ServerApi.sendSms(this.params.phone, (bl, res)=>{
				RUNKIT.APP.loading(0);
				if(!bl)return alert('服务器请求异常');
				return alert(res.info);
			});
		},
        onLogin(){
			this.showPage('Home');
			RUNKIT.VoimBus.publish('public', 'hello world');
        },
		settimeCode(val) {
			this.timer = setTimeout(()=>{
				this.settimeCode(val)
			}, 1000)
			if (this.countdown == 0) {
				clearTimeout(this.timer);
				this.countdown = 120;
				clickTime = 0;// 点击验证码次数
			} else {
				this.countdown--;
			}
		},
		fnIphone(val) {
			var regIphone = /^1[3|4|5|7|8]\d{9}$|^0085[23]\d{8}$|^00886\d{8}$/;
			if (val == '') {
				return false;
			} else if (!regIphone.test(val)) {
				return false;
			} else {
				return true;
			}
		},
		fnMobileCode(mobileCodeVal) {
			var regMobile = /^\d{6}$/;// 手机验证码正则（6位数字）
			if (mobileCodeVal == '') {
				return false;
			} else if (!regMobile.test(mobileCodeVal)) {
				return false;
			} else {
				return true;
			}
		}
    }
}
</script>

<style scoped>
	.logo{
		
		background:url('../assets/logo.png') no-repeat;
		background-size:100% 100%;
	}
</style>
