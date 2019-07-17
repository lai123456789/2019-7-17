
$(document).on('click', '#show-custom', function () {//同意按钮
    var applycode = $(this).attr("data-applycode");
    $("#application_danhao1").text(applycode);
    $("#tongyi").show();
    $("#jujue").hide();
    $("#all").css("background", "rgba(30,30,30,0.3)");
    查询车牌('IIS3382', '/Proposer.aspx?action=GetGarage');
});
$(document).on('click', '#show-custom_refuse', function () {    //拒绝按钮
    //var applycode = $(this).attr("data-applycode");
    //$("#application_danhao1").text(applycode);
    $("#jujue").show();
    $("#tongyi").hide();
    $("#all").css("background", "rgba(30,30,30,0.3)");
    var applycode1 = $(this).attr("data-applycode");
    $("#application_danhao_jujue").text(applycode1);    
});
$(document).on('click', '#jujue_sure', function () {    //确定拒绝操作    
    var 申请单号 = $('#application_danhao_jujue').text();
    var 原因 = $('#result1').val();
    $("#jujue").hide();
    拒绝原因提交('IIS3382', '/Proposer.aspx?action=ApplyFalse', {
        "applycode": 申请单号,
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

$(document).on('click', '#jujue_quxiao', function () { //取消拒绝操作
    $("#jujue").hide();
    $("#all").css("background", "");

});
$(document).on('click', '#quxiao', function () { //取消同意操作
    $("#tongyi").hide();
    $("#all").css("background", "");
});
function 同意(urltype, pageurl, data) {
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
$(document).on('click', '#queding_tongyi', function () {    //确定同意操作
    var 车牌 = $("#materialtype_dummy").val();
    if (车牌 == "请选择车牌") {
        weui.alert("请先选择车牌！");
        return;
    }
    var 备注 = $('#remark').val();
    var ucode = $('#usercode').val();
    var applycode_application = $("#application_danhao1").text();
    $("#tongyi").hide();
    同意('IIS3382', '/Proposer.aspx?action=Application', {
        "platenumber": 车牌,
        "applycode": applycode_application,
        "remark": 备注,
        "susercode": ucode
    });
});

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



$(document).on('click', '#accept', function () {
    //var applycode = "0015";//申请单号
    window.location.href = 'shuaixuan_car.aspx' + "?applycode=" + applycode;
});

$(document).on('tap', '#zhankai', function () { //点击展开详情
    $(this).parent().next().fadeToggle(500);
    $(this).parents('.applycode').toggleClass('contor');
});

function 查询所有(urltype, pageurl, data) {
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
                var content = '';
                if (data.data != null) {
                    $.each(data.data, function (idx, obj) {

                        content += '<div class="applycode" style="border:1px solid #EAEAEA;" data-code=' + obj.applycode + '>';

                        if (obj.status == 1) { //已驳回
                            content += '<div class="" style="display: flex; width: 100%; margin-top: 8px;">';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width: 20px; height: 20px;" /><span style="" class="code">' + obj.applycode + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" /><span style="font-size: 14px;" class="name">' + obj.applyname + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 16%">';
                            if (obj.status == 0) {
                                content += '<span class="weui-badge" style="background:green">已审核</span>';
                            } else if (obj.status == 1) {
                                content += '<span class="weui-badge" style="background:red">已驳回</span>';
                            } else if (obj.status == 2) {
                                content += '<span class="weui-badge" style="background:#AAAAAA">待审核</span>';
                            } else if (obj.status == 3) {
                                content += '<span class="weui-badge" style="background:black">已撤销</span>';
                            } else if (obj.status == 0 && obj.carstart == 2) {  //失效状态  
                                content += '<span class="weui-badge" style="background:yellow">已失效</span>';
                            } else {

                            }
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="ff" style="display: flex; width: 100%; margin-top: 8px;">';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/yuanyin.png" style="width: 20px; height: 20px;" /><span style="font-size: 14px;" id="result">' + obj.reason + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/department.png" style="width: 20px; height: 20px;" /><span style="font-size: 14px;" id="department">' + obj.department + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 16%" id="zhankai">'; //触发展开事件
                            content += '<i class="iconfont">&#xe784;</i>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="itemAll22" style="display: none;">'; //展开none  div
                            content += '<div class="weui-flex">';
                            content += '<div class="weui-flex__item">';
                            content += '<div class="" style="font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/address.png" style="width: 20px; height: 20px;" />目的地：<span style="margin-left: 5px; font-size: 14px;">' + obj.endsite + '</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="weui-flex__item">';
                            content += '<div class="" style="font-size: 14px;">';
                            content += '<span style="margin-left: 5px; font-size: 14px;">用途：' + obj.purpose + '</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />用&nbsp;&nbsp;车&nbsp;&nbsp;时&nbsp;&nbsp;间&nbsp;：';
                            content += '<span style="font-size: 14px;" id="use_time">' + obj.servicetime + '</span>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />预计还车时间：';
                            content += '<span style="font-size: 14px;" id="use_return_time">' + obj.returntime + '</span>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<div class="" style="font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" />审核人：<span style="font-size: 14px;" id="name1">' + obj.susername + '</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '</div>';
                            //content += '<div style="width:100%;border:1px solid #EAEAEA"></div>';
                        } else if (obj.status == 2) { //待审核  
                            content += '<div class="" style="display: flex; width: 100%; margin-top: 8px;">';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width: 20px; height: 20px;" /><span style="" class="code">' + obj.applycode + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" /><span style="font-size: 14px;" class="name">' + obj.applyname + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 16%">';
                            if (obj.status == 0) {
                                content += '<span class="weui-badge" style="background:green">已审核</span>';
                            } else if (obj.status == 1) {
                                content += '<span class="weui-badge" style="background:red">已驳回</span>';
                            } else if (obj.status == 2) {
                                content += '<span class="weui-badge" style="background:#AAAAAA">待审核</span>';
                            } else if (obj.status == 3) {
                                content += '<span class="weui-badge" style="background:black">已撤销</span>';
                            } else if (obj.status == 0 && obj.carstart == 2) {  
                                content += '<span class="weui-badge" style="background:yellow">已失效</span>';
                            } else {

                            }
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="ff" style="display: flex; width: 100%; margin-top: 8px;">';

                            content += '<div class="" style="width:84%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/department.png" style="width: 20px; height: 20px;" /><span style="font-size: 14px;" id="department">' + obj.department + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 16%" id="zhankai">'; //触发展开事件
                            content += '<i class="iconfont">&#xe784;</i>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="itemAll22" style="display: none;">'; //展开none  div
                            content += '<div class="weui-flex">';
                            content += '<div class="weui-flex__item">';
                            content += '<div class="" style="font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/address.png" style="width: 20px; height: 20px;" />目的地：<span style="margin-left: 5px; font-size: 14px;">' + obj.endsite + '</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="weui-flex__item">';
                            content += '<div class="" style="font-size: 14px;">';
                            content += '<span style="margin-left: 5px; font-size: 14px;">用途：' + obj.purpose + '</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />用&nbsp;&nbsp;车&nbsp;&nbsp;时&nbsp;&nbsp;间&nbsp;：';
                            content += '<span style="font-size: 14px;" id="use_time">' + obj.servicetime + '</span>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />预计还车时间：';
                            content += '<span style="font-size: 14px;" id="use_return_time">' + obj.returntime + '</span>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<div class="" style="font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" />审核人：<span style="font-size: 14px;" id="name1">' + obj.susername + '</span>';
                            content += '</div>';
                            content += '<div class="" style="font-size: 14px;">'; //按钮                            
                            content += '<a style="color: white;" data-applycode=' + obj.applycode + ' id="show-custom"  href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary">同意</a>&nbsp;&nbsp;';
                            content += '<a style="color: white;" data-applycode=' + obj.applycode + ' id="show-custom_refuse" href="javascript:;"  class="weui-btn weui-btn_mini weui-btn_warn">拒绝</a>';
                            content += '</div>';//按钮结束
                            content += '</div>';
                            content += '</div>';                               
                        } else if (obj.status == 0 && obj.carstart == 2) {  //失效状态  审核通过并且已经还车
                            content += '<div class="" style="display: flex; width: 100%; margin-top: 8px;">';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width: 20px; height: 20px;" /><span style="" class="code">' + obj.applycode + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" /><span style="font-size: 14px;" class="name">' + obj.applyname + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 16%">';
                            if (obj.status == 0 && obj.carstart == 2) {  //失效状态  
                                content += '<span class="weui-badge" style="background:#E8AE33">已失效</span>';
                            } else if (obj.status == 0) {
                                content += '<span class="weui-badge" style="background:green">已审核</span>';
                            } else if (obj.status == 1) {
                                content += '<span class="weui-badge" style="background:red">已驳回</span>';
                            } else if (obj.status == 2) {
                                content += '<span class="weui-badge" style="background:#AAAAAA">待审核</span>';
                            } else if (obj.status == 3) {
                                content += '<span class="weui-badge" style="background:black">已撤销</span>';
                            } else {
                            }

                            content += '</div>';
                            content += '</div>';
                            content += '<div class="ff" style="display: flex; width: 100%; margin-top: 8px;">';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/chepai1.png" style="width: 20px; height: 20px;" /><span style="font-size: 14px;" id="result">' + obj.platenumber + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/department.png" style="width: 20px; height: 20px;" /><span style="font-size: 14px;" id="department">' + obj.department + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 16%" id="zhankai">'; //触发展开事件
                            content += '<i class="iconfont">&#xe784;</i>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="itemAll22" style="display: none;">'; //展开none  div
                            content += '<div class="weui-flex">';
                            content += '<div class="weui-flex__item">';
                            content += '<div class="" style="font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/address.png" style="width: 20px; height: 20px;" />目的地：<span style="margin-left: 5px; font-size: 14px;">' + obj.endsite + '</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="weui-flex__item">';
                            content += '<div class="" style="font-size: 14px;">';
                            content += '<span style="margin-left: 5px; font-size: 14px;">用途：' + obj.purpose + '</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />申请用车时间：';
                            content += '<span style="font-size: 14px;" id="use_time">' + obj.servicetime + '</span>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />预计还车时间：';
                            content += '<span style="font-size: 14px;" id="use_return_time">' + obj.returntime + '</span>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<div class="" style="font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" />审核人：<span style="font-size: 14px;" id="name1">' + obj.susername + '</span>';
                            content += '</div>';
                            content += '<div class="" style="font-size: 14px;margin-left:10px;">';
                            content += '使用时长：<span style="font-size: 14px;margin-right:10px;">' + obj.playtime + '</span>';
                            content += '行驶公里数：<span style="font-size: 14px;">' + obj.playkm + '</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<div class="" style="font-size: 14px;margin-left:10px;">';
                            content += '初始公里数：<span style="font-size: 14px;margin-right:10px;">' + obj.begin + '</span>';
                            content += '还车公里数：<span style="font-size: 14px;">' + obj.endplay + '</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<div class="" style="font-size: 14px;margin-left:10px;">';
                            content += '用车备注：<span style="font-size: 14px;margin-right:10px;">' + obj.remark + '</span>';
                            content += '还车备注：<span style="font-size: 14px;">' + obj.returnremark + '</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '</div>';
                            //content += '<div style="width:100%;border:1px solid #EAEAEA"></div>';
                        } else if (obj.status == 0 && obj.carstart !== 2) {  //已审批的
                            content += '<div class="" style="display: flex; width: 100%; margin-top: 8px;">';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width: 20px; height: 20px;" /><span style="" class="code">' + obj.applycode + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" /><span style="font-size: 14px;" class="name">' + obj.applyname + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 16%">';
                            if (obj.status == 0) {
                                content += '<span class="weui-badge" style="background:green">已审核</span>';
                            } else if (obj.status == 1) {
                                content += '<span class="weui-badge" style="background:red">已驳回</span>';
                            } else if (obj.status == 2) {
                                content += '<span class="weui-badge" style="background:#AAAAAA">待审核</span>';
                            } else if (obj.status == 3) {
                                content += '<span class="weui-badge" style="background:black">已撤销</span>';
                            } else if (obj.status == 0 && obj.carstart == 2) {  //失效状态  
                                content += '<span class="weui-badge" style="background:yellow">已失效</span>';
                            } else {

                            }
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="ff" style="display: flex; width: 100%; margin-top: 8px;">';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/chepai1.png" style="width: 20px; height: 20px;" /><span style="font-size: 14px;" id="result">' + obj.platenumber + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/department.png" style="width: 20px; height: 20px;" /><span style="font-size: 14px;" id="department">' + obj.department + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 16%" id="zhankai">'; //触发展开事件
                            content += '<i class="iconfont">&#xe784;</i>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="itemAll22" style="display: none;">'; //展开none  div
                            content += '<div class="weui-flex">';
                            content += '<div class="weui-flex__item">';
                            content += '<div class="" style="font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/address.png" style="width: 20px; height: 20px;" />目的地：<span style="margin-left: 5px; font-size: 14px;">' + obj.endsite + '</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="weui-flex__item">';
                            content += '<div class="" style="font-size: 14px;">';
                            content += '<span style="margin-left: 5px; font-size: 14px;">用途：' + obj.purpose + '</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />申请用车时间：';
                            content += '<span style="font-size: 14px;" id="use_time">' + obj.servicetime + '</span>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />预计还车时间：';
                            content += '<span style="font-size: 14px;" id="use_return_time">' + obj.returntime + '</span>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<div class="" style="font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" />审核人：<span style="font-size: 14px;" id="name1">' + obj.susername + '</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '</div>';
                            // content += '<div style="width:100%;border:1px solid #EAEAEA"></div>';
                        } else { //撤销状态 3

                            content += '<div class="" style="display: flex; width: 100%; margin-top: 8px;">';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width: 20px; height: 20px;" /><span style="" class="code">' + obj.applycode + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" /><span style="font-size: 14px;" class="name">' + obj.applyname + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 16%">';
                            if (obj.status == 0) {
                                content += '<span class="weui-badge" style="background:green">已审核</span>';
                            } else if (obj.status == 1) {
                                content += '<span class="weui-badge" style="background:red">已驳回</span>';
                            } else if (obj.status == 2) {
                                content += '<span class="weui-badge" style="background:#AAAAAA">待审核</span>';
                            } else if (obj.status == 3) {
                                content += '<span class="weui-badge" style="background:black">已撤销</span>';
                            } else if (obj.status == 0 && obj.carstart == 2) {  //失效状态  
                                content += '<span class="weui-badge" style="background:yellow">已失效</span>';
                            } else {

                            }
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="ff" style="display: flex; width: 100%; margin-top: 8px;">';

                            content += '<div class="" style="width:84%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/department.png" style="width: 20px; height: 20px;" /><span style="font-size: 14px;" id="department">' + obj.department + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 16%" id="zhankai">'; //触发展开事件
                            content += '<i class="iconfont">&#xe784;</i>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="itemAll22" style="display: none;">'; //展开none  div
                            content += '<div class="weui-flex">';
                            content += '<div class="weui-flex__item">';
                            content += '<div class="" style="font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/address.png" style="width: 20px; height: 20px;" />目的地：<span style="margin-left: 5px; font-size: 14px;">' + obj.endsite + '</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="weui-flex__item">';
                            content += '<div class="" style="font-size: 14px;">';
                            content += '<span style="margin-left: 5px; font-size: 14px;">用途：' + obj.purpose + '</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />用&nbsp;&nbsp;车&nbsp;&nbsp;时&nbsp;&nbsp;间&nbsp;：';
                            content += '<span style="font-size: 14px;" id="use_time">' + obj.servicetime + '</span>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<img class="weui-vcode-img" src="./images/time.png" style="width: 20px; height: 20px;" />预计还车时间：';
                            content += '<span style="font-size: 14px;" id="use_return_time">' + obj.returntime + '</span>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;">';
                            content += '<div class="" style="font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" />审核人：<span style="font-size: 14px;" id="name1">' + obj.susername + '</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '</div>';
                            // content += '<div style="width:100%;border:0.3px solid #EAEAEA"></div>';
                        }
                             content += '</div>';

                    });
                }
                $('#all').empty();
                $('#all').append(content);
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}


//筛选操作

$(document).on('click', '#select_info', function () {
    $(".itemAll_select").slideToggle(500);
});
$(document).on('click', '#sel > .weui-flex__item', function () {
    $(this).addClass("lei").siblings().removeClass("lei");

    if ($(this).hasClass('lei')) {
      var dome = $(this).text();
    };
    查询所有('IIS3382', '/Proposer.aspx?action=GetAll', {
        "dome": dome
    });
});

$(function () {

    查询所有('IIS3382', '/Proposer.aspx?action=GetAll', {
        
    });
})

$(document).on('click', '.applycode', function () {
    var applycode = $(this).attr("data-code");//申请单号

    // window.location.href = 'admin_look_application.aspx' + "?applycode=" + applycode;
});




