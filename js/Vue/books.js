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
            this.$http.get(this.serverUrl + '/bookList')
                .then((response)=>{
                    _this.dataList = response.body;
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
            this.$http.put(this.serverUrl + '/book',JSON.stringify({
                "id":this.books[index].id,
                "bookName":this.books[index].bookName,
                "author":this.books[index].author,
                "price":this.books[index].price,
                "stock":this.books[index].stock,
                "press":this.books[index].press,
                "otherInfo":this.books[index].otherInfo,
                "onSellStatus":this.books[index].onSellStatus,
                "bookClass":this.books[index].bookClass
            })).then((response)=>{
                layer.msg('更新成功');
                _this.findBookList();
            });
        },
        deleteBook: function (index) {
            let _this = this;
            this.$http.delete(this.serverUrl + '/book?id=' + this.books[index].id)
                .then((response)=>{
                    console.log(response.body);
                    _this.findBookList();
                });
        }
    }
});