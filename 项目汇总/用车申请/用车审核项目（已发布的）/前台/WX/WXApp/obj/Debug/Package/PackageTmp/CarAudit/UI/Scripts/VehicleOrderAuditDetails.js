$(function () {
    var 类型 = getQueryString('type');//暂时为了演示，通过URL的type参数来控制，之后的话通过接口直接返回类型
    var code = $('#usercode').val();

    switch (类型) {
        case "1":
            $('#operation_btn2').addClass('contor');

            break;
    }
    var pcode = getQueryString('pcode');
    var code = $('#usercode').val();
    查询单号查询('IIS3382', '/Proposer.aspx?action=GetEndApply', {
        "applycode": pcode
    });

});

$(function () {

    查询车牌('IIS3382', '/Proposer.aspx?action=GetGarage', {

    });
})

$(function () {

    查询司机('IIS3382', '/Proposer.aspx?action=GetDriver', {

    });
})

$(document).on('tap', '#approval_modal > .label > .label_2', function () {

    $(this).addClass('contor');

    if ($(this).hasClass('contor')) {
        $('#approval_remark').val($('#approval_remark').val() + $(this).text() + " ");
    }
})

function isempty() {
    if ($('#approval_remark').val().length == 0) {
        $('#approval_modal > .label > .label_2').removeClass('contor');
        $('#approval_modal > .label > .label_1').removeClass('contor');
    }
}

$(document).on('tap', '#approval_modal > .label > .label_1', function () {

    $(this).addClass('contor');

    if ($(this).hasClass('contor')) {
        $('#approval_remark').val($('#approval_remark').val() + $(this).text() + " ");
    }
})


/*
点击驳回按钮时
*/
$(document).on('tap', '#operation_btn2 > .submit_btn2', function (e) {
    stopDefault(e);
    $('#undo_moda2').addClass('contor');
    $('#mask300').addClass('contor');
});

/*
点击批准按钮时
*/
$(document).on('tap', '#operation_btn2 > .submit_btn1', function (e) {
    stopDefault(e);
    setTimeout(function () {
        $('#mater_dummy').click();
    }, 450);
    $('#approval_modal').addClass('contor');
    $('#mask300').addClass('contor');
    查询车牌('IIS3382', '/Proposer.aspx?action=GetGarage');

});


$(document).on('tap', '#operation_btn2 > .bottom > .btn_cancel', function (e) {
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

$(document).on('tap', '#approval_modal > .bottom > .btn_cancel', function (e) {
    stopDefault(e);
    $('#approval_modal').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
});



$(document).on('tap', '#approval_modal > .bottom > .btn_sure', function (e) {
    stopDefault(e);
    //alert('已批准用车')
    $('#approval_modal').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);

    var pcode = getQueryString('pcode');
    var 车牌 = $('#infodata > .rows7 > .right').text();
    var 车牌1 = $('#selectcar_dummy').val();
    var code = $('#usercode').val();
    var 备注 = $('#approval_remark').val();
    var code = $('#usercode').val();
    var 司机 = $('#mater').val();
    提交('IIS3382', '/Proposer.aspx?action=Approve', {
         "applycode": pcode,
        "platenumber": 车牌1,
        "driver":司机,
        "remark": 备注,
        "susercode": code
    });
});

/*
确定撤回按钮
*/
$(document).on('tap', '#undo_moda2 > .bottom > .btn_sure', function (e) {
    stopDefault(e);
    /*
    这里处理撤回成功的Ajax
    */
    // alert('驳回成功')
    $('#undo_moda2').removeClass('contor');
  
        $('#mask300').removeClass('contor');
  

    var pcode = getQueryString('pcode');
    var 车牌 = $('#selectcar_dummy').val();
    var 司机 = $('#mater_dummy').val();
    var 备注 = $('#remark2').val();
    var code = $('#usercode').val();
    驳回提交('IIS3382', '/Proposer.aspx?action=SendFalse', {
        "applycode": pcode,
        "reason": 备注,
        "susercode": code
    });
});





//$(document).on('tap', '#approval_modal > .bottom > .btn_sure', function (e) {
//    stopDefault(e);
//    //   alert('已批准用车')

//    $('#approval_modal').removeClass('contor');
//    setTimeout(function () {
//        $('#mask300').removeClass('contor');
//    }, 350);
//    //var 单号 = $(this).parents('.infolist').find('.left > .box1').text();
//    //$('#orderno').text(单号);
//    var pcode = getQueryString('pcode');
//    var 车牌 = $('#selectcar_dummy').val();
//    var 备注 = $('#approval_remark').val();
//    var code = $('#usercode').val();

//    提交('IIS3382', '/Proposer.aspx?action=Application', {
//        "applycode": 单号,
//        "platenumber": 车牌,
//        "reason": 备注,
//        "susercode": code
//    });
//});




$(document).on('tap', '#selectcar', function () {

    $("#carnum").hide();
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
                $('#selectcar').append(content);
            }
            else {
                caution(data.errmsg);
            }
        }
    });
}


$(document).on('tap', '#mater', function () {

    $("#carnum").hide();
    var a = $(".dw-bf div:eq(0)").attr("data-val");
    if (a == "请选择司机") {
        $(".dw-bf div:eq(0)").remove();
    }
})


function 查询司机(urltype, pageurl) {
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
                        content += '<option value="' + obj.usercode + '">' + obj.username + '</option>';
                    });
                }
                $('#mater').append(content);
            }
            else {
                caution(data.errmsg);
            }
        }
    });
}



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
            caution(data.errmsg);
        },
        success: function (data) {
            if (data.errcode == 0) {
                //alert("提交申请成功！");
                //setTimeout(function () {
                //    location.href = "CarAppOrder.aspx";
                //}, 2000)
                success('提交申请成功', 'VehicleOrderAudit.aspx')
            }
            else {
                caution(data.errmsg);
            }
        }
    });
}


function 驳回提交(urltype, pageurl, data) {
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
                //alert("提交申请成功！");
                //setTimeout(function () {
                //    location.href = "CarAppOrder.aspx";
                //}, 2000)
                success('提交申请成功', 'VehicleOrderAudit.aspx')
            }
            else {
                alert(data.errmsg);
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
                var 默认车牌 = '';
                $.each(data.data, function (idx, obj) {
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
                        content += '        <div class="left">车辆：</div>';
                        //content += '     <div class="left">选择车辆：</div>';
                        content += '      <div class="top_title">';
                        content += '          <div class="right">';
                        content += '              <select id="selectcar">';
                        默认车牌 = obj.platenumber;
                        content += '              </select>';
                        content += '          </div>';
                        content += '      </div>';
                        content += '      </div>';
                        content += '    <div class="rows8">';
                        content += '        <div class="left">审核状态：</div>';
                        content += '        <div class="right status1">未审批</div>';
                        content += '    </div>';
                        //content += '<div id="approval_modal">';
                        //content += '    <div class="top_title">';
                        //content += '        <div class="left">选择车辆：</div>';
                        //content += '        <div class="right">';
                        //content += '            <select id="selectcar">';
                        //content += '                <option value="' + obj.platenumber + '">' + obj.platenumber + '</option>';
                        //content += '               <%-- <option value="粤S8WN87">粤S8WN87</option>';
                        //content += '                <option value="粤S8WN88">粤S8WN88</option>--%>';
                        //content += '            </select>';
                        //content += '        </div>';
                        //content += '    </div>';
                        content += '';
                        content += '';
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
                        content += '        <div class="left">车辆：</div>';
                        content += '        <div class="right">' + obj.platenumber + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows8">';
                        content += '        <div class="left">审核状态：</div>';
                        content += '        <div class="right status1">已批车</div>';
                        content += '    </div>';
                        content += '    <div class="rows9">';
                        content += '        <div class="left">派送司机：</div>';
                        content += '        <div class="right">' + obj.drivernames + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">备注：</div>';
                        content += '        <div class="right">' + obj.remark + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">审批人：</div>';
                        content += '        <div class="right">' + obj.susername + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">司机电话：</div>';
                        content += '        <div class="right">' + obj.phone + '</div>';
                        content += '    </div>';
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
                        content += '        <div class="left">车辆：</div>';
                        content += '        <div class="right">' + obj.platenumber + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows8">';
                        content += '        <div class="left">审核状态：</div>';
                        content += '        <div class="right status1">使用中</div>';
                        content += '    </div>';
                        content += '    <div class="rows9">';
                        content += '        <div class="left">派送司机：</div>';
                        content += '        <div class="right">' + obj.drivernames + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">备注：</div>';
                        content += '        <div class="right">' + obj.remark + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">审批人：</div>';
                        content += '        <div class="right">' + obj.susername + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">司机电话：</div>';
                        content += '        <div class="right">' + obj.phone + '</div>';
                        content += '    </div>';
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
                        content += '        <div class="left">车辆：</div>';
                        content += '        <div class="right">' + obj.platenumber + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows8">';
                        content += '        <div class="left">审核状态：</div>';
                        content += '        <div class="right status1">已还车</div>';
                        content += '    </div>';
                        content += '    <div class="rows9">';
                        content += '        <div class="left">派送司机：</div>';
                        content += '        <div class="right">' + obj.drivernames + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">备注：</div>';
                        content += '        <div class="right">' + obj.remark + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">还车备注：</div>';
                        content += '        <div class="right">' + obj.returnremark + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">审批人：</div>';
                        content += '        <div class="right">' + obj.susername + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">司机电话：</div>';
                        content += '        <div class="right">' + obj.phone + '</div>';
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
                        content += '        <div class="left">车辆：</div>';
                        content += '        <div class="right">' + obj.platenumber + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows8">';
                        content += '        <div class="left">审核状态：</div>';
                        content += '        <div class="right status1">已撤销</div>';
                        content += '    </div>';

                    }


                });

                $('#infodata').empty();

                $('#infodata').append(content);

                $('#selectcar').val(默认车牌);
                //$("#selectcar").find("option[text='" + 默认车牌 + "']").attr("selected", true);
                
                $('#selectcar').mobiscroll().select({
                    theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
                    mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
                    display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
                    lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
                    label: '选择车辆'
                });
                $('#selectcar_dummy').val(默认车牌);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}
