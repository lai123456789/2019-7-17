
var page = 1, onetype = '', oneval = '', datetype = '', startdate = '', enddate = '', sortfield = '', sort = '', pickingcode = '';
var PORT = "IIS3380";
var URL = "AdvanceOrder.aspx?action=";

var 物料 = new Array();
var pj = "";
var 是否为审核人 = false;
$(function () {

    查看是否为备料审核人('IIS3380', '/AdvanceOrder.aspx?action=selectReviewer', {
        "usercode": $('#usercode').val()
    });

})


$(document).on('tap', '#mid > .module2 > .content > .infolist > .column0', function (e) {
    stopDefault(e);

    

    if ($(this).find('i.choice').hasClass('contor')) {
        $(this).find('i.choice').removeClass('contor');

        for (var i = 0; i < 物料.length; i++) {
                
            if (物料[i].mcode == $(this).attr('data-mcode')) {
                物料.splice(i, 1);
            }   
        }
        if (物料.length > 0) {
            $('#shenpi > .materialinfo > .column4 > .right .values').addClass('contor');
            $('#shenpi > .materialinfo > .column4 > .left .values').addClass('contor');
        } else {
            $('#shenpi > .materialinfo > .column4 > .right .values').removeClass('contor');
            $('#shenpi > .materialinfo > .column4 > .left .values').removeClass('contor');
        }
    } else {
        $(this).find('i.choice').addClass('contor');
        var data = { "mcode": $(this).attr('data-mcode'), "drawingcode": $(this).attr('data-drawingcode')};
        物料.push(data);
        if (物料.length > 0) {
            $('#shenpi > .materialinfo > .column4 > .right .values').addClass('contor');
            $('#shenpi > .materialinfo > .column4 > .left .values').addClass('contor');
        } else {
            $('#shenpi > .materialinfo > .column4 > .right .values').removeClass('contor');
            $('#shenpi > .materialinfo > .column4 > .left .values').removeClass('contor');
        }
    }
});



$(document).on('tap', '#shenpi > .materialinfo > .column4 > .right .values', function (e) {
    stopDefault(e);

    if ($(this).hasClass('contor')) {
        备料(PORT, URL + "AddYESMaterials", {
            "usercode": $('#usercode').val(),
            "materials": 物料
        });
    } 

});

$(document).on('tap', '#shenpi > .materialinfo > .column4 > .left .values', function (e) {
    stopDefault(e);

    if ($(this).hasClass('contor')) {
        $('#addinfo').addClass('contor');
        $('#mask300').addClass('contor');
    }

});

$(document).on('tap', '#addinfo > .materialinfo > .column4 > .left .values', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    $('#addinfo').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);

    $('#addinfo > .materialinfo > .column1 > .right textarea').val('');
});

//不备料确定
$(document).on('tap', '#addinfo > .materialinfo > .column4 > .right .values', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    var usercode = $('#usercode').val();
    var 关闭原因 = $('#addinfo > .materialinfo > .column1 > .right textarea').val();


    不备料(PORT, URL + "AddNOMaterials", {
        "usercode": $('#usercode').val(),
        "materials": 物料,
        "cause": 关闭原因
    });

    $('#addinfo > .materialinfo > .column1 > .right textarea').val('');
});


/*
    查询物料
*/
function 查询物料(urltype, pageurl, data) {
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
                var list = data.data;
                $.each(list, function (idx, obj) {

                    content += '<div class="infolist">';
                   
                    if (是否为审核人) {
                        if (obj.state == "1") {
                            content += '    <div class="column11" data-mcode="' + obj.mcode + '" data-drawingcode="' + obj.drawingcode + '">' + '' + '</div>';
                        } else if (obj.state == "0") {
                            content += '    <div class="column11" data-mcode="' + obj.mcode + '" data-drawingcode="' + obj.drawingcode + '">' + '' + '</div>';
                        } else {
                            content += '    <div class="column0" data-mcode="' + obj.mcode + '" data-drawingcode="' + obj.drawingcode + '">' + '<i class="iconfont choice">&#xe618;</i>' + '</div>';
                        }
                    } else {
                         content += '    <div class="column11" data-mcode="' + obj.mcode + '" data-drawingcode="' + obj.drawingcode + '">' + '' + '</div>';
                    }

                    

                    content += '    <div class="column1">' + obj.materialsname + '</div>';
                    content += '    <div class="column2">' + obj.materialsnumber + '</div>';
                    if (obj.state == "1") {
                        content += '    <div class="column3">' + "不备料" + '</div>';
                    } else if (obj.state == "0") {
                        content += '    <div class="column3">' + "备料" + '</div>';
                    } else {
                        content += '    <div class="column3">' + "待审核" + '</div>';
                    }
                    
                    content += '</div>';

                });
                $('#mid > .module2 > .content').empty();
                $('#mid > .module2 > .content').append(content);
            }
            else {
                if (data.errcode == -2) {

                } else {
                    alert(data.errmsg);
                }
            }
        }
    });
}

/*
 查询图纸
*/
function 查询图纸(urltype, pageurl, data) {
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
                    $('#mid > .module1 > .rows2 > .box1 > .right input').val(obj.specifications);
                    $('#mid > .module1 > .rows3 > .box1 > .right input').val(obj.imagenum);
                    $('#mid > .module1 > .rows3 > .box2 > .right input').val(obj.classified);
                    $('#mid > .module1 > .rows1 > .box1 > .right input').val(obj.demandednumber);
                    $('#mid > .module1 > .rows1 > .box2 > .right input').val(obj.notificationdate);
                });
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}

/*
 备料
*/
function 备料(urltype, pageurl, data) {
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
                物料 = new Array();
                $('#shenpi > .materialinfo > .column4 > .right .values').removeClass('contor');
                $('#shenpi > .materialinfo > .column4 > .left .values').removeClass('contor');
                查询物料(PORT, URL + "selectMaterials", {
                    "drawingcode": pj
                });
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}

/*
 不备料
*/
function 不备料(urltype, pageurl, data) {
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
                物料 = new Array();
                $('#shenpi > .materialinfo > .column4 > .right .values').removeClass('contor');
                $('#shenpi > .materialinfo > .column4 > .left .values').removeClass('contor');
                查询物料(PORT, URL + "selectMaterials", {
                    "drawingcode": pj
                });
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}


/*
查看是否为备料审核人
*/
function 查看是否为备料审核人(urltype, pageurl, data, func) {
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
                是否为审核人 = true;
                pj = getQueryString("dcode");

                if (pj != null && pj != '') {
                    查询图纸(PORT, URL + "getDrawingInfo", pj);
                    查询物料(PORT, URL + "selectMaterials", {
                        "drawingcode": pj
                    });
                } else {
                    pj = $('#drawingcode').val();

                    查询图纸(PORT, URL + "getDrawingInfo", pj);
                    查询物料(PORT, URL + "selectMaterials", {
                        "drawingcode": pj
                    });
                }

            } else if (data.errcode == 2) {
                $('#shenpi').css('display', 'none');
                pj = getQueryString("dcode");

                if (pj != null && pj != '') {
                    查询图纸(PORT, URL + "getDrawingInfo", pj);
                    查询物料(PORT, URL + "selectMaterials", {
                        "drawingcode": pj
                    });
                } else {
                    pj = $('#drawingcode').val();

                    查询图纸(PORT, URL + "getDrawingInfo", pj);
                    查询物料(PORT, URL + "selectMaterials", {
                        "drawingcode": pj
                    });
                }

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}
