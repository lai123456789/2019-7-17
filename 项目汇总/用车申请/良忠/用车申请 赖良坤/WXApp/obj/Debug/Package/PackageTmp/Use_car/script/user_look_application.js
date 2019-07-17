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
                $("#accent").text(data.data[0].accent);
                $("#department").text(data.data[0].department);
                $("#reason").text(data.data[0].purpose);
                $("#use_car_time").text(data.data[0].servicetime); 
                $("#return_car_time").text(data.data[0].returntime);

                var content = '';
                if (data.data[0].status == 0) {
                    content += '<span  id="status" class="weui-badge" style="background:green">已批准</span>';
                }else if (data.data[0].status == 1) {
                    content += '<span  id="status" class="weui-badge" style="background:red">已驳回</span>';
                } else {
                    content += '<span  id="status" class="weui-badge" style="background:#AAAAAA">待审核</span>';
                }
                $("#zhuangtai").append(content)

                //$("#status").text(data.data[0].status);//申请状态

                var status = data.data[0].status;
                if (status == 0) {
                    $("#btn_index").hide();
                    $("#status").text("已通过");
                    $("#bohui").hide(); 
                    $("#chushi").show();            

                }
                if (status == 1) {
                    $("#btn_index").hide();
                    $("#status").text("已驳回");
                    $("#f2").hide();
                }
                if (status == 2) {
                    $("#status").text("待审核");
                    $("#btn_index").show();
                    $("#shenhe").hide();
                    $("#f1").hide();
                }
                $("#bohui_reason").text(data.data[0].reason);                
                $("#platenumber").text(data.data[0].platenumber);
                $("#carstart").text(data.data[0].carstart);//车辆状况
                var status_car = $("#carstart").text();
                if (status_car == 0) {
                    $("#carstart").text("待使用");
                    $("#f3").hide();
                }
                if (status_car == 1) {

                    $("#carstart").text("使用中");
                    $("#chushi").hide();
                    $("#f3").hide();


                }
                if (status_car == 2) { //
                    $("#carstart").text("已还车");
                    $("#f3").show(); 
                    $("#chushi").hide();
                }
                $("#playkm").text(data.data[0].playkm);
                $("#playtime").text(data.data[0].playtime);
                $("#returnremark").text(data.data[0].returnremark);
                $("#endtime").text(data.data[0].endtime);
                if (status == 0 && status_car == 1) {  //判断还车公里数填入                    
                    $("#end").show();
                } else {
                    $("#end").hide();
                }


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

$(document).on('click', '#use_car', function () { //确定申请按钮           初始公里数
    var doctorSex = $("#star_num").text(); //获取单选按钮选中的值
    if (doctorSex == '' || doctorSex == null) {
        weui.alert("请输入初始公里数");
        return;
    }
    提交初始公里数('IIS3382', '/Proposer.aspx?action=Appli', {
        "applycode": applycode,
        "begin": doctorSex        
    });
    
});
function 提交初始公里数(urltype, pageurl, data) {
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
                weui.alert("已提交初始公里数，可立即用车！");                
                setTimeout(function () {                    
                    window.location.href = "application_index.aspx";
                }, 3000)
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}



$(document).on('click', '#return_car', function () { //确定申请按钮          还车公里数
    var end_carNum = $("#end_num").text(); //获取单选按钮选中的值
    var 备注 = $("#remark_num").val();
    if (end_carNum == '' || end_carNum == null) {
        weui.alert("请输入还车公里数");
        return;
    }
    提交还车公里数('IIS3382', '/Proposer.aspx?action=AppliReturn', {
        "applycode": applycode,
        "endplay": end_carNum,
        "returnremark": 备注//yipin
    });
   
});
function 提交还车公里数(urltype, pageurl, data) {
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
                weui.alert("已提交还车公里数，还车成功！");
                setTimeout(function () {
                    window.location.href = "application_index.aspx";
                }, 3000)
            }
            else {
                alert(data.errmsg);
            }
        }
    });
};


//var 用户id = "";
//$(function () {
//    用户id = $("#usercode").val();
//    alert(用户id);
//    用户查询申请('IIS3382', '/Proposer.aspx?action=GetApply', {
//        "usercode": 用户id
//    });
//})
//function 用户查询申请(urltype, pageurl, data) {
//    $.ajax({
//        cache: true,
//        type: "POST",
//        dataType: "json",
//        url: "/Web/WebApi.aspx?action=requestdata",
//        data: {
//            "urltype": urltype,
//            "pageurl": pageurl,
//            "data": JSON.stringify(data)
//        },
//        async: true,
//        error: function (request) {
//            hideLoading();
//        },
//        success: function (data) {
//            if (data.errcode == 0) {
//                //$("#application_danhao").text(data.data[0].applycode);
//                //$("#application_user").text(data.data[0].applyname);
//                //$("#department").text(data.data[0].department);
//                //$("#reason").text(data.data[0].purpose);
//                //$("#use_car_time").text(data.data[0].returntime);
//                //$("#return_car_time").text(data.data[0].servicetime);
//            }
//            else {
//                alert(data.errmsg);
//            }
//        }
//    });
//}


//$(document).on('tap', '#remark_sure', function () {
//    var 车牌 = $("#materialtype_dummy").val();
//    var 申请单号 = $('#danhao').text();
//    var 备注 = $('#remark').val();
//    筛选车牌('IIS3382', '/Proposer.aspx?action=Application', {
//        "platenumber": 车牌,
//        "applycode": 申请单号,
//        "remark": 备注
//    });
//});
//function 筛选车牌(urltype, pageurl, data) {
//    $.ajax({
//        cache: true,
//        type: "POST",
//        dataType: "json",
//        url: "/Web/WebApi.aspx?action=requestdata",
//        data: {
//            "urltype": urltype,
//            "pageurl": pageurl,
//            "data": JSON.stringify(data)
//        },
//        async: true,
//        error: function (request) {
//            hideLoading();
//        },
//        success: function (data) {
//            if (data.errcode == 0) {
//                weui.alert("提交成功！");
//            }
//            else {
//                alert(data.errmsg);
//            }
//        }
//    });
//}
////$(function () {
////    var 备注 = $('#remark').val();
////    筛选车牌('IIS3382', '/Proposer.aspx?action=Applicationap', {
////        "remark": 备注
////    });
////});