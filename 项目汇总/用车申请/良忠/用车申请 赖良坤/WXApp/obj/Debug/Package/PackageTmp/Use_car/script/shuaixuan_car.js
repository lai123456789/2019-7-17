$(document).on('tap', '#materialtype_dummy', function () {
    $("#pai").hide();
    var a = $(".dw-bf div:eq(0)").attr("data-val");
    if (a == "请选择车牌") {
        $(".dw-bf div:eq(0)").remove();
    }
})
function 查询车牌(urltype, pageurl) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            //"data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            if (data.errcode == 0) {
                var content = '';
                if (data.data != null) {
                    $.each(data.data, function (idx, obj) {                        
                        content += '<option value="' + obj.platenumber + '">' + obj.platenumber + '</option>';
                    });
                }
                $('#materialtype').append(content);
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}

$(function () {
    查询车牌('IIS3382', '/Proposer.aspx?action=GetGarage');
    $("#danhao").text(applycode);
})

//获取URL地址中的参数值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
var applycode = GetQueryString("applycode");;//申请单号
$(document).on('tap', '#remark_sure', function () {
    
    var 车牌 = $("#materialtype_dummy").val();
    if (车牌 == "请选择车牌") {
        weui.alert("请先选择车牌！");
        return;
    }
    var 备注 = $('#remark').val();
    var 用户id = $('#usercode').val();
    筛选车牌('IIS3382', '/Proposer.aspx?action=Application', {
        "platenumber": 车牌,
        "applycode": applycode,
        "remark": 备注,
        "susercode": 用户id
    });
});
function 筛选车牌(urltype, pageurl, data) {
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
                weui.alert("已同意该申请，消息将推送给申请人！");
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
//$(function () {
//    var 备注 = $('#remark').val();
//    筛选车牌('IIS3382', '/Proposer.aspx?action=Applicationap', {
//        "remark": 备注
//    });
//});