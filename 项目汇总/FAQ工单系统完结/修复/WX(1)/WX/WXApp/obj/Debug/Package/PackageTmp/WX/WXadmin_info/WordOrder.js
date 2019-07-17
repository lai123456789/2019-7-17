/****************************************** Ajax *********************************************/
//获取用户名
$(function () {
    var username = localStorage.getItem("username");
    $("#list_user").text(username);
})
//注销模块    
$(document).on('click', '#list_layout', function () {
    list_layout();
});
function list_layout() {
    // var usercode = localStorage.getItem("usercode");
    $.ajax({
        cache: false,
        type: "post",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=LogoutUser",
        // async: true,
        error: function (request) {
        },
        success: function (data) {
            if (data.errcode == 0) {
                alert("注销成功！");
                window.location.href = "index.html";

            }
            else {
                alert(data.errmsg);
            }
        }
    });
};


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
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=getWordOrder",
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
                    //content += '<tr>';
                    //content += '<td>' + obj.WORDTYPECODE + '</td>'; //产品
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
                    content += '<a href="../question_click_info/question_click_info.html?Wid=' + obj.WORDERCODE + '">'; //点击链接查看 进入详情
                    content += '<div class="weui-cells">';  //状态
                    content += '<div class="weui-cell">'; //工单编号
                    content += '<div class="weui-cell__bd">'; //创建时间
                    content += '<p id="type" class="weui-cells__title weui-cell__hd" style="font-size: 16px;">' + obj.WORDTYPECODE + '</p>';
                    content += '</div>';
                    content += '<p id="status" class="weui-cell__ft" style="color: red;"><span class="weui-badge weui-badge_dot"></span>' + state + '</p>';  //状态
                    content += '</div>';
                    content += '<div class="weui-cell">';
                    content += '<div class="weui-cell__hd"><img src=""></div>';
                    content += '<div class="weui-cell__bd">';
                    content += '<p id="content" class="weui-cells__title weui-cell__hd" style="font-size: 16px;">' + obj.CONTENT + '</p>';
                    content += '<p id="create_time" class="weui-cell__hd weui-cells__title">' + obj.CREATETIME + '</p>';
                    content += '</div>';
                    content += '</div>';
                    content += '</a>';
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


/****************************************** Ajax End *********************************************/

