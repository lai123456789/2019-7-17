/****************************************** Ajax *********************************************/
//获取用户名
$(function () {
    GetAllPublishedGoodsInfo(1);//
});

$(document).on('click', '.query_btn', function () {
    GetAllPublishedGoodsInfo(1);
});
/*
获取请求数据的信息
*/
function GetAllPublishedGoodsInfo(page) {
    //var userid = document.getElementById("code").value;
    // var usercode = "mgd00004";
    var usercode = localStorage.getItem("usercode");
    var search = $('#search_content1').val();
    $.ajax({
        cache: true,
        type: "POST",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=getWordOrder&usercode=mgd00001",
        data: {
            "page": page,
            "usercode": usercode,
            "search": search
        },
        dataType: "json",
        async: true,
        error: function (request) {
            alert("连接失败，请稍候再试");
        },
        success: function (data) {
            if (data.errcode == 0) {
                //alert("vgaerhtwbanjymkejktuiog.luyukmzxr");
                var goodsid = '';
                var content = '';
                $.each(data.data1, function (idx, obj) {
                    content += '<tr>';
                    content += '<td>' + obj.WORDTYPECODE + '</td>'; //产品
                    switch (obj.GDSTATE) {
                        case "1":
                            state = '处理中';
                            break;
                        case "2":
                            state = '待评价';
                            //gdstate = obj.gdstate;
                            break;
                        case "3":
                            state = '已完成';
                            //gdstate = obj.gdstate;
                            break;
                    }
                    content += '<td id="zt" >' + state + '</td>';  //状态
                    content += '<td >' + obj.WORDERCODE + '</td>'; //工单编号
                    content += '<td >' + obj.APPTITTLE + '</td>'; //问题描述
                    content += '<td >' + obj.CREATETIME + '</td>'; //创建时间
                    content += '<td >';
                    content += '<a href="info_gongdan.html?Wid=' + obj.WORDERCODE + '">查看</a>';
                    content += '</td>';
                    content += '</tr>';
                });
                $('#tb_account').empty();
                $('#tb_account').append(content);

                var pagecount = data.pageCount;
                //page_num($('#yy_pagegps01'), page, pagecount);
                page_num($('#yy_pagegps01'), page, pagecount);

            }
            else {
                alert(data.errmsg);
            }
        }
    });
}

原先的worder.js
/****************************************** Ajax End *********************************************/

