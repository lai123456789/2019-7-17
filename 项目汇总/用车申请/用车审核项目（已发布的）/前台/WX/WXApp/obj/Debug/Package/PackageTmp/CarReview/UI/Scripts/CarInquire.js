/*
详情按钮
*/
$(document).on('tap', '#infodata > .list1 > .infolist > .right > .box2 > .details_btn', function (e) {
    stopDefault(e);
    var 状态 = '3';

    var pcode = $(this).parents('.infolist').find('.left > .box1').text().trim();//#infodata > .list1 > .infolist > .left > .box1

    //switch (状态) {
    //    case "空闲":
    //        状态 = 1;
    //        break;
    //    case "驾驶中":
    //        状态 = 2;
    //        break;
    //}
    location.href = 'CarApplicationCarDetailsCar.aspx?type=' + 状态 + "&" + 'pcode=' + pcode;
});


$(function (e) {
    stopDefault(e);
    //    var code = $('#usercode').val();
    用户查询('IIS3382', '/Proposer.aspx?action=GetGarage', {

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



              

                    $.each(data.data, function (idx, obj) {


                        if (obj.carstate == 0) {
                           
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
                            content += '            用车时间：   ' + GetDateFormat(obj.starttime, 'MM-dd HH:mm') + ' </div>';
                            content += '             <div class="box2"> ';
                            content += '             ' + obj.platenumber + ' </div>';
                            content += '         </div> ';
                            content += '         <div class="right"> ';
                            content += '             <div class="box1"> ';
                            content += '            还车时间：  ' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + ' </div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="details_btn">详情</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         </div> ';

                          
                        }
                        if (obj.carstate == 1) {
                            content += '     <div class="infolist"> ';
                            content += '         <div class="left"> ';
                            content += '             <div class="box1"> ';
                            content += '               ' + obj.code + ' </div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="status status2">空闲中</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         <div class="mid"> ';
                            content += '             <div class="box1"> ';
                            content += '            用车时间：   ' + GetDateFormat(obj.starttime, 'MM-dd HH:mm') + ' </div>';
                            content += '             <div class="box2"> ';
                            content += '             ' + obj.platenumber + ' </div>';
                            content += '         </div> ';
                            content += '         <div class="right"> ';
                            content += '             <div class="box1"> ';
                            content += '            还车时间：  ' + GetDateFormat(obj.returntime, 'MM-dd HH:mm') + ' </div>';
                            content += '             <div class="box2"> ';
                            content += '                 <div class="details_btn">详情</div> ';
                            content += '             </div> ';
                            content += '         </div> ';
                            content += '         </div> ';


                        }


                    });





                    $('#infodata > .list1').empty();

                    $('#infodata > .list1').append(content);




                }
                else {
                    alert(data.errmsg)
                }
        }
    });
    }




