/// <reference path="../../Processed.aspx" />
var 售后新订单列表 = new Array();

var 添加售后订单的列表 = new Array();

$(function () {

    获取问题分类('IIS3380', '/NotifysalesPCManage.aspx?action=GetQuestion', {});
});

function wordStatic(input) {
    if ($("#mid > .module1 > .rows4 > .box1 > .right input").val().length > 5) {
        $('#submitinfo1').addClass('contor');
    }
    else {
        $('#submitinfo1').removeClass('contor');
    }
}

$(document).on('tap', '#mid > .module1 > .rows11 > .box1 > .right .values', function (e) {
    stopDefault(e);
    ShowKeyBoard($(this), '数量', '0', true, 0, 99999);
});

$(document).on('tap', '#mid > .module1 > .rows14 > .left .values', function (e) {
    stopDefault(e);
    $('#mid').removeClass('contor');
});


$(document).on('tap', '#addmateria2', function (e) {
    stopDefault(e);
    $('#mid').addClass('contor');
});



$(document).on('tap', '#mid > .module1 > .rows14 > .right .values', function (e) {
    stopDefault(e);
    var 图片 = new Array();

    var questionkey = $("#gratetype option:selected").val();
    var questionvalue = $("#gratetype option:selected").text();
    var equipment = $("#mid > .module1 > .rows4 > .box1 > .right input").val();
    var devicename = $("#mid > .module1 > .rows2 > .box1 > .right input").val();
    var factory = $("#mid > .module1 > .rows3 > .box2 > .right input").val();

    var hostversion = $("#mid > .module1 > .rows5 > .box1 > .right input").val();
    var lowerversion = $("#mid > .module1 > .rows5 > .box2 > .right input").val();
    var question = $("#mid > .module1 > .rows1 > .box1 > .right input").val();
    var parts = $("#mid > .module1 > .rows1 > .box2 > .right input").val();
    var fault = $("#mid > .module1 > .rows7 > .box1 > .right input").val();
    var cause = $("#mid > .module1 > .rows8 > .box1 > .right input").val();
    var treatment = $("#mid > .module1 > .rows9 > .box1 > .right input").val();
    var breakdowndate = $("#mid > .module1 > .rows12 > .box1 > .right input").val();

    var obj = $('#mid > .module1 > .rows15 > .content');

    for (var i = 0; i < obj.length; i++) {
        var base64 = $(obj[i]).find('.faqbillimg').attr("src");
        data = { "base64": base64 };
        图片.push(data);
    }



    //var 临时数据 = {
    //    "编号": "",
    //    "设备名称":""
    //}
    //添加售后订单的列表.push(临时数据);


    var 问题分类通知人员 = new Array();
    var obj = $('#personnelmodul > .mid > .rowslist');
    for (var i = 0; i < obj.length; i++) {
        var 用户代码 = $(obj[i]).attr("data-usercode");
        var data = { "用户代码": 用户代码 };
        问题分类通知人员.push(data);
    }

    if (equipment.length == 0) {
        alert("订单编号不能为空");
        return;
    }

    if (devicename.length == 0) {
        alert("订单名称不能为空");
        return;
    }

    var 是否存在 = false;
    for (var i = 0; i < 售后新订单列表.length; i++) {
        if (售后新订单列表[i].设备编号 == equipment) {
            是否存在 = true;
        }
    }

    if (是否存在) {
        if (confirm("当前售后订单已存在，确定覆盖吗？")) {
            for (var i = 0; i < 售后新订单列表.length; i++) {
                if (售后新订单列表[i].equipment == equipment) {
                    售后新订单列表[i].equipment = equipment;
                    售后新订单列表[i].devicename = devicename;
                    售后新订单列表[i].questionvalue = questionvalue;
                    售后新订单列表[i].breakdowndate = breakdowndate;
                    售后新订单列表[i].factory = factory;
                }
            }
        }
    }
    else {
        售后新订单列表.push({
            "equipment": equipment,
            "devicename": devicename,
            "questionvalue": questionvalue,
            "breakdowndate": breakdowndate,

            "questionkey": questionkey,
            "factory": factory,
            "hostversion": hostversion,
            "lowerversion": lowerversion,

            "question": question,
            "parts": parts,
            "fault": fault,
            "cause": cause,
            "treatment": treatment,

            "base64": 图片,
            "notify": 问题分类通知人员
        });
    }
    RefreshMaterialInfo();
    $('#mid').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);

});

/*
刷新售后订单类表
*/
function RefreshMaterialInfo() {

    var content = '';
    if (售后新订单列表.length > 0) {
        $('#submitinfo2').addClass('contor');
    }
    else {
        $('#submitinfo2').removeClass('contor');
    }
    for (var i = 0; i < 售后新订单列表.length; i++) {
        var 设备编号 = 售后新订单列表[i].equipment;
        var 设备名称 = 售后新订单列表[i].devicename;
        var 问题分类 = 售后新订单列表[i].questionvalue;
        var 故障日期 = 售后新订单列表[i].breakdowndate;

        //var questionkey = 售后新订单列表[i].questionkey;
        var factory = 售后新订单列表[i].factory;
        //var hostversion = 售后新订单列表[i].hostversion;
        //var lowerversion = 售后新订单列表[i].lowerversion;

        //var question = 售后新订单列表[i].question;
        //var parts = 售后新订单列表[i].parts;
        //var fault = 售后新订单列表[i].fault;
        //var cause = 售后新订单列表[i].cause;
        //var treatment = 售后新订单列表[i].treatment;
        //var 图片 = 售后新订单列表[i].图片;
        //var 问题分类通知人员 = 售后新订单列表[i].问题分类通知人员;

        //content += '<div class="content" data-equipment = "' + 设备编号 + '" data-questionvalue = "' + 问题分类 + '" data-questionkey = "' + questionkey + '" data-devicename = "' + 设备名称 + '" data-factory = "' + factory + '" data-hostversion = "' + hostversion + '" data-lowerversion = "' + lowerversion + '" data-question = "' + question + '" data-parts = "' + parts + '" data-fault = "' + fault + '" data-cause = "' + cause + '" data-treatment = "' + treatment + '" data-breakdowndate = "' + 故障日期 + '" data-picture = "' + 图片 + '" data-notify = "' + 问题分类通知人员 + '">';
        content += '<div class="content">';
        content += '<div class="column1">' + 设备名称 + '</div>';
        content += '<div class="column2">'
        content += '<div class="pj">' + 设备编号 + '</div>';
        content += '<div class="state">' + 问题分类 + '</div>';
        content += '</div>'
        content += '<div class="column3">'
        content += '<div class="username">' + factory + '</div>';
        content += '</div>';
        content += '<div class="column4"><i class="iconfont" >&#xe655;</i></div>';
        content += '<div class="column5"><i class="iconfont" >&#xe623;</i></div>';
        content += '</div>';
        content += '</div>';
    }
    $('#pageone > .module11').empty();
    $('#pageone > .module11').append(content);
}


$(document).on('tap', '#pageone > .module11 > .content > .column5', function (e) {
    stopDefault(e);
    var obj = $(this).parents('.content');
    var devicename = $(obj).find('.column1').text();
    if (confirm("确定删除“" + devicename + "”吗？")) {
        for (var i = 0; i < 售后新订单列表.length; i++) {
            if (售后新订单列表[i].devicename == devicename) {
                售后新订单列表.splice(i, 1);
                i--;
            }
        }
        RefreshMaterialInfo();
    };
});


/********************************** 上传图片 ****************************************/

function getUrl(fil, id) {
    //alert("图片类型：" + fil[0].type + "图片名称" + fil[0].name);
    var file = $("#" + id);
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

            var ImgHorW = 300;
            agoimg.onload = function () {
                //等比缩放
                var m = imgss.width / imgss.height;
                Cnv.height = ImgHorW;//该值影响缩放后图片的大小
                Cnv.width = ImgHorW * m;
                //img放入画布中
                //设置起始坐标，结束坐标
                Cntx.drawImage(agoimg, 0, 0, ImgHorW * m, ImgHorW);
                //获取canvas压缩后的图片数据
                var Pic = document.getElementById("myCanvas").toDataURL("image/jpeg");
                var img_temp = new Image();
                img_temp.src = Pic;
                var imgpic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");
                while (imgpic.length > 1024 * 1024 * 0.1) {
                    Cntx.clearRect(0, 0, ImgHorW * m, ImgHorW);
                    ImgHorW -= 50;
                    Cnv.height = ImgHorW;//该值影响缩放后图片的大小
                    Cnv.width = ImgHorW * m;
                    img_temp = new Image();
                    img_temp.src = Pic;
                    Cntx.drawImage(img_temp, 0, 0, ImgHorW * m, ImgHorW);
                    //获取canvas压缩后的图片数据
                    Pic = document.getElementById("myCanvas").toDataURL("image/jpeg");
                    imgpic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");
                }

                $('#mid > .module1 > .rows15 > .left').before('<div class="content"><img class="faqbillimg" alt="" src="' + Pic + '"></div>')
                var length = $('.faqbillimg').length;
                if (length >= 3) {
                    $('#addimg').hide();
                }
            }
        }
    }
}

$(document).on('tap', '#mid > .module1 > .rows15 > .left', function (e) {
    stopDefault(e);
    $('#imgfile').click();
});

$(document).on('tap', '#submitinfo2.contor', function (e) {
    stopDefault(e);

    var datas = new Array();
    var salesContent = $("#pageone > .module11 > .content");

    //for (var i = 0; i < salesContent.length; i++) {
    //    var equipment = $(salesContent[i]).attr("data-equipment");
    //    var questionkey = $(salesContent[i]).attr("data-questionkey");
    //    var questionvalue = $(salesContent[i]).attr("data-questionvalue");
    //    var devicename = $(salesContent[i]).attr("data-devicename");
    //    var factory = $(salesContent[i]).attr("data-factory");
    //    var hostversion = $(salesContent[i]).attr("data-hostversion");
    //    var lowerversion = $(salesContent[i]).attr("data-lowerversion");
    //    var question = $(salesContent[i]).attr("data-question");
    //    var parts = $(salesContent[i]).attr("data-parts");
    //    var fault = $(salesContent[i]).attr("data-fault");
    //    var cause = $(salesContent[i]).attr("data-cause");
    //    var treatment = $(salesContent[i]).attr("data-treatment");
    //    var breakdowndate = $(salesContent[i]).attr("data-breakdowndate");
    //    var base64 = $(salesContent[i]).attr("data-picture");
    //    var notify = $(salesContent[i]).attr("data-notify");


    //    data = {"equipment": equipment, "questionkey": questionkey, "questionvalue": questionvalue, "devicename": devicename, "factory": factory, "hostversion": hostversion, "lowerversion": lowerversion, "question": question, "parts": parts, "fault": fault, "cause": cause, "treatment": treatment, "breakdowndate": breakdowndate, "base64": base64, "notify": notify }
    //    datas.push(data);
    //}


    //var questionkey = $("")


    //var questionkey = $("#gratetype option:selected").val();
    //var questionvalue = $("#gratetype option:selected").text();
    //var equipment = $("#mid > .module1 > .rows4 > .box1 > .right input").val();
    //var devicename = $("#mid > .module1 > .rows2 > .box1 > .right input").val();
    //var factory = $("#mid > .module1 > .rows3 > .box2 > .right input").val();
    //var line = $("#mid > .module1 > .rows3 > .box1 > .right input").val();
    //var hostversion = $("#mid > .module1 > .rows5 > .box1 > .right input").val();
    //var lowerversion = $("#mid > .module1 > .rows5 > .box2 > .right input").val();
    //var question = $("#mid > .module1 > .rows1 > .box1 > .right input").val();
    //var parts = $("#mid > .module1 > .rows1 > .box2 > .right input").val();
    //var fault = $("#mid > .module1 > .rows7 > .box1 > .right input").val();
    //var cause = $("#mid > .module1 > .rows8 > .box1 > .right input").val();
    //var treatment = $("#mid > .module1 > .rows9 > .box1 > .right input").val();
    //var longmeasures = $("#mid > .module1 > .rows10 > .box1 > .right input").val();
    //var breakdowndate = $("#mid > .module1 > .rows12 > .box1 > .right input").val();
    //var username = $("#username").val();


    //var 明细 = new Array();
    //var obj = $('#personnelmodul > .mid > .rowslist');
    //for (var i = 0; i < obj.length; i++) {
    //    var 用户代码 = $(obj[i]).attr("data-usercode");
    //    var data = { "用户代码": 用户代码};
    //    明细.push(data);
    //}

    //if (equipment.length == 0) {
    //    alert("订单编号不能为空");
    //    return;
    //}

    //if (devicename.length == 0) {
    //    alert("订单名称不能为空");
    //    return;
    //}

    //var data = {
    //    "questionkey": questionkey, "questionvalue": questionvalue, "equipment": equipment, "devicename": devicename, "factory": factory,
    //    "hostversion": hostversion, "lowerversion": lowerversion, "question": question, "parts": parts, "fault": fault, "cause": cause, "treatment": treatment,
    //    "breakdowndate": breakdowndate, "usercode": usercode, "SpecifyUsers": 明细, "dealing": username,
    //};

    var username = $("#username").val();
    var usercode = $("#usercode").val();
    var data1 = { "username": username, "usercode": usercode, "datas": 售后新订单列表 }
    添加售后保修数据('IIS3380', '/SalesManage.aspx?action=AddNewSales', data1);
});

$(document).on('tap', '#submitinfo1', function (e) {
    stopDefault(e);
    var data = $("#mid > .module1 > .rows4 > .box1 > .right input").val();
    if ($('#submitinfo1').hasClass('contor')) {
        订单名称('IIS3380', '/SalesManage.aspx?action=getDeviceName', data);
    }
});

$(document).on('tap', '#mid > .module1 > .rows1 > .box3 > .right > .number', function (e) {
    stopDefault(e);

    $('#personnelmodul').addClass('contor');
    $('#mask300').addClass('contor');
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

$(document).on('change', '#gratetype', function (e) {
    stopDefault(e);
    var 问题类型 = $(this).val();
    if (问题类型 == 'b000005') {
        $('#personnelmodul').addClass('specified');
    } else {
        $('#personnelmodul').removeClass('specified');
    }

    var bcode = $("#gratetype option:selected").val();
    获取问题分类绑定的用户('IIS3380', '/NotifysalesPCManage.aspx?action=GetSpecifyUserList', bcode);
});

/*
   获取售后订单名称
*/
function 订单名称(urltype, pageurl, data) {

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
                if (data.data != null) {
                    $.each(data.data, function (idx, obj) {
                        hideLoading();
                        $("#mid > .module1 > .rows2 > .box1 > .right input").val(obj.productname);
                    });
                }

                //hideLoading();

                //$("#mid > .module1 > .rows2 > .box1 > .right input").val(data.productname);

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
   添加售后保修数据
*/
function 添加售后保修数据(urltype, pageurl, data1) {

    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": JSON.stringify(data1)
        },
        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            if (data.errcode == 0)//提取成功
            {
                hideLoading();
                location.reload();
                alert("提交成功");
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
                        content += '<div class="rowslist" data-usercode="' + obj.usercode + '">';
                        content += '<div class="content">';
                        content += '<img src="' + obj.headimgurl + '" />';
                        content += '<div class="username">' + obj.username + '(' + obj.usercode + ')' + '</div>';
                        content += '</div>';
                        content += '<div class="del"><i class="iconfont">&#xe623;</i></div>';
                        content += '</div>';
                    });
                }
                $('#mid > .module1 > .rows1 > .box3 > .right > .number').text(data.num);
                $('#personnelmodul > .mid').empty();
                $('#personnelmodul > .mid').append(content);
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
                        content += '<option value="' + obj.bcode + '">' + obj.classification + '</option>';
                    });
                }
                $('#gratetype').empty();
                $('#gratetype').append(content);
            }
            else//提取失败
            {
                hideLoading();
                alert(data.errmsg);
            }
        }
    });
}



function changepic() {
    var reads = new FileReader();
    f = document.getElementById('file').files[0];
    reads.readAsDataURL(f);
    reads.onload = function (e) {
        document.getElementById('img3').src = this.result;
        $("#img3").css("display", "block");
    };
}