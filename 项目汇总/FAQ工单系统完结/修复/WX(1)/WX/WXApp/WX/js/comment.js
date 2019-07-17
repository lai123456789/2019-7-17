//确认评价

var wordercode = GetQueryString("Wid");
//获取URL地址中的参数值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
$(document).on('click', '#showTooltips', function () {    
    var attitude = document.getElementById("attitude").selectedIndex;    
    var functiongn = document.getElementById("function").selectedIndex;
    var content = document.getElementById("appraise-textarea").value;
    $("#select_attitude").hide();
    $("#select_function").hide();
    $("#select_appraise-textarea").hide();
    $(".queding").hide();
    $('#attitude').hide();
    $('#function').hide();
    $('#appraise-textarea').hide();
    $('#xiugai').show();
    //var attitude = $("#attitude  option:selected").text();    
    //var functiongn = $("#function option:selected").text();
    //var content = document.getElementById("appraise-textarea").value;
   
    var wordercode = GetQueryString("Wid");
    $.ajax({
        cache: true,
        type: "POST",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=evaluatecreate",
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
            if (data.errcode == 0) {
                weui.alert("评价成功！");
                setTimeout(function () {
                    //window.location.href = "../comment_content/comment_content.html?Wid=" + wordercode;
                    GetInfoWordOrder(wordercode)
                }, 2000)
                
            }
        }
    });
});

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
                $('#attitude1').empty();
                $('#attitude1').append(attitude);

                $('#function1').empty();
                $('#function1').append(function1);

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
    $(".queding").hide();
    $(".queding_xiugai").show();
    $('#attitude').hide();
    $('#function').hide();
    $('#attitude1').hide();
    $('#function1').hide();
    $('#content1').hide();
    $('#appraise-textarea').hide();
    $('#xiugai').hide();
})

//修改评价
$(document).on('click', '#queding_xiugai', function () {
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
            $('#attitude').hide();
            $('#function').hide();
            $('.queding_xiugai').hide();//
            $('#appraise-textarea').hide(); 
            $(".queding").hide();
            $('#attitude1').show();
            $('#function1').show();
            $('#content1').show();
            $('#xiugai').show();
            //window.location.href = "info_gongdan.html";
            //}
        }
    });
});

