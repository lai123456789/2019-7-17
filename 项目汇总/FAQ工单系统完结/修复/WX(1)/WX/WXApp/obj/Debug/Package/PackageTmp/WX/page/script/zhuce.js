$(document).on('click', '#register', function () {    
    var username = $('#username').val();
    var pwd = $('#pwd').val();
    var name = $('#name').val();
    var phone = $('#phone').val();
    if (username == null || username == "") {
        alert("账号不能为空");
        return;
    };
    if (pwd == null || pwd == "") {
        alert("密码不能为空");
        return;
    };
    if (name == null || name == "") {
        alert("用户名不能为空");
        return;
    };
    if (phone == null || phone == "") {
        alert("电话号码不能为空");
        return;
    };
    register();
    //var id = $(this).attr("id");
    //alert(id);
    //register(id);
    
});
//$(document).on('click', '#add_user', function () {
//    var id = $(this).attr("id");
//    register(id);
//});
function register() {
    var username = $('#username').val();
    var pwd = $('#pwd').val();
    var name = $('#name').val();
    var phone = $('#phone').val();
    $.ajax({
        cache: false,
        type: "post",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=UpdateUser",
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
                alert("注册成功！");
                window.location.href = "index.html";
                //if (id == "register") {
                //    window.location.href = "index.html";
                //} else {
                //    window.location.href = "admin_user.html";
                //}
            }
            else {                
                alert(data.errmsg);
            }
        }
    });
}
