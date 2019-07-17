﻿/*开启表格【全屏放大】模态窗口*/
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
    TimingRefresh();
});

/*
定时刷新
*/
function TimingRefresh() {
    GetList("IIS", "ReportTable/SlamaterialAreport.aspx?action=getslamaterialareportinfo", {});
    setTimeout(function () {
        //TimingRefresh();
    }, 20000);
}


$(document).on('click', '.panel .panel-heading > .panel-options a.savainfo', function () {
    if (confirm("确定保存历史？")) {
        SavaInfo("IIS", "ReportTable/SlamaterialAreport.aspx?action=addtodayslamaterialareportlog", {});
    }
});






/************************************* Ajax *******************************************/



/*
获取用户列表
*/
function GetList(urltype, pageurl, data) {
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
        },
        success: function (data) {
            if (data.errcode == 0) {
                var 行数 = 4;
                var content = '';
                var num1 = 0;
                $.each(data.data1, function (idx, obj) {
                    if (idx < 行数) {
                        num1++;
                        if (idx == 0) {
                            content += '<tr>';
                            content += '    <td rowspan="' + 行数 + '" style="vertical-align: middle;" class="wd_30">' + obj.部门 + '</td>';
                            content += '    <td class="wd_60">' + GetDateFormat(obj.报告日期, 'yyyy-MM-dd') + '</td>';
                            content += '    <td class="wd_40">' + obj.订单数 + '</td>';
                            content += '    <td class="wd_50">' + obj.材料款数 + '</td>';
                            content += '    <td class="wd_100">' + obj.当前状况.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_80">' + obj.预计交付日期.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_130">' + obj.sla交付影响.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="left_red wd_120">' + obj.异常事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_90">' + obj.协调事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="right_red wd_120">' + obj.今日重点事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_50">' + GetDateFormat(obj.更新时间, 'yyyy-MM-dd') + '</td>';
                            content += '</tr>';
                        }
                        else {
                            content += '<tr>';
                            content += '    <td class="wd_60">' + GetDateFormat(obj.报告日期, 'yyyy-MM-dd') + '</td>';
                            content += '    <td class="wd_40">' + obj.订单数 + '</td>';
                            content += '    <td class="wd_50">' + obj.材料款数 + '</td>';
                            content += '    <td class="wd_100">' + obj.当前状况.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_80">' + obj.预计交付日期.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_130">' + obj.sla交付影响.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="left_red wd_120">' + obj.异常事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_90">' + obj.协调事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="right_red wd_120">' + obj.今日重点事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_50">' + GetDateFormat(obj.更新时间, 'yyyy-MM-dd') + '</td>';
                            content += '</tr>';
                        }
                    }
                });

                for (var i = num1; i < 行数; i++) {
                    if (i == 0) {
                        content += '<tr>';
                        content += '    <td rowspan="' + 行数 + '" style="vertical-align: middle;" class="wd_30">机加1</td>';
                        content += '    <td class="wd_60"></td>';
                        content += '    <td class="wd_40"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '    <td class="wd_100"></td>';
                        content += '    <td class="wd_80"></td>';
                        content += '    <td class="wd_130"></td>';
                        content += '    <td class="left_red wd_120"></td>';
                        content += '    <td class="wd_90"></td>';
                        content += '    <td class="right_red wd_120"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '</tr>';
                    }
                    else {
                        content += '<tr>';
                        content += '    <td class="wd_60"></td>';
                        content += '    <td class="wd_40"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '    <td class="wd_100"></td>';
                        content += '    <td class="wd_80"></td>';
                        content += '    <td class="wd_130"></td>';
                        content += '    <td class="left_red wd_120"></td>';
                        content += '    <td class="wd_90"></td>';
                        content += '    <td class="right_red wd_120"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '</tr>';
                    }
                }



                var num5 = 0;
                $.each(data.data5, function (idx, obj) {
                    if (idx < 行数) {
                        num5++;
                        if (idx == 0) {
                            content += '<tr>';
                            content += '    <td rowspan="' + 行数 + '" style="vertical-align: middle;" class="wd_30">' + obj.部门 + '</td>';
                            content += '    <td class="wd_60">' + GetDateFormat(obj.报告日期, 'yyyy-MM-dd') + '</td>';
                            content += '    <td class="wd_40">' + obj.订单数 + '</td>';
                            content += '    <td class="wd_50">' + obj.材料款数 + '</td>';
                            content += '    <td class="wd_100">' + obj.当前状况.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_80">' + obj.预计交付日期.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_130">' + obj.sla交付影响.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="left_red wd_120">' + obj.异常事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_90">' + obj.协调事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="right_red wd_120">' + obj.今日重点事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_50">' + GetDateFormat(obj.更新时间, 'yyyy-MM-dd') + '</td>';
                            content += '</tr>';
                        }
                        else {
                            content += '<tr>';
                            content += '    <td class="wd_60">' + GetDateFormat(obj.报告日期, 'yyyy-MM-dd') + '</td>';
                            content += '    <td class="wd_40">' + obj.订单数 + '</td>';
                            content += '    <td class="wd_50">' + obj.材料款数 + '</td>';
                            content += '    <td class="wd_100">' + obj.当前状况.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_80">' + obj.预计交付日期.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_130">' + obj.sla交付影响.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="left_red wd_120">' + obj.异常事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_90">' + obj.协调事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="right_red wd_120">' + obj.今日重点事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_50">' + GetDateFormat(obj.更新时间, 'yyyy-MM-dd') + '</td>';
                            content += '</tr>';
                        }
                    }
                });

                for (var i = num5; i < 行数; i++) {
                    if (i == 0) {
                        content += '<tr>';
                        content += '    <td rowspan="' + 行数 + '" style="vertical-align: middle;" class="wd_30">机加2</td>';
                        content += '    <td class="wd_60"></td>';
                        content += '    <td class="wd_40"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '    <td class="wd_100"></td>';
                        content += '    <td class="wd_80"></td>';
                        content += '    <td class="wd_130"></td>';
                        content += '    <td class="left_red wd_120"></td>';
                        content += '    <td class="wd_90"></td>';
                        content += '    <td class="right_red wd_120"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '</tr>';
                    }
                    else {
                        content += '<tr>';
                        content += '    <td class="wd_60"></td>';
                        content += '    <td class="wd_40"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '    <td class="wd_100"></td>';
                        content += '    <td class="wd_80"></td>';
                        content += '    <td class="wd_130"></td>';
                        content += '    <td class="left_red wd_120"></td>';
                        content += '    <td class="wd_90"></td>';
                        content += '    <td class="right_red wd_120"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '</tr>';
                    }
                }

                



                var num2 = 0;
                $.each(data.data2, function (idx, obj) {
                    if (idx < 行数) {
                        num2++;
                        if (idx == 0) {
                            content += '<tr>';
                            content += '    <td rowspan="' + 行数 + '" style="vertical-align: middle;" class="wd_30">' + obj.部门 + '</td>';
                            content += '    <td class="wd_60">' + GetDateFormat(obj.报告日期, 'yyyy-MM-dd') + '</td>';
                            content += '    <td class="wd_40">' + obj.订单数 + '</td>';
                            content += '    <td class="wd_50">' + obj.材料款数 + '</td>';
                            content += '    <td class="wd_100">' + obj.当前状况.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_80">' + obj.预计交付日期.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_130">' + obj.sla交付影响.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="left_red wd_120">' + obj.异常事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_90">' + obj.协调事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="right_red wd_120">' + obj.今日重点事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_50">' + GetDateFormat(obj.更新时间, 'yyyy-MM-dd') + '</td>';
                            content += '</tr>';
                        }
                        else {
                            content += '<tr>';
                            content += '    <td class="wd_60">' + GetDateFormat(obj.报告日期, 'yyyy-MM-dd') + '</td>';
                            content += '    <td class="wd_40">' + obj.订单数 + '</td>';
                            content += '    <td class="wd_50">' + obj.材料款数 + '</td>';
                            content += '    <td class="wd_100">' + obj.当前状况.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_80">' + obj.预计交付日期.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_130">' + obj.sla交付影响.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="left_red wd_120">' + obj.异常事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_90">' + obj.协调事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="right_red wd_120">' + obj.今日重点事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_50">' + GetDateFormat(obj.更新时间, 'yyyy-MM-dd') + '</td>';
                            content += '</tr>';
                        }
                    }
                });

                for (var i = num2; i < 行数; i++) {
                    if (i == 0) {
                        content += '<tr>';
                        content += '    <td rowspan="' + 行数 + '" style="vertical-align: middle;" class="wd_30">外发</td>';
                        content += '    <td class="wd_60"></td>';
                        content += '    <td class="wd_40"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '    <td class="wd_100"></td>';
                        content += '    <td class="wd_80"></td>';
                        content += '    <td class="wd_130"></td>';
                        content += '    <td class="left_red wd_120"></td>';
                        content += '    <td class="wd_90"></td>';
                        content += '    <td class="right_red wd_120"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '</tr>';
                    }
                    else {
                        content += '<tr>';
                        content += '    <td class="wd_60"></td>';
                        content += '    <td class="wd_40"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '    <td class="wd_100"></td>';
                        content += '    <td class="wd_80"></td>';
                        content += '    <td class="wd_130"></td>';
                        content += '    <td class="left_red wd_120"></td>';
                        content += '    <td class="wd_90"></td>';
                        content += '    <td class="right_red wd_120"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '</tr>';
                    }
                }




                var num3 = 0;
                $.each(data.data3, function (idx, obj) {
                    if (idx < 行数) {
                        num3++;
                        if (idx == 0) {
                            content += '<tr>';
                            content += '    <td rowspan="' + 行数 + '" style="vertical-align: middle;" class="wd_30">' + obj.部门 + '</td>';
                            content += '    <td class="wd_60">' + GetDateFormat(obj.报告日期, 'yyyy-MM-dd') + '</td>';
                            content += '    <td class="wd_40">' + obj.订单数 + '</td>';
                            content += '    <td class="wd_50">' + obj.材料款数 + '</td>';
                            content += '    <td class="wd_100">' + obj.当前状况.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_80">' + obj.预计交付日期.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_130">' + obj.sla交付影响.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="left_red wd_120">' + obj.异常事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_90">' + obj.协调事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="right_red wd_120">' + obj.今日重点事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_50">' + GetDateFormat(obj.更新时间, 'yyyy-MM-dd') + '</td>';
                            content += '</tr>';
                        }
                        else {
                            content += '<tr>';
                            content += '    <td class="wd_60">' + GetDateFormat(obj.报告日期, 'yyyy-MM-dd') + '</td>';
                            content += '    <td class="wd_40">' + obj.订单数 + '</td>';
                            content += '    <td class="wd_50">' + obj.材料款数 + '</td>';
                            content += '    <td class="wd_100">' + obj.当前状况.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_80">' + obj.预计交付日期.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_130">' + obj.sla交付影响.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="left_red wd_120">' + obj.异常事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_90">' + obj.协调事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="right_red wd_120">' + obj.今日重点事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_50">' + GetDateFormat(obj.更新时间, 'yyyy-MM-dd') + '</td>';
                            content += '</tr>';
                        }
                    }
                });

                for (var i = num3; i < 行数; i++) {
                    if (i == 0) {
                        content += '<tr>';
                        content += '    <td rowspan="' + 行数 + '" style="vertical-align: middle;" class="wd_30">采购</td>';
                        content += '    <td class="wd_60"></td>';
                        content += '    <td class="wd_40"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '    <td class="wd_100"></td>';
                        content += '    <td class="wd_80"></td>';
                        content += '    <td class="wd_130"></td>';
                        content += '    <td class="left_red wd_120"></td>';
                        content += '    <td class="wd_90"></td>';
                        content += '    <td class="right_red wd_120"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '</tr>';
                    }
                    else {
                        content += '<tr>';
                        content += '    <td class="wd_60"></td>';
                        content += '    <td class="wd_40"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '    <td class="wd_100"></td>';
                        content += '    <td class="wd_80"></td>';
                        content += '    <td class="wd_130"></td>';
                        content += '    <td class="left_red wd_120"></td>';
                        content += '    <td class="wd_90"></td>';
                        content += '    <td class="right_red wd_120"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '</tr>';
                    }
                }






                var num4 = 0;
                $.each(data.data4, function (idx, obj) {
                    if (idx < 行数) {
                        num4++;
                        if (idx == 0) {
                            content += '<tr>';
                            content += '    <td rowspan="' + 行数 + '" style="vertical-align: middle;" class="wd_30">' + obj.部门 + '</td>';
                            content += '    <td class="wd_60">' + GetDateFormat(obj.报告日期, 'yyyy-MM-dd') + '</td>';
                            content += '    <td class="wd_40">' + obj.订单数 + '</td>';
                            content += '    <td class="wd_50">' + obj.材料款数 + '</td>';
                            content += '    <td class="wd_100">' + obj.当前状况.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_80">' + obj.预计交付日期.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_130">' + obj.sla交付影响.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="left_red wd_120">' + obj.异常事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_90">' + obj.协调事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="right_red wd_120">' + obj.今日重点事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_50">' + GetDateFormat(obj.更新时间, 'yyyy-MM-dd') + '</td>';
                            content += '</tr>';
                        }
                        else {
                            content += '<tr>';
                            content += '    <td class="wd_60">' + GetDateFormat(obj.报告日期, 'yyyy-MM-dd') + '</td>';
                            content += '    <td class="wd_40">' + obj.订单数 + '</td>';
                            content += '    <td class="wd_50">' + obj.材料款数 + '</td>';
                            content += '    <td class="wd_100">' + obj.当前状况.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_80">' + obj.预计交付日期.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_130">' + obj.sla交付影响.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="left_red wd_120">' + obj.异常事项.replace(/\n/g, "<br />") + '</td>';
                            content += '    <td class="wd_90">' + obj.协调事项.replace(/\n/g, "<br />") + '</td>';
                            if (i == 5) {
                                content += '    <td class="right_red bottom_red wd_120">' + obj.今日重点事项.replace(/\n/g, "<br />") + '</td>';
                            } else {
                                content += '    <td class="right_red wd_120">' + obj.今日重点事项.replace(/\n/g, "<br />") + '</td>';
                            }
                            content += '    <td class="wd_50">' + GetDateFormat(obj.更新时间, 'yyyy-MM-dd') + '</td>';
                            content += '</tr>';
                        }
                    }
                });

                for (var i = num4; i < 行数; i++) {
                    if (i == 0) {
                        content += '<tr>';
                        content += '    <td rowspan="' + 行数 + '" style="vertical-align: middle;" class="wd_30">装配</td>';
                        content += '    <td class="wd_60"></td>';
                        content += '    <td class="wd_40"></td>';
                        content += '    <td class="wd_50"></td>';
                        content += '    <td class="wd_100"></td>';
                        content += '    <td class="wd_80"></td>';
                        content += '    <td class="wd_130"></td>';
                        if (i == 5) {
                            content += '    <td class="left_red bottom_red wd_120"></td>';
                            content += '    <td class="bottom_red wd_90"></td>';
                            content += '    <td class="right_red bottom_red wd_120"></td>';
                        } else {
                            content += '    <td class="left_red wd_120"></td>';
                            content += '    <td class="wd_90"></td>';
                            content += '    <td class="right_red wd_120"></td>';
                        }
                        content += '    <td class="wd_50"></td>';
                        content += '</tr>';
                    } else {
                        content += '<tr>';
                        content += '    <td></td>';
                        content += '    <td></td>';
                        content += '    <td></td>';
                        content += '    <td></td>';
                        content += '    <td></td>';
                        content += '    <td></td>';
                        if (i == 5) {
                            content += '    <td class="left_red bottom_red"></td>';
                            content += '    <td class="bottom_red"></td>';
                            content += '    <td class="right_red bottom_red"></td>';

                        } else {
                            content += '    <td class="left_red"></td>';
                            content += '    <td class=""></td>';
                            content += '    <td class="right_red"></td>';
                        }
                        content += '    <td></td>';
                        content += '</tr>';
                    }
                }







                $('#form_tb').empty();
                $('#form_tb').append(content);

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



function SavaInfo(urltype, pageurl, data) {
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
        },
        success: function (data) {
            if (data.errcode == 0) {
                alert('添加成功！')
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}