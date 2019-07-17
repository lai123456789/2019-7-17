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
var floor = '';
var floorPJ = '';
var print_pj = '';
$(function () {
    //获取楼层
    GetFloor("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getFloor", {
        "usercode": ""
    });
    $('.reset').hide();
    var pj = getQueryString("pj");
    if (pj != null && pj != '') {

    }
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    twotype = $('#twotype').val();
    getSeachFloor();
    ship = $('#twovaselect');
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    numbertype = $('#numbertype').val();
    numbership = numbership;
    // numberval = $('#numqty').val();
    GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorderinfo", {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "twoval": twoval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "numberval": numberval,
        "numbership": numbership,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序,
        "usercode": ""
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
    getSeachFloor();
    ship = $('#twovaselect').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    numbertype = $('#numbertype').val();
    //numbership = $('#numselect').val();
    //numberval = $('#numqty').val();
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
        "usercode": ""
    });
});

/***********************添加工艺*********************************/
$(document).on('click', '#adduserinfo', function () {
    getFloorselect();
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal').modal('show');
    $('#add_pj').val("");
    $('#add_name').val("");
    $('#add_ordernum').val("1");
    
});
function getFloorselect() {
    var content = '';
    if (!floor) {
        content += '            <option value="请先选择">请先选择</option>';
    }
    content += '            <option value="2">二楼</option>';
    content += '            <option value="3">三楼</option>';
    content += '            <option value="4">四楼</option>';
    $('#AddUserModal #selectFloor').empty().append(content);
    if (floor) {
        $('#AddUserModal #selectFloor').find("option[value=" + floor + "]").attr("selected", true);
    }

}






/******************编辑工艺******************************/
$(document).on('click', '.editprocess', function () {
    var pjmodifly = $(this).attr('data-pj');
    var namemodifly = $(this).parent().parent().children().eq(2).text();
    GethroughprocessList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=throughprocessList", {
        "pj": $(this).attr('data-pj')
    }, pjmodifly, namemodifly);

});

/******************分派******************************/
$(document).on('click', '.Dispatch', function () {
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#Dispatch").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#Dispatch').modal('show');
    $('.searchDis').attr('disabled', true);//查询按钮不可点击
    $('#disBtn').empty();//清除按钮
    $('i.choice').removeClass('contor');//清除勾选样式
    $('#dispatchtable tbody').empty();//清除右边内容
    $('#inputdis').val("");//查询框清除
    $('#jobDis').val("");
    DispatchLeft("IIS3676", "BusinessManage/AssemblyManage.aspx?action=responsibleauthority", {
        "usercode": ""
    });
});



/******************重置数据******************************/
$(document).on('click', '.reset', function () {
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#ResetDialog").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#ResetDialog').modal('show');
});








//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('#query_title input').is(':focus')) {
            //var search = $('#search_content').val();
            //全局搜索 = search;
            //全局页码 = 1;
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            twotype = $('#twotype').val();
            getSeachFloor();
            ship = $('#twovaselect').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            //numbership = $('#numselect').val();
            //numberval = $('#numqty').val();
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
                "usercode": ""
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

    if ($('#selectFloor').val == "请先选择") {
        alert("请先选择楼层");
        return;
    }

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
    if (pj.length > 7) {
        alert('PJ号只能为7位数!');
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

    //获取楼层
    var floor = $('#selectFloor').val();
    AddAssemblyOrderInfo("IIS3676", "BusinessManage/AssemblyManage.aspx?action=addassemblyorderinfo", {
        "pj": pj,
        "name": name,
        "flowlist": 工序列表,
        "number": ordernum,
        "usercode": "",
        "floor": floor
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
        "usercode": ""
    });
});

//on('shown.bs.modal', function () {
//    // 执行一些动作...
//})
$(document).on('click', '#form_tb .printqr', function () {
    $('#PrintPwd').val("");
  
    print_pj = $(this).attr('data-pj');
    $("#SurePringPwd").draggable();//为模态对话框添加拖拽
    $("#SurePringPwd").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#SurePringPwd').modal('show').on('shown.bs.modal', function () {
        $('#PrintPwd').focus();
    });
  

    //if (confirm("确定打印PJ号：" + pj + '的二维码吗？')) {
    //    PrintAssemblyQrcodeList('IIS3676', 'ProjectManage.aspx?action=printassemblyqrcodelist', {
    //        "pj": pj,
    //        "usercode": ""
    //    });
    //}
});

$(document).on('click', '#Print_sure', function () {
    var pwd = $('#PrintPwd').val();
    if (!pwd && pwd.length == 0) {
        alert("请输入打印密码!");
        return;
    }
        PrintAssemblyQrcodeList('IIS3676', 'ProjectManage.aspx?action=printassemblyqrcodelist', {
            "pj": print_pj,
            "usercode": "",
            "printpwd":pwd
        });
    
});




//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
      
        if ($('#SurePringPwd input').is(':focus')) {
            var pwd = $('#PrintPwd').val();
            if (!pwd && pwd.length == 0) {
                alert("请输入打印密码!");
                return;
            }
            PrintAssemblyQrcodeList('IIS3676', 'ProjectManage.aspx?action=printassemblyqrcodelist', {
                "pj": print_pj,
                "usercode": "",
                "printpwd": pwd
            });
        }
    }
})









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
    $('#oneval').val("").attr('placeholder', '请输入' + $(this).val()).show();

});
//數量類型二
$(document).on('change', '#twotype', function () {
    if ($(this).val() == '全部') {
        $('#twoson').hide();
        return;
    }
    $('#twoson').show();
});

//$(document).on('change', '#twoval #twovaselect', function () {

//    $('#selectval').attr('placeholder', '请输入' + $('#twovaselect option:selected').text() + "订单数量");

//});

//時間

$(document).on('change', '#datetype', function () {
    if ($(this).val() == '全部') {
        $('#datetype_date').hide();
        return;
    }
    $('#datetype_date').show();

});

//數字類型
//$(document).on('change', '#numbertype', function () {
//    if ($(this).val() == '全部') {
//        $('#numberval').hide();

//        return;
//    }
//    //$('#numberval').show();
//    //$('#numqty').attr('placeholder', '请输入' + $(this).val() + $('#numselect option:selected').text() + "数量")
//});
//$(document).on('change', '#numberval #numselect', function () {

//    $('#numqty').attr('placeholder', '请输入' + $('#numbertype option:selected').val() + $('#numselect option:selected').text() + "数量");

//});
//楼层选择
$(document).on('change', '#twotype', function () {
    if ($(this).val() == '全部') {
        $('#CheckFloor').hide();
        return;
    }
    $('#CheckFloor').show();
});

//单选
$(document).on('click', '#CheckFloor i.choice', function () {
    $(this).toggleClass('contor');
});


//点击状态按钮跳转
$(document).on('click', '.Jump', function () {
    sessionStorage.setItem("P0001NAME", $(this).attr('data-val'));
    window.location.href = "/Page/ProjectManage/P0002.html";

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
            getSeachFloor();
            ship = $('#twovaselect').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            //numbership = $('#numberval').val();
            //numberval = $('#numqty').val();
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
                "sort": 全局排序,
                "usercode": ""
            }, 全局页码);
        }
    });
});


$(document).on('click', '#form_th > tr > th', function () {
    $(this).toggleClass('contor');
    全局页码 = 1;
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
    getSeachFloor();
    ship = $('#twovaselect');
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    numbertype = $('#numbertype').val();
    // numbership = $('#numberval').val();
    // numberval = $('#numqty').val();
    GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorderinfo", {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "twoval": twoval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "numberval": numberval,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序,
        "usercode": ""
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
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 9)) + '</td>';
                    content += '<td>' + obj.pj + '</td>';
                    content += '<td>' + obj.项目名称 + '</td>';
                    content += '<td>';
                    content += '<div style="float: left;margin-right: 3px;">';
                    content += '<div class="progress_white Jump"   data-val="未开始|' + obj.pj + '"  title="' + obj.未组装明细.replace(/,/g, "") + '">' + obj.未开始数量 + '</div>';
                    content += '<div class="progress_red Jump"     data-val="异常|' + obj.pj + '"    title="' + obj.异常明细.replace(/,/g, "") + '">' + obj.异常数量 + '</div>';
                    content += '</div>';
                    content += '<div style="float: left;">';
                    content += '<div class="progress_yellow Jump"  data-val="进行中|' + obj.pj + '"  title="' + obj.进行中明细.replace(/,/g, "") + '">' + obj.进行中数量 + '</div>';
                    content += '<div class="progress_green Jump"   data-val="已完成|' + obj.pj + '"    title="' + obj.完成明细.replace(/,/g, "") + '">' + obj.完成数量 + '</div>';
                    content += '</div>';
                    content += '</td>';
                    content += '<td>' + obj.订单数 + '</td>';
                    content += '<td>' + obj.下单人 + '</td>';
                    content += '<td>' + obj.下单时间 + '</td>';
                    content += '<td>' + obj.楼层 + '<a class="editFloor" data-pj="' + obj.pj + '">编辑楼层</a></td>';
                    content += '    <td>';
                    content += '        <a href="JavaScript:;" class="printqr" data-pj="' + obj.pj + '">打印</a>';
                    content += '        <a href="/Page/ProjectManage/P0002.html?pj=' + obj.pj + '">详情</a>';
                    content += '        <a class="editprocess" data-pj="' + obj.pj + '">编工艺</a>'
                    //if (data.Permission=="1") {
                    //content += ' <a class="Dispatch">分派</a>'
                    //}
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
                if (data.usercode == "mt00000001" || data.usercode == "mt00000589" || data.usercode == 'mt00000491') {
                    $('.reset').show();
                }
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
            $('#AddUserModal').modal('hide');
        },
        success: function (data) {
            hideLoading();
            if (data.errcode == 0) {
                alert('添加成功');
                $('#AddUserModal').modal('hide');
                onetype = $('#onetype').val();
                oneval = $('#oneval').val();
                twotype = $('#twotype').val();
                getSeachFloor();
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
                    "sort": 全局排序,
                    "usercode": ""

                });
            }
            else {
                alert(data.errmsg);
                $('#AddUserModal').modal('hide');
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
            $('#SurePringPwd').modal('hide');
        },
        success: function (data) {
            hideLoading();
            alert(data.errmsg);
            $('#SurePringPwd').modal('hide');

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
                getSeachFloor();
                ship = $('#twovaselect');
                datetype = $('#datetype').val();
                startdate = $('#startdate').val();
                enddate = $('#enddate').val();
                numbertype = $('#numbertype').val();
                //numbership = $('#numberval').val();
                //numberval = $('#numqty').val();

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
                    "sort": 全局排序,
                    "usercode": ""
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
function GethroughprocessList(urltype, pageurl, data, pj, name) {
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
                    content += '<tr>' +
                               ' <td>' +
                                    '<select>' +
                                        '<option value="F001" ' + (GetIdx(obj.flowname) == 0 ? "selected = 'selected' " : "") + ' >组装</option>' +
                                        '<option value="F002" ' + (GetIdx(obj.flowname) == 1 ? "selected = 'selected' " : "") + ' >接线</option>' +
                                        '<option value="F003" ' + (GetIdx(obj.flowname) == 2 ? "selected = 'selected' " : "") + ' >绒布</option>' +
                                        '<option value="F004" ' + (GetIdx(obj.flowname) == 3 ? "selected = 'selected' " : "") + ' >调试</option>' +
                                        '<option value="F005" ' + (GetIdx(obj.flowname) == 4 ? "selected = 'selected' " : "") + ' >QA</option>' +
                                        '<option value="F006" ' + (GetIdx(obj.flowname) == 5 ? "selected = 'selected' " : "") + ' >打包</option>' +
                                   ' </select>' +
                                '</td>' +
                               ' <td>' +
                                   ' <input type="number" min="1" max="999" value="' + obj.priority + '" />' +
                                '</td>' +
                                '<td>' +
                                   ' <a href="JavaScript:;" class="del">删除</a>' +
                               ' </td>' +
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



/************************************* 分派 Start *******************************************/



/*
添加分派左边按钮
*/
function DispatchLeft(urltype, pageurl, data) {
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
            var content = "";
            if (data.errcode == 0) {
                $.each(data.data, function (idx, obj) {
                    content += '<div style="margin-bottom:10px;">';
                    content += '<button class="btn  processBtn" data-val="' + obj.flowcode + '">' + obj.fname + '</button>';
                    content += '</div>';

                });
                $('#disBtn').append(content);

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

$(document).on('click', '.processBtn', function () {
    $('#disBtn button').removeClass('btn-primary');
    $(this).addClass('btn-primary');
    $('.searchDis').attr('disabled', false);
    $('#inputdis').val("");//查询框清除
    $('#jobDis').val("");
    var data = $(this).attr('data-val');
    DispatchRingt("IIS3676", "BusinessManage/AssemblyManage.aspx?action=everyoneprocess", {
        "flowcode": data,
        "username": "",
        "jobnum": ""
    });
});


/*
添加分派右边内容
*/
function DispatchRingt(urltype, pageurl, data) {
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
            var content = "";
            if (data.errcode == 0) {
                $.each(data.data, function (idx, obj) {
                    content += ' <tr>';
                    content += ' <td class="headth"><i class="iconfont choice">&#xe639;</i></td>';
                    content += '<td>' + obj.username + '</td>';
                    content += ' </tr>';

                });
                $('i.choice').removeClass('contor');
                $('#dispatchtable tbody').empty();
                $('#dispatchtable tbody').append(content);

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

$(document).on('click', '.searchDis', function () {
    var username = $('#inputdis').val();
    var jobnum = $('#jobDis').val();
    var search = $('#disBtn div button.btn-primary').attr('data-val');
    //alert(search);
    DispatchRingt("IIS3676", "BusinessManage/AssemblyManage.aspx?action=everyoneprocess", {
        "flowcode": search,
        "username": username,
        "jobnum": jobnum
    });
});
//全选
var isf = true;
$(document).on('click', '#dispatchtable thead i.choice', function () {
    //$('#dispatchtable thead i.choice').toggleClass('contor');
    //$('#dispatchtable tbody i.choice').toggleClass('contor');
    if (isf) {
        $('#dispatchtable thead i.choice').addClass('contor');
        $('#dispatchtable tbody i.choice').addClass('contor');
        isf = false;
    } else {
        $('#dispatchtable thead i.choice').removeClass('contor');
        $('#dispatchtable tbody i.choice').removeClass('contor');
        isf = true;
    }
});

//单选
$(document).on('click', '#dispatchtable tbody i.choice', function () {
    $(this).toggleClass('contor');
});


/************************************* 分派 End *******************************************/



/***************************************获取名称 start *******************************************/

function GetPjName(urltype, pageurl, data) {
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
                if (data.data.length == 0) {
                    $('#add_name').val("");
                }
                $('#add_name').val(data.data[0].productname);
                $('#add_ordernum').val(data.data[0].ordernum);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/***************************************获取名称 End *******************************************/
$(document).on('click', '.btnSearchName', function () {
    var pj = $('#add_pj').val();
    if (!pj && pj.length < 0) {
        alert("请先输入pj号在获取名称");
    }
    GetPjName("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getpjname", {
        "pj": pj
    });
});



/***************************************重置 start *******************************************/

$(document).on('click', '#Reset_surePJ', function () {
    // alert("Reset_surePJ");
    var inp = $('#resetVal').val();
    if (!inp && inp.length == 0) {
        alert("请输入六位pj");
        return;
    }
    GetReset("IIS3676", "AssemblyOrder.aspx?action=onebuttonReset", {
        "pj": inp
    });
});
$(document).on('click', '#Reset_sure', function () {
    GetReset("IIS3676", "AssemblyOrder.aspx?action=onebuttonReset", {

    });
});


function GetReset(urltype, pageurl, data) {
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
                alert("重置成功");
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}


/***************************************重置 End *******************************************/


//楼层
function getSeachFloor() {
    var fls = $('#CheckFloor').find('i.choice.contor');
    if (fls.length > 0) {
        twoval = '';
        $.each(fls, function (idx, obj) {
            twoval += $(this).attr('data-val') + ',';
        });
        twoval = twoval.substring(0, twoval.lastIndexOf(','));
    } else {
        twoval = '';
    }

}



//获取常用楼层
function GetFloor(urltype, pageurl, data) {
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
                if (data && data.data.length > 0) {
                    floor = data.data[0].floor;
                    console.log(floor);
                }

            }
            else {
                alert(data.errmsg);
            }
        }
    });
}

$(document).on('click', '.editFloor', function () {
    $("#editFloor").draggable();//为模态对话框添加拖拽
    $("#editFloor").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#editFloor').modal('show');
    floorPJ = $(this).attr('data-pj');
    $('#editFloor #FloorVal').val("");
});
$(document).on('click', '#editFloor #Floor_sure', function () {

    var floor = $('#editFloor #selectFloor').val();
    //获取楼层
    editFloor("IIS3676", "BusinessManage/AssemblyManage.aspx?action=editFloor", {
        "usercode": "",
        "pj": floorPJ,
        "floor": floor
    });
});

//修改楼层
function editFloor(urltype, pageurl, data) {
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
                $('#editFloor').modal('hide');
                alert(data.errmsg);
                onetype = $('#onetype').val();
                oneval = $('#oneval').val();
                twotype = $('#twotype').val();
                getSeachFloor();
                ship = $('#twovaselect');
                datetype = $('#datetype').val();
                startdate = $('#startdate').val();
                enddate = $('#enddate').val();
                numbertype = $('#numbertype').val();
                numbership = numbership;
                // numberval = $('#numqty').val();
                GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorderinfo", {
                    "onetype": onetype,
                    "oneval": oneval,
                    "twotype": twotype,
                    "twoval": twoval,
                    "datetype": datetype,
                    "startdate": startdate,
                    "enddate": enddate,
                    "numbertype": numbertype,
                    "numberval": numberval,
                    "numbership": numbership,
                    "page": 全局页码,
                    "sortfield": 全局字段,
                    "sort": 全局排序,
                    "usercode": ""
                });

            }
            else {
                alert(data.errmsg);
            }
        }
    });
}


function GetFloor(urltype, pageurl, data) {
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
                if (data && data.data.length > 0) {
                    floor = data.data[0].floor;
                    console.log(floor);
                }

            }
            else {
                alert(data.errmsg);
            }
        }
    });
}

