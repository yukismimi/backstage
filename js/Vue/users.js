let app = new Vue({
    el: '#app',
    data: {
        serverUrl: 'http://localhost:8080',
        dataList: []
    },
    mounted: function () {
        this.findUserList();
    },
    computed:{
        users: function () {
            return this.dataList.slice(pagination.start,pagination.end);
        }
    },
    methods: {
        findUserList: function () {
            let _this = this;
            this.$http.get(this.serverUrl + '/userList')
                .then((response)=>{
                    _this.dataList = response.body;
                });
        }
    }
});