(function (global) {
    var SearchViewModel,
        dataSource,
        app = global.app = global.app || {};

    SearchViewModel = kendo.data.ObservableObject.extend({
        searchDataSource: null,

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
            
            that.set("searchResult", dataSource);
        },
        
        search: function(){
            var search,
                bt;
            search=document.getElementById("searchValue").value;
            dataSource.filter({field:"type", value:search});
            that.set("searchResult", dataSource);
        }
    });

    app.searchService = {
        viewModel: new SearchViewModel()
    };
})(window);