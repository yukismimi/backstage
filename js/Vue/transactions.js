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
        transactions: function () {
            return this.dataList.slice(pagination.start,pagination.end);
        }
    },
    methods: {
        findUserList: function () {
            let _this = this;
            this.$http.get(this.serverUrl + '/Transaction')
                .then((response)=>{
                    _this.dataList = response.body;
                });
            // $.ajax({
            //     type: 'get',
            //     url: this.serverUrl + '/Transaction',
            //     success: function (json) {
            //         for(let i in json)
            //             _this.dataList.push(json[i]);
            //     },
            //     error:function (json) {
            //         console.log(json)
            //     }
            // });
        },
        orderTime: function (index) {
            let orderTime = this.transactions[index].orderTime;
            return orderTime.year + '-' + orderTime.monthValue + '-' +orderTime.dayOfMonth + ' ' + orderTime.hour + ':'
                + orderTime.minute + ':' + orderTime.second;
        }
    }
});