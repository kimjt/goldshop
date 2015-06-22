(function (global) {
    var WeatherViewModel,
        dataSource,
        app = global.app = global.app || {};

    WeatherViewModel = kendo.data.ObservableObject.extend({
        weatherDataSource: null,

        init: function () {
            var that = this,
                jsonUrlToLoad;

            kendo.data.ObservableObject.fn.init.apply(that, []);

            //When you build for Apache Cordova 3.0.0, apply this code instead of using relative URLs. In Apache Cordova 3.0.0, relative URLs might not work properly.
            //jsonUrlToLoad = app.makeUrlAbsolute("data/product.json");
            jsonUrlToLoad = "http://samgital.co.kr:8080/mobile/product.json";

            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: jsonUrlToLoad,
                        dataType: "json"
                    }
                },
                pageSize: 10
            });
            that.set("weatherDataSource", dataSource);
        },
        pageBar: function(){
            dataSource.filter({field:"type", value:"bar"});
        },
        pageRing: function(){
            dataSource.filter({field:"type", value:"ring"});
        },
        pageNeck: function(){
            dataSource.filter({field:"type", value:"neck"});
        },
        pageEarr: function(){
            dataSource.filter({field:"type", value:"earr"});
        },
        search: function(){
            var search;
            search=document.getElementById("searchValue").value;
            dataSource.filter({field:"type", operator: "eq", value:search});
            this.set("searchResult", dataSource);
        },
        productView: function(){
            /*var title = document.querySelectorAll("#title");
            var viewPage = document.querySelectorAll("#viewPage");
            for(var i=0; i<viewPage.length; i++){
                viewPage[i].addEventListener("click", function(){
                    alert(i); 
                });
            }*/
            var title = document.getElementById("title").value;
            dataSource.filter({field:"title", operator: "eq", value:title});
            this.set("viewDataSource", dataSource);
            
        },
        cart: function(){
            var title = document.getElementById("product_title").value,
                img = document.getElementById("product_img").value,
                price = document.getElementById("product_price").value,
                content = document.getElementById("product_content").value,
                index = document.getElementById("product_index").value,
                type = document.getElementById("product_type").value;

            var data,
                key,num=0;
            data = '{"index": '+ index +', "type": "'+ type +'", "title": "'+ title +'", "price": '+ price +', "image": "'+ img +'", "content":"'+ content +'"}';
            
            var num = sessionStorage.length+1;
            var key = "product_"+num;
            
            sessionStorage.setItem(key,data);
        },
        cartList: function(){
            var datas ="[",
                data,value;
            for(var i=0;i<sessionStorage.length;i++){
                data = sessionStorage.getItem("product_"+(i+1));
                datas += data;
                if(i<sessionStorage.length-1){
                    datas += ",";
                }else if(i===sessionStorage.length-1){
                    datas +="]"
                }
            }
            /*alert(datas);*/
            var Jdata = JSON.parse(datas);
            /*alert(Jdata);*/
            value = new kendo.data.DataSource({
                        data: Jdata
            });
            this.set("cartDataSource", value);
        }
    });

    app.weatherService = {
        viewModel: new WeatherViewModel()
    };
})(window);