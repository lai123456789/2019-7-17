$(function ()
{
   // var 类型 = getQueryString('type');//暂时为了演示，通过URL的type参数来控制，之后的话通过接口直接返回类型
    var pcode = getQueryString('pcode');
    var 类型 = getQueryString('type');//暂时为了演示，通过URL的type参数来控制，之后的话通过接口直接返回类型
    switch (类型) {
        case "1":
            $('#operation_btn1').addClass('contor');
            break;
        case "2":
            $('#operation_btn2').addClass('contor');
            break;
        case "3":
            $('#operation_btn3').addClass('contor');
            break;
        case "4":
            $('#operation_btn4').addClass('contor');
            break;
        case "5":
            $('#operation_btn5').addClass('contor');
            break;
        case "6":
            $('#operation_btn6').addClass('contor');
            break;
        case "7":
            $('#operation_btn7').addClass('contor');
            break;
    }

    var code = $('#usercode').val();
    查询单号查询('IIS3382', '/Proposer.aspx?action=GetEndApply', {
        "applycode": pcode,
        "usercode":code
    });
});


/*
点击用车按钮时
*/
$(document).on('tap', '#operation_btn2 > .submit_btn1', function (e) {
    stopDefault(e);
    $('#undo_modal').addClass('contor');
    $('#mask300').addClass('contor');
 

});


$(document).on('tap', '#undo_modal > .bottom > .btn_sure1', function () {
    var 撤销单号 = getQueryString('pcode');
  //  var 公里数 = $('#remark').text();
    var 公里数 = $('#remark').val();

    //这里调用Ajax方法
    提交用车公里('IIS3382', '/Proposer.aspx?action=Appli', {
        "applycode": 撤销单号,
        "begin": 公里数,
    });
});



/*
马上还车按钮时
*/
$(document).on('tap', '#operation_btn3 > .submit_btn', function (e) {
    stopDefault(e);
    $('#undo_moda2').addClass('contor');
    $('#mask300').addClass('contor');


});

$(document).on('tap', '#undo_moda2 > .bottom > .btn_sure', function () {
    var 撤销单号 = getQueryString('pcode');
    //  var 公里数 = $('#remark').text();
    var 公里数 = $('#remark1').val();

    //这里调用Ajax方法
    提交还车公里('IIS3382', '/Proposer.aspx?action=AppliReturn', {
        "applycode": 撤销单号,
        "endplay": 公里数,
    });
});


/*
取消撤回按钮
*/
$(document).on('tap', '#undo_modal > .bottom > .btn_cancel', function (e) {
    stopDefault(e);
    $('#undo_modal').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
});

$(document).on('tap', '#approval_modal > .bottom > .btn_cancel', function (e) {
    stopDefault(e);
    $('#approval_modal').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
});

/*
取消撤回按钮
*/
$(document).on('tap', '#undo_moda2 > .bottom > .btn_cancel', function (e) {
    stopDefault(e);
    $('#undo_moda2').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
});

$(document).on('tap', '#approval_moda2 > .bottom > .btn_cancel', function (e) {
    stopDefault(e);
    $('#approval_moda2').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
});



/*
撤销
*/
$(document).on('tap', '#operation_btn1 > .submit_btn', function (e) {
    stopDefault(e);
    $('#undo_moda3').addClass('contor');
    $('#mask300').addClass('contor');


});

$(document).on('tap', '#undo_moda3 > .bottom > .btn_sure', function () {
    var 撤销单号 = getQueryString('pcode');
    var 原因 = $('#remark2').val();


    //这里调用Ajax方法
    提交('IIS3382', '/Proposer.aspx?action=ApplyRepeal', {
        "applycode": 撤销单号,
        "repeal": 原因,
    });
});



/*
取消撤回按钮
*/
$(document).on('tap', '#undo_moda3 > .bottom > .btn_cancel', function (e) {
    stopDefault(e);
    $('#undo_moda3').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
});




///*
////点击申请用车按钮时
////*/
//$(document).on('tap', '#operation_btn1 > .submit_btn', function () {



//    var 撤销单号 = getQueryString('pcode');
//    var 原因 = $('#infodata > .rows1 > .right').text();


//    //这里调用Ajax方法
//    提交('IIS3382', '/Proposer.aspx?action=ApplyRepeal', {
//        "applycode": 撤销单号,
//        "repeal": 原因,
//    });
//});


/*
//点击申请用车按钮时
//*/
$(document).on('tap', '#operation_btn2 > .submit_btn2', function () {
    $('#undo_moda3').addClass('contor');
    $('#mask300').addClass('contor');


});

$(document).on('tap', '#undo_moda3 > .bottom > .btn_sure', function () {
    var 撤销单号 = getQueryString('pcode');
    var 原因 = $('#remark2').val();


    //这里调用Ajax方法
    提交('IIS3382', '/Proposer.aspx?action=ApplyRepeal', {
        "applycode": 撤销单号,
        "repeal": 原因,
    });
});






//重新申请
$(document).on('tap', '#operation_btn4 > .submit_btn', function () {

    location.href = 'CarApplication.aspx';
});


$(document).on('tap', '#operation_btn5 > .submit_btn', function () {

    location.href = 'CarApplication.aspx';

});

$(document).on('tap', '#operation_btn6 > .submit_btn', function () {

    location.href = 'CarApplication.aspx';


});

$(document).on('tap', '#operation_btn7 > .submit_btn', function () {

    location.href = 'CarApplication.aspx';

    
});


function checkNumber(theObj) {
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(theObj)) {
        return true;
    }
    return false;
}

$(document).on('input', '#remark1', function () {
    if (!checkNumber($(this).val())) {
        $(this).val('');
    }
});


function checkNumber1(theObj1) {
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(theObj1)) {
        return true;
    }
    return false;
}

$(document).on('input', '#remark', function () {
    if (!checkNumber1($(this).val())) {
        $(this).val('');
    }
});


function 提交(urltype, pageurl, data) {
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
                success('提交申请成功', 'CarAppOrder.aspx')
                //alert("提交申请成功！");
                //setTimeout(function () {
                //    location.href = "VehicleOrder.aspx";
                //}, 1000)
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}


function 提交用车公里(urltype, pageurl, data) {
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
            caution(data.errmsg);
        },
        success: function (data) {
            if (data.errcode == 0) {
                success('提交申请成功', 'CarAppOrder.aspx')
                //alert("提交申请成功！");
                //setTimeout(function () {
                //    location.href = "VehicleOrder.aspx";
                //}, 1000)
            }
            else {
                caution(data.errmsg);
            }
        }
    });
}

function 提交还车公里(urltype, pageurl, data) {
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
            caution(data.errmsg);
        },
        success: function (data) {
            if (data.errcode == 0) {
                success('提交申请成功', 'CarAppOrder.aspx')
                //alert("提交申请成功！");
                //setTimeout(function () {
                //    location.href = "VehicleOrder.aspx";
                //}, 1000)
            }
            else {
                caution(data.errmsg);
            }
        }
    });
}


function 查询单号查询(urltype, pageurl, data, page) {
    //if (page == null) {
    //    page = 1;
    //}
    //if (page > 最大页数) {
    //    return;
    //}
    //showLoading();
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
            hideLoading();
            if (data.errcode == 0) {
                var content = '';
                var 类型 = getQueryString('type');

                $.each(data.data, function (idx, obj) {



                    if (obj.status == 0) {
                        类型 = 1;
                    }
                    if (obj.status == 1) {
                        类型 = 2;
                        $('#operation_btn1').removeClass('contor');
                    }
                    if (obj.status == 2) {
                        类型 = 3;
                        $('#operation_btn1').removeClass('contor');
                        $('#operation_btn2').removeClass('contor');
                    }
                    if (obj.status == 6) {
                        类型 = 4;
                        $('#operation_btn1').removeClass('contor');
                        $('#operation_btn2').removeClass('contor');
                        $('#operation_btn3').removeClass('contor');
                    }
                    if (obj.status == 4) {
                        类型 = 5;
                        $('#operation_btn1').removeClass('contor');
                        $('#operation_btn2').removeClass('contor');
                        $('#operation_btn3').removeClass('contor');
                        $('#operation_btn4').removeClass('contor');
                    }
                    if (obj.status == 5) {
                        类型 = 6;
                         $('#operation_btn1').removeClass('contor');
                        $('#operation_btn2').removeClass('contor');
                        $('#operation_btn3').removeClass('contor');
                        $('#operation_btn4').removeClass('contor');
                        $('#operation_btn5').removeClass('contor');
                    }
                    if (obj.status == 3) {
                        类型 = 7;
                        $('#operation_btn1').removeClass('contor');
                        $('#operation_btn2').removeClass('contor');
                        $('#operation_btn3').removeClass('contor');
                        $('#operation_btn4').removeClass('contor');
                        $('#operation_btn5').removeClass('contor');
                    }



                    if (类型 == 1) {
                        content += '    <div class="rows1">';
                        content += '        <div class="left">工号：</div>';
                        content += '        <div class="right" data-usercode="">' + obj.accent + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows2">';
                        content += '        <div class="left">姓名：</div>';
                        content += '        <div class="right">' + obj.applyname + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows3">';
                        content += '        <div class="left">部门：</div>';
                        content += '        <div class="right">' + obj.department + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows4">';
                        content += '        <div class="left">目的地：</div>';
                        content += '        <div class="right">' + obj.endsite + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows5">';
                        content += '        <div class="left">用途：</div>';
                        content += '        <div class="right">' + obj.purpose + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows6">';
                        content += '        <div class="left">用车时间：</div>';
                        content += '        <div class="right">' + obj.servicetime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows7">';
                        content += '        <div class="left">还车时间：</div>';
                        content += '        <div class="right">' + obj.returntime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows8">';
                        content += '        <div class="left">审核状态：</div>';
                        content += '        <div class="right status1">未审批</div>';
                        content += '    </div>';
                        //content += '    <div class="rows9">';
                        //content += '        <div class="left">派送司机：</div>';
                        //content += '        <div class="right">' + obj.driverusercode + '</div>';
                        //content += '    </div>';
                        //content += '    <div class="rows10">';
                        //content += '        <div class="left">备注：</div>';
                        //content += '        <div class="right">' + obj.remark + '</div>';
                        //content += '    </div>';
                    }

                    if (类型 == 2) {
                        content += '    <div class="rows1">';
                        content += '        <div class="left">工号：</div>';
                        content += '        <div class="right" data-usercode="">' + obj.accent + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows2">';
                        content += '        <div class="left">姓名：</div>';
                        content += '        <div class="right">' + obj.applyname + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows3">';
                        content += '        <div class="left">部门：</div>';
                        content += '        <div class="right">' + obj.department + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows4">';
                        content += '        <div class="left">目的地：</div>';
                        content += '        <div class="right">' + obj.endsite + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows5">';
                        content += '        <div class="left">用途：</div>';
                        content += '        <div class="right">' + obj.purpose + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows6">';
                        content += '        <div class="left">用车时间：</div>';
                        content += '        <div class="right">' + obj.servicetime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows7">';
                        content += '        <div class="left">还车时间：</div>';
                        content += '        <div class="right">' + obj.returntime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows7">';
                        content += '        <div class="left">车辆：</div>';
                        content += '        <div class="right">' + obj.platenumber + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows8">';
                        content += '        <div class="left">审核状态：</div>';
                        content += '        <div class="right status1">已批车</div>';
                        content += '    </div>';
                        //content += '    <div class="rows9">';
                        //content += '        <div class="left">派送司机：</div>';
                        //content += '        <div class="right">' + obj.drivernames + '</div>';
                        //content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">备注：</div>';
                        content += '        <div class="right">' + obj.remark + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">审批人：</div>';
                        content += '        <div class="right">' + obj.susername + '</div>';
                        content += '    </div>';
                        //content += '    <div class="rows10">';
                        //content += '        <div class="left">司机电话：</div>';
                        //content += '        <div class="right">' + obj.phone + '</div>';
                        //content += '    </div>';
                    }
                    if (类型 == 3) {
                        content += '    <div class="rows1">';
                        content += '        <div class="left">工号：</div>';
                        content += '        <div class="right" data-usercode="">' + obj.accent + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows2">';
                        content += '        <div class="left">姓名：</div>';
                        content += '        <div class="right">' + obj.applyname + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows3">';
                        content += '        <div class="left">部门：</div>';
                        content += '        <div class="right">' + obj.department + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows4">';
                        content += '        <div class="left">目的地：</div>';
                        content += '        <div class="right">' + obj.endsite + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows5">';
                        content += '        <div class="left">用途：</div>';
                        content += '        <div class="right">' + obj.purpose + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows6">';
                        content += '        <div class="left">用车时间：</div>';
                        content += '        <div class="right">' + obj.servicetime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows7">';
                        content += '        <div class="left">还车时间：</div>';
                        content += '        <div class="right">' + obj.returntime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows7">';
                        content += '        <div class="left">车辆：</div>';
                        content += '        <div class="right">' + obj.platenumber + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows8">';
                        content += '        <div class="left">审核状态：</div>';
                        content += '        <div class="right status1">使用中</div>';
                        content += '    </div>';
                        //content += '    <div class="rows9">';
                        //content += '        <div class="left">派送司机：</div>';
                        //content += '        <div class="right">' + obj.drivernames + '</div>';
                        //content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">备注：</div>';
                        content += '        <div class="right">' + obj.remark + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">审批人：</div>';
                        content += '        <div class="right">' + obj.susername + '</div>';
                        content += '    </div>';
                        //content += '    <div class="rows10">';
                        //content += '        <div class="left">司机电话：</div>';
                        //content += '        <div class="right">' + obj.phone + '</div>';
                        //content += '    </div>';
                    }

                    if (类型 == 4) {
                        content += '    <div class="rows1">';
                        content += '        <div class="left">工号：</div>';
                        content += '        <div class="right" data-usercode="">' + obj.accent + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows2">';
                        content += '        <div class="left">姓名：</div>';
                        content += '        <div class="right">' + obj.applyname + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows3">';
                        content += '        <div class="left">部门：</div>';
                        content += '        <div class="right">' + obj.department + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows4">';
                        content += '        <div class="left">目的地：</div>';
                        content += '        <div class="right">' + obj.endsite + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows5">';
                        content += '        <div class="left">用途：</div>';
                        content += '        <div class="right">' + obj.purpose + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows6">';
                        content += '        <div class="left">用车时间：</div>';
                        content += '        <div class="right">' + obj.servicetime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows7">';
                        content += '        <div class="left">还车时间：</div>';
                        content += '        <div class="right">' + obj.returntime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows7">';
                        content += '        <div class="left">车辆：</div>';
                        content += '        <div class="right">' + obj.platenumber + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows8">';
                        content += '        <div class="left">审核状态：</div>';
                        content += '        <div class="right status1">不通过</div>';
                        content += '    </div>';
                        content += '    <div class="rows9">';
                        content += '        <div class="left">驳回原因：</div>';
                        content += '        <div class="right">' + obj.reason + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">审批人：</div>';
                        content += '        <div class="right">' + obj.susername + '</div>';
                        content += '    </div>';
                    }
                    if (类型 == 5) {
                        content += '    <div class="rows1">';
                        content += '        <div class="left">工号：</div>';
                        content += '        <div class="right" data-usercode="">' + obj.accent + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows2">';
                        content += '        <div class="left">姓名：</div>';
                        content += '        <div class="right">' + obj.applyname + '</div>';
                        content += '    </div>';
                        //content += '    <div class="rows3">';
                        //content += '        <div class="left">部门：</div>';
                        //content += '        <div class="right">' + obj.department + '</div>';
                        //content += '    </div>';
                        content += '    <div class="rows4">';
                        content += '        <div class="left">目的地：</div>';
                        content += '        <div class="right">' + obj.endsite + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows5">';
                        content += '        <div class="left">用途：</div>';
                        content += '        <div class="right">' + obj.purpose + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows6">';
                        content += '        <div class="left">用车时间：</div>';
                        content += '        <div class="right">' + obj.servicetime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows7">';
                        content += '        <div class="left">还车时间：</div>';
                        content += '        <div class="right">' + obj.returntime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows7">';
                        content += '        <div class="left">车辆：</div>';
                        content += '        <div class="right">' + obj.platenumber + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows8">';
                        content += '        <div class="left">审核状态：</div>';
                        content += '        <div class="right status1">已还车</div>';
                        content += '    </div>';
                        //content += '    <div class="rows9">';
                        //content += '        <div class="left">派送司机：</div>';
                        //content += '        <div class="right">' + obj.drivernames + '</div>';
                        //content += '    </div>';
                        content += '    <div class="rows9">';
                        content += '        <div class="left">备注：</div>';
                        content += '        <div class="right">' + obj.remark + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows9">';
                        content += '        <div class="left">审批人：</div>';
                        content += '        <div class="right">' + obj.susername + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows9">';
                        content += '        <div class="left">初始公里：</div>';
                        content += '        <div class="right">' + obj.begin + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">还车公里：</div>';
                        content += '        <div class="right">' + obj.endplay + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">行驶时长：</div>';
                        content += '        <div class="right">' + obj.playtime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">行驶公里：</div>';
                        content += '        <div class="right">' + obj.playkm + '</div>';
                        content += '    </div>';
               
                   

                    }
                    if (类型 == 6) {
                        content += '    <div class="rows1">';
                        content += '        <div class="left">工号：</div>';
                        content += '        <div class="right" data-usercode="">' + obj.accent + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows2">';
                        content += '        <div class="left">姓名：</div>';
                        content += '        <div class="right">' + obj.applyname + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows3">';
                        content += '        <div class="left">部门：</div>';
                        content += '        <div class="right">' + obj.department + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows4">';
                        content += '        <div class="left">目的地：</div>';
                        content += '        <div class="right">' + obj.endsite + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows5">';
                        content += '        <div class="left">用途：</div>';
                        content += '        <div class="right">' + obj.purpose + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows6">';
                        content += '        <div class="left">用车时间：</div>';
                        content += '        <div class="right">' + obj.servicetime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows7">';
                        content += '        <div class="left">还车时间：</div>';
                        content += '        <div class="right">' + obj.returntime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows7">';
                        content += '        <div class="left">车辆：</div>';
                        content += '        <div class="right">' + obj.platenumber + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows8">';
                        content += '        <div class="left">审核状态：</div>';
                        content += '        <div class="right status1">已超时</div>';
                        content += '    </div>';
                        //content += '    <div class="rows9">';
                        //content += '        <div class="left">派送司机：</div>';
                        //content += '        <div class="right">' + obj.driverusercode + '</div>';
                        //content += '    </div>';
                        //content += '    <div class="rows10">';
                        //content += '        <div class="left">备注：</div>';
                        //content += '        <div class="right">' + obj.remark + '</div>';
                        //content += '    </div>';
                    }

                    if (类型 == 7) {
                        content += '    <div class="rows1">';
                        content += '        <div class="left">工号：</div>';
                        content += '        <div class="right" data-usercode="">' + obj.accent + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows2">';
                        content += '        <div class="left">姓名：</div>';
                        content += '        <div class="right">' + obj.applyname + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows3">';
                        content += '        <div class="left">部门：</div>';
                        content += '        <div class="right">' + obj.department + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows4">';
                        content += '        <div class="left">目的地：</div>';
                        content += '        <div class="right">' + obj.endsite + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows5">';
                        content += '        <div class="left">用途：</div>';
                        content += '        <div class="right">' + obj.purpose + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows6">';
                        content += '        <div class="left">用车时间：</div>';
                        content += '        <div class="right">' + obj.servicetime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows7">';
                        content += '        <div class="left">还车时间：</div>';
                        content += '        <div class="right">' + obj.returntime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows7">';
                        content += '        <div class="left">车辆：</div>';
                        content += '        <div class="right">' + obj.platenumber + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows8">';
                        content += '        <div class="left">审核状态：</div>';
                        content += '        <div class="right status1">已撤销</div>';
                        content += '    </div>';
                        //content += '    <div class="rows9">';
                        //content += '        <div class="left">派送司机：</div>';
                        //content += '        <div class="right">' + obj.driverusercode + '</div>';
                        //content += '    </div>';
                        //content += '    <div class="rows10">';
                        //content += '        <div class="left">备注：</div>';
                        //content += '        <div class="right">' + obj.remark + '</div>';
                        //content += '    </div>';
                    }


                });

                $('#infodata').empty();

                $('#infodata').append(content);



            }
            else {
                alert(data.errmsg)
            }
        }
    });
}










