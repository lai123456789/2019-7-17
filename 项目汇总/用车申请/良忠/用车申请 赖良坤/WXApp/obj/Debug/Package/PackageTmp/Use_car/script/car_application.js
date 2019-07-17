    
function 用户查询申请(urltype, pageurl, data) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
            hideLoading();
            alert(data.errmsg);
        },
        success: function (data) {
            if (data.errcode == 0) {
                $("#application_user").val(data.data[0].username);
                $("#application_user_num").val(data.data[0].account);
                $("#application_departmentname").val(data.data[0].departmentname);
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}
$(function () {
    var code = $('#usercode').val();
    用户查询申请('IIS3382', '/Proposer.aspx?action=GetUsercode', {       
        "usercode": code
    });
})


//function 查询申请人(urltype, pageurl, data) {
//    $.ajax({
//        cache: true,
//        type: "POST",
//        dataType: "json",
//        url: "/Web/WebApi.aspx?action=requestdata",
//        data: {
//            "urltype": urltype,
//            "pageurl": pageurl,
//            "data": data
//        },
//        async: true,
//        error: function (request) {
//            hideLoading();
//        },
//        success: function (data) {
//            if (data.errcode == 0) {
//                $("#application_user").val(username);
//                $("#application_user_num").val(account);
//                $("#application_wordercode").val(departmentname);                
//            }
//            else {
//                alert(data.errmsg);
//            }
//        }
//    });
//}

//$(function () {
//    查询申请人('IIS3382', '/Proposer.aspx?action=GetUsercode',usercode);

//})


$(document).on('click', '#sure_application', function (e) {
    var 申请人 = $('#application_user').val();
    var 工号 = $('#application_user_num').val();
    var 部门 = $('#application_departmentname').val();
    var 申请用途 = $('#application_result').val();
    var 申请用车时间 = $('#years-monthes').val();
    var 预计还车时间 = $('#years-monthes-return').val();
    var 前往目的地 = $('#application_address').val();
    var usercode = $('#usercode').val();
    提交申请('IIS3382', '/Proposer.aspx?action=Apply', {
        "applyname": 申请人,
        "accent":工号,
        "department": 部门,
        "endsite": 前往目的地,
        "purpose": 申请用途,
        "servicetime": 申请用车时间,
        "returntime": 预计还车时间,
        "usercode": usercode
    });
});

function 提交申请(urltype, pageurl, data) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            if (data.errcode == 0) {
                weui.alert("已提交！");
                    location.href = "car_application_submit.aspx";
                //setTimeout(function () {
                //}, 2000)
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}




