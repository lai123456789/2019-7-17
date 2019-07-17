///*
//点击申请用车按钮时
//*/
//$(document).on('tap', '#operation_btn > .submit_btn', function () {
//    var 用户代码 = $('#infodata > .rows1 > .right').attr('data-usercode');
//    var 工号 = $('#infodata > .rows1 > .right').text();
//    var 名称 = $('#infodata > .rows2 > .right').text();
//    var 部门 = $('#infodata > .rows3 > .right').text();
//    var 目的地 = $('#infodata > .rows4 > .right input').val();
//    var 用途 = $('#infodata > .rows5 > .right input').val();
//    var 用户时间 = $('#infodata > .rows6 > .right input').val();
//    var 选择车辆 = $('#selectcarno').val();
//    if (目的地 == null || 目的地 == "") {
//        alert('请输入目的地');
//        return;
//    }
//    if (用户时间 == null || 用户时间 == "") {
//        alert('请选择用车时间');
//        return;
//    }
//    if (选择车辆 == null || 选择车辆 == "") {
//        alert('请选择车辆');
//        return;
//    }

//    //这里调用Ajax方法
//});


$(function (e) {
    stopDefault(e);

   
    查询车牌('IIS3382', '/Proposer.aspx?action=GetGarage', {
       

    });

})






//$(document).on('tap', '#infodata > .rows7 > .right input', function (e) {
//    stopDefault(e);

//    var 用户时间 = $('#infodata > .rows6 > .right input').val();
    
//    查询车牌('IIS3382', '/Proposer.aspx?action=GetCar', {
//        "returntime": 用户时间

//    });
//});


$(function (e) {
    stopDefault(e);
    var code = $('#usercode').val();
    //var 用户时间 = $('#stardate').val();
    //查询车牌('IIS3382', '/Proposer.aspx?action=GetCar'; {

    //}）;

    用户查询申请('IIS3382', '/Proposer.aspx?action=GetUsercode', {
        "usercode": code
    });
})




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
                var 工号 = data.data[0].account;
                var 用户名 = data.data[0].username;
                var 部门 = data.data[0].departmentname;

                $('#mt_account').text(工号);
                $('#mt_department').text(部门);
                $('#mt_usercode').text(用户名);
            }
            else {
                caution(data.errmsg);
            }
        }
    });
}



/*
点击申请用车按钮时
*/
$(document).on('tap', '#operation_btn > .submit_btn', function (e) {
    stopDefault(e);
    var 用户代码 = $('#usercode').val();
    var 工号 = $('#infodata > .rows1 > .right').text();
    var 名称 = $('#infodata > .rows2 > .right').text();
    var 部门 = $('#infodata > .rows3 > .right').text();
    var 目的地 = $('#now1').val();
    var 用途 = $('#now2').val();
    var 用户时间 = $('#stardate').val();
    var 选择车辆 = $('#selectcarno').val();
    if (目的地 == null || 目的地 == "") {
        alert('请输入目的地');
        return;
    }
    if (用户时间 == null || 用户时间 == "") {
        alert('请选择用车时间');
        return;
    }
   


    //if (选择车辆 == null || 选择车辆 == "") {
    //            alert('请选择车辆');
    //            return;
    //        }

    //这里调用Ajax方法
    提交('IIS3382', '/Proposer.aspx?action=SendCar', {
        "usercode": 用户代码,
        "accent": 工号,
        "applyname": 名称,
        "department": 部门,
        "endsite": 目的地,
        "purpose": 用途,
        "servicetime": 用户时间,
        "proposernomber": 选择车辆

    });

});





//$(function (e) {
//    stopDefault(e);

//    var 用户时间 = $('#stardate').val();
//    查询车牌('IIS3382', '/Proposer.aspx?action=GetCar', {
//        "returntime": 用户时间

//    });

//})




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
                success('提交申请成功', 'VehicleOrder.aspx')
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


$(document).on('tap', '#approval_modal > .label > .label_2', function () {

    $(this).addClass('contor');

    if ($(this).hasClass('contor')) {
        $('#approval_remark').val($('#approval_remark').val() + $(this).text() + " ");
    }

})

$(document).on('tap', '#approval_modal > .label > .label_1', function () {

    $(this).addClass('contor');

    if ($(this).hasClass('contor')) {
        $('#approval_remark').val($('#approval_remark').val() + $(this).text()+ " ");
    }

})

$(document).on('tap', '#selectcarno', function () {
   
    $("#carnum").hide();
    var a = $(".dw-bf div:eq(0)").attr("data-val");
    //if (a == "请选择车牌") {
    //    $(".dw-bf div:eq(0)").remove();
    //}
})
function 查询车牌(urltype, pageurl, data) {
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
                    $.each(data.data, function (idx, obj) {

                        content += '<option  value="' + obj.platenumber + '">' + obj.platenumber + '</option>';

                    });
                    $('#selectcarno').empty().append(content);//.empty()
                }
                
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}



//$(document).on('change', '#selectcarno', function () {
//    var 预计还车时间 = $("#selectcarno option:selected").attr('data-min');
//    alert(预计还车时间);
//    var 年 = GetDateFormat(预计还车时间, 'yyyy');
//    var 月 = GetDateFormat(预计还车时间, 'MM');
//    var 日 = GetDateFormat(预计还车时间, 'dd');
//    var 时 = GetDateFormat(预计还车时间, 'HH');
//    var 分 = GetDateFormat(预计还车时间, 'mm');
//    $('#stardate').mobiscroll().datetime({
//        dateFormat: 'yy/mm/dd',
//        theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
//        mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
//        display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
//        minDate: new Date(年, 月, 日, 时, 分),
//        maxDate: new Date(2030, 7, 30, 15, 44),
//        showNow: true,
//        lang: lang        // Specify language like: lang: 'pl' or omit setting to use default

//    });
//});