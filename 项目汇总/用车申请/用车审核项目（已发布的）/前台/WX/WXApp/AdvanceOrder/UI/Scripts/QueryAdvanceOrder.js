var 物料列表 = new Array();
var id = "http://192.168.1.104:3380";
$(function () {
    var 名称 = $('#Name').val();
    var 版本号 = $('#ImageNo').val();
    var 数量 = $('#DemandNum').val();
    var 订单类型 = $('#Scenario').val();
    var 图纸归档 = $('#ArchiveDate').val();

    $('#mid > .module1 > .rows2 > .box1 > .right input').val(名称);
    $('#mid > .module1 > .rows3 > .box1 > .right input').val(版本号);
    $('#mid > .module1 > .rows3 > .box2 > .right input').val(订单类型);
    $('#mid > .module1 > .rows1 > .box1 > .right input').val(数量);
    $('#mid > .module1 > .rows1 > .box2 > .right input').val(图纸归档);

    var pj = getQueryString("dcode");
    if (pj != null && pj != '') {
        GetPageListItem1(pj)
        GetPageListItem(pj);
    } else {
        GetPageListItem($('#drawingcode').val());
    }

});

$(document).on('tap', '#mid > .module1 > .rows1 > .box1 > .right .values', function (e) {
    stopDefault(e);
    ShowKeyBoard($(this), '数量', '0', true, 0, 99999);
});




$(document).on('tap', '#addinfo > .materialinfo > .column2 > .right .values', function (e) {
    stopDefault(e);
    ShowKeyBoard($(this), '数量', '0', true, 0, 99999);
});

$(document).on('tap', '#addmaterial', function (e) {
    stopDefault(e);
    $('input').blur();
    $('#addinfo').addClass('contor');
    $('#mask300').addClass('contor');
});


$(document).on('tap', '#addinfo > .materialinfo > .column4 > .left .values', function (e) {
    stopDefault(e);
    $('#addinfo').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
});

$(document).on('tap', '#addinfo > .materialinfo > .column4 > .right .values', function (e) {
    stopDefault(e);
    var 物料名称 = $('#addinfo > .materialinfo > .column1 > .right textarea').val();
    var 数量 = $('#addinfo > .materialinfo > .column2 > .right .values').text();
    var 类型 = $('#materialtype_dummy').val();

    if (物料名称 == null || 物料名称 == '') {
        alert('未输入物料名称');
        return;
    }

    var 是否存在 = false;
    for (var i = 0; i < 物料列表.length; i++) {
        if (物料列表[i].物料名称 == 物料名称) {
            是否存在 = true;
        }
    }

    if (是否存在) {
        if (confirm("当前物料名称已存在，确定覆盖吗？")) {
            for (var i = 0; i < 物料列表.length; i++) {
                if (物料列表[i].物料名称 == 物料名称) {
                    物料列表[i].数量 = 数量;
                    物料列表[i].类型 = 类型;
                }
            }
        }
    }
    else {
        物料列表.push({
            "物料名称": 物料名称,
            "数量": 数量,
            "类型": 类型
        });
    }
    RefreshMaterialInfo();
    $('#addinfo').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
});


$(document).on('tap', '#mid > .module2 > .content > .infolist > .column4 > .right', function (e) {
    stopDefault(e);
    var obj = $(this).parents('.infolist');
    var 物料名称 = $(obj).find('.column1').text();
    if (confirm("确定删除“" + 物料名称 + "”吗？")) {
        for (var i = 0; i < 物料列表.length; i++) {
            if (物料列表[i].物料名称 == 物料名称) {
                物料列表.splice(i, 1);
                i--;
            }
        }
        RefreshMaterialInfo();
    };
});

/*
刷新物料信息
*/
function RefreshMaterialInfo() {
    var content = '';
    if (物料列表.length > 0) {
        $('#submitinfo').addClass('contor');
    }
    else {
        $('#submitinfo').removeClass('contor');
    }
    for (var i = 0; i < 物料列表.length; i++) {
        var 物料名称 = 物料列表[i].物料名称;
        var 数量 = 物料列表[i].数量;
        var 类型 = 物料列表[i].类型;

        content += '<div class="infolist">';
        content += '    <div class="column1">' + 物料名称 + '</div>';
        content += '    <div class="column2">' + 数量 + '</div>';
        content += '    <div class="column3">' + 类型 + '</div>';
        content += '    <div class="column4">';
        content += '        <div class="left">';
        content += '            <i class="iconfont">&#xe655;</i>';
        content += '        </div>';
        content += '        <div class="right">';
        content += '            <i class="iconfont">&#xe623;</i>';
        content += '        </div>';
        content += '    </div>';
        content += '</div>';
    }
    $('#mid > .module2 > .content').empty();
    $('#mid > .module2 > .content').append(content);
}


$(document).on('tap', '#submitinfo.contor', function () {
    $('input').blur();
})

function GetPageListItem(data) {

    去重('IIS3380', '/AdvanceOrder.aspx?action=getADDDrawing', data);
}

function GetPageListItem1(data) {


    去重1('IIS3380', '/AdvanceOrder.aspx?action=getDrawingInfo', data, function () {

    });
}

/*
恢复物料齐套数据
*/
function 去重(urltype, pageurl, data) {
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

                    content += '<div class="infolist">';
                    content += '    <div class="column1">' + obj.describe + '</div>';
                    content += '    <div class="column2">' + obj.num + '</div>';
                    content += '    <div class="column3">' + obj.type + '</div>';
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
恢复物料齐套数据
*/
function 去重1(urltype, pageurl, data, func) {
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