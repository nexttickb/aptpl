class ServerApi{
    constructor(){
		this.baseUrl = "http://120.25.224.133/Api/";
	//	this.baseUrl = "http://192.168.88.150/Api/";
		this.token = '';
        this.userInfo = {};
		this.timer = false;
    }
	init(){
		this.userInfo = RUNKIT.Store.get('userInfo') || {};
		if(typeof(this.userInfo.token) == 'undefined'){
			RUNKIT.token = '';
		//	RUNKIT.VoimBus.publish('public', {type:'logout', data: {}});
	//		RUNKIT.APP.showPage('Login');
		}else{
			this.onUserInfoChange(this.userInfo);
			RUNKIT.token = this.token;
			this.userCount(()=>{});
		}
		
	}
    post(url, params, cbfunc){
		params.token = this.token;
		
    }
	//{phone:'13161918102', code:'123456'}
    login(params, cbfunc){
        RUNKIT.ServerApi.post("login", params, (bl, res)=>{
			console.log(bl, res);
			if(bl){
				if(0 == res.status){
					res.data.agentNum = res.data.agentNum || 0;
					this.onUserInfoChange(res.data);
					this.userCount(()=>{});
				}
			}
			cbfunc.call(0, bl, res);
		});
    }
	logout(){
		this.token = '';
		this.userInfo.token = '';
		RUNKIT.token = '';
		RUNKIT.Store.set('userInfo', {});
		location.reload();
	}
	onUserInfoChange(userInfo){
		if(typeof(userInfo) != "undefined"){
			this.userInfo = userInfo;
			this.token = this.userInfo.token;
			RUNKIT.Store.set('userInfo', this.userInfo);
		}
		RUNKIT.VoimBus.publish('public', {type:'userInfo', data: this.userInfo});
	}
	sendSms(phone, cbfunc){
        this.post("sendSms", {phone:phone}, (bl, res)=>{
            cbfunc.call(0, bl, res);
        });
    }
	userCount(cbfunc){
        this.post("userCount", {}, (bl, res)=>{
			if(res.status == 0){
				this.userInfo.agentNum = res.data.agentNum;
				this.userInfo.transferCoin = res.data.transferCoin;
				this.userInfo.coin = res.data.coin;
				this.onUserInfoChange(this.userInfo);
			}
			if(typeof(cbfunc) == 'function')
				cbfunc.call(0, bl, res);
        });
    }
    getAgents(pageNum, cbfunc){
        this.post("getAgents/" + pageNum, {}, (bl, res)=>{
            cbfunc.call(0, bl, res);
        });
    }
	getRechargeOrders(param, cbfunc){
        this.post("getRechargeOrders/" + param.pageNum, {startDate:param.endDate, endDate:param.endDate}, (bl, res)=>{
            cbfunc.call(0, bl, res);
        });
    }
	getTransferOrders(param, cbfunc){
        this.post("getTransferOrders/" + param.pageNum, {startDate:param.endDate, endDate:param.endDate}, (bl, res)=>{
            cbfunc.call(0, bl, res);
        });
    }
    addAgents(params, cbfunc){
    
        this.post("addAgents", params, (bl, res)=>{
			this.userCount(()=>{});
            cbfunc.call(0, bl, res);
        });
    }
    getCoinProduct(params, cbfunc){
    
        this.post("getCoinProduct", params, (bl, res)=>{
            cbfunc.call(0, bl, res);
        });
    }
    buyCoin(params, cbfunc){
    
        this.post("buyCoin", params, (bl, res)=>{
			this.userCount(()=>{});
            cbfunc.call(0, bl, res);
        });
    }
	searchUser(params, cbfunc){
    
        this.post("searchUser", params, (bl, res)=>{
            cbfunc.call(0, bl, res);
        });
    }
    getUserById(params, cbfunc){
    
        this.post("getUserById", params, (bl, res)=>{
            cbfunc.call(0, bl, res);
        });
    }
    transferCoin(params, cbfunc){
		this.userCount(()=>{});
        this.post("transferCoin", params, (bl, res)=>{
			this.userCount(()=>{});
            cbfunc.call(0, bl, res);
        });
    }
    destroyCoin(params, cbfunc){
		this.userCount(()=>{});
        this.post("destroyCoin", params, (bl, res)=>{
            cbfunc.call(0, bl, res);
        });
    }

    onNotLogged(params, cbfunc){
	
    }
}

export default ServerApi
