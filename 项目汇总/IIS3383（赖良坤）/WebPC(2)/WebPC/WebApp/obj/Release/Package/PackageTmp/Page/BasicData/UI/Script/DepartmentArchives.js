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



$(function () {
    GetDepartmentList("IIS", "BasicData.aspx?action=getdepartmentlist", {});
})




$(document).on('click', '#adddepartmentinfo', function () {
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#AddDepartmentModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddDepartmentModal').modal('show')
});




$(document).on('click', '#add_sure', function () {
    var departmentname = $('#add_departmentname').val();
    var remark = $('#add_remark').val();
    var superiorcode = $('#add_superiorcode').val();
    AddDepartment("IIS", "BasicData.aspx?action=adddepartment", {
        "departmentname": departmentname,
        "remark": remark,
        "superiorcode": superiorcode
    });
});


$(document).on('click', '#department_list .fa.fa-minus', function () {
    $(this).parent('.dd-handle.dd3-handle').parent('li.dd-item.dd3-item').next('ol.dd-list').hide();
    $(this).addClass('fa-plus').removeClass('fa-minus');
});


$(document).on('click', '#department_list .fa.fa-plus', function () {
    $(this).parent('.dd-handle.dd3-handle').parent('li.dd-item.dd3-item').next('ol.dd-list').show();
    $(this).addClass('fa-minus').removeClass('fa-plus');
});



/************************************* Ajax *******************************************/

/*
请求部门列表
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
                var json_obj = new Array();
                var content = '';
                var option = '<option value="">无上级</option>';
                $.each(data.data, function (idx, obj) {
                    var data1 = {
                        "departmentcode": obj.departmentcode,
                        "departmentname": obj.departmentname,
                        "remark": obj.remark,
                        "superiorcode": obj.superiorcode
                    }
                    json_obj.push(data1);
                    
                    option += '<option value="' + obj.departmentcode + '">' + obj.departmentname + ' （' + obj.departmentcode + '）' + '</option>';
                });

                
                var recursion = getJsonTree(json_obj, '');
                content = RecursionMenu(recursion);
                $('#department_list').empty();
                $('#department_list').append(content);
                //$('#form_tb').empty();
                //$('#form_tb').append(content);
                $('#add_superiorcode').empty();
                $('#add_superiorcode').append(option);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

/*
递归输出菜单
*/
function RecursionMenu(recursion) {
    var content = '';
    content += '<ol class="dd-list">';
    for (var i = 0; i < recursion.length; i++) {
        content += '<li class="dd-item dd3-item">';
        if (recursion[i].nodes.length > 0) {
            content += '    <div class="dd-handle dd3-handle"><i class="fa fa-minus"></i></div>';
        } else {
            content += '    <div class="dd-handle dd3-handle"></div>';
        }
        content += '    <div class="dd3-content">';
        content += '        <div class="left_content">' + recursion[i].departmentname + '</div>';
        content += '        <div class="right_content">';
        content += '            <a href="JavaSricpt:;" class="edit" data-departmentcode="' + recursion[i].departmentcode + '" data-departmentname="' + recursion[i].departmentname + '">编辑</a>';
        content += '            <a href="JavaSricpt:;" class="del" data-departmentcode="' + recursion[i].departmentcode + '" data-departmentname="' + recursion[i].departmentname + '">删除</a>';
        content += '        </div>';
        content += '    </div>';
        content += '</li>';
        if (recursion[i].nodes.length > 0)
        {
            content += RecursionMenu(recursion[i].nodes)
        }
    }
    content += '</ol>';
    return content;
}

var getJsonTree = function (json_obj, superiorcode) {
    var itemArr = [];
    for (var i = 0; i < json_obj.length; i++) {
        var node = json_obj[i];
        //data.splice(i, 1)
        if (node.superiorcode == superiorcode) {
            var newNode = {
                "departmentcode": node.departmentcode,
                "departmentname": node.departmentname,
                "remark": node.remark,
                "nodes": getJsonTree(json_obj, node.departmentcode)
            };
            itemArr.push(newNode);
        }
    }
    return itemArr;
}


/*
请求添加部门列表
*/
function AddDepartment(urltype, pageurl, data) {
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
                GetDepartmentList("IIS", "BasicData.aspx?action=getdepartmentlist", {});
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/************************************* Ajax End *******************************************/