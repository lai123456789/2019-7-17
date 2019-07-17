
$(function () {
    $("#account").focus(function () { //获得焦点事件
        $("#zhuce").hide();
    });
    $("#account").blur(function () { //失去焦点事件
        $("#zhuce").show();
    });
})
$(function () {
    $("#bangding").on('click', function () {
		var username = $("#account").val();
		var pwd = $("#pwd").val();
		$.ajax({
        cache: true,
        type: "POST",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=Loginl",
        dataType: "json",
        async: true,
        data: {
            "username": username,
            "pwd":pwd          
        },
        success: function data(data) {
            if (data.errcode == 0)  //提取成功
            {
                localStorage.setItem("usercode", data.data[0].usercode);
                localStorage.setItem("token", data.data[0].token);
                localStorage.setItem("usertype", data.data[0].usertype);
                localStorage.setItem("username", data.data[0].username);
                if (data.data[0].usertype == 2) {
                    location.href = "../WXadmin_info/WXadmin_info.html";

                } else if (data.data[0].usertype == 3) {
                    location.href = "../WXadmin_href/WXadmin_href.html"; //../WXadmin_info/WXadmin_info.html
                }
                else {
                    location.href = "../gongdan_server_info/gongdan_server_info.html";
                }
            } else//提取失败
            {
                alert(data.errmsg);
            }

        }
    });
	})
})
