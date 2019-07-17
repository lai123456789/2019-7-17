var 物料列表 = new Array();
var id = "http://192.168.1.104:3380";
var name = '';
$(function () {
    var 名称 = $('#Name').val();
    var 版本号 = $('#ImageNo').val();
    var 归类 = $('#Classified').val();
    var 需求数量 = $('#DemandNum').val();
    var 时间 = $('#Sysnotifydate').val();

    $('#infotype_dummy').val(归类);
    $('#mid > .module1 > .rows2 > .box1 > .right input').val(名称);
    $('#mid > .module1 > .rows3 > .box1 > .right input ').val(版本号);
    if (需求数量 == '') {
        需求数量 = 1;
    }
    $('#mid > .module1 > .rows1 > .box1 > .right .values').text(需求数量);
    $('#mid > .module1 > .rows1 > .box2 > .right input').val(时间);
});

$(document).on('tap', '#mid > .module1 > .rows1 > .box1 > .right .values', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    ShowKeyBoard($(this), '数量', '0', true, 0, 99999);
});


$(document).on('tap', '#addinfo > .materialinfo > .column2 > .right .values', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    ShowKeyBoard($(this), '数量', '0', true, 0, 99999);
});



$(document).on('tap', '#addmaterial', function (e) {
    stopDefault(e);
    $('input').blur();
    $('#addinfo').addClass('contor');
    $('#mask300').addClass('contor');
});

$(document).on('tap', '#mid > .module2 > .content > .infolist > .column4 > .left', function (e) {
    stopDefault(e);
    var obj = $(this).parents('.infolist');
    name = $(obj).find('.column1').text();

    for (var i = 0; i < 物料列表.length; i++) {
        if (物料列表[i].物料名称 == name) {
            $('#addinfo > .materialinfo > .column1 > .right textarea').val(物料列表[i].物料名称);
            $('#addinfo > .materialinfo > .column2 > .right .values').val(物料列表[i].数量);
            $('#materialtype_dummy').val(物料列表[i].类型);
        }
    }
    $('#addinfo').addClass('contor');
    $('#mask300').addClass('contor');
});

$(document).on('tap', '#addinfo > .materialinfo > .column4 > .left .values', function (e) {
    stopDefault(e);
    $('#addinfo').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
    $('#addinfo > .materialinfo > .column1 > .right textarea').val('');
});

$(document).on('tap', '#addinfo > .materialinfo > .column4 > .right .values', function (e) {
    stopDefault(e);

    if (name != '') {
        for (var i = 0; i < 物料列表.length; i++) {
            if (物料列表[i].物料名称 == name) {
                物料列表.splice(i, 1);
                i--;
            }
        }
    }

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
        for (var i = 0; i < 物料列表.length; i++)
        {
            if (物料列表[i].物料名称 == 物料名称)
            {
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
    for (var i = 0; i < 物料列表.length; i++)
    {
        var 物料名称 = 物料列表[i].物料名称;
        var 数量 = 物料列表[i].数量;
        var 类型 = 物料列表[i].类型;

        content += '<div class="infolist" data-name="' + 物料名称 + '">';
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
    $('#addinfo > .materialinfo > .column1 > .right textarea').val('');
}


//$(document).on('tap', '#submitinfo', function (e) {
//    stopDefault(e);
//    if ($('#submitinfo').hasClass('contor')) {  
//        var name = $('#mid > .module1 > .rows2 > .box1 > .right input').val();   
//        var type = $('#mid > .module1 > .rows3 > .box2 > .right input').val();     
//        var version = $('#mid > .module1 > .rows3 > .box1 > .right input').val();
//        selectDrawing(name, type, version);
//    }

//});

function getDrawing(name, num, type, archive, 明细, version, 流程单号, 图档号, 试制号, manager, Lading, Scenario, SubprocessNo, usercode, username) {
    var dataarr = { "name": name, "type": type, "version": version, "num": num, "archive": archive, "流程单号": 流程单号, "图档号": 图档号, "试制号": 试制号, "manager": manager, "Lading": Lading, "Scenario": Scenario, "SubprocessNo": SubprocessNo, "datas": 明细, "createusercode": usercode,"username":username };

    去重1('IIS3380', '/AdvanceOrder.aspx?action=addDrawing', dataarr, function () {
    });
}

function updateDrawing() {
    var 明细 = new Array();
    var obj = $('#mid > .module2 > .content > .infolist');
    var name = $('#mid > .module1 > .rows2 > .box1 > .right input').val();
    var num = $('#mid > .module1 > .rows1 > .box1 > .right ').text();
    var type = $('#mid > .module1 > .rows3 > .box2 > .right input').val();
    var archive = $('#mid > .module1 > .rows1 > .box2 > .right input ').val();
    var version = $('#mid > .module1 > .rows3 > .box1 > .right input').val();
    var 流程单号 = $('#ProcessNo').val();
    var 图档号 = $('#ImageNo').val();
    var 试制号 = $('#TrialNo').val();
    var usercode = $('#usercode').val();
    var username = $('#username').val();
    for (var i = 0; i < obj.length; i++) {
        var 名称 = $(obj[i]).find('.column1').text();
        var 数量 = $(obj[i]).find('.column2').text();
        var 类型 = $(obj[i]).find('.column3').text();
        var data = { "名称": 名称, "数量": 数量, "类型": 类型 };
        明细.push(data);
    }

    var dataarr = { "name": name, "type": type, "version": version, "num": num, "archive": archive, "流程单号": 流程单号, "图档号": 图档号, "试制号": 试制号, "username": username, "createusercode": usercode, "datas": 明细 };

    去重('IIS3380', '/AdvanceOrder.aspx?action=updateDrawing', dataarr, function () {
           
    });
}

function selectDrawing(name, type, version) {
    var 明细 = new Array();
    var obj = $('#mid > .module2 > .content > .infolist');
    var name = $('#mid > .module1 > .rows2 > .box1 > .right input').val();
    var num = $('#mid > .module1 > .rows1 > .box1 > .right ').text();
    var type = $('#mid > .module1 > .rows3 > .box2 > .right input').val();
    var archive = $('#mid > .module1 > .rows1 > .box2 > .right input ').val();
    var version = $('#mid > .module1 > .rows3 > .box1 > .right input').val();
    var 流程单号 = $('#ProcessNo').val();
    var 图档号 = $('#ImageNo').val();
    var 试制号 = $('#TrialNo').val();
    var manager = $('#PM').val();
    var Lading = $('#Lading').val();
    var Scenario = $('#Scenario').val();
    var SubprocessNo = $('#SubprocessNo').val();
    var usercode = $('#usercode').val();
    var username = $('#username').val();

    for (var i = 0; i < obj.length; i++) {
        var 名称 = $(obj[i]).find('.column1').text();
        var 数量 = $(obj[i]).find('.column2').text();
        var 类型 = $(obj[i]).find('.column3').text();
        var data = { "名称": 名称, "数量": 数量, "类型": 类型};
        明细.push(data);
    }

    getDrawing(name, num, type, archive, 明细, version, 流程单号, 图档号, 试制号, manager, Lading, Scenario, SubprocessNo, usercode,username);
}

$(document).on('tap', '#submitinfo.contor', function (e) {
    stopDefault(e);
    $('input').blur();
    var name = $('#mid > .module1 > .rows2 > .box1 > .right input').val();
    var type = $('#mid > .module1 > .rows3 > .box2 > .right input').val();
    var version = $('#mid > .module1 > .rows3 > .box1 > .right input').val();
    selectDrawing(name, type, version);
})



    /*
    恢复物料齐套数据
    */
function 去重(urltype, pageurl, data, func) {

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
                location.reload();
                alert("提交成功");
                //location.href = "home.aspx";
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
            "data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            if (data.errcode == 0) {
                hideLoading();
                location.reload();
                alert("提交成功");
            } else if (data.errcode == -2) {
                hideLoading();
                if (confirm("当前图纸设计已存在，确定覆盖吗？")) {
                    updateDrawing();
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