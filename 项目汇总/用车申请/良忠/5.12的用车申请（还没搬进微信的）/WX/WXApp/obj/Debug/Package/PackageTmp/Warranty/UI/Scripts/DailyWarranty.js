var 待提交列表 = new Array();
var 推送人员 = new Array();
var pj = '';
var page = 1;
var onetype = '';
var oneval;
var codes = '';
var 选择的用户 = new Array();
var shangcodes = new Array();

//展开明细
$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .box3', function (e) {
    stopDefault(e);
    $(this).parents('.infolist').toggleClass('contor');
});

//点击选中列表
$(document).on('tap', '#div_form_table > .infolist', function (e) {
    stopDefault(e);
    var point = e.srcElement || e.target;
    if ($(point).closest('.maininfo > .rows2 > .mid > .box1').length == 0 && $(point).closest('.maininfo > .rows3 > .box3').length == 0 && $(point).closest('.detialinfo > .rows1').length == 0) {

        $(this).addClass('select').siblings().removeClass('select');
        var len = $('#div_form_table > .infolist.select').length;
        if (len > 0) {
            $('#bottom_footer > .mid2 > .box1').addClass('contor');
            $('#bottom_footer > .mid > .box1').addClass('contor');
        }
    }
});

////点击查看推送人员
//$(document).on('tap', '#pagethree > .content > .row1 > .box3', function (e) {
//    stopDefault(e);

//    var theme = "ios";
//    var mode = "scroller";
//    var display = "bottom";
//    var lang = "zh";
//    $('#modulestatus').mobiscroll().select({
//        theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
//        mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
//        display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
//        lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
//        label: '推送人员'
//    });
//    setTimeout(function () {
//        $('#modulestatus_dummy').click();
//    }, 350);
//});

//点击查看名称
//$(document).on('tap', '#pagethree > .content > .row1 > .box3', function (e) {
//    stopDefault(e);
//    var pj = $('#pagethree > .content > .row1 > .box2 input').val().substr(0,6);

//    获取名称('IIS3380', '/SalesManage.aspx?action=GetState', pj);
//});

//点击查看JP
//$(document).on('tap', '#pagethree > .content > .row2 > .box3', function (e) {
//    stopDefault(e);
//    var name = $('#pagethree > .content > .row1 > .box2 input').val();
//    获取PJ('IIS3380', '/SalesManage.aspx?action=GetStateName', name);
//});

//点击图片
$(document).on('tap', '#div_form_table > .infolist > .detialinfo > .rows1 > .img', function (e) {
    stopDefault(e);
    var src = $(this).find('img').attr('src');
    $('#pagetwo > .img > img').attr('src', src);
    $.mobile.changePage("#pagetwo");
});

//展示图片页点击后退
$(document).on('tap', '#pagetwo > .bottom_footer > .resultbtn > .box1.contor', function (e) {
    stopDefault(e);
    history.go(-1);
});

//设备编号大于六位调用
function wordStatic(input) {
    if ($("#pagethree > .content > .row1 > .box2 input").val().length > 5) {
        $('#pagethree').addClass('contor');
    }
    else {
        $('#pagethree').removeClass('contor');
    }
}

//搜索名称不为空调用
function nameAndAccode(input) {
    if ($("#pagefour > .searchfather > .search input").val().length != 0) {
        $('#pagefour >.searchfather > .searchiconfont').addClass('contor');
    }
    else {
        $('#pagefour >.searchfather > .searchiconfont').removeClass('contor');
    }
}

//设备名称不为空调用
function nameStatic(input) {
    if ($("#pagethree > .content > .row2 > .box2 input").val().length != 0) {
        $('#pagethree').addClass('contor1');
    }
    else {
        $('#pagethree').removeClass('contor1');
    }
}

//屏幕旋转
window.addEventListener('resize', function () {
    setTimeout(function () {
    }, 300)
});

//---滑动到底部事件
//$(document).on("pageshow", "#pagefour", function () {
//    var start, end;
//    $('#pagefour').on("scrollstart", function (event) {
//        start = $('#pagefour').scrollTop();
//    })
//    $('#pagefour').on("scrollstop", function (event) {
//        //if (page > pagecount) {
//        //    return;
//        //}
//        end = $('#pagefour').scrollTop();

//        if ((end - start) >= 0) {
//            if (end >= $('#pagefour').height() - $('#pagefour').height() - 100) {
//                page++;
//                GetPageList();
//            }
//        }
//    })
//});

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

$(document).on('tap', '#pagethree > .content > .row1 > .box3', function (e) {
    stopDefault(e);
    var pj = $('#pagethree > .content > .row1 > .box2 input').val().substr(0, 6);
    if ($('#pagethree').hasClass('contor')) {
        获取名称('IIS3380', '/SalesManage.aspx?action=GetState', pj);
    } else {
        alert("输入的编号要大于五位");
    }
});

//$(document).on('tap', '#pagefour > .titles > .title1.contor', function (e) {
//    stopDefault(e);

//    if ($(this).text() == "推送人员") {
//        var bcode = $("#gratetype option:selected").val();
//        获取问题分类绑定的用户('IIS3380', '/NotifysalesPCManage.aspx?action=GetSpecifyUserList', bcode);
//    } else if ($(this).text() == "抄送人员") {
//        获取用户('IIS3380', '/NotifysalesPCManage.aspx?action=GetUserList', {
//            "page": page,
//            "onetype": onetype,
//            "oneval": oneval
//        });
//    }

//});

$(document).on('tap', '#conditions > .dropdown', function (e) {
    stopDefault(e);
    $('#conditions').toggleClass('contor');
});

$(document).on('tap', '#pagethree > .content > .row2 > .box3', function (e) {
    stopDefault(e);

    var name = $('#pagethree > .content > .row1 > .box2 input').val();
    if ($('#pagethree').hasClass('contor1')) {
        获取PJ('IIS3380', '/SalesManage.aspx?action=GetStateName', name);
    } else {
        alert("名称不能为空");
    }
});

//点击添加按钮
$(document).on('tap', '#bottom_footer > .left > .box1.contor', function (e) {
    stopDefault(e);
    $.mobile.changePage("#pagethree");
    $('#gratetype_dummy').val($("#gratetype option:selected").text());
    var bcode = $("#gratetype option:selected").val();
    获取问题分类绑定的用户('IIS3380', '/NotifysalesPCManage.aspx?action=GetSpecifyUserList', bcode);

});

$(document).on('tap', '#pagethree > .bottom_footer > .left > .box1.contor', function (e) {
    stopDefault(e);
    $.mobile.changePage("#maindiv");
    $('#pagethree > .content > .row1 > .box2 input').val('');
    $('#pagethree > .content > .row2 > .box2 input').val('');
    $('#pagethree > .content > .row5 > .box2 textarea').val('');
    $('#pagethree > .content > .row6 > .box2 textarea').val('');
    $('#pagethree > .content > .row7 > .box2 textarea').val('');
    $('#pagethree > .content > .row9 > .box2 > .img').remove();
    $('#gratetype_dummy').val($("#gratetype option:selected").text());
    var bcode = $("#gratetype option:selected").val();
    获取问题分类绑定的用户('IIS3380', '/NotifysalesPCManage.aspx?action=GetSpecifyUserList', bcode);
    $('#pagethree').removeClass('contor1');
    $('#pagethree').removeClass('contor');
});

$(document).on('tap', '#pagethree > .bottom_footer > .right > .box1.contor', function (e) {
    stopDefault(e);

    if (pj != '') {
        for (var i = 0; i < 待提交列表.length; i++) {
            if (待提交列表[i].equipment == pj) {
                待提交列表.splice(i, 1);
                i--;
            }
        }
    }

    var questionkey = $("#gratetype option:selected").val();
    var 问题分类 = $("#gratetype option:selected").text();

    var PJ = $('#pagethree > .content > .row1 > .box2 input').val();
    var 名称 = $('#pagethree > .content > .row2 > .box2 input').val();
    var 厂区 = $('#pagethree > .content > .row3 > .box2 input').val();
    var 配件需求 = $('#pagethree > .content > .row5 > .box2 textarea').val();
    var 故障描述 = $('#pagethree > .content > .row6 > .box2 textarea').val();
    var 处理措施 = $('#pagethree > .content > .row7 > .box2 textarea').val();
    var 故障日期 = $('#pagethree > .content > .row8 > .box2 input').val();

    if (PJ.length == 0) {
        alert("订单编号不能为空");
        return;
    }

    if (名称.length == 0) {
        alert("订单名称不能为空");
        return;
    }

    var 图片数组 = new Array();
    var img_obj = $('#pagethree > .content > .row9 > .box2 > .img');
    for (var i = 0; i < img_obj.length; i++) {
        var imgArr = { "base64": $(img_obj[i]).find('img').attr('src') }
        图片数组.push(imgArr);
    }

    var 是否存在 = false;
    for (var i = 0; i < 待提交列表.length; i++) {
        if (待提交列表[i].equipment == PJ) {
            是否存在 = true;
        }
    }

    if (codes != 'b000005') {
        var obj = $('#pagefour > .content > .infolist');
        for (var i = 0; i < obj.length; i++) {
            var 用户代码 = $(obj[i]).attr("data-usercode");
            var data1 = { "用户代码": 用户代码, "state": "0" };
            推送人员.push(data1);
        }
    }



    if (是否存在) {
        if (confirm("当前售后订单已存在，确定覆盖吗？")) {
            for (var i = 0; i < 待提交列表.length; i++) {
                if (待提交列表[i].equipment == PJ) {
                    待提交列表[i].equipment = PJ;
                    待提交列表[i].devicename = 名称;
                    待提交列表[i].questionvalue = 问题分类;
                    待提交列表[i].breakdowndate = 故障日期;
                    待提交列表[i].factory = 厂区;
                    待提交列表[i].base64 = 图片数组;
                }
            }
        }
    }
    else {
        var data = {
            "equipment": PJ,
            "devicename": 名称,
            "factory": 厂区,
            "questionvalue": 问题分类,
            "questionkey": questionkey,
            "notify": 推送人员,
            "parts": 配件需求,
            "fault": 故障描述,
            "treatment": 处理措施,
            "breakdowndate": 故障日期,
            "base64": 图片数组,
        };
        待提交列表.push(data);
    }
    RefreshMaterialInfo();
    $('#pagethree').removeClass('contor1');
    $('#pagethree').removeClass('contor');
    $.mobile.changePage("#maindiv");
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



//判断对象是否相等
function isObjectValueEqual(a, b) {

    //取对象a和b的属性名

    var aProps = Object.getOwnPropertyNames(a);

    var bProps = Object.getOwnPropertyNames(b);

    //判断属性名的length是否一致

    if (aProps.length != bProps.length) {

        return false;

    }

    //循环取出属性名，再判断属性值是否一致

    for (var i = 0; i < aProps.length; i++) {

        var propName = aProps[i];

        if (a[propName] !== b[propName]) {

            return false;

        }

    }

    return true;

}


$(document).on('tap', '#bottom_footer > .mid > .box1.contor', function (e) {
    stopDefault(e);
    $.mobile.changePage("#pagethree");
    pj = $('#div_form_table > .infolist.select').attr("data-name");
    for (var i = 0; i < 待提交列表.length; i++) {
        if (待提交列表[i].equipment == pj) {
            $('#pagethree > .content > .row1 > .box2 input').val(待提交列表[i].equipment);
            $('#pagethree > .content > .row2 > .box2 input').val(待提交列表[i].devicename);
            $('#pagethree > .content > .row3 > .box2 input').val(待提交列表[i].factory);
            $('#gratetype_dummy').val(待提交列表[i].questionvalue);
            $('#pagethree > .content > .row5 > .box2 textarea').val(待提交列表[i].parts);
            $('#pagethree > .content > .row6 > .box2 textarea').val(待提交列表[i].fault);
            $('#pagethree > .content > .row7 > .box2 textarea').val(待提交列表[i].treatment);
            $('#pagethree > .content > .row8 > .box2 input').val(待提交列表[i].breakdowndate);
            var 图片数组 = 待提交列表[i].base64
            var content = '';
            for (var i = 0; i < 图片数组.length; i++) {
                content += '<div class="img">';
                content += '    <img src="' + 图片数组[i].base64 + '" />';
                content += '</div>';
            }

            $('#pagethree > .content > .row9 > .box2 > .addimg').before(content);
        }
    }
});



$(document).on('change', '#gratetype', function (e) {
    stopDefault(e);
    var 问题类型 = $(this).val();
    if (问题类型 == 'b000005') {
        $('#pagefour').addClass('specified');
    } else {
        $('#pagefour').removeClass('specified');
    }

    var bcode = $("#gratetype option:selected").val();
    获取问题分类绑定的用户('IIS3380', '/NotifysalesPCManage.aspx?action=GetSpecifyUserList', bcode);
});

$(document).on('change', '#modulestatus', function (e) {
    stopDefault(e);
    var name = $('#modulestatus_dummy').val();
    $('#pagethree > .content > .row2 > .box2 input').val(name);
});

$(document).on('change', '#modulestatus1', function (e) {
    stopDefault(e);
    var pj = $('#modulestatus1_dummy').val();
    $('#pagethree > .content > .row1 > .box2 input').val(pj);
});

$(document).on('tap', '#bottom_footer > .mid2 > .box1.contor', function (e) {
    stopDefault(e);
    var len = $('#div_form_table > .infolist.select').length;
    if (len > 0) {
        var obj = $(this).parents('.content');
        var devicename = $('#div_form_table > .infolist.select').find('.maininfo > .rows1 > .box1').text();
        if (confirm("确定删除“" + devicename + "”吗？")) {
            for (var i = 0; i < 待提交列表.length; i++) {
                if (待提交列表[i].devicename == devicename) {
                    待提交列表.splice(i, 1);
                    i--;
                }
            }
            RefreshMaterialInfo();
        };
    } else {
        alert('未选中行');
        return;
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

/*
刷新售后订单类表
*/
function RefreshMaterialInfo() {

    var content = '';
    if (待提交列表.length > 0) {
        $('#bottom_footer > .right > .box1').addClass('contor');
    }
    else {
        $('#bottom_footer > .right > .box1').removeClass('contor');
    }

    var len = $('#div_form_table > .infolist.select').length;
    if (len > 0) {
        $('#bottom_footer > .mid2 > .box1').removeClass('contor');
        $('#bottom_footer > .mid > .box1').removeClass('contor');
    }

    for (var i = 0; i < 待提交列表.length; i++) {
        var 设备编号 = 待提交列表[i].equipment;
        var 设备名称 = 待提交列表[i].devicename;
        var 问题分类 = 待提交列表[i].questionvalue;
        var 故障日期 = 待提交列表[i].breakdowndate;
        var fault = 待提交列表[i].fault;
        var factory = 待提交列表[i].factory;
        var 图片数组 = 待提交列表[i].base64;

        content += '<div class="infolist" data-name="' + 设备编号 + '">';
        content += '<div class="maininfo">';
        content += '<div class="rows1">'
        content += '<div class="box1">' + 设备名称 + '</div>';
        content += '</div>';
        content += '<div class="rows2">'
        content += '<div class="left">'
        content += '<div class="box1">' + 设备编号 + '</div>';
        content += '<div class="box1">' + factory + '</div>';
        content += '</div>';

        content += '<div class="mid">';
        content += '<div class="box1">' + 问题分类 + '</div>';
        content += '</div>';
        content += '<div class="right">';
        content += '<div class="box1">' + 故障日期 + '</div>';
        content += '</div>';
        content += '</div>';
        content += '<div class="rows3">';
        content += '<div class="box1">' + fault + '</div>';
        content += '<div class="box3">';
        content += '<i class="iconfont">&#xe784;</i>';
        content += '</div>';
        content += '</div>';
        content += '</div>';
        content += '<div class="detialinfo">';
        content += '<div class="rows1">';

        for (var j = 0; j < 图片数组.length; j++) {
            content += '<div class="img">';
            content += '<img src="' + 图片数组[j].base64 + '" />';
            content += '</div>';
        }

        content += '</div>';
        content += '</div>';
        content += '</div>';
    }
    $('#div_form_table').empty();
    $('#div_form_table').append(content);

    $('#pagethree > .content > .row1 > .box2 input').val('');
    $('#pagethree > .content > .row2 > .box2 input').val('');
    $('#pagethree > .content > .row5 > .box2 textarea').val('');
    $('#pagethree > .content > .row6 > .box2 textarea').val('');
    $('#pagethree > .content > .row7 > .box2 textarea').val('');
    $('#pagethree > .content > .row9 > .box2 > .img').remove();

}

$(document).on('tap', '#bottom_footer > .right > .box1.contor', function (e) {
    stopDefault(e);

    var datas = new Array();

    var username = $("#username").val();
    var usercode = $("#usercode").val();
    var data1 = { "username": username, "usercode": usercode, "datas": 待提交列表 }
    添加售后保修数据('IIS3380', '/SalesManage.aspx?action=AddNewSales11', data1);
});

$(document).on('tap', '#pagethree > .content > .row4 > .right > .box2 input', function (e) {
    stopDefault(e);

    var bcode = $("#gratetype option:selected").val();
    codes = $("#gratetype option:selected").val();
    获取问题分类绑定的用户('IIS3380', '/NotifysalesPCManage.aspx?action=GetSpecifyUserList', bcode);

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

/*
点击上传图片
*/
$(document).on('tap', '#pagethree > .content > .row9 > .box2 > .addimg.contor', function (e) {
    stopDefault(e);
    $('#imgfile').click();
});

$(function () {
    获取问题分类('IIS3380', '/NotifysalesPCManage.aspx?action=GetQuestion', {});
});




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
                hideLoading();
                return;
            }
        }
        else {
            alert('不允许上传非图片格式的图片');

            file.after(file.clone().val(""));
            file.remove();
            hideLoading();
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
                while (imgpic.length > 1024 * 1024 * 0.5) {
                    Cntx.clearRect(0, 0, ImgHorW * m, ImgHorW);
                    ImgHorW -= 100;
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
                } else if (!$('#pagethree > .content > .row9 > .box2 > .addimg').hasClass('contor')) {
                    $('#pagethree > .content > .row9 > .box2 > .addimg').addClass('contor');
                }
                $("#" + id).val('');
                hideLoading();
            }
        }
    }
}

$(document).on('tap', '#pagethree > .content > .row4 > .right > .box2 input', function (e) {
    stopDefault(e);
    $('#personnelmodul').addClass('contor');
    $('#mask300').addClass('contor');
});

$(document).on('tap', '#pagefour > .queding', function (e) {
    stopDefault(e);
    history.go(-1);
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


$(document).on('tap', '#pagefive > .bottom_footer > .resultbtn > .box1.contor', function (e) {
    stopDefault(e);
    history.go(-1);
});



$(document).on('tap', '#pagethree > .content > .row9 > .box2 > .img', function (e) {
    stopDefault(e);
    var img = $(this).find('img').attr('src');
    var index = $(this).index();
    $('#pagefive > .img img').attr('src', img);
    $('#pagefive > .bottom_footer > .resultbtn > .box2.contor').attr('data-index', index);
    $.mobile.changePage("#pagefive");
});


$(document).on('tap', '#pagefive > .bottom_footer > .resultbtn > .box2.contor', function (e) {
    stopDefault(e);
    var index = $(this).attr('data-index');
    $('#pagethree > .content > .row9 > .box2 > .img:eq(' + index + ')').remove();
    var length = $('#pagethree > .content > .row9 > .box2 > .img').length;
    if (length >= 5) {
        $('#pagethree > .content > .row9 > .box2 > .addimg').removeClass('contor');
    } else if (!$('#pagethree > .content > .row9 > .box2 > .addimg').hasClass('contor')) {
        $('#pagethree > .content > .row9 > .box2 > .addimg').addClass('contor');
    }
    $.mobile.changePage("#pagethree");
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

                        //content += '<div class="content">';
                        //content += '<img src="' + obj.headimgurl + '" />';
                        //content += '<div class="username">' + obj.username + '(' + obj.usercode + ')' + '</div>';
                        //content += '</div>';
                        //content += '<div class="del"><i class="iconfont">&#xe623;</i></div>';
                        //content += '</div>';
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
   获取名称
*/
function 获取名称(urltype, pageurl, data) {

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
                        //content += '<option value="' + obj.productname + '">' + obj.productname + '</option>';
                        $('#pagethree > .content > .row2 > .box2 input').val('');
                        $('#pagethree > .content > .row2 > .box2 input').val(obj.productname);
                    });

                    if ($("#pagethree > .content > .row2 > .box2 input").val().length != 0) {
                        $('#pagethree').addClass('contor1');
                    }
                    else {
                        $('#pagethree').removeClass('contor1');
                    }
                }

                //$('#modulestatus').empty();
                //$('#modulestatus').append(content);

                //var theme = "ios";
                //var mode = "scroller";
                //var display = "bottom";
                //var lang = "zh";
                //$('#modulestatus').mobiscroll().select({
                //    theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
                //    mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
                //    display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
                //    lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
                //    label: '名称'
                //});
                //setTimeout(function () {
                //    $('#modulestatus_dummy').click();
                //}, 350);


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
   获取PJ
*/
function 获取PJ(urltype, pageurl, data) {

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
                        $('#pagethree > .content > .row1 > .box2 input').val('');
                        //content += '<option value="' + obj.pj + '">' + obj.pj + '</option>';
                        $('#pagethree > .content > .row1 > .box2 input').val(obj.pj);
                    });

                    if ($("#pagethree > .content > .row1 > .box2 input").val().length > 5) {
                        $('#pagethree').addClass('contor');
                    }
                    else {
                        $('#pagethree').removeClass('contor');
                    }


                    //if ($('#pagethree').hasClass('contor')) {
                    //    获取名称('IIS3380', '/SalesManage.aspx?action=GetState', pj);
                    //} else {
                    //    alert("输入的编号要大于五位");
                    //}
                }

                //$('#modulestatus1').empty();
                //$('#modulestatus1').append(content);

                //var theme = "ios";
                //var mode = "scroller";
                //var display = "bottom";
                //var lang = "zh";
                //$('#modulestatus1').mobiscroll().select({
                //    theme: theme,     // Specify theme like: theme: 'ios' or omit setting to use default
                //    mode: mode,       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
                //    display: display, // Specify display mode like: display: 'bottom' or omit setting to use default
                //    lang: lang,        // Specify language like: lang: 'pl' or omit setting to use default
                //    label: '名称'
                //});
                //setTimeout(function () {
                //    $('#modulestatus1_dummy').click();
                //}, 350);


            }
            else//提取失败
            {
                hideLoading();
                alert(data.errmsg);
            }
        }
    });
}