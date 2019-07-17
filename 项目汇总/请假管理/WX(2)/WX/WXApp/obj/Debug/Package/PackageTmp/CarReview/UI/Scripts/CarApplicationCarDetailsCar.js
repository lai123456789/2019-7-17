$(function () {
    // var 类型 = getQueryString('type');//暂时为了演示，通过URL的type参数来控制，之后的话通过接口直接返回类型
    var pcode = getQueryString('pcode');
    var 类型 = getQueryString('type');//暂时为了演示，通过URL的type参数来控制，之后的话通过接口直接返回类型
   
    var code = $('#usercode').val();
    查询单号查询('IIS3382', '/Proposer.aspx?action=GetCardata', {
        "applycode": pcode
       
    });
});

function 查询单号查询(urltype, pageurl, data, page) {
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
                var 类型 = getQueryString('type');

                $.each(data.data, function (idx, obj) {
                    if (类型 == 3)
                    {

                        
                        if (obj.drivercode == 1) {

                            content += '    <div class="rows1">';
                            content += '        <div class="left">工号：</div>';
                            content += '        <div class="right" data-usercode="">' + obj.accent + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows2">';
                            content += '        <div class="left">申请人：</div>';
                            content += '        <div class="right">' + obj.applyname + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows3">';
                            content += '        <div class="left">部门：</div>';
                            content += '        <div class="right">' + obj.department + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows4">';
                            content += '        <div class="left">目的地：</div>';
                            content += '        <div class="right">' + obj.endsite + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows5">';
                            content += '        <div class="left">用途：</div>';
                            content += '        <div class="right">' + obj.purpose + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows6">';
                            content += '        <div class="left">用车时间：</div>';
                            content += '        <div class="right">' + obj.servicetime + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows6">';
                            content += '        <div class="left">还车时间：</div>';
                            content += '        <div class="right">' + obj.returntime + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows7">';
                            content += '        <div class="left">车辆：</div>';
                            content += '        <div class="right">' + obj.platenumber + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows9">';
                            content += '        <div class="left">派送司机：</div>';
                            content += '        <div class="right">' + obj.drivernames + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows10">';
                            content += '        <div class="left">备注：</div>';
                            content += '        <div class="right">' + obj.remark + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows10">';
                            content += '        <div class="left">审批人：</div>';
                            content += '        <div class="right">' + obj.susername + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows10">';
                            content += '        <div class="left">司机电话：</div>';
                            content += '        <div class="right">' + obj.phone + '</div>';
                            content += '    </div>';

                        }
                        else {
                            content += '    <div class="rows1">';
                            content += '        <div class="left">工号：</div>';
                            content += '        <div class="right" data-usercode="">' + obj.accent + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows2">';
                            content += '        <div class="left">申请人：</div>';
                            content += '        <div class="right">' + obj.applyname + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows3">';
                            content += '        <div class="left">部门：</div>';
                            content += '        <div class="right">' + obj.department + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows4">';
                            content += '        <div class="left">目的地：</div>';
                            content += '        <div class="right">' + obj.endsite + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows5">';
                            content += '        <div class="left">用途：</div>';
                            content += '        <div class="right">' + obj.purpose + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows6">';
                            content += '        <div class="left">用车时间：</div>';
                            content += '        <div class="right">' + obj.servicetime + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows6">';
                            content += '        <div class="left">还车时间：</div>';
                            content += '        <div class="right">' + obj.returntime + '</div>';
                            content += '    </div>';
                            content += '    <div class="rows7">';
                            content += '        <div class="left">车辆：</div>';
                            content += '        <div class="right">' + obj.platenumber + '</div>';
                            content += '    </div>';
                            //content += '    <div class="rows9">';
                            //content += '        <div class="left">派送司机：</div>';
                            //content += '        <div class="right">' + obj.drivernames + '</div>';
                            //content += '    </div>';
                            //content += '    <div class="rows10">';
                            //content += '        <div class="left">备注：</div>';
                            //content += '        <div class="right">' + obj.remark + '</div>';
                            //content += '    </div>';
                            content += '    <div class="rows10">';
                            content += '        <div class="left">审批人：</div>';
                            content += '        <div class="right">' + obj.susername + '</div>';
                            content += '    </div>';
                            //content += '    <div class="rows10">';
                            //content += '        <div class="left">司机电话：</div>';
                            //content += '        <div class="right">' + obj.phone + '</div>';
                            //content += '    </div>';

                        }
                        
                    }
                    else {
                        content += '    <div class="rows1">';
                        content += '        <div class="left">工号：</div>';
                        content += '        <div class="right" data-usercode="">' + obj.accent + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows2">';
                        content += '        <div class="left">姓名：</div>';
                        content += '        <div class="right">' + obj.applyname + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows3">';
                        content += '        <div class="left">部门：</div>';
                        content += '        <div class="right">' + obj.department + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows4">';
                        content += '        <div class="left">目的地：</div>';
                        content += '        <div class="right">' + obj.endsite + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows5">';
                        content += '        <div class="left">用途：</div>';
                        content += '        <div class="right">' + obj.purpose + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows6">';
                        content += '        <div class="left">用车时间：</div>';
                        content += '        <div class="right">' + obj.servicetime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows6">';
                        content += '        <div class="left">还车时间：</div>';
                        content += '        <div class="right">' + obj.returntime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows7">';
                        content += '        <div class="left">车辆：</div>';
                        content += '        <div class="right">' + obj.platenumber + '</div>';
                        content += '    </div>';
                        //content += '    <div class="rows8">';
                        //content += '        <div class="left">审核状态：</div>';
                        //content += '        <div class="right status1">使用中</div>';
                        //content += '    </div>';
                        content += '    <div class="rows9">';
                        content += '        <div class="left">派送司机：</div>';
                        content += '        <div class="right">' + obj.drivernames + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">备注：</div>';
                        content += '        <div class="right">' + obj.remark + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">审批人：</div>';
                        content += '        <div class="right">' + obj.susername + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows10">';
                        content += '        <div class="left">司机电话：</div>';
                        content += '        <div class="right">' + obj.phone + '</div>';
                        content += '    </div>';

                    }
                });

                $('#infodata').empty();

                $('#infodata').append(content);



            }
            else {
                alert(data.errmsg)
            }
        }
    });
}




