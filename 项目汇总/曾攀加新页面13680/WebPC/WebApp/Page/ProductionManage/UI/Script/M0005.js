var 用户列表 = new Array();
var 工序列表 = new Array();
var onetype = "";
var oneval = "";
$(document).on('click', '#query_title .query_btn', function () {
    
});

/*
点击Pj号任务时
*/
$(document).on('click', '#div_form_table1 > .infolist', function () {
    var pj = $(this).find('.drawingcode').text();
    var 时间 = $('.plannedtime').text();
    GetMachiningSchedulingFlow("IIS", "/Machining/MachiningManage.aspx?action=getmachiningschedulingflow", {
        "pj": pj
    });

    GetMachiningScheduling("IIS", "/Machining/MachiningManage.aspx?action=getmachiningscheduling", {
        "pj": pj,
        "querydate": 时间
    });
    
    GetCNCPlanStatus("IIS", "/Machining/MachiningManage.aspx?action=getcncplanstatus", {
        "querydate": 时间,
        "LineType": "CNC1"
    });
});



$(document).on('click', '#edit_sure', function () {
    var pj = $('#bind_pj').text();
    var flowcode = new Array();
    var obj = $('.bindflowlist');
    for (var i = 0; i < obj.length; i++) {
        var 工序代码 = $(obj[i]).attr('data-val');
        flowcode.push(工序代码)
    }

    MachiningSchedulingFlow("IIS", "/Machining/MachiningManage.aspx?action=machiningschedulingflow", {
        "dutydepartment": "MT1",
        "pj": pj,
        "flowcode": flowcode
    });
});




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

    GetFlowList("IIS", "Machining/MachiningManage.aspx?action=getcncflow", {
        "onetype": "",
        "oneval": "",
        "全局页码": 1,
        "sort": "",
        "sortfield": ""
    });

    GetMachiningTask("IIS", "/Machining/MachiningManage.aspx?action=getmachiningtask", {
        "department": "MT1",
        "onetype": onetype,
        "oneval": oneval
    });

    

});




/*
添加任务计划
*/
$(document).on('click', '#add_sure', function () {
    var pj = $('#scheduling_pj').text();
    var 数量 = $('#scheduling_number').val();
    var 工序 = $('#scheduling_flow').attr('data-val');
    var 机床 = $('#scheduling_cncnumber').attr('data-val');
    var 单次数量 = $('#scheduling_yieldnumber').val();
    var 计划开始时间 = $('#scheduling_startdate').val();
    var 开始时间 = $('.plannedtime').text() + ' '+ 计划开始时间;
    var 计划工时 = $('#scheduling_workhours').val();
    if (工序 == null || 工序 == "") {
        alert('工序未选择');
        return;
    }
    if (parseInt(计划工时) < 1) {
        alert('计划工时只能为整数，并且大于0')
        return;
    }
    MachiningScheduling("IIS", "/Machining/MachiningManage.aspx?action=machiningscheduling", {
        "cncnumber": 机床,
        "flowcode": 工序,
        "number": 数量,
        "pj": pj,
        "planhour": 计划工时,
        "starttime": 开始时间,
        "usercode": "",
        "yieldnumber": 单次数量
    });
});





$(document).on('click', '#div_form_table1 > .infolist', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});




$(document).on('click', '#div_form_table1 > .infolist > .bottom > .right .fa', function () {

    var pj = $(this).parents('.infolist').find('.drawingcode').text();
    var 名称 = $(this).parents('.infolist').find('.drawingname').text(); 
    var 数量 = $(this).parents('.infolist').find('.ordernum').text();
    var 要求机加时间 = $(this).parents('.infolist').find('.bottom > .left').text();
    var 颜色 = $(this).parents('.infolist').find('.bottom > .left').css('color');
    $('#bind_pj').text(pj);
    $('#bind_name').text(名称);
    $('#bind_number').text(数量);
    $('#bind_askdeliverydate').text(要求机加时间);
    $('#bind_askdeliverydate').css('color', 颜色);


    $('#BindSchedulingFlowModal').modal('show');
    $("#BindSchedulingFlowModal > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#BindSchedulingFlowModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
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
    var obj = $('#div_form_table1 > .infolist.contor');
    var pj = $(obj).find('.drawingcode').text();
    var 名称 = $(obj).find('.drawingname').text();
    var 数量 = $(obj).find('.ordernum').text();
    var 要求机加时间 = $(obj).find('.bottom > .left').text();
    var 颜色 = $(obj).find('.bottom > .left').css('color');

    $('#scheduling_pj').text(pj);
    $('#scheduling_name').text(名称);
    $('#scheduling_number').val(数量);

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

$(document).on('click', '#bindflowinfo td>a.del', function () {
    $(this).parents('tr').remove();
});


$(document).on('click', '#editaddnewuser', function () {
    var content = '';
    content += '<tr>';
    content += '    <td>';
    content += '        <input class="input-default bindflowlist" autocomplete="off" />';
    content += '    </td>';
    content += '    <td>';
    content += '        <a href="JavaScript:;" class="del">删除</a>';
    content += '    </td>';
    content += '</tr>';
    $('#bindflowinfo').append(content);
    
});

$(document).on('focus', '.bindflowlist', function () {
    var obj = $(this);
    //自定义选择/展示-2
    $(obj).bigAutocomplete({
        data: 工序列表,
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
    //var index = $('#bindflowinfo input.bindflowlist').length - 1;
    //$('#bindflowinfo input.bindflowlist:eq(' + index + ')').focus();
});

$(document).on('focus', '#scheduling_flow', function () {
    var obj = $(this);
    //自定义选择/展示-2
    $(obj).bigAutocomplete({
        data: 工序列表,
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
    //var index = $('#bindflowinfo input.bindflowlist').length - 1;
    //$('#bindflowinfo input.bindflowlist:eq(' + index + ')').focus();
});

$(document).on('focus', '#scheduling_cncnumber', function () {
    var obj = $(this);
    //自定义选择/展示-2
    $(obj).bigAutocomplete({
        data: 机床列表,
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


$(document).on('click', '#form_tb .scheduling', function () {
    if ($(this).hasClass('process1') || $(this).hasClass('process2') || $(this).hasClass('process3') || $(this).hasClass('process4')||
        $(this).hasClass('process5') || $(this).hasClass('process6') || $(this).hasClass('process7') || $(this).hasClass('process8')||
        $(this).hasClass('process9') || $(this).hasClass('process10') || $(this).hasClass('process11') || $(this).hasClass('process12'))
    if ($(this).hasClass('contor')) {
        $(this).removeClass('contor');
        $('#editplan').removeClass('contor');
        $('#delplan').removeClass('contor');
    }
    else
    {
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



/*
获取工序列表
*/
function GetFlowList(urltype, pageurl, data) {
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
                工序列表 = [];
                $.each(data.data, function (idx, obj) {
                    var arr = { value: obj.工序代码, text: obj.工序名称, form: obj.工序代码 };
                    工序列表.push(arr);
                });

                
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



function GetMachiningTask(urltype, pageurl, data)
{
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
                $.each(data.data, function (idx, obj) {
                    if (idx == 0) {
                        if (parseFloat(obj.进度) == 0) {
                            content += '<div class="infolist notcolor contor">';
                        }
                        else if (parseFloat(obj.进度) > 0 && (parseFloat(obj.进度) < 100))
                        {
                            content += '<div class="infolist goingcolor contor">';
                        } else {
                            content += '<div class="infolist successcolor contor">';
                        }
                        GetMachiningSchedulingFlow("IIS", "/Machining/MachiningManage.aspx?action=getmachiningschedulingflow", {
                            "pj": obj.PJ号
                        });
                        GetMachiningScheduling("IIS", "/Machining/MachiningManage.aspx?action=getmachiningscheduling", {
                            "pj": obj.PJ号,
                            "querydate": GetDateFormat(new Date(), 'yyyy/MM/dd HH:mm:ss')
                        });

                        GetCNCPlanStatus("IIS", "/Machining/MachiningManage.aspx?action=getcncplanstatus", {
                            "querydate": GetDateFormat(new Date(), 'yyyy/MM/dd HH:mm:ss'),
                            "LineType": "CNC1"
                        });

                    } else {
                        if (parseFloat(obj.进度) == 0) {
                            content += '<div class="infolist notcolor ">';
                        }
                        else if (parseFloat(obj.进度) > 0 && (parseFloat(obj.进度) < 100)) {
                            content += '<div class="infolist goingcolor ">';
                        } else {
                            content += '<div class="infolist successcolor ">';
                        }
                    }
                    content += '    <div class="left">';
                    content += '        <div class="drawingcode">' + obj.PJ号 + '</div>';
                    content += '        <div class="drawingname">' + obj.物料名称 + '</div>';
                    content += '    </div>';
                    content += '    <div class="right">';
                    content += '        <div class="ordernum">' + obj.需求总量 + '</div>';
                    content += '        <div class="progressval">' + obj.进度 + '%</div>';
                    content += '    </div>';
                    content += '    <div class="bottom">';
                    if (new Date(obj.要求配件到货日期) < new Date()) {
                        content += '        <div class="left" style="color:red;">2019/06/04</div>';
                    }
                    else
                    {
                        content += '        <div class="left">2019/06/04</div>';
                    }
                    content += '        <div class="right">';
                    content += '            <i class="fa fa-pencil-square"></i>';
                    content += '        </div>';
                    content += '    </div>';
                    content += '</div>';
                });
                $('#div_form_table1').empty();
                $('#div_form_table1').append(content);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}










/*
获取机加指定PJ的工序
*/
function GetMachiningSchedulingFlow(urltype, pageurl, data) {
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
                var content1 = '';
                $.each(data.data, function (idx, obj) {
                    switch (idx) {
                        case 0:
                            content += '<div class="process process1"></div>';
                            break;
                        case 1:
                            content += '<div class="process process2"></div>';
                            break;
                        case 2:
                            content += '<div class="process process3"></div>';
                            break;
                        case 3:
                            content += '<div class="process process4"></div>';
                            break;
                        case 4:
                            content += '<div class="process process5"></div>';
                            break;
                        case 5:
                            content += '<div class="process process6"></div>';
                            break;
                        case 6:
                            content += '<div class="process process7"></div>';
                            break;
                        case 7:
                            content += '<div class="process process8"></div>';
                            break;
                        case 8:
                            content += '<div class="process process9"></div>';
                            break;
                        case 9:
                            content += '<div class="process process10"></div>';
                            break;
                        case 10:
                            content += '<div class="process process11"></div>';
                            break;
                        case 11:
                            content += '<div class="process process12"></div>';
                            break;
                    }
                    content += '<div class="processname">' + obj.工序名称 + '</div>';

                    content1 += '<tr>';
                    content1 += '    <td>';
                    content1 += '        <input class="input-default bindflowlist" autocomplete="off" title="单击或输入值匹配" data-val="' + obj.工序代码 + '" data-account="' + obj.工序代码 + '" data-name="' + obj.工序名称 + '" value="' + obj.工序名称 + '">';
                    content1 += '    </td>';
                    content1 += '    <td>';
                    content1 += '        <a href="JavaScript:;" class="del">删除</a>';
                    content1 += '    </td>';
                    content1 += '</tr>';
                });
                $('#bindflowinfo').empty();
                $('#bindflowinfo').append(content1);

                $('#processlist').empty();
                $('#processlist').append(content);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}





/*
获取机加已排计划
*/
function GetMachiningScheduling(urltype, pageurl, data) {
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
                $.each(data.data, function (idx, obj) {

                });
                $('#div_form_table1').empty();
                $('#div_form_table1').append(content);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



/*
机加开始编工序
*/
function MachiningSchedulingFlow(urltype, pageurl, data) {
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
                alert('保存成功');
                $('#BindSchedulingFlowModal').modal('hide');
                var pj = $('#div_form_table1 > .infolist.contor').find('.drawingcode').text();
                GetMachiningSchedulingFlow("IIS", "/Machining/MachiningManage.aspx?action=getmachiningschedulingflow", {
                    "pj": pj
                });

                GetMachiningScheduling("IIS", "/Machining/MachiningManage.aspx?action=getmachiningscheduling", {
                    "pj": pj,
                    "querydate": GetDateFormat(new Date(),'yyyy/MM/dd HH:mm:ss')
                });

                GetCNCPlanStatus("IIS", "/Machining/MachiningManage.aspx?action=getcncplanstatus", {
                    "querydate": GetDateFormat(new Date(), 'yyyy/MM/dd HH:mm:ss'),
                    "LineType": "CNC1"
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



/*
获取机加已排计划
*/
function GetMachiningScheduling(urltype, pageurl, data) {
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
                $.each(data.data, function (idx, obj) {
                    var 开始时间 = GetDateFormat(new Date(), 'yyyy-MM-dd') + ' 00:00:00';
                    var 差多少分 = TimeMin(开始时间, 开始时间);
                    var 计划工时 = obj.计划工时;
                    var 剩余工时 = 1440 - parseInt(差多少分) - parseInt(计划工时);
                    var 循环次数_int = parseInt(obj.数量) / parseInt(obj.一出几);
                    var 循环次数_float = parseFloat(obj.数量) / parseFloat(obj.一出几);
                    if ((循环次数_float - 循环次数_int) > 0) {
                        循环次数_int += 1;
                    }
                    content += '<tr>';
                    if (parseInt(差多少分) > 0) {
                        content += '    <td colspan="' + 差多少分 + '" class="scheduling" title=""></td>';
                    }
                    if (obj.机台号 != null && obj.机台号 != "") {
                        content += '    <td colspan="' + 计划工时 + '" class="scheduling process1" title="' + obj.机台号 + ' &#10;数量：' + obj.数量 + ' &#10;单次数量：' + obj.一出几 + ' &#10;循环次数：' + 循环次数_int + '">' + obj.数量 + '</td>';
                    }
                    else {
                        content += '    <td colspan="' + 计划工时 + '" class="scheduling process1" title="' + '数量：' + obj.数量 + '">' + obj.数量 + '</td>';
                    }
                    for (var i = 剩余工时; i > 120 ; i -= 120) {
                        content += '    <td colspan="120" class="scheduling" title=""></td>';
                    }
                    
                    content += '    <td colspan="' + (parseInt(剩余工时) % 120) + '" class="scheduling" title=""></td>';
                    //content += '    <td colspan="12" class="scheduling process1" title="陈良忠 &#10;数量：15 &#10;用时：60分钟">15</td>';
                    //content += '    <td colspan="30" class="scheduling process2" title="陈良忠 &#10;数量：15 &#10;用时：150分钟">15</td>';
                    //content += '    <td colspan="12" class="scheduling process3" title="谢木龙 &#10;数量：15 &#10;用时：60分钟">15</td>';
                    //content += '    <td colspan="18" class="scheduling" title="中场休息&#10;用时：90分钟"></td>';
                    //content += '    <td colspan="30" class="scheduling process4" title="林展浩 &#10;数量：15 &#10;用时：150分钟">15</td>';
                    //content += '    <td colspan="24" class="scheduling process5" title="刘毅 &#10;数量：15 &#10;用时：120分钟">15</td>';
                    //content += '    <td colspan="12" class="scheduling process6" title="刘毅 &#10;数量：15 &#10;用时：60分钟">15</td>';
                    //content += '    <td colspan="18" class="scheduling" title="中场休息&#10;用时：90分钟"></td>';
                    //content += '    <td colspan="36" class="scheduling process7" title="赖良坤 &#10;数量：15 &#10;用时：180分钟">15</td>';
                    //content += '    <td colspan="48" class="scheduling process8" title="赖良坤 &#10;数量：15 &#10;用时：240分钟">15</td>';
                    //content += '    <td colspan="48" class="scheduling process9" title="赖良坤 &#10;数量：15 &#10;用时：240分钟">15</td>';
                    content += '</tr>';
                });
                
                $('#form_tb').empty();
                $('#form_tb').append(content);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}













/*
获取机加已排计划
*/
function GetCNCPlanStatus(urltype, pageurl, data) {
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
                机床列表 = [];
                $.each(data.data, function (idx, obj) {

                    var arr = { value: obj.机台号, text: obj.机型, form: obj.机台号 };
                    机床列表.push(arr);

                    if (parseFloat(obj.计划工时) > 0 && parseFloat(obj.计划工时) < 20) {
                        content += '<div class="infolist goingcolor">';
                    }
                    else if (parseFloat(obj.计划工时) > 20) {
                        content += '<div class="infolist successcolor">';
                    }
                    else
                    {
                        content += '<div class="infolist">';
                    }
                    content += '    <div class="top">';
                    content += '        <div class="left">';
                    content += '            <div class="box1">' + obj.机台号 + '</div>';
                    content += '            <div class="box2">' + obj.机型 + '</div>';
                    content += '        </div>';
                    content += '        <div class="right">';
                    content += '            <div class="box1">' + obj.计划工时 + 'h</div>';
                    content += '        </div>';
                    content += '    </div>';
                    content += '    <div class="down">';
                    content += '        <div class="left">';
                    content += '            <div class="box1">' + obj.规格 + '</div>';
                    content += '        </div>';
                    content += '    </div>';
                    content += '</div>';
                });

                $('#div_form_table4').empty();
                $('#div_form_table4').append(content);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}





/*
机加开始排任务计划
*/
function MachiningScheduling(urltype, pageurl, data) {
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
                alert('添加成功');
                $('#SchedulingModal').modal('hide');
                var pj = $('#div_form_table1 > .infolist.contor').find('.drawingcode').text();
                GetMachiningSchedulingFlow("IIS", "/Machining/MachiningManage.aspx?action=getmachiningschedulingflow", {
                    "pj": pj
                });

                GetMachiningScheduling("IIS", "/Machining/MachiningManage.aspx?action=getmachiningscheduling", {
                    "pj": pj,
                    "querydate": GetDateFormat(new Date(), 'yyyy/MM/dd HH:mm:ss')
                });

                GetCNCPlanStatus("IIS", "/Machining/MachiningManage.aspx?action=getcncplanstatus", {
                    "querydate": GetDateFormat(new Date(), 'yyyy/MM/dd HH:mm:ss'),
                    "LineType": "CNC1"
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}