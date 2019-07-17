var page = 1;
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
var 当前页 = 1;
var 最大页数 = 1;
var 替换的文字 = new Array();

$(document).on('tap', '#topinfo > .box1', function (e) {
    stopDefault(e);
    $(this).addClass('contor').siblings().removeClass('contor');
    var index = $(this).index();
    $('#infodata > .list1:eq(' + index + ')').addClass('contor').siblings().removeClass('contor');
    var code = $('#usercode').val();
    用户查询('IIS3382', '/Proposer.aspx?action=GetApply', {
        "usercode": code,
        "page": page
    });
});


//---滑动到底部事件
$(document).on("pageshow", "#maindiv", function () {
    var start, end;
    $('#maindiv').on("scrollstart", function (event) {
        start = $('#maindiv').scrollTop();
    })
    $('#maindiv').on("scrollstop", function (event) {
        end = $('#maindiv').scrollTop();

        if ((end - start) >= 0) {
            if (end >= $('#infodata > .list1').height() - $('#maindiv').height()) {
                page += 1;
                var code = $('#usercode').val();
                用户查询('IIS3382', '/Proposer.aspx?action=GetApply', {
                    "usercode": code,
                    "page":page
                });
            }
        }
    })
});



/*
详情按钮
*/
$(document).on('tap', '#infodata > .list1 > .infolist > .right > .box2 > .details_btn', function (e) {
    stopDefault(e);
    var 状态 = $(this).parents('.infolist').find('.left > .box2 .status').text();

    var pcode = $(this).parents('.infolist').find('.left > .box1').text();

    switch (状态) {
        case "未审批":
            状态 = 1;
            break;
        case "已批车":
            状态 = 2;
            break;
        case "使用中":
            状态 = 3;
            break;
        case "不通过":
            状态 = 4;
            break;
        case "已还车":
            状态 = 5;
            break;
        case "已超时":
            状态 = 6;
            break;
        case "已撤销":
            状态 = 7;
            break;
    }
    location.href = 'CarAppOrderDetails.aspx?type=' + 状态 + "&" + 'pcode=' + pcode;
});

/*
撤回按钮
*/
var 单号 = "";
$(document).on('tap', '#infodata > .list1 > .infolist > .right > .box2 > .undo_btn', function (e) {
    stopDefault(e);
    单号 = $(this).parents('.infolist').find('.left > .box1').text();
    $('#approval_modal').addClass('contor');
    $('#mask300').addClass('contor');
    $('#orderno').text(单号);
    $('#undo_modal').addClass('contor');
    $('#mask300').addClass('contor');
   
});

/*
取消撤回按钮
*/
$(document).on('tap', '#undo_modal > .bottom > .btn_cancel', function (e) {
    stopDefault(e);
    $('#undo_modal').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
});

/*
确定撤回按钮
*/
$(document).on('tap', '#undo_modal > .bottom > .btn_sure', function (e) {
    stopDefault(e);
    /*
    这里处理撤回成功的Ajax
    */
    //alert('撤回成功')
    $('#undo_modal').addClass('contor');
    $('#undo_modal').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
    var 撤销单号 = getQueryString('pcode');
    var 原因 = $('#remark').val();
    //这里调用Ajax方法
    提交('IIS3382', '/Proposer.aspx?action=ApplyRepeal', {
        "applycode": 单号,
        "repeal": 原因,
    });
});
$(function (e) {
    stopDefault(e);
    var code = $('#usercode').val();
    用户查询('IIS3382', '/Proposer.aspx?action=GetApply', {
        "usercode": code
    });
})



function 提交(urltype, pageurl, data) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
            hideLoading();
            caution(data.errmsg);
        },
        success: function (data) {
            if (data.errcode == 0) {
                success('提交申请成功', 'CarAppOrder.aspx')
                //alert("提交申请成功！");
                //setTimeout(function () {
                //    location.href = "VehicleOrder.aspx";
                //}, 1000)
            }
            else {
                caution(data.errmsg);
            }
        }
    });
}

/*
获取装配汇总列表
*/
function 用户查询(urltype, pageurl, data, page) {
    if (page == null) {
        page = 1;
    }
    if (page > 最大页数) {
        return;
    }
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
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


                if ($('#topinfo > .box1.contor').text() == "全部") {
                    $.each(data.data, function (idx, obj) {


                        if (obj.status == 0) {
                            content += ' <div class="infolist">';
                            content += '     <div class="left">';
                            content += '         <div class="box1">' + obj.applycode + '</div>';
                            //content += '         </div>';
                            content += '         <div class="box2">';
                            content += '             <div class="status status1">未审批</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += '     <div class="mid">';
                            content += '         <div class="box1">';
                            content += '            用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '            ' + obj.endsite + '</div>';
                            content += '     </div>';
                            content += '     <div class="right">';
                            content += '         <div class="box1">';
                            content += '             还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '             <div class="details_btn">详情</div>';
                            content += '             <div class="undo_btn">撤销</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += ' </div>';
                        }
                        if (obj.status == 1) {
                            content += ' <div class="infolist">';
                            content += '     <div class="left">';
                            content += '         <div class="box1">' + obj.applycode + '</div>';
                            //content += '         </div>';
                            content += '         <div class="box2">';
                            content += '             <div class="status status2">已批车</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += '     <div class="mid">';
                            content += '         <div class="box1">';
                            content += '            用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '            ' + obj.platenumber + '</div>';
                            content += '     </div>';
                            content += '     <div class="right">';
                            content += '         <div class="box1">';
                            content += '             还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '             <div class="details_btn">详情</div>';
                            content += '             <div class="undo_btn">撤销</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += ' </div>';

                        }
                        if (obj.status == 2) {
                            content += ' <div class="infolist">';
                            content += '     <div class="left">';
                            content += '         <div class="box1">' + obj.applycode + '</div>';
                            //content += '         </div>';
                            content += '         <div class="box2">';
                            content += '             <div class="status status3">使用中</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += '     <div class="mid">';
                            content += '         <div class="box1">';
                            content += '            用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '            ' + obj.platenumber + '</div>';
                            content += '     </div>';
                            content += '     <div class="right">';
                            content += '         <div class="box1">';
                            content += '             还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '             <div class="details_btn">详情</div>';
                            //content += '             <div class="undo_btn">撤销</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += ' </div>';

                        }

                        if (obj.status == 4) {
                            content += ' <div class="infolist">';
                            content += '     <div class="left">';
                            content += '         <div class="box1">' + obj.applycode + '</div>';
                            //content += '         </div>';
                            content += '         <div class="box2">';
                            content += '             <div class="status status4">已还车</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += '     <div class="mid">';
                            content += '         <div class="box1">';
                            content += '            用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '            ' + obj.platenumber + '</div>';
                            content += '     </div>';
                            content += '     <div class="right">';
                            content += '         <div class="box1">';
                            content += '             还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '             <div class="details_btn">详情</div>';
                            //content += '             <div class="undo_btn">撤销</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += ' </div>';

                        }
                        if (obj.status == 5) {
                            content += ' <div class="infolist">';
                            content += '     <div class="left">';
                            content += '         <div class="box1">' + obj.applycode + '</div>';
                            //content += '         </div>';
                            content += '         <div class="box2">';
                            content += '             <div class="status status5">已超时</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += '     <div class="mid">';
                            content += '         <div class="box1">';
                            content += '            用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '            ' + obj.platenumber + '</div>';
                            content += '     </div>';
                            content += '     <div class="right">';
                            content += '         <div class="box1">';
                            content += '             还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '             <div class="details_btn">详情</div>';
                            //content += '             <div class="undo_btn">撤销</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += ' </div>';

                        }
                        if (obj.status == 6) {
                            content += ' <div class="infolist">';
                            content += '     <div class="left">';
                            content += '         <div class="box1">' + obj.applycode + '</div>';
                            //content += '         </div>';
                            content += '         <div class="box2">';
                            content += '             <div class="status status1">不通过</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += '     <div class="mid">';
                            content += '         <div class="box1">';
                            content += '            用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '            ' + obj.endsite + '</div>';
                            content += '     </div>';
                            content += '     <div class="right">';
                            content += '         <div class="box1">';
                            content += '             还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '             <div class="details_btn">详情</div>';
                            //content += '             <div class="undo_btn">撤销</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += ' </div>';

                        }



                        if (obj.status == 3) {
                            content += ' <div class="infolist">';
                            content += '     <div class="left">';
                            content += '         <div class="box1">' + obj.applycode + '</div>';
                            //content += '         </div>';
                            content += '         <div class="box2">';
                            content += '             <div class="status status6">已撤销</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += '     <div class="mid">';
                            content += '         <div class="box1">';
                            content += '            用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '            ' + obj.endsite + '</div>';
                            content += '     </div>';
                            content += '     <div class="right">';
                            content += '         <div class="box1">';
                            content += '             还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '             <div class="details_btn">详情</div>';

                            content += '         </div>';
                            content += '     </div>';
                            content += ' </div>';

                        }

                      
                    });
                } else if ($('#topinfo > .box1.contor').text() == "未审批") {
                    $.each(data.data1, function (idx, obj) {


                        if (obj.status == 0) {
                            content += ' <div class="infolist">';
                            content += '     <div class="left">';
                            content += '         <div class="box1">' + obj.applycode + '</div>';
                            //content += '         </div>';
                            content += '         <div class="box2">';
                            content += '             <div class="status status1">未审批</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += '     <div class="mid">';
                            content += '         <div class="box1">';
                            content += '            用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '           ' + obj.endsite + '</div>';
                            content += '     </div>';
                            content += '     <div class="right">';
                            content += '         <div class="box1">';
                            content += '             还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '             <div class="details_btn">详情</div>';
                            content += '             <div class="undo_btn">撤销</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += ' </div>';
                        }
                      

                    });

                } else if ($('#topinfo > .box1.contor').text() == "已审批") {
                    $.each(data.data2, function (idx, obj) {
                    if (obj.status == 1) {
                        content += ' <div class="infolist">';
                        content += '     <div class="left">';
                        content += '         <div class="box1">' + obj.applycode + '</div>';
                        //content += '         </div>';
                        content += '         <div class="box2">';
                        content += '             <div class="status status2">已批车</div>';
                        content += '         </div>';
                        content += '     </div>';
                        content += '     <div class="mid">';
                        content += '         <div class="box1">';
                        content += '            用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                        content += '         <div class="box2">';
                        content += '            ' + obj.platenumber + '</div>';
                        content += '     </div>';
                        content += '     <div class="right">';
                        content += '         <div class="box1">';
                        content += '             还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                        content += '         <div class="box2">';
                        content += '             <div class="details_btn">详情</div>';
                        content += '             <div class="undo_btn">撤销</div>';
                        content += '         </div>';
                        content += '     </div>';
                        content += ' </div>';
                    
                    }

                    if (obj.status == 2) {
                        content += ' <div class="infolist">';
                        content += '     <div class="left">';
                        content += '         <div class="box1">' + obj.applycode + '</div>';
                        //content += '         </div>';
                        content += '         <div class="box2">';
                        content += '             <div class="status status3">使用中</div>';
                        content += '         </div>';
                        content += '     </div>';
                        content += '     <div class="mid">';
                        content += '         <div class="box1">';
                        content += '            用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                        content += '         <div class="box2">';
                        content += '            ' + obj.platenumber + '</div>';
                        content += '     </div>';
                        content += '     <div class="right">';
                        content += '         <div class="box1">';
                        content += '             还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                        content += '         <div class="box2">';
                        content += '             <div class="details_btn">详情</div>';
                     
                        content += '         </div>';
                        content += '     </div>';
                        content += ' </div>';

                    }

                    });
               

                } else if ($('#topinfo > .box1.contor').text() == "已失效") {

                    $.each(data.data3, function (idx, obj) {

                        if (obj.status == 4) {
                            content += ' <div class="infolist">';
                            content += '     <div class="left">';
                            content += '         <div class="box1">' + obj.applycode + '</div>';
                            //content += '         </div>';
                            content += '         <div class="box2">';
                            content += '             <div class="status status4">已还车</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += '     <div class="mid">';
                            content += '         <div class="box1">';
                            content += '            用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '            ' + obj.platenumber + '</div>';
                            content += '     </div>';
                            content += '     <div class="right">';
                            content += '         <div class="box1">';
                            content += '             还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '             <div class="details_btn">详情</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += ' </div>';

                        }


                        if (obj.status == 3) {
                            content += ' <div class="infolist">';
                            content += '     <div class="left">';
                            content += '         <div class="box1">' + obj.applycode + '</div>';
                            //content += '         </div>';
                            content += '         <div class="box2">';
                            content += '             <div class="status status6">已撤销</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += '     <div class="mid">';
                            content += '         <div class="box1">';
                            content += '            用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '           ' + obj.endsite + '</div>';
                            content += '     </div>';
                            content += '     <div class="right">';
                            content += '         <div class="box1">';
                            content += '             还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '             <div class="details_btn">详情</div>';

                            content += '         </div>';
                            content += '     </div>';
                            content += ' </div>';

                        }

                        if (obj.status == 5) {
                            content += ' <div class="infolist">';
                            content += '     <div class="left">';
                            content += '         <div class="box1">' + obj.applycode + '</div>';
                            //content += '         </div>';
                            content += '         <div class="box2">';
                            content += '             <div class="status status5">已超时</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += '     <div class="mid">';
                            content += '         <div class="box1">';
                            content += '            用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '            ' + obj.platenumber + '</div>';
                            content += '     </div>';
                            content += '     <div class="right">';
                            content += '         <div class="box1">';
                            content += '             还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '             <div class="details_btn">详情</div>';
                     
                            content += '         </div>';
                            content += '     </div>';
                            content += ' </div>';

                        }

                        if (obj.status == 6) {
                            content += ' <div class="infolist">';
                            content += '     <div class="left">';
                            content += '         <div class="box1">' + obj.applycode + '</div>';
                            //content += '         </div>';
                            content += '         <div class="box2">';
                            content += '             <div class="status status1">不通过</div>';
                            content += '         </div>';
                            content += '     </div>';
                            content += '     <div class="mid">';
                            content += '         <div class="box1">';
                            content += '            用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '           ' + obj.endsite + '</div>';
                            content += '     </div>';
                            content += '     <div class="right">';
                            content += '         <div class="box1">';
                            content += '             还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '         <div class="box2">';
                            content += '             <div class="details_btn">详情</div>';
                        
                            content += '         </div>';
                            content += '     </div>';
                            content += ' </div>';

                        }
                     

                    });

                }



                $('#infodata > .list1').empty();

                $('#infodata > .list1').append(content);





                //if (page == 1) {
                //    $('#div_form_table').empty();
                //}
                //$('#div_form_table').append(content);
                //var pagecount = data.pagecount;
                //var totalnum = data.totalnum;
                //最大页数 = pagecount;
                //var 当前加载数 = $('#div_form_table > .infolist').length;
                //$('#bottom_footer > .left > .box1').text(当前加载数 + '/' + totalnum);
                //$("#pagination_P0001").pagination('setPage', parseFloat(page), parseFloat(pagecount));



                


                //$('#infodata > .list1').empty();

                //$('#infodata > .list1').append(content);







            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

















//function Ajax()
//{
//    //成功返回的回调函数
//    var content = '';
//    content += '<div class="infolist">';
//    content += '    <div class="left">';
//    content += '        <div class="box1">';
//    content += '            PL000002';
//    content += '        </div>';
//    content += '        <div class="box2">';
//    sw
//    content += '            <div class="status status2">已批车</div>';
//    content += '        </div>';
//    content += '    </div>';
//    content += '    <div class="mid">';
//    content += '        <div class="box1">';
//    content += '            用车时间：05/24 11:00';
//    content += '        </div>';
//    content += '        <div class="box2">';
//    content += '            天安数码城';
//    content += '        </div>';
//    content += '    </div>';
//    content += '    <div class="right">';
//    content += '        <div class="box1">';
//    content += '            还车时间：05/24 18:00';
//    content += '        </div>';
//    content += '        <div class="box2">';
//    content += '            <div class="details_btn">详情</div>';
//    content += '            <div class="undo_btn">撤销</div>';
//    content += '        </div>';
//    content += '    </div>';
//    content += '</div>';
//}