let app = new Vue({
    el: '#app',
    data: {
        serverUrl: 'http://localhost:8080',
        dataList: [],
        flag: true
    },
    mounted: function () {
        this.findBookList();
    },
    computed:{
        books: function () {
            return this.dataList.slice(pagination.start,pagination.end);
        }
    },
    methods: {
        findBookList: function () {
            let _this = this;
            $.ajax({
                type: 'get',
                url: this.serverUrl + '/bookList',
                success: function (json) {
                    _this.dataList = [];
                    for(let i in json)
                        _this.dataList.push(json[i]);
                },
                error:function (json) {
                    console.log(json)
                }
            });
        },
        click: function () {
            this.flag = false;
        },
        blur: function () {
            this.flag = true;
        },
        update: function (index) {
            let _this = this;
            $.ajax({
                type: 'put',
                url: this.serverUrl + '/book',
                contentType: "application/json; charset=utf-8",
                data:JSON.stringify({
                    "id":this.books[index].id,
                    "bookName":this.books[index].bookName,
                    "author":this.books[index].author,
                    "price":this.books[index].price,
                    "stock":this.books[index].stock,
                    "press":this.books[index].press,
                    "otherInfo":this.books[index].otherInfo,
                    "onSellStatus":this.books[index].onSellStatus,
                    "bookClass":this.books[index].bookClass
                }),
                success: function (json) {
                    console.log(json);
                    _this.findBookList();
                },
                error:function (json) {
                    console.log(json)
                }
            });
        },
        deleteBook: function (index) {
            let _this = this;
            $.ajax({
                type: 'delete',
                url: this.serverUrl + '/book?id=' + this.books[index].id,
                success: function (json) {
                    console.log(json);
                    _this.findBookList();
                },
                error:function (json) {
                    console.log(json)
                }
            });
        }
    }
});