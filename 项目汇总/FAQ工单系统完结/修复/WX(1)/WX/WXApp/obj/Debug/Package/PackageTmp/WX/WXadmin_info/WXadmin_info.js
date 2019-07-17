$(function () {
    var token = localStorage.getItem("token");
    wode_paigong(token);
})
function wode_paigong(token) {   //页面刷新加载函数   我的派工接口
    var usercode = localStorage.getItem("usercode");
    var token = localStorage.getItem("token");
    //var search = $('#search_content1').val();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetWork",
        data: {
            "token": token,
            "usercode": usercode,
            //"search": search
        },
        async: true,
        error: function (request) {
        },
        success: function (data) {
            if (data.errcode == 0) {
                //alert("vgaerhtwbanjymkejktuiog.luyukmzxr");
                var goodsid = '';
                var content = '';
                $.each(data.data, function (idx, obj) {                    
                    content += '<a href="../WXadmin_click_info/WXadmin_click_info.html?Wid=' + obj.wordercode + '">'; //点击链接进入详情
                    content += '<div class="weui-cells">';  
                    content += '<div >'; 
                    
                    content += '<p id="type" class="weui-cells__title weui-cell__hd" style="font-size: 16px;">工单标题： ' + obj.title + '</p>';
                    
                    //content += '<p id="status" class="weui-cell__ft" style="color: red;"><span class="weui-badge weui-badge_dot"></span>' + state + '</p>';  //状态
                    content += '</div>';
                    content += '<div class="">';  //weui-cell 加这个 就有下划线
                    content += '<div class="">';
                    content += '<p id="content" class="weui-cells__title weui-cell__hd" style="font-size: 16px;">工单内容：' + obj.content + '</p>';
                    content += '<p id="" class="weui-cells__title weui-cell__hd" style="font-size: 16px;">工单号：' + obj.wordercode + '</p>';
                    content += '<p id="create_time" class="weui-cell__hd weui-cells__title">联系人：' + obj.name + '  联系方式：' + obj.phone + '</p>';
                    content += '</div>';
                    content += '</div>';
                    content += '</a>';
                });
                $('#tb_account1').empty();
                $('#tb_account1').append(content);
                //var pagecount = data.pageCount;
                ////page_num($('#yy_pagegps01'), page, pagecount);
                //page_num($('#yy_pagegps01'), page, pagecount);
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}