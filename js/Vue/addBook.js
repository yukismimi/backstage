let app = new Vue({
    el: '#app',
    data: {
        serverUrl: 'http://localhost:8080',
        bookName:'',
        author:'',
        price:0,
        stock:0,
        press:'',
        otherInfo:'',
        onSellStatus:0,
        bookClass:0
    },
    mounted: function () {

    },
    computed:{

    },
    methods: {
        add: function () {
            $.ajax({
                type: 'post',
                url: this.serverUrl + '/book',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify({
                    'bookName':this.bookName,
                    'author':this.author,
                    'price':this.price,
                    'stock':this.stock,
                    'press':this.press,
                    'otherInfo':this.otherInfo,
                    'onSellStatus':this.onSellStatus
                }),
                success: function (json) {
                    console.log(json);
                },
                error:function (data) {
                    console.log(data)
                }
            });
        }
    }

});