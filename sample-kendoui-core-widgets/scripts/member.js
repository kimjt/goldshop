(function (global) {
    var MemberViewModel,
        dataSource,
        app = global.app = global.app || {};

    MemberViewModel = kendo.data.ObservableObject.extend({
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
            jsonUrlToCreate = "http://samgital.co.kr:8080/mobile/member/create.json";

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
            dataSource.sync();
            that.set("DataSource", dataSource);
        },
        
        test: function(){
            var pass = document.getElementById("MberPass").value;
            var pass1 = document.getElementById("MberPass2").value;
            if($("#MberId").val()===""||$("#MberPass").val()===""||$("#MberName").val()===""||$("#MberEmail").val()===""){
                alert("입력해주세요.");
            }else{
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
        }
    });

    app.memberService = {
        viewModel: new MemberViewModel()
    };
})(window);