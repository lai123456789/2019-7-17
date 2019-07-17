
var applycode = GetQueryString("applycode");;//申请单号
//获取URL地址中的参数值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
$(document).on('click', '#accept', function () {
    
    window.location.href = 'shuaixuan_car.aspx' + "?applycode=" + applycode;
});

function 用户查询申请(urltype, pageurl, data) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": data
        },
        async: true,
        error: function (request) {
            hideLoading();
            alert(data.errmsg);
        },
        success: function (data) {
            if (data.errcode == 0) {
                $("#application_danhao").text(applycode);
                $("#application_user").text(data.data[0].applyname);
                $("#department").text(data.data[0].department);
                $("#reason").text(data.data[0].purpose);
                $("#use_car_time").text(data.data[0].servicetime); 
                $("#return_car_time").text(data.data[0].returntime);
                $("#bohui_reason").text(data.data[0].reason);
                $("#jieguo").text(data.data[0].status); //后台给的0或1或2
                var status = $("#jieguo").text();                
                if ($("#jieguo").text() == 0) {
                    $("#btn_index").hide();
                    $("#bohui").hide();
                    $("#jieguo").text("已通过");
                }
                if ($("#jieguo").text() == 1) {
                    $("#btn_index").hide();
                    $("#f2").hide();
                    $("#jieguo").text("已驳回");
                }
                if ($("#jieguo").text() == 2) { //
                    $("#jieguo").text("待审核");
                    $("#btn_index").show();
                    $("#f1").hide();
                    //$("#shenhe").hide();
                }
                $("#platenumber").text(data.data[0].platenumber);
                $("#carstart").text(data.data[0].carstart);//车辆状况
                var status_car = $("#carstart").text();
                if (status_car == 0) {
                    $("#carstart").text("待使用");
                    $("#f3").hide();
                }
                if (status_car == 1) {
                    $("#carstart").text("使用中");
                    $("#f3").hide();
                }
                if (status_car == 2) { //
                    $("#carstart").text("已还车");
                    
                }
                $("#playkm").text(data.data[0].playkm);
                $("#playtime").text(data.data[0].playtime);
                $("#returnremark").text(data.data[0].returnremark);
                $("#endtime").text(data.data[0].endtime);

            }
            else {
                alert(data.errmsg);
            }
        }
    });
}
$(function () {
    
    用户查询申请('IIS3382', '/Proposer.aspx?action=GetApplyCode', applycode);
    
})


$(document).on('click', '#refuse', function () {//点击拒绝 显示输入框 隐藏按钮
    $("#jujue").show();
    $("#btn_index").hide();
});
$(document).on('click', '#refuse_sure', function () {
    
    var 原因 = $('#refuse_reason').val();   
    拒绝原因提交('IIS3382', '/Proposer.aspx?action=ApplyFalse', {
        "applycode": applycode,
        "reason": 原因
    });
});
function 拒绝原因提交(urltype, pageurl, data) {
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
                weui.alert("提交成功！");
                setTimeout(function () {
                    location.href = "adminAll_application_index.aspx";
                }, 2000)
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}
