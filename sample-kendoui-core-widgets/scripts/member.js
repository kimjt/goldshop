(function (global) {
    var WeatherViewModel,
        dataSource,
        app = global.app = global.app || {};

    WeatherViewModel = kendo.data.ObservableObject.extend({
        DataSource: null,

        init: function () {
            var that = this,
                jsonUrlToLoad,
                jsonUrlToCreate;

            kendo.data.ObservableObject.fn.init.apply(that, []);

            //When you build for Apache Cordova 3.0.0, apply this code instead of using relative URLs. In Apache Cordova 3.0.0, relative URLs might not work properly.
            //jsonUrlToLoad = app.makeUrlAbsolute("data/member.json");
            //jsonUrlToCreate = app.makeUrlAbsolute("data/member/create.json");
            jsonUrlToLoad = "http://samgital.co.kr:8080/mobile/member.json";
            jsonUrlToCreate = "http://samgital.co.kr:8080/mobile/member/createw.json";

            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: jsonUrlToLoad,
                        dataType: "json"
                    },
                    create: {
                        url: jsonUrlToCreate,
                        type: "POST",
                        dataType: "json"
                    }
                }
            });
            //addEventListener("click", function(){
             // dataSource.sync();
            //});
            that.set("DataSource", dataSource);
        },
        
        test: function(){
            var pass = document.getElementById("MberPass").value;
            var pass1 = document.getElementById("MberPass2").value;
            if(pass===pass1){
            dataSource.add({MberId:$("#MberId").val(), MberPass:$("#MberPass").val(),MberName:$("#MberName").val(),MberEmail:$("#MberEmail").val()});
            $("#MberId").val('');
            $("#MberPass").val('');
            $("#MberPass2").val('');
            $("#MberName").val('');
            $("#MberEmail").val('');
            dataSource.create();
            dataSource.sync();
            }else{
                alert("비밀번호를 확인해 주세요");
                $("#MberPass").val('');
                $("#MberPass2").val('');
            }
        }
    });

    app.weatherService = {
        viewModel: new WeatherViewModel()
    };
})(window);