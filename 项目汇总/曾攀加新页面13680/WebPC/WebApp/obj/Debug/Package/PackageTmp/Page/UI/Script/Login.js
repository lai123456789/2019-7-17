$(document).on('click', '#remember > .left,#remember > .right', function () {
    $(this).parents('#remember').toggleClass('contor');
});

var isautologin = true;

$(document).on('click', '#btn_login', function () {
    AccountLogin();
});

$(document).keydown(function (e) {
    var key = e.keyCode;
    if (key == 13) {
        AccountLogin();
    }
});

$(document).on('click', '#username,#password', function () {
    isautologin = false;
})

$(function () {

    setTimeout(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        if (username != '' && password != '') {
            if (isautologin) {
                AccountLogin();
            }
        }
    }, 3000);


});


/*
账号登录的方法
*/
function AccountLogin() {
    var account = $('#username').val();
    var password = $('#password').val();
    if (account == '') {
        alert('账号不能为空哦！');
        return;
    }
    LoginUser(account, password);
}



/*
请求登录
*/
function LoginUser(account, password) {
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=login",
        data: {
            "account": account,
            "password": password
        },
        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            hideLoading();
            if (data.errcode == 0) {
                location.href = '/Page/index.html';
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}