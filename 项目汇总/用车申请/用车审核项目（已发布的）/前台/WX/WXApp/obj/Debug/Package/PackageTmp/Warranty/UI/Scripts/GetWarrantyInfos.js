var deal = '';
$(function () {

    var salescode = $('#salescode').val();

    var pj = getQueryString("dcode");

    if (pj != null && pj != '') {

        GetPageList(pj);

    } else {
        GetPageList($('#salescode').val());
    }
    请求下单图片('IIS3380', '/SalesManage.aspx?action=GetImg', salescode);
    请求处理图片('IIS3380', '/SalesManage.aspx?action=GetdealImg', salescode);
});

function GetPageList(dataarr) {

    查看明细('IIS3380', '/SalesManage.aspx?action=GetSalesServiceInfo', dataarr, function () {

    });
}

//点击图片
$(document).on('tap', '#pagethree > .content > .row10 > .box2 > .img', function (e) {
    stopDefault(e);
    var src = $(this).find('img').attr('src');
    $('#pagetwo > .img > img').attr('src', src.substring(0, src.indexOf(".")) + '_big.png');
    $.mobile.changePage("#pagetwo");
});

//点击图片
$(document).on('tap', '#pagethree > .content > .row9 > .box2 > .img', function (e) {
    stopDefault(e);
    var src = $(this).find('img').attr('src');
    $('#pagetwo > .img > img').attr('src', src.substring(0, src.indexOf(".")) + '_big.png');
    $.mobile.changePage("#pagetwo");
});

//展示图片页点击后退
$(document).on('tap', '#pagetwo > .bottom_footer > .resultbtn > .box1.contor', function (e) {
    stopDefault(e);
    history.go(-1);
});

$(document).on('tap', '#pagethree > .bottom_footer > .right > .box1.contor', function (e) {
    stopDefault(e);
    //var salescode = $('#salescode').val();
    var salescode = getQueryString("dcode");
    $('#salescode1').val(salescode);
    $('#form_design').submit();
});

$(document).on('tap', '#pagethree > .bottom_footer > .left > .box1.contor', function (e) {
    stopDefault(e);
    //var salescode = $('#salescode').val();
    var salescode = getQueryString("dcode");
    var usercode = $('#usercode').val()
    var username = $('#username').val()
    if ($('#pagethree > .bottom_footer > .left > .box1.contor').text() == "处理故障") {
        处理故障('IIS3380', '/SalesManage.aspx?action=updateSalesDealing', {
            "salescode": salescode,
            "usercode": usercode,
            "dealing": username
        });
    } else if ($('#pagethree > .bottom_footer > .left > .box1.contor').text() == "解决故障") {
        if (usercode == deal) {
            解除故障('IIS3380', '/SalesManage.aspx?action=updateSalesRemovedate', salescode);
        } else {
            alert("您不是处理人,只有处理人才能解除故障");
        }
    } else if ($('#pagethree > .bottom_footer > .left > .box1.contor').text() == "确认编辑") {
        var questionkey = $("#gratetype option:selected").val();
        var questionvalue = $("#gratetype option:selected").text();
        var equipment = $("#pagethree > .content > .row1 > .box2 input").val();
        var devicename = $("#pagethree > .content > .row2 > .box2 input").val();
        var factory = $("#pagethree > .content > .row3 > .box2 input").val();


        var question = $("#gratetype_dummy").val();
        var parts = $("#pagethree > .content > .row5 > .box2 textarea").val();
        var fault = $("#pagethree > .content > .row6 > .box2 textarea").val();

        var treatment = $("#pagethree > .content > .row7 > .box2 textarea").val();

        var breakdowndate = $("#pagethree > .content > .row8 > .box2 input").val();
        var username = $("#username").val();
        var usercode = $("#usercode").val();

        var 明细 = new Array();
        var obj = $('#personnelmodul > .mid > .rowslist');
        for (var i = 0; i < obj.length; i++) {
            var 用户代码 = $(obj[i]).attr("data-usercode");
            var data = { "用户代码": 用户代码 };
            明细.push(data);
        }

        var 图片 = new Array();

        var datas = new Array();

        var data11 = {
            "questionkey": questionkey, "questionvalue": questionvalue, "equipment": equipment, "devicename": devicename, "factory": factory,
            "question": question, "parts": parts, "fault": fault, "treatment": treatment,
            "breakdowndate": breakdowndate, "SpecifyUsers": 明细, "dealing": username, "salescode": salescode, "base64": 图片
        };

        datas.push(data11);

        var data = { "usercode": usercode, "info": data11 }
        更新售后保修数据('IIS3380', '/SalesManage.aspx?action=updateNewSales', data);
    } else if ($('#pagethree > .bottom_footer > .left > .box1.contor').text() == "故障已解决") {
        alert("故障已经解决");
    }
});




//屏幕旋转
window.addEventListener('resize', function () {
    setTimeout(function () {
    }, 300)
});

/*
恢复物料齐套数据
*/
function 查看明细(urltype, pageurl, data, func) {
    showLoading();
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
        },
        success: function (data) {
            hideLoading();
            var content = '';
            if (data.errcode == 0) {
                var list = data.data;
                $.each(list, function (idx, obj) {

                    $("#pagethree > .content > .row1 > .box2 input").val(obj.equipment);
                    $("#pagethree > .content > .row2 > .box2 input").val(obj.devicename);
                    $("#pagethree > .content > .row3 > .box2 input").val(obj.factory);
                    $("#pagethree > .content > .row5 > .box2 textarea").text(obj.parts);
                    $("#pagethree > .content > .row6 > .box2 textarea").val(obj.fault);
                    $("#pagethree > .content > .row7 > .box2 textarea").val(obj.treatment);
                    $("#pagethree > .content > .row8 > .box2 input").val(obj.breakdowndate);
                  
                });
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}


/*
    请求下单图片
*/
function 请求下单图片(urltype, pageurl, data) {
    showLoading();
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
        },
        success: function (data) {
            if (data.errcode == 0)//提取成功
            {
                hideLoading();
                var content = '';
                if (data.data != null) {
                    $.each(data.data, function (idx, obj) {
                        hide_bottom();


                        content += '<div class="img">';
                        content += '<img src="' + obj.imgurl + '" />';
                        content += '</div>';
                    });
                }
                $('#pagethree > .content > .row10 > .box2').empty();
                $('#pagethree > .content > .row10 > .box2').append(content);
            }
            else//提取失败
            {
                hideLoading();
                alert(data.errmsg);
            }
        }
    });
}

/*
    请求处理图片
*/
function 请求处理图片(urltype, pageurl, data) {
    showLoading();
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
        },
        success: function (data) {
            if (data.errcode == 0)//提取成功
            {
                hideLoading();
                var content = '';
                if (data.data != null) {
                    $.each(data.data, function (idx, obj) {
                        hide_bottom();


                        content += '<div class="img">';
                        content += '<img src="' + obj.imgurl + '" />';
                        content += '</div>';
                    });
                }
                $('#pagethree > .content > .row9 > .box2').empty();
                $('#pagethree > .content > .row9 > .box2').append(content);
            }
            else//提取失败
            {
                hideLoading();
                alert(data.errmsg);
            }
        }
    });
}


/*
    处理故障
*/
function 处理故障(urltype, pageurl, data, func) {
    showLoading();
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
                alert('故障处理开始')
                location.reload();
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/*
    解除故障
*/
function 解除故障(urltype, pageurl, data, func) {
    showLoading();
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
        },
        success: function (data) {
            hideLoading();
            if (data.errcode == 0) {
                alert('解除故障提交成功')
                location.reload();
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

/*
   更新售后保修数据
*/
function 更新售后保修数据(urltype, pageurl, data) {

    showLoading();
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
            if (data.errcode == 0)//提取成功
            {
                hideLoading();
                alert("更新成功");
                window.location.href = "/Warranty/Processed.aspx";
            }
            else//提取失败
            {
                hideLoading();
                alert(data.errmsg);
            }
        }
    });
}