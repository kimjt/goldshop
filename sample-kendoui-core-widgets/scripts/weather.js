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
            jsonUrlToLoad = app.makeUrlAbsolute("data/product.json");
            //jsonUrlToLoad = "http://samgital.co.kr:8080/mobile/product.json";

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
        productView: function(){
            var title = document.getElementById("title").value;
            dataSource.filter({field:"title", value:title});
            this.set("viewDataSource", dataSource);
        }
    });

    app.weatherService = {
        viewModel: new WeatherViewModel()
    };
})(window);