//var page = 1;
//var onetype = "";
//var oneval = "";
//var usercode;
//$(document).on('tap', '#conditions > .dropdown', function () {
//    $('#conditions').toggleClass('contor');
//});

//$(document).on('tap', '#conditions > .left > .query', function () {
//    oneval = $('#oneval').val();
//    onetype = $('#onetype_dummy').val();
//    page = 1;
//    GetPageList();
//});

//$(document).on('tap', '#form_tb > tr > td', function () {
//    $(this).parents('tr').addClass('contor').siblings().removeClass('contor');
//    var len = $('#form_tb > tr.contor').length;
//    if (len > 0) {
//        var 处理人 = $('#form_tb > tr.contor > td.name').text();
//        $('#bottom_footer > .right > .box1').addClass('contor');
//        $('#bottom_footer > .right > .box2').addClass('contor');
//        if (处理人.length != 0) {
//            $('#bottom_footer > .right > .box1.contor').text("故障解除");
//        } if (处理人.length == 0) {
//            $('#bottom_footer > .right > .box1.contor').text("故障处理");
//        }
//    }
//});

//$(document).on('tap', '#datalist > .content > .column5', function () {
//    var len = $('#datalist > .content').length;
//    if (len > 0) {


//        if ($('#bottom_footer > .right > .box1.contor').text() == '故障解除') {

//            解除故障('IIS3380', '/SalesManage.aspx?action=updateSalesRemovedate', dataarr, function () {

//            });

//        }
//        if ($('#bottom_footer > .right > .box1.contor').text() == '故障处理') {

//        }
//    } else {
//        alert('未选中行');
//        return;
//    }
//});

//$(document).on("tap", "#datalist > .content > .column8", function (e) {
//    stopDefault(e);
//    var obj = $(this).parents('.content');
//    var dataarr = $(obj).find('.salescode').text();
//    var username = $("#username").val();
//    var usercode = $("#usercode").val();
//    var data = { "dealing": username, "usercode": usercode, "salescode": dataarr }
//    处理故障('IIS3380', '/SalesManage.aspx?action=updateSalesDealing', data, function () {

//    });
//});

//$(document).on("tap", "#datalist > .content > .column5", function (e) {
//    stopDefault(e);
//    var obj = $(this).parents('.content');
//    var dataarr = $(obj).find('.salescode').text();
//    解除故障('IIS3380', '/SalesManage.aspx?action=updateSalesRemovedate', dataarr, function () {

//    });
//});




//$(document).on('tap', '#bottom_footer > .right > .box2.contor', function () {
//    var len = $('#form_tb > tr.contor').length;

//    if (len > 0) {
//        var 售后保修代码 = $('#form_tb > tr.contor > td.salescode').text();
//        $('#salescode').val(售后保修代码);
//        $('#form_sales').submit();
//    } else {
//        alert('未选中行');
//        return;
//    }
//});



//$(function () {
//    GetPageList();
//})


//function AjaxFunc(总页数) {
//    var 当前加载页数 = $('#form_tb > tr').length;
//    $('#bottom_footer > .left > .box1').text(当前加载页数 + '/' + 总页数);

//}

//function GetPageList() {
//    if (page == 1) {
//        $('#form_tb').empty();
//    }

//    onetype = $("#onetype_dummy").val();
//    oneval = $("#oneval").val();

//    var dataarr = { "onetype": onetype, "oneval": oneval, "page": page };

//    订单状态信息('IIS3380', '/SalesManage.aspx?action=getProcessed', dataarr, function () {

//    });
//}

////---滑动到底部事件
//$(document).on("pageshow", "#maindiv", function () {
//    var start, end;
//    $('#maindiv').on("scrollstart", function (event) {
//        start = $('#maindiv').scrollTop();
//    })
//    $('#maindiv').on("scrollstop", function (event) {
//        end = $('#maindiv').scrollTop();

//        if ((end - start) >= 0) {
//            if (end >= $('#form_tb').height() - $('#maindiv').height() - 100) {
//                page++;
//                GetPageList()
//            }
//        }
//    })
//});

//$(document).on('tap', '#datalist > .content > .column4', function (e) {
//    stopDefault(e);
//    var obj = $(this).parents('.content');
//    var salescode = $(obj).find('.salescode').text();
//    $('#salescode').val(salescode);
//    $('#form_sales').submit();
//});


//$(document).on('tap', '#mid > .module2 > .content > .infolist > .column4 > .right', function (e) {
//    stopDefault(e);
//    var obj = $(this).parents('.infolist');
//    var 物料名称 = $(obj).find('.column1').text();
//    if (confirm("确定删除“" + 物料名称 + "”吗？")) {
//        for (var i = 0; i < 物料列表.length; i++) {
//            if (物料列表[i].物料名称 == 物料名称) {
//                物料列表.splice(i, 1);
//                i--;
//            }
//        }
//        RefreshMaterialInfo();
//    };
//});



//$(document).on('tap', '#datalist > .content > .column6', function (e) {
//    stopDefault(e);
//    var obj = $(this).parents('.content');
//    var salescode = $(obj).find('.salescode').text();
//    var username = $("#username").val();
//    var usercode = $("#usercode").val()

//    var data = { "dealing": username, "usercode": usercode, "salescode": salescode }
//    关闭故障('IIS3380', '/SalesManage.aspx?action=updateNewSalesDown', data, function () {

//    });

//});




////屏幕旋转
//window.addEventListener('resize', function () {
//    setTimeout(function () {
//    }, 300)
//});

///*
//    获取订单状态信息
//*/
//function 订单状态信息(urltype, pageurl, data, func) {
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
//            hideLoading();
//            if (data.errcode == 0) {
//                var pagecount = data.pagecount;
//                var 总页数 = data.totalnum
//                AjaxFunc(总页数);
//                if (page <= pagecount) {
//                    var content = '';
//                    if (data.data != null) {
//                        $.each(data.data, function (idx, obj) {
//                            hide_bottom();
//                            content += '<div class="content">';
//                            content += '<div class="column1">' + obj.订单名称 + '</div>';
//                            content += '<div class="column2">'
//                            content += '<div class="pj">' + obj.订单编号 + '</div>';
//                            content += '<div class="state">' + obj.状态 + '</div>';
//                            content += '</div>'
//                            content += '<div class="salescode" style="display:none;">' + obj.订单代码 + '</div>';
//                            content += '<div class="column3">'
//                            content += '<div class="username">' + obj.提单人 + '</div>';
//                            if (obj.处理人.length != 0) {
//                                content += '<div class="dealing">' + obj.处理人 + '</div>';
//                            } else {
//                                content += '<div class="dealing">' + "无处理人" + '</div>';
//                            }
//                            content += '</div>';

//                            content += '<div class="column4"><i class="iconfont" >&#xe655;</i></div>';
//                            if (obj.处理人.length != 0) {
//                                content += '<div class="column5"><i class="iconfont" >&#xe600;</i></div>';
//                            } else {
//                                content += '<div class="column8"><i class="iconfont" >&#xe614;</i></div>';
//                            }

//                            if (obj.提单人代码 == $('#usercode').val()) {
//                                content += '<div class="column6"><i class="iconfont" >&#xe69d;</i></div>';
//                            } else {
//                            }

//                            content += '</div>';
//                        });
//                    }
//                    else {
//                        A = $('#div_form_table');
//                        B = ' — 没有更多的订单啦 —';
//                        show_bottom(A, B);
//                    }
//                }
//                else {
//                    A = $('#div_form_table');
//                    B = ' — 没有更多的订单啦 —';
//                    show_bottom(A, B);
//                }
//                $('#datalist').append(content);
//            }
//            else {
//                alert(data.errmsg)
//            }
//        }
//    });
//}


///*
//    处理故障
//*/
//function 处理故障(urltype, pageurl, data, func) {
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
//            hideLoading();
//            if (data.errcode == 0) {
//                alert('故障处理开始')
//                location.reload();
//            }
//            else {
//                alert(data.errmsg)
//            }
//        }
//    });
//}

///*
//   关闭故障
//*/
//function 关闭故障(urltype, pageurl, data, func) {
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
//            hideLoading();
//            if (data.errcode == 0) {
//                alert('故障已关闭')
//                location.reload();
//            }
//            else {
//                alert(data.errmsg)
//            }
//        }
//    });
//}

///*
//    解除故障
//*/
//function 解除故障(urltype, pageurl, data, func) {
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
//            hideLoading();
//            if (data.errcode == 0) {
//                alert('解除故障提交成功')
//                location.reload();
//            }
//            else {
//                alert(data.errmsg)
//            }
//        }
//    });
//}

var page = 1;
var onetype = '';
var oneval;
var numbertype;
var datetype = '';
var pagesize = 10;
var data;
var startdate = '';
var enddate = '';
var pagecount;

$(function () {
    查看售后待处理('IIS3380', '/SalesManage.aspx?action=getProcessed', {
        "page": page,
        "onetype": onetype,
        "oneval": oneval,
        "numbertype": numbertype,
        "datetype": datetype,
        "pagesize": pagesize
    });
});

function GetPageList() {
    if (page == 1) {
        $('#div_form_table').empty();
    }

    查看售后待处理('IIS3380', '/SalesManage.aspx?action=getProcessed', {
        "page": page,
        "onetype": onetype,
        "oneval": oneval,
        "numbertype": numbertype,
        "datetype": datetype,
        "pagesize": pagesize,
        "enddate": enddate,
        "startdate": startdate
    });
}

$(document).on('tap', '#conditions > .left > .query', function (e) {
    stopDefault(e);
    onetype = $('#onetype_dummy').val();
    oneval = $('#oneval').val();
    page = 1;
    numbertype = $('#threetype_dummy').val();
    datetype = $('#twotype_dummy').val();
    startdate = $('#stardate').val();
    enddate = $('#enddate').val();
    GetPageList();
});


//屏幕旋转
window.addEventListener('resize', function () {
    setTimeout(function () {
    }, 300)
});


$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .left > .box3', function (e) {
    stopDefault(e);
    var 订单代码 = $(this).parents('.infolist').attr('data-salescode');
    var 处理人代码 = $(this).parents('.infolist').attr('data-dealingcode');
    var usercode = $("#usercode").val();
    var username = $("#username").val();

    if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box3').text() == "处理") {
        处理故障('IIS3380', '/SalesManage.aspx?action=updateSalesDealing', {
            "salescode": 订单代码,
            "usercode": usercode,
            "dealing": username
        });
    } else if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box3').text() == "解除") {
        if (usercode == 处理人代码) {
            解除故障('IIS3380', '/SalesManage.aspx?action=updateSalesRemovedate',订单代码);
        } else {
            alert("您不是处理人,只有处理人才能解除故障");
        }
    } else if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box3').text() == "关闭") {
        关闭故障('IIS3380', '/SalesManage.aspx?action=updateNewSalesDown', {
            "salescode": 订单代码
        });
    }
});

//点击图片
$(document).on('tap', '#div_form_table > .infolist > .maininfo > .detialImginfo > .rows1 > .img', function (e) {
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

//$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .left > .box1', function (e) {
//    stopDefault(e);
//    $(this).parents('.infolist').toggleClass('contor');
//});

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .detialinfo > .row4 > .right > .right', function (e) {
    stopDefault(e);
    $(this).parents('.infolist').find('.maininfo > .detialinfo > .row4 > .left > .right').text("查看")
    if ($(this).parents('.infolist').find('.maininfo > .detialinfo > .row4 > .right > .right').text() == "查看") {
        $(this).parents('.infolist.contor').find('.maininfo > .detialImginfo').addClass('contor');
        $(this).parents('.infolist').find('.maininfo > .detialinfo > .row4 > .right > .right').text("收起")
        var 订单代码 = $(this).parents('.infolist').attr('data-salescode');
        请求下单图片('IIS3380', '/SalesManage.aspx?action=GetImg', 订单代码, this);
    } else {
        $(this).parents('.infolist.contor').find('.maininfo > .detialImginfo').removeClass('contor');
        $(this).parents('.infolist').find('.maininfo > .detialinfo > .row4 > .right > .right').text("查看")
    }
});

//---滑动到底部事件
$(document).on("pageshow", "#maindiv", function () {
    var start, end;
    $('#maindiv').on("scrollstart", function (event) {
        start = $('#maindiv').scrollTop();
    })
    $('#maindiv').on("scrollstop", function (event) {
        if (page > pagecount) {
            return;
        }
        end = $('#maindiv').scrollTop();

        if ((end - start) >= 0) {
            if (end >= $('#div_form_table').height() - $('#maindiv').height() - 100) {
                page++;
                GetPageList();
            }
        }
    })
});

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .detialinfo > .row4 > .left > .right', function (e) {
    stopDefault(e);

    $(this).parents('.infolist').find('.maininfo > .detialinfo > .row4 > .right > .right').text("查看")

    if ($(this).parents('.infolist').find('.maininfo > .detialinfo > .row4 > .left > .right').text() == "查看") {
        $(this).parents('.infolist.contor').find('.maininfo > .detialImginfo').addClass('contor');
        $(this).parents('.infolist').find('.maininfo > .detialinfo > .row4 > .left > .right').text("收起")
        var 订单代码 = $(this).parents('.infolist').attr('data-salescode');
        请求处理图片('IIS3380', '/SalesManage.aspx?action=GetdealImg', 订单代码, this);
    } else {
        $(this).parents('.infolist.contor').find('.maininfo > .detialImginfo').removeClass('contor');
        $(this).parents('.infolist').find('.maininfo > .detialinfo > .row4 > .left > .right').text("查看")
    }
});

$(document).on('tap', '#conditions > .dropdown', function (e) {
    stopDefault(e);
    $('#conditions').toggleClass('contor');
});

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .left > .box1', function (e) {
    stopDefault(e);
    $(this).parents('.infolist.contor').find('.maininfo > .detialImginfo').removeClass('contor');
    $(this).parents('.infolist').toggleClass('contor');
    if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box1').text() == "展开") {
        
        $(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box1').text('收起');

        $(this).parents('.infolist').find('.maininfo > .detialinfo > .row4 > .right > .right').text("查看")
        $(this).parents('.infolist').find('.maininfo > .detialinfo > .row4 > .left > .right').text("查看")
    } else {
        
        $(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box1').text('展开');
    }
});

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .left > .box2', function (e) {
    stopDefault(e);
    var 订单代码 = $(this).parents('.infolist').attr('data-salescode');
    var dealusercode = $(this).parents('.infolist').attr('data-dealingcode');
    if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box2').text() == "编辑") {
        $('#salescode').val(订单代码);
        $('#dealusercode').val(dealusercode);
        $('#form_sales').submit();
    } else {
        var 订单代码 = $(this).parents('.infolist').attr('data-salescode');
        $('#salescode1').val(订单代码);
        $('#form_design1').submit();
    }
});

/*
 查看售后待处理
*/
function 查看售后待处理(urltype, pageurl, data) {
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
            var content = '';
            if (data.errcode == 0) {

                pagecount = data.pagecount;

                if (page <= pagecount) {
                    var content = '';
                    if (data.data != null) {
                        $.each(data.data, function (idx, obj) {

                            content += '<div class="infolist" data-salescode="' + obj.订单代码 + '" data-dealingcode="' + obj.处理人代码 + '">';
                            content += '    <div class="maininfo">';

                            content += '        <div class="rows1">';
                            content += '            <div class="box1">' + obj.订单名称 + '</div>';
                            content += '        </div>';
                            content += '        <div class="rows2">';
                            content += '           <div class="left">';
                            content += '               <div class="box1">' + obj.订单编号 + '</div>';
                            content += '               <div class="box2">提单人：' + obj.提单人 + '</div>';
                            content += '           </div>';
                            content += '           <div class="mid">';
                            content += '                <div class="box1">' + obj.问题分类 + '</div>';
                            content += '            </div>';
                            content += '               <div class="right">';
                            content += '                   <div class="box1">';
                            if (obj.故障解除时间.length != 0) {
                                content += '<div class="column3">' + "已处理" + '</div>';
                            } else if (obj.状态 == '未处理') {
                                content += '<div class="column4">' + "未处理" + '</div>';
                            } else {
                                content += '<div class="column2">' + "处理中" + '</div>';
                            }

                            content += '                    </div>';
                            content += '                   <div class="box2">';
                            content += '                        <div class="column2">厂区：' + obj.厂区 + '</div>';
                            content += '                     </div>';
                            content += '                </div>';
                            content += '           </div>';

                            content += '           <div class="detialinfo">';
                            content += '              <div class="row1">';
                            content += '                   <div class="right">配件需求：' + obj.配件需求 + '</div>';
                            content += '                   <div class="left">故障描述：' + obj.故障描述 + '</div>';
                            content += '               </div>';
                            content += '               <div class="row2">';
                            content += '                    <div class="right">处理措施：' + obj.处理措施 + '</div>';
                            content += '                    <div class="left">处理日期：' + obj.处理日期 + '</div>';
                            content += '               </div>';
                            content += '               <div class="row3">';
                            content += '                    <div class="right">处理人：' + obj.处理人 + '</div>';
                            content += '                    <div class="left">解除时间：' + obj.故障解除时间 + '</div>';
                            content += '               </div>';
                            content += '               <div class="row4">';
                            content += '                    <div class="right">';
                            content += '                        <div class="left">提单图片：</div>';
                            content += '                        <div class="right">查看</div>';
                            content += '                    </div>';
                            content += '                    <div class="left">';
                            content += '                        <div class="left">处理图片：</div>';
                            content += '                        <div class="right">查看</div>';
                            content += '                    </div>';
                            content += '               </div>';
                            content += '           </div>';


                            content += '<div class="detialImginfo">';
                            content += '<div class="rows1">';

                            content += '</div>';
                            content += '</div>';

                            content += '           <div class="rows3">';
                            content += '               <div class="left">';
                            content += '                    <div class="box1">展开</div>';
                            

                            if (obj.提单人代码 == $("#usercode").val()) {
                                content += '<div class="box3">关闭</div>';
                            } else if (obj.故障解除时间.length != 0) {

                            } else if (obj.状态 == '处理中') {
                                content += '<div class="box3">解除</div>';
                            } else if (obj.状态 == '未处理') {
                                content += '<div class="box3">处理</div>';
                            }

                            if (obj.提单人代码 == $("#usercode").val()) {
                                content += '<div class="box2">编辑</div>';
                            } else if (obj.处理人代码 == $("#usercode").val()) {
                                content += '<div class="box2">编辑</div>';
                            } else {
                                content += '<div class="box2">回复</div>';
                            }

                            content += '               </div>';
                            content += '               <div class="right">';
                            content += '                    <div class="box1">' + obj.创建时间 + '</div>';
                            content += '               </div>';
                            content += '           </div>';
                            content += '    </div>';
                            content += '</div>';
                        });
                    }
                    else {
                        A = $('#div_form_table');
                        B = ' — 没有更多的订单啦 —';
                        show_bottom(A, B);
                    }
                } else {
                    A = $('#div_form_table');
                    B = ' — 没有更多的订单啦 —';
                    show_bottom(A, B);
                }
                $('#div_form_table').append(content);
            }
            else {
                
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
    请求下单图片
*/
function 请求下单图片(urltype, pageurl, data,d) {
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
                $(d).parents('.infolist.contor').find('.maininfo > .detialImginfo > .rows1').empty();
                $(d).parents('.infolist.contor').find('.maininfo > .detialImginfo > .rows1').append(content);
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
function 请求处理图片(urltype, pageurl, data,d) {
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
                $(d).parents('.infolist.contor').find('.maininfo > .detialImginfo > .rows1').empty();
                $(d).parents('.infolist.contor').find('.maininfo > .detialImginfo > .rows1').append(content);
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
   关闭故障
*/
function 关闭故障(urltype, pageurl, data, func) {
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
                alert('故障已关闭')
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