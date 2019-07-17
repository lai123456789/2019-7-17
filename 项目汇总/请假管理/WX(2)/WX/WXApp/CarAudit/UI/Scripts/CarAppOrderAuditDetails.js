

$(function () {
    var 类型 = getQueryString('type');//暂时为了演示，通过URL的type参数来控制，之后的话通过接口直接返回类型
     var code = $('#usercode').val();
    
     switch (类型) {
        case "1":
            $('#operation_btn2').addClass('contor');
            break;
         case "2":
             $('#operation_btn3').addClass('contor');
             break;
    }
   var pcode = getQueryString('pcode');
      var code = $('#usercode').val();
    查询单号查询('IIS3382', '/Proposer.aspx?action=GetEndApply', {
        "applycode": pcode
    });

});

/*
点击驳回按钮时
*/
$(document).on('tap', '#operation_btn2 > .submit_btn2', function (e) {
    stopDefault(e);
    $('#undo_modal').addClass('contor');
    $('#mask300').addClass('contor');
});

/*
点击批准按钮时
*/
$(document).on('tap', '#operation_btn2 > .submit_btn1', function (e) {
    stopDefault(e);

    setTimeout(function () {
        $('#selectcar_dummy').click();
    }, 350)
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

//重新选车
/*
点击批准按钮时
*/
$(document).on('tap', '#operation_btn3 > .submit_btn', function (e) {
    stopDefault(e);

    setTimeout(function () {
        $('#selectcar1_dummy').click();
    }, 350)
    $('#approval_moda2').addClass('contor');
    $('#mask300').addClass('contor');
    查询车牌1('IIS3382', '/Proposer.aspx?action=GetGarage');
});


$(document).on('tap', '#operation_btn3 > .bottom > .btn_cancel', function (e) {
    stopDefault(e);
    $('#approval_moda2').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
});




/*
取消撤回按钮
*/
$(document).on('tap', '#approval_moda2 > .bottom > .btn_cancel', function (e) {
    stopDefault(e);
    $('#undo_modal').removeClass('contor');
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


$(document).on('tap', '#approval_moda2 > .label > .label_2', function () {

    $(this).addClass('contor');

    if ($(this).hasClass('contor')) {
        $('#approval_remark').val($('#approval_remark').val() + $(this).text() + " ");
    }
})

function isempty() {
    if ($('#approval_remark').val().length == 0) {
        $('#approval_moda2 > .label > .label_2').removeClass('contor');
        $('#approval_moda2 > .label > .label_1').removeClass('contor');
    }
}

$(document).on('tap', '#approval_moda2 > .label > .label_1', function () {

    $(this).addClass('contor');

    if ($(this).hasClass('contor')) {
        $('#approval_remark').val($('#approval_remark').val() + $(this).text() + " ");
    }
})





$(document).on('tap', '#approval_moda2 > .bottom > .btn_sure', function (e) {
    stopDefault(e);
    //alert('已批准用车')
    $('#approval_moda2').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
   
    var pcode = getQueryString('pcode');
    var 旧车牌 = $('#infodata > .rows7 > .right').text();
    var 车牌 = $('#selectcar1_dummy').val();
    var 备注 = $('#approval_remark1').val();
    var code = $('#usercode').val();
    提交车牌('IIS3382', '/Proposer.aspx?action=RegainCar', {
        "applycode": pcode,
        "platenumber": 车牌,
        "reremark": 备注,
        "Oldplatenumber": 旧车牌
    });
});



//applycode, platenumber, Oldplatenumber, reremark,








/*
确定撤回按钮
*/
$(document).on('tap', '#undo_modal > .bottom > .btn_sure', function (e) {
    stopDefault(e);
    /*
    这里处理撤回成功的Ajax
    */
   // alert('驳回成功')
    $('#undo_modal').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);

   
    var pcode = getQueryString('pcode');
    var 车牌 = $('#selectcar_dummy').val();
    var 备注 = $('#remark').val();
    var code = $('#usercode').val();
    驳回提交('IIS3382', '/Proposer.aspx?action=ApplyFalse', {
        "applycode": pcode,
        "reason": 备注,
        "susercode": code
    });
});



$(document).on('tap', '#approval_modal > .bottom > .btn_sure', function (e) {
    stopDefault(e);
    //alert('已批准用车')
    $('#approval_modal').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
 
    var pcode = getQueryString('pcode');
    var 车牌 = $('#selectcar_dummy').val();
    var 备注 = $('#approval_remark').val();
    var code = $('#usercode').val();
    提交('IIS3382', '/Proposer.aspx?action=Application', {
        "applycode": pcode,
        "platenumber": 车牌,
        "remark":备注,
        "susercode": code
    });
});


$(document).on('tap', '#selectcar', function () {

    $("#carnum").hide();
    var a = $(".dw-bf div:eq(0)").attr("data-val");
    if (a == "请选择车牌") {
        $(".dw-bf div:eq(0)").remove();
    }
})

$(document).on('tap', '#selectcar1', function () {

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
                        content += '<option  value="' + obj.platenumber + '">' + obj.platenumber + '</option>';
                    });//data-min="2019/05/28 16:30:00" value="'
                }
                $('#selectcar').append(content);

                
            }
            else {
                caution(data.errmsg);
            }
        }
    });
}

function 查询车牌1(urltype, pageurl) {
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
                        content += '<option  value="' + obj.platenumber + '">' + obj.platenumber + '</option>';
                    });//data-min="2019/05/28 16:30:00" value="'
                }
                $('#selectcar1').append(content);


            }
            else {
                caution(data.errmsg);
            }
        }
    });
}

//$(document).on('change', '#selectcar', function () {
//    var 预计还车时间 = $("#selectcar option:selected").attr('data-min');
//    alert(预计还车时间);
//    var 年 = GetDateFormat(预计还车时间, 'yyyy');
//    var 月 = GetDateFormat(预计还车时间, 'MM');
//    var 日 = GetDateFormat(预计还车时间, 'dd');
//    var 时 = GetDateFormat(预计还车时间, 'HH');
//    var 分 = GetDateFormat(预计还车时间, 'mm');
//    $('#enddate').mobiscroll().datetime({
//        theme: theme,
//        mode: mode,
//        display: display,
//        lang: lang,
//        dateFormat: "yyyy/mm/dd",
//        minDate: new Date(年, 月, 日, 时, 分),
//        maxDate: new Date(2030, 7, 30, 15, 44),
//        stepMinute: 1
//    });
//});


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
                //alert("提交申请成功！");
                //setTimeout(function () {
                //    location.href = "CarAppOrder.aspx";
                //}, 2000)
                success('提交申请成功', 'CarAppOrderAudit.aspx')
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}

function 提交车牌(urltype, pageurl, data) {
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
                success('提交申请成功', 'CarAppOrderAudit.aspx')
            }
            else {
                alert(data.errmsg);
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
                success('提交申请成功', 'CarAppOrderAudit.aspx')
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

                $.each(data.data, function (idx, obj) {

         //           $('#operation_btn2').addClass('contor');
         //           break;
         //case "2":
         //       $('#operation_btn3').addClass('contor');
         //       break;

                    if (obj.status == 0) {
                        类型 = 1;
                    }
                    if (obj.status == 1) {
                        类型 = 2;
                        $('#operation_btn2').removeClass('contor');
                    }
                    if (obj.status == 2) {
                        类型 = 3;
                        $('#operation_btn2').removeClass('contor');
                    }
                    if (obj.status == 6) {
                        类型 = 4;
                        $('#operation_btn2').removeClass('contor');
                       
                    }
                    if (obj.status == 4) {
                        类型 = 5;
                        $('#operation_btn2').removeClass('contor');
                       
                    }
                    if (obj.status == 5) {
                        类型 = 6;
                        $('#operation_btn2').removeClass('contor');
                        
                    }

                    if (obj.status == 3) {
                        类型 = 7;
                        $('#operation_btn2').removeClass('contor');
                       
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
                        content += '    <div class="rows6">';
                        content += '        <div class="left">还车时间：</div>';
                        content += '        <div class="right">' + obj.returntime + '</div>';
                        content += '    </div>';
                        //content += '    <div class="rows7">';
                        //content += '        <div class="left">车辆：</div>';
                        //content += '        <div class="right">' + obj.platenumber + '</div>';
                        //content += '    </div>';
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
                        content += '    <div class="rows6">';
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
                        content += '    <div class="rows6">';
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
                        if (obj.delayedtime != "") {
                            content += '    <div class="rows10">';
                            content += '        <div class="left">延时原因：</div>';
                            content += '        <div class="right">' + obj.delayedtime + '</div>';
                            content += '    </div>';
                        }
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
                        content += '    <div class="rows6">';
                        content += '        <div class="left">还车时间：</div>';
                        content += '        <div class="right">' + obj.returntime + '</div>';
                        content += '    </div>';
                        //content += '    <div class="rows7">';
                        //content += '        <div class="left">车辆：</div>';
                        //content += '        <div class="right">' + obj.platenumber + '</div>';
                        //content += '    </div>';
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
                        if (obj.delayedtime != "") {
                            content += '    <div class="rows10">';
                            content += '        <div class="left">延时原因：</div>';
                            content += '        <div class="right">' + obj.delayedtime + '</div>';
                            content += '    </div>';
                        }
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
                        content += '    <div class="rows6">';
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
                        if (obj.delayedtime != "") {
                            content += '    <div class="rows10">';
                            content += '        <div class="left">延时原因：</div>';
                            content += '        <div class="right">' + obj.delayedtime + '</div>';
                            content += '    </div>';
                        }

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
                        content += '    <div class="rows6">';
                        content += '        <div class="left">还车时间：</div>';
                        content += '        <div class="right">' + obj.returntime + '</div>';
                        content += '    </div>';
                        //content += '    <div class="rows7">';
                        //content += '        <div class="left">车辆：</div>';
                        //content += '        <div class="right">' + obj.platenumber + '</div>';
                        //content += '    </div>';
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
                        content += '        <div class="right" data-usercode="">' + obj.applyname + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows2">';
                        content += '        <div class="left">姓名：</div>';
                        content += '        <div class="right">' + obj.accent + '</div>';
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
                        content += '        <div class="left">撤销原因：</div>';
                        content += '        <div class="right">' + obj.repeal + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows8">';
                        content += '        <div class="left">审核状态：</div>';
                        content += '        <div class="right status1">已撤销</div>';
                        content += '    </div>';
                       
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


