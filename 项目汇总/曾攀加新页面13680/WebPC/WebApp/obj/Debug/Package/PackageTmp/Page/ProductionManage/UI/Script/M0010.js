var 用户列表 = new Array();

$(function () {
    var 日期 = $('#plandate').val();
    if (日期 == null || 日期 == '') {
        日期 = GetDateFormat(new Date(), 'yyyy-MM-dd');
    }
    else {
        日期 = GetDateFormat(日期, 'yyyy-MM-dd');
    }
    var 当天 = GetDateFormat(日期, 'yyyy-MM-dd');
    $('#plandate').val(当天);
    $('.plannedtime').text(GetDateFormat(当天, 'yyyy/MM/dd'));
    近七天计划();

    GetUserList("IIS", "/NotifySetting/BusinessNotifySetting.aspx?action=getuserlist", {});
});

$(document).on('click', '#div_form_table1 > .infolist', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});


$(document).on('focus', '.binduserlist', function () {
    var 工号 = $(this).attr('data-account');
    var obj_list = $('.binduserlist');
    var 临时用户列表 = 用户列表.concat();
    for (var i = 0; i < obj_list.length; i++) {
        var account = $(obj_list[i]).attr('data-account');
        if (account != 工号) {
            for (var j = 临时用户列表.length - 1; j >= 0; j--) {
                if (临时用户列表[j].form == account) {
                    临时用户列表.splice(j, 1);
                }
            }
        }
    }

    var obj = $(this);
    //自定义选择/展示-2
    $(obj).bigAutocomplete({
        data: 临时用户列表,
        title: 'text|form',
        formatItem: function (data, i, row) {
            return row.text + ' (' + row.form + ')';
        },
        //默认formatSelected=formatItem,这里formatSelected不同,额外定义
        formatSelected: function (data, i, row) {
            return row.text;
        },
        callback: function (row) {
            $(obj).attr('data-val', row.value);
            $(obj).attr('data-account', row.form);
            $(obj).attr('data-name', row.text);
        },
    });
});

/*
排班
*/
$(document).on('click', '#scheduling.contor', function () {
    $("#SchedulingModal > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#SchedulingModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#SchedulingModal').modal('show')
});


/*
上一天
*/
$(document).on('click', '#Yesterday', function () {
    var 日期 = $('#plandate').val();
    if (日期 == null || 日期 == '') {
        日期 = GetDateFormat(new Date(), 'yyyy-MM-dd');
    }
    else {
        日期 = GetDateFormat(日期, 'yyyy-MM-dd');
    }
    var 上一天 = addDate(日期, -1);
    上一天 = GetDateFormat(上一天, 'yyyy-MM-dd');
    $('#plandate').val(上一天);
    $('.plannedtime').text(GetDateFormat(上一天, 'yyyy/MM/dd'));
});


/*
下一天
*/
$(document).on('click', '#Tomorrow', function () {
    var 日期 = $('#plandate').val();
    if (日期 == null || 日期 == '') {
        日期 = GetDateFormat(new Date(), 'yyyy-MM-dd');
    }
    else {
        日期 = GetDateFormat(日期, 'yyyy-MM-dd');
    }
    var 下一天 = addDate(日期, 1);
    下一天 = GetDateFormat(下一天, 'yyyy-MM-dd');
    $('#plandate').val(下一天);
    $('.plannedtime').text(GetDateFormat(下一天, 'yyyy/MM/dd'));
});



$(document).on('click', '#div_form_table2 > .infolist', function () {
    $('#UserSchedulingModal').modal('show');
    $("#UserSchedulingModal > .modal-dialog").draggable();//为模态对话框添加拖拽

});



$(document).on('click', '#div_form_table4 > .infolist', function () {
    $('#CNCSchedulingModal').modal('show');
    $("#CNCSchedulingModal > .modal-dialog").draggable();//为模态对话框添加拖拽

});


$(document).on('change', '#scheduling_flow', function () {
    $('#flowinfo').empty();
});

$(document).on('click', '#addnewuser', function () {
    var content = '';
    content += '<tr>';
    content += '    <td>';
    content += '        <input class="input-default binduserlist" autocomplete="off" />';
    content += '    </td>';
    content += '    <td>';
    content += '        <input type="text" id="MachineNo" value="" />';
    content += '    </td>';
    content += '    <td>';
    content += '        <a href="JavaScript:;" class="del">删除</a>';
    content += '    </td>';
    content += '</tr>';
    $('#flowinfo').append(content);
    var index = $('#flowinfo input.binduserlist').length - 1;
    $('#flowinfo input.binduserlist:eq(' + index + ')').focus();
});

$(document).on('click', '#flowinfo .del', function () {
    $(this).parents('tr').remove();
});


$(document).on('click', '#form_tb .scheduling', function () {
    if ($(this).hasClass('contor')) {
        $(this).removeClass('contor');
        $('#editplan').removeClass('contor');
        $('#delplan').removeClass('contor');
    }
    else {
        $('#form_tb .scheduling').removeClass('contor');
        $(this).addClass('contor');
        $('#editplan').addClass('contor');
        $('#delplan').addClass('contor');
    }
});


$(document).on('click', '#editplan.contor', function () {
    $('#EditSchedulingModal').modal('show');
});


function 近七天计划() {
    var myChart = echarts.init(document.getElementById('div_form_table5'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '近七天计划'
        },
        legend: {
            data: ['工时', '累计工时']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['5/11', '5/12', '5/13', '5/14', '5/15', '5/16', '5/17']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '工时',
            data: [20, 21, 20.5, 22, 21, 21, 21.5],
            type: 'line',
            label: {
                normal: {
                    show: true
                }
            },
            stack: '工时',
            smooth: true
        },
        {
            name: '累计工时',
            data: [120, 112, 135, 126, 110, 150, 138],
            type: 'line',
            label: {
                normal: {
                    show: true
                }
            },
            stack: '累计工时',
            smooth: true
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
















/*
获取列表
*/
function GetUserList(urltype, pageurl, data) {
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=requestdata",
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
                var content = '';
                用户列表 = [];
                $.each(data.data, function (idx, obj) {
                    var arr = { value: obj.用户代码, text: obj.名称, form: obj.工号 };
                    用户列表.push(arr);
                });

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}