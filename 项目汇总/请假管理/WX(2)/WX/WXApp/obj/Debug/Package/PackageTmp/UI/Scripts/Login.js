$(document).on('tap', '#content > .rows > .right > .remember,#content > .rows > .right > .textremember', function (e) {
    $('#content > .rows > .right > .remember').toggleClass('contor');
});

$(function () {
    $('body').addClass('contor');
    setTimeout(function () {
        if (confirm("检测到有版本可以更新？")) {
            alert("点击了确定");
        }
        else {
            alert("点击了取消");
        }
    }, 3000);
});

$(document).on('tap', '#down > .btn', function () {
    showLoading();
    setTimeout(function () {
        location.href = 'index.html';
    }, 1000);
});


$(document).on('tap', '#shengji', function () {
    location.href = 'https://oss-api-test.oss-cn-shenzhen.aliyuncs.com/palmmsg.apk';
});