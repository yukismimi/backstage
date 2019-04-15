let app = new Vue({
    el: '#app',
    data: {
        serverUrl:'http://localhost:8080',
        admin:'',
        password:''
    },
    mounted: function () {

    },
    computed:{

    },
    methods: {
        login: function () {
            let _this = this;
            $.ajax({
                type: 'post',
                url: _this.serverUrl + '/admin',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    "adminName": _this.admin,
                    "password": _this.password
                }),
                success: function (json) {
                    console.log(json);
                    if (json.code == 1) {
                        document.cookie = "adminName=" + json.data.adminName.toString();
                        document.cookie = "adminId=" + json.data.adminId.toString();
                        if (window.history.length > 1) {
                            window.history.back(-1);
                        } else {
                            window.location.href = "users.html";
                        }
                    }
                    console.log(json.result);
                },
                error: function (json) {
                    console.log(json)
                }
            });
        }
    }
});