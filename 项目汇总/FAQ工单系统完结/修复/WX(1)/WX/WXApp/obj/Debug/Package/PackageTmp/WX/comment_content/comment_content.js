
var wordercode = GetQueryString("Wid");
$(function () {

    GetInfoWordOrder(wordercode);
})

//获取URL地址中的参数值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

//删除工单
$(document).on('click', '#del', function () {
    //var wordercode = Wid;
    var token = localStorage.getItem("token");
    var wordercode = GetQueryString("Wid");
    $.ajax({
        cache: true,
        type: "POST",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=DeleteGd",
        data: {
            "token": token,
            "wordercode": wordercode
        },
        dataType: "json",
        async: true,
        error: function (request) {
            alert("连接失败，请稍候再试");
        },
        success: function (data) {
            if (data.errcode == 0) {
                weui.alert("删除成功!");
                //GetInfoWordOrder(wordercode);
                setTimeout(function () {
                    window.location.href = "../gongdan_server_info/gongdan_server_info.html";
                }, 2000)
                
            }
        }
    });
});



//修改评价
$(document).on('click', '#queding_update', function () {
    var attitude = $("#select_attitude option:selected").text();
    var functiongn = $("#select_function option:selected").text();
    var content = document.getElementById("select_appraise-textarea").value;
    var wordercode = GetQueryString("Wid");
    $.ajax({
        cache: true,
        type: "POST",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=UpdateAssess",
        data: {
            "wordercode": wordercode,
            "attitude": attitude,
            "function": functiongn,
            "content": content
        },
        dataType: "json",
        async: true,
        error: function (request) {
            alert("连接失败，请稍候再试");
        },
        success: function (data) {
            //if (data.errcode == 0) {
            weui.alert("修改成功！");

            GetInfoWordOrder(wordercode);
            $("#select_attitude").hide();
            $("#select_function").hide();
            $("#select_appraise-textarea").hide();
            $("#queding").hide();
            $('#attitude').show();
            $('#function').show();
            $('#content1').show();
            $('#xiugai').show();
            //window.location.href = "info_gongdan.html";
            //}
        }
    });
});



/****************************************** Ajax *********************************************/
// var usercode = localStorage.getItem("usercode");





/*
获取请求数据的信息
*/
function GetInfoWordOrder(wordercode) {
    var wordercode = GetQueryString("Wid");
    $.ajax({
        cache: true,
        type: "POST",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=lookworkorder",
        data: {
            "wordercode": wordercode
        },
        dataType: "json",
        async: true,
        error: function (request) {
            alert("连接失败，请稍候再试");
        },
        success: function (data) {            
            if (data.errcode == "#code#") {
                var attitude = '';
                var function1 = '';
                var content = '';
                attitude += '<div class="weui-cell__bd">';
                attitude += '' + data.data1[0].attitude + ''; // <!-- 这里获取服务态度 -->                
                attitude += '</div>';

                function1 += '<div class="weui-cell__bd">';
                function1 += '' + data.data1[0].function + ''; // <!-- 这里获取产品功能 -->
                function1 += '</div>';

                content += '<div class="weui-cell__bd">';
                content += '评价内容：&nbsp;&nbsp;&nbsp; ' + data.data1[0].content1 + ''; // <!-- 这里获取评价信息 -->
                content += '</div>';
                $('#attitude').empty();
                $('#attitude').append(attitude);

                $('#function').empty();
                $('#function').append(function1);

                $('#content1').empty();
                $('#content1').append(content);           
              
            }
            else {
                alert(data.errmsg);
            }

        }
    });
}
$(document).on('click', '.update', function () {
    $("#select_attitude").show();
    $("#select_function").show();
    $("#select_appraise-textarea").show();
    $("#queding").show();
    $('#attitude').hide();
    $('#function').hide();
    $('#content1').hide();
    $('#xiugai').hide();
})


