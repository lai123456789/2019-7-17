var 用户id = "";
$(function () {
    用户id = $("#usercode").val();
    
    用户查询申请('IIS3382', '/Proposer.aspx?action=GetApply', {
        "usercode": 用户id
    });
})
                            //撤销开始
$(document).on('click', '#show-custom_refuse', function () {    //撤销按钮
    //var applycode = $(this).attr("data-applycode");
    //$("#application_danhao1").text(applycode);
    $("#jujue").show();    
    var applycode_hao = $(this).attr("data-applycode");
    $("#application_danhao_jujue").text(applycode_hao);
});
$(document).on('click', '#jujue_sure', function () {    //确定撤销操作    
    var 申请单号 = $('#application_danhao_jujue').text();
    var 原因 = $('#result_chexiao').val();
    $("#jujue").hide();
    撤销原因提交('IIS3382', '/Proposer.aspx?action=ApplyRepeal', {
        "applycode": 申请单号,
        "repeal": 原因
    });
});
function 撤销原因提交(urltype, pageurl, data) {
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
                weui.alert("撤销成功！");
                setTimeout(function () {
                    location.href = "application_index.aspx";
                }, 2000)
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}

$(document).on('click', '#jujue_quxiao', function () { //取消撤销操作
    $("#jujue").hide();
});
//撤销结束
$(document).on('tap', '#zhankai', function () { //点击展开详情
    $(this).parents('.applycode').toggleClass('contor');
    $(this).parent().next().fadeToggle(500);
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
            "data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            if (data.errcode == 0) {
                var content = '';
                if (data.data != null) {
                    $.each(data.data, function (idx, obj) { //用户的查看自己汇总

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
                                content += '<span class="weui-badge" style="background:red">未通过</span>';
                            } else if (obj.status == 2) {
                                content += '<span class="weui-badge" style="background:#AAAAAA">未审核</span>';
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
                        } else if (obj.status == 2) { //未审核  
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
                                content += '<span class="weui-badge" style="background:red">未通过</span>';
                            } else if (obj.status == 2) {
                                content += '<span class="weui-badge" style="background:#AAAAAA">未审核</span>';
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
                            content += '<div class="" style="font-size: 14px;">'; //撤销按钮         //填入备注撤销                    
                            content += '<a style="color: white;" data-applycode=' + obj.applycode + ' id="show-custom_refuse" href="javascript:;"  class="weui-btn weui-btn_mini weui-btn_warn">撤销</a>';
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
                                content += '<span class="weui-badge" style="background:red">未通过</span>';
                            } else if (obj.status == 2) {
                                content += '<span class="weui-badge" style="background:#AAAAAA">未审核</span>';
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
                        } else if (obj.status == 0 && obj.carstart == 0) {  //已审批(批准了待使用)的
                            content += '<div class="" style="display: flex; width: 100%; margin-top: 8px;">';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width: 20px; height: 20px;" /><span style="" class="code">' + obj.applycode + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" /><span style="font-size: 14px;" class="name">' + obj.applyname + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 16%">';
                            if (obj.status == 0 && obj.carstart == 0) {
                                content += '<span class="weui-badge" style="background:green">已批准</span>';
                            } else if (obj.status == 1) {
                                content += '<span class="weui-badge" style="background:red">未通过</span>';
                            } else if (obj.status == 2) {
                                content += '<span class="weui-badge" style="background:#AAAAAA">未审核</span>';
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
                            content += '<img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" />审核人：<span style="font-size: 14px;margin-right:30px;" id="name1">' + obj.susername + '</span>';
                            content += '当前车辆初始公里数：<span class="values" id="star_num" >请输入</span>';
                            content += '<a style="color: white;" data-use-applycode=' + obj.applycode + ' id="show-use"  href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary">立即用车</a>&nbsp;&nbsp;';
                            content += '</div>';
                            content += '</div>';
                            content += '</div>';
                            
                        } else if (obj.status == 0 && obj.carstart == 1) {  //使用中
                            content += '<div class="" style="display: flex; width: 100%; margin-top: 8px;">';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/icon_nav_article.png" style="width: 20px; height: 20px;" /><span style="" class="code">' + obj.applycode + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 42%; font-size: 14px;">';
                            content += '<img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" /><span style="font-size: 14px;" class="name">' + obj.applyname + '</span>';
                            content += '</div>';
                            content += '<div class="" style="width: 16%">';
                            if (obj.status == 0 && obj.carstart == 1) {
                                content += '<span class="weui-badge" style="background:#94CF50">使用中</span>';
                            } else if (obj.status == 1) {
                                content += '<span class="weui-badge" style="background:red">未通过</span>';
                            } else if (obj.status == 2) {
                                content += '<span class="weui-badge" style="background:#AAAAAA">未审核</span>';
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
                            content += '<img class="weui-vcode-img" src="./images/yonghu.png" style="width: 20px; height: 20px;" />审核人：<span style="font-size: 14px;margin-right:30px;" id="">' + obj.susername + '</span>';
                            content += '当前车辆还车公里数：<span class="values_end" id="end_num" >请输入</span>';
                            content += '</div>';
                            content += '</div>';
                            content += '<div class="" style="display: flex; width: 100%; font-size: 14px; margin-top: 5px;margin-left: 25px;">';
                            content += '<div class="" style="font-size: 14px;">';
                            content += '备注：<input class="weui-input" id="remark_num" placeholder="可填入备注">';
                            content += '<a style="color: white;" data-use-applycode=' + obj.applycode + ' id="show-return"  href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary">立即还车</a>&nbsp;&nbsp;';

                            content += '</div>';
                            content += '</div>';
                            content += '</div>';//中

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
                                content += '<span class="weui-badge" style="background:red">未通过</span>';
                            } else if (obj.status == 2) {
                                content += '<span class="weui-badge" style="background:#AAAAAA">未审核</span>';
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






                        //content += '<div  class="weui-cell__bd"> <label class="weui-cells__title">申请单号：<span style="margin-left:10px;">' + obj.applycode + '</span></label></div>';
                        //content += '<div class="weui-cell__ft"><img class="weui-vcode-img" src="./images/right.png" style="width:20px;height:20px;"/></div>';
                        content += '</div>';

                    });
                }
                $('#user_application').empty();
                $('#user_application').append(content);
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}

//$(document).on('click', '.applycode1', function () {
//    var applycode = $(this).attr("data-code");//申请单号

//    window.location.href = 'user_look_application.aspx' + "?applycode=" + applycode;
//});
$(document).on('click', '#url_application', function () {
    window.location.href = 'car_application.aspx';
});

//立即用车开始
$(document).on('click', '#show-use', function () {    //用车按钮
    var code = $(this).attr("data-use-applycode");
    var doctorSex = $("#star_num").text(); //获取单选按钮选中的值
    if (doctorSex == "请输入") {
        weui.alert("请输入当前车辆初始公里数，方可用车");
        return;
    }
    提交初始公里数('IIS3382', '/Proposer.aspx?action=Appli', {
        "applycode": code,
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
                weui.alert("已提交初始公里数，请前往用车！");
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
$(document).on('click', '#use_quxiao', function () { //取消用车操作
    $("#use_car").hide(); 
});
//立即用车结束



//还车开始
$(document).on('click', '#show-return', function () {    //还车按钮
    var code = $(this).attr("data-use-applycode");
    var 备注 = $("#remark_num").val();
    var doctorSex1 = $("#end_num").text(); //获取单选按钮选中的值
    if (doctorSex1 == "请输入") {
        weui.alert("请输入当前车辆还车公里数，方可还车");
        return;
    }
    提交还车公里数('IIS3382', '/Proposer.aspx?action=AppliReturn', {
        "applycode": code,
        "endplay": doctorSex1,
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
//立即还车结束


//筛选操作
$(document).on('click', '#select_info', function () {
    $(".itemAll_select").slideToggle(500);
});
$(document).on('click', '#sel > .weui-flex__item', function () {
    $(this).addClass("lei").siblings().removeClass("lei");

    if ($(this).hasClass('lei')) {
        var dome = $(this).text();
    };
    用户id = $("#usercode").val();    
    用户查询申请('IIS3382', '/Proposer.aspx?action=GetApply', {
        "usercode": 用户id,
        "dome": dome
    });
    
});



$(document).on('click', '.applycode', function () {
    var applycode = $(this).attr("data-code");//申请单号

    // window.location.href = 'admin_look_application.aspx' + "?applycode=" + applycode;
});












