$(function () {
    $("#username").focus(function () { //获得焦点事件
        $("#denglu").addClass("username");
    });
    $("#username").blur(function () { //失去焦点事件
        $("#denglu").removeClass("username");
    });
})
$(function () {
    $("#register").on('click', function () {
        var username = $('#username').val();
        var pwd = $('#pwd').val();
        var name = $('#name').val();
        var phone = $('#phone').val();
        if (username == null || username == "") {
            weui.alert("账号不能为空");
            return;
        };
        if (pwd == null || pwd == "") {
            weui.alert("密码不能为空");
            return;
        };
        if (name == null || name == "") {
            weui.alert("用户名不能为空");
            return;
        };
        if (phone == null || phone == "") {
            weui.alert("电话号码不能为空");
            return;
        };
        zhuce();
    })
});
function zhuce() {
    var username = $('#username').val();
    var pwd = $('#pwd').val();
    var name = $('#name').val();
    var phone = $('#phone').val();
    $.ajax({
        cache: false,
        type: "post",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/Login.aspx?action=Up",
        async: true,
        data: {
            "username": username,
            "pwd": pwd,
            "name": name,
            "phone": phone
        },
        error: function (request) {
        },
        success: function (data) {
            if (data.errcode == 0) {
                weui.alert("注册成功！");
                setTimeout(function () {
                    location.href = "http://o24034e466.qicp.vip/WorderList.aspx";
                },2000)
                
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}
