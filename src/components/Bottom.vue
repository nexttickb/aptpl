<template>
<div class="bottom-menu" style="">
	<div style="" class="item" @click="showPage('Market')"  :class="['item', nowSelect=='Market'?'active':'default']">
		<div class="icon fa fa-layer-group" style=""></div>
		<div class="text" style="">首页</div>
	</div>
	<div style="" class="item" @click="showPage('Recharge')"  :class="['item', nowSelect=='Recharge'?'active':'default']">
		<div class="icon fa fa-link" style=""></div>
		<div class="text" style="">任务</div>
	</div>
	<div style="" class="item" @click="showPage('Vip')" :class="['item', nowSelect=='Vip'?'active':'default']">
		<div class="icon fa fa-user-circle" style=""></div>
		<div class="text" style="">VIP</div>
	</div>
	<div style="" class="item" @click="showPage('UserInfo')" :class="['item', nowSelect=='UserInfo'?'active':'default']">
		<div class="icon fa fa-user-circle" style=""></div>
		<div class="text" style="">我的</div>
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
			nowSelect:''
        }
    },
    computed: {
		
    },
	mounted:function(){
		var self = this;
		RUNKIT.VoimBus.subscribe('public', (topic, res)=>{
			if('showPage' == res.type){
				console.log('showPage:', res.data, this);
				this.nowSelect = res.data.name + '';
			}
		});
		
	},
    methods: {
		showPage(name, param){
            RUNKIT.APP.showPage(name, param || {}, this.$options.name); 
        }
    }
}
</script>

<style lang='less'>

.bottom-menu{
background:#fff;
	height:2.5rem;display:flex;text-align:center;box-sizing: border-box;;
	color:#666;
	border-top:1px solid #ccc;
	.item{
		flex:1;
		.icon{
			height:1.6rem;line-height:1.6rem;font-size:1.2rem;
		}
		.text{
			height:0.6rem;line-height:0.6rem;font-size:0.4rem;
		}
	}
}

.default{
	filter: grayscale(100%);
	opacity:0.6;
}
.active{
	color:#000;
}
	
	
	
</style>
