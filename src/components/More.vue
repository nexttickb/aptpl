<template>
<div style="text-align:center;line-height:2rem;width:100%;"><span style="font-size:1rem;" class="turn fa fa-truck-loading"></span><span style="font-size:0.6rem;"> 加载中...</span></div>
</template>

<script>
export default {
    name: '',
    props: {
    },
    components:{},
    data() {
        return {
        }
    },
    computed: {
		
    },
	mounted:()=>{
		var self = this;
		RUNKIT.VoimBus.subscribe('public', (topic, res)=>{
			if('showPage' == res.type){
				
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

	

.turn{
	animation:turn 1s linear infinite;
}
@keyframes turn{
	0%{-webkit-transform:rotate(0deg);}
	25%{-webkit-transform:rotate(90deg);}
	50%{-webkit-transform:rotate(180deg);}
	75%{-webkit-transform:rotate(270deg);}
	100%{-webkit-transform:rotate(360deg);}
}
	
	
	
</style>
