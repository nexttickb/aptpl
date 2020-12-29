<template>
<div class="header bg1" style="height:1.5rem;display:flex;flex-direction:column">
	<div class="" style="height:1.5rem;cursor:default">
		<div @click="goBack" style="width:8rem">
		<div v-if="pname == 'Home' || pname == 'Login' || pname == 'Main'" class="hicon fa fa-film" style="width:1.5rem;display:flex;padding:0.3rem;"></div>
		<div v-if="pname == 'Play' || pname == 'Category' || pname == 'Television'" class="hicon" style="width:1.5rem;display:flex;padding:0.3rem;">
			<span class="fa fa-reply"></span>
		</div>
		<a style="line-height:1.5rem;width:5rem;flex-direction:column;font-size:0.8rem;">
			{{title}}
		</a>
		<div style="flex:1;"></div>
		</div>
	</div>
	<div class="bg1" style="height:0.2rem;"></div>
</div>
</template>

<script>
export default {
    name: '',
    props: [
		'pname','title'
    ],
    components:{},
    data() {
        return {
			prePage:''
        }
    },
    computed: {
		
    },
	filters:{
	/*
		'title':function(value){
			console.log("value:", value);
			return value;
		}
	*/
	},
	mounted:function(){
		var self = this;
		RUNKIT.VoimBus.subscribe('public', (topic, res)=>{
			if('showPage' == res.type){
				self.prePage = res.data.prePage;
			}
		});
	},
    methods: {
		showPage(name, param){
            RUNKIT.APP.showPage(name, param || {}, this.pname); 
        },
		goBack(){
			if(this.pname == 'Category'){
				return this.showPage("Main");
			}
			if(this.pname == 'Main'){
				return;
			}
			if(this.prePage)this.showPage(this.prePage);
		}
    }
}
</script>

<style lang='less'>

	.hicon{
		float:left;
	}
	
</style>
