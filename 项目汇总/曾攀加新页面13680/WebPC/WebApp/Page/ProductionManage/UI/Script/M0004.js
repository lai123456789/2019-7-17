$(document).on('click', '#top_main > .infolist', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
    var index = $(this).index();
    $('#mid_main > .panel-body:eq(' + index + ')').addClass('contor').siblings().removeClass('contor');
});




$(document).on('change', '#onetype', function () {
    var 类型一 = $(this).val();
    if (类型一 == '全部') {
        $('#oneval').hide();
    }
    else {
        $('#oneval').attr('placeholder', '请输入' + 类型一);
        $('#oneval').show();
    }
});


$(document).on('click', '#top_main > .addcnclist', function () {
    $("#AddCNCList > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#AddCNCList").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddCNCList').modal('show');
    
});



$(document).on('click', '#mid_main tr>td>a.edit', function () {
    var obj = $(this).parents('tr');
    var 代码 = $(obj).attr('data-cnccode');
    var 线别 = $(obj).find('td:eq(0)').attr('data-linetype');
    var CNC机台号 = $(obj).find('td:eq(1)').text();
    var 设备编码 = $(obj).find('td:eq(2)').text();
    var CNC型号 = $(obj).find('td:eq(3)').text();
    var 规格 = $(obj).find('td:eq(4)').text();
    var 组别 = $(obj).find('td:eq(5)').attr('data-cncgroup');
    var 组别名称 = $(obj).find('td:eq(5)').text();
    

    $('#set_sure').attr('data-cnccode', 代码);
    $('#set_linetype').val(线别);
    $('#set_cncnumber').val(CNC机台号);
    $('#set_cncmodel').val(CNC型号);
    $('#set_cncspecification').val(规格);
    $('#set_devicecode').val(设备编码);

    $("#SetCNCList > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#SetCNCList").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#SetCNCList').modal('show');
});


$(document).on('click', '#set_sure', function () {
    var 代码 = $('#set_sure').attr('data-cnccode');
    var 线别 = $('#set_linetype').val();
    var CNC机台号 = $('#set_cncnumber').val();
    var CNC型号 = $('#set_cncmodel').val();
    var 规格 = $('#set_cncspecification').val();
    var 设备编码 = $('#set_devicecode').val();
    SetCNCData("IIS", "Machining/MachiningManage.aspx?action=setcnclist", {
        "cnccode": 代码,
        "cncmodel": CNC型号,
        "cncnumber": CNC机台号,
        "cncspecification": 规格,
        "linetype": 线别,
        "devicecode": 设备编码,
        "usercode": ""
    });
});

/*
添加机台确定
*/
$(document).on('click', '#add_sure', function () {
    var 线别 = $('#add_linetype').val();
    var 机台号 = $('#add_cncnumber').val();
    var 型号 = $('#add_cncmodel').val();
    var 规格 = $('#add_cncspecification').val();
    var 关联设备码 = $('#add_devicecode').val();
    RequestData("IIS", "Machining/MachiningManage.aspx?action=addcnclist", {
        "cncmodel": 型号,
        "cncnumber": 机台号,
        "cncspecification": 规格,
        "linetype": 线别,
        "devicecode": 关联设备码,
        "usercode":""
    });
});


$(function () {
    GetDataList("IIS", "Machining/MachiningManage.aspx?action=getcnclist", { });
});






/*********************************************************************************************/


/*
请求数据
*/
function GetDataList(urltype, pageurl, data) {
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
                var content2 = '';
                var content3 = '';

                $.each(data.data, function (idx, obj) {
                    content += '<tr data-cnccode="' + obj.代码 + '">';
                    content += '    <td data-LineType="' + obj.线别 + '">' + obj.线别名称 + '</td>';
                    content += '    <td>' + obj.机台号 + '</td>';
                    content += '    <td>' + obj.设备编码 + '</td>';
                    content += '    <td>' + obj.机型 + '</td>';
                    content += '    <td>' + obj.规格 + '</td>';
                    content += '    <td data-cncgroup="' + obj.组别 + '">' + obj.组别名称 + '</td>';
                    content += '    <td>' + obj.创建时间 + '</td>';
                    content += '    <td>';
                    content += '        <a href="JavaScript:;" class="edit">编辑</a>';
                    content += '        <a href="JavaScript:;" class="del">删除</a>';
                    content += '    </td>';
                    content += '</tr>';

                    if (obj.线别 == 'CNC1') {
                        content1 += '<tr data-cnccode="' + obj.代码 + '">';
                        content1 += '    <td data-LineType="' + obj.线别 + '">' + obj.线别名称 + '</td>';
                        content1 += '    <td>' + obj.机台号 + '</td>';
                        content1 += '    <td>' + obj.设备编码 + '</td>';
                        content1 += '    <td>' + obj.机型 + '</td>';
                        content1 += '    <td>' + obj.规格 + '</td>';
                        content1 += '    <td data-cncgroup="' + obj.组别 + '">' + obj.组别名称 + '</td>';
                        content1 += '    <td>' + obj.创建时间 + '</td>';
                        content1 += '    <td>';
                        content1 += '        <a href="JavaScript:;" class="edit">编辑</a>';
                        content1 += '        <a href="JavaScript:;" class="del">删除</a>';
                        content1 += '    </td>';
                        content1 += '</tr>';
                    }
                    else if (obj.线别 == 'CNC2') {
                        content2 += '<tr data-cnccode="' + obj.代码 + '">';
                        content2 += '    <td data-LineType="' + obj.线别 + '">' + obj.线别名称 + '</td>';
                        content2 += '    <td>' + obj.机台号 + '</td>';
                        content2 += '    <td>' + obj.设备编码 + '</td>';
                        content2 += '    <td>' + obj.机型 + '</td>';
                        content2 += '    <td>' + obj.规格 + '</td>';
                        content2 += '    <td data-cncgroup="' + obj.组别 + '">' + obj.组别名称 + '</td>';
                        content2 += '    <td>' + obj.创建时间 + '</td>';
                        content2 += '    <td>';
                        content2 += '        <a href="JavaScript:;" class="edit">编辑</a>';
                        content2 += '        <a href="JavaScript:;" class="del">删除</a>';
                        content2 += '    </td>';
                        content2 += '</tr>';
                    } else if (obj.线别 == 'CNC3') {
                        content3 += '<tr data-cnccode="' + obj.代码 + '">';
                        content3 += '    <td data-LineType="' + obj.线别 + '">' + obj.线别名称 + '</td>';
                        content3 += '    <td>' + obj.机台号 + '</td>';
                        content3 += '    <td>' + obj.设备编码 + '</td>';
                        content3 += '    <td>' + obj.机型 + '</td>';
                        content3 += '    <td>' + obj.规格 + '</td>';
                        content3 += '    <td data-cncgroup="' + obj.组别 + '">' + obj.组别名称 + '</td>';
                        content3 += '    <td>' + obj.创建时间 + '</td>';
                        content3 += '    <td>';
                        content3 += '        <a href="JavaScript:;" class="edit">编辑</a>';
                        content3 += '        <a href="JavaScript:;" class="del">删除</a>';
                        content3 += '    </td>';
                        content3 += '</tr>';
                    }
                });
                $('#form_tb').empty();
                $('#form_tb').append(content);

                $('#form_tb1').empty();
                $('#form_tb1').append(content1);

                $('#form_tb2').empty();
                $('#form_tb2').append(content2);

                $('#form_tb3').empty();
                $('#form_tb3').append(content3);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/*
请求数据
*/
function RequestData(urltype, pageurl, data) {
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
                GetDataList("IIS", "Machining/MachiningManage.aspx?action=getcnclist", {});
                alert('添加成功');
                $('#AddCNCList').modal('hide');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/*
更新CNC机床数据
*/
function SetCNCData(urltype, pageurl, data) {
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
                GetDataList("IIS", "Machining/MachiningManage.aspx?action=getcnclist", {});
                alert('更新成功');
                $('#SetCNCList').modal('hide');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}