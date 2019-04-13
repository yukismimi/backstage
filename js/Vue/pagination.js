let pagination = new Vue({
    el: '#pagination',
    data: {
        cur:1,
        amountPerPage:10,
    },
    mounted: function () {

    },
    computed:{
        pages: function () {
            return Math.floor((this.all-1) / this.amountPerPage) + 1;
        },
        start:function () {
           return (this.cur-1) * this.amountPerPage;
        },
        end:function(){
           let curPageLast = (this.cur-1) * this.amountPerPage + this.amountPerPage;
           if(this.all < curPageLast)
               return this.all;
           else
               return curPageLast;
        },
        hasPre: function () {
            return this.cur !== 1;
        },
        hasNext: function () {
            return this.cur < this.pages;
        },
        all:function(){
            return app.dataList.length;
        }
    },
    methods: {
        to: function (index) {
            if(index > this.pages || index < 1)
                return false;
            this.cur = index;
        }
    }
});