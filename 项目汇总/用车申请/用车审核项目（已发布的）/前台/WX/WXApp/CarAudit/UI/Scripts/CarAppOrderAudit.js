var 单号 = "";
$(document).on('tap', '#topinfo > .box1', function (e) {
    stopDefault(e);
    $(this).addClass('contor').siblings().removeClass('contor');
    var index = $(this).index();
    $('#infodata > .list1:eq(' + index + ')').addClass('contor').siblings().removeClass('contor');
    用户查询('IIS3382', '/Proposer.aspx?action=GetAll', {
        
    });
});


$(function () {
    
    查询车牌('IIS3382', '/Proposer.aspx?action=GetGarage', {
       
    });
})

/*
详情按钮
*/
$(document).on('tap', '#infodata > .list1 > .infolist > .right > .box2 > .details_btn', function (e) {
    stopDefault(e);
    var pcode = $(this).parents('.infolist').find('.left > .box1').text().trim();
    var 状态 = $(this).parents('.infolist').find('.left > .box2 .status').text();
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
    }
    location.href = 'CarAppOrderAuditDetails.aspx?type=' + 状态+"&"+'pcode='+pcode;
});


/*
撤回按钮
*/
$(document).on('tap', '#infodata > .list1 > .infolist > .right > .box2 > .undo_btn', function (e) {
    stopDefault(e);
     单号 = $(this).parents('.infolist').find('.left > .box1').text().trim();
    $('#orderno').text(单号);
    $('#approval_modal').addClass('contor');
    $('#mask300').addClass('contor');

    setTimeout(function () {
        $('#selectcar_dummy').click();
    }, 350);
});

/*
取消撤回按钮
*/
$(document).on('tap', '#undo_modal > .bottom > .btn_cancel', function (e) {
    stopDefault(e);
    $('#approval_modal').removeClass('contor');
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
    caution('撤回成功')
    $('#approval_modal').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
});



$(document).on('tap', '#approval_modal > .bottom > .btn_cancel', function (e) {
    stopDefault(e);
    $('#approval_modal').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
   
});

$(document).on('tap', '#operation_btn2 > .btn_1', function (e) {
    stopDefault(e);
    $('#approval_modal').addClass('contor');
    $('#mask300').addClass('contor');
    查询车牌('IIS3382', '/Proposer.aspx?action=GetGarage');
});


$(document).on('tap', '#approval_modal > .label > .label_2', function () {

    $(this).addClass('contor');

    if ($(this).hasClass('contor')) {
        $('#approval_remark').val($('#approval_remark').val() + $(this).text() + " ");
    }
})

function isempty() {
    if ($('#approval_remark').val().length == 0) {
        $('#approval_modal > .label > .label_2').removeClass('contor');
        $('#approval_modal > .label > .label_1').removeClass('contor');
    } 
}

$(document).on('tap', '#approval_modal > .label > .label_1', function () {

    $(this).addClass('contor');

    if ($(this).hasClass('contor')) {
        $('#approval_remark').val($('#approval_remark').val() + $(this).text() + " ");
    }
})


$(document).on('tap', '#approval_modal > .bottom > .btn_sure', function (e) {
    stopDefault(e);
 //   alert('已批准用车')
 
    $('#approval_modal').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
    //var 单号 = $(this).parents('.infolist').find('.left > .box1').text();
    //$('#orderno').text(单号);
    var pcode = getQueryString('pcode');
    var 车牌 = $('#selectcar_dummy').val();
    var 备注 = $('#approval_remark').val();
    var code = $('#usercode').val();
   
    提交('IIS3382', '/Proposer.aspx?action=Application', {
        "applycode": 单号,
        "platenumber": 车牌,
        "reason": 备注,
        "susercode": code
    });
});


$(document).on('tap', '#selectcar', function () {

    $("#carnum").hide();
    var a = $(".dw-bf div:eq(0)").attr("data-val");
    if (a == "请选择车牌") {
        $(".dw-bf div:eq(0)").remove();
    }
})
function 查询车牌(urltype, pageurl) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            //"data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            if (data.errcode == 0) {
                var content = '';
                if (data.data != null) {
                    $.each(data.data, function (idx, obj) {
                        content += '<option value="' + obj.platenumber + '">' + obj.platenumber + '</option>';
                    });
                }
                $('#selectcar').append(content);
            }
            else {
                caution(data.errmsg);
            }
        }
    });
}


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
                //alert("提交申请成功！");
                //setTimeout(function () {
                //    location.href = "CarAppOrder.aspx";
                //}, 2000)
                success('提交申请成功', 'CarAppOrderAudit.aspx')
            }
            else {
                caution(data.errmsg);
            }
        }
    });
}










$(function (e) {
    stopDefault(e);
   
    用户查询('IIS3382', '/Proposer.aspx?action=GetAll', {
       
    });
})


/*
获取装配汇总列表
*/
function 用户查询(urltype, pageurl, data, page) {
    //if (page == null) {
    //    page = 1;
    //}
    //if (page > 最大页数) {
    //    return;
    //}
    //showLoading();
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
                            content += '  <div class="infolist">';
                            content += '      <div class="left">';
                            content += '          <div class="box1">';
                            content += '           ' + obj.applycode + '</div>';
                            content += '          <div class="box3">';
                            content += '          ' + obj.applyname + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="status status1">未审批</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '      <div class="mid">';
                            content += '          <div class="box1">';
                            content += '                用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              ' + obj.purpose + '</div>';
                            content += '          <div class="box2">';
                            content += '             ' + obj.endsite + '</div>';
                            content += '      </div>';
                            content += '      <div class="right">';
                            content += '          <div class="box1">';
                            content += '              还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              提单时间：' + GetDateFormat(obj.cretetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="details_btn">详情</div>';
                            content += '              <div class="undo_btn">批准</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '  </div>';
                            content += '';
                        }
                        if (obj.status == 1) {
                           
                            content += '  <div class="infolist">';
                            content += '      <div class="left">';
                            content += '          <div class="box1">';
                            content += '           '+ obj.applycode + '</div>';
                            content += '          <div class="box3">';
                            content += '          ' + obj.applyname + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="status status2">已批车</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '      <div class="mid">';
                            content += '          <div class="box1">';
                            content += '                用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              ' + obj.purpose + '</div>';
                            content += '          <div class="box2">';
                            content += '             ' + obj.endsite + '</div>';
                            content += '      </div>';
                            content += '      <div class="right">';
                            content += '          <div class="box1">';
                            content += '              还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              提单时间：' + GetDateFormat(obj.cretetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="details_btn">详情</div>';
                          //  content += '              <div class="undo_btn">批准</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '  </div>';
                            content += '';
                            
                        }
                        if (obj.status == 2) {
                            content += '  <div class="infolist">';
                            content += '      <div class="left">';
                            content += '          <div class="box1">';
                            content += '           ' + obj.applycode + '</div>';
                            content += '          <div class="box3">';
                            content += '          ' + obj.applyname + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="status status3">使用中</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '      <div class="mid">';
                            content += '          <div class="box1">';
                            content += '                用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              ' + obj.purpose + '</div>';
                            content += '          <div class="box2">';
                            content += '             ' + obj.endsite + '</div>';
                            content += '      </div>';
                            content += '      <div class="right">';
                            content += '          <div class="box1">';
                            content += '              还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              提单时间：' + GetDateFormat(obj.cretetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="details_btn">详情</div>';
                          //  content += '              <div class="undo_btn">批准</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '  </div>';
                            content += '';

                        }

                        if (obj.status == 4) {
                            content += '  <div class="infolist">';
                            content += '      <div class="left">';
                            content += '          <div class="box1">';
                            content += '           ' + obj.applycode + '</div>';
                            content += '          <div class="box3">';
                            content += '          ' + obj.applyname + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="status status4">已还车</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '      <div class="mid">';
                            content += '          <div class="box1">';
                            content += '                用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              ' + obj.purpose + '</div>';
                            content += '          <div class="box2">';
                            content += '             ' + obj.endsite + '</div>';
                            content += '      </div>';
                            content += '      <div class="right">';
                            content += '          <div class="box1">';
                            content += '              还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              提单时间：' + GetDateFormat(obj.cretetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="details_btn">详情</div>';
                           // content += '              <div class="undo_btn">批准</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '  </div>';
                            content += '';

                        }
                        if (obj.status == 5) {
                            content += '  <div class="infolist">';
                            content += '      <div class="left">';
                            content += '          <div class="box1">';
                            content += '           ' + obj.applycode + '</div>';
                            content += '          <div class="box3">';
                            content += '          ' + obj.applyname + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="status status5">已超时</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '      <div class="mid">';
                            content += '          <div class="box1">';
                            content += '                用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              ' + obj.purpose + '</div>';
                            content += '          <div class="box2">';
                            content += '             ' + obj.endsite + '</div>';
                            content += '      </div>';
                            content += '      <div class="right">';
                            content += '          <div class="box1">';
                            content += '              还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              提单时间：' + GetDateFormat(obj.cretetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="details_btn">详情</div>';
                         //   content += '              <div class="undo_btn">批准</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '  </div>';
                            content += '';

                        }
                        if (obj.status == 6) {
                            content += '  <div class="infolist">';
                            content += '      <div class="left">';
                            content += '          <div class="box1">';
                            content += '           ' + obj.applycode + '</div>';
                            content += '          <div class="box3">';
                            content += '          ' + obj.applyname + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="status status1">不通过</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '      <div class="mid">';
                            content += '          <div class="box1">';
                            content += '                用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              ' + obj.purpose + '</div>';
                            content += '          <div class="box2">';
                            content += '             ' + obj.endsite + '</div>';
                            content += '      </div>';
                            content += '      <div class="right">';
                            content += '          <div class="box1">';
                            content += '              还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              提单时间：' + GetDateFormat(obj.cretetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="details_btn">详情</div>';
                          //  content += '              <div class="undo_btn">批准</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '  </div>';
                            content += '';
                        }



                        if (obj.status == 3) {
                            content += '  <div class="infolist">';
                            content += '      <div class="left">';
                            content += '          <div class="box1">';
                            content += '           ' + obj.applycode + '</div>';
                            content += '          <div class="box3">';
                            content += '          ' + obj.applyname + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="status status6">已撤销</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '      <div class="mid">';
                            content += '          <div class="box1">';
                            content += '                用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              ' + obj.purpose + '</div>';
                            content += '          <div class="box2">';
                            content += '             ' + obj.endsite + '</div>';
                            content += '      </div>';
                            content += '      <div class="right">';
                            content += '          <div class="box1">';
                            content += '              还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              提单时间：' + GetDateFormat(obj.cretetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="details_btn">详情</div>';
                           // content += '              <div class="undo_btn">批准</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '  </div>';
                            content += '';
                        }


                    });
                } else if ($('#topinfo > .box1.contor').text() == "未审批") {
                    $.each(data.data1, function (idx, obj) {


                        if (obj.status == 0) {
                            content += '  <div class="infolist">';
                            content += '      <div class="left">';
                            content += '          <div class="box1">';
                            content += '           ' + obj.applycode + '</div>';
                            content += '          <div class="box3">';
                            content += '          ' + obj.applyname + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="status status1">未审批</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '      <div class="mid">';
                            content += '          <div class="box1">';
                            content += '                用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              ' + obj.purpose + '</div>';
                            content += '          <div class="box2">';
                            content += '             ' + obj.endsite + '</div>';
                            content += '      </div>';
                            content += '      <div class="right">';
                            content += '          <div class="box1">';
                            content += '              还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              提单时间：' + GetDateFormat(obj.cretetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="details_btn">详情</div>';
                            content += '              <div class="undo_btn">批准</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '  </div>';
                            content += '';
                        }


                    });

                } else if ($('#topinfo > .box1.contor').text() == "已审批") {
                    $.each(data.data2, function (idx, obj) {
                        if (obj.status == 1) {
                            content += '  <div class="infolist">';
                            content += '      <div class="left">';
                            content += '          <div class="box1">';
                            content += '           ' + obj.applycode + '</div>';
                            content += '          <div class="box3">';
                            content += '          ' + obj.applyname + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="status status2">已批车</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '      <div class="mid">';
                            content += '          <div class="box1">';
                            content += '                用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              ' + obj.purpose + '</div>';
                            content += '          <div class="box2">';
                            content += '             ' + obj.endsite + '</div>';
                            content += '      </div>';
                            content += '      <div class="right">';
                            content += '          <div class="box1">';
                            content += '              还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              提单时间：' + GetDateFormat(obj.cretetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="details_btn">详情</div>';
                          //  content += '              <div class="undo_btn">批准</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '  </div>';
                            content += '';

                        }

                        if (obj.status == 2) {
                            content += '  <div class="infolist">';
                            content += '      <div class="left">';
                            content += '          <div class="box1">';
                            content += '           ' + obj.applycode + '</div>';
                            content += '          <div class="box3">';
                            content += '          ' + obj.applyname + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="status status3">使用中</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '      <div class="mid">';
                            content += '          <div class="box1">';
                            content += '                用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              ' + obj.purpose + '</div>';
                            content += '          <div class="box2">';
                            content += '             ' + obj.endsite + '</div>';
                            content += '      </div>';
                            content += '      <div class="right">';
                            content += '          <div class="box1">';
                            content += '              还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              提单时间：' + GetDateFormat(obj.cretetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="details_btn">详情</div>';
                          //  content += '              <div class="undo_btn">批准</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '  </div>';
                            content += '';
                        }

                    });


                } else if ($('#topinfo > .box1.contor').text() == "已失效") {

                    $.each(data.data3, function (idx, obj) {

                        if (obj.status == 4) {
                            content += '  <div class="infolist">';
                            content += '      <div class="left">';
                            content += '          <div class="box1">';
                            content += '           ' + obj.applycode + '</div>';
                            content += '          <div class="box3">';
                            content += '          ' + obj.applyname + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="status status4">已还车</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '      <div class="mid">';
                            content += '          <div class="box1">';
                            content += '                用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              ' + obj.purpose + '</div>';
                            content += '          <div class="box2">';
                            content += '             ' + obj.endsite + '</div>';
                            content += '      </div>';
                            content += '      <div class="right">';
                            content += '          <div class="box1">';
                            content += '              还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              提单时间：' + GetDateFormat(obj.cretetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="details_btn">详情</div>';
                           // content += '              <div class="undo_btn">批准</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '  </div>';
                            content += '';

                        }


                        if (obj.status == 3) {
                            content += '  <div class="infolist">';
                            content += '      <div class="left">';
                            content += '          <div class="box1">';
                            content += '           ' + obj.applycode + '</div>';
                            content += '          <div class="box3">';
                            content += '          ' + obj.applyname + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="status status6">已撤销</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '      <div class="mid">';
                            content += '          <div class="box1">';
                            content += '                用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              ' + obj.purpose + '</div>';
                            content += '          <div class="box2">';
                            content += '             ' + obj.endsite + '</div>';
                            content += '      </div>';
                            content += '      <div class="right">';
                            content += '          <div class="box1">';
                            content += '              还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              提单时间：' + GetDateFormat(obj.cretetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="details_btn">详情</div>';
                          //  content += '              <div class="undo_btn">批准</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '  </div>';
                            content += '';
                        }

                        if (obj.status == 5) {
                            content += '  <div class="infolist">';
                            content += '      <div class="left">';
                            content += '          <div class="box1">';
                            content += '           ' + obj.applycode + '</div>';
                            content += '          <div class="box3">';
                            content += '          ' + obj.applyname + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="status status5">已超时</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '      <div class="mid">';
                            content += '          <div class="box1">';
                            content += '                用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              ' + obj.purpose + '</div>';
                            content += '          <div class="box2">';
                            content += '             ' + obj.endsite + '</div>';
                            content += '      </div>';
                            content += '      <div class="right">';
                            content += '          <div class="box1">';
                            content += '              还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              提单时间：' + GetDateFormat(obj.cretetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="details_btn">详情</div>';
                           // content += '              <div class="undo_btn">批准</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '  </div>';
                            content += '';

                        }

                        if (obj.status == 6) {
                            content += '  <div class="infolist">';
                            content += '      <div class="left">';
                            content += '          <div class="box1">';
                            content += '           ' + obj.applycode + '</div>';
                            content += '          <div class="box3">';
                            content += '          ' + obj.applyname + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="status status1">不通过</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '      <div class="mid">';
                            content += '          <div class="box1">';
                            content += '                用车时间：' + GetDateFormat(obj.servicetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              ' + obj.purpose + '</div>';
                            content += '          <div class="box2">';
                            content += '             ' + obj.endsite + '</div>';
                            content += '      </div>';
                            content += '      <div class="right">';
                            content += '          <div class="box1">';
                            content += '              还车时间：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box3">';
                            content += '              提单时间：' + GetDateFormat(obj.cretetime, 'MM-dd HH:mm') + '</div>';
                            content += '          <div class="box2">';
                            content += '              <div class="details_btn">详情</div>';
                         //   content += '              <div class="undo_btn">批准</div>';
                            content += '          </div>';
                            content += '      </div>';
                            content += '  </div>';
                          

                        }


                    });

                }



                $('#infodata > .list1').empty();

                $('#infodata > .list1').append(content);



            }
            else {
                caution(data.errmsg)
            }
        }
    });
}

