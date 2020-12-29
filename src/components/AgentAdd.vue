<template>
<div class="my-body animated flipInY">
	<div class="page-title bg1" style="">
        <div @click="goBack()" class="left"><</div>
		<div class="title">添加代理</div>
        <div class="right"></div>
	</div>
	<div class="form menu-item bg4" style="">
		<div class="form-group">
			<div class="label" style="">游戏ID</div>
			<div class="input"><input v-model="param.gameId" class="text" type="text" /></div>
		</div>

		<div class="form-group">
			<div class="label" style="">用户名</div>
			<div class="input"><input v-model="param.name" class="text" type="text" /></div>
		</div>

		<div class="form-group">
			<div class="label" style="">真实姓名</div>
			<div class="input"><input v-model="param.fullName" class="text" type="text" /></div>
		</div>

		<div class="form-group">
			<div class="label" style="">手机号</div>
			<div class="input"><input v-model="param.phone" class="text" type="text" /></div>
		</div>

		<div class="form-group">
			<div class="label" style="">代理等级</div>
			<div class="input">
                <select class="select" v-model="param.level">
                    <option v-show="userInfo.level == 0" value=1>合营公司</option>
                    <option v-show="userInfo.level == 0 || userInfo.level == 1" value=2>代理</option>
                </select>
            </div>
		</div>

		<div class="form-group">
			<button @click="addUser" class="btn big-btn">确认添加</button>
		</div>
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
			param:{},
			userInfo:{}
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
				if(res.data.name == 'AgentAdd'){
					
				}
			}
		});
	},
    methods: {
        showPage(name, param){
            RUNKIT.APP.showPage(name, param || {}, this.$options.name); 
        },
        goBack(){
            this.showPage('Agent');
        },
		clear(){
			this.$set(this, 'param', {});
		},
		addUser(){
			RUNKIT.APP.loading(1);
			RUNKIT.ServerApi.addAgents(this.param, (bl, res)=>{
				RUNKIT.APP.loading(0);
				console.log(bl, JSON.stringify(res));
				if(!bl){
					return alert('添加失败，网络或服务异常!');
				}
				if(0 == res.status){
					alert("添加成功！");
					this.clear();
					return this.showPage("Agent");
				}else{
					return alert(res.info);
				}
			});
		}
    }
}
</script>

<style lang="less">

</style>
