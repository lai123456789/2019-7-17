/****************************************** Ajax *********************************************/
//获取用户名
$(function () {
    //var username = localStorage.getItem("username");
    $("#list_user").text(username);

    var divvv = '';
    divvv += '<li class="level-1-item">';   //获取id值
    divvv += '<a class="toggle-item" href="create_gongdan.html?Wid=' + usercode + '&token=' + token + '&username=' + username + '">';
    divvv += ' <i class="iconfont"></i>';
    divvv += '<span>创建工单</span>';
    divvv += '</a>';
    divvv += '</li>';
    divvv += '<li class="level-1-item active">';
    divvv += '<a class="toggle-item" href="gongdan_list.html?Wid=' + usercode + '&token=' + token + '&username=' + username + '">';
    divvv += '<i class="iconfont"></i>';
    divvv += '<span>工单分页列表</span>';
    divvv += ' </a>';
    divvv += '</li>';
    $("#index").empty();
    $("#index").append(divvv);
})

//测试拿开始
var usercode = '';
var token = '';
var username = '';
//获取URL地址中的参数值
(function () { //获取url的每一个参数名
    //返回当前 URL 的查询部分（问号 ? 之后的部分）。
    var urlParameters = location.search;
    //声明并初始化接收请求参数的对象
    var requestParameters = new Object();
    //如果该求青中有请求的参数，则获取请求的参数，否则打印提示此请求没有请求的参数
    if (urlParameters.indexOf('?') != -1) {
        //获取请求参数的字符串
        var parameters = decodeURI(urlParameters.substr(1));
        //将请求的参数以&分割中字符串数组
        parameterArray = parameters.split('&');
        //循环遍历，将请求的参数封装到请求参数的对象之中
        for (var i = 0; i < parameterArray.length; i++) {
            requestParameters[parameterArray[i].split('=')[0]] = (parameterArray[i].split('=')[1]);
        }
        usercode = requestParameters.Wid;//这里拿到地址栏的usercode 
        token = requestParameters.token;
        username = requestParameters.username;
    }
    else {
        console.info('There is no request parameters');
    }
    return requestParameters;
})();
//测试拿结束

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
    //var usercode = localStorage.getItem("usercode");
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
                    content += '<a href="info_gongdan.html?Wid=' + obj.WORDERCODE + '&usercode=' + usercode + '&username=' + username + '&token=' + token + '">查看</a>';
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


/****************************************** Ajax End *********************************************/

