var 全局搜索 = '';
var 全局页码 = 1;
$(function () {

})


/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});

/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    var title = $(this).parents('.panel-heading').find('.panel-title').text();
    $('#dlink').attr('data-name', title + '.xls');
    ExportExcel('form_table');
});





$(document).on('click', '#adduserinfo', function () {
    $("#AddUserModal > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal').modal('show')
});




$(document).on('click', '#add_isshow > .label.label-default', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});

$(document).on('click', '#set_isshow > .label.label-default', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});



$(document).on('click', '#form_tb > tr', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
    

    var 表名 = $(this).find('td').text();
    //ajax调用后台接口去获取权限，编辑表头，管理权，添加行权限
    var 管理权 = '是'
    var 编辑表头 = '是'
    var 添加 = '是';

    if (编辑表头 == '是') {
        $('#editexcel').removeClass('disabled');
        $('#editexcel').addClass('contor');
    } else {
        $('#editexcel').addClass('disabled');
        $('#editexcel').removeClass('contor');
    }

    if (管理权 == '是') {
        $('#usereditrows').removeClass('disabled');
        $('#userdelrows').removeClass('disabled');
    }
    else {
        $('#usereditrows').addClass('disabled');
        $('#userdelrows').addClass('disabled');
    }

    if (添加 == '是') {
        $('#useraddrows').removeClass('disabled');
    }
    else {
        $('#useraddrows').addClass('disabled');
    }

    
    if ($('#form_th2 > tr').length > 0)
    {
        $('#useraddrows').addClass('contor');
    }
    else
    {
        $('#useraddrows').removeClass('contor');
    }
});


$(document).on('click', '#editexcel', function () {
    if (!$(this).hasClass('disabled')) {
        $("#EditTableHead > .modal-dialog").draggable();//为模态对话框添加拖拽
        $("#EditTableHead").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
        $('#EditTableHead').modal('show');
    }
});


$(document).on('click', '.addtablehead i.fa', function () {
    $("#EditTableLink > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#EditTableLink").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#EditTableLink').modal('show');
    $('#columnsnum').val(1);
    $('#rowsnum').val(1);
    $('#columnsname').val('');
    $(this).parents('.addtablehead').addClass('contor');
    setTimeout(function () {
        $('#columnsname').focus();
    }, 500);
    
});




//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('#columnsname').is(':focus')) {
            $('#add_columnssure').click();
        }
    }
})


$(document).on('click', '#add_columnssure', function ()
{
    var 占列数 = $('#columnsnum').val();
    var 占行数 = $('#rowsnum').val();
    var 名称 = $('#columnsname').val();

    var 是否名称相等 = false;
    var th_obj = $('#th_tbhead > tr > th');
    for (var i = 0; i < th_obj.length; i++) {
        var 列名称 = $(th_obj[i]).text();
        if (列名称 == 名称) {
            是否名称相等 = true;
        }
    }
    if (是否名称相等) {
        alert('存在相同列名“' + 名称 + '”,请重新填写');
        return;
    }

    var obj = $('.addtablehead.contor').parents('tr');
    $('.addtablehead.contor').remove();
    var content = '<th class="columninfo" colspan="' + 占列数 + '" rowspan="' + 占行数 + '">' + 名称 + '</th>';
    content += '<th class="addtablehead">';
    content += '    <i class="fa fa-plus-square"></i>';
    content += '</th>';
    $(obj).append(content);
    
    var obj_next = $(obj).next();
    var len = $(obj_next).find('.addtablehead').length;
    if (len == 0) {
        var content1 = '<tr>';
        content1 += '<th class="addtablehead">';
        content1 += '    <i class="fa fa-plus-square"></i>';
        content1 += '</th>';
        content1 += '</tr>';
        $(obj).after(content1);
    }
    $('#EditTableLink').modal('hide');
});



$(document).on('click', '#th_tbhead > tr > th.columninfo', function () {
    $(this).toggleClass('contor');
    var len = $('#th_tbhead > tr > th.columninfo.contor').length;
    if (len > 0) {
        $('#EditTableHead .delcolumn').addClass('contor');
    } else {
        $('#EditTableHead .delcolumn').removeClass('contor');
    }
});


$(document).on('click', '#EditTableHead .delcolumn.contor', function () {
    var obj = $('#th_tbhead > tr > th.columninfo.contor');
    for (var i = 0; i < obj.length; i++) {
        $(obj[i]).remove();
    }
    var tr_obj = $('#th_tbhead > tr');
    for (var i = tr_obj.length - 1; i >= 0; i--) {
        var len = $(tr_obj[i]).find('.columninfo').length;
        if (len == 0) {
            $(tr_obj[i]).remove();
        }
    }
    var content1 = '<tr>';
    content1 += '<th class="addtablehead">';
    content1 += '    <i class="fa fa-plus-square"></i>';
    content1 += '</th>';
    content1 += '</tr>';
    $('#th_tbhead').append(content1);
});


$(document).on('click', '#add_tbhsure', function () {
    var 表头列表 = new Array();
    var obj = $('#th_tbhead > tr');
    for (var i = 0; i < obj.length; i++)
    {
        var tr_obj = $(obj[i]).find('.columninfo');
        var 行表头列表 = new Array();
        for (var j = 0; j < tr_obj.length; j++)
        {
            var data = {
                "当前行": i,
                "当前列": j,
                "占行数": parseFloat($(tr_obj[j]).attr('rowspan')),
                "占列数": parseFloat($(tr_obj[j]).attr('colspan')),
                "名称": $(tr_obj[j]).text()
            }
            行表头列表.push(data);
        }
        if (行表头列表.length > 0) {
            表头列表.push(行表头列表);
        }
    }

    填充表头(表头列表);
});


function 填充表头(表头数据对象)
{
    var content = '';
    if (表头数据对象 != null && 表头数据对象.length > 0) {
        for (var i = 0; i < 表头数据对象.length; i++) {
            content += '<tr>';
            for (var j = 0; j < 表头数据对象[i].length; j++) {
                var 占列数 = 表头数据对象[i][j].占列数;
                var 占行数 = 表头数据对象[i][j].占行数;
                var 名称 = 表头数据对象[i][j].名称;
                var 当前行 = 表头数据对象[i][j].当前行;
                var 当前列 = 表头数据对象[i][j].当前列;
                content += '<th colspan="' + 占列数 + '" rowspan="' + 占行数 + '">' + 名称 + '</th>';
            }
            content += '</tr>';
        }
        $('#form_th2').empty();
        $('#form_th2').append(content);
        $('#EditTableHead').modal('hide');

        $('#useraddrows').addClass('contor');
    }
    else {
        $('#form_th2').empty();
        $('#EditTableHead').modal('hide');

        $('#useraddrows').removeClass('contor');
    }
}



$(document).on('click', '#useraddrows.contor', function () {
    var 最终表身列表 = new Array();
    var tr_obj = $('#form_th2 > tr');
    for (var i = 0; i < tr_obj.length; i++) {
        var th_obj = $(tr_obj[i]).find('th');
        for (var j = 0; j < $(tr_obj[i]).find('th').length; j++) {
            var 占列数 = $(th_obj[j]).attr('colspan');
            var 占行数 = $(th_obj[j]).attr('rowspan');
            for (var a = 0; a < parseFloat(占行数) ; a++)
            {
                
                for (var b = 0; b < parseFloat(占列数) ; b++)
                {
                    var 行 = i + a;
                    var 列 = j + b;
                    while (验证行列是否存在对象(行, 列, 最终表身列表)) {
                        列 += 1;
                    }
                    var data = { "名称": $(th_obj[j]).text(), "行数": 行, "列数": 列 };
                    最终表身列表.push(data);
                }
            }
        }
    }

    填充单身格子(最终表身列表)
});


function 验证行列是否存在对象(行, 列, 对象) {
    var 是否存在 = false;
    for (var i = 0; i < 对象.length; i++) {
        if (对象[i].行数 == 行 && 对象[i].列数 == 列) {
            是否存在 = true;
        }
    }
    return 是否存在;
}

function 填充单身格子(数组) {
    var 最大列;
    var 填充列 = new Array();
    for (var i = 0; i < 数组.length; i++) {
        var 是否只更新 = false;
        for (var j = 0; j < 填充列.length; j++) {
            if (parseFloat(填充列[j].列数) == parseFloat(数组[i].列数)) {
                if (parseFloat(数组[i].行数) > parseFloat(填充列[j].行数)) {
                    填充列[j].行数 = 数组[i].行数;
                    填充列[j].名称 = 数组[i].名称;
                    是否只更新 = true;
                }
            }
        }
        
        if (是否只更新 == false) {
            var data = { "名称": 数组[i].名称, "行数": 数组[i].行数, "列数": 数组[i].列数 };
            填充列.push(data);
        }
    }

    var content = '';
    填充列.sort(sortId);
    
    var 开始填充 = new Array();
    if (填充列.length > 0) {
        var data = { "名称": 填充列[0].名称, "列数": 1 };
        开始填充.push(data);
        for (var i = 1; i < 填充列.length; i++) {
            var 是否存在 = false;
            for (var j = 0; j < 开始填充.length; j++) {
                if (开始填充[j].名称 == 填充列[i].名称) {
                    开始填充[j].列数 += 1;
                    是否存在 = true;
                }
            }
            if (是否存在 == false) {
                data = { "名称": 填充列[i].名称, "列数": 1 };
                开始填充.push(data);
            }
        }
    }
    content += '<tr>';
    for (var i = 0; i < 开始填充.length; i++) {
        content += '<td colspan="' + 开始填充[i].列数 + '" data-name="' + 开始填充[i].列数 + '">';
        content += '<input type="text" value="" />';
        content += '</td>';
    }
    content += '</tr>';
    $('#form_tb2').append(content);
}

function sortId(a, b) {
    return a.列数 - b.列数;
}

/************************************* Ajax *******************************************/




/************************************* Ajax End *******************************************/