
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
    用户查询('IIS3382', '/Proposer.aspx?action=GetCard', {
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
                用户查询('IIS3382', '/Proposer.aspx?action=GetCard', {
                    "page": page
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

    var pcode = $(this).parents('.infolist').find('.left > .box1').text().trim();//#infodata > .list1 > .infolist > .left > .box1

    switch (状态) {
        case "代命中":
            状态 = 1;
            break;
        case "驾驶中":
            状态 = 2;
            break;

        case "已结单":
            状态 = 3;
            break;

        case "已撤销":
            状态 = 4;
            break;
    }
    location.href = 'CarApplicationCarDetailsCar.aspx?type=' + 状态 + "&" + 'pcode=' + pcode;
});


$(function (e) {
    stopDefault(e);
//    var code = $('#usercode').val();
    用户查询('IIS3382', '/Proposer.aspx?action=GetCard', {
        "page": page
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


                        if (obj.starts == 0) {

                            content += '     <div class="infolist"> ';
                            content += '         <div class="left"> ';
                            content += '             <div class="box1"> ';
                            content += '               ' + obj.code + ' </div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="status status2">待命中</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         <div class="mid"> ';
                            content += '             <div class="box1"> ';
                            content += '            用车时间：' + GetDateFormat(obj.starttime, 'MM-dd HH:mm') + '</div>';
                            content += '             <div class="box2"> ';
                            content += '             ' + obj.drivername + '  +   ' + obj.platenumber + ' </div>';
                            content += '         </div> ';
                            content += '         <div class="right"> ';
                            content += '             <div class="box1"> ';
                            content += '            预计还车：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="details_btn">详情</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         </div> ';



                        }


                        if (obj.starts == 1) {

                            content += '     <div class="infolist"> ';
                            content += '         <div class="left"> ';
                            content += '             <div class="box1"> ';
                            content += '               ' + obj.code + ' </div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="status status3">使用中</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         <div class="mid"> ';
                            content += '             <div class="box1"> ';
                            content += '            用车时间：' + GetDateFormat(obj.starttime, 'MM-dd HH:mm') + '</div>';
                            content += '             <div class="box2"> ';
                            content += '             ' + obj.drivername + '  +   ' + obj.platenumber + ' </div>';
                            content += '         </div> ';
                            content += '         <div class="right"> ';
                            content += '             <div class="box1"> ';
                            content += '            预计还车：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="details_btn">详情</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         </div> ';




                        }
                        if (obj.starts == 2) {

                            content += '     <div class="infolist"> ';
                            content += '         <div class="left"> ';
                            content += '             <div class="box1"> ';
                            content += '               ' + obj.code + ' </div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="status status4">已结单</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         <div class="mid"> ';
                            content += '             <div class="box1"> ';
                            content += '            用车时间：' + GetDateFormat(obj.starttime, 'MM-dd HH:mm') + '</div>';
                            content += '             <div class="box2"> ';
                            content += '             ' + obj.drivername + '  +   ' + obj.platenumber + ' </div>';
                            content += '         </div> ';
                            content += '         <div class="right"> ';
                            content += '             <div class="box1"> ';
                            content += '            预计还车：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="details_btn">详情</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         </div> ';




                        }

                        if (obj.starts == 4) {

                            content += '     <div class="infolist"> ';
                            content += '         <div class="left"> ';
                            content += '             <div class="box1"> ';
                            content += '               ' + obj.code + ' </div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="status status10">已撤销</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         <div class="mid"> ';
                            content += '             <div class="box1"> ';
                            content += '            用车时间：' + GetDateFormat(obj.starttime, 'MM-dd HH:mm') + '</div>';
                            content += '             <div class="box2"> ';
                            content += '             ' + obj.drivername + '  +   ' + obj.platenumber + ' </div>';
                            content += '         </div> ';
                            content += '         <div class="right"> ';
                            content += '             <div class="box1"> ';
                            content += '            预计还车：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="details_btn">详情</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         </div> ';

                        }



                    });
                } else if ($('#topinfo > .box1.contor').text() == "使用中") {
                    $.each(data.data1, function (idx, obj) {

                        if (obj.starts == 1) {

                            content += '     <div class="infolist"> ';
                            content += '         <div class="left"> ';
                            content += '             <div class="box1"> ';
                            content += '               ' + obj.code + ' </div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="status status3">使用中</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         <div class="mid"> ';
                            content += '             <div class="box1"> ';
                            content += '            用车时间：' + GetDateFormat(obj.starttime, 'MM-dd HH:mm') + '</div>';
                            content += '             <div class="box2"> ';
                            content += '             ' + obj.drivername + '  +   ' + obj.platenumber + ' </div>';
                            content += '         </div> ';
                            content += '         <div class="right"> ';
                            content += '             <div class="box1"> ';
                            content += '            预计还车：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="details_btn">详情</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         </div> ';




                        }


                    });

                } else if ($('#topinfo > .box1.contor').text() == "已结单") {
                    $.each(data.data2, function (idx, obj) {

                      
                        if (obj.starts == 2) {

                            content += '     <div class="infolist"> ';
                            content += '         <div class="left"> ';
                            content += '             <div class="box1"> ';
                            content += '               ' + obj.code + ' </div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="status status4">已结单</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         <div class="mid"> ';
                            content += '             <div class="box1"> ';
                            content += '            用车时间：' + GetDateFormat(obj.starttime, 'MM-dd HH:mm') + '</div>';
                            content += '             <div class="box2"> ';
                            content += '             ' + obj.drivername + '  +   ' + obj.platenumber + ' </div>';
                            content += '         </div> ';
                            content += '         <div class="right"> ';
                            content += '             <div class="box1"> ';
                            content += '            预计还车：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="details_btn">详情</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         </div> ';




                        }
                    });


                } else if ($('#topinfo > .box1.contor').text() == "已失效") {

                    $.each(data.data, function (idx, obj) {


                        if (obj.starts == 4) {

                            content += '     <div class="infolist"> ';
                            content += '         <div class="left"> ';
                            content += '             <div class="box1"> ';
                            content += '               ' + obj.code + ' </div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="status status10">已撤销</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         <div class="mid"> ';
                            content += '             <div class="box1"> ';
                            content += '            用车时间：' + GetDateFormat(obj.starttime, 'MM-dd HH:mm') + '</div>';
                            content += '             <div class="box2"> ';
                            content += '             ' + obj.drivername + '  +   ' + obj.platenumber + ' </div>';
                            content += '         </div> ';
                            content += '         <div class="right"> ';
                            content += '             <div class="box1"> ';
                            content += '            预计还车：' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + '</div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="details_btn">详情</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         </div> ';

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



