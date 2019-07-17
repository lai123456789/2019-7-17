var onetype = '';
var oneval = '';
var numbertype = '';


$(function () {
    GetGroupList("IIS", "Machining/MachiningManage.aspx?action=getcncgroup", {
        "departmenttype": "CNC2"
    });
});


$(document).on('click', '#top_main > .infolist', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
    var index = $(this).index();
    $('#mid_main > .infolist:eq(' + index + ')').addClass('contor').siblings().removeClass('contor');
});




$(document).on('change', '#onetype', function () {
    var 类型一 = $(this).val();
    if (类型一 == '全部') {
        $('#oneval').hide();
    }
    else {
        $('#oneval').attr('placeholder', '请输入' + 类型一);
        $('#oneval').show();
        $('#oneval').focus();
    }
});


$(document).on('click', '#query_title > .query_content .query_btn', function () {
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    numbertype = $('#numbertype').val();

    GetDataList("IIS", "Machining/MachiningManage.aspx?action=getcnclist", {
        "twotype": "CNC2",
        "onetype": onetype,
        "oneval": oneval,
        "numbertype": numbertype
    });
});


//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('#oneval').is(':focus')) {
            $('#query_title > .query_content .query_btn').click();
        }
    }
})


$(document).on('click', '#add_cncgroup', function () {
    $('#AddCncgroupList').modal('show');
});


/*
弹出编辑分组
*/
$(document).on('click', '#set_cncgroup.contor', function () {
    var 分组代码 = $('#top_main > .infolist.contor').attr('data-val');
    var 分组名称 = $('#top_main > .infolist.contor').text();
    $('#set_cncgname').text(分组名称);
    $('#set_cncgname').attr('data-val', 分组代码);
    $('#SetCncgroupList').modal('show');
});


/*
编辑分组-确定
*/
$(document).on('click', '#set_sure', function () {
    var 分组名称 = $('#set_cncgname').val();
    var 分组代码 = $('#set_cncgname').attr('data-val');
    var 新分组名称 = $('#set_newcncgname').val();
    SetCNCGroup("IIS", "Machining/MachiningManage.aspx?action=setcncgroup", {
        "departmenttype": "CNC2",
        "cncgcode": 分组代码,
        "cncgname": 新分组名称
    });
});

/*
弹出删除分组
*/
$(document).one('click', '#del_cncgroup.contor', function () {
    var 分组代码 = $('#top_main > .infolist.contor').attr('data-val');
    var 分组名称 = $('#top_main > .infolist.contor').text();
    $('#del_cncgname').text(分组名称);
    $('#del_cncgname').attr('data-val', 分组代码);
    $('#DelCncgroupList').modal('show');
});


$(document).on('click', '#del_sure', function () {
    var 分组代码 = $('#del_cncgname').attr('data-val');
    DelCNCGroup("IIS", "Machining/MachiningManage.aspx?action=delcncgroup", {
        "departmenttype": "CNC2",
        "cncgcode": 分组代码
    });
});


/*
添加组别
*/
$(document).one('click', '#add_sure', function () {
    var cncgname = $('#add_cncgname').val();
    AddGroupList("IIS", "Machining/MachiningManage.aspx?action=addcncgroup", {
        "departmenttype": "CNC2",
        "cncgname": cncgname
    });
})




/*
点击分组名称时
*/
$(document).on('click', '#top_main > .infolist', function () {
    var 分组代码 = $(this).attr('data-val');
    if (分组代码 == '') {
        $('#set_cncgroup').removeClass('contor');
        $('#del_cncgroup').removeClass('contor');
    } else {
        $('#set_cncgroup').addClass('contor');
        $('#del_cncgroup').addClass('contor');
    }
});



$(document).on('click', '#mid_main > .infolist > .cnclist > .mid > .box1', function () {
    var cnccode = $(this).parents('.cnclist').attr('data-cnccode');
    var cncgcode = $(this).attr('data-val');
    $('#bindgroup').val(cncgcode);
    $('#bind_sure').attr('data-cnccode', cnccode);
    $('#BindCncgroupList').modal('show');
});

/*
绑定分组
*/
$(document).on('click', '#bind_sure', function () {
    var cnccode = $(this).attr('data-cnccode');
    var cncgcode = $('#bindgroup').val();
    BindCNCGroup("IIS", "Machining/MachiningManage.aspx?action=bindcncgroup", {
        "departmenttype": "CNC2",
        "cncgcode": cncgcode,
        "cnccode": cnccode
    });
});

/******************************************************************************************/
/*
请求数据
*/
function GetGroupList(urltype, pageurl, data) {
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
                var content = '<div class="infolist contor" data-val="">全部</div>';

                var content_option = '';

                $.each(data.data, function (idx, obj) {
                    content += '<div class="infolist" data-val="' + obj.分组代码 + '">' + obj.分组名称 + '</div>';
                    content_option += '<option value="' + obj.分组代码 + '">' + obj.分组名称 + '</option>';
                });

                $('#bindgroup').empty();
                $('#bindgroup').append(content_option);

                $('#top_main').empty();
                $('#top_main').append(content);

                GetDataList("IIS", "Machining/MachiningManage.aspx?action=getcnclist", {
                    "twotype": "CNC2"
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}





/*
添加组
*/
function AddGroupList(urltype, pageurl, data) {
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
                GetGroupList("IIS", "Machining/MachiningManage.aspx?action=getcncgroup", {
                    "departmenttype": "CNC2"
                });
                alert('添加成功');
                $('#AddCncgroupList').modal('hide');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}






/*
编辑组
*/
function SetCNCGroup(urltype, pageurl, data) {
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
                GetGroupList("IIS", "Machining/MachiningManage.aspx?action=getcncgroup", {
                    "departmenttype": "CNC2"
                });
                alert('修改成功');
                $('#SetCncgroupList').modal('hide');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}







/*
删除组
*/
function DelCNCGroup(urltype, pageurl, data) {
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
                GetGroupList("IIS", "Machining/MachiningManage.aspx?action=getcncgroup", {
                    "departmenttype": "CNC2"
                });
                alert('删除成功');
                $('#DelCncgroupList').modal('hide');
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

                var 组别 = new Array();


                var 组别对象 = $('#top_main > .infolist');
                for (var i = 0; i < 组别对象.length; i++) {
                    var 组别代码 = $(组别对象[i]).attr('data-val');
                    组别.push(组别代码);
                    if (i == 0) {
                        content += '<div class="infolist contor" data-val="' + 组别代码 + '"></div>';
                    } else {
                        content += '<div class="infolist" data-val="' + 组别代码 + '"></div>';
                    }
                }

                $('#mid_main').empty();
                $('#mid_main').append(content);

                for (var i = 0; i < 组别.length; i++) {
                    var content2 = '';
                    $.each(data.data, function (idx, obj) {

                        if (组别[i] == '') {
                            switch (obj.状态) {
                                case "故障":
                                    content2 += '<div class="cnclist redcolor" data-cnccode="' + obj.代码 + '">';
                                    break;
                                case "离线":
                                    content2 += '<div class="cnclist redcolor" data-cnccode="' + obj.代码 + '">';
                                    break;
                                default:
                                    content2 += '<div class="cnclist bluecolor" data-cnccode="' + obj.代码 + '">';
                                    break;
                            }
                            content2 += '    <div class="top">';
                            content2 += '        <div class="rows1">';
                            content2 += '            <div class="column1">' + obj.机型 + '</div>';
                            content2 += '            <div class="column2">';
                            switch (obj.状态) {
                                case "待命":
                                    content2 += '                <div class="status greycolor"></div>';
                                    break;
                                case "进行":
                                    content2 += '                <div class="status goingcolor"></div>';
                                    break;
                                case "完成":
                                    content2 += '                <div class="status greencolor"></div>';
                                    break;
                                case "故障":
                                    content2 += '                <div class="status redcolor"></div>';
                                    break;
                                case "调机":
                                    content2 += '                <div class="status orangecolor"></div>';
                                    break;
                                case "离线":
                                    content2 += '                <div class="status whitecolor"></div>';
                                    break;
                            }
                            content2 += '            </div>';
                            content2 += '        </div>';
                            content2 += '        <div class="rows2">';
                            content2 += '            <div class="column1">' + obj.规格 + '</div>';
                            content2 += '            <div class="column2">' + obj.机台号 + '</div>';
                            content2 += '        </div>';
                            content2 += '    </div>';
                            content2 += '    <div class="mid">';
                            if (obj.组别名称 == '') {
                                content2 += '        <div class="box1" data-val="' + obj.组别 + '">【未分组】</div>';
                            } else {
                                content2 += '        <div class="box1" data-val="' + obj.组别 + '">' + obj.组别名称 + '</div>';
                            }
                            content2 += '    </div>';
                            content2 += '    <div class="under">';
                            content2 += '        <div class="rows1">';
                            content2 += '            <div class="left">当月运行时长：</div>';
                            content2 += '            <div class="right">' + obj.当月运行总时长 + 'h</div>';
                            content2 += '        </div>';
                            content2 += '        <div class="rows2">';
                            content2 += '            <div class="left">当天运行时长：</div>';
                            content2 += '            <div class="right">' + obj.当日运行总时长 + 'h</div>';
                            content2 += '        </div>';
                            content2 += '        <div class="rows3">';
                            content2 += '            <div class="left">当天运行次数：</div>';
                            content2 += '            <div class="right">' + obj.当日运行总次数 + '</div>';
                            content2 += '        </div>';
                            content2 += '        <div class="rows4">';
                            content2 += '            <div class="left">当月运行次数：</div>';
                            content2 += '            <div class="right">' + obj.当月运行总时长 + '</div>';
                            content2 += '        </div>';
                            content2 += '        <div class="rows5">';
                            content2 += '            <div class="left">最近运行时间：</div>';
                            if (obj.最近一次操作时间 == '') {
                                content2 += '            <div class="right"></div>';
                            } else {
                                content2 += '            <div class="right">' + GetDateFormat(obj.最近一次操作时间, 'MM-dd HH:mm') + '</div>';
                            }
                            content2 += '        </div>';
                            content2 += '        <div class="rows6">';
                            content2 += '            <div class="left">当前操作人员：</div>';
                            content2 += '            <div class="right">' + obj.最近一次操作人 + '</div>';
                            content2 += '        </div>';
                            content2 += '    </div>';
                            content2 += '</div>';
                        }
                        else if (组别[i] == obj.组别) {
                            switch (obj.状态) {
                                case "故障":
                                    content2 += '<div class="cnclist redcolor" data-cnccode="' + obj.代码 + '">';
                                    break;
                                case "离线":
                                    content2 += '<div class="cnclist redcolor" data-cnccode="' + obj.代码 + '">';
                                    break;
                                default:
                                    content2 += '<div class="cnclist bluecolor" data-cnccode="' + obj.代码 + '">';
                                    break;
                            }
                            content2 += '    <div class="top">';
                            content2 += '        <div class="rows1">';
                            content2 += '            <div class="column1">' + obj.机型 + '</div>';
                            content2 += '            <div class="column2">';
                            switch (obj.状态) {
                                case "待命":
                                    content2 += '                <div class="status greycolor"></div>';
                                    break;
                                case "进行":
                                    content2 += '                <div class="status goingcolor"></div>';
                                    break;
                                case "完成":
                                    content2 += '                <div class="status greencolor"></div>';
                                    break;
                                case "故障":
                                    content2 += '                <div class="status redcolor"></div>';
                                    break;
                                case "调机":
                                    content2 += '                <div class="status orangecolor"></div>';
                                    break;
                                case "离线":
                                    content2 += '                <div class="status whitecolor"></div>';
                                    break;
                            }
                            content2 += '            </div>';
                            content2 += '        </div>';
                            content2 += '        <div class="rows2">';
                            content2 += '            <div class="column1">' + obj.规格 + '</div>';
                            content2 += '            <div class="column2">' + obj.机台号 + '</div>';
                            content2 += '        </div>';
                            content2 += '    </div>';
                            content2 += '    <div class="mid">';
                            if (obj.组别名称 == '') {
                                content2 += '        <div class="box1" data-val="' + obj.组别 + '">【未分组】</div>';
                            } else {
                                content2 += '        <div class="box1" data-val="' + obj.组别 + '">' + obj.组别名称 + '</div>';
                            }
                            content2 += '    </div>';
                            content2 += '    <div class="under">';
                            content2 += '        <div class="rows1">';
                            content2 += '            <div class="left">当月运行时长：</div>';
                            content2 += '            <div class="right">' + obj.当月运行总时长 + 'h</div>';
                            content2 += '        </div>';
                            content2 += '        <div class="rows2">';
                            content2 += '            <div class="left">当天运行时长：</div>';
                            content2 += '            <div class="right">' + obj.当日运行总时长 + 'h</div>';
                            content2 += '        </div>';
                            content2 += '        <div class="rows3">';
                            content2 += '            <div class="left">当天运行次数：</div>';
                            content2 += '            <div class="right">' + obj.当日运行总次数 + '</div>';
                            content2 += '        </div>';
                            content2 += '        <div class="rows4">';
                            content2 += '            <div class="left">当月运行次数：</div>';
                            content2 += '            <div class="right">' + obj.当月运行总时长 + '</div>';
                            content2 += '        </div>';
                            content2 += '        <div class="rows5">';
                            content2 += '            <div class="left">最近运行时间：</div>';
                            if (obj.最近一次操作时间 == '') {
                                content2 += '            <div class="right"></div>';
                            } else {
                                content2 += '            <div class="right">' + GetDateFormat(obj.最近一次操作时间, 'MM-dd HH:mm') + '</div>';
                            }
                            content2 += '        </div>';
                            content2 += '        <div class="rows6">';
                            content2 += '            <div class="left">当前操作人员：</div>';
                            content2 += '            <div class="right">' + obj.最近一次操作人 + '</div>';
                            content2 += '        </div>';
                            content2 += '    </div>';
                            content2 += '</div>';
                        }

                        /*
                        代码: "cnc0009"
                        创建时间: "2019/5/27 11:22:19"
                        序号: "1"
                        当日运行总时长: ""
                        当日运行总次数: "0"
                        当月运行总时长: ""
                        当月运行总次数: "0"
                        心跳时间: ""
                        换刀后累计次数: "0"
                        操作员名称: ""
                        最近一次操作人: ""
                        最近一次操作时间: ""
                        机台号: "MC-01"
                        机型: "三菱（乌龟机）"
                        状态: "离线"
                        线别: "CNC2"
                        线别名称: "机加1部"
                        组别: ""
                        组别名称: ""
                        规格: "400*400*350"
                        设备编码: ""
                        */

                    });

                    $('#mid_main > .infolist:eq(' + i + ')').empty();
                    $('#mid_main > .infolist:eq(' + i + ')').append(content2);
                }


                var index = $('#top_main > .infolist.contor').index();
                $('#mid_main > .infolist:eq(' + index + ')').addClass('contor').siblings().removeClass('contor');

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}





/*
绑定组
*/
function BindCNCGroup(urltype, pageurl, data) {
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
                GetDataList("IIS", "Machining/MachiningManage.aspx?action=getcnclist", {
                    "twotype": "CNC2"
                });
                alert('绑定成功');
                $('#BindCncgroupList').modal('hide');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}
