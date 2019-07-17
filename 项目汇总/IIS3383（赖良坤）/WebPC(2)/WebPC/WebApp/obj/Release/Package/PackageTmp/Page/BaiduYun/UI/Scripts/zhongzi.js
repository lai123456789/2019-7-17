$(function () {
    $(".file-drop-zone-title").text("拖拽文件到这里 …支持多文件同时上传");

    var a = $(".file-footer-caption").text().length;
    if (a > 50) {
        var txt = $(".file-footer-caption").text().substring(0, 20) + '...';
        $(".file-footer-caption").text(txt);
    }


})

$(document).on('click', '.top_div > div', function () {
    $(this).addClass("top_contor").siblings().removeClass("top_contor");
});

$(document).on('click', '.ico img:eq(1)', function () {
    $(".file-live-thumbs").toggleClass("contor");
    $(".file-preview-frame").toggleClass("contor_div");

    $(".file-thumbnail-footer").toggleClass("contor_div_txt");
    if ($('.ico img:eq(1)').attr('src') == 'UI/images/2.png') { //设置图片的切换
        $('.ico img:eq(1)').attr('src', 'UI/images/3.png');
    } else {
        $('.ico img:eq(1)').attr('src', 'UI/images/2.png');
    }

    if ($('.ico img:eq(1)').attr('src') == 'UI/images/2.png' && $(".file-preview-frame").hasClass('contor_div')) {
        //$(".kv-file-content > img").css("height", "160px");
        $(".file-preview-frame").removeClass('contor_div');
    }
    if ($('.ico img:eq(1)').attr('src') == 'UI/images/2.png' && $(".file-thumbnail-footer").hasClass('contor_div_txt')) {
        $(".file-thumbnail-footer").removeClass('contor_div_txt');
    }
    if ($('.ico img:eq(1)').attr('src') == 'UI/images/3.png' && $(".file-preview-frame").hasClass('contor_div')) {
        //$(".kv-file-content > img").css("height", "50px");
    }

})

$(document).on('click', '#wangpan', function () {
    $(".pan").show();
    $(".share_div").hide();
    $(".more_div").hide();
});
$(document).on('click', '#share', function () {
    $(".share_div").show();
    $(".pan").hide();
    $(".more_div").hide();
});
$(document).on('click', '#more', function () {
    $(".more_div").show();
    $(".pan").hide();
    $(".share_div").hide();
});

$(document).on('click', '#share_left_text > div', function () {
    $(this).addClass("share_contor").siblings().removeClass("share_contor");
})
$(document).on('click', '.session', function () {
    $(".session_div").show();
    $(".friend_div").hide();

});
$(document).on('click', '.friend', function () {
    $(".friend_div").show();
    $(".session_div").hide();

});

$(document).on('click', '.anniu', function () {
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal').modal('show');


});

$(document).on('click', '.tutxt', function () {
    $(".file-live-thumbs > .file-preview-frame").each(function () {
        var a = $(this).find(".kv-file-content img").attr("src");
        var b = $(this).find(".file-thumbnail-footer span").text();
        console.log(a);
        console.log(b);

    });
});
