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
    $("#modalDialog").draggable();//为模态对话框添加拖拽
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
    $('#editexcel').removeClass('disabled');
});


$(document).on('click', '#editexcel', function () {
    if (!$(this).hasClass('disabled')) {
        $("#modalDialog").draggable();//为模态对话框添加拖拽
        $("#EditTableHead").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
        $('#EditTableHead').modal('show');
    }
});


$(document).on('click', '.addtablehead i.fa', function () {
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#EditTableLink").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#EditTableLink').modal('show');
});

/************************************* Ajax *******************************************/




/************************************* Ajax End *******************************************/