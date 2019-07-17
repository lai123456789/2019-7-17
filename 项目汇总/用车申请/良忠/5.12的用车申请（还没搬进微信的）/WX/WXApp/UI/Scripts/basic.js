//操作成功提示层-成功
var success_ = '<div id="success">';
success_ += '<p><span></span><i class="iconfont">&#xe70b;</i></p>';
success_ += '</div>';

//操作成功提示层-失败
var fail_ = '<div id="fail">';
fail_ += '<p><span></span><i class="iconfont">&#xe636;</i></p>';
fail_ += '</div>';

//操作成功提示层-成功
var showdate_ = '<div id="showdate">';
showdate_ += '<p><span></span></p>';
showdate_ += '</div>';


//操作警示层
var caution_ = '<div id="caution">';
caution_ += '<p><i>!</i><span></span></p>';
caution_ += '</div>';

//无搜索消息
var no_dd = '<dd class="no_dd">';
no_dd += '<p>很抱歉，没有找到与“”相关的信息。</p>';
no_dd += '</dd>';

//暂无消息
var no_tr = '<tr class="no_tr">';
no_tr += '<td colspan="2">';
no_tr += '<p>暂无消息哦！</p>';
no_tr += '</td>';
no_tr += '</tr>';

//无消息
var nothing_ = '<div class="nothing">';
nothing_ += '<p></p>';
nothing_ += '</div>';

var mask = '<div id="mask"></div>';//遮罩层
var Loading = '<div id="Loading"></div>';//加载层

$(function () {
    footertop();
})
//--footer
function footertop() {
    var wh = $(window).height();
    var fh = $('#footer').height();
    $('#footer').css('bottom', '0');
};
//--禁止长按图片系统弹窗
$(document).on('touchstart', 'img', function (e) {
    e.preventDefault();
});

//显示加载层 
function showLoading() {
    $('#Loading').remove();
    $('body').append(Loading);
};
//隐藏加载层 
function hideLoading() {
    $('#Loading').remove();
};
var timer1;

//操作成功提示层1秒后移除
function success(c, d) {
    $('#success').remove();
    $('body').append(success_);
    $('#success p span').text(c);
    clearTimeout(timer1);
    timer1 = setTimeout(function () {
        $('#success').remove();
        self.location = d;
    }, 1000)
};

var timer2;
//操作成功提示层1秒后移除
function showdate(c, d) {
    $('#showdate').remove();
    $('body').append(showdate_);
    $('#showdate p span').text(c);
    clearTimeout(timer2);
    timer2 = setTimeout(function () {
        $('#showdate').remove();
        self.location = d;
    }, 1000)
};

var timer3;
//操作成功提示层n秒后移除
function success_func(c, n) {
    n = n || 2;
    $('#success').remove();
    $('body').append(success_);
    $('#success p span').text(c);
    clearTimeout(timer3);
    timer3 = setTimeout(function () {
        $('#success').remove();
        self.location = d;
    }, n * 1000);
};
var timer4;
//操作失败提示层1秒后移除
function fail(c, d) {
    $('#fail').remove();
    $('body').append(fail_);
    $('#fail p span').text(c);
    clearTimeout(timer4);
    timer4 = setTimeout(function () {
        $('#fail').remove();
        self.location = d;
    }, 1000)
};
var timer5;
//操作caution层1秒后移除
function caution(b) {
    $('#caution').remove();
    $('body').append(caution_);
    $('#caution p span').text(b);
    clearTimeout(timer5);
    timer5 = setTimeout(function () {
        $('#caution').remove();
    }, 1000)
};
var timer6;
//操作caution层n秒后移除
function caution_func(b, n) {
    n = n || 2;
    $('#caution').remove();
    $('body').append(caution_);
    $('#caution p span').text(b);
    clearTimeout(timer6);
    timer6 = setTimeout(function () {
        $('#caution').remove();
    }, n * 1000);
};

function nothing(a, b) {
    if ($(a).children().length == 0) {
        $(a).append(nothing_);
        $(a).find('.nothing>p').text(b)
    } else {
        $(a).find('.nothing').remove();
    }
};
//解决点透问题
function stopDefault(y) {
    // 阻止默认浏览器动作(W3C)
    if (y && y.preventDefault) {
        y.preventDefault();
    } else {
        // IE中阻止函数器默认动作的方式
        window.event.returnValue = false;
    }
    return false;
};


function show_bottom(a, b) {
    $('#show_bottom').remove();
    $(a).append('<div id="show_bottom" style="width:100%;">' + b + '</div>');
};
function hide_bottom() {
    //隐藏加载器  
    $('#show_bottom').remove();
};

//获取数组中最大值的下标
function GetMaxValueIndex(arr) {
    var index = 0;
    var maxvalue = 0;
    for (var i = 0; i < arr.length; i++) {
        var curr_value = parseFloat(arr[i]);
        if (curr_value > maxvalue) {
            index = i;
            maxvalue = curr_value;
        }
    }
    return index;
}


/////////////////常用toastr 参数//////////////////
var toastr_info_opt = {
    "closeButton": true,
    "debug": false,
    "positionClass": "toast-top-full-width",
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};


$(function () {
    $('body').addClass('contor');
});


$(document).on('tap', '#top > .title > .control1 > i', function (e) {
    stopDefault(e);
    var url = $(this).attr('data-url');
    if (url != null && url != '') {
        location.href = url;
    } else {
        window.history.go(-1);
    }
});


/*
获取URL参数
*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

$(function () {
    var 屏幕高度 = document.documentElement.clientHeight;
    $('#maindiv').css('max-height', 屏幕高度 + 'px');
    $('#maindiv').css('overflow:', 'auto');
});