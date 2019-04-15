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
        bookClass:0,
        selectedClass: 0,
        selectedSubClass: 0,
        classes: [],
    },
    mounted: function () {
        this.getBookClass();
    },
    computed:{
        subClasses: function () {
            let list = this.classes.filter(i=>i.clazz === this.selectedClass)
            if(list.length === 1)
                return list[0].clzList;
            else
                return [];
        }
    },
    methods: {
        add: function () {
            this.$http.post(this.serverUrl + '/book',JSON.stringify({
                'bookName':this.bookName,
                'author':this.author,
                'price':this.price,
                'stock':this.stock,
                'press':this.press,
                'otherInfo':this.otherInfo,
                'onSellStatus':this.onSellStatus,
                'bookClass':this.selectedSubClass
            })).then((response)=>{
                layer.msg('书籍添加成功,2秒后跳转');
                setTimeout(function () {
                    window.location.href = 'books.html';
                },2*1000)
            });
        },
        getBookClass: function () {
            let _this = this;
            this.$http.get(this.serverUrl + '/bookClass')
                .then((response)=>{
                    _this.classes = response.body;
                });
        },
    }

});