///// <reference path="../../Processed.aspx" />

//$(function () {

//    获取问题分类('IIS3380', '/NotifysalesPCManage.aspx?action=GetQuestion', {});
//});

//function message() {
//    if ($("#mid > .module1 > .rows4 > .box1 > .right input").val().length != 0) {
//        $('#submitinfo1').addClass('contor');
//    }
//    else {
//        $('#submitinfo1').removeClass('contor');
//    }
//}

//$(document).on('tap', '#mid > .module1 > .rows11 > .box1 > .right .values', function (e) {
//    stopDefault(e);
//    ShowKeyBoard($(this), '数量', '0', true, 0, 99999);
//});



//$(document).on('tap', '#mid > .module1 > .rows14 > .right .values', function (e) {
//    stopDefault(e);
//    var questionkey = $("#gratetype option:selected").val();
//    var questionvalue = $("#gratetype option:selected").text();
//    var equipment = $("#mid > .module1 > .rows4 > .box1 > .right input").val();
//    var devicename = $("#mid > .module1 > .rows2 > .box1 > .right input").val();
//    var factory = $("#mid > .module1 > .rows3 > .box2 > .right input").val();
//    var line = $("#mid > .module1 > .rows3 > .box1 > .right input").val();
//    var hostversion = $("#mid > .module1 > .rows5 > .box1 > .right input").val();
//    var lowerversion = $("#mid > .module1 > .rows5 > .box2 > .right input").val();
//    var question = $("#mid > .module1 > .rows1 > .box1 > .right input").val();
//    var parts = $("#mid > .module1 > .rows1 > .box2 > .right input").val();
//    var fault = $("#mid > .module1 > .rows7 > .box1 > .right input").val();
//    var cause = $("#mid > .module1 > .rows8 > .box1 > .right input").val();
//    var treatment = $("#mid > .module1 > .rows9 > .box1 > .right input").val();
//    var longmeasures = $("#mid > .module1 > .rows10 > .box1 > .right input").val();
//    var breakdowndate = $("#mid > .module1 > .rows12 > .box1 > .right input").val();
//    var username = $("#username").val();
//    var salescode = $("#salescode").val();
//    var usercode = $("#usercode").val();

//    var 明细 = new Array();
//    var obj = $('#personnelmodul > .mid > .rowslist');
//    for (var i = 0; i < obj.length; i++) {
//        var 用户代码 = $(obj[i]).attr("data-usercode");
//        var data = { "用户代码": 用户代码 };
//        明细.push(data);
//    }

//    var obj1 = $('#mid > .module1 > .rows15 > .content');

//    var 图片 = new Array();

//    for (var i = 0; i < obj1.length; i++) {
//        var base64 = $(obj1[i]).find('.faqbillimg').attr("src");
//        var base64data = { "base64": base64 };
//        图片.push(base64data);
//    }

//    if (equipment.length == 0) {
//        alert("订单编号不能为空");
//        return;
//    }

//    if (devicename.length == 0) {
//        alert("订单名称不能为空");
//        return;
//    }

//    var datas = new Array();

//    var data11 = {
//        "questionkey": questionkey, "questionvalue": questionvalue, "equipment": equipment, "devicename": devicename, "factory": factory, "line": line,
//        "hostversion": hostversion, "lowerversion": lowerversion, "question": question, "parts": parts, "fault": fault, "cause": cause, "treatment": treatment,
//        "longmeasures": longmeasures, "breakdowndate": breakdowndate, "SpecifyUsers": 明细, "dealing": username, "salescode": salescode, "base64": 图片
//    };

//    datas.push(data11);

//    var data = { "usercode": usercode, "info": data11 }

//    更新售后保修数据('IIS3380', '/SalesManage.aspx?action=updateNewSales', data);

//});

//$(document).on('tap', '#submitinfo1', function (e) {
//    stopDefault(e);
//    var data = $("#mid > .module1 > .rows4 > .box1 > .right input").val();
//    if ($('#submitinfo1').hasClass('contor')) {
//        订单名称('IIS3380', '/SalesManage.aspx?action=getDeviceName', data);
//    }
//});

//$(document).on('tap', '#mid > .module1 > .rows1 > .box3 > .right > .number', function (e) {
//    stopDefault(e);

//    $('#personnelmodul').addClass('contor');
//    $('#mask300').addClass('contor');
//});


//$(document).on('tap', '#personnelmodul > .top > .iconfont', function (e) {
//    stopDefault(e);
//    $('#personnelmodul').removeClass('contor');
//    setTimeout(function () {
//        $('#mask300').removeClass('contor');
//    }, 300);

//});

///********************************** 上传图片 ****************************************/

//function getUrl(fil, id) {
//    //alert("图片类型：" + fil[0].type + "图片名称" + fil[0].name);
//    var file = $("#" + id);
//    if (fil[0].type.indexOf("image") < 0) {
//        if (fil[0].name.indexOf(".") < 0) {
//            var picname = fil[0].name.split('%');
//            if (picname.indexOf("image") < 0) {
//                alert('不允许上传非图片格式的图片');

//                file.after(file.clone().val(""));
//                file.remove();
//                return;
//            }
//        }
//        else {
//            alert('不允许上传非图片格式的图片');

//            file.after(file.clone().val(""));
//            file.remove();
//            return;
//        }
//    }
//    var Cnv = document.getElementById('myCanvas');
//    var Cntx = Cnv.getContext('2d');//获取2d编辑容器
//    var imgss = new Image();//创建一个图片
//    var agoimg = document.getElementById("ago");
//    for (var intI = 0; intI < fil.length; intI++) {//图片回显
//        var tmpFile = fil[intI];
//        var reader = new FileReader();
//        reader.readAsDataURL(tmpFile);
//        reader.onload = function (e) {
//            url = e.target.result;
//            imgss.src = url;
//            agoimg.src = url;

//            var ImgHorW = 300;
//            agoimg.onload = function () {
//                //等比缩放
//                var m = imgss.width / imgss.height;
//                Cnv.height = ImgHorW;//该值影响缩放后图片的大小
//                Cnv.width = ImgHorW * m;
//                //img放入画布中
//                //设置起始坐标，结束坐标
//                Cntx.drawImage(agoimg, 0, 0, ImgHorW * m, ImgHorW);
//                //获取canvas压缩后的图片数据
//                var Pic = document.getElementById("myCanvas").toDataURL("image/jpeg");
//                var img_temp = new Image();
//                img_temp.src = Pic;
//                var imgpic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");
//                while (imgpic.length > 1024 * 1024 * 0.1) {
//                    Cntx.clearRect(0, 0, ImgHorW * m, ImgHorW);
//                    ImgHorW -= 50;
//                    Cnv.height = ImgHorW;//该值影响缩放后图片的大小
//                    Cnv.width = ImgHorW * m;
//                    img_temp = new Image();
//                    img_temp.src = Pic;
//                    Cntx.drawImage(img_temp, 0, 0, ImgHorW * m, ImgHorW);
//                    //获取canvas压缩后的图片数据
//                    Pic = document.getElementById("myCanvas").toDataURL("image/jpeg");
//                    imgpic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");
//                }

//                $('#mid > .module1 > .rows15 > .left').before('<div class="content"><img class="faqbillimg" alt="" src="' + Pic + '"></div>')
//                var length = $('.faqbillimg').length;
//                if (length >= 3) {
//                    $('#addimg').hide();
//                }
//            }
//        }
//    }
//}

//$(document).on('tap', '#mid > .module1 > .rows15 > .left', function (e) {
//    stopDefault(e);
//    $('#imgfile').click();
//});



//$(document).on('tap', '#personnelmodul.specified > .mid > .rowslist > .del', function (e) {
//    stopDefault(e);
//    $(this).parents('.rowslist').remove();
//    var 人数 = $('#personnelmodul > .mid > .rowslist').length;
//    $('#mid > .module1 > .rows1 > .box3 > .right > .number').text(人数);
//    //这里移除推送用户
//});

//$(document).on('change', '#gratetype', function (e) {
//    stopDefault(e);
//    var 问题类型 = $(this).val();
//    if (问题类型 == 'b000005') {
//        $('#personnelmodul').addClass('specified');
//    } else {
//        $('#personnelmodul').removeClass('specified');
//    }

//    var bcode = $("#gratetype option:selected").val();
//    获取问题分类绑定的用户('IIS3380', '/NotifysalesPCManage.aspx?action=GetSpecifyUserList', bcode);
//});


///*
//   获取售后订单名称
//*/
//function 订单名称(urltype, pageurl, data) {

//    showLoading();
//    $.ajax({
//        cache: true,
//        type: "POST",
//        dataType: "json",
//        url: "/Web/WebApi.aspx?action=requestdata",
//        data: {
//            "urltype": urltype,
//            "pageurl": pageurl,
//            "data": data
//        },
//        async: true,
//        error: function (request) {
//            hideLoading();
//        },
//        success: function (data) {
//            if (data.errcode == 0)//提取成功
//            {
//                hideLoading();
//                if (data.data != null) {
//                    $.each(data.data, function (idx, obj) {
//                        $("#mid > .module1 > .rows2 > .box1 > .right input").val(obj.productname);
//                    });
//                }
//            }
//            else//提取失败
//            {
//                hideLoading();
//                alert(data.errmsg);
//            }
//        }
//    });
//}

///*
//   添加售后保修数据
//*/
//function 添加售后保修数据(urltype, pageurl, data) {

//    showLoading();
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
//            if (data.errcode == 0)//提取成功
//            {
//                hideLoading();
//                location.reload();
//                alert("提交成功");
//            }
//            else//提取失败
//            {
//                hideLoading();
//                alert(data.errmsg);
//            }
//        }
//    });
//}

///*
//   更新售后保修数据
//*/
//function 更新售后保修数据(urltype, pageurl, data) {

//    showLoading();
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
//            if (data.errcode == 0)//提取成功
//            {
//                hideLoading();
//                alert("更新成功");
//                window.location.href = "/Warranty/Processed.aspx";
//            }
//            else//提取失败
//            {
//                hideLoading();
//                alert(data.errmsg);
//            }
//        }
//    });
//}


///*
//   获取问题分类绑定的用户
//*/
//function 获取问题分类绑定的用户(urltype, pageurl, bcode) {

//    showLoading();
//    $.ajax({
//        cache: true,
//        type: "POST",
//        dataType: "json",
//        url: "/Web/WebApi.aspx?action=requestdata",
//        data: {
//            "urltype": urltype,
//            "pageurl": pageurl,
//            "data": bcode
//        },
//        async: true,
//        error: function (request) {
//            hideLoading();
//        },
//        success: function (data) {
//            if (data.errcode == 0)//提取成功
//            {
//                var content = '';
//                hideLoading();
//                if (data.data != null) {
//                    $.each(data.data, function (idx, obj) {
//                        hide_bottom();
//                        content += '<div class="rowslist" data-usercode="' + obj.usercode + '">';
//                        content += '<div class="content">';
//                        content += '<img src="' + obj.headimgurl + '" />';
//                        content += '<div class="username">' + obj.username + '(' + obj.usercode + ')' + '</div>';
//                        content += '</div>';
//                        content += '<div class="del"><i class="iconfont">&#xe623;</i></div>';
//                        content += '</div>';
//                    });
//                }
//                $('#mid > .module1 > .rows1 > .box3 > .right > .number').text(data.num);
//                $('#personnelmodul > .mid').empty();
//                $('#personnelmodul > .mid').append(content);
//            }
//            else//提取失败
//            {
//                hideLoading();
//                alert(data.errmsg);
//            }
//        }
//    });
//}


///*
//   获取问题分类
//*/
//function 获取问题分类(urltype, pageurl, data) {

//    showLoading();
//    $.ajax({
//        cache: true,
//        type: "POST",
//        dataType: "json",
//        url: "/Web/WebApi.aspx?action=requestdata",
//        data: {
//            "urltype": urltype,
//            "pageurl": pageurl,
//            "data": data
//        },
//        async: true,
//        error: function (request) {
//            hideLoading();
//        },
//        success: function (data) {
//            if (data.errcode == 0)//提取成功
//            {
//                hideLoading();
//                var content = '';
//                if (data.data != null) {
//                    $.each(data.data, function (idx, obj) {
//                        hide_bottom();
//                        content += '<option value="' + obj.bcode + '">' + obj.classification + '</option>';
//                    });
//                }
//                $('#gratetype').empty();
//                $('#gratetype').append(content);

//                var salescode = $('#salescode').val();
//                if (salescode.length != 0) {

//                    根据salescode获取售后数据('IIS3380', '/SalesManage.aspx?action=GetSalesServiceInfo', salescode);
//                }
//            }
//            else//提取失败
//            {
//                hideLoading();
//                alert(data.errmsg);
//            }
//        }
//    });
//}



///*
//   根据salescode获取售后数据
//*/
//function 根据salescode获取售后数据(urltype, pageurl, salescode) {

//    showLoading();
//    $.ajax({
//        cache: true,
//        type: "POST",
//        dataType: "json",
//        url: "/Web/WebApi.aspx?action=requestdata",
//        data: {
//            "urltype": urltype,
//            "pageurl": pageurl,
//            "data": salescode
//        },
//        async: true,
//        error: function (request) {
//            hideLoading();
//        },
//        success: function (data) {
//            if (data.errcode == 0)//提取成功
//            {
//                hideLoading();
//                var content = '';
//                if (data.data != null) {
//                    $.each(data.data, function (idx, obj) {
//                        hide_bottom();
//                        $("#mid > .module1 > .rows4 > .box1 > .right input").val(obj.equipment);
//                        $("#mid > .module1 > .rows2 > .box1 > .right input").val(obj.devicename);
//                        $("#mid > .module1 > .rows3 > .box2 > .right input").val(obj.factory);
//                        $("#mid > .module1 > .rows5 > .box1 > .right input").val(obj.hostversion);
//                        $("#mid > .module1 > .rows5 > .box2 > .right input").val(obj.lowerversion);
//                        $("#mid > .module1 > .rows1 > .box2 > .right input").val(obj.parts);
//                        $("#mid > .module1 > .rows7 > .box1 > .right input").val(obj.fault);
//                        $("#mid > .module1 > .rows8 > .box1 > .right input").val(obj.cause);
//                        $("#mid > .module1 > .rows9 > .box1 > .right input").val(obj.treatment);
//                        $("#mid > .module1 > .rows12 > .box1 > .right input").val(obj.breakdowndate);
//                        $("#mid > .module1 > .rows12 > .box1 > .right input").val(obj.breakdowndate);

//                    });
//                }
//            }
//            else//提取失败
//            {
//                hideLoading();
//                alert(data.errmsg);
//            }
//        }
//    });
//}


var imgurl = '';
var pj = '';
var page = 1;
var onetype = '';
var oneval;
var codes = '';
var 选择的用户 = new Array();
var shangcodes = new Array();
var 推送人员 = new Array();
var bcode1 = '';
var bcode2 = '';
$(function () {
    获取问题分类('IIS3380', '/NotifysalesPCManage.aspx?action=GetQuestion', {});

});


$(document).on('change', '#gratetype', function (e) {
    stopDefault(e);
    var 问题类型 = $(this).val();
    if (问题类型 == 'b000005') {
        $('#pagefour').addClass('specified');
    } else {
        $('#pagefour').removeClass('specified');
    }

    bcode1 = '';
    bcode2 = $(this).val();
    var bcode = $("#gratetype option:selected").val();
    获取问题分类绑定的用户('IIS3380', '/NotifysalesPCManage.aspx?action=GetSpecifyUserList', bcode);
});

$(document).on('tap', '#pagefour > .queding', function (e) {
    stopDefault(e);
    history.go(-1);
});

function GetPageList() {
    //if (page == 1) {
    //    $('#div_form_table').empty();
    //}

    获取用户('IIS3380', '/NotifysalesPCManage.aspx?action=GetUserList', {
        "page": page,
        "onetype": onetype,
        "oneval": oneval
    });
}


$(document).on('tap', '#conditions > .dropdown', function (e) {
    stopDefault(e);
    $('#conditions').toggleClass('contor');
});

$(document).on('tap', '#pagefour.specified > .content > .infolist > .right', function (e) {
    stopDefault(e);
    $('input').blur();

    if (shangcodes.length > 0) {
        if (shangcodes[0] != codes) {
            推送人员 = new Array();
            shangcodes = new Array();
            shangcodes.push(codes);
        }
    } else {
        shangcodes.push(codes);
    }

    if ($('#pagefour > .titles > .title1.contor').text() == "推送人员") {
        $('#pagefour.specified > .content > .infolist > .right i.choice').removeClass('contor');

        $(this).find('i.choice').addClass('contor');




        选择的用户.push($(this).find('i.choice').addClass('contor'));


        var 用户代码 = $(this).parent('.infolist').attr("data-usercode");

        var 是否存在 = false;
        for (var i = 0; i < 推送人员.length; i++) {
            if (推送人员[i].state == "0") {
                是否存在 = true;
            }
        }

        if (是否存在) {
            for (var i = 0; i < 推送人员.length; i++) {
                if (推送人员[i].state == "0") {
                    推送人员[i].用户代码 = 用户代码;
                }
            }
        } else {
            var data1 = { "用户代码": 用户代码, "state": "0" };
            推送人员.push(data1);
        }

    }
    //$(this).parents('.infolist').remove();
    //var 人数 = $('#pagefour > .content > .infolist').length;
    //$('#pagethree > .content > .row4 > .right > .box2 input').val(人数);
    //这里移除推送用户
});

//$(document).on('tap', '#pagefour.specified > .content1 > .infolist > .right', function (e) {
//    stopDefault(e);
//    $('input').blur();

//    if (shangcodes.length > 0) {
//        if (shangcodes[0] != codes) {
//            推送人员 = new Array();
//            shangcodes = new Array();
//            shangcodes.push(codes);
//        }
//    } else {
//        shangcodes.push(codes);
//    }

//    if ($('#pagefour > .titles > .title1.contor').text() == "抄送人员") {
//        var 用户代码 = $(this).parent('.infolist').attr("data-usercode");

//        if ($(this).find('i.choice').hasClass('contor')) {
//            $(this).find('i.choice').removeClass('contor');



//            for (var i = 0; i < 推送人员.length; i++) {
//                if (推送人员[i].state == "1") {
//                    if (推送人员[i].用户代码 == 用户代码) {
//                        推送人员.splice(i, 1);
//                    }
//                }
//            }
//        } else {
//            $(this).find('i.choice').addClass('contor');
//            var data1 = { "用户代码": 用户代码, "state": "1" };
//            推送人员.push(data1);
//        }
//    }

//});

$(document).on('tap', '#pagefour > .content1 > .infolist > .right', function (e) {
    stopDefault(e);
    $('input').blur();

    if (shangcodes.length > 0) {
        if (shangcodes[0] != codes) {
            推送人员 = new Array();
            shangcodes = new Array();
            shangcodes.push(codes);
        }
    } else {
        shangcodes.push(codes);
    }

    if ($('#pagefour > .titles > .title1.contor').text() == "抄送人员") {
        var 用户代码 = $(this).parent('.infolist').attr("data-usercode");

        if ($(this).find('i.choice').hasClass('contor')) {
            $(this).find('i.choice').removeClass('contor');



            for (var i = 0; i < 推送人员.length; i++) {
                if (推送人员[i].state == "1") {
                    if (推送人员[i].用户代码 == 用户代码) {
                        推送人员.splice(i, 1);
                    }
                }
            }
        } else {
            $(this).find('i.choice').addClass('contor');
            var data1 = { "用户代码": 用户代码, "state": "1" };
            推送人员.push(data1);
        }
    }

});


$(document).on('tap', '#pagefour > .titles > .title1', function (e) {
    stopDefault(e);
    $(this).addClass('contor').siblings().removeClass('contor');

    if ($(this).hasClass('contor')) {
        if ($(this).text() == "推送人员") {
            //var bcode = $("#gratetype option:selected").val();
            //获取问题分类绑定的用户('IIS3380', '/NotifysalesPCManage.aspx?action=GetSpecifyUserList', bcode);

            //if (bcode == 'b000005') {
            //    if (推送人员.length > 0) {
            //        for (var ii = 0; ii < 推送人员.length; ii++) {
            //            if (推送人员[ii].state == "0") {

            //            }
            //        }
            //    }
            //}

            $('#pagefour > .content').css('display', 'block');
            $('#pagefour > .content1').css('display', 'none');

        } else if ($(this).text() == "抄送人员") {
            //获取用户('IIS3380', '/NotifysalesPCManage.aspx?action=GetUserList', {
            //    "page": page,
            //    "onetype": onetype,
            //    "oneval": oneval
            //});

            $('#pagefour > .content1').css('display', 'block');
            $('#pagefour > .content').css('display', 'none');
        }
    }
});

$(document).on('tap', '#conditions > .left > .query', function (e) {
    stopDefault(e);
    onetype = $('#onetype_dummy').val();
    oneval = $('#oneval').val();

    if ($('#pagefour > .titles > .title1.contor').text() == "抄送人员") {
        GetPageList();
    } else if ($('#pagefour > .titles > .title1.contor').text() == "推送人员") {
        //var bcode = $("#gratetype option:selected").val();
        //获取问题分类绑定的用户('IIS3380', '/NotifysalesPCManage.aspx?action=GetSpecifyUserList', bcode);
        alert("只能搜索抄送人员")
    }

});

$(document).on('tap', '#pagethree > .bottom_footer > .right > .box1.contor', function (e) {
    stopDefault(e);

        var questionkey = bcode2;
        var questionvalue = $('#gratetype_dummy').val();
        var equipment = $("#pagethree > .content > .row1 > .box2 input").val();
        var devicename = $("#pagethree > .content > .row2 > .box2 input").val();
        var factory = $("#pagethree > .content > .row3 > .box2 input").val();
      
       
        var question = $("#gratetype_dummy").val();
        var parts = $("#pagethree > .content > .row5 > .box2 textarea").val();
        var fault = $("#pagethree > .content > .row6 > .box2 textarea").val();
       
        var treatment = $("#pagethree > .content > .row7 > .box2 textarea").val();
       
        var breakdowndate = $("#pagethree > .content > .row8 > .box2 input").val();
        var username = $("#username").val();
        var salescode = $("#salescode").val();
        var usercode = $("#usercode").val();



        //var 明细 = new Array();
        //var obj = $('#personnelmodul > .mid > .rowslist');
        //for (var i = 0; i < obj.length; i++) {
        //    var 用户代码 = $(obj[i]).attr("data-usercode");
        //    var data = { "用户代码": 用户代码 };
        //    明细.push(data);
        //}


        if (codes == '') {
            questionkey = '11';
        } else if (codes != 'b000005') {
            var obj = $('#pagefour > .content > .infolist');
            for (var i = 0; i < obj.length; i++) {
                var 用户代码 = $(obj[i]).attr("data-usercode");
                var data1 = { "用户代码": 用户代码, "state": "0" };
                推送人员.push(data1);
            }
        }
        
        var 图片 = new Array();

        var img_obj = $('#pagethree > .content > .row9 > .box2 > .img');
        for (var i = 0; i < img_obj.length; i++) {
            var imgArr = { "base64": $(img_obj[i]).find('img').attr('src') }
            图片.push(imgArr);
        }

        if (equipment.length == 0) {
            alert("订单编号不能为空");
            return;
        }

        if (devicename.length == 0) {
            alert("订单名称不能为空");
            return;
        }

        var datas = new Array();

        var data11 = {
            "questionkey": questionkey, "questionvalue": questionvalue, "equipment": equipment, "devicename": devicename, "factory": factory, 
            "question": question, "parts": parts, "fault": fault,"treatment": treatment,
            "breakdowndate": breakdowndate, "SpecifyUsers": 推送人员, "dealing": username, "salescode": salescode, "base64": 图片
        };

        datas.push(data11);

        var data = { "usercode": usercode, "info": data11 }

        更新售后保修数据('IIS3380', '/SalesManage.aspx?action=updateNewSales', data);
    
});

//$(document).on('tap', '#personnelmodul.specified > .mid > .rowslist > .del', function (e) {
//    stopDefault(e);
//    $(this).parents('.rowslist').remove();
//    var 人数 = $('#personnelmodul > .mid > .rowslist').length;
//    $('#pagethree > .content > .row4 > .right > .box2 input').val(人数);
//    //这里移除推送用户
//});

$(document).on('tap', '#pagefive > .bottom_footer > .resultbtn > .box1.contor', function (e) {
    stopDefault(e);
    history.go(-1);
});


$(document).on('tap', '#pagesix > .bottom_footer > .resultbtn > .box1.contor', function (e) {
    stopDefault(e);
    history.go(-1);
});

$(document).on('tap', '#pagethree > .content > .row9 > .box2 > .img', function (e) {
    stopDefault(e);
    var img = $(this).find('img').attr('src');
    imgurl = $(this).find('img').attr('src');
    var index = $(this).index();
    if (img.indexOf("/MallImg/temp/") != -1) {
        $('#pagefive > .img img').attr('src', img.substring(0, img.indexOf(".")) + '_big.png');
        $('#pagefive > .bottom_footer > .resultbtn > .box2.contor').attr('data-index', index);
        $.mobile.changePage("#pagefive");
    } else {
        $('#pagefive > .img img').attr('src', img);
        $('#pagefive > .bottom_footer > .resultbtn > .box2.contor').attr('data-index', index);
        $.mobile.changePage("#pagefive");
    }
});

$(document).on('tap', '#pagethree > .content > .row10 > .box2 > .img', function (e) {
    stopDefault(e);
    var img = $(this).find('img').attr('src');
    imgurl = $(this).find('img').attr('src');
    var index = $(this).index();
    if (img.indexOf("/MallImg/temp/") != -1) {
        $('#pagesix > .img img').attr('src', img.substring(0, img.indexOf(".")) + '_big.png');
        $('#pagesix > .bottom_footer > .resultbtn > .box2.contor').attr('data-index', index);
        $.mobile.changePage("#pagesix");
    } else {
        $('#pagesix > .img img').attr('src', img);
        $('#pagesix > .bottom_footer > .resultbtn > .box2.contor').attr('data-index', index);
        $.mobile.changePage("#pagesix");
    }
});


$(document).on('tap', '#pagefive > .bottom_footer > .resultbtn > .box2.contor', function (e) {
    stopDefault(e);

    if ($('#usercode').val() == $('#dealusercode').val()) {
        alert("你不是提单人,无法删除");
        return;
    }
    
    删除图片('IIS3380', '/SalesManage.aspx?action=deletePic', imgurl);

    var index = $(this).attr('data-index');
    $('#pagethree > .content > .row9 > .box2 > .img:eq(' + index + ')').remove();

    history.go(-1);
});

$(document).on('tap', '#pagesix > .bottom_footer > .resultbtn > .box2.contor', function (e) {
    stopDefault(e);
    if ($('#usercode').val() != $('#dealusercode').val()) {
        alert("你不是处理人,无法删除");
        return;
    }

    删除图片('IIS3380', '/SalesManage.aspx?action=deletePic', imgurl);

    var index = $(this).attr('data-index');
    $('#pagethree > .content > .row10 > .box2 > .img:eq(' + index + ')').remove();
    history.go(-1);
});

/*
点击上传图片
*/
$(document).on('tap', '#pagethree > .content > .row9 > .box2 > .addimg.contor', function (e) {
    stopDefault(e);
    if ($('#usercode').val() == $('#dealusercode').val()) {
        alert("你不是提单人,无法添加");
        return;
    }
    $('#imgfile').click();
});


/*
点击上传图片
*/
$(document).on('tap', '#pagethree > .content > .row10 > .box2 > .addimg.contor', function (e) {
    stopDefault(e);
    if ($('#usercode').val() != $('#dealusercode').val()) {
        alert("你不是处理人,无法添加");
        return;
    }
    $('#imgfile1').click();

});

//$(document).on('tap', '#pagethree > .content > .row9 > .box2 > .img', function (e) {
//    stopDefault(e);
//    var img = $(this).find('img').attr('src');
//    var index = $(this).index();
//    $('#pagefive > .img img').attr('src', img);
//    $('#pagefive > .bottom_footer > .resultbtn > .box2.contor').attr('data-index', index);
//    $.mobile.changePage("#pagefive");
//});

/*********************************************** 上传图片 **************************************************/

function getUrl(fil, id) {
    //alert("图片类型：" + fil[0].type + "图片名称" + fil[0].name);
    showLoading();
    var file = $("#" + id);
    if (fil.length < 1) {
        hideLoading();
        return;
    }
    if (fil[0].type.indexOf("image") < 0) {
        if (fil[0].name.indexOf(".") < 0) {
            var picname = fil[0].name.split('%');
            if (picname.indexOf("image") < 0) {
                alert('不允许上传非图片格式的图片');

                file.after(file.clone().val(""));
                file.remove();
                return;
            }
        }
        else {
            alert('不允许上传非图片格式的图片');

            file.after(file.clone().val(""));
            file.remove();
            return;
        }
    }
    var Cnv = document.getElementById('myCanvas');
    var Cntx = Cnv.getContext('2d');//获取2d编辑容器
    var imgss = new Image();//创建一个图片
    var agoimg = document.getElementById("ago");
    for (var intI = 0; intI < fil.length; intI++) {//图片回显
        var tmpFile = fil[intI];
        var reader = new FileReader();
        reader.readAsDataURL(tmpFile);
        reader.onload = function (e) {
            url = e.target.result;
            imgss.src = url;
            agoimg.src = url;

            var ImgHorW = 600;
            agoimg.onload = function () {
                //等比缩放
                var m = imgss.width / imgss.height;
                Cnv.height = ImgHorW;//该值影响缩放后图片的大小
                Cnv.width = ImgHorW * m;
                //img放入画布中
                //设置起始坐标，结束坐标
                Cntx.drawImage(agoimg, 0, 0, ImgHorW * m, ImgHorW);
                //获取canvas压缩后的图片数据
                var Pic = document.getElementById("myCanvas").toDataURL("image/png");
                var img_temp = new Image();
                img_temp.src = Pic;
                var imgpic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");
                while (imgpic.length > 1024 * 1024 * 0.4) {
                    Cntx.clearRect(0, 0, ImgHorW * m, ImgHorW);
                    ImgHorW -= 50;
                    Cnv.height = ImgHorW;//该值影响缩放后图片的大小
                    Cnv.width = ImgHorW * m;
                    img_temp = new Image();
                    img_temp.src = Pic;
                    Cntx.drawImage(img_temp, 0, 0, ImgHorW * m, ImgHorW);
                    //获取canvas压缩后的图片数据
                    Pic = document.getElementById("myCanvas").toDataURL("image/png");
                    imgpic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");
                }

                var content = '';
                content += '<div class="img">';
                content += '    <img src="' + Pic + '" />';
                content += '</div>';

                $('#pagethree > .content > .row9 > .box2 > .addimg').before(content);
                var length = $('#pagethree > .content > .row9 > .box2 > .img').length;
                if (length >= 5) {
                    $('#pagethree > .content > .row9 > .box2 > .addimg').removeClass('contor');
                }
                $("#" + id).val('');

                if (Pic.indexOf("/MallImg/temp/") == -1) {
                    上传图片('IIS3380', '/SalesManage.aspx?action=uploadPic', {
                        "base64": Pic,
                        "usercode": $('#usercode').val(),
                        "salescode": $('#salescode').val(),
                        "state": "0"
                    });
                }
                hideLoading();
            }
        }
    }
}

function getUrl1(fil, id) {
    //alert("图片类型：" + fil[0].type + "图片名称" + fil[0].name);
    showLoading();
    var file = $("#" + id);
    if (fil.length < 1) {
        hideLoading();
        return;
    }
    if (fil[0].type.indexOf("image") < 0) {
        if (fil[0].name.indexOf(".") < 0) {
            var picname = fil[0].name.split('%');
            if (picname.indexOf("image") < 0) {
                alert('不允许上传非图片格式的图片');

                file.after(file.clone().val(""));
                file.remove();
                return;
            }
        }
        else {
            alert('不允许上传非图片格式的图片');

            file.after(file.clone().val(""));
            file.remove();
            return;
        }
    }
    var Cnv = document.getElementById('myCanvas1');
    var Cntx = Cnv.getContext('2d');//获取2d编辑容器
    var imgss = new Image();//创建一个图片
    var agoimg = document.getElementById("ago1");
    for (var intI = 0; intI < fil.length; intI++) {//图片回显
        var tmpFile = fil[intI];
        var reader = new FileReader();
        reader.readAsDataURL(tmpFile);
        reader.onload = function (e) {
            url = e.target.result;
            imgss.src = url;
            agoimg.src = url;

            var ImgHorW = 600;
            agoimg.onload = function () {
                //等比缩放
                var m = imgss.width / imgss.height;
                Cnv.height = ImgHorW;//该值影响缩放后图片的大小
                Cnv.width = ImgHorW * m;
                //img放入画布中
                //设置起始坐标，结束坐标
                Cntx.drawImage(agoimg, 0, 0, ImgHorW * m, ImgHorW);
                //获取canvas压缩后的图片数据
                var Pic = document.getElementById("myCanvas1").toDataURL("image/png");
                var img_temp = new Image();
                img_temp.src = Pic;
                var imgpic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");
                while (imgpic.length > 1024 * 1024 * 0.4) {
                    Cntx.clearRect(0, 0, ImgHorW * m, ImgHorW);
                    ImgHorW -= 50;
                    Cnv.height = ImgHorW;//该值影响缩放后图片的大小
                    Cnv.width = ImgHorW * m;
                    img_temp = new Image();
                    img_temp.src = Pic;
                    Cntx.drawImage(img_temp, 0, 0, ImgHorW * m, ImgHorW);
                    //获取canvas压缩后的图片数据
                    Pic = document.getElementById("myCanvas1").toDataURL("image/png");
                    imgpic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");
                }

                var content = '';
                content += '<div class="img">';
                content += '    <img src="' + Pic + '" />';
                content += '</div>';

                $('#pagethree > .content > .row10 > .box2 > .addimg').before(content);
                var length = $('#pagethree > .content > .row10 > .box2 > .img').length;
                if (length >= 5) {
                    $('#pagethree > .content > .row10 > .box2 > .addimg').removeClass('contor');
                }
                
                $("#" + id).val('');
                if (Pic.indexOf("/MallImg/temp/") == -1) {
                    上传图片('IIS3380', '/SalesManage.aspx?action=uploadPic', {
                        "base64": Pic,
                        "usercode": $('#usercode').val(),
                        "salescode": $('#salescode').val(),
                        "state": "1"
                    });
                }
                hideLoading();
            }
        }
    }
}

$(document).on('tap', '#pagethree > .content > .row4 > .right > .box2 input', function (e) {
    stopDefault(e);
    //$('#personnelmodul').addClass('contor');
    //$('#mask300').addClass('contor');

    if (bcode1 == '') {
        bcode1 = $("#gratetype option:selected").val();
    } else {
        if (bcode1 == 'b000005') {
            $('#pagefour').addClass('specified');
        } else {
            $('#pagefour').removeClass('specified');
        }
    }

    codes = $("#gratetype option:selected").val();

    获取问题分类绑定的用户('IIS3380', '/NotifysalesPCManage.aspx?action=GetSpecifyUserList', bcode1);

    获取用户('IIS3380', '/NotifysalesPCManage.aspx?action=GetUserList', {
        "page": page,
        "onetype": onetype,
        "oneval": oneval
    });

    //$($('#pagefour.specified > .content > .infolist > .right i.choice')).removeClass('contor');
    //$($('#pagefour.specified > .content > .infolist > .right i.choice')[0]).addClass('contor');
    $($('#pagefour > .titles > .title1')[0]).addClass('contor').siblings().removeClass('contor');
    $('#pagefour > .content1').css('display', 'none');
    $('#pagefour > .content').css('display', 'block');
    $.mobile.changePage("#pagefour");
});




$(document).on('tap', '#personnelmodul > .top > .iconfont', function (e) {
    stopDefault(e);
    $('#personnelmodul').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 300);

});

$(document).on('tap', '#personnelmodul.specified > .mid > .rowslist > .del', function (e) {
    stopDefault(e);
    $(this).parents('.rowslist').remove();
    var 人数 = $('#personnelmodul > .mid > .rowslist').length;
    $('#mid > .module1 > .rows1 > .box3 > .right > .number').text(人数);
    //这里移除推送用户
});



//$(document).on('tap', '#pagethree > .content > .row4 > .right > .box2 input', function (e) {
//    stopDefault(e);

//    $('#personnelmodul').addClass('contor');
//    $('#mask300').addClass('contor');
//});


$(document).on('tap', '#personnelmodul > .top > .iconfont', function (e) {
    stopDefault(e);
    $('#personnelmodul').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 300);

});

$(document).on('tap', '#personnelmodul.specified > .mid > .rowslist > .del', function (e) {
    stopDefault(e);
    $(this).parents('.rowslist').remove();
    var 人数 = $('#personnelmodul > .mid > .rowslist').length;
    $('#mid > .module1 > .rows1 > .box3 > .right > .number').text(人数);
    //这里移除推送用户
});

$(document).on('tap', '#pagethree > .bottom_footer > .left > .box1.contor', function (e) {
    stopDefault(e);
    history.go(-1);
});


/*
   获取问题分类
*/
function 获取问题分类(urltype, pageurl, data) {

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
                var content = '';
                if (data.data != null) {
                    $.each(data.data, function (idx, obj) {
                        hide_bottom();
                        content += '<option value="' + obj.bcode + '">' + obj.classification + '</option>';
                    });
                }
                $('#gratetype').empty();
                $('#gratetype').append(content);
                var salescode = $('#salescode').val();
                if (salescode.length != 0) {
                    根据salescode获取售后数据('IIS3380', '/SalesManage.aspx?action=GetSalesServiceInfo', salescode);

                    请求下单图片('IIS3380', '/SalesManage.aspx?action=GetImg', salescode);
                    请求处理图片('IIS3380', '/SalesManage.aspx?action=GetdealImg', salescode);
                }
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
   上传图片
*/
function 上传图片(urltype, pageurl, data) {

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
                var content = '';
                
                var salescode = $('#salescode').val();
                if (salescode.length != 0) {
                    $('#pagethree > .content > .row9 > .box2 > .img').remove();
                    $('#pagethree > .content > .row10 > .box2 > .img').remove();
                    请求下单图片('IIS3380', '/SalesManage.aspx?action=GetImg', salescode);
                    请求处理图片('IIS3380', '/SalesManage.aspx?action=GetdealImg', salescode);
                }
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
   删除图片
*/
function 删除图片(urltype, pageurl, data) {

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

                var salescode = $('#salescode').val();
                if (salescode.length != 0) {
                    $('#pagethree > .content > .row9 > .box2 > .img').remove();
                    $('#pagethree > .content > .row10 > .box2 > .img').remove();
                    请求下单图片('IIS3380', '/SalesManage.aspx?action=GetImg', salescode);
                    请求处理图片('IIS3380', '/SalesManage.aspx?action=GetdealImg', salescode);
                }
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
   获取问题分类绑定的用户
*/
function 获取问题分类绑定的用户(urltype, pageurl, bcode) {

    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": bcode
        },
        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            if (data.errcode == 0)//提取成功
            {
                var content = '';
                hideLoading();
                if (data.data != null) {
                    $.each(data.data, function (idx, obj) {
                        hide_bottom();
                        content += '<div class="infolist" data-usercode="' + obj.usercode + '">';
                        content += '<div class="left"></div>';
                        content += '<div class="mid">';
                        content += '<div class="userinfo">';
                        content += '<div class="img">';
                        content += '<img src="' + obj.headimgurl + '" />';
                        content += '</div>';
                        content += '<div class="name">' + obj.username + '</div>';
                        content += '</div>';
                        content += '</div>';
                        content += '<div class="right">';
                        content += '<i class="iconfont choice">&#xe618;</i>';
                        content += '</div>';
                        content += '</div>';
                    });
                }
                $('#pagethree > .content > .row4 > .right > .box2 input').val(data.num);
                $('#pagefour > .content').empty();
                $('#pagefour > .content').append(content);
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
   根据salescode获取售后数据
*/
function 根据salescode获取售后数据(urltype, pageurl, salescode) {

    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": salescode
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
                        $("#pagethree > .content > .row1 > .box2 input").val(obj.equipment);
                        $("#pagethree > .content > .row2 > .box2 input").val(obj.devicename);
                        $("#pagethree > .content > .row3 > .box2 input").val(obj.factory);
                        $("#pagethree > .content > .row5 > .box2 textarea").text(obj.parts);
                        $("#pagethree > .content > .row6 > .box2 textarea").val(obj.fault);
                        $("#pagethree > .content > .row7 > .box2 textarea").val(obj.treatment);
                        $("#pagethree > .content > .row8 > .box2 input").val(obj.breakdowndate);

                        $('#gratetype_dummy').val(obj.question);
                        //var bcode = $("#gratetype option:selected").val();
                        bcode1 = obj.bcode;
                        bcode2 = obj.bcode;
                        获取问题分类绑定的用户('IIS3380', '/NotifysalesPCManage.aspx?action=GetSpecifyUserList', bcode1);

                    });
                }
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
                
                $('#pagethree > .content > .row9 > .box2 > .addimg').before(content);
                var length = $('#pagethree > .content > .row9 > .box2 > .img').length;
                if (length >= 5) {
                    $('#pagethree > .content > .row9 > .box2 > .addimg').removeClass('contor');
                } else if (!$('#pagethree > .content > .row9 > .box2 > .addimg').hasClass('contor')) {
                    $('#pagethree > .content > .row9 > .box2 > .addimg').addClass('contor');
                }
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

                $('#pagethree > .content > .row10 > .box2 > .addimg').before(content);
                var length = $('#pagethree > .content > .row10 > .box2 > .img').length;
                if (length >= 5) {
                    $('#pagethree > .content > .row10 > .box2 > .addimg').removeClass('contor');
                } else if (!$('#pagethree > .content > .row10 > .box2 > .addimg').hasClass('contor')) {
                    $('#pagethree > .content > .row10 > .box2 > .addimg').addClass('contor');
                }
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
   获取用户
*/
function 获取用户(urltype, pageurl, data) {

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
                var content = '';
                hideLoading();
                if (data.data != null) {
                    $.each(data.data, function (idx, obj) {
                        hide_bottom();
                        content += '<div class="infolist" data-usercode="' + obj.usercode + '">';
                        content += '<div class="left"></div>';
                        content += '<div class="mid">';
                        content += '<div class="userinfo">';
                        content += '<div class="img">';
                        content += '<img src="' + obj.headimgurl + '" />';
                        content += '</div>';
                        content += '<div class="name">' + obj.username + '</div>';
                        content += '</div>';
                        content += '</div>';
                        content += '<div class="right">';
                        content += '<i class="iconfont choice">&#xe618;</i>';
                        content += '</div>';
                        content += '</div>';

                        //content += '<div class="content">';
                        //content += '<img src="' + obj.headimgurl + '" />';
                        //content += '<div class="username">' + obj.username + '(' + obj.usercode + ')' + '</div>';
                        //content += '</div>';
                        //content += '<div class="del"><i class="iconfont">&#xe623;</i></div>';
                        //content += '</div>';
                    });
                }
                $('#pagefour > .content1').empty();
                $('#pagefour > .content1').append(content);
            }
            else//提取失败
            {
                hideLoading();
                alert(data.errmsg);
            }
        }
    });
}
