var 全局页码 = 1;
var 全局字段 = '';
var 全局排序 = '';
var onetype = '';
var oneval = '';
var twotype = '';
var twoval = '';
var ship = '';
var datetype = '';
var startdate = '';
var enddate = '';
var numbertype = '';
var numberval = '';
var numbership = '';
var pjmodifly = '';
var namemodifly = '';

$(function () {
    var pj = getQueryString("pj");
    if (pj != null && pj != '') {

    }
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    twotype = $('#twotype').val();
    twoval = $('#selectval').val();
    ship = $('#twovaselect');
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    numbertype = $('#numbertype').val();
    numbership = $('#numberval').val();
    numberval = $('#numqty').val();
    GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorderinfo", {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "twoval": twoval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序
    });
});


/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});

/*
导出Excel
*/
//$(document).on('click', '#datalist .download', function () {
//    var title = $(this).parents('.panel-heading').find('.panel-title').text();
//    $('#dlink').attr('data-name', title + '.xls');
//    ExportExcel('form_table');
//});

/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    showLoading();
    全局页码 = 1;
    var 文件名 = $('.panel-title').text();
    var data = {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "twoval": twoval,
        "ship": ship,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "numbership": numbership,
        "numberval": numberval,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序
    };
    $('#urltype').val('IIS3676');
    $('#pageurl').val("BusinessManage/AssemblyManage.aspx?action=excelGetAssemblyOrderInfo");
    $('#data').val(JSON.stringify(data));
    $('#filename').val(文件名);
    $('#export_excel').submit();
    hideLoading();
});


$(document).on('click', '#query_title > .query_content .query_btn', function () {
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    twotype = $('#twotype').val();
    twoval = $('#selectval').val();
    ship = $('#twovaselect').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    numbertype = $('#numbertype').val();
    numbership = $('#numselect').val();
    numberval = $('#numqty').val();
    全局页码 = 1;
    GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorderinfo", {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "twoval": twoval,
        "ship": ship,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "numbership": numbership,
        "numberval": numberval,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序,
    });
});

/***********************添加工艺*********************************/
$(document).on('click', '#adduserinfo', function () {
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal').modal('show');
});
/******************编辑工艺******************************/
$(document).on('click', '.editprocess', function () {
    var pjmodifly = $(this).attr('data-pj');
    var namemodifly = $(this).parent().parent().children().eq(1).text();
    GethroughprocessList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=throughprocessList", {
        "pj":$(this).attr('data-pj')
    }, pjmodifly, namemodifly);

});
//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('#search_content').is(':focus')) {
            //var search = $('#search_content').val();
            //全局搜索 = search;
            //全局页码 = 1;
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            twotype = $('#twotype').val();
            twoval = $('#selectval').val();
            ship = $('#twovaselect').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            numbership = $('#numselect').val();
            numberval = $('#numqty').val();
            GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorderinfo", {
                "onetype": onetype,
                "oneval": oneval,
                "twotype": twotype,
                "twoval": twoval,
                "ship": ship,
                "datetype": datetype,
                "startdate": startdate,
                "enddate": enddate,
                "numbertype": numbertype,
                "numbership": numbership,
                "numberval": numberval,
                "page": 全局页码,
                "sortfield": 全局字段,
                "sort": 全局排序
            });
        }
    }
})


$(document).on('click', '#add_sex > .label.label-default', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});


$(document).on('click', '#add_sure', function () {
    var pj = $('#add_pj').val();
    var name = $('#add_name').val();
    name = name.replace(/&/g, "")
    var ordernum = $('#add_ordernum').val();
    var 工序列表 = new Array();
    var obj = $('#flowinfo tr');
    if (pj == null || pj == '') {
        alert('PJ号不能为空');
        return;
    }

    //定义正则表达式部分
    var reg = /^\d+$/;
    if (!(reg.test(pj))) {
        alert('PJ号只能为数字!');
        return;
    }


    if (name == null || name == '') {
        alert('项目名称不能为空');
        return;
    }

    if (ordernum == null || ordernum == '') {
        alert('订单数量不能为空');
        return;
    }

    if (obj == null || obj.length == 0) {
        alert('未填写工序内容');
        return;
    }
    else {
        for (var i = 0; i < obj.length; i++) {
            var 工序号 = $(obj[i]).find('td select').val();
            var 优先级 = $(obj[i]).find('td input').val();
            var data = { "flowcode": 工序号, "priority": 优先级 };
            工序列表.push(data);
        }
    }

    AddAssemblyOrderInfo("IIS3676", "BusinessManage/AssemblyManage.aspx?action=addassemblyorderinfo", {
        "pj": pj,
        "name": name,
        "flowlist": 工序列表,
        "number": ordernum,
        "usercode": ""
    });
});

/*************************编辑工艺确认************************************/
$(document).on('click', '#edit_sure', function () {
  
    var 工序列表 = new Array();
    var obj = $('#editflowinfo tr');
    if (obj == null || obj.length == 0) {
        alert('未填写工序内容');
        return;
    }
    else {
        for (var i = 0; i < obj.length; i++) {
            var 工序号 = $(obj[i]).find('td select').val();
            var 优先级 = $(obj[i]).find('td input').val();
            var data = { "flowcode": 工序号, "priority": 优先级 };
            工序列表.push(data);
        }
    }

    EditAssemblyOrderInfo("IIS3676", "BusinessManage/AssemblyManage.aspx?action=throughprocess", {
        "pj": $('#pjdata').text(),
        "flowlist": 工序列表,
        "usercode":""
    });
});


$(document).on('click', '#form_tb .printqr', function () {
    var pj = $(this).attr('data-pj');
    if (confirm("确定打印PJ号：" + pj + '的二维码吗？')) {
        PrintAssemblyQrcodeList('IIS3676', 'ProjectManage.aspx?action=printassemblyqrcodelist', {
            "pj": pj,
            "usercode": ""
        });
    }
});

$(document).on('click', '#form_tb .del', function () {
    var pj = $(this).attr('data-pj');
    if (confirm("确定删除PJ号：" + pj + '的所有记录吗？')) {
        DelAssemblyorderinfo('IIS3676', 'BusinessManage/AssemblyManage.aspx?action=delassemblyorderinfo', {
            "pj": pj,
            "usercode": ""
        });
    }
});

$(document).on('click', '#flowinfo a.del', function () {
    $(this).parents('tr').remove();
});

$(document).on('click', '#editflowinfo a.del', function () {
    $(this).parents('tr').remove();
});

$(document).on('click', '#addnewflow', function () {
    var content = '';
    content += '<tr>';
    content += '    <td>';
    content += '        <select>';
    content += '            <option value="F001">组装</option>';
    content += '            <option value="F002">接线</option>';
    content += '            <option value="F003">绒布</option>';
    content += '            <option value="F004">调试</option>';
    content += '            <option value="F005">QA</option>';
    content += '            <option value="F006">打包</option>';
    content += '        </select>';
    content += '    </td>';
    content += '    <td>';
    content += '        <input type="number" min="1" max="999" value="1" />';
    content += '    </td>';
    content += '    <td>';
    content += '        <a href="JavaScript:;" class="del">删除</a>';
    content += '    </td>';
    content += '</tr>';
    $('#flowinfo').append(content);
  
});

/************************************* Search Start*******************************************/
//類型一
$(document).on('change', '#onetype', function () {
    if ($(this).val() == '全部') {
        $('#oneval').hide();
        return;
    }
    $('#oneval').attr('placeholder', '请输入' + $(this).val()).show();

});
//數量類型二
$(document).on('change', '#twotype', function () {
    if ($(this).val() == '全部') {
        $('#twoval').hide();
        $('#twoson').hide();
        return;
    } else if ($(this).val() == '下单人') {
        $('#twoson').show();
        $('#twoval').hide();
        return;
    }
    $('#twoval').show();
    $('#selectval').attr('placeholder', '请输入' + $('#twovaselect option:selected').text() + "订单数量");

});

$(document).on('change', '#twoval #twovaselect', function () {

    $('#selectval').attr('placeholder', '请输入' + $('#twovaselect option:selected').text() + "订单数量");

});

//時間

$(document).on('change', '#datetype', function () {
    if ($(this).val() == '全部') {
        $('#datetype_date').hide();
        return;
    }
    $('#datetype_date').show();

});

//數字類型
$(document).on('change', '#numbertype', function () {
    if ($(this).val() == '全部') {
        $('#numberval').hide();

        return;
    }
    $('#numberval').show();
    $('#numqty').attr('placeholder', '请输入' + $(this).val() + $('#numselect option:selected').text() + "数量")
});
$(document).on('change', '#numberval #numselect', function () {

    $('#numqty').attr('placeholder', '请输入' + $('#numbertype option:selected').val() + $('#numselect option:selected').text() + "数量");

});

$(function () {
    $("#pagination_P0001").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            twotype = $('#twotype').val();
            twoval = $('#selectval').val();
            ship = $('#twovaselect').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            numbership = $('#numberval').val();
            numberval = $('#numqty').val();
            全局页码 = currPage;
            GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorderinfo", {
                "onetype": onetype,
                "oneval": oneval,
                "twotype": twotype,
                "twoval": twoval,
                "ship": ship,
                "datetype": datetype,
                "startdate": startdate,
                "enddate": enddate,
                "numbertype": numbertype,
                "numbership": numbership,
                "numberval": numberval,
                "page": 全局页码,
                "sortfield": 全局字段,
                "sort": 全局排序
            }, 全局页码);
        }
    });
});


$(document).on('click', '#form_th > tr > th', function () {
    $(this).toggleClass('contor');
    全局字段 = $(this).attr('data-val');
    全局排序 = '';
    if ($(this).hasClass('contor')) {
        全局排序 = 'desc';
    }
    else {
        全局排序 = 'asc';
    }
    var currPage = $('.whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
        onetype = $('#onetype').val();
        oneval = $('#oneval').val();
        twotype = $('#twotype').val();
        twoval = $('#selectval').val();
        ship = $('#twovaselect');
        datetype = $('#datetype').val();
        startdate = $('#startdate').val();
        enddate = $('#enddate').val();
        numbertype = $('#numbertype').val();
        numbership = $('#numberval').val();
        numberval = $('#numqty').val();
    GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorderinfo", {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "twoval": twoval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序
    });
});


$(document).on('click', '#editnewflow', function () {
    var content = '';
    content += '<tr>';
    content += '    <td>';
    content += '        <select>';
    content += '            <option value="F001">组装</option>';
    content += '            <option value="F002">接线</option>';
    content += '            <option value="F003">绒布</option>';
    content += '            <option value="F004">调试</option>';
    content += '            <option value="F005">QA</option>';
    content += '            <option value="F006">打包</option>';
    content += '        </select>';
    content += '    </td>';
    content += '    <td>';
    content += '        <input type="number" min="1" max="999" value="1" />';
    content += '    </td>';
    content += '    <td>';
    content += '        <a href="JavaScript:;" class="del">删除</a>';
    content += '    </td>';
    content += '</tr>';
    $('#editflowinfo').append(content);

});




/************************************* Search End*******************************************/





/************************************* Ajax *******************************************/

/*
获取用户列表
*/
function GetUserList(urltype, pageurl, data, page) {
    if (page == null) {
        page = 1;
    }
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
                    content += '<tr>';
                    content += '<td>' + obj.pj + '</td>';
                    content += '<td>' + obj.项目名称 + '</td>';
                    content += '<td>' + obj.订单数 + '</td>';
                    content += '<td>';
                    content += '<div style="float: left;margin-right: 3px;">';
                    content += '<div class="progress_white" title="' + obj.未组装明细.replace(/,/g, "") + '">' + obj.未开始数量 + '</div>';
                    content += '<div class="progress_red" title="' + obj.异常明细.replace(/,/g, "") + '">' + obj.异常数量 + '</div>';
                    content += '</div>';
                    content += '<div style="float: left;">';
                    content += '<div class="progress_yellow" title="' + obj.进行中明细.replace(/,/g, "") + '">' + obj.进行中数量 + '</div>';
                    content += '<div class="progress_green"  title="' + obj.完成明细.replace(/,/g, "") + '">' + obj.完成数量 + '</div>';
                    content += '</div>';
                    content += '</td>';
                    content += '<td>' + obj.下单人 + '</td>';
                    content += '<td>' + obj.下单时间 + '</td>';
                    content += '    <td>';
                    content += '        <a href="JavaScript:;" class="printqr" data-pj="' + obj.pj + '">打印</a>';
                    content += '        <a href="/Page/ProjectManage/P0002.html?pj=' + obj.pj + '">详情</a>';
                    content += '         <a class="editprocess" data-pj="' + obj.pj + '">编工艺</a>'
                    if ($('#userinfo').attr('data-usercode') == "mt00000001" || $('#userinfo').attr('data-usercode') == 'mt00000489') {
                        content += '         <a class="del" data-pj="' + obj.pj + '">删除</a>'

                    }
                    content += '    </td>';
                    content += '</tr>';

                });
                $('#form_tb').empty();
                $('#form_tb').append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0001").pagination('setPage', parseFloat(page), parseFloat(pagecount));
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/*
添加装配信息
*/
function AddAssemblyOrderInfo(urltype, pageurl, data) {
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
                $('#AddUserModal').modal('hide');
                onetype = $('#onetype').val();
                oneval = $('#oneval').val();
                twotype = $('#twotype').val();
                twoval = $('#selectval').val();
                ship = $('#twovaselect');
                datetype = $('#datetype').val();
                startdate = $('#startdate').val();
                enddate = $('#enddate').val();
                numbertype = $('#numbertype').val();
                numbership = $('#numberval').val();
                numberval = $('#numqty').val();
                GetUserList("IIS", "BusinessManage/AssemblyManage.aspx?action=getassemblyorderinfo", {
                    "onetype": onetype,
                    "oneval": oneval,
                    "twotype": twotype,
                    "twoval": twoval,
                    "datetype": datetype,
                    "startdate": startdate,
                    "enddate": enddate,
                    "numbertype": numbertype,
                    "page": 全局页码,
                    "sortfield": 全局字段,
                    "sort": 全局排序
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



/*
获取部门列表
*/
function GetDepartmentList(urltype, pageurl, data) {
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
                var option = '';
                $.each(data.data, function (idx, obj) {
                    option += '<option value="' + obj.departmentcode + '">' + obj.departmentname + ' （' + obj.departmentcode + '）' + '</option>';
                });
                $('#add_department').empty();
                $('#add_department').append(option);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/*
打印二维码
*/
function PrintAssemblyQrcodeList(urltype, pageurl, data) {
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
          
        }
    });
}


/*
删除订单
*/
function DelAssemblyorderinfo(urltype, pageurl, data) {
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
                alert('删除成功');

                onetype = $('#onetype').val();
                oneval = $('#oneval').val();
                twotype = $('#twotype').val();
                twoval = $('#selectval').val();
                ship = $('#twovaselect');
                datetype = $('#datetype').val();
                startdate = $('#startdate').val();
                enddate = $('#enddate').val();
                numbertype = $('#numbertype').val();
                numbership = $('#numberval').val();
                numberval = $('#numqty').val();

                GetUserList("IIS", "BusinessManage/AssemblyManage.aspx?action=getassemblyorderinfo", {
                    "onetype": onetype,
                    "oneval": oneval,
                    "twotype": twotype,
                    "twoval": twoval,
                    "datetype": datetype,
                    "startdate": startdate,
                    "enddate": enddate,
                    "numbertype": numbertype,
                    "page": 全局页码,
                    "sortfield": 全局字段,
                    "sort": 全局排序
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}




/*
获取编工艺列表
*/
function GethroughprocessList(urltype, pageurl, data,pj,name) {
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
                    content+='<tr>'+
                               ' <td>'+
                                    '<select>'+
                                        '<option value="F001" ' + (GetIdx(obj.flowname) == 0 ? "selected = 'selected' " : "") + ' >组装</option>' +
                                        '<option value="F002" ' + (GetIdx(obj.flowname) == 1 ? "selected = 'selected' " : "") + ' >接线</option>' +
                                        '<option value="F003" ' + (GetIdx(obj.flowname) == 2 ? "selected = 'selected' " : "") + ' >绒布</option>' +
                                        '<option value="F004" ' + (GetIdx(obj.flowname) == 3 ? "selected = 'selected' " : "") + ' >调试</option>' +
                                        '<option value="F005" ' + (GetIdx(obj.flowname) == 4 ? "selected = 'selected' " : "") + ' >QA</option>' +
                                        '<option value="F006" ' + (GetIdx(obj.flowname) == 5 ? "selected = 'selected' " : "") + ' >打包</option>' +
                                   ' </select>'+
                                '</td>'+
                               ' <td>'+
                                   ' <input type="number" min="1" max="999" value="'+obj.priority+'" />'+
                                '</td>'+
                                '<td>'+
                                   ' <a href="JavaScript:;" class="del">删除</a>'+
                               ' </td>'+
                               ' </tr>';


                });
                //console.log(pj + "--" + name);
                $('#editflowinfo').empty();
                $('#pjdata').text(pj);
                $('#namedata').text(name);
                $('#editflowinfo').append(content);
                $("#modalDialog").draggable();//为模态对话框添加拖拽
                $("#editprocess").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
                $('#editprocess').modal('show');
            }
            else {
                alert(data.errmsg)
            }
           
        }
    });
}

/*
添加装配信息
*/
function EditAssemblyOrderInfo(urltype, pageurl, data) {
    showLoading();
    pjmodifly = $('#pjdata').text();
    namemodifly = $('#namedata').text();
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
                alert('编辑成功');
            }
            else {
                alert(data.errmsg)
            }
            GethroughprocessList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=throughprocessList", {
                "pj": pjmodifly
            }, pjmodifly, namemodifly);
        }
    });
}



function GetIdx(value) {

    if (!value || value.length == 0) {
        return -1;
    }
    if (value == '组装') {
        return 0;
    } else if (value == '接线') {
        return 1;
    } else if (value == '绒布') {
        return 2;

    } else if (value == '调试') {
        return 3;

    } else if (value == 'QA') {
        return 4;
    } else if (value == '打包') {
        return 5;

    }


}

/************************************* Ajax End *******************************************/

