let app = new Vue({
    el: '#app',
    data: {
        serverUrl:'http://localhost:8080',
        admin:'',
        password:''
    },
    mounted: function () {
        this.init();
    }
    ,
    computed:{

    },
    methods: {
        init: function () {
            let cookieList = document.cookie.split(';');
            for(let i in cookieList){
                if(cookieList[i].trim() !== ''){
                    let ck = cookieList[i].split('=');
                    document.cookie = ck[0].toString() + '=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
                }
            }
        },
        login: function () {
            let _this = this;
            this.$http.post(_this.serverUrl + '/admin',JSON.stringify({
                "adminName": _this.admin,
                "password": _this.password
            })).then((response)=>{
                console.log(response.body);
                if (response.body.code === 1) {
                    document.cookie = "adminName=" + response.body.data.adminName.toString();
                    document.cookie = "id=" + response.body.data.adminId.toString();
                    document.cookie = "token=" + response.headers.get("Token").toString();
                    layer.msg("登录成功,2秒后跳转");
                    setTimeout(function () {
                        // if (window.history.length > 1) {
                        //     window.history.back(-1);
                        // } else {
                        //     window.location.href = "index.html";
                        // }
                        window.location.href = 'users.html';
                    },2*1000);
                }
                console.log(response.body.result);
            });
        }
    }
});