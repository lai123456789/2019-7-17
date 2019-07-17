var page = 1, onetype = '', oneval = '', twotype = '', twoval = '', datetype = '', startdate = '', enddate = '', maindata = [],
    sortfield = '', sort = '', numbertype = '', numbership = '', numberval = '', PORT = 'IIS3676', excel = '', mcdefcode='';
var URL = "ProductionPlan/MyProductionPlan.aspx?action=";
$(function () {
    GetList(PORT, URL + "getMachineProductiondef", Getseach());
   
});


/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});


/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    showLoading();
    page = 1;
    excel = 'excel';
    var 文件名 = $('.panel-title').text();
    $('#urltype').val(PORT);
    $('#pageurl').val(URL + "getMachineProductiondef");
    $('#data').val(JSON.stringify(data));
    $('#filename').val(文件名);
    $('#export_excel').submit();
    hideLoading();
});


$(document).on('click', '#query_title > .query_content .query_btn', function () {
    excel = '';
    page = 1;
    GetList(PORT, URL + "getMachineProductiondef", Getseach());
});




//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        excel = '';
        page = 1;
        if ($('.query_content input').is(':focus')) {
            GetList(PORT, URL + "getMachineProductiondef", Getseach());
        }
    }
});

$(document).on('click', '#form_tb tr', function () {
    $(this).css('background', 'rgb(218, 250, 223)').siblings().css('background', '#ffffff');
});


//修改机台号信息
$(document).on('click', '#form_tb .MacdefAdd', function () {
    $(this).parent().parent().css('background', 'rgb(218, 250, 223)').siblings().css('background', '#ffffff');
    var index = $(this).attr('data-val');
    $('#update_mcdefcode').val(maindata[index]["机台号"]).focus();//机台号
    $('#update_machineuqcode').val(maindata[index]["机台唯一码"]);//机台唯一码
    $('.update_des').val(maindata[index]["备注"]);//机台备注
    $('#update_macdefSure').data("surecode", maindata[index]["medfcode"]);//绑定机台号代码
    var fcode = maindata[index]["工序代号"];
    $('#update_flows').empty();
    $("#UpdateMacDefModal").draggable();//为模态对话框添加拖拽
    $("#UpdateMacDefModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#UpdateMacDefModal').modal('show').on('shown.bs.modal', function (e) {
        $('#update_mcdefcode').focus();
    });
    GetFlows('update_flows', true, fcode);
});

//新增机台号
$(document).on('click', '.bindMedef', function () {
    $('#div_form_table #form_tb tr').css('background', '#ffffff');
    $('#add_machineuqcode').val("");//机台唯一码
    $('.des').val("");//机台备注
    $("#AddMacDefModal").draggable();//为模态对话框添加拖拽
    $("#AddMacDefModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddMacDefModal').modal('show').on('shown.bs.modal', function (e) {
        $('#add_mcdefcode').val("").focus();//机台号
    });
    GetFlows('flows', false);//工序设定
});


//新增机台号确认
$(document).on('click', '#add_macdefSure', function () {
    var mcdefcode = $('#add_mcdefcode').val();//机台号
    var flowcode = $('#flows option:selected').val();//工序代码
    var flowname = $('#flows option:selected').text();//工序名称
    var machineuqcode = $('#add_machineuqcode').val();//机台唯一码
    var des = $('.des').val();//机台备注
    if (mcdefcode && mcdefcode.length == 0) {
        alert("机台号不能为空");
        return;
    }
    if (machineuqcode == '全部' && machineuqcode.length == 0) {
        alert("机台唯一码不能为空");
        return;
    }
    if (flowcode == '全部' && flowname == '全部') {
        alert("请选择工序");
        return;
    }
        Addmdfcode(PORT, URL + "addMachinedefPC", {
            "mcdefcode": mcdefcode,
            "flowcode": flowcode,
            "flowname": flowname,
            "remarks": des,
            "machineuqcode": machineuqcode,
            "usercode": ""
        });
  
});


//修改机台号确认
$(document).on('click', '#update_macdefSure', function () {
    var mcdefcode = $('#update_mcdefcode').val();//机台号
    var flowcode = $('#update_flows option:selected').val();//工序代码
    var flowname = $('#update_flows option:selected').text();//工序名称
    var machineuqcode = $('#update_machineuqcode').val();//机台唯一码
    var des = $('.update_des').val();//机台备注
    if (mcdefcode && mcdefcode.length == 0) {
        alert("机台号不能为空");
        return;
    }
    if (machineuqcode == '全部' && machineuqcode.length == 0) {
        alert("机台唯一码不能为空");
        return;
    }
    if (flowcode == '全部' && flowname == '全部') {
        alert("请选择工序");
        return;
    }
        Updatemdfcode(PORT, URL + "updateMachineProductiondef", {
            "mcdefcode": mcdefcode,
            "flowcode": flowcode,
            "flowname": flowname,
            "remarks": des,
            "machineuqcode": machineuqcode,
            "usercode": "",
            "medfcode": $('#update_macdefSure').data("surecode")
        });

});





//删除机台号
$(document).on('click', '.MacdefDel', function () {
    swal({
        title: '你确定删除吗?',
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
    }).then(function (isConfirm) {
        if (isConfirm) {
            swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
        }
    });
});










/************************************* Ajax *******************************************/
function  Addmdfcode(urltype, pageurl, data) {
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
            $('#AddMacDefModal').modal('hide');
        },
        success: function (data) {
            hideLoading();
            if (data.errcode == 0) {
                alert(data.errmsg);
                $('#AddMacDefModal').modal('hide');
                GetList(PORT, URL + "getMachineProductiondef", Getseach());
            }
            else {
                alert(data.errmsg);
                $('#AddMacDefModal').modal('hide');


            }
        }
    });
}


/*
获取用户列表
*/
function Updatemdfcode(urltype, pageurl, data) {
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
            $('#AddMacDefModal').modal('hide');
            GetList(PORT, URL + "getMachineProductiondef", Getseach());
        },
        success: function (data) {
            hideLoading();
            if (data.errcode == 0) {
                alert(data.errmsg);
                $('#UpdateMacDefModal').modal('hide');
                GetList(PORT, URL + "getMachineProductiondef", Getseach());
            }
            else {
                alert(data.errmsg);
                $('#UpdateMacDefModal').modal('hide');
                GetList(PORT, URL + "getMachineProductiondef", Getseach());

            }
        }
    });
}








/*
获取用户列表
*/
function GetList(urltype, pageurl, data) {
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
                maindata = data.data;
                var content = '';
                $.each(data.data, function (idx, obj) {
                    content += '<tr>';
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 20)) + '</td>';
                    content += '<td>';
                    content += '<a   class="MacdefAdd" data-val="' + idx + '" >修改</a>';
                    content += '<a   class="MacdefDel" data-val="' + obj.medfcode + '" style="margin-left:5px;" >删除</a>';
                    content += '</td>';
                    content += '<td>' + obj.状态 + '</td>';
                    content += '<td>' + obj.机台号 + '</td>';
                    //content += '<td>' + obj.工序代号 + '</td>';
                    content += '<td>' + obj.工序名称 + '</td>';
                    //content += '<td>' + obj.创建人 + '</td>';
                    content += '<td>' + obj.备注 + '</td>';
                    //content += '<td>' + obj.创建时间 + '</td>';
                    content += '<td>' + obj.修改时间+ '</td>';
                    content += '<td>' + obj.修改人 + '</td>';
                    content += '<td>' + obj.修改次数 + '</td>';
                });
                $('#form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0016").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}





/************************************* Ajax End *******************************************/




/************************************* Search Start *******************************************/

//類型一
$(document).on('change', '#onetype', function () {
    if ($(this).val() == '全部') {
        $('#oneval').hide();
        return;
    }
    $('#oneval').val("").attr('placeholder', '请输入' + $(this).val()).show();

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
/************************************* Search End *******************************************/


//分页
$(function () {
    $("#pagination_P0016").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            page = currPage;
            GetList(PORT, URL + "getMachineProductiondef", Getseach());
        }
    });
});


$(document).on('click', '#form_th > tr > th', function () {
    $(this).toggleClass('contor');
    sortfield = $(this).attr('data-val');
    sort = '';
    if ($(this).hasClass('contor')) {
        sort = 'desc';
    }
    else {
        sorts = 'asc';
    }
    var currPage = $('.whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    page = 1;
    excel = '';
    GetList(PORT, URL + "getMachineProductiondef", Getseach());

});





//获取参数
function Getseach() {
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    twotype = $('#twotype').val();
   // twoval = $('#twoval').val();
    datetype = $('#datetype').val();
    numbertype = $('#numbertype').val();
    numbership = $('#numselect').val();
    numberval = $('#numqty').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    var data = {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "twoval": twoval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "page": page,
        "sortfield": sortfield,
        "sort": sort,
        "numbertype": numbertype,
        "numbership": numbership,
        "numberval": numberval,
        "excel": excel
    };
    return data;
}



//获取所有工序
function GetFlows(id, flag, fcode) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=requestdata",
        data: {
            "urltype": 'IIS3676',
            "pageurl": 'BusinessManage/AssemblyManage.aspx?action=getallflowprocess',
            "data": JSON.stringify({ "search": "", "page": 1 })
        },

        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            hideLoading();
            if (data.errcode == 0) {
                var content = '<option  value="全部">全部</option>';
                $.each(data.data, function (idx, obj) {
                    content += '<option  value="' + obj.工序代码 + '">' + obj.工序名称 + '</option>';
                });
                $('#' + id).empty().append(content);
                if (flag) {
                    $('#update_flows').find("option[value='" + fcode + "']").attr("selected", true);
                }else{
                    $('#flows').find("option[value='全部']").attr("selected", true);
                }
            }
            else {
                alert(data.errmsg)
            }
        }
    });

}
